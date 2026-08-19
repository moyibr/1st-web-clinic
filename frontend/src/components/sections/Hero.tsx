import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useClinicConfig } from "@/hooks/useClinicConfig";
import { SmartImage, PhotoFallback } from "@/components/ui/SmartImage";

/**
 * Full-bleed rotating hero, patterned after the reference sites: dark-scrim overlay for
 * text legibility over a real photo (not a flat color/gradient), big heading-font headline,
 * a solid + outline CTA pair, and a star-rating trust badge directly under the CTAs.
 * Everything — slides, copy, CTA labels, rating — comes from `config.home.hero`.
 */
export function Hero() {
  const config = useClinicConfig();
  const { slides, ctaPrimaryLabel, ctaSecondaryLabel, autoRotateMs, reviewBadge } = config.home.hero;
  const [active, setActive] = useState(0);
  // Tracks per-slide video failures separately from SmartImage's own internal state (images).
  const [failedVideos, setFailedVideos] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (!autoRotateMs || slides.length < 2) return;
    const id = setInterval(() => setActive((i) => (i + 1) % slides.length), autoRotateMs);
    return () => clearInterval(id);
  }, [autoRotateMs, slides.length]);

  const slide = slides[active];
  const headline = slide.headline ?? config.clinic.tagline;
  const subheadline = slide.subheadline ?? config.clinic.aboutShort;
  const primaryPhone = config.contact.phone[0]?.number;

  return (
    <section className="relative isolate flex min-h-[85vh] items-center overflow-hidden">
      {/* Slides */}
      {slides.map((s, i) => (
        <div
          key={s.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
          aria-hidden={i !== active}
        >
          {s.type === "video" ? (
            failedVideos[s.id] ? (
              <PhotoFallback className="h-full w-full" />
            ) : (
              <video
                src={s.src}
                autoPlay
                muted
                loop
                playsInline
                className="h-full w-full object-cover"
                onError={() => setFailedVideos((prev) => ({ ...prev, [s.id]: true }))}
              />
            )
          ) : (
            <SmartImage src={s.src} alt="" className="h-full w-full object-cover" />
          )}
          {/* Scrim: darkens the photo so white text stays legible, using the brand's secondary color */}
          <div className="absolute inset-0 bg-gradient-to-t from-secondary/80 via-secondary/40 to-secondary/20" />
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 mx-auto max-w-3xl px-4 text-center text-white">
        <h1 className="font-heading text-4xl font-bold leading-tight md:text-6xl">{headline}</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/90">{subheadline}</p>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/contact"
            className="rounded-brand bg-primary px-6 py-3 font-semibold text-white transition-opacity hover:opacity-90"
          >
            {ctaPrimaryLabel}
          </Link>
          {ctaSecondaryLabel && primaryPhone && (
            <a
              href={`tel:${primaryPhone.replace(/\s+/g, "")}`}
              className="rounded-brand border border-white/70 px-6 py-3 font-semibold text-white transition-colors hover:bg-white/10"
            >
              {ctaSecondaryLabel}
            </a>
          )}
        </div>

        {reviewBadge && (
          <div className="mt-6 flex items-center justify-center gap-2 text-sm text-white/90">
            <span className="text-accent" aria-hidden="true">
              {"★".repeat(Math.round(reviewBadge.rating))}
              {"☆".repeat(5 - Math.round(reviewBadge.rating))}
            </span>
            <span>
              {reviewBadge.rating.toFixed(1)} · {reviewBadge.reviewCount.toLocaleString()}+ reviews on{" "}
              {reviewBadge.source}
            </span>
          </div>
        )}
      </div>

      {/* Slide controls */}
      {slides.length > 1 && (
        <div className="absolute bottom-6 left-1/2 z-10 flex -translate-x-1/2 gap-2">
          {slides.map((s, i) => (
            <button
              key={s.id}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => setActive(i)}
              className={`h-2 rounded-full transition-all ${
                i === active ? "w-6 bg-white" : "w-2 bg-white/50"
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
