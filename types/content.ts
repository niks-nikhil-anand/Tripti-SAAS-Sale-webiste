/**
 * Content contracts. Every landing page and case study is plain data shaped by
 * these types; the templates in components/landing and components/projects
 * render them. Adding a page = adding one object, nothing else.
 */

export type PageGroup = "developer" | "solution" | "location";

/** Keys resolved to lucide icons in components/ui/PageIcon.tsx. */
export type IconName =
  | "atom"
  | "triangle"
  | "server"
  | "layers"
  | "layout"
  | "database"
  | "file-code"
  | "braces"
  | "terminal"
  | "brain"
  | "sparkles"
  | "message-square"
  | "search"
  | "cloud"
  | "rocket"
  | "zap"
  | "globe"
  | "plug"
  | "bot"
  | "user-round"
  | "workflow"
  | "map-pin";

export type ProjectSlug =
  | "ai-avatar"
  | "blog-automation"
  | "chat-with-pdf"
  | "vercel-clone"
  | "resume-analyzer";

export type Point = { title: string; text: string };

export type Faq = { q: string; a: string };

export type ContentSection = {
  /** kebab-case anchor, unique within the page */
  id: string;
  heading: string;
  /** 1–3 paragraphs. Plain text; may reference other pages by name. */
  body: string[];
  /** optional 3–6 cards rendered under the paragraphs */
  points?: Point[];
  /** optional inline contextual links rendered as "Related:" chips */
  links?: { label: string; href: string }[];
};

export type LandingPage = {
  slug: string;
  group: PageGroup;
  /** Short card title on the homepage, e.g. "Next.js Developer" */
  navLabel: string;
  /** 1–2 sentence blurb shown on the homepage card (≤ 150 chars) */
  cardBlurb: string;
  icon: IconName;
  /** ≤ 60 chars, unique */
  metaTitle: string;
  /** 140–160 chars, unique */
  metaDescription: string;
  eyebrow: string;
  h1: string;
  /** hero lede, 1–2 sentences */
  intro: string;
  /** 3–4 short hero chips */
  highlights: string[];
  /** optional flow diagram, 4–8 steps rendered with arrows */
  diagram?: { title: string; caption: string; steps: string[] };
  /** 5–8 sections, each answering a real buyer/searcher question */
  sections: ContentSection[];
  stack: { group: string; items: string[] }[];
  /** 2–4 relevant case studies */
  projects: ProjectSlug[];
  /** 3–5 slugs of other landing pages */
  related: string[];
  /** 4–6 FAQs, visible on page */
  faqs: Faq[];
  /** Service schema name, e.g. "Next.js development" */
  serviceType: string;
  /** location pages only */
  location?: { city: string; region: string; country: string };
};

export type CaseStudy = {
  slug: ProjectSlug;
  title: string;
  /** ≤ 60 chars */
  metaTitle: string;
  /** 140–160 chars */
  metaDescription: string;
  category: string;
  tagline: string;
  /** card blurb ≤ 150 chars */
  summary: string;
  stack: string[];
  problem: string[];
  overview: string[];
  requirements: string[];
  challenges: Point[];
  architecture: { caption: string; steps: string[]; notes: string[] };
  stackDetail: { group: string; items: string[] }[];
  implementation: Point[];
  decisions: Point[];
  performance: Point[];
  /** Descriptions of screenshots to be added later */
  screenshots: string[];
  /** Only verified outcomes. Leave empty when none are known. */
  results: string[];
  takeaways: string[];
  /** landing page slugs */
  relatedPages: string[];
};
