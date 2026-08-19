import type { ClinicConfig } from "@/config/clinic.config.schema";

function setMeta(attr: "name" | "property", key: string, content: string): void {
  let el = document.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute("content", content);
}

/**
 * Fills in the <head> tags index.html ships without (title/description/OG/favicon) from
 * the active client's config, so every client build gets correct SEO/social-share metadata
 * without touching index.html itself. Call once at app bootstrap alongside applyClinicTheme.
 */
export function applySeo(config: ClinicConfig): void {
  const { siteTitle, metaDescription, ogImagePath, faviconPath } = config.meta;

  document.title = siteTitle;
  setMeta("name", "description", metaDescription);

  setMeta("property", "og:type", "website");
  setMeta("property", "og:title", siteTitle);
  setMeta("property", "og:description", metaDescription);
  setMeta("property", "og:image", ogImagePath);

  const faviconLink = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
  if (faviconLink) faviconLink.href = faviconPath;
}
