import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";
import { capabilities, comparison, integrations, securityPoints } from "@/lib/product";
import { catalog } from "@/lib/catalog";
import {
  breadcrumbList,
  catalogJsonLd,
  graph,
  jsonLdScript,
  pageMetadata,
  softwareApplication,
} from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { PageHeader } from "@/components/ui/PageHeader";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Button } from "@/components/ui/Button";
import { ArrowRightIcon, CheckIcon } from "@/components/ui/Icons";
import { AppPreview } from "@/components/sections/AppPreview";
import { ProductCatalog } from "@/components/product/ProductCatalog";

const trail = [
  { name: "Home", path: "/" },
  { name: "Product", path: "/product" },
];

export const metadata: Metadata = pageMetadata({
  title: "Products — the full Stackpilot line",
  description:
    "All eight Stackpilot products: analytics, metrics layer, AI copilot, cohorts, alerting, warehouse sync, governance and embedded. Pricing on every card.",
  path: "/product",
});

const jsonLd = graph(
  softwareApplication,
  catalogJsonLd(catalog),
  breadcrumbList(trail),
);

export default function ProductPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(jsonLd)}
      />

      <PageHeader
        trail={trail}
        eyebrow="Product"
        title="Eight products, one governed metrics layer"
        description="Every Stackpilot product reads the same reviewed definitions, so the number you see in a dashboard, an alert and an embedded chart is the same number. Buy the pieces you need."
      >
        <div className="mt-4 flex flex-col gap-3 sm:flex-row">
          <Button as="a" href="/checkout?plan=growth">
            Start free
            <ArrowRightIcon className="size-[18px]" />
          </Button>
          <Button as="a" href="/hire-me" variant="secondary">
            Get help implementing it
          </Button>
        </div>
      </PageHeader>

      <Container className="py-14">
        <AppPreview />
      </Container>

      {/* Product catalog */}
      <section
        id="catalog"
        aria-labelledby="catalog-heading"
        className="scroll-mt-24 border-y border-border bg-bg-subtle py-20 sm:py-24"
      >
        <Container>
          <SectionHeading
            id="catalog-heading"
            eyebrow="Catalog"
            title="The whole product line"
            description="Start with any one of them. They share the metrics layer, so adding a second product means no second implementation."
          />
          <div className="mt-12">
            <ProductCatalog />
          </div>
        </Container>
      </section>

      {/* Capability deep-dives, alternating sides. */}
      <section aria-labelledby="capabilities-heading" className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            id="capabilities-heading"
            eyebrow="How they work together"
            title="Four capabilities every product is built on"
            description="However many products you buy, these are the mechanics underneath — which is why the second one takes an afternoon rather than a quarter."
          />
          <div className="mt-16 flex flex-col gap-20">
            {capabilities.map((cap, i) => (
              <article
                key={cap.id}
                id={cap.id}
                aria-labelledby={`${cap.id}-heading`}
                className="scroll-mt-24 grid items-center gap-10 lg:grid-cols-2"
              >
                <div className={i % 2 === 1 ? "lg:order-2" : undefined}>
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
                    {cap.eyebrow}
                  </p>
                  <h3
                    id={`${cap.id}-heading`}
                    className="mt-4 text-2xl font-semibold tracking-tight text-balance sm:text-3xl"
                  >
                    {cap.title}
                  </h3>
                  <p className="mt-4 text-[1.0625rem] leading-8 text-fg-muted">
                    {cap.description}
                  </p>
                  <ul className="mt-6 flex flex-col gap-3">
                    {cap.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2.5 text-[0.9375rem] leading-7">
                        <CheckIcon className="mt-1 size-4 shrink-0 text-accent" />
                        <span className="text-fg-muted">{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div
                  className={[
                    "ring-gradient rounded-2xl border border-transparent bg-surface-2 p-8",
                    i % 2 === 1 ? "lg:order-1" : "",
                  ].join(" ")}
                >
                  <p
                    aria-hidden="true"
                    className="text-[5rem] font-semibold leading-none tracking-tighter text-accent/15"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <p className="mt-4 text-sm leading-7 text-fg-muted">
                    {cap.bullets[0]}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </section>

      {/* Integrations */}
      <section
        id="integrations"
        aria-labelledby="integrations-heading"
        className="scroll-mt-24 border-y border-border bg-bg-subtle py-20 sm:py-24"
      >
        <Container>
          <SectionHeading
            id="integrations-heading"
            eyebrow="Integrations"
            title="Point it at the stack you already run"
            description="Stackpilot reads your warehouse and your dbt models. There is no separate pipeline to build and no events to re-instrument."
          />
          <ul className="mt-12 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {integrations.map((integration) => (
              <li
                key={integration.name}
                className="rounded-xl border border-border bg-surface px-4 py-3.5 transition-colors hover:border-border-strong"
              >
                <p className="font-medium">{integration.name}</p>
                <p className="mt-0.5 text-xs text-fg-muted">
                  {integration.category}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Comparison table */}
      <section
        id="compare"
        aria-labelledby="compare-heading"
        className="scroll-mt-24 py-20 sm:py-24"
      >
        <Container>
          <SectionHeading
            id="compare-heading"
            eyebrow="Compare"
            title="Where Stackpilot sits against the alternatives"
            description="An honest read. If your event volume is small and compliance is light, an event-store tool is genuinely simpler — we would rather you knew that now."
          />
          <div className="mt-12 overflow-x-auto rounded-2xl border border-border">
            <table className="w-full min-w-[42rem] border-collapse text-left text-sm">
              <caption className="sr-only">
                Feature comparison between Stackpilot, legacy BI tools and
                event-store analytics products
              </caption>
              <thead>
                <tr className="bg-surface-2">
                  <th scope="col" className="px-5 py-4 font-semibold">
                    Capability
                  </th>
                  {comparison.columns.map((col, i) => (
                    <th
                      key={col}
                      scope="col"
                      className={[
                        "px-5 py-4 font-semibold",
                        i === 0 ? "text-accent" : "",
                      ].join(" ")}
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {comparison.rows.map((row) => (
                  <tr key={row.feature} className="border-t border-border">
                    <th scope="row" className="px-5 py-4 font-medium">
                      {row.feature}
                    </th>
                    {row.values.map((value, i) => (
                      <td
                        key={value + i}
                        className={[
                          "px-5 py-4",
                          i === 0 ? "font-medium" : "text-fg-muted",
                        ].join(" ")}
                      >
                        {value}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </section>

      {/* Security */}
      <section
        id="security"
        aria-labelledby="security-heading"
        className="scroll-mt-24 border-y border-border bg-bg-subtle py-20 sm:py-24"
      >
        <Container>
          <SectionHeading
            id="security-heading"
            eyebrow="Security"
            title="Built for the review your security team will run"
            description="A read-only role, aggregates we can delete on request, and the paperwork procurement asks for."
          />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2">
            {securityPoints.map((point) => (
              <li
                key={point.title}
                className="rounded-2xl border border-border bg-surface p-6"
              >
                <h3 className="text-lg font-semibold tracking-tight">
                  {point.title}
                </h3>
                <p className="mt-2 text-[0.9375rem] leading-7 text-fg-muted">
                  {point.description}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section aria-labelledby="product-cta-heading" className="py-20 sm:py-24">
        <Container className="flex flex-col items-center gap-6 text-center">
          <h2
            id="product-cta-heading"
            className="max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
            Connect a warehouse and ask your first question
          </h2>
          <p className="max-w-xl text-base leading-7 text-fg-muted">
            Free for three editors, forever. {siteConfig.name} needs a read-only
            role and about five minutes.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button as="a" href="/checkout?plan=growth" size="lg">
              Start free
              <ArrowRightIcon className="size-[18px]" />
            </Button>
            <Button as="a" href="/blog" size="lg" variant="secondary">
              Read the engineering notes
            </Button>
          </div>
        </Container>
      </section>
    </>
  );
}
