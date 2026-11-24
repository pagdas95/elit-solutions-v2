import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

/** Shared social share image (1200×630) in the Ion style. */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

// Read once at module load (build time), so the images are prerendered statically.
const font = (f: string) => readFile(join(process.cwd(), "src/app/og-fonts", f));
const [barlow, inter, mono, sora] = await Promise.all([
  font("barlow-condensed-latin-700-normal.woff"),
  font("inter-latin-500-normal.woff"),
  font("geist-mono-latin-400-normal.woff"),
  font("sora-latin-700-normal.woff"),
]);

export async function ogImage({
  eyebrow,
  line1,
  line2,
}: {
  eyebrow: string;
  line1: string;
  line2: string;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#05070D",
          color: "#F4F7FB",
          padding: "64px 72px",
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
            <svg width="46" height="60" viewBox="-2 -2 104 136">
              <polygon fill="#22D3EE" points="0,38 63.5,0 100,21 72.5,37 63,31.5 0,68" />
              <polygon fill="#3B82F6" points="0.5,83 65,45.5 93.5,61.75 13,109 0.5,101.75" />
              <polygon fill="#8B5CF6" points="15,110.5 41.75,95 49.25,99.5 71.75,86.25 100,103 50.5,131.75" />
            </svg>
            <div style={{ display: "flex", fontFamily: "Sora", fontSize: 40, letterSpacing: -0.8 }}>
              El<span style={{ color: "#38E8FF" }}>IT</span>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12, fontFamily: "Geist Mono", fontSize: 20, color: "#9AA4B2", letterSpacing: 2 }}>
            <div style={{ width: 12, height: 12, borderRadius: 99, background: "#38E8FF" }} />
            CYPRUS
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 16, fontFamily: "Geist Mono", fontSize: 22, color: "#9AA4B2", letterSpacing: 2.6 }}>
            <div style={{ width: 40, height: 3, background: "#38E8FF" }} />
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontFamily: "Barlow Condensed",
              fontSize: 148,
              lineHeight: 0.88,
              letterSpacing: -4,
              textTransform: "uppercase",
            }}
          >
            <span>{line1}</span>
            <span style={{ color: "#7D8796" }}>{line2}</span>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #1A2130",
            paddingTop: 26,
            fontFamily: "Geist Mono",
            fontSize: 19,
            letterSpacing: 1.6,
            color: "#9AA4B2",
          }}
        >
          <span>ELIT SOLUTIONS</span>
          <div style={{ display: "flex", gap: 28 }}>
            <span style={{ color: "#38E8FF" }}>L1 INTERFACE</span>
            <span style={{ color: "#93C5FD" }}>L2 SYSTEMS</span>
            <span style={{ color: "#A78BFA" }}>L3 INTELLIGENCE</span>
          </div>
        </div>
      </div>
    ),
    {
      ...ogSize,
      fonts: [
        { name: "Barlow Condensed", data: barlow, weight: 700, style: "normal" },
        { name: "Inter", data: inter, weight: 500, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
        { name: "Sora", data: sora, weight: 700, style: "normal" },
      ],
    },
  );
}
