import type { Metadata } from "next";
import { Suspense } from "react";
import { hireFaqs } from "@/lib/site";
import {
  breadcrumbList,
  faqJsonLd,
  graph,
  pageMetadata,
  person,
  webPageJsonLd,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Eyebrow, H2, Section } from "@/components/ui/Section";
import { HireForm } from "@/components/hire/HireForm";
import { FaqList } from "@/components/landing/FaqList";
import { EngagementSteps } from "@/components/landing/EngagementSteps";
import { AuthorCard } from "@/components/profile/AuthorCard";

const title = "Hire a Full Stack & AI Developer – Start a Project";
const description =
  "Hire Tripti Shakya for React, Next.js, Node.js, AI, RAG, SaaS or MVP development. Share your project brief and get questions, an approach and next steps.";

export const metadata: Metadata = pageMetadata({ title, description, path: "/hire-me" });

const trail = [
  { name: "Home", path: "/" },
  { name: "Hire Me", path: "/hire-me" },
];

const faqs = hireFaqs.map((f) => ({ q: f.q, a: f.a }));

export default function HireMePage() {
  return (
    <>
      <JsonLd
        data={graph(
          webPageJsonLd({ path: "/hire-me", name: title, description, type: "ContactPage" }),
          person,
          breadcrumbList(trail),
          faqJsonLd("/hire-me", faqs),
        )}
      />

      <div className="mx-auto max-w-[1240px] px-4 pt-10 sm:px-6 sm:pt-14">
        <Breadcrumbs trail={trail} />
        <div className="mt-8 max-w-[820px] pb-10 sm:pb-12">
          <Eyebrow>Hire me</Eyebrow>
          <h1 className="text-[34px] leading-[1.05] text-balance sm:text-[56px]">
            Hire a Full Stack &amp; AI Developer for your{" "}
            <span className="grad-word">next build.</span>
          </h1>
          <p className="mt-5 max-w-[60ch] text-[16px] leading-[1.65] text-[var(--dim)] sm:text-[18px]">
            Send your project details. I reply with the questions that decide scope, an
            initial technical approach and a project estimate. If it is not a good fit, I
            will say that too.
          </p>
        </div>
      </div>

      <section aria-label="Project brief form" className="mx-auto max-w-[1240px] px-4 sm:px-6">
        <Suspense fallback={<div className="p-8 text-[var(--dim)]">Loading project brief form…</div>}>
          <HireForm />
        </Suspense>
      </section>

      <EngagementSteps />

      <AuthorCard />

      <Section labelledBy="hire-faq-h" className="pb-16 sm:pb-24">
        <Eyebrow>FAQ</Eyebrow>
        <H2 id="hire-faq-h">Before you hire: the practical questions</H2>
        <div className="mt-8">
          <FaqList faqs={faqs} />
        </div>
      </Section>
    </>
  );
}
