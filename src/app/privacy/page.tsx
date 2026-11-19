import type { Metadata } from "next";
import Link from "next/link";
import { SimplePage } from "@/components/SimplePage";

export const metadata: Metadata = { title: "Privacy" };

export default function Privacy() {
  return (
    <SimplePage eyebrow="LEGAL · DRAFT" line1="Privacy." line2="Being written.">
      <p className="m-0">
        Our full privacy policy will be published here before launch. [Business name and address needed from
        the owner.]
      </p>
      <p className="m-0">
        In short: we only use the details you send through our forms to reply to you. We do not sell data or
        add you to a newsletter. Questions? <Link href="/contact" className="text-ice underline underline-offset-4">Get in touch</Link>.
      </p>
    </SimplePage>
  );
}
