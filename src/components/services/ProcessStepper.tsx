"use client";

import { useState } from "react";
import { Collapse } from "../Collapse";
import { wrapWide } from "../ui";

const STEPS = [
  { n: "01", name: "Talk", desc: "A 30-minute call about your business, what is slowing you down and what good looks like.",
    get: ["Honest advice on what to build first", "A rough idea of timeline"], need: ["Half an hour and a list of the tools you use", "A few websites or apps you like"] },
  { n: "02", name: "Plan", desc: "A written plan with scope, timeline and a fixed quote. Nothing is designed before you agree it.",
    get: ["Written scope and timeline", "A fixed quote for the agreed scope"], need: ["Feedback on the plan", "One person who can make decisions"] },
  { n: "03", name: "Build", desc: "Clickable designs first, then a preview link every week that you can open on your phone.",
    get: ["Clickable designs before any code", "A weekly preview link"], need: ["Your content: text, photos, logins", "Quick replies on each preview"] },
  { n: "04", name: "Look after", desc: "Launch is day one. We monitor, update and improve it, and add the next layer when you are ready.",
    get: ["Monitoring, updates and backups", "Handover notes and training"], need: ["Tell us when something changes", "Ideas for the next layer"] },
];

const List = ({ items }: { items: string[] }) => (
  <>
    {items.map((g) => (
      <p key={g} className="m-0 border-t border-line py-2.5 text-[15px] leading-[22px] text-fg2">{g}</p>
    ))}
  </>
);

/** "Four steps. No surprises." — stepper on desktop, accordion on phones. */
export function ProcessStepper() {
  const [step, setStep] = useState(0);
  const cur = STEPS[step];
  return (
    <section id="process" aria-labelledby="process-h" className={`${wrapWide} pb-[clamp(64px,7vw,96px)]`}>
      <div data-nav="dark" className="box-border flex flex-col gap-12 rounded-[36px] bg-midnight p-[clamp(32px,5vw,72px)] text-ice">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div className="flex flex-col gap-[18px]">
            <p className="mono m-0 flex items-center gap-3 text-xs tracking-[0.12em] text-mute2">
              <span aria-hidden="true" className="h-0.5 w-7 bg-mute2" />
              HOW A PROJECT RUNS
            </p>
            <h2 id="process-h" className="display m-0 text-[clamp(56px,6.4vw,96px)] leading-[0.9]">
              Four steps.
              <br />
              <span className="text-mute2">No surprises.</span>
            </h2>
          </div>
          <p className="m-0 max-w-[380px] text-[17px] leading-[27px] text-mute">
            You always know what happens next, what it includes and what we need from you.
          </p>
        </div>
        <div className="flex flex-wrap gap-x-14 gap-y-8">
          <div role="group" aria-label="Project steps" className="flex min-w-0 flex-[1_1_340px] flex-col border-t border-line">
            {STEPS.map((s, i) => {
              const on = i === step;
              return (
                <div key={s.n}>
                  <button
                    type="button"
                    aria-expanded={on}
                    onClick={(e) => {
                      setStep(i);
                      const t = e.currentTarget;
                      if (window.innerWidth <= 860)
                        setTimeout(() => t.scrollIntoView({ block: "nearest", behavior: "smooth" }), 30);
                    }}
                    className={`el-step relative flex w-full cursor-pointer items-center gap-5 border-0 border-b border-line bg-transparent py-5 text-left ${
                      on ? "text-ice" : "text-mute3"
                    }`}
                  >
                    <span
                      aria-hidden="true"
                      className="absolute -bottom-px left-0 h-0.5 bg-accent transition-[width] duration-[420ms] ease-brand"
                      style={{ width: on ? "100%" : "0%" }}
                    />
                    <span className="mono w-7 text-xs text-mute2">{s.n}</span>
                    <span className="display flex-1 text-[clamp(36px,3.8vw,56px)] leading-[0.95] tracking-[-0.02em]">{s.name}</span>
                    <span aria-hidden="true" className="mono text-lg text-mute2 md:hidden">{on ? "−" : "+"}</span>
                  </button>
                  <div className="md:hidden">
                    <Collapse open={on}>
                      <div role="region" aria-label={`${s.name} details`} className="border-b border-line pt-1.5 pb-[26px] pl-12">
                        <p className="m-0 mb-4 text-[17px] leading-[26px] text-fg2">{s.desc}</p>
                        <p className="mono m-0 mb-1 text-[11px] tracking-[0.12em] text-accent">YOU GET</p>
                        <List items={s.get} />
                        <p className="mono mt-4 mb-1 text-[11px] tracking-[0.12em] text-mute">WE NEED FROM YOU</p>
                        <List items={s.need} />
                      </div>
                    </Collapse>
                  </div>
                </div>
              );
            })}
          </div>
          <div
            role="region"
            aria-label={cur.name}
            aria-live="polite"
            className="box-border hidden min-w-0 flex-[999_1_520px] flex-col gap-6 rounded-3xl border border-line bg-panel p-[clamp(24px,3vw,40px)] md:flex"
          >
            <div key={cur.n} className="el-fade flex flex-col gap-6">
              <p className="mono m-0 text-xs tracking-[0.12em] text-accent">STEP {cur.n} · {cur.name.toUpperCase()}</p>
              <p className="m-0 max-w-[560px] text-[clamp(22px,2.2vw,28px)] leading-[1.3] font-medium tracking-[-0.015em] text-ice">{cur.desc}</p>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-2xl bg-raised px-[22px] py-5">
                  <h3 className="mono m-0 mb-2 text-[11px] font-medium tracking-[0.12em] text-mute">YOU GET</h3>
                  <List items={cur.get} />
                </div>
                <div className="rounded-2xl bg-raised px-[22px] py-5">
                  <h3 className="mono m-0 mb-2 text-[11px] font-medium tracking-[0.12em] text-mute">WE NEED FROM YOU</h3>
                  <List items={cur.need} />
                </div>
              </div>
            </div>
            <div className="mt-auto flex flex-wrap gap-2.5">
              <button
                type="button"
                onClick={() => setStep((s) => Math.max(0, s - 1))}
                disabled={step === 0}
                className="el-btn-dark min-h-11 cursor-pointer rounded-full border border-line2 bg-midnight px-[18px] text-sm font-semibold text-ice disabled:cursor-default disabled:opacity-40"
              >
                ← Previous
              </button>
              <button
                type="button"
                onClick={() => setStep((s) => Math.min(3, s + 1))}
                disabled={step === 3}
                className="el-btn-dark min-h-11 cursor-pointer rounded-full border border-line2 bg-midnight px-[18px] text-sm font-semibold text-ice disabled:cursor-default disabled:opacity-40"
              >
                Next step →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
