import type { ReactNode } from "react";
import type { Status } from "../ui";

export type Kind = "web" | "sys" | "auto" | "ai";

export type Project = {
  id: string;
  kind: Kind;
  title: string;
  layer: string;
  color: string;
  status: Status;
  tileBg: string;
  line: string;
  problem: string;
  built: string[];
  stands: string;
  results: string;
  stack: string;
  visual: () => ReactNode;
};

/* ---------- tile visuals (decorative, demo data) ---------- */
function VBook() {
  return (
    <div className="box-border flex h-[250px] w-[220px] flex-col gap-2.5 rounded-t-[22px] bg-ice px-4 py-[18px] text-midnight">
      <div className="flex justify-between text-[11.5px] font-semibold"><span>Studio Nails</span><span className="text-ink3">Fri 21</span></div>
      <div className="flex flex-col gap-1.5 text-[11px]">
        <div className="flex justify-between rounded-lg bg-mist px-2.5 py-2 text-ink3"><span>17:00</span><span>Taken</span></div>
        <div className="flex justify-between rounded-lg bg-midnight px-2.5 py-2 font-semibold text-ice"><span>17:30 · Maria</span><span>Selected</span></div>
        <div className="flex justify-between rounded-lg bg-mist px-2.5 py-2"><span>18:15 · Elena</span><span className="text-ink3">Free</span></div>
      </div>
      <div className="mt-auto rounded-lg bg-accent p-2.5 text-center text-xs font-semibold">Confirm booking</div>
    </div>
  );
}
function VSite() {
  return (
    <div className="box-border flex h-[220px] w-[86%] flex-col gap-2.5 rounded-t-[14px] bg-ice p-4 text-midnight">
      <div className="flex justify-between text-[10.5px] text-ink3"><span className="font-bold text-midnight">Riverside Clinic</span><span>Services · Team · Book</span></div>
      <div className="display text-[34px] leading-[0.9] tracking-[-0.02em]">Care that fits<br />your week.</div>
      <div className="flex gap-2">
        <span className="rounded-md bg-midnight px-2.5 py-[7px] text-[10.5px] text-ice">Book a visit</span>
        <span className="rounded-md bg-canvas px-2.5 py-[7px] text-[10.5px]">Our services</span>
      </div>
    </div>
  );
}
function VDash() {
  return (
    <div className="box-border flex h-[220px] w-[86%] flex-col gap-2.5 rounded-t-[14px] border border-b-0 border-line2 bg-raised p-4">
      <span className="mono text-[10px] text-mute2">OPERATIONS · DEMO DATA</span>
      <div className="grid grid-cols-2 gap-2">
        {[["Orders synced", "1,284"], ["Manual steps", "0"]].map(([l, v]) => (
          <div key={l} className="rounded-[10px] bg-high px-3 py-2.5">
            <div className="text-[10px] text-mute2">{l}</div>
            <div className="display text-[26px] leading-none tracking-normal text-ice">{v}</div>
          </div>
        ))}
      </div>
      <div className="flex flex-1 items-end gap-1.5">
        {[35, 50, 45, 70, 62, 92].map((h, i) => (
          <div key={i} className={`flex-1 rounded-[3px] ${i === 5 ? "bg-accent" : "bg-line2"}`} style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  );
}
function Join() {
  return <div className="ml-6 h-3.5 w-0.5 bg-line2" />;
}
function VFlow() {
  return (
    <div className="flex w-[86%] flex-col self-center">
      <div className="flex items-center gap-2.5 rounded-[10px] border border-line2 bg-raised px-3.5 py-[11px]"><span className="mono text-[9.5px] text-accent">TRIGGER</span><span className="text-[12.5px] text-ice">Quote request received</span></div>
      <Join />
      <div className="flex items-center gap-2.5 rounded-[10px] border border-line2 bg-raised px-3.5 py-[11px]"><span className="mono text-[9.5px] text-l3-soft">WAIT</span><span className="text-[12.5px] text-ice">No reply after 2 days</span></div>
      <Join />
      <div className="flex items-center gap-2.5 rounded-[10px] bg-ice px-3.5 py-[11px] text-midnight"><span className="mono text-[9.5px] text-l3-ink">ACTION</span><span className="text-[12.5px]">Friendly follow-up sent</span></div>
    </div>
  );
}
function VChat() {
  return (
    <div className="box-border flex h-[250px] w-[230px] flex-col gap-2 rounded-t-[22px] bg-ice p-4 text-midnight">
      <div className="flex items-center gap-2 border-b border-chip pb-2 text-[11.5px] font-semibold"><span className="size-2 rounded-full bg-l3" />Front desk · assistant</div>
      <span className="max-w-[85%] self-start rounded-[12px_12px_12px_4px] bg-mist px-[11px] py-2 text-xs leading-[17px]">Are you open on Sunday?</span>
      <span className="max-w-[85%] self-end rounded-[12px_12px_4px_12px] bg-midnight px-[11px] py-2 text-xs leading-[17px] text-ice">We&apos;re closed Sundays. Saturday has 11:30 free. Book it?</span>
      <span className="max-w-[85%] self-start rounded-[12px_12px_12px_4px] bg-mist px-[11px] py-2 text-xs leading-[17px]">Yes please</span>
    </div>
  );
}
function VMenu() {
  return (
    <div className="box-border flex h-[220px] w-[86%] flex-col gap-2.5 rounded-t-[14px] bg-[#F6F1E9] p-4 text-[#2A211A]">
      <div className="flex justify-between text-[10.5px]"><span className="font-bold">Taverna Limani</span><span className="text-[#6B5B4D]">Menu · Book a table</span></div>
      <div className="display text-[34px] leading-[0.9] tracking-[-0.02em]">By the harbour<br />since 1987.</div>
      <div className="flex gap-2">
        <span className="rounded-md bg-[#2A211A] px-2.5 py-[7px] text-[10.5px] text-[#F6F1E9]">Book a table</span>
        <span className="rounded-md bg-[#E9DFD0] px-2.5 py-[7px] text-[10.5px]">Tonight&apos;s menu</span>
      </div>
    </div>
  );
}

export const PROJECTS: Project[] = [
  { id: "book", kind: "sys", title: "ElIT Booking", layer: "L2 · SYSTEMS", color: "#3B82F6", status: "IN DEVELOPMENT", tileBg: "bg-midnight", visual: VBook,
    line: "Online booking for salons: services, staff calendars and automatic reminders.",
    problem: "Small salons take bookings by phone, Instagram DMs and a paper diary. Double bookings and no-shows cost them time every week.",
    built: ["Booking page with services and staff", "Shared calendar for the team", "Automatic confirmations and reminders"],
    stands: "Our own product, in development. A pilot with a small number of salons comes next.", results: "[PUBLISHED AFTER THE PILOT]", stack: "NEXT.JS · POSTGRES · SMS API" },
  { id: "clinic", kind: "web", title: "Clinic website", layer: "L1 · INTERFACE", color: "#38E8FF", status: "CONCEPT", tileBg: "bg-stone", visual: VSite,
    line: "A service site built around one action: booking a visit.",
    problem: "Clinic websites often bury the one thing patients came for. Phone lines fill up with questions the site could answer.",
    built: ["Service pages written for patients", "One clear booking action on every page", "Team and opening hours that are easy to update"],
    stands: "A design concept to show our approach to service websites. Not built for a real clinic.", results: "NOT APPLICABLE · CONCEPT", stack: "NEXT.JS · HEADLESS CMS" },
  { id: "ops", kind: "sys", title: "Operations dashboard", layer: "L2 · SYSTEMS", color: "#3B82F6", status: "CONCEPT", tileBg: "bg-midnight", visual: VDash,
    line: "Orders, stock and staff in one view, synced from the tools you already use. Demo data.",
    problem: "Owners check four apps and a spreadsheet to answer one question: how is this week going?",
    built: ["One screen for orders, stock and staff", "Data synced from existing tools", "Weekly summary by email"],
    stands: "A concept with demo data, used to explore how dashboards should read for non-technical owners.", results: "NOT APPLICABLE · CONCEPT", stack: "REACT · APIS · SCHEDULED JOBS" },
  { id: "follow", kind: "auto", title: "Quote follow-up", layer: "L3 · AUTOMATION", color: "#8B5CF6", status: "CONCEPT", tileBg: "bg-midnight", visual: VFlow,
    line: "Quotes that chase themselves: polite follow-ups when nobody replies.",
    problem: "Quotes go out, then nobody follows up because everyone is busy. Interested customers simply forget.",
    built: ["Trigger when a quote is sent", "Timed, personal follow-up emails", "Stops automatically when the customer replies"],
    stands: "A concept flow we use to show clients how automation fits their existing email and CRM.", results: "NOT APPLICABLE · CONCEPT", stack: "WORKFLOW ENGINE · EMAIL · CRM API" },
  { id: "desk", kind: "ai", title: "Front-desk assistant", layer: "L3 · AI", color: "#8B5CF6", status: "IN DEVELOPMENT", tileBg: "bg-stone", visual: VChat,
    line: "Answers common questions and offers real free slots from the booking calendar.",
    problem: "The same questions arrive every day: opening hours, prices, free slots. Answering them takes the team away from customers in front of them.",
    built: ["Answers drawn only from the business’s own information", "Live free slots from the booking system", "Hands over to a person when unsure"],
    stands: "In development alongside ElIT Booking. We will pilot it only where it clearly helps.", results: "[PUBLISHED AFTER THE PILOT]", stack: "LLM API · BOOKING API · GUARDRAILS" },
  { id: "taverna", kind: "web", title: "Restaurant website", layer: "L1 · INTERFACE", color: "#38E8FF", status: "CONCEPT", tileBg: "bg-midnight", visual: VMenu,
    line: "Tonight’s menu and table booking, readable on a phone in bright sunlight.",
    problem: "Visitors look up restaurants on their phones, outdoors, in a hurry. Most sites load slowly and hide the menu in a PDF.",
    built: ["Menu as fast, readable pages, not a PDF", "Table booking in two taps", "Owner can update daily specials"],
    stands: "A design concept for hospitality clients. Names and details are invented.", results: "NOT APPLICABLE · CONCEPT", stack: "NEXT.JS · HEADLESS CMS" },
];

export const FILTERS: [Kind | "all", string][] = [
  ["all", "All"], ["web", "Websites"], ["sys", "Systems"], ["auto", "Automation"], ["ai", "AI"],
];
