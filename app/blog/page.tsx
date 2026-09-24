import type { Metadata } from "next";
import Link from "next/link";
import { getActiveCategories, getAllPosts, getPostsByCategory } from "@/lib/blog";
import {
  blogJsonLd,
  breadcrumbList,
  graph,
  pageMetadata,
  person,
  webPageJsonLd,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Eyebrow, H2, Section } from "@/components/ui/Section";
import { PostCard } from "@/components/blog/PostCard";
import { AuthorCard } from "@/components/profile/AuthorCard";
import { HireCta } from "@/components/landing/HireCta";

const title = "Engineering Blog – React, Next.js, Node.js and AI";
const description =
  "Technical guides by Tripti Shakya on React, Next.js, Node.js, RAG, LLMs, AI agents and SaaS architecture, drawn from building production applications.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/blog" });

const trail = [
  { name: "Home", path: "/" },
  { name: "Blog", path: "/blog" },
];

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const featured = posts.filter((p) => p.featured);
  const cats = getActiveCategories();

  return (
    <>
      <JsonLd
        data={graph(
          webPageJsonLd({ path: "/blog", name: title, description, type: "CollectionPage" }),
          blogJsonLd(posts),
          person,
          breadcrumbList(trail),
        )}
      />

      <div className="mx-auto max-w-[1240px] px-4 pt-10 sm:px-6 sm:pt-14">
        <Breadcrumbs trail={trail} />
        <div className="mt-8 max-w-[780px]">
          <Eyebrow>Blog</Eyebrow>
          <h1 className="text-[34px] leading-[1.06] sm:text-[52px]">
            Engineering notes from real builds.
          </h1>
          <p className="mt-5 text-[16px] leading-[1.65] text-[#cfd7ea] sm:text-[18px]">
            Practical guides on React, Next.js, Node.js, RAG, LLMs and SaaS architecture,
            written from the projects I build, with the trade-offs left in.
          </p>
        </div>

        {cats.length ? (
          <nav aria-label="Blog categories" className="mt-8">
            <ul className="flex flex-wrap gap-2">
              {cats.map((c) => (
                <li key={c.slug}>
                  <Link
                    href={`/blog/${c.slug}`}
                    className="inline-flex items-center gap-2 rounded-full border border-[var(--line2)] bg-[var(--glass)] px-4 py-2 text-[13.5px] text-[var(--ink)] hover:border-[rgba(77,124,255,0.5)] hover:text-white"
                  >
                    {c.name}
                    <span className="font-[family-name:var(--m)] text-[11px] text-[var(--faint)]">
                      {getPostsByCategory(c.slug).length}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        ) : null}
      </div>

      {featured.length ? (
        <Section labelledBy="featured-h">
          <Eyebrow>Start here</Eyebrow>
          <H2 id="featured-h">Featured guides</H2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {featured.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </Section>
      ) : null}

      <Section labelledBy="all-h">
        <Eyebrow>All articles</Eyebrow>
        <H2 id="all-h">Latest articles</H2>
        {posts.length ? (
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        ) : (
          <p className="mt-6 text-[var(--dim)]">The first articles are on their way.</p>
        )}
      </Section>

      <AuthorCard
        heading="About the author"
        text="I write about what I build: production React and Next.js apps, Node.js backends and AI systems. Every article comes from real project work."
      />
      <HireCta />
    </>
  );
}
