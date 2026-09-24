/**
 * Single source of truth for Tripti Shakya Developer Portfolio / Agency Site.
 */

export const siteConfig = {
  name: "TRIPTI SHAKYA",
  legalName: "Tripti Shakya",
  title: "Tripti Shakya – Full Stack & AI Developer in Bangalore",
  tagline: "I Build Digital Products That Think, Scale & Perform.",
  description:
    "Full Stack & AI Developer building production-ready SaaS, web applications and AI products with React, Next.js, Node.js, Python, LLMs and RAG.",
  shortDescription:
    "Full-stack developer specializing in React, Next.js, Python & AI.",
  url: process.env.NEXT_PUBLIC_SITE_URL || "https://triptishakya.dev",
  domain: "triptishakya.dev",
  keywords: [
    "Full-Stack Developer",
    "React Developer",
    "Next.js Developer",
    "Python Developer",
    "AI Developer",
    "LLM Integration",
    "RAG Systems",
    "Bengaluru Developer",
    "TypeScript Developer",
  ],
  locale: "en_US",
  email: "triptishakya2002@gmail.com",
  phone: "+91 62014 14631",
  location: "Bengaluru, India (IST)",
  whatsappNumber: "916201414631",
  founded: "2022",
  social: {
    linkedin: "https://www.linkedin.com/in/tripti-shakya-602097281/",
    github: "https://github.com/triptishakya-dev",
  },
} as const;

export const heroStack = [
  "React",
  "Next.js",
  "TypeScript",
  "Python",
  "FastAPI",
  "Node.js",
  "PostgreSQL",
  "LLMs",
  "RAG",
  "AI Agents",
] as const;

export const marqueeItems = [
  "React 19",
  "Next.js App Router",
  "TypeScript",
  "Python",
  "FastAPI",
  "Node.js",
  "PostgreSQL",
  "LLM APIs",
  "RAG Pipelines",
  "AI Agents",
  "Tailwind CSS",
  "TanStack Query",
  "Vector Search",
  "Redis",
  "Docker",
  "Vercel",
  "AWS",
  "Zod",
  "GraphQL",
  "WebSockets",
] as const;

export const aiCapabilities = [
  "LLM Integration",
  "RAG Systems",
  "AI Agents",
  "AI Chatbots",
  "Speech AI",
  "Automation",
  "Vector Search",
  "Model APIs",
] as const;

export type ServiceItem = {
  id: string;
  num: string;
  name: string;
  blurb: string;
  tags: string[];
  icon: string;
  cta: string;
  href: string;
};

export const services: ServiceItem[] = [
  {
    id: "react",
    num: "01",
    name: "React Development",
    blurb:
      "React 19, Server Components, performance audits, state architecture, component libraries and responsive UIs built for scale.",
    tags: ["React 19", "TypeScript", "TanStack"],
    icon: "⚛️",
    cta: "Explore React Service",
    href: "/react-developer",
  },
  {
    id: "nextjs",
    num: "02",
    name: "Next.js Development",
    blurb:
      "App Router architectures, SSR/SSG optimization, edge functions, Web Vitals performance tuning, and Vercel deployments.",
    tags: ["Next.js 16", "App Router", "SSR"],
    icon: "▲",
    cta: "Explore Next.js Project",
    href: "/nextjs-developer",
  },
  {
    id: "python",
    num: "03",
    name: "Python Development",
    blurb:
      "FastAPI and Django web services, asynchronous background tasks, data pipelines, script automation, and RESTful APIs.",
    tags: ["Python", "FastAPI", "Django"],
    icon: "🐍",
    cta: "Explore Python Project",
    href: "/python-developer",
  },
  {
    id: "ai",
    num: "04",
    name: "AI Development",
    blurb:
      "LLM integration, Retrieval-Augmented Generation (RAG), vector database search, tool-calling agents, and prompt evaluations.",
    tags: ["LLMs", "RAG", "AI Agents"],
    icon: "✨",
    cta: "Explore AI Project",
    href: "/ai-developer",
  },
  {
    id: "fullstack",
    num: "05",
    name: "Full Stack Development",
    blurb:
      "End-to-end web product engineering from relational database schemas and API endpoints to high-performance frontend interfaces.",
    tags: ["React", "Node", "Postgres"],
    icon: "⚡",
    cta: "Start Full-Stack Build",
    href: "/full-stack-developer",
  },
  {
    id: "nodejs",
    num: "06",
    name: "Node.js Development",
    blurb:
      "Express & NestJS microservices, real-time WebSocket applications, event queues, rate-limited APIs, and backend tooling.",
    tags: ["Node.js", "Express", "WebSockets"],
    icon: "🟢",
    cta: "Explore Node Project",
    href: "/nodejs-developer",
  },
  {
    id: "typescript",
    num: "07",
    name: "TypeScript Development",
    blurb:
      "Strict typing across full stack boundaries, shared type definitions, API schema validation with Zod, and JS-to-TS refactoring.",
    tags: ["TypeScript", "Zod", "Type Safety"],
    icon: "📘",
    cta: "Explore TS Refactor",
    href: "/typescript-developer",
  },
  {
    id: "automation",
    num: "08",
    name: "AI Automation",
    blurb:
      "Autonomous workflow automations, web scrapers, data processing pipelines, webhooks, and scheduled cron execution.",
    tags: ["Automation", "Pipelines", "Cron"],
    icon: "🔄",
    cta: "Explore Automation",
    href: "/automation-development",
  },
  {
    id: "chatbot",
    num: "09",
    name: "AI Chatbot Development",
    blurb:
      "Custom conversational agents with streaming responses, memory management, tool execution, and domain-specific knowledge bases.",
    tags: ["Chatbots", "Streaming", "Tool Calling"],
    icon: "💬",
    cta: "Explore AI Chatbot",
    href: "/ai-chatbot-development",
  },
  {
    id: "backend",
    num: "10",
    name: "Backend & API Development",
    blurb:
      "PostgreSQL & Redis database design, authentication systems, API security, caching layers, and high-concurrency architectures.",
    tags: ["PostgreSQL", "Redis", "REST"],
    icon: "🛠️",
    cta: "Explore Backend API",
    href: "/api-development",
  },
];

export const projects = [
  {
    industry: "SaaS Analytics",
    title: "High-Throughput Product Analytics Dashboard",
    problem:
      "Legacy dashboard suffered from slow query rendering (40s+) and failed under concurrent user reporting traffic.",
    solution:
      "Rebuilt the frontend with React 19 virtualized data tables, TanStack Query server caching, and Next.js route handler streaming.",
    stack: ["React 19", "Next.js", "TypeScript", "Tailwind CSS", "Chart.js"],
    result:
      "Dashboard load time reduced by 64% with instant sub-second filtered data view updates across 50,000+ events.",
    rowClass: "proj-row-1",
  },
  {
    industry: "AI Knowledge Base",
    title: "Enterprise Document RAG & Neural Search Platform",
    problem:
      "Internal knowledge search was fragmented across PDFs and docs, requiring manual team search taking up to 15 mins per query.",
    solution:
      "Engineered a Python/FastAPI RAG pipeline with Qdrant vector embeddings, hybrid semantic retrieval, and streaming LLM responses.",
    stack: ["Python", "FastAPI", "OpenAI API", "Qdrant", "React"],
    result:
      "Cut document lookup time from 15 minutes down to 2.4 seconds with verified source citation links.",
    rowClass: "proj-row-2",
  },
  {
    industry: "FinTech Platform",
    title: "Real-time Customer Portal & Audit System",
    problem:
      "Client needed a secure, role-based customer portal with strict audit logging and real-time transaction status streams.",
    solution:
      "Built a typed React application with WebSocket connection fallback, Zod schema validation, and PostgreSQL audit tables.",
    stack: ["TypeScript", "Node.js", "PostgreSQL", "React", "WebSockets"],
    result:
      "Zero silent data validation failures, 99.99% socket uptime, and full compliance audit approval.",
    rowClass: "proj-row-3",
  },
];

export const whyHireMeReasons = [
  {
    n: "01",
    t: "Direct Engagement",
    b: "You work with the engineer writing your code, from scoping to deploy. No account managers, hand-offs or layers between your questions and the answers.",
  },
  {
    n: "02",
    t: "Production Quality",
    b: "Strict TypeScript, structured state boundaries, comprehensive unit & integration testing, and WCAG accessibility built-in.",
  },
  {
    n: "03",
    t: "Measured, Not Claimed",
    b: "Performance work starts with a baseline and ends with the same measurement, so you see what changed. Core Web Vitals, API latency and LLM cost are tracked, not guessed.",
  },
  {
    n: "04",
    t: "Transparent Cadence",
    b: "Regular written updates, working preview deploys, reviewable pull requests and agreed overlap hours with your team.",
  },
];

export const processTimeline = [
  {
    n: "01",
    title: "Discovery",
    body: "Clarify technical requirements, business goals, target metrics, and system scope.",
  },
  {
    n: "02",
    title: "Architecture",
    body: "Draft system blueprint, database schema, API boundaries, and UI wireframes.",
  },
  {
    n: "03",
    title: "Development",
    body: "Ship production-ready code in rapid iterative sprints with continuous preview deploys.",
  },
  {
    n: "04",
    title: "QA & Audit",
    body: "Run performance benchmarks, end-to-end testing, security checks, and WCAG audits.",
  },
  {
    n: "05",
    title: "Production Launch",
    body: "Deploy to production infrastructure with monitoring, error tracking and a rollback plan.",
  },
  {
    n: "06",
    title: "Handover & Scale",
    body: "Deliver clear documentation, codebase walkthroughs, and optional standing maintenance.",
  },
];

export const locationCards = [
  {
    kind: "Based in",
    place: "Bengaluru, India",
    body: "On-site meetings possible. Primary location for engineering operations and in-person alignment.",
  },
  {
    kind: "Serving clients in",
    place: "Mumbai · Delhi NCR · Hyderabad · Pune",
    body: "Same time zone, remote delivery, and fast turnaround with occasional travel for project kickoffs.",
  },
  {
    kind: "Remote development for",
    place: "Dubai · London",
    body: "Good working-hours overlap with IST, with written async updates between calls.",
  },
  {
    kind: "Remote development for",
    place: "United States (US East / West)",
    body: "Committed daily morning overlap window with US teams and detailed async progress logs.",
  },
];

export const featuredArticle = {
  cat: "Hiring",
  title: "How to Hire a React Developer for Production Products",
  desc: "What to look for in component architecture, state management choices, and three coding test questions that reveal weak candidates — written for technical founders and team leads.",
  read: "12 min read",
  date: "Sep 2026",
};

export const insightsArticles = [
  {
    cat: "Next.js",
    title: "Migrating from Vite to Next.js App Router Without Downtime",
    desc: "A step-by-step architecture pattern for converting client-side SPAs into hybrid server-rendered Next.js applications.",
    read: "8 min read",
    date: "Aug 2026",
  },
  {
    cat: "AI Engineering",
    title: "Building Production RAG: Beyond Naive Vector Search",
    desc: "Why chunk size tuning, hybrid BM25 + dense retrieval, and reranking are essential for enterprise document Q&A accuracy.",
    read: "10 min read",
    date: "Aug 2026",
  },
  {
    cat: "Performance",
    title: "Reducing React Re-Renders in High-Frequency Data Tables",
    desc: "How selector memoization, state colocation, and windowing keep 10,000-row tables running at 60 FPS.",
    read: "6 min read",
    date: "Jul 2026",
  },
  {
    cat: "Python / AI",
    title: "FastAPI + WebSockets for Streaming LLM Token Responses",
    desc: "Implementing resilient server-sent events and WebSockets for real-time generative AI interfaces.",
    read: "7 min read",
    date: "Jul 2026",
  },
  {
    cat: "Architecture",
    title: "Type Safety Across the Boundary: Next.js, Zod, and PostgreSQL",
    desc: "Ensuring zero-runtime type mismatches between your database migrations, API routes, and React components.",
    read: "9 min read",
    date: "Jun 2026",
  },
];

export const homeFaqs = [
  {
    q: "What stacks and technologies do you specialize in?",
    a: "Full-stack web development (React 19, Next.js, TypeScript, Tailwind CSS), backend engineering (Python/FastAPI, Node.js, PostgreSQL, Redis), and AI systems (LLMs, RAG, AI Agents, Vector DBs).",
  },
  {
    q: "How do project engagements work?",
    a: "Projects run on fixed-scope deliverables, dedicated weekly/monthly capacity sprints, or ongoing retainer maintenance. Pricing is transparently quoted per project.",
  },
  {
    q: "What is your availability for new engagements?",
    a: "I take on a limited number of projects at a time so each gets proper attention. Send a brief through the Hire Me page and I will reply with questions and a suggested approach.",
  },
  {
    q: "How do you handle time-zone differences for international clients?",
    a: "Based in Bengaluru (IST), I commit to dedicated daily overlap windows for teams in the US, UK, Europe, and Middle East, backed by clear written async updates.",
  },
  {
    q: "Do you work with existing codebases or only new builds?",
    a: "Both! I audit, refactor, and modernize existing codebases (e.g., migrating CRA/Vite to Next.js or JavaScript to strict TypeScript) as well as building greenfield products from scratch.",
  },
  {
    q: "What deliverables are included with every engagement?",
    a: "A clean documented repository, automated unit/integration test coverage, CI/CD deployment configuration, and a detailed handover document for your team.",
  },
];

export const reactFaqs = [
  {
    q: "Why hire a specialized React developer over a generalist?",
    a: "React application performance, state design, and component reusability determine long-term maintenance costs. A specialist ensures proper cache boundaries, zero unnecessary re-renders, and WCAG accessibility.",
  },
  {
    q: "How do you handle state management in React apps?",
    a: "I keep state local to where it is consumed, use TanStack Query or SWR for server cache, URL search params for bookmarkable state, and light global stores (Zustand/Context) only when distantly shared.",
  },
  {
    q: "Can you upgrade our existing React app to React 19 / Next.js?",
    a: "Yes. I perform incremental refactoring—migrating route by route without pausing your team's ongoing feature velocity.",
  },
  {
    q: "Do you write automated tests for React components?",
    a: "Yes. Critical user flows are covered using Vitest, React Testing Library, and Playwright for end-to-end regression testing.",
  },
  {
    q: "How do you optimize React page performance and Core Web Vitals?",
    a: "Through dynamic code splitting, image optimization, dynamic imports, virtualization for large lists, and removing heavy third-party bundle dependencies.",
  },
];

export const hireFaqs = [
  {
    q: "How fast can we start a project after initial contact?",
    a: "After you send a brief, I review it and reply with questions and a suggested next step, usually a short technical call. The start date depends on scope and my current commitments, and I will be upfront about it.",
  },
  {
    q: "What contract formats do you support?",
    a: "Fixed-price milestone agreements, weekly sprint contracts, hourly audit consulting, or monthly standing retainer agreements.",
  },
  {
    q: "Who owns the code and intellectual property?",
    a: "You own 100% of the code, assets, IP, and repository upon completion. All code is committed directly to your organization's repository.",
  },
  {
    q: "What happens if our requirements change mid-project?",
    a: "Changes are expected. Each one is written down with its effect on timeline and budget, and agreed before work on it starts.",
  },
];

export const engagementModels = [
  {
    id: "fixed",
    tag: "Fixed Scope",
    name: "Fixed Deliverable",
    body: "Agreed feature scope, milestones, clear timeline, and fixed quote.",
  },
  {
    id: "weekly",
    tag: "Dedicated Sprint",
    name: "Weekly Sprint",
    body: "Full-time dedicated weekly capacity on your roadmap.",
  },
  {
    id: "audit",
    tag: "Consulting",
    name: "Audit & Consulting",
    body: "Code review, performance audit, or architecture consultation.",
  },
  {
    id: "retainer",
    tag: "Ongoing",
    name: "Retainer Support",
    body: "Standing monthly allocation for maintenance & ongoing builds.",
  },
];

export const expertiseGroups = [
  {
    k: "Frontend",
    v: "React 19, Next.js App Router, TypeScript, Server Components, Tailwind CSS",
  },
  {
    k: "Backend",
    v: "Python (FastAPI, Django), Node.js, PostgreSQL, Redis, Celery, Docker",
  },
  {
    k: "AI Engineering",
    v: "LLM APIs, RAG pipelines, Qdrant/pgvector, tool-calling agents, prompt evals",
  },
  {
    k: "Platform & DevOps",
    v: "Vercel, AWS, GitHub Actions, Sentry, Core Web Vitals monitoring",
  },
];

/* Backward compatibility exports for legacy template helpers */
export const nav = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/react-developer" },
  { label: "Hire me", href: "/hire-me" },
] as const;

export const indexableRoutes = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/projects", changeFrequency: "monthly", priority: 0.8 },
  { path: "/hire-me", changeFrequency: "weekly", priority: 0.9 },
  { path: "/about", changeFrequency: "monthly", priority: 0.7 },
  { path: "/blog", changeFrequency: "weekly", priority: 0.7 },
  { path: "/contact", changeFrequency: "yearly", priority: 0.5 },
] as const;

export const logos = ["React", "Next.js", "Python", "FastAPI", "TypeScript", "Node.js"] as const;

export const steps = processTimeline.map((t) => ({ title: t.title, description: t.body }));

export type FeatureIcon = "sparkles" | "shield" | "bolt" | "graph" | "plug" | "users";

export type Feature = {
  title: string;
  description: string;
  icon: FeatureIcon;
};

export const features: Feature[] = services.slice(0, 6).map((s) => ({
  icon: "sparkles",
  title: s.name,
  description: s.blurb,
}));

export const faqs = homeFaqs.map((f) => ({ question: f.q, answer: f.a }));

export const plans = engagementModels.map((m) => ({
  name: m.name,
  monthly: 0,
  annual: 0,
  blurb: m.body,
  features: [m.tag],
  cta: "Select model",
  featured: false,
}));
export type Plan = (typeof plans)[number];
