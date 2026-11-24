import type { Metadata } from "next";
import type { ReactNode } from "react";
import { ProcessStepper } from "@/components/services/ProcessStepper";
import { FaqSection } from "@/components/FaqSection";
import { CtaBlock, DarkSheet, Footer } from "@/components/SiteFooter";
import { Arrow, Check } from "@/components/icons";
import { Eyebrow, MaskedTitle, wrap } from "@/components/ui";
import { pageMeta, type Faq } from "@/lib/site";

export const metadata: Metadata = pageMeta("Services", "Websites, booking and custom software, automation and AI, plus cloud and integrations. Four layers, one team that builds, hosts and looks after it.");

type Section = {
  id: string;
  key: string;
  dot: string;
  ink: string;
  title: string;
  lead: string;
  status: string;
  get: string[];
  fit: string[];
  mock: ReactNode;
};

const SECTIONS: Section[] = [
  {
    id: "l1", key: "L1 · INTERFACE", dot: "#38E8FF", ink: "text-accent-ink", title: "Websites.",
    lead: "Websites and landing pages that explain what you do in seconds and turn visitors into enquiries.",
    status: "AVAILABLE NOW",
    get: ["Company and marketing websites", "Landing pages for campaigns and launches", "Content structure and copy help", "SEO foundations and analytics"],
    fit: ["Your site looks dated or is hard to update", "Visitors read, then leave without contacting you", "You are launching something new"],
    mock: <WebsiteMock />,
  },
  {
    id: "l2", key: "L2 · SYSTEMS", dot: "#3B82F6", ink: "text-l2-ink", title: "Booking and custom software.",
    lead: "Tools shaped around how your business runs: online booking, client portals and internal dashboards.",
    status: "AVAILABLE NOW · BOOKING IN PILOT",
    get: ["Online booking with staff calendars", "Client portals and web apps", "Internal dashboards", "Payments, confirmations and reminders"],
    fit: ["Bookings live in DMs and a notebook", "Off-the-shelf software almost fits", "Your team lives in too many spreadsheets"],
    mock: <BookingMock />,
  },
  {
    id: "l3", key: "L3 · INTELLIGENCE", dot: "#8B5CF6", ink: "text-l3-ink", title: "Automation and AI.",
    lead: "The repetitive work, done by software: follow-ups, reminders and data moving between your tools without copy and paste.",
    status: "AUTOMATION NOW · AI IN DEVELOPMENT",
    get: ["Workflow automation", "Integrations between the tools you use", "Automatic follow-ups and reminders", "AI assistants for common questions (in development)"],
    fit: ["Your team copies data between tools by hand", "Leads go cold before anyone replies", "The same questions arrive every day"],
    mock: <FlowMock />,
  },
  {
    id: "f", key: "F · FOUNDATION", dot: "#7D8796", ink: "text-ink3", title: "Cloud and integrations.",
    lead: "Hosting, APIs and deployment, set up properly in every project, so what we build stays fast and secure after launch.",
    status: "INCLUDED IN EVERY PROJECT",
    get: ["Hosting and deployment", "APIs and webhooks", "Monitoring and backups", "Security updates"],
    fit: ["Part of every project we deliver", "Also available for systems you already run", "You want one team to call when something breaks"],
    mock: <StatusMock />,
  },
];

const JUMPS = [
  ["#l1", "#38E8FF", "L1 · INTERFACE", "Websites"],
  ["#l2", "#3B82F6", "L2 · SYSTEMS", "Booking and custom software"],
  ["#l3", "#8B5CF6", "L3 · INTELLIGENCE", "Automation and AI"],
  ["#f", "#7D8796", "F · FOUNDATION", "Cloud and integrations"],
];

const ic = { fill: "none", stroke: "currentColor", strokeWidth: 1.6, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const STANDARDS: [ReactNode, string, string][] = [
  [<g key="i1"><rect x="7" y="3" width="10" height="18" rx="2" /><path d="M11 18h2" /></g>, "Mobile-first build", "Designed and tested on real phones first, then scaled up."],
  [<path key="i2" d="M4 15a4 4 0 0 1 2-7.5A6 6 0 0 1 17.5 8 4 4 0 0 1 18 16H6" />, "Hosting and deployment", "Set up, secured and deployed. No separate hosting company to manage."],
  [<path key="i3" d="M4 20V10M10 20V4M16 20v-7M22 20H2" />, "Analytics", "Know where enquiries come from, without drowning in dashboards."],
  [<path key="i4" d="M3 12h4l2-5 4 10 2-5h6" />, "Monitoring and backups", "We notice problems before your customers do."],
  [<g key="i5"><circle cx="11" cy="11" r="6" /><path d="M20 20l-4.5-4.5" /></g>, "SEO foundations", "Fast pages, clean structure and the basics search engines need."],
  [<path key="i6" d="M4 5h16v11H8l-4 4z" />, "Handover and training", "Short videos and notes so your team can run it day to day."],
];

const FAQ: Faq[] = [
  ["How much does a project cost?", "It depends on scope, so we quote after the first call. You get a written, fixed quote for the agreed scope before any work starts."],
  ["How long does it take?", "The written plan gives you a timeline before you commit. Focused websites are the quickest; systems that connect several tools take longer."],
  ["Can you work with the tools we already use?", "Usually, yes. We connect common calendars, email, payment and accounting tools through their APIs. If something cannot be connected, the plan says so."],
  ["Who owns the website and the code?", "You do. Your domain, content and accounts are always in your name, and the code we write for you is yours once the final invoice is paid. Our own products, such as ElIT Booking, stay ours: you get a licence to use them while your plan is active."],
  ["Is the AI assistant available now?", "It is in development. Automation is available today; the assistant is being piloted, and we will tell you honestly whether it fits your case."],
];

export default function ServicesPage() {
  return (
    <>
      <div data-nav="dark" className="relative z-0">
        <section aria-labelledby="page-h" className={`${wrap} flex flex-col gap-10 pt-[168px] pb-40`}>
          <div className="flex max-w-[980px] flex-col gap-7">
            <div className="el-rise"><Eyebrow>SERVICES · L1 → L3 + FOUNDATION</Eyebrow></div>
            <MaskedTitle
              id="page-h"
              className="text-[clamp(64px,9vw,148px)] leading-[0.86] tracking-[-0.035em]"
              lines={[{ text: "Four layers." }, { text: "One team.", muted: true }]}
            />
            <p className="el-rise m-0 max-w-[560px] text-[19px] leading-[30px] text-mute [animation-delay:280ms]">
              Start with the layer you need today and add the next when your business is ready. The same people
              build it, host it and look after it.
            </p>
          </div>
          <nav aria-label="Service layers" className="el-rise mt-6 grid grid-cols-1 gap-3 [animation-delay:380ms] sm:grid-cols-2 lg:grid-cols-4">
            {JUMPS.map(([href, dot, key, name]) => (
              <a key={href} href={href} className="el-jump box-border flex min-h-[148px] flex-col gap-3.5 rounded-2xl border border-line bg-panel p-5 text-ice">
                <span className="mono flex items-center justify-between text-[11px] tracking-[0.1em] text-mute">
                  <span className="inline-flex items-center gap-2">
                    <span className="size-2.5 rounded-[2px]" style={{ background: dot }} />
                    {key}
                  </span>
                  <Arrow />
                </span>
                <span className="display mt-auto text-[32px] leading-[0.95] tracking-[-0.02em]">{name}</span>
              </a>
            ))}
          </nav>
        </section>
      </div>

      <div data-nav="light" className="sheet relative z-[2] -mt-24 bg-canvas text-midnight">
        <div className="h-[clamp(48px,6vw,80px)]" />
        {SECTIONS.map((s, i) => (
          <section
            key={s.id}
            id={s.id}
            aria-labelledby={`${s.id}-h`}
            className={`${wrap} scroll-mt-20 ${i === SECTIONS.length - 1 ? "pb-[clamp(64px,7vw,96px)]" : "pb-[clamp(56px,6vw,88px)]"}`}
          >
            <div className="flex flex-wrap gap-x-16 gap-y-10 border-t border-hair pt-[clamp(40px,5vw,64px)]">
              <div className="min-w-0 flex-[1_1_380px]">
                <div className="flex flex-col gap-[22px] md:sticky md:top-28">
                  <p className={`mono m-0 inline-flex items-center gap-2.5 text-xs tracking-[0.12em] ${s.ink}`}>
                    <span className="size-2.5 rounded-[2px]" style={{ background: s.dot }} />
                    {s.key}
                  </p>
                  <h2 id={`${s.id}-h`} className="display m-0 text-[clamp(48px,4.4vw,72px)] leading-[0.9] text-midnight">
                    {s.title}
                  </h2>
                  <p className="m-0 max-w-[440px] text-lg leading-7 font-medium text-ink2">{s.lead}</p>
                  <p
                    className="mono m-0 self-start rounded-full border px-3 py-[7px] text-[11px] tracking-[0.08em] text-midnight"
                    style={{ borderColor: s.dot }}
                  >
                    [ {s.status} ]
                  </p>
                </div>
              </div>
              <div className="flex min-w-0 flex-[999_1_560px] flex-col gap-4">
                <div aria-hidden="true" className="box-border rounded-[28px] bg-midnight p-[clamp(24px,4vw,48px)]">
                  <div className="mx-auto max-w-[460px]">{s.mock}</div>
                </div>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <CheckCard title="WHAT YOU GET" items={s.get} />
                  <CheckCard title="A GOOD FIT IF" items={s.fit} />
                </div>
              </div>
            </div>
          </section>
        ))}

        <ProcessStepper />

        <section aria-labelledby="incl-h" className={`${wrap} flex flex-col gap-10 pb-[clamp(64px,7vw,96px)]`}>
          <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-4">
            <h2 id="incl-h" className="display m-0 text-[clamp(56px,6.4vw,96px)] leading-[0.9] text-midnight">In every project.</h2>
            <p className="m-0 max-w-[400px] text-base leading-6 font-medium text-ink2">
              Whatever layer you start with, these come as standard.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {STANDARDS.map(([icon, t, d]) => (
              <div key={t} className="box-border flex min-h-[196px] flex-col gap-3.5 rounded-3xl bg-card p-[26px]">
                <span className="inline-flex size-11 items-center justify-center rounded-xl bg-midnight text-accent">
                  <svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" {...ic}>{icon}</svg>
                </span>
                <h3 className="mt-2 mb-0 text-xl leading-[1.2] font-semibold tracking-[-0.01em] text-midnight">{t}</h3>
                <p className="m-0 text-[15px] leading-[23px] text-ink2">{d}</p>
              </div>
            ))}
          </div>
        </section>

        <FaqSection line1="Questions." line2="Straight answers." items={FAQ} />
        <div className="h-14" />
      </div>

      <DarkSheet>
        <CtaBlock line1="Not sure which layer?" line2="Start with a call." />
        <Footer />
      </DarkSheet>
    </>
  );
}

function CheckCard({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-3xl bg-card px-[26px] pt-6 pb-3.5">
      <h3 className="mono m-0 mb-3 text-[11.5px] font-medium tracking-[0.12em] text-ink3">{title}</h3>
      <ul className="m-0 list-none p-0">
        {items.map((it) => (
          <li key={it} className="flex gap-2.5 border-t border-canvas py-3 text-base leading-6 text-midnight">
            <Check className="mt-1 flex-none" />
            <span>{it}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

function WebsiteMock() {
  return (
    <div className="overflow-hidden rounded-[14px] bg-ice shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
      <div className="flex items-center gap-1.5 bg-chip px-3.5 py-2.5">
        <span className="size-2 rounded-full bg-hair" />
        <span className="size-2 rounded-full bg-hair" />
        <span className="size-2 rounded-full bg-hair" />
        <span className="mono ml-2.5 rounded-md bg-card px-2.5 py-[3px] text-[10px] text-ink3">yourbusiness.example</span>
      </div>
      <div className="flex flex-col gap-3.5 px-[22px] pt-[22px] pb-6 text-midnight">
        <div className="flex justify-between text-[10.5px] text-ink3">
          <span className="font-bold text-midnight">Harbour Studio</span>
          <span>Work · About · Contact</span>
        </div>
        <div className="display text-[40px] leading-[0.88] tracking-[-0.02em]">Built to be<br />found.</div>
        <div className="flex gap-2">
          <span className="rounded-md bg-midnight px-3 py-2 text-[11px] text-ice">Get a quote</span>
          <span className="rounded-md bg-chip px-3 py-2 text-[11px]">See our work</span>
        </div>
        <div className="mt-1.5 grid grid-cols-3 gap-2">
          <div className="h-[54px] rounded-lg bg-stone" />
          <div className="h-[54px] rounded-lg bg-chip" />
          <div className="h-[54px] rounded-lg bg-chip" />
        </div>
      </div>
    </div>
  );
}

function BookingMock() {
  return (
    <div className="flex flex-col gap-3 rounded-[14px] bg-ice p-[18px] text-midnight shadow-[0_30px_60px_-30px_rgba(0,0,0,0.6)]">
      <div className="flex justify-between text-xs font-semibold">
        <span>Choose a time</span>
        <span className="text-ink3">Thu 20 – Sun 23</span>
      </div>
      <div className="grid grid-cols-4 gap-1.5 text-center text-[11px]">
        {[["Thu", "20", "bg-mist"], ["Fri", "21", "bg-midnight text-ice"], ["Sat", "22", "bg-mist"], ["Sun", "23", "bg-mist text-ghost"]].map(([d, n, c]) => (
          <span key={n} className={`rounded-lg py-2 ${c}`}>{d}<br /><b>{n}</b></span>
        ))}
      </div>
      <div className="flex flex-col gap-1.5 text-xs">
        <div className="flex justify-between rounded-lg bg-mist px-2.5 py-[9px] text-ink3"><span>10:00</span><span>Taken</span></div>
        <div className="flex justify-between rounded-lg border-[1.5px] border-midnight px-2.5 py-[9px] font-semibold"><span>11:30 · Haircut · Elena</span><span>Selected</span></div>
        <div className="flex justify-between rounded-lg bg-mist px-2.5 py-[9px]"><span>14:00</span><span className="text-ink3">Free</span></div>
      </div>
      <div className="rounded-lg bg-accent p-[11px] text-center text-[12.5px] font-semibold">Confirm · reminder by SMS</div>
    </div>
  );
}

function FlowStep({ tag, tagC, text }: { tag: string; tagC: string; text: string }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-line2 bg-raised px-4 py-3.5">
      <span className={`mono text-[10px] ${tagC}`}>{tag}</span>
      <span className="text-sm text-ice">{text}</span>
    </div>
  );
}
function Join() {
  return <div className="ml-7 h-[22px] w-0.5 bg-line2" />;
}

function FlowMock() {
  return (
    <div className="flex flex-col">
      <FlowStep tag="TRIGGER" tagC="text-accent" text="New enquiry from the website" />
      <Join />
      <FlowStep tag="ACTION" tagC="text-l3-soft" text="Added to your CRM, tagged by service" />
      <Join />
      <FlowStep tag="ACTION" tagC="text-l3-soft" text="Personal reply sent, call slot offered" />
      <Join />
      <div className="flex flex-col gap-2 rounded-xl bg-ice px-4 py-3.5 text-midnight">
        <span className="mono text-[10px] text-l3-ink">AI ASSISTANT · IN DEVELOPMENT</span>
        <span className="self-start rounded-[12px_12px_12px_4px] bg-mist px-3 py-2 text-[13px]">Do you have anything free on Saturday?</span>
        <span className="self-end rounded-[12px_12px_4px_12px] bg-midnight px-3 py-2 text-[13px] text-ice">Yes, 11:30 or 14:00. Shall I hold one?</span>
      </div>
    </div>
  );
}

function StatusMock() {
  const rows = [["Hosting", "RUNNING"], ["Backups", "SCHEDULED"], ["SSL certificate", "VALID"], ["Booking API → calendar", "CONNECTED"]];
  return (
    <div className="rounded-[14px] border border-line2 bg-raised px-[18px] py-1.5">
      <div className="mono flex justify-between border-b border-line py-3.5 text-[11px] tracking-[0.08em] text-mute2">
        <span>SYSTEM STATUS</span>
        <span>DEMO</span>
      </div>
      {rows.map(([k, v], i) => (
        <div key={k} className={`flex items-center justify-between py-3.5 text-sm text-ice ${i < rows.length - 1 ? "border-b border-line" : ""}`}>
          <span>{k}</span>
          <span className="mono inline-flex items-center gap-2 text-[11px] text-fg2">
            <span className="size-[7px] rounded-full bg-accent" />
            {v}
          </span>
        </div>
      ))}
    </div>
  );
}

