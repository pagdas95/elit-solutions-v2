import type { Metadata } from "next";
import { pageMeta } from "@/lib/site";
import { LabExplorer } from "@/components/lab/LabExplorer";
import { CtaBlock, DarkSheet, Footer } from "@/components/SiteFooter";
import { Eyebrow, MaskedTitle, StatusTag, wrap, type Status } from "@/components/ui";

export const metadata: Metadata = pageMeta("Lab", "Our own products, concepts and client work, each clearly labelled. No fake case studies.");

const LABELS: [Status, string][] = [
  ["CONCEPT", "Our own design exploration. Not built for a client, never presented as one."],
  ["IN DEVELOPMENT", "Being built by us right now. Shown as it is, unfinished parts included."],
  ["PILOT", "Running with a small number of real users while we learn and improve it."],
  ["LIVE", "Released and in use. Results are shown only when they are real and measured."],
  ["CLIENT", "Work for a client, published with their permission."],
];

export default function LabPage() {
  return (
    <>
      <div data-nav="dark" className="relative z-0">
        <section aria-labelledby="page-h" className={`${wrap} flex flex-col gap-10 pt-[168px] pb-44`}>
          <div className="flex max-w-[980px] flex-col gap-7">
            <div className="el-rise"><Eyebrow>LAB · WORK AND EXPERIMENTS</Eyebrow></div>
            <MaskedTitle
              id="page-h"
              className="text-[clamp(64px,9vw,148px)] leading-[0.86] tracking-[-0.035em]"
              lines={[{ text: "The Lab." }, { text: "What we're building.", muted: true }]}
            />
            <p className="el-rise m-0 max-w-[560px] text-[19px] leading-[30px] text-mute [animation-delay:280ms]">
              Our own products, concepts and client work, each clearly labelled. Client work appears here with
              permission. Pick a project to open its case file.
            </p>
          </div>
        </section>
      </div>

      <div data-nav="light" className="sheet relative z-[2] -mt-24 bg-canvas text-midnight">
        <LabExplorer />

        <section aria-labelledby="labels-h" className={`${wrap} flex flex-wrap gap-x-16 gap-y-10 pb-[clamp(96px,10vw,136px)]`}>
          <div className="flex min-w-0 flex-[1_1_340px] flex-col gap-5">
            <Eyebrow bar="bg-ink3" className="text-ink3">HONEST LABELS</Eyebrow>
            <h2 id="labels-h" className="display m-0 text-[clamp(56px,6.4vw,96px)] leading-[0.9] text-midnight">
              No fake
              <br />
              <span className="text-ink3">case studies.</span>
            </h2>
            <p className="m-0 max-w-[400px] text-base leading-[25px] font-medium text-ink2">
              Every project carries one of these labels, so you always know what you&apos;re looking at.
            </p>
          </div>
          <dl className="m-0 min-w-0 flex-[999_1_560px] rounded-[32px] bg-card px-[clamp(20px,3vw,36px)] py-2">
            {LABELS.map(([s, d], i) => (
              <div
                key={s}
                className={`grid grid-cols-1 items-center gap-x-6 gap-y-3 py-[22px] sm:grid-cols-[170px_minmax(0,1fr)] ${
                  i < LABELS.length - 1 ? "border-b border-canvas" : ""
                }`}
              >
                <dt className="justify-self-start"><StatusTag status={s} /></dt>
                <dd className="m-0 text-base leading-6 text-ink2">{d}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      <DarkSheet>
        <CtaBlock line1="Have something like this" line2="in mind?" />
        <Footer />
      </DarkSheet>
    </>
  );
}
