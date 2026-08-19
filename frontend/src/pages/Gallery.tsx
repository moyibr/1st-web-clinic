import { useMemo, useState } from "react";
import { useClinicConfig } from "@/hooks/useClinicConfig";
import { SmartImage, PhotoFallback } from "@/components/ui/SmartImage";

const ALL = "All";
// Cycled per item to give the CSS-columns masonry some visual rhythm without needing
// each image's real intrinsic size (which SmartImage's fixed-box fallback can't provide).
const HEIGHTS = ["h-48", "h-64", "h-56", "h-72", "h-52"];

function GalleryVideo({ src, poster, caption, heightClass }: { src: string; poster?: string; caption?: string; heightClass: string }) {
  const [failed, setFailed] = useState(!src);

  if (failed) {
    return <PhotoFallback className={`w-full ${heightClass}`} alt={caption ?? "Video unavailable"} />;
  }

  return (
    <video
      src={src}
      poster={poster}
      controls
      className={`w-full object-cover ${heightClass}`}
      onError={() => setFailed(true)}
    />
  );
}

export default function Gallery() {
  const { gallery } = useClinicConfig();
  const [activeCategory, setActiveCategory] = useState<string>(ALL);

  const categories = useMemo(() => Array.from(new Set(gallery.map((g) => g.category))), [gallery]);
  const filtered = activeCategory === ALL ? gallery : gallery.filter((g) => g.category === activeCategory);

  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Take a Look Inside</p>
        <h1 className="mt-1 font-heading text-4xl font-bold">Gallery</h1>
      </div>

      {gallery.length === 0 ? (
        <p className="mt-16 text-center text-ink/60">Photos coming soon.</p>
      ) : (
        <>
          {categories.length > 1 && (
            <div className="mt-8 flex flex-wrap justify-center gap-2">
              {[ALL, ...categories].map((c) => (
                <button
                  key={c}
                  onClick={() => setActiveCategory(c)}
                  className={`rounded-brand border px-4 py-1.5 text-sm font-medium transition-colors ${
                    activeCategory === c
                      ? "border-primary bg-primary text-white"
                      : "border-black/10 text-ink/70 hover:border-primary/40"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          )}

          {filtered.length === 0 ? (
            <p className="mt-16 text-center text-ink/60">No photos in this category yet.</p>
          ) : (
            <div className="mt-10 columns-2 gap-4 md:columns-3">
              {filtered.map((item, i) => {
                const heightClass = HEIGHTS[i % HEIGHTS.length];
                return (
                  <figure key={item.id} className="mb-4 break-inside-avoid overflow-hidden rounded-brand">
                    {item.type === "image" ? (
                      <SmartImage
                        src={item.src}
                        alt={item.caption ?? ""}
                        className={`w-full object-cover ${heightClass}`}
                      />
                    ) : (
                      <GalleryVideo src={item.src} poster={item.thumbnail} caption={item.caption} heightClass={heightClass} />
                    )}
                    {item.caption && <figcaption className="mt-1 text-xs text-ink/60">{item.caption}</figcaption>}
                  </figure>
                );
              })}
            </div>
          )}
        </>
      )}
    </main>
  );
}
