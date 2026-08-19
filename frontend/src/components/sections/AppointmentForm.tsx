import { FormEvent, useState } from "react";
import { useClinicConfig } from "@/hooks/useClinicConfig";
import { submitAppointment } from "@/lib/api";

export function AppointmentForm() {
  const config = useClinicConfig();
  const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  if (!config.appointmentForm.enabled) return null;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    const form = new FormData(e.currentTarget);

    try {
      await submitAppointment(config.meta.clientSlug, {
        name: String(form.get("name") ?? ""),
        phone: String(form.get("phone") ?? ""),
        email: String(form.get("email") ?? ""),
        service: String(form.get("service") ?? ""),
        preferredDate: String(form.get("preferredDate") ?? ""),
        message: String(form.get("message") ?? ""),
        honeypot: String(form.get("company") ?? ""),
      });
      setStatus("success");
      e.currentTarget.reset();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
    }
  }

  if (status === "success") {
    return (
      <p className="rounded-brand bg-primary/10 p-4 text-primary">
        {config.appointmentForm.successMessage}
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {/* Honeypot — hidden from real users via CSS, bots tend to fill every field they see. */}
      <input
        name="company"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="absolute -left-[9999px] h-0 w-0 opacity-0"
      />

      <input name="name" required placeholder="Full name" className="w-full rounded-brand border p-3" />
      <input name="phone" required placeholder="Phone number" className="w-full rounded-brand border p-3" />
      <input name="email" type="email" placeholder="Email (optional)" className="w-full rounded-brand border p-3" />

      <select name="service" className="w-full rounded-brand border p-3">
        <option value="">Select a service</option>
        {config.appointmentForm.availableServices.map((s) => (
          <option key={s} value={s}>{s}</option>
        ))}
      </select>

      <input name="preferredDate" type="date" className="w-full rounded-brand border p-3" />
      <textarea name="message" placeholder="Anything we should know?" className="w-full rounded-brand border p-3" />

      {status === "error" && <p className="text-sm text-red-600">{errorMsg}</p>}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="w-full rounded-brand bg-primary py-3 font-semibold text-white disabled:opacity-60"
      >
        {status === "submitting" ? "Submitting..." : "Book Appointment"}
      </button>
    </form>
  );
}
