import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "Contact ElIT Solutions: tell us what's slowing you down.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "CONTACT · REPLY WITHIN ONE BUSINESS DAY", line1: "Tell us what's", line2: "slowing you down." });
}
