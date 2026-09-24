import type { PageGroup } from "@/types/content";
import { getPagesByGroup, groupMeta, projects } from "@/lib/content";
import { PageCard } from "@/components/cards/PageCard";
import { ProjectCard } from "@/components/cards/ProjectCard";

const groups: PageGroup[] = ["developer", "solution", "location"];

/**
 * Homepage hub: every landing page and case study as a card, grouped by search
 * intent. This is also the main crawl path into the landing pages, so the
 * cards are plain links rendered on the server.
 */
export function PageDirectory({ showProjects = true }: { showProjects?: boolean }) {
  return (
    <section
      id="explore"
      aria-labelledby="explore-h"
      className="mx-auto max-w-[1240px] scroll-mt-28 px-4 pt-16 sm:px-6 sm:pt-24 lg:pt-28"
    >
      <p className="mb-4 font-[family-name:var(--m)] text-[10.5px] uppercase tracking-[0.22em] text-[var(--blue)]">
        Explore
      </p>
      <h2
        id="explore-h"
        className="mb-5 max-w-[22ch] text-[30px] leading-[1.08] sm:text-[42px] lg:text-[52px]"
      >
        Find the work that fits your project.
      </h2>
      <p className="mb-12 max-w-[64ch] text-[15.5px] leading-[1.65] text-[var(--dim)]">
        Browse by the skill you are hiring for, the product you want built, or the
        case studies behind them.
      </p>

      <div className="space-y-14">
        {groups.map((g) => {
          const pages = getPagesByGroup(g);
          if (!pages.length) return null;
          const meta = groupMeta[g];
          return (
            <div key={g} id={`group-${g}`} aria-labelledby={`explore-${g}`} role="group" className="scroll-mt-28">
              <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
                <h3 id={`explore-${g}`} className="text-[22px] sm:text-[26px]">
                  {meta.label}
                  <span className="ml-3 font-[family-name:var(--m)] text-[12px] font-normal text-[var(--faint)]">
                    {String(pages.length).padStart(2, "0")}
                  </span>
                </h3>
                <p className="max-w-[56ch] text-[13.5px] leading-[1.6] text-[var(--dim)]">
                  {meta.description}
                </p>
              </div>
              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                {pages.map((p) => (
                  <PageCard key={p.slug} page={p} />
                ))}
              </div>
            </div>
          );
        })}

        {showProjects && projects.length ? (
          <div aria-labelledby="explore-projects" role="group">
            <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
              <h3 id="explore-projects" className="text-[22px] sm:text-[26px]">
                Case studies
                <span className="ml-3 font-[family-name:var(--m)] text-[12px] font-normal text-[var(--faint)]">
                  {String(projects.length).padStart(2, "0")}
                </span>
              </h3>
              <p className="max-w-[56ch] text-[13.5px] leading-[1.6] text-[var(--dim)]">
                Production builds, with architecture, decisions and trade-offs written up.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {projects.map((p) => (
                <ProjectCard key={p.slug} project={p} />
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
