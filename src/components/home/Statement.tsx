"use client";

import { useEffect, useRef, useState } from "react";

const TEXT = "Software that fits how your business actually works.";
const WORDS = TEXT.split(" ");

/** The statement fills in word by word as it scrolls through the viewport. */
export function Statement() {
  const ref = useRef<HTMLParagraphElement>(null);
  const [k, setK] = useState(WORDS.length);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const vh = window.innerHeight || 800;
      const r = el.getBoundingClientRect();
      const p = Math.max(0, Math.min(1, (vh * 0.85 - r.top) / (r.height + vh * 0.35)));
      setK(Math.round(p * WORDS.length));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <p
      ref={ref}
      aria-hidden="true"
      className="display m-0 max-w-[860px] text-[clamp(56px,7.4vw,112px)] leading-[0.9]"
    >
      {WORDS.map((w, i) => (
        <span
          key={i}
          className={`transition-colors duration-[260ms] ease-out ${i < k ? "text-midnight" : "text-ghost"}`}
        >
          {w}{" "}
        </span>
      ))}
    </p>
  );
}
