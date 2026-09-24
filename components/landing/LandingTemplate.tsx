import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import type { LandingPage } from "@/types/content";
import { resolvePages, resolveProjects } from "@/lib/content";
import {
  breadcrumbList,
  faqJsonLd,
  CONTENT_UPDATED,
  graph,
  person,
  serviceJsonLd,
  webPageJsonLd,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { getPostsForService } from "@/lib/blog";
import { AuthorByline } from "@/components/profile/AuthorByline";
import { PostCard } from "@/components/blog/PostCard";
import { EngagementSteps } from "./EngagementSteps";
import { KeyTakeaways } from "./KeyTakeaways";
import { AuthorCard } from "@/components/profile/AuthorCard";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Eyebrow, H2, Section } from "@/components/ui/Section";
import { PageCard } from "@/components/cards/PageCard";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { ArchitectureDiagram } from "./ArchitectureDiagram";
import { FaqList } from "./FaqList";
import { HireCta } from "./HireCta";
import { PointGrid } from "./PointGrid";
import { StackGrid } from "./StackGrid";

/**
 * One template for developer, solution and location pages. The copy is what
 * makes each page distinct; the template only guarantees a consistent heading
 * outline (one h1, h2 per section, h3 for cards) and consistent schema.
 */
export function LandingTemplate({ page }: { page: LandingPage }) {
  const path = `/${page.slug}`;
  // Two levels until group hub pages exist; a fragment URL is not a valid
  // breadcrumb target.
  const trail = [
    { name: "Home", path: "/" },
    { name: page.navLabel, path },
  ];
  const projects = resolveProjects(page.projects);
  const related = resolvePages(page.related);
  const articles = getPostsForService(page.slug, 3);
  const updatedAt = page.updatedAt ?? CONTENT_UPDATED;

  const jsonLd = graph(
    webPageJsonLd({
      path,
      name: page.metaTitle,
      description: page.metaDescription,
      dateModified: updatedAt,
    }),
    serviceJsonLd({
      path,
      name: page.navLabel,
      description: page.metaDescription,
      serviceType: page.serviceType,
      areaServed: page.location ? page.location.city : undefined,
    }),
    person,
    breadcrumbList(trail),
    ...(page.faqs.length ? [faqJsonLd(path, page.faqs)] : []),
  );

  return (
    <>
      <JsonLd data={jsonLd} />

      {/* Hero */}
      <header className="relative overflow-hidden border-b border-[var(--line)]">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_70%_80%_at_30%_0%,#000_30%,transparent_100%)]" />
          <div className="absolute -top-64 left-[10%] size-[36rem] rounded-full bg-[radial-gradient(circle,rgba(77,124,255,0.22),transparent_65%)] blur-2xl" />
        </div>
        <div className="relative mx-auto max-w-[1240px] px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
          <Breadcrumbs trail={trail} />
          <div className="mt-8 max-w-[860px]">
            <Eyebrow>{page.eyebrow}</Eyebrow>
            <h1 className="text-[34px] leading-[1.06] text-[var(--ink)] text-balance sm:text-[52px] lg:text-[60px]">
              {page.h1}
            </h1>
            <p className="mt-5 max-w-[62ch] text-[16px] leading-[1.65] text-[#cfd7ea] sm:text-[18px]">
              {page.intro}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2" aria-label="Highlights">
              {page.highlights.map((h) => (
                <li
                  key={h}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[var(--line2)] bg-[var(--glass)] px-3 py-1.5 text-[12.5px] text-[var(--dim)]"
                >
                  <Check aria-hidden="true" className="size-3.5 text-[var(--cyan)]" />
                  {h}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link
                href={`/hire-me?service=${encodeURIComponent(page.serviceType)}`}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#4d7cff] to-[#7c5cff] px-6 py-3 text-[15px] font-semibold text-white shadow-[0_18px_44px_-18px_rgba(77,124,255,0.9)] transition-transform hover:-translate-y-0.5 hover:text-white"
              >
                Hire Me <ArrowRight aria-hidden="true" className="size-4" />
              </Link>
              <a
                href="#projects"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--line2)] bg-[var(--glass)] px-6 py-3 text-[15px] font-semibold text-[var(--ink)] transition-colors hover:bg-[var(--glass2)] hover:text-white"
              >
                View Projects
              </a>
            </div>
            <div className="mt-8">
              <AuthorByline label="By" updatedAt={updatedAt} />
            </div>
          </div>
        </div>
      </header>

      {page.summary?.length ? (
        <Section className="pt-12 sm:pt-16">
          <KeyTakeaways items={page.summary} />
        </Section>
      ) : null}

      {page.diagram ? (
        <Section className="pt-12 sm:pt-16">
          <ArchitectureDiagram {...page.diagram} />
        </Section>
      ) : null}

      {/* Body sections with an on-page contents list on wide screens */}
      <div className="mx-auto grid max-w-[1240px] gap-10 px-4 sm:px-6 lg:grid-cols-[220px_minmax(0,1fr)]">
        <nav
          aria-label="On this page"
          className="hidden pt-20 lg:block"
        >
          <div className="sticky top-28">
            <p className="mb-3 font-[family-name:var(--m)] text-[10.5px] uppercase tracking-[0.2em] text-[var(--faint)]">
              On this page
            </p>
            <ol className="space-y-2 border-l border-[var(--line)] text-[13px]">
              {page.sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="-ml-px block border-l border-transparent pl-3 text-[var(--dim)] hover:border-[var(--blue)] hover:text-[var(--ink)]"
                  >
                    {s.heading}
                  </a>
                </li>
              ))}
            </ol>
          </div>
        </nav>

        <div className="min-w-0">
          {page.sections.map((s) => (
            <section
              key={s.id}
              id={s.id}
              aria-labelledby={`${s.id}-h`}
              className="scroll-mt-28 border-b border-[var(--line)] py-12 last:border-b-0 sm:py-14"
            >
              <H2 id={`${s.id}-h`}>{s.heading}</H2>
              <div className="mt-5 max-w-[72ch] space-y-4 text-[15.5px] leading-[1.75] text-[#c3cbdd]">
                {s.body.map((para) => (
                  <p key={para.slice(0, 40)}>{para}</p>
                ))}
              </div>
              {s.points?.length ? (
                <div className="mt-7">
                  <PointGrid points={s.points} />
                </div>
              ) : null}
              {s.links?.length ? (
                <p className="mt-6 flex flex-wrap items-center gap-2 text-[13px] text-[var(--faint)]">
                  <span>Related:</span>
                  {s.links.map((l) => (
                    <Link
                      key={l.href}
                      href={l.href}
                      className="rounded-full border border-[rgba(77,124,255,0.3)] bg-[rgba(77,124,255,0.08)] px-3 py-1 text-[#a9c0ff] hover:text-white"
                    >
                      {l.label}
                    </Link>
                  ))}
                </p>
              ) : null}
            </section>
          ))}
        </div>
      </div>

      <Section labelledBy="stack-h">
        <Eyebrow>Stack</Eyebrow>
        <H2 id="stack-h">Tools I use for this work</H2>
        <div className="mt-8">
          <StackGrid stack={page.stack} />
        </div>
      </Section>

      {projects.length ? (
        <Section id="projects" labelledBy="projects-h" className="scroll-mt-28">
          <Eyebrow>Case studies</Eyebrow>
          <H2 id="projects-h">Relevant projects</H2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((p) => (
              <ProjectCard key={p.slug} project={p} />
            ))}
          </div>
        </Section>
      ) : null}

      <EngagementSteps />

      <AuthorCard />

      {page.faqs.length ? (
        <Section labelledBy="faq-h">
          <Eyebrow>FAQ</Eyebrow>
          <H2 id="faq-h">Common questions</H2>
          <div className="mt-8">
            <FaqList faqs={page.faqs} />
          </div>
        </Section>
      ) : null}

      {articles.length ? (
        <Section labelledBy="articles-h">
          <Eyebrow>From the blog</Eyebrow>
          <H2 id="articles-h">Related articles</H2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((p) => (
              <PostCard key={p.slug} post={p} />
            ))}
          </div>
        </Section>
      ) : null}

      {related.length ? (
        <Section labelledBy="related-h">
          <Eyebrow>Keep exploring</Eyebrow>
          <H2 id="related-h">Related services</H2>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {related.map((p) => (
              <PageCard key={p.slug} page={p} />
            ))}
          </div>
        </Section>
      ) : null}

      <HireCta service={page.serviceType} />
    </>
  );
}
