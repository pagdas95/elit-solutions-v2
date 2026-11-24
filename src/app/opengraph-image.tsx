import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "ElIT Solutions: software, built in layers. Websites, booking systems and automation in Cyprus.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "WEBSITES · BOOKING · AUTOMATION", line1: "Software,", line2: "built in layers." });
}
