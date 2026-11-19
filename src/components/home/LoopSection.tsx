"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import { drawLayeredE, LOOP_SECONDS } from "./LayeredE";
import { wrapWide } from "../ui";

const PHASES = ["PLANNING", "BUILDING", "LOOKING AFTER"];

/** "Launch is day one." — the loop, with the 3D layered E inside the ring. */
export function LoopSection() {
  const cvRef = useRef<HTMLCanvasElement>(null);
  const boxRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState(0);
  const reduce = useReducedMotion();
  const [userPaused, setPaused] = useState<boolean | null>(null);
  const paused = userPaused ?? !!reduce; // reduced motion: hold still
  const pausedRef = useRef(false);
  useEffect(() => {
    pausedRef.current = paused;
  }, [paused]);

  useEffect(() => {
    const cv = cvRef.current;
    const box = boxRef.current;
    if (!cv || !box) return;
    const reduceNow = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let t = reduceNow ? 7 : 0; // reduced motion: hold the assembled, glowing E
    let last = 0;
    let visible = false; // start drawing only once it scrolls into view
    let raf = 0;
    let curPhase = 0;
    const drag = { yaw: 0, pitch: 0 };
    let yawVel = 0;
    let dragging = false;

    const draw = () => drawLayeredE(cv, t, drag);

    const loop = (ts: number) => {
      raf = requestAnimationFrame(loop);
      const dt = last ? Math.min(0.05, (ts - last) / 1000) : 0;
      last = ts;
      const syncPhase = () => {
        const ph = Math.floor((t % LOOP_SECONDS) / 3);
        if (ph !== curPhase) {
          curPhase = ph;
          setPhase(ph);
        }
      };
      if (pausedRef.current || !visible || document.hidden) {
        syncPhase();
        if (dragging) draw();
        return;
      }
      t += dt;
      if (!dragging) {
        drag.yaw += yawVel;
        yawVel *= 0.92;
        drag.yaw *= 0.985;
        drag.pitch *= 0.97;
      }
      syncPhase();
      draw();
    };
    raf = requestAnimationFrame(loop);

    // Drag to turn
    let px = 0, py = 0;
    const down = (e: PointerEvent) => {
      dragging = true;
      px = e.clientX;
      py = e.clientY;
      cv.style.cursor = "grabbing";
      try { cv.setPointerCapture(e.pointerId); } catch {}
    };
    const move = (e: PointerEvent) => {
      if (!dragging) return;
      const dx = e.clientX - px, dy = e.clientY - py;
      px = e.clientX;
      py = e.clientY;
      drag.yaw += dx * 0.01;
      yawVel = dx * 0.01;
      drag.pitch = Math.max(-0.5, Math.min(0.5, drag.pitch + dy * 0.006));
      if (pausedRef.current) draw();
    };
    const up = () => {
      dragging = false;
      cv.style.cursor = "grab";
    };
    // Keyboard: arrows turn the E
    const key = (e: KeyboardEvent) => {
      const m: Record<string, [number, number]> = {
        ArrowLeft: [-0.25, 0], ArrowRight: [0.25, 0], ArrowUp: [0, -0.12], ArrowDown: [0, 0.12],
      };
      const d = m[e.key];
      if (!d) return;
      e.preventDefault();
      drag.yaw += d[0];
      drag.pitch = Math.max(-0.5, Math.min(0.5, drag.pitch + d[1]));
      draw();
    };
    cv.addEventListener("pointerdown", down);
    cv.addEventListener("pointermove", move);
    cv.addEventListener("pointerup", up);
    cv.addEventListener("pointercancel", up);
    cv.addEventListener("keydown", key);

    // Pause off-screen
    const io = new IntersectionObserver(
      (en) => {
        visible = en[0].isIntersecting;
      },
      { threshold: 0.05 },
    );
    io.observe(box);
    const onResize = () => draw();
    window.addEventListener("resize", onResize);
    draw();

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", onResize);
      cv.removeEventListener("pointerdown", down);
      cv.removeEventListener("pointermove", move);
      cv.removeEventListener("pointerup", up);
      cv.removeEventListener("pointercancel", up);
      cv.removeEventListener("keydown", key);
    };
  }, []);

  const lc = (i: number) => (phase === i ? "text-ice" : "text-mute3");
  const lbl =
    "mono absolute -translate-x-1/2 -translate-y-1/2 whitespace-nowrap text-[clamp(11px,1.1vw,15px)] tracking-[0.08em] transition-colors duration-[400ms] ease-brand hidden sm:block";

  return (
    <section id="approach" aria-labelledby="loop-h" className={`${wrapWide} scroll-mt-6 pb-[clamp(64px,7vw,96px)]`}>
      <div
        data-nav="dark"
        className="relative box-border flex flex-col gap-14 rounded-[36px] bg-midnight p-[clamp(32px,5vw,72px)] text-ice"
      >
        <div className="flex flex-wrap items-center gap-12">
          <div className="flex min-w-0 flex-[1_1_440px] flex-col items-center gap-6">
            <div
              ref={boxRef}
              className="relative mt-11 aspect-square w-full max-w-[290px] sm:mt-0 sm:max-w-[560px]"
            >
              <canvas
                ref={cvRef}
                tabIndex={0}
                role="img"
                aria-label="The ElIT layered E: the three layers separate while planning, slide together while building, and glow once it is looked after. Drag or use the arrow keys to turn it."
                className="absolute inset-0 size-full cursor-grab touch-pan-y rounded-full"
              />
              <span aria-hidden="true" className={`${lbl} top-[3.5%] left-1/2 ${lc(0)}`}>01 PLAN</span>
              <span aria-hidden="true" className={`${lbl} top-[79%] left-[86%] ${lc(1)}`}>02 BUILD</span>
              <span aria-hidden="true" className={`${lbl} top-[79%] left-[14%] ${lc(2)}`}>03 LOOK AFTER</span>
              <span
                aria-hidden="true"
                className="mono absolute top-[77%] left-1/2 hidden -translate-x-1/2 -translate-y-1/2 text-[clamp(10px,1vw,13px)] tracking-[0.24em] whitespace-nowrap text-mute sm:block"
              >
                {PHASES[phase]}
              </span>
            </div>
            {/* Phones: smaller ring, steps shown as one row below it */}
            <div
              aria-hidden="true"
              className="mono flex w-full justify-between gap-2 border-t border-line pt-4 text-[11px] tracking-[0.08em] sm:hidden"
            >
              <span className={`transition-colors duration-[400ms] ${lc(0)}`}>01 PLAN</span>
              <span className={`transition-colors duration-[400ms] ${lc(1)}`}>02 BUILD</span>
              <span className={`transition-colors duration-[400ms] ${lc(2)}`}>03 LOOK AFTER</span>
            </div>
            <p className="sr-only-h" aria-live="polite">
              {`Step ${phase + 1}: ${PHASES[phase].toLowerCase()}`}
            </p>
          </div>
          <div className="flex min-w-0 flex-[1_1_420px] flex-col gap-6">
            <p className="mono m-0 flex items-center gap-3 text-xs tracking-[0.12em] text-mute2">
              <span aria-hidden="true" className="h-0.5 w-7 bg-mute2" />
              THE LOOP
            </p>
            <h2 id="loop-h" className="display m-0 text-[clamp(56px,6.4vw,104px)] leading-[0.88]">
              Launch is
              <br />
              <span className="text-mute2">day one.</span>
            </h2>
            <p className="m-0 max-w-[460px] text-lg leading-[29px] text-mute">
              Plan it, build it, look after it. Every turn of the loop adds the next layer to your
              business.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-x-10 gap-y-6 border-t border-line pt-8">
          <p className="m-0 text-[19px] leading-7 text-mute">
            You don&apos;t need an agency that disappears after launch.
          </p>
          <p className="m-0 text-[19px] leading-7 text-mute">
            You don&apos;t need three different freelancers for your website, your bookings and your
            automations.
          </p>
          <p className="m-0 text-[19px] leading-7 font-semibold text-ice">
            You need one team that builds it, looks after it, and adds the next layer.
          </p>
        </div>
        <button
          type="button"
          onClick={() => setPaused(!paused)}
          aria-label={paused ? "Play the loop animation" : "Pause the loop animation"}
          className="el-btn-dark mono absolute top-[clamp(20px,3vw,40px)] right-[clamp(20px,3vw,40px)] min-h-10 cursor-pointer rounded-full border border-line2 bg-midnight px-4 text-[11.5px] tracking-[0.1em] text-ice"
        >
          {paused ? "PLAY" : "PAUSE"}
        </button>
      </div>
    </section>
  );
}
