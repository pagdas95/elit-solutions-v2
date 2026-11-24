"use client";

import { useRef, useState, type FormEvent } from "react";
import Link from "next/link";
import { Arrow } from "../icons";
import { EMAIL_RE, submitEnquiry } from "@/lib/enquiry";
import { track } from "@/lib/track";

const NEEDS = [
  ["web", "Website", "#38E8FF"],
  ["book", "Booking system", "#3B82F6"],
  ["auto", "Automation", "#8B5CF6"],
  ["ai", "AI assistant", "#8B5CF6"],
  ["unsure", "Not sure yet", "var(--color-mute2)"],
] as const;
const TIMES = [
  ["asap", "As soon as possible"],
  ["soon", "In 1–3 months"],
  ["explore", "Just exploring"],
] as const;

type Form = { name: string; email: string; company: string; msg: string };
const EMPTY: Form = { name: "", email: "", company: "", msg: "" };

const input =
  "box-border min-h-[52px] w-full rounded-lg border bg-midnight px-4 text-[15px] text-ice transition-colors duration-200 placeholder:text-mute3";

function Chip({ on, dot, label, onClick }: { on: boolean; dot: string; label: string; onClick: () => void }) {
  return (
    <button
      type="button"
      aria-pressed={on}
      onClick={onClick}
      className={`el-chip el-chip-dark inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-medium ${
        on ? "border-ice bg-ice text-midnight" : "border-line2 bg-transparent text-fg2"
      }`}
    >
      <span aria-hidden="true" className="size-2 rounded-[2px]" style={{ background: on ? dot : "var(--color-line2)" }} />
      {label}
    </button>
  );
}

export function EnquiryForm() {
  const [form, setForm] = useState<Form>(EMPTY);
  const [needs, setNeeds] = useState<string[]>([]);
  const [time, setTime] = useState("");
  const [errs, setErrs] = useState<{ name?: boolean; email?: boolean; need?: boolean }>({});
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const bot = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const set = (k: keyof Form) => (e: { target: { value: string } }) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (k === "name" || k === "email") setErrs((x) => ({ ...x, [k]: false }));
  };

  const toggleNeed = (k: string) => {
    setNeeds((cur) => {
      if (cur.includes(k)) return cur.filter((x) => x !== k);
      if (k === "unsure") return ["unsure"];
      return [...cur.filter((x) => x !== "unsure"), k];
    });
    setErrs((x) => ({ ...x, need: false }));
  };

  const labelOf = (list: readonly (readonly string[])[], k: string) => list.find((x) => x[0] === k)?.[1] ?? "";

  async function submit(e: FormEvent) {
    e.preventDefault();
    const bad = {
      name: !form.name.trim(),
      email: !EMAIL_RE.test(form.email.trim()),
      need: needs.length === 0,
    };
    if (bad.name || bad.email || bad.need) {
      setErrs(bad);
      (bad.name ? nameRef : bad.email ? emailRef : null)?.current?.focus();
      return;
    }
    setErrs({});
    setState("sending");
    try {
      await submitEnquiry({
        source: "contact",
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim(),
        needs: needs.map((k) => labelOf(NEEDS, k)).join(", "),
        start: labelOf(TIMES, time),
        message: form.msg,
        "bot-field": bot.current?.value ?? "",
      });
      track("Enquiry sent", { source: "contact" });
      setState("sent");
    } catch {
      setState("error");
    }
  }

  const reset = () => {
    setForm(EMPTY);
    setNeeds([]);
    setTime("");
    setErrs({});
    setState("idle");
  };

  if (state === "sent") {
    const summary = [...needs.map((k) => labelOf(NEEDS, k)), ...(time ? [labelOf(TIMES, time)] : [])];
    return (
      <div role="status" className="el-fade flex min-h-[520px] flex-col justify-center gap-[22px]">
        <span aria-hidden="true" className="inline-flex size-14 items-center justify-center rounded-2xl bg-accent text-midnight">
          <svg width="26" height="26" viewBox="0 0 16 16">
            <path d="M3 8.5l3 3 7-7" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
        <h2 className="display m-0 text-[clamp(48px,5vw,72px)] leading-[0.9]">
          Thanks, {form.name.trim().split(" ")[0] || "there"}.
          <br />
          <span className="text-mute2">We&apos;ll be in touch.</span>
        </h2>
        <p className="m-0 max-w-[420px] text-[17px] leading-[27px] text-mute">
          You&apos;ll hear from us within one business day at {form.email.trim()}.
        </p>
        <div className="flex flex-wrap gap-2">
          {summary.map((t) => (
            <span key={t} className="mono rounded-full border border-line2 px-3 py-1.5 text-[11px] tracking-[0.06em] text-fg2">
              {t.toUpperCase()}
            </span>
          ))}
        </div>
        <button
          type="button"
          onClick={reset}
          className="el-btn-dark min-h-[46px] cursor-pointer self-start rounded-full border border-line2 bg-midnight px-[18px] text-sm font-semibold text-ice"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form aria-label="Project enquiry" noValidate onSubmit={submit} className="flex flex-col gap-[22px]">
      <p className="hidden">
        <label>
          Leave this empty: <input ref={bot} name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <div className="mono flex justify-between gap-3 text-[11px] tracking-[0.1em] text-mute">
        <span>PROJECT ENQUIRY</span>
        <span>TAKES ABOUT 2 MINUTES</span>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="f-name" className="text-sm font-medium text-ice">Name</label>
          <input
            ref={nameRef}
            id="f-name"
            type="text"
            autoComplete="name"
            placeholder="Your name"
            value={form.name}
            onChange={set("name")}
            aria-invalid={errs.name || undefined}
            aria-describedby={errs.name ? "f-name-err" : undefined}
            className={`${input} ${errs.name ? "border-error" : "border-line2"}`}
          />
          {errs.name && <p id="f-name-err" role="alert" className="m-0 text-[13px] text-error">Please add your name.</p>}
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="f-email" className="text-sm font-medium text-ice">Email</label>
          <input
            ref={emailRef}
            id="f-email"
            type="email"
            inputMode="email"
            autoComplete="email"
            placeholder="you@company.com"
            value={form.email}
            onChange={set("email")}
            aria-invalid={errs.email || undefined}
            aria-describedby={errs.email ? "f-email-err" : undefined}
            className={`${input} ${errs.email ? "border-error" : "border-line2"}`}
          />
          {errs.email && (
            <p id="f-email-err" role="alert" className="m-0 text-[13px] text-error">Please add an email we can reply to.</p>
          )}
        </div>
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="f-company" className="text-sm font-medium text-ice">
          Company <span className="font-normal text-mute2">(optional)</span>
        </label>
        <input id="f-company" type="text" autoComplete="organization" placeholder="Business name" value={form.company} onChange={set("company")} className={`${input} border-line2`} />
      </div>

      <fieldset className="m-0 flex flex-col gap-3 border-0 p-0">
        <legend className="mb-3 p-0 text-sm font-medium text-ice">
          What do you need? <span className="font-normal text-mute2">Pick any</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {NEEDS.map(([k, label, dot]) => (
            <Chip key={k} on={needs.includes(k)} dot={dot} label={label} onClick={() => toggleNeed(k)} />
          ))}
        </div>
        {errs.need && (
          <p role="alert" className="m-0 text-[13px] text-error">Pick at least one, or choose “Not sure yet”.</p>
        )}
      </fieldset>
      <fieldset className="m-0 flex flex-col border-0 p-0">
        <legend className="mb-3 p-0 text-sm font-medium text-ice">When would you like to start?</legend>
        <div className="flex flex-wrap gap-2">
          {TIMES.map(([k, label]) => (
            <Chip key={k} on={time === k} dot="var(--color-accent)" label={label} onClick={() => setTime(time === k ? "" : k)} />
          ))}
        </div>
      </fieldset>
      <div className="flex flex-col gap-2">
        <label htmlFor="f-msg" className="text-sm font-medium text-ice">
          Tell us a little more <span className="font-normal text-mute2">(optional)</span>
        </label>
        <textarea
          id="f-msg"
          rows={4}
          placeholder="What is slowing you down? Which tools do you use today?"
          value={form.msg}
          onChange={set("msg")}
          className={`${input} resize-y border-line2 py-3.5 leading-[23px]`}
        />
      </div>
      <button
        type="submit"
        disabled={state === "sending"}
        className="el-btn inline-flex min-h-14 cursor-pointer items-center justify-center gap-3 rounded-lg border-0 bg-accent text-base font-semibold text-midnight disabled:cursor-wait disabled:opacity-70"
      >
        {state === "sending" ? "Sending…" : <>Send enquiry <Arrow /></>}
      </button>
      {state === "error" && (
        <p role="alert" className="m-0 text-[13px] leading-5 text-error">
          Something went wrong sending your enquiry. Please try again, or email us directly.
        </p>
      )}
      <p className="m-0 text-[13px] leading-5 text-mute2">
        We only use your details to reply. See our{" "}
        <Link href="/privacy" className="text-fg2 underline underline-offset-2 hover:text-ice">privacy policy</Link>.
      </p>
    </form>
  );
}
