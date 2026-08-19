# Backend — Shared Multi-Tenant Appointment API

One Vercel deployment serves the `/api/appointment` endpoint for **every** client site.
Each request carries a `clientSlug`; leads are scoped by `tenantId` in MongoDB, and
notification destinations (email/WhatsApp) are looked up server-side from
[`lib/tenants.ts`](lib/tenants.ts) — never trusted from the request body.

## Onboarding a new client (backend side)
1. Add an entry to `TENANTS` in [`lib/tenants.ts`](lib/tenants.ts): `clientSlug` (must match
   the frontend's `clinic.config.meta.clientSlug`), `notifyEmail`, `allowedOrigins` (their
   Vercel frontend URL + any custom domain).
2. Deploy (`vercel --prod` or push to the connected Git branch).
3. No database migration needed — `tenantId` is just a field on each lead document.

## Local development
```bash
pnpm install
cp .env.example .env.local   # fill in MongoDB Atlas URI + SMTP creds
pnpm dev                      # runs `vercel dev`, serves http://localhost:3000/api/appointment
```

## Environment variables (set in Vercel project settings for prod)
See [`.env.example`](.env.example) — `MONGODB_URI`, `MONGODB_DB_NAME`, `SMTP_*`.

## What the endpoint does (`api/appointment.ts`)
1. Validates the payload with Zod ([`lib/validate.ts`](lib/validate.ts)).
2. Drops silent bot submissions via a hidden honeypot field.
3. Looks up the tenant by `clientSlug`; unknown slug → 404, disallowed origin → 403.
4. Blocks accidental duplicate submits from the same phone number within 60s.
5. Saves the lead to the shared `appointments` collection with `tenantId`.
6. Sends a clinic notification email + optional patient confirmation email
   ([`lib/email.service.ts`](lib/email.service.ts)), and calls the WhatsApp stub
   ([`lib/whatsapp.service.ts`](lib/whatsapp.service.ts)) — a no-op unless that tenant's
   `enableWhatsappBusinessApi` is `true` (paid add-on, not yet implemented).

Notification failures are logged but never fail the request — the lead is already saved by
that point, so a broken SMTP config doesn't mean a lost patient enquiry.

## Scaling beyond a handful of clients
- Move `TENANTS` from a plain object into a `tenants` MongoDB collection once it gets past
  ~15-20 clients, with a short in-memory cache per warm container.
- Add a proper rate limiter (e.g. Upstash Redis) if spam becomes an issue beyond the
  honeypot + 60s duplicate guard.
