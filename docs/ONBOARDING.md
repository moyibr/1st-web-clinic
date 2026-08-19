# Onboarding a New Client

Step-by-step for turning this template into a live site for a new dental clinic. See
[CONFIG_REFERENCE.md](CONFIG_REFERENCE.md) for what every field means.

## 1. Collect the client's raw material

Before touching any code, get from the client:

- Clinic name, legal name, established year, one-paragraph and short taglines
- Address, phone number(s), WhatsApp number, email(s), weekly timings
- Doctor bios: name, designation, qualifications, specialization, years of experience,
  registration number, consulting days, headshot photos
- Service list: name, description, price range (if they publish pricing), FAQs
- Logo (light + dark if they have both), favicon, a hero-worthy photo or two, gallery
  photos/videos, before/after photos if applicable
- Brand colors (hex) — ask for their existing brand guide, or pick 2-3 from their logo/signage
  if they don't have one formalized
- Google Business / Maps listing (for the embed URL and reviews), social media links
- Insurance/accreditation logos if relevant

Missing something? Don't block on it — most fields are optional and the site degrades
gracefully (see "Graceful degradation" below).

## 2. Create the client's config

```bash
mkdir -p "clients/<new-slug>/assets"
cp clients/demo-clinic/clinic.config.json "clients/<new-slug>/clinic.config.json"
```

Edit `clients/<new-slug>/clinic.config.json` with the client's real data — this is your
reference archive copy. Then mirror the same values into the **live** source of truth:
[`frontend/src/config/clinic.config.ts`](../frontend/src/config/clinic.config.ts).

> Only one client's config is "live" in the frontend at a time — see step 5 for how multiple
> clients each get their own deployment from the same codebase.

Validate as you go: `pnpm --filter frontend typecheck` will fail loudly on a schema violation
(bad hex color, wrong WhatsApp number format, missing required field, etc.) before you ever
open a browser.

## 3. Drop in assets

Create `frontend/public/assets/clients/<new-slug>/` mirroring the structure under
`demo-clinic/` (`hero/`, `doctors/`, `gallery/`, `testimonials/`, `accreditations/`) and match
every path referenced in `clinic.config.ts` exactly.

**Image guidance:**
- Hero slides: 1920×1080+, compressed to a few hundred KB each
- Doctor photos: portrait-ish, consistent crop across doctors looks best
- Favicon: 512×512 PNG (browsers will downscale)
- OG image: 1200×630 (standard social-share size)

### Graceful degradation

You don't need every asset before going live. Any image path pointing at a file that doesn't
exist yet renders a branded gradient placeholder (clinic-color gradient + tooth icon, or
initials for a named person/logo) instead of a broken-image icon — see
[`SmartImage`](../frontend/src/components/ui/SmartImage.tsx). Same for
`contact.address.mapEmbedUrl`: leave it unset until you have the client's real Google Maps
embed URL, and the Contact/Home map widget shows a "Get Directions" placeholder instead of a
broken embed.

This means you can ship a structurally-complete site on day one and backfill real photos over
the following days without ever showing the client (or their customers) a broken page.

## 4. Register the tenant on the backend

The backend is **shared** across all clients — one Vercel deployment, tenants separated by
`tenantId`. Add an entry to `TENANTS` in
[`backend/lib/tenants.ts`](../backend/lib/tenants.ts):

```ts
"new-slug": {
  clientSlug: "new-slug",
  clinicName: "New Clinic Name",
  notifyEmail: "front-desk@newclinic.example",
  notifyWhatsappNumber: "91XXXXXXXXXX",
  enableWhatsappBusinessApi: false, // true only once they've paid for the Business API add-on
  allowedOrigins: [
    "http://localhost:5173",
    "https://new-slug.vercel.app", // + their custom domain once mapped
  ],
},
```

`clientSlug` here **must** match `clinic.config.ts`'s `meta.clientSlug` exactly — it's how a
lead submitted from the frontend gets attributed to the right clinic and notification inbox.
Redeploy the backend after this change (or it'll reject the new tenant's form submissions
with a 404).

## 5. Set up the client's frontend deployment

Each client gets **their own Vercel project** (same repo, different env vars/build):

1. New Vercel project → import this repo → set **Root Directory** to `frontend`.
2. Environment variables:
   - `VITE_CLIENT_SLUG=<new-slug>`
   - `VITE_API_URL=https://<shared-backend>.vercel.app`
   - `VITE_GA_ID` (optional)
3. Deploy. `frontend/vercel.json` already handles the SPA rewrite so deep links
   (`/services/root-canal-treatment`, etc.) don't 404 on refresh.
4. Map the client's custom domain in Vercel's project settings, then add that domain to their
   `allowedOrigins` entry in `backend/lib/tenants.ts` (step 4) and redeploy the backend.

> Note: today, `clinic.config.ts` is a single file shared by the whole `frontend/` package —
> switching which client a given deployment serves currently means checking out/editing that
> file per client build, not just an env var. If you're managing several clients from one
> branch, keep each client on its own branch (or maintain the config swap as part of your
> deploy script) until the config is made env-selectable.

## 6. Pre-launch checklist

- [ ] `pnpm --filter frontend typecheck` and `pnpm --filter frontend lint` both clean
- [ ] `pnpm build:web` succeeds
- [ ] Every page loads with no broken images (check the DOM has zero `<img>`/`<video>` that
      failed — or just eyeball for the gradient placeholders you're expecting)
- [ ] Test-submit the appointment form → confirm the lead lands in MongoDB with the right
      `tenantId`, and the notification email arrives at `notifyEmail`
- [ ] Click-to-call and WhatsApp buttons open with the right number pre-filled
- [ ] Map widget shows either the real embed or the placeholder (never a broken Google error)
- [ ] Custom domain resolves and `allowedOrigins`/CORS is correct (submit the form from the
      *production* domain, not just localhost, before considering it done)
- [ ] Favicon, tab title, and social-share preview (`og:image`) look right — reshare a link in
      a chat app to sanity-check the OG card

## 7. Handoff

Give the client:
- Their live URL
- Where their leads land (MongoDB collection, or wherever you're forwarding notifications)
- How to request content changes (until `Admin/` exists, that's you editing `clinic.config.ts`
  and redeploying — see the project roadmap in the root [README](../README.md))
