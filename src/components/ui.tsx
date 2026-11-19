import Link from "next/link";
import type { ReactNode } from "react";
import { Arrow } from "./icons";

/** Page container: 1280 max, fluid side padding (matches design). */
export const wrap = "mx-auto box-border max-w-[1280px] px-[clamp(20px,3vw,40px)]";
/** Wider container used for the midnight panels inset in light sections. */
export const wrapWide = "mx-auto box-border max-w-[1400px] px-[clamp(12px,2vw,40px)]";

export function Eyebrow({
  children,
  bar = "bg-accent",
  className = "text-mute",
}: {
  children: ReactNode;
  bar?: string;
  className?: string;
}) {
  return (
    <p className={`mono m-0 flex items-center gap-3 text-xs tracking-[0.12em] ${className}`}>
      <span aria-hidden="true" className={`h-0.5 w-7 ${bar}`} />
      {children}
    </p>
  );
}

/** Two-tone masked headline: each line slides up out of a mask. */
export function MaskedTitle({
  id,
  lines,
  className,
  as: Tag = "h1",
}: {
  id?: string;
  lines: { text: string; muted?: boolean }[];
  className: string;
  as?: "h1" | "h2";
}) {
  return (
    <Tag id={id} className={`display m-0 ${className}`}>
      {lines.map((l, i) => (
        <span key={i} className="el-line">
          <span className={l.muted ? "text-mute2" : undefined}>{l.text}</span>
        </span>
      ))}
    </Tag>
  );
}

export function PrimaryButton({
  href,
  children,
  size = "lg",
}: {
  href: string;
  children: ReactNode;
  size?: "md" | "lg";
}) {
  const s = size === "lg" ? "min-h-14 px-[26px] text-base gap-3" : "min-h-[46px] px-5 text-sm gap-2.5";
  return (
    <Link
      href={href}
      className={`el-btn inline-flex items-center rounded-lg bg-accent font-semibold text-midnight ${s}`}
    >
      {children} <Arrow />
    </Link>
  );
}

export function GhostButton({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="el-btn-dark inline-flex min-h-14 items-center rounded-lg border border-line2 px-6 text-base font-semibold text-ice"
    >
      {children}
    </Link>
  );
}

export type Status = "CONCEPT" | "IN DEVELOPMENT" | "PILOT" | "LIVE" | "CLIENT";
const statusBg: Record<Status, string> = {
  CONCEPT: "bg-chip",
  "IN DEVELOPMENT": "bg-tag",
  PILOT: "bg-pilot",
  LIVE: "bg-live",
  CLIENT: "bg-stone",
};
export function StatusTag({ status, className = "" }: { status: Status; className?: string }) {
  return (
    <span
      className={`mono rounded-full px-3 py-[5px] text-[11px] text-midnight ${statusBg[status]} ${className}`}
    >
      {status}
    </span>
  );
}
