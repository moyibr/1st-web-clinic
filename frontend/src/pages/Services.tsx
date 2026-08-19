import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useClinicConfig } from "@/hooks/useClinicConfig";
import { SmartImage } from "@/components/ui/SmartImage";

const ALL = "All";

export default function Services() {
  const { services, clinic } = useClinicConfig();
  const [activeFilter, setActiveFilter] = useState<string>(ALL);

  // Only show filter pills for specialties that actually have a matching service —
  // avoids a dead-end filter that lands on an empty grid.
  const availableSpecialties = useMemo(() => {
    const used = new Set(services.map((s) => s.specialty).filter(Boolean) as string[]);
    return clinic.specialties.filter((s) => used.has(s));
  }, [services, clinic.specialties]);

  const filtered = activeFilter === ALL ? services : services.filter((s) => s.specialty === activeFilter);

  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">What We Offer</p>
        <h1 className="mt-1 font-heading text-4xl font-bold">Our Services</h1>
      </div>

      {availableSpecialties.length > 1 && (
        <div className="mt-8 flex flex-wrap justify-center gap-2">
          {[ALL, ...availableSpecialties].map((s) => (
            <button
              key={s}
              onClick={() => setActiveFilter(s)}
              className={`rounded-brand border px-4 py-1.5 text-sm font-medium transition-colors ${
                activeFilter === s
                  ? "border-primary bg-primary text-white"
                  : "border-black/10 text-ink/70 hover:border-primary/40"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      )}

      {filtered.length === 0 ? (
        <p className="mt-16 text-center text-ink/60">No services found in this category yet.</p>
      ) : (
        <div className="mt-10 grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {filtered.map((s) => (
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
                {s.specialty && (
                  <span className="text-xs font-semibold uppercase tracking-wide text-primary">{s.specialty}</span>
                )}
                <h2 className="mt-1 font-heading text-lg font-semibold">{s.name}</h2>
                <p className="mt-1 text-sm text-ink/70">{s.shortDescription}</p>
                {s.priceRange && <p className="mt-2 text-sm font-medium text-ink/80">{s.priceRange}</p>}
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
