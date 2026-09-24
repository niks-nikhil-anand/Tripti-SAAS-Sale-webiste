import type { LandingPage } from "@/types/content";

export const developerCorePages: LandingPage[] = [
  // ───────────────────────────────── React ─────────────────────────────────
  {
    slug: "react-developer",
    group: "developer",
    navLabel: "React Developer",
    cardBlurb:
      "Typed React interfaces with clear component boundaries, Zustand for UI state, a proper server cache, and performance checked on real devices.",
    icon: "atom",
    metaTitle: "React Developer for Fast, Scalable Web Apps",
    metaDescription:
      "Hire a React developer who builds typed component systems, predictable state with Zustand and a server cache, and fast, responsive UIs that hold up in use.",
    eyebrow: "React Developer · Bengaluru",
    h1: "React Developer for Fast, Scalable Web Applications",
    intro:
      "I'm Tripti Shakya, a full stack developer in Bengaluru who builds React interfaces in TypeScript: component systems that stay readable, state that stays predictable, and screens that load quickly on real devices.",
    summary: [
      "I build React interfaces in TypeScript strict mode, including dashboards, admin panels, customer portals, SaaS front ends, component libraries and refactors of existing apps.",
      "API data lives in a server cache such as TanStack Query, while Zustand holds only small UI state and shareable filters go into URL search params.",
      "Performance fixes start from the React Profiler and bundle analysis, then I test on a throttled connection with a mid-range phone profile before shipping.",
      "An engagement starts with a review of designs or the existing repo and a written plan, then work lands as small pull requests with preview URLs.",
    ],
    highlights: [
      "React + TypeScript",
      "Zustand and server caching",
      "Component architecture",
      "Performance on real devices",
    ],
    diagram: {
      title: "How a React feature ships",
      caption:
        "The order I work in, so data and structure are settled before pixels are polished.",
      steps: [
        "Define data contract",
        "Sketch component tree",
        "Build typed components",
        "Wire server cache",
        "Test key interactions",
        "Profile and ship",
      ],
    },
    sections: [
      {
        id: "react-overview",
        heading: "React development, the way I approach it",
        body: [
          "Most React codebases don't struggle because of React. They struggle because nobody decided where data lives, which components own which behaviour, and how the UI should respond when a request is slow or fails. As a React developer, I make those decisions early and encode them in the code itself: typed props, clear folder boundaries, and loading and error states designed alongside the happy path.",
          "I work as a freelance React developer on new builds and on existing apps that need structure. That can mean a dashboard from scratch, a component library extracted from repeated markup, or a slow product screen profiled and rebuilt so it stops re-rendering on every keystroke.",
        ],
        points: [
          {
            title: "New React applications",
            text: "Dashboards, admin panels, customer portals and SaaS front ends, written in TypeScript from the first commit.",
          },
          {
            title: "Refactors of existing apps",
            text: "Untangling prop drilling, splitting oversized components and moving fetch logic out of useEffect into a proper cache.",
          },
          {
            title: "Component libraries",
            text: "Shared buttons, forms, tables and dialogs on Tailwind and shadcn/ui, documented through real usage.",
          },
          {
            title: "API-heavy interfaces",
            text: "Screens backed by REST or GraphQL with pagination, optimistic updates and clear failure states.",
          },
          {
            title: "Real-time features",
            text: "Live updates over Socket.io, streamed AI responses and presence indicators.",
          },
        ],
      },
      {
        id: "react-typescript",
        heading: "React + TypeScript, end to end",
        body: [
          "I write React in TypeScript strict mode by default. Props are typed as discriminated unions when a component has distinct modes, so a button can't be both a link and a submit action by accident. Event handlers, refs and context values are typed at the source, which means refactors surface as compiler errors instead of bug reports from users.",
          "The bigger win is typing the edges. API responses are parsed with Zod in the fetch layer, so a component receives data that has actually been checked, not data that was cast with 'as'. That's what clients usually mean when they ask for a React TypeScript developer: types that describe what the runtime really does.",
        ],
        links: [{ label: "TypeScript developer", href: "/typescript-developer" }],
      },
      {
        id: "component-architecture",
        heading: "Component architecture that stays readable",
        body: [
          "I split components by responsibility rather than by size. Presentational pieces take data and callbacks and render; container pieces fetch, handle permissions and pass down only what's needed. Feature folders keep a screen's components, hooks and types together, so removing a feature means deleting a folder, not hunting through a shared components directory for leftovers.",
        ],
        points: [
          {
            title: "Composition over configuration",
            text: "Slots and children instead of components with twenty boolean props that interact in ways nobody remembers.",
          },
          {
            title: "Colocated hooks",
            text: "Data logic lives in a hook beside the component that uses it, and moves to a shared folder only when a second feature needs it.",
          },
          {
            title: "Schema-driven forms",
            text: "React Hook Form with Zod schemas, so validation rules are shared between the client and the API.",
          },
          {
            title: "Accessible primitives",
            text: "Dialogs, menus and comboboxes built on Radix through shadcn/ui, so focus and keyboard behaviour are correct by default.",
          },
        ],
      },
      {
        id: "state-management",
        heading: "State management: Zustand for the client, a cache for the server",
        body: [
          "The most useful state decision is separating server state from client state. Data that comes from an API belongs in a server cache such as TanStack Query or SWR, which handles deduplication, background refetching and staleness. Copying that data into a global store means rewriting caching by hand, and usually getting invalidation wrong.",
          "What remains is small: which panel is open, a multi-step form's draft, a user's table preferences. For that I use Zustand, with narrow selectors so a component re-renders only when the slice it reads changes. Anything a user might want to share or bookmark, such as filters, tabs and page numbers, goes into URL search params instead.",
        ],
      },
      {
        id: "api-integration",
        heading: "API integration without fragile fetch calls",
        body: [
          "Every API call goes through a thin typed client: one place that sets auth headers, parses responses, maps error codes to readable messages and retries idempotent requests. Components never call fetch directly. When the backend renames a field, there's one file to update and the compiler points at every screen affected.",
          "I design the UI states before the request exists: empty, loading, partial, error and success. Mutations disable their trigger while in flight, and long operations such as file processing report progress from a status endpoint or socket event rather than a spinner that never ends. Because I also build Node.js APIs, I can adjust the contract on both sides when that's the cleaner fix.",
        ],
        links: [
          { label: "Node.js developer", href: "/nodejs-developer" },
          { label: "API development", href: "/api-development" },
        ],
      },
      {
        id: "performance-responsive-ui",
        heading: "Performance optimization and responsive UI",
        body: [
          "Performance work starts with the React Profiler and the browser's performance panel, not guesses. The usual culprits are context providers that re-render the whole tree, long lists without virtualisation, heavy libraries in the main bundle and effects that fire on every render. I fix the measured cause, then compare bundle analyser output before and after.",
          "Responsive UI is designed mobile first with Tailwind, using container queries for components that appear in both sidebars and main content. I test on a throttled connection with a mid-range phone profile, because a dashboard that feels fine on a developer laptop can stutter on the devices customers actually carry.",
        ],
        points: [
          {
            title: "Code splitting",
            text: "Lazy loading for charts, rich text editors and other heavy widgets that most visits never open.",
          },
          {
            title: "List virtualisation",
            text: "Windowed rendering for tables and feeds with thousands of rows.",
          },
          {
            title: "Memoisation with intent",
            text: "memo and useMemo only where the profiler shows wasted renders, not sprinkled everywhere.",
          },
          {
            title: "Image and font discipline",
            text: "Sized images, modern formats and fonts loaded without layout shift.",
          },
        ],
      },
      {
        id: "react-and-nextjs",
        heading: "Where React ends and Next.js begins",
        body: [
          "React is the component model; Next.js is the framework around it that handles routing, server rendering, server-side data access and deployment conventions. For a logged-in tool with no SEO needs, a client-rendered React app built with Vite and a separate API can be the simpler choice. For public pages that need search visibility or fast first paint, I reach for Next.js and its App Router.",
          "Most of my recent React work runs inside Next.js, so I'm used to deciding which components must be client components and which can stay on the server. Keeping the interactive islands small means shipping less JavaScript without losing interactivity where users need it.",
        ],
        links: [
          { label: "Next.js developer", href: "/nextjs-developer" },
          { label: "Frontend developer", href: "/frontend-developer" },
        ],
      },
      {
        id: "process-and-why-me",
        heading: "Development process and why work with me",
        body: [
          "An engagement starts with a short review of designs, API docs or the existing repository, followed by a written plan of routes, components and data flow. I work in small pull requests, each with a preview URL, so you see progress on real pages rather than in status updates. Tests cover the interactions that would hurt most if they broke: sign-in, forms, payments and permissions.",
          "If you want to hire a React developer who can also work on the API, the database and the deployment pipeline, that's where I'm most useful. Fewer handoffs means fewer mismatched assumptions between frontend and backend, and when a screen needs a new field or a faster query, I can make that change myself instead of filing a ticket and waiting.",
        ],
        points: [
          {
            title: "Plan first",
            text: "Routes, component tree and data contracts agreed before building starts.",
          },
          {
            title: "Small PRs with previews",
            text: "Every change reviewable on its own URL.",
          },
          {
            title: "Tests where it matters",
            text: "Integration tests on critical flows rather than snapshots of every div.",
          },
          {
            title: "Clean handover",
            text: "Readable code and a README that explains the decisions, not just the commands.",
          },
        ],
      },
    ],
    stack: [
      { group: "Core", items: ["React", "TypeScript", "JavaScript"] },
      { group: "UI", items: ["Tailwind CSS", "shadcn/ui", "Framer Motion"] },
      { group: "State and forms", items: ["Zustand", "React Hook Form", "Zod"] },
      { group: "Framework and real-time", items: ["Next.js App Router", "Socket.io"] },
    ],
    projects: ["resume-analyzer", "ai-avatar", "chat-with-pdf"],
    related: [
      "nextjs-developer",
      "frontend-developer",
      "typescript-developer",
      "react-developer-bangalore",
      "saas-development",
    ],
    faqs: [
      {
        q: "Do you work as a freelance React developer or only on complete projects?",
        a: "Both. I take on complete builds, where I own the frontend from architecture to deployment, and scoped work inside an existing team, such as a component library, a performance pass or a refactor of a problem area. For scoped work I start by reading the codebase and agreeing on conventions, so my changes fit what's already there.",
      },
      {
        q: "Will you use Redux?",
        a: "If your app already runs on Redux Toolkit and it works, I'll work within it rather than rewrite for taste. For new projects I usually recommend a server cache for API data plus a small Zustand store for UI state, because much of what ends up in Redux is really cached server data. The choice depends on how much genuinely shared client state exists.",
      },
      {
        q: "Can you take over an existing React codebase?",
        a: "Yes. I start with a read-through and a short written assessment: where state lives, which components do too much, what's untested and which dependencies are outdated. Then we pick the changes with the best payoff and make them incrementally, keeping the app shippable throughout instead of pausing features for a large rewrite.",
      },
      {
        q: "Should my project use plain React or Next.js?",
        a: "It depends on who sees the pages. Public, search-indexed pages and anything that benefits from server rendering point to Next.js. An internal tool behind a login, with no SEO needs, can be a plain React app built with Vite talking to a separate API. I'll explain the trade-off for your specific case before any code is written.",
      },
      {
        q: "How do you handle design handoff from Figma?",
        a: "I map the design's colours, spacing and type scale into Tailwind tokens first, then build the recurring components, then assemble screens from them. Where a design is ambiguous, for example missing empty or error states, I raise it early and propose something consistent with the rest of the system rather than guessing silently.",
      },
    ],
    serviceType: "React development",
  },

  // ──────────────────────────────── Next.js ────────────────────────────────
  {
    slug: "nextjs-developer",
    group: "developer",
    navLabel: "Next.js Developer",
    cardBlurb:
      "App Router builds with Server Components, deliberate caching per route, secure Server Actions and deploys to Vercel, Docker or AWS.",
    icon: "triangle",
    metaTitle: "Next.js Developer for App Router and SaaS Builds",
    metaDescription:
      "Hire a Next.js developer for App Router builds: Server Components, per-route caching, Server Actions, auth, databases and deploys on Vercel, Docker or AWS.",
    eyebrow: "Next.js Developer · Bengaluru",
    h1: "Next.js Developer for Production SaaS on the App Router",
    intro:
      "I build Next.js applications on the App Router, deciding route by route what renders on the server, what gets cached and what needs to run in the browser, then deploying the result to Vercel, Docker or AWS.",
    summary: [
      "I build Next.js applications on the App Router, using Server Components by default and adding client components only where state, effects or browser APIs are needed.",
      "Rendering is chosen per route: static generation for marketing and docs, incremental revalidation for changing listings, and dynamic streaming for per-user dashboards.",
      "Deployment goes to Vercel with preview URLs per pull request, or to a Docker image on AWS ECS when the app must live in your own account.",
      "An engagement can start with a call on rendering and client boundaries, and existing pages-router apps migrate to the App Router one route at a time.",
    ],
    highlights: [
      "App Router and Server Components",
      "SSR, SSG and ISR by route",
      "Auth and database integration",
      "Vercel, Docker or AWS deploys",
    ],
    diagram: {
      title: "A request through the App Router",
      caption: "How a typical page resolves on the server before it reaches the browser.",
      steps: [
        "Middleware checks request",
        "Layouts and page resolve",
        "Server Components fetch",
        "Cache or render",
        "Stream HTML",
        "Hydrate client islands",
      ],
    },
    sections: [
      {
        id: "app-router",
        heading: "Working in the App Router, not around it",
        body: [
          "The App Router changes where work happens. Layouts persist across navigations, loading and error files give each segment its own Suspense and error boundary, and route groups let marketing pages and the authenticated app share a repository without sharing a layout. I structure the app directory around these features so the file tree explains the product.",
          "When teams look for a Next.js App Router developer, the real need is usually someone who has made the mental shift away from getServerSideProps and the pages directory. I've built on both, and I migrate incrementally when a project still has pages routes, since the two routers can run side by side.",
        ],
      },
      {
        id: "server-components",
        heading: "Server Components and the client boundary",
        body: [
          "Server Components are the default in my code. They fetch data directly, read secrets safely and send HTML without adding to the JavaScript bundle. I add 'use client' only at the leaves that need state, effects or browser APIs, such as a filter bar or a chart, and pass server-fetched data into them as serialisable props.",
          "The common mistake is marking a high-level layout as a client component because one child needs an onClick. That quietly turns the whole subtree into client code. I watch that boundary in code review and check the build output to confirm which routes ship which chunks.",
        ],
        points: [
          {
            title: "Server by default",
            text: "Data fetching and heavy formatting stay on the server, out of the bundle.",
          },
          {
            title: "Small client islands",
            text: "Interactive widgets receive plain props and own only their local state.",
          },
          {
            title: "Composition across the boundary",
            text: "Server Components passed as children into client wrappers when a layout needs interactivity.",
          },
          {
            title: "Secrets stay server-side",
            text: "Database clients and API keys imported only from server-only modules.",
          },
        ],
      },
      {
        id: "rendering-strategy",
        heading: "Choosing SSR, SSG or ISR per route",
        body: [
          "Rendering is a per-route decision. Marketing pages and documentation are generated statically at build time. Listings that change a few times an hour use incremental revalidation, either on a time window or on demand by tag when an editor publishes. Dashboards with per-user data render dynamically on each request, streaming slower sections behind Suspense.",
          "I'm explicit about caching rather than trusting defaults, because caching behaviour has shifted between Next.js versions. Each data function states whether it is cached, for how long and which tag invalidates it, so nobody has to guess why a page is showing stale data.",
        ],
        points: [
          {
            title: "Static generation",
            text: "Landing pages, docs and articles built once and served from a CDN.",
          },
          {
            title: "Incremental revalidation",
            text: "Catalogue and content pages refreshed on a timer or by tag after writes.",
          },
          {
            title: "Dynamic rendering",
            text: "Authenticated, per-user views rendered on request with streaming.",
          },
        ],
      },
      {
        id: "route-handlers-server-actions",
        heading: "Route handlers and Server Actions, used where they fit",
        body: [
          "Server Actions suit form submissions and mutations that belong to one page: create a record, revalidate the affected path, return validation errors to the form. I validate every action's input with Zod and check authorisation inside the action itself, because an action is a public endpoint even when it looks like a local function call.",
          "Route handlers are the better fit for webhooks from services like Stripe or GitHub, endpoints consumed by mobile apps or partners, streamed AI responses and uploads that need fine control over the request. When an API grows beyond a handful of handlers or needs to scale separately, I move it into its own Node.js service.",
        ],
        links: [
          { label: "Node.js developer", href: "/nodejs-developer" },
          { label: "API development", href: "/api-development" },
        ],
      },
      {
        id: "seo-performance",
        heading: "SEO, metadata and performance",
        body: [
          "Every route exports metadata or generateMetadata with a unique title, description, canonical URL and Open Graph image, which can itself be generated at request time. Sitemaps and robots rules come from the app directory file conventions, and JSON-LD structured data is added where the content type supports it.",
          "For speed, I use next/image with explicit sizes, next/font to avoid layout shift, dynamic imports for heavy client widgets and segment configuration that keeps static pages static. I check Core Web Vitals in field data where available, since a good lab score can hide slow interactions on real phones.",
        ],
      },
      {
        id: "auth-database",
        heading: "Authentication and database integration",
        body: [
          "As a Next.js SaaS developer, most of what I build sits behind a login, so auth is designed first. Depending on whether the product has other clients, sessions come from OAuth sign-in handled in Next.js or from a JWT issued by our own API. Middleware handles coarse redirects for signed-out users, but every page, action and route handler still checks the session and the user's access to that specific resource.",
          "Database access goes through Prisma with PostgreSQL, or the MongoDB driver when data is document-shaped, from server-only modules. Connection pooling matters in serverless deploys, so I configure a pooler there, or keep long-lived connections when the app runs in a container.",
        ],
        points: [
          {
            title: "Checks at every entry point",
            text: "Pages, actions and handlers each verify who the user is and what they may touch.",
          },
          {
            title: "Server-only data layer",
            text: "One module per resource, never importable from client code.",
          },
          {
            title: "Pooled connections",
            text: "Configured to match serverless or container runtimes.",
          },
        ],
      },
      {
        id: "deployment",
        heading: "Deploying to Vercel, Docker or AWS",
        body: [
          "Vercel is the quickest route to production and gives a preview deployment per pull request out of the box. When a client needs the app inside their own AWS account, I build the standalone output into a Docker image, push it to ECR and run it on ECS, with a CDN in front for static assets and GitHub Actions running the pipeline.",
          "I built a Vercel-style deployment platform as a project, with isolated Docker builds, generated subdomains and streamed build logs, so I know what a hosting provider does behind the scenes. That helps when self-hosting, where image optimisation, caching and revalidation all need explicit setup.",
        ],
        links: [
          { label: "AWS developer", href: "/aws-developer" },
          { label: "Vercel clone case study", href: "/projects/vercel-clone" },
        ],
      },
    ],
    stack: [
      { group: "Framework", items: ["Next.js App Router", "React", "TypeScript"] },
      { group: "Data and auth", items: ["Prisma", "PostgreSQL", "MongoDB", "JWT and OAuth"] },
      { group: "UI", items: ["Tailwind CSS", "shadcn/ui"] },
      { group: "Deploy", items: ["Vercel", "Docker", "AWS ECS and ECR", "GitHub Actions"] },
    ],
    projects: ["vercel-clone", "chat-with-pdf", "ai-avatar"],
    related: [
      "react-developer",
      "full-stack-developer",
      "saas-development",
      "nextjs-developer-bangalore",
      "typescript-developer",
    ],
    faqs: [
      {
        q: "What should I look for when I hire a Next.js developer?",
        a: "Ask how they choose between static, revalidated and dynamic rendering for a route, where they place the client component boundary, and how they secure Server Actions. Those answers show whether someone understands the App Router or is writing a client-side React app inside it. I'm happy to walk through those decisions for your project on a first call.",
      },
      {
        q: "Can you migrate our app from the pages router to the App Router?",
        a: "Yes, and usually incrementally. Both routers can coexist, so I move routes one at a time, starting with simple static pages, then shared layouts, then data-heavy screens. getServerSideProps logic becomes Server Component fetching, API routes become route handlers, and each step ships on its own, so there's no long-lived migration branch.",
      },
      {
        q: "Do I have to host on Vercel?",
        a: "No. Vercel is convenient, but Next.js runs well as a Node.js server in Docker. I've deployed standalone builds to AWS ECS and set up the pieces Vercel normally provides, such as a CDN for static assets and a shared cache for revalidation across instances. The trade-off is more infrastructure to own in exchange for control over cost and location.",
      },
      {
        q: "Do you use Server Actions for everything?",
        a: "No. They're good for page-level mutations such as form submits and they cut boilerplate. For webhooks, public APIs, streamed responses, file uploads and anything other clients consume, route handlers or a separate service are clearer. Whichever I use, input is validated with Zod and authorisation is checked on the server.",
      },
      {
        q: "Can you build AI features into a Next.js app?",
        a: "Yes. My chat-with-pdf and AI avatar projects are Next.js apps that stream model output to the browser through route handlers, with background processing for uploads and embeddings. The Next.js-specific concerns are keeping API keys server-side, streaming without buffering whole responses and moving long jobs out of the request cycle.",
      },
    ],
    serviceType: "Next.js development",
  },

  // ──────────────────────────────── Node.js ────────────────────────────────
  {
    slug: "nodejs-developer",
    group: "developer",
    navLabel: "Node.js Developer",
    cardBlurb:
      "Express and GraphQL APIs in TypeScript, JWT auth, Socket.io real-time features, Redis-backed queues and Docker images running on AWS.",
    icon: "server",
    metaTitle: "Node.js Developer for APIs, Real-Time and Jobs",
    metaDescription:
      "Node.js developer building Express and GraphQL APIs, JWT auth, PostgreSQL, MongoDB and Redis, Socket.io features, queues and Docker deploys on AWS.",
    eyebrow: "Node.js Developer · Bengaluru",
    h1: "Node.js Developer for APIs, Real-Time Features and Background Jobs",
    intro:
      "I build Node.js services in TypeScript: Express and GraphQL APIs, WebSocket features, job queues, and the Docker images that run them on AWS.",
    summary: [
      "I build Node.js services in TypeScript with Express or GraphQL, organised into routes, controllers, services and repositories so each concern has one home.",
      "Authentication uses short-lived JWT access tokens and rotating refresh tokens in httpOnly cookies, with authorisation checked in the service layer against each record.",
      "Slow or retryable work such as email, uploads and embeddings runs on BullMQ queues in Redis with retries, backoff, dead letters and idempotent handlers.",
      "Services ship as multi-stage Docker images to ECR and run on ECS, with GitHub Actions or GitLab CI running tests and rolling out each release.",
    ],
    highlights: [
      "Express and GraphQL APIs",
      "Socket.io real-time",
      "Redis-backed queues",
      "Docker on AWS",
    ],
    diagram: {
      title: "Anatomy of a Node.js service",
      caption: "The layers a request passes through in the services I build.",
      steps: [
        "Router and middleware",
        "Auth and validation",
        "Service layer",
        "Repository layer",
        "PostgreSQL or MongoDB",
        "Queue for slow work",
      ],
    },
    sections: [
      {
        id: "express-structure",
        heading: "Express services with a structure you can navigate",
        body: [
          "Express gives you almost no structure, which is both its appeal and its risk. I organise services into routes, controllers, services and repositories, so HTTP concerns, business rules and database queries each have one home. Middleware handles the cross-cutting work: request IDs, auth, rate limiting, body validation with Zod and a single error handler that maps domain errors to status codes.",
          "Everything is TypeScript, with async errors caught centrally rather than wrapped in try/catch in every route. Configuration is read once at startup and validated, so a missing environment variable crashes the service on boot instead of on the first request that needs it.",
        ],
        points: [
          {
            title: "Thin controllers",
            text: "Parse the request, call a service, shape the response. Nothing else.",
          },
          {
            title: "Services own the rules",
            text: "Business logic that can be tested without spinning up HTTP.",
          },
          {
            title: "Repositories own queries",
            text: "One place per entity to find and tune database access.",
          },
          {
            title: "Central error handling",
            text: "Typed domain errors mapped to consistent JSON responses.",
          },
        ],
      },
      {
        id: "rest-graphql",
        heading: "REST and GraphQL, chosen per client",
        body: [
          "REST is my default for public and service-to-service APIs: resources with predictable URLs, cursor pagination, idempotency keys on payment-like endpoints and an OpenAPI description generated from the same schemas that validate requests. It caches well at the HTTP level and is easy for third parties to consume.",
          "GraphQL earns its place when several clients need different shapes of the same data, such as a web dashboard and a mobile app. Then I use DataLoader to batch lookups and avoid N+1 queries, set depth and complexity limits, and keep resolvers thin by calling the same service layer the REST routes use.",
        ],
        links: [
          { label: "API development", href: "/api-development" },
          { label: "Backend developer", href: "/backend-developer" },
        ],
      },
      {
        id: "auth-jwt",
        heading: "Authentication and JWT, done carefully",
        body: [
          "For JWT auth I issue short-lived access tokens and longer-lived refresh tokens in httpOnly, secure cookies, with refresh rotation and a server-side record so a stolen token can be revoked. Passwords are hashed with bcrypt or argon2, login endpoints are rate limited, and OAuth providers such as GitHub or Google plug into the same session model.",
          "Authorisation is kept separate from authentication. Middleware confirms who the user is; a policy check in the service layer confirms whether they may touch this particular record. Keeping that check close to the data prevents the classic bug where someone edits another tenant's resource by changing an ID in the URL.",
        ],
      },
      {
        id: "databases",
        heading: "PostgreSQL, MongoDB and Redis from Node",
        body: [
          "PostgreSQL through Prisma is my first choice for relational data with transactions: users, organisations, billing, permissions. MongoDB fits document-shaped data with variable fields, such as build logs or parsed documents, which is why my Vercel-style deployment project stores builds there. Redis sits beside either one for caching, rate-limit counters, sessions and queue storage.",
          "In Node specifically, I pay attention to connection handling: pooled clients created once per process, pool sizes set against the database's connection limit, and graceful shutdown that drains in-flight queries before a container stops. Slow query logging is switched on early, so problems show up in development rather than under production load.",
        ],
        points: [
          {
            title: "PostgreSQL + Prisma",
            text: "Typed queries, migrations in version control, transactions for multi-step writes.",
          },
          {
            title: "MongoDB",
            text: "Flexible documents with indexes designed around actual query patterns.",
          },
          {
            title: "Redis",
            text: "Cache-aside reads, TTL-based expiry, counters and pub/sub.",
          },
        ],
      },
      {
        id: "realtime",
        heading: "WebSockets and Socket.io for real-time features",
        body: [
          "Real-time features run over Socket.io when I need rooms, reconnection and fallbacks, or raw WebSockets when the protocol is simple. Connections authenticate during the handshake with the same token as the HTTP API. Event names and payloads are typed on both sides, so client and server agree on message shapes at compile time.",
          "Running more than one instance needs a Redis adapter so events reach users connected to other nodes, plus sticky sessions or a WebSocket-aware load balancer. I've used streamed, socket-style updates for live build logs and for low-latency AI conversation in my own projects.",
        ],
        links: [{ label: "AI avatar case study", href: "/projects/ai-avatar" }],
      },
      {
        id: "queues-microservices",
        heading: "Queues, background jobs and microservices",
        body: [
          "Anything slow or retryable leaves the request cycle: sending email, processing uploads, generating embeddings, calling rate-limited third-party APIs. I use BullMQ on Redis with explicit retry policies, backoff, dead-letter handling and idempotent job handlers, so a retried job doesn't charge a card twice or send a duplicate message.",
          "I split a system into microservices only when there's a reason: a workload that scales differently, a separate deploy cadence or a team boundary. Until then, a modular monolith with clear internal boundaries is cheaper to run and easier to debug. When services do split, they talk through queues or versioned HTTP contracts.",
        ],
        points: [
          {
            title: "Idempotent handlers",
            text: "Safe to retry after a crash or timeout.",
          },
          {
            title: "Backoff and dead letters",
            text: "Failures slow down, then park for inspection.",
          },
          {
            title: "Job status for the UI",
            text: "Progress exposed so the frontend can show what's really happening.",
          },
          {
            title: "Split when justified",
            text: "Modular monolith first, separate services when scaling or ownership demands it.",
          },
        ],
      },
      {
        id: "docker-aws",
        heading: "Docker images and AWS deployment",
        body: [
          "I build multi-stage Docker images that compile TypeScript in one stage and copy only the output and production dependencies into a slim runtime image that runs as a non-root user. Health endpoints separate liveness from readiness, and the process handles SIGTERM so deploys don't cut off in-flight requests.",
          "On AWS, images go to ECR and run on ECS, with Lambda for small event-driven functions and S3 for files. GitHub Actions or GitLab CI runs tests, builds the image and rolls out the new task definition. Logs are structured JSON with request IDs, so tracing a failing request across services is a search rather than guesswork.",
        ],
        links: [{ label: "AWS developer", href: "/aws-developer" }],
      },
    ],
    stack: [
      { group: "Runtime", items: ["Node.js", "TypeScript", "Express"] },
      { group: "APIs", items: ["REST", "GraphQL", "Socket.io", "JWT"] },
      { group: "Data", items: ["PostgreSQL", "Prisma", "MongoDB", "Redis"] },
      { group: "Infrastructure", items: ["Docker", "AWS ECS and ECR", "AWS Lambda", "S3", "GitHub Actions"] },
    ],
    projects: ["vercel-clone", "ai-avatar", "blog-automation"],
    related: [
      "backend-developer",
      "api-development",
      "full-stack-developer",
      "typescript-developer",
      "aws-developer",
    ],
    faqs: [
      {
        q: "Do you write Node.js in JavaScript or TypeScript?",
        a: "TypeScript for anything new, compiled with strict settings and run as plain JavaScript in production. For existing JavaScript services I can work in them as they are or migrate gradually, starting with types at the API boundary and the database layer, where mistakes cost the most. The runtime stays the same; only the safety net changes.",
      },
      {
        q: "Express, Fastify or NestJS?",
        a: "Express is what I use most, and its ecosystem is enormous. Fastify is worth it when raw throughput and built-in schema validation matter. NestJS suits larger teams that want enforced structure. For most projects the framework matters less than clear layering inside it, which I apply whichever one you choose.",
      },
      {
        q: "How do you handle long-running tasks in a Node API?",
        a: "They move to a queue. The API accepts the request, stores a job record, enqueues the work in Redis and returns immediately with a job ID. A separate worker process runs the task with retries, and the client polls a status endpoint or listens on a socket. That keeps request latency predictable and stops one heavy task from blocking the event loop.",
      },
      {
        q: "Can you work on an existing Node.js backend?",
        a: "Yes. I start by running it locally, reading the route map and checking how errors, auth and database access are handled. Then I prioritise: security gaps and missing validation first, then the hot paths behind slow requests, then structural cleanup. Changes land as small, tested pull requests so the service keeps shipping.",
      },
      {
        q: "Do you build microservices from the start?",
        a: "Rarely. A new product usually benefits from one well-structured service with clear modules, one database and one deploy. I extract a service when a component has different scaling needs, such as a build worker or an AI processing pipeline, or when a separate team will own it. Splitting early adds network failures and deploy coordination for little gain.",
      },
    ],
    serviceType: "Node.js development",
  },

  // ────────────────────────────── Full stack ───────────────────────────────
  {
    slug: "full-stack-developer",
    group: "developer",
    navLabel: "Full Stack Developer",
    cardBlurb:
      "One developer across React, Next.js, Node.js APIs, PostgreSQL, MongoDB, Redis, Docker and AWS, with shared types holding the layers together.",
    icon: "layers",
    metaTitle: "Full Stack Developer: React, Node.js and AWS",
    metaDescription:
      "Full stack developer who designs the whole path: Next.js and React UI, Node.js APIs, PostgreSQL, MongoDB and Redis, Docker images and AWS deployments.",
    eyebrow: "Full Stack Developer · Bengaluru",
    h1: "Full Stack Developer Across the Browser, API, Data and Cloud",
    intro:
      "I build every layer of a web product and, just as importantly, the contracts between them: shared types, one auth model and a pipeline that ships frontend and backend together.",
    summary: [
      "I build every layer of a web product: React and Next.js in the browser, Node.js APIs, PostgreSQL, MongoDB and Redis, and Docker images on AWS.",
      "Shared Zod schemas in a monorepo give the frontend and API the same types, so a changed response shape fails type-checking in the same pull request.",
      "One auth flow covers the stack: the API issues httpOnly cookie tokens that Next.js and the API both verify, and permissions are enforced beside the data.",
      "One pipeline lints, type-checks, tests and builds every package, with preview environments per pull request and versioned images that make rollback straightforward.",
    ],
    highlights: [
      "One owner across layers",
      "Shared types end to end",
      "Single auth model",
      "One deploy pipeline",
    ],
    diagram: {
      title: "The full stack, layer by layer",
      caption:
        "How a request travels through the systems I build, and where each concern lives.",
      steps: [
        "Browser",
        "Next.js / React",
        "Node.js APIs",
        "PostgreSQL, MongoDB, Redis",
        "Docker",
        "AWS",
      ],
    },
    sections: [
      {
        id: "architecture",
        heading: "The architecture, from browser to AWS",
        body: [
          "A request starts in the browser, where React components render and handle interaction. Next.js serves those pages, rendering on the server where it helps and managing sessions. Business logic lives in Node.js APIs, which read and write PostgreSQL for relational data, MongoDB for documents and Redis for caching and queues. Each piece is packaged as a Docker image and runs on AWS.",
          "Knowing every layer lets me put each concern where it belongs. Display formatting stays near the UI, validation happens at every boundary, permissions are enforced in the API and aggregation is pushed into the database instead of looping over rows in JavaScript.",
        ],
        points: [
          {
            title: "Browser",
            text: "Interactive React components, optimistic updates and accessible markup.",
          },
          {
            title: "Next.js / React",
            text: "Routing, server rendering, metadata and session-aware pages.",
          },
          {
            title: "Node.js APIs",
            text: "Business rules, authorisation, integrations and job dispatch.",
          },
          {
            title: "Data",
            text: "PostgreSQL for transactions, MongoDB for documents, Redis for speed and queues.",
          },
          {
            title: "Docker and AWS",
            text: "Reproducible images on ECS, files on S3, event handlers on Lambda.",
          },
        ],
      },
      {
        id: "contracts-and-types",
        heading: "Contracts and types across the boundary",
        body: [
          "The seam between frontend and backend is where full stack bugs hide: a field renamed on one side, a nullable value the UI assumes is always present, a date sent as a string and parsed inconsistently. I define request and response schemas once with Zod in a shared package, infer TypeScript types from them and validate at runtime on both ends.",
          "In a monorepo, the Next.js app and the Node.js API import the same schema package, and Prisma generates types for the database layer. A breaking change to a response shape fails type-checking in the frontend within the same pull request, which is far cheaper than finding it in production.",
        ],
        links: [{ label: "TypeScript developer", href: "/typescript-developer" }],
      },
      {
        id: "auth-flow",
        heading: "One auth flow across every layer",
        body: [
          "Auth is designed once for the whole system. A user signs in through the Next.js app, the API issues a short-lived access token and a rotating refresh token in httpOnly cookies, and both the Next.js server and the API verify the same token. Redis can hold sessions or a revocation list when immediate logout across devices is a requirement.",
          "Permissions are checked in the API, next to the data, not only by hiding buttons. The frontend asks the API what the current user may do and renders accordingly, but the API makes the final call on every request. Tenancy is enforced inside queries, so one organisation can never read another's rows.",
        ],
        points: [
          {
            title: "Sign-in",
            text: "Credentials or OAuth, handled through the Next.js app.",
          },
          {
            title: "Tokens",
            text: "Short-lived access, rotating refresh, httpOnly cookies.",
          },
          {
            title: "Verification",
            text: "The same token checked by Next.js server code and by the API.",
          },
          {
            title: "Authorisation",
            text: "Policy checks and tenant scoping in the API layer.",
          },
        ],
      },
      {
        id: "data-layer",
        heading: "Choosing the data layer",
        body: [
          "I pick databases by access pattern. PostgreSQL handles anything with relationships and transactions: accounts, subscriptions, orders. MongoDB suits records whose shape varies or grows, such as build logs, parsed documents or event payloads. Redis serves hot reads, rate limits, sessions and job queues. A vector store like Qdrant is a separate decision, made only when the product has AI retrieval features.",
          "Schema changes are migrations in version control, run by the pipeline before the new API version takes traffic. I write them to stay backward compatible for one release, so rolling back the application never forces a rollback of the database.",
        ],
      },
      {
        id: "deploys",
        heading: "Deploying frontend and backend together",
        body: [
          "Each service builds into a Docker image in CI. GitHub Actions or GitLab CI runs lint, type-checks and tests across the monorepo, builds only what changed, pushes images to ECR and rolls out on ECS. The Next.js app can go to Vercel or run as a container beside the API, depending on the client's infrastructure preferences.",
          "Preview environments per pull request let reviewers click through a change that touches the UI, the API and a migration at once. Health checks and staged rollouts mean a bad release fails before it reaches every user, and because images are versioned in ECR, rolling back is a matter of pointing the service at the previous tag.",
        ],
        points: [
          {
            title: "One pipeline",
            text: "Lint, type-check, test and build for every package.",
          },
          {
            title: "Changed-only builds",
            text: "Monorepo tooling skips untouched services.",
          },
          {
            title: "Preview environments",
            text: "Full-stack previews for each pull request.",
          },
          {
            title: "Safe rollouts",
            text: "Health checks gate traffic to new tasks.",
          },
        ],
        links: [{ label: "AWS developer", href: "/aws-developer" }],
      },
      {
        id: "why-one-owner",
        heading: "Why one full stack owner helps",
        body: [
          "When frontend and backend are built by different people, a lot of effort goes into negotiating contracts and waiting on each other. As a full stack developer, I can change an API response and the component that renders it in one pull request, and I notice when a UI requirement is really a data modelling problem in disguise.",
          "That doesn't mean the system depends on me forever. I document decisions, keep the layers cleanly separated and write the code so a specialist can take over one layer later without reverse-engineering the rest. Clear module boundaries, typed contracts and a short architecture note in the repository do most of that work.",
        ],
        links: [
          { label: "SaaS development", href: "/saas-development" },
          { label: "Full stack developer in Bangalore", href: "/full-stack-developer-bangalore" },
        ],
      },
      {
        id: "in-real-projects",
        heading: "What this looks like in real projects",
        body: [
          "My Vercel-style deployment platform touches every layer: a Next.js dashboard, GitHub OAuth, a Node.js API that queues builds, Docker-based build workers, MongoDB for build records and logs streamed back to the browser. The chat-with-pdf app follows a similar shape with AI in the middle: uploads go to storage, a background job chunks and embeds them, and answers stream to the UI with citations.",
          "In both, the hard parts were at the boundaries: keeping job status consistent between the worker, the database and the UI, and making sure a failure in one layer surfaced as a clear message in another. A build that crashed in a worker had to appear in the dashboard as a failed build with its logs, not as a spinner that never stopped.",
        ],
      },
    ],
    stack: [
      { group: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
      { group: "Backend", items: ["Node.js", "Express", "FastAPI", "GraphQL"] },
      { group: "Data", items: ["PostgreSQL", "Prisma", "MongoDB", "Redis"] },
      { group: "Infrastructure", items: ["Docker", "AWS ECS, ECR and S3", "GitHub Actions", "Vercel"] },
    ],
    projects: ["vercel-clone", "chat-with-pdf", "blog-automation", "ai-avatar"],
    related: [
      "nextjs-developer",
      "nodejs-developer",
      "saas-development",
      "full-stack-developer-bangalore",
      "web-application-development",
    ],
    faqs: [
      {
        q: "Is one full stack developer enough for my product, or do I need a team?",
        a: "For an MVP or a product in early growth, one full stack developer can own the whole system coherently. As usage grows you'll likely want specialists, for example a designer, a dedicated DevOps engineer or more developers on the frontend. I structure the code so adding those people is straightforward rather than a rewrite.",
      },
      {
        q: "Do you use a monorepo?",
        a: "Usually, for products where the frontend and API are developed together. A monorepo with a shared schema package keeps types in sync, lets one pull request change both sides and simplifies CI. If the API will serve many independent clients, or teams deploy on very different schedules, separate repositories with a published contract can make more sense.",
      },
      {
        q: "Which database will you use?",
        a: "It depends on your data. Relational data with transactions goes in PostgreSQL. Flexible, document-shaped records can go in MongoDB. Redis is for caching, sessions and queues, not the primary store. Plenty of products need only PostgreSQL plus Redis. I'll explain the reasoning for your case rather than picking whatever is fashionable this year.",
      },
      {
        q: "How do you stop the frontend and backend drifting apart?",
        a: "Shared Zod schemas that produce both TypeScript types and runtime validators, imported by the Next.js app and the Node.js API. CI type-checks the whole monorepo, so a changed response shape breaks the build in the same pull request. Integration tests then exercise the real API from the client's point of view.",
      },
      {
        q: "Can you work alongside my existing backend team?",
        a: "Yes. In that setup I usually own the frontend and the Next.js server layer, and collaborate on the API contract. Because I understand the backend, I can write precise change requests, propose schemas and, if your team is comfortable with it, open the backend pull request myself.",
      },
    ],
    serviceType: "Full stack web development",
  },

  // ─────────────────────────────── Frontend ────────────────────────────────
  {
    slug: "frontend-developer",
    group: "developer",
    navLabel: "Frontend Developer",
    cardBlurb:
      "Framework-agnostic UI craft: design systems, accessibility, Core Web Vitals, purposeful motion, Tailwind and shadcn/ui, plus Angular.",
    icon: "layout",
    metaTitle: "Frontend Developer for Accessible, Fast Interfaces",
    metaDescription:
      "Frontend developer focused on UI engineering: design systems, WCAG accessibility, Core Web Vitals, disciplined motion, Tailwind, shadcn/ui and Angular work.",
    eyebrow: "Frontend Developer · Bengaluru",
    h1: "Frontend Developer for Accessible, Fast, Well-Built Interfaces",
    intro:
      "I care about the parts of an interface people feel directly: keyboard and screen reader support, layouts that don't jump, motion that clarifies rather than distracts, and a design system that keeps it all consistent.",
    summary: [
      "I focus on framework-independent UI engineering: semantic HTML, design systems, accessibility, motion and loading performance, in React, Next.js or Angular codebases.",
      "Design systems start from tokens as CSS variables mapped into Tailwind, with editable shadcn/ui primitives and composed patterns such as tables and empty states.",
      "I build toward WCAG 2.2 AA from the start, combining axe scans with manual keyboard and screen reader passes and respecting reduced-motion preferences.",
      "Core Web Vitals work targets the measured cause: prioritised hero media for LCP, reserved space for CLS, and shorter main-thread tasks for INP.",
    ],
    highlights: [
      "Design systems and tokens",
      "Accessibility built in",
      "Core Web Vitals",
      "Angular and React",
    ],
    diagram: {
      title: "From design file to shipped UI",
      caption:
        "The order I build interfaces in, so consistency comes from the system rather than from effort.",
      steps: [
        "Extract design tokens",
        "Build primitives",
        "Compose patterns",
        "Assemble screens",
        "Audit accessibility",
        "Measure Web Vitals",
      ],
    },
    sections: [
      {
        id: "ui-engineering",
        heading: "UI engineering beyond the framework",
        body: [
          "Frameworks change; the problems of interface engineering don't. Semantic HTML, a predictable focus order, CSS that copes with long names and missing images, forms that explain errors clearly and pages that work on a slow phone are the same whether the code is React, Angular or server templates. That layer is where I focus as a frontend developer.",
          "I treat edge cases as part of the design: empty lists, very long content, right-to-left text, slow responses and denied permissions. Building those states deliberately is most of what separates an interface that looks finished in a screenshot from one that holds up in daily use.",
        ],
      },
      {
        id: "design-systems",
        heading: "Design systems that people actually use",
        body: [
          "A design system starts with tokens: colour, spacing, radius, typography and shadow values expressed as CSS variables and mapped into the Tailwind theme. Light and dark modes become a token swap rather than a second set of styles. On top of the tokens sit primitives, and on top of those, composed patterns such as data tables, filter bars and empty states.",
          "I usually build on shadcn/ui because its components are copied into the codebase and fully editable, and they sit on Radix primitives with dependable accessibility behaviour. Variants are defined through a small API, so a button has a handful of intentional options rather than arbitrary class overrides scattered around the app.",
        ],
        points: [
          {
            title: "Tokens first",
            text: "One source of truth for colour, spacing and type, themed through CSS variables.",
          },
          {
            title: "Editable primitives",
            text: "shadcn/ui components owned by the project, not locked inside a package.",
          },
          {
            title: "Constrained variants",
            text: "Size and intent options defined up front to prevent visual drift.",
          },
          {
            title: "Documented by example",
            text: "Reference pages that show every state of each component.",
          },
        ],
      },
      {
        id: "accessibility",
        heading: "Accessibility as a build requirement",
        body: [
          "I build toward WCAG 2.2 AA from the start, because retrofitting accessibility is slower and less reliable. That means native elements before ARIA, visible focus styles, labels tied to every input, sufficient contrast in both themes, and error messages announced to screen readers. Modals trap focus and restore it on close; menus respond to arrow keys.",
          "Testing combines automated checks with axe for the obvious failures and manual passes with a keyboard and a screen reader for the rest, since tools only catch part of the problem. Reduced-motion preferences are respected anywhere animation appears, and I check zoom up to 200 percent and narrow viewports, where overlapping text and clipped controls tend to appear first.",
        ],
        points: [
          {
            title: "Keyboard first",
            text: "Every action reachable and operable without a mouse.",
          },
          {
            title: "Screen reader checks",
            text: "Landmarks, headings and live regions verified by hand.",
          },
          {
            title: "Contrast in both themes",
            text: "Tokens chosen to pass in light and dark modes.",
          },
          {
            title: "Motion preferences",
            text: "prefers-reduced-motion honoured across the interface.",
          },
        ],
      },
      {
        id: "core-web-vitals",
        heading: "Core Web Vitals and perceived speed",
        body: [
          "Largest Contentful Paint usually comes down to the hero image or headline, so I size and prioritise that image, preload the key font and avoid hiding main content behind client-side JavaScript. Cumulative Layout Shift goes away when images and embeds have reserved space and web fonts use size-matched fallbacks.",
          "Interaction to Next Paint is the hardest metric to fix late. It suffers when long tasks block the main thread, so I break up heavy work, defer third-party scripts, avoid large re-renders on input and keep event handlers light. I look at field data from real users where it exists, not only a single lab run.",
        ],
        points: [
          {
            title: "LCP",
            text: "Prioritised hero media, preloaded fonts, server-rendered content.",
          },
          {
            title: "CLS",
            text: "Reserved space for media and size-matched font fallbacks.",
          },
          {
            title: "INP",
            text: "Short tasks, deferred third parties and light handlers.",
          },
        ],
        links: [{ label: "Next.js developer", href: "/nextjs-developer" }],
      },
      {
        id: "motion",
        heading: "Animation discipline with Framer Motion",
        body: [
          "Motion should explain something: where a panel came from, what changed after an action, which item left a list. I use Framer Motion for layout transitions, shared element animation and enter and exit animations, and keep durations short so the interface never waits on its own animations before responding.",
          "I animate transform and opacity rather than layout properties, which keeps the work on the compositor and off the main thread. Every animated component has a reduced-motion path, and decorative motion stays on marketing pages rather than in the core product, where speed matters more than flourish.",
        ],
      },
      {
        id: "tailwind",
        heading: "Tailwind CSS without the mess",
        body: [
          "Tailwind works well when it's constrained. I extend the theme with project tokens instead of reaching for arbitrary values, extract repeated class combinations into components rather than long @apply chains, and use a class-merging helper so variants and overrides compose predictably. Container queries handle components that appear in both narrow sidebars and wide content areas.",
          "The result is CSS that's easy to delete. Styles live next to the markup they affect, there are no orphaned global selectors, and the production stylesheet contains only the utilities the templates actually use. New developers can read a component and see exactly how it looks without opening a separate stylesheet.",
        ],
        links: [{ label: "React developer", href: "/react-developer" }],
      },
      {
        id: "angular",
        heading: "Angular experience alongside React",
        body: [
          "I've also built with Angular, which matters for teams maintaining enterprise front ends. Angular's opinionated structure, dependency injection, RxJS streams and typed reactive forms solve the same problems React solves with libraries, and the UI engineering principles carry over unchanged: accessible components, a shared design system and performance measured in the browser.",
          "That background helps with mixed estates, where an older Angular app and a newer React or Next.js app need to look and behave like one product. A shared token layer in CSS variables lets both render the same brand without duplicating design decisions.",
        ],
        links: [
          { label: "TypeScript developer", href: "/typescript-developer" },
          { label: "Web application development", href: "/web-application-development" },
        ],
      },
    ],
    stack: [
      { group: "Foundations", items: ["HTML", "CSS", "TypeScript", "JavaScript"] },
      { group: "Styling", items: ["Tailwind CSS", "shadcn/ui", "Framer Motion"] },
      { group: "Frameworks", items: ["React", "Next.js", "Angular"] },
      { group: "Quality", items: ["WCAG 2.2", "axe", "Core Web Vitals"] },
    ],
    projects: ["resume-analyzer", "ai-avatar", "vercel-clone"],
    related: [
      "react-developer",
      "nextjs-developer",
      "typescript-developer",
      "web-application-development",
      "react-developer-bangalore",
    ],
    faqs: [
      {
        q: "How is this different from hiring a React developer?",
        a: "React work is about React-specific decisions: state, hooks, component architecture and data fetching. Frontend work covers the layer underneath, which applies to any framework: accessibility, CSS architecture, design systems, motion and loading performance. Most projects need both and I do both, but this is the part that often gets skipped under deadline pressure.",
      },
      {
        q: "Can you turn our Figma file into a design system?",
        a: "Yes. I extract tokens from the file first, flag inconsistencies such as seven slightly different greys, and agree a reduced set with the designer. Then I build primitives and patterns in code, with each component's states visible on a reference page. Screens are assembled from the system afterwards, which keeps new pages consistent.",
      },
      {
        q: "Will you make our existing site accessible?",
        a: "I can audit it and fix it. The audit combines automated scans with keyboard and screen reader testing, and produces a prioritised list: blockers such as unreachable controls first, then labelling, contrast and focus issues. Fixes tend to concentrate in shared components, so repairing a dozen primitives often resolves problems across many screens.",
      },
      {
        q: "Do animations hurt performance?",
        a: "They can, if they animate layout properties or run constantly. Animating transform and opacity keeps work on the GPU compositor, and short, purposeful transitions add little cost. I also lazy-load animation code for marketing sections and honour reduced-motion settings, so people who don't want motion don't pay for it.",
      },
      {
        q: "Do you still take on Angular projects?",
        a: "Yes, particularly maintenance and feature work on existing Angular applications, and projects where Angular and React apps need a shared visual language. For brand-new builds I usually recommend React with Next.js because of its ecosystem, but I'll work in whichever framework your team already knows and maintains.",
      },
    ],
    serviceType: "Frontend development",
  },

  // ──────────────────────────────── Backend ────────────────────────────────
  {
    slug: "backend-developer",
    group: "developer",
    navLabel: "Backend Developer",
    cardBlurb:
      "Language-agnostic backend engineering: data models, API contracts, auth, caching, queues, observability and tests in Node.js or FastAPI.",
    icon: "database",
    metaTitle: "Backend Developer for Data, APIs and Reliability",
    metaDescription:
      "Backend developer for data modelling, API design, auth, caching, queues, observability and testing, building services in Node.js or in Python with FastAPI.",
    eyebrow: "Backend Developer · Bengaluru",
    h1: "Backend Developer for Well-Modelled Data and Reliable APIs",
    intro:
      "Backend engineering is mostly decisions that outlive the code: how data is modelled, what the API promises, where caches sit and how you find out something broke. I make those decisions in Node.js or Python, whichever suits the job.",
    summary: [
      "I start backend work with the data model, mapping entities and the most frequent queries before designing endpoints, indexes, tenant keys and migrations.",
      "APIs are designed as contracts in OpenAPI, with machine-readable error codes, idempotency keys on create operations and additive changes instead of breaking ones.",
      "I build services in Node.js for I/O-heavy and real-time APIs, or in Python with FastAPI when the work sits close to data or AI libraries.",
      "Structured logs, latency and error metrics, tracing and symptom-based alerts ship with the first release, and integration tests run against a real database.",
    ],
    highlights: [
      "Data modelling first",
      "Node.js and FastAPI",
      "Caching and queues",
      "Observability built in",
    ],
    diagram: {
      title: "Where backend decisions sit",
      caption:
        "The questions I answer, roughly in this order, before a service goes to production.",
      steps: [
        "Model the data",
        "Design the contract",
        "Secure access",
        "Cache hot paths",
        "Offload slow work",
        "Instrument and test",
      ],
    },
    sections: [
      {
        id: "data-modelling",
        heading: "Data modelling before endpoints",
        body: [
          "The schema is the hardest thing to change later, so I start there. I map entities, relationships and the queries the product will run most often, then decide what needs foreign keys and transactions, what can be denormalised for reads and what belongs in a separate store. Soft deletes, audit fields and tenant keys are settled up front, not added after an incident.",
          "Indexes follow real query patterns rather than hunches. I read query plans for the slow paths and prefer a composite index or a small summary table over caching a query that should simply be faster. Caches added to hide a missing index tend to create consistency bugs later, while the index fixes the cause.",
        ],
        points: [
          {
            title: "Access patterns first",
            text: "List the queries before drawing the tables.",
          },
          {
            title: "Constraints in the database",
            text: "Uniqueness, foreign keys and checks enforced where application code can't bypass them.",
          },
          {
            title: "Tenant keys everywhere",
            text: "Every row scoped to its organisation from day one.",
          },
          {
            title: "Migrations reviewed like code",
            text: "Backward-compatible changes, one release at a time.",
          },
        ],
      },
      {
        id: "api-design",
        heading: "API design as a contract",
        body: [
          "An API is a promise to every client that calls it. I settle resource names, error formats, pagination and versioning before implementation and record them in an OpenAPI description. Errors carry machine-readable codes alongside human messages. Endpoints that create records or move money accept idempotency keys, so a network retry can't produce duplicates.",
          "Breaking changes are avoided by adding fields rather than altering them, and deprecations come with a timeline. For internal consumers I prefer typed clients generated from the spec, so producer and consumer can't quietly disagree about a payload. The spec doubles as documentation for partners, which avoids a separate document drifting out of date.",
        ],
        links: [{ label: "API development", href: "/api-development" }],
      },
      {
        id: "node-or-fastapi",
        heading: "Node.js or FastAPI: picking the runtime",
        body: [
          "I build backends in both Node.js and Python with FastAPI, and the choice follows the work. Node.js with TypeScript suits I/O-heavy APIs, real-time features and teams sharing types with a TypeScript frontend. FastAPI fits services close to data or AI work, such as document processing and embedding pipelines, where Python's libraries are the main reason to be there.",
          "The engineering stays the same in both: layered code, validated input (Zod in Node, Pydantic in FastAPI), typed responses, dependency injection for testability and shared conventions for logging and errors. A system can mix them, with a Node.js API handing work to a FastAPI service over HTTP or a queue.",
        ],
        links: [
          { label: "Node.js developer", href: "/nodejs-developer" },
          { label: "Python developer", href: "/python-developer" },
        ],
      },
      {
        id: "auth-and-caching",
        heading: "Authentication, authorisation and caching",
        body: [
          "Authentication identifies the caller, using sessions, JWTs or API keys depending on the kind of client. Authorisation is a separate, explicit policy layer evaluated on every request against the specific resource, with role and tenant checks close to the data. Service-to-service calls get their own credentials instead of borrowing a user's token.",
          "Caching comes after the query is as fast as it reasonably can be. I use cache-aside reads in Redis with TTLs matched to how stale each kind of data is allowed to be, invalidate on writes where correctness matters and guard against stampedes when a popular key expires. HTTP cache headers cover public responses.",
        ],
        points: [
          {
            title: "Explicit policies",
            text: "Permission checks written in code, not implied by routing.",
          },
          {
            title: "Scoped credentials",
            text: "Separate keys for services, users and integrations.",
          },
          {
            title: "A staleness budget",
            text: "TTLs chosen per data type rather than one global number.",
          },
        ],
      },
      {
        id: "queues-observability",
        heading: "Queues and observability",
        body: [
          "Work that is slow, flaky or rate-limited goes on a queue with retries, backoff and a dead-letter destination. Handlers are idempotent, and job state is stored so the product can show progress and support staff can see what happened to a specific request without reading raw logs.",
          "Observability is part of the first release. Logs are structured JSON with request and job IDs, metrics cover latency, error rate and queue depth, and traces follow a request across services. Alerts fire on symptoms users would notice, such as a rising error rate, rather than on every brief CPU spike.",
        ],
        points: [
          {
            title: "Structured logs",
            text: "Searchable fields, correlation IDs and no secrets.",
          },
          {
            title: "Key metrics",
            text: "Latency percentiles, error rates, queue depth and job age.",
          },
          {
            title: "Tracing",
            text: "Requests followed across API, worker and database.",
          },
          {
            title: "Useful alerts",
            text: "Paging only on user-visible symptoms.",
          },
        ],
      },
      {
        id: "testing",
        heading: "Testing the backend",
        body: [
          "Unit tests cover business rules in the service layer, where logic is pure and fast to exercise. Integration tests run the API against a real PostgreSQL or MongoDB instance in a container, because mocked databases hide the bugs that matter: constraint violations, transaction boundaries and subtle query mistakes. Contract tests check that responses still match the published schema.",
          "CI runs the full suite on every pull request, and migrations are applied to a fresh database as part of the pipeline, so a broken migration never reaches staging. Test data is built with small factories rather than shared fixtures, which keeps each test readable and independent of the order the suite runs in.",
        ],
      },
      {
        id: "backend-in-practice",
        heading: "Backend work in my projects",
        body: [
          "The blog automation pipeline is mostly backend: a multi-stage job flow from topic discovery through generation to publishing, with Qdrant used to catch near-duplicate articles and suggest internal links, and a human review step before anything goes live. My deployment platform project is a queue-driven build system with isolated workers and streamed logs.",
          "Both taught the same lesson: the hard parts are state and failure. Knowing exactly where a job is, what happens when a step fails halfway and how to retry without side effects matters more than which framework handles the HTTP layer.",
        ],
        links: [{ label: "Blog automation case study", href: "/projects/blog-automation" }],
      },
    ],
    stack: [
      { group: "Languages", items: ["TypeScript", "Node.js", "Python"] },
      { group: "Frameworks", items: ["Express", "FastAPI", "GraphQL"] },
      { group: "Data", items: ["PostgreSQL", "MongoDB", "Redis", "Qdrant", "Prisma"] },
      { group: "Operations", items: ["Docker", "AWS", "GitHub Actions", "GitLab CI/CD"] },
    ],
    projects: ["blog-automation", "vercel-clone", "chat-with-pdf"],
    related: [
      "nodejs-developer",
      "python-developer",
      "api-development",
      "full-stack-developer",
      "aws-developer",
    ],
    faqs: [
      {
        q: "How is this different from your Node.js developer page?",
        a: "The Node.js page is about the runtime: Express structure, the event loop, Socket.io and Node-specific tooling. This page is about backend engineering regardless of language: how data is modelled, how APIs are versioned, how caching and queues are designed and how a system is observed in production. Those decisions hold whether the service runs on Node.js or FastAPI.",
      },
      {
        q: "Can you redesign a database schema the product has outgrown?",
        a: "Yes. I start by profiling the slowest and most frequent queries, then look at where the current schema forces workarounds in application code. Changes are planned as a sequence of backward-compatible migrations, sometimes with dual writes during a transition, so the application keeps running while the data model improves underneath it.",
      },
      {
        q: "When should the backend be Python instead of Node.js?",
        a: "When the service depends on Python-first libraries, typically for machine learning, document parsing or data processing, or when the team maintaining it works in Python. For general product APIs either works well. Mixing them is fine if the boundary between services is clear and both follow the same conventions for errors, logging and auth.",
      },
      {
        q: "Do you set up monitoring, or just write the code?",
        a: "Both. Structured logging, core metrics and health checks ship with the first version, wired into whatever your team already uses, such as CloudWatch on AWS or an external logging service. A service that can't tell you it's failing isn't finished, so I treat instrumentation as part of the feature rather than a later ticket.",
      },
      {
        q: "How much test coverage do you aim for?",
        a: "I aim for coverage of risk, not a percentage. Business rules, auth checks, payment-like flows and data migrations get thorough tests; thin glue code gets fewer. Integration tests against a real database carry a lot of weight, because they catch the errors that unit tests with mocked dependencies tend to miss.",
      },
    ],
    serviceType: "Backend development",
  },

  // ────────────────────────────── TypeScript ───────────────────────────────
  {
    slug: "typescript-developer",
    group: "developer",
    navLabel: "TypeScript Developer",
    cardBlurb:
      "Strict TypeScript with Zod-checked boundaries, Prisma-generated types, shared monorepo contracts and gradual migrations from JavaScript.",
    icon: "file-code",
    metaTitle: "TypeScript Developer for Type-Safe Full Stack Apps",
    metaDescription:
      "TypeScript developer for strict-mode codebases, Zod-validated API boundaries, Prisma types, shared monorepo packages and gradual JavaScript migrations.",
    eyebrow: "TypeScript Developer · Bengaluru",
    h1: "TypeScript Developer for Strict, Type-Safe Codebases",
    intro:
      "I use TypeScript to make wrong states hard to write: strict compiler settings, runtime validation at every boundary, and types shared between the database, the API and the UI.",
    summary: [
      "Every project I start runs TypeScript strict mode plus noUncheckedIndexedAccess, prefers unknown over any, and backs the rules with ESLint instead of reviewer attention.",
      "Data is parsed with Zod at every boundary, including request bodies, environment variables, webhooks and model output, with the TypeScript type inferred from that schema.",
      "In a monorepo, a shared package holds the API and event schemas, so the Next.js app, Node.js API and workers all compile against one contract.",
      "I migrate JavaScript to TypeScript gradually with allowJs, converting API handlers and data access first and raising strictness folder by folder alongside feature work.",
    ],
    highlights: [
      "Strict mode by default",
      "Zod at every boundary",
      "Shared monorepo types",
      "Gradual JS migration",
    ],
    diagram: {
      title: "Where types come from",
      caption:
        "In a well-typed stack, each layer derives its types from one source instead of redeclaring them.",
      steps: [
        "Prisma schema",
        "Generated database types",
        "Zod API schemas",
        "Inferred request types",
        "Typed API client",
        "Typed UI props",
      ],
    },
    sections: [
      {
        id: "strict-mode",
        heading: "Strict mode, and the flags beyond it",
        body: [
          "Every project I start has strict enabled, plus noUncheckedIndexedAccess so array and record lookups admit they might return undefined, and exactOptionalPropertyTypes where the codebase can support it. These flags catch a class of bugs that plain strict mode lets through, mostly around missing data the code assumed would be there.",
          "I avoid any, and when a value is truly unknown I type it as unknown and narrow it. Assertions with 'as' are treated as a smell that needs a comment explaining why the compiler can't prove what we know. ESLint rules back this up, so the standard doesn't depend on reviewer attention on a busy day.",
        ],
        points: [
          {
            title: "strict: true",
            text: "The baseline, never switched off to make errors disappear.",
          },
          {
            title: "noUncheckedIndexedAccess",
            text: "Lookups return possibly undefined values, as they do at runtime.",
          },
          {
            title: "unknown over any",
            text: "Untrusted values narrowed before use.",
          },
          {
            title: "Lint-enforced",
            text: "Rules against floating promises and unsafe any.",
          },
        ],
      },
      {
        id: "api-boundaries",
        heading: "Type-safe API boundaries with Zod",
        body: [
          "TypeScript types vanish at runtime, so they can't protect you from a malformed request body or a third-party API that changes its response. At every boundary I parse data with a Zod schema and infer the TypeScript type from that schema. The type and the validator can't drift apart, because one is derived from the other.",
          "This covers request bodies, query strings, environment variables, webhook payloads, structured LLM output and responses from external services. Invalid data fails loudly at the edge with a useful error, instead of travelling deep into the system and breaking somewhere confusing.",
        ],
        points: [
          {
            title: "Request input",
            text: "Bodies and params parsed before handlers run.",
          },
          {
            title: "Environment config",
            text: "Validated at startup, typed everywhere after.",
          },
          {
            title: "External responses",
            text: "Third-party and model output checked before use.",
          },
        ],
        links: [{ label: "API development", href: "/api-development" }],
      },
      {
        id: "prisma-types",
        heading: "Prisma types from the database up",
        body: [
          "Prisma generates types directly from the schema, so a query's return type reflects exactly the fields and relations it selects. I rely on that instead of writing parallel interfaces by hand. When a column becomes nullable or a relation is added, the generated types change and the compiler lists every place that needs attention.",
          "I keep Prisma types inside the data layer, though. The API exposes its own schemas shaped for clients, so internal columns such as password hashes or soft-delete flags never leak into a response type by accident. The mapping from database row to API shape is one explicit function per resource, which is also where computed fields are added.",
        ],
      },
      {
        id: "monorepo-types",
        heading: "Shared types across the monorepo",
        body: [
          "In a monorepo, a shared package holds the Zod schemas and inferred types for the API contract. The Next.js frontend, the Node.js API and any background workers import from it, and project references keep type-checking fast. A contract change becomes a single pull request where every consumer either compiles or shows exactly what broke.",
          "Event payloads for queues and WebSockets live in the same package, so a worker and the process that enqueues its jobs agree on the shape. This is where TypeScript pays off most in full stack work: at the boundaries between processes, not inside a single function.",
        ],
        links: [{ label: "Full stack developer", href: "/full-stack-developer" }],
      },
      {
        id: "js-to-ts-migration",
        heading: "Migrating JavaScript to TypeScript",
        body: [
          "I migrate existing JavaScript gradually rather than through a big rewrite. First comes a tsconfig with allowJs enabled, so TypeScript and JavaScript files compile side by side. Then I convert the riskiest edges: API handlers, data access and shared utilities. Strictness is raised directory by directory as each area is cleaned up.",
          "Along the way, JSDoc annotations can type files not yet converted, and @ts-expect-error comments mark known gaps with a reason attached so they can be tracked. Feature work continues throughout; the migration rides along with normal pull requests instead of blocking them.",
        ],
        points: [
          {
            title: "Coexist first",
            text: "JavaScript and TypeScript build together from day one.",
          },
          {
            title: "Edges before internals",
            text: "API, data and shared code converted early.",
          },
          {
            title: "Strictness ratchets",
            text: "Tighter settings per folder, never loosened again.",
          },
          {
            title: "Tracked exceptions",
            text: "Every suppression carries a written reason.",
          },
        ],
        links: [{ label: "JavaScript developer", href: "/javascript-developer" }],
      },
      {
        id: "generics",
        heading: "Generics, used carefully",
        body: [
          "Generics are useful when a function genuinely preserves a relationship between input and output types: a fetch wrapper that returns a schema's inferred type, a table component that knows its row shape, a repository helper for common queries. In those cases they remove duplication and keep call sites clean.",
          "They become a problem when the types are harder to read than the code they describe. I prefer a few well-named overloads or a plain union over a generic with conditional types nested three levels deep. If a teammate can't understand a signature within a minute, it probably needs simplifying.",
        ],
      },
      {
        id: "types-in-the-ui",
        heading: "TypeScript in the UI layer",
        body: [
          "In React and Next.js, a component with several modes gets a union type for its props, so impossible combinations fail to compile. Form types come from the same Zod schema that validates the submission, and Server Action results are typed as success or failure so the UI has to handle both branches. Hooks and context are typed where they're defined, never cast where they're used.",
          "The aim throughout is that editor autocomplete matches reality. When a developer types a dot after a variable, the suggestions should be exactly the fields that exist, with nothing marked optional that's always present and nothing required that can be missing.",
        ],
      },
    ],
    stack: [
      { group: "Language", items: ["TypeScript", "JavaScript"] },
      { group: "Types and validation", items: ["Zod", "Prisma", "Pydantic"] },
      { group: "Frameworks", items: ["Next.js", "React", "Node.js", "Express"] },
      { group: "Tooling", items: ["ESLint", "tsc project references", "GitHub Actions"] },
    ],
    projects: ["resume-analyzer", "vercel-clone", "chat-with-pdf"],
    related: [
      "javascript-developer",
      "full-stack-developer",
      "react-developer",
      "nodejs-developer",
      "nextjs-developer",
    ],
    faqs: [
      {
        q: "Is TypeScript worth it for a small project?",
        a: "Usually yes, if the project will be maintained for more than a few weeks or touched by more than one person. Setup cost is small with modern tooling, and the main benefit, catching mistakes when code changes, starts immediately. For a throwaway prototype plain JavaScript can be fine, although I still write most of those in TypeScript out of habit.",
      },
      {
        q: "Why use Zod if we already have TypeScript?",
        a: "TypeScript checks your code at compile time, but it has no idea what arrives over the network at runtime. Zod checks the actual data and gives you the TypeScript type from the same definition. Without runtime validation, a type annotation on an API response is just a hopeful comment that the compiler happens to trust.",
      },
      {
        q: "Can you migrate our JavaScript codebase without stopping feature work?",
        a: "Yes. The migration happens incrementally alongside normal work. TypeScript and JavaScript files coexist, the riskiest boundaries are converted first and strictness is tightened folder by folder. Each pull request leaves the codebase slightly more typed than before, and nothing needs a code freeze or a long-lived migration branch.",
      },
      {
        q: "How do you share types between frontend and backend?",
        a: "Through a shared package in a monorepo containing Zod schemas for requests, responses and events, with types inferred from them. Both the Next.js app and the Node.js services import that package. If the repositories are separate, I generate a typed client from an OpenAPI spec instead, which gives a similar guarantee with one extra build step.",
      },
      {
        q: "Do you write complex generic types?",
        a: "Only when they pay for themselves. A typed API client or a generic data table is worth a carefully designed signature. Deeply nested conditional types for small convenience gains usually aren't, because they slow down both the compiler and the next developer. Readable types that are slightly less clever tend to survive longer.",
      },
    ],
    serviceType: "TypeScript development",
  },
];
