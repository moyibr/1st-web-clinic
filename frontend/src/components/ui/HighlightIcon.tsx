import type { ClinicConfig } from "@/config/clinic.config.schema";

type IconName = ClinicConfig["home"]["highlights"][number]["icon"];

/**
 * Small fixed icon set for the highlights strip. Deliberately not an external icon
 * library — keeps the template dependency-free and lets `icon` stay a plain string
 * in JSON config instead of arbitrary SVG markup.
 */
const ICONS: Record<IconName, JSX.Element> = {
  years: (
    <path d="M12 2a1 1 0 0 1 1 1v1.06A9 9 0 0 1 21 13a1 1 0 1 1-2 0 7 7 0 1 0-7 7 1 1 0 1 1 0 2A9 9 0 0 1 11 4.06V3a1 1 0 0 1 1-1Zm0 5a1 1 0 0 1 1 1v3.59l2.3 2.3a1 1 0 1 1-1.42 1.42l-2.6-2.6A1 1 0 0 1 11 12V8a1 1 0 0 1 1-1Z" />
  ),
  patients: (
    <path d="M8 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm8 0a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM2 19a6 6 0 0 1 12 0 1 1 0 1 1-2 0 4 4 0 0 0-8 0 1 1 0 1 1-2 0Zm12.2-5.4A6 6 0 0 1 22 19a1 1 0 1 1-2 0 4 4 0 0 0-3.6-3.98 1 1 0 1 1-.2-1.99c.01 0 .01 0 0 0Z" />
  ),
  rating: (
    <path d="m12 2 2.9 6.26L22 9.27l-5 4.73L18.2 21 12 17.27 5.8 21 7 14l-5-4.73 7.1-1.01L12 2Z" />
  ),
  doctors: (
    <path d="M9 2a1 1 0 0 0-1 1v2H6a1 1 0 0 0-1 1v3a4 4 0 0 0 3.44 3.96A5.5 5.5 0 0 0 12 17.9V20H9a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2h-3v-2.1a5.5 5.5 0 0 0 3.56-4.94A4 4 0 0 0 19 9V6a1 1 0 0 0-1-1h-2V3a1 1 0 0 0-1-1H9Z" />
  ),
  smile: (
    <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20ZM8 10a1 1 0 1 1 2 0 1 1 0 0 1-2 0Zm8 0a1 1 0 1 1-2 0 1 1 0 0 1 2 0Zm-8.2 3.5a1 1 0 0 1 1.37.36 3.5 3.5 0 0 0 5.66 0 1 1 0 1 1 1.66 1.12 5.5 5.5 0 0 1-8.98 0 1 1 0 0 1 .29-1.48Z" />
  ),
  shield: (
    <path d="M12 2 4 5v6c0 5 3.4 8.6 8 11 4.6-2.4 8-6 8-11V5l-8-3Zm-1.2 12.6L7.6 11.4l1.4-1.4 1.8 1.8 4.2-4.2 1.4 1.4-5.6 5.6Z" />
  ),
};

export function HighlightIcon({ name, className }: { name: IconName; className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      {ICONS[name]}
    </svg>
  );
}
