---
title: How to Reduce LLM Latency
description: Practical ways to reduce LLM latency, covering time-to-first-token, prompt size, caching, model choice, parallel calls, streaming and speculative UI.
category: ai
tags: [llm, latency, performance, caching, streaming]
publishedAt: 2026-09-24
services: [llm-developer]
projects: [ai-avatar]
related: [llm-streaming-architecture, redis-with-nodejs, building-ai-agents]
featured: false
---

To reduce LLM latency, first measure where the time goes, then attack the biggest piece: send fewer input tokens, ask for fewer output tokens, pick the smallest model that does the job, cache what repeats, run independent calls in parallel, and stream so users see progress early. Most slow LLM features are slow because of the application around the model, not the model itself. This guide goes through each lever in the order I usually reach for them.

## Measure before you optimise

Total latency for one LLM call splits into parts that behave differently. There is network and queueing time before the provider starts, then time-to-first-token (TTFT), which grows with the size of your input, then generation time, which grows with the number of output tokens. Around that sits your own code: auth, database reads, retrieval, prompt assembly and post-processing.

Log each of these separately for every request. At minimum record when the request arrived, when the provider call started, when the first token arrived, when the last token arrived, input and output token counts, and the model name. Without that breakdown you end up guessing, and the guess is often wrong. A slow feature that turns out to be a sequential chain of four model calls needs a completely different fix from one with a huge prompt.

## Time-to-first-token and perceived speed

Users judge speed mostly by how long they wait before anything happens. TTFT is therefore the number I care about most for interactive features, with total time second. For background jobs the priority flips, and throughput and total time matter more.

TTFT depends on the provider's queue, the model size and how much input the model has to process before it can produce the first token. You control the last two directly, which is why prompt size and model choice come next.

## Shrink the prompt

Input tokens are not free in time. Every extra token in a system prompt, a retrieved document or a chat history adds processing before the first output token. Common sources of bloat:

- Long system prompts that have grown by accretion. Rewrite them tightly and delete instructions the model follows anyway.
- Full chat history on every turn. Keep the recent turns verbatim and replace older ones with a running summary.
- Retrieval that returns too much. In RAG, a handful of well-ranked chunks usually beats a large pile of loosely related ones, both for speed and answer quality.
- Verbose tool results. If a tool returns a large JSON object, strip it down to the fields the model actually needs before adding it to the context.
- Few-shot examples that no longer earn their place. Test whether the model still performs without them.

Output length matters even more, because generation is sequential. Ask for exactly what you need, set a sensible `max_tokens`, and prefer compact structured output over long prose when code is going to read the result.

## Cache at several layers

Caching removes latency entirely for repeated work. There are three distinct layers, and they are worth keeping separate.

Provider prompt caching reuses the processing of a shared prompt prefix across requests. Providers differ in whether it is automatic or opt-in, so check the current docs for yours. To benefit, put stable content first (system prompt, tool definitions, fixed reference documents) and variable content last (the user's message). Changing anything near the start of the prompt breaks the cached prefix.

Exact response caching stores the full response keyed by a hash of the model, parameters and messages. It works well for deterministic tasks like extraction or classification over the same input. In the resume analyzer project, caching parsed resumes follows the same idea: expensive work on an unchanged input should happen once.

Semantic caching looks up previous answers to similar questions using embeddings. It can help for FAQ-style traffic, but it risks returning an answer to a question that only looks similar. I use it only where a slightly off answer is acceptable, and never for anything personalised.

Here is a small exact-match cache with Redis in Node.js:

```ts
import { createHash } from "node:crypto";
import { createClient } from "redis";
const redis = createClient({ url: process.env.REDIS_URL });
await redis.connect();
export async function cachedCompletion(
  payload: { model: string; messages: unknown[]; temperature?: number },
  call: () => Promise<string>,
  ttlSeconds = 60 * 60
) {
  const key = "llm:" + createHash("sha256").update(JSON.stringify(payload)).digest("hex");
  const hit = await redis.get(key);
  if (hit !== null) return hit;
  const result = await call();
  await redis.set(key, result, { EX: ttlSeconds });
  return result;
}
```

Only cache calls that should produce the same answer for the same input, and include the model name and every parameter in the key. If you want more on the Redis side, such as eviction and key design, see [Redis with Node.js](/blog/redis-with-nodejs).

## Choose the model per task

The largest model is rarely the right default for every call. Smaller models generally respond faster and cost less, and many tasks do not need the extra capability: routing, classification, extraction, reformatting, short summaries.

A practical setup is a small model for most steps and a larger model only for the step that needs deeper reasoning. You can also route dynamically, sending simple requests to the small model and escalating when a cheap check says the task is hard or the first answer fails validation. Re-evaluate these choices when providers release new models, since the speed and quality trade-offs shift over time. Reasoning-style models that think before answering can add a noticeable wait before the first visible token, so keep them away from interactive paths unless the quality gain clearly justifies it.

## Run independent calls in parallel

Sequential chains are one of the most common causes of slow LLM features. If step B does not need step A's output, run them at the same time.

```ts
const [summary, tags, sentiment] = await Promise.all([
  summarise(text),
  extractTags(text),
  classifySentiment(text),
]);
```

Three calls that each take a similar time now take roughly as long as the slowest one. Watch provider rate limits when you fan out, and use `Promise.allSettled` if one failing call should not sink the others. Where steps do depend on each other, look for ways to break the dependency: sometimes one call with structured output can replace two sequential ones, and sometimes a cheap non-LLM step, like a regex or a database lookup, can replace a model call entirely.

The same thinking applies inside agents. When a model requests several independent tool calls in one turn, execute them concurrently rather than one by one. I cover agent loops in more depth in [building AI agents](/blog/building-ai-agents).

## Stream everything the user watches

Streaming does not make the model faster, but it changes what the user experiences. Instead of waiting for the whole answer, they start reading after TTFT. For chat, explanations and long-form output, this is the single biggest improvement in perceived speed.

Streaming also lets downstream work begin early. In the [AI Avatar case study](/projects/ai-avatar), the conversation loop chains speech-to-text, an LLM that generates the next interview question, and text-to-speech for the avatar. Waiting for each stage to fully finish before starting the next would make the conversation feel stilted. Streaming the LLM output and handing it to speech in sentence-sized pieces lets the avatar start speaking while the rest of the response is still being generated. Getting the transport right matters here, including buffering, proxies and cancellation, and that is what [LLM development](/llm-developer) work often comes down to in practice.

## Speculative UI

Speculative UI means showing something useful before the model has finished, or even before it has started. Some patterns:

- Optimistic structure. Render the layout of the answer, such as headings, cards or a skeleton, immediately, and fill in content as it streams.
- Instant acknowledgement. In voice or chat, show or say a short acknowledgement right away while the real answer is prepared, so the user knows they were heard.
- Prefetch on intent. Start retrieval or a draft call when the user focuses an input, pauses typing, or hovers a suggested question, and discard the result if they change course.
- Progress for multi-step work. For agent or pipeline runs, show each step as it completes rather than a spinner for the whole run.

Be careful with speculation that costs money or has side effects. Prefetching retrieval is cheap and safe. Speculatively running expensive generations on every keystroke is not, so debounce and cancel aggressively.

## When latency work is not worth it

Not every LLM call needs to be fast. Nightly batch jobs, report generation and offline enrichment care about cost and reliability far more than seconds. For those, batch APIs, larger models and retries with backoff are often the better trade. Spend latency effort on the paths a user is actively waiting on.

## Key takeaways

- Log TTFT, total time and token counts per request so you know which part is slow.
- Cut input and output tokens first, since they drive both TTFT and generation time.
- Keep stable prompt content first for prefix caching, and cache deterministic responses by exact key.
- Pick the smallest model that meets quality for each step, and parallelise independent calls.
- Stream and use speculative UI so users see progress long before the full answer is ready.

## Need a faster LLM feature

If your AI feature works but feels slow, the fix is usually a combination of the levers above, applied in the right order. I am happy to profile your request path and suggest changes. Get in touch through the [hire me page](/hire-me).
