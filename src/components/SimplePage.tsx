import type { ReactNode } from "react";
import { DarkSheet, Footer } from "./SiteFooter";
import { Eyebrow, MaskedTitle, wrap } from "./ui";

export function SimplePage({
  eyebrow,
  line1,
  line2,
  children,
}: {
  eyebrow: string;
  line1: string;
  line2: string;
  children: ReactNode;
}) {
  return (
    <>
      <div data-nav="dark">
        <section className={`${wrap} flex flex-col gap-7 pt-[168px] pb-40`}>
          <div className="el-rise"><Eyebrow>{eyebrow}</Eyebrow></div>
          <MaskedTitle
            className="text-[clamp(64px,9vw,148px)] leading-[0.86] tracking-[-0.035em]"
            lines={[{ text: line1 }, { text: line2, muted: true }]}
          />
          <div className="el-rise flex max-w-[620px] flex-col gap-4 text-lg leading-[29px] text-mute [animation-delay:280ms]">
            {children}
          </div>
        </section>
      </div>
      <DarkSheet overlap={false}>
        <Footer />
      </DarkSheet>
    </>
  );
}
