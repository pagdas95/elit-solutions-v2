"use client";

import { useState, type FormEvent } from "react";
import { EMAIL_RE, submitEnquiry } from "@/lib/enquiry";

const field =
  "box-border min-h-[50px] w-full rounded-lg border bg-midnight px-4 text-[15px] text-ice transition-colors duration-200 placeholder:text-mute3";

/** The short form at the bottom of Home. The full form lives on /contact. */
export function HomeEnquiryForm() {
  const [state, setState] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errs, setErrs] = useState<{ name?: boolean; email?: boolean }>({});
  const [first, setFirst] = useState("");

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const name = String(fd.get("name") ?? "").trim();
    const email = String(fd.get("email") ?? "").trim();
    const bad = { name: !name, email: !EMAIL_RE.test(email) };
    setErrs(bad);
    if (bad.name || bad.email) return;
    setState("sending");
    try {
      await submitEnquiry({
        source: "home",
        name,
        email,
        message: String(fd.get("message") ?? ""),
        "bot-field": String(fd.get("bot-field") ?? ""),
      });
      setFirst(name.split(" ")[0]);
      setState("sent");
    } catch {
      setState("error");
    }
  }

  const box =
    "box-border flex min-w-0 flex-[1_1_400px] flex-col gap-4 rounded-3xl border border-line bg-raised p-[clamp(24px,3vw,36px)]";

  if (state === "sent")
    return (
      <div role="status" className={`${box} el-fade justify-center`}>
        <p className="display m-0 text-[clamp(44px,4.5vw,64px)] leading-[0.9]">
          Thanks, {first || "there"}.
          <br />
          <span className="text-mute2">We&apos;ll be in touch.</span>
        </p>
        <p className="m-0 text-base leading-[26px] text-mute">
          You&apos;ll hear from a person within one business day.
        </p>
      </div>
    );

  return (
    <form aria-label="Project enquiry" noValidate onSubmit={onSubmit} className={box}>
      <p className="hidden">
        <label>
          Leave this empty: <input name="bot-field" tabIndex={-1} autoComplete="off" />
        </label>
      </p>
      <div className="flex flex-col gap-2">
        <label htmlFor="h-name" className="text-sm font-medium">Name</label>
        <input
          id="h-name"
          name="name"
          type="text"
          autoComplete="name"
          placeholder="Your name"
          aria-invalid={errs.name || undefined}
          aria-describedby={errs.name ? "h-name-err" : undefined}
          className={`${field} ${errs.name ? "border-error" : "border-line2"}`}
        />
        {errs.name && <p id="h-name-err" role="alert" className="m-0 text-[13px] text-error">Please add your name.</p>}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="h-email" className="text-sm font-medium">Email</label>
        <input
          id="h-email"
          name="email"
          type="email"
          autoComplete="email"
          placeholder="you@company.com"
          aria-invalid={errs.email || undefined}
          aria-describedby={errs.email ? "h-email-err" : undefined}
          className={`${field} ${errs.email ? "border-error" : "border-line2"}`}
        />
        {errs.email && (
          <p id="h-email-err" role="alert" className="m-0 text-[13px] text-error">
            Please add an email we can reply to.
          </p>
        )}
      </div>
      <div className="flex flex-col gap-2">
        <label htmlFor="h-need" className="text-sm font-medium">What do you need?</label>
        <textarea
          id="h-need"
          name="message"
          rows={4}
          placeholder="A new website, online booking, automating a task…"
          className={`${field} resize-y border-line2 py-3.5`}
        />
      </div>
      <button
        type="submit"
        disabled={state === "sending"}
        className="el-btn min-h-[54px] cursor-pointer rounded-lg border-0 bg-accent text-base font-semibold text-midnight disabled:cursor-wait disabled:opacity-70"
      >
        {state === "sending" ? "Sending…" : "Send message →"}
      </button>
      {state === "error" && (
        <p role="alert" className="m-0 text-[13px] leading-5 text-error">
          Something went wrong sending your message. Please try again, or email us directly.
        </p>
      )}
    </form>
  );
}
