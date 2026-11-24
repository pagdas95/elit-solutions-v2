import type { Layer } from "@/lib/layers";

type Step = { tag: string; text: string };

/** Demo data only: what each layer does, as four quick steps. */
const DEMOS: Record<Layer["key"], { title: string; steps: Step[] }> = {
  L1: {
    title: "WEBSITE · STUDIONAILS.CY",
    steps: [
      { tag: "PLAN", text: "Pages mapped to one goal: bookings" },
      { tag: "DESIGN", text: "Clickable design approved" },
      { tag: "CHECK", text: "Tested on real phones" },
      { tag: "LIVE", text: "Published · speed score 98" },
    ],
  },
  L2: {
    title: "BOOKING · FRI 21 NOV",
    steps: [
      { tag: "CHOOSE", text: "Gel manicure with Maria" },
      { tag: "SLOT", text: "17:30 picked from live calendar" },
      { tag: "CONFIRM", text: "Booking #EL-2047 confirmed" },
      { tag: "REMIND", text: "SMS reminder set for Thu 18:00" },
    ],
  },
  L3: {
    title: "WORKFLOW · NEW ENQUIRY",
    steps: [
      { tag: "TRIGGER", text: "Website form submitted" },
      { tag: "STEP 1", text: "Contact added to your CRM" },
      { tag: "STEP 2", text: "Personal reply sent" },
      { tag: "DONE", text: "Follow-up booked · 0 manual steps" },
    ],
  },
  F: {
    title: "SYSTEM STATUS",
    steps: [
      { tag: "HOSTING", text: "Deployed and running" },
      { tag: "BACKUPS", text: "Nightly, kept 30 days" },
      { tag: "SECURITY", text: "SSL valid · updates applied" },
      { tag: "MONITOR", text: "Uptime checks every minute" },
    ],
  },
};

/**
 * A four-step micro-demo for one layer. It replays whenever it mounts,
 * so keying it by layer (and a replay counter) restarts the sequence.
 */
export function StackDemo({ layer, compact = false }: { layer: Layer; compact?: boolean }) {
  const d = DEMOS[layer.key];
  return (
    <div aria-label={`${layer.name}: demo`} role="group" className="flex flex-col gap-3">
      <p className="mono m-0 flex items-center justify-between gap-3 text-[10.5px] tracking-[0.1em] text-mute2">
        <span>{d.title}</span>
        <span>DEMO DATA</span>
      </p>
      <ol className={`m-0 grid list-none gap-2 p-0 ${compact ? "grid-cols-1" : "grid-cols-2 lg:grid-cols-4"}`}>
        {d.steps.map((s, i) => {
          const last = i === d.steps.length - 1;
          return (
            <li
              key={s.tag}
              className="el-demo-step flex min-h-[78px] flex-col justify-between gap-2 rounded-[10px] border px-3.5 py-3"
              style={{
                animationDelay: `${120 + i * 420}ms`,
                borderColor: last ? layer.color : "var(--color-line2)",
                background: last ? "var(--color-accent-soft)" : "var(--color-raised)",
              }}
            >
              <span className="mono text-[10px] tracking-[0.08em]" style={{ color: last ? layer.textColor : "var(--color-mute)" }}>
                {String(i + 1).padStart(2, "0")} · {s.tag}
              </span>
              <span className="text-[13.5px] leading-[19px] text-ice">{s.text}</span>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
