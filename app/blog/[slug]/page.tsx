import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate, getPost, getRelatedPosts, posts } from "@/lib/blog";
import {
  articleJsonLd,
  breadcrumbList,
  graph,
  jsonLdScript,
  pageMetadata,
} from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/Icons";
import { PostBody, TableOfContents } from "@/components/blog/PostBody";

/** Prerenders every post at build time; unknown slugs 404 instead of rendering. */
export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({
  params,
}: PageProps<"/blog/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) {
    return { title: "Post not found", robots: { index: false, follow: false } };
  }

  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    type: "article",
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt ?? post.publishedAt,
    authors: [post.author.name],
  });
}

export default async function BlogPostPage({
  params,
}: PageProps<"/blog/[slug]">) {
  const { slug } = await params;
  const post = getPost(slug);

  if (!post) notFound();

  const related = getRelatedPosts(post);
  const trail = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: post.title, path: `/blog/${post.slug}` },
  ];

  const jsonLd = graph(articleJsonLd(post), breadcrumbList(trail));

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(jsonLd)}
      />

      <Container className="py-12 sm:py-16">
        <Breadcrumbs trail={trail} />

        <article className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_16rem]">
          <div className="min-w-0 max-w-2xl">
            <header>
              <div className="flex flex-wrap items-center gap-3 text-xs text-fg-muted">
                <span className="rounded-full bg-accent-soft px-2.5 py-1 font-semibold text-accent">
                  {post.category}
                </span>
                <time dateTime={post.publishedAt}>
                  {formatDate(post.publishedAt)}
                </time>
                <span aria-hidden="true">·</span>
                <span>{post.readingMinutes} min read</span>
              </div>

              <h1 className="mt-5 text-3xl font-semibold leading-[1.15] tracking-tight text-balance sm:text-[2.75rem]">
                {post.title}
              </h1>
              <p className="mt-5 text-lg leading-8 text-fg-muted text-pretty">
                {post.excerpt}
              </p>

              <div className="mt-8 flex items-center gap-3 border-y border-border py-5">
                <span
                  aria-hidden="true"
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent"
                >
                  {post.author.name.split(" ").map((p) => p[0]).slice(0, 2).join("")}
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-semibold">{post.author.name}</span>
                  <span className="text-sm text-fg-muted">{post.author.role}</span>
                </span>
                {post.updatedAt ? (
                  <span className="ml-auto text-xs text-fg-muted">
                    Updated{" "}
                    <time dateTime={post.updatedAt}>
                      {formatDate(post.updatedAt)}
                    </time>
                  </span>
                ) : null}
              </div>
            </header>

            <div className="mt-10">
              <PostBody blocks={post.body} />
            </div>

            <ul className="mt-12 flex flex-wrap gap-2 border-t border-border pt-8">
              {post.tags.map((tag) => (
                <li
                  key={tag}
                  className="rounded-full border border-border bg-surface px-3 py-1 text-xs text-fg-muted"
                >
                  #{tag}
                </li>
              ))}
            </ul>
          </div>

          {/* Sidebar: contents + a soft CTA */}
          <aside className="flex flex-col gap-5 lg:sticky lg:top-24 lg:h-fit">
            <TableOfContents blocks={post.body} />
            <div className="rounded-2xl border border-border bg-surface-2 p-5">
              <p className="text-sm font-semibold">Try it on your warehouse</p>
              <p className="mt-2 text-sm leading-6 text-fg-muted">
                Free for three editors. Connects in about five minutes.
              </p>
              <Button as="a" href="/checkout?plan=growth" size="sm" className="mt-4 w-full">
                Start free
              </Button>
            </div>
          </aside>
        </article>

        {related.length > 0 ? (
          <section aria-labelledby="related-heading" className="mt-20 border-t border-border pt-12">
            <h2 id="related-heading" className="text-xl font-semibold tracking-tight">
              Related reading
            </h2>
            <ul className="mt-6 grid gap-5 sm:grid-cols-2">
              {related.map((r) => (
                <li key={r.slug}>
                  <article className="group relative h-full rounded-2xl border border-border bg-surface p-6 transition-colors hover:border-border-strong">
                    <p className="text-xs font-semibold text-accent">{r.category}</p>
                    <h3 className="mt-2 text-lg font-semibold leading-snug tracking-tight">
                      <Link href={`/blog/${r.slug}`} className="after:absolute after:inset-0">
                        {r.title}
                      </Link>
                    </h3>
                    <p className="mt-3 text-sm leading-6 text-fg-muted">{r.excerpt}</p>
                  </article>
                </li>
              ))}
            </ul>
            <p className="mt-8">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-sm font-medium text-accent hover:underline"
              >
                All articles
                <ArrowRightIcon className="size-4" />
              </Link>
            </p>
          </section>
        ) : null}
      </Container>
    </>
  );
}
