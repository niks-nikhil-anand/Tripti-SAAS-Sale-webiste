---
title: Building a SaaS with Next.js – Architecture and Trade-offs
description: How to build a SaaS with Next.js, covering tenancy, auth, billing webhooks, background jobs, plan limits and when to split work out of the Next.js app.
category: saas
tags: [saas, nextjs, architecture, multi-tenancy, billing]
publishedAt: 2026-09-24
services: [saas-development, nextjs-developer]
projects: [vercel-clone]
related: [ai-saas-architecture, dockerizing-nextjs, nextjs-app-router-architecture]
featured: false
---

Building a SaaS with Next.js works well when you treat Next.js as the web layer of the product, not the whole product. It is excellent at the marketing site, the authenticated dashboard, forms and mutations through Server Actions, and webhooks through Route Handlers. It is the wrong place for long-running jobs, heavy queues and anything that must keep running after a response is sent. The architecture that holds up is a Next.js app, a relational database with tenant-scoped access, a billing provider driven by webhooks, and a separate worker for slow work.

## The pieces every SaaS needs

Before choosing libraries, it is worth naming the parts, because most SaaS products need the same ones regardless of what they sell:

- A public marketing site that loads fast and ranks, with pricing and documentation pages.
- Authentication, including sign-up, sign-in, password reset or passwordless login, and optionally OAuth or SSO.
- Organisations or workspaces, members, roles and invitations.
- Billing: plans, checkout, subscription status, invoices and a customer portal.
- The product itself, with plan limits and feature flags enforced on the server.
- Background processing for anything slow: imports, exports, emails, AI calls, builds.
- Audit logs, basic analytics and error monitoring.

Next.js covers the first, second and fifth well. It participates in the others but should not own their execution.

## One app, two route groups

I build the marketing site and the product in the same Next.js app, separated by route groups such as `(marketing)` and `(app)`. They get different layouts, and the product layout checks the session once and provides the workspace context to everything below it. Marketing pages are prerendered and cached. Product pages read the session and stream user-specific data behind `Suspense` boundaries.

Keeping them together means one deploy, one design system and shared types. Splitting them into two apps makes sense later if the marketing team needs to ship on its own schedule or through a CMS with its own preview flow.
## Multi-tenancy is a data problem first

The decision with the longest consequences in a SaaS is how tenants are separated. There are three common models:

1. Shared database, shared tables, with a `workspaceId` column on every tenant-owned row. Simplest to run and the right default for most products.
2. Shared database, separate schema per tenant. Easier per-tenant backup and export, but migrations have to run once per schema.
3. Separate database per tenant. Strong isolation, often driven by enterprise or compliance requirements, at a much higher operational cost.

With the shared-table model, the risk is a query that forgets the tenant filter. I remove that risk structurally by never letting pages or actions query tenant data directly. Every read and write goes through a data layer that takes the workspace from the verified session, not from the URL or the request body.

```ts
// lib/data/projects.ts
import "server-only";
import { db } from "@/lib/db";
import { requireMembership } from "@/lib/auth";

export async function listProjects(workspaceSlug: string) {
  // Throws if the user is not a member; returns their role otherwise
  const { workspaceId } = await requireMembership(workspaceSlug);
  return db.project.findMany({
    where: { workspaceId },
    orderBy: { updatedAt: "desc" },
    select: { id: true, name: true, status: true, updatedAt: true },
  });
}
```

The slug in the URL is only used to look up the membership. The query always filters by the `workspaceId` that came back from that check. If PostgreSQL row-level security fits your stack, it is a good second layer, but I would still keep the application-level check so a missing policy does not become a data leak.

## Authentication and authorization

Use an established auth library or provider rather than rolling your own session handling. The interesting work is authorization: who can do what inside a workspace. A small, explicit role model (owner, admin, member, maybe viewer) with a single `can(user, action, resource)` function covers most products for a long time.

Enforce it in three places, in decreasing order of importance: in the data layer and Server Actions, where it actually protects data; in Server Components, to hide UI the user cannot use; and in `proxy.ts`, only as a fast redirect for signed-out users. Server Actions are reachable by direct POST requests, so each one needs its own check, even if the button that calls it is hidden.

## Billing through webhooks

Checkout is the easy part of billing. The part that decides whether your SaaS is correct is keeping your database in sync with the billing provider. Treat the provider's webhooks as the source of truth for subscription state, and never grant access based on a redirect back from checkout alone, because users can close the tab before the redirect happens.

```ts
// app/api/webhooks/stripe/route.ts
import Stripe from "stripe";
import { syncSubscription } from "@/lib/billing";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: Request) {
  const body = await req.text(); // raw body is required for signature checks
  const signature = req.headers.get("stripe-signature");
  if (!signature) return new Response("Missing signature", { status: 400 });

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch {
    return new Response("Invalid signature", { status: 400 });
  }

  // Idempotent: safe to run twice for the same event
  await syncSubscription(event);
  return new Response(null, { status: 200 });
}
```

Make the handler idempotent, because providers retry. Store processed event IDs, or write the sync so that applying the same event twice produces the same state. Keep plan limits in your own database or config, keyed by plan, and check them on the server in the action that creates the resource. A limit enforced only by a disabled button is not a limit.

## Background jobs belong outside the request

Anything that can take more than a few seconds should not run inside a Server Action or Route Handler. Imports, report generation, AI pipelines, email batches and builds all belong in a queue processed by a worker. The Next.js side enqueues the job, returns immediately, and the UI shows progress by polling or subscribing to updates.

Next.js does have `after()`, which runs code after the response is sent. It is useful for small follow-ups such as logging or analytics, but it is not a job system: there is no retry, no queue and no visibility if the process restarts. For real jobs, use something with persistence, such as a Redis-backed queue, a managed queue like SQS, or a Postgres-based job table, with a worker process deployed separately from the web app.

## Lessons from the Vercel clone

The [Vercel clone case study](/projects/vercel-clone) is the clearest example I have of this split. Users connected a GitHub repository through OAuth, and each push triggered a build. The Next.js app handled the dashboard, team access, project settings and the webhook that received the push. The builds themselves ran in isolated Docker containers pulled from a queue, so a slow build never blocked the web app, and builds for one team could not starve another. Build logs were streamed from the worker back to the browser while the build ran, and each successful deploy got a generated subdomain, with preview deploys for branches.

What that project reinforced is that the web app should always be able to answer quickly, even when the product is doing heavy work. If a request handler is waiting on something that takes minutes, the architecture needs a queue. For how I package those containers, see [Dockerizing Next.js applications](/blog/dockerizing-nextjs).

## Caching without leaking data between tenants

Caching in a multi-tenant app needs care. With Cache Components, anything marked `"use cache"` is keyed by its arguments, so a cached function that takes a `workspaceId` produces separate entries per workspace. That is safe. A cached function that reads the workspace from somewhere implicit, or caches a whole page that includes user data, is not.

- Cache shared, public data freely: plans, marketing content, documentation.
- Cache tenant data only when the tenant ID is an explicit argument, and tag entries by workspace so you can invalidate them with `updateTag` after a write.
- Leave per-user, fast-changing data uncached and stream it behind `Suspense`.

## When Next.js is not enough on its own

Some products outgrow a single Next.js app for the backend. Signs that it is time to add a separate API service: mobile apps or third parties need a stable public API with versioning, you need long-lived connections such as WebSockets at scale, or a part of the system has very different scaling needs, like a heavy AI or data-processing service. At that point, Next.js stays the web layer and talks to the API like any other client. AI-heavy products have their own set of concerns around streaming, cost and latency, which I cover in [AI SaaS architecture](/blog/ai-saas-architecture).

> The best early SaaS architecture is one where you can explain, for every piece of work, which process runs it and what happens if that process dies.

## Key takeaways

- Use Next.js as the web layer: marketing site, dashboard, Server Actions and webhooks, not long-running work.
- Pick a tenancy model early, and route every tenant query through a data layer that takes the tenant from the session.
- Treat billing webhooks as the source of truth, make them idempotent, and enforce plan limits on the server.
- Move slow work to a queue and a separate worker; `after()` is for small follow-ups, not jobs.
- Cache only with explicit tenant keys and tags, and add a separate API when clients beyond the web app need one.

## Planning a SaaS build?

If you are about to build a SaaS product on Next.js, or you have a prototype that now needs real tenancy, billing and background processing, I can help with the architecture and the build itself. You can read about how I approach [SaaS development](/saas-development), or [start a conversation on the hire me page](/hire-me) with where your product is today and what you need next.
