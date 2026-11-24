import Script from "next/script";
import { site } from "@/lib/site";

/**
 * Cookieless analytics (Umami). Renders nothing until
 * NEXT_PUBLIC_UMAMI_WEBSITE_ID is set in Netlify, so previews and local
 * builds stay untracked. Only production is tracked (CONTEXT=production).
 */
export function Analytics() {
  const { websiteId, src } = site.analytics;
  if (!websiteId || process.env.CONTEXT !== "production") return null;
  return <Script src={src} data-website-id={websiteId} strategy="afterInteractive" />;
}
