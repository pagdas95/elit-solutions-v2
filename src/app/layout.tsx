import type { Metadata, Viewport } from "next";
import "./globals.css";
import { barlow, geistMono, inter, sora } from "./fonts";
import { SiteHeader } from "@/components/SiteHeader";
import { site } from "@/lib/site";

const indexable =
  process.env.ALLOW_INDEXING === "true" && process.env.CONTEXT === "production";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "ElIT Solutions · Software, built in layers",
    template: "%s · ElIT Solutions",
  },
  description: site.description,
  openGraph: {
    type: "website",
    siteName: site.name,
    title: "ElIT Solutions · Software, built in layers",
    description: site.description,
    locale: "en_GB",
  },
  // Previews are never indexed. At launch, set ALLOW_INDEXING=true for the
  // production context in Netlify (CONTEXT is set by Netlify at build time).
  robots: indexable ? { index: true, follow: true } : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: "#05070D",
  colorScheme: "dark",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${barlow.variable} ${inter.variable} ${geistMono.variable} ${sora.variable} antialiased`}
    >
      <body id="top">
        <a
          href="#main"
          className="sr-only-h focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:h-auto focus:w-auto focus:rounded-lg focus:bg-accent focus:px-4 focus:py-3 focus:text-midnight"
        >
          Skip to content
        </a>
        <SiteHeader />
        <main id="main">{children}</main>
      </body>
    </html>
  );
}
