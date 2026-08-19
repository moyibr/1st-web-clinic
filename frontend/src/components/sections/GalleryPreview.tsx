import { Link } from "react-router-dom";
import { useClinicConfig } from "@/hooks/useClinicConfig";
import { SmartImage } from "@/components/ui/SmartImage";

const PREVIEW_COUNT = 6;

/**
 * Home-page teaser grid of the first few `gallery` items, linking through to the full
 * /gallery page. Video items show a static PhotoFallback tile here (no inline playback
 * on the homepage) rather than an embedded <video>, keeping this section lightweight.
 */
export function GalleryPreview() {
  const { gallery } = useClinicConfig();
  const items = gallery.slice(0, PREVIEW_COUNT);

  if (items.length === 0) return null;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Take a Look Inside</p>
        <h2 className="mt-1 font-heading text-3xl font-bold">Our Clinic</h2>
      </div>

      <div className="mt-10 grid grid-cols-2 gap-4 md:grid-cols-3">
        {items.map((item) => (
          <div key={item.id} className="relative overflow-hidden rounded-brand">
            {item.type === "image" ? (
              <SmartImage
                src={item.src}
                alt={item.caption ?? ""}
                className="h-40 w-full object-cover transition-transform hover:scale-105 md:h-48"
              />
            ) : (
              <div className="relative">
                <SmartImage
                  src={item.thumbnail}
                  alt={item.caption ?? ""}
                  className="h-40 w-full object-cover md:h-48"
                  fallbackClassName="h-40 w-full md:h-48"
                />
                <span className="absolute inset-0 flex items-center justify-center bg-secondary/20">
                  <svg viewBox="0 0 24 24" fill="currentColor" className="h-10 w-10 text-white drop-shadow" aria-hidden="true">
                    <path d="M8 5v14l11-7-11-7Z" />
                  </svg>
                </span>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="mt-8 text-center">
        <Link to="/gallery" className="text-sm font-semibold text-primary underline underline-offset-2">
          View Full Gallery →
        </Link>
      </div>
    </section>
  );
}

