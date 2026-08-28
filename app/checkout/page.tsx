import type { Metadata } from "next";
import { pageMetadata } from "@/lib/seo";
import { Container } from "@/components/ui/Container";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { CheckoutForm } from "@/components/checkout/CheckoutForm";

const trail = [
  { name: "Home", path: "/" },
  { name: "Checkout", path: "/checkout" },
];

/**
 * Checkout is intentionally `noindex, nofollow`. Transactional pages carry no
 * search intent, they generate near-duplicate URLs for every ?plan= variant,
 * and letting crawlers spend budget here pulls it away from the pages that are
 * meant to rank. There is no canonical or sitemap entry for the same reason.
 */
export const metadata: Metadata = pageMetadata({
  title: "Checkout",
  description: "Complete your Stackpilot subscription.",
  path: "/checkout",
  noindex: true,
});

export default async function CheckoutPage({
  searchParams,
}: PageProps<"/checkout">) {
  const params = await searchParams;
  const raw = params.plan;
  const plan = (Array.isArray(raw) ? raw[0] : raw) ?? "Growth";

  return (
    <Container className="py-12 sm:py-16">
      <Breadcrumbs trail={trail} />
      <div className="mt-8 max-w-2xl">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
          Complete your subscription
        </h1>
        <p className="mt-4 text-base leading-7 text-fg-muted">
          Editors are billed per seat; viewers are unlimited and free on every
          plan. Paid plans start with a 14-day trial and nothing is charged
          until it ends.
        </p>
      </div>

      <div className="mt-12">
        <CheckoutForm initialPlan={plan} />
      </div>
    </Container>
  );
}
