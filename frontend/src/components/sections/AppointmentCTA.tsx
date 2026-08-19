import { Link } from "react-router-dom";
import { useClinicConfig } from "@/hooks/useClinicConfig";

/**
 * Full-width closing CTA band, similar in spirit to Dentologie's membership-plan promo
 * band and SSF's "100% Satisfaction Guarantee" banner — a solid brand-color section that
 * breaks the page rhythm right before the footer and pushes toward booking.
 */
export function AppointmentCTA() {
  const { headline, subtext, ctaLabel } = useClinicConfig().home.appointmentCta;

  return (
    <section className="bg-primary py-16 text-center text-white">
      <div className="mx-auto max-w-2xl px-4">
        <h2 className="font-heading text-3xl font-bold md:text-4xl">{headline}</h2>
        {subtext && <p className="mt-3 text-white/90">{subtext}</p>}
        <Link
          to="/contact"
          className="mt-8 inline-block rounded-brand bg-white px-8 py-3 font-semibold text-primary transition-opacity hover:opacity-90"
        >
          {ctaLabel}
        </Link>
      </div>
    </section>
  );
}
