/** Shape of a lead document as stored in the shared `appointments` collection. */
export interface AppointmentLead {
  tenantId: string; // == clientSlug, used to scope every query per client
  name: string;
  phone: string;
  email?: string;
  service?: string;
  preferredDate?: string;
  message?: string;
  status: "new" | "contacted" | "confirmed" | "cancelled";
  source: "website";
  userAgent?: string;
  ip?: string;
  createdAt: Date;
}
