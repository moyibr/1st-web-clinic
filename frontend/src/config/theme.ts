import type { ClinicConfig } from "./clinic.config.schema";

/**
 * Converts a "#rrggbb" hex string to a "r g b" triplet, which is what the CSS custom
 * properties in index.css expect (so Tailwind's `<alpha-value>` opacity modifiers work,
 * e.g. bg-primary/50).
 */
function hexToRgbTriplet(hex: string): string {
  const clean = hex.replace("#", "");
  const bigint = parseInt(clean, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `${r} ${g} ${b}`;
}

/**
 * Applies the active client's brand tokens (colors/fonts/radius) onto :root as CSS custom
 * properties. Call this once at app bootstrap (see main.tsx). No component ever hardcodes
 * a client color — everything reads through Tailwind's primary/secondary/accent/surface/ink
 * classes, which resolve to these variables.
 */
export function applyClinicTheme(config: ClinicConfig): void {
  const root = document.documentElement;
  const { colors, fontHeading, fontBody, borderRadius } = config.brand;

  root.style.setProperty("--color-primary", hexToRgbTriplet(colors.primary));
  root.style.setProperty("--color-secondary", hexToRgbTriplet(colors.secondary));
  root.style.setProperty("--color-accent", hexToRgbTriplet(colors.accent));
  root.style.setProperty("--color-background", hexToRgbTriplet(colors.background));
  root.style.setProperty("--color-text", hexToRgbTriplet(colors.text));

  root.style.setProperty("--font-heading", fontHeading);
  root.style.setProperty("--font-body", fontBody);

  const radiusMap: Record<typeof borderRadius, string> = {
    sharp: "0rem",
    soft: "0.5rem",
    rounded: "1.25rem",
  };
  root.style.setProperty("--radius-brand", radiusMap[borderRadius]);

  document.title = config.meta.siteTitle;
}
