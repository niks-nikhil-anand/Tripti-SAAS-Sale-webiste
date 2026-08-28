export const companyStory = [
  "Stackpilot started because the two of us kept rebuilding the same thing. At a payments company and then at a marketplace, we watched product teams wait three weeks for a number that already existed in the warehouse — and then watched two teams present different versions of it in the same meeting.",
  "The tooling was not the problem. The warehouse was fine, dbt was fine, the dashboards rendered. What was missing was a place where a metric could be defined once, reviewed like code, and then answered against in plain language by someone who does not write SQL.",
  "We started building that in 2021 with four design partners and a rule we still hold to: the product is never allowed to return a number it cannot explain. Every answer shows its metric, its filters and its SQL. If we cannot show the work, we do not show the number.",
];

export const values = [
  {
    title: "Show the work",
    description:
      "Every number the product returns is traceable to a definition and a query. If we cannot explain where a figure came from, we do not display it.",
  },
  {
    title: "Refuse rather than guess",
    description:
      "When a question does not map to a reviewed metric, the honest answer is 'no metric covers this'. A confident wrong number costs more than a blank space.",
  },
  {
    title: "Your data, your warehouse",
    description:
      "We hold aggregates and definitions. Raw rows stay where they are, under your access controls, so leaving us is a decision and not a project.",
  },
  {
    title: "Small surface, deep",
    description:
      "We would rather do four things properly than twenty adequately. Most feature requests get a no, and we explain why.",
  },
];

export const timeline = [
  {
    year: "2021",
    title: "Founded",
    description:
      "Two founders, four design partners, and a prototype that only did retention curves.",
  },
  {
    year: "2022",
    title: "The metrics layer ships",
    description:
      "Definitions move into version control. The first customer deletes their duplicate 'active users' dashboards.",
  },
  {
    year: "2023",
    title: "Seed round and SOC 2",
    description:
      "$7.5M led by Halcyon Ventures. SOC 2 Type II completed. First enterprise VPC deployment.",
  },
  {
    year: "2024",
    title: "Natural language, constrained",
    description:
      "Questions resolve to reviewed metrics rather than free-form SQL. Answers start showing their work by default.",
  },
  {
    year: "2026",
    title: "4,200 teams",
    description:
      "Warehouse-native by default across Snowflake, BigQuery, Databricks and Postgres.",
  },
];

export const team = [
  {
    name: "Priya Raghavan",
    role: "Co-founder & CEO",
    bio: "Previously led the data platform team at a payments company. Spent six years explaining why two dashboards disagreed.",
  },
  {
    name: "Sofia Nakamura",
    role: "Co-founder & CTO",
    bio: "Analytics engineering and query planning. Wrote the incremental aggregate engine that keeps warehouse bills survivable.",
  },
  {
    name: "Marcus Ellery",
    role: "VP Product",
    bio: "Former product lead at a marketplace. Joined after being a design partner for eighteen months.",
  },
  {
    name: "Dominic Osei",
    role: "Head of Engineering",
    bio: "Distributed systems and reliability. Owns the uptime number on the status page.",
  },
];

export const companyFacts = [
  { label: "Founded", value: "2021" },
  { label: "Team", value: "38 people, 11 countries" },
  { label: "Customers", value: "4,200+ teams" },
  { label: "Funding", value: "$7.5M seed" },
];
