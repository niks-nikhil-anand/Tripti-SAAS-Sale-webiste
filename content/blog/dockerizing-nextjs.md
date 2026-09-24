---
title: Dockerizing Next.js Applications
description: A practical guide to dockerizing Next.js with standalone output, multi-stage builds, runtime env vars, caching across containers and deploying to AWS ECS.
category: nextjs
tags: [nextjs, docker, deployment, aws, devops]
publishedAt: 2026-09-24
services: [aws-developer, nextjs-developer]
projects: [vercel-clone]
related: [aws-deployment-architecture-for-saas, building-saas-with-nextjs]
featured: false
---

Dockerizing a Next.js application well comes down to three decisions: build with `output: "standalone"` so the image contains only what the server needs, use a multi-stage Dockerfile so build tools never reach production, and be deliberate about which environment variables are baked in at build time versus read at runtime. Get those right and the same image can move from staging to production unchanged. This guide covers the Dockerfile, the configuration around it, and the things that break once you run more than one container.

## Why standalone output matters

By default, `next build` produces a `.next` folder that expects your full `node_modules` to be present at runtime. That makes images large and slow to push. Setting `output: "standalone"` in `next.config.ts` tells Next.js to trace which files the server actually imports and copy only those into `.next/standalone`, along with a minimal `server.js` you run with plain `node`.

```ts
// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
};

export default nextConfig;
```

Two folders are not copied into the standalone output by default: `public` and `.next/static`. The assumption is that a CDN will serve them. If you are not using a CDN yet, copy them into the image yourself and `server.js` will serve them. Forgetting this step is the most common reason a dockerized Next.js app loads with no CSS or images.

## A production Dockerfile

Here is the multi-stage Dockerfile I use as a starting point. Next.js 16 needs Node.js 20.9 or newer, so pin a current LTS base image and update it on purpose rather than tracking `latest`.

```dockerfile
# syntax=docker/dockerfile:1

FROM node:22-slim AS base
WORKDIR /app

# 1. Install dependencies with a clean, reproducible install
FROM base AS deps
COPY package.json package-lock.json ./
RUN npm ci

# 2. Build the app
FROM base AS builder
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# Public values are inlined into the client bundle at this step
ARG NEXT_PUBLIC_SITE_URL
ENV NEXT_PUBLIC_SITE_URL=$NEXT_PUBLIC_SITE_URL
RUN npm run build

# 3. Minimal runtime image
FROM base AS runner
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV HOSTNAME=0.0.0.0
ENV PORT=3000

RUN groupadd --system --gid 1001 nodejs \
 && useradd --system --uid 1001 --gid nodejs nextjs

COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static
COPY --from=builder --chown=nextjs:nodejs /app/public ./public

USER nextjs
EXPOSE 3000
CMD ["node", "server.js"]
```

A few choices in there are worth explaining.

- The `deps` stage copies only the lockfile and `package.json` first. Docker caches that layer, so changing application code does not reinstall every dependency.
- `HOSTNAME=0.0.0.0` makes the server listen on all interfaces. Docker sets `HOSTNAME` to the container ID by default and `server.js` reads that variable, so without the override the server can bind to an address the load balancer cannot reach.
- The runtime stage runs as a non-root user. If the process is ever compromised, it cannot write to most of the filesystem.
- I use a Debian slim image rather than Alpine. Alpine images are smaller, but some native dependencies behave differently on musl. If you choose Alpine, test image optimisation and any native modules carefully. On glibc-based images, the Next.js docs note that image optimisation may need an alternative memory allocator to keep memory usage in check, so watch memory under load either way.

Pair it with a `.dockerignore` so the build context stays small and local artefacts never leak into the image:

```bash
# .dockerignore
node_modules
.next
.git
.env*
npm-debug.log
Dockerfile
docker-compose*.yml
```

Excluding `.env*` is important. Secrets should be injected by the platform at runtime, not copied into an image layer where anyone who pulls the image can read them.

## Build-time versus runtime environment variables

This is where most Docker deployments of Next.js go wrong. Variables prefixed with `NEXT_PUBLIC_` are inlined into the JavaScript bundle during `next build`. Once the image is built, changing them at runtime has no effect on client code. That is why the Dockerfile above passes `NEXT_PUBLIC_SITE_URL` as a build argument.

Server-side variables are different. Code that runs on the server can read `process.env` at request time, as long as that code actually runs at request time. If a page is prerendered during the build, any `process.env` read inside it is evaluated at build time too. To force a runtime read, call `await connection()` from `next/server` before reading the variable, or read it inside a component that already depends on request data.

The practical rule for a "build once, deploy everywhere" image:

1. Keep `NEXT_PUBLIC_` variables to values that are genuinely the same in every environment, or accept one image per environment for those.
2. Read secrets and environment-specific server values at runtime, never at build time.
3. Pass runtime values through your orchestrator (ECS task definitions, Kubernetes secrets) rather than `--build-arg`.

## Running more than one container

A single container with a persistent disk works without extra configuration. Once you scale horizontally behind a load balancer, several things need attention because each container has its own memory and its own disk.

### Shared cache

The Next.js cache for prerendered pages and cached data lives in memory and on local disk by default. With several containers, each has its own copy, so one container can serve a page that another has already revalidated. The fix is a custom cache handler backed by shared storage such as Redis, configured through `cacheHandler` in `next.config.ts`, and `cacheHandlers` for `"use cache"` entries if you use Cache Components. Setting `cacheMaxMemorySize: 0` disables the per-container in-memory layer so every instance reads from the shared store.

### Server Action encryption key

Next.js encrypts Server Action closure variables with a key generated per build. If different containers were built separately, a request encrypted by one cannot be decrypted by another, and users see "Failed to find Server Action" errors. Set `NEXT_SERVER_ACTIONS_ENCRYPTION_KEY` to the same base64 value for the build, or better, build one image and run it everywhere.

### Version skew during rolling deploys

During a rolling deployment, old and new containers serve traffic at the same time. A browser that loaded JavaScript from the old version might request a chunk that the new version does not have. Configure a `deploymentId` in `next.config.ts`, typically your Git commit SHA, so Next.js can detect the mismatch and recover with a full page load instead of a broken navigation.

## Health checks and a reverse proxy

Orchestrators need a way to know a container is ready. A tiny Route Handler at `/api/health` that returns 200 without touching the database is enough for liveness. If you want a readiness check that verifies database connectivity, keep it separate so a slow database does not cause the orchestrator to kill healthy containers in a loop.

In production, put a reverse proxy or load balancer in front of the Next.js server rather than exposing it directly. It handles TLS, slow clients, request size limits and rate limiting, so the Node process can spend its time rendering. On AWS that is usually an Application Load Balancer, often with CloudFront in front for static assets.

## Deploying the image to AWS

The path I use most on AWS is straightforward:

1. Build the image in CI (GitHub Actions or GitLab CI) with the commit SHA as the tag.
2. Push it to Amazon ECR.
3. Update an ECS service on Fargate with a new task definition that references the tag, with secrets pulled from Secrets Manager or SSM Parameter Store.
4. Let the ALB health checks gate the rolling deployment, and roll back by pointing the service at the previous tag.

For a static-heavy site, serve `.next/static` and `public` from S3 behind CloudFront using `assetPrefix`, which takes load off the containers. There is a longer walkthrough of how the pieces fit together in [AWS deployment architecture for SaaS](/blog/aws-deployment-architecture-for-saas).

## What I learned building the Vercel clone

The [Vercel clone case study](/projects/vercel-clone) was a deployment platform, so Docker sat at the centre of it: every connected repository was built in an isolated container, builds were queued so they did not compete for resources, and build logs were streamed back to the dashboard as they happened. Running many builds made the value of layer ordering obvious. Copying the lockfile before the source and installing dependencies in their own stage meant repeat builds of the same project could skip the slowest step. The same isolation mindset applies to a single app: the build environment and the runtime environment should share nothing except the output.

## When not to use Docker for Next.js

Docker is not always the right answer. If you deploy to a platform with a verified Next.js adapter and you do not need to control the runtime, that platform handles caching, image optimisation and skew protection for you, and a Dockerfile adds work without much benefit. For local development on macOS or Windows, `npm run dev` directly on the host is usually faster than running the dev server inside a container. Docker earns its place when you need portability across clouds, a consistent runtime with other services, or tight control over infrastructure and cost.

## Key takeaways

- Use `output: "standalone"` and copy `public` and `.next/static` into the image yourself if there is no CDN.
- Use a multi-stage build, a non-root user, and a `.dockerignore` that excludes `.env` files.
- `NEXT_PUBLIC_` values are fixed at build time; read everything else at runtime so one image fits every environment.
- With multiple containers, share the cache, pin the Server Action key and set a `deploymentId`.
- Put a load balancer or reverse proxy in front, and use health checks that do not depend on the database.

## Need help shipping Next.js in containers?

If you are moving a Next.js app onto Docker and AWS, or your current setup has stale pages and failed Server Actions after deploys, I can help set up the image, the pipeline and the infrastructure around it. Take a look at my [AWS development](/aws-developer) work, or [send me a message through the hire me page](/hire-me) with a short description of your current setup.
