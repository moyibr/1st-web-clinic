import { useClinicConfig } from "@/hooks/useClinicConfig";
import { HighlightIcon } from "@/components/ui/HighlightIcon";

/**
 * Stat tiles directly under the hero — the config-driven equivalent of the trust-badge
 * rows both reference sites use ("15+ years", "788 reviews", "100% satisfaction").
 * A tinted band (not plain white) breaks up the page the way both references alternate
 * section backgrounds; the tint derives from the brand primary color, never a hardcoded hex.
 */
export function HighlightsStrip() {
  const { highlights } = useClinicConfig().home;

  return (
    <section className="bg-primary/5 py-10">
      <div className="mx-auto grid max-w-6xl grid-cols-2 gap-6 px-4 md:grid-cols-4">
        {highlights.map((h) => (
          <div key={h.id} className="flex flex-col items-center text-center">
            <HighlightIcon name={h.icon} className="h-8 w-8 text-primary" />
            <span className="mt-2 font-heading text-2xl font-bold text-ink md:text-3xl">{h.value}</span>
            <span className="mt-1 text-sm text-ink/70">{h.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
