---
title: Next.js App Router Architecture – Structuring a Real App
description: How to structure a Next.js App Router project, from route groups and layouts to data access, Server Actions, proxy.ts and caching boundaries that scale.
category: nextjs
tags: [nextjs, app router, architecture, project structure]
publishedAt: 2026-09-24
services: [nextjs-developer, full-stack-developer]
projects: [chat-with-pdf]
related: [server-components-vs-client-components, building-saas-with-nextjs, nextjs-seo-best-practices]
featured: false
---

A good Next.js App Router architecture keeps the `app` directory thin: it holds routes, layouts and loading or error boundaries, while data access, business rules and UI components live in their own folders outside it. Routes decide what renders where, a data layer decides what the user is allowed to see, and components stay ignorant of both. The rest of this guide shows how I lay that out in practice and which App Router features earn their place.

## What the App Router actually gives you

It helps to be precise about the building blocks before arranging them. In the App Router, a folder is a route segment. A `page.tsx` makes the segment publicly reachable. A `layout.tsx` wraps its children and persists across navigations between sibling routes. `loading.tsx` creates a `Suspense` boundary for the segment, `error.tsx` creates an error boundary, and `not-found.tsx` handles missing resources.

Every layout and page is a Server Component by default. That single default shapes the architecture more than any folder convention: data fetching belongs on the server, and client-side code is something you opt into at specific leaves.

A few things changed in recent versions that affect how you structure code:

- `params` and `searchParams` are Promises and must be awaited. The generated `PageProps<'/route'>` and `LayoutProps<'/route'>` helpers type them for you.
- The `middleware` file is now `proxy.ts`, and it is meant for lightweight request handling such as redirects, rewrites and header checks.
- Every parallel route slot needs an explicit `default.tsx`, or the build fails.
- With `cacheComponents` enabled, caching is opt-in through `"use cache"`, and uncached or request-time reads must sit inside a `Suspense` boundary.

## A folder layout that holds up

This is the shape I start most production projects with. It is not the only valid one, but each folder has a single reason to exist.

```bash
app/
  (marketing)/          # public pages, shared marketing layout
    page.tsx
    pricing/page.tsx
    blog/[slug]/page.tsx
  (app)/                # authenticated product, shared app shell
    layout.tsx
    dashboard/page.tsx
    documents/[id]/page.tsx
  api/webhooks/stripe/route.ts
  layout.tsx            # root html/body, fonts, metadataBase
  sitemap.ts
  robots.ts
components/             # UI only, no data access
  ui/
  documents/
lib/
  data/                 # server-only data access, auth checks
  actions/              # Server Actions ("use server")
  validation/           # zod schemas shared by client and server
proxy.ts
```

The route groups in parentheses do not appear in the URL. They let the marketing site and the product use completely different layouts while living in the same app. You can even give each group its own root layout if the two halves share nothing, at the cost of a full page load when a user crosses between them.

### Colocation versus separation

The App Router lets you colocate components inside route folders, and private folders prefixed with an underscore are ignored by routing. I use colocation for components that truly belong to one route, like a chart that only the analytics page renders. Anything used in two places moves to `components/`. The test I apply is simple: if deleting the route should delete the file, colocate it.

## The data access layer is the real architecture

The most important boundary in an App Router project is not a folder. It is the line between code that touches your database and code that renders UI. Because Server Components can query a database directly, it is tempting to write queries inside pages. That works for a prototype and becomes a security and maintenance problem later, because authorization checks end up scattered across dozens of files.

Instead, put every read behind a function in `lib/data` that checks the session, filters by the current user or tenant, and returns only the fields the UI needs. Mark the module with `import "server-only"` so an accidental import from a Client Component fails at build time rather than leaking a database client into the browser bundle.

```ts
// lib/data/documents.ts
import "server-only";
import { cache } from "react";
import { db } from "@/lib/db";
import { requireUser } from "@/lib/auth";

export const getDocument = cache(async (id: string) => {
  const user = await requireUser();
  const doc = await db.document.findFirst({
    where: { id, ownerId: user.id },
    select: { id: true, title: true, status: true, createdAt: true },
  });
  return doc; // null when missing or not owned
});
```

Pages then become short and boring, which is exactly what you want:

```tsx
// app/(app)/documents/[id]/page.tsx
import { notFound } from "next/navigation";
import { getDocument } from "@/lib/data/documents";
import { DocumentView } from "@/components/documents/DocumentView";

export default async function Page(props: PageProps<"/documents/[id]">) {
  const { id } = await props.params;
  const doc = await getDocument(id);
  if (!doc) notFound();
  return <DocumentView doc={doc} />;
}
```

Notice that the page does not know how authorization works. It only knows that `getDocument` returns a document the user is allowed to see, or nothing.

## Mutations with Server Actions

For writes, I put Server Actions in `lib/actions` with `"use server"` at the top of the file. Treat each one like a public API endpoint, because that is what it is: Server Functions are reachable through direct POST requests, not only through your UI. Every action should validate input, check the session, check ownership, perform the write and then invalidate the right cache.

- Validate with a schema shared between the form and the action, so client-side hints and server-side enforcement never disagree.
- Return a typed result object for expected failures such as validation errors, and throw only for truly unexpected ones.
- Use `updateTag` inside an action when the user must see their own change immediately, and `revalidateTag` with a profile such as `"max"` when stale-while-revalidate is acceptable.

Route Handlers in `app/api` still have a place. I use them for webhooks, for endpoints that third parties or mobile clients call, and for streaming responses that do not map onto a form. If only your own UI calls it, a Server Action is usually simpler.

## Where proxy.ts fits, and where it does not

`proxy.ts` runs before routes render. It is the right place for redirects based on locale or an old URL scheme, for rewriting a subdomain to a tenant path, and for a quick check that a session cookie exists before sending someone to `/login`.

It is not the right place for real authorization. Proxy runs separately from your render code and should not rely on shared modules or globals. Do the cheap optimistic check in proxy, and do the authoritative check in the data layer, close to the query. If proxy is misconfigured or skipped, your data is still safe.

Always give proxy a `matcher`. Without one it runs on every request, including static assets and image optimisation, which can block CSS or images behind an auth redirect.

## Caching boundaries as part of the design

With Cache Components, you decide per function or per component what can be reused. My rule of thumb is to cache at the data level for shared reference data (plans, categories, public content) and to leave user-specific data uncached behind `Suspense`. Pair every `"use cache"` with a `cacheLife` profile and a `cacheTag`, so you know how long it lives and how to invalidate it.

The layout of a page follows from that. The static shell (navigation, headings, cached content) prerenders. The user-specific parts stream in. When you plan a route, sketch which parts are shell and which are streamed. It is a better conversation to have up front than after a performance review. For the component side of this decision, see [Server Components vs Client Components](/blog/server-components-vs-client-components).

## An example from the Chat with PDF project

The [Chat with PDF case study](/projects/chat-with-pdf) is a good example of these boundaries. Uploads go through a Route Handler because the file is large and processing continues in the background after the response. Chunking and embedding run as a background job, never inside a render. The document list is a Server Component that reads from the data layer, while the chat panel is a Client Component because it holds input state and renders a streamed answer with citations. Keeping those responsibilities apart meant the slow parts (embedding) never blocked the fast parts (navigating between documents).

## When not to reach for advanced routing

Parallel routes and intercepting routes are powerful, and they are easy to overuse. A modal that shows a photo while keeping the gallery underneath, with a shareable URL, is a good fit. A settings dialog that nobody will ever deep-link to is not; a Client Component with local state is simpler and easier to test. Every parallel slot needs a `default.tsx`, which is a small cost that tells you how much structure you are adding.

The same goes for splitting an app into multiple root layouts or multiple zones. Do it when there is a real organisational or deployment reason, not because the folder tree looks neater.

> Architecture in the App Router is mostly about deciding where each kind of code is allowed to live, then refusing to make exceptions.

## Key takeaways

- Keep `app/` for routing concerns and move data access, actions and UI into their own folders.
- Put all reads behind a `server-only` data layer that performs authorization close to the query.
- Treat every Server Action as a public endpoint: validate, authorize, write, then invalidate by tag.
- Use `proxy.ts` for cheap redirects and optimistic checks, never as the only line of defence.
- Plan each route as a prerendered shell plus streamed parts, and cache deliberately with tags.

## Want help structuring your Next.js app?

If you are starting a new App Router project, or untangling one where queries and permissions are spread everywhere, I can help design the structure and do the migration. You can read more about my [Next.js development](/nextjs-developer) and [full stack development](/full-stack-developer) work, or [contact me through the hire me page](/hire-me) to talk through your codebase. If you are building a product rather than a site, the [SaaS with Next.js guide](/blog/building-saas-with-nextjs) covers the next layer up.
