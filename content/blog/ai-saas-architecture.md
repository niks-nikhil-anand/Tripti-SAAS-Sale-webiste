---
title: AI SaaS Architecture – How to Build LLM Products That Hold Up
description: AI SaaS architecture explained. Learn how to structure LLM calls, pipelines, RAG, queues, cost controls, evaluation and multi-tenant data safely.
category: saas
tags: [ai saas, llm, architecture, openai, rag, saas]
publishedAt: 2026-09-24
services: [saas-development, ai-developer]
projects: [blog-automation, resume-analyzer]
related: [llm-streaming-architecture, rag-architecture-explained, building-saas-with-nextjs]
featured: false
---

A solid AI SaaS architecture treats the LLM as an unreliable, slow and metered external dependency, and builds the product around that fact. In practice that means a normal SaaS core (auth, tenants, billing, a relational database), an AI layer that wraps every model call behind your own interface, background pipelines for anything multi-step, and explicit controls for cost, quality and data isolation.

## What makes AI SaaS different from regular SaaS

A traditional SaaS request is deterministic and fast: read some rows, apply rules, return a result. An AI feature breaks all three assumptions.

- **Latency** can range from a second to well over a minute for multi-step chains.
- **Output** is non-deterministic and sometimes wrong, malformed or off-topic.
- **Cost** scales with tokens, so one heavy user or a prompt bug can dominate your bill.
- **Dependencies** are external providers with their own rate limits, outages and model changes.

Architecture decisions should follow directly from those four properties. The non-AI foundations still matter just as much, and they should be in place before the AI layer goes on top.

## The layers

This is the structure I use when adding AI to a product or building an AI-first one.

1. **Product core.** Users, organisations, plans, permissions and the main relational data in Postgres. Nothing AI-specific here.
2. **AI gateway.** A single internal module through which every model call passes. It picks the provider and model, applies timeouts and retries, records token usage per tenant, and enforces limits.
3. **Pipelines.** Multi-step AI workflows run as background jobs, with each step persisted so failures can resume.
4. **Retrieval.** Embeddings and a vector database such as Qdrant or pgvector, when the product needs to ground answers in user or company data.
5. **Delivery.** Streaming for interactive responses, job status updates for long pipelines.
6. **Evaluation and observability.** Logged prompts, outputs, latency and cost, plus test sets you run when prompts or models change.

## The AI gateway is the most important piece

Calling the OpenAI or Gemini SDK directly from twenty places in the codebase is how AI products become impossible to change. Wrap it once.

```ts
type CompletionRequest = {
  tenantId: string;
  feature: "resume_analysis" | "blog_outline" | "chat";
  messages: { role: "system" | "user" | "assistant"; content: string }[];
  schema?: ZodSchema;
  maxTokens?: number;
};

export async function complete(req: CompletionRequest) {
  await assertWithinBudget(req.tenantId, req.feature);

  const model = pickModel(req.feature);          // per-feature routing
  const started = Date.now();

  const res = await withRetry(() => provider.chat({
    model,
    messages: req.messages,
    max_tokens: req.maxTokens ?? 1024,
    response_format: req.schema ? { type: "json_object" } : undefined,
  }), { attempts: 2, timeoutMs: 60_000 });

  await recordUsage(req.tenantId, req.feature, model, res.usage, Date.now() - started);

  return req.schema ? req.schema.parse(JSON.parse(res.text)) : res.text;
}
```

With that one module in place you can:

- Switch providers or route through OpenRouter without touching feature code.
- Use a cheaper model for simple steps and a stronger one where quality matters.
- Enforce per-tenant quotas tied to their billing plan.
- Validate structured output against a schema and retry once on a parse failure.
- See cost and latency per feature, which is what you need to price the product.

## Pipelines, not single prompts

Useful AI features are rarely one prompt. They are a chain of steps, some AI and some ordinary code, and each step can fail.

In my [AI blog automation](/projects/blog-automation) project the flow runs from a trending topic through keyword research, outline, draft generation and SEO processing, then waits for human review before publishing. Treating each of those as a separate step, with its own stored input and output, is what makes a chain like that manageable. A failed generation can retry that one step instead of the whole chain, and the review gate keeps a person in control of what actually goes live.

Qdrant sits alongside that pipeline for two jobs: finding existing articles to link to internally, and checking whether a new topic is too close to something already published. That is a good example of vector search used for product logic, not just chatbot retrieval.

### How to structure a pipeline

- Model each run as a record with a status and a current step.
- Run steps in a queue worker, never inside an HTTP request.
- Persist every intermediate output, so you can debug, resume and show progress.
- Make steps idempotent, because retries will happen.
- Put human review where a wrong output is expensive, instead of trying to make the model perfect.

## Caching and deduplication

LLM calls are slow and billed, so never pay twice for the same work. In the Resume Analyzer project, the parsed text of an uploaded resume is cached, so comparing one resume against several job descriptions reuses the parse instead of repeating it. The same idea applies elsewhere: cache embeddings by content hash, cache deterministic transforms, and store results that users are likely to reopen.

Be careful with caching free-form chat responses. Two prompts that look the same can depend on different context, and serving a cached answer across tenants is a data leak.

## Retrieval when you need grounding

If answers must come from the customer's own documents, you need retrieval-augmented generation: chunk and embed documents in a background job, store vectors with tenant metadata, retrieve relevant chunks at query time, and pass them to the model with instructions to cite them. [RAG architecture explained](/blog/rag-architecture-explained) goes into chunking, retrieval quality and citation in detail.

Not every AI SaaS needs RAG. If the model only transforms input the user provides, such as rewriting text or analysing a single uploaded file, retrieval adds cost and complexity for no gain.

## Multi-tenant data safety

AI features create new ways to leak data between customers, so isolation must be explicit.

- Filter every vector query by `tenantId` in the database query itself, not after results come back.
- Never mix different tenants' content in one prompt.
- Keep system prompts server-side and treat all user-supplied and retrieved text as untrusted input that may contain prompt injection.
- Give agents and tools the least privilege possible, and require confirmation for actions with side effects.
- Check your provider's data retention settings, and document what you send to third parties for customers who ask.

## Latency and user experience

For interactive features, stream tokens to the client so users see progress immediately. For long pipelines, return a job ID and show step-by-step status. Both are better than a spinner that runs for forty seconds and then fails.

Reduce latency structurally: shorter prompts, smaller models for simple steps, parallel independent calls, and fewer round trips in agent loops. Streaming across a Next.js frontend and Node backend has its own patterns, covered in [LLM streaming architecture](/blog/llm-streaming-architecture).

## Evaluation is part of the architecture

Prompts and models change, and a tweak that improves one case often breaks another. Keep a small set of representative inputs with expected properties, such as valid JSON, required fields present, no invented facts, correct language, and run them whenever you change a prompt or switch models. Log production inputs and outputs, with consent and redaction, so you can add real failures to that set. Without this, every prompt change is a guess.

## When to keep it simple

If you are validating an idea, one well-designed prompt behind a thin gateway, a queue for slow calls and basic usage logging is enough. Add pipelines, retrieval, routing across models and evaluation suites when real users and real failure cases justify them. The one thing worth doing from the start is the gateway, because retrofitting it later means touching every AI feature.

## Key takeaways

- Treat the LLM as a slow, metered, unreliable dependency and design around it.
- Route every model call through one AI gateway that handles models, retries, schemas, quotas and usage tracking.
- Build multi-step features as persisted, resumable background pipelines with human review where it matters.
- Cache expensive, repeatable work, and enforce tenant isolation in every prompt and vector query.
- Evaluate prompt and model changes against a fixed test set before shipping them.

## Building an AI product

If you are planning an AI SaaS or adding LLM features to an existing product, I can help design the architecture, build the pipelines and put cost and quality controls in place from the start. Have a look at my [SaaS development](/saas-development) and [AI development](/ai-developer) work, or [get in touch](/hire-me) to talk through what you are building.
