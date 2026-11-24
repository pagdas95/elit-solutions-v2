/**
 * Site-wide content. Empty strings are details still waiting on the owner
 * (see "Open items" in the project brief); the UI hides or flags them.
 */
export const site = {
  name: "ElIT Solutions",
  url: process.env.URL ?? "https://elit-solutions.netlify.app",
  description:
    "Websites, booking systems and automation for growing businesses in Cyprus. Built as one system, by one team that looks after it.",
  contact: {
    email: "pantelisa1995@gmail.com",
    emailHref: "mailto:pantelisa1995@gmail.com",
    phone: "+357 96 666087",
    phoneHref: "tel:+35796666087",
    whatsappHref: "https://wa.me/35796666087",
    /** Shown only when set. */
    city: "" as string,
    hours: "" as string,
  },
  /** Legal identity for Privacy and Terms. Placeholders render visibly until set. */
  legal: {
    name: "" as string, // e.g. registered business or sole-trader name
    address: "" as string,
  },
  /** Cookieless analytics (Umami). Set NEXT_PUBLIC_UMAMI_WEBSITE_ID in Netlify to turn on. */
  analytics: {
    provider: "Umami",
    websiteId: process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ?? "",
    src: process.env.NEXT_PUBLIC_UMAMI_SRC ?? "https://cloud.umami.is/script.js",
  },
};

export const serviceMenu = [
  { label: "Websites", key: "L1", href: "/services#l1" },
  { label: "Booking and custom software", key: "L2", href: "/services#l2" },
  { label: "Automation and AI", key: "L3", href: "/services#l3" },
  { label: "Cloud and integrations", key: "F", href: "/services#f" },
];

export const mainNav = [
  { label: "Approach", href: "/#approach" },
  { label: "Lab", href: "/lab" },
  { label: "Contact", href: "/contact" },
];

export type Faq = [question: string, answer: string];

/** Page metadata with matching Open Graph title/description for link previews. */
export function pageMeta(title: string, description: string) {
  return {
    title,
    description,
    openGraph: {
      type: "website" as const,
      siteName: site.name,
      locale: "en_GB",
      title: `${title} · ${site.name}`,
      description,
    },
  };
}
