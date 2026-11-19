export type Layer = {
  key: "L1" | "L2" | "L3" | "F";
  name: string;
  upper: string;
  title: string;
  color: string; // marker / border colour
  textColor: string; // label colour on midnight
  desc: string;
  items: string[];
  status: string;
};

/** Service layers as shown in "The stack" on Home. */
export const LAYERS: Layer[] = [
  {
    key: "L1", name: "Interface", upper: "INTERFACE", title: "Web Experiences",
    color: "#38E8FF", textColor: "#38E8FF",
    desc: "Websites and landing pages that explain what you do and bring in enquiries.",
    items: ["Company and marketing websites", "Landing pages for campaigns", "SEO foundations and analytics"],
    status: "AVAILABLE NOW",
  },
  {
    key: "L2", name: "Systems", upper: "SYSTEMS", title: "Custom Software and Booking",
    color: "#3B82F6", textColor: "#93C5FD",
    desc: "Tools shaped around how your business runs: bookings, client portals and dashboards.",
    items: ["Web apps and client portals", "Online booking for salons and clinics", "Internal dashboards"],
    status: "AVAILABLE NOW · BOOKING IN PILOT",
  },
  {
    key: "L3", name: "Intelligence", upper: "INTELLIGENCE", title: "Automation and AI",
    color: "#8B5CF6", textColor: "#A78BFA",
    desc: "The repetitive work, done by software: follow-ups, reminders and data moving between tools.",
    items: ["Workflow automation", "Third-party integrations", "AI assistants (in development)"],
    status: "AUTOMATION NOW · AI IN DEVELOPMENT",
  },
  {
    key: "F", name: "Foundation", upper: "CLOUD AND INTEGRATIONS", title: "Cloud and Integrations",
    color: "#7D8796", textColor: "#CDD5E0",
    desc: "Hosting, APIs and deployment, set up properly inside every project we deliver.",
    items: ["Hosting and deployment", "APIs and webhooks", "Monitoring and backups"],
    status: "INCLUDED IN EVERY PROJECT",
  },
];
