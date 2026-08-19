import nodemailer from "nodemailer";
import type { AppointmentPayload } from "./validate";
import type { TenantSettings } from "./tenants";

let cachedTransporter: nodemailer.Transporter | undefined;

function getTransporter() {
  if (!cachedTransporter) {
    cachedTransporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT || 587),
      secure: process.env.SMTP_SECURE === "true", // true for port 465
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });
  }
  return cachedTransporter;
}

/** Notifies the clinic's front desk about a new appointment lead. */
export async function sendClinicNotificationEmail(
  tenant: TenantSettings,
  payload: AppointmentPayload
) {
  const transporter = getTransporter();

  await transporter.sendMail({
    from: `"${tenant.clinicName} Website" <${process.env.SMTP_FROM}>`,
    to: tenant.notifyEmail,
    replyTo: payload.email || undefined,
    subject: `New appointment request — ${payload.name}`,
    text: [
      `New appointment request from ${tenant.clinicName}'s website`,
      "",
      `Name: ${payload.name}`,
      `Phone: ${payload.phone}`,
      payload.email ? `Email: ${payload.email}` : null,
      payload.service ? `Service: ${payload.service}` : null,
      payload.preferredDate ? `Preferred date: ${payload.preferredDate}` : null,
      payload.message ? `Message: ${payload.message}` : null,
    ]
      .filter(Boolean)
      .join("\n"),
  });
}

/** Optional confirmation email back to the patient, only if they provided an email. */
export async function sendPatientConfirmationEmail(
  tenant: TenantSettings,
  payload: AppointmentPayload
) {
  if (!payload.email) return;
  const transporter = getTransporter();

  await transporter.sendMail({
    from: `"${tenant.clinicName}" <${process.env.SMTP_FROM}>`,
    to: payload.email,
    subject: `We've received your appointment request — ${tenant.clinicName}`,
    text: `Hi ${payload.name},\n\nThanks for reaching out to ${tenant.clinicName}. We've received your appointment request and our team will call you shortly on ${payload.phone} to confirm.\n\n— ${tenant.clinicName}`,
  });
}
