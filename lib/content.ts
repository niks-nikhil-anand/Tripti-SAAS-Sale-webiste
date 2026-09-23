import type { CaseStudy, LandingPage, PageGroup } from "@/types/content";
import { developerCorePages } from "@/content/pages/developer-core";
import { developerAiPages } from "@/content/pages/developer-ai";
import { solutionPages } from "@/content/pages/solutions";
import { locationPages } from "@/content/pages/locations";
import { caseStudies } from "@/content/projects";

/**
 * Registry for every data-driven route. The dynamic `app/[slug]` route, the
 * homepage directory and the sitemap all read from here, so a new page only
 * needs a new entry in one of the content files.
 */
export const landingPages: LandingPage[] = [
  ...developerCorePages,
  ...developerAiPages,
  ...solutionPages,
  ...locationPages,
];

const pageBySlug = new Map(landingPages.map((p) => [p.slug, p]));
const projectBySlug = new Map(caseStudies.map((p) => [p.slug, p]));

export const getLandingPage = (slug: string) => pageBySlug.get(slug);

export const getPagesByGroup = (group: PageGroup) =>
  landingPages.filter((p) => p.group === group);

/** Resolves slugs to pages, silently dropping any that do not exist. */
export const resolvePages = (slugs: string[]) =>
  slugs.map((s) => pageBySlug.get(s)).filter((p): p is LandingPage => !!p);

export const projects = caseStudies;

export const getProject = (slug: string) =>
  projectBySlug.get(slug as CaseStudy["slug"]);

export const resolveProjects = (slugs: string[]) =>
  slugs
    .map((s) => projectBySlug.get(s as CaseStudy["slug"]))
    .filter((p): p is CaseStudy => !!p);

/** Landing pages that list this project — the reverse of `page.projects`. */
export const pagesFeaturingProject = (slug: CaseStudy["slug"]) =>
  landingPages.filter((p) => p.projects.includes(slug));

export const groupMeta: Record<
  PageGroup,
  { label: string; eyebrow: string; description: string }
> = {
  developer: {
    label: "Hire by expertise",
    eyebrow: "Developer",
    description:
      "Looking for a specific skill set? Each page covers how I work in that stack, the architecture choices involved and the projects that prove it.",
  },
  solution: {
    label: "Build a solution",
    eyebrow: "Solutions",
    description:
      "Have an outcome in mind rather than a technology? These pages cover scope, delivery phases and the decisions you will need to make.",
  },
  location: {
    label: "Bangalore",
    eyebrow: "Local",
    description:
      "Based in Bangalore and working in IST, with overlap for US, EU and APAC teams. In-person kickoffs are possible for local teams.",
  },
};
