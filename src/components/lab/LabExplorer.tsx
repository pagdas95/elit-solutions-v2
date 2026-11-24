"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { Arrow } from "../icons";
import { scrollToEl } from "../SmoothScroll";
import { StatusTag, wrap } from "../ui";
import { FILTERS, PROJECTS, type Kind } from "./projects";

/** Filter chips + six project tiles + the case file of the selected project. */
export function LabExplorer() {
  const [filter, setFilter] = useState<Kind | "all">("all");
  const [sel, setSel] = useState("book");
  const caseRef = useRef<HTMLElement>(null);

  const toCase = () =>
    setTimeout(() => scrollToEl(caseRef.current), 40);

  // Deep links from Home tiles: /lab?p=clinic
  useEffect(() => {
    const p = new URLSearchParams(window.location.search).get("p");
    if (!p || !PROJECTS.some((x) => x.id === p)) return;
    const raf = requestAnimationFrame(() => {
      setSel(p);
      toCase();
    });
    return () => cancelAnimationFrame(raf);
  }, []);

  const list = PROJECTS.filter((p) => filter === "all" || p.kind === filter);
  const idx = Math.max(0, PROJECTS.findIndex((p) => p.id === sel));
  const c = PROJECTS[idx];
  const step = (d: number) => setSel(PROJECTS[(idx + d + PROJECTS.length) % PROJECTS.length].id);

  return (
    <>
      <section aria-labelledby="work-h" className={`${wrap} flex flex-col gap-8 pt-[clamp(64px,7vw,96px)] pb-[clamp(56px,6vw,80px)]`}>
        <h2 id="work-h" className="sr-only-h">Projects</h2>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div role="group" aria-label="Filter projects" className="flex flex-wrap gap-2">
            {FILTERS.map(([k, label]) => {
              const on = filter === k;
              const n = k === "all" ? PROJECTS.length : PROJECTS.filter((p) => p.kind === k).length;
              return (
                <button
                  key={k}
                  type="button"
                  aria-pressed={on}
                  onClick={() => setFilter(k)}
                  className={`el-chip el-chip-light inline-flex min-h-11 cursor-pointer items-center gap-2.5 rounded-full border px-[18px] text-[15px] font-medium ${
                    on ? "border-midnight bg-midnight text-ice" : "border-hair bg-transparent text-midnight"
                  }`}
                >
                  {label}
                  <span className="mono text-[11px] opacity-70">{n}</span>
                </button>
              );
            })}
          </div>
          <p aria-live="polite" className="mono m-0 text-xs tracking-[0.08em] text-ink3">
            SHOWING {list.length} OF {PROJECTS.length}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => {
            const on = p.id === sel;
            const V = p.visual;
            return (
              <button
                key={p.id}
                type="button"
                aria-pressed={on}
                aria-label={`Open case file: ${p.title}`}
                onClick={() => {
                  setSel(p.id);
                  toCase();
                }}
                className={`el-tile flex min-w-0 cursor-pointer flex-col rounded-[32px] border-2 bg-card p-2.5 text-left text-midnight ${
                  on ? "border-midnight" : "border-transparent"
                }`}
              >
                <div aria-hidden="true" className={`box-border flex h-[280px] w-full items-end justify-center overflow-hidden rounded-[22px] px-5 pt-7 ${p.tileBg}`}>
                  <V />
                </div>
                <div className="flex flex-col gap-2.5 px-3.5 pt-5 pb-3.5">
                  <div className="mono flex items-center justify-between gap-3 text-[11px] tracking-[0.08em] text-ink3">
                    <span className="inline-flex items-center gap-2">
                      <span className="size-[9px] rounded-[2px]" style={{ background: p.color }} />
                      {p.layer}
                    </span>
                    <StatusTag status={p.status} />
                  </div>
                  <h3 className="m-0 text-2xl leading-[1.1] font-medium tracking-[-0.02em] uppercase">{p.title}</h3>
                  <p className="m-0 text-[15px] leading-[23px] text-ink2">{p.line}</p>
                  <span className="mt-1 inline-flex items-center gap-2 text-sm font-semibold">
                    {on ? "Case file open below" : "Open case file"} <Arrow />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </section>

      <section
        ref={caseRef}
        id="casefile"
        aria-labelledby="case-h"
        className="mx-auto box-border max-w-[1400px] scroll-mt-20 px-[clamp(12px,2vw,40px)] pb-[clamp(64px,7vw,96px)]"
      >
        <div data-nav="dark" className="box-border flex flex-col gap-12 rounded-[36px] bg-midnight p-[clamp(32px,5vw,72px)] text-ice">
          <div key={c.id} className="el-fade flex flex-wrap items-end justify-between gap-6">
            <div className="flex min-w-0 flex-col gap-[18px]">
              <p className="mono m-0 flex items-center gap-3 text-xs tracking-[0.12em] text-mute2">
                <span className="h-0.5 w-7" style={{ background: c.color }} />
                CASE FILE · {String(idx + 1).padStart(2, "0")} · {c.layer}
              </p>
              <h2 id="case-h" className="display m-0 text-[clamp(56px,7vw,112px)] leading-[0.88]">{c.title}</h2>
            </div>
            <p className="mono m-0 rounded-full border px-3 py-[7px] text-[11px] tracking-[0.1em]" style={{ borderColor: c.color }}>
              [ {c.status} ]
            </p>
          </div>
          <div key={c.id + "-g"} className="el-fade grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <Card title="THE PROBLEM"><p className="m-0 text-[17px] leading-[27px] text-fg2">{c.problem}</p></Card>
            <Card title="WHAT WE BUILT" tight>
              {c.built.map((b) => (
                <p key={b} className="m-0 border-t border-line py-2.5 text-[15px] leading-[22px] text-fg2">{b}</p>
              ))}
            </Card>
            <Card title="WHERE IT STANDS">
              <p className="m-0 text-[17px] leading-[27px] text-fg2">{c.stands}</p>
              <p className="mono mt-auto mb-0 border-t border-line pt-3.5 text-[11px] tracking-[0.08em] text-mute2">
                RESULTS · {c.results}
              </p>
            </Card>
          </div>
          <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-8">
            <p className="mono m-0 text-xs tracking-[0.08em] text-mute">STACK · {c.stack}</p>
            <div className="flex flex-wrap gap-2.5">
              <button type="button" onClick={() => step(-1)} className="el-btn-dark min-h-[46px] cursor-pointer rounded-full border border-line2 bg-midnight px-[18px] text-sm font-semibold text-ice">
                ← Previous
              </button>
              <button type="button" onClick={() => step(1)} className="el-btn-dark min-h-[46px] cursor-pointer rounded-full border border-line2 bg-midnight px-[18px] text-sm font-semibold text-ice">
                Next project →
              </button>
              <Link href="/contact" className="el-btn inline-flex min-h-[46px] items-center gap-2.5 rounded-lg bg-accent px-5 text-sm font-semibold text-midnight">
                Start something similar <Arrow />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

function Card({ title, children, tight }: { title: string; children: React.ReactNode; tight?: boolean }) {
  return (
    <div className={`flex flex-col rounded-[20px] border border-line bg-panel p-[26px] ${tight ? "gap-1" : "gap-3"}`}>
      <h3 className={`mono m-0 text-[11px] font-medium tracking-[0.12em] text-mute ${tight ? "mb-2" : ""}`}>{title}</h3>
      {children}
    </div>
  );
}
