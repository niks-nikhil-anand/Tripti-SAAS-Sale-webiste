export type Capability = {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  bullets: string[];
};

export const capabilities: Capability[] = [
  {
    id: "ask",
    eyebrow: "Ask",
    title: "Natural language that resolves to a reviewed metric",
    description:
      "Questions are matched against your approved metric definitions, not translated freehand into SQL over raw tables. The model chooses from a list a human signed off; it never invents a join.",
    bullets: [
      "Every answer shows the metric, filters and generated SQL it used",
      "Unmatched phrasing returns 'no metric covers this' instead of a guess",
      "Follow-up questions keep the resolved context, so 'now split by plan' works",
      "One-click correction turns a wrong match into a training example",
    ],
  },
  {
    id: "metrics",
    eyebrow: "Define",
    title: "A metrics layer that lives in version control",
    description:
      "Definitions are YAML in your repository, reviewed through pull requests and synced from your dbt models. The number in the board deck is traceable to a commit.",
    bullets: [
      "Bi-directional dbt sync — import existing models, export new metrics",
      "Pull-request review with a rendered diff of what the change does to history",
      "Ownership and freshness SLAs per metric, surfaced on every chart",
      "Deprecation warnings that propagate to every dashboard using the metric",
    ],
  },
  {
    id: "explore",
    eyebrow: "Explore",
    title: "Funnels, retention and cohorts without modelling work",
    description:
      "Purpose-built explorers for the four questions product teams ask constantly, built on the same governed definitions as everything else.",
    bullets: [
      "Multi-step funnels with per-step drop-off and time-between-steps",
      "Weekly and monthly retention grids, sliceable by any declared dimension",
      "Cohort comparison against a control, with the sample size stated plainly",
      "Save any exploration as a metric proposal for review",
    ],
  },
  {
    id: "operate",
    eyebrow: "Operate",
    title: "Alerts, dashboards and a query budget that holds",
    description:
      "Answers become monitoring. Pin what matters, set a band, and get told when reality leaves it — without an unbounded warehouse bill.",
    bullets: [
      "Anomaly and threshold alerts to Slack, email or webhook",
      "Incremental aggregates so repeat dashboards do not re-scan the warehouse",
      "Per-workspace compute budgets with hard caps and spend attribution",
      "Read-only shared links that expire, for people who should not need a seat",
    ],
  },
];

export const integrations = [
  { name: "Snowflake", category: "Warehouse" },
  { name: "BigQuery", category: "Warehouse" },
  { name: "Databricks", category: "Warehouse" },
  { name: "PostgreSQL", category: "Warehouse" },
  { name: "Redshift", category: "Warehouse" },
  { name: "ClickHouse", category: "Warehouse" },
  { name: "dbt Core", category: "Modelling" },
  { name: "dbt Cloud", category: "Modelling" },
  { name: "Segment", category: "Events" },
  { name: "RudderStack", category: "Events" },
  { name: "Slack", category: "Delivery" },
  { name: "Okta", category: "Identity" },
] as const;

export const securityPoints = [
  {
    title: "SOC 2 Type II",
    description:
      "Audited annually, report available under NDA. Penetration tested twice a year by an independent firm.",
  },
  {
    title: "Your data stays put",
    description:
      "A read-only warehouse role and cached aggregates. Raw rows are never copied into our infrastructure.",
  },
  {
    title: "GDPR and HIPAA",
    description:
      "EU data residency, a signable DPA, and a HIPAA BAA available on Enterprise. Deletions propagate from your warehouse.",
  },
  {
    title: "Access control that maps to your org",
    description:
      "SSO via SAML or OIDC, SCIM provisioning, row-level policies inherited from the warehouse, and a full audit log.",
  },
];

export const comparison = {
  columns: ["Stackpilot", "Legacy BI", "Event-store analytics"],
  rows: [
    {
      feature: "Data stays in your warehouse",
      values: ["Yes", "Yes", "No — copied to vendor"],
    },
    {
      feature: "Governed metric definitions",
      values: ["Version-controlled", "Per-dashboard queries", "Per-chart config"],
    },
    {
      feature: "Natural-language questions",
      values: ["Resolves to reviewed metrics", "Not available", "Free-form, unverified"],
    },
    {
      feature: "Time to first answer",
      values: ["Same day", "Weeks of modelling", "Days of instrumentation"],
    },
    {
      feature: "Pricing model",
      values: ["Per editor, viewers free", "Per seat, all users", "Per tracked event"],
    },
    {
      feature: "Leaving is possible",
      values: ["Models stay in your warehouse", "Dashboards are proprietary", "Data export only"],
    },
  ],
};
