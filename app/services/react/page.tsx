import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig, reactFaqs, processTimeline } from "@/lib/site";
import { FAQAccordion } from "@/components/sections/FAQAccordion";

export const metadata: Metadata = {
  title: "React Developer — Product Architecture & Performance",
  description:
    "React 19 developer specializing in scalable component architecture, TanStack state management, virtualized tables, performance optimization, and Next.js migrations.",
  alternates: { canonical: "/services/react" },
};

export default function ReactServicePage() {
  const waUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    "Hi, I found your React developer page and would like to discuss a React project."
  )}`;

  const reactBuilds = [
    "SaaS dashboards with role-based views, filtering and exports",
    "Multi-step forms and onboarding with validation and resumable state",
    "Data-dense tables: virtualised rows, server-side sort and pagination",
    "Customer portals against an existing API",
    "Design-system component libraries with a documented API",
    "Real-time interfaces over WebSockets or server-sent events",
    "Embedded widgets that load inside someone else's page",
    "Progressive web apps with offline-tolerant behaviour",
  ];

  const reactProblems = [
    {
      t: "Slow Rendering & Laggy UI",
      b: "Eliminate re-render cascades with memoized state boundaries, virtualized list rendering, and bundle-size audits.",
    },
    {
      t: "Unpredictable State Mismatches",
      b: "Replace fragile prop-drilling with clear server-cache layers (TanStack Query/SWR) and scoped local stores.",
    },
    {
      t: "Untyped Codebase Tech Debt",
      b: "Migrate legacy JavaScript to strict TypeScript with runtime boundary validation via Zod schemas.",
    },
    {
      t: "Framework Migration Bottlenecks",
      b: "Incrementally port Create React App or Vite monoliths over to Next.js App Router without halting feature velocity.",
    },
    {
      t: "Accessibility & WCAG Gaps",
      b: "Audit and fix keyboard navigation, focus management, screen-reader landmarks, and ARIA roles to WCAG 2.2 AA.",
    },
    {
      t: "Missing Automated Test Coverage",
      b: "Implement Vitest unit testing, React Testing Library component tests, and Playwright end-to-end regression runs.",
    },
  ];

  const reactServices = [
    "New React application development",
    "Rewrites and framework migration (CRA or Vite to Next.js)",
    "Performance audit with a written findings report",
    "Component library and design-system implementation",
    "API and third-party integration work",
    "Accessibility remediation to WCAG 2.2 AA",
    "Test coverage on critical paths",
    "Code review and architecture consulting for in-house teams",
  ];

  const reactStack = [
    { k: "Core", v: "React 19, TypeScript, Vite or Next.js, React Router" },
    { k: "Data", v: "TanStack Query, SWR, REST, GraphQL, Zod schemas at the boundary" },
    { k: "UI", v: "Tailwind CSS, Radix primitives, CSS Modules, Framer Motion" },
    { k: "Quality", v: "Vitest, Testing Library, Playwright, ESLint, TypeScript strict mode" },
    { k: "Delivery", v: "GitHub Actions, preview deploys, Sentry, Web Vitals reporting" },
  ];

  const reactBenefits = [
    "Measured before-and-after numbers on any performance work",
    "Typed API boundaries, so schema changes fail at build, not in production",
    "Components documented well enough for a new developer to reuse them",
    "Keyboard and screen-reader paths tested, not assumed",
    "A repository your next hire can pick up without a handover call",
  ];

  const reactIndustries = [
    { k: "SaaS:", v: "tenant-aware routing, permission-driven UI, usage and billing screens." },
    { k: "E-commerce:", v: "catalogue rendering speed, cart state that survives reload, checkout accessibility." },
    { k: "Healthcare:", v: "strict access control in the UI layer, careful handling of sensitive data." },
    { k: "FinTech:", v: "precise number formatting, audit-friendly forms, no silent failures." },
  ];

  const relatedTech = [
    { t: "Next.js Development", b: "When the React app needs server rendering, routing and SEO — most marketing-facing products do." },
    { t: "TypeScript Development", b: "Typing an untyped React codebase incrementally, without stopping feature work." },
    { t: "Backend & API Development", b: "The endpoints the front end consumes, shaped for the screens that use them." },
    { t: "AI Development", b: "Streaming LLM responses and assistant interfaces inside an existing React product." },
  ];

  return (
    <main data-screen-label="React developer service page">
      {/* Breadcrumb */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-5 sm:pt-8">
        <nav
          aria-label="Breadcrumb"
          className="font-['JetBrains_Mono'] text-[11.5px] flex flex-wrap items-center gap-2 text-[var(--faint)]"
        >
          <Link href="/" className="hover:text-[var(--ink)]">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <Link href="/#services" className="hover:text-[var(--ink)]">
            Services
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-[var(--ink)]">React Developer</span>
        </nav>
      </div>

      {/* Hero Section */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-7 sm:pt-13 pb-10 sm:pb-18 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-center">
        <div>
          <p className="inline-flex items-center gap-2.25 px-3.5 py-1.75 border border-[rgba(77,124,255,0.34)] rounded-full bg-[rgba(77,124,255,0.09)] font-['JetBrains_Mono'] text-[10.5px] tracking-[0.16em] uppercase text-[#9db4ff] mb-6">
            React Development
          </p>

          <h1 className="font-['Space_Grotesk'] font-bold text-[34px] sm:text-[50px] lg:text-[64px] leading-[1.05] tracking-[-0.025em] max-w-[18ch] mb-5.5 text-[var(--ink)]">
            React Developer for Products That Need to <span className="grad-word">Scale.</span>
          </h1>

          <p className="text-[15.5px] sm:text-[18px] leading-[1.65] text-[var(--dim)] max-w-[58ch] mb-8">
            I design and build React applications: component architecture that survives a growing team, state that stays predictable, and interfaces that hold up on mid-range phones. New products, and existing React codebases that have become slow or hard to change.
          </p>

          <div className="flex flex-wrap items-center gap-3.5">
            <Link
              href="/hire-me?service=React+development"
              className="inline-flex items-center gap-2.5 px-6.5 py-3.75 rounded-full font-['Space_Grotesk'] font-semibold text-[15.5px] text-white bg-gradient-to-r from-[#4d7cff] to-[#7c5cff] shadow-[0_18px_44px_-18px_rgba(77,124,255,0.9)] hover:-translate-y-0.5 transition-all"
            >
              Hire Me →
            </Link>
            <Link
              href="/hire-me?service=React+development"
              className="inline-flex items-center gap-2.5 px-6.5 py-3.75 border border-[var(--line2)] rounded-full bg-[var(--glass)] font-['Space_Grotesk'] font-semibold text-[15.5px] text-[var(--ink)] hover:bg-[var(--glass2)] transition-all"
            >
              Discuss Your Project
            </Link>
          </div>
        </div>

        {/* React Ecosystem Diagram SVG */}
        <div className="only-wide hidden lg:block relative">
          <div
            aria-hidden="true"
            className="absolute -inset-[10%] rounded-full bg-[radial-gradient(circle_at_55%_45%,rgba(34,211,238,0.16),transparent_64%)] blur-[34px] pointer-events-none"
          ></div>
          <figure className="relative m-0 border border-[var(--line2)] rounded-[var(--r-lg)] bg-[linear-gradient(160deg,rgba(255,255,255,0.06),rgba(255,255,255,0.015))] backdrop-blur-xl p-6">
            <figcaption className="font-['JetBrains_Mono'] text-[10px] tracking-[0.18em] uppercase text-[var(--faint)] mb-4">
              React ecosystem architecture
            </figcaption>
            <svg
              viewBox="0 0 300 300"
              width="100%"
              role="img"
              aria-label="Diagram of the React ecosystem: a React core surrounded by routing, server cache, forms, state, testing and UI layers."
              className="block"
            >
              <g fill="none" stroke="rgba(255,255,255,.12)">
                <circle cx="150" cy="150" r="58"></circle>
                <circle cx="150" cy="150" r="104"></circle>
              </g>
              <g
                className="flow"
                fill="none"
                stroke="rgba(77,124,255,.7)"
                strokeWidth="1.4"
              >
                <circle cx="150" cy="150" r="81"></circle>
              </g>
              <circle
                cx="150"
                cy="150"
                r="42"
                fill="rgba(77,124,255,.16)"
                stroke="rgba(77,124,255,.5)"
              ></circle>
              <text
                x="150"
                y="155"
                textAnchor="middle"
                fontFamily="Space Grotesk, sans-serif"
                fontSize="15"
                fontWeight="700"
                fill="#dbe3f5"
              >
                React
              </text>
              <g
                fontFamily="JetBrains Mono, monospace"
                fontSize="9.5"
                fill="#aab5cc"
                textAnchor="middle"
              >
                <g>
                  <rect
                    x="106"
                    y="16"
                    width="88"
                    height="24"
                    rx="7"
                    fill="rgba(255,255,255,.05)"
                    stroke="rgba(255,255,255,.14)"
                  ></rect>
                  <text x="150" y="31">
                    Next.js router
                  </text>
                </g>
                <g>
                  <rect
                    x="214"
                    y="80"
                    width="82"
                    height="24"
                    rx="7"
                    fill="rgba(255,255,255,.05)"
                    stroke="rgba(255,255,255,.14)"
                  ></rect>
                  <text x="255" y="95">
                    TanStack
                  </text>
                </g>
                <g>
                  <rect
                    x="218"
                    y="196"
                    width="78"
                    height="24"
                    rx="7"
                    fill="rgba(255,255,255,.05)"
                    stroke="rgba(255,255,255,.14)"
                  ></rect>
                  <text x="257" y="211">
                    Zod forms
                  </text>
                </g>
                <g>
                  <rect
                    x="110"
                    y="260"
                    width="80"
                    height="24"
                    rx="7"
                    fill="rgba(255,255,255,.05)"
                    stroke="rgba(255,255,255,.14)"
                  ></rect>
                  <text x="150" y="275">
                    Playwright
                  </text>
                </g>
                <g>
                  <rect
                    x="6"
                    y="196"
                    width="78"
                    height="24"
                    rx="7"
                    fill="rgba(255,255,255,.05)"
                    stroke="rgba(255,255,255,.14)"
                  ></rect>
                  <text x="45" y="211">
                    Tailwind
                  </text>
                </g>
                <g>
                  <rect
                    x="8"
                    y="80"
                    width="80"
                    height="24"
                    rx="7"
                    fill="rgba(255,255,255,.05)"
                    stroke="rgba(255,255,255,.14)"
                  ></rect>
                  <text x="48" y="95">
                    TypeScript
                  </text>
                </g>
              </g>
            </svg>
          </figure>
        </div>
      </section>

      {/* Expertise & What I Build */}
      <section className="rv max-w-[1240px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 sm:gap-13 border-t border-[var(--line)] pt-9 sm:pt-16">
          <div>
            <h2 className="font-['Space_Grotesk'] text-[25px] sm:text-[38px] leading-[1.1] max-w-[22ch] mb-5 text-[var(--ink)]">
              React Architectural Approach
            </h2>
            <p className="text-[15px] leading-[1.7] text-[var(--dim)] max-w-[58ch] mb-4.5">
              React is the layer where your product becomes usable, so most of the work is architectural rather than visual. Where does state live — server cache, URL, or component? Which parts re-render when a filter changes? How does a list of ten thousand rows stay interactive? Those answers decide whether the app still feels fast a year from now.
            </p>
            <p className="text-[15px] leading-[1.7] text-[var(--dim)] max-w-[58ch]">
              I write React with a clear split between server data and client state: fetching and caching handled by TanStack Query or the framework's own loaders, local interaction state kept in the component that owns it, and shared state only where two distant parts genuinely need the same value.
            </p>
          </div>

          <div className="border border-[var(--line)] rounded-[var(--r-lg)] bg-[rgba(255,255,255,0.028)] p-6.5">
            <h3 className="font-['Space_Grotesk'] font-bold text-[19px] mb-4 text-[var(--ink)]">
              What I Build in React
            </h3>
            <ul className="m-0 p-0 list-none grid gap-2.75">
              {reactBuilds.map((item, idx) => (
                <li
                  key={idx}
                  className="flex gap-2.75 text-[14px] leading-[1.55] text-[var(--dim)]"
                >
                  <span
                    aria-hidden="true"
                    className="flex-none mt-1.75 w-1.5 h-1.5 rounded-full bg-[var(--cyan)]"
                  ></span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Technical Problems I Solve */}
      <section className="rv max-w-[1240px] mx-auto px-4 sm:px-6 pt-16 sm:pt-24">
        <h2 className="font-['Space_Grotesk'] text-[25px] sm:text-[38px] leading-[1.1] max-w-[24ch] mb-8.5 text-[var(--ink)]">
          Technical Capabilities — Problems I Solve
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {reactProblems.map((pr, idx) => (
            <div
              key={idx}
              className="rv border border-[var(--line)] rounded-[var(--r-lg)] bg-[linear-gradient(165deg,rgba(255,255,255,0.05),rgba(255,255,255,0.012))] p-6 transition-all duration-400 hover:border-[rgba(77,124,255,0.45)] hover:-translate-y-1"
            >
              <h3 className="font-['Space_Grotesk'] font-bold text-[17.5px] mb-2.75 text-[#c9d6ff]">
                {pr.t}
              </h3>
              <p className="text-[13.5px] leading-[1.65] text-[var(--dim)]">
                {pr.b}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Services, Tech Stack & Benefits */}
      <section className="rv max-w-[1240px] mx-auto px-4 sm:px-6 pt-16 sm:pt-24">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          <div className="border border-[var(--line)] rounded-[var(--r-lg)] bg-[rgba(255,255,255,0.028)] p-6.5">
            <h3 className="font-['Space_Grotesk'] font-bold text-[19px] mb-4 text-[var(--ink)]">
              Services Offered
            </h3>
            <ul className="m-0 p-0 list-none grid gap-2.5">
              {reactServices.map((i, idx) => (
                <li
                  key={idx}
                  className="flex gap-2.75 text-[13.5px] leading-[1.55] text-[var(--dim)]"
                >
                  <span
                    aria-hidden="true"
                    className="flex-none mt-1.75 w-1.25 h-1.25 rounded-full bg-[var(--blue)]"
                  ></span>
                  {i}
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-[var(--line)] rounded-[var(--r-lg)] bg-[rgba(255,255,255,0.028)] p-6.5">
            <h3 className="font-['Space_Grotesk'] font-bold text-[19px] mb-4 text-[var(--ink)]">
              Technology Stack
            </h3>
            <div className="grid gap-3.5">
              {reactStack.map((g, idx) => (
                <div key={idx}>
                  <p className="font-['JetBrains_Mono'] text-[10px] tracking-[0.16em] uppercase text-[#7fe6f7] mb-1.5">
                    {g.k}
                  </p>
                  <p className="text-[13.5px] leading-[1.6] text-[var(--dim)]">
                    {g.v}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="border border-[var(--line)] rounded-[var(--r-lg)] bg-[rgba(255,255,255,0.028)] p-6.5">
            <h3 className="font-['Space_Grotesk'] font-bold text-[19px] mb-4 text-[var(--ink)]">
              Benefits You Can Check
            </h3>
            <ul className="m-0 p-0 list-none grid gap-2.5">
              {reactBenefits.map((i, idx) => (
                <li
                  key={idx}
                  className="flex gap-2.75 text-[13.5px] leading-[1.55] text-[var(--dim)]"
                >
                  <span
                    aria-hidden="true"
                    className="flex-none mt-1.75 w-1.25 h-1.25 rounded-full bg-[var(--violet)]"
                  ></span>
                  {i}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="rv max-w-[1240px] mx-auto px-4 sm:px-6 pt-16 sm:pt-24">
        <h2 className="font-['Space_Grotesk'] text-[25px] sm:text-[38px] leading-[1.1] mb-8.5 text-[var(--ink)]">
          Development Process
        </h2>
        <ol className="list-none m-0 p-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-0">
          {processTimeline.map((t) => (
            <li key={t.n} className="relative pr-4">
              <div
                aria-hidden="true"
                className="relative h-0.5 bg-[linear-gradient(to_right,rgba(77,124,255,0.55),rgba(139,92,246,0.25))] mb-5.5 hidden lg:block"
              >
                <span className="absolute -top-[5px] left-0 w-3 h-3 rounded-full bg-[var(--bg)] border-2 border-[var(--blue)]"></span>
              </div>
              <p className="font-['JetBrains_Mono'] text-[11px] tracking-[0.16em] text-[#7fe6f7] mb-2">
                {t.n}
              </p>
              <h3 className="font-['Space_Grotesk'] font-bold text-[17px] uppercase mb-2.5 text-[var(--ink)]">
                {t.title}
              </h3>
              <p className="text-[13px] leading-[1.6] text-[var(--dim)] max-w-[30ch]">
                {t.body}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Industries & Related */}
      <section className="rv max-w-[1240px] mx-auto px-4 sm:px-6 pt-16 sm:pt-24">
        <h2 className="font-['Space_Grotesk'] text-[22px] sm:text-[32px] mb-2.5 text-[var(--ink)]">
          Related Technologies &amp; Industries
        </h2>
        <p className="text-[13.5px] text-[var(--faint)] mb-6.5">
          Adjacent stack technologies that frequently accompany React builds.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
          {relatedTech.map((r, idx) => (
            <Link
              key={idx}
              href="/hire-me"
              className="border border-[var(--line)] rounded-[var(--r-lg)] bg-[rgba(255,255,255,0.028)] p-5.5 block transition-all duration-300 hover:border-[rgba(77,124,255,0.45)] hover:-translate-y-0.5 text-[var(--ink)]"
            >
              <h3 className="font-['Space_Grotesk'] font-bold text-[17px] mb-2 text-[var(--ink)]">
                {r.t}
              </h3>
              <p className="text-[13px] leading-[1.6] text-[var(--dim)]">
                {r.b}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* React FAQ Accordion */}
      <FAQAccordion
        id="react-faq"
        labelNumber="React FAQ"
        title="React Development FAQ"
        faqs={reactFaqs}
      />

      {/* Closing CTA */}
      <section className="rv max-w-[1240px] mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-16">
        <div className="relative border border-[rgba(77,124,255,0.3)] rounded-[var(--r-lg)] bg-[linear-gradient(150deg,rgba(77,124,255,0.16),rgba(139,92,246,0.1),rgba(255,255,255,0.015))] overflow-hidden p-7 sm:p-14 grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
          <h2 className="font-['Space_Grotesk'] font-bold text-[26px] sm:text-[46px] max-w-[20ch] text-[var(--ink)]">
            Need a React developer on your project?
          </h2>
          <div className="flex flex-wrap items-center gap-3.5">
            <Link
              href="/hire-me?service=React+development"
              className="inline-flex items-center gap-2.5 px-6.5 py-3.75 rounded-full font-['Space_Grotesk'] font-semibold text-[15.5px] text-white bg-gradient-to-r from-[#4d7cff] to-[#7c5cff] shadow-[0_18px_44px_-18px_rgba(77,124,255,0.9)] hover:-translate-y-0.5 transition-all"
            >
              Hire Me →
            </Link>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6.5 py-3.75 border border-[var(--line2)] rounded-full bg-[var(--glass)] font-['Space_Grotesk'] font-semibold text-[15.5px] text-[var(--ink)] hover:bg-[var(--glass2)] transition-all"
            >
              WhatsApp Me
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
