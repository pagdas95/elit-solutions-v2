import type { Metadata } from "next";
import Link from "next/link";
import { LegalAddress, LegalName, LegalPage, type LegalSection } from "@/components/LegalPage";
import { pageMeta, site } from "@/lib/site";

export const metadata: Metadata = pageMeta(
  "Privacy policy",
  "How ElIT Solutions collects, uses and protects personal data under the GDPR.",
);

const c = site.contact;

const sections: LegalSection[] = [
  {
    id: "who",
    h: "Who we are",
    body: (
      <>
        <p>
          This website is run by ElIT Solutions (<LegalName />, <LegalAddress />, Cyprus). We are the{" "}
          <strong>controller</strong> of the personal data described here, which means we decide how and why it is
          used.
        </p>
        <p>
          Questions about your data: email <a href={c.emailHref}>{c.email}</a> or call{" "}
          <a href={c.phoneHref}>{c.phone}</a>.
        </p>
      </>
    ),
  },
  {
    id: "collect",
    h: "What we collect",
    body: (
      <>
        <p>We only collect what you send us, plus the minimum needed to run the site:</p>
        <ul>
          <li>
            <strong>Enquiry forms:</strong> your name and email, and if you choose to give them, your company, the
            services you are interested in, when you would like to start and your message.
          </li>
          <li>
            <strong>Messages you send us directly</strong> by email, WhatsApp or phone, and anything you share in a
            call.
          </li>
          <li>
            <strong>Technical data:</strong> our hosting provider records standard server logs (such as IP address,
            browser type and the page requested) to deliver the site and keep it secure.
          </li>
          <li>
            <strong>Visit statistics:</strong> if analytics is switched on, we count visits with {site.analytics.provider},
            which works without cookies and does not identify you personally. We see totals such as page views,
            referring sites and countries, not individual people.
          </li>
        </ul>
      </>
    ),
  },
  {
    id: "why",
    h: "Why we use it, and on what legal basis",
    body: (
      <ul>
        <li>
          <strong>To reply to your enquiry and prepare a proposal or quote.</strong> This is a step you ask for before
          a possible contract (GDPR Article 6(1)(b)).
        </li>
        <li>
          <strong>To deliver a project</strong> if we agree to work together (Article 6(1)(b)), and to keep invoices and
          records that the law requires (Article 6(1)(c)).
        </li>
        <li>
          <strong>To keep the site secure and understand how it is used</strong> in aggregate. This is our legitimate
          interest in running a working, safe website (Article 6(1)(f)).
        </li>
      </ul>
    ),
  },
  {
    id: "cookies",
    h: "Cookies",
    body: (
      <p>
        This site does not use cookies for analytics or advertising, so there is no cookie banner. If that changes,
        we will update this page and ask for your consent first.
      </p>
    ),
  },
  {
    id: "share",
    h: "Who we share it with",
    body: (
      <>
        <p>We never sell your data. We use a small number of providers who process it for us:</p>
        <ul>
          <li>
            <strong>Netlify</strong>: hosts this website and receives form submissions.
          </li>
          <li>
            <strong>Google (Gmail)</strong>: our email provider, where enquiries and replies are stored.
          </li>
          <li>
            <strong>WhatsApp (Meta)</strong>: only if you choose to contact us on WhatsApp.
          </li>
          <li>
            <strong>{site.analytics.provider}</strong>: cookieless visit statistics, when switched on.
          </li>
        </ul>
        <p>
          Some of these providers are based outside the European Economic Area. Where data leaves the EEA, it is
          protected by safeguards the GDPR recognises, such as the EU–US Data Privacy Framework or the European
          Commission&apos;s Standard Contractual Clauses.
        </p>
      </>
    ),
  },
  {
    id: "keep",
    h: "How long we keep it",
    body: (
      <ul>
        <li>
          <strong>Enquiries that don&apos;t lead to a project:</strong> deleted within 12 months of our last contact.
        </li>
        <li>
          <strong>Client records and invoices:</strong> for as long as Cyprus tax and accounting law requires.
        </li>
        <li>
          <strong>Server logs:</strong> kept by our hosting provider for a short period under its own retention
          policy.
        </li>
      </ul>
    ),
  },
  {
    id: "rights",
    h: "Your rights",
    body: (
      <>
        <p>Under the GDPR you can ask us to:</p>
        <ul>
          <li>give you a copy of the data we hold about you;</li>
          <li>correct it, or delete it;</li>
          <li>limit how we use it, or object to our use of it;</li>
          <li>send it to you or another provider in a common format.</li>
        </ul>
        <p>
          Email <a href={c.emailHref}>{c.email}</a> and we will reply within one month. If you are unhappy with how
          we handle your data, you can complain to the Office of the Commissioner for Personal Data Protection in
          Cyprus (
          <a href="https://www.dataprotection.gov.cy" target="_blank" rel="noopener noreferrer">
            dataprotection.gov.cy
          </a>
          ).
        </p>
      </>
    ),
  },
  {
    id: "changes",
    h: "Changes to this policy",
    body: (
      <p>
        If we change how we use personal data, we will update this page and the date at the top. See also our{" "}
        <Link href="/terms">terms of use</Link>.
      </p>
    ),
  },
];

export default function Privacy() {
  return (
    <LegalPage
      eyebrow="LEGAL · PRIVACY"
      line1="Privacy."
      line2="In plain English."
      intro={
        <p className="m-0">
          We collect as little as possible, use it only to reply to you and do the work you ask for, and never sell
          it. The details are below.
        </p>
      }
      updated="24 November 2026"
      sections={sections}
    />
  );
}
