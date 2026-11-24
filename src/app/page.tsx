import Link from "next/link";
import { HeroPin } from "@/components/home/HeroPin";
import { HeroDemo } from "@/components/home/HeroDemo";
import { Statement } from "@/components/home/Statement";
import { LoopSection } from "@/components/home/LoopSection";
import { StackSection } from "@/components/home/StackSection";
import { HomeEnquiryForm } from "@/components/home/HomeEnquiryForm";
import { DarkSheet, Footer } from "@/components/SiteFooter";
import { Arrow } from "@/components/icons";
import { StatusTag, wrap } from "@/components/ui";
import { ContactChannels } from "@/components/ContactChannels";

const HeroArrow = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className="el-arr">
    <path d="M5 12h14M13 6l6 6-6 6" />
  </svg>
);

const PROBLEMS = [
  ["01", "Your website doesn't bring in work.", "L1", "/services#l1"],
  ["02", "Bookings live in DMs and a notebook.", "L2", "/services#l2"],
  ["03", "Your team copies data between tools by hand.", "L3", "/services#l3"],
  ["04", "You've outgrown the software you started with.", "L2", "/services#l2"],
];

const TRIO = [
  ["Plan.", "A short call, then a written plan with scope, timeline and cost. Nothing is designed before you agree it."],
  ["Build.", "Designs you can click before we code. Weekly progress you can see, tested on real phones."],
  ["Look after.", "Launch is day one. We keep it fast, secure and current, and add the next layer when you're ready."],
];

export default function Home() {
  return (
    <>
      {/* ============ HERO (pinned while the page slides over it) ============ */}
      <HeroPin>
        <section
          aria-label="Introduction"
          className={`${wrap} relative flex min-h-[860px] items-center pt-[136px] pb-40`}
        >
          <div className="flex w-full flex-wrap items-center gap-14">
            <div className="flex min-w-0 flex-[1_1_440px] flex-col gap-7">
              <p className="el-rise mono m-0 inline-flex items-center gap-2.5 self-start text-xs tracking-[0.02em] text-mute">
                <span className="size-[7px] rounded-full bg-accent shadow-[0_0_12px_var(--color-accent)]" />
                AVAILABLE FOR NEW PROJECTS · CYPRUS
              </p>
              <h1 className="display m-0 text-[clamp(68px,7.8vw,118px)] leading-[0.88] text-ice">
                <span className="el-line"><span>Software,</span></span>
                <span className="el-line"><span className="text-mute2">built in</span></span>
                <span className="el-line"><span className="text-mute2">layers.</span></span>
              </h1>
              <p className="el-rise m-0 max-w-[500px] text-[clamp(20px,1.7vw,24px)] leading-[1.35] font-medium tracking-[-0.015em] text-ice [animation-delay:280ms]">
                Websites, booking systems and automation for growing businesses in Cyprus.
                <span className="mt-2.5 block text-[17px] leading-[26px] font-normal tracking-normal text-mute">
                  Built as one system, by one team that looks after it.
                </span>
              </p>
              <div className="el-rise flex flex-wrap items-center gap-7 pt-2 [animation-delay:360ms]">
                <a
                  href="#contact"
                  className="el-btn box-border inline-flex min-h-[52px] items-center gap-2.5 rounded-lg bg-accent px-6 text-base font-semibold text-midnight"
                >
                  Start a project <HeroArrow />
                </a>
                <a href="#stack" className="inline-flex min-h-11 items-center gap-2 text-base font-medium text-ice">
                  See what we build <HeroArrow />
                </a>
              </div>
            </div>
            <HeroDemo />
          </div>
        </section>
      </HeroPin>

      {/* ============ SHEET (canvas) slides up over the hero ============ */}
      <div data-nav="light" className="sheet relative z-[2] -mt-24 bg-canvas text-midnight">
        {/* Trio + statement */}
        <section
          aria-labelledby="statement-h"
          className={`${wrap} flex flex-col gap-[clamp(64px,8vw,112px)] pt-[clamp(80px,9vw,120px)] pb-[clamp(64px,7vw,96px)]`}
        >
          <h2 id="statement-h" className="sr-only-h">
            Software that fits how your business actually works.
          </h2>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(260px,1fr))] gap-x-12 gap-y-10">
            {TRIO.map(([h, p]) => (
              <div key={h} className="flex flex-col gap-5">
                <h3 className="display m-0 text-[clamp(56px,5.2vw,76px)] leading-[0.9] text-midnight">{h}</h3>
                <p className="m-0 max-w-[340px] text-lg leading-[26px] font-medium tracking-[-0.01em] text-midnight">{p}</p>
              </div>
            ))}
          </div>
          <Statement />
        </section>

        <LoopSection />

        {/* Sound familiar? */}
        <section aria-labelledby="problems-h" className={`${wrap} flex flex-col gap-10 pb-[clamp(64px,7vw,96px)]`}>
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 id="problems-h" className="display m-0 text-[clamp(56px,6.4vw,96px)] leading-[0.9] text-midnight">
              Sound familiar?
            </h2>
            <p className="mono m-0 text-xs tracking-[0.02em] text-ink3">WHY PEOPLE CALL US</p>
          </div>
          <div className="rounded-[32px] bg-card px-[clamp(20px,3vw,36px)] py-2">
            {PROBLEMS.map(([n, text, layer, href], i) => (
              <Link
                key={n}
                href={href}
                className={`el-prow grid grid-cols-[28px_minmax(0,1fr)_auto] items-center gap-x-3.5 gap-y-2.5 py-[26px] text-midnight sm:grid-cols-[56px_minmax(0,1fr)_auto] sm:gap-x-6 sm:gap-y-3 ${
                  i < PROBLEMS.length - 1 ? "border-b border-canvas" : ""
                }`}
              >
                <span className="mono text-xs text-ink3">{n}</span>
                <span className="text-[clamp(20px,2.4vw,32px)] leading-[1.1] font-medium tracking-[-0.02em] uppercase">
                  {text}
                </span>
                <span className="mono text-xs text-ink3">{layer} →</span>
              </Link>
            ))}
          </div>
        </section>

        <StackSection />

        {/* From the Lab */}
        <section
          id="lab"
          aria-labelledby="lab-h"
          className={`${wrap} flex flex-col gap-10 pb-[clamp(96px,10vw,144px)]`}
        >
          <div className="flex flex-wrap items-end justify-between gap-x-12 gap-y-4">
            <h2 id="lab-h" className="display m-0 text-[clamp(56px,6.4vw,96px)] leading-[0.9] text-midnight">
              From the Lab.
            </h2>
            <div className="flex max-w-[400px] flex-col items-start gap-4">
              <p className="m-0 text-base leading-6 font-medium text-ink2">
                Our own product and concept work, clearly labelled. Client work appears here with permission.
              </p>
              <Link
                href="/lab"
                className="el-btnl inline-flex min-h-[46px] items-center gap-2.5 rounded-lg bg-midnight px-[18px] text-sm font-semibold text-ice"
              >
                See all Lab work <Arrow />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-4 md:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
            <Link
              href="/lab?p=book"
              className="el-tile flex min-w-0 flex-col rounded-[32px] bg-card p-3 text-midnight md:row-span-2"
            >
              <div
                aria-hidden="true"
                className="box-border flex min-h-[330px] flex-1 items-end justify-center gap-[18px] overflow-hidden rounded-[22px] bg-midnight px-4 pt-8 sm:min-h-[440px] sm:px-7 sm:pt-12"
              >
                <div className="box-border flex h-[380px] w-[250px] flex-col gap-3 rounded-t-[26px] bg-ice px-[18px] py-5">
                  <div className="flex justify-between text-xs font-semibold text-midnight">
                    <span>Studio Nails</span>
                    <span className="text-ink3">Fri 21</span>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center text-[10.5px] text-ink3">
                    {["M", "T", "W", "T", "F", "S", "S"].map((d, i) => <span key={i}>{d}</span>)}
                    {[17, 18, 19, 20, 21, 22, 23].map((d) => (
                      <span key={d} className={d === 21 ? "rounded-md bg-midnight text-ice" : ""}>{d}</span>
                    ))}
                  </div>
                  <div className="h-px bg-canvas" />
                  <div className="flex flex-col gap-1.5 text-xs">
                    <div className="flex justify-between rounded-lg bg-mist px-2.5 py-[9px] text-ink3"><span>17:00</span><span>Taken</span></div>
                    <div className="flex justify-between rounded-lg bg-midnight px-2.5 py-[9px] font-semibold text-ice"><span>17:30 · Maria</span><span>Selected</span></div>
                    <div className="flex justify-between rounded-lg bg-mist px-2.5 py-[9px]"><span>18:15 · Elena</span><span className="text-ink3">Free</span></div>
                    <div className="flex justify-between rounded-lg bg-mist px-2.5 py-[9px]"><span>19:00 · Maria</span><span className="text-ink3">Free</span></div>
                  </div>
                  <div className="mt-auto rounded-lg bg-accent p-3 text-center text-[13px] font-semibold text-midnight">Confirm booking</div>
                </div>
                <div className="box-border hidden h-[290px] w-[210px] flex-col gap-2.5 rounded-t-[18px] bg-raised p-[18px] sm:flex">
                  <span className="mono text-[10px] text-mute2">TODAY · 3 STAFF</span>
                  <div className="h-[34px] rounded-md bg-line2" />
                  <div className="h-[54px] rounded-md bg-ice" />
                  <div className="h-[26px] rounded-md bg-line2" />
                  <div className="h-11 rounded-md bg-line2" />
                </div>
              </div>
              <div className="flex flex-col gap-2 px-3.5 pt-[22px] pb-3">
                <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2.5">
                  <h3 className="m-0 text-[26px] leading-[1.1] font-medium tracking-[-0.02em] uppercase">ElIT Booking</h3>
                  <StatusTag status="IN DEVELOPMENT" />
                </div>
                <p className="m-0 text-base leading-6 text-ink2">
                  Online booking for salons: services, staff calendars and automatic reminders.
                </p>
              </div>
            </Link>

            <Link href="/lab?p=clinic" className="el-tile flex min-w-0 flex-col rounded-[32px] bg-card p-3 text-midnight">
              <div aria-hidden="true" className="box-border flex h-[210px] items-end overflow-hidden rounded-[22px] bg-stone px-[22px] pt-6">
                <div className="box-border flex h-[178px] w-full flex-col gap-2.5 rounded-t-xl bg-ice p-4">
                  <div className="flex justify-between text-[10.5px] text-ink3">
                    <span className="font-bold text-midnight">Riverside Clinic</span>
                    <span>Services · Team · Book</span>
                  </div>
                  <div className="display text-[30px] leading-[0.9] tracking-[-0.02em] text-midnight">
                    Care that fits
                    <br />
                    your week.
                  </div>
                  <div className="flex gap-2">
                    <span className="rounded-md bg-midnight px-2.5 py-[7px] text-[10.5px] text-ice">Book a visit</span>
                    <span className="rounded-md bg-canvas px-2.5 py-[7px] text-[10.5px]">Our services</span>
                  </div>
                </div>
              </div>
              <TileText title="Clinic website" line="A service site built around one action: booking a visit." />
            </Link>

            <Link href="/lab?p=ops" className="el-tile flex min-w-0 flex-col rounded-[32px] bg-card p-3 text-midnight">
              <div aria-hidden="true" className="box-border flex h-[210px] flex-col gap-2.5 overflow-hidden rounded-[22px] bg-midnight p-5">
                <span className="mono text-[10px] text-mute2">OPERATIONS · THIS WEEK</span>
                <div className="grid grid-cols-2 gap-2">
                  <Kpi label="Orders synced" value="1,284" />
                  <Kpi label="Manual steps" value="0" />
                </div>
                <div className="flex flex-1 items-end gap-1.5">
                  {[35, 50, 45, 70, 62, 92].map((h, i) => (
                    <div key={i} className={`flex-1 rounded-[3px] ${i === 5 ? "bg-ice" : "bg-line2"}`} style={{ height: `${h}%` }} />
                  ))}
                </div>
              </div>
              <TileText
                title="Operations dashboard"
                line="Orders, stock and staff in one view, synced from the tools you already use. Demo data."
              />
            </Link>
          </div>
        </section>
      </div>

      {/* ============ CONTACT + FOOTER (midnight sheet) ============ */}
      <DarkSheet id="contact">
        <section
          aria-labelledby="contact-h"
          className={`${wrap} flex scroll-mt-6 flex-wrap gap-14 pt-[clamp(72px,8vw,112px)] pb-24`}
        >
          <div className="flex min-w-0 flex-[1_1_520px] flex-col gap-7">
            <p className="mono m-0 text-xs tracking-[0.12em] text-mute">CONTACT · REPLY WITHIN ONE BUSINESS DAY</p>
            <h2 id="contact-h" className="display m-0 text-[clamp(56px,6.6vw,104px)] leading-[0.88]">
              Tell us what&apos;s
              <br />
              <span className="text-mute2">slowing you down.</span>
            </h2>
            <ContactChannels />
          </div>
          <HomeEnquiryForm />
        </section>
        <Footer />
      </DarkSheet>
    </>
  );
}

function TileText({ title, line }: { title: string; line: string }) {
  return (
    <div className="flex flex-col gap-2 px-3.5 pt-5 pb-3">
      <div className="flex flex-wrap items-center gap-x-3.5 gap-y-2.5">
        <h3 className="m-0 text-[22px] leading-[1.1] font-medium tracking-[-0.02em] uppercase">{title}</h3>
        <StatusTag status="CONCEPT" />
      </div>
      <p className="m-0 text-[15px] leading-[22px] text-ink2">{line}</p>
    </div>
  );
}

function Kpi({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-[10px] bg-raised px-3 py-2.5">
      <div className="text-[10px] text-mute2">{label}</div>
      <div className="display text-[28px] leading-none tracking-normal text-ice">{value}</div>
    </div>
  );
}
