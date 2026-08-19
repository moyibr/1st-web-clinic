import { useState, type ImgHTMLAttributes } from "react";

type FallbackVariant = "photo" | "avatar" | "logo";

interface SmartImageProps extends ImgHTMLAttributes<HTMLImageElement> {
  /**
   * "photo"  — generic scenery/clinic photography (hero, gallery, service, clinic shots):
   *            soft brand-gradient block + a subtle tooth icon.
   * "avatar" — a named person (doctor, patient): brand-gradient block + their initials.
   * "logo"   — clinic logo mark: brand-gradient block + their initials (small/square usage).
   */
  variant?: FallbackVariant;
  /** Person's name ("avatar") or clinic name ("logo") — used to derive initials. */
  label?: string;
  /** Overrides `className` on the fallback block only — for cases like a wide logo
   *  (`h-9 w-auto` when real) that needs a fixed square box as a placeholder instead. */
  fallbackClassName?: string;
}

function getInitials(name: string): string {
  const cleaned = name.replace(/^Dr\.?\s*/i, "").trim();
  const parts = cleaned.split(/\s+/).filter(Boolean);
  return parts.slice(0, 2).map((p) => p[0]?.toUpperCase() ?? "").join("") || "?";
}

function ToothIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2c-1.64 0-2.87.68-3.78 1.36C7.36 2.7 6.4 2 5.2 2 3.16 2 1.5 3.9 1.5 6.5c0 2.24.55 3.9.98 5.24.5 1.53.9 2.74.66 4.86-.15 1.34.63 3.4 1.99 3.4 1.4 0 1.62-1.55 1.86-3.19.2-1.4.44-3.06 1.4-3.06.97 0 1.2 1.68 1.4 3.08.23 1.63.45 3.17 1.85 3.17 1.36 0 2.14-2.06 1.99-3.4-.24-2.12.16-3.33.66-4.86.43-1.34.98-3 .98-5.24C22.5 3.9 20.84 2 18.8 2c-1.2 0-2.16.7-3.02 1.36C14.87 2.68 13.64 2 12 2Z" />
    </svg>
  );
}

/**
 * Standalone fallback block for non-`<img>` media (e.g. `<video>`) that can't use
 * SmartImage directly. Same gradient + tooth icon language as SmartImage's "photo"
 * variant, kept in sync by sharing this one component.
 */
export function PhotoFallback({ className, alt }: { className?: string; alt?: string }) {
  return (
    <div
      className={`flex items-center justify-center bg-gradient-to-br from-primary/15 via-accent/10 to-secondary/15 ${className ?? ""}`}
      role="img"
      aria-label={alt}
    >
      <ToothIcon className="h-10 w-10 text-primary/40" />
    </div>
  );
}

/**
 * Drop-in replacement for <img> that degrades gracefully when a client hasn't uploaded
 * a real asset yet (missing file, empty placeholder path) — a branded gradient block
 * instead of the browser's broken-image icon, so a demo/staging site still looks finished.
 * Sizing/positioning classes (h-*, w-*, object-cover, rounded-*, etc.) pass straight through
 * via `className` onto both the real <img> and the fallback, so callers don't change.
 */
export function SmartImage({
  variant = "photo",
  label,
  className,
  fallbackClassName,
  alt,
  src,
  onError,
  ...rest
}: SmartImageProps) {
  const [failed, setFailed] = useState(!src);
  const fbClass = fallbackClassName ?? className;

  if (failed) {
    if (variant === "logo" || variant === "avatar") {
      return (
        <div
          className={`flex items-center justify-center bg-gradient-to-br from-primary to-secondary text-white ${fbClass ?? ""}`}
          role="img"
          aria-label={alt}
        >
          <span className="font-heading font-semibold">{label ? getInitials(label) : "?"}</span>
        </div>
      );
    }
    return <PhotoFallback className={fbClass} alt={alt} />;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={(e) => {
        setFailed(true);
        onError?.(e);
      }}
      {...rest}
    />
  );
}
