import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Tripti Shakya – Full Stack & AI Developer";
export const size = ogSize;
export const contentType = ogContentType;

export default function OpengraphImage() {
  return renderOgImage({
    eyebrow: "Full Stack & AI Developer",
    title: "Production-ready SaaS, web applications and AI products",
  });
}
