const API_URL = import.meta.env.VITE_API_URL;

export interface AppointmentPayload {
  name: string;
  phone: string;
  email?: string;
  service?: string;
  preferredDate?: string;
  message?: string;
  /** Hidden field — must stay empty. Non-empty means a bot filled the form. */
  honeypot?: string;
}

/**
 * Posts to the shared multi-tenant backend. clientSlug identifies which clinic this
 * lead belongs to — the backend uses it as the tenantId when saving to MongoDB and
 * deciding which clinic's notification email/WhatsApp to trigger.
 */
export async function submitAppointment(clientSlug: string, payload: AppointmentPayload) {
  const res = await fetch(`${API_URL}/api/appointment`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ clientSlug, ...payload }),
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error(body.error ?? "Failed to submit appointment request");
  }

  return res.json();
}
