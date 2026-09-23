import Link from "next/link";
import { ImageIcon } from "lucide-react";
import type { CaseStudy } from "@/types/content";
import { pagesFeaturingProject, resolvePages } from "@/lib/content";
import { breadcrumbList, graph, person, webPageJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Eyebrow, H2, Section } from "@/components/ui/Section";
import { TechBadge } from "@/components/ui/TechBadge";
import { PageCard } from "@/components/cards/PageCard";
import { ArchitectureDiagram } from "@/components/landing/ArchitectureDiagram";
import { HireCta } from "@/components/landing/HireCta";
import { PointGrid } from "@/components/landing/PointGrid";
import { StackGrid } from "@/components/landing/StackGrid";

function Prose({ paras }: { paras: string[] }) {
  return (
    <div className="mt-5 max-w-[72ch] space-y-4 text-[15.5px] leading-[1.75] text-[#c3cbdd]">
      {paras.map((p) => (
        <p key={p.slice(0, 40)}>{p}</p>
      ))}
    </div>
  );
}

function Block({
  id,
  eyebrow,
  heading,
  children,
}: {
  id: string;
  eyebrow: string;
  heading: string;
  children: React.ReactNode;
}) {
  return (
    <Section id={id} labelledBy={`${id}-h`} className="scroll-mt-28">
      <Eyebrow>{eyebrow}</Eyebrow>
      <H2 id={`${id}-h`}>{heading}</H2>
      {children}
    </Section>
  );
}

export function CaseStudyTemplate({ project }: { project: CaseStudy }) {
  const path = `/projects/${project.slug}`;
  const trail = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
    { name: project.title, path },
  ];
  // Explicit related pages first, then any page that lists this project.
  const relatedPages = resolvePages([
    ...new Set([
      ...project.relatedPages,
      ...pagesFeaturingProject(project.slug).map((p) => p.slug),
    ]),
  ]).slice(0, 8);

  return (
    <>
      <JsonLd
        data={graph(
          webPageJsonLd({ path, name: project.metaTitle, description: project.metaDescription }),
          person,
          breadcrumbList(trail),
        )}
      />

      <header className="relative overflow-hidden border-b border-[var(--line)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-64 right-[5%] size-[34rem] rounded-full bg-[radial-gradient(circle,rgba(139,92,246,0.2),transparent_65%)] blur-2xl"
        />
        <div className="relative mx-auto max-w-[1240px] px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
          <Breadcrumbs trail={trail} />
          <div className="rv mt-8 max-w-[860px]">
            <Eyebrow>{project.category}</Eyebrow>
            <h1 className="text-[34px] leading-[1.06] text-balance sm:text-[52px] lg:text-[60px]">
              {project.title}
            </h1>
            <p className="mt-5 max-w-[62ch] text-[16px] leading-[1.65] text-[#cfd7ea] sm:text-[18px]">
              {project.tagline}
            </p>
            <ul className="mt-6 flex flex-wrap gap-1.5" aria-label="Technologies">
              {project.stack.map((t) => (
                <li key={t}>
                  <TechBadge>{t}</TechBadge>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </header>

      <Block id="problem" eyebrow="01 — Problem" heading="The problem">
        <Prose paras={project.problem} />
      </Block>

      <Block id="overview" eyebrow="02 — Overview" heading="Project overview">
        <Prose paras={project.overview} />
      </Block>

      <Block id="requirements" eyebrow="03 — Requirements" heading="Requirements">
        <ul className="mt-6 grid max-w-[900px] gap-2 sm:grid-cols-2">
          {project.requirements.map((r) => (
            <li
              key={r}
              className="rounded-[var(--r)] border border-[var(--line)] bg-[var(--glass)] px-4 py-3 text-[14px] leading-[1.6] text-[#c3cbdd]"
            >
              {r}
            </li>
          ))}
        </ul>
      </Block>

      <Block id="challenges" eyebrow="04 — Challenges" heading="Engineering challenges">
        <div className="mt-7">
          <PointGrid points={project.challenges} />
        </div>
      </Block>

      <Block id="architecture" eyebrow="05 — Architecture" heading="Architecture">
        <div className="mt-7">
          <ArchitectureDiagram
            title="System flow"
            caption={project.architecture.caption}
            steps={project.architecture.steps}
          />
        </div>
        <ul className="mt-6 max-w-[72ch] list-disc space-y-2 pl-5 text-[15px] leading-[1.7] text-[#c3cbdd] marker:text-[var(--blue)]">
          {project.architecture.notes.map((n) => (
            <li key={n}>{n}</li>
          ))}
        </ul>
      </Block>

      <Block id="stack" eyebrow="06 — Stack" heading="Technology stack">
        <div className="mt-7">
          <StackGrid stack={project.stackDetail} />
        </div>
      </Block>

      <Block id="implementation" eyebrow="07 — Implementation" heading="Implementation">
        <div className="mt-7">
          <PointGrid points={project.implementation} />
        </div>
      </Block>

      <Block id="decisions" eyebrow="08 — Decisions" heading="Key engineering decisions">
        <div className="mt-7">
          <PointGrid points={project.decisions} />
        </div>
      </Block>

      <Block id="performance" eyebrow="09 — Scale" heading="Performance and scalability">
        <div className="mt-7">
          <PointGrid points={project.performance} />
        </div>
      </Block>

      <Block id="screens" eyebrow="10 — Screens" heading="Screens">
        {/* Placeholders until real screenshots are added via next/image. */}
        <ul className="mt-7 grid gap-4 sm:grid-cols-3">
          {project.screenshots.map((s) => (
            <li
              key={s}
              className="flex aspect-[4/3] flex-col items-center justify-center gap-3 rounded-[var(--r-lg)] border border-dashed border-[var(--line2)] bg-[var(--bg2)] p-5 text-center text-[13px] leading-[1.55] text-[var(--faint)]"
            >
              <ImageIcon aria-hidden="true" className="size-5" />
              {s}
            </li>
          ))}
        </ul>
      </Block>

      {project.results.length ? (
        <Block id="results" eyebrow="11 — Results" heading="Results">
          <ul className="mt-6 max-w-[72ch] list-disc space-y-2 pl-5 text-[15px] leading-[1.7] text-[#c3cbdd]">
            {project.results.map((r) => (
              <li key={r}>{r}</li>
            ))}
          </ul>
        </Block>
      ) : null}

      <Block id="takeaways" eyebrow="Lessons" heading="Technical takeaways">
        <ul className="mt-6 max-w-[72ch] list-disc space-y-2 pl-5 text-[15px] leading-[1.7] text-[#c3cbdd] marker:text-[var(--cyan)]">
          {project.takeaways.map((t) => (
            <li key={t}>{t}</li>
          ))}
        </ul>
      </Block>

      {relatedPages.length ? (
        <Block id="related" eyebrow="Related" heading="Related services">
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {relatedPages.map((p) => (
              <PageCard key={p.slug} page={p} />
            ))}
          </div>
          <p className="mt-6 text-[14px] text-[var(--dim)]">
            More builds: <Link href="/projects">all case studies</Link>.
          </p>
        </Block>
      ) : null}

      <HireCta
        title="Need something similar built?"
        text="If this case study is close to what you need, tell me about your version: users, data and deadlines."
      />
    </>
  );
}
