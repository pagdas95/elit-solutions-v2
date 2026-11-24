import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "ElIT Solutions services: four layers, one team.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "SERVICES · L1 TO L3 + FOUNDATION", line1: "Four layers.", line2: "One team." });
}
