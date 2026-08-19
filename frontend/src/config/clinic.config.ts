import { clinicConfigSchema, type ClinicConfig } from "./clinic.config.schema";

/**
 * THIS FILE IS THE ONLY PLACE CLIENT-SPECIFIC DATA LIVES.
 *
 * To onboard a new client:
 *  1. Copy this file's content into `clients/<new-slug>/clinic.config.json` for your records.
 *  2. Replace every value below with the new client's real data.
 *  3. Drop their images/videos into `public/assets/clients/<new-slug>/`.
 *  4. Update VITE_CLIENT_SLUG in .env to `<new-slug>`.
 * No component file should ever need to change.
 */
const rawConfig: ClinicConfig = {
  meta: {
    clientSlug: "demo-clinic",
    siteTitle: "Smile Care Dental Clinic | Best Dentist in Bandra, Mumbai",
    tagline: "Your Smile, Our Priority",
    metaDescription:
      "Smile Care Dental Clinic in Bandra, Mumbai offers painless root canal, dental implants, braces & cosmetic dentistry with 15+ years of trusted care.",
    faviconPath: "/assets/clients/demo-clinic/favicon.png",
    logoLightPath: "/assets/clients/demo-clinic/logo-light.png",
    logoDarkPath: "/assets/clients/demo-clinic/logo-dark.png",
    ogImagePath: "/assets/clients/demo-clinic/og-image.jpg",
  },

  brand: {
    colors: {
      primary: "#0E7490",
      secondary: "#0F172A",
      accent: "#EAB308",
      background: "#FFFFFF",
      text: "#0F172A",
    },
    fontHeading: "Poppins",
    fontBody: "Inter",
    borderRadius: "soft",
  },

  clinic: {
    name: "Smile Care Dental Clinic",
    legalName: "Smile Care Dental Clinic Pvt. Ltd.",
    establishedYear: 2009,
    tagline: "Your Smile, Our Priority",
    aboutShort:
      "A patient-first dental clinic in the heart of Bandra, combining modern technology with gentle, personalized care.",
    aboutLong:
      "Founded in 2009, Smile Care Dental Clinic has been serving the Bandra community for over 15 years with a commitment to painless, high-quality dental care.\n\nOur state-of-the-art facility is equipped with digital X-rays, intraoral cameras, and sterilization protocols that meet international standards. Whether you need a routine cleaning, a root canal, or a full smile makeover, our team of experienced specialists is here to make your visit comfortable and stress-free.",
    mission:
      "To make every patient's visit painless, transparent, and stress-free — through modern technology and genuine, judgment-free care.",
    vision:
      "To be Bandra's most trusted dental home for every generation of a family, the way we've been for the last 15+ years.",
    specialties: ["General Dentistry", "Orthodontics", "Dental Implants", "Cosmetic Dentistry", "Pediatric Dentistry"],
    accreditations: [
      { name: "Indian Dental Association", logoPath: "/assets/clients/demo-clinic/accreditations/ida.png" },
      { name: "ISO 9001:2015", logoPath: "/assets/clients/demo-clinic/accreditations/iso.png" },
    ],
  },

  contact: {
    phone: [
      { label: "Clinic", number: "+91 98765 43210" },
      { label: "Reception", number: "+91 22 2640 1234" },
    ],
    whatsappNumber: "919876543210",
    email: [
      { label: "General Enquiries", address: "hello@smilecaredental.example" },
      { label: "Appointments", address: "appointments@smilecaredental.example" },
    ],
    address: {
      line1: "12, Hill Road",
      line2: "Near Mount Mary Church",
      city: "Bandra West, Mumbai",
      state: "Maharashtra",
      pincode: "400050",
      // mapEmbedUrl intentionally omitted until the client hands over their real Google
      // Business embed link — MapTimingsWidget shows a branded placeholder instead of a
      // broken/fake Google embed. Add it back as a real "https://www.google.com/maps/embed?..."
      // URL during client onboarding.
      mapDirectionsUrl: "https://maps.google.com/?q=Smile+Care+Dental+Clinic+Bandra",
    },
    timings: [
      { day: "Monday", openTime: "10:00 AM", closeTime: "8:00 PM", isClosed: false },
      { day: "Tuesday", openTime: "10:00 AM", closeTime: "8:00 PM", isClosed: false },
      { day: "Wednesday", openTime: "10:00 AM", closeTime: "8:00 PM", isClosed: false },
      { day: "Thursday", openTime: "10:00 AM", closeTime: "8:00 PM", isClosed: false },
      { day: "Friday", openTime: "10:00 AM", closeTime: "8:00 PM", isClosed: false },
      { day: "Saturday", openTime: "10:00 AM", closeTime: "6:00 PM", isClosed: false },
      { day: "Sunday", openTime: "", closeTime: "", isClosed: true },
    ],
    emergencyContact: "+91 98765 00000",
  },

  socials: {
    instagram: "https://instagram.com/smilecaredental",
    facebook: "https://facebook.com/smilecaredental",
    youtube: "https://youtube.com/@smilecaredental",
    googleBusinessUrl: "https://g.page/smilecaredental",
  },

  doctors: [
    {
      id: "dr-anjali-mehta",
      name: "Dr. Anjali Mehta",
      designation: "Chief Dental Surgeon & Founder",
      qualifications: ["BDS", "MDS - Orthodontics"],
      specialization: "Orthodontics & Cosmetic Dentistry",
      experienceYears: 16,
      bio: "Dr. Anjali Mehta has been transforming smiles in Bandra for over 16 years, specializing in invisible aligners and smile makeovers.",
      photoPath: "/assets/clients/demo-clinic/doctors/anjali-mehta.jpg",
      registrationNumber: "MDC-12345",
      consultingDays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      socialLinks: { instagram: "https://instagram.com/dr.anjalimehta" },
    },
    {
      id: "dr-rohan-shah",
      name: "Dr. Rohan Shah",
      designation: "Implantologist",
      qualifications: ["BDS", "MDS - Oral Implantology"],
      specialization: "Dental Implants & Oral Surgery",
      experienceYears: 10,
      bio: "Dr. Rohan Shah is a specialist in single-sitting implants and full-mouth rehabilitation.",
      photoPath: "/assets/clients/demo-clinic/doctors/rohan-shah.jpg",
      registrationNumber: "MDC-67890",
      consultingDays: ["Monday", "Wednesday", "Friday", "Saturday"],
    },
  ],

  services: [
    {
      id: "svc-root-canal",
      name: "Root Canal Treatment",
      slug: "root-canal-treatment",
      shortDescription: "Painless, single-sitting root canal therapy using rotary endodontics.",
      longDescription:
        "Our root canal treatments use advanced rotary endodontic technology to ensure a virtually painless experience, often completed in a single sitting.",
      specialty: "General Dentistry",
      icon: "tooth-icon",
      priceRange: "₹3,500 - ₹8,000",
      durationEstimate: "45-60 mins",
      faqs: [
        { q: "Is root canal painful?", a: "With modern anesthesia and techniques, most patients feel little to no pain." },
      ],
      featured: true,
    },
    {
      id: "svc-implants",
      name: "Dental Implants",
      slug: "dental-implants",
      shortDescription: "Permanent tooth replacement with titanium implants.",
      longDescription:
        "Dental implants offer a long-term, natural-looking solution for missing teeth, restoring both function and confidence.",
      specialty: "Dental Implants",
      icon: "implant-icon",
      priceRange: "₹25,000 - ₹45,000 per implant",
      durationEstimate: "1-2 hours per session",
      featured: true,
    },
    {
      id: "svc-braces",
      name: "Braces & Invisible Aligners",
      slug: "braces-invisible-aligners",
      shortDescription: "Metal braces, ceramic braces, and clear aligners for all ages.",
      longDescription:
        "Whether you prefer traditional braces or discreet clear aligners, we design a treatment plan tailored to your smile goals and lifestyle.",
      specialty: "Orthodontics",
      icon: "braces-icon",
      featured: true,
    },
    {
      id: "svc-whitening",
      name: "Teeth Whitening",
      slug: "teeth-whitening",
      shortDescription: "In-clinic laser whitening for a brighter smile in one visit.",
      longDescription: "Our laser whitening treatment can lighten your teeth by several shades in under an hour.",
      specialty: "Cosmetic Dentistry",
      icon: "whitening-icon",
      featured: false,
    },
  ],

  gallery: [
    {
      id: "gal-1",
      type: "image",
      src: "/assets/clients/demo-clinic/gallery/clinic-reception.jpg",
      caption: "Our reception area",
      category: "Clinic Interior",
    },
    {
      id: "gal-2",
      type: "image",
      src: "/assets/clients/demo-clinic/gallery/treatment-room.jpg",
      caption: "State-of-the-art treatment room",
      category: "Clinic Interior",
    },
    {
      id: "gal-3",
      type: "video",
      src: "/assets/clients/demo-clinic/gallery/clinic-tour.mp4",
      thumbnail: "/assets/clients/demo-clinic/gallery/clinic-tour-thumb.jpg",
      caption: "Take a virtual tour of our clinic",
      category: "Clinic Interior",
    },
  ],

  testimonials: [
    {
      id: "test-1",
      patientName: "Priya Sharma",
      rating: 5,
      text: "Dr. Mehta made my root canal completely painless. Highly recommend Smile Care!",
      photoPath: "/assets/clients/demo-clinic/testimonials/priya-sharma.jpg",
      source: "Google",
    },
    {
      id: "test-2",
      patientName: "Arjun Kapoor",
      rating: 5,
      text: "Got my implants done here — professional staff and great results.",
      source: "Manual",
    },
  ],

  home: {
    hero: {
      slides: [
        {
          id: "hero-1",
          type: "image",
          src: "/assets/clients/demo-clinic/hero/hero-1.jpg",
          headline: "Your Smile, Our Priority",
          subheadline: "Painless root canals, implants & smile makeovers in the heart of Bandra.",
        },
        {
          id: "hero-2",
          type: "image",
          src: "/assets/clients/demo-clinic/hero/hero-2.jpg",
          headline: "15+ Years of Gentle, Modern Dental Care",
          subheadline: "Digital X-rays, painless procedures, and a team that treats you like family.",
        },
      ],
      ctaPrimaryLabel: "Book Appointment",
      ctaSecondaryLabel: "Call +91 98765 43210",
      autoRotateMs: 6000,
      reviewBadge: {
        rating: 4.9,
        reviewCount: 780,
        source: "Google",
      },
    },
    highlights: [
      { id: "hl-years", icon: "years", value: "15+", label: "Years of Experience" },
      { id: "hl-patients", icon: "patients", value: "10,000+", label: "Happy Patients" },
      { id: "hl-rating", icon: "rating", value: "4.9★", label: "Google Rating" },
      { id: "hl-doctors", icon: "doctors", value: "2", label: "Expert Doctors" },
    ],
    whyChooseUs: [
      {
        id: "wcu-emergency",
        icon: "shield",
        title: "Same-Day Emergency Care",
        description: "Sudden toothache or dental emergency? We keep same-day slots open for urgent care.",
      },
      {
        id: "wcu-painless",
        icon: "smile",
        title: "Painless, Modern Techniques",
        description: "Digital X-rays and gentle, rotary-endodontic tools make every visit comfortable.",
      },
      {
        id: "wcu-experience",
        icon: "years",
        title: "15+ Years of Trusted Care",
        description: "A neighborhood clinic families have relied on since 2009.",
      },
      {
        id: "wcu-team",
        icon: "doctors",
        title: "Specialist-Led Team",
        description: "Orthodontics, implants, and cosmetic dentistry — all under one roof.",
      },
    ],
    appointmentCta: {
      headline: "Ready for a Healthier Smile?",
      subtext: "Book your appointment today and let our team take care of the rest.",
      ctaLabel: "Book Appointment",
    },
  },

  appointmentForm: {
    enabled: true,
    fieldsRequired: ["name", "phone"],
    availableServices: [
      "Root Canal Treatment",
      "Dental Implants",
      "Braces & Invisible Aligners",
      "Teeth Whitening",
      "General Checkup",
    ],
    notifyEmail: "appointments@smilecaredental.example",
    notifyWhatsapp: true,
    successMessage: "Thank you! We've received your request and will call you shortly to confirm your appointment.",
  },

  seo: {
    keywords: ["dentist in bandra", "root canal mumbai", "dental implants bandra", "best dentist mumbai"],
    structuredDataType: "Dentist",
  },

  featureFlags: {
    showTestimonials: true,
    showGallery: true,
    showBlog: false,
    enableDarkMode: false,
    enableOnlineBooking: true,
    enableMultiLanguage: false,
    enableWhatsappBusinessApi: false,
  },
};

// Fails fast (build/boot time) if this client's data doesn't match the schema —
// e.g. a bad hex color or a missing required field never reaches production.
export const clinicConfig: ClinicConfig = clinicConfigSchema.parse(rawConfig);
