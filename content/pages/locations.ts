import type { LandingPage } from "@/types/content";

const bangalore = { city: "Bangalore", region: "Karnataka", country: "IN" };

export const locationPages: LandingPage[] = [
  // ---------------------------------------------------------------------------
  // React developer in Bangalore
  // ---------------------------------------------------------------------------
  {
    slug: "react-developer-bangalore",
    group: "location",
    navLabel: "React Developer, Bangalore",
    cardBlurb:
      "A Bangalore-based React developer for teams in India and abroad: IST-friendly reviews, in-person design workshops, and UIs built for Indian users.",
    icon: "map-pin",
    metaTitle: "React Developer in Bangalore for Startups and SaaS",
    metaDescription:
      "Hire a React developer in Bangalore. Frontend work built for Indian users and networks, INR formatting, Razorpay checkout, and review hours that suit IST.",
    eyebrow: "React · Bangalore, India",
    h1: "React developer in Bangalore for product teams in India and overseas",
    intro:
      "I'm Tripti, a React and TypeScript developer working from Bangalore. I build product interfaces for Indian startups and for overseas teams who want a frontend engineer in IST with real overlap for reviews.",
    summary: [
      "I'm a React and TypeScript developer in Bangalore building product interfaces for Indian startups and for overseas teams wanting a frontend engineer working in IST.",
      "For Indian users on mid-range Android phones and patchy mobile data, I keep JavaScript small, split routes, and test on throttled networks and a budget device.",
      "Razorpay checkout loads only when needed, orders are created on the server, and UPI payments get distinct pending, failed and verified states confirmed by server-side verification.",
      "Teams in or visiting Bangalore can book an in-person kickoff or component workshop at their office or a co-working space, followed by calls and async preview reviews.",
    ],
    highlights: [
      "Based in Bangalore, working in IST",
      "In-person design workshops on request",
      "UIs tuned for Indian devices and networks",
      "Direct contractor, no agency layer",
    ],
    diagram: {
      title: "How a React engagement runs from Bangalore",
      caption:
        "Kickoff can be in person in Bangalore or on a call. After that, work runs async with a fixed daily review window.",
      steps: [
        "Kickoff workshop",
        "Component inventory",
        "Build in branches",
        "Preview deploy",
        "Daily IST review",
        "Merge and ship",
      ],
    },
    sections: [
      {
        id: "frontend-for-indian-users",
        heading: "Building React interfaces for how Indian users actually browse",
        body: [
          "Many Indian users reach a product on a mid-range Android phone, often on mobile data that drops between towers. That changes frontend priorities. I keep initial JavaScript small, split routes so a dashboard doesn't ship chart libraries to the login screen, and make loading and retry states part of the design rather than an afterthought.",
          "I test on throttled connections and a real low-end device before calling a screen done. Skeletons, optimistic updates with rollback, and forms that keep their input after a failed request matter more here than animation polish. I also check that tap targets are large enough and that nothing important depends on hover.",
        ],
        points: [
          {
            title: "Route-level code splitting",
            text: "Heavy widgets load only on the screens that use them.",
          },
          {
            title: "Resilient forms",
            text: "Inputs survive network errors and retries instead of resetting.",
          },
          {
            title: "Image discipline",
            text: "Responsive sizes and modern formats so product photos don't eat data plans.",
          },
          {
            title: "Low-end device testing",
            text: "Interaction delays are checked on hardware, not only on a laptop.",
          },
        ],
      },
      {
        id: "inr-and-localisation",
        heading: "INR formatting, Indian number grouping and regional languages",
        body: [
          "Small details signal whether a product was built for India. Prices should read as lakh and crore groupings (1,50,000, not 150,000) when the audience expects it, which Intl.NumberFormat with the en-IN locale handles cleanly. Phone inputs need +91 defaults, PIN code fields need six-digit validation, and state dropdowns should list states and union territories correctly.",
          "If the product serves users beyond English speakers, I set up the component layer for translation from the start: string keys instead of hard-coded copy, layouts that tolerate longer Hindi or Kannada labels, and fonts that render Devanagari and Kannada script properly.",
        ],
      },
      {
        id: "razorpay-checkout-in-react",
        heading: "Payment UI with Razorpay and UPI flows",
        body: [
          "For Indian SaaS and e-commerce, the checkout often runs through Razorpay, with UPI, cards and netbanking in one modal. On the React side the work is loading the checkout script only when needed, creating the order on the server, handling the success callback, and never trusting the browser alone to mark a payment as complete.",
          "I build the pending, failed and verified states as distinct UI, because UPI payments can confirm a few seconds after the user returns to your app. The server verifies the signature or waits for the webhook, and the frontend polls or listens for that confirmation.",
        ],
        links: [
          { label: "SaaS development", href: "/saas-development" },
          { label: "Web application development", href: "/web-application-development" },
        ],
      },
      {
        id: "ist-review-rhythm",
        heading: "Working hours in IST and how review overlap works",
        body: [
          "IST is UTC+5:30, and it sits in a useful spot. For European clients, my afternoon lines up with their morning, so design feedback given at 10 a.m. in Berlin can be addressed the same day. For APAC teams in Singapore or Sydney, most of the working day overlaps.",
          "US teams get a different pattern. I keep a short early-evening IST window that meets the US East Coast morning for live calls, and the rest runs async: I push a preview deploy with notes before signing off, and your team reviews it during their day.",
        ],
        points: [
          {
            title: "Europe",
            text: "IST afternoons overlap with European mornings for same-day feedback.",
          },
          {
            title: "APAC",
            text: "Singapore and Australia share most of the working day.",
          },
          {
            title: "US",
            text: "A short live window plus async preview links and written handoffs.",
          },
        ],
      },
      {
        id: "in-person-workshops",
        heading: "Meeting in person in Bangalore for design and component workshops",
        body: [
          "If your team is in Bangalore, or visiting, I can meet for a kickoff or a half-day workshop at your office or a co-working space. I don't run an office of my own. In-person sessions work best for mapping screens on a whiteboard, agreeing on a component inventory, and walking through a Figma file with designers in the room.",
          "Given how long crossing the city can take, I usually suggest one focused in-person session at the start and calls after that. The workshop output is a written component plan, so nothing depends on memory of the meeting. Designers and engineers who joined remotely get the same document, with decisions and open questions listed separately.",
        ],
      },
      {
        id: "contractor-or-agency",
        heading: "Hiring a local React contractor versus a Bangalore agency",
        body: [
          "Bangalore has no shortage of agencies, and for a large build with design, QA and project management bundled together, an agency can be the right call. With me you get something narrower: the person writing the code is the person you talk to, and decisions about state, routing and component structure are explained directly rather than relayed through an account manager.",
          "The trade-off is capacity. One contractor can't staff five parallel workstreams. If your frontend needs one senior person who can own a codebase and leave it documented, that fits. If you need a team of six next month, an agency fits better.",
        ],
        links: [
          { label: "React developer (general)", href: "/react-developer" },
          { label: "Hire me", href: "/hire-me" },
        ],
      },
      {
        id: "handover",
        heading: "What your team keeps when the engagement ends",
        body: [
          "Every React project I hand over includes typed components, a short architecture note explaining where state lives and why, and tests around the flows that break most often, such as checkout, auth and form validation. If you plan to hire in-house engineers in Bangalore later, that documentation shortens their onboarding.",
        ],
      },
    ],
    stack: [
      { group: "Frontend", items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "shadcn/ui"] },
      { group: "State and data", items: ["Zustand", "React Query patterns", "REST", "GraphQL"] },
      { group: "Payments and India-specific", items: ["Razorpay Checkout", "UPI flows", "Intl en-IN formatting"] },
      { group: "Quality", items: ["Unit tests", "Integration tests", "GitHub Actions"] },
    ],
    projects: ["resume-analyzer", "chat-with-pdf", "ai-avatar"],
    related: [
      "react-developer",
      "web-application-development",
      "saas-development",
      "mvp-development",
      "nextjs-developer-bangalore",
    ],
    faqs: [
      {
        q: "Can we meet in person in Bangalore before starting?",
        a: "Yes. If your team is in Bangalore I can come to your office or meet at a co-working space for a kickoff or design workshop. I don't have an office of my own. Most clients do one in-person session at the start, then switch to calls and async updates, which saves everyone a long commute across the city.",
      },
      {
        q: "What hours do you work for US-based teams?",
        a: "I keep a short early-evening IST window that overlaps with the US East Coast morning for live calls and standups. Outside that window, work is async: you get a preview deploy and written notes at the end of my day, review them during yours, and I pick up your comments the next morning IST. West Coast overlap is thinner, so async matters more there.",
      },
      {
        q: "Do you invoice Indian companies in INR with GST?",
        a: "For Indian clients, invoicing is in INR with GST applied as required, and your finance team gets the details they need for input credit. International clients are invoiced in their agreed currency. The exact treatment depends on your entity and location, so I confirm it before the first invoice rather than guessing.",
      },
      {
        q: "Can you integrate Razorpay into our React app?",
        a: "Yes. I load the Razorpay checkout on demand, create orders on your server, and verify payments on the server using the signature or webhook rather than trusting the browser callback. The React side gets clear pending, failed and confirmed states, which matters for UPI payments that sometimes confirm a few seconds after the user returns.",
      },
      {
        q: "Why hire a Bangalore contractor instead of a local agency?",
        a: "You talk directly to the engineer who writes the code, so decisions and trade-offs aren't filtered through a project manager. That suits a startup that needs one senior frontend owner. If you need design, QA and several developers at once, an agency is the better fit, and I'll say so if that's what your project needs.",
      },
      {
        q: "Will the UI work well on low-end Android phones?",
        a: "That's one of the first things I check. I keep JavaScript bundles lean, split heavy components by route, size images responsively and test on throttled networks and a real budget device. Forms keep their input through network failures, and loading states are designed deliberately, since many Indian users browse on patchy mobile data.",
      },
    ],
    serviceType: "React development",
    location: bangalore,
  },

  // ---------------------------------------------------------------------------
  // Next.js developer in Bangalore
  // ---------------------------------------------------------------------------
  {
    slug: "nextjs-developer-bangalore",
    group: "location",
    navLabel: "Next.js Developer, Bangalore",
    cardBlurb:
      "Next.js apps built from Bangalore, with hosting regions picked for Indian users, DPDP-aware data handling, and IST overlap for global teams.",
    icon: "map-pin",
    metaTitle: "Next.js Developer in Bangalore | App Router Builds",
    metaDescription:
      "Next.js developer in Bangalore building App Router apps with Mumbai-region hosting for Indian users, careful data residency choices, and clear IST overlap.",
    eyebrow: "Next.js · Bangalore, India",
    h1: "Next.js developer in Bangalore, building for Indian and global audiences",
    intro:
      "I build Next.js App Router applications from Bangalore. For products with Indian users, that means deciding early where servers, databases and functions run, because a render that waits on a database in Virginia feels slow in Chennai.",
    summary: [
      "When most users are in India, I run Next.js functions in the Mumbai region and place the database in AWS ap-south-1 so server renders stay local.",
      "If paying customers are mainly overseas, the primary database follows them, with read replicas, caching or the CDN serving Indian traffic, decided in the first week.",
      "For DPDP Act needs, I build the technical pieces your counsel specifies, such as Indian-region storage, timestamped consent records and deletion across every system.",
      "Every pull request gets a preview deploy, and I post the link with notes at the end of my IST day so UK, European or US teams can review.",
    ],
    highlights: [
      "App Router and server components",
      "Mumbai-region hosting when users are in India",
      "Kickoffs in person around Bangalore",
      "Async handoffs across time zones",
    ],
    diagram: {
      title: "Where a request goes for an Indian user",
      caption:
        "Keeping the rendering function and the database in the same Indian region avoids long round trips on every server render.",
      steps: [
        "User in India",
        "CDN edge cache",
        "Function in Mumbai",
        "Database in ap-south-1",
        "Streamed HTML",
      ],
    },
    sections: [
      {
        id: "region-choice",
        heading: "Picking hosting regions when most of your users are in India",
        body: [
          "The biggest performance decision in a Next.js app for Indian users is often not a code change. It's where the server-rendered routes execute and where the database sits. Static pages cached at a CDN edge are fast anywhere, but any dynamic route that queries a database pays for every round trip between the function and the data.",
          "If your users are mostly in India, I run functions in Mumbai and place the database in AWS ap-south-1 alongside them. Vercel offers a Mumbai function region, and self-hosted setups on ECS can run in the same AWS region. The failure pattern I avoid is a function near users calling a database on another continent.",
        ],
        points: [
          {
            title: "Co-locate compute and data",
            text: "Functions and database in the same region, so each query stays local.",
          },
          {
            title: "Cache what you can",
            text: "Marketing pages and public content served from the edge.",
          },
          {
            title: "Stream the rest",
            text: "Suspense boundaries send the page shell while slower data loads.",
          },
          {
            title: "Measure from India",
            text: "Timing checks run from Indian locations, not only from a US laptop.",
          },
        ],
      },
      {
        id: "global-audience-split",
        heading: "When the audience is split between India and overseas",
        body: [
          "Plenty of Bangalore startups sell to US or European customers while the team sits in India. In that case, the database region should follow the paying customers, not the office. I'll often put the primary database near the main market, use read replicas or caching for other regions, and keep anything that doesn't need fresh data on the CDN.",
          "This is a decision to make in week one, because moving a production database across regions later means downtime planning and migration scripts. I write the reasoning into the project docs so the next engineer understands why it was chosen.",
        ],
      },
      {
        id: "dpdp-and-data-location",
        heading: "Data residency and India's DPDP Act in a Next.js architecture",
        body: [
          "India's Digital Personal Data Protection Act sets out obligations around consent, notice and how personal data is handled, and some sectors, such as finance, have their own rules from regulators. I'm not a lawyer and don't give legal advice, but I can build the technical pieces your counsel asks for.",
          "In practice that means knowing exactly which services store personal data, keeping those in an Indian region if required, logging consent with timestamps, and making deletion requests actually delete rows across the database, file storage and third-party tools. Server components help here, since sensitive data can stay on the server instead of being serialized to the browser.",
        ],
        links: [
          { label: "Web application development", href: "/web-application-development" },
          { label: "API development", href: "/api-development" },
        ],
      },
      {
        id: "overlap-and-deploy-previews",
        heading: "Preview deploys as the handoff between IST and your time zone",
        body: [
          "Next.js pairs well with preview deployments, and I use them as the main communication tool with distributed clients. Every pull request gets its own URL. At the end of my day in Bangalore I post the link with a short note on what changed and what needs a decision, so a team in London or New York can review during their hours.",
          "European teams usually get same-day turnaround because their morning overlaps with my afternoon. US teams get a short live window in my evening plus async threads. Teams in Singapore or Australia can work almost in real time. Decisions made in comment threads are copied into the pull request description, so the reasoning stays with the code.",
        ],
      },
      {
        id: "kickoff-in-bangalore",
        heading: "Architecture kickoffs in person, then remote delivery",
        body: [
          "For teams based in or visiting Bangalore, I'm happy to run the architecture kickoff face to face, at your office or a co-working space. I don't operate an office. A whiteboard session works well for deciding the route map, which pages are static, which are dynamic, where auth checks live, and how the data model looks.",
          "After the kickoff, delivery is remote, with a written architecture decision record from that session so everyone works from the same plan. If a decision later turns out wrong, the record makes it easy to see what assumption changed and to revise it without reopening every other choice from that day.",
        ],
        points: [
          {
            title: "Route map",
            text: "Which routes are static, cached, dynamic or streamed.",
          },
          {
            title: "Auth boundaries",
            text: "Where sessions are checked: middleware, layouts or server actions.",
          },
          {
            title: "Data ownership",
            text: "Which service owns which table, and which region hosts it.",
          },
        ],
      },
      {
        id: "startup-ecosystem-fit",
        heading: "Working with Bangalore startups at different stages",
        body: [
          "Bangalore is one of India's largest startup hubs, with early-stage founders, venture-backed scale-ups and global capability centres of multinational companies all in one city. The Next.js work differs by stage. A pre-seed founder usually needs a working product and a landing page that ranks, while a scale-up needs an App Router migration that doesn't break existing routes or SEO.",
          "I ask about stage and runway early, because it decides whether we build a quick monolith on Vercel or a containerised setup on AWS that the company's platform team can own. It also decides how much I invest in test coverage and infrastructure versus getting a first version in front of users quickly.",
        ],
        links: [
          { label: "Next.js developer (general)", href: "/nextjs-developer" },
          { label: "MVP development", href: "/mvp-development" },
          { label: "Hire me", href: "/hire-me" },
        ],
      },
      {
        id: "billing",
        heading: "Contracts and invoicing for Indian and international clients",
        body: [
          "Indian companies are invoiced in INR with GST as applicable, which keeps things simple for your accounts team. Overseas clients are invoiced in their agreed currency under an international services arrangement. Either way, the contract names deliverables, the repository you own, and how scope changes are handled, so there are no surprises at the end of a milestone.",
        ],
      },
    ],
    stack: [
      { group: "Framework", items: ["Next.js App Router", "React Server Components", "TypeScript"] },
      { group: "Hosting", items: ["Vercel (Mumbai functions)", "AWS ECS", "AWS S3", "CloudFront"] },
      { group: "Data", items: ["PostgreSQL", "Prisma", "Redis", "MongoDB"] },
      { group: "Delivery", items: ["Preview deploys", "GitHub Actions", "Docker"] },
    ],
    projects: ["vercel-clone", "blog-automation", "resume-analyzer"],
    related: [
      "nextjs-developer",
      "saas-development",
      "web-application-development",
      "mvp-development",
      "full-stack-developer-bangalore",
    ],
    faqs: [
      {
        q: "Should an Indian startup host its Next.js app in Mumbai?",
        a: "If most of your users are in India, usually yes, at least for dynamic routes and the database. Running functions in Mumbai and the database in AWS ap-south-1 keeps each server render's data calls short. If your paying customers are mainly in the US or Europe, the database should sit closer to them instead, with caching for Indian traffic.",
      },
      {
        q: "Can you help us meet DPDP Act requirements?",
        a: "I can build the technical side: storing personal data in an Indian region where required, recording consent, keeping sensitive fields on the server, and making deletion work across every system that holds user data. What the law requires for your business is a question for your legal counsel, and I'll implement against their guidance rather than giving legal opinions.",
      },
      {
        q: "Do you do in-person kickoffs in Bangalore?",
        a: "Yes, for teams in the city or visiting it. I come to your office or we book a co-working space. I don't run an office. A half-day kickoff covers the route map, auth boundaries and data model, and I write it up as a decision record the same week. Delivery after that is remote.",
      },
      {
        q: "How do you work with a team in the US or UK from Bangalore?",
        a: "Every pull request gets a preview deploy, and at the end of my IST day I post the link with notes on what changed and what needs a decision. UK and European teams usually reply the same day because our hours overlap. US teams get a short live window in my evening and async threads for the rest.",
      },
      {
        q: "Can you migrate our Pages Router app to the App Router?",
        a: "Yes. For Bangalore scale-ups with an older Next.js codebase, I plan the migration route by route so both routers run side by side, keep URLs and metadata stable for SEO, and move data fetching into server components gradually. Nothing needs to be rewritten in one release.",
      },
    ],
    serviceType: "Next.js development",
    location: bangalore,
  },

  // ---------------------------------------------------------------------------
  // Full stack developer in Bangalore
  // ---------------------------------------------------------------------------
  {
    slug: "full-stack-developer-bangalore",
    group: "location",
    navLabel: "Full Stack Developer, Bangalore",
    cardBlurb:
      "End-to-end SaaS from Bangalore: Razorpay subscriptions, GST-ready invoicing flows, ap-south-1 infrastructure, and one engineer owning the whole stack.",
    icon: "map-pin",
    metaTitle: "Full Stack Developer in Bangalore for SaaS Products",
    metaDescription:
      "Full stack developer in Bangalore building SaaS for Indian and global markets: Razorpay billing, GST-aware invoices, AWS Mumbai hosting and IST-friendly hours.",
    eyebrow: "Full stack · Bangalore, India",
    h1: "Full stack developer in Bangalore for SaaS built for the Indian market",
    intro:
      "I build complete products from Bangalore: database, API, frontend, payments and deployment. For Indian SaaS, that includes the parts generic tutorials skip, such as Razorpay subscriptions, GST details on invoices and hosting in AWS Mumbai.",
    summary: [
      "I build complete Indian SaaS products from Bangalore, covering database, API, frontend, payments and deployment, including Razorpay subscriptions, GST invoice details and AWS Mumbai hosting.",
      "Razorpay subscription states are modelled explicitly in the database, and access changes only from verified, idempotent webhooks, backed by a scheduled reconciliation job.",
      "The invoicing module captures a validated GSTIN, uses the billing state for tax split, numbers invoices sequentially and stores frozen copies, with rules supplied by your CA.",
      "A typical Indian setup runs ECS containers, RDS PostgreSQL, Redis and S3 together in ap-south-1, with GitHub Actions building images and pushing them to ECR.",
    ],
    highlights: [
      "Razorpay subscriptions and webhooks",
      "GST-aware invoicing flows",
      "AWS ap-south-1 infrastructure",
      "One engineer across the stack",
    ],
    diagram: {
      title: "Subscription billing flow for an Indian SaaS",
      caption:
        "Payment state is decided by verified webhooks on the server, never by the browser redirect alone.",
      steps: [
        "Plan selected",
        "Razorpay subscription",
        "Mandate authorised",
        "Webhook verified",
        "Access granted",
        "GST invoice issued",
      ],
    },
    sections: [
      {
        id: "indian-saas-billing",
        heading: "Subscription billing with Razorpay for Indian customers",
        body: [
          "Recurring billing in India works differently from a Stripe-in-the-US setup. RBI rules on recurring payments mean card and UPI subscriptions go through a mandate the customer authorises, with notifications before debits. Razorpay handles much of that, but your backend still has to model subscription states properly: created, authenticated, active, halted, cancelled.",
          "I build the billing service around verified webhooks. The redirect back from checkout only shows a waiting screen, and access changes when the server receives and validates the event. Webhook handlers are idempotent, because Razorpay may deliver the same event more than once.",
        ],
        points: [
          {
            title: "Idempotent webhooks",
            text: "Each event is stored by ID and processed once, even if delivered twice.",
          },
          {
            title: "Explicit subscription states",
            text: "The database mirrors the gateway's lifecycle instead of a single paid flag.",
          },
          {
            title: "Failed payment handling",
            text: "Grace periods, retry messaging and a clear downgrade path.",
          },
          {
            title: "Reconciliation job",
            text: "A scheduled check compares local records with the gateway.",
          },
        ],
      },
      {
        id: "gst-in-the-product",
        heading: "GST details inside the product your customers use",
        body: [
          "B2B customers in India often need a GST invoice before their finance team will approve a renewal. That affects the product, not just your accounting. The signup or billing page needs an optional GSTIN field with format validation, the billing address state matters for how tax is split, and invoice numbers must follow a consistent sequence.",
          "I build invoice generation as its own module that stores a frozen copy of each invoice, so later changes to a customer's address don't rewrite history. Tax rules themselves should be confirmed with your CA; my job is making the system record what they specify, reliably.",
        ],
        links: [
          { label: "SaaS development", href: "/saas-development" },
          { label: "API development", href: "/api-development" },
        ],
      },
      {
        id: "domestic-and-international",
        heading: "Selling to Indian and international customers from one codebase",
        body: [
          "Many Bangalore SaaS companies sell domestically in INR and abroad in USD or EUR. That usually means two payment paths, prices stored per currency rather than converted on the fly, and invoices that look different for export customers. I design the data model with currency as a first-class field from day one, since retrofitting it later touches every billing table.",
          "For my own work, the split is similar: Indian clients get INR invoices with GST applied as required, and overseas clients are invoiced internationally in the agreed currency. The contract and deliverables are identical in both cases; only the billing paperwork differs, and I settle which applies before the first milestone.",
        ],
      },
      {
        id: "aws-mumbai",
        heading: "Infrastructure in AWS Mumbai for Indian users",
        body: [
          "For a product whose users are mostly in India, I put the API, database and file storage in AWS ap-south-1 (Mumbai). Round trips from Indian cities to Mumbai are much shorter than to Singapore or US regions, and that adds up fast in an API that makes several queries per request.",
          "A typical setup is containers on ECS behind a load balancer, PostgreSQL on managed RDS, Redis for sessions and queues, and S3 for uploads, all in the same region. GitHub Actions builds images and pushes to ECR, so a merge to main ends with a tested deploy.",
        ],
        points: [
          {
            title: "Compute",
            text: "Dockerised services on ECS in ap-south-1.",
          },
          {
            title: "Data",
            text: "PostgreSQL and Redis in the same region as the API.",
          },
          {
            title: "Storage",
            text: "S3 buckets in Mumbai for user uploads and generated invoices.",
          },
        ],
      },
      {
        id: "personal-data",
        heading: "Personal data, the DPDP Act and what the backend has to support",
        body: [
          "India's Digital Personal Data Protection Act puts obligations on businesses that process personal data, including consent and handling user requests about their data. The legal reading belongs with your counsel, and I don't offer legal advice. What I can do is build a backend that makes compliance practical: a clear inventory of where personal data lives, consent records, and account deletion that reaches the database, S3, email tools and analytics.",
        ],
      },
      {
        id: "one-engineer-vs-agency",
        heading: "One full stack contractor or a Bangalore agency",
        body: [
          "An agency splits a SaaS build across a frontend developer, a backend developer, a DevOps person and a project manager. That brings capacity, and it also brings handoffs, where bugs tend to hide between the API contract and the UI that consumes it. When one person owns both sides, the contract gets designed once and changed deliberately.",
          "The limit is throughput. I suit founders who want a working product owned end to end by one engineer, with docs good enough that the in-house team you hire later can take over without me. If the product outgrows one engineer, I help define the roles you should hire next and write the onboarding notes for them.",
        ],
        links: [
          { label: "Full stack developer (general)", href: "/full-stack-developer" },
          { label: "MVP development", href: "/mvp-development" },
          { label: "Hire me", href: "/hire-me" },
        ],
      },
      {
        id: "time-zones-and-meetings",
        heading: "IST hours, remote delivery and meeting in Bangalore",
        body: [
          "I work in IST. European clients overlap with my afternoon, APAC clients with most of my day, and US clients with a short evening window plus written async updates. Founders in Bangalore can meet me in person for kickoffs and milestone demos at their office or a co-working space; I don't run an office, and the day-to-day work is remote.",
        ],
      },
    ],
    stack: [
      { group: "Frontend", items: ["Next.js", "React", "TypeScript", "Tailwind CSS"] },
      { group: "Backend", items: ["Node.js", "Express", "FastAPI", "REST", "JWT auth"] },
      { group: "Payments and billing", items: ["Razorpay Subscriptions", "Webhooks", "Invoice generation"] },
      { group: "Data", items: ["PostgreSQL", "Prisma", "Redis", "MongoDB"] },
      { group: "AWS Mumbai", items: ["ECS", "ECR", "S3", "Lambda", "GitHub Actions"] },
    ],
    projects: ["vercel-clone", "chat-with-pdf", "blog-automation"],
    related: [
      "full-stack-developer",
      "saas-development",
      "mvp-development",
      "api-development",
      "nextjs-developer-bangalore",
    ],
    faqs: [
      {
        q: "Can you build Razorpay subscription billing for our SaaS?",
        a: "Yes. I model the full subscription lifecycle in your database, handle mandate authorisation through Razorpay, and grant or revoke access only from verified, idempotent webhooks. I also add a reconciliation job that compares local records with Razorpay, so a missed webhook doesn't leave a paying customer locked out or a cancelled one still active.",
      },
      {
        q: "Can the product generate GST invoices for our B2B customers?",
        a: "I can build the invoicing module: GSTIN capture with validation, billing state for tax split, sequential invoice numbers and stored PDF copies that don't change after issue. The tax rates and rules it applies should come from your chartered accountant. I make sure the system records exactly what they specify.",
      },
      {
        q: "Which AWS region should an Indian SaaS use?",
        a: "If most users are in India, ap-south-1 in Mumbai is the usual choice for the API, database and storage, because round trips from Indian cities are much shorter than to Singapore or the US. If you also serve overseas customers, we can add CDN caching or regional replicas instead of moving everything.",
      },
      {
        q: "How do you invoice clients inside and outside India?",
        a: "Indian clients receive INR invoices with GST applied as required. International clients are invoiced in their agreed currency as an export of services. The deliverables and contract terms are the same either way. I confirm the arrangement before the first milestone so your finance team knows what to expect, and each invoice references the milestone it covers.",
      },
      {
        q: "Can we meet in Bangalore during the project?",
        a: "Yes. Founders in Bangalore often want an in-person kickoff and a face-to-face demo at major milestones, and I'm happy to come to your office or a co-working space. I don't have an office. Between those meetings, work runs remotely with daily written updates and preview deploys.",
      },
      {
        q: "Why one full stack developer rather than an agency team?",
        a: "Fewer handoffs. When the same person designs the database, the API and the UI, the contract between them is decided once and changed on purpose. That suits an MVP or an early SaaS. If you need several people working in parallel from the start, an agency is the better choice.",
      },
    ],
    serviceType: "Full stack development",
    location: bangalore,
  },

  // ---------------------------------------------------------------------------
  // AI developer in Bangalore
  // ---------------------------------------------------------------------------
  {
    slug: "ai-developer-bangalore",
    group: "location",
    navLabel: "AI Developer, Bangalore",
    cardBlurb:
      "LLM, RAG and AI agent work from Bangalore, with care for where Indian user data goes, Indic-language inputs, and discovery workshops in person.",
    icon: "map-pin",
    metaTitle: "AI Developer in Bangalore | LLM, RAG and AI Agents",
    metaDescription:
      "AI developer in Bangalore building LLM features, RAG and agents for Indian and global teams, with careful handling of user data and Indic-language inputs.",
    eyebrow: "AI engineering · Bangalore, India",
    h1: "AI developer in Bangalore for LLM products, RAG and automation",
    intro:
      "I build AI features into real products from Bangalore: retrieval systems, LLM-powered workflows and agents. For Indian companies, two questions come up early: where user data travels when it hits a model API, and how the system copes with mixed-language input.",
    summary: [
      "Before any model call, I map which fields reach which provider and redact names, phone numbers and IDs the task does not need, giving your counsel clear facts.",
      "Source files, chunks, embeddings and a self-hosted Qdrant instance can all run in AWS ap-south-1 in Mumbai, while only retrieved passages go to the model.",
      "For Hinglish, Devanagari and mixed-script input, I compare embedding models and LLMs against an evaluation set built from your anonymised real queries before choosing.",
      "Because model APIs bill in dollars while many products charge in rupees, I cache answers, route simple tasks to smaller models and set per-customer usage limits.",
    ],
    highlights: [
      "RAG, agents and LLM integrations",
      "Data flow mapped before any model call",
      "Hinglish and Indic-language inputs",
      "Use-case workshops in Bangalore",
    ],
    diagram: {
      title: "Keeping personal data in check in an LLM pipeline",
      caption:
        "Personal fields are identified and minimised before anything is sent to an external model provider.",
      steps: [
        "User input",
        "Detect personal data",
        "Redact or tokenise",
        "Retrieve from India",
        "Call LLM",
        "Restore and respond",
      ],
    },
    sections: [
      {
        id: "where-data-goes",
        heading: "Where Indian user data goes when you call an LLM",
        body: [
          "Most hosted model APIs process requests outside India. For a product that sends customer messages, documents or health details to a model, that's a data transfer question, not just an engineering one. India's DPDP Act covers how personal data is processed and transferred, and regulated sectors can have stricter expectations. I don't give legal advice, but I design the pipeline so your counsel has clear facts to assess.",
          "That means mapping each field that reaches the model, stripping or tokenising personal identifiers where the task doesn't need them, and choosing provider settings that limit retention where available. The data flow map becomes a living document, updated whenever a new feature starts sending something new to a model.",
        ],
        points: [
          {
            title: "Data flow map",
            text: "A written list of which fields reach which provider, and why.",
          },
          {
            title: "Redaction before prompts",
            text: "Names, phone numbers and IDs replaced with placeholders when not needed.",
          },
          {
            title: "Retention settings",
            text: "Provider options for limited logging chosen and documented.",
          },
          {
            title: "Consent in the product",
            text: "Users told plainly when AI processes their content.",
          },
        ],
      },
      {
        id: "retrieval-in-mumbai",
        heading: "Keeping the knowledge base in India with ap-south-1",
        body: [
          "In a RAG system, the model call is only one part. The documents, chunks and embeddings usually matter more for residency, because they're stored permanently. I can run the vector database, such as a self-hosted Qdrant instance, along with the source files and the application database in AWS ap-south-1 in Mumbai.",
          "That also helps latency. Retrieval happens several times per question in some designs, and keeping the vector search close to the API and to Indian users keeps the wait before the first streamed token short, even when the model provider itself is far away.",
        ],
        links: [
          { label: "RAG application development", href: "/rag-application-development" },
          { label: "Chat with PDF case study", href: "/projects/chat-with-pdf" },
        ],
      },
      {
        id: "indic-and-mixed-language",
        heading: "Handling Hinglish, Kannada and mixed-script input",
        body: [
          "Indian users rarely type in one clean language. A support chatbot will see Hinglish in Latin script, Hindi in Devanagari, English with regional terms, and messages that switch halfway through. That affects the whole pipeline: embedding models vary in how well they handle Indic scripts, keyword search needs transliteration awareness, and the model must answer in the language the user chose.",
          "I build an evaluation set from real, anonymised queries in the languages your users write in, and compare embedding and model options against it before committing. The result is a choice based on your data, not a benchmark from another market.",
        ],
      },
      {
        id: "discovery-workshops",
        heading: "AI use-case workshops in person in Bangalore",
        body: [
          "AI projects fail most often at the scoping stage, when the team picks a use case that the available data can't support. For companies in Bangalore, I run a discovery session at your office or a co-working space; I don't keep an office myself. We look at actual documents, tickets or workflows and sort ideas into ones that suit retrieval, ones that suit an agent with tools, and ones better solved without an LLM.",
          "The output is a short written plan with a first build scoped tightly enough to test with real users within a few weeks. It also lists what data we'd need, who owns it internally, and the questions to answer before building anything larger.",
        ],
        points: [
          {
            title: "Bring real samples",
            text: "Documents, chats or tickets tell us more than a slide deck.",
          },
          {
            title: "Sort by pattern",
            text: "RAG, agent, extraction pipeline, or plain code.",
          },
          {
            title: "Pick one first build",
            text: "Narrow enough to evaluate honestly.",
          },
        ],
      },
      {
        id: "cost-in-inr",
        heading: "Budgeting model costs when revenue is in rupees",
        body: [
          "Model APIs bill in US dollars per token, while many Indian SaaS products charge customers in INR at price points lower than US equivalents. That gap makes cost control a design requirement. I cache repeated answers, route simple tasks to smaller models, cap context sizes, and log token use per feature so you can see which parts of the product are expensive.",
          "OpenRouter can help compare providers under one API, which makes switching models a configuration change instead of a rewrite when prices or quality shift. I also set per-customer usage limits so a single heavy account on a low-priced plan can't consume your whole monthly model budget.",
        ],
      },
      {
        id: "ecosystem-and-hours",
        heading: "Bangalore's AI scene, IST hours and remote collaboration",
        body: [
          "Bangalore has a large concentration of startups and engineering teams, and a growing number of them are adding AI features to existing products rather than building AI-only companies. Much of my work fits that pattern: an established app that needs a grounded assistant, a document extraction pipeline, or an automation that saves an operations team manual effort.",
          "I work in IST, which overlaps with European mornings and most of the APAC day. US teams get a short evening window and async updates with evaluation results attached, so a reviewer in New York can see exactly how answer quality changed since their last check without waiting for a call.",
        ],
        links: [
          { label: "AI developer (general)", href: "/ai-developer" },
          { label: "AI agent development", href: "/ai-agent-development" },
          { label: "Hire me", href: "/hire-me" },
        ],
      },
      {
        id: "contractor-for-ai",
        heading: "A direct AI contractor instead of an AI agency",
        body: [
          "Many agencies now offer AI services, and some do good work. With me, the person you discuss prompts, retrieval quality and failure cases with is the one writing the evaluation scripts and the code. That matters in AI work, where most of the effort is in iterating on bad answers and edge cases, and details lost in handoffs show up as wrong outputs in production.",
        ],
      },
    ],
    stack: [
      { group: "Models", items: ["OpenAI", "Gemini", "OpenRouter"] },
      { group: "Retrieval", items: ["LangChain", "Embeddings", "Qdrant", "PostgreSQL"] },
      { group: "Application", items: ["Next.js", "Node.js", "FastAPI", "Python"] },
      { group: "Infrastructure", items: ["AWS ap-south-1", "Docker", "ECS", "S3", "Redis"] },
    ],
    projects: ["ai-avatar", "chat-with-pdf", "blog-automation"],
    related: [
      "ai-developer",
      "rag-application-development",
      "ai-chatbot-development",
      "ai-agent-development",
      "automation-development",
    ],
    faqs: [
      {
        q: "Is it allowed to send Indian users' data to OpenAI or Gemini?",
        a: "That depends on your sector, your contracts and how India's DPDP Act applies to your processing, so it's a question for your legal counsel. My part is giving them accurate facts: which fields go to which provider, what gets redacted first, and what retention settings are in use. I'll also build redaction so less personal data leaves your systems.",
      },
      {
        q: "Can the RAG system store documents only in India?",
        a: "Yes. The source files, chunks, embeddings and application database can all run in AWS ap-south-1 in Mumbai, with a self-hosted vector database such as Qdrant. The model call may still go to a provider abroad, so I combine India-hosted storage with sending only the retrieved passages the answer needs.",
      },
      {
        q: "Will the chatbot understand Hinglish and regional languages?",
        a: "It can, but it has to be tested rather than assumed. I build an evaluation set from anonymised real queries in the languages and scripts your users write in, including mixed Hindi and English, then compare embedding models and LLMs against it. The chosen setup is the one that performs on your users' actual messages.",
      },
      {
        q: "Can we do an AI discovery workshop in person in Bangalore?",
        a: "Yes. I can run a half-day session at your office or a co-working space in Bangalore. I don't have an office. Bring real documents, tickets or workflow examples, and we'll sort ideas into retrieval, agent, extraction or non-AI solutions, then scope one first build to test with users.",
      },
      {
        q: "How do you keep LLM costs manageable for an INR-priced product?",
        a: "By treating cost as a design constraint from the start. I log token usage per feature, cache repeated answers, route simple tasks to cheaper models, trim context, and keep model choice configurable through a layer like OpenRouter. You see which features cost the most and can make pricing decisions with real numbers.",
      },
    ],
    serviceType: "AI development",
    location: bangalore,
  },
];
