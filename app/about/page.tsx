import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { projects, resolvePages } from "@/lib/content";
import { breadcrumbList, graph, pageMetadata, person, webPageJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Eyebrow, H2, Section } from "@/components/ui/Section";
import { ProfilePhoto } from "@/components/profile/ProfilePhoto";
import { PageCard } from "@/components/cards/PageCard";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { PointGrid } from "@/components/landing/PointGrid";
import { StackGrid } from "@/components/landing/StackGrid";
import { HireCta } from "@/components/landing/HireCta";

const title = "About Tripti Shakya, Full Stack & AI Developer";
const description =
  "Tripti Shakya is a Full Stack & AI Developer in Bangalore building SaaS, web applications and AI products with React, Next.js, Node.js, Python and LLMs.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/about",
  type: "profile",
});

const trail = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

const principles = [
  {
    title: "Architecture before code",
    text: "Every build starts with the data model, the boundaries between services and what has to be fast. Those choices are expensive to change later, so they get decided first and written down.",
  },
  {
    title: "Direct communication",
    text: "You talk to the person writing the code. Progress is shared as working previews, not status reports, and trade-offs are raised when they come up rather than after the fact.",
  },
  {
    title: "Production, not prototypes",
    text: "Authentication, error handling, logging, tests on the critical paths and a repeatable deploy are part of the job, not extras added once the demo works.",
  },
  {
    title: "AI where it earns its place",
    text: "LLMs are used when they solve a real problem, with structured outputs, streaming, retrieval and cost limits designed in. Where plain code is more reliable, plain code wins.",
  },
];

const stack = [
  { group: "Frontend", items: ["React", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "shadcn/ui", "Framer Motion", "Zustand", "Angular"] },
  { group: "Backend", items: ["Node.js", "Express", "FastAPI", "REST", "GraphQL", "Socket.io", "JWT auth"] },
  { group: "Data", items: ["PostgreSQL", "MongoDB", "Redis", "Qdrant", "Prisma"] },
  { group: "AI", items: ["OpenAI", "Gemini", "OpenRouter", "LangChain", "RAG", "Embeddings", "AI agents"] },
  { group: "Cloud / DevOps", items: ["AWS EC2", "ECS", "ECR", "S3", "Lambda", "Docker", "Kubernetes", "GitHub Actions", "GitLab CI/CD", "Vercel"] },
  { group: "Engineering", items: ["Microservices", "System design", "Design patterns", "Unit testing", "Integration testing"] },
];

const domains = ["Healthcare", "Real estate", "Fintech", "E-commerce", "AI", "Automation", "Experiential technology"];

const focusPages = resolvePages([
  "full-stack-developer",
  "nextjs-developer",
  "ai-developer",
  "rag-developer",
  "saas-development",
  "mvp-development",
  "ai-agent-development",
  "api-development",
]);

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={graph(
          {
            // ProfilePage is Google's recommended type for a creator's profile.
            ...webPageJsonLd({ path: "/about", name: title, description, type: "ProfilePage" }),
            mainEntity: { "@id": person["@id"] },
          },
          person,
          breadcrumbList(trail),
        )}
      />

      {/* Hero: portrait + introduction */}
      <header className="relative overflow-hidden border-b border-[var(--line)]">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-64 left-[5%] size-[36rem] rounded-full bg-[radial-gradient(circle,rgba(77,124,255,0.22),transparent_65%)] blur-2xl"
        />
        <div className="relative mx-auto max-w-[1240px] px-4 pb-14 pt-10 sm:px-6 sm:pb-20 sm:pt-14">
          <Breadcrumbs trail={trail} />
          <div className="mt-8 grid items-center gap-10 md:grid-cols-[minmax(0,1fr)_300px] lg:grid-cols-[minmax(0,1fr)_360px] lg:gap-16">
            <div className="order-2 md:order-1">
              <Eyebrow>About</Eyebrow>
              <h1 className="text-[34px] leading-[1.06] text-balance sm:text-[52px]">
                Hi, I&apos;m Tripti. I build production SaaS and AI products.
              </h1>
              <p className="mt-5 max-w-[60ch] text-[16px] leading-[1.7] text-[#cfd7ea] sm:text-[18px]">
                I&apos;m a full stack developer based in Bangalore. I work across the whole
                product: React and Next.js interfaces, Node.js and FastAPI backends,
                PostgreSQL, MongoDB and Redis, and the LLM, RAG and agent systems that
                increasingly sit in the middle of them.
              </p>
              <p className="mt-4 max-w-[60ch] text-[15.5px] leading-[1.7] text-[var(--dim)]">
                I&apos;ve built applications across {domains.slice(0, -1).join(", ").toLowerCase()} and{" "}
                {domains[domains.length - 1].toLowerCase()}. The projects below are written
                up as full case studies, so you can see how I think, not only what I shipped.
              </p>
              <p className="mt-6 flex items-center gap-1.5 text-[13.5px] text-[var(--dim)]">
                <MapPin aria-hidden="true" className="size-4 text-[var(--cyan)]" />
                Bangalore, India · IST, with overlap for US, EU and APAC teams
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/hire-me"
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#4d7cff] to-[#7c5cff] px-6 py-3 text-[15px] font-semibold text-white shadow-[0_18px_44px_-18px_rgba(77,124,255,0.9)] transition-transform hover:-translate-y-0.5 hover:text-white"
                >
                  Hire Me <ArrowRight aria-hidden="true" className="size-4" />
                </Link>
                <a
                  href={siteConfig.social.linkedin}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="inline-flex items-center rounded-full border border-[var(--line2)] bg-[var(--glass)] px-6 py-3 text-[15px] font-semibold text-[var(--ink)] hover:bg-[var(--glass2)] hover:text-white"
                >
                  LinkedIn
                </a>
                <a
                  href={siteConfig.social.github}
                  target="_blank"
                  rel="noopener noreferrer me"
                  className="inline-flex items-center rounded-full border border-[var(--line2)] bg-[var(--glass)] px-6 py-3 text-[15px] font-semibold text-[var(--ink)] hover:bg-[var(--glass2)] hover:text-white"
                >
                  GitHub
                </a>
              </div>
            </div>

            <div className="order-1 mx-auto w-[220px] sm:w-[260px] md:order-2 md:w-full">
              <div className="relative">
                <div
                  aria-hidden="true"
                  className="absolute -inset-3 rounded-[28px] bg-[linear-gradient(140deg,rgba(77,124,255,0.45),rgba(139,92,246,0.25),rgba(34,211,238,0.3))] opacity-60 blur-xl"
                />
                <ProfilePhoto
                  size={360}
                  rounded="lg"
                  priority
                  className="relative !w-full border border-[var(--line2)]"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <Section labelledBy="principles-h">
        <Eyebrow>How I work</Eyebrow>
        <H2 id="principles-h">What you can expect when we work together</H2>
        <div className="mt-8">
          <PointGrid points={principles} />
        </div>
      </Section>

      <Section labelledBy="work-h">
        <Eyebrow>Case studies</Eyebrow>
        <H2 id="work-h">Projects I&apos;ve built</H2>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </Section>

      <Section labelledBy="stack-h">
        <Eyebrow>Stack</Eyebrow>
        <H2 id="stack-h">Technologies I work with</H2>
        <div className="mt-8">
          <StackGrid stack={stack} />
        </div>
        <p className="mt-6 text-[14px] leading-[1.7] text-[var(--dim)]">
          Industries: {domains.join(" · ")}
        </p>
      </Section>

      <Section labelledBy="focus-h">
        <Eyebrow>Services</Eyebrow>
        <H2 id="focus-h">Where I can help</H2>
        <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {focusPages.map((p) => (
            <PageCard key={p.slug} page={p} />
          ))}
        </div>
      </Section>

      <HireCta />
    </>
  );
}
