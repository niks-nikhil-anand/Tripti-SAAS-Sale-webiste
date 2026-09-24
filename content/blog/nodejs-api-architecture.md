---
title: Node.js API Architecture – Layers, Boundaries and Patterns
description: How to structure a Node.js API that stays maintainable. Learn routes, services and repositories, validation, error handling, config and testing.
category: nodejs
tags: [nodejs, api design, express, architecture, typescript]
publishedAt: 2026-09-24
services: [nodejs-developer, api-development, backend-developer]
projects: [vercel-clone]
related: [nodejs-performance-optimization, redis-with-nodejs, aws-deployment-architecture-for-saas]
featured: false
---

A good Node.js API architecture separates three concerns: the HTTP layer that parses requests, a service layer that holds business rules, and a data layer that talks to the database. Keep those boundaries honest, validate input at the edge, and centralise error handling, and most of the pain people blame on Node.js goes away.

## Why structure matters more in Node.js than elsewhere

Express, Fastify and most Node frameworks are deliberately unopinionated. They give you a router and middleware and leave the rest to you. That freedom is great on day one and expensive by month six, when a single route handler validates input, queries Postgres, calls Stripe, sends an email and formats the response all in one function.

The fix is not a heavy framework. It is a small set of conventions that every file in the codebase follows, so that anyone opening a folder knows where a given kind of logic lives.

## A layered layout that scales

This is the folder structure I reach for on most APIs. It groups code by feature (a "module") first, and by layer inside each module.

```bash
src/
  app.ts              # builds the Express app, registers middleware
  server.ts           # starts listening, handles shutdown signals
  config/
    env.ts            # parses and validates environment variables
  lib/
    db.ts             # Prisma or pg client
    logger.ts
    errors.ts         # AppError classes
  modules/
    projects/
      projects.routes.ts
      projects.controller.ts
      projects.service.ts
      projects.repository.ts
      projects.schema.ts
      projects.test.ts
    deployments/
      ...
```

Grouping by feature means a change to "projects" usually touches one folder. Grouping purely by layer (all controllers in one folder, all services in another) looks tidy at first but forces you to jump across the tree for every change.

### What each layer is allowed to do

- **Routes** map an HTTP method and path to a controller, and attach middleware such as auth and validation. No logic.
- **Controllers** translate HTTP into function calls. They read `req.params`, `req.body` and `req.user`, call a service, and shape the response. They never touch the database.
- **Services** hold business rules. They know nothing about `req` or `res`, which makes them easy to test and reuse from a queue worker or a CLI script.
- **Repositories** own the queries. If you swap an ORM or add caching, this is the only layer that changes.
- **Schemas** define the shape of input and output, usually with Zod, so types and runtime validation come from one source.

The single most useful rule here is that services must not import anything from Express. The moment a service reads `req`, you can no longer call it from a background job.

## Validating at the edge

Every byte that enters your API is untrusted. Validate it once, at the boundary, and let the rest of the code assume clean, typed data. A small middleware that runs a Zod schema keeps controllers short.

```ts
import { z, ZodSchema } from "zod";
import type { Request, Response, NextFunction } from "express";

export const createProjectSchema = z.object({
  name: z.string().min(1).max(80),
  repoUrl: z.string().url(),
  framework: z.enum(["nextjs", "vite", "static"]),
});

export function validate(schema: ZodSchema) {
  return (req: Request, _res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      return next(new ValidationError(result.error.flatten()));
    }
    req.body = result.data;
    next();
  };
}
```

Validate query strings and route params the same way. A surprising number of bugs come from `req.query.page` being the string `"2"` rather than the number `2`.

## Centralised error handling

Scattered `try/catch` blocks that each call `res.status(500).json(...)` produce inconsistent responses and leak stack traces. Instead, define a small hierarchy of error classes and one error-handling middleware at the end of the chain.

```ts
export class AppError extends Error {
  constructor(public status: number, public code: string, message: string) {
    super(message);
  }
}
export class NotFoundError extends AppError {
  constructor(what: string) { super(404, "not_found", `${what} not found`); }
}

// last middleware registered in app.ts
app.use((err: unknown, req: Request, res: Response, _next: NextFunction) => {
  if (err instanceof AppError) {
    return res.status(err.status).json({ error: { code: err.code, message: err.message } });
  }
  req.log.error({ err }, "unhandled error");
  res.status(500).json({ error: { code: "internal", message: "Something went wrong" } });
});
```

Services throw `NotFoundError` or `ForbiddenError`; controllers do not catch them. Express 5 forwards rejected promises from async handlers to the error middleware, so you no longer need an `asyncHandler` wrapper there. On Express 4 you still do.

## Configuration and startup

Read environment variables in exactly one file, validate them with a schema, and export a typed `config` object. If a required variable is missing, crash at startup with a clear message rather than failing on the first request that needs it.

Keep `app.ts` (which builds the app) separate from `server.ts` (which calls `listen`). That lets integration tests import the app and hit it with Supertest without opening a real port. In `server.ts`, handle `SIGTERM` by stopping new connections, letting in-flight requests finish, and closing database pools. Containers on ECS or Kubernetes send `SIGTERM` before killing a task, and ignoring it causes dropped requests on every deploy.

## Authentication and authorization as separate steps

Authentication answers "who is this?" and belongs in middleware that verifies a JWT or session and attaches `req.user`. Authorization answers "can they do this to this resource?" and belongs in the service, because it usually depends on data: does this user belong to the team that owns this project?

When I built the [Vercel clone](/projects/vercel-clone), team access worked this way. The route middleware confirmed a valid session, and the deployment service checked team membership before queuing a build. Putting the membership check in the service meant the same rule applied whether a build was triggered by the dashboard or by a GitHub webhook.

## Long-running work does not belong in the request

If an endpoint triggers something slow, such as a Docker build, a PDF parse or an LLM call chain, accept the request, write a job record, push it to a queue and return `202 Accepted` with a job ID. A separate worker process picks it up. The client polls or subscribes to status updates.

This keeps request latency predictable and lets you scale workers independently of the API. Redis-backed queues such as BullMQ are a common choice; I cover the trade-offs in [Redis with Node.js](/blog/redis-with-nodejs).

## API design conventions worth agreeing on early

- One response envelope for errors, with a stable machine-readable `code`.
- Cursor-based pagination for any list that can grow, instead of offset pagination that slows down on large tables.
- Idempotency keys on endpoints that create payments or trigger side effects, so retries are safe.
- Versioning through a URL prefix such as `/v1` only when you have external consumers. For an internal API used by your own frontend, it is often unnecessary overhead.
- Consistent naming: plural nouns for collections, no verbs in paths unless the action genuinely is not a resource.

## Testing the layers

The layering pays off most in tests. Services can be unit tested with a fake repository, which keeps tests fast and focused on business rules. A thinner set of integration tests runs the real app against a real database (a Docker Postgres container in CI works well) to confirm the wiring, validation and error responses.

Avoid mocking Express itself. If you find yourself building fake `req` and `res` objects to test logic, that logic is in the wrong layer.

## When not to use all of this

A webhook receiver with two endpoints, or an internal script exposed over HTTP, does not need five files per feature. Start with routes and a service file, and split out repositories and schemas once the module grows. Architecture should match the size of the problem. The boundaries matter more than the file count: even in a tiny service, keep HTTP concerns out of your business logic.

Also resist adding a dependency-injection container on day one. Plain constructor parameters or factory functions give you most of the testability with none of the magic.

## Key takeaways

- Split code by feature first, then by layer: routes, controllers, services, repositories, schemas.
- Services must never import Express, so they can be reused from workers and tested in isolation.
- Validate all input once at the edge with a schema, and handle every error in one middleware.
- Move slow work to a queue and return a job ID instead of blocking the request.
- Scale the structure to the problem, but keep the boundaries even in small services.

## Need help with your API

If you are starting a new backend or untangling one that has grown messy, I can help design the module boundaries, set up validation and error handling, and get the deployment path right. Take a look at my [Node.js development](/nodejs-developer) and [API development](/api-development) work, or [get in touch](/hire-me) to talk about your project.
