import type { LandingPage } from "@/types/content";

export const developerAiPages: LandingPage[] = [
  // ---------------------------------------------------------------------------
  // JavaScript developer
  // ---------------------------------------------------------------------------
  {
    slug: "javascript-developer",
    group: "developer",
    navLabel: "JavaScript Developer",
    cardBlurb:
      "Plain JavaScript that respects the runtime: event loop, async flow, browser APIs, lean bundles and embeddable widgets.",
    icon: "braces",
    metaTitle: "JavaScript Developer for Browser and Runtime Work",
    metaDescription:
      "JavaScript developer in Bangalore working close to the runtime: event loop behaviour, async patterns, browser APIs, lean bundles and dependency-free widgets.",
    eyebrow: "JavaScript Developer",
    h1: "JavaScript Developer Who Works Close to the Runtime",
    intro:
      "I write JavaScript with the event loop, the browser platform and the final bundle in mind, so the code that ships is small, predictable and easy to debug when something stalls.",
    summary: [
      "I write JavaScript with the event loop in mind, chunking heavy loops or moving CPU work into Web Workers so the page keeps painting and responding.",
      "Async code handles failure on purpose: AbortController cancels stale requests, request IDs drop late responses, and the Promise combinator is chosen per batch.",
      "Before adding a dependency I check browser APIs such as IntersectionObserver, ResizeObserver, Streams and Intl, then use bundle analysis to confirm what actually ships.",
      "Embeddable widgets are built as small vanilla modules with one script tag, Shadow DOM style isolation, origin-checked postMessage and versioned releases.",
    ],
    highlights: [
      "Event loop and async flow",
      "Browser APIs before libraries",
      "Bundle size and main-thread cost",
      "Framework-free embeddable widgets",
    ],
    diagram: {
      title: "One turn of the event loop",
      caption:
        "Why a long synchronous function freezes the page: nothing else, including rendering, runs until the stack is empty.",
      steps: [
        "Run current task",
        "Drain microtasks",
        "Update rendering",
        "Pick next task",
      ],
    },
    sections: [
      {
        id: "runtime-model",
        heading: "How the runtime model shapes the code I write",
        body: [
          "Most confusing JavaScript bugs come from ordering: a promise callback running before a timeout, a state update landing after the component that asked for it is gone, or a click handler that blocks painting for half a second. I reason about these using the actual model of one call stack, a microtask queue for promise reactions, a task queue for timers and events, and a rendering step the browser only reaches when the stack is clear.",
          "That model changes concrete decisions. Heavy loops get chunked with scheduler yields or moved to a Web Worker. Recursive promise chains that starve rendering get broken up. Timers are never used as a way to wait for something that has a real event I can listen to instead.",
        ],
        points: [
          {
            title: "Microtasks first",
            text: "Promise reactions and queueMicrotask run before the browser can paint, so an endless microtask loop freezes the tab.",
          },
          {
            title: "Long tasks show up",
            text: "Anything over roughly 50ms on the main thread hurts input responsiveness, so I profile before guessing.",
          },
          {
            title: "Workers for CPU work",
            text: "Parsing, hashing and large transforms move off the main thread and report back with postMessage.",
          },
        ],
      },
      {
        id: "async-patterns",
        heading: "Async patterns that stay readable under failure",
        body: [
          "async and await make the happy path look simple, and they hide the unhappy ones. I decide up front what happens when a request is slow, cancelled or fails halfway. AbortController gets wired through fetch calls so a user typing in a search box cancels the previous request rather than racing it. Stale responses are dropped by comparing a request id, not by hoping the network answers in order.",
          "For fan-out work I pick the combinator on purpose: Promise.all when one failure should fail the batch, Promise.allSettled when partial results are useful, and a small concurrency limiter when firing two hundred requests at once would overwhelm the API on the other side.",
        ],
      },
      {
        id: "browser-apis",
        heading: "Using the browser platform before adding a dependency",
        body: [
          "The platform now covers a lot of what used to need a package. Before installing something I check whether a built-in API already solves it, because every dependency adds bytes, update churn and another place for a security advisory to appear.",
        ],
        points: [
          {
            title: "IntersectionObserver",
            text: "Lazy loading, infinite lists and scroll-triggered effects without scroll listeners on every frame.",
          },
          {
            title: "ResizeObserver",
            text: "Components that respond to their own container size instead of polling window dimensions.",
          },
          {
            title: "Streams and fetch",
            text: "Reading a response body incrementally, which is how streamed logs and token-by-token AI output reach the screen.",
          },
          {
            title: "URL and history",
            text: "Filters and tabs stored in the query string so a shared link restores the same view.",
          },
          {
            title: "Intl",
            text: "Dates, currencies and plural rules formatted correctly per locale without a formatting library.",
          },
        ],
      },
      {
        id: "bundling-performance",
        heading: "Bundling, code splitting and what actually ships",
        body: [
          "Performance work starts with measuring what the user downloads and executes. I read bundle analyzer output, look for duplicated packages and large dependencies pulled in for one function, and check whether tree shaking is actually working or being defeated by side-effectful imports and CommonJS modules.",
          "Code that only some users need, like an editor, a chart library or an admin panel, goes behind a dynamic import. I pay attention to parse and execute time as well as transfer size, because a mid-range phone spends real milliseconds compiling JavaScript that a fast laptop barely notices.",
        ],
        links: [
          { label: "Next.js developer", href: "/nextjs-developer" },
          { label: "Frontend developer", href: "/frontend-developer" },
        ],
      },
      {
        id: "vanilla-widgets",
        heading: "Framework-free widgets for pages you do not control",
        body: [
          "Some JavaScript has to run on someone else's website: a chat bubble, a booking form, a feedback button. Shipping React into a host page that already runs its own framework is a bad trade, so I build these as small vanilla modules with a single script tag, a clear init function and no globals beyond one namespace.",
          "Styles live inside a Shadow DOM root so the host page's CSS cannot break the widget and the widget cannot leak into the host. Communication with an iframe or backend goes through postMessage with origin checks, and the loader script is versioned so a bad release can be rolled back without customers editing their HTML.",
        ],
        points: [
          {
            title: "One script tag",
            text: "Async loader that injects the real bundle and exposes a documented init call.",
          },
          {
            title: "Style isolation",
            text: "Shadow DOM keeps host styles out and widget styles in.",
          },
          {
            title: "Origin-checked messaging",
            text: "postMessage handlers verify the sender before acting on any payload.",
          },
          {
            title: "Versioned releases",
            text: "Pinned and latest channels so embeds can update or stay put deliberately.",
          },
        ],
      },
      {
        id: "adopting-typescript",
        heading: "Where TypeScript gets adopted, and in what order",
        body: [
          "I do not treat a JavaScript codebase as broken just because it lacks types. When a team wants more safety, I start where mistakes are expensive: API boundaries, shared utilities and data models. JSDoc annotations with checkJs enabled give type checking on existing .js files without renaming anything, which lets a team feel the benefit before committing to a migration.",
          "From there, files convert one at a time as they are touched, and compiler strictness is raised in steps so the error count stays manageable. Runtime validation stays at the edges regardless, because compile-time types say nothing about what a server, a third-party script or localStorage actually hands back at runtime.",
        ],
        links: [
          { label: "TypeScript developer", href: "/typescript-developer" },
          { label: "React developer", href: "/react-developer" },
        ],
      },
      {
        id: "server-javascript",
        heading: "The same language on the server",
        body: [
          "On Node.js the runtime concerns carry over with different stakes. A blocking JSON.parse on a huge payload stalls every concurrent request, not just one tab. I use streams for large files and uploads, worker threads for CPU-bound jobs, and keep an eye on unhandled promise rejections because they can take down a process. Build logs streamed line by line to a browser, as in my Vercel clone, rely on exactly this kind of streaming on both ends.",
        ],
        links: [
          { label: "Node.js developer", href: "/nodejs-developer" },
          { label: "Vercel clone case study", href: "/projects/vercel-clone" },
        ],
      },
    ],
    stack: [
      {
        group: "Language and runtime",
        items: ["Modern JavaScript (ES2023+)", "Node.js", "Web Workers", "JSDoc types"],
      },
      {
        group: "Browser platform",
        items: ["Fetch and Streams", "IntersectionObserver", "Shadow DOM", "postMessage"],
      },
      {
        group: "Build and performance",
        items: ["Vite", "Webpack", "Bundle analysis", "Chrome DevTools profiling"],
      },
      {
        group: "Adjacent",
        items: ["TypeScript", "React", "Next.js"],
      },
    ],
    projects: ["vercel-clone", "ai-avatar", "resume-analyzer"],
    related: ["typescript-developer", "frontend-developer", "nodejs-developer", "react-developer"],
    faqs: [
      {
        q: "Do you only work in frameworks, or can you write plain JavaScript?",
        a: "I work in both. Frameworks make sense for full applications, but embeddable widgets, small interactive pieces on content sites and browser extensions often work better as plain modules. I pick based on where the code runs, who maintains it and how much it can weigh, rather than defaulting to React for everything.",
      },
      {
        q: "Can you fix a page that feels slow or freezes on interaction?",
        a: "Usually, yes. I start with a performance recording to find long tasks, layout thrashing or heavy third-party scripts, then fix the specific cause: splitting work across frames, moving computation to a worker, deferring non-critical scripts or removing a dependency. Guessing at fixes without a profile tends to waste time.",
      },
      {
        q: "Should our JavaScript project move to TypeScript?",
        a: "It depends on team size, how long the code will live and how often bugs come from wrong data shapes. For many teams a gradual path works well: enable checkJs with JSDoc on critical modules first, then convert files when they are touched. A big-bang rewrite is rarely worth the pause in feature work.",
      },
      {
        q: "How do you handle race conditions in async UI code?",
        a: "I cancel what is no longer needed with AbortController, tag requests so late responses are ignored, and keep one source of truth for loading and error state. For effects that depend on changing inputs, cleanup functions abort in-flight work, which prevents older results from overwriting newer ones on slow connections.",
      },
      {
        q: "Can you build a widget that customers embed on their own sites?",
        a: "Yes. I build these as a small loader script plus a versioned bundle, with Shadow DOM for style isolation, a documented init API and origin checks on any cross-frame messages. I also test against pages with aggressive global CSS and older browsers, because the host environment is outside your control.",
      },
    ],
    serviceType: "JavaScript development",
  },

  // ---------------------------------------------------------------------------
  // Python developer
  // ---------------------------------------------------------------------------
  {
    slug: "python-developer",
    group: "developer",
    navLabel: "Python Developer",
    cardBlurb:
      "FastAPI services, async Python and Pydantic contracts for AI and data pipelines that plug cleanly into Node.js and Next.js apps.",
    icon: "terminal",
    metaTitle: "Python Developer for FastAPI and AI Pipelines",
    metaDescription:
      "Python developer building FastAPI services, async workers and Pydantic-typed AI and document pipelines that integrate with Node.js and Next.js frontends.",
    eyebrow: "Python Developer",
    h1: "Python Developer for FastAPI Services and AI Pipelines",
    intro:
      "I use Python where its ecosystem is strongest, for AI, document processing and data work, and wrap it in FastAPI services with typed contracts so the rest of a JavaScript stack can call it safely.",
    summary: [
      "I use Python where its libraries are strongest, such as document processing, OCR, pandas and AI frameworks, and keep user-facing apps, auth and billing in Node.js.",
      "Services are built with FastAPI, thin routers and dependency injection, and the generated OpenAPI schema feeds a typed TypeScript client for the frontend.",
      "Async endpoints use non-blocking clients like httpx and asyncpg, while CPU-heavy parsing moves to a process pool or a separate job worker.",
      "Long document jobs are queued and return an ID immediately, so a Next.js or Node app can poll or subscribe for status instead of waiting.",
    ],
    highlights: [
      "FastAPI with typed contracts",
      "Async I/O done correctly",
      "Document and AI pipelines",
      "Clean handoff to Next.js",
    ],
    diagram: {
      title: "A Python service behind a Next.js app",
      caption:
        "The frontend never talks to the Python worker directly. Requests go through an API layer, and long jobs report status asynchronously.",
      steps: [
        "Next.js request",
        "FastAPI endpoint",
        "Pydantic validation",
        "Queue background job",
        "Worker processes data",
        "Status back to UI",
      ],
    },
    sections: [
      {
        id: "why-python",
        heading: "When Python is the right part of the stack",
        body: [
          "Most of my product work is TypeScript end to end, so adding Python is a deliberate choice rather than a habit. It earns its place when the job depends on libraries that are strongest in Python: PDF and OCR tooling, data manipulation with pandas, scientific packages, and AI frameworks that often ship Python support first.",
          "In those cases I keep Python focused on the work it does well and expose it through a small, well-defined HTTP API. The user-facing app, auth and billing usually stay in Node.js or Next.js, which keeps the Python service replaceable and easy to scale on its own.",
        ],
      },
      {
        id: "fastapi-services",
        heading: "FastAPI services with clear boundaries",
        body: [
          "FastAPI gives me request validation, dependency injection and an OpenAPI schema from the same type hints, which removes a lot of glue code. I organise services by feature, with routers kept thin and business logic in plain functions that can be tested without spinning up a server.",
          "Dependencies handle database sessions, auth checks and settings, so each endpoint declares what it needs instead of reaching for globals. The generated OpenAPI document is not just decoration: it is the contract the frontend team generates a typed client from.",
        ],
        points: [
          {
            title: "Thin routers",
            text: "Endpoints parse input and call a service function; they do not contain business rules.",
          },
          {
            title: "Dependency injection",
            text: "DB sessions, current user and config are injected, which makes tests straightforward to set up.",
          },
          {
            title: "OpenAPI as contract",
            text: "The schema feeds a generated TypeScript client, so type drift between services gets caught at build time.",
          },
          {
            title: "Health and readiness",
            text: "Separate endpoints so container orchestrators know when a service can take traffic.",
          },
        ],
      },
      {
        id: "async-python",
        heading: "Async Python without accidental blocking",
        body: [
          "An async def endpoint is only fast if everything it awaits is truly non-blocking. A single synchronous database driver call or a CPU-heavy PDF parse inside the event loop quietly serialises every request on that worker. I use async clients such as httpx and asyncpg for I/O, and push CPU-bound work to a process pool or a separate job worker.",
          "When calling external model APIs concurrently, I bound concurrency with a semaphore, set timeouts on every call and handle cancellation so a client disconnect does not leave expensive requests running in the background. Sync code that cannot be rewritten gets wrapped with run_in_threadpool rather than called directly inside the loop.",
        ],
        points: [
          {
            title: "Async clients for I/O",
            text: "httpx, asyncpg and async Redis clients so awaits actually yield.",
          },
          {
            title: "Processes for CPU",
            text: "Parsing and heavy transforms run in a process pool or a separate worker.",
          },
          {
            title: "Bounded fan-out",
            text: "Semaphores and timeouts around every outbound model or API call.",
          },
        ],
      },
      {
        id: "pydantic-contracts",
        heading: "Pydantic models as the source of truth",
        body: [
          "Pydantic models define what comes in, what goes out and what gets stored in between. Validation happens once at the edge, and inside the service the code can trust its data. Settings are loaded through a Pydantic settings class, so a missing environment variable fails at startup instead of at the first request that needs it.",
          "The same models are useful for AI work. When a model is asked for structured output, a Pydantic schema describes the expected JSON, and the response is parsed against it. Anything that fails validation gets retried or flagged, never passed downstream as a half-formed dictionary.",
        ],
      },
      {
        id: "document-pipelines",
        heading: "Document extraction and AI data pipelines",
        body: [
          "Document work is where Python pays off most. Real files are messy: scanned pages, multi-column layouts, tables that span pages, headers repeated on every sheet. A pipeline that handles them has distinct stages, each with its own failure handling, rather than one function that tries to do everything.",
        ],
        points: [
          {
            title: "Detect and route",
            text: "Text-based PDFs go to a fast parser; scanned pages go to OCR.",
          },
          {
            title: "Normalise",
            text: "Strip repeated headers and footers, fix hyphenation, keep page numbers for later citation.",
          },
          {
            title: "Extract structure",
            text: "Tables, sections and key fields pulled into typed records, with LLM help only where rules fall short.",
          },
          {
            title: "Validate and store",
            text: "Records checked against a schema, low-confidence fields marked for review, results persisted with the source reference.",
          },
        ],
        links: [
          { label: "RAG developer", href: "/rag-developer" },
          { label: "Chat with PDF case study", href: "/projects/chat-with-pdf" },
        ],
      },
      {
        id: "node-integration",
        heading: "Integrating Python services with Node.js and Next.js",
        body: [
          "The integration pattern depends on how long the work takes. Quick lookups are a direct HTTP call from a Next.js route handler or Node API to FastAPI, with a typed client and a timeout. Anything that can take more than a few seconds becomes a job: the request enqueues work, returns an id, and the frontend polls or subscribes for status.",
          "I keep auth centralised in the main app and have it call the Python service with a service token or signed request, so the Python side does not have to implement user sessions. Shared schemas and a single place for error formats keep failures readable on both sides.",
        ],
        links: [
          { label: "Node.js developer", href: "/nodejs-developer" },
          { label: "Backend developer", href: "/backend-developer" },
        ],
      },
      {
        id: "testing-deployment",
        heading: "Testing and shipping Python services",
        body: [
          "Services get pytest suites with fixtures for the database and fake clients for external APIs, so tests run offline and fast. For AI steps, I keep a small set of recorded inputs and expected structured outputs to catch regressions when prompts or models change. Deployment is a slim Docker image with pinned dependencies, run behind the same CI pipeline and environments as the rest of the product.",
        ],
      },
    ],
    stack: [
      { group: "Web and API", items: ["FastAPI", "Pydantic", "Uvicorn", "httpx"] },
      { group: "Data and storage", items: ["PostgreSQL", "Redis", "Qdrant", "pandas"] },
      { group: "AI and documents", items: ["OpenAI", "Gemini", "LangChain", "PDF parsing and OCR"] },
      { group: "Delivery", items: ["pytest", "Docker", "GitHub Actions", "AWS"] },
    ],
    projects: ["chat-with-pdf", "resume-analyzer", "blog-automation"],
    related: ["backend-developer", "ai-developer", "rag-developer", "api-development"],
    faqs: [
      {
        q: "Should I build my backend in Python or Node.js?",
        a: "If the product is mostly CRUD, auth and real-time UI, a single TypeScript stack is usually simpler to hire for and maintain. Python makes sense when core features depend on its libraries, such as document parsing, data science or specific AI tooling. A common middle ground is a Node or Next.js app with one focused Python service.",
      },
      {
        q: "Can you add a Python AI service to our existing Next.js app?",
        a: "Yes. I would expose the Python work through FastAPI with an OpenAPI schema, generate a typed client for the Next.js side, keep authentication in the existing app, and move long-running work into background jobs with status updates. Your frontend code changes very little beyond calling the new endpoints.",
      },
      {
        q: "Is FastAPI production ready?",
        a: "It is widely used in production. What matters more is how the service is built around it: non-blocking I/O, proper timeouts, structured logging, health checks, running several workers behind a process manager or container orchestrator, and keeping CPU-heavy work off the request path. I set those up as part of the service, not afterwards.",
      },
      {
        q: "How do you handle long document processing jobs?",
        a: "The upload request stores the file and enqueues a job, then returns immediately. A worker processes the document in stages, saving progress so a failure can resume rather than restart. The frontend shows status from a jobs table. Large files never block an HTTP worker, and retries are safe because each stage is idempotent.",
      },
      {
        q: "Do you use type hints throughout Python code?",
        a: "Yes. Type hints plus Pydantic at the boundaries, checked with mypy or pyright in CI, make Python services much easier to refactor. They also drive FastAPI validation and the OpenAPI schema, so the effort pays off twice. I avoid passing raw dictionaries between layers once data has been validated.",
      },
    ],
    serviceType: "Python development",
  },

  // ---------------------------------------------------------------------------
  // AI developer
  // ---------------------------------------------------------------------------
  {
    slug: "ai-developer",
    group: "developer",
    navLabel: "AI Developer",
    cardBlurb:
      "LLM integrations, RAG, agents and AI automation built into real products, with streaming, structured outputs and cost control.",
    icon: "brain",
    metaTitle: "AI Developer for LLM Apps, RAG and Agents",
    metaDescription:
      "AI developer building LLM features, RAG, agents and automation with OpenAI, Gemini, LangChain and vector databases, shipped as production AI SaaS products.",
    eyebrow: "AI Developer",
    h1: "AI Developer Building LLM Features Into Real Products",
    intro:
      "I build AI features as ordinary software with unusual failure modes: model calls get schemas, timeouts, streaming, logging and fallbacks, and they sit inside a product people actually use.",
    summary: [
      "I build four kinds of AI product: conversational interfaces, retrieval apps over private documents, multi-step automation pipelines, and analysis tools with structured output.",
      "Model calls go through a thin internal interface with adapters for OpenAI, Gemini and OpenRouter, so switching providers becomes a configuration change rather than a refactor.",
      "When code acts on an answer, I request JSON against a schema and validate it with Zod or Pydantic, while chat replies stream token by token.",
      "Production readiness means per-user cost tracking, caching of repeated work, prompt injection defences on user content, and an evaluation set rerun before prompts or models change.",
    ],
    highlights: [
      "OpenAI, Gemini and OpenRouter",
      "RAG with vector databases",
      "Agents and automation pipelines",
      "Streaming and structured output",
    ],
    diagram: {
      title: "How an AI feature request flows",
      caption:
        "The model call is one step among several. Most of the reliability comes from what happens before and after it.",
      steps: [
        "User request",
        "Assemble context",
        "Model call",
        "Validate output",
        "Stream to UI",
        "Log and evaluate",
      ],
    },
    sections: [
      {
        id: "what-i-build",
        heading: "The kinds of AI products I build",
        body: [
          "My AI work spans four shapes of product. Conversational interfaces, like the real-time interview avatar that listens, asks follow-ups and gives structured feedback. Retrieval apps, like chat with PDF, where answers must come from the user's documents. Automation pipelines, like the blog system that moves from topic research to a reviewed draft. And analysis tools, like the resume analyzer that compares a CV against a job description.",
          "Each shape has a different core problem, and knowing which one you are building sets the priorities. Conversation is dominated by latency, retrieval by relevance, automation by reliability across many dependent steps, and analysis by consistent structured output that the interface can render the same way every time.",
        ],
        links: [
          { label: "AI avatar case study", href: "/projects/ai-avatar" },
          { label: "Resume analyzer case study", href: "/projects/resume-analyzer" },
        ],
      },
      {
        id: "llm-integrations",
        heading: "LLM integrations that survive provider changes",
        body: [
          "Models and pricing change every few months, so I avoid scattering vendor SDK calls across a codebase. A thin internal interface handles generation, structured output and embeddings, with adapters for OpenAI, Gemini and OpenRouter behind it. Feature code asks for a capability, not a specific model name.",
          "That layer is also where timeouts, retries with backoff, per-user rate limits and usage logging live. When a provider has an outage or a cheaper model becomes good enough for a task, the change is a config edit rather than a refactor.",
        ],
        points: [
          {
            title: "Capability interface",
            text: "Feature code calls generate, extract or embed, never a vendor SDK directly.",
          },
          {
            title: "Provider adapters",
            text: "OpenAI, Gemini and OpenRouter behind the same contract.",
          },
          {
            title: "Central policies",
            text: "Timeouts, retries, rate limits and usage logs defined once.",
          },
        ],
      },
      {
        id: "structured-streaming",
        heading: "Structured outputs and streaming responses",
        body: [
          "Free text is fine for a chat bubble but useless for code that needs to act on the answer. When the app needs fields, scores or lists, I request JSON against a schema and validate the result with Zod or Pydantic before anything else touches it. Invalid output triggers a constrained retry, and repeated failures surface as a handled error.",
          "Streaming matters for perceived speed. Tokens are streamed from the server to the browser so users see progress immediately instead of staring at a spinner, while the server still assembles the full response for logging, moderation and post-processing once the stream closes.",
        ],
        points: [
          {
            title: "Schema first",
            text: "Define the output shape before writing the prompt, then test the prompt against it.",
          },
          {
            title: "Validate every response",
            text: "Parsed output is checked at runtime; the model's promise to follow a format is not enough.",
          },
          {
            title: "Stream where humans wait",
            text: "Chat and long answers stream; background jobs do not need to.",
          },
        ],
      },
      {
        id: "rag-vector",
        heading: "RAG and vector databases",
        body: [
          "When answers must be grounded in private data, I build retrieval-augmented generation: documents are parsed, chunked, embedded and stored in a vector database such as Qdrant, then the most relevant chunks are retrieved and passed to the model with instructions to cite them. Metadata filters keep one customer's documents away from another's queries.",
          "Retrieval quality usually decides whether a RAG feature is trusted by its users. If the right passage never reaches the model, no prompt can rescue the answer, so I spend more time on chunking, filtering and retrieval evaluation than on wording the final instruction.",
        ],
        links: [
          { label: "RAG developer", href: "/rag-developer" },
          { label: "Chat with PDF case study", href: "/projects/chat-with-pdf" },
        ],
      },
      {
        id: "agents-automation",
        heading: "Agents and AI automation",
        body: [
          "An agent is a model that can call tools in a loop. I build them when the path through a task genuinely varies, and I prefer a fixed pipeline when it does not, because fixed steps are easier to test and cheaper to run. The blog automation system, for example, is a pipeline with clear stages and a human approval gate, not a free-roaming agent.",
          "When an agent is the right fit, tools are narrow and typed, the loop has a step limit, destructive actions need confirmation from a person, and every tool call is logged with its inputs and outputs so a bad run can be replayed and understood later.",
        ],
        links: [
          { label: "AI agent development", href: "/ai-agent-development" },
          { label: "Blog automation case study", href: "/projects/blog-automation" },
        ],
      },
      {
        id: "langchain-choice",
        heading: "Where LangChain helps and where I skip it",
        body: [
          "LangChain is useful for document loaders, text splitters and swapping vector stores, and I use it for those parts of RAG work. For simple prompt-in, JSON-out calls I often use the provider SDK directly, because an extra abstraction makes debugging harder without adding much. The choice is made per feature, based on what the framework actually saves.",
        ],
      },
      {
        id: "production-concerns",
        heading: "What makes an AI SaaS product production ready",
        body: [
          "Shipping the demo is the easy part. Production AI features need cost tracking per user and per feature, abuse limits, prompt injection defences on any user-supplied content, graceful degradation when a provider is slow, and an evaluation set that runs before prompts or models change.",
        ],
        points: [
          {
            title: "Usage accounting",
            text: "Tokens and cost logged per request so pricing plans reflect real spend.",
          },
          {
            title: "Caching",
            text: "Repeated work, such as parsing the same resume, is cached instead of re-sent to the model.",
          },
          {
            title: "Input handling",
            text: "User content is treated as data, kept separate from instructions, and length-limited.",
          },
          {
            title: "Evals before release",
            text: "A fixed set of cases is re-run whenever prompts, models or retrieval settings change.",
          },
        ],
      },
    ],
    stack: [
      { group: "Models", items: ["OpenAI", "Gemini", "OpenRouter", "HeyGen"] },
      { group: "AI tooling", items: ["LangChain", "Embeddings", "Qdrant", "Zod and Pydantic schemas"] },
      { group: "Application", items: ["Next.js", "Node.js", "FastAPI", "TypeScript"] },
      { group: "Data and infra", items: ["PostgreSQL", "Redis", "Docker", "AWS"] },
    ],
    projects: ["ai-avatar", "blog-automation", "chat-with-pdf", "resume-analyzer"],
    related: ["llm-developer", "rag-developer", "generative-ai-developer", "ai-chatbot-development", "ai-developer-bangalore"],
    faqs: [
      {
        q: "What does an AI developer actually do on a product team?",
        a: "Beyond calling a model API, the work is designing the context the model sees, defining output schemas, building retrieval where needed, handling streaming and failures, tracking cost and latency, and setting up evaluations. It also includes the regular product engineering around it: auth, data models, UI and deployment.",
      },
      {
        q: "Which model provider do you recommend?",
        a: "It depends on the task. I compare candidates on your own examples for quality, latency and price, and I usually keep the integration provider-agnostic so switching later is cheap. Some products use more than one model, for instance a smaller one for classification and a stronger one for final answers.",
      },
      {
        q: "Can you add AI features to an existing app?",
        a: "Yes, and that is often a better start than building a new AI product. I look for a narrow feature with clear value, such as summarising records, extracting fields from uploads or answering questions over existing docs, and integrate it behind a feature flag with logging so you can see how it performs with real users.",
      },
      {
        q: "How do you keep AI costs under control?",
        a: "By choosing the smallest model that meets the quality bar for each step, trimming context to what is relevant, caching repeat work, setting per-user limits, and logging token usage per feature. Costs become visible early, which lets pricing and limits be set from real data instead of guesses.",
      },
      {
        q: "How do you handle hallucinations?",
        a: "You cannot remove them entirely, but you can reduce and contain them. Grounding answers in retrieved sources, asking for citations, validating structured output, instructing the model to say when it does not know, and routing uncertain cases to a human all help. Evaluations measure whether changes make it better or worse.",
      },
      {
        q: "Do you build AI agents?",
        a: "Yes, when the task needs them. I first check whether a fixed pipeline would do the job, since it is cheaper and easier to test. When a real agent is needed, I keep tools narrow, cap the number of steps, require confirmation for risky actions and log every call.",
      },
    ],
    serviceType: "AI application development",
  },

  // ---------------------------------------------------------------------------
  // Generative AI developer
  // ---------------------------------------------------------------------------
  {
    slug: "generative-ai-developer",
    group: "developer",
    navLabel: "Generative AI Developer",
    cardBlurb:
      "Generation workflows for text, voice and video with prompt design, evaluation, human review, guardrails and cost limits built in.",
    icon: "sparkles",
    metaTitle: "Generative AI Developer for Content Workflows",
    metaDescription:
      "Generative AI developer designing content and media generation workflows with staged prompts, evaluation, human-in-the-loop review, guardrails and cost limits.",
    eyebrow: "Generative AI Developer",
    h1: "Generative AI Developer for Reviewed, Repeatable Output",
    intro:
      "Generating one good output is easy. I build the workflow that produces good output on the hundredth run too, with staged prompts, automated checks, human review and a budget it stays inside.",
    summary: [
      "I split generation into stages such as research, outline, draft, refine and check, so each stage can be tested, retried or use a different model.",
      "Prompts live in the repository as versioned templates with typed variables, and every output records which prompt version and model produced it.",
      "Output is scored on a sample set of real inputs using deterministic checks plus a grader model with a strict rubric whenever a prompt or model changes.",
      "Anything published under a brand passes a human review screen showing sources and check results, and per-run budgets stop a pipeline that exceeds its cost limit.",
    ],
    highlights: [
      "Multi-stage generation",
      "Evaluation on real samples",
      "Human review gates",
      "Guardrails and budgets",
    ],
    diagram: {
      title: "A staged generation workflow",
      caption:
        "Breaking generation into stages makes each output inspectable and lets a reviewer fix one step without regenerating everything.",
      steps: [
        "Brief and inputs",
        "Plan or outline",
        "Generate draft",
        "Automated checks",
        "Human review",
        "Publish",
      ],
    },
    sections: [
      {
        id: "staged-workflows",
        heading: "Why I split generation into stages",
        body: [
          "A single giant prompt that produces a finished article, report or script is hard to control. When it goes wrong, you cannot tell which part of the instructions failed. I break generation into stages with their own inputs and outputs: research, plan, draft, refine, check. Each stage can use a different model, be tested alone and be retried without redoing the others.",
          "My blog automation pipeline works this way. A trending topic feeds keyword research, which feeds an outline, which feeds section-by-section drafting, then SEO processing and a review queue. Qdrant sits alongside to suggest internal links and flag drafts that duplicate existing posts.",
        ],
        links: [
          { label: "Blog automation case study", href: "/projects/blog-automation" },
          { label: "Automation development", href: "/automation-development" },
        ],
      },
      {
        id: "prompt-design",
        heading: "Prompt design as versioned code",
        body: [
          "Prompts live in the repository, not in a dashboard someone edits on a Friday. Each has a version, typed input variables and a defined output shape. Instructions are specific about audience, format and what to avoid, and examples are chosen to show edge cases rather than only the ideal answer.",
          "I keep instructions, reference material and user-supplied content in clearly separated, labelled parts of the prompt. That makes outputs more stable between runs and limits the damage when pasted user content happens to contain text that looks like instructions to the model.",
        ],
        points: [
          {
            title: "Versioned templates",
            text: "Every output records which prompt version and model produced it.",
          },
          {
            title: "Typed variables",
            text: "Inputs are validated before they reach a template, so missing context fails early.",
          },
          {
            title: "Style guides as data",
            text: "Tone, banned phrases and format rules are loaded per brand instead of hard-coded.",
          },
        ],
      },
      {
        id: "evaluation",
        heading: "Evaluating output that has no single right answer",
        body: [
          "Generated content cannot be unit tested with exact matches, but it can be evaluated. I build a sample set of real inputs and score outputs on criteria the team agrees on: factual consistency with the source, required sections present, length and reading level, banned terms absent. Some checks are deterministic code; others use a separate model as a grader with a strict rubric.",
          "The evaluation set runs whenever a prompt or model changes, and results are compared side by side with the previous version. That turns prompt edits from gut feel into a reviewable change, and it stops a fix for one kind of input from quietly breaking another.",
        ],
      },
      {
        id: "human-review",
        heading: "Human-in-the-loop review that people actually use",
        body: [
          "For anything published under a brand's name, a person approves it. The review screen matters as much as the model: reviewers see the draft next to its sources, automated check results and the stage that produced each part. They can edit inline, regenerate a single section with a note, or reject with a reason.",
          "Those edits and rejection reasons are stored with the draft. Over time they show which stages fail most often and what reviewers keep correcting by hand, and the worst examples become new cases for the evaluation set so the same mistake gets caught automatically next time.",
        ],
        points: [
          {
            title: "Context next to draft",
            text: "Sources, outline and check results shown alongside the text being reviewed.",
          },
          {
            title: "Partial regeneration",
            text: "Redo one section with guidance instead of starting the whole piece again.",
          },
          {
            title: "Feedback captured",
            text: "Edits and rejection reasons feed back into prompts and evaluations.",
          },
        ],
      },
      {
        id: "guardrails",
        heading: "Guardrails on inputs and outputs",
        points: [
          {
            title: "Input limits",
            text: "Length caps and filtering before anything reaches a prompt.",
          },
          {
            title: "Moderation",
            text: "Outputs screened for unsafe or off-brand content.",
          },
          {
            title: "Domain rules",
            text: "No invented numbers, no quotes from sources that were not supplied.",
          },
          {
            title: "Fail closed",
            text: "Anything that fails a check goes to review, not to publish.",
          },
        ],
        body: [
          "Guardrails sit on both sides of the model. Inputs are length-limited, stripped of content that should never reach a prompt, and checked for obvious injection attempts. Outputs pass through moderation, format validation and domain rules, such as never inventing statistics or quoting sources that were not supplied. Failing outputs are blocked or routed to review rather than silently published.",
        ],
      },
      {
        id: "cost-control",
        heading: "Keeping generation costs predictable",
        body: [
          "Generation costs scale with volume, so they need design, not just monitoring. I route cheap stages like classification and outlining to smaller models and reserve stronger ones for final drafting. Context is trimmed to what each stage needs, repeated inputs are cached, and batch jobs run with a per-run budget that stops the pipeline when it is exceeded.",
          "Every run logs tokens and cost per stage alongside the output it produced. That makes it clear which step to optimise first, and it gives a realistic cost per finished piece that can be compared against what the content is worth to the business.",
        ],
      },
      {
        id: "media-generation",
        heading: "Beyond text: voice and video generation",
        body: [
          "Media generation adds timing to the problem. In the AI interview avatar, speech is transcribed, a model writes the next question, text-to-speech and an avatar service render the reply, and the whole round trip has to feel conversational. That meant streaming at every stage and starting speech before the full answer was written. The resume analyzer, by contrast, generates structured, line-level suggestions where consistency matters more than speed.",
        ],
        links: [
          { label: "AI avatar case study", href: "/projects/ai-avatar" },
          { label: "AI avatar development", href: "/ai-avatar-development" },
        ],
      },
    ],
    stack: [
      { group: "Models and media", items: ["OpenAI", "Gemini", "OpenRouter", "HeyGen", "Speech-to-text and TTS"] },
      { group: "Workflow", items: ["Node.js job queues", "Redis", "Versioned prompt templates"] },
      { group: "Retrieval and checks", items: ["Qdrant", "Embeddings", "Schema validation", "Model-graded evals"] },
      { group: "Review UI", items: ["Next.js", "TypeScript", "Tailwind CSS"] },
    ],
    projects: ["blog-automation", "resume-analyzer", "ai-avatar"],
    related: ["ai-developer", "llm-developer", "automation-development", "ai-avatar-development"],
    faqs: [
      {
        q: "Can generative AI produce content we publish without review?",
        a: "For low-risk internal content, sometimes. For anything public or regulated, I recommend a human approval step, at least until evaluation data shows a stage is reliable. The workflow can be designed so review is quick: reviewers see sources and check results beside the draft and can fix one section instead of rewriting everything.",
      },
      {
        q: "How do you make generated content match our brand voice?",
        a: "I turn your style guide into structured rules the prompts load: tone, vocabulary, banned phrases, formatting and example passages. Automated checks enforce the measurable parts, and reviewer edits reveal where the prompts still drift. Voice improves through that loop rather than through a single perfect prompt.",
      },
      {
        q: "How do you evaluate creative output?",
        a: "By agreeing on concrete criteria first, such as accuracy against sources, required structure, length, reading level and forbidden content. Deterministic checks handle what code can measure, and a grader model with a strict rubric handles the rest. Results are compared across prompt versions so changes are judged on evidence.",
      },
      {
        q: "What stops a generation pipeline from running up a large bill?",
        a: "Per-run and per-day budgets enforced in code, model routing so expensive models only handle steps that need them, caching of repeated inputs and trimmed context. Every stage logs tokens and cost. If a budget is hit, the run pauses and reports instead of continuing quietly.",
      },
      {
        q: "Can you build voice or avatar-based generation?",
        a: "Yes. My AI interview avatar combines speech-to-text, LLM-generated follow-up questions, text-to-speech and a HeyGen avatar. The hard part is latency, which I handle by streaming between stages and starting playback before the full reply is complete, while still producing structured feedback at the end.",
      },
    ],
    serviceType: "Generative AI development",
  },

  // ---------------------------------------------------------------------------
  // LLM developer
  // ---------------------------------------------------------------------------
  {
    slug: "llm-developer",
    group: "developer",
    navLabel: "LLM Developer",
    cardBlurb:
      "Model selection, context engineering, JSON-schema outputs, tool calling and evals, tuned for token cost, latency and fallbacks.",
    icon: "message-square",
    metaTitle: "LLM Developer: Prompts, Tools, Schemas and Evals",
    metaDescription:
      "LLM developer handling model choice across OpenAI, Gemini and OpenRouter, context engineering, JSON schema output, tool calling, streaming, fallbacks and evals.",
    eyebrow: "LLM Developer",
    h1: "LLM Developer for Reliable Model Integrations",
    intro:
      "I work on the layer between your product and the model: which model to call, what context it sees, what shape the answer must take, and what happens when the call is slow, wrong or fails.",
    summary: [
      "I compare OpenAI, Gemini and OpenRouter models on your real inputs for quality, latency, price and format compliance, then route each task through configuration.",
      "Context is treated as a budget, with stable instructions first for prompt caching, labelled retrieved facts, summarised older history and user input kept as data.",
      "Structured output uses the provider's JSON schema mode plus runtime validation, and tool calls get narrow typed schemas, step limits and logged arguments.",
      "Calls have timeouts, retries with jitter and fallback models, and an eval suite runs in CI whenever prompts, models or context logic change.",
    ],
    highlights: [
      "Model routing and fallbacks",
      "Context engineering",
      "JSON schema and tool calling",
      "Evals tied to releases",
    ],
    diagram: {
      title: "Anatomy of a production LLM call",
      caption:
        "Each step is a place where quality, cost or latency is decided, and each can be measured separately.",
      steps: [
        "Pick model",
        "Build context",
        "Call with schema",
        "Run tool calls",
        "Validate or retry",
        "Stream and log",
      ],
    },
    sections: [
      {
        id: "model-selection",
        heading: "Choosing models on evidence, per task",
        body: [
          "There is no single best model, only the best fit for a given task, budget and latency target. I compare OpenAI, Gemini and models available through OpenRouter on a sample of your real inputs, scoring accuracy, format compliance, response time and price per request. Leaderboard results are a starting point at most.",
          "Different steps often end up on different models. Classification, routing and extraction may run on a small fast model, while final reasoning or long-form answers go to a stronger one. The routing lives in configuration so it can change as models improve.",
        ],
        points: [
          {
            title: "Quality",
            text: "Scored on your own examples, not public benchmarks alone.",
          },
          {
            title: "Latency",
            text: "Time to first token and total time measured under realistic load.",
          },
          {
            title: "Price",
            text: "Cost per request at expected input and output sizes.",
          },
          {
            title: "Format compliance",
            text: "How often the model follows the schema without a retry.",
          },
        ],
      },
      {
        id: "context-engineering",
        heading: "Prompt and context engineering",
        body: [
          "Most quality problems are context problems. The model either lacks information it needs or is buried in information it does not. I treat the context window as a budget: system instructions, task-specific rules, retrieved facts, conversation history and user input each get a planned share, and older history is summarised rather than dropped blindly.",
          "Order and structure matter too. Stable instructions go first so provider-side prompt caching can reuse them across requests, reference material is clearly delimited and labelled, and the actual question sits close to the end of the prompt, where models tend to attend to it most reliably.",
        ],
        points: [
          {
            title: "Instructions",
            text: "Short, specific, stable across requests, and placed first for cache reuse.",
          },
          {
            title: "Retrieved facts",
            text: "Only the chunks relevant to this turn, labelled with source ids for citation.",
          },
          {
            title: "History",
            text: "Recent turns verbatim, older ones summarised to keep the window under control.",
          },
          {
            title: "User input",
            text: "Delimited and treated as data, never merged into the instruction block.",
          },
        ],
      },
      {
        id: "structured-output",
        heading: "Structured output with JSON schema",
        body: [
          "When code consumes the answer, I use the provider's structured output mode with a JSON schema, and still validate the result at runtime. Schemas are kept shallow and explicit, with enums instead of free strings where possible, and descriptions on each field telling the model what belongs there.",
          "For the resume analyzer, this is what turns a model's reading of a CV into consistent data. Keyword coverage, formatting issues, role match and line-level suggestions all arrive in a fixed shape that the interface can render without guessing, and parsed resumes are cached so repeat analyses skip that work.",
        ],
        links: [
          { label: "Resume analyzer case study", href: "/projects/resume-analyzer" },
          { label: "TypeScript developer", href: "/typescript-developer" },
        ],
      },
      {
        id: "tool-calling",
        heading: "Tool calling with narrow, typed tools",
        body: [
          "Tool calling lets a model request actions: look up an order, search documents, create a draft. I define each tool with a precise schema and a description that says when to use it and when not to. The server validates arguments, enforces the user's permissions and returns compact results, because verbose tool output eats context fast.",
          "Loops have a maximum step count so a confused model cannot spin forever, tools that change data require explicit confirmation from the user, and every call is logged with its arguments and result, which makes it possible to replay a failed run and see where the model went wrong.",
        ],
        links: [{ label: "AI agent development", href: "/ai-agent-development" }],
      },
      {
        id: "streaming",
        heading: "Streaming responses end to end",
        body: [
          "Time to first token shapes how fast an app feels. I stream from the provider through the server to the browser using server-sent events or streamed fetch responses, with cancellation passed all the way back so a user closing the tab stops the upstream call. In the AI avatar project, streaming at each stage is what kept spoken conversation feeling natural.",
        ],
      },
      {
        id: "tradeoffs",
        heading: "Token, latency and cost trade-offs",
        body: [
          "Every LLM feature sits on a triangle of quality, speed and cost, and improving one usually costs another. Longer context can improve answers but adds latency and spend. Reasoning-heavy models are more accurate on hard tasks but slower. I make these trade-offs explicit per feature, write down the target for each, and measure against it.",
        ],
        points: [
          {
            title: "Trim context",
            text: "Fewer, better-chosen tokens beat stuffing the window.",
          },
          {
            title: "Cache prefixes",
            text: "Stable prompt prefixes enable provider caching and cut repeated cost.",
          },
          {
            title: "Cap output",
            text: "Max token limits and concise formats prevent runaway responses.",
          },
          {
            title: "Right-size models",
            text: "Small models for simple steps, larger ones only where they measurably help.",
          },
        ],
      },
      {
        id: "fallbacks",
        heading: "Fallbacks when a model call fails",
        body: [
          "Providers have outages, rate limits and bad days. Calls get timeouts and retries with jitter, then fall back to an alternative model or provider through the same interface, which is where OpenRouter or a second direct integration earns its keep. If every option fails, the user sees a clear message and the request is queued or saved, never a hanging spinner.",
        ],
      },
      {
        id: "evals",
        heading: "Evals that gate releases",
        body: [
          "An eval suite is a set of representative inputs with checks on the outputs: schema validity, required facts present, forbidden content absent, and rubric scores from a grader model where judgment is needed. It runs in CI whenever prompts, models or context logic change, and results are compared to the last accepted run so regressions are caught before users see them.",
        ],
      },
    ],
    stack: [
      { group: "Providers", items: ["OpenAI", "Gemini", "OpenRouter"] },
      { group: "Integration", items: ["Structured outputs", "Tool calling", "Server-sent events", "Zod and Pydantic"] },
      { group: "Context and retrieval", items: ["LangChain", "Embeddings", "Qdrant", "Redis caching"] },
      { group: "Application", items: ["Node.js", "Next.js", "FastAPI", "TypeScript"] },
    ],
    projects: ["resume-analyzer", "ai-avatar", "chat-with-pdf"],
    related: ["ai-developer", "rag-developer", "generative-ai-developer", "ai-chatbot-development"],
    faqs: [
      {
        q: "What is the difference between an LLM developer and an AI developer?",
        a: "The overlap is large. On this page I focus on the model integration layer itself: model choice, context, schemas, tools, streaming, fallbacks and evals. AI development more broadly also covers product scope, retrieval systems, automation pipelines and the application built around the model.",
      },
      {
        q: "Should we fine-tune a model?",
        a: "Usually not as a first step. Better context, clearer instructions, structured output and retrieval solve most problems more cheaply and are easier to update. Fine-tuning can make sense for a narrow, high-volume task with a stable format and plenty of good examples, once simpler approaches have been measured and found lacking.",
      },
      {
        q: "How do you guarantee the model returns valid JSON?",
        a: "I use the provider's structured output mode with a JSON schema, which makes invalid output rare, and I still validate every response at runtime. On failure, the call is retried with the validation error included. If it keeps failing, the error is handled explicitly and logged, so broken data never reaches the rest of the system.",
      },
      {
        q: "Can you reduce our LLM latency?",
        a: "Often, yes. Common fixes are streaming responses, trimming context, using a smaller model for early steps, running independent calls in parallel, enabling prompt caching with stable prefixes and capping output length. I measure time to first token and total time before and after, so the improvement is visible.",
      },
      {
        q: "Is it risky to depend on one LLM provider?",
        a: "It adds risk from outages, rate limits, price changes and model deprecations. I reduce it with a provider-agnostic interface, a tested fallback model, and evals that can verify a replacement behaves acceptably. Switching then becomes a configuration change backed by test results rather than an emergency rewrite.",
      },
    ],
    serviceType: "LLM integration development",
  },

  // ---------------------------------------------------------------------------
  // RAG developer
  // ---------------------------------------------------------------------------
  {
    slug: "rag-developer",
    group: "developer",
    navLabel: "RAG Developer",
    cardBlurb:
      "Retrieval-augmented generation with careful chunking, embeddings, Qdrant, metadata filters, re-ranking and answers that cite sources.",
    icon: "search",
    metaTitle: "RAG Developer for Cited, Grounded AI Answers",
    metaDescription:
      "RAG developer building document processing, chunking, embeddings, Qdrant vector search, hybrid retrieval, re-ranking and cited answers with LangChain.",
    eyebrow: "RAG Developer",
    h1: "RAG Developer for Answers Grounded in Your Documents",
    intro:
      "I build retrieval-augmented generation systems where the hard work happens before the model: parsing documents properly, chunking them well, retrieving the right passages and citing them in every answer.",
    summary: [
      "I parse documents with layout awareness, run OCR on scanned pages and keep page numbers and section titles attached to every chunk for later citation.",
      "Chunking follows headings and paragraphs with modest overlap, keeps tables intact as units, and is tuned against real questions rather than a default size.",
      "Vectors live in Qdrant with tenant and permission metadata, and filters run inside the vector query, followed by hybrid search and re-ranking of candidates.",
      "Every answer cites the retrieved chunk IDs, says plainly when the documents lack an answer, and retrieval quality is measured separately from generation.",
    ],
    highlights: [
      "Document parsing and chunking",
      "Qdrant and metadata filters",
      "Hybrid search and re-ranking",
      "Citations in every answer",
    ],
    diagram: {
      title: "The RAG pipeline",
      caption:
        "Ingestion runs once per document; retrieval and generation run on every question. Answer quality is capped by the retrieval step.",
      steps: [
        "Documents",
        "Chunking",
        "Embeddings",
        "Vector Database",
        "Retrieval",
        "LLM",
        "Cited Answer",
      ],
    },
    sections: [
      {
        id: "document-processing",
        heading: "Document processing comes first",
        body: [
          "Retrieval cannot find what parsing destroyed. PDFs with columns, tables, footnotes and scanned pages lose meaning when flattened carelessly into text. I extract text with layout awareness, run OCR on image-only pages, strip repeated headers and footers, and keep page numbers and section titles attached to every piece of text for later citation.",
          "In chat with PDF, uploads are processed in the background so the request returns immediately. The file is stored, a job parses and chunks it, embeddings are generated in batches to respect rate limits, and the interface shows progress until the document is ready to be queried.",
        ],
        links: [
          { label: "Chat with PDF case study", href: "/projects/chat-with-pdf" },
          { label: "Python developer", href: "/python-developer" },
        ],
      },
      {
        id: "chunking",
        heading: "Chunking strategy",
        body: [
          "Chunks that are too small lose context; chunks that are too large dilute the embedding and waste the model's context window. I start with structure-aware splitting that respects headings and paragraphs, add modest overlap so sentences are not cut in half, and tune sizes against real questions rather than a default value.",
        ],
        points: [
          {
            title: "Structure-aware splits",
            text: "Break on headings and paragraphs before falling back to character counts.",
          },
          {
            title: "Carry context",
            text: "Prepend the document and section title to each chunk so it makes sense alone.",
          },
          {
            title: "Keep tables intact",
            text: "Tables are chunked as units, sometimes with a generated text summary for retrieval.",
          },
          {
            title: "Store positions",
            text: "Page and offset metadata on every chunk, for citations and highlighting.",
          },
        ],
      },
      {
        id: "embeddings-qdrant",
        heading: "Embeddings and Qdrant",
        body: [
          "The embedding model sets what semantic search can recognise as similar, so I test a couple of options on domain questions before committing, because changing later means re-embedding everything. Vectors go into Qdrant with a payload holding the chunk text, source id, page, tenant and any business fields worth filtering on.",
          "I use Qdrant in blog automation too, for a different job: finding related posts for internal linking and flagging drafts that sit too close to something already published. It is the same tool with different similarity thresholds, and a match has very different consequences in each system.",
        ],
        links: [{ label: "Blog automation case study", href: "/projects/blog-automation" }],
      },
      {
        id: "metadata-filtering",
        heading: "Metadata filtering and access control",
        body: [
          "Semantic similarity alone is not enough in a multi-user product. Filters on the vector query restrict results to the current tenant, the documents a user is allowed to see, a date range or a document type. Applying these filters inside the vector database, not after retrieval, prevents data leaks and stops irrelevant chunks from crowding out the right ones.",
        ],
      },
      {
        id: "hybrid-reranking",
        heading: "Hybrid search and re-ranking",
        body: [
          "Pure vector search struggles with exact terms: product codes, names, clause numbers, acronyms. Hybrid search combines dense vectors with keyword or sparse retrieval, then merges the result lists with reciprocal rank fusion so both meaning and exact matches count. Qdrant supports dense and sparse vectors side by side, which keeps both searches in one query.",
          "A re-ranking step then scores the top candidates against the question more carefully than embedding distance can, using a cross-encoder or a small model. Retrieving broadly, perhaps thirty candidates, and re-ranking down to a handful tends to give the LLM fewer, better passages to work from.",
        ],
        points: [
          {
            title: "Dense retrieval",
            text: "Finds passages that mean the same thing in different words.",
          },
          {
            title: "Keyword retrieval",
            text: "Catches exact identifiers and rare terms that embeddings blur.",
          },
          {
            title: "Re-ranking",
            text: "Reorders a wide candidate set so only the most relevant passages reach the prompt.",
          },
        ],
      },
      {
        id: "citations",
        heading: "Answers with citations users can check",
        body: [
          "Every retrieved chunk enters the prompt with an id, and the model is instructed to answer only from those passages and cite the ids it used. The UI turns citations into links that open the source at the right page. When the retrieved context does not contain the answer, the assistant says so plainly instead of filling the gap from general knowledge.",
          "Citations do more than build trust with users. They make wrong answers debuggable, because you can see immediately whether retrieval fetched the wrong passage or the model misread the right one, and that tells you which part of the pipeline to fix.",
        ],
        points: [
          {
            title: "Id per chunk",
            text: "Each passage in the prompt carries a source id the model must reference.",
          },
          {
            title: "Clickable sources",
            text: "Citations open the original document at the cited page.",
          },
          {
            title: "Honest gaps",
            text: "No supporting passage means an explicit not found, not a guess.",
          },
        ],
      },
      {
        id: "retrieval-quality",
        heading: "Measuring retrieval quality",
        body: [
          "I evaluate retrieval separately from generation. A test set of questions paired with the passages that should answer them lets me measure whether the right chunks appear in the top results, and how that changes when chunk size, embedding model, filters or re-ranking change. Answer quality is then checked for faithfulness to the cited sources. Without both measurements, tuning a RAG system is guesswork.",
        ],
        links: [{ label: "RAG application development", href: "/rag-application-development" }],
      },
      {
        id: "langchain",
        heading: "How I use LangChain in RAG work",
        body: [
          "LangChain provides useful building blocks for this pipeline: document loaders, text splitters, embedding wrappers and vector store integrations including Qdrant. I use those pieces where they fit and write custom code where the defaults are wrong for the data, such as table handling, citation formatting or tenant-aware filters. The pipeline stays understandable without having to read framework internals.",
        ],
      },
    ],
    stack: [
      { group: "Retrieval", items: ["Qdrant", "Embeddings", "Hybrid search", "Re-ranking"] },
      { group: "Pipeline", items: ["LangChain", "PDF parsing and OCR", "Background job queues"] },
      { group: "Generation", items: ["OpenAI", "Gemini", "OpenRouter", "Structured citations"] },
      { group: "Application", items: ["Next.js", "Node.js", "FastAPI", "PostgreSQL"] },
    ],
    projects: ["chat-with-pdf", "blog-automation", "resume-analyzer"],
    related: ["rag-application-development", "ai-developer", "llm-developer", "ai-chatbot-development", "python-developer"],
    faqs: [
      {
        q: "Why not just paste the whole document into the prompt?",
        a: "For a short document that can work. For large or many documents it becomes slow and expensive, and models tend to miss details buried in long context. RAG retrieves only the relevant passages, which keeps cost and latency down, scales to large collections and makes each answer traceable to specific sources.",
      },
      {
        q: "Which vector database do you use?",
        a: "I mostly use Qdrant, which handles payload filtering and hybrid search well and can be self-hosted or managed. The choice depends on scale, hosting preferences and whether you already run PostgreSQL, where pgvector can be enough for smaller collections. I keep the retrieval layer behind an interface so it can change.",
      },
      {
        q: "How do you stop the chatbot making things up?",
        a: "By instructing the model to answer only from retrieved passages, requiring citations, and having it state clearly when the context does not contain the answer. Retrieval quality is measured with a test set, and answers are checked for faithfulness to their sources. This does not make errors impossible, but it makes them rare and visible.",
      },
      {
        q: "Can RAG work with scanned PDFs and tables?",
        a: "Yes, with extra processing. Scanned pages go through OCR, and tables are detected and kept intact as units, sometimes with a text summary generated for better retrieval. Quality depends on the source files, so I test on a sample of your real documents early rather than assuming clean input.",
      },
      {
        q: "How do you keep different customers' documents separate?",
        a: "Every chunk stores tenant and permission metadata, and every vector query includes a filter on those fields, applied inside the database. Collections can also be separated per tenant when isolation requirements are strict. Access checks happen server side, so a client cannot widen its own search scope.",
      },
      {
        q: "How long does it take to add new documents?",
        a: "Ingestion runs as a background job: parsing, chunking and embedding usually take seconds to minutes depending on size and OCR needs. Users see progress and can query once processing finishes. Updated documents are re-processed and their old chunks replaced, so stale content does not linger in results.",
      },
    ],
    serviceType: "RAG development",
  },

  // ---------------------------------------------------------------------------
  // AWS developer
  // ---------------------------------------------------------------------------
  {
    slug: "aws-developer",
    group: "developer",
    navLabel: "AWS Developer",
    cardBlurb:
      "Containers on ECS, S3, Lambda and EC2 with CI/CD, least-privilege IAM and cost awareness, plus an honest take on when Vercel is enough.",
    icon: "cloud",
    metaTitle: "AWS Developer for ECS, Lambda and CI/CD",
    metaDescription:
      "AWS developer deploying Dockerised apps to ECS and EC2, using S3 and Lambda, with GitHub Actions or GitLab CI/CD, least-privilege IAM and cost-aware setups.",
    eyebrow: "AWS Developer",
    h1: "AWS Developer for Containerised Apps and Pipelines",
    intro:
      "I deploy web apps and AI services on AWS with Docker, ECS and a few well-chosen managed services, and I will tell you plainly when Vercel alone would serve you better.",
    summary: [
      "Vercel is often enough for a Next.js app with short API routes, while AWS fits background workers, long jobs, persistent connections, custom networking and compliance needs.",
      "My default for services is a slim Docker image in ECR running on ECS with Fargate behind a load balancer, with automatic rollback on failed health checks.",
      "Pipelines in GitHub Actions or GitLab CI build one image per commit, push it to ECR and deploy the same image to staging and production.",
      "Each service gets a least-privilege IAM role, CI uses OIDC instead of static keys, and budgets, tags and right-sizing keep costs visible from day one.",
    ],
    highlights: [
      "Docker, ECR and ECS",
      "S3 and Lambda for the right jobs",
      "GitHub Actions and GitLab CI/CD",
      "Least-privilege IAM",
    ],
    diagram: {
      title: "A container release pipeline",
      caption:
        "Every merge produces one tested image that moves through environments unchanged, so staging and production run identical code.",
      steps: [
        "Push to main",
        "Run tests",
        "Build Docker image",
        "Push to ECR",
        "Deploy to ECS",
        "Health check passes",
      ],
    },
    sections: [
      {
        id: "vercel-or-aws",
        heading: "When Vercel is enough and when AWS is needed",
        body: [
          "For a Next.js frontend with API routes and a managed database, Vercel is often the right answer: preview deploys, edge caching and zero server management. I do not push teams onto AWS for its own sake, because it adds operational work someone has to own.",
          "AWS becomes the better fit when you need long-running processes, background workers, WebSocket servers, heavy file processing, GPU or large-memory workloads, strict network isolation, data residency controls, or when compute costs at scale favour reserved capacity. Many products end up with both: the frontend on Vercel, workers and services on AWS.",
        ],
        points: [
          {
            title: "Vercel fits",
            text: "Next.js apps, short request-response APIs, marketing sites, preview-driven workflows.",
          },
          {
            title: "AWS fits",
            text: "Queues and workers, long jobs, persistent connections, custom networking, compliance needs.",
          },
          {
            title: "Both",
            text: "Frontend on Vercel calling services on ECS or Lambda through a stable API.",
          },
        ],
        links: [
          { label: "Next.js developer", href: "/nextjs-developer" },
          { label: "Vercel clone case study", href: "/projects/vercel-clone" },
        ],
      },
      {
        id: "containers-ecs",
        heading: "Docker, ECR and ECS for services",
        body: [
          "My default for services on AWS is a Docker image stored in ECR and run on ECS with Fargate. Images are multi-stage builds that end in a slim runtime layer, run as a non-root user and expose a health endpoint. Task definitions hold CPU, memory and environment settings, with secrets pulled from Secrets Manager or Parameter Store rather than baked into images.",
          "ECS services sit behind an Application Load Balancer, roll out new versions gradually and roll back automatically when health checks fail. Workers that consume queues run as separate services that scale on queue depth, so a burst of uploads adds workers without touching the API tier.",
        ],
      },
      {
        id: "ec2-s3-lambda",
        heading: "EC2, S3 and Lambda, each for its own job",
        body: [
          "EC2 still has a place when a workload needs full control of the machine, specific instance types, or long-lived processes that do not fit container platforms well. For most application services I prefer ECS because patching and scaling are simpler.",
          "S3 holds uploads, generated files and build artifacts, with presigned URLs so browsers upload directly without routing large files through the API. Lambda handles event-driven glue: processing a file when it lands in S3, scheduled cleanups, lightweight webhooks. I avoid Lambda for long or memory-heavy tasks, where cold starts and time limits get in the way.",
        ],
      },
      {
        id: "ci-cd",
        heading: "CI/CD with GitHub Actions or GitLab",
        body: [
          "Pipelines run linting, type checks and tests on every pull request. On merge, they build the Docker image once, tag it with the commit SHA, push it to ECR and deploy the same image to staging and then production. GitHub Actions authenticates to AWS through OIDC, so no long-lived access keys sit in CI secrets. GitLab CI/CD follows the same flow with its own runners.",
          "Building isolated Docker images from connected repositories, queueing builds and streaming the logs back to the user was the core of my Vercel clone. That work means I understand build pipelines from both sides: as someone deploying an app, and as someone running the platform that deploys it.",
        ],
        links: [
          { label: "Vercel clone case study", href: "/projects/vercel-clone" },
          { label: "Backend developer", href: "/backend-developer" },
        ],
      },
      {
        id: "iam",
        heading: "IAM with least privilege",
        body: [
          "Every service gets its own IAM role scoped to exactly what it touches: this bucket prefix, this queue, this secret. Wildcard permissions are treated as bugs. Humans use SSO with role assumption instead of personal access keys, and production access is separated from development accounts.",
        ],
        points: [
          {
            title: "Role per service",
            text: "Task roles grant only the actions and resources that service needs.",
          },
          {
            title: "No static keys in CI",
            text: "OIDC federation lets pipelines assume a deploy role for minutes at a time.",
          },
          {
            title: "Separate accounts",
            text: "Production isolated from staging and development to limit mistakes.",
          },
          {
            title: "Audit trail",
            text: "CloudTrail enabled so changes can be traced to a person or pipeline.",
          },
        ],
      },
      {
        id: "environments",
        heading: "Environments and infrastructure as code",
        body: [
          "Staging should look like production, or it cannot catch production problems. I define infrastructure in code with Terraform or AWS CDK, parameterised per environment, so staging and production differ in size and secrets but not in shape. Changes to infrastructure go through review like application code, and nothing important is created by clicking in the console.",
        ],
      },
      {
        id: "cost-awareness",
        heading: "Cost awareness from the start",
        body: [
          "AWS bills grow quietly. I set budgets and alerts on day one, tag resources by environment and feature, right-size Fargate tasks from real usage, and schedule non-production environments to scale down outside working hours. NAT gateway data transfer, idle load balancers and forgotten snapshots are the usual surprises, so I check for them early.",
          "Managed services are not automatically the cheaper choice. When one costs more than it saves in effort for a small team, I say so and suggest the simpler option, whether that is a single container, a smaller database instance or keeping a workload on Vercel.",
        ],
        points: [
          {
            title: "Budgets and alerts",
            text: "Notifications before spend drifts, not after the invoice arrives.",
          },
          {
            title: "Tagging",
            text: "Costs attributable to environments and features.",
          },
          {
            title: "Right-sizing",
            text: "CPU and memory set from observed usage, reviewed periodically.",
          },
        ],
      },
    ],
    stack: [
      { group: "Compute", items: ["ECS with Fargate", "EC2", "Lambda", "Kubernetes"] },
      { group: "Storage and data", items: ["S3", "RDS PostgreSQL", "ElastiCache Redis", "MongoDB"] },
      { group: "Delivery", items: ["Docker", "ECR", "GitHub Actions", "GitLab CI/CD"] },
      { group: "Security and ops", items: ["IAM", "Secrets Manager", "CloudWatch", "Terraform or CDK"] },
      { group: "Alongside AWS", items: ["Vercel", "Next.js", "Node.js"] },
    ],
    projects: ["vercel-clone", "chat-with-pdf"],
    related: ["backend-developer", "nodejs-developer", "nextjs-developer", "saas-development"],
    faqs: [
      {
        q: "Do I need AWS, or is Vercel enough for my app?",
        a: "If your app is a Next.js frontend with short API routes and a managed database, Vercel is often enough and simpler to run. AWS earns its complexity when you need background workers, long-running jobs, persistent connections, custom networking or compliance controls. I can help you decide based on what your product actually does.",
      },
      {
        q: "Can you move our app from Heroku or a single VPS to AWS?",
        a: "Yes. The usual path is containerising the app, setting up ECR and ECS with a load balancer, moving the database to RDS, putting secrets in a managed store and building a CI/CD pipeline. I plan the cutover with a staging run, data migration steps and a rollback option so the switch is controlled.",
      },
      {
        q: "ECS or Kubernetes?",
        a: "For most small and mid-sized teams on AWS, ECS with Fargate covers what is needed with far less to operate. Kubernetes makes sense when you already have the expertise, need portability across clouds, or run many services that benefit from its ecosystem. I have worked with both and pick based on the team that will maintain it.",
      },
      {
        q: "How do you keep AWS credentials secure?",
        a: "No long-lived access keys in code or CI. Pipelines use OIDC to assume short-lived deploy roles, services use task roles with least-privilege policies, secrets live in Secrets Manager or Parameter Store, and people sign in through SSO. CloudTrail records who changed what, so problems can be traced.",
      },
      {
        q: "How do you prevent surprise AWS bills?",
        a: "Budgets with alerts from the first day, resource tagging so costs map to features and environments, right-sized containers, scaled-down non-production environments and early checks for common leaks like NAT gateway traffic and idle resources. I also flag when a managed service is more expensive than a simpler alternative would be.",
      },
    ],
    serviceType: "AWS cloud development",
  },
];
