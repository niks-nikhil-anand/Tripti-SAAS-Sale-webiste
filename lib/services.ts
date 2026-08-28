/**
 * Content for /hire-me. Framed as "hire the team behind the product" for
 * implementation and analytics-engineering work. If you meant this page as a
 * personal freelance profile instead, the structure holds — swap the copy and
 * change `professionalService` in lib/seo.ts to a `Person` node.
 */

export const services = [
  {
    title: "Warehouse and semantic layer setup",
    description:
      "We connect your warehouse, read your dbt project and land a reviewed metric set covering the numbers your leadership team already looks at.",
    deliverables: [
      "Connection, roles and network configuration",
      "20–40 core metrics defined, reviewed and committed",
      "dbt sync configured with ownership and freshness SLAs",
      "A working dashboard set for one pilot team",
    ],
  },
  {
    title: "BI migration",
    description:
      "Moving off Looker, Tableau, Mode or a homegrown stack, sequenced by team so nobody is stuck living in two tools for a quarter.",
    deliverables: [
      "Usage audit and pruning plan with a deletion list",
      "Metric reconciliation against the old tool, differences explained",
      "Team-by-team rollout with a fixed parallel-run window",
      "Decommissioning plan tied to your renewal date",
    ],
  },
  {
    title: "Analytics engineering retainer",
    description:
      "An embedded analytics engineer for teams that need modelling capacity without opening a headcount req.",
    deliverables: [
      "Named engineer, fixed days per month",
      "Model and metric development in your repository",
      "Code review for your own analysts' pull requests",
      "Quarterly architecture review",
    ],
  },
];

export const packages = [
  {
    name: "Pilot",
    duration: "2 weeks",
    price: "$12,000",
    summary: "Prove the workflow with one team and one warehouse.",
    includes: [
      "Warehouse connection and access review",
      "Up to 20 governed metrics",
      "One team onboarded and trained",
      "Written handover document",
    ],
  },
  {
    name: "Migration",
    duration: "6–10 weeks",
    price: "From $48,000",
    summary: "Full move off an existing BI tool, sequenced by team.",
    includes: [
      "Everything in Pilot",
      "Usage audit and pruning plan",
      "Metric reconciliation and sign-off",
      "Rollout across every team",
      "Decommissioning support",
    ],
    featured: true,
  },
  {
    name: "Retainer",
    duration: "Monthly",
    price: "From $9,000 / mo",
    summary: "Ongoing analytics engineering capacity.",
    includes: [
      "Named engineer, 6 days per month",
      "Model and metric development",
      "Pull-request review for your team",
      "Quarterly architecture review",
    ],
  },
];

export const process = [
  {
    title: "Scoping call",
    description:
      "45 minutes on your warehouse, your current tooling and what is actually blocking the team. We will tell you if you do not need us.",
  },
  {
    title: "Written proposal",
    description:
      "Fixed scope, fixed price, named people and a start date. No statement of work longer than three pages.",
  },
  {
    title: "Delivery in the open",
    description:
      "We work in your repository and your Slack. You see every commit as it lands, not at a milestone review.",
  },
  {
    title: "Handover",
    description:
      "Documentation, a recorded walkthrough and two weeks of support after the last day of the engagement.",
  },
];

export const engagementFaqs = [
  {
    question: "Who actually does the work?",
    answer:
      "The same analytics engineers who build Stackpilot. Every engagement has one named lead who is on the scoping call and stays through handover — we do not hand you to a different team after signing.",
  },
  {
    question: "Do we have to use Stackpilot to hire you?",
    answer:
      "No. Roughly a third of our engagements are pure dbt and warehouse work with no Stackpilot involved. If the right answer for you is a tool we do not sell, we will say so on the scoping call.",
  },
  {
    question: "How do you handle access to our data?",
    answer:
      "We work under your access policies with named accounts and a read-only role scoped to the models in question. We sign your NDA and DPA before the first call if you prefer, and all access is revoked at handover.",
  },
  {
    question: "What if the project runs over?",
    answer:
      "Fixed-scope engagements are fixed-price. If we underestimated, that is our cost, not yours. Scope changes are quoted separately and in writing before any work starts.",
  },
];
