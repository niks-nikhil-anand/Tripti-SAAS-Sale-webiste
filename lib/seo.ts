import type { Metadata } from "next";
import { faqs, plans, siteConfig } from "./site";
import type { Post } from "./blog";
import type { CatalogProduct } from "./catalog";

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

/**
 * Every indexable route builds its metadata through here so the canonical, the
 * OG url and the titles can never drift apart — the single most common cause
 * of duplicate-content problems on a multi-page marketing site.
 */
export function pageMetadata({
  title,
  description,
  path,
  type = "website",
  publishedTime,
  modifiedTime,
  authors,
  noindex = false,
}: {
  title: string;
  description: string;
  path: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  authors?: string[];
  noindex?: boolean;
}): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type,
      url: path,
      title,
      description,
      siteName: siteConfig.name,
      locale: siteConfig.locale,
      // Declaring `openGraph` here replaces the root object wholesale, so the
      // root opengraph-image is NOT inherited and has to be named explicitly.
      // Articles are the exception: they have their own image file in-segment,
      // and naming one here would override it.
      ...(type === "article"
        ? { publishedTime, modifiedTime, authors }
        : { images: ["/opengraph-image"] }),
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    ...(noindex
      ? { robots: { index: false, follow: false, nocache: true } }
      : undefined),
  };
}

/* -------------------------------------------------------------------------- */
/* Shared entities                                                            */
/* -------------------------------------------------------------------------- */

const organizationId = `${siteConfig.url}/#organization`;

export const organization = {
  "@type": "Organization",
  "@id": organizationId,
  name: siteConfig.legalName,
  alternateName: siteConfig.name,
  url: siteConfig.url,
  logo: `${siteConfig.url}/opengraph-image`,
  foundingDate: siteConfig.founded,
  email: siteConfig.email,
  sameAs: [
    siteConfig.social.x,
    siteConfig.social.linkedin,
    siteConfig.social.github,
  ],
};

export const website = {
  "@type": "WebSite",
  "@id": `${siteConfig.url}/#website`,
  url: siteConfig.url,
  name: siteConfig.name,
  description: siteConfig.description,
  inLanguage: "en-US",
  publisher: { "@id": organizationId },
};

export const softwareApplication = {
  "@type": "SoftwareApplication",
  "@id": `${siteConfig.url}/#software`,
  name: siteConfig.name,
  applicationCategory: "BusinessApplication",
  applicationSubCategory: "Analytics",
  operatingSystem: "Web-based, macOS, Windows, Linux",
  description: siteConfig.description,
  url: absoluteUrl("/product"),
  publisher: { "@id": organizationId },
  featureList: [
    "Natural-language querying over your data warehouse",
    "Version-controlled metrics layer",
    "Funnel, retention and cohort analysis",
    "Snowflake, BigQuery, Databricks and Postgres connectors",
    "SSO, SCIM and row-level permissions",
  ],
  offers: plans
    .filter((plan) => plan.monthly !== null)
    .map((plan) => ({
      "@type": "Offer",
      name: `${siteConfig.name} ${plan.name}`,
      price: String(plan.monthly),
      priceCurrency: "USD",
      category: plan.monthly === 0 ? "free" : "subscription",
      url: absoluteUrl("/#pricing"),
      availability: "https://schema.org/InStock",
    })),
};

export const faqPage = {
  "@type": "FAQPage",
  "@id": `${siteConfig.url}/#faq`,
  mainEntity: faqs.map((faq) => ({
    "@type": "Question",
    name: faq.question,
    acceptedAnswer: { "@type": "Answer", text: faq.answer },
  })),
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

/* -------------------------------------------------------------------------- */
/* Page graphs                                                                */
/* -------------------------------------------------------------------------- */

export const landingPageJsonLd = graph(
  organization,
  website,
  softwareApplication,
  faqPage,
);

export function articleJsonLd(post: Post) {
  const url = absoluteUrl(`/blog/${post.slug}`);
  return {
    "@type": "BlogPosting",
    "@id": `${url}#article`,
    headline: post.title,
    description: post.excerpt,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt ?? post.publishedAt,
    inLanguage: "en-US",
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: `${url}/opengraph-image`,
    wordCount: post.wordCount,
    keywords: post.tags.join(", "),
    articleSection: post.category,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
      worksFor: { "@id": organizationId },
    },
    publisher: { "@id": organizationId },
  };
}

export function blogJsonLd(posts: Post[]) {
  return {
    "@type": "Blog",
    "@id": `${siteConfig.url}/blog#blog`,
    name: `${siteConfig.name} Blog`,
    description:
      "Field notes on product analytics, semantic layers and warehouse-native tooling.",
    url: absoluteUrl("/blog"),
    publisher: { "@id": organizationId },
    blogPost: posts.map((post) => ({
      "@type": "BlogPosting",
      headline: post.title,
      url: absoluteUrl(`/blog/${post.slug}`),
      datePublished: post.publishedAt,
      author: { "@type": "Person", name: post.author.name },
    })),
  };
}

/**
 * ItemList of Products for the /product catalog. Prices come from the same
 * `catalog` array the cards render from, so the structured data cannot drift
 * from what a visitor sees — which is exactly the mismatch Google penalises.
 * Products without a price carry no Offer rather than a fabricated one.
 */
export function catalogJsonLd(products: CatalogProduct[]) {
  return {
    "@type": "ItemList",
    "@id": `${siteConfig.url}/product#catalog`,
    name: `${siteConfig.name} product line`,
    numberOfItems: products.length,
    itemListElement: products.map((product, i) => ({
      "@type": "ListItem",
      position: i + 1,
      item: {
        "@type": "Product",
        "@id": `${siteConfig.url}/product#${product.slug}`,
        name: `${siteConfig.name} ${product.name}`,
        category: product.category,
        description: product.description,
        brand: { "@id": organizationId },
        ...(product.price === null
          ? {}
          : {
              offers: {
                "@type": "Offer",
                price: String(product.price),
                priceCurrency: "USD",
                availability:
                  product.availability === "available"
                    ? "https://schema.org/InStock"
                    : "https://schema.org/PreOrder",
                url: absoluteUrl("/product"),
              },
            }),
      },
    })),
  };
}

export const professionalService = {
  "@type": "ProfessionalService",
  "@id": `${siteConfig.url}/hire-me#service`,
  name: `${siteConfig.name} Analytics Engineering Services`,
  description:
    "Implementation, migration and analytics engineering delivered by the team that builds Stackpilot.",
  url: absoluteUrl("/hire-me"),
  parentOrganization: { "@id": organizationId },
  areaServed: "Worldwide",
  availableLanguage: "English",
  serviceType: [
    "Analytics engineering",
    "Data warehouse migration",
    "Semantic layer design",
    "BI tool migration",
  ],
};

/* -------------------------------------------------------------------------- */
/* Personal brand: Person, Service, FAQ, WebPage                              */
/* -------------------------------------------------------------------------- */

export const personId = `${siteConfig.url}/#person`;

export const person = {
  "@type": "Person",
  "@id": personId,
  name: siteConfig.legalName,
  jobTitle: "Full Stack & AI Developer",
  url: absoluteUrl("/about"),
  email: siteConfig.email,
  address: {
    "@type": "PostalAddress",
    addressLocality: "Bengaluru",
    addressRegion: "Karnataka",
    addressCountry: "IN",
  },
  sameAs: [siteConfig.social.linkedin, siteConfig.social.github, siteConfig.social.x],
};

export function webPageJsonLd(args: { path: string; name: string; description: string }) {
  const url = absoluteUrl(args.path);
  return {
    "@type": "WebPage",
    "@id": `${url}#webpage`,
    url,
    name: args.name,
    description: args.description,
    inLanguage: "en-US",
    isPartOf: { "@id": `${siteConfig.url}/#website` },
    about: { "@id": personId },
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
    areaServed: args.areaServed ?? "Worldwide",
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
