"use client";

import Lenis from "lenis";
import { useEffect } from "react";

let lenis: Lenis | null = null;

/** Scroll to an element with Lenis when it's running, natively otherwise. */
export function scrollToEl(el: HTMLElement | null, block: "start" | "nearest" = "start") {
  if (!el) return;
  if (lenis && block === "start") {
    lenis.scrollTo(el, { offset: -24 });
    return;
  }
  if (lenis && block === "nearest") {
    const r = el.getBoundingClientRect();
    const vh = window.innerHeight;
    if (r.top >= 0 && r.bottom <= vh) return;
    lenis.scrollTo(el, { offset: r.top < 0 ? -96 : -(vh - r.height - 24) });
    return;
  }
  el.scrollIntoView({ behavior: "smooth", block });
}

/**
 * Lenis smooth scrolling for mouse and trackpad. Touch keeps native scrolling
 * (Lenis default), and it stays off entirely for prefers-reduced-motion.
 * Elements with data-lenis-prevent (the mobile menu) scroll natively.
 */
export function SmoothScroll() {
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    const start = () => {
      if (lenis || mq.matches) return;
      lenis = new Lenis({
        autoRaf: true,
        duration: 1.1,
        easing: (t) => 1 - Math.pow(1 - t, 4),
        anchors: { offset: -24 },
      });
    };
    const stop = () => {
      lenis?.destroy();
      lenis = null;
    };
    const onChange = () => (mq.matches ? stop() : start());
    start();
    mq.addEventListener("change", onChange);
    return () => {
      mq.removeEventListener("change", onChange);
      stop();
    };
  }, []);
  return null;
}
