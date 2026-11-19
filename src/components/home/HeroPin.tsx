"use client";

import { useEffect, useRef, type ReactNode } from "react";

/**
 * Pins the hero while the canvas sheet slides over it; the hero eases back
 * (scale 1 → 0.95, opacity 1 → 0.4). Desktop only (≥861px), like the design.
 * Writes styles directly so scrolling never re-renders React.
 */
export function HeroPin({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const mq = window.matchMedia("(min-width: 861px)");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;

    const apply = () => {
      raf = 0;
      if (!mq.matches) {
        el.style.position = "relative";
        el.style.top = "0px";
        el.style.transform = "none";
        el.style.opacity = "1";
        return;
      }
      const vh = window.innerHeight || 800;
      const h = el.offsetHeight;
      const y = window.scrollY;
      el.style.position = "sticky";
      el.style.top = `${Math.min(0, Math.round(vh - h))}px`;
      if (reduce.matches) return;
      const hp = Math.max(0, Math.min(1, (y - Math.max(0, h - vh)) / 760));
      el.style.transform = `scale(${(1 - 0.05 * hp).toFixed(4)})`;
      el.style.opacity = (1 - 0.6 * hp).toFixed(3);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    apply();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    mq.addEventListener("change", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      mq.removeEventListener("change", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div ref={ref} data-nav="dark" className="relative z-0 origin-top">
      {children}
    </div>
  );
}
