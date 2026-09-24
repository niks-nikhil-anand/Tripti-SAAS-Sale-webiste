import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { projects } from "@/lib/content";
import { ProjectCard } from "@/components/cards/ProjectCard";

/** Homepage "Selected projects": the real case studies, nothing invented. */
export function FeaturedProjects() {
  return (
    <section
      id="projects"
      aria-labelledby="projects-h"
      className="mx-auto max-w-[1240px] scroll-mt-28 px-4 pt-16 sm:px-6 sm:pt-24 lg:pt-28"
    >
      <p className="mb-4 font-[family-name:var(--m)] text-[10.5px] uppercase tracking-[0.22em] text-[var(--blue)]">
        Selected projects
      </p>
      <div className="mb-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <h2
          id="projects-h"
          className="max-w-[20ch] text-[30px] leading-[1.08] sm:text-[42px] lg:text-[52px]"
        >
          Production builds, written up in detail.
        </h2>
        <Link
          href="/projects"
          className="inline-flex shrink-0 items-center gap-1.5 text-[14px] font-semibold"
        >
          All case studies <ArrowRight aria-hidden="true" className="size-4" />
        </Link>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {projects.map((p) => (
          <ProjectCard key={p.slug} project={p} />
        ))}
      </div>
    </section>
  );
}
