/**
 * Site-wide content and placeholders. Anything in [BRACKETS] or marked DEMO
 * is waiting on the owner (see "Open items" in the project brief).
 */
export const site = {
  name: "ElIT Solutions",
  url: process.env.URL ?? "https://elit-solutions.netlify.app",
  description:
    "Websites, booking systems and automation for growing businesses in Cyprus. Built as one system, by one team that looks after it.",
  contact: {
    email: "hello@elit-solutions.example", // DEMO — replace with the real address
    emailHref: "mailto:hello@elit-solutions.example",
    whatsapp: "+357 00 000 000", // DEMO
    whatsappHref: "#", // e.g. https://wa.me/35700000000
    callHref: "#", // call booking link (Cal.com / Calendly)
    city: "[CITY]",
    hours: "[HOURS]",
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
