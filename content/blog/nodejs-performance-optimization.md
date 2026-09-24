---
title: Node.js Performance Optimization – Find and Fix Real Bottlenecks
description: A practical guide to Node.js performance optimization. Profile first, then fix event loop blocking, slow queries, memory leaks and I/O waste.
category: nodejs
tags: [nodejs, performance, profiling, event loop, postgresql]
publishedAt: 2026-09-24
services: [nodejs-developer, backend-developer]
projects: [resume-analyzer]
related: [nodejs-api-architecture, redis-with-nodejs, reduce-llm-latency]
featured: false
---

Node.js performance optimization starts with measurement, not tweaks. In most slow Node services the cause is one of four things: synchronous work blocking the event loop, inefficient database access, unbounded concurrency against a downstream service, or memory growth that triggers constant garbage collection. Find which one you have, fix that, and measure again.

## Understand the model before optimising it

Node runs your JavaScript on a single thread with an event loop. I/O such as network calls, disk reads and database queries is handed off and does not block that thread. CPU work does. While a request is parsing a large JSON payload or hashing a password synchronously, every other request on that process waits.

That gives you a simple mental test for any slow endpoint: is the time spent waiting on something (I/O bound) or computing something (CPU bound)? The fixes are completely different.

- **I/O bound**: fewer round trips, better queries, caching, parallelising independent calls, connection pooling.
- **CPU bound**: move the work off the main thread, do less of it, or do it ahead of time.

## Measure first

Guessing is the most common performance mistake. Before changing code, get numbers for the endpoint you care about.

1. Reproduce the load with a tool such as `autocannon` or `k6` against a staging environment with realistic data volumes.
2. Record p50, p95 and p99 latency, not just the average. Tail latency is what users feel.
3. Watch event loop delay. Node exposes it through `perf_hooks.monitorEventLoopDelay`, and most APM tools graph it.
4. Profile. `node --cpu-prof` writes a profile you can open in Chrome DevTools, and Clinic.js gives flame graphs and a quick diagnosis of whether you are CPU, I/O or GC bound.

```ts
import { monitorEventLoopDelay } from "node:perf_hooks";

const h = monitorEventLoopDelay({ resolution: 20 });
h.enable();

setInterval(() => {
  // values are in nanoseconds
  logger.info({
    eventLoopP99Ms: h.percentile(99) / 1e6,
    eventLoopMaxMs: h.max / 1e6,
  }, "event loop delay");
  h.reset();
}, 10_000);
```

If event loop delay spikes while latency spikes, you have blocking CPU work. If the loop is healthy but requests are slow, you are waiting on I/O.

## Fixing event loop blocking

Common culprits I see in real codebases:

- `JSON.parse` or `JSON.stringify` on very large payloads.
- Synchronous APIs such as `fs.readFileSync`, `crypto.pbkdf2Sync` or `zlib.gzipSync` inside request handlers.
- Regular expressions with catastrophic backtracking on user input.
- Sorting or transforming large arrays in memory that the database could have handled.
- PDF parsing, image processing and other heavy libraries running inline.

For genuinely CPU-heavy work, use `worker_threads` or a job queue. A worker pool such as Piscina keeps a fixed number of threads ready and avoids the cost of spawning one per request. For work that can be deferred entirely, a queue with separate worker processes is simpler to operate and scales independently.

In the [Resume Analyzer](/projects/resume-analyzer), parsing an uploaded PDF is the expensive step, and the same resume is often analysed against several job descriptions. Caching the parsed text meant the parse happened once, and later comparisons skipped straight to the analysis. Doing less work is usually a bigger win than doing the same work faster.

## Database access is usually the real bottleneck

In a typical CRUD API, most request time is spent waiting on the database. The fixes are well known but frequently skipped.

### Kill N+1 queries

An ORM makes it easy to load a list, then loop over it and load a relation for each item. That turns one query into many. With Prisma, use `include` or `select` for relations; with raw SQL, use a join or a single `WHERE id = ANY($1)` query.

### Index for the queries you actually run

Run `EXPLAIN ANALYZE` on slow queries. A sequential scan on a large table filtered by `user_id` or `created_at` usually means a missing index. Composite indexes should match the order of your filter and sort columns.

### Select only what you need

Returning every column, including large JSON or text fields, costs database time, network time and serialisation time in Node. Be explicit about the fields each endpoint needs.

### Pool connections correctly

Opening a connection per request is slow. Use a pool, size it to what the database can handle across all instances, and remember that ten containers each with a pool of twenty is two hundred connections. In serverless environments, put a pooler such as PgBouncer or RDS Proxy in front of Postgres.

## Parallelise independent I/O, but bound it

Sequential `await` calls that do not depend on each other add their latencies together.

```ts
// Slow: three round trips in series
const user = await getUser(id);
const plan = await getPlan(id);
const usage = await getUsage(id);

// Faster: independent calls in parallel
const [user, plan, usage] = await Promise.all([
  getUser(id),
  getPlan(id),
  getUsage(id),
]);
```

The opposite problem is just as real. `Promise.all` over thousands of items fires thousands of concurrent requests, which can exhaust your connection pool or get you rate limited by a third party. Use a concurrency limiter such as `p-limit` to cap in-flight work.

## Caching, carefully

A cache helps when the same expensive result is requested repeatedly and a little staleness is acceptable. Good candidates are computed dashboards, third-party API responses, feature flags and configuration. Bad candidates are anything user-specific that changes often, or anything where serving stale data is a correctness bug.

An in-process cache (a simple LRU) is fastest but is not shared across instances and is lost on restart. Redis is shared and survives deploys, at the cost of a network hop. I go through cache-aside, TTLs and invalidation in [Redis with Node.js](/blog/redis-with-nodejs).

## Memory and garbage collection

Memory leaks in Node usually come from something holding references longer than intended: a module-level `Map` used as a cache with no eviction, event listeners added per request and never removed, or closures capturing large objects in long-lived timers.

Symptoms are steadily rising heap usage and increasing GC pauses, which show up as latency spikes. To investigate, take two heap snapshots a few minutes apart under load and compare them in DevTools to see which object types are growing.

Also stream large payloads instead of buffering them. Reading a large file or query result into memory and then sending it doubles peak memory. `stream.pipeline` with a readable source and the response as the destination keeps memory flat.

## Runtime and HTTP-level wins

- Enable compression at the load balancer or CDN rather than in Node, so the CPU cost is not on your event loop.
- Use HTTP keep-alive for outbound requests so you are not paying for a new TCP and TLS handshake each call. Recent Node versions enable keep-alive on the global agent by default, but check the client library you use.
- Serve static assets from a CDN, not from Express.
- Run one Node process per CPU core, either with the cluster module or, more commonly, by running several containers behind a load balancer.
- Keep Node reasonably current. Each major release brings V8 improvements you get for free.

## When not to optimise

If an endpoint is called rarely and responds well within what users tolerate, leave it alone. Clever micro-optimisations such as replacing `map` with a manual loop rarely matter compared with one missing index. Optimise the hot paths that profiling shows you, and keep the rest readable. A clear [Node.js API architecture](/blog/nodejs-api-architecture) with separate data and service layers makes it much easier to find and fix those hot paths without touching everything else.

## Key takeaways

- Measure p95 and p99 latency and event loop delay before changing anything.
- Decide whether a slow path is CPU bound or I/O bound, because the fixes differ.
- Most wins come from the database: remove N+1 queries, add the right indexes, select fewer columns, pool connections.
- Parallelise independent I/O with `Promise.all`, but cap concurrency for large batches.
- Move heavy CPU work to worker threads or a queue, and cache results that are expensive and repeatable.

## Want a second pair of eyes

If your Node service is slow under load and you are not sure where the time is going, I can help profile it, find the real bottleneck and fix it without a rewrite. See my [Node.js development](/nodejs-developer) and [backend development](/backend-developer) work, or [reach out](/hire-me) with what you are seeing.
