import type { ReactNode } from "react";
import { DarkSheet, Footer } from "./SiteFooter";
import { Eyebrow, MaskedTitle, wrap } from "./ui";
import { site } from "@/lib/site";

export type LegalSection = { id: string; h: string; body: ReactNode };

/** A value the owner still has to supply: visible on previews so it can't be missed. */
export function Todo({ children }: { children: ReactNode }) {
  return (
    <mark className="rounded bg-tag px-1.5 py-0.5 font-medium text-midnight">[{children}]</mark>
  );
}

export function LegalName() {
  return site.legal.name ? <>{site.legal.name}</> : <Todo>Legal business name</Todo>;
}
export function LegalAddress() {
  return site.legal.address ? <>{site.legal.address}</> : <Todo>Business address</Todo>;
}

export function LegalPage({
  eyebrow,
  line1,
  line2,
  intro,
  updated,
  sections,
}: {
  eyebrow: string;
  line1: string;
  line2: string;
  intro: ReactNode;
  updated: string;
  sections: LegalSection[];
}) {
  return (
    <>
      <div data-nav="dark" className="relative z-0">
        <section className={`${wrap} flex flex-col gap-7 pt-[168px] pb-44`}>
          <div className="el-rise">
            <Eyebrow>{eyebrow}</Eyebrow>
          </div>
          <MaskedTitle
            className="text-[clamp(64px,9vw,148px)] leading-[0.86] tracking-[-0.035em]"
            lines={[{ text: line1 }, { text: line2, muted: true }]}
          />
          <div className="el-rise m-0 max-w-[620px] text-lg leading-[29px] text-mute [animation-delay:280ms]">
            {intro}
          </div>
        </section>
      </div>

      <div data-nav="light" className="sheet relative z-[2] -mt-24 bg-canvas text-midnight">
        <div className={`${wrap} flex flex-wrap gap-x-16 gap-y-10 pt-[clamp(64px,7vw,96px)] pb-[clamp(96px,10vw,136px)]`}>
          <nav aria-label="On this page" className="min-w-0 flex-[1_1_240px]">
            <div className="flex flex-col gap-4 md:sticky md:top-28">
              <p className="mono m-0 text-xs tracking-[0.12em] text-ink3">LAST UPDATED · {updated.toUpperCase()}</p>
              <ol className="m-0 flex list-none flex-col border-t border-hair p-0">
                {sections.map((s, i) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="flex gap-3 border-b border-hair py-2.5 text-[15px] text-ink2 transition-colors hover:text-midnight"
                    >
                      <span className="mono w-6 text-xs leading-[22px] text-ink3">{String(i + 1).padStart(2, "0")}</span>
                      {s.h}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>
          <article className="min-w-0 flex-[999_1_600px] rounded-[32px] bg-card px-[clamp(22px,4vw,56px)] py-[clamp(28px,4vw,48px)]">
            {sections.map((s, i) => (
              <section
                key={s.id}
                id={s.id}
                aria-labelledby={`${s.id}-h`}
                className={`scroll-mt-28 ${i > 0 ? "mt-10 border-t border-canvas pt-10" : ""}`}
              >
                <h2 id={`${s.id}-h`} className="m-0 mb-4 text-[clamp(22px,2.2vw,28px)] leading-[1.15] font-semibold tracking-[-0.015em] text-midnight">
                  {s.h}
                </h2>
                <div className="legal-prose text-base leading-[27px] text-ink2">{s.body}</div>
              </section>
            ))}
          </article>
        </div>
      </div>

      <DarkSheet>
        <Footer padTop />
      </DarkSheet>
    </>
  );
}
