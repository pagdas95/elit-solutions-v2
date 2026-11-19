import type { Metadata } from "next";
import { SimplePage } from "@/components/SimplePage";

export const metadata: Metadata = { title: "Terms" };

export default function Terms() {
  return (
    <SimplePage eyebrow="LEGAL · DRAFT" line1="Terms." line2="Being written.">
      <p className="m-0">
        Our terms of use will be published here before launch. [Business name, address and code ownership
        terms needed from the owner.]
      </p>
    </SimplePage>
  );
}
