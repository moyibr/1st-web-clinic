import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useClinicConfig } from "@/hooks/useClinicConfig";
import { SmartImage } from "@/components/ui/SmartImage";

function FaqAccordion({ faqs }: { faqs: { q: string; a: string }[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="mt-4 divide-y divide-black/5 rounded-brand border border-black/5">
      {faqs.map((f, i) => {
        const open = openIndex === i;
        return (
          <div key={i}>
            <button
              onClick={() => setOpenIndex(open ? null : i)}
              aria-expanded={open}
              className="flex w-full items-center justify-between gap-4 p-4 text-left font-medium"
            >
              {f.q}
              <span className={`shrink-0 transition-transform ${open ? "rotate-45" : ""}`}>+</span>
            </button>
            {open && <p className="px-4 pb-4 text-sm text-ink/70">{f.a}</p>}
          </div>
        );
      })}
    </div>
  );
}

export default function ServiceDetail() {
  const { slug } = useParams();
  const { services, doctors } = useClinicConfig();
  const service = services.find((s) => s.slug === slug);

  if (!service) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16 text-center">
        <p className="text-ink/70">Service not found.</p>
        <Link to="/services" className="mt-4 inline-block text-primary underline underline-offset-2">
          ← Back to Services
        </Link>
      </main>
    );
  }

  // A doctor is "related" if their free-text specialization mentions this service's
  // specialty bucket — no rigid ID linking required, but gracefully shows nothing if
  // no doctor's bio happens to match yet (e.g. a general service with no specialist).
  const relatedDoctors = service.specialty
    ? doctors.filter((d) => d.specialization.toLowerCase().includes(service.specialty!.toLowerCase()))
    : [];

  return (
    <main className="mx-auto max-w-4xl px-4 py-16">
      <Link to="/services" className="text-sm text-primary underline underline-offset-2">
        ← Back to Services
      </Link>

      <div className="mt-4">
        {service.specialty && (
          <span className="text-xs font-semibold uppercase tracking-wide text-primary">{service.specialty}</span>
        )}
        <h1 className="mt-1 font-heading text-4xl font-bold">{service.name}</h1>
      </div>

      <SmartImage src={service.imagePath} alt={service.name} className="mt-6 h-64 w-full rounded-brand object-cover" />

      <div className="mt-6 flex flex-wrap gap-6 text-sm text-ink/70">
        {service.priceRange && (
          <div>
            <span className="font-medium text-ink">Price: </span>
            {service.priceRange}
          </div>
        )}
        {service.durationEstimate && (
          <div>
            <span className="font-medium text-ink">Duration: </span>
            {service.durationEstimate}
          </div>
        )}
      </div>

      <p className="mt-6 whitespace-pre-line leading-relaxed text-ink/80">{service.longDescription}</p>

      {/* Before/After — hidden entirely when not provided for this service */}
      {service.beforeAfterImages && service.beforeAfterImages.length > 0 && (
        <section className="mt-12">
          <h2 className="font-heading text-xl font-semibold">Before &amp; After</h2>
          <div className="mt-4 grid gap-6 sm:grid-cols-2">
            {service.beforeAfterImages.map((pair, i) => (
              <div key={i} className="grid grid-cols-2 gap-2">
                <div>
                  <SmartImage src={pair.before} alt="Before" className="h-40 w-full rounded-brand object-cover" />
                  <p className="mt-1 text-center text-xs text-ink/60">Before</p>
                </div>
                <div>
                  <SmartImage src={pair.after} alt="After" className="h-40 w-full rounded-brand object-cover" />
                  <p className="mt-1 text-center text-xs text-ink/60">After</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* FAQs — hidden entirely when none are configured */}
      {service.faqs && service.faqs.length > 0 && (
        <section className="mt-12">
          <h2 className="font-heading text-xl font-semibold">Frequently Asked Questions</h2>
          <FaqAccordion faqs={service.faqs} />
        </section>
      )}

      {/* Related doctors — hidden entirely when no specialization matches */}
      {relatedDoctors.length > 0 && (
        <section className="mt-12">
          <h2 className="font-heading text-xl font-semibold">Doctors Who Offer This</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            {relatedDoctors.map((d) => (
              <div key={d.id} className="flex items-center gap-3 rounded-brand border border-black/5 p-3">
                <SmartImage
                  variant="avatar"
                  label={d.name}
                  src={d.photoPath}
                  alt={d.name}
                  className="h-14 w-14 shrink-0 rounded-full object-cover"
                />
                <div>
                  <p className="font-semibold">{d.name}</p>
                  <p className="text-sm text-ink/60">{d.designation}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      <div className="mt-12 text-center">
        <Link
          to="/contact"
          className="inline-block rounded-brand bg-primary px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
        >
          Book This Service
        </Link>
      </div>
    </main>
  );
}
