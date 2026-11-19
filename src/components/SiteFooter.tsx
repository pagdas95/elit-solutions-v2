import Link from "next/link";
import type { ReactNode } from "react";
import { GhostButton, PrimaryButton, wrap } from "./ui";

/**
 * Midnight sheet that slides over the last light section,
 * with an optional CTA block above the footer.
 */
export function DarkSheet({
  children,
  id,
  overlap = true,
}: {
  children: ReactNode;
  id?: string;
  overlap?: boolean;
}) {
  return (
    <div
      id={id}
      data-nav="dark"
      className={`sheet relative z-[3] bg-midnight text-ice ${overlap ? "-mt-14" : ""}`}
    >
      {children}
    </div>
  );
}

export function CtaBlock({ line1, line2 }: { line1: string; line2: string }) {
  return (
    <section
      aria-labelledby="cta-h"
      className={`${wrap} flex flex-wrap items-end justify-between gap-10 pt-[clamp(80px,9vw,128px)] pb-[clamp(64px,7vw,96px)]`}
    >
      <h2
        id="cta-h"
        className="display m-0 text-[clamp(56px,7vw,112px)] leading-[0.88]"
      >
        {line1}
        <br />
        <span className="text-mute2">{line2}</span>
      </h2>
      <div className="flex flex-wrap gap-3">
        <PrimaryButton href="/contact">Start a project</PrimaryButton>
        <GhostButton href="/contact#enquiry">Book a 30-minute call</GhostButton>
      </div>
    </section>
  );
}

export function Footer({ padTop = false }: { padTop?: boolean }) {
  return (
    <footer className={`${wrap} flex flex-col gap-10 pb-10 ${padTop ? "pt-[72px]" : ""}`}>
      <div className="flex flex-wrap justify-between gap-8 border-t border-line pt-10 text-[15px]">
        <nav aria-label="Footer" className="flex flex-wrap gap-x-8 gap-y-3">
          <Link href="/" className="text-fg2 hover:text-ice">Home</Link>
          <Link href="/services" className="text-fg2 hover:text-ice">Services</Link>
          <Link href="/lab" className="text-fg2 hover:text-ice">Lab</Link>
          <Link href="/contact" className="text-fg2 hover:text-ice">Contact</Link>
        </nav>
        <div className="flex flex-wrap gap-x-8 gap-y-3">
          <Link href="/privacy" className="text-mute hover:text-ice">Privacy</Link>
          <Link href="/terms" className="text-mute hover:text-ice">Terms</Link>
          <a href="#top" className="text-mute hover:text-ice">Back to top ↑</a>
        </div>
      </div>
      <p
        aria-hidden="true"
        className="display m-0 text-[clamp(64px,10.5vw,150px)] leading-[0.82] text-ice"
      >
        ELIT Solutions
      </p>
      <div className="mono flex flex-wrap justify-between gap-3 text-[11.5px] tracking-[0.08em] text-mute">
        <span>© 2026 ELIT SOLUTIONS · CYPRUS</span>
        <span>L1 INTERFACE · L2 SYSTEMS · L3 INTELLIGENCE</span>
      </div>
    </footer>
  );
}
