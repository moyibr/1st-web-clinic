import { z } from "zod";

/**
 * Single source of truth for the shape of a client's config. Every clinic.config.ts
 * (one per client) is parsed through `clinicConfigSchema.parse(...)` at build/boot time —
 * a client with a missing phone number or a malformed hex color fails the build instead of
 * shipping broken UI to production.
 */

const hexColor = z.string().regex(/^#([0-9A-Fa-f]{6}|[0-9A-Fa-f]{3})$/, "Must be a hex color, e.g. #0e7490");

const dayOfWeek = z.enum([
  "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday",
]);

// ---------- meta ----------
const metaSchema = z.object({
  clientSlug: z.string().min(1),
  siteTitle: z.string().min(1),
  tagline: z.string().min(1),
  metaDescription: z.string().min(1).max(300),
  faviconPath: z.string().min(1),
  logoLightPath: z.string().min(1),
  logoDarkPath: z.string().min(1),
  ogImagePath: z.string().min(1),
});

// ---------- brand ----------
const brandSchema = z.object({
  colors: z.object({
    primary: hexColor,
    secondary: hexColor,
    accent: hexColor,
    background: hexColor,
    text: hexColor,
  }),
  fontHeading: z.string().min(1),
  fontBody: z.string().min(1),
  borderRadius: z.enum(["soft", "sharp", "rounded"]),
});

// ---------- clinic ----------
const clinicSchema = z.object({
  name: z.string().min(1),
  legalName: z.string().optional(),
  establishedYear: z.number().int().min(1900).max(new Date().getFullYear()),
  tagline: z.string().min(1),
  aboutShort: z.string().min(1).max(300),
  aboutLong: z.string().min(1),
  // Optional: About page hides the mission/vision block entirely when neither is set.
  mission: z.string().optional(),
  vision: z.string().optional(),
  specialties: z.array(z.string()).min(1),
  accreditations: z.array(
    z.object({ name: z.string().min(1), logoPath: z.string().min(1) })
  ).default([]),
});

// ---------- contact ----------
const contactSchema = z.object({
  phone: z.array(z.object({ label: z.string().min(1), number: z.string().min(1) })).min(1),
  whatsappNumber: z.string().regex(/^\d{10,15}$/, "Digits only, with country code, no + or spaces (e.g. 919876543210)"),
  email: z.array(z.object({ label: z.string().min(1), address: z.string().email() })).min(1),
  address: z.object({
    line1: z.string().min(1),
    line2: z.string().optional(),
    city: z.string().min(1),
    state: z.string().min(1),
    pincode: z.string().min(1),
    mapEmbedUrl: z.string().url().optional(),
    mapDirectionsUrl: z.string().url().optional(),
  }),
  timings: z.array(
    z.object({
      day: dayOfWeek,
      openTime: z.string(),
      closeTime: z.string(),
      isClosed: z.boolean().default(false),
    })
  ).length(7, "Provide all 7 days, use isClosed for off-days"),
  emergencyContact: z.string().optional(),
});

// ---------- socials ----------
const socialsSchema = z.object({
  instagram: z.string().url().optional(),
  facebook: z.string().url().optional(),
  youtube: z.string().url().optional(),
  linkedin: z.string().url().optional(),
  googleBusinessUrl: z.string().url().optional(),
  whatsappChannel: z.string().url().optional(),
});

// ---------- doctors ----------
const doctorSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  designation: z.string().min(1),
  qualifications: z.array(z.string()).min(1),
  specialization: z.string().min(1),
  experienceYears: z.number().int().min(0),
  bio: z.string().min(1),
  photoPath: z.string().min(1),
  videoIntroUrl: z.string().url().optional(),
  registrationNumber: z.string().optional(),
  consultingDays: z.array(dayOfWeek).min(1),
  socialLinks: z.object({
    instagram: z.string().url().optional(),
    linkedin: z.string().url().optional(),
  }).optional(),
});

// ---------- services ----------
const serviceSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  slug: z.string().regex(/^[a-z0-9-]+$/, "lowercase, hyphenated"),
  shortDescription: z.string().min(1).max(200),
  longDescription: z.string().min(1),
  // Should match one of clinic.specialties when set — powers the Services page filter.
  // Left optional/free-text (not a z.enum of specialties) so a service can exist before
  // its specialty bucket is decided, without failing validation.
  specialty: z.string().optional(),
  icon: z.string().optional(),
  imagePath: z.string().optional(),
  priceRange: z.string().optional(),
  durationEstimate: z.string().optional(),
  beforeAfterImages: z.array(
    z.object({ before: z.string().min(1), after: z.string().min(1) })
  ).optional(),
  faqs: z.array(z.object({ q: z.string().min(1), a: z.string().min(1) })).optional(),
  featured: z.boolean().default(false),
}).refine((s) => s.icon || s.imagePath, {
  message: "A service needs either an icon or an imagePath",
});

// ---------- gallery ----------
const galleryItemSchema = z.object({
  id: z.string().min(1),
  type: z.enum(["image", "video"]),
  src: z.string().min(1),
  thumbnail: z.string().optional(),
  caption: z.string().optional(),
  category: z.string().min(1),
});

// ---------- testimonials ----------
const testimonialSchema = z.object({
  id: z.string().min(1),
  patientName: z.string().min(1),
  rating: z.number().int().min(1).max(5),
  text: z.string().min(1),
  photoPath: z.string().optional(),
  videoUrl: z.string().url().optional(),
  source: z.enum(["Google", "Manual"]).default("Manual"),
});

// ---------- home page (hero, highlights strip) ----------
const heroSlideSchema = z.object({
  id: z.string().min(1),
  type: z.enum(["image", "video"]),
  src: z.string().min(1),
  /** Optional headline/subheadline override for this slide; falls back to clinic.tagline / clinic.aboutShort when omitted. */
  headline: z.string().optional(),
  subheadline: z.string().optional(),
});

const highlightSchema = z.object({
  id: z.string().min(1),
  // A small fixed icon vocabulary keeps this config-driven without shipping arbitrary SVG/HTML through JSON.
  icon: z.enum(["years", "patients", "rating", "doctors", "smile", "shield"]),
  value: z.string().min(1), // e.g. "15+", "10,000+", "4.9"
  label: z.string().min(1), // e.g. "Years of Experience"
});

const whyChooseUsItemSchema = z.object({
  id: z.string().min(1),
  icon: z.enum(["years", "patients", "rating", "doctors", "smile", "shield"]),
  title: z.string().min(1), // e.g. "Same-Day Emergency Care"
  description: z.string().min(1),
});

const homeSchema = z.object({
  hero: z.object({
    slides: z.array(heroSlideSchema).min(1),
    ctaPrimaryLabel: z.string().min(1).default("Book Appointment"),
    ctaSecondaryLabel: z.string().optional(),
    autoRotateMs: z.number().int().min(0).default(6000), // 0 disables auto-rotate
    reviewBadge: z.object({
      rating: z.number().min(0).max(5),
      reviewCount: z.number().int().min(0),
      source: z.string().min(1), // e.g. "Google"
    }).optional(),
  }),
  highlights: z.array(highlightSchema).min(1).max(6),
  whyChooseUs: z.array(whyChooseUsItemSchema).min(1).max(6),
  appointmentCta: z.object({
    headline: z.string().min(1),
    subtext: z.string().optional(),
    ctaLabel: z.string().min(1).default("Book Appointment"),
  }),
});

// ---------- appointment form ----------
const appointmentFormSchema = z.object({
  enabled: z.boolean(),
  fieldsRequired: z.array(z.string()).min(1),
  availableServices: z.array(z.string()).min(1),
  notifyEmail: z.string().email(),
  notifyWhatsapp: z.boolean(),
  successMessage: z.string().min(1),
  redirectUrl: z.string().url().optional(),
});

// ---------- seo ----------
const seoSchema = z.object({
  keywords: z.array(z.string()).default([]),
  structuredDataType: z.enum(["Dentist", "MedicalClinic"]).default("Dentist"),
  googleAnalyticsId: z.string().optional(),
  metaPixelId: z.string().optional(),
});

// ---------- feature flags ----------
const featureFlagsSchema = z.object({
  showTestimonials: z.boolean().default(true),
  showGallery: z.boolean().default(true),
  showBlog: z.boolean().default(false),
  enableDarkMode: z.boolean().default(false),
  enableOnlineBooking: z.boolean().default(true),
  enableMultiLanguage: z.boolean().default(false),
  // Free wa.me click-to-chat is always available. This flag gates the PAID WhatsApp
  // Business API add-on (backend/lib/whatsapp.service.ts) — leave false until a client
  // upgrades; flipping it on later needs no component changes, only backend env/service wiring.
  enableWhatsappBusinessApi: z.boolean().default(false),
});

// ---------- root ----------
export const clinicConfigSchema = z.object({
  meta: metaSchema,
  brand: brandSchema,
  clinic: clinicSchema,
  contact: contactSchema,
  socials: socialsSchema,
  doctors: z.array(doctorSchema).min(1),
  services: z.array(serviceSchema).min(1),
  gallery: z.array(galleryItemSchema).default([]),
  testimonials: z.array(testimonialSchema).default([]),
  home: homeSchema,
  appointmentForm: appointmentFormSchema,
  seo: seoSchema,
  featureFlags: featureFlagsSchema,
});

export type ClinicConfig = z.infer<typeof clinicConfigSchema>;
