import type { MetadataRoute } from "next";
import { indexableRoutes } from "@/lib/site";
import { getActiveCategories, getAllPosts, getPostsByCategory } from "@/lib/blog";
import { landingPages, projects } from "@/lib/content";
import { absoluteUrl, CONTENT_UPDATED } from "@/lib/seo";

/**
 * Built from the same registries that generate the routes, so a page cannot
 * exist without being listed (or be listed without existing). lastModified is
 * the content's real date, not the build time, because an accurate lastmod is
 * the only reason crawlers read it.
 */
const date = (iso: string) => new Date(`${iso}T00:00:00Z`);
/** Each route's own social image, so image search can find it too. */
const ogImage = (path: string) => [absoluteUrl(`${path}/opengraph-image`)];

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const newestPost = posts
    .map((p) => p.updatedAt ?? p.publishedAt)
    .sort()
    .at(-1);

  const staticRoutes = indexableRoutes.map((route) => ({
    url: absoluteUrl(route.path),
    lastModified: date(
      route.path === "/blog" && newestPost ? newestPost : CONTENT_UPDATED,
    ),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
    images: [absoluteUrl("/opengraph-image")],
  }));

  const landingRoutes = landingPages.map((page) => ({
    url: absoluteUrl(`/${page.slug}`),
    lastModified: date(page.updatedAt ?? CONTENT_UPDATED),
    changeFrequency: "monthly" as const,
    priority: page.group === "location" ? 0.7 : 0.8,
    images: ogImage(`/${page.slug}`),
  }));

  const projectRoutes = projects.map((p) => ({
    url: absoluteUrl(`/projects/${p.slug}`),
    lastModified: date(CONTENT_UPDATED),
    changeFrequency: "monthly" as const,
    priority: 0.7,
    images: ogImage(`/projects/${p.slug}`),
  }));

  const categoryRoutes = getActiveCategories().map((c) => ({
    url: absoluteUrl(`/blog/${c.slug}`),
    lastModified: date(
      getPostsByCategory(c.slug)
        .map((p) => p.updatedAt ?? p.publishedAt)
        .sort()
        .at(-1) ?? CONTENT_UPDATED,
    ),
    changeFrequency: "weekly" as const,
    priority: 0.6,
    images: ogImage(`/blog/${c.slug}`),
  }));

  const postRoutes = posts.map((post) => ({
    url: absoluteUrl(`/blog/${post.slug}`),
    lastModified: date(post.updatedAt ?? post.publishedAt),
    changeFrequency: "monthly" as const,
    priority: post.featured ? 0.8 : 0.7,
    images: ogImage(`/blog/${post.slug}`),
  }));

  return [
    ...staticRoutes,
    ...landingRoutes,
    ...projectRoutes,
    ...categoryRoutes,
    ...postRoutes,
  ];
}
