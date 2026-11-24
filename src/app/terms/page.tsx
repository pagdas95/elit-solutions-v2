import type { Metadata } from "next";
import Link from "next/link";
import { LegalAddress, LegalName, LegalPage, type LegalSection } from "@/components/LegalPage";
import { pageMeta, site } from "@/lib/site";

export const metadata: Metadata = pageMeta("Terms of use", "The terms for using the ElIT Solutions website.");

const c = site.contact;

const sections: LegalSection[] = [
  {
    id: "about",
    h: "About these terms",
    body: (
      <p>
        These terms cover your use of this website, which is run by ElIT Solutions (<LegalName />,{" "}
        <LegalAddress />, Cyprus). By using the site you accept them. If you don&apos;t agree, please don&apos;t use
        the site.
      </p>
    ),
  },
  {
    id: "info",
    h: "Information, not an offer",
    body: (
      <p>
        The site describes what we do. It is general information, not an offer to contract. Any project we take on
        is covered by a separate written proposal and agreement, which sets out the scope, timeline, price and
        ownership terms for that project.
      </p>
    ),
  },
  {
    id: "lab",
    h: "Lab work and demo content",
    body: (
      <p>
        Projects in the Lab carry a label (Concept, In development, Pilot, Live or Client) so you know what you are
        looking at. Concepts and demos use invented names and demo data. They are examples of our approach, not
        claims about real clients or results.
      </p>
    ),
  },
  {
    id: "ip",
    h: "Our content",
    body: (
      <p>
        The text, design, code and logo of this website belong to ElIT Solutions. You are welcome to view, share
        links to and print pages for your own reference. Please ask before copying or reusing them for anything
        else.
      </p>
    ),
  },
  {
    id: "links",
    h: "Links to other sites",
    body: (
      <p>
        We may link to other websites, such as WhatsApp. We are not responsible for their content or how they handle
        your data.
      </p>
    ),
  },
  {
    id: "liability",
    h: "Availability and liability",
    body: (
      <p>
        We work to keep the site accurate and available, but we provide it as it is and can&apos;t promise it will
        always be error-free or online. To the extent the law allows, we are not liable for losses arising from
        using the site. Nothing in these terms limits liability that cannot be limited by law, or your rights as a
        consumer.
      </p>
    ),
  },
  {
    id: "privacy",
    h: "Privacy",
    body: (
      <p>
        How we handle personal data is explained in our <Link href="/privacy">privacy policy</Link>.
      </p>
    ),
  },
  {
    id: "law",
    h: "Governing law",
    body: (
      <p>
        These terms are governed by the laws of the Republic of Cyprus, and the courts of Cyprus have jurisdiction.
        If you are a consumer living elsewhere in the EU, you keep the protection of your own country&apos;s
        mandatory laws.
      </p>
    ),
  },
  {
    id: "contact",
    h: "Contact",
    body: (
      <p>
        Questions about these terms: <a href={c.emailHref}>{c.email}</a> or <a href={c.phoneHref}>{c.phone}</a>.
      </p>
    ),
  },
];

export default function Terms() {
  return (
    <LegalPage
      eyebrow="LEGAL · TERMS"
      line1="Terms of use."
      line2="Short and fair."
      intro={<p className="m-0">The rules for using this website. Project work is covered by its own written agreement.</p>}
      updated="24 November 2026"
      sections={sections}
    />
  );
}
