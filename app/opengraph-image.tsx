import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/site";

export const alt = `${siteConfig.name} — ${siteConfig.tagline}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Generated at build time rather than shipped as a static file, so the social
 * card stays in sync with siteConfig. ImageResponse supports flexbox only —
 * no grid, no custom properties.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px",
          background:
            "linear-gradient(135deg, #07080f 0%, #131634 55%, #1d1b4b 100%)",
          color: "#edeff8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 64,
              height: 64,
              borderRadius: 18,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "linear-gradient(135deg, #7c6cff, #22d3ee)",
              fontSize: 34,
              fontWeight: 700,
              color: "#07080f",
            }}
          >
            S
          </div>
          <div style={{ fontSize: 34, fontWeight: 600, letterSpacing: -0.5 }}>
            {siteConfig.name}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 68,
              fontWeight: 700,
              lineHeight: 1.1,
              letterSpacing: -2,
              maxWidth: 940,
            }}
          >
            Ask your product data anything. Get an answer you can defend.
          </div>
          <div style={{ fontSize: 28, color: "#98a0bd", maxWidth: 880 }}>
            {siteConfig.shortDescription}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: 24,
            color: "#98a0bd",
          }}
        >
          <div
            style={{
              padding: "10px 22px",
              borderRadius: 999,
              background: "rgba(124,108,255,0.18)",
              color: "#b3a9ff",
            }}
          >
            Free for 3 editors
          </div>
          <div>{siteConfig.domain}</div>
        </div>
      </div>
    ),
    size,
  );
}
