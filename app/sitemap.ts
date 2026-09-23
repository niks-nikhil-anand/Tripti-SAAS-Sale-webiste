import type { MetadataRoute } from "next";
import { indexableRoutes } from "@/lib/site";
import { getAllPosts } from "@/lib/blog";
import { landingPages, projects } from "@/lib/content";
import { absoluteUrl } from "@/lib/seo";

/**
 * Built from the same registries that generate the routes, so a page cannot
 * exist without being listed (or be listed without existing). /checkout is
 * excluded deliberately: it is noindex, and listing a noindex URL sends a
 * contradictory signal.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticRoutes = indexableRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: now,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));

  const landingRoutes = landingPages.map((page) => ({
    url: absoluteUrl(`/${page.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: page.group === "location" ? 0.7 : 0.8,
  }));

  const projectRoutes = projects.map((p) => ({
    url: absoluteUrl(`/projects/${p.slug}`),
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const postRoutes = getAllPosts().map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: new Date(`${post.updatedAt ?? post.publishedAt}T00:00:00Z`),
    changeFrequency: "monthly" as const,
    priority: post.featured ? 0.8 : 0.7,
  }));

  return [...staticRoutes, ...landingRoutes, ...projectRoutes, ...postRoutes];
}
