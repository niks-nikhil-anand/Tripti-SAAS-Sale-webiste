import fs from "node:fs";
import path from "node:path";
import { cache } from "react";

/**
 * Blog posts are Markdown files in content/blog/<slug>.md. Adding a post means
 * adding a file: routes, the sitemap, category pages, related-article links on
 * service pages and case studies all pick it up at build time.
 *
 * The parser supports a deliberate subset (## / ### headings, paragraphs,
 * lists, quotes, fenced code, inline links/code/bold) so there is no Markdown
 * dependency and the output is predictable semantic HTML.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id: string }
  | { type: "h3"; text: string; id: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string }
  | { type: "code"; lang: string; code: string };

export type CategorySlug =
  | "react"
  | "nextjs"
  | "nodejs"
  | "ai"
  | "rag"
  | "saas"
  | "system-design";

export type Post = {
  slug: string;
  title: string;
  description: string;
  category: CategorySlug;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  /** landing page slugs this post supports */
  services: string[];
  /** case study slugs */
  projects: string[];
  /** other post slugs */
  related: string[];
  featured: boolean;
  wordCount: number;
  readingMinutes: number;
  body: Block[];
};

export type Category = {
  slug: CategorySlug;
  name: string;
  title: string;
  description: string;
  intro: string;
  /** the service pages this cluster feeds */
  services: string[];
};

export const categories: Category[] = [
  {
    slug: "react",
    name: "React",
    title: "React Articles – Performance, State and Architecture",
    description:
      "Practical React guides on performance, Server Components, state management and building production dashboards, written from real project work.",
    intro:
      "Guides on building React applications that stay fast and maintainable as they grow: rendering performance, component architecture, state and data fetching.",
    services: ["react-developer", "frontend-developer", "typescript-developer"],
  },
  {
    slug: "nextjs",
    name: "Next.js",
    title: "Next.js Articles – App Router, SEO and Deployment",
    description:
      "Next.js guides covering App Router architecture, Server and Client Components, SEO best practices and Docker deployment for production apps.",
    intro:
      "How to structure, render, optimise and ship Next.js applications on the App Router, from metadata and caching to containerised deploys.",
    services: ["nextjs-developer", "full-stack-developer", "web-application-development"],
  },
  {
    slug: "nodejs",
    name: "Node.js",
    title: "Node.js Articles – APIs, Performance and Redis",
    description:
      "Node.js engineering guides on API architecture, performance optimisation, Redis caching, queues and rate limiting for production backends.",
    intro:
      "Backend engineering with Node.js: API structure, performance under load, caching and background work.",
    services: ["nodejs-developer", "backend-developer", "api-development"],
  },
  {
    slug: "ai",
    name: "AI & LLMs",
    title: "AI Engineering Articles – LLMs, Agents and Streaming",
    description:
      "AI engineering articles on LLM streaming, building AI agents and reducing LLM latency, based on production AI products rather than demos.",
    intro:
      "Engineering notes on putting LLMs into real products: streaming, agents and tool calling, latency and cost.",
    services: ["ai-developer", "llm-developer", "ai-agent-development"],
  },
  {
    slug: "rag",
    name: "RAG",
    title: "RAG Articles – Architecture, Vector Search and Retrieval",
    description:
      "Retrieval-augmented generation explained: RAG architecture, how vector search works, RAG vs fine-tuning and building a Chat with PDF app.",
    intro:
      "Retrieval-augmented generation from first principles to production: chunking, embeddings, vector search, citations and evaluation.",
    services: ["rag-developer", "rag-application-development", "ai-chatbot-development"],
  },
  {
    slug: "saas",
    name: "SaaS",
    title: "SaaS Engineering Articles – Architecture and AI SaaS",
    description:
      "Articles on building SaaS products: Next.js SaaS architecture, multi-tenancy, billing-ready design and AI SaaS architecture patterns.",
    intro:
      "Architecture and delivery for SaaS products, from the first MVP to AI-powered features.",
    services: ["saas-development", "mvp-development", "full-stack-developer"],
  },
  {
    slug: "system-design",
    name: "System Design",
    title: "System Design Articles – Cloud and Deployment Architecture",
    description:
      "System design and cloud architecture articles covering AWS deployment architecture for SaaS, containers, CI/CD and scaling decisions.",
    intro:
      "How the pieces fit together in production: infrastructure, deployment pipelines and scaling decisions.",
    services: ["aws-developer", "backend-developer", "saas-development"],
  },
];

const CONTENT_DIR = path.join(process.cwd(), "content", "blog");

/* ------------------------------------------------------------------------ */
/* Parsing                                                                  */
/* ------------------------------------------------------------------------ */

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/[`*[\]()]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");

function parseFrontmatter(src: string) {
  const match = /^---\r?\n([\s\S]*?)\r?\n---\r?\n?/.exec(src);
  if (!match) throw new Error("Missing frontmatter");
  const data: Record<string, string | string[] | boolean> = {};
  for (const line of match[1].split(/\r?\n/)) {
    const i = line.indexOf(":");
    if (i === -1) continue;
    const key = line.slice(0, i).trim();
    const raw = line.slice(i + 1).trim();
    if (raw.startsWith("[") && raw.endsWith("]")) {
      data[key] = raw
        .slice(1, -1)
        .split(",")
        .map((v) => v.trim())
        .filter(Boolean);
    } else if (raw === "true" || raw === "false") {
      data[key] = raw === "true";
    } else {
      data[key] = raw.replace(/^["']|["']$/g, "");
    }
  }
  return { data, body: src.slice(match[0].length) };
}

function parseBody(md: string): Block[] {
  const lines = md.replace(/\r\n/g, "\n").split("\n");
  const blocks: Block[] = [];
  const ids = new Map<string, number>();
  const uniqueId = (text: string) => {
    const base = slugify(text) || "section";
    const n = ids.get(base) ?? 0;
    ids.set(base, n + 1);
    return n ? `${base}-${n + 1}` : base;
  };

  let i = 0;
  while (i < lines.length) {
    const line = lines[i];
    if (!line.trim()) {
      i++;
      continue;
    }
    if (line.startsWith("```")) {
      const lang = line.slice(3).trim() || "text";
      const code: string[] = [];
      i++;
      while (i < lines.length && !lines[i].startsWith("```")) code.push(lines[i++]);
      i++; // closing fence
      blocks.push({ type: "code", lang, code: code.join("\n") });
      continue;
    }
    if (line.startsWith("### ")) {
      const text = line.slice(4).trim();
      blocks.push({ type: "h3", text, id: uniqueId(text) });
      i++;
      continue;
    }
    if (line.startsWith("## ")) {
      const text = line.slice(3).trim();
      blocks.push({ type: "h2", text, id: uniqueId(text) });
      i++;
      continue;
    }
    if (/^[-*] /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^[-*] /.test(lines[i])) items.push(lines[i++].slice(2).trim());
      blocks.push({ type: "ul", items });
      continue;
    }
    if (/^\d+\. /.test(line)) {
      const items: string[] = [];
      while (i < lines.length && /^\d+\. /.test(lines[i]))
        items.push(lines[i++].replace(/^\d+\. /, "").trim());
      blocks.push({ type: "ol", items });
      continue;
    }
    if (line.startsWith(">")) {
      const parts: string[] = [];
      while (i < lines.length && lines[i].startsWith(">"))
        parts.push(lines[i++].replace(/^>\s?/, ""));
      blocks.push({ type: "quote", text: parts.join(" ").trim() });
      continue;
    }
    // Paragraph: consecutive non-special lines join into one.
    const parts: string[] = [];
    while (
      i < lines.length &&
      lines[i].trim() &&
      !/^(#{2,3} |```|[-*] |\d+\. |>)/.test(lines[i])
    )
      parts.push(lines[i++].trim());
    blocks.push({ type: "p", text: parts.join(" ") });
  }
  return blocks;
}

const asArray = (v: unknown) => (Array.isArray(v) ? v : []);

function loadPost(file: string): Post {
  const slug = file.replace(/\.md$/, "");
  const src = fs.readFileSync(path.join(CONTENT_DIR, file), "utf8");
  const { data, body } = parseFrontmatter(src);
  const blocks = parseBody(body);
  const wordCount = body
    .replace(/```[\s\S]*?```/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  const category = String(data.category) as CategorySlug;
  if (!categories.some((c) => c.slug === category))
    throw new Error(`${file}: unknown category "${category}"`);
  return {
    slug,
    title: String(data.title),
    description: String(data.description),
    category,
    tags: asArray(data.tags),
    publishedAt: String(data.publishedAt),
    updatedAt: data.updatedAt ? String(data.updatedAt) : undefined,
    services: asArray(data.services),
    projects: asArray(data.projects),
    related: asArray(data.related),
    featured: data.featured === true,
    wordCount,
    readingMinutes: Math.max(1, Math.round(wordCount / 220)),
    body: blocks,
  };
}

/* ------------------------------------------------------------------------ */
/* Queries                                                                  */
/* ------------------------------------------------------------------------ */

export const getAllPosts = cache((): Post[] => {
  if (!fs.existsSync(CONTENT_DIR)) return [];
  return fs
    .readdirSync(CONTENT_DIR)
    .filter((f) => f.endsWith(".md"))
    .map(loadPost)
    .sort(
      (a, b) =>
        b.publishedAt.localeCompare(a.publishedAt) || a.title.localeCompare(b.title),
    );
});

export const getPost = (slug: string) => getAllPosts().find((p) => p.slug === slug);

export const getCategory = (slug: string) => categories.find((c) => c.slug === slug);

export const getPostsByCategory = (slug: string) =>
  getAllPosts().filter((p) => p.category === slug);

/** Categories that have at least one post (empty hubs are thin content). */
export const getActiveCategories = () =>
  categories.filter((c) => getPostsByCategory(c.slug).length > 0);

/** Explicit `related` first, then same-category posts, then shared tags. */
export function getRelatedPosts(post: Post, limit = 3): Post[] {
  const all = getAllPosts().filter((p) => p.slug !== post.slug);
  const picked = new Map<string, Post>();
  for (const s of post.related) {
    const p = all.find((x) => x.slug === s);
    if (p) picked.set(p.slug, p);
  }
  const score = (p: Post) =>
    (p.category === post.category ? 2 : 0) + p.tags.filter((t) => post.tags.includes(t)).length;
  for (const p of [...all].sort((a, b) => score(b) - score(a))) {
    if (picked.size >= limit) break;
    picked.set(p.slug, p);
  }
  return [...picked.values()].slice(0, limit);
}

/** Posts that support a given landing page (via frontmatter `services`). */
export const getPostsForService = (slug: string, limit = 4) =>
  getAllPosts()
    .filter((p) => p.services.includes(slug))
    .slice(0, limit);

/** Posts that reference a case study. */
export const getPostsForProject = (slug: string, limit = 3) =>
  getAllPosts()
    .filter((p) => p.projects.includes(slug))
    .slice(0, limit);

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
