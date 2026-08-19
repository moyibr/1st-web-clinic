import { useClinicConfig } from "@/hooks/useClinicConfig";

export function Footer() {
  const config = useClinicConfig();
  const { clinic, contact, socials, services } = config;

  return (
    <footer className="mt-24 border-t border-black/5 bg-secondary/5 py-12">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 md:grid-cols-4">
        <div>
          <h3 className="font-heading text-lg font-semibold">{clinic.name}</h3>
          <p className="mt-2 text-sm text-ink/70">{clinic.aboutShort}</p>
        </div>

        <div>
          <h4 className="font-semibold">Services</h4>
          <ul className="mt-2 space-y-1 text-sm text-ink/70">
            {services.slice(0, 5).map((s) => (
              <li key={s.id}>{s.name}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">Contact</h4>
          <ul className="mt-2 space-y-1 text-sm text-ink/70">
            {contact.phone.map((p) => (
              <li key={p.number}>{p.label}: {p.number}</li>
            ))}
            <li>{contact.address.line1}, {contact.address.city}</li>
          </ul>
        </div>

        <div>
          <h4 className="font-semibold">Follow Us</h4>
          <ul className="mt-2 space-y-1 text-sm text-ink/70">
            {socials.instagram && <li><a href={socials.instagram}>Instagram</a></li>}
            {socials.facebook && <li><a href={socials.facebook}>Facebook</a></li>}
            {socials.youtube && <li><a href={socials.youtube}>YouTube</a></li>}
          </ul>
        </div>
      </div>

      <p className="mt-10 text-center text-xs text-ink/50">
        © {new Date().getFullYear()} {clinic.legalName || clinic.name}. All rights reserved.
      </p>
    </footer>
  );
}
