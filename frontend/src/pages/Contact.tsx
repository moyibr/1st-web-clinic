import { useClinicConfig } from "@/hooks/useClinicConfig";
import { AppointmentForm } from "@/components/sections/AppointmentForm";
import { MapTimingsWidget } from "@/components/sections/MapTimingsWidget";

export default function Contact() {
  const config = useClinicConfig();
  const { contact, clinic } = config;
  const primaryPhone = contact.phone[0]?.number;

  return (
    <main>
      <section className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Get In Touch</p>
          <h1 className="mt-1 font-heading text-4xl font-bold">Book an Appointment</h1>

          {/* Quick contact actions — same tel:/wa.me pattern used in Hero and WhatsAppFloatButton */}
          <div className="mt-6 flex flex-wrap gap-3">
            {primaryPhone && (
              <a
                href={`tel:${primaryPhone.replace(/\s+/g, "")}`}
                className="flex items-center gap-2 rounded-brand border border-black/10 px-4 py-2 text-sm font-semibold transition-colors hover:border-primary/40"
              >
                📞 Call {primaryPhone}
              </a>
            )}
            {contact.whatsappNumber && (
              <a
                href={`https://wa.me/${contact.whatsappNumber}?text=${encodeURIComponent(
                  `Hi ${clinic.name}, I'd like to book an appointment.`
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 rounded-brand bg-[#25D366] px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
              >
                WhatsApp Us
              </a>
            )}
          </div>

          <div className="mt-8">
            <AppointmentForm />
          </div>
        </div>

        <div>
          <h2 className="font-heading text-xl font-semibold">Other Ways to Reach Us</h2>
          <ul className="mt-4 space-y-2 text-sm text-ink/70">
            {contact.phone.map((p) => (
              <li key={p.number}>
                <span className="font-medium text-ink">{p.label}:</span>{" "}
                <a href={`tel:${p.number.replace(/\s+/g, "")}`} className="hover:text-primary">
                  {p.number}
                </a>
              </li>
            ))}
            {contact.email.map((e) => (
              <li key={e.address}>
                <span className="font-medium text-ink">{e.label}:</span>{" "}
                <a href={`mailto:${e.address}`} className="hover:text-primary">
                  {e.address}
                </a>
              </li>
            ))}
            {contact.emergencyContact && (
              <li>
                <span className="font-medium text-ink">Emergency:</span>{" "}
                <a href={`tel:${contact.emergencyContact.replace(/\s+/g, "")}`} className="hover:text-primary">
                  {contact.emergencyContact}
                </a>
              </li>
            )}
          </ul>
        </div>
      </section>

      <MapTimingsWidget />
    </main>
  );
}
