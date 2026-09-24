---
title: React Performance Optimization Guide – Measure, Then Fix
description: A practical React performance optimization guide covering profiling, re-render causes, memoization, list virtualization, transitions and bundle splitting.
category: react
tags: [react, performance, web vitals, memoization, profiling]
publishedAt: 2026-09-24
services: [react-developer, frontend-developer]
projects: [resume-analyzer]
related: [react-state-management-guide, react-server-components-explained, production-react-dashboard]
featured: true
---

React performance optimization comes down to three questions asked in order: what is actually slow, why is React doing that work, and what is the smallest structural change that removes it. Most slow React apps are not slow because React is slow. They re-render too much, ship too much JavaScript, or block the main thread with work the user did not ask for yet.

## Measure before you change anything

Guessing is the most expensive optimization technique. Before touching code, reproduce the slow interaction and record it. Two tools cover almost every case:

- The React DevTools Profiler shows which components rendered during an interaction, how long each took, and why it rendered. Turn on "Record why each component rendered while profiling" in the settings.
- The Performance panel in Chrome DevTools shows the full picture: long tasks, layout, paint, network and garbage collection. Throttle the CPU so your fast laptop behaves like a mid-range phone.

For user-facing metrics, watch Interaction to Next Paint (INP) for responsiveness, Largest Contentful Paint (LCP) for loading and Cumulative Layout Shift (CLS) for visual stability. The `web-vitals` package lets you send these from real users to your analytics, which is far more honest than a single lab run.

Write down what you measured. If a change does not move the number, revert it. Memoization you cannot justify is just more code to maintain.

## Understand why a component re-renders

A component re-renders for one of three reasons: its own state changed, its parent re-rendered, or a context it reads changed. Notice that "its props changed" is not on the list. By default, when a parent renders, every child renders too, whether or not the props are different.

That default is usually fine. Rendering is cheap when components are small, and React only touches the DOM for what actually changed. Re-renders become a problem when an expensive subtree renders on every keystroke, scroll event or timer tick. The Profiler will show you exactly which subtree that is.

## Fix the structure before you memoize

The most effective fixes are structural, and they do not need `memo` at all.

### Move state down

If typing in a search box re-renders an entire page, the state for that input probably lives too high. Move it into the smallest component that needs it, and the rest of the page stops rendering on each keystroke.

### Lift content up with children

When a component owns fast-changing state but wraps slow content, pass the slow content in as `children`. The `children` element is created by the parent, so it keeps the same identity when the wrapper's state changes, and React skips it.

```tsx
function ScrollTracker({ children }: { children: React.ReactNode }) {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const onScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div>
      <ProgressBar value={scrollY} />
      {children}
    </div>
  );
}

// The heavy article does not re-render on scroll.
<ScrollTracker>
  <HeavyArticle />
</ScrollTracker>;
```

### Split contexts by how often they change

A single context holding the current user, the theme and a live notification count will re-render every consumer whenever the count changes. Split it into separate providers, or move fast-changing shared values into a store with selectors. I go through those options in the [React state management guide](/blog/react-state-management-guide).

## Use memoization deliberately

`React.memo`, `useMemo` and `useCallback` are tools for a specific job: skipping work whose inputs have not changed. They help when three things are true together:

1. The work is measurably expensive, such as a large subtree or a heavy calculation.
2. The inputs are stable most of the time.
3. Everything the memoized component receives is also stable. A `memo` component that receives a new inline object or arrow function on each render still renders every time.

They are not free. Each one adds a comparison, holds memory, and adds a dependency array that someone can get wrong. Wrapping every component "just in case" makes code harder to read and rarely shows up in a profile.

If your project uses the React Compiler, much of this manual memoization is handled for you at build time. It works best on code that follows the rules of React: pure render functions, no mutation of props or state, and hooks called unconditionally. It does not fix architectural problems like state that lives too high or a list that renders ten thousand rows, so the structural fixes above still matter.

## Virtualize long lists

Rendering thousands of rows means thousands of DOM nodes, and no amount of memoization fixes the cost of layout and paint for all of them. Virtualization renders only the rows in and near the viewport and swaps them as the user scrolls. Libraries such as TanStack Virtual and react-window handle the measurement and positioning.

Virtualization has trade-offs worth knowing before you reach for it:

- Browser find-in-page will not see rows that are not rendered.
- Variable-height rows need measurement, which adds complexity.
- Screen readers and keyboard navigation need extra care so the list still makes sense.

For lists of a few hundred simple rows, pagination or plain rendering is often good enough. Measure first.

## Keep typing and clicking responsive

Sometimes the work is unavoidable, like filtering a large dataset on each keystroke. The goal then is to keep the input responsive and let the expensive part lag slightly behind. React gives you two tools for this: `useTransition` marks a state update as non-urgent, and `useDeferredValue` gives you a copy of a value that can trail the latest one.

```tsx
function ProductSearch({ products }: { products: Product[] }) {
  const [query, setQuery] = useState("");
  const deferredQuery = useDeferredValue(query);
  const isStale = query !== deferredQuery;

  const results = useMemo(
    () => filterProducts(products, deferredQuery),
    [products, deferredQuery]
  );

  return (
    <>
      <input value={query} onChange={(e) => setQuery(e.target.value)} />
      <div style={{ opacity: isStale ? 0.6 : 1 }}>
        <ResultList items={results} />
      </div>
    </>
  );
}
```

The input updates immediately, and React renders the filtered list in the background, interrupting it if the user keeps typing. For work that does not need to happen per keystroke at all, like a network search, a plain debounce is simpler and cheaper. For CPU-heavy work that blocks even a background render, move it to a Web Worker.

## Ship less JavaScript

A fast render does not help if the user waits for a large bundle to download and parse. Bundle size is a performance problem that shows up before a single component renders.

- Split by route. Each page should load only the code it needs. In a Vite app, `React.lazy` with `Suspense` does this. Frameworks such as Next.js split by route automatically.
- Lazy-load heavy features that are not needed on first paint: rich text editors, chart libraries, PDF viewers, maps.
- Run a bundle analyzer and look for surprises. Date libraries with every locale, icon packs imported as a whole, and duplicate copies of the same dependency are common findings.
- Keep server-only logic on the server. With [React Server Components](/blog/react-server-components-explained), components that only fetch and format data never ship their code to the browser.

```tsx
const ReportEditor = lazy(() => import("./ReportEditor"));

function ReportPage() {
  const [editing, setEditing] = useState(false);

  return editing ? (
    <Suspense fallback={<EditorSkeleton />}>
      <ReportEditor />
    </Suspense>
  ) : (
    <button onClick={() => setEditing(true)}>Edit report</button>
  );
}
```

## Remove data waterfalls

A common source of slowness that looks like a rendering problem is actually a network problem. A parent fetches, renders, then a child fetches, renders, then a grandchild fetches. Each step waits for the one before it. Look at the network panel: if requests start one after another instead of together, you have a waterfall.

Fixes include starting independent requests in parallel, fetching at the route level instead of deep in the tree, and using a data library that caches results so navigating back does not refetch. In the [Resume Analyzer](/projects/resume-analyzer), parsing a resume is the slow step, so I cache the parsed result and let every later view read from it instead of reprocessing the same file.

## Avoid layout shifts and heavy paints

Some performance issues are visual rather than computational. Images without dimensions push content around as they load, which hurts CLS and makes the page feel unstable. Always reserve space with `width` and `height`, or an aspect ratio. Lazy-load images below the fold, and serve modern formats at the size they are displayed.

Large CSS effects such as big blur filters, heavy shadows on many elements, or animations on properties that trigger layout can also cost more than any render. Animate `transform` and `opacity` where you can.

## When not to optimize

Optimization has a cost in complexity. Skip it when the interaction already feels instant on a throttled device, when the component renders rarely, or when the fix would make the code much harder to change. Readable code that is fast enough beats clever code that is slightly faster. Revisit when real-user metrics or a profile say otherwise.

## Key takeaways

- Profile the slow interaction first, on a throttled CPU, and keep the measurement to compare against.
- Most re-render problems are solved by moving state down or passing slow content as children, not by memoization.
- Use `memo`, `useMemo` and `useCallback` only where a profile shows real savings and inputs are stable.
- Keep input responsive with `useDeferredValue` or `useTransition`, and virtualize genuinely long lists.
- Reduce shipped JavaScript with route splitting, lazy-loaded heavy features and server-only code.

## Need a second pair of eyes on a slow React app

If you have a React app that feels sluggish and you are not sure where the time goes, I can profile it with you, explain what is causing the slowdown and fix the parts that matter. You can read more about my [React development](/react-developer) work, or [get in touch here](/hire-me) with a short description of the problem.
