import { useClinicConfig } from "@/hooks/useClinicConfig";
import { SmartImage } from "@/components/ui/SmartImage";

export default function About() {
  const { clinic, gallery } = useClinicConfig();
  const yearsActive = new Date().getFullYear() - clinic.establishedYear;
  const interiorPhotos = gallery.filter((g) => g.category === "Clinic Interior" && g.type === "image");
  const hasMissionVision = Boolean(clinic.mission || clinic.vision);

  return (
    <main>
      {/* Story */}
      <section className="mx-auto max-w-4xl px-4 py-16">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">About Us</p>
        <h1 className="mt-1 font-heading text-4xl font-bold">
          Our Story{clinic.establishedYear ? `, Since ${clinic.establishedYear}` : ""}
        </h1>

        {/* Legacy angle — computed from establishedYear, no separate config field needed */}
        <p className="mt-3 text-lg text-ink/70">
          {yearsActive > 0
            ? `${yearsActive}+ years of trusted, patient-first dental care for our community.`
            : `Proudly serving our community since ${clinic.establishedYear}.`}
        </p>

        <p className="mt-8 whitespace-pre-line leading-relaxed text-ink/80">{clinic.aboutLong}</p>
      </section>

      {/* Mission / Vision — hidden entirely if neither is configured */}
      {hasMissionVision && (
        <section className="bg-primary/5 py-16">
          <div className="mx-auto grid max-w-4xl gap-8 px-4 sm:grid-cols-2">
            {clinic.mission && (
              <div className="rounded-brand bg-surface p-6 shadow-sm">
                <h2 className="font-heading text-xl font-semibold text-primary">Our Mission</h2>
                <p className="mt-2 text-ink/80">{clinic.mission}</p>
              </div>
            )}
            {clinic.vision && (
              <div className="rounded-brand bg-surface p-6 shadow-sm">
                <h2 className="font-heading text-xl font-semibold text-primary">Our Vision</h2>
                <p className="mt-2 text-ink/80">{clinic.vision}</p>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Accreditations — hidden entirely if the list is empty */}
      {clinic.accreditations.length > 0 && (
        <section className="mx-auto max-w-4xl px-4 py-16 text-center">
          <p className="text-sm font-semibold uppercase tracking-wide text-primary">Recognized By</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-8">
            {clinic.accreditations.map((a) => (
              <div key={a.name} className="flex flex-col items-center gap-2">
                <SmartImage
                  src={a.logoPath}
                  alt={a.name}
                  className="h-14 w-28 rounded-brand object-contain"
                />
                <span className="text-xs text-ink/60">{a.name}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Clinic interior photo strip — hidden entirely if no matching gallery items */}
      {interiorPhotos.length > 0 && (
        <section className="mx-auto max-w-6xl px-4 pb-16">
          <p className="text-center text-sm font-semibold uppercase tracking-wide text-primary">
            Inside Our Clinic
          </p>
          <div className="mt-6 grid grid-cols-2 gap-4 md:grid-cols-3">
            {interiorPhotos.map((photo) => (
              <SmartImage
                key={photo.id}
                src={photo.src}
                alt={photo.caption ?? ""}
                className="h-40 w-full rounded-brand object-cover md:h-48"
              />
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
