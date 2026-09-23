import type { Metadata } from "next";
import { siteConfig, homeFaqs } from "@/lib/site";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { PageDirectory } from "@/components/sections/PageDirectory";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { AiEngineering } from "@/components/sections/AiEngineering";
import { WhyHireMe } from "@/components/sections/WhyHireMe";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { Testimonials } from "@/components/sections/Testimonials";
import { LocationsServed } from "@/components/sections/LocationsServed";
import { Insights } from "@/components/sections/Insights";
import { FAQAccordion } from "@/components/sections/FAQAccordion";
import { ContactCTA } from "@/components/sections/ContactCTA";

export const metadata: Metadata = {
  title: siteConfig.title,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <PageDirectory />
      <SelectedWork />
      <AiEngineering />
      <WhyHireMe />
      <ProcessTimeline />
      <Testimonials />
      <LocationsServed />
      <Insights />
      <FAQAccordion
        id="faq"
        labelNumber="09 — FAQ"
        title="Questions Buyers Ask First."
        faqs={homeFaqs}
      />
      <ContactCTA />
    </>
  );
}
