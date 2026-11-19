"use client";

import { AnimatePresence, motion } from "motion/react";
import { useReducedMotion } from "@/lib/useReducedMotion";
import type { ReactNode } from "react";

/** Height + fade reveal on the shared easing curve. */
export function Collapse({
  open,
  children,
  id,
  className,
}: {
  open: boolean;
  children: ReactNode;
  id?: string;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          id={id}
          key="c"
          initial={reduce ? false : { height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={reduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
          transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
          style={{ overflow: "hidden" }}
          className={className}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
}
