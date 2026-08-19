import { useState } from "react";
import { useClinicConfig } from "@/hooks/useClinicConfig";
import { SmartImage } from "@/components/ui/SmartImage";
import { Modal } from "@/components/ui/Modal";

type Doctor = ReturnType<typeof useClinicConfig>["doctors"][number];

function SocialLinks({ links }: { links: Doctor["socialLinks"] }) {
  if (!links || (!links.instagram && !links.linkedin)) return null;
  return (
    <div className="mt-3 flex gap-3 text-sm">
      {links.instagram && (
        <a href={links.instagram} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">
          Instagram
        </a>
      )}
      {links.linkedin && (
        <a href={links.linkedin} target="_blank" rel="noopener noreferrer" className="text-primary underline underline-offset-2">
          LinkedIn
        </a>
      )}
    </div>
  );
}

export default function Doctors() {
  const { doctors } = useClinicConfig();
  const [activeDoctor, setActiveDoctor] = useState<Doctor | null>(null);

  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <div className="text-center">
        <p className="text-sm font-semibold uppercase tracking-wide text-primary">Our Team</p>
        <h1 className="mt-1 font-heading text-4xl font-bold">Meet Our Doctors</h1>
      </div>

      <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {doctors.map((doc) => (
          <article key={doc.id} className="overflow-hidden rounded-brand border border-black/5 bg-surface shadow-sm">
            <SmartImage
              variant="avatar"
              label={doc.name}
              src={doc.photoPath}
              alt={doc.name}
              className="h-56 w-full object-cover"
            />
            <div className="p-5">
              <h2 className="font-heading text-lg font-semibold">{doc.name}</h2>
              <p className="text-sm font-medium text-primary">{doc.designation}</p>
              <p className="mt-1 text-sm text-ink/70">{doc.qualifications.join(", ")}</p>
              <p className="mt-1 text-sm text-ink/70">{doc.specialization}</p>
              <p className="mt-2 text-sm text-ink/60">{doc.experienceYears}+ years experience</p>

              <p className="mt-3 text-sm text-ink/70">
                <span className="font-medium text-ink">Consults: </span>
                {doc.consultingDays.join(", ")}
              </p>

              <button
                onClick={() => setActiveDoctor(doc)}
                className="mt-4 text-sm font-semibold text-primary underline underline-offset-2"
              >
                View Full Bio →
              </button>
            </div>
          </article>
        ))}
      </div>

      {activeDoctor && (
        <Modal onClose={() => setActiveDoctor(null)} labelledBy="doctor-modal-title">
          <SmartImage
            variant="avatar"
            label={activeDoctor.name}
            src={activeDoctor.photoPath}
            alt={activeDoctor.name}
            className="h-48 w-full rounded-brand object-cover"
          />
          <h2 id="doctor-modal-title" className="mt-4 font-heading text-2xl font-bold">
            {activeDoctor.name}
          </h2>
          <p className="text-sm font-medium text-primary">{activeDoctor.designation}</p>
          <p className="mt-1 text-sm text-ink/70">{activeDoctor.qualifications.join(", ")}</p>
          <p className="mt-1 text-sm text-ink/70">{activeDoctor.specialization}</p>
          {activeDoctor.registrationNumber && (
            <p className="mt-1 text-xs text-ink/50">Reg. No. {activeDoctor.registrationNumber}</p>
          )}

          <p className="mt-4 text-ink/80">{activeDoctor.bio}</p>

          <p className="mt-4 text-sm text-ink/70">
            <span className="font-medium text-ink">Consulting days: </span>
            {activeDoctor.consultingDays.join(", ")}
          </p>

          <SocialLinks links={activeDoctor.socialLinks} />
        </Modal>
      )}
    </main>
  );
}
