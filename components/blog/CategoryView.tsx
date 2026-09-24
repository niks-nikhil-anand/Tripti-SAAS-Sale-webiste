import Link from "next/link";
import { getActiveCategories, getPostsByCategory, type Category } from "@/lib/blog";
import { resolvePages } from "@/lib/content";
import {
  breadcrumbList,
  graph,
  itemListJsonLd,
  person,
  webPageJsonLd,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Eyebrow, H2, Section } from "@/components/ui/Section";
import { PostCard } from "./PostCard";
import { PageCard } from "@/components/cards/PageCard";
import { HireCta } from "@/components/landing/HireCta";

/** Topic hub: the articles in a cluster plus the service pages they feed. */
export function CategoryView({ category }: { category: Category }) {
  const path = `/blog/${category.slug}`;
  const posts = getPostsByCategory(category.slug);
  const services = resolvePages(category.services);
  const others = getActiveCategories().filter((c) => c.slug !== category.slug);
  const trail = [
    { name: "Home", path: "/" },
    { name: "Blog", path: "/blog" },
    { name: category.name, path },
  ];

  return (
    <>
      <JsonLd
        data={graph(
          webPageJsonLd({
            path,
            name: category.title,
            description: category.description,
            type: "CollectionPage",
          }),
          itemListJsonLd(
            path,
            posts.map((p) => ({ name: p.title, path: `/blog/${p.slug}` })),
          ),
          person,
          breadcrumbList(trail),
        )}
      />

      <div className="mx-auto max-w-[1240px] px-4 pt-10 sm:px-6 sm:pt-14">
        <Breadcrumbs trail={trail} />
        <div className="mt-8 max-w-[780px]">
          <Eyebrow>{category.name} articles</Eyebrow>
          <h1 className="text-[34px] leading-[1.06] text-balance sm:text-[52px]">
            {category.title.split(" – ")[0]}
          </h1>
          <p className="mt-5 text-[16px] leading-[1.65] text-[#cfd7ea] sm:text-[18px]">
            {category.intro}
          </p>
        </div>
      </div>

      <Section labelledBy="posts-h" className="pt-12 sm:pt-14">
        <h2 id="posts-h" className="sr-only">
          {category.name} articles
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {posts.map((p) => (
            <PostCard key={p.slug} post={p} />
          ))}
        </div>
      </Section>

      {services.length ? (
        <Section labelledBy="svc-h">
          <Eyebrow>Need this built?</Eyebrow>
          <H2 id="svc-h">Related services</H2>
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((p) => (
              <PageCard key={p.slug} page={p} />
            ))}
          </div>
        </Section>
      ) : null}

      {others.length ? (
        <Section labelledBy="topics-h">
          <Eyebrow>More topics</Eyebrow>
          <H2 id="topics-h">Other categories</H2>
          <ul className="mt-6 flex flex-wrap gap-2">
            {others.map((c) => (
              <li key={c.slug}>
                <Link
                  href={`/blog/${c.slug}`}
                  className="inline-flex rounded-full border border-[var(--line2)] bg-[var(--glass)] px-4 py-2 text-[13.5px] text-[var(--ink)] hover:border-[rgba(77,124,255,0.5)] hover:text-white"
                >
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </Section>
      ) : null}

      <HireCta />
    </>
  );
}
