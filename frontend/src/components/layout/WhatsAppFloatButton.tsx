import { useClinicConfig } from "@/hooks/useClinicConfig";

/**
 * Free click-to-chat link (wa.me) — no WhatsApp Business API cost/approval needed.
 * Gated by featureFlags.enableWhatsappBusinessApi staying false; when a client later
 * upgrades to the paid Business API add-on, only that flag + backend service flip —
 * this component doesn't change.
 */
export function WhatsAppFloatButton() {
  const config = useClinicConfig();
  const { contact } = config;

  if (!contact.whatsappNumber) return null;

  const message = encodeURIComponent(
    `Hi ${config.clinic.name}, I'd like to book an appointment.`
  );
  const href = `https://wa.me/${contact.whatsappNumber}?text=${message}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105"
    >
      WA
    </a>
  );
}
