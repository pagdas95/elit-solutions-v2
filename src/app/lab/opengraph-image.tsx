import { ogContentType, ogImage, ogSize } from "@/lib/og";

export const alt = "The ElIT Lab: what we're building.";
export const size = ogSize;
export const contentType = ogContentType;

export default function Image() {
  return ogImage({ eyebrow: "LAB · WORK AND EXPERIMENTS", line1: "The Lab.", line2: "What we're building." });
}
