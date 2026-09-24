import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { getCategory, getRelatedPosts, type Post } from "@/lib/blog";
import { resolvePages, resolveProjects } from "@/lib/content";
import { articleJsonLd, breadcrumbList, graph, person } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Eyebrow, H2, Section } from "@/components/ui/Section";
import { AuthorByline } from "@/components/profile/AuthorByline";
import { AuthorCard } from "@/components/profile/AuthorCard";
import { PageCard } from "@/components/cards/PageCard";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { HireCta } from "@/components/landing/HireCta";
import { PostBody, TableOfContents } from "./PostBody";
import { PostCard } from "./PostCard";

/**
 * Article layout. Every post links up to its category hub, across to related
 * posts, and out to the service pages and case study it supports — the
 * topical-cluster wiring from the SEO brief.
 */
export function PostView({ post }: { post: Post }) {
  const category = getCategory(post.category)!;
  const path = `/blog/${post.slug}`;
  const trail = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: category.name, path: `/blog/${category.slug}` },
    { name: post.title, path },
  ];
  const services = resolvePages(post.services);
  const projects = resolveProjects(post.projects);
  const related = getRelatedPosts(post);
  const primaryService = services[0];

  return (
    <>
      <JsonLd data={graph(articleJsonLd(post, category.name), person, breadcrumbList(trail))} />

      <div className="mx-auto max-w-[1240px] px-4 pt-10 sm:px-6 sm:pt-14">
        <Breadcrumbs trail={trail} />

        <article className="mt-8 grid gap-12 lg:grid-cols-[minmax(0,1fr)_240px]">
          <div className="min-w-0 max-w-[760px]">
            <header className="border-b border-[var(--line)] pb-8">
              <p className="mb-4">
                <Link
                  href={`/blog/${category.slug}`}
                  className="rounded-full border border-[rgba(34,211,238,0.3)] px-2.5 py-1 font-[family-name:var(--m)] text-[10.5px] uppercase tracking-[0.14em] text-[#7fe6f7] hover:text-white"
                >
                  {category.name}
                </Link>
              </p>
              <h1 className="text-[32px] leading-[1.1] text-balance sm:text-[46px]">
                {post.title}
              </h1>
              <p className="mt-5 text-[17px] leading-[1.65] text-[#cfd7ea]">
                {post.description}
              </p>
              <div className="mt-6">
                <AuthorByline
                  publishedAt={post.publishedAt}
                  updatedAt={post.updatedAt}
                  readingMinutes={post.readingMinutes}
                />
              </div>
            </header>

            <PostBody blocks={post.body} />

            {post.tags.length ? (
              <ul className="mt-10 flex flex-wrap gap-2 border-t border-[var(--line)] pt-6" aria-label="Tags">
                {post.tags.map((t) => (
                  <li
                    key={t}
                    className="rounded-md bg-[rgba(255,255,255,0.05)] px-2.5 py-1 font-[family-name:var(--m)] text-[11px] text-[#aab5cc]"
                  >
                    #{t}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

          <aside className="hidden lg:block">
            <div className="sticky top-28 space-y-8">
              <TableOfContents blocks={post.body} />
              {primaryService ? (
                <div className="rounded-[var(--r)] border border-[rgba(77,124,255,0.3)] bg-[rgba(77,124,255,0.07)] p-4">
                  <p className="text-[13.5px] font-semibold text-[var(--ink)]">
                    Need help with this?
                  </p>
                  <p className="mt-1.5 text-[12.5px] leading-[1.55] text-[var(--dim)]">
                    {primaryService.cardBlurb}
                  </p>
                  <Link
                    href={`/${primaryService.slug}`}
                    className="mt-3 inline-flex items-center gap-1.5 text-[13px] font-semibold"
                  >
                    {primaryService.navLabel} <ArrowRight aria-hidden="true" className="size-3.5" />
                  </Link>
                </div>
              ) : null}
            </div>
          </aside>
        </article>
      </div>

      <AuthorCard
        heading="About the author"
        text="I build production React, Next.js, Node.js and AI applications, and write up what I learn along the way."
      />

      {projects.length ? (
        <Section labelledBy="case-h">
          <Eyebrow>See it in practice</Eyebrow>
          <H2 id="case-h">Related case study</H2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </Section>
      ) : null}

      {services.length ? (
        <Section labelledBy="svc-h">
          <Eyebrow>Services</Eyebrow>
          <H2 id="svc-h">Work with me on this</H2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((p) => (
              <PageCard key={p.slug} page={p} />
            ))}
          </div>
        </Section>
      ) : null}

      {related.length ? (
        <Section labelledBy="rel-h">
          <Eyebrow>Keep reading</Eyebrow>
          <H2 id="rel-h">Related articles</H2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </Section>
      ) : null}

      <HireCta service={primaryService?.serviceType} />
    </>
  );
}
