---
title: Server Components vs Client Components in Next.js
description: When to use Server Components vs Client Components in Next.js, how the use client boundary works, what can cross it, and the mistakes that bloat your bundle.
category: nextjs
tags: [nextjs, react server components, client components, performance]
publishedAt: 2026-09-24
services: [nextjs-developer, react-developer]
projects: [resume-analyzer]
related: [react-server-components-explained, nextjs-app-router-architecture]
featured: false
---

In Next.js, use Server Components for anything that fetches data, touches secrets or renders mostly static markup, and use Client Components only for the parts that need state, event handlers, effects or browser APIs. Layouts and pages are Server Components by default, so the real skill is not choosing between the two. It is placing the `"use client"` boundary as low in the tree as possible, and knowing what is allowed to cross it.

## The short decision rule

Ask one question about each component: does it need to respond to the user in the browser without a round trip to the server? If yes, it is a Client Component. If no, leave it as a Server Component.

Reach for a Client Component when you need:

- `useState`, `useReducer` or any hook that holds state between renders
- event handlers like `onClick`, `onChange` or `onSubmit` with client-side logic
- `useEffect` and other lifecycle behaviour
- browser APIs such as `window`, `localStorage`, `IntersectionObserver` or the clipboard
- a third-party component that uses any of the above internally

Keep a Server Component when you need to:

- query a database or call an internal API with credentials
- read environment secrets that must never reach the browser
- render content that search engines should see in the initial HTML
- use a large library (markdown parsing, syntax highlighting, date formatting) whose output is static

## What "use client" really does

The `"use client"` directive does not mean "this component runs only in the browser". Client Components are still prerendered to HTML on the server for the first load, then hydrated in the browser. The directive marks a boundary in the module graph. Everything that file imports, and every component it renders directly, becomes part of the client bundle.

That is why the placement matters. Put `"use client"` at the top of a layout and every import beneath it ships to the browser, including components that did not need to. Put it on a small `SearchInput` and only that input and its dependencies ship.

You also only need the directive on the entry points. A Client Component that imports another component makes that component client-side automatically. Adding `"use client"` to every file is harmless but noisy, and it hides where the real boundaries are.

## What can cross the boundary

Two things cross from server to client: code, through imports, and data, through props. The data has to be serializable by React. Strings, numbers, booleans, plain objects, arrays, dates and Promises are fine. Class instances with methods and ordinary functions are not.

The common failure is passing an event handler from a Server Component into a Client Component. That throws, because a function defined on the server cannot be sent to the browser. The exception is a Server Function marked with `"use server"`, which crosses as a reference the client can call. The TypeScript plugin helps here: it accepts function props named `action` or ending in `Action` and flags other function props on Client Components.

A useful pattern is to send only the data the client needs. If a Server Component loads a full user record and passes it to a Client Component, every field in that record ends up in the page payload, visible in the browser. Pick fields explicitly.

## Composition, the pattern that fixes most problems

You cannot import a Server Component into a Client Component, but you can pass one in as `children` or any other prop. The Server Component renders on the server, and the Client Component receives the rendered output as a slot. This is how you keep an interactive shell without dragging its content into the bundle.

```tsx
// components/Collapsible.tsx
"use client";

import { useState } from "react";

export function Collapsible({ title, children }: { title: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <section>
      <button onClick={() => setOpen((o) => !o)} aria-expanded={open}>
        {title}
      </button>
      {open && <div>{children}</div>}
    </section>
  );
}
```

```tsx
// app/reports/[id]/page.tsx (Server Component)
import { Collapsible } from "@/components/Collapsible";
import { getReport } from "@/lib/data/reports";
import { renderMarkdown } from "@/lib/markdown"; // heavy, stays on the server

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const report = await getReport(id);
  const html = await renderMarkdown(report.body);

  return (
    <Collapsible title={report.title}>
      <article dangerouslySetInnerHTML={{ __html: html }} />
    </Collapsible>
  );
}
```

The toggle state lives in the browser. The markdown library never leaves the server. If the markdown is user-supplied, sanitize it in `renderMarkdown` before it reaches `dangerouslySetInnerHTML`.

The same idea applies to providers. A theme or query-client provider must be a Client Component because it uses context, but you can wrap `children` in it from the root layout. The pages inside stay Server Components.

## Protecting server code from the client

Modules can be imported from both environments, so it is possible to import a file that reads `process.env.DATABASE_URL` into a Client Component by accident. Environment variables without the `NEXT_PUBLIC_` prefix are replaced with an empty value in the client bundle, so you get a confusing runtime failure instead of a leak, but the intent is still wrong.

Add `import "server-only"` at the top of any module that must never run in the browser: data access, API clients with secrets, admin utilities. A mistaken import then fails the build with a clear message. The `client-only` package does the reverse for modules that touch `window`.

## Data fetching on each side

On the server, fetch directly in the component with `async` and `await`. On the client, you have two good options. You can start the request in a Server Component and pass the Promise down as a prop, then read it in the Client Component with React's `use` hook inside a `Suspense` boundary. Or, for data that changes after user interaction, fetch from a Route Handler with a client library such as SWR or React Query.

What I avoid is fetching the primary content of a page inside `useEffect`. The initial HTML then contains a loading state, the user waits for JavaScript to download before the request even starts, and crawlers see an empty page. For more on that side of the trade-off, see [Next.js SEO best practices](/blog/nextjs-seo-best-practices).

## A real split from the Resume Analyzer

In the [Resume Analyzer case study](/projects/resume-analyzer), the split was close to textbook. The upload area and the job-description textarea were Client Components, because they managed file state, drag-and-drop events and character counts. PDF parsing, the comparison against the job description and the calls to OpenAI happened on the server, where the API key lives and where parsed resumes could be cached. The results view was mostly a Server Component, with a small client island for expanding line-level suggestions. The page felt interactive where it needed to be, and the heavy work never shipped to the browser.

## Mistakes I see most often

1. Marking the root layout or a whole page with `"use client"` to fix one hook error. Move the hook into a small child component instead.
2. Wrapping an entire page in a client-side context provider and then importing server data utilities inside it.
3. Passing large objects as props "just in case". Everything in props is serialized into the page.
4. Reading cookies or headers in a Client Component. Those are server APIs; read them on the server and pass the value down.
5. Using a Client Component for a static list because the list items have a hover effect. CSS handles hover without JavaScript.

## When a Client Component is the right default

Some parts of an app are interactive almost everywhere: a canvas editor, a drag-and-drop board, a live chart dashboard, a real-time chat. For those, a large Client Component subtree is correct. Fighting it by splitting every button into its own island adds complexity without shrinking the bundle much, because the heavy dependencies are needed anyway. Keep the surrounding page, navigation and data loading on the server, and let the interactive surface be fully client-side. If you want the underlying React model in more depth, [React Server Components explained](/blog/react-server-components-explained) covers the payload and hydration side.

## Key takeaways

- Server Components are the default; add `"use client"` only where you need state, events, effects or browser APIs.
- The directive marks a module boundary, so place it as low in the tree as possible.
- Only serializable data and Server Functions can cross from server to client through props.
- Pass Server Components into Client Components as `children` to keep interactive shells light.
- Protect secrets and data access with `server-only`, and fetch primary content on the server.

## Getting the boundaries right in your app

If your Next.js bundle has grown and you suspect `"use client"` is doing more than it should, a focused review of the component tree usually finds the few boundaries worth moving. I do this as part of my [Next.js development](/nextjs-developer) and [React development](/react-developer) work. [Reach out through the hire me page](/hire-me) if you would like a hand.
