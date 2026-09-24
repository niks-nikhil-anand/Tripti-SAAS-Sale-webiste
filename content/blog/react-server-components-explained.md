---
title: React Server Components Explained – A Working Mental Model
description: React Server Components explained through where code runs, what crosses the client boundary, how they differ from SSR and the mistakes to avoid.
category: react
tags: [react, server components, rsc, nextjs, rendering]
publishedAt: 2026-09-24
services: [react-developer, nextjs-developer]
projects: [chat-with-pdf]
related: [server-components-vs-client-components, react-vs-nextjs, nextjs-app-router-architecture]
featured: false
---

React Server Components are components that run only on the server, either at build time or per request, and send their rendered result to the browser instead of their code. They can be async, read databases and files directly, and use secrets, while the browser receives only the output plus the JavaScript for the interactive parts you explicitly mark as client components. Once you think of your tree as server components by default with small islands of client code, most of the rules make sense.

## The two kinds of components

In an app that supports React Server Components, such as a Next.js App Router project, every component is a server component unless something says otherwise. That "something" is the `"use client"` directive at the top of a file.

- Server components run on the server only. They can be `async`, await data, import server-only libraries and read environment variables. They cannot use state, effects, event handlers or browser APIs, because there is no browser where they run.
- Client components are the React you already know. They run in the browser (and are also pre-rendered to HTML on the server for the first load). They can use `useState`, `useEffect`, `onClick` and everything else interactive.

The `"use client"` directive marks a boundary, not a single component. Every module imported from a client file becomes part of the client bundle too. That is why the placement of the directive matters so much.

## What actually gets sent to the browser

When a server component renders, React produces a serialized description of the result, often called the RSC payload. It contains the rendered elements, the props for any client components, and references to the client component code the browser needs to load.

The browser never receives the server component's source code or its dependencies. If a server component imports a Markdown parser, a syntax highlighter or a database client to build the page, none of that ships to the user. Only the output does.

This is the main practical benefit. Heavy, non-interactive work moves out of the bundle entirely.

## Server components are not the same as SSR

This is the most common confusion, so it is worth being precise.

Server-side rendering (SSR) takes your components, renders them to HTML on the server for the first request, and then sends the JavaScript for all of them so the browser can hydrate and take over. Every component ends up in the bundle.

Server components are a different axis. They never hydrate and never ship their code. In a framework like Next.js, both happen together: server components produce the RSC payload, then that payload plus the client components is rendered to HTML for the initial response. Client components still hydrate. Server components do not.

A useful shorthand: SSR is about when the first HTML is produced, while server components are about where a component's code lives.

## A small example

Here is a page that fetches data on the server and hands one interactive piece to the client.

```tsx
// app/documents/[id]/page.tsx (server component by default)
import { getDocument } from "@/lib/documents";
import { AskBox } from "./AskBox";

export default async function DocumentPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const doc = await getDocument(id);

  return (
    <article>
      <h1>{doc.title}</h1>
      <p>{doc.summary}</p>
      <AskBox documentId={doc.id} />
    </article>
  );
}
```

```tsx
// app/documents/[id]/AskBox.tsx
"use client";

import { useState } from "react";

export function AskBox({ documentId }: { documentId: string }) {
  const [question, setQuestion] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // send question for documentId to your API
      }}
    >
      <input value={question} onChange={(e) => setQuestion(e.target.value)} />
      <button type="submit">Ask</button>
    </form>
  );
}
```

This is close to how I would lay out a document page in a RAG app like [Chat with PDF](/projects/chat-with-pdf). The document metadata comes from the database on the server, and only the question box, which needs state and events, becomes client code.

## Rules at the boundary

Most bugs with server components happen where server and client meet. These rules cover nearly all of them.

### Props must be serializable

Anything a server component passes to a client component has to be converted into the payload. Plain objects, arrays, strings, numbers, booleans, `null`, dates and promises work. Functions, class instances and things like database connections do not. If you need the client to trigger server logic, pass a server function instead of a regular callback.

### Client components cannot import server components

A file marked `"use client"` pulls its imports into the client bundle, so importing a server component there turns it into a client component or breaks it. The fix is composition: render the server component in a server parent and pass it into the client component as `children` or another prop.

```tsx
// Server component
<Tabs>
  <UsageReport />
</Tabs>
```

Here `Tabs` can be a client component that manages which tab is open, while `UsageReport` stays on the server and its output is passed in already rendered.

### Everything you pass to the client is public

Props sent to a client component end up in the page payload, which anyone can read in their browser. Passing a whole user record because the component needs a name also sends the email, role and anything else on it. Pass only the fields the client needs.

To keep server code from being imported into client bundles by accident, put it in modules that import the `server-only` package. The build then fails if a client file tries to import them, which is a much better time to find out.

## Data fetching and streaming

Because server components can be async, data fetching lives next to the component that needs it. There is no effect, no loading flag and no client-side request for the first render.

The risk is a waterfall. If a parent awaits one request and then renders a child that awaits another, the second request does not start until the first finishes. Start independent requests together with `Promise.all`, or let separate sibling components fetch on their own.

Wrap slow parts of the tree in `Suspense` with a fallback. The server can then stream the fast parts of the page first and send the slow parts when they are ready, instead of making the whole page wait for the slowest query.

## Mutations with server functions

Server functions, marked with `"use server"`, let a client component call code that runs on the server, typically from a form action or a button handler. The framework creates an endpoint for you behind the scenes.

Treat every server function as a public API endpoint, because that is what it is. Validate the input, check that the current user is allowed to perform the action, and never trust an ID just because it came from your own UI.

## When server components are the wrong tool

Server components are the default, not a requirement. Reach for client components when:

- The UI is highly interactive, such as editors, drag and drop, canvases or complex forms with live validation.
- The component depends on browser-only APIs like `window`, local storage or media devices.
- The data changes in real time on the client, such as live cursors or streaming chat tokens, where a client subscription is the natural model.

A common mistake is to fight this by adding `"use client"` high up in the tree to make an error go away. That moves the whole subtree into the bundle and loses the benefit. Push the directive down to the smallest interactive leaf instead. For a deeper side-by-side, see [server components vs client components](/blog/server-components-vs-client-components).

## How frameworks fit in

React defines server components, but you need a framework or bundler integration to use them, because something has to run the server, split the bundles and route requests. Next.js App Router is the most widely used option today. The framework also decides caching behaviour, which is why the same component can be static in one project and dynamic in another. If you are still choosing a stack, my comparison of [React vs Next.js](/blog/react-vs-nextjs) covers when that extra layer is worth it.

## Key takeaways

- Server components run only on the server and send their rendered output, not their code, so heavy non-interactive logic leaves the bundle.
- `"use client"` marks a boundary, and everything imported below it ships to the browser, so keep it on small interactive leaves.
- Server components and SSR solve different problems; client components are still server-rendered and hydrated, server components never hydrate.
- Props crossing to the client must be serializable and are publicly visible, so pass only what the client needs.
- Avoid waterfalls with parallel requests, stream slow sections with `Suspense`, and treat every server function as a public endpoint.

## Want help adopting server components

Moving an existing React app to server components, or starting a new one with a clean server and client split, goes much faster with a clear plan for the boundaries. I do this as part of my [React development](/react-developer) and [Next.js development](/nextjs-developer) work. If that would help, [send me a note](/hire-me) about your project.
