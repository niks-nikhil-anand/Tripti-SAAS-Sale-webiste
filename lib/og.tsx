import fs from "node:fs";
import path from "node:path";
import { ImageResponse } from "next/og";

/**
 * One social-card design shared by every page: an eyebrow, the page's own
 * title, and the author photo + name. A distinct card per URL gets better
 * click-through in shares than one generic site image. ImageResponse supports
 * flexbox only, with no CSS variables.
 */
export const ogSize = { width: 1200, height: 630 };
export const ogContentType = "image/png";

let photoDataUri: string | null = null;
function photo() {
  if (!photoDataUri) {
    const buf = fs.readFileSync(path.join(process.cwd(), "public/images/tripti-shakya.jpg"));
    photoDataUri = `data:image/jpeg;base64,${buf.toString("base64")}`;
  }
  return photoDataUri;
}

export function renderOgImage({
  eyebrow,
  title,
  footer = "Full Stack & AI Developer · Bangalore",
}: {
  eyebrow: string;
  title: string;
  footer?: string;
}) {
  const fontSize = title.length > 70 ? 54 : title.length > 45 ? 64 : 76;
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "68px 72px",
          background:
            "radial-gradient(circle at 12% 0%, rgba(77,124,255,0.35), transparent 45%), radial-gradient(circle at 100% 100%, rgba(139,92,246,0.3), transparent 45%), #07080d",
          color: "#e9edf8",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#7fe6f7",
          }}
        >
          {eyebrow}
        </div>
        <div
          style={{
            display: "flex",
            fontSize,
            fontWeight: 700,
            lineHeight: 1.08,
            letterSpacing: -1.5,
            maxWidth: 1040,
          }}
        >
          {title}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={photo()}
            width={92}
            height={92}
            alt=""
            style={{
              borderRadius: 46,
              objectFit: "cover",
              objectPosition: "50% 30%",
              border: "3px solid rgba(255,255,255,0.25)",
            }}
          />
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            <div style={{ display: "flex", fontSize: 32, fontWeight: 700 }}>Tripti Shakya</div>
            <div style={{ display: "flex", fontSize: 22, color: "#9aa4bb" }}>{footer}</div>
          </div>
        </div>
      </div>
    ),
    ogSize,
  );
}
