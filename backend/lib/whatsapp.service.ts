import type { AppointmentPayload } from "./validate";
import type { TenantSettings } from "./tenants";

/**
 * STUB — WhatsApp Business API is a future paid add-on (see
 * clinic.config.featureFlags.enableWhatsappBusinessApi on the frontend, mirrored here by
 * tenant.enableWhatsappBusinessApi). Until a client upgrades, the free `wa.me` click-to-chat
 * link on the frontend (WhatsAppFloatButton) is the only WhatsApp touchpoint — no backend
 * call needed for that.
 *
 * When a tenant upgrades: plug in the actual Meta Cloud API call here (POST to
 * graph.facebook.com/v.../messages using tenant-specific WABA credentials from env),
 * flip that tenant's `enableWhatsappBusinessApi` to true, and this function starts firing —
 * no changes needed anywhere else in the request flow.
 */
export async function notifyClinicViaWhatsapp(
  tenant: TenantSettings,
  payload: AppointmentPayload
): Promise<void> {
  if (!tenant.enableWhatsappBusinessApi) {
    return; // no-op for every client on the free tier
  }

  // TODO: implement Meta WhatsApp Business Cloud API call once a client is on the paid add-on.
  console.log(
    `[whatsapp.service] Business API enabled for ${tenant.clientSlug} but not yet implemented`,
    { patient: payload.name }
  );
}
