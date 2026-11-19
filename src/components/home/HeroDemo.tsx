"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";

const SCENES = [
  { label: "WEBSITE", layer: "L1 · INTERFACE" },
  { label: "BOOKING", layer: "L2 · SYSTEMS" },
  { label: "AUTOMATION", layer: "L3 · INTELLIGENCE" },
  { label: "AI ASSISTANT", layer: "L3 · INTELLIGENCE" },
];
const TICK = 1100;

const mono = "mono";

/** The live systems panel: one scene per service, cycles automatically. */
export function HeroDemo() {
  const [{ scene, sub }, setDemo] = useState({ scene: 0, sub: 3 });
  const reduce = useReducedMotion();
  const [userPaused, setPaused] = useState<boolean | null>(null);
  const paused = userPaused ?? !!reduce; // reduced motion: start paused
  const boxRef = useRef<HTMLDivElement>(null);
  const visible = useRef(true);

  useEffect(() => {
    const io = new IntersectionObserver((en) => (visible.current = en[0].isIntersecting), {
      threshold: 0.05,
    });
    if (boxRef.current) io.observe(boxRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (paused) return;
    const id = setInterval(() => {
      if (!visible.current || document.hidden) return;
      setDemo((d) => (d.sub + 1 > 4 ? { scene: (d.scene + 1) % 4, sub: 0 } : { ...d, sub: d.sub + 1 }));
    }, TICK);
    return () => clearInterval(id);
  }, [paused]);

  const o = (n: number) => ({ opacity: sub >= n ? 1 : 0.12 });
  const sv = (k: number) => {
    const on = k === scene;
    return {
      "aria-hidden": !on,
      className: "el-layer-scene",
      style: {
        opacity: on ? 1 : 0,
        visibility: on ? ("visible" as const) : ("hidden" as const),
        transform: `translateY(${on ? 0 : 8}px)`,
      },
    };
  };

  return (
    <div ref={boxRef} className="el-rise min-w-0 flex-[1.3_1_580px] [animation-delay:460ms]">
      <div
        role="region"
        aria-label="What we build, a live demo that cycles automatically"
        className="overflow-hidden rounded-[20px] border border-line bg-panel shadow-[0_0_0_1px_var(--color-line),0_40px_120px_-40px_var(--glow)]"
      >
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line py-3 pr-3.5 pl-[18px]">
          <span className={`${mono} inline-flex items-center gap-2 text-[11px] text-mute`}>
            <span className="size-[7px] rounded-full bg-accent shadow-[0_0_10px_var(--color-accent)]" />
            ELIT · LIVE DEMO
          </span>
          <div role="tablist" aria-label="Demo" className="flex flex-wrap gap-1">
            {SCENES.map((s, i) => (
              <button
                key={s.label}
                type="button"
                role="tab"
                aria-selected={i === scene}
                onClick={() => setDemo({ scene: i, sub: 3 })}
                className={`${mono} min-h-[34px] cursor-pointer rounded-md border-0 px-3 text-[11px] transition-colors duration-200 ${
                  i === scene ? "bg-high text-ice" : "bg-transparent text-mute2 hover:text-fg2"
                }`}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>

        <div className="relative box-border h-[420px] overflow-hidden px-[22px] pt-[22px] pb-16">
          {/* L1 · Website */}
          <div {...sv(0)}>
            <div className="flex h-full flex-col gap-4 sm:flex-row">
              <div className="flex min-w-0 flex-1 flex-col overflow-hidden rounded-xl border border-line2 bg-raised">
                <div className="flex items-center gap-1.5 border-b border-line px-3 py-2.5">
                  <span className="size-[7px] rounded-full bg-line2" />
                  <span className="size-[7px] rounded-full bg-line2" />
                  <span className="size-[7px] rounded-full bg-line2" />
                  <span className={`${mono} ml-2 rounded-md bg-high px-2.5 py-1 text-[10px] text-mute`}>
                    studionails.cy
                  </span>
                </div>
                <div className="flex flex-1 flex-col gap-3.5 p-[22px]">
                  <div className="flex justify-between text-[10.5px] text-mute">
                    <span className="font-bold text-ice">STUDIO NAILS</span>
                    <span>Services · Prices · Book</span>
                  </div>
                  <div className="display text-[32px] leading-[0.88] tracking-[-0.02em] text-ice sm:text-[46px]">
                    Your next set,
                    <br />
                    <span className="text-mute2">booked in a tap.</span>
                  </div>
                  <div className="flex gap-2">
                    <span className="rounded-md bg-accent px-3 py-2 text-[11px] font-semibold text-midnight">Book now</span>
                    <span className="rounded-md border border-line2 px-3 py-2 text-[11px] text-fg2">See prices</span>
                  </div>
                  <div className="mt-auto grid grid-cols-3 gap-2">
                    <div className="h-14 rounded-lg bg-high" />
                    <div className="h-14 rounded-lg bg-high" />
                    <div className="h-14 rounded-lg bg-high" />
                  </div>
                </div>
              </div>
              <div className={`${mono} hidden flex-[0_0_170px] flex-col gap-2 text-[10.5px] sm:flex`}>
                <span className="text-mute3">BUILD CHECKS</span>
                <span data-o style={o(1)} className="rounded-lg bg-raised px-3 py-2.5 text-fg2">✓ MOBILE-FIRST</span>
                <span data-o style={o(2)} className="rounded-lg bg-raised px-3 py-2.5 text-fg2">✓ SEO METADATA</span>
                <span data-o style={o(3)} className="rounded-lg bg-raised px-3 py-2.5 text-fg2">✓ BOOKING LINKED</span>
                <span data-o style={o(3)} className="mt-auto rounded-lg border border-accent p-3 text-ice">
                  <span className="block text-mute">SPEED SCORE · DEMO</span>
                  <span className="display block text-[40px] leading-none tracking-normal text-accent">98</span>
                </span>
              </div>
            </div>
          </div>

          {/* L2 · Booking */}
          <div {...sv(1)}>
            <div className="flex h-full flex-col gap-4 sm:flex-row">
              <div className="hidden min-w-0 flex-1 flex-col gap-3 sm:flex">
                <div className={`${mono} flex justify-between text-[10.5px] text-mute`}>
                  <span>CALENDAR · FRI 21 NOV</span>
                  <span>3 STAFF</span>
                </div>
                <div className="grid grid-cols-[52px_repeat(3,minmax(0,1fr))] gap-1.5 text-[11px] text-mute">
                  <span />
                  <span className="text-fg2">Maria</span>
                  <span className="text-fg2">Elena</span>
                  <span className="text-fg2">Sofia</span>
                  {[
                    ["16:00", 1, 1, 0],
                    ["17:00", 1, 0, 1],
                    ["17:30", 2, 0, 0],
                    ["18:15", 0, 1, 0],
                    ["19:00", 0, 0, 1],
                  ].map(([time, ...cells]) => (
                    <Row key={time as string} time={time as string} cells={cells as number[]} newStyle={o(1)} />
                  ))}
                </div>
              </div>
              <div className="flex flex-auto flex-col gap-2.5 sm:flex-[0_0_190px]">
                <div data-o style={o(1)} className="rounded-[10px] border border-line2 bg-raised p-3">
                  <p className={`${mono} m-0 mb-1 text-[10px] text-mute`}>ONLINE BOOKING</p>
                  <p className="m-0 text-[13px] leading-[18px] text-ice">Gel manicure · Maria · 17:30</p>
                </div>
                <div data-o style={o(2)} className="rounded-[10px] bg-ice p-3 text-midnight">
                  <p className={`${mono} m-0 mb-1 text-[10px]`}>CONFIRMED · #EL-2047</p>
                  <p className="display m-0 text-[26px] leading-none tracking-normal">Booked.</p>
                </div>
                <p data-o style={o(3)} className={`${mono} m-0 text-[10.5px] text-mute`}>
                  SMS REMINDER · THU 18:00
                </p>
              </div>
            </div>
          </div>

          {/* L3 · Automation */}
          <div {...sv(2)}>
            <div className="flex h-full flex-col gap-2.5">
              <p className={`${mono} m-0 mb-1 text-[10.5px] text-mute`}>WORKFLOW · NEW ENQUIRY</p>
              <Flow tag="TRIGGER" tagClass="text-accent" text="Website form submitted" right="09:41:02" rightClass="text-mute" />
              <Link_ />
              <Flow style={o(1)} tag="STEP 1" text="Contact added to your CRM" right="✓ DONE" />
              <Link_ />
              <Flow style={o(2)} tag="STEP 2" text="Personal reply sent by email" right="✓ DONE" />
              <Link_ />
              <Flow
                style={o(3)}
                tag="STEP 3"
                tagClass="text-accent"
                text="Follow-up scheduled in 3 days"
                right="0 MANUAL STEPS"
                rightClass="text-ice"
                hot
              />
            </div>
          </div>

          {/* L3 · AI assistant */}
          <div {...sv(3)}>
            <div className="flex h-full flex-col gap-2.5">
              <div className="flex items-center justify-between">
                <p className={`${mono} m-0 text-[10.5px] text-mute`}>AI ASSISTANT · WEBSITE CHAT</p>
                <span className={`${mono} rounded-full border border-line2 px-2.5 py-1 text-[10px] text-fg2`}>
                  IN DEVELOPMENT
                </span>
              </div>
              <Bubble me>Do you have anything Friday evening?</Bubble>
              <Bubble style={o(1)}>Yes: 17:30 with Maria or 19:00 with Elena. Shall I book 17:30?</Bubble>
              <Bubble me style={o(2)}>Yes please.</Bubble>
              <Bubble style={o(3)} hot>
                Done. You&apos;re booked, and you&apos;ll get a reminder on Thursday.
              </Bubble>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setPaused(!paused)}
            aria-label={paused ? "Play the demo" : "Pause the demo"}
            className={`el-btn-dark ${mono} absolute right-3.5 bottom-3.5 min-h-9 cursor-pointer rounded-full border border-line2 bg-panel px-3.5 text-[11px] text-ice`}
          >
            {paused ? "PLAY" : "PAUSE"}
          </button>
        </div>

        <div className="grid grid-cols-4 border-t border-line">
          {SCENES.map((s, i) => {
            const on = i === scene;
            return (
              <div
                key={s.label}
                className={`${mono} relative -mt-px border-t-2 border-r border-line px-3.5 py-3 text-[10px] ${
                  on ? "text-fg2" : "text-mute3"
                } last:border-r-0`}
              >
                <span
                  aria-hidden="true"
                  className="absolute -top-0.5 left-0 h-0.5 bg-accent"
                  style={{
                    width: `${on ? Math.round(((sub + 1) / 5) * 100) : 0}%`,
                    transition: `width ${on && sub > 0 && !paused ? TICK : 0}ms linear`,
                  }}
                />
                {s.layer}
              </div>
            );
          })}
        </div>
      </div>
      <p className={`${mono} mx-0.5 mt-3 mb-0 text-[11px] text-mute2`}>
        DEMO DATA · ONE STUDIO, FOUR LAYERS OF ONE SYSTEM
      </p>
    </div>
  );
}

function Row({ time, cells, newStyle }: { time: string; cells: number[]; newStyle: React.CSSProperties }) {
  return (
    <>
      <span>{time}</span>
      {cells.map((c, i) =>
        c === 2 ? (
          <span
            key={i}
            data-o
            style={newStyle}
            className="flex h-[34px] items-center rounded-md border border-accent bg-accent-soft px-2 text-ice"
          >
            New · Gel
          </span>
        ) : (
          <span key={i} className={`h-[34px] rounded-md ${c ? "bg-high" : ""}`} />
        ),
      )}
    </>
  );
}

function Link_() {
  return <div aria-hidden="true" className="ml-[26px] h-3 w-px bg-line2" />;
}

function Flow({
  tag,
  text,
  right,
  tagClass = "text-mute",
  rightClass = "text-fg2",
  hot,
  style,
}: {
  tag: string;
  text: string;
  right: string;
  tagClass?: string;
  rightClass?: string;
  hot?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <div
      data-o
      style={style}
      className={`flex items-center gap-3.5 rounded-[10px] border px-4 py-3.5 ${
        hot ? "border-accent bg-accent-soft" : "border-line2 bg-raised"
      }`}
    >
      <span className={`mono text-[10.5px] ${tagClass}`}>{tag}</span>
      <span className="flex-1 text-sm text-ice">{text}</span>
      <span className={`mono hidden text-[10.5px] sm:inline ${rightClass}`}>{right}</span>
    </div>
  );
}

function Bubble({
  me,
  hot,
  style,
  children,
}: {
  me?: boolean;
  hot?: boolean;
  style?: React.CSSProperties;
  children: React.ReactNode;
}) {
  if (me)
    return (
      <div
        data-o
        style={style}
        className="max-w-[72%] self-end rounded-[14px_14px_4px_14px] bg-high px-3.5 py-[11px] text-sm leading-5 text-ice"
      >
        {children}
      </div>
    );
  return (
    <div data-o style={style} className="flex max-w-[80%] gap-2.5 self-start">
      <span className="size-[26px] flex-none rounded-lg border border-accent bg-accent-soft" />
      <div
        className={`rounded-[14px_14px_14px_4px] border px-3.5 py-[11px] text-sm leading-5 text-ice ${
          hot ? "border-accent bg-accent-soft" : "border-line2 bg-raised"
        }`}
      >
        {children}
      </div>
    </div>
  );
}
