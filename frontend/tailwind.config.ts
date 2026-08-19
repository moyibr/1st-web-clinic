import type { Config } from "tailwindcss";

// NOTE: colors resolve to CSS custom properties (set at runtime from clinic.config brand colors
// in src/config/theme.ts) — never hardcode a client's hex value here. This file stays identical
// across every client build.
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--color-primary) / <alpha-value>)",
        secondary: "rgb(var(--color-secondary) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        surface: "rgb(var(--color-background) / <alpha-value>)",
        ink: "rgb(var(--color-text) / <alpha-value>)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        body: ["var(--font-body)", "sans-serif"],
      },
      borderRadius: {
        brand: "var(--radius-brand)",
      },
    },
  },
  plugins: [],
} satisfies Config;
