import type { Metadata } from "next";
import { EnquiryForm } from "@/components/contact/EnquiryForm";
import { FaqSection } from "@/components/FaqSection";
import { DarkSheet, Footer } from "@/components/SiteFooter";
import { Eyebrow, MaskedTitle, wrap } from "@/components/ui";
import { ContactChannels } from "@/components/ContactChannels";
import { pageMeta, type Faq } from "@/lib/site";

export const metadata: Metadata = pageMeta("Contact", "Tell us what's slowing you down. A few lines are enough; we reply within one business day.");

const NEXT = [
  ["01", "We reply.", "Within one business day, from a person, not a bot. Usually with a couple of questions."],
  ["02", "A short call.", "Thirty minutes about your business and what good looks like. No slides, no pressure."],
  ["03", "A written plan.", "Scope, timeline and a fixed quote. You decide, with nothing designed before you agree."],
];

const FAQ: Faq[] = [
  ["Do I need to know exactly what I want?", "No. Tell us what is slowing you down; working out what to build is part of the first call."],
  ["How much does it cost?", "We quote after the first call, once we understand the scope. You get a written, fixed quote before any work starts."],
  ["Do you work with businesses outside Cyprus?", "Yes. We work remotely in English, with calls at times that suit you."],
  ["What if I already have a website or system?", "We can improve, connect or look after what you have. Sometimes that is the better answer than starting again."],
];

export default function ContactPage() {
  return (
    <>
      <div data-nav="dark" className="relative z-0">
        <section aria-labelledby="page-h" className={`${wrap} flex flex-wrap items-start gap-14 pt-40 pb-44`}>
          <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-8">
            <div className="el-rise"><Eyebrow>CONTACT · REPLY WITHIN ONE BUSINESS DAY</Eyebrow></div>
            <MaskedTitle
              id="page-h"
              className="text-[clamp(64px,7.6vw,124px)] leading-[0.86] tracking-[-0.035em]"
              lines={[{ text: "Tell us what's" }, { text: "slowing you down.", muted: true }]}
            />
            <p className="el-rise m-0 max-w-[460px] text-lg leading-[29px] text-mute [animation-delay:280ms]">
              A few lines are enough. We&apos;ll reply with honest advice, even if the answer is that you
              don&apos;t need us yet.
            </p>
            <ContactChannels full className="el-rise [animation-delay:360ms]" />
          </div>
          <div
            id="enquiry"
            className="el-rise box-border min-w-0 flex-[1_1_460px] scroll-mt-24 rounded-[28px] border border-line bg-raised p-[clamp(24px,3vw,40px)]"
          >
            <EnquiryForm />
          </div>
        </section>
      </div>

      <div data-nav="light" className="sheet relative z-[2] -mt-24 bg-canvas text-midnight">
        <section aria-labelledby="next-h" className={`${wrap} flex flex-col gap-10 pt-[clamp(80px,9vw,120px)] pb-[clamp(64px,7vw,96px)]`}>
          <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-4">
            <h2 id="next-h" className="display m-0 text-[clamp(56px,6.4vw,96px)] leading-[0.9] text-midnight">
              What happens
              <br />
              <span className="text-ink3">next.</span>
            </h2>
            <p className="m-0 max-w-[380px] text-base leading-6 font-medium text-ink2">
              No sales sequence and no newsletter you didn&apos;t ask for.
            </p>
          </div>
          <ol className="m-0 grid list-none grid-cols-1 gap-4 p-0 sm:grid-cols-2 lg:grid-cols-3">
            {NEXT.map(([n, h, p]) => (
              <li key={n} className="box-border flex min-h-[260px] flex-col gap-[18px] rounded-[28px] bg-card p-7">
                <span className="mono text-xs tracking-[0.1em] text-ink3">{n}</span>
                <h3 className="display mt-auto mb-0 text-[clamp(44px,4vw,60px)] leading-[0.9] tracking-[-0.02em] text-midnight">{h}</h3>
                <p className="m-0 text-base leading-[25px] text-ink2">{p}</p>
              </li>
            ))}
          </ol>
        </section>
        <FaqSection line1="Before you" line2="write." items={FAQ} />
        <div className="h-14" />
      </div>

      <DarkSheet>
        <Footer padTop />
      </DarkSheet>
    </>
  );
}
