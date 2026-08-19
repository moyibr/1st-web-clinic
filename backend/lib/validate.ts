import { z } from "zod";

/**
 * Validates the appointment lead payload coming from any client's frontend.
 * `honeypot` is a hidden field real users never fill — if it arrives non-empty,
 * the request is a bot and gets silently dropped (see api/appointment.ts).
 */
export const appointmentPayloadSchema = z.object({
  clientSlug: z.string().min(1).max(100),
  name: z.string().min(2).max(120),
  phone: z.string().min(7).max(20),
  email: z.string().email().optional().or(z.literal("")),
  service: z.string().max(120).optional().or(z.literal("")),
  preferredDate: z.string().max(20).optional().or(z.literal("")),
  message: z.string().max(1000).optional().or(z.literal("")),
  honeypot: z.string().max(0).optional(), // must stay empty
});

export type AppointmentPayload = z.infer<typeof appointmentPayloadSchema>;
