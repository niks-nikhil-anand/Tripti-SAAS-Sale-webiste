import type { Metadata } from "next";
import { siteConfig } from "./site";
import type { Post } from "./blog";

/**
 * `JSON.stringify` does not escape `<`, so a stray "</script>" inside any copy
 * would break out of the JSON-LD block. Escaping it is the mitigation the
 * Next.js docs recommend.
 */
export function jsonLdScript(data: object) {
  return { __html: JSON.stringify(data).replace(/</g, "\\u003c") };
}

export const absoluteUrl = (path: string) =>
  path === "/" ? siteConfig.url : `${siteConfig.url}${path}`;

/** Date the landing-page copy was last reviewed, unless a page overrides it. */
export const CONTENT_UPDATED = "2026-09-24";

/**
 * Every indexable route builds its metadata through here so the canonical, the
 * OG url and the titles can never drift apart.
 *
 * `ownImage`: the route segment has its own opengraph-image file. File-based
 * metadata wins over config, so we must not name the root image here. For
 * every other page the root image has to be named explicitly, because
 * declaring `openGraph` replaces the root object instead of merging into it.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
  ownImage = false,
  noindex = false,
  absoluteTitle = false,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article" | "profile";
  publishedTime?: string;
  modifiedTime?: string;
  ownImage?: boolean;
  noindex?: boolean;
  /** skip the "| TRIPTI SHAKYA" template (used on the homepage) */
  absoluteTitle?: boolean;
}): Metadata {
  // Google truncates titles around 60 characters. Keep the brand suffix only
  // when it still fits; otherwise the page's own words matter more.
  const suffix = ` | ${siteConfig.legalName}`;
  const useAbsolute =
    absoluteTitle ||
    title.includes(siteConfig.legalName) || // never "Tripti Shakya … | Tripti Shakya"
    title.length + suffix.length > 65;
  return {
    title: useAbsolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      title,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      ...(type === "article"
        ? { publishedTime, modifiedTime, authors: [absoluteUrl("/about")] }
        : {}),
      ...(ownImage ? {} : { images: ["/opengraph-image"] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      ...(ownImage ? {} : { images: ["/opengraph-image"] }),
    },
    ...(noindex
      ? { robots: { index: false, follow: true } }
      : undefined),
  };
}

/* -------------------------------------------------------------------------- */
/* Entities                                                                   */
/* -------------------------------------------------------------------------- */

export const personId = `${siteConfig.url}/#person`;
export const websiteId = `${siteConfig.url}/#website`;

/** The site is a personal brand: the Person is the publisher of everything. */
export const person = {
  "@type": "Person",
  "@id": personId,
  name: siteConfig.legalName,
  jobTitle: "Full Stack & AI Developer",
  description:
    "Full Stack & AI Developer in Bangalore building SaaS, web applications and AI products with React, Next.js, Node.js, Python and LLMs.",
  url: absoluteUrl("/about"),
  image: absoluteUrl("/images/tripti-shakya.jpg"),
  email: `mailto:${siteConfig.email}`,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Node.js",
    "Python",
    "FastAPI",
    "PostgreSQL",
    "MongoDB",
    "Redis",
    "Retrieval-augmented generation",
    "Large language models",
    "AI agents",
    "Vector databases",
    "AWS",
    "Docker",
    "SaaS architecture",
  ],
  // Only profiles confirmed as hers. Add X here once the handle is confirmed.
  sameAs: [siteConfig.social.linkedin, siteConfig.social.github],
};

export const website = {
  "@type": "WebSite",
  "@id": websiteId,
  url: siteConfig.url,
  name: siteConfig.legalName,
  alternateName: siteConfig.name,
  description: siteConfig.description,
  inLanguage: "en",
  publisher: { "@id": personId },
};

/** Mirrors the visible <Breadcrumbs> trail so the markup and the data agree. */
export function breadcrumbList(trail: { name: string; path: string }[]) {
  return {
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: crumb.name,
      item: absoluteUrl(crumb.path),
    })),
  };
}

export function graph(...nodes: object[]) {
  return { "@context": "https://schema.org", "@graph": nodes };
}

export function webPageJsonLd(args: {
  path: string;
  name: string;
  description: string;
  type?: "WebPage" | "AboutPage" | "ContactPage" | "CollectionPage" | "ProfilePage";
  dateModified?: string;
  primaryImage?: string;
}) {
  const url = absoluteUrl(args.path);
  return {
    "@type": args.type ?? "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: args.name,
    description: args.description,
    inLanguage: "en",
    isPartOf: { "@id": websiteId },
    about: { "@id": personId },
    author: { "@id": personId },
    ...(args.dateModified ? { dateModified: args.dateModified } : {}),
    ...(args.primaryImage
      ? { primaryImageOfPage: { "@type": "ImageObject", url: args.primaryImage } }
      : {}),
  };
}

export function serviceJsonLd(args: {
  path: string;
  name: string;
  description: string;
  serviceType: string;
  areaServed?: string;
}) {
  const url = absoluteUrl(args.path);
  return {
    "@type": "Service",
    "@id": `${url}#service`,
    name: args.name,
    description: args.description,
    serviceType: args.serviceType,
    url,
    provider: { "@id": personId },
    areaServed: args.areaServed
      ? { "@type": "City", name: args.areaServed }
      : "Worldwide",
  };
}

/** Only for FAQs rendered visibly on the same page. */
export function faqJsonLd(path: string, items: { q: string; a: string }[]) {
  return {
    "@type": "FAQPage",
    "@id": `${absoluteUrl(path)}#faq`,
    mainEntity: items.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

export function articleJsonLd(post: Post, categoryName: string) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    inLanguage: "en",
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: `${url}/opengraph-image`,
    wordCount: post.wordCount,
    keywords: post.tags.join(", "),
    articleSection: categoryName,
    author: { "@id": personId },
    publisher: { "@id": personId },
    isPartOf: { "@id": `${absoluteUrl("/blog")}#blog` },
  };
}

export function blogJsonLd(posts: Post[]) {
  return {
    "@type": "Blog",
    "@id": `${absoluteUrl("/blog")}#blog`,
    url: absoluteUrl("/blog"),
    name: `${siteConfig.legalName} – Engineering Blog`,
    inLanguage: "en",
    publisher: { "@id": personId },
    author: { "@id": personId },
    blogPost: posts.map((p) => ({
      "@type": "BlogPosting",
      headline: p.title,
      url: absoluteUrl(`/blog/${p.slug}`),
      datePublished: p.publishedAt,
    })),
  };
}

/** Case studies are articles authored by the Person, about a project. */
export function caseStudyJsonLd(args: {
  path: string;
  headline: string;
  description: string;
  keywords: string[];
  dateModified: string;
}) {
  const url = absoluteUrl(args.path);
  return {
    "@type": "Article",
    "@id": `${url}#article`,
    headline: args.headline,
    description: args.description,
    url,
    mainEntityOfPage: { "@id": `${url}#webpage` },
    image: `${url}/opengraph-image`,
    dateModified: args.dateModified,
    inLanguage: "en",
    articleSection: "Case study",
    keywords: args.keywords.join(", "),
    author: { "@id": personId },
    publisher: { "@id": personId },
  };
}

/** ItemList for hub pages (projects index, blog categories). */
export function itemListJsonLd(path: string, items: { name: string; path: string }[]) {
  return {
    "@type": "ItemList",
    "@id": `${absoluteUrl(path)}#list`,
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      url: absoluteUrl(it.path),
    })),
  };
}
