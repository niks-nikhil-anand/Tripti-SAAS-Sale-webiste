import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { engagementFaqs, packages, process, services } from "@/lib/services";
import {
  breadcrumbList,
  graph,
  jsonLdScript,
  pageMetadata,
  professionalService,
} from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon, CheckIcon, ChevronDownIcon } from "@/components/ui/Icons";
import { ContactForm } from "@/components/hire/ContactForm";
import { cn } from "@/lib/utils";

const trail = [
  { name: "Home", path: "/" },
  { name: "Hire us", path: "/hire-me" },
];

export const metadata: Metadata = pageMetadata({
  title: "Hire us — analytics engineering services",
  description:
    "Hire the team behind Stackpilot for warehouse setup, semantic layer design and BI migration. Fixed scope, fixed price, named engineers.",
  path: "/hire-me",
});

const jsonLd = graph(
  professionalService,
  breadcrumbList(trail),
  {
    "@type": "FAQPage",
    "@id": `${siteConfig.url}/hire-me#faq`,
    mainEntity: engagementFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  },
);

export default function HireMePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(jsonLd)}
      />

      <PageHeader
        trail={trail}
        eyebrow="Services"
        title="Hire the team that builds Stackpilot"
        description="Warehouse setup, semantic layer design, BI migrations and embedded analytics engineering. Fixed scope, fixed price, and the same engineers who write the product — not a partner network."
      >
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Button as="a" href="#contact">
            Request a scoping call
            <ArrowRightIcon className="size-[18px]" />
          </Button>
          <Button as="a" href="#packages" variant="secondary">
            See packages and pricing
          </Button>
        </div>
      </PageHeader>

      {/* Services */}
      <section aria-labelledby="services-heading" className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            id="services-heading"
            eyebrow="What we do"
            title="Three kinds of engagement"
            description="If your problem is not one of these, say so on the call and we will tell you honestly whether we are the right people."
          />
          <div className="mt-12 grid gap-5 lg:grid-cols-3">
            {services.map((service) => (
              <article
                key={service.title}
                className="flex flex-col rounded-2xl border border-border bg-surface p-6"
              >
                <h3 className="text-lg font-semibold tracking-tight">
                  {service.title}
                </h3>
                <p className="mt-3 text-[0.9375rem] leading-7 text-fg-muted">
                  {service.description}
                </p>
                <ul className="mt-6 flex flex-col gap-2.5 border-t border-border pt-6">
                  {service.deliverables.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 text-sm leading-6">
                      <CheckIcon className="mt-0.5 size-4 shrink-0 text-accent" />
                      <span className="text-fg-muted">{d}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Packages */}
      <section
        id="packages"
        aria-labelledby="packages-heading"
        className="scroll-mt-24 border-y border-border bg-bg-subtle py-20 sm:py-24"
      >
        <Container>
          <SectionHeading
            id="packages-heading"
            eyebrow="Packages"
            title="Priced up front, before the call"
            description="Publishing rates saves both of us a week. These are real starting numbers, not anchors to negotiate away from."
          />
          <div className="mt-12 grid items-start gap-6 lg:grid-cols-3">
            {packages.map((pkg) => (
              <div
                key={pkg.name}
                className={cn(
                  "flex h-full flex-col rounded-2xl border bg-surface p-7",
                  pkg.featured
                    ? "ring-gradient border-transparent shadow-2xl shadow-accent/10 lg:-my-4 lg:py-11"
                    : "border-border",
                )}
              >
                <div className="flex items-baseline justify-between gap-3">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {pkg.name}
                  </h3>
                  <span className="rounded-full bg-accent-soft px-2.5 py-1 text-[0.6875rem] font-semibold text-accent">
                    {pkg.duration}
                  </span>
                </div>
                <p className="mt-2 text-sm text-fg-muted">{pkg.summary}</p>
                <p className="mt-6 text-3xl font-semibold tracking-tight">
                  {pkg.price}
                </p>
                <Button
                  as="a"
                  href="#contact"
                  variant={pkg.featured ? "primary" : "secondary"}
                  className="mt-6 w-full"
                >
                  Enquire
                </Button>
                <ul className="mt-7 flex flex-col gap-3 border-t border-border pt-7">
                  {pkg.includes.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm leading-6">
                      <CheckIcon className="mt-0.5 size-4 shrink-0 text-accent" />
                      <span className="text-fg-muted">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Container>
      </section>

      {/* Process */}
      <section aria-labelledby="process-heading" className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            id="process-heading"
            eyebrow="How we work"
            title="From first call to handover"
          />
          <ol className="mt-12 grid gap-8 md:grid-cols-4">
            {process.map((step, i) => (
              <li key={step.title} className="flex flex-col gap-3">
                <span className="inline-flex size-12 items-center justify-center rounded-full border border-border bg-surface text-base font-semibold text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="text-lg font-semibold tracking-tight">
                  {step.title}
                </h3>
                <p className="text-[0.9375rem] leading-7 text-fg-muted">
                  {step.description}
                </p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Engagement FAQ */}
      <section
        aria-labelledby="hire-faq-heading"
        className="border-y border-border bg-bg-subtle py-20 sm:py-24"
      >
        <Container className="max-w-3xl">
          <SectionHeading
            id="hire-faq-heading"
            eyebrow="FAQ"
            title="What people ask before signing"
          />
          <div className="mt-12 divide-y divide-border border-y border-border">
            {engagementFaqs.map((faq) => (
              <details key={faq.question} name="hire-faq" className="group py-1">
                <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-left text-[0.9375rem] font-medium transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
                  {faq.question}
                  <ChevronDownIcon className="size-5 shrink-0 text-fg-muted transition-transform duration-300 group-open:-rotate-180" />
                </summary>
                <p className="pb-5 pr-10 text-[0.9375rem] leading-7 text-fg-muted">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </Container>
      </section>

      {/* Contact */}
      <section
        id="contact"
        aria-labelledby="contact-heading"
        className="scroll-mt-24 py-20 sm:py-24"
      >
        <Container className="max-w-3xl">
          <SectionHeading
            id="contact-heading"
            eyebrow="Get in touch"
            title="Tell us what is blocking the team"
            description="Forty-five minutes, no deck. If we are not the right fit we will say so and point you somewhere better."
          />
          <div className="mt-12">
            <ContactForm />
          </div>
          <p className="mt-6 text-center text-sm text-fg-muted">
            Prefer email?{" "}
            <a
              href={`mailto:${siteConfig.email}`}
              className="text-accent hover:underline"
            >
              {siteConfig.email}
            </a>
          </p>
        </Container>
      </section>
    </>
  );
}
