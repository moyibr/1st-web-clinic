/**
 * Backend-side tenant registry — deliberately SEPARATE from each client's
 * frontend/src/config/clinic.config.ts. The frontend only ever sends a `clientSlug`;
 * it never gets to dictate where notification emails go. That mapping lives here,
 * under your control, so a malicious/compromised client request can't be used to
 * spam an arbitrary inbox.
 *
 * At a handful of clients, a plain object is simplest. If this grows past ~15-20
 * tenants, move it into a `tenants` MongoDB collection and cache reads.
 */
export interface TenantSettings {
  clientSlug: string;
  clinicName: string;
  notifyEmail: string;
  notifyWhatsappNumber?: string; // digits only, with country code
  enableWhatsappBusinessApi: boolean; // mirrors clinic.config.featureFlags.enableWhatsappBusinessApi
  /** Origins allowed to call the API for this tenant (CORS allowlist). */
  allowedOrigins: string[];
}

const TENANTS: Record<string, TenantSettings> = {
  "demo-clinic": {
    clientSlug: "demo-clinic",
    clinicName: "Smile Care Dental Clinic",
    notifyEmail: "appointments@smilecaredental.example",
    notifyWhatsappNumber: "919876543210",
    enableWhatsappBusinessApi: false,
    allowedOrigins: [
      "http://localhost:5173",
      "https://demo-clinic.vercel.app",
    ],
  },
  // Add one entry per client onboarded. clientSlug MUST match
  // frontend clinic.config.meta.clientSlug for that client's build.
};

export function getTenant(clientSlug: string): TenantSettings | undefined {
  return TENANTS[clientSlug];
}
