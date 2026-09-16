import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { siteConfig, hireFaqs } from "@/lib/site";
import { HireForm } from "@/components/hire/HireForm";
import { FAQAccordion } from "@/components/sections/FAQAccordion";

export const metadata: Metadata = {
  title: "Hire Tripti Shakya — Full-Stack & AI Developer",
  description:
    "Submit your project brief to hire Tripti Shakya for React, Next.js, Python, or AI development. Fast response within 24 hours.",
  alternates: { canonical: "/hire-me" },
};

export default function HireMePage() {
  return (
    <main data-screen-label="Hire Me">
      {/* Breadcrumb */}
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-5 sm:pt-8">
        <nav
          aria-label="Breadcrumb"
          className="font-['JetBrains_Mono'] text-[11.5px] flex gap-2 text-[var(--faint)]"
        >
          <Link href="/" className="hover:text-[var(--ink)]">
            Home
          </Link>
          <span aria-hidden="true">/</span>
          <span className="text-[var(--ink)]">Hire Me</span>
        </nav>
      </div>

      {/* Hero Header */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 pt-6 sm:pt-13 pb-7 sm:pb-12">
        <p className="inline-flex items-center gap-2.25 px-3.5 py-1.75 border border-[rgba(34,211,238,0.32)] rounded-full bg-[rgba(34,211,238,0.07)] font-['JetBrains_Mono'] text-[10.5px] tracking-[0.16em] uppercase text-[#7fe6f7] mb-6">
          <span className="dot w-1.75 h-1.75 rounded-full bg-[var(--cyan)] animate-[pulseDot_2.4s_ease-out_infinite]"></span>
          Available for select projects
        </p>

        <h1 className="font-['Space_Grotesk'] font-bold text-[34px] sm:text-[56px] lg:text-[70px] leading-[1.05] tracking-[-0.025em] max-w-[16ch] mb-5.5 text-[var(--ink)]">
          Let's Build Something <span className="grad-word">Exceptional.</span>
        </h1>

        <p className="text-[15.5px] sm:text-[18.5px] leading-[1.65] text-[var(--dim)] max-w-[60ch]">
          Send your project details. I reply with the questions that decide scope, an initial technical approach, and a project estimate. If it is not a good fit, I will say that too.
        </p>
      </section>

      {/* Main Interactive Form & Info Grid */}
      <section className="max-w-[1240px] mx-auto px-4 sm:px-6 pb-16 sm:pb-24">
        <Suspense fallback={<div className="p-8 text-[var(--dim)]">Loading project brief form...</div>}>
          <HireForm />
        </Suspense>
      </section>

      {/* Before You Hire FAQ */}
      <FAQAccordion
        id="hire-faq"
        labelNumber="FAQ"
        title="Before You Hire — The Practical Questions"
        faqs={hireFaqs}
      />
    </main>
  );
}
