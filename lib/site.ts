/**
 * Single source of truth for every piece of copy, link and SEO value on the
 * landing page. Rename the product, swap the pricing, change the domain — it
 * all flows from here into the components, the metadata and the JSON-LD.
 */

export const siteConfig = {
  name: "Stackpilot",
  legalName: "Stackpilot, Inc.",
  domain: "stackpilot.com",
  url:
    process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
    "https://stackpilot.com",
  tagline: "Product analytics with an AI copilot",
  description:
    "Stackpilot turns raw product data into answers. Ask in plain English, get a governed metric, a chart and the cohort behind it — in seconds, not sprints.",
  shortDescription:
    "Ask your product data anything. Stackpilot returns governed metrics, charts and cohorts in seconds.",
  keywords: [
    "product analytics",
    "AI analytics platform",
    "self-serve BI",
    "funnel analysis",
    "retention analytics",
    "SaaS analytics software",
    "metrics layer",
    "warehouse-native analytics",
  ],
  locale: "en_US",
  twitterHandle: "@stackpilot",
  founded: "2021",
  email: "hello@stackpilot.com",
  social: {
    x: "https://x.com/stackpilot",
    linkedin: "https://www.linkedin.com/company/stackpilot",
    github: "https://github.com/stackpilot",
  },
} as const;

export const nav = [
  { label: "Product", href: "/product" },
  { label: "Pricing", href: "/#pricing" },
  { label: "Blog", href: "/blog" },
  { label: "About", href: "/about" },
  { label: "Hire us", href: "/hire-me" },
] as const;

/** Routes that belong in sitemap.xml. /checkout is deliberately absent. */
export const indexableRoutes = [
  { path: "/", changeFrequency: "weekly", priority: 1 },
  { path: "/product", changeFrequency: "monthly", priority: 0.9 },
  { path: "/blog", changeFrequency: "daily", priority: 0.8 },
  { path: "/about", changeFrequency: "monthly", priority: 0.6 },
  { path: "/hire-me", changeFrequency: "monthly", priority: 0.7 },
] as const;

export const stats = [
  { value: "4,200+", label: "product teams onboarded" },
  { value: "18s", label: "median time to first answer" },
  { value: "99.98%", label: "rolling 12-month uptime" },
  { value: "6.4x", label: "more questions answered per PM" },
] as const;

export const logos = [
  "Northwind",
  "Lumen Labs",
  "Kestrel",
  "Verdant",
  "Halcyon",
  "Tessellate",
] as const;

export type FeatureIcon =
  | "sparkles"
  | "shield"
  | "bolt"
  | "graph"
  | "plug"
  | "users";

export type Feature = {
  title: string;
  description: string;
  icon: FeatureIcon;
};

export const features: Feature[] = [
  {
    icon: "sparkles",
    title: "Ask in plain English",
    description:
      "Which onboarding step lost the most enterprise trials last quarter? Stackpilot writes the SQL, runs it against your warehouse, and shows its work.",
  },
  {
    icon: "shield",
    title: "A metrics layer you can trust",
    description:
      "Definitions live in version control and get reviewed like code. Every chart cites the metric it used, so activated users means one thing company-wide.",
  },
  {
    icon: "bolt",
    title: "Answers in seconds",
    description:
      "An incremental query engine caches aggregates as your events land. Dashboards that took 40 seconds on your warehouse come back in under two.",
  },
  {
    icon: "graph",
    title: "Funnels, retention, cohorts",
    description:
      "Purpose-built explorers for the questions product teams actually ask — drop-off, time-to-value, weekly retention — with no modelling work required.",
  },
  {
    icon: "plug",
    title: "Connects to what you already run",
    description:
      "Native syncs for Snowflake, BigQuery, Databricks, Postgres, Segment and dbt. Point at your existing models and keep the warehouse as source of truth.",
  },
  {
    icon: "users",
    title: "Built for the whole team",
    description:
      "Row-level permissions, SSO and SCIM, audit logs, and shareable read-only links so support and sales get answers without a seat-per-person tax.",
  },
];

export const steps = [
  {
    title: "Connect your warehouse",
    description:
      "A read-only role and five minutes. Stackpilot introspects your schema and proposes a starting metric set from your existing dbt models.",
  },
  {
    title: "Confirm your metrics",
    description:
      "Review the proposed definitions, edit them in YAML or the UI, then merge. From that point every answer is traceable to a reviewed definition.",
  },
  {
    title: "Ask, share, ship",
    description:
      "Your team asks questions in natural language, pins the good answers to dashboards, and gets alerted the moment a metric drifts out of band.",
  },
] as const;

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  company: string;
};

export const testimonials: Testimonial[] = [
  {
    quote:
      "We cut our analytics backlog from three weeks to same-day. PMs stopped filing tickets because they can just ask — and I stopped worrying, because they are asking against definitions my team reviewed.",
    name: "Priya Raghavan",
    role: "Head of Data",
    company: "Northwind",
  },
  {
    quote:
      "The metrics layer is the whole thing. Two teams used to report different activation numbers in the same meeting. That has not happened once since we moved.",
    name: "Marcus Ellery",
    role: "VP Product",
    company: "Lumen Labs",
  },
  {
    quote:
      "It reads our dbt models instead of asking us to rebuild them. That single decision is why the rollout took a week rather than a quarter.",
    name: "Sofia Nakamura",
    role: "Staff Analytics Engineer",
    company: "Kestrel",
  },
];

export type Plan = {
  name: string;
  monthly: number | null;
  annual: number | null;
  blurb: string;
  features: string[];
  cta: string;
  featured?: boolean;
};

export const plans: Plan[] = [
  {
    name: "Starter",
    monthly: 0,
    annual: 0,
    blurb: "For small teams validating the workflow.",
    features: [
      "Up to 3 editors, unlimited viewers",
      "1 warehouse connection",
      "2M tracked events per month",
      "30 AI questions per day",
      "Community support",
    ],
    cta: "Start free",
  },
  {
    name: "Growth",
    monthly: 79,
    annual: 63,
    blurb: "For product teams running on their own metrics.",
    features: [
      "Unlimited editors and viewers",
      "Unlimited warehouse connections",
      "50M tracked events per month",
      "Unlimited AI questions",
      "dbt sync, metric reviews and alerts",
      "SSO (Google, Okta) and audit logs",
    ],
    cta: "Start 14-day trial",
    featured: true,
  },
  {
    name: "Enterprise",
    monthly: null,
    annual: null,
    blurb: "For regulated teams with procurement.",
    features: [
      "Everything in Growth",
      "SCIM provisioning and row-level policies",
      "VPC or on-premise deployment",
      "SOC 2 Type II and HIPAA BAA",
      "99.99% uptime SLA",
      "Named solutions architect",
    ],
    cta: "Talk to sales",
  },
];

export const faqs = [
  {
    question: "Do I need to move my data into Stackpilot?",
    answer:
      "No. Stackpilot queries your warehouse directly using a read-only role and caches aggregates for speed. Your raw data never leaves Snowflake, BigQuery, Databricks or Postgres, and you can revoke access at any time.",
  },
  {
    question: "How accurate is the natural-language querying?",
    answer:
      "Questions are answered against your reviewed metric definitions rather than free-form SQL over raw tables, which is what keeps results consistent. Every answer shows the generated SQL and the definition it used, so an analyst can verify or correct it in one click.",
  },
  {
    question: "How long does implementation take?",
    answer:
      "Most teams are answering real questions the same day. Connecting a warehouse takes about five minutes, and if you already use dbt, Stackpilot proposes a starting metric set automatically. A full migration from an existing BI tool typically runs one to two weeks.",
  },
  {
    question: "What about security and compliance?",
    answer:
      "Stackpilot is SOC 2 Type II certified and GDPR compliant, with encryption in transit and at rest, SSO and SCIM, row-level permissions, and full audit logs. Enterprise customers can deploy into their own VPC and sign a HIPAA BAA.",
  },
  {
    question: "Can I change or cancel my plan?",
    answer:
      "Yes. Plans are self-serve month to month or annual, upgrades are prorated, and you can downgrade or cancel from billing settings without contacting support. Annual plans are billed up front at a 20 percent discount.",
  },
  {
    question: "Is there a free tier?",
    answer:
      "Starter is free forever for up to three editors, one warehouse connection and two million tracked events per month. No credit card is required, and unlimited viewers are included on every plan.",
  },
] as const;

export const footerNav = [
  {
    title: "Product",
    links: [
      { label: "Overview", href: "/product" },
      { label: "How it works", href: "/#how-it-works" },
      { label: "Pricing", href: "/#pricing" },
      { label: "Start checkout", href: "/checkout" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "/about" },
      { label: "Hire our team", href: "/hire-me" },
      { label: "Blog", href: "/blog" },
      { label: "Contact", href: "/hire-me#contact" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", href: "/blog" },
      { label: "Integrations", href: "/product#integrations" },
      { label: "Security", href: "/product#security" },
      { label: "FAQ", href: "/#faq" },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: "/about#legal" },
      { label: "Terms", href: "/about#legal" },
      { label: "DPA", href: "/about#legal" },
      { label: "Sub-processors", href: "/about#legal" },
    ],
  },
] as const;
