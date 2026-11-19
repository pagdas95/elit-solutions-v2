import localFont from "next/font/local";

/*
 * Self-hosted fonts (SIL Open Font License), latin subset only.
 * next/font/local preloads them and generates metric-matched fallbacks,
 * so text doesn't jump when the web font arrives.
 */
export const barlow = localFont({
  src: "./fonts/barlow-condensed-latin-700-normal.woff2",
  weight: "700",
  variable: "--font-barlow",
  adjustFontFallback: "Arial",
});

export const inter = localFont({
  src: "./fonts/inter-latin-wght-normal.woff2",
  weight: "100 900",
  variable: "--font-inter",
});

export const geistMono = localFont({
  src: [
    { path: "./fonts/geist-mono-latin-400-normal.woff2", weight: "400" },
    { path: "./fonts/geist-mono-latin-500-normal.woff2", weight: "500" },
  ],
  variable: "--font-geist-mono",
  preload: false,
});

export const sora = localFont({
  src: "./fonts/sora-latin-700-normal.woff2",
  weight: "700",
  variable: "--font-sora",
  preload: false,
});
