---
title: How to Build a Production React Dashboard
description: How to build a production React dashboard, from architecture and auth to server-driven tables, charts, real-time updates, UI states, testing and monitoring.
category: react
tags: [react, dashboard, saas, tanstack query, architecture]
publishedAt: 2026-09-24
services: [react-developer, saas-development]
projects: [vercel-clone]
related: [react-state-management-guide, react-performance-optimization, react-vs-nextjs]
featured: false
---

To build a production React dashboard, design around the questions users need answered, let the server do filtering and aggregation, keep API data in a cache and filters in the URL, and treat loading, empty, error and permission states as part of the feature rather than an afterthought. The chart library matters much less than those decisions. This guide walks through each layer in the order I usually build them.

## Start with the questions, not the widgets

Dashboards go wrong when they start as a grid of charts someone thought would look good. Start instead by listing the handful of questions each user role needs answered, and the action they take after seeing the answer. "Which builds failed today and why" leads to a filtered list with a link to logs. "How is usage trending this month" leads to one chart with a date range.

Each question tells you the data you need, the granularity, how fresh it must be, and who is allowed to see it. That list becomes the spec for your API, not just your UI.

## Pick the architecture

Most dashboards live behind a login and do not need search engines, so a plain React SPA built with Vite is a perfectly good choice, especially if a backend API already exists. Next.js is worth it if the dashboard shares a codebase with public pages, or if you want server components to fetch data close to the database. I compare those trade-offs in [React vs Next.js](/blog/react-vs-nextjs).

Whichever you choose, the structure is similar:

- An app shell with navigation, the account or workspace switcher, and a content area. It loads once and stays mounted.
- A route per view, each code-split so opening the billing page does not download the analytics charts.
- A data layer that talks to one typed API client, so endpoints, auth headers and error handling live in one place.
- A shared component set for tables, filters, stat cards, empty states and dialogs, so every view behaves the same way.

## Authentication and permissions

Handle authentication before any feature work, because it shapes routing and data access. Keep sessions in secure, HTTP-only cookies where your setup allows it, rather than tokens in local storage that any injected script can read.

Permissions need to be enforced twice, for different reasons. The server enforces them for security: every endpoint checks that the current user can see or change the requested resource. The UI enforces them for clarity: hide or disable actions the user cannot take, and show a clear message on pages they cannot open. Never rely on the UI check alone. Hiding a button does not protect the endpoint behind it.

In multi-tenant products, include the workspace or team ID in every query and check it on the server. The [Vercel clone](/projects/vercel-clone) I built has team access, which is exactly where this matters: a query that forgets the team ID can show one team's projects to another.

## A data layer that fits dashboards

Dashboard data is server state. It lives in your database, other people change it, and it goes stale. Keep it in a server cache such as TanStack Query rather than copying it into a global store. The cache handles deduplication, background refetching and invalidation after mutations. The [React state management guide](/blog/react-state-management-guide) covers why this split matters.

Put filters, sorting, pagination and date ranges in the URL. Users can refresh, share a link to a filtered view, and use the back button, and the URL becomes the single source of truth that feeds your query keys.

```tsx
function useBuilds() {
  const [params] = useSearchParams();
  const filters = {
    status: params.get("status") ?? "all",
    page: Number(params.get("page") ?? "1"),
    sort: params.get("sort") ?? "-createdAt",
  };

  return useQuery({
    queryKey: ["builds", filters],
    queryFn: () => api.listBuilds(filters),
    placeholderData: keepPreviousData,
  });
}
```

`keepPreviousData` keeps the current page visible while the next one loads, so the table does not flash empty on every page change.

## Tables that scale

Tables are the core of most dashboards, and they are where client-side shortcuts hurt first. Loading every row and filtering in the browser works with a few hundred records and falls over later.

- Do sorting, filtering and pagination on the server. The API accepts the parameters and returns one page plus a total or a cursor.
- Prefer cursor pagination for large or fast-changing tables, since offset pagination skips or repeats rows when data is inserted.
- Use a headless table library such as TanStack Table for column definitions, sorting state and selection, and keep your own markup and styles.
- Virtualize only if you truly need to show many rows at once. Pagination is usually friendlier.
- Make bulk actions explicit: show how many rows are selected and whether the selection covers the current page or the whole result set.

## Charts and aggregates

Charts should receive data that is already aggregated. Sending raw events to the browser and grouping them in JavaScript is slow and duplicates logic that belongs in the database. Have the API return points at the granularity the chart displays, such as one value per day for a monthly view.

A few habits make charts trustworthy:

- Always label the time zone and the date range. Off-by-one-day bugs almost always come from time zones.
- Show where data is missing instead of drawing a line through zero.
- Pair each chart with the number it summarizes, so users do not have to read values off an axis.
- Lazy-load the chart library if it is heavy, so the rest of the page renders first.

## Real-time updates

Not everything needs to be live. Decide per view how fresh data must be.

1. Refetch on focus and on an interval for data that changes every few minutes. It is the simplest option and usually enough.
2. Server-Sent Events for one-way streams from server to browser, such as job progress or log output. They work over plain HTTP and reconnect automatically.
3. WebSockets for two-way, high-frequency interaction like collaboration or chat.

The build log view in the Vercel clone is a stream rather than a poll, because users watch it while a build runs and expect lines to appear as they are produced. A minimal client for a one-way stream looks like this:

```tsx
function useLogStream(buildId: string) {
  const [lines, setLines] = useState<string[]>([]);

  useEffect(() => {
    const source = new EventSource(`/api/builds/${buildId}/logs`);
    source.onmessage = (event) => {
      setLines((prev) => [...prev, event.data]);
    };
    source.addEventListener("done", () => source.close());
    return () => source.close();
  }, [buildId]);

  return lines;
}
```

For long streams, cap the number of lines kept in memory or virtualize the list, since an array that grows forever eventually slows the page.

## Loading, empty, error and permission states

Every data view has at least five states: loading, loaded with data, loaded but empty, failed, and not allowed. Build all of them from the start, as shared components.

- Loading: use skeletons shaped like the final content so the layout does not jump.
- Empty: explain why it is empty and what to do next, like creating the first project or clearing a filter.
- Error: say what failed in plain words, offer a retry, and keep the rest of the page working. Use error boundaries per section so one broken widget does not blank the whole screen.
- No permission: tell the user they lack access and who can grant it, instead of showing an empty table that looks like missing data.

## Performance you will actually notice

Dashboards are opened and left running, so slow interactions matter more than first load. Keep filter inputs responsive, avoid re-rendering the whole page when one widget updates, and split routes so heavy views load on demand. Profile the slow interaction before changing anything, then fix the structure first and memoize only where the profile shows it helps.

## Testing and monitoring

Test at the level where bugs appear. Unit-test pure logic like formatters and permission helpers. Test components against a mocked API, for example with Mock Service Worker, so you can cover empty and error states that are hard to reproduce by hand. Add a small set of end-to-end tests with Playwright for the flows that must never break: signing in, loading the main view, and one key mutation.

In production, capture front-end errors with a tracking tool, include the route and user role in the context, and collect real-user performance metrics. When a customer reports a problem, you want the stack trace already waiting.

## Accessibility is part of production

Dashboards are used for hours by the same people, so accessibility problems add up. Use real table markup, keep focus visible, make every action reachable by keyboard, give charts a text summary, and do not use colour alone to show status.

## Key takeaways

- Design each view around a question a user needs answered and the action they take next.
- Enforce permissions on the server for security, and in the UI for clarity.
- Keep API data in a server cache, filters in the URL, and let the server sort, filter, paginate and aggregate.
- Choose polling, Server-Sent Events or WebSockets per view based on how fresh the data must be.
- Build loading, empty, error and permission states as shared components from day one.

## Planning a dashboard for your product

If you are building an admin panel or customer-facing dashboard for a SaaS product and want it built to last, I can help with the architecture, the API contract and the front end. Have a look at my [SaaS development](/saas-development) work or my approach as a [React developer](/react-developer), then [tell me about your project](/hire-me).
