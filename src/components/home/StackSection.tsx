"use client";

import { useState } from "react";
import { LAYERS } from "@/lib/layers";
import { StackDemo } from "./StackDemo";
import { Collapse } from "../Collapse";
import { wrapWide } from "../ui";
import { scrollToEl } from "../SmoothScroll";

const SPRING = "transform 700ms cubic-bezier(0.2,0.7,0.1,1), opacity 300ms ease-out";

/** "Three layers. One team." — interactive on desktop, accordion on phones. */
export function StackSection() {
  const [active, setActive] = useState(0);
  const [run, setRun] = useState(0); // bump to replay the micro-demo
  const cur = LAYERS[active];
  const all = active === 3; // Foundation lights the whole stack
  const op = (i: number) => (all || active === i ? 1 : 0.16);
  const ty1 = all ? 0 : -34;
  const ty3 = all ? 0 : 34;

  return (
    <section id="stack" aria-labelledby="stack-h" className={`${wrapWide} scroll-mt-6 pb-[clamp(64px,7vw,96px)]`}>
      <div
        data-nav="dark"
        className="box-border flex flex-wrap gap-14 rounded-[36px] bg-midnight p-[clamp(32px,5vw,72px)] text-ice"
      >
        <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-8">
          <div className="flex flex-col gap-4">
            <p className="mono m-0 text-xs tracking-[0.12em] text-mute">THE STACK · WHAT WE BUILD</p>
            <h2 id="stack-h" className="display m-0 text-[clamp(56px,6.4vw,96px)] leading-[0.9]">
              Three layers.
              <br />
              One team.
            </h2>
          </div>
          <div aria-label="Service layers" role="group" className="flex flex-col border-t border-line">
            {LAYERS.map((l, i) => {
              const on = i === active;
              return (
                <div key={l.key}>
                  <button
                    type="button"
                    aria-expanded={on}
                    onClick={(e) => {
                      setActive(i);
                      setRun((r) => r + 1);
                      const t = e.currentTarget;
                      if (window.innerWidth <= 860)
                        setTimeout(() => scrollToEl(t, "nearest"), 30);
                    }}
                    className={`el-layer display flex w-full cursor-pointer items-center gap-4 border-0 border-b border-line bg-transparent py-[18px] text-left text-[clamp(38px,4.2vw,64px)] leading-[0.95] ${
                      on ? "text-ice" : "text-mute3"
                    }`}
                  >
                    <span
                      className="size-2.5 flex-none rounded-[2px] transition-colors duration-300"
                      style={{ background: on ? l.color : "var(--color-line)" }}
                    />
                    <span className="flex-1">{l.name}</span>
                    <span className="mono text-xs font-normal tracking-[0.1em] text-mute2">{l.key}</span>
                    <span aria-hidden="true" className="mono text-lg font-normal tracking-normal text-mute2 md:hidden">
                      {on ? "−" : "+"}
                    </span>
                  </button>
                  <div className="md:hidden">
                    <Collapse open={on}>
                      <div role="region" aria-label={`${l.name} details`} className="border-b border-line pt-1 pb-6 pl-[26px]">
                        <p className="mono m-0 mb-1.5 text-[11px]" style={{ color: l.textColor }}>
                          {l.title.toUpperCase()}
                        </p>
                        <p className="m-0 mb-3.5 text-base leading-6 text-mute">{l.desc}</p>
                        {l.items.map((it) => (
                          <p key={it} className="m-0 border-t border-line py-2.5 text-[15px] leading-[22px] text-fg2">
                            {it}
                          </p>
                        ))}
                        <p
                          className="mono mt-3.5 mb-0 inline-block rounded-full border px-3 py-1.5 text-[10.5px] text-ice"
                          style={{ borderColor: l.color }}
                        >
                          {l.status}
                        </p>
                        <div className="mt-5">
                          {on && <StackDemo key={`${l.key}-${run}`} layer={l} compact />}
                        </div>
                      </div>
                    </Collapse>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="box-border hidden min-w-0 flex-[1_1_520px] flex-wrap items-center gap-8 rounded-3xl border border-line bg-panel p-[clamp(24px,3vw,40px)] md:flex">
          <svg
            viewBox="-10 -50 340 520"
            role="img"
            aria-label={`The layered E, with ${all ? "all layers" : `the ${cur.name} layer`} highlighted`}
            className="h-auto w-[220px] max-w-full flex-[0_1_220px]"
          >
            <g style={{ transform: `translateY(${ty3}px)`, opacity: op(2), transition: SPRING }}>
              <polygon fill="#4C1D95" transform="translate(0,16)" points="55,341.5 135.25,295 157.75,308.5 225.25,268.75 310,319 161.5,405.25" />
              <polygon fill="#8B5CF6" points="55,341.5 135.25,295 157.75,308.5 225.25,268.75 310,319 161.5,405.25" />
            </g>
            <g style={{ opacity: op(1), transition: SPRING }}>
              <polygon fill="#1E3A8A" transform="translate(0,16)" points="11.5,259 205,146.5 290.5,195.25 49,337 11.5,315.25" />
              <polygon fill="#3B82F6" points="11.5,259 205,146.5 290.5,195.25 49,337 11.5,315.25" />
            </g>
            <g style={{ transform: `translateY(${ty1}px)`, opacity: op(0), transition: SPRING }}>
              <polygon fill="#155E75" transform="translate(0,16)" points="10,124 200.5,10 310,73 227.5,121 199,104.5 10,214" />
              <polygon fill="#22D3EE" points="10,124 200.5,10 310,73 227.5,121 199,104.5 10,214" />
            </g>
          </svg>
          <div key={cur.key} className="el-fade flex min-w-0 flex-[1_1_240px] flex-col gap-[18px]" aria-live="polite">
            <p className="mono m-0 inline-flex items-center gap-2 text-xs tracking-[0.1em]" style={{ color: cur.textColor }}>
              {cur.key} · {cur.upper}
            </p>
            <h3 className="m-0 text-[28px] leading-[1.1] font-medium tracking-[-0.02em] uppercase">{cur.title}</h3>
            <p className="m-0 text-base leading-[26px] text-mute">{cur.desc}</p>
            <ul className="m-0 flex list-none flex-col border-t border-line p-0">
              {cur.items.map((it) => (
                <li key={it} className="border-b border-line py-[11px] text-[15px] leading-[22px] text-canvas">
                  {it}
                </li>
              ))}
            </ul>
            <p
              className="mono m-0 self-start rounded-full border px-3 py-[7px] text-[11px] tracking-[0.1em] text-ice"
              style={{ borderColor: cur.color }}
            >
              [ {cur.status} ]
            </p>
          </div>
          <div className="flex basis-full flex-col gap-3 border-t border-line pt-6">
            <StackDemo key={`${cur.key}-${run}`} layer={cur} />
            <button
              type="button"
              onClick={() => setRun((r) => r + 1)}
              className="el-btn-dark mono min-h-9 cursor-pointer self-end rounded-full border border-line2 bg-panel px-3.5 text-[11px] tracking-[0.08em] text-ice"
            >
              REPLAY
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
