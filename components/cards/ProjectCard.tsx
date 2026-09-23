import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { CaseStudy } from "@/types/content";
import { TechBadge } from "@/components/ui/TechBadge";

export function ProjectCard({ project }: { project: CaseStudy }) {
  return (
    <article className="group relative flex flex-col overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--bg2)] transition-[border-color,transform] duration-300 hover:-translate-y-0.5 hover:border-[rgba(77,124,255,0.5)] focus-within:border-[rgba(77,124,255,0.6)]">
      <div
        aria-hidden="true"
        className="relative h-28 border-b border-[var(--line)] bg-[radial-gradient(120%_120%_at_0%_0%,rgba(77,124,255,0.28),transparent_55%),radial-gradient(120%_120%_at_100%_100%,rgba(139,92,246,0.22),transparent_55%)]"
      >
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:22px_22px] [mask-image:linear-gradient(to_bottom,#000,transparent)]" />
        <span className="absolute bottom-3 left-5 font-[family-name:var(--m)] text-[10.5px] uppercase tracking-[0.2em] text-[#9db4ff]">
          {project.category}
        </span>
      </div>
      <div className="flex flex-1 flex-col gap-3 p-5">
        <h3 className="text-[19px] font-semibold">
          <Link
            href={`/projects/${project.slug}`}
            className="text-[var(--ink)] after:absolute after:inset-0 after:content-[''] hover:text-white focus-visible:outline-none"
          >
            {project.title}
          </Link>
        </h3>
        <p className="flex-1 text-[13.5px] leading-[1.6] text-[var(--dim)]">
          {project.summary}
        </p>
        <ul className="flex flex-wrap gap-1.5" aria-label="Technologies">
          {project.stack.slice(0, 5).map((t) => (
            <li key={t}>
              <TechBadge>{t}</TechBadge>
            </li>
          ))}
        </ul>
        <span className="mt-1 inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#a9c0ff] transition-[gap] group-hover:gap-2.5">
          Read case study <ArrowRight aria-hidden="true" className="size-3.5" />
        </span>
      </div>
    </article>
  );
}
