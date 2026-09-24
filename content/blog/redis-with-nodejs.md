---
title: Redis with Node.js – Caching, Rate Limiting, Queues and Pub/Sub
description: How to use Redis with Node.js for caching, rate limiting, background job queues and pub/sub, with code, trade-offs and when to avoid each pattern.
category: nodejs
tags: [redis, nodejs, caching, rate limiting, bullmq, pub sub]
publishedAt: 2026-09-24
services: [nodejs-developer, backend-developer, api-development]
projects: [vercel-clone]
related: [nodejs-performance-optimization, nodejs-api-architecture, aws-deployment-architecture-for-saas]
featured: false
---

Redis with Node.js covers four jobs that most production APIs eventually need: caching expensive reads, rate limiting clients, running background jobs through a queue, and broadcasting events between processes with pub/sub. Each uses a different Redis data structure and has different failure modes, so it pays to understand them separately rather than treating Redis as a generic fast box.

## Connecting from Node

The two common clients are `ioredis` and the official `redis` package (node-redis). Both are solid. BullMQ requires `ioredis`, so if you plan to use queues, standardising on it avoids running two clients.

```ts
import Redis from "ioredis";

export const redis = new Redis(process.env.REDIS_URL!, {
  maxRetriesPerRequest: 3,
  enableReadyCheck: true,
});

redis.on("error", (err) => logger.error({ err }, "redis error"));
```

Create one client per process and reuse it. Opening a connection per request is a common and expensive mistake. Pub/sub subscribers and blocking queue consumers need their own dedicated connections, because a connection in subscriber mode cannot run normal commands.

## Caching

The standard pattern is cache-aside: check Redis, fall back to the database on a miss, then write the result back with a TTL.

```ts
export async function cached<T>(
  key: string,
  ttlSeconds: number,
  load: () => Promise<T>,
): Promise<T> {
  const hit = await redis.get(key);
  if (hit) return JSON.parse(hit) as T;

  const value = await load();
  await redis.set(key, JSON.stringify(value), "EX", ttlSeconds);
  return value;
}

// usage
const stats = await cached(`team:${teamId}:stats`, 60, () => computeTeamStats(teamId));
```

### Decisions that matter

- **Key design.** Namespace keys (`team:123:stats`) so you can reason about them and delete groups when needed. Include a version segment if the cached shape might change between deploys.
- **TTL.** Every cache key should expire. A missing TTL turns a cache into an unbounded, unmanaged database.
- **Invalidation.** For data that changes on writes, delete the key in the same code path that updates the database. Deleting is safer than rewriting, because a concurrent read will repopulate it with fresh data.
- **Stampedes.** When a popular key expires, many requests miss at once and all hit the database. A short lock with `SET key value NX EX 10`, or adding a small random jitter to TTLs, spreads the load.

### When not to cache

Do not cache data where staleness is a correctness bug, such as account balances or permission checks, unless you have airtight invalidation. Do not cache things that are already cheap; a primary-key lookup on an indexed table may be nearly as fast as a Redis round trip. And do not use Redis as the only copy of anything you cannot afford to lose, unless persistence is configured and understood.

## Rate limiting

Rate limiting protects your API from abuse and protects downstream services, such as an LLM provider, from your own traffic. Redis works well because the counter is shared across every instance of your API.

The simplest approach is a fixed window counter: increment a key per client per minute and reject once it passes the limit.

```ts
export async function rateLimit(clientId: string, limit: number, windowSec: number) {
  const window = Math.floor(Date.now() / 1000 / windowSec);
  const key = `rl:${clientId}:${window}`;

  const count = await redis.incr(key);
  if (count === 1) await redis.expire(key, windowSec);

  return { allowed: count <= limit, remaining: Math.max(0, limit - count) };
}
```

Fixed windows allow a burst at the boundary: a client can use its full quota at the end of one window and again at the start of the next. A sliding window, usually built with a sorted set of request timestamps, smooths that out at the cost of more memory per client. A token bucket implemented as a Lua script allows controlled bursts and is atomic. Libraries such as `rate-limiter-flexible` implement these well, and I usually prefer them to hand-rolled versions.

Choose the client identifier carefully. Per API key or per user is fair; per IP address penalises everyone behind a shared office or mobile network. Return `429` with a `Retry-After` header so well-behaved clients can back off.

## Background job queues

Anything slow or unreliable should leave the request path: sending emails, processing uploads, generating reports, calling LLMs. BullMQ is the most widely used Redis-backed queue for Node and handles retries, backoff, delays, priorities and concurrency.

```ts
import { Queue, Worker } from "bullmq";

const connection = { url: process.env.REDIS_URL! };
export const buildQueue = new Queue("builds", { connection });

// in the API: enqueue and return immediately
await buildQueue.add("build", { deploymentId }, {
  attempts: 3,
  backoff: { type: "exponential", delay: 5000 },
  removeOnComplete: 1000,
});

// in a separate worker process
new Worker("builds", async (job) => {
  await runBuild(job.data.deploymentId, (line) => job.log(line));
}, { connection, concurrency: 2 });
```

When I built the [Vercel clone](/projects/vercel-clone), builds were queued this way. The API recorded a deployment, pushed a job and returned straight away. Workers ran Docker builds with a fixed concurrency, so a burst of pushes queued up instead of overloading the build host.

### Queue rules worth following

- **Make jobs idempotent.** A job can run more than once after a crash or retry. Check state before acting, and use deterministic IDs where possible.
- **Pass IDs, not payloads.** Store the job's data in your database and put only the ID in the queue. Large payloads bloat Redis memory.
- **Run workers separately from the API.** They scale on different signals: API instances on request rate, workers on queue depth.
- **Clean up.** Set `removeOnComplete` and `removeOnFail` limits, or completed jobs accumulate in memory forever.
- **Use `noeviction`.** Queue data must not be evicted under memory pressure. If you also cache in Redis, consider a separate instance with an eviction policy for the cache.

## Pub/sub

Redis pub/sub lets one process publish a message on a channel and every subscribed process receive it. A common use is fanning out real-time events when you run several API instances: a user connected to instance A needs to hear about an event that happened on instance B.

```ts
const sub = redis.duplicate();
await sub.subscribe("deploy-events");

sub.on("message", (_channel, raw) => {
  const event = JSON.parse(raw);
  io.to(`deployment:${event.deploymentId}`).emit("log", event.line);
});

// anywhere else, including a worker process
await redis.publish("deploy-events", JSON.stringify({ deploymentId, line }));
```

This is how streamed build logs can reach a browser: the worker publishes each log line, and whichever API instance holds that user's WebSocket forwards it. For Socket.io specifically, the official Redis adapter does this wiring for you.

### Know the limits of pub/sub

Pub/sub is fire and forget. If no subscriber is connected when a message is published, it is gone. There is no history, no acknowledgement and no replay. That is fine for live log lines or presence updates, where a missed message is harmless. It is wrong for anything that must be processed, like payment events or emails. For those, use a queue, or Redis Streams, which keep messages, support consumer groups and let a restarted consumer pick up where it left off.

## Operating Redis in production

- Use a managed service such as ElastiCache, Upstash or Redis Cloud unless you have a reason to run it yourself.
- Set a `maxmemory` limit and pick an eviction policy that matches the workload: `allkeys-lru` for pure caches, `noeviction` for queues.
- Never run `KEYS *` in production. It blocks the server. Use `SCAN` to iterate.
- Watch memory usage, connected clients and command latency.
- Design your app to degrade when Redis is down. A cache miss should fall through to the database, not return a 500.

For more on where Redis fits alongside database tuning and profiling, see [Node.js performance optimization](/blog/nodejs-performance-optimization).

## Key takeaways

- Use cache-aside with namespaced keys and a TTL on every key, and invalidate by deleting on write.
- Rate limit per user or API key with a shared Redis counter, and return 429 with Retry-After.
- Move slow work to BullMQ, keep jobs idempotent, and run workers separately from the API.
- Pub/sub is great for live fan-out but loses messages with no subscriber; use a queue or Streams when delivery matters.
- Separate cache and queue workloads if they need different eviction policies.

## Getting Redis right in your stack

If you are adding caching, rate limits or background jobs to a Node API and want to avoid the usual production surprises, I am happy to help. See my [Node.js development](/nodejs-developer) and [API development](/api-development) work, or [get in touch](/hire-me) to talk it through.
