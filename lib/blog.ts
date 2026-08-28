/**
 * Posts are plain data rather than MDX so the project keeps zero extra
 * dependencies. Bodies are structured blocks, which the renderer turns into
 * real semantic HTML — headings crawlers can outline, lists they can parse.
 * Swap this module for a CMS client later; the page components only depend on
 * the `Post` shape.
 */

export type Block =
  | { type: "p"; text: string }
  | { type: "h2"; text: string; id: string }
  | { type: "h3"; text: string; id: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] }
  | { type: "quote"; text: string; cite?: string }
  | { type: "code"; lang: string; code: string };

export type Post = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  readingMinutes: number;
  wordCount: number;
  featured?: boolean;
  author: { name: string; role: string };
  body: Block[];
};

const priya = { name: "Priya Raghavan", role: "Head of Data" };
const marcus = { name: "Marcus Ellery", role: "VP Product" };
const sofia = { name: "Sofia Nakamura", role: "Staff Analytics Engineer" };

export const posts: Post[] = [
  {
    slug: "semantic-layer-vs-dashboards",
    title: "Why a semantic layer beats another dashboard tool",
    excerpt:
      "Most analytics backlogs are not a charting problem. They are a definitions problem — and adding a sixth BI tool makes it worse, not better.",
    category: "Analytics engineering",
    tags: ["semantic layer", "metrics", "dbt", "BI"],
    publishedAt: "2026-07-14",
    updatedAt: "2026-08-02",
    readingMinutes: 7,
    wordCount: 1240,
    featured: true,
    author: priya,
    body: [
      {
        type: "p",
        text: "Every data team I have worked with hits the same wall around the fiftieth dashboard. Nobody trusts the numbers any more. Two charts titled 'active users' disagree by nine percent, and the meeting stops being about the product and starts being about the data.",
      },
      {
        type: "p",
        text: "The instinct is to buy a better charting tool. That almost never helps, because charting was never the bottleneck.",
      },
      {
        type: "h2",
        id: "the-real-problem",
        text: "The real problem is that definitions live in queries",
      },
      {
        type: "p",
        text: "When a metric is defined inside a dashboard query, it exists once per dashboard. Ten dashboards referencing 'activated account' means ten independent definitions, each drifting on its own schedule as people copy, tweak and forget.",
      },
      {
        type: "ul",
        items: [
          "Nobody can answer 'where is this number defined?' without opening the query.",
          "A change to the definition requires finding every copy of it.",
          "Reviews do not happen, because there is no diff to review.",
          "New analysts learn the definitions by asking, not by reading.",
        ],
      },
      {
        type: "h2",
        id: "what-a-semantic-layer-changes",
        text: "What a semantic layer actually changes",
      },
      {
        type: "p",
        text: "A semantic layer moves the definition out of the query and into a versioned artifact. The dashboard stops saying 'count distinct user_id where...' and starts saying 'give me activated_account'. One definition, one place, one review process.",
      },
      {
        type: "code",
        lang: "yaml",
        code: `metrics:\n  - name: activated_account\n    description: Account that completed onboarding and ran a query\n    model: ref('fct_account_activity')\n    calculation_method: count_distinct\n    expression: account_id\n    filters:\n      - field: onboarding_completed_at\n        operator: is not null`,
      },
      {
        type: "p",
        text: "The payoff is not elegance. It is that a change to the definition now goes through a pull request, so the person who owns the metric sees it before the CFO does.",
      },
      {
        type: "h2",
        id: "what-it-does-not-fix",
        text: "What it does not fix",
      },
      {
        type: "p",
        text: "A semantic layer will not rescue a warehouse with no primary keys, and it will not make an underspecified metric meaningful. If your team cannot agree in a meeting what 'active' means, writing it in YAML only relocates the argument.",
      },
      {
        type: "quote",
        text: "The semantic layer did not settle our definitions. It made the disagreement visible early enough to settle it before the board deck.",
        cite: "A customer, three months in",
      },
      {
        type: "h2",
        id: "where-to-start",
        text: "Where to start",
      },
      {
        type: "ol",
        items: [
          "Pick the five metrics that appear in your weekly leadership review.",
          "Write them down, together, in one room, and argue until the definitions are boring.",
          "Commit them. Point one dashboard at them and delete the query it used to run.",
          "Repeat only when someone asks for a metric that is not there yet.",
        ],
      },
      {
        type: "p",
        text: "Five metrics is enough to prove the model. Teams that begin by migrating four hundred metrics generally do not finish.",
      },
    ],
  },
  {
    slug: "warehouse-native-analytics",
    title: "Warehouse-native analytics: the honest trade-off",
    excerpt:
      "Keeping your data in the warehouse instead of copying it into a vendor is the right default. It is also not free — here is the honest trade.",
    category: "Architecture",
    tags: ["warehouse", "Snowflake", "BigQuery", "architecture"],
    publishedAt: "2026-06-23",
    readingMinutes: 6,
    wordCount: 1080,
    author: sofia,
    body: [
      {
        type: "p",
        text: "Warehouse-native means the analytics tool queries your warehouse directly rather than ingesting a copy of your events into its own store. It has become the default expectation, and mostly for good reasons.",
      },
      {
        type: "h2",
        id: "the-case-for",
        text: "The case for it",
      },
      {
        type: "ul",
        items: [
          "One copy of the data, so no reconciliation between the vendor's numbers and yours.",
          "Your existing access controls, retention policies and PII handling still apply.",
          "Deletions actually propagate, which matters more than teams expect under GDPR.",
          "You can leave. The models stay in your warehouse when the contract ends.",
        ],
      },
      {
        type: "h2",
        id: "the-cost",
        text: "The cost nobody puts on the slide",
      },
      {
        type: "p",
        text: "Every interactive question becomes a warehouse query, and warehouse queries have a price and a latency floor. A product analytics tool with its own columnar store can answer a funnel in 200ms because it pre-aggregated everything at ingest. Your warehouse will not do that for free.",
      },
      {
        type: "p",
        text: "This is the trade: you gain governance and lose the pre-aggregation the vendor was quietly doing for you. Tools that pretend otherwise are either caching aggressively or sending you a large compute bill.",
      },
      {
        type: "h3",
        id: "mitigations",
        text: "What actually mitigates it",
      },
      {
        type: "ol",
        items: [
          "Incremental aggregate tables for the handful of shapes that get queried constantly.",
          "A result cache keyed on the metric definition, not the raw SQL string.",
          "Warehouse-side materialisations for the top-of-funnel dashboards everyone opens at 9am.",
          "A hard query budget per workspace, so one runaway exploration cannot ruin the month.",
        ],
      },
      {
        type: "p",
        text: "Done properly, you get warehouse governance at close to vendor-store latency. Done badly, you get a finance conversation.",
      },
      {
        type: "h2",
        id: "how-to-decide",
        text: "How to decide",
      },
      {
        type: "p",
        text: "If your event volume is modest and your compliance requirements are light, a vendor store is genuinely simpler and you should not feel bad about it. If you are already paying for a warehouse, already modelling in dbt, and already fielding data-deletion requests, warehouse-native stops being a preference and starts being the only coherent option.",
      },
    ],
  },
  {
    slug: "natural-language-queries-that-do-not-lie",
    title: "Natural-language queries that do not lie",
    excerpt:
      "Text-to-SQL over raw tables is a demo. Text-to-metric over reviewed definitions is a product. The difference is where the model is allowed to improvise.",
    category: "AI",
    tags: ["AI", "text-to-SQL", "LLM", "metrics"],
    publishedAt: "2026-05-30",
    readingMinutes: 8,
    wordCount: 1420,
    featured: true,
    author: marcus,
    body: [
      {
        type: "p",
        text: "Text-to-SQL demos are extraordinary and production text-to-SQL is a liability. Both statements are true, and the gap between them is the most interesting engineering problem in analytics right now.",
      },
      {
        type: "h2",
        id: "why-demos-mislead",
        text: "Why the demo always works",
      },
      {
        type: "p",
        text: "In a demo, the schema has twelve tables with obvious names and the question is 'what were sales last month'. In your warehouse there are nine hundred tables, four of them are called something like fct_orders, three are deprecated, and only one is correct for revenue — a fact that lives in a colleague's head.",
      },
      {
        type: "p",
        text: "A language model asked to pick will pick confidently. It will produce syntactically perfect SQL against the wrong table and return a number that is plausible, precise and false. That is worse than an error, because an error gets investigated.",
      },
      {
        type: "quote",
        text: "A wrong number that looks right is more expensive than no number at all.",
      },
      {
        type: "h2",
        id: "constrain-the-search-space",
        text: "Constrain what the model is allowed to choose from",
      },
      {
        type: "p",
        text: "The fix is not a better model. It is a smaller decision. Instead of asking the model to author SQL over raw tables, ask it to select and parameterise from a set of reviewed metrics and dimensions. The model handles language; the semantic layer handles truth.",
      },
      {
        type: "ul",
        items: [
          "The model picks a metric from a list a human approved.",
          "It picks dimensions and a time grain that the metric declares as valid.",
          "It cannot invent a join, because it never writes the join.",
          "An unanswerable question returns 'no metric covers this' instead of a guess.",
        ],
      },
      {
        type: "h3",
        id: "show-the-work",
        text: "Then show the work anyway",
      },
      {
        type: "p",
        text: "Even constrained, the mapping from question to metric can be wrong. Every answer should surface the metric it used, the filters it applied and the SQL it ran, one click away — so the analyst reviewing it spends ten seconds rather than ten minutes.",
      },
      {
        type: "code",
        lang: "json",
        code: `{\n  "question": "weekly activated accounts by plan, last 90 days",\n  "resolved": {\n    "metric": "activated_account",\n    "grain": "week",\n    "dimensions": ["plan_name"],\n    "window": "last_90_days"\n  },\n  "confidence": 0.94,\n  "unmatched_terms": []\n}`,
      },
      {
        type: "p",
        text: "The unmatched_terms field matters more than the confidence score. When someone asks about 'power users' and no metric defines that phrase, the honest response is to say so and offer to create one.",
      },
      {
        type: "h2",
        id: "the-uncomfortable-part",
        text: "The uncomfortable part",
      },
      {
        type: "p",
        text: "This approach caps what the system can answer. It will refuse questions a raw text-to-SQL tool would cheerfully attempt. Teams evaluating both will notice the constrained tool answering fewer questions in the bake-off, and will sometimes choose the one that answered everything. Six months later they are reconciling numbers again.",
      },
    ],
  },
  {
    slug: "migrating-off-a-legacy-bi-tool",
    title: "A migration plan for leaving a legacy BI tool",
    excerpt:
      "Four hundred dashboards, one renewal date, and a team that cannot stop shipping. A sequencing plan that has survived contact with reality.",
    category: "Playbooks",
    tags: ["migration", "BI", "playbook", "rollout"],
    publishedAt: "2026-04-18",
    readingMinutes: 9,
    wordCount: 1610,
    author: priya,
    body: [
      {
        type: "p",
        text: "Nobody migrates BI tools because they are bored. It happens because a renewal is coming, the seat cost has doubled, or the tool cannot express the thing the business now needs. Whatever the trigger, the constraint is the same: you cannot pause reporting while you move.",
      },
      {
        type: "h2",
        id: "count-first",
        text: "Count before you plan",
      },
      {
        type: "p",
        text: "Pull the usage logs. In every migration I have run, the distribution is brutally uneven — a small fraction of dashboards carry nearly all the views, and a long tail has not been opened in a year.",
      },
      {
        type: "ol",
        items: [
          "Export view counts per dashboard for the last 90 days.",
          "Mark anything with zero views as a deletion candidate, not a migration candidate.",
          "Mark anything opened by exactly one person as a candidate for a saved query instead.",
          "What remains is the actual migration scope, and it is usually a tenth of the raw number.",
        ],
      },
      {
        type: "p",
        text: "Announce the deletion list with a two-week objection window. You will get objections for perhaps five percent of it, and those five percent were worth knowing about.",
      },
      {
        type: "h2",
        id: "sequence",
        text: "Sequence by owner, not by dashboard",
      },
      {
        type: "p",
        text: "Migrating dashboard-by-dashboard leaves every team half-moved for the whole project, which means everyone keeps both tools open and nobody adopts the new one. Migrate one team completely, then the next.",
      },
      {
        type: "h3",
        id: "the-parallel-period",
        text: "Run parallel, but put a date on it",
      },
      {
        type: "p",
        text: "Keep both tools live for a fixed period per team — two weeks is usually enough — with the explicit rule that the old tool is read-only. No new dashboards in the system you are leaving. Without that rule the migration never ends.",
      },
      {
        type: "h2",
        id: "reconciliation",
        text: "Reconcile the numbers deliberately",
      },
      {
        type: "p",
        text: "Numbers will differ. They almost always differ for a legitimate reason: the old dashboard had a filter someone added in 2023 and never documented. Budget time to find out why rather than time to force a match.",
      },
      {
        type: "ul",
        items: [
          "Compare the top twenty metrics side by side for the same date range.",
          "Investigate every difference above one percent; document the cause.",
          "Where the old number was wrong, say so publicly before someone else finds it.",
          "Where the new number is wrong, fix the definition, not the dashboard.",
        ],
      },
      {
        type: "h2",
        id: "timeline",
        text: "A realistic timeline",
      },
      {
        type: "p",
        text: "For a company with a few hundred dashboards and a working dbt project: one week of counting and pruning, one week to stand up the semantic layer for the core metrics, then two to three weeks per team in sequence. Eight to ten weeks end to end, most of it waiting on people rather than on tooling.",
      },
      {
        type: "p",
        text: "Teams that promise leadership a two-week migration are counting the technical work and forgetting that the hard part is convincing forty people to change where they look in the morning.",
      },
    ],
  },
];

export const getAllPosts = () =>
  [...posts].sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));

export const getPost = (slug: string) => posts.find((p) => p.slug === slug);

export const getRelatedPosts = (post: Post, limit = 2) =>
  getAllPosts()
    .filter((p) => p.slug !== post.slug)
    .sort((a, b) => {
      const overlap = (x: Post) =>
        x.tags.filter((t) => post.tags.includes(t)).length +
        (x.category === post.category ? 1 : 0);
      return overlap(b) - overlap(a);
    })
    .slice(0, limit);

export const categories = [...new Set(posts.map((p) => p.category))].sort();

export const formatDate = (iso: string) =>
  new Date(`${iso}T00:00:00Z`).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
