import Link from "next/link";
import { SimplePage } from "@/components/SimplePage";
import { Arrow } from "@/components/icons";

export default function NotFound() {
  return (
    <SimplePage eyebrow="404 · PAGE NOT FOUND" line1="Missing layer." line2="This page isn't here.">
      <p className="m-0">The link may be old, or the page has moved.</p>
      <div className="flex flex-wrap gap-3 pt-2">
        <Link href="/" className="el-btn inline-flex min-h-[52px] items-center gap-2.5 rounded-lg bg-accent px-6 text-base font-semibold text-midnight">
          Back to home <Arrow />
        </Link>
        <Link href="/contact" className="el-btn-dark inline-flex min-h-[52px] items-center rounded-lg border border-line2 px-6 text-base font-semibold text-ice">
          Contact us
        </Link>
      </div>
    </SimplePage>
  );
}
