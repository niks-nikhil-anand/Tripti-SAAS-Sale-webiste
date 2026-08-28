import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { companyFacts, companyStory, team, timeline, values } from "@/lib/company";
import {
  breadcrumbList,
  graph,
  jsonLdScript,
  organization,
  pageMetadata,
} from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon } from "@/components/ui/Icons";

const trail = [
  { name: "Home", path: "/" },
  { name: "About", path: "/about" },
];

export const metadata: Metadata = pageMetadata({
  title: "About — the team behind Stackpilot",
  description:
    "Why Stackpilot exists, what we believe about governed metrics, who builds it, and how the company has grown since 2021.",
  path: "/about",
});

const jsonLd = graph(
  {
    ...organization,
    numberOfEmployees: { "@type": "QuantitativeValue", value: 38 },
    employee: team.map((member) => ({
      "@type": "Person",
      name: member.name,
      jobTitle: member.role,
      description: member.bio,
    })),
  },
  {
    "@type": "AboutPage",
    "@id": `${siteConfig.url}/about#page`,
    url: `${siteConfig.url}/about`,
    name: `About ${siteConfig.name}`,
    description:
      "Why Stackpilot exists, what we believe about governed metrics, and who builds it.",
    mainEntity: { "@id": `${siteConfig.url}/#organization` },
  },
  breadcrumbList(trail),
);

function initials(name: string) {
  return name.split(" ").map((p) => p[0]).slice(0, 2).join("");
}

export default function AboutPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(jsonLd)}
      />

      <PageHeader
        trail={trail}
        eyebrow="About"
        title="We got tired of two dashboards disagreeing"
        description="Stackpilot exists because product teams should not wait three weeks for a number that already sits in their warehouse — and should not get two different versions of it when they do."
      />

      {/* Story + facts */}
      <section aria-labelledby="story-heading" className="py-20 sm:py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1.5fr_1fr]">
            <div>
              <h2
                id="story-heading"
                className="text-2xl font-semibold tracking-tight sm:text-3xl"
              >
                How it started
              </h2>
              <div className="mt-6 flex flex-col gap-5">
                {companyStory.map((para) => (
                  <p key={para.slice(0, 32)} className="text-[1.0625rem] leading-8 text-fg-muted">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            <dl className="grid h-fit grid-cols-2 gap-px overflow-hidden rounded-2xl border border-border bg-border">
              {companyFacts.map((fact) => (
                <div key={fact.label} className="bg-surface p-5">
                  <dt className="text-xs uppercase tracking-[0.14em] text-fg-muted">
                    {fact.label}
                  </dt>
                  <dd className="mt-2 text-lg font-semibold tracking-tight">
                    {fact.value}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Container>
      </section>

      {/* Values */}
      <section
        aria-labelledby="values-heading"
        className="border-y border-border bg-bg-subtle py-20 sm:py-24"
      >
        <Container>
          <SectionHeading
            id="values-heading"
            eyebrow="What we believe"
            title="Four things we will not trade away"
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2">
            {values.map((value) => (
              <li key={value.title} className="rounded-2xl border border-border bg-surface p-6">
                <h3 className="text-lg font-semibold tracking-tight">
                  {value.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-7 text-fg-muted">
                  {value.description}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Timeline */}
      <section aria-labelledby="timeline-heading" className="py-20 sm:py-24">
        <Container className="max-w-3xl">
          <SectionHeading
            id="timeline-heading"
            eyebrow="Timeline"
            title="Five years, in order"
            align="left"
          />
          <ol className="mt-12 flex flex-col">
            {timeline.map((entry, i) => (
              <li key={entry.year} className="relative flex gap-6 pb-10 last:pb-0">
                {i < timeline.length - 1 ? (
                  <span
                    aria-hidden="true"
                    className="absolute left-[1.4375rem] top-12 h-[calc(100%-3rem)] w-px bg-border"
                  />
                ) : null}
                <span className="relative z-10 inline-flex size-12 shrink-0 items-center justify-center rounded-full border border-border bg-surface text-xs font-semibold text-accent">
                  {entry.year}
                </span>
                <div className="pt-2.5">
                  <h3 className="text-lg font-semibold tracking-tight">
                    {entry.title}
                  </h3>
                  <p className="mt-1.5 text-[0.9375rem] leading-7 text-fg-muted">
                    {entry.description}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Team */}
      <section
        aria-labelledby="team-heading"
        className="border-y border-border bg-bg-subtle py-20 sm:py-24"
      >
        <Container>
          <SectionHeading
            id="team-heading"
            eyebrow="Team"
            title="The people who answer your emails"
            description="Thirty-eight people across eleven countries. These four sign off on most of what ships."
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {team.map((member) => (
              <li key={member.name} className="rounded-2xl border border-border bg-surface p-6">
                <span
                  aria-hidden="true"
                  className="inline-flex size-12 items-center justify-center rounded-full bg-accent-soft text-base font-semibold text-accent"
                >
                  {initials(member.name)}
                </span>
                <h3 className="mt-4 font-semibold tracking-tight">{member.name}</h3>
                <p className="text-sm text-accent">{member.role}</p>
                <p className="mt-3 text-sm leading-6 text-fg-muted">{member.bio}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Legal anchor — the footer links point here. */}
      <section id="legal" aria-labelledby="legal-heading" className="scroll-mt-24 py-20 sm:py-24">
        <Container className="max-w-3xl">
          <h2 id="legal-heading" className="text-2xl font-semibold tracking-tight">
            Legal and compliance
          </h2>
          <p className="mt-4 text-[1.0625rem] leading-8 text-fg-muted">
            Our privacy policy, terms of service, data processing agreement and
            sub-processor list are available on request and in the trust centre
            of your workspace. SOC 2 Type II reports are shared under NDA.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button as="a" href={`mailto:${siteConfig.email}`} variant="secondary">
              Request the documents
            </Button>
            <Button as="a" href="/hire-me#contact">
              Talk to the team
              <ArrowRightIcon className="size-[18px]" />
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
