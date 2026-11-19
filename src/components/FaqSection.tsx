"use client";

import { useId, useState } from "react";
import { Collapse } from "./Collapse";
import { Eyebrow, wrap } from "./ui";
import type { Faq } from "@/lib/site";

export function FaqSection({
  line1,
  line2,
  items,
}: {
  line1: string;
  line2: string;
  items: Faq[];
}) {
  const [open, setOpen] = useState(0);
  const uid = useId();
  return (
    <section
      aria-labelledby="faq-h"
      className={`${wrap} flex flex-wrap gap-x-16 gap-y-10 pb-[clamp(64px,7vw,96px)]`}
    >
      <div className="flex min-w-0 flex-[1_1_340px] flex-col gap-5">
        <Eyebrow bar="bg-ink3" className="text-ink3">
          FAQ
        </Eyebrow>
        <h2
          id="faq-h"
          className="display m-0 text-[clamp(56px,6.4vw,96px)] leading-[0.9] text-midnight"
        >
          {line1}
          <br />
          <span className="text-ink3">{line2}</span>
        </h2>
      </div>
      <div className="min-w-0 flex-[999_1_560px] rounded-[32px] bg-card px-[clamp(20px,3vw,36px)] py-2">
        {items.map(([q, a], i) => {
          const on = open === i;
          const pid = `${uid}-faq-${i}`;
          return (
            <div
              key={q}
              className={i === items.length - 1 ? "" : "border-b border-canvas"}
            >
              <h3 className="m-0">
                <button
                  type="button"
                  aria-expanded={on}
                  aria-controls={pid}
                  onClick={() => setOpen(on ? -1 : i)}
                  className="el-faqq flex min-h-[76px] w-full cursor-pointer items-center justify-between gap-6 border-0 bg-transparent py-[18px] text-left text-[clamp(18px,1.8vw,22px)] leading-[1.25] font-medium tracking-[-0.01em] text-midnight"
                >
                  <span>{q}</span>
                  <span
                    aria-hidden="true"
                    className={`mono inline-flex size-8 flex-none items-center justify-center rounded-full text-base transition-colors duration-200 ${
                      on ? "bg-midnight text-ice" : "bg-mist text-midnight"
                    }`}
                  >
                    {on ? "−" : "+"}
                  </span>
                </button>
              </h3>
              <Collapse open={on} id={pid}>
                <p className="m-0 pr-14 pb-[26px] text-base leading-[26px] text-ink2">{a}</p>
              </Collapse>
            </div>
          );
        })}
      </div>
    </section>
  );
}
