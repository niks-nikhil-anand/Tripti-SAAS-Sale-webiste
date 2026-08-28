import type { MetadataRoute } from "next";
import { indexableRoutes } from "@/lib/site";
import { getAllPosts } from "@/lib/blog";
import { absoluteUrl } from "@/lib/seo";

/**
 * Only indexable routes belong here. /checkout is excluded deliberately — it is
 * noindex, and listing a noindex URL in the sitemap sends Google a contradictory
 * signal that shows up as a coverage error in Search Console.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = indexableRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const postRoutes = getAllPosts().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    // The real publication date, not the build date — an accurate lastmod is
    // the whole reason crawlers read this file.
    lastModified: new Date(`${post.updatedAt ?? post.publishedAt}T00:00:00Z`),
    changeFrequency: "monthly" as const,
    priority: post.featured ? 0.8 : 0.7,
  }));

  return [...staticRoutes, ...postRoutes];
}
