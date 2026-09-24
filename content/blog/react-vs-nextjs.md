---
title: React vs Next.js – When to Choose Each
description: React vs Next.js compared by what each gives you, with clear cases for a plain React SPA, cases for Next.js, the hidden costs and a checklist to decide.
category: react
tags: [react, nextjs, vite, architecture, rendering]
publishedAt: 2026-09-24
services: [react-developer, nextjs-developer]
projects: [vercel-clone]
related: [react-server-components-explained, nextjs-app-router-architecture, nextjs-seo-best-practices]
featured: false
---

React vs Next.js is not really a contest, because Next.js is built on React. The real choice is between a plain React app (usually a Vite single-page app) where you assemble routing, data loading and hosting yourself, and Next.js, a framework that makes those decisions for you and adds a server. Choose a plain React SPA when your app lives behind a login and SEO does not matter; choose Next.js when you need server rendering, public pages that search engines can read, or server-side logic that sits close to your UI.

## What React gives you on its own

React is a library for building user interfaces out of components. It handles rendering, state, effects and reconciliation. It does not tell you how to route between pages, how to fetch data, how to render on a server or how to deploy.

In practice, a "plain React" project today usually means Vite plus a router such as React Router or TanStack Router, a data library such as TanStack Query, and a static host. The output is a bundle of HTML, JavaScript and CSS that runs entirely in the browser. The server just hands over files.

That simplicity is a real advantage. There is no server runtime to operate, deployment is copying files to a CDN, and the mental model is small: everything happens in the browser.

## What Next.js adds on top

Next.js takes React and adds the parts a full application usually needs:

- File-based routing with nested layouts, loading states and error boundaries per route.
- Server rendering, so the first HTML response already contains content. Pages can be rendered at build time, on each request, or streamed in pieces.
- [React Server Components](/blog/react-server-components-explained) by default in the App Router, so data fetching and heavy logic can stay on the server and never ship to the browser.
- Route handlers and server functions, which let you write backend endpoints and form mutations in the same project.
- Built-in handling for images, fonts, metadata and scripts, which covers a lot of routine performance and SEO work.
- A caching layer that decides what gets rendered once and reused versus rendered fresh.

The trade is that you now run a server (or serverless functions), and you have to understand where each piece of code runs.

## When a plain React SPA is the better choice

A Vite SPA is often the right answer, and it is worth saying so clearly because frameworks get recommended by default.

- Internal tools and admin panels. Everything is behind authentication, search engines will never see it, and users load it once and keep it open.
- Dashboards talking to an existing API. If a separate backend already exists in Node.js, Python or anything else, a second server layer in the frontend can be duplication rather than help.
- Embedded apps and widgets. Code that mounts into another page, a browser extension or a desktop shell does not benefit from server rendering.
- Teams that want static hosting only. An SPA can sit on S3 with a CDN in front and nothing else to patch or scale.
- Highly interactive editors and canvases, where almost every component needs browser APIs and server rendering adds little.

The costs of an SPA are also real. The first load shows a blank or skeleton screen until JavaScript runs, social link previews and search indexing are weaker unless you add prerendering, and data fetching tends to start later because it waits for the bundle.

## When Next.js is the better choice

- Public pages that must rank or be shared. Marketing pages, blogs, documentation, product listings and anything where search engines and link previews read the HTML benefit from server rendering. I cover the details in [Next.js SEO best practices](/blog/nextjs-seo-best-practices).
- A product that mixes content and application. A SaaS with a public site, pricing pages and a logged-in app can live in one codebase with one design system.
- UI that depends on server-side secrets or heavy work. Calling an LLM, reading from a database or signing upload URLs can happen in a server component or route handler without building a separate API first.
- Streaming interfaces. AI chat and long-running reports benefit from streaming HTML and data to the client as it becomes ready.
- Small teams that want fewer moving parts. One repository, one deploy and one language for both the UI and a thin backend is easier to run than two services.

The [Vercel clone](/projects/vercel-clone) I built is a good example of the mixed case. It has public-facing pages, an authenticated dashboard for connecting repositories and managing teams, and server-side logic for GitHub OAuth and triggering builds. Keeping that in Next.js meant the dashboard and the endpoints behind it shared types and lived in one place.

## The same page in each approach

Seeing the shape of the code helps. Here is a project list in a Vite SPA. The browser downloads the bundle, renders, then asks the API for data.

```tsx
// Vite + React Router + TanStack Query
export function ProjectsPage() {
  const { data, isPending, error } = useQuery({
    queryKey: ["projects"],
    queryFn: () => fetch("/api/projects").then((r) => r.json()),
  });

  if (isPending) return <ProjectsSkeleton />;
  if (error) return <ErrorState />;
  return <ProjectList projects={data} />;
}
```

And here is the same page as a Next.js server component. The data is fetched on the server before the HTML is sent, and this component's code never reaches the browser.

```tsx
// app/projects/page.tsx (Next.js App Router)
import { getProjects } from "@/lib/projects";

export default async function ProjectsPage() {
  const projects = await getProjects();
  return <ProjectList projects={projects} />;
}
```

The second version is shorter, but it also means `getProjects` runs on a server you operate, and you need to decide how that result is cached. Neither is automatically better.

## Hidden costs to weigh

Every framework decision moves complexity somewhere. With Next.js, it moves into a few places people underestimate:

- A runtime to operate. You need Node.js or a serverless platform, not just file hosting. Next.js runs fine in Docker on your own infrastructure, but that is infrastructure you now own.
- A bigger mental model. Developers need to know which components run on the server, which run on the client, what can cross the boundary and how caching behaves. Mistakes here cause stale data or accidentally large client bundles.
- Framework upgrades. Conventions change between major versions, so budget time for reading migration guides.

With a plain SPA, the costs are elsewhere: you choose and wire your own router, data layer and build setup, you handle SEO separately if you ever need it, and you usually need a separate backend for anything that requires secrets.

## A quick decision checklist

Answer these in order. The first strong "yes" usually decides it.

1. Do search engines or social previews need to read your pages? If yes, lean Next.js.
2. Do you already have a separate backend that owns all business logic? If yes, a plain React SPA is often enough.
3. Is the whole app behind a login and used as a tool? If yes, a SPA is simpler to run.
4. Do you need server-side secrets or streaming in the UI without building a separate API? If yes, lean Next.js.
5. Does your team want static hosting with no server to maintain? If yes, stay with a SPA.

If the answers are mixed, a common split is a Next.js site for public pages and a separate SPA for the logged-in app. It costs a second deploy, but each part gets the tool that suits it.

## Moving from one to the other

Choosing wrong is rarely fatal, because the components are React either way. Moving from a Vite SPA to Next.js usually means porting routes into the `app` directory, marking interactive components with `"use client"`, and moving data fetching from effects or query hooks into server components where it makes sense. You can migrate page by page rather than all at once.

Going the other way, from Next.js to a SPA, means replacing server data fetching with client fetching and moving route handlers into a real backend. That is more work, which is one reason to think about it up front.

## Key takeaways

- Next.js is a framework on top of React, so the real comparison is a plain React SPA versus a React framework with a server.
- A Vite SPA is the simpler choice for internal tools, dashboards on an existing API, embedded apps and static-only hosting.
- Next.js pays off for public pages that need SEO, products mixing content and app, and UIs that need server-side logic or streaming.
- The cost of Next.js is a server runtime and a larger mental model about where code runs and how it is cached.
- Components move between the two fairly easily, so decide on today's needs and plan the migration path rather than over-building.

## Not sure which fits your project

If you are starting a product and want a second opinion on the architecture, I am happy to look at your requirements and recommend a setup that suits your team. I build with both, as a [Next.js developer](/nextjs-developer) and for plain React apps. [Reach out here](/hire-me) with a few lines about what you are building.
