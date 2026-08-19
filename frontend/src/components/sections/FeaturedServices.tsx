import { Link } from "react-router-dom";
import { useClinicConfig } from "@/hooks/useClinicConfig";
import { SmartImage } from "@/components/ui/SmartImage";

/**
 * Rounded photo-cards for `services` marked `featured: true` — Dentologie's card pattern
 * (image top, text below, pill CTA). `imagePath` is optional in the schema, so a service
 * without one just shows SmartImage's branded fallback instead of an empty box.
 */
export function FeaturedServices() {
  const { services } = useClinicConfig();
  const featured = services.filter((s) => s.featured);

  if (featured.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">What We Offer</p>
        <h2 className="mt-1 font-heading text-3xl font-bold">Dental Services</h2>
      </div>

      <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
        {featured.map((s) => (
          <Link
            key={s.id}
            to={`/services/${s.slug}`}
            className="group overflow-hidden rounded-brand border border-black/5 bg-surface shadow-sm transition-shadow hover:shadow-md"
          >
            <SmartImage
              src={s.imagePath}
              alt={s.name}
              className="h-40 w-full object-cover transition-transform group-hover:scale-105"
            />
            <div className="p-4">
              <h3 className="font-heading text-lg font-semibold">{s.name}</h3>
              <p className="mt-1 text-sm text-ink/70">{s.shortDescription}</p>
              <span className="mt-3 inline-block text-sm font-semibold text-primary">Learn More →</span>
            </div>
          </Link>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link to="/services" className="text-sm font-semibold text-primary underline underline-offset-2">
          View All Services →
        </Link>
      </div>
    </section>
  );
}
