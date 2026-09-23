import type { Metadata } from "next";
import { projects } from "@/lib/content";
import { breadcrumbList, graph, pageMetadata, webPageJsonLd } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Eyebrow } from "@/components/ui/Section";
import { ProjectCard } from "@/components/cards/ProjectCard";
import { HireCta } from "@/components/landing/HireCta";

const title = "Projects & Technical Case Studies";
const description =
  "Case studies of AI, RAG, SaaS and full stack products built by Tripti Shakya: architecture, stack, engineering decisions and lessons from each build.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/projects" });

export default function ProjectsPage() {
  const trail = [
    { name: "Home", path: "/" },
    { name: "Projects", path: "/projects" },
  ];
  return (
    <>
      <JsonLd
        data={graph(
          webPageJsonLd({ path: "/projects", name: title, description }),
          breadcrumbList(trail),
        )}
      />
      <div className="mx-auto max-w-[1240px] px-4 pt-10 sm:px-6 sm:pt-14">
        <Breadcrumbs trail={trail} />
        <div className="rv mt-8 max-w-[760px]">
          <Eyebrow>Case studies</Eyebrow>
          <h1 className="text-[34px] leading-[1.06] sm:text-[52px]">
            Projects, explained from the architecture up.
          </h1>
          <p className="mt-5 text-[16px] leading-[1.65] text-[#cfd7ea] sm:text-[18px]">
            Each case study covers the problem, the requirements, the architecture, the
            decisions and trade-offs, and what I would do differently.
          </p>
        </div>
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((p) => (
            <ProjectCard key={p.slug} project={p} />
          ))}
        </div>
      </div>
      <HireCta />
    </>
  );
}
