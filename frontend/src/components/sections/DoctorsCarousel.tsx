import { useRef } from "react";
import { Link } from "react-router-dom";
import { useClinicConfig } from "@/hooks/useClinicConfig";
import { SmartImage } from "@/components/ui/SmartImage";

/**
 * Horizontal-scroll carousel with prev/next arrows (South SF Dental Care's slider pattern)
 * rather than a static grid — works the same whether a client has 2 doctors or 8, with no
 * layout changes needed. Scoped to the home page as a teaser; full bios live on /doctors.
 */
export function DoctorsCarousel() {
  const { doctors } = useClinicConfig();
  const trackRef = useRef<HTMLDivElement>(null);

  function scroll(direction: "prev" | "next") {
    const el = trackRef.current;
    if (!el) return;
    const cardWidth = el.firstElementChild?.clientWidth ?? 320;
    el.scrollBy({ left: direction === "next" ? cardWidth + 24 : -(cardWidth + 24), behavior: "smooth" });
  }

  if (doctors.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="flex items-end justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Our Team</p>
          <h2 className="mt-1 font-heading text-3xl font-bold">Meet Our Doctors</h2>
        </div>

        {doctors.length > 2 && (
          <div className="hidden gap-2 md:flex">
            <button
              aria-label="Previous doctor"
              onClick={() => scroll("prev")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 transition-colors hover:bg-primary/10"
            >
              ‹
            </button>
            <button
              aria-label="Next doctor"
              onClick={() => scroll("next")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 transition-colors hover:bg-primary/10"
            >
              ›
            </button>
          </div>
        )}
      </div>

      <div
        ref={trackRef}
        className="mt-8 flex snap-x snap-mandatory gap-6 overflow-x-auto scroll-smooth pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {doctors.map((doc) => (
          <article
            key={doc.id}
            className="w-72 flex-none snap-start overflow-hidden rounded-brand border border-black/5 bg-surface shadow-sm"
          >
            <SmartImage
              variant="avatar"
              label={doc.name}
              src={doc.photoPath}
              alt={doc.name}
              className="h-56 w-full object-cover"
            />
            <div className="p-4">
              <h3 className="font-heading text-lg font-semibold">{doc.name}</h3>
              <p className="text-sm font-medium text-primary">{doc.designation}</p>
              <p className="mt-1 text-sm text-ink/70">{doc.qualifications.join(", ")}</p>
              <p className="mt-2 text-sm text-ink/60">{doc.experienceYears}+ years experience</p>
              <Link
                to="/contact"
                className="mt-4 inline-block text-sm font-semibold text-primary underline underline-offset-2"
              >
                Book with {doc.name.replace(/^Dr\.?\s*/, "Dr. ")}
              </Link>
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 text-center">
        <Link to="/doctors" className="text-sm font-semibold text-primary underline underline-offset-2">
          Meet the Full Team →
        </Link>
      </div>
    </section>
  );
}
