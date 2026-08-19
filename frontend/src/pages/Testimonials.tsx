import { useClinicConfig } from "@/hooks/useClinicConfig";

export default function Testimonials() {
  const { testimonials } = useClinicConfig();
  return (
    <main className="mx-auto max-w-6xl px-4 py-16">
      <h1 className="text-3xl font-bold">What Our Patients Say</h1>
      <div className="mt-8 grid gap-6 md:grid-cols-3">
        {testimonials.map((t) => (
          <blockquote key={t.id} className="rounded-brand border border-black/5 p-4">
            <p className="text-ink/80">&ldquo;{t.text}&rdquo;</p>
            <footer className="mt-3 text-sm font-medium">
              {t.patientName} · {"★".repeat(t.rating)}
            </footer>
          </blockquote>
        ))}
      </div>
    </main>
  );
}
