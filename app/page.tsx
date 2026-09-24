import type { Metadata } from "next";
import { homeFaqs } from "@/lib/site";
import {
  faqJsonLd,
  graph,
  pageMetadata,
  person,
  webPageJsonLd,
  website,
} from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Hero } from "@/components/sections/Hero";
import { Marquee } from "@/components/sections/Marquee";
import { FeaturedProjects } from "@/components/sections/FeaturedProjects";
import { PageDirectory } from "@/components/sections/PageDirectory";
import { AiEngineering } from "@/components/sections/AiEngineering";
import { WhyHireMe } from "@/components/sections/WhyHireMe";
import { ProcessTimeline } from "@/components/sections/ProcessTimeline";
import { LatestArticles } from "@/components/sections/LatestArticles";
import { LocationsServed } from "@/components/sections/LocationsServed";
import { ContactCTA } from "@/components/sections/ContactCTA";
import { AuthorCard } from "@/components/profile/AuthorCard";
import { Eyebrow, H2, Section } from "@/components/ui/Section";
import { FaqList } from "@/components/landing/FaqList";

const title = "Tripti Shakya – Full Stack & AI Developer in Bangalore";
const description =
  "Full Stack & AI Developer building production-ready SaaS, web applications and AI products with React, Next.js, Node.js, Python, LLMs and RAG.";

export const metadata: Metadata = pageMetadata({
  title,
  description,
  path: "/",
  absoluteTitle: true,
});

const faqs = homeFaqs.map((f) => ({ q: f.q, a: f.a }));

/**
 * The homepage positions the brand and routes visitors; it deliberately does
 * not try to rank for every keyword. Each service keyword has its own page,
 * linked from the directory below.
 */
export default function HomePage() {
  return (
    <>
      <JsonLd
        data={graph(
          website,
          person,
          webPageJsonLd({ path: "/", name: title, description }),
          faqJsonLd("/", faqs),
        )}
      />
      <Hero />
      <Marquee />
      <FeaturedProjects />
      <PageDirectory showProjects={false} />
      <AiEngineering />
      <WhyHireMe />
      <ProcessTimeline />
      <AuthorCard />
      <LatestArticles />
      <LocationsServed />
      <Section id="faq" labelledBy="faq-h">
        <Eyebrow>FAQ</Eyebrow>
        <H2 id="faq-h">Questions people ask first</H2>
        <div className="mt-8">
          <FaqList faqs={faqs} />
        </div>
      </Section>
      <ContactCTA />
    </>
  );
}
