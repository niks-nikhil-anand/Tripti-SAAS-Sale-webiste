import type { Metadata } from "next";
import Link from "next/link";
import { formatDate, getAllPosts } from "@/lib/blog";
import {
  blogJsonLd,
  breadcrumbList,
  graph,
  jsonLdScript,
  pageMetadata,
} from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { ArrowRightIcon } from "@/components/ui/Icons";

const trail = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
];

export const metadata: Metadata = pageMetadata({
  title: "Blog — product analytics and data engineering",
  description:
    "Field notes from the Stackpilot team on semantic layers, warehouse-native analytics, constrained natural-language querying and BI migrations.",
  path: "/blog",
});

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const [lead, ...rest] = posts;
  const jsonLd = graph(blogJsonLd(posts), breadcrumbList(trail));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(jsonLd)}
      />

      <PageHeader
        trail={trail}
        eyebrow="Blog"
        title="Field notes from building analytics infrastructure"
        description="What we have learned shipping semantic layers, migrating teams off legacy BI, and keeping a language model from confidently returning the wrong number."
      />

      <Container className="py-16 sm:py-20">
        {/* Lead article */}
        <article className="group ring-gradient relative overflow-hidden rounded-2xl border border-transparent bg-surface p-7 sm:p-10">
          <div className="flex flex-wrap items-center gap-3 text-xs text-fg-muted">
            <span className="rounded-full bg-accent-soft px-2.5 py-1 font-semibold text-accent">
              {lead.category}
            </span>
            <time dateTime={lead.publishedAt}>{formatDate(lead.publishedAt)}</time>
            <span aria-hidden="true">·</span>
            <span>{lead.readingMinutes} min read</span>
          </div>

          <h2 className="mt-5 max-w-3xl text-2xl font-semibold leading-tight tracking-tight text-balance sm:text-4xl">
            <Link href={`/blog/${lead.slug}`} className="after:absolute after:inset-0">
              {lead.title}
            </Link>
          </h2>
          <p className="mt-4 max-w-2xl text-[1.0625rem] leading-8 text-fg-muted text-pretty">
            {lead.excerpt}
          </p>
          <p className="mt-6 flex items-center gap-2 text-sm font-medium text-accent">
            Read the article
            <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
          </p>
        </article>

        {/* The rest */}
        <ul className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {rest.map((post) => (
            <li key={post.slug}>
              <article className="group relative flex h-full flex-col rounded-2xl border border-border bg-surface p-6 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/40">
                <div className="flex flex-wrap items-center gap-2.5 text-xs text-fg-muted">
                  <span className="rounded-full bg-accent-soft px-2.5 py-1 font-semibold text-accent">
                    {post.category}
                  </span>
                  <time dateTime={post.publishedAt}>
                    {formatDate(post.publishedAt)}
                  </time>
                </div>

                <h2 className="mt-4 text-lg font-semibold leading-snug tracking-tight">
                  <Link href={`/blog/${post.slug}`} className="after:absolute after:inset-0">
                    {post.title}
                  </Link>
                </h2>
                <p className="mt-3 flex-1 text-[0.9375rem] leading-7 text-fg-muted">
                  {post.excerpt}
                </p>

                <p className="mt-6 border-t border-border pt-4 text-xs text-fg-muted">
                  {post.author.name} · {post.readingMinutes} min read
                </p>
              </article>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}
