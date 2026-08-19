import { useClinicConfig } from "@/hooks/useClinicConfig";

function MapPinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2a7 7 0 0 0-7 7c0 5.25 7 13 7 13s7-7.75 7-13a7 7 0 0 0-7-7Zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5Z" />
    </svg>
  );
}

/**
 * Home-page "Visit Us" widget — split address/timings + map. When `mapEmbedUrl` isn't set
 * yet (common before a client hands over their Google Business listing), the iframe is
 * skipped in favor of a branded placeholder + "Get Directions" link instead of an empty
 * or broken embed.
 */
export function MapTimingsWidget() {
  const { contact } = useClinicConfig();
  const { address, timings } = contact;

  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Visit Us</p>
          <h2 className="mt-1 font-heading text-3xl font-bold">Location &amp; Timings</h2>

          <p className="mt-4 text-ink/80">
            {address.line1}
            {address.line2 ? `, ${address.line2}` : ""}, {address.city}, {address.state} {address.pincode}
          </p>

          <ul className="mt-6 space-y-1 text-sm text-ink/70">
            {timings.map((t) => (
              <li key={t.day} className="flex justify-between border-b border-black/5 py-1.5">
                <span className="font-medium text-ink">{t.day}</span>
                <span>{t.isClosed ? "Closed" : `${t.openTime} - ${t.closeTime}`}</span>
              </li>
            ))}
          </ul>

          {address.mapDirectionsUrl && (
            <a
              href={address.mapDirectionsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 inline-block text-sm font-semibold text-primary underline underline-offset-2"
            >
              Get Directions →
            </a>
          )}
        </div>

        <div>
          {address.mapEmbedUrl ? (
            <iframe
              src={address.mapEmbedUrl}
              className="h-72 w-full rounded-brand border-0 md:h-full md:min-h-[320px]"
              loading="lazy"
              title="Clinic location map"
            />
          ) : (
            <div className="flex h-72 w-full flex-col items-center justify-center gap-3 rounded-brand bg-gradient-to-br from-primary/15 via-accent/10 to-secondary/15 text-center md:h-full md:min-h-[320px]">
              <MapPinIcon className="h-10 w-10 text-primary/50" />
              <p className="px-6 text-sm text-ink/60">Map preview not available yet</p>
              {address.mapDirectionsUrl && (
                <a
                  href={address.mapDirectionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-primary underline underline-offset-2"
                >
                  Get Directions →
                </a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
