import { getLandingPage, landingPages } from "@/lib/content";
import { ogContentType, ogSize, renderOgImage } from "@/lib/og";

export const alt = "Tripti Shakya – Full Stack & AI Developer";
export const size = ogSize;
export const contentType = ogContentType;

export function generateStaticParams() {
  return landingPages.map((p) => ({ slug: p.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getLandingPage(slug);
  return renderOgImage({
    eyebrow: page?.eyebrow ?? "Tripti Shakya",
    title: page?.h1 ?? "Full Stack & AI Developer",
  });
}
