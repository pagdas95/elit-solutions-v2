import type { ReactNode } from "react";

/**
 * Height + fade reveal on the shared easing curve, in CSS only
 * (grid-template-rows 0fr → 1fr). Closed content is hidden from
 * keyboard and screen readers with `inert`.
 */
export function Collapse({
  open,
  children,
  id,
  className = "",
}: {
  open: boolean;
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  return (
    <div
      id={id}
      inert={!open}
      className={`grid transition-[grid-template-rows,opacity] duration-[420ms] ease-brand ${
        open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
      } ${className}`}
    >
      <div className="min-h-0 overflow-hidden">{children}</div>
    </div>
  );
}
