import type { LandingPage } from "@/types/content";

/**
 * Solution-intent landing pages: buyers who want an outcome built.
 * Focus is scope, phases, deliverables, decisions, risks and next steps.
 */
export const solutionPages: LandingPage[] = [
  // ---------------------------------------------------------------------------
  // SaaS development
  // ---------------------------------------------------------------------------
  {
    slug: "saas-development",
    group: "solution",
    navLabel: "SaaS Development",
    cardBlurb:
      "From first scoping call to a deployed, monitored SaaS product: auth, tenancy, billing, dashboards and the jobs that run behind them.",
    icon: "layers",
    metaTitle: "SaaS Development: Build and Launch Your SaaS Product",
    metaDescription:
      "SaaS development from scoping to launch: multi-tenant architecture, auth and roles, subscription billing, dashboards, background jobs, AI features, monitoring.",
    eyebrow: "Solution · SaaS",
    h1: "SaaS development, from idea to a product customers pay for",
    intro:
      "I design and build SaaS products end to end: the tenant model, login and roles, billing, the core workflow your customers pay for, and the infrastructure that keeps it running after launch.",
    highlights: [
      "Multi-tenant by design",
      "Auth, roles and billing",
      "Jobs, monitoring, deploys",
      "AI features where useful",
    ],
    diagram: {
      title: "How a SaaS build moves",
      caption:
        "Each phase ends with something you can review: a scope document, a clickable build, a staging environment, then production.",
      steps: [
        "Scope the MVP",
        "Model tenants and data",
        "Auth and roles",
        "Core workflow",
        "Billing and plans",
        "Deploy and monitor",
        "Iterate on usage",
      ],
    },
    sections: [
      {
        id: "what-you-get",
        heading: "What you actually get at the end",
        body: [
          "A working SaaS product in your own accounts: the code in your Git repository, the database and hosting in your cloud or Vercel organisation, and billing connected to your payment provider. Nothing sits behind my login. You also get a written architecture note, environment setup instructions, and a short runbook covering deploys, rollbacks and where to look when something breaks.",
          "The product itself covers sign-up, workspaces, invitations, role-based access, the core feature set we scoped, an admin view for you, and subscription plans that gate features correctly. Each of those is tested against the scenarios we agreed in scoping, so you can check the build against a list rather than a vague impression.",
        ],
        points: [
          { title: "Source code", text: "TypeScript across the stack, in your repo, with CI running tests on every pull request." },
          { title: "Infrastructure", text: "Staging and production environments, set up in accounts you own and control." },
          { title: "Admin tooling", text: "An internal view to see tenants, subscriptions and usage without opening the database." },
          { title: "Documentation", text: "Architecture overview, local setup, deploy steps and a runbook for common incidents." },
        ],
      },
      {
        id: "architecture",
        heading: "The SaaS architecture decisions made early",
        body: [
          "Tenancy is the first decision because it touches every table. For most early products I use a shared PostgreSQL database with a tenant ID on every row, enforced in a data-access layer so no query can forget it. Schema-per-tenant or database-per-tenant makes sense when a customer contractually needs isolation, and I will say so if your market needs it.",
          "Around that sit authentication with sessions or JWTs, role-based access control scoped to a workspace, and a clear split between the Next.js app, the API layer and background workers. Keeping those boundaries clean early means a later mobile app or public API reuses the same rules instead of reimplementing them.",
        ],
        points: [
          { title: "Multi-tenant data", text: "Tenant ID on every record, checked centrally, with tests that try to read across tenants." },
          { title: "Multi-user workspaces", text: "Invitations, ownership transfer, and users who belong to more than one workspace." },
          { title: "RBAC", text: "Roles such as owner, admin and member, with permissions checked on the server, not only hidden in the UI." },
          { title: "APIs", text: "Typed REST or GraphQL endpoints that your own frontend and future integrations share." },
        ],
        links: [
          { label: "API development", href: "/api-development" },
          { label: "Backend developer", href: "/backend-developer" },
        ],
      },
      {
        id: "billing",
        heading: "Subscription-ready from the first release",
        body: [
          "Even if you launch free, the data model should know what a plan is. I build a plans and entitlements layer so features and limits are checked against the workspace's current subscription, not scattered if-statements. When you switch billing on, Stripe or Razorpay webhooks update that layer, and the app reacts to upgrades, downgrades, failed payments and cancellations without manual work.",
          "You decide the pricing model: per seat, per usage unit, flat tiers, or a mix. Each has consequences for metering and invoices. Usage pricing needs reliable event counting, per-seat pricing needs proration when teams grow mid-cycle, and we settle the model before building the billing screens.",
        ],
      },
      {
        id: "behind-the-scenes",
        heading: "Dashboards, background jobs and AI features",
        body: [
          "Customer dashboards need data that is quick to read, which often means pre-computed aggregates rather than heavy queries on every page load. Anything slow, such as imports, report generation, email sends or calls to an LLM, runs in a queue backed by Redis, with retries and a visible status so users are not left staring at a spinner.",
          "If AI belongs in your product, I integrate OpenAI, Gemini or OpenRouter behind a thin internal interface so you can change providers, track token cost per tenant, and put usage limits on each plan. That keeps one heavy customer from quietly consuming the margin of everyone else.",
        ],
        points: [
          { title: "Queues and workers", text: "Redis-backed jobs with retries, idempotency keys and dead-letter handling." },
          { title: "Scheduled tasks", text: "Nightly rollups, trial expiry emails and cleanup jobs on a schedule you can see." },
          { title: "AI integration", text: "Provider-agnostic calls, per-tenant cost tracking and plan-based limits." },
        ],
        links: [
          { label: "AI developer", href: "/ai-developer" },
          { label: "Automation development", href: "/automation-development" },
        ],
      },
      {
        id: "deploy-and-scale",
        heading: "Deployment, monitoring and scaling",
        body: [
          "The app deploys through GitHub Actions to Vercel or AWS, depending on what the workload needs. Long-running workers and anything that must stay warm usually go to AWS ECS in Docker containers, while the web app often stays on Vercel. Every deploy runs migrations in a controlled step, and preview environments let you review features before they reach customers.",
          "Monitoring covers errors, slow endpoints, queue depth and failed webhooks, with alerts routed to whoever is on call. Scaling for an early SaaS is mostly about indexes, caching and moving work off the request path, not about rewriting into microservices. Splitting services comes later, when a specific part of the system clearly needs it.",
        ],
      },
      {
        id: "risks",
        heading: "Risks, scope and what stays out",
        body: [
          "The common failure is building too much before anyone pays. I push for a first release that does one workflow well, with billing ready and everything else on a written backlog. Other risks I plan for: tenant data leaking through a missed filter, webhook events arriving twice or out of order, and AI costs growing faster than revenue.",
          "Out of scope unless agreed: native mobile apps, custom design systems from scratch, marketing site copywriting, and compliance certifications. I can prepare the technical groundwork for audits, such as access logs, encryption at rest and documented data flows, but the certification process itself sits with you.",
        ],
      },
      {
        id: "lets-build",
        heading: "Have a SaaS idea? Let's build it.",
        body: [
          "Bring what you have, even if it is rough: who the customer is, the one job they need done, how you plan to charge, any competitors you admire or dislike, and your launch deadline. Sketches, spreadsheets and recorded calls with potential users are all useful. On the first call we narrow that into a first release and I send a written scope with phases afterwards.",
        ],
        links: [
          { label: "Book a call", href: "/hire-me" },
          { label: "MVP development", href: "/mvp-development" },
        ],
      },
    ],
    stack: [
      { group: "App", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui"] },
      { group: "Backend", items: ["Node.js", "Express", "REST", "GraphQL", "JWT auth"] },
      { group: "Data", items: ["PostgreSQL", "Prisma", "Redis"] },
      { group: "AI", items: ["OpenAI", "Gemini", "OpenRouter"] },
      { group: "Infrastructure", items: ["Vercel", "AWS ECS", "Docker", "GitHub Actions"] },
    ],
    projects: ["vercel-clone", "resume-analyzer", "blog-automation"],
    related: ["mvp-development", "web-application-development", "api-development", "full-stack-developer", "nextjs-developer"],
    faqs: [
      {
        q: "Do I need multi-tenancy if I only have one customer so far?",
        a: "Usually yes, if you plan to sell to more than one company. Adding a tenant ID to every table later means touching every query and migrating live data. Building it in from the start costs a small amount of extra work. The exception is a product that will only ever serve a single organisation, which is closer to an internal tool.",
      },
      {
        q: "Which payment provider should I use?",
        a: "It depends on where your customers are and how you invoice. Stripe covers most international subscription needs. Razorpay is often simpler for Indian businesses billing in rupees. I build the entitlements layer so the provider sits behind webhooks, which keeps a later switch contained rather than spread through the codebase.",
      },
      {
        q: "Can you work from designs my designer already made?",
        a: "Yes. I build from Figma files and will flag early where a design implies expensive behaviour, such as real-time collaboration or complex permissions. If there is no designer, I use shadcn/ui and Tailwind to produce a clean, consistent interface, and you can bring a designer in later without a rebuild.",
      },
      {
        q: "Who owns the code and accounts?",
        a: "You do, from day one. The repository, cloud accounts, domain, database and payment provider are created under your organisation, and I am added as a collaborator. When the engagement ends you remove my access and nothing stops working, because there is no hosting or licence tied to me.",
      },
      {
        q: "What happens after launch?",
        a: "Launch is when real usage starts showing what to fix. I can stay on for a period of iteration, fixing issues and building the next features from your backlog, or hand over to your team with a walkthrough of the codebase and runbook. Both options are discussed before we start, not at the last minute.",
      },
    ],
    serviceType: "SaaS development",
  },

  // ---------------------------------------------------------------------------
  // MVP development
  // ---------------------------------------------------------------------------
  {
    slug: "mvp-development",
    group: "solution",
    navLabel: "MVP Development",
    cardBlurb:
      "A narrow first version that tests one real assumption, built on choices that will not force a rewrite when v2 arrives.",
    icon: "rocket",
    metaTitle: "MVP Development for Founders Testing an Idea",
    metaDescription:
      "MVP development with ruthless scoping: pick the one assumption to test, cut the rest, ship a usable product, measure it, hand over code ready for version two.",
    eyebrow: "Solution · MVP",
    h1: "MVP development that tests your idea without painting you into a corner",
    intro:
      "An MVP exists to answer a question, such as whether people will pay for this or use it weekly. I help you decide what that question is, build the smallest product that answers it, and keep the code in a state your next developer can extend.",
    highlights: [
      "Scoped around one question",
      "Written cut list",
      "Analytics from day one",
      "Clean handover",
    ],
    diagram: {
      title: "The build-measure loop",
      caption:
        "The first loop is the expensive one. Later loops reuse the same instrumentation and move faster.",
      steps: [
        "Name the assumption",
        "Cut to essentials",
        "Build and ship",
        "Measure real usage",
        "Decide next step",
      ],
    },
    sections: [
      {
        id: "ruthless-scoping",
        heading: "Ruthless scoping starts with one sentence",
        body: [
          "Before any feature list, we write down the single assumption the MVP must test. For example: operations managers at mid-size clinics will upload their rota and pay monthly to have conflicts flagged automatically. Every feature is then judged against that sentence. If a feature does not help a user reach the moment where the assumption is proven or broken, it goes on the later list.",
          "This is uncomfortable, because founders tend to see every feature as essential and each one has a story behind it. The written sentence gives us a neutral way to argue. Instead of debating whether a feature is good, we ask whether the test fails without it, which is a much easier question to answer honestly.",
        ],
      },
      {
        id: "what-to-cut",
        heading: "What usually gets cut, and what does not",
        body: [
          "Some things feel important but rarely change what an early user decides. Others look optional but cause real damage when skipped. I keep a standard cut list and adjust it for your market, since a product for hospitals and a product for hobbyists tolerate very different gaps. Everything cut is written down, so it is deferred rather than forgotten.",
        ],
        points: [
          { title: "Cut: settings pages", text: "Hard-code sensible defaults and change them by hand for the first users." },
          { title: "Cut: custom admin", text: "Use a database GUI or a single protected page until volume demands more." },
          { title: "Cut: every integration", text: "Pick the one integration the core workflow needs and defer the rest." },
          { title: "Keep: real auth", text: "Proper login and password reset, because users will not return to a hack." },
          { title: "Keep: analytics events", text: "Without them you cannot tell whether the assumption held." },
          { title: "Keep: backups", text: "Losing early user data kills trust faster than a missing feature." },
        ],
      },
      {
        id: "measure",
        heading: "Building the measure step into the product",
        body: [
          "An MVP without measurement is just a small product. I agree the few events that matter with you before building, such as signed up, completed first task, returned within seven days, and started paying, and wire them to a product analytics tool. You get a simple view of the funnel so the decision after launch is based on what users did, not on what they said in a demo.",
          "Where numbers are too small to be meaningful, I add lightweight feedback prompts inside the product at the moment the user finishes the core task. A single question asked at the right moment, such as whether this saved them time, is worth more than a long survey emailed a week later that few people open.",
        ],
      },
      {
        id: "tech-for-v2",
        heading: "Tech choices that will not block version two",
        body: [
          "Speed matters, but a few early shortcuts are expensive to undo. I use a relational database with migrations instead of a schemaless store picked for convenience, TypeScript across frontend and backend, and a structure where business logic lives outside UI components. That way adding a mobile app, a public API or a second pricing tier later is additive work rather than surgery.",
          "I avoid no-code tools for the core workflow when you already expect to outgrow them, because exporting logic out of a visual builder usually means rebuilding it. They are fine for peripheral things like contact forms, internal notifications or a waitlist page, where replacing them later costs an afternoon.",
        ],
        links: [
          { label: "Next.js developer", href: "/nextjs-developer" },
          { label: "TypeScript developer", href: "/typescript-developer" },
        ],
      },
      {
        id: "phases",
        heading: "Phases and what you review at each one",
        body: [
          "Discovery produces the assumption sentence, the cut list and rough screens. The build phase runs in short cycles with a staging link you can click through and share with a few friendly users. Launch means real accounts, analytics live and error tracking switched on. The final phase is a measured review where we look at the numbers together and decide whether to extend, change direction or stop.",
        ],
        points: [
          { title: "Discovery", text: "Assumption, cut list, user flow and a fixed scope for the build." },
          { title: "Build", text: "Short cycles with a staging environment you can test yourself." },
          { title: "Launch", text: "Production accounts, analytics and monitoring in place." },
          { title: "Review", text: "Funnel data, feedback and a recommendation for the next loop." },
        ],
      },
      {
        id: "handover",
        heading: "Handover that makes the next developer faster",
        body: [
          "Whether you hire a team after the MVP or keep working with me, the codebase should be easy to pick up. Handover includes a README that gets someone running locally in minutes, a map of where each feature lives, notes on every shortcut taken and why, and the written later list from scoping so nobody has to rediscover what was deliberately left out.",
          "If you raise funding and bring in engineers, I can do a recorded walkthrough of the architecture with them and answer questions during their first weeks. Access to every account is transferred cleanly, and credentials I used are rotated, so the new team starts with full control and no loose ends.",
        ],
        links: [
          { label: "SaaS development", href: "/saas-development" },
          { label: "Discuss your MVP", href: "/hire-me" },
        ],
      },
      {
        id: "first-call",
        heading: "What to bring to the first conversation",
        body: [
          "Bring the problem you are solving and who has it, anything you have already tried, and what result would make you continue or stop. A list of features is useful as raw material, but expect us to shorten it. Share your budget range and deadline honestly, because they shape scope more than any technical factor, and tell me if investors or a pilot customer are waiting on a date.",
        ],
      },
    ],
    stack: [
      { group: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
      { group: "Backend", items: ["Node.js", "FastAPI", "REST"] },
      { group: "Data", items: ["PostgreSQL", "Prisma", "MongoDB"] },
      { group: "Delivery", items: ["Vercel", "GitHub Actions", "Docker"] },
    ],
    projects: ["resume-analyzer", "chat-with-pdf", "vercel-clone"],
    related: ["saas-development", "web-application-development", "full-stack-developer", "ai-developer"],
    faqs: [
      {
        q: "How small should an MVP be?",
        a: "Small enough that a user can reach the core outcome in one sitting, and nothing more. If a feature does not move someone toward that outcome or help you measure it, it waits. Most first drafts of an MVP scope can lose half their items without weakening the test, and that trimming is the most valuable part of discovery.",
      },
      {
        q: "Is a clickable prototype enough instead of a coded MVP?",
        a: "Sometimes. A prototype tests whether people understand the idea and want it. It cannot test whether they will return, pay, or trust you with real data. If your riskiest assumption is about desirability, start with a prototype. If it is about behaviour or willingness to pay, you need working software.",
      },
      {
        q: "Will I have to rewrite the MVP later?",
        a: "Parts will change, because you will learn things. A full rewrite is usually caused by early choices like no database migrations, logic tangled into UI components, or a platform you cannot export from. I avoid those specifically so that version two extends the MVP rather than replacing it.",
      },
      {
        q: "Can the MVP include AI features?",
        a: "Yes, and AI is often the core of what gets tested. I keep the AI part behind a clear interface, log prompts and outputs so you can see what users actually receive, and track token cost from the start so you know whether the unit economics work before scaling.",
      },
      {
        q: "What if the results say the idea does not work?",
        a: "Then the MVP did its job cheaply. We look at where users dropped off and whether a narrower audience or different workflow shows promise. Sometimes the code is reusable for a pivot, sometimes it is not, and I will tell you honestly which situation you are in.",
      },
    ],
    serviceType: "MVP development",
  },

  // ---------------------------------------------------------------------------
  // Web application development
  // ---------------------------------------------------------------------------
  {
    slug: "web-application-development",
    group: "solution",
    navLabel: "Web Application Development",
    cardBlurb:
      "Internal tools, customer portals and operational dashboards, taken from messy requirements through to a launched, maintained web app.",
    icon: "layout",
    metaTitle: "Web Application Development: Portals, Tools, Dashboards",
    metaDescription:
      "Web application development for internal tools, customer portals and dashboards. Requirements, data modelling, build, testing and launch in accounts you own.",
    eyebrow: "Solution · Web apps",
    h1: "Web application development for the tools your business runs on",
    intro:
      "Many businesses run on spreadsheets, shared inboxes and a patchwork of SaaS tools that do not talk to each other. I build web applications that replace that patchwork with one system shaped around how your team and customers actually work.",
    highlights: [
      "Internal tools",
      "Customer portals",
      "Operational dashboards",
      "Requirements to launch",
    ],
    diagram: {
      title: "From requirements to launch",
      caption:
        "Requirements are revisited after the first working screens, because seeing software changes what people ask for.",
      steps: [
        "Map current process",
        "Agree requirements",
        "Model the data",
        "Build in slices",
        "User acceptance testing",
        "Migrate and launch",
      ],
    },
    sections: [
      {
        id: "kinds",
        heading: "The kinds of web applications I build",
        body: [
          "The work falls into three broad shapes. Each has different users, different tolerance for rough edges, and different priorities for access control and performance. Many projects combine them, for example an internal tool for staff with a smaller portal that lets customers see the status of their own requests.",
        ],
        points: [
          { title: "Internal tools", text: "Order handling, approvals, inventory or case management for your own staff, where speed of use matters more than polish." },
          { title: "Customer portals", text: "Logged-in areas where clients see their orders, documents, invoices or progress, with strict per-customer data access." },
          { title: "Dashboards", text: "Operational views that combine data from your database and third-party tools into numbers people check daily." },
        ],
        links: [
          { label: "React developer", href: "/react-developer" },
          { label: "Full-stack developer", href: "/full-stack-developer" },
        ],
      },
      {
        id: "requirements",
        heading: "Getting requirements out of people's heads",
        body: [
          "The hardest part of an internal tool is rarely the code. It is discovering the exceptions everyone handles without thinking: the customer who is always invoiced differently, the approval that is skipped on Fridays. I start by walking through the current process with the people who do it, collecting real examples such as spreadsheets, emails and screenshots, and writing requirements as scenarios rather than abstract feature names.",
          "You review those scenarios before building, and they later become the checklist for acceptance testing. Writing them as short stories, such as a sales rep creating a quote for an existing customer with a discount, makes gaps obvious to non-technical reviewers who would skim past a bulleted feature list.",
        ],
      },
      {
        id: "decisions",
        heading: "Decisions you will need to make",
        body: [
          "A few choices shape cost and timeline more than anything else, and they belong to you rather than to me. I lay out the options with trade-offs so the decision is informed, then record it in the project notes so it is not relitigated halfway through.",
        ],
        points: [
          { title: "Who logs in", text: "Staff only, customers too, or both, and whether you need single sign-on with Google Workspace or Microsoft." },
          { title: "Source of truth", text: "Whether the new app owns the data or syncs with an existing CRM, ERP or accounting system." },
          { title: "Permissions depth", text: "Simple roles, or rules like managers seeing only their region's records." },
          { title: "Migration", text: "Which historical data comes across, and how much cleaning it needs first." },
        ],
      },
      {
        id: "build",
        heading: "How the build is structured",
        body: [
          "I build in vertical slices: one complete workflow at a time, from database table to screen, deployed to staging so your team can use it with test data. This surfaces misunderstandings early, when they are cheap to fix. The stack is usually Next.js and TypeScript on the front, Node.js or FastAPI behind it, and PostgreSQL for data, with forms validated on both client and server.",
          "Dashboards get particular attention on query performance, since a slow page that staff open many times a day wastes real hours. I add indexes for the filters people actually use, pre-compute heavy totals on a schedule, and keep tables paginated so the page stays quick as records accumulate.",
        ],
        links: [
          { label: "Next.js developer", href: "/nextjs-developer" },
          { label: "API development", href: "/api-development" },
        ],
      },
      {
        id: "testing-launch",
        heading: "Testing, migration and launch day",
        body: [
          "Before launch, the people who will use the app run through the scenarios from the requirements phase on staging, with realistic data. I fix what they find and run automated integration tests on the critical paths, such as creating an order or approving a request. Data migration is rehearsed at least once on a copy, so launch day is a repeat of something that already worked.",
          "For tools replacing a spreadsheet, I often recommend a short period where both run side by side, so staff trust the new numbers. Once totals match for a few cycles, the spreadsheet is archived as read-only, which removes the temptation to keep updating two sources of truth.",
        ],
      },
      {
        id: "scope-risks",
        heading: "Scope boundaries and common risks",
        body: [
          "The biggest risk is scope creep from well-meaning colleagues who see early screens and ask for more. New requests go on a list that we prioritise together at the end of each slice, rather than being quietly absorbed. Other risks include integrations with legacy systems that have no API, and dirty historical data that nobody owns.",
          "Out of scope by default: hardware integrations, offline-first mobile apps, and replacing an entire ERP. Those are possible, but each needs its own planning, budget and risk assessment. If one of them turns out to be necessary, I raise it as a separate proposal rather than stretching the current project to absorb it.",
        ],
      },
      {
        id: "first-call",
        heading: "Bring your current process to the first call",
        body: [
          "The most useful thing you can bring is evidence of how the work happens today: the spreadsheet, a sample of the emails, screenshots of the tools involved, and a list of who touches each step. Tell me which part causes the most pain and what a good month would look like once the app exists. From that I can propose a first slice and a realistic plan.",
        ],
        links: [{ label: "Start a conversation", href: "/hire-me" }],
      },
    ],
    stack: [
      { group: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS", "shadcn/ui"] },
      { group: "Backend", items: ["Node.js", "Express", "FastAPI"] },
      { group: "Data", items: ["PostgreSQL", "Prisma", "Redis"] },
      { group: "Delivery", items: ["Docker", "AWS", "Vercel", "GitHub Actions"] },
    ],
    projects: ["vercel-clone", "resume-analyzer"],
    related: ["saas-development", "api-development", "full-stack-developer", "react-developer", "frontend-developer"],
    faqs: [
      {
        q: "Should we build a custom web app or buy an off-the-shelf tool?",
        a: "Buy when a product already fits most of your process and the gaps are tolerable. Build when your process is part of what makes you different, when you are paying for several tools stitched together with manual work, or when per-seat pricing becomes expensive. I will tell you honestly if an existing product looks like a better fit.",
      },
      {
        q: "Can the app connect to our existing systems?",
        a: "Usually, if those systems have an API or can export data on a schedule. I have integrated with CRMs, payment providers and cloud storage. Where a system has no API, options include scheduled file imports or a small sync service. I assess each integration during requirements so there are no surprises mid-build.",
      },
      {
        q: "How do you handle access control for customer portals?",
        a: "Every query that returns customer data is filtered by the logged-in customer on the server, not just hidden in the interface. I write tests that deliberately try to fetch another customer's records to make sure that filter holds. Staff roles are layered on top, so support staff can view accounts without editing billing.",
      },
      {
        q: "Will the app work on phones?",
        a: "Yes, it will be responsive and usable in a mobile browser. For internal tools I design the key screens for the device people actually use, which is sometimes a phone on a warehouse floor and sometimes a wide monitor. A native mobile app is a separate project and rarely needed at first.",
      },
      {
        q: "Who maintains the app after launch?",
        a: "That is agreed up front. Options include a support period with me for fixes and small changes, an ongoing arrangement for new features, or a handover to your developers with documentation and a walkthrough. The app runs in your own accounts either way, so you are never dependent on me to keep it online.",
      },
    ],
    serviceType: "Web application development",
  },

  // ---------------------------------------------------------------------------
  // API development
  // ---------------------------------------------------------------------------
  {
    slug: "api-development",
    group: "solution",
    navLabel: "API Development",
    cardBlurb:
      "REST and GraphQL APIs with clear contracts, versioning, auth, rate limits, webhooks and documentation other teams can build against.",
    icon: "plug",
    metaTitle: "API Development: REST, GraphQL, Webhooks, Integrations",
    metaDescription:
      "API development for products and partners: REST or GraphQL design, versioning, authentication, rate limiting, webhooks, docs and third-party integrations.",
    eyebrow: "Solution · APIs",
    h1: "API development with contracts your partners can rely on",
    intro:
      "An API is a promise to everyone who builds on it. I design and build APIs for your own apps, for partners, or as a public product, with the documentation, auth, limits and versioning that let other people depend on it safely.",
    highlights: [
      "REST or GraphQL",
      "Versioned contracts",
      "Docs from the schema",
      "Webhooks and integrations",
    ],
    diagram: {
      title: "Life of an API request",
      caption:
        "Each layer rejects bad requests as early and cheaply as possible, before any business logic runs.",
      steps: [
        "Authenticate caller",
        "Check rate limit",
        "Validate input",
        "Run business logic",
        "Emit webhook events",
        "Log and respond",
      ],
    },
    sections: [
      {
        id: "who-its-for",
        heading: "Which kind of API you need",
        body: [
          "An internal API that only your frontend uses can change freely as long as both deploy together. A partner API used by a handful of known integrators needs stability and clear communication. A public API needs all of that plus self-serve keys, generous docs and a deprecation policy. We start by deciding which of these you are building, because it determines how much ceremony is worth paying for.",
        ],
      },
      {
        id: "rest-or-graphql",
        heading: "REST or GraphQL: how the choice gets made",
        body: [
          "REST suits resource-shaped data, partners who want predictable URLs, and heavy caching at the edge. GraphQL suits products with many client screens that each need different slices of related data, where one flexible query replaces several round trips. GraphQL also brings extra work around query cost limits and caching. For partner and public APIs I usually recommend REST with an OpenAPI specification, and GraphQL for your own frontend when the data is deeply connected.",
        ],
        points: [
          { title: "REST", text: "Predictable resources, HTTP caching, simple for third parties to call from any language." },
          { title: "GraphQL", text: "Flexible queries for complex UIs, one typed schema, but needs depth and cost limits." },
          { title: "Both", text: "A GraphQL layer for your apps and a REST surface for partners, sharing the same services." },
        ],
      },
      {
        id: "contract",
        heading: "Versioning and documentation",
        body: [
          "I write the schema first, as OpenAPI or a GraphQL SDL, and generate types and docs from it so documentation cannot drift from behaviour. Additive changes such as new optional fields ship without a version bump. Breaking changes go into a new version with a published sunset date for the old one, and responses from deprecated endpoints carry a header so integrators notice before it matters.",
          "Docs include working examples for each endpoint, error codes with meanings, and a sandbox key where appropriate. A changelog records every release in plain language, so integrators can see at a glance whether an update affects them without reading a diff of the specification.",
        ],
      },
      {
        id: "security",
        heading: "Authentication, authorisation and rate limits",
        body: [
          "The auth model depends on who calls the API. Your own apps use session or JWT auth tied to a user. Server-to-server partners get scoped API keys that can be rotated without downtime. Where partners act on behalf of your users, OAuth 2.0 with explicit scopes is the right tool. Every endpoint checks what the caller may do, not only who they are.",
          "Rate limits are enforced per key in Redis, with clear headers telling callers their remaining quota and when it resets. Callers who exceed a limit get a 429 response with a retry hint rather than a vague error, and heavier endpoints such as exports can carry their own tighter limits.",
        ],
        points: [
          { title: "API keys", text: "Hashed at rest, scoped by permission, with rotation and last-used timestamps." },
          { title: "OAuth 2.0", text: "For delegated access, with scopes users can understand when they consent." },
          { title: "Rate limiting", text: "Sliding window per key, with separate limits for expensive endpoints." },
          { title: "Idempotency", text: "Idempotency keys on create operations so retries never double-charge or double-create." },
        ],
        links: [
          { label: "Node.js developer", href: "/nodejs-developer" },
          { label: "Backend developer", href: "/backend-developer" },
        ],
      },
      {
        id: "webhooks",
        heading: "Webhooks and third-party integrations",
        body: [
          "Outgoing webhooks let partners react to events without polling. I sign every payload so receivers can verify it came from you, deliver from a queue with exponential backoff, and give integrators a log of recent deliveries with the option to replay one. Receivers should expect duplicates and occasional out-of-order events, and the docs say so plainly.",
          "Incoming integrations with payment providers, CRMs, email services or AI providers are wrapped in adapters, so a vendor's outage or API change is handled in one place. Each adapter has its own timeouts, retries and logging, which makes it clear whether a failure came from your code or theirs.",
        ],
        links: [
          { label: "SaaS development", href: "/saas-development" },
          { label: "Automation development", href: "/automation-development" },
        ],
      },
      {
        id: "scope",
        heading: "What is included and what you decide",
        body: [
          "Included: schema design, implementation, auth, rate limiting, webhooks where needed, integration and contract tests, generated docs, and deployment with request logging and error alerts. You decide the audience, the auth model for partners, pricing or quota tiers if the API is a product, and how long old versions are supported. Out of scope by default: building SDKs in several languages and running a developer community programme.",
        ],
      },
      {
        id: "first-call",
        heading: "Useful things to bring",
        body: [
          "Bring a list of who will call the API and what they need to do, any existing endpoints or database schema, and the third-party services it must talk to. If a partner has already asked for specific data or events, share their request. Knowing expected traffic, even roughly, and any contractual uptime commitments also helps me recommend the right hosting and limits.",
        ],
        links: [{ label: "Talk about your API", href: "/hire-me" }],
      },
    ],
    stack: [
      { group: "API", items: ["REST", "GraphQL", "OpenAPI", "Socket.io"] },
      { group: "Runtime", items: ["Node.js", "Express", "FastAPI", "TypeScript"] },
      { group: "Data", items: ["PostgreSQL", "MongoDB", "Redis"] },
      { group: "Infrastructure", items: ["AWS Lambda", "AWS ECS", "Docker", "GitHub Actions"] },
    ],
    projects: ["vercel-clone", "blog-automation"],
    related: ["backend-developer", "nodejs-developer", "saas-development", "web-application-development"],
    faqs: [
      {
        q: "Can you add an API to our existing application?",
        a: "Yes. I start by reading the existing codebase and database to see where business logic lives. Often the first step is pulling that logic out of controllers or UI code into services the API can share. The API then sits alongside your current app without changing how existing users experience it.",
      },
      {
        q: "How do you test an API?",
        a: "Unit tests cover business rules, integration tests run real requests against a test database, and contract tests check responses still match the published schema. For webhooks I test signing, retries and duplicate delivery. These run in CI on every pull request, so a breaking change is caught before it reaches a partner.",
      },
      {
        q: "What about API performance?",
        a: "Most slow APIs are slow because of database access patterns: missing indexes, N+1 queries, or fetching far more than the response needs. I profile real endpoints, fix those first, then add caching in Redis where data is read often and changes rarely. Pagination is cursor-based on large collections.",
      },
      {
        q: "Should our API be public?",
        a: "Only if outside developers building on it helps your business, through integrations customers ask for or as a paid product. A public API brings support load, security review and long-term compatibility commitments. Many companies do better with a partner API for a few integrators first, then open it wider once the contract has settled.",
      },
      {
        q: "Can you integrate AI providers through the API?",
        a: "Yes. I often expose AI features through your own API rather than calling providers from the browser. That keeps provider keys on the server, lets you apply per-customer limits and logging, and means you can switch between OpenAI, Gemini or OpenRouter without changing any client.",
      },
    ],
    serviceType: "API development",
  },

  // ---------------------------------------------------------------------------
  // AI chatbot development
  // ---------------------------------------------------------------------------
  {
    slug: "ai-chatbot-development",
    group: "solution",
    navLabel: "AI Chatbot Development",
    cardBlurb:
      "Support and knowledge chatbots grounded in your content, with human handoff, streaming replies, analytics and guardrails.",
    icon: "message-square",
    metaTitle: "AI Chatbot Development for Support and Knowledge Bots",
    metaDescription:
      "AI chatbot development for customer support and internal knowledge: grounded answers, human escalation, streaming chat UI, memory, analytics and guardrails.",
    eyebrow: "Solution · AI chatbots",
    h1: "AI chatbot development for support and internal knowledge",
    intro:
      "A useful chatbot answers from your content, admits when it does not know, and hands the conversation to a person before the customer gets frustrated. I build chatbots that do those three things reliably, then show you what people ask so you can improve over time.",
    highlights: [
      "Grounded in your content",
      "Human handoff built in",
      "Streaming chat UI",
      "Conversation analytics",
    ],
    diagram: {
      title: "How a chatbot reply is produced",
      caption:
        "Guardrails run on both sides of the model: on what comes in and on what goes out.",
      steps: [
        "User message",
        "Input checks",
        "Retrieve knowledge",
        "Generate grounded reply",
        "Output checks",
        "Answer or escalate",
      ],
    },
    sections: [
      {
        id: "use-cases",
        heading: "Support bots and knowledge bots are different products",
        body: [
          "A customer support bot faces the public. It must be polite, stay on topic, protect account data, and escalate quickly when someone is upset or the question involves money. An internal knowledge bot serves staff looking up policies, procedures or product details. It can be more direct and link to source documents, but it must respect which teams may see which content. We decide which you are building first, since the guardrails differ.",
        ],
      },
      {
        id: "grounding",
        heading: "Grounding answers in your own content",
        body: [
          "The bot answers from your help centre, product docs, policies or past resolved tickets, retrieved at question time and passed to the model with an instruction to use only that material. When nothing relevant is found, it says so and offers a human rather than guessing. Answers link to the source article, which builds trust and gives you a quick way to spot outdated docs.",
          "Content is re-synced on a schedule or by webhook when an article changes, so the bot does not quote last quarter's pricing. Drafts and internal-only articles are excluded by rule, and you can mark specific pages as off limits without deleting them from your help centre.",
        ],
        links: [
          { label: "RAG application development", href: "/rag-application-development" },
          { label: "RAG developer", href: "/rag-developer" },
        ],
      },
      {
        id: "escalation",
        heading: "Escalation to a human, designed in from the start",
        body: [
          "Handoff is not a fallback bolted on at the end. The bot escalates when the user asks for a person, when retrieval confidence is low, when it detects frustration, or when the topic is on a list you define, such as refunds or legal complaints. The human agent receives the full transcript and the sources the bot used, so the customer never has to repeat themselves.",
        ],
        points: [
          { title: "Explicit request", text: "Typing 'talk to a human' always works, with no attempt to talk them out of it." },
          { title: "Low confidence", text: "Weak or missing retrieval results route to a person instead of a guess." },
          { title: "Sensitive topics", text: "Refunds, cancellations or complaints go straight to staff by rule." },
          { title: "Context passed", text: "Transcript, detected intent and cited sources arrive with the ticket." },
        ],
      },
      {
        id: "ui-memory",
        heading: "Streaming chat UI and conversation memory",
        body: [
          "Replies stream token by token so the user sees progress within a moment rather than waiting several seconds for a full answer. The widget handles reconnects, shows sources as they arrive, and works on mobile. It can live on your site as an embed or inside your product for logged-in users.",
          "Memory is kept deliberately short. Recent turns stay in context so follow-up questions make sense, while older turns are summarised. For logged-in users the bot can know their plan or recent orders, fetched through your API with their permissions, never from a shared cache.",
        ],
        points: [
          { title: "Token streaming", text: "Replies appear as they are generated, with sources attached when ready." },
          { title: "Embeddable widget", text: "A script tag for your site, or a component inside your logged-in product." },
          { title: "Short-term memory", text: "Recent turns kept verbatim, older turns summarised to control cost." },
          { title: "Account context", text: "Plan and order details fetched per user through your API, when permitted." },
        ],
      },
      {
        id: "guardrails-analytics",
        heading: "Guardrails, analytics and improving over time",
        body: [
          "Guardrails cover prompt injection attempts, off-topic requests, personal data in messages, and replies that mention competitors or make promises your policy does not allow. Every conversation is logged with its retrieved sources, so reviewing a bad answer shows whether the cause was missing content or a model mistake.",
          "The analytics view shows common questions, unanswered questions, escalation rate and thumbs-up or thumbs-down feedback. Unanswered questions are the most useful list, because they tell your team which help articles to write next. Questions are grouped by topic so a cluster of similar gaps stands out instead of being lost among hundreds of individual chats.",
        ],
        links: [
          { label: "LLM developer", href: "/llm-developer" },
          { label: "Generative AI developer", href: "/generative-ai-developer" },
        ],
      },
      {
        id: "scope-risks",
        heading: "Scope, risks and decisions for you",
        body: [
          "You decide which topics the bot may handle, what counts as an escalation, which helpdesk it hands off to, and the tone it uses. The main risks are confident wrong answers, stale content and runaway token costs, handled through grounding, scheduled syncs and per-conversation limits. Out of scope by default: voice phone bots and bots that take actions like issuing refunds. Actions belong in an agent project with approval steps.",
        ],
        links: [{ label: "AI agent development", href: "/ai-agent-development" }],
      },
      {
        id: "first-call",
        heading: "What to prepare",
        body: [
          "Export a sample of real questions from your support inbox or chat tool, ideally a few hundred, and point me to the content the bot should answer from. Tell me which helpdesk you use, your support hours, and the topics you never want automated. With real questions I can estimate how many the bot could answer from existing content before we write any code.",
        ],
      },
    ],
    stack: [
      { group: "AI", items: ["OpenAI", "Gemini", "OpenRouter", "LangChain"] },
      { group: "Retrieval", items: ["Embeddings", "Qdrant", "PostgreSQL"] },
      { group: "App", items: ["Next.js", "React", "Socket.io", "Tailwind CSS"] },
      { group: "Backend", items: ["Node.js", "FastAPI", "Redis"] },
    ],
    projects: ["chat-with-pdf", "ai-avatar", "resume-analyzer"],
    related: ["rag-application-development", "ai-agent-development", "llm-developer", "ai-developer", "generative-ai-developer"],
    faqs: [
      {
        q: "How do you stop the chatbot from making things up?",
        a: "By limiting it to retrieved content, instructing it to decline when that content does not cover the question, and checking outputs before they are shown. No method removes the risk entirely, so I also log every answer with its sources and build a review queue for low-rated replies. That lets your team catch and fix problems quickly.",
      },
      {
        q: "Can the bot hand off to our existing helpdesk?",
        a: "Usually yes. Most helpdesk and live chat tools have APIs for creating tickets or transferring conversations. I pass the transcript, the user's details and the sources the bot used. If your tool has no suitable API, a fallback is creating a ticket by email with the same context attached.",
      },
      {
        q: "Which language model will it use?",
        a: "I choose based on answer quality on your real questions, response speed and cost, testing a few options from OpenAI, Gemini and others available through OpenRouter. The model sits behind an internal interface, so switching later is a configuration change rather than a rebuild, which matters as prices and models change frequently.",
      },
      {
        q: "Does the chatbot learn from conversations automatically?",
        a: "Not automatically, and that is deliberate. Letting a public bot rewrite its own knowledge from user messages invites manipulation. Instead, conversations feed an analytics view and a review queue. Your team updates the source content, and the bot picks up those changes on the next sync.",
      },
      {
        q: "Can it support more than one language?",
        a: "Yes. Modern models handle many languages well, and the bot can reply in the language the user writes in, even if your content is in English. Quality should still be checked with native speakers on real questions, and for important markets translated source content gives more reliable answers.",
      },
    ],
    serviceType: "AI chatbot development",
  },

  // ---------------------------------------------------------------------------
  // RAG application development
  // ---------------------------------------------------------------------------
  {
    slug: "rag-application-development",
    group: "solution",
    navLabel: "RAG Application Development",
    cardBlurb:
      "Document Q&A products for businesses: ingest your files, respect who can see what, answer with citations and measure accuracy.",
    icon: "search",
    metaTitle: "RAG Application Development for Document Q&A",
    metaDescription:
      "RAG application development for businesses: ingest your documents, permissions-aware retrieval, answers with citations, and evaluation that measures accuracy.",
    eyebrow: "Solution · RAG apps",
    h1: "RAG application development for asking questions of your documents",
    intro:
      "Your contracts, manuals, reports and policies already hold the answers people keep asking for. I build retrieval-augmented generation applications that let your team or customers ask questions in plain language and get answers with citations back to the exact source page.",
    highlights: [
      "Your documents, ingested",
      "Permission-aware retrieval",
      "Cited answers",
      "Measured accuracy",
    ],
    diagram: {
      title: "Document Q&A pipeline",
      caption:
        "Ingestion runs in the background; the question path only touches pre-computed chunks and embeddings.",
      steps: [
        "Upload documents",
        "Parse and chunk",
        "Embed and index",
        "Filter by permissions",
        "Retrieve and rerank",
        "Answer with citations",
      ],
    },
    sections: [
      {
        id: "what-you-get",
        heading: "What a finished document Q&A product includes",
        body: [
          "You get an application where authorised users upload or connect documents, see their processing status, and ask questions against them. Each answer shows the passages it was based on, with document name and page, and a user can click through to check. Behind it is an ingestion pipeline, a vector index, a permission layer, an evaluation set and an admin view for managing sources.",
          "My chat-with-pdf project follows this same shape: upload, background processing, chunking, embeddings, retrieval and a cited answer. A business version adds the parts a personal tool can skip, namely shared collections, access groups, audit logs of who asked what, and an evaluation set that guards quality as the system changes.",
        ],
        links: [
          { label: "Chat with PDF case study", href: "/projects/chat-with-pdf" },
          { label: "RAG developer", href: "/rag-developer" },
        ],
      },
      {
        id: "ingestion",
        heading: "Ingesting your real documents, not a clean demo",
        body: [
          "Business documents are messy: scanned PDFs, tables that span pages, headers repeated on every sheet, and near-identical versions of the same contract. Ingestion is where most RAG quality is won or lost. I parse each format properly, extract tables as tables, run OCR where needed, strip repeated boilerplate, and chunk by document structure such as sections and clauses instead of fixed character counts.",
        ],
        points: [
          { title: "Formats", text: "PDF, Word, spreadsheets, HTML and scanned images, each with a suitable parser." },
          { title: "Structure-aware chunks", text: "Split on headings and clauses, keeping section titles attached as context." },
          { title: "Metadata", text: "Source, page, date, owner and access group stored with every chunk." },
          { title: "Re-ingestion", text: "Changed files are detected and re-processed; deleted files leave the index." },
        ],
      },
      {
        id: "permissions",
        heading: "Permissions-aware retrieval",
        body: [
          "If a user cannot open a document in your file system, they should not get answers from it either. Each chunk carries the access groups of its source, and every search filters by the current user's groups before ranking, inside the vector database query itself. Filtering after retrieval is not enough, because content the user should not see can still shape the answer.",
          "Where documents come from SharePoint, Google Drive or a similar store, permissions are synced from that system rather than maintained twice. When someone loses access to a folder, their next question already reflects that, and the audit log records which documents contributed to every answer they received.",
        ],
      },
      {
        id: "citations",
        heading: "Citations people can verify",
        body: [
          "Every factual claim in an answer should trace to a retrieved passage. The model is instructed to cite passage identifiers, and the application checks those identifiers exist before displaying them, so users never see a reference to something that was not retrieved. Clicking a citation opens the document at the right page with the passage highlighted. When sources disagree, the answer says so and shows both.",
        ],
      },
      {
        id: "evaluation",
        heading: "Evaluation: knowing whether it actually works",
        body: [
          "Before launch we build a test set of real questions with known correct answers and source passages, ideally written by people who know the documents. Each change to chunking, embeddings, prompts or models is run against that set, measuring whether the right passages were retrieved and whether the answer was correct and cited. This turns quality from a feeling into something you can track.",
          "After launch, user feedback on answers flows into the same set, so it grows with real usage. When a user marks an answer as wrong, a reviewer confirms the correct response and source, and that case becomes a permanent regression test for future changes.",
        ],
        points: [
          { title: "Retrieval quality", text: "Did the correct passage appear in the top results for each question?" },
          { title: "Answer correctness", text: "Checked against reference answers, with a human reviewing borderline cases." },
          { title: "Citation accuracy", text: "Do cited passages actually support what the answer claims?" },
        ],
      },
      {
        id: "decisions-risks",
        heading: "Decisions, risks and scope",
        body: [
          "You will decide which document sources to include first, who may see what, whether documents can leave your cloud region, and which model providers are acceptable for your data. Risks I plan for include poor scans, outdated documents outranking current ones, and permission drift between systems. Out of scope by default: training custom models and migrating your entire document store. RAG works on top of where documents already live.",
        ],
        links: [
          { label: "AI chatbot development", href: "/ai-chatbot-development" },
          { label: "AWS developer", href: "/aws-developer" },
        ],
      },
      {
        id: "first-call",
        heading: "Bring sample documents and real questions",
        body: [
          "The best preparation is a small, representative bundle: ten to twenty documents including the ugly ones, and a list of questions people genuinely ask about them with the answers an expert would give. Tell me where the full collection lives, roughly how large it is, and any data residency or confidentiality rules. From that I can build a quick retrieval test before committing to a full build.",
        ],
      },
    ],
    stack: [
      { group: "AI", items: ["LangChain", "OpenAI", "Gemini", "Embeddings"] },
      { group: "Retrieval", items: ["Qdrant", "PostgreSQL", "Redis"] },
      { group: "App", items: ["Next.js", "TypeScript", "Tailwind CSS"] },
      { group: "Processing", items: ["FastAPI", "Node.js", "AWS S3", "AWS Lambda"] },
    ],
    projects: ["chat-with-pdf", "blog-automation", "resume-analyzer"],
    related: ["rag-developer", "ai-chatbot-development", "llm-developer", "ai-developer"],
    faqs: [
      {
        q: "Is RAG better than fine-tuning a model on our documents?",
        a: "For question answering over documents that change, usually yes. RAG can cite sources, respects permissions, and picks up new documents as soon as they are indexed. Fine-tuning is better for teaching a model a style or format, not for keeping facts current. Many businesses never need fine-tuning at all.",
      },
      {
        q: "How many documents can the system handle?",
        a: "Vector databases like Qdrant handle very large collections, so raw volume is rarely the constraint. The practical limits are ingestion time and cost for the initial load, and retrieval quality as similar documents compete. For large collections I add metadata filters and reranking so the right passage still rises to the top.",
      },
      {
        q: "Does our data get sent to OpenAI or other providers?",
        a: "Retrieved passages and the question are sent to whichever model provider you approve, under that provider's API data terms. If that is not acceptable, options include providers with regional hosting or self-hosted open models, with some trade-off in answer quality. This is one of the first decisions we make together.",
      },
      {
        q: "What happens when the answer is not in the documents?",
        a: "The application should say that clearly rather than filling the gap from the model's general knowledge. I set retrieval thresholds so weak matches are treated as no match, and the reply suggests who to ask or which document might be missing. Those unanswered questions are logged, which often reveals gaps in your documentation.",
      },
      {
        q: "Can users upload their own files?",
        a: "Yes. Uploads go to storage, are processed in the background with a visible status, and are indexed with the uploader's permissions. You can choose whether uploaded files are private to that user, shared with a team, or reviewed by an admin before being added to the shared knowledge base.",
      },
    ],
    serviceType: "RAG application development",
  },

  // ---------------------------------------------------------------------------
  // AI agent development
  // ---------------------------------------------------------------------------
  {
    slug: "ai-agent-development",
    group: "solution",
    navLabel: "AI Agent Development",
    cardBlurb:
      "Tool-using AI agents with approval steps, sensible failure handling and full traces, or a simpler workflow when that fits better.",
    icon: "bot",
    metaTitle: "AI Agent Development: Tool-Using Agents With Approvals",
    metaDescription:
      "AI agent development for real business tasks: tool-using agents, workflows versus agents, human approval steps, failure handling and observability of every run.",
    eyebrow: "Solution · AI agents",
    h1: "AI agent development for tasks that need judgement and tools",
    intro:
      "An AI agent reads a goal, decides which tools to call, looks at the results and keeps going until the task is done. I build agents that act inside your systems with clear limits, human approval where it matters, and a trace of every step they took.",
    highlights: [
      "Tool calling with limits",
      "Human approval steps",
      "Failure handling",
      "Traces of every run",
    ],
    diagram: {
      title: "An agent run with approval",
      caption:
        "Read-only tools run freely; anything that changes data outside the agent waits for a person.",
      steps: [
        "Receive goal",
        "Plan next step",
        "Call a tool",
        "Check the result",
        "Request approval",
        "Act and log",
      ],
    },
    sections: [
      {
        id: "workflow-or-agent",
        heading: "Workflow or agent: pick the simpler one that works",
        body: [
          "Many tasks sold as agents are better built as workflows: fixed steps in a known order, with an LLM used at specific points to classify, extract or write. Workflows are cheaper, faster and easier to test. A true agent, where the model chooses its own next step, earns its place when the path genuinely varies from case to case, such as research tasks or triaging requests that need different lookups.",
          "I will recommend a workflow when it does the job, and often combine them, with an agent handling only the variable part. A typical shape is a fixed pipeline that gathers inputs and delivers results, with a bounded agent step in the middle that decides which lookups a particular case needs.",
        ],
        links: [{ label: "Automation development", href: "/automation-development" }],
      },
      {
        id: "tools",
        heading: "Designing the tools an agent can use",
        body: [
          "An agent is only as good as its tools. Each tool is a small, well-described function with typed inputs, such as searching orders, reading a document, drafting an email or creating a ticket. Tools return concise, structured results rather than raw dumps, so the model is not overwhelmed. Permissions are enforced inside the tool, using the identity of the person the agent acts for, so a clever prompt cannot widen access.",
        ],
        points: [
          { title: "Narrow tools", text: "One clear purpose each, with descriptions the model can reason about." },
          { title: "Typed inputs", text: "Arguments validated before execution, rejected with a useful error if wrong." },
          { title: "Read versus write", text: "Read-only tools run freely; write tools are marked and gated." },
          { title: "Scoped identity", text: "Every call runs with the requesting user's permissions, never an admin key." },
        ],
      },
      {
        id: "approval",
        heading: "Human approval steps",
        body: [
          "Anything that sends a message, spends money, changes a customer record or deletes data pauses for approval. The approver sees what the agent plans to do, why, and the evidence it gathered, then approves, edits or rejects. The run resumes from where it stopped, because agent state is saved between steps rather than held in memory. As trust builds, you can loosen approval for low-risk actions based on the history.",
        ],
      },
      {
        id: "failure",
        heading: "Failure handling that assumes things will go wrong",
        body: [
          "Agents fail in ways normal code does not: looping on the same tool, misreading a result, or drifting away from the goal. Each run has limits on steps, time and token spend. Tool errors are returned to the model as readable messages so it can try another approach, and repeated failures stop the run and notify a person with the trace attached.",
          "Write actions use idempotency keys, so a retried step never sends the same email or creates the same record twice. If a run is abandoned partway through, the saved state shows exactly which side effects already happened, so a person can finish the task by hand without guessing.",
        ],
        points: [
          { title: "Budgets", text: "Maximum steps, wall-clock time and token cost per run." },
          { title: "Loop detection", text: "Repeated identical calls end the run instead of burning budget." },
          { title: "Safe retries", text: "Idempotent writes so recovery never duplicates side effects." },
        ],
      },
      {
        id: "observability",
        heading: "Observability: seeing what the agent did and why",
        body: [
          "Every run produces a trace: the goal, each model call with its prompt and output, every tool call with arguments and results, approvals, errors, timing and cost. You can open any run and read it like a log of decisions. Aggregate views show success rate by task type, common failure points and average cost, which is how you decide whether the agent is ready for more autonomy or needs better tools.",
        ],
        links: [
          { label: "LLM developer", href: "/llm-developer" },
          { label: "AI developer", href: "/ai-developer" },
        ],
      },
      {
        id: "scope",
        heading: "Scope, decisions and risks",
        body: [
          "You decide which systems the agent may touch, which actions need approval, who approves, and what a successful run looks like. The main risks are acting on wrong information, prompt injection through content the agent reads, and cost creep, handled with approval gates, treating fetched content as untrusted data, and hard budgets. Out of scope by default: fully autonomous agents with unrestricted write access to production systems.",
        ],
      },
      {
        id: "first-call",
        heading: "What to bring to the first call",
        body: [
          "Describe one task you want handled, step by step, as a person does it today, including the systems they open and the judgement calls they make. Bring five to ten real examples, including awkward ones. Tell me which systems have APIs and which actions would be unacceptable to get wrong. With that, I can say whether it needs an agent, a workflow, or a mix.",
        ],
        links: [{ label: "Discuss an agent project", href: "/hire-me" }],
      },
    ],
    stack: [
      { group: "AI", items: ["OpenAI", "Gemini", "OpenRouter", "LangChain"] },
      { group: "Orchestration", items: ["Node.js", "FastAPI", "Redis queues"] },
      { group: "Data", items: ["PostgreSQL", "Qdrant", "MongoDB"] },
      { group: "Interface", items: ["Next.js", "React", "Socket.io"] },
    ],
    projects: ["blog-automation", "ai-avatar", "chat-with-pdf"],
    related: ["automation-development", "ai-chatbot-development", "llm-developer", "generative-ai-developer", "ai-developer"],
    faqs: [
      {
        q: "What is the difference between an AI agent and a chatbot?",
        a: "A chatbot mainly answers questions. An agent works toward a goal by calling tools, such as looking up records, drafting documents or updating systems, and deciding what to do next based on results. Many products combine both, with a chat interface in front and agent behaviour behind it for specific tasks.",
      },
      {
        q: "Is it safe to let an agent change data in our systems?",
        a: "It can be, with the right limits. Tools run with the requesting user's permissions, write actions require approval until you are confident, budgets stop runaway runs, and every action is logged. Start with read-only tools and approval on everything, then relax controls for specific low-risk actions once traces show reliable behaviour.",
      },
      {
        q: "Which framework do you use for agents?",
        a: "It depends on the task. LangChain is useful for tool definitions and integrations. For many production agents I write a small orchestration loop directly, because it makes state, retries and tracing easier to control. The framework matters less than tool design, limits and observability.",
      },
      {
        q: "How do you test an agent?",
        a: "With a set of realistic tasks and expected outcomes, run repeatedly because agent behaviour varies between runs. I check whether the task was completed, whether any disallowed action was attempted, and how many steps and tokens it took. Tool functions also get ordinary unit tests, since most bugs live there.",
      },
      {
        q: "Can an agent work with our internal tools that have no API?",
        a: "Sometimes, through database access, exports or browser automation, though each is more fragile than an API. Often the better path is adding a small internal API to the system first, which also benefits other integrations. I assess this per system during scoping.",
      },
    ],
    serviceType: "AI agent development",
  },

  // ---------------------------------------------------------------------------
  // AI avatar development
  // ---------------------------------------------------------------------------
  {
    slug: "ai-avatar-development",
    group: "solution",
    navLabel: "AI Avatar Development",
    cardBlurb:
      "Real-time conversational avatars for interviews, training and onboarding, with speech in and out on a tight latency budget.",
    icon: "user-round",
    metaTitle: "AI Avatar Development for Interviews and Training",
    metaDescription:
      "AI avatar development for interviews, training and onboarding: real-time speech-to-text, LLM replies, text-to-speech and HeyGen avatars within a latency budget.",
    eyebrow: "Solution · AI avatars",
    h1: "AI avatar development for real-time spoken conversations",
    intro:
      "A conversational avatar listens, thinks and replies out loud with a face, fast enough that the exchange feels like talking rather than waiting. I build avatar experiences for interviews, training and onboarding, drawing on my own AI interview avatar project.",
    highlights: [
      "Speech in, speech out",
      "Latency budgeted per stage",
      "HeyGen and other providers",
      "Structured feedback",
    ],
    diagram: {
      title: "One conversational turn",
      caption:
        "Every stage streams into the next, so the avatar starts speaking before the full reply is written.",
      steps: [
        "User speaks",
        "Speech to text",
        "Detect end of turn",
        "LLM streams reply",
        "Text to speech",
        "Avatar renders",
      ],
    },
    sections: [
      {
        id: "use-cases",
        heading: "Where conversational avatars are useful",
        body: [
          "Avatars suit situations where speaking out loud is the point. Practice interviews where candidates answer questions and get follow-ups based on what they said. Sales or support training where staff rehearse difficult conversations with a simulated customer. Onboarding where a new hire or user asks questions of a guide who knows your material. In each case the avatar adds presence, while the value comes from the conversation design behind it.",
        ],
        points: [
          { title: "Interviews", text: "Role-specific questions, adaptive follow-ups and a structured scorecard at the end." },
          { title: "Training", text: "Scenario role-play with a persona, goals and assessment criteria you define." },
          { title: "Onboarding", text: "A spoken guide grounded in your handbook or product documentation." },
        ],
      },
      {
        id: "how-it-works",
        heading: "The pipeline: STT, LLM, TTS and avatar",
        body: [
          "Each turn passes through speech-to-text, a language model, text-to-speech and the avatar renderer. In my AI avatar interview project, built with Next.js, Node.js, OpenAI and HeyGen, the model generates follow-up questions from the candidate's actual answer and produces structured feedback once the session ends. Everything streams: partial transcripts, partial replies and audio, so no stage waits for the previous one to fully finish.",
        ],
        links: [
          { label: "AI avatar case study", href: "/projects/ai-avatar" },
          { label: "Generative AI developer", href: "/generative-ai-developer" },
        ],
      },
      {
        id: "latency",
        heading: "Working to a latency budget",
        body: [
          "The gap between the user finishing a sentence and the avatar starting to reply decides whether the conversation feels natural. I set a budget for that gap and split it across stages: end-of-turn detection, transcription, time to the model's first sentence, speech synthesis of that sentence, and avatar start. Each stage is measured in production so we know where time goes.",
          "Common savings include streaming the first sentence to TTS immediately, shorter system prompts, faster models for follow-ups, and keeping connections open between turns. Small touches help too, such as a brief acknowledgement or a natural pause animation while the reply forms, so silence never reads as the system having frozen.",
        ],
        points: [
          { title: "Turn detection", text: "Tuned silence thresholds so the avatar neither interrupts nor lags." },
          { title: "First sentence fast", text: "Speech starts on the first complete sentence, not the full reply." },
          { title: "Warm connections", text: "Persistent sessions with STT, LLM and avatar providers across turns." },
          { title: "Measured per stage", text: "Timing logged for every turn so regressions are visible." },
        ],
      },
      {
        id: "providers",
        heading: "Choosing an avatar provider",
        body: [
          "HeyGen offers streaming avatars with a range of stock and custom faces, and it is what I used in the interview project. Other providers differ in realism, latency, language support, custom avatar creation and pricing per minute. I compare them on your actual script and target languages before committing, and keep the avatar behind an interface so switching providers does not mean rebuilding the conversation logic.",
          "Sometimes a voice-only experience with a simple animated visual is the better choice, especially when cost per session matters most. Avatar streaming is usually the largest line item per minute, so it is worth testing whether users actually engage more with a face before paying for one in every session.",
        ],
      },
      {
        id: "decisions",
        heading: "Decisions you will make",
        body: [
          "You choose the persona, voice and appearance, whether sessions are recorded and for how long, which languages are supported, and how assessment works if there is one. Cost per session is driven by minutes of avatar streaming, speech processing and model tokens, so we agree a target session length and budget early. For interviews, you also decide how much the output is used in hiring decisions, and what candidates are told about it.",
        ],
      },
      {
        id: "risks-scope",
        heading: "Risks and scope",
        body: [
          "The main risks are latency spikes from any one provider, poor transcription with accents or background noise, and avatars that feel uncanny in long sessions. I handle these with per-stage monitoring, provider fallbacks where possible, a text fallback when audio fails, and testing with real users in realistic conditions. Out of scope by default: building a custom avatar rendering engine, or making automated hiring decisions without a human review step.",
        ],
        links: [
          { label: "AI developer", href: "/ai-developer" },
          { label: "AI chatbot development", href: "/ai-chatbot-development" },
        ],
      },
      {
        id: "first-call",
        heading: "What to bring",
        body: [
          "Bring a sample script or scenario, such as the questions for one interview role or one training situation, and describe who the users are and what device they will use. Tell me the languages you need, expected sessions per month, and whether results feed into another system like an ATS or LMS. If you have a preferred avatar provider or brand guidelines for the persona, share those too.",
        ],
      },
    ],
    stack: [
      { group: "Conversation", items: ["OpenAI", "Gemini", "Speech-to-text", "Text-to-speech"] },
      { group: "Avatar", items: ["HeyGen streaming avatars", "WebRTC"] },
      { group: "App", items: ["Next.js", "React", "TypeScript", "Socket.io"] },
      { group: "Backend", items: ["Node.js", "Redis", "PostgreSQL"] },
    ],
    projects: ["ai-avatar", "resume-analyzer"],
    related: ["ai-developer", "generative-ai-developer", "ai-chatbot-development", "llm-developer"],
    faqs: [
      {
        q: "How fast does the avatar respond?",
        a: "It depends on the providers, the model and the user's network, so I do not promise a fixed number. What I do is set a latency budget with you, measure every stage in each turn, and optimise the slowest ones. Streaming across stages is the biggest lever, because it lets the avatar start talking before the full reply exists.",
      },
      {
        q: "Can we use a custom avatar that looks like our own presenter?",
        a: "Many providers, including HeyGen, support custom avatars created from recorded footage of a real person, with that person's consent. Creation takes extra time and cost, and quality depends on the source recording. For a first version, a stock avatar is often used to validate the experience before investing in a custom one.",
      },
      {
        q: "How is the interview feedback generated?",
        a: "The full transcript is analysed against criteria you define for the role, such as clarity, depth on specific topics or use of examples. The model returns structured scores and comments tied to specific moments in the conversation. I recommend treating this as input for a human reviewer, not as a final decision.",
      },
      {
        q: "Does it work in a mobile browser?",
        a: "Yes, modern mobile browsers support the microphone access and video streaming needed. Performance depends on the device and network, so I test on mid-range phones as well as desktops, and include a graceful text fallback if audio or video cannot start.",
      },
      {
        q: "What does each session cost to run?",
        a: "Costs come from avatar streaming minutes, speech-to-text and text-to-speech usage, and model tokens, each billed by its provider. I build a cost estimate per session from your target length before the build, and track actual cost per session afterwards, so you can set pricing or usage limits with real numbers.",
      },
    ],
    serviceType: "AI avatar development",
  },

  // ---------------------------------------------------------------------------
  // Automation development
  // ---------------------------------------------------------------------------
  {
    slug: "automation-development",
    group: "solution",
    navLabel: "Automation Development",
    cardBlurb:
      "AI automation pipelines for documents, content and scheduled work, with webhooks in and out and a human review step where it counts.",
    icon: "workflow",
    metaTitle: "AI Automation Development: Pipelines and Scheduled Jobs",
    metaDescription:
      "AI automation development for repetitive work: document extraction, content pipelines, scheduled jobs, webhook triggers and human review before anything ships.",
    eyebrow: "Solution · Automation",
    h1: "AI automation development for work your team repeats every week",
    intro:
      "If people on your team copy data between systems, read documents to fill in forms, or produce the same kind of content on a schedule, that work can often become a pipeline. I build AI automation that does the repetitive part and routes the judgement calls to a person.",
    highlights: [
      "Document extraction",
      "Content pipelines",
      "Scheduled and webhook triggers",
      "Human review queues",
    ],
    diagram: {
      title: "Anatomy of an automation pipeline",
      caption:
        "Each step saves its output, so a failed run resumes from the step that broke instead of starting over.",
      steps: [
        "Trigger fires",
        "Fetch inputs",
        "AI processing step",
        "Validate output",
        "Human review",
        "Deliver result",
      ],
    },
    sections: [
      {
        id: "what-to-automate",
        heading: "Finding what is worth automating",
        body: [
          "Good candidates are frequent, follow a recognisable pattern, and have a clear definition of a correct result. Reading supplier invoices into an accounting system fits. Negotiating contracts does not. I start by listing the repetitive tasks with the people who do them, noting how often each happens and what errors cost. We automate the task where frequency and cost of mistakes together justify the build.",
        ],
      },
      {
        id: "pipeline-types",
        heading: "Common pipelines I build",
        body: [
          "Most automation work falls into a few patterns, often combined. Each uses a language model only where judgement or language is involved, with ordinary code handling the rest. Keeping the model's role narrow makes each step cheaper, easier to test, and much simpler to debug when an output looks wrong.",
        ],
        points: [
          { title: "Document extraction", text: "Invoices, forms, contracts or resumes turned into structured fields with confidence scores." },
          { title: "Content pipelines", text: "Research, outline, draft, check and publish, with review before anything goes live." },
          { title: "Scheduled jobs", text: "Nightly reports, data syncs, reminders and summaries that run without anyone pressing a button." },
          { title: "Webhook reactions", text: "An event in one system, such as a new order or form submission, triggers work in another." },
          { title: "Classification and routing", text: "Incoming emails or tickets tagged and sent to the right queue." },
        ],
        links: [
          { label: "AI agent development", href: "/ai-agent-development" },
          { label: "Python developer", href: "/python-developer" },
        ],
      },
      {
        id: "blog-example",
        heading: "An example: my blog automation pipeline",
        body: [
          "My blog automation project shows how these pieces fit. It starts from a trending topic, moves through keyword research, outline and draft generation, applies SEO processing, and then stops for human review before publishing. Qdrant stores embeddings of existing posts, which serves two jobs: suggesting internal links to related articles and flagging drafts that duplicate something already published.",
          "The same shape applies to many content operations, whether product descriptions, newsletters or internal reports. The stages change names, but the structure holds: gather inputs, generate a draft, check it against rules and existing material, then let a person approve it before it reaches an audience.",
        ],
        links: [{ label: "Blog automation case study", href: "/projects/blog-automation" }],
      },
      {
        id: "human-review",
        heading: "Human review where it matters",
        body: [
          "Full automation is rarely the right starting point. Each pipeline has a review step where output that is uncertain, high-value or public-facing waits for a person. Extraction results below a confidence threshold, drafts before publishing, and any payment above a set amount all go to a review queue. Reviewers see the input, the output and the reasoning side by side, and can approve, correct or reject.",
          "Corrections are stored, which gives you evidence over time about when a step is reliable enough to skip review. Loosening review then becomes a decision based on a record of approved and corrected items, rather than a hopeful guess made after a few good days.",
        ],
      },
      {
        id: "reliability",
        heading: "Making pipelines reliable",
        body: [
          "Automation breaks quietly, which is worse than breaking loudly. Every step writes its output and status to the database, so a failed run resumes from the step that failed. Jobs run from a Redis-backed queue with retries and backoff, incoming webhooks are verified and de-duplicated, and model outputs are checked against a schema before being passed on. When something fails repeatedly, a person is alerted with the details, not just a stack trace.",
        ],
        points: [
          { title: "Resumable steps", text: "State saved between stages, so reruns skip completed work." },
          { title: "Schema checks", text: "Model outputs validated as structured data before use downstream." },
          { title: "Verified webhooks", text: "Signatures checked, duplicates ignored, events processed once." },
          { title: "Alerts", text: "Failures and growing review queues notify the right person." },
        ],
      },
      {
        id: "scope-decisions",
        heading: "Scope and decisions for you",
        body: [
          "You decide which steps need human review, who reviews, acceptable turnaround time, and what happens when a reviewer is away. I deliver the pipeline, the review interface, monitoring, and documentation of each step's inputs and outputs. Out of scope by default: automating decisions with legal or financial liability without a human sign-off, and robotic automation of desktop software that has no API or export.",
        ],
        links: [{ label: "Backend developer", href: "/backend-developer" }],
      },
      {
        id: "first-call",
        heading: "Bring examples of the work",
        body: [
          "Bring real samples of the inputs and the finished outputs: a batch of the documents, the spreadsheet they end up in, or the content that gets produced. Tell me how often the task happens, who does it now, and which systems are involved. Knowing what a mistake costs helps us set review thresholds, and I can usually run a quick extraction or generation test on your samples early.",
        ],
      },
    ],
    stack: [
      { group: "AI", items: ["OpenAI", "Gemini", "OpenRouter", "LangChain"] },
      { group: "Pipelines", items: ["Node.js", "FastAPI", "Redis queues", "AWS Lambda"] },
      { group: "Data", items: ["PostgreSQL", "MongoDB", "Qdrant", "AWS S3"] },
      { group: "Review UI", items: ["Next.js", "React", "Tailwind CSS"] },
    ],
    projects: ["blog-automation", "resume-analyzer", "chat-with-pdf"],
    related: ["ai-agent-development", "api-development", "python-developer", "ai-developer", "generative-ai-developer"],
    faqs: [
      {
        q: "How is this different from Zapier or Make?",
        a: "Tools like Zapier are excellent for simple connections between popular apps. Custom automation makes sense when you need document understanding, multi-step AI processing, review queues, your own data rules, or volumes where per-task pricing gets expensive. Sometimes the right answer is a mix, with a custom pipeline for the hard part.",
      },
      {
        q: "How accurate is AI document extraction?",
        a: "It varies with document quality and layout consistency, so I measure it on your own samples rather than quoting a figure. Every extracted field carries a confidence signal, and low-confidence results go to review. Over time, the review corrections show which fields are reliable and which still need a person.",
      },
      {
        q: "Can automations run on a schedule and on events?",
        a: "Yes. Scheduled triggers handle daily reports, syncs and batch processing. Event triggers use webhooks from your other systems, such as a new form submission or an uploaded file. Both feed the same queue, so a pipeline behaves the same way regardless of what started it.",
      },
      {
        q: "What happens if the AI provider has an outage?",
        a: "Jobs fail their AI step, wait and retry with backoff, and resume from that step once the provider responds again. For critical pipelines I can configure a fallback model from a different provider. Nothing is lost, because inputs and completed steps are stored before the AI call is made.",
      },
      {
        q: "Can I see what the automation did?",
        a: "Every run has a record showing the trigger, each step's input and output, timing, cost and any review decisions. You can search runs, filter failures and open a single run to see exactly what happened, which matters when someone asks why a particular document was processed a certain way.",
      },
    ],
    serviceType: "AI automation development",
  },
];
