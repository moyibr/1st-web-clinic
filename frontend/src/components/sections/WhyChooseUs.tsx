import { useClinicConfig } from "@/hooks/useClinicConfig";
import { HighlightIcon } from "@/components/ui/HighlightIcon";

/**
 * USP tiles (South SF Dental Care's "Dentistry You Can Count On" row) — icon + title +
 * short description, tinted band background for section-rhythm, same alternating-background
 * language as HighlightsStrip/TestimonialsSlider.
 */
export function WhyChooseUs() {
  const { whyChooseUs } = useClinicConfig().home;

  return (
    <section className="bg-secondary/5 py-16">
      <div className="mx-auto max-w-6xl px-4">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Why Choose Us</p>
          <h2 className="mt-1 font-heading text-3xl font-bold">Dentistry You Can Count On</h2>
        </div>

        <div className="mt-10 grid gap-8 sm:grid-cols-2 md:grid-cols-4">
          {whyChooseUs.map((item) => (
            <div key={item.id} className="text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                <HighlightIcon name={item.icon} className="h-7 w-7 text-primary" />
              </div>
              <h3 className="mt-4 font-heading text-lg font-semibold">{item.title}</h3>
              <p className="mt-1 text-sm text-ink/70">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
