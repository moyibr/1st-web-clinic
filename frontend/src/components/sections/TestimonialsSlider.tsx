import { useEffect, useState } from "react";
import { useClinicConfig } from "@/hooks/useClinicConfig";

const AUTO_ROTATE_MS = 7000;

/**
 * Single-quote-at-a-time carousel (Dentologie's "Patient Love" pattern) instead of a grid —
 * reads well whether a client has 2 testimonials or 20, no layout breakpoints to maintain.
 */
export function TestimonialsSlider() {
  const { testimonials } = useClinicConfig();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (testimonials.length < 2) return;
    const id = setInterval(() => setActive((i) => (i + 1) % testimonials.length), AUTO_ROTATE_MS);
    return () => clearInterval(id);
  }, [testimonials.length]);

  if (testimonials.length === 0) return null;

  const t = testimonials[active];

  function go(direction: "prev" | "next") {
    setActive((i) => {
      const len = testimonials.length;
      return direction === "next" ? (i + 1) % len : (i - 1 + len) % len;
    });
  }

  return (
    <section className="bg-secondary/5 py-20">
      <div className="mx-auto max-w-2xl px-4 text-center">
        <h2 className="font-heading text-3xl font-bold">What Our Patients Say</h2>

        <div className="mt-10">
          <span className="font-heading text-6xl leading-none text-accent" aria-hidden="true">
            &ldquo;
          </span>
          <p className="mx-auto -mt-4 max-w-xl text-xl text-ink/90">{t.text}</p>
          <p className="mt-6 font-semibold">
            — {t.patientName}
            {t.source === "Google" && <span className="ml-1 text-sm font-normal text-ink/50">via Google</span>}
          </p>
          <p className="mt-1 text-accent" aria-hidden="true">
            {"★".repeat(t.rating)}
            {"☆".repeat(5 - t.rating)}
          </p>
        </div>

        {testimonials.length > 1 && (
          <div className="mt-8 flex items-center justify-center gap-4">
            <button
              aria-label="Previous testimonial"
              onClick={() => go("prev")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 transition-colors hover:bg-primary/10"
            >
              ‹
            </button>

            <div className="flex gap-2">
              {testimonials.map((item, i) => (
                <button
                  key={item.id}
                  aria-label={`Go to testimonial ${i + 1}`}
                  onClick={() => setActive(i)}
                  className={`h-2 rounded-full transition-all ${
                    i === active ? "w-6 bg-primary" : "w-2 bg-primary/30"
                  }`}
                />
              ))}
            </div>

            <button
              aria-label="Next testimonial"
              onClick={() => go("next")}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-black/10 transition-colors hover:bg-primary/10"
            >
              ›
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
