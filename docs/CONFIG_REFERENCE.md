# Config Reference

Full field-by-field reference for [`clinic.config.ts`](../frontend/src/config/clinic.config.ts),
validated by [`clinic.config.schema.ts`](../frontend/src/config/clinic.config.schema.ts) (Zod).
Every field below is enforced at build/boot time — a bad hex color or a missing required
field fails loudly instead of shipping broken UI.

Legend: **Req** = required. Everything else is optional (has a sane default or may be omitted).

## `meta`

| Field | Type | Req | Notes |
|---|---|---|---|
| `clientSlug` | string | ✅ | Identifies this client to the backend (`tenantId`) and asset paths (`public/assets/clients/<slug>/`). Must match the backend's `TENANTS` entry — see [`backend/README.md`](../backend/README.md). |
| `siteTitle` | string | ✅ | `<title>`, browser tab, `og:title`. |
| `tagline` | string | ✅ | Short brand line, used as Hero fallback headline. |
| `metaDescription` | string (≤300 chars) | ✅ | SEO `<meta name="description">` + `og:description`. |
| `faviconPath` | string | ✅ | Applied to the `<link rel="icon">` at runtime — see [`src/lib/seo.ts`](../frontend/src/lib/seo.ts). |
| `logoLightPath` | string | ✅ | Navbar logo. Falls back to a branded initials badge if the file is missing (`SmartImage`). |
| `logoDarkPath` | string | ✅ | Reserved for a future dark-mode navbar (`featureFlags.enableDarkMode`). |
| `ogImagePath` | string | ✅ | Social share preview image (`og:image`). |

## `brand`

| Field | Type | Req | Notes |
|---|---|---|---|
| `colors.primary/secondary/accent/background/text` | hex string (`#rrggbb`) | ✅ | Converted to CSS custom properties at runtime (`src/config/theme.ts`) — every component reads `bg-primary`, `text-ink`, etc., never a literal hex. |
| `fontHeading` | string | ✅ | Google Font name for headings (editorial serif recommended — see the Dentologie/SSF design-pattern notes in project history). |
| `fontBody` | string | ✅ | Google Font name for body text. |
| `borderRadius` | `"soft" \| "sharp" \| "rounded"` | ✅ | Drives `rounded-brand` everywhere (buttons, cards, images). |

## `clinic`

| Field | Type | Req | Notes |
|---|---|---|---|
| `name` | string | ✅ | Used everywhere — Navbar, Footer, page titles. |
| `legalName` | string | | Footer copyright line; falls back to `name`. |
| `establishedYear` | number | ✅ | Drives the About page's computed "legacy" line (`years active = current year − this`). |
| `tagline` | string | ✅ | |
| `aboutShort` | string (≤300 chars) | ✅ | Hero fallback subheadline, meta fallback. |
| `aboutLong` | string | ✅ | About page main story (supports `\n\n` paragraph breaks). |
| `mission` | string | | About page hides the whole Mission/Vision block if **both** `mission` and `vision` are absent. |
| `vision` | string | | Same as above. |
| `specialties` | string[] | ✅ (≥1) | Powers the Services page filter pills — a pill only shows if ≥1 service's `specialty` matches it. |
| `accreditations` | `{name, logoPath}[]` | | About page "Recognized By" band; hidden entirely if empty. |

## `contact`

| Field | Type | Req | Notes |
|---|---|---|---|
| `phone` | `{label, number}[]` | ✅ (≥1) | First entry is used for Hero's "Call" CTA and click-to-call links. |
| `whatsappNumber` | string, digits only incl. country code (e.g. `919876543210`) | ✅ | Powers the floating WhatsApp button and Contact page's `wa.me` link. No `+`, spaces, or dashes. |
| `email` | `{label, address}[]` | ✅ (≥1) | Listed on the Contact page. |
| `address.line1/city/state/pincode` | string | ✅ | |
| `address.line2` | string | | |
| `address.mapEmbedUrl` | URL | | **Omit until you have the client's real Google Maps embed URL.** `MapTimingsWidget` shows a branded placeholder (pin icon + "Get Directions") instead of a broken/fake embed when absent. |
| `address.mapDirectionsUrl` | URL | | Powers "Get Directions" links (shown with or without the map embed). |
| `timings` | exactly 7 `{day, openTime, closeTime, isClosed}` entries | ✅ | One per weekday; use `isClosed: true` for off-days (leave times as `""`). |
| `emergencyContact` | string | | Shown on the Contact page if present. |

## `socials`

All optional URLs: `instagram`, `facebook`, `youtube`, `linkedin`, `googleBusinessUrl`,
`whatsappChannel`. Footer only renders the ones that are set.

## `doctors[]` (≥1 required)

| Field | Type | Req | Notes |
|---|---|---|---|
| `id` | string | ✅ | |
| `name` | string | ✅ | |
| `designation` | string | ✅ | |
| `qualifications` | string[] | ✅ (≥1) | |
| `specialization` | string | ✅ | Free text. Used for the "Related Doctors" match on `ServiceDetail` — a doctor shows up under a service if their `specialization` contains that service's `specialty` (case-insensitive substring). Keep this in mind when wording it. |
| `experienceYears` | number | ✅ | |
| `bio` | string | ✅ | Full bio, shown in the Doctors-page modal only (cards show a summary). |
| `photoPath` | string | ✅ | Falls back to an initials avatar (derived from `name`) if missing. |
| `videoIntroUrl` | URL | | Not yet wired into a component — reserved. |
| `registrationNumber` | string | | Shown in the doctor modal if present. |
| `consultingDays` | day-of-week[] | ✅ (≥1) | |
| `socialLinks.instagram/linkedin` | URL | | Doctor modal hides the row entirely if neither is set. |

## `services[]` (≥1 required)

| Field | Type | Req | Notes |
|---|---|---|---|
| `id` | string | ✅ | |
| `name` | string | ✅ | |
| `slug` | string, lowercase-hyphenated | ✅ | Drives the `/services/:slug` route. |
| `shortDescription` | string (≤200 chars) | ✅ | Card blurb. |
| `longDescription` | string | ✅ | Detail-page body. |
| `specialty` | string | | Should match one of `clinic.specialties` — powers the Services filter and `ServiceDetail`'s related-doctors match. Leave unset for a service you haven't categorized yet; it just won't appear under any specific filter pill (still shows under "All"). |
| `icon` **or** `imagePath` | string | at least one | The schema's `.refine()` fails validation if both are missing. In practice, only `imagePath` is rendered (via `SmartImage`) — `icon` is reserved for a future icon-based card style. |
| `priceRange` | string | | |
| `durationEstimate` | string | | |
| `beforeAfterImages` | `{before, after}[]` | | `ServiceDetail`'s Before/After section is hidden entirely if omitted or empty. |
| `faqs` | `{q, a}[]` | | `ServiceDetail`'s FAQ accordion is hidden entirely if omitted or empty. |
| `featured` | boolean (default `false`) | | Controls whether it appears in the Home page's `FeaturedServices` section. |

## `gallery[]` (default `[]`)

| Field | Type | Req | Notes |
|---|---|---|---|
| `id` | string | ✅ | |
| `type` | `"image" \| "video"` | ✅ | |
| `src` | string | ✅ | |
| `thumbnail` | string | | Video poster image. |
| `caption` | string | | |
| `category` | string | ✅ | Powers the Gallery page's filter pills (only shown when ≥2 distinct categories exist) and About page's "Inside Our Clinic" strip (filters on `category === "Clinic Interior"`, image type only). |

## `testimonials[]` (default `[]`)

| Field | Type | Req | Notes |
|---|---|---|---|
| `id` | string | ✅ | |
| `patientName` | string | ✅ | |
| `rating` | integer 1–5 | ✅ | |
| `text` | string | ✅ | |
| `photoPath` | string | | Not currently rendered by any component (reserved). |
| `videoUrl` | URL | | Reserved. |
| `source` | `"Google" \| "Manual"` (default `"Manual"`) | | Shown as "via Google" next to the name on the Home page slider. |

## `home` — homepage-only content

| Field | Type | Req | Notes |
|---|---|---|---|
| `hero.slides[]` | `{id, type, src, headline?, subheadline?}[]` | ✅ (≥1) | Rotating background. `headline`/`subheadline` fall back to `clinic.tagline` / `clinic.aboutShort` when omitted per-slide. |
| `hero.ctaPrimaryLabel` | string (default `"Book Appointment"`) | | Links to `/contact`. |
| `hero.ctaSecondaryLabel` | string | | If set, renders a `tel:` link using `contact.phone[0]`. Omit to show only the primary CTA. |
| `hero.autoRotateMs` | number (default `6000`) | | `0` disables auto-rotation (manual dots only). |
| `hero.reviewBadge` | `{rating, reviewCount, source}` | | Star-rating trust badge under the CTAs; omit to hide it entirely. |
| `highlights[]` | `{id, icon, value, label}[]` (1–6) | ✅ | Stat tiles under the Hero. `icon` is one of a fixed set: `years \| patients \| rating \| doctors \| smile \| shield` (see [`HighlightIcon.tsx`](../frontend/src/components/ui/HighlightIcon.tsx)). |
| `whyChooseUs[]` | `{id, icon, title, description}[]` (1–6) | ✅ | USP tiles; same icon vocabulary as `highlights`. |
| `appointmentCta.headline` | string | ✅ | Closing CTA band before the footer. |
| `appointmentCta.subtext` | string | | |
| `appointmentCta.ctaLabel` | string (default `"Book Appointment"`) | | |

## `appointmentForm`

| Field | Type | Req | Notes |
|---|---|---|---|
| `enabled` | boolean | ✅ | `false` hides the form entirely (`AppointmentForm` component early-returns). |
| `fieldsRequired` | string[] | ✅ (≥1) | Documented for reference; the current form UI always shows name+phone as required — extend `AppointmentForm.tsx` if you need this to drive which fields render. |
| `availableServices` | string[] | ✅ (≥1) | Populates the form's service `<select>`. Keep in sync with `services[].name` if you want the two lists to match, but they're independent — the form doesn't derive this from `services` automatically. |
| `notifyEmail` | email | ✅ | **Not used by the frontend** — the backend's own `TENANTS[clientSlug].notifyEmail` is the actual notification destination (deliberately not trusted from client-supplied config; see [`backend/lib/tenants.ts`](../backend/lib/tenants.ts)). Keep this field in sync manually for documentation purposes. |
| `notifyWhatsapp` | boolean | ✅ | Same caveat — actual gating is `backend` tenant's `enableWhatsappBusinessApi`. |
| `successMessage` | string | ✅ | Shown after a successful submit. |
| `redirectUrl` | URL | | Not yet wired into `AppointmentForm.tsx` — reserved for a future post-submit redirect. |

## `seo`

| Field | Type | Req | Notes |
|---|---|---|---|
| `keywords` | string[] (default `[]`) | | Not yet rendered as a `<meta name="keywords">` tag — reserved. |
| `structuredDataType` | `"Dentist" \| "MedicalClinic"` (default `"Dentist"`) | | Reserved for a future JSON-LD structured-data block. |
| `googleAnalyticsId` | string | | Reserved — no GA wiring exists yet. |
| `metaPixelId` | string | | Reserved. |

## `featureFlags`

| Field | Default | Effect |
|---|---|---|
| `showTestimonials` | `true` | Hides `TestimonialsSlider` on Home when `false`. |
| `showGallery` | `true` | Hides `GalleryPreview` on Home when `false`. |
| `showBlog` | `false` | Reserved — no blog page exists yet. |
| `enableDarkMode` | `false` | Reserved — `logoDarkPath` and Tailwind's `darkMode: "class"` are wired for this but no toggle UI exists yet. |
| `enableOnlineBooking` | `true` | Reserved — currently the appointment form is always the booking path when `appointmentForm.enabled` is true; this flag isn't separately checked yet. |
| `enableMultiLanguage` | `false` | Reserved — no i18n exists yet. |
| `enableWhatsappBusinessApi` | `false` | Gates `backend/lib/whatsapp.service.ts`'s actual send call. Leave `false` until a client pays for the WhatsApp Business API add-on (see [`backend/README.md`](../backend/README.md)). The free `wa.me` click-to-chat button is unaffected by this flag either way. |

---

**"Reserved" fields**: several fields above are validated by the schema and safe to fill in,
but no component reads them yet (`videoIntroUrl`, testimonial `photoPath`/`videoUrl`,
`appointmentForm.redirectUrl`, all of `seo` except description, most of `featureFlags`). They
exist so the schema doesn't need a breaking change when that UI eventually gets built — filling
them in early costs nothing today.
