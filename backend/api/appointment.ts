import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getDb } from "../lib/db";
import { getTenant } from "../lib/tenants";
import { appointmentPayloadSchema } from "../lib/validate";
import { sendClinicNotificationEmail, sendPatientConfirmationEmail } from "../lib/email.service";
import { notifyClinicViaWhatsapp } from "../lib/whatsapp.service";
import type { AppointmentLead } from "../models/Appointment";

function setCors(res: VercelResponse, origin: string | undefined, allowedOrigins: string[]) {
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin);
  }
  res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin;

  // We don't know the tenant yet (need the body for that), so preflight gets a permissive
  // reflect-if-present response; the real tenant-scoped allowlist check happens below.
  if (req.method === "OPTIONS") {
    setCors(res, origin, origin ? [origin] : []);
    return res.status(204).end();
  }

  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const parsed = appointmentPayloadSchema.safeParse(req.body);
  if (!parsed.success) {
    return res.status(400).json({ error: "Invalid input", details: parsed.error.flatten() });
  }
  const payload = parsed.data;

  // Honeypot: real users never populate this hidden field. Silently pretend success so
  // bots don't learn to look for a different signal.
  if (payload.honeypot) {
    return res.status(200).json({ ok: true });
  }

  const tenant = getTenant(payload.clientSlug);
  if (!tenant) {
    return res.status(404).json({ error: "Unknown clinic" });
  }

  setCors(res, origin, tenant.allowedOrigins);
  if (origin && !tenant.allowedOrigins.includes(origin)) {
    return res.status(403).json({ error: "Origin not allowed for this clinic" });
  }

  try {
    const db = await getDb();
    const collection = db.collection<AppointmentLead>("appointments");

    // Lightweight spam guard: block an identical phone number submitting again within 60s.
    const recentDuplicate = await collection.findOne({
      tenantId: tenant.clientSlug,
      phone: payload.phone,
      createdAt: { $gte: new Date(Date.now() - 60_000) },
    });
    if (recentDuplicate) {
      return res.status(429).json({ error: "Please wait a moment before submitting again" });
    }

    const lead: AppointmentLead = {
      tenantId: tenant.clientSlug,
      name: payload.name,
      phone: payload.phone,
      email: payload.email || undefined,
      service: payload.service || undefined,
      preferredDate: payload.preferredDate || undefined,
      message: payload.message || undefined,
      status: "new",
      source: "website",
      userAgent: req.headers["user-agent"],
      ip: (req.headers["x-forwarded-for"] as string) || req.socket.remoteAddress,
      createdAt: new Date(),
    };

    await collection.insertOne(lead);

    // Lead is safely stored before we touch email/WhatsApp — a notification failure should
    // never lose the lead itself. Failures here are logged, not surfaced to the patient.
    const notifications = await Promise.allSettled([
      sendClinicNotificationEmail(tenant, payload),
      sendPatientConfirmationEmail(tenant, payload),
      notifyClinicViaWhatsapp(tenant, payload),
    ]);
    notifications.forEach((result, i) => {
      if (result.status === "rejected") {
        console.error(`[api/appointment] notification #${i} failed for ${tenant.clientSlug}:`, result.reason);
      }
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error("[api/appointment] unexpected error:", err);
    return res.status(500).json({ error: "Something went wrong. Please try again or call the clinic directly." });
  }
}
