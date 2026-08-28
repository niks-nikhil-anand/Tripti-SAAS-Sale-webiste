import type { FeatureIcon } from "./site";

/**
 * DEMO DATA — the Stackpilot product line as a catalog.
 *
 * Every field here feeds both the visible card and the Product/Offer structured
 * data on /product, so prices and availability must stay truthful once these
 * become real products: Google treats a price in JSON-LD that does not match
 * the price on the page as a reason to drop the rich result.
 */

export type Availability = "available" | "beta" | "waitlist";

export type CatalogProduct = {
  slug: string;
  name: string;
  category: string;
  icon: FeatureIcon;
  tagline: string;
  description: string;
  /** null means "contact us" — rendered as Custom, and omitted from Offers. */
  price: number | null;
  unit: string;
  availability: Availability;
  badge?: string;
  features: string[];
  cta: { label: string; href: string };
};

export const catalog: CatalogProduct[] = [
  {
    slug: "pilot-analytics",
    name: "Pilot Analytics",
    category: "Analytics",
    icon: "graph",
    tagline: "The core product analytics workspace",
    description:
      "Dashboards, saved explorations and shared links built on your governed metrics. The place most of your team spends its time.",
    price: 79,
    unit: "per editor / month",
    availability: "available",
    badge: "Most popular",
    features: [
      "Unlimited dashboards and viewers",
      "Saved explorations with version history",
      "Scheduled email and Slack digests",
      "Read-only share links that expire",
    ],
    cta: { label: "Start free trial", href: "/checkout?plan=growth" },
  },
  {
    slug: "metrics-layer",
    name: "Metrics Layer",
    category: "Data",
    icon: "shield",
    tagline: "Definitions in version control",
    description:
      "Metrics defined in YAML, reviewed through pull requests and synced bi-directionally with your dbt project. One definition, company-wide.",
    price: 49,
    unit: "per editor / month",
    availability: "available",
    features: [
      "Bi-directional dbt Core and dbt Cloud sync",
      "Pull-request review with rendered diffs",
      "Ownership and freshness SLAs per metric",
      "Deprecation warnings that propagate downstream",
    ],
    cta: { label: "Start free trial", href: "/checkout?plan=growth" },
  },
  {
    slug: "copilot",
    name: "Copilot",
    category: "AI",
    icon: "sparkles",
    tagline: "Plain-English questions, governed answers",
    description:
      "Ask in natural language and get an answer resolved against reviewed metrics — never free-form SQL over raw tables. Every answer shows its work.",
    price: 99,
    unit: "per editor / month",
    availability: "available",
    badge: "New",
    features: [
      "Resolves to approved metrics, never invents joins",
      "Shows generated SQL, filters and confidence",
      "Says 'no metric covers this' instead of guessing",
      "One-click correction feeds back as an example",
    ],
    cta: { label: "Start free trial", href: "/checkout?plan=growth" },
  },
  {
    slug: "cohorts",
    name: "Cohorts",
    category: "Analytics",
    icon: "users",
    tagline: "Funnels, retention and cohort comparison",
    description:
      "Purpose-built explorers for drop-off, time-to-value and weekly retention. No modelling work required — it reads the metrics you already defined.",
    price: 59,
    unit: "per editor / month",
    availability: "available",
    features: [
      "Multi-step funnels with time-between-steps",
      "Weekly and monthly retention grids",
      "Cohort comparison against a control",
      "Sample sizes stated on every chart",
    ],
    cta: { label: "Start free trial", href: "/checkout?plan=growth" },
  },
  {
    slug: "signals",
    name: "Signals",
    category: "Analytics",
    icon: "bolt",
    tagline: "Alerting when a metric leaves its band",
    description:
      "Turn any pinned answer into monitoring. Threshold and anomaly alerts routed to the channel the owning team actually reads.",
    price: 39,
    unit: "per workspace / month",
    availability: "available",
    features: [
      "Threshold and seasonal anomaly detection",
      "Slack, email and webhook delivery",
      "Per-metric ownership and escalation",
      "Alert history with resolution notes",
    ],
    cta: { label: "Start free trial", href: "/checkout?plan=growth" },
  },
  {
    slug: "warehouse-sync",
    name: "Warehouse Sync",
    category: "Data",
    icon: "plug",
    tagline: "Connectors and incremental aggregates",
    description:
      "Read-only connections to Snowflake, BigQuery, Databricks, Redshift and Postgres, plus the aggregate engine that keeps your compute bill flat.",
    price: 29,
    unit: "per connection / month",
    availability: "available",
    features: [
      "Six warehouse connectors, read-only roles",
      "Incremental aggregates rebuilt as events land",
      "Per-workspace compute budgets with hard caps",
      "Spend attribution by team and dashboard",
    ],
    cta: { label: "Start free trial", href: "/checkout?plan=growth" },
  },
  {
    slug: "governance",
    name: "Governance",
    category: "Governance",
    icon: "shield",
    tagline: "SSO, SCIM, row-level policies and audit",
    description:
      "Everything your security review asks for, mapped to the access controls already enforced in your warehouse.",
    price: 129,
    unit: "per workspace / month",
    availability: "available",
    features: [
      "SAML and OIDC single sign-on",
      "SCIM provisioning and deprovisioning",
      "Row-level policies inherited from the warehouse",
      "Full audit log with export",
    ],
    cta: { label: "Start free trial", href: "/checkout?plan=growth" },
  },
  {
    slug: "embedded",
    name: "Embedded",
    category: "Governance",
    icon: "graph",
    tagline: "Ship analytics inside your own product",
    description:
      "White-labelled dashboards and metric APIs for the analytics your customers see. Priced per deployment, not per end user.",
    price: null,
    unit: "custom pricing",
    availability: "beta",
    badge: "Beta",
    features: [
      "White-label theming and custom domains",
      "Signed embed tokens with row-level scoping",
      "REST and GraphQL metric APIs",
      "Per-tenant usage reporting",
    ],
    cta: { label: "Talk to sales", href: "/hire-me#contact" },
  },
];

export const catalogCategories = [
  "All",
  ...[...new Set(catalog.map((p) => p.category))].sort(),
];

export const availabilityLabel: Record<Availability, string> = {
  available: "Available now",
  beta: "In beta",
  waitlist: "Join the waitlist",
};
