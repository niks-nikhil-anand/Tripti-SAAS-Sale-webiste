---
title: Next.js SEO Best Practices for the App Router
description: Next.js SEO best practices for the App Router, covering the Metadata API, canonical URLs, sitemap and robots files, JSON-LD, rendering and Core Web Vitals.
category: nextjs
tags: [nextjs, seo, metadata, json-ld, core web vitals]
publishedAt: 2026-09-24
services: [nextjs-developer, frontend-developer]
projects: [blog-automation]
related: [nextjs-app-router-architecture, server-components-vs-client-components]
featured: true
---

The Next.js SEO best practices that matter most in the App Router are simple to list: set a `metadataBase` once, generate a unique title, description and canonical URL for every route, ship a real `sitemap.ts` and `robots.ts`, describe your content with JSON-LD, and make sure the HTML a crawler receives already contains your content. Everything else is detail. This guide walks through each of those with code that matches the current App Router APIs, including the fact that `params` is now a Promise.

## Start with metadataBase in the root layout

Almost every URL-shaped metadata field (canonical, Open Graph images, alternates) needs an absolute URL. If you set `metadataBase` in `app/layout.tsx`, every route below it can use relative paths, and Next.js composes them into full URLs. Without it, a relative path in a URL field causes a build error, which is a good thing because the alternative is shipping broken canonicals.

The root layout is also where I put the title template, so individual pages only set their own short title and the brand suffix is added consistently.

```tsx
// app/layout.tsx
import type { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Example – Product analytics for small teams",
    template: "%s | Example",
  },
  description: "A short, specific description of what the site offers.",
  alternates: { canonical: "/" },
  openGraph: { type: "website", siteName: "Example" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```

Two things to watch. First, `lang` on the `html` element is not metadata, but it is part of the same job and is often forgotten. Second, metadata merges shallowly from layout to page. If a page sets `openGraph` at all, it replaces the parent's `openGraph` object rather than deep-merging it, so repeat any fields you still need or move shared values into a helper.

## Generate metadata per route, not per template

Static `metadata` works for pages whose content does not change. For anything driven by data, such as a blog post, a product or a location page, export `generateMetadata`. In current Next.js, `params` and `searchParams` are Promises, so you `await` them before reading values.

```tsx
// app/blog/[slug]/page.tsx
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPost } from "@/lib/posts"; // wrapped in React cache()

type Props = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: `/blog/${slug}` },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.description,
      publishedTime: post.publishedAt,
    },
  };
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();
  return <article>{/* ... */}</article>;
}
```

The page and `generateMetadata` both need the post. Wrap the loader in React's `cache` function so the data is fetched once per request instead of twice. If you are on the Cache Components model, you can also mark the loader with `"use cache"` and a `cacheLife` profile so the result is reused across requests.

A detail worth knowing: for dynamically rendered pages, Next.js can stream metadata after the initial HTML so the visible UI is not blocked. It disables that for crawlers that expect tags in the `head`, detected by user agent, and prerendered pages resolve metadata at build time anyway. You rarely need to change this, but it explains why the `head` can look different in a browser than in a crawler fetch.

### Titles and descriptions that earn the click

The Metadata API only prints what you give it. The part that affects search performance is the writing. Keep titles specific and front-loaded, make every description unique, and describe what the reader gets rather than repeating the title. On sites with hundreds of generated pages, I add a build-time check that fails when two routes share a title or description, because duplicates creep in quietly.

## Canonical URLs and duplicate content

Canonicals tell search engines which URL is the real one when the same content is reachable in several ways: with and without a trailing slash, with tracking parameters, through a filter combination, or under an old path you redirected from. Set `alternates.canonical` on every indexable route and make it the clean, preferred URL.

- Do not point every page's canonical at the home page. That tells crawlers the rest of your site is a duplicate.
- Leave query strings out of canonicals unless the parameter changes the content in a meaningful way, like pagination.
- If a page should not be indexed at all, use `robots: { index: false }` in its metadata instead of a misleading canonical.
- Redirect old URLs with `permanentRedirect` or `redirects` in `next.config.ts`, and keep the canonical on the destination.

## Sitemap and robots as code

The App Router supports `app/sitemap.ts` and `app/robots.ts` as special route handlers. Generating the sitemap from the same data source as your pages means a new post or landing page appears in it automatically, and a deleted one disappears. Both files are cached by default unless they use a request-time API.

```ts
// app/sitemap.ts
import type { MetadataRoute } from "next";
import { getAllPosts } from "@/lib/posts";

const base = "https://example.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getAllPosts();
  return [
    { url: base, lastModified: new Date(), priority: 1 },
    { url: `${base}/blog`, changeFrequency: "weekly", priority: 0.7 },
    ...posts.map((post) => ({
      url: `${base}/blog/${post.slug}`,
      lastModified: new Date(post.updatedAt ?? post.publishedAt),
    })),
  ];
}
```

For `robots.ts`, return a `rules` object and the sitemap URL. Disallow internal routes like `/api` or `/dashboard`, but remember that `robots.txt` controls crawling, not indexing. A page you never want in results needs a `noindex` robots meta tag, and it must stay crawlable so the crawler can see that tag. Very large sites can split sitemaps with `generateSitemaps`; note that in Next.js 16 the `id` passed to a split sitemap is a Promise too.

## JSON-LD structured data

JSON-LD describes what a page is (an article, a person, a product, a FAQ, a breadcrumb trail) in a format search engines and AI systems can parse without guessing. The recommended approach in the App Router is a plain `script` tag with `type="application/ld+json"` rendered from your layout or page. It is data, not executable code, so `next/script` is the wrong tool here.

The one trap is escaping. `JSON.stringify` does not protect against a string containing a closing script tag, so replace `<` with its unicode escape before injecting it. I keep one small helper for this and use it everywhere.

```tsx
// components/JsonLd.tsx
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
```

Useful types for most content sites are `Organization` or `Person` in the root layout, `BreadcrumbList` on nested pages, `BlogPosting` on articles, and `FAQPage` only where the page visibly shows those questions and answers. Structured data that describes content the user cannot see is the fastest way to lose rich results. Validate with Google's Rich Results Test before shipping, and consider the `schema-dts` package if you want TypeScript to catch typos in property names.

## Rendering strategy is an SEO decision

Crawlers can execute JavaScript, but you should not rely on it. The safest position is that every indexable page returns its primary content in the initial HTML. The App Router makes that the default, because layouts and pages are Server Components that render on the server.

Where it goes wrong is when a page fetches its main content inside a Client Component with `useEffect`. The HTML contains a spinner, and the article arrives later. For SEO pages, fetch on the server and pass data down. I cover where to draw that line in more depth in [Server Components vs Client Components](/blog/server-components-vs-client-components).

With Cache Components enabled, the model is clearer still. Static parts of a route and anything marked `"use cache"` become part of a prerendered shell. Parts that read cookies, headers or uncached data sit behind a `Suspense` boundary and stream at request time. For a marketing or content page, aim for everything above the fold to be in the shell. Personalised extras can stream in below.

- Prerender content pages with `generateStaticParams` so they are served as static HTML.
- Keep request-time reads (cookies, headers) out of the parts of the page that carry your main content.
- Do not put a `Suspense` fallback where your H1 and intro should be. The fallback is what arrives first.

## Core Web Vitals in practice

Core Web Vitals measure loading (LCP), responsiveness (INP) and visual stability (CLS). Next.js gives you good defaults, but each metric has a common way to break it.

1. LCP: the largest element is usually a hero image or heading. Use `next/image` with explicit dimensions and mark the one image above the fold with `fetchPriority="high"` or `loading="eager"` (the old `priority` prop is deprecated in Next.js 16), and serve it from your own domain so there is no extra connection.
2. CLS: layout shift comes from images without dimensions, late-loading fonts and banners injected at the top. `next/font` self-hosts fonts and applies size-adjusted fallbacks, which removes most font-related shift.
3. INP: slow interactions come from too much JavaScript on the main thread. Every `"use client"` boundary adds to the bundle, so keep interactive islands small and move heavy libraries out of the initial load with dynamic imports.

Measure in the field, not only in Lighthouse. The `useReportWebVitals` hook lets you send real-user metrics to your analytics endpoint so you see what actual visitors on actual devices experience.

## A note from the blog automation pipeline

In the [AI blog automation case study](/projects/blog-automation), SEO processing was one stage of the pipeline, after generation and before human review. The lesson that carried over to every Next.js project since is that metadata should be derived from the same structured content that renders the page. When the title, description, canonical and JSON-LD all come from one object, they cannot drift apart. When they are typed by hand in three places, they will.

> SEO bugs in Next.js are rarely about missing APIs. They are about two sources of truth that slowly disagree.

## When not to over-engineer this

Not every route needs custom metadata. Authenticated dashboards, settings pages and internal tools should be `noindex` and can share a generic title. Spending time on Open Graph images for a billing page is wasted effort. Put the work into the pages people actually search for: landing pages, articles, documentation and product pages. If you are still shaping the route structure itself, [the App Router architecture guide](/blog/nextjs-app-router-architecture) is a better starting point than metadata tuning.

## Key takeaways

- Set `metadataBase` and a title template once in the root layout, then keep per-page metadata short and specific.
- Use `generateMetadata` with awaited `params` for data-driven routes, and share the loader with the page through `cache`.
- Give every indexable page a clean canonical, and use `noindex` rather than canonical tricks for pages you want hidden.
- Generate `sitemap.ts`, `robots.ts` and JSON-LD from the same data that renders the page, and escape JSON-LD output.
- Keep primary content in the server-rendered HTML and protect Core Web Vitals by keeping client boundaries small.

## Need a second pair of eyes on your Next.js SEO?

If your Next.js site is live but not showing up the way it should, the cause is usually a handful of specific issues in metadata, rendering or crawlability. I do this kind of audit and fix work as part of my [Next.js development](/nextjs-developer) services. If you want help, [get in touch through the hire me page](/hire-me) with a link to the site and what you have already tried.
