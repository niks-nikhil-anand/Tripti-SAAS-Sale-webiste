---
title: React State Management Guide – Local, Context, Zustand, URL
description: A React state management guide that sorts state by kind and shows when to use local state, context, Zustand, a server cache or the URL, with code.
category: react
tags: [react, state management, zustand, tanstack query, context]
publishedAt: 2026-09-24
services: [react-developer, frontend-developer]
projects: [resume-analyzer]
related: [react-performance-optimization, production-react-dashboard, react-server-components-explained]
featured: false
---

Good React state management starts with sorting state by what it is, not by which library is popular. Local UI state belongs in `useState`, rarely-changing app-wide values fit in context, shared client state that changes often suits a small store like Zustand, data from your API belongs in a server cache such as TanStack Query, and anything a user should be able to bookmark or share belongs in the URL. Most messy codebases I have seen put all five kinds in one place.

## Start by naming the kind of state

Before picking a tool, ask where the truth for this value lives and who needs it.

- Local UI state. Whether a dropdown is open, the current value of an input, which accordion item is expanded. One component, or a small subtree, cares.
- Shared client state. Values owned by the browser that several distant components read: a sidebar that collapses, a multi-step wizard's draft, the selected items in a list with a bulk action bar.
- Server state. Data that lives in your database and is only borrowed by the UI: users, orders, reports. It can go stale, other people can change it, and it needs loading and error states.
- URL state. Filters, search terms, sort order, pagination, the active tab. Anything a user expects to survive a refresh, work with the back button or share as a link.
- Form state. Field values, validation errors, touched and submitting flags while the user edits something.

Each kind has different requirements for persistence, freshness and sharing, which is why one tool rarely fits them all.

## Local state first

`useState` and `useReducer` should be your default. Keep state in the lowest component that needs it, and lift it only as far as the nearest common parent when two siblings need the same value.

Use `useReducer` when several values change together or the next state depends on the previous one in non-trivial ways. A reducer puts the transitions in one place and makes them easy to test.

### Do not store what you can derive

A frequent bug source is keeping a second copy of something you could calculate. If you have `items` and a `filter`, compute `visibleItems` during render instead of storing it in state and syncing it with an effect. The copy will eventually drift out of sync, and the effect adds an extra render. If the calculation is expensive, wrap it in `useMemo`, as covered in the [React performance optimization guide](/blog/react-performance-optimization).

## Context for values that rarely change

Context solves prop drilling. It is a good fit for values that many components read and that change rarely: the current theme, the signed-in user, locale, feature flags, or a dependency such as an API client.

Context is not a state manager by itself. It is a way to pass a value down the tree. When the value changes, every component that reads that context re-renders. For a theme that changes once a session, that is fine. For a value that changes on every keystroke or every second, it becomes a performance problem.

If you do use context for state, keep a few habits:

- Split unrelated values into separate contexts so a change in one does not re-render readers of another.
- Memoize the provider value so it is not a new object on every render of the provider.
- Put the provider as low in the tree as it can go.

## Zustand for shared client state

When several unrelated components need to read and update the same client-owned value, and it changes often, a small external store is simpler than a stack of contexts. Zustand is my usual pick because the store is a hook, there is no provider to wrap, and components subscribe to just the slice they select.

```ts
import { create } from "zustand";

type SelectionState = {
  selectedIds: string[];
  toggle: (id: string) => void;
  clear: () => void;
};

export const useSelection = create<SelectionState>((set) => ({
  selectedIds: [],
  toggle: (id) =>
    set((state) => ({
      selectedIds: state.selectedIds.includes(id)
        ? state.selectedIds.filter((x) => x !== id)
        : [...state.selectedIds, id],
    })),
  clear: () => set({ selectedIds: [] }),
}));

// Re-renders only when the count changes.
const count = useSelection((s) => s.selectedIds.length);
```

The selector is the important part. A component that reads `s.selectedIds.length` re-renders only when that number changes, not when any other field in the store changes. If a selector returns a new object or array each time, wrap it with `useShallow` from `zustand/react/shallow` so Zustand compares the contents instead of the reference.

When not to use a store: if only one component tree uses the value, local state is simpler. If the value comes from the server, a store is the wrong home, which is the next section.

## A server cache for API data

The largest simplification most apps can make is to stop treating server data as client state. Copying API responses into Redux or Zustand means you now own caching, deduplication, refetching, loading flags, error handling and invalidation by hand.

A server cache library such as TanStack Query or SWR handles those for you. You describe the data by a key and a fetch function, and the library caches it, shares it between components, deduplicates identical requests, and refetches when the data is stale.

```tsx
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

function useProject(id: string) {
  return useQuery({
    queryKey: ["project", id],
    queryFn: () => api.getProject(id),
    staleTime: 30_000,
  });
}

function useRenameProject(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (name: string) => api.renameProject(id, name),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["project", id] });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
}
```

Design query keys like a small API: include every input that changes the result, such as IDs, filters and page numbers. Then invalidation becomes a matter of naming the keys a mutation affects.

In a Next.js App Router project, a lot of this moves to [React Server Components](/blog/react-server-components-explained), which fetch on the server before the page is sent. A client cache is still useful for data that changes while the user is on the page, like polling a job status or paginating without a full navigation.

## The URL for shareable state

If a user filters a table, sorts it and goes to page three, then refreshes, they expect to land on the same view. If they send the link to a colleague, the colleague should see it too. That state belongs in the URL query string, not in `useState`.

```tsx
// React Router; Next.js has an equivalent useSearchParams hook
import { useSearchParams } from "react-router-dom";

function useTableParams() {
  const [params, setParams] = useSearchParams();

  const status = params.get("status") ?? "all";
  const page = Number(params.get("page") ?? "1");

  const update = (next: Record<string, string>) => {
    setParams((prev) => {
      const merged = new URLSearchParams(prev);
      Object.entries(next).forEach(([k, v]) => merged.set(k, v));
      return merged;
    });
  };

  return { status, page, update };
}
```

Reading from the URL also makes it the single source of truth. Pass these values into your query keys and the server cache refetches automatically when the filters change.

Keep it to things that belong in a link. Hover state, open modals that should not reopen on refresh, and sensitive values do not go in the URL. Also parse and validate what you read, because users can type anything into a query string.

## Forms are their own kind of state

Forms have state that nobody else needs until submit: field values, errors, which fields were touched. Keeping every keystroke in a global store is wasteful. For small forms, uncontrolled inputs with native form actions or plain `useState` are enough. For large forms with validation rules, a library like React Hook Form paired with a schema validator keeps re-renders low and puts validation in one place. Validate again on the server regardless.

## Putting it together

Here is the decision order I use for any new piece of state:

1. Can it be derived from existing state or props? Compute it, do not store it.
2. Does it come from the server? Use the server cache or server components.
3. Should it survive a refresh or be shareable? Put it in the URL.
4. Is it only needed by one component or a small subtree? Use local state.
5. Is it app-wide and rarely changing? Use context.
6. Is it shared client state that changes often? Use a store like Zustand.

A tool like the [Resume Analyzer](/projects/resume-analyzer) shows why the split matters. The analysis of a resume is server data that should be cached and reused, while whichever suggestion the user is looking at right now is local UI state. Keeping them apart means browsing suggestions never touches the cached analysis.

## Key takeaways

- Classify state first: local UI, shared client, server, URL and form state each have different needs.
- Derive values during render instead of syncing copies with effects.
- Use context for rarely-changing app-wide values, and a selector-based store like Zustand for frequently-changing shared client state.
- Keep API data in a server cache or server components, not in a client store.
- Put filters, sorting, pagination and tabs in the URL so views survive refresh and can be shared.

## Untangling state in your app

If your React codebase has state spread across contexts, stores and effects that keep each other in sync, it can usually be simplified without a rewrite. I help teams with this as part of my [frontend development](/frontend-developer) work. [Get in touch](/hire-me) and tell me a bit about the app.
