import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getLandingPage, landingPages } from "@/lib/content";
import { pageMetadata } from "@/lib/seo";
import { LandingTemplate } from "@/components/landing/LandingTemplate";

/**
 * Serves every developer, solution and location page at a clean top-level URL
 * (/nextjs-developer, /saas-development, /ai-developer-bangalore …). Static
 * routes such as /about or /hire-me take precedence over this segment, and
 * `dynamicParams = false` makes any slug not in the registry a 404.
 */
export function generateStaticParams() {
  return landingPages.map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) return {};
  return pageMetadata({
    title: page.metaTitle,
    description: page.metaDescription,
    path: `/${page.slug}`,
  });
}

export default async function LandingRoute({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const page = getLandingPage(slug);
  if (!page) notFound();
  return <LandingTemplate page={page} />;
}
