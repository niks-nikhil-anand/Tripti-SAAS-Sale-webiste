---
title: LLM Streaming Architecture – From Provider to Browser
description: How to stream LLM tokens from the provider through your server to the browser with SSE or ReadableStream, plus backpressure, cancellation and UI.
category: ai
tags: [llm, streaming, sse, readablestream, nextjs]
publishedAt: 2026-09-24
services: [llm-developer, ai-developer]
projects: [ai-avatar]
related: [reduce-llm-latency, building-ai-agents, ai-saas-architecture]
featured: false
---

A good LLM streaming architecture moves tokens through three hops, provider to server to browser, without buffering at any of them, and it lets a cancel in the browser travel all the way back to the provider. In practice that means reading the provider's stream on the server, re-emitting it as Server-Sent Events or a raw `ReadableStream`, and wiring one abort signal through every layer. This guide covers each hop, the failure modes I watch for, and how to stream structured output without breaking your parser.

## Why streaming changes the architecture

A normal API call is request, wait, response. A streamed LLM call is a long-lived connection that produces many small chunks over several seconds, and it can end in four ways: completion, a provider error, a user cancel, or a network drop. Every layer between the model and the screen has to handle all four.

That has knock-on effects people underestimate. Your server holds an open connection per active generation, so serverless timeouts and load balancer idle timeouts suddenly matter. Proxies and compression middleware that buffer responses will quietly turn a stream back into a single blob. Logging and billing can no longer happen "after the response", because the response is spread over time and may never finish cleanly.

## Hop one, provider to server

Every major provider exposes a streaming mode. With the OpenAI SDK you pass `stream: true` and get an async iterable of chunks, each carrying a small delta of text or a partial tool call. Gemini and OpenRouter have equivalents with slightly different shapes. I normalise these into one internal event type as early as possible, so the rest of the system never cares which provider produced a token.

A useful internal shape is a small union: a text delta, a tool call delta, a usage event, a done event and an error event. Once everything speaks that shape, swapping models or adding a fallback provider is a change in one adapter instead of a hunt through the codebase.

Two rules at this hop:

- Never collect the full provider response before forwarding it. It sounds obvious, but a helper that "just adds some post-processing" is the most common way streams get accidentally buffered.
- Always pass an `AbortSignal` into the provider call. If you cannot cancel upstream, a user who closes the tab still costs you a full generation.

## Hop two, server to browser

You have two reasonable transports. Server-Sent Events use the `text/event-stream` content type and a simple `data:` line format, and the browser has built-in `EventSource` support with automatic reconnect. The catch is that `EventSource` only does GET requests, and most LLM calls need a POST body with the conversation. A raw `ReadableStream` over a normal `fetch` POST has no such limit, and you read it with a reader on the client.

My default is SSE-formatted events sent over a POST `fetch` response. You keep the clear event framing of SSE, which makes it easy to interleave text, tool status and usage events, and you read it with `fetch` instead of `EventSource`, so POST works. WebSockets are worth it only when the conversation is truly bidirectional in real time, as with voice.

Here is a Next.js route handler that streams from OpenAI and forwards cancellation:

```ts
import OpenAI from "openai";
const openai = new OpenAI();
export async function POST(req: Request) {
  const { messages } = await req.json();
  const encoder = new TextEncoder();
  const completion = await openai.chat.completions.create(
    { model: "gpt-4o-mini", messages, stream: true },
    { signal: req.signal }
  );
  const chunks = completion[Symbol.asyncIterator]();
  const send = (event: object) => encoder.encode(`data: ${JSON.stringify(event)}\n\n`);
  const stream = new ReadableStream<Uint8Array>({
    // pull runs only when the consumer has room, so backpressure is respected
    async pull(controller) {
      try {
        // keep reading until there is something to send, so pull never resolves empty
        while (true) {
          const { value, done } = await chunks.next();
          if (done) {
            controller.enqueue(send({ type: "done" }));
            controller.close();
            return;
          }
          const text = value.choices[0]?.delta?.content;
          if (text) {
            controller.enqueue(send({ type: "text", text }));
            return;
          }
        }
      } catch {
        controller.enqueue(send({ type: "error" }));
        controller.close();
      }
    },
    cancel() {
      completion.controller.abort();
    },
  });
  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache, no-transform",
      Connection: "keep-alive",
    },
  });
}
```

The `no-transform` directive matters. It asks intermediaries not to compress or rewrite the body, which is one of the usual reasons a stream arrives all at once in production while working fine locally. If you sit behind Nginx, you also need to turn off proxy buffering for this route. If you are building this inside a larger product, I cover where the streaming layer sits in [AI SaaS architecture](/blog/ai-saas-architecture).

## Backpressure

Backpressure is what happens when the producer is faster than the consumer. LLM tokens usually arrive slower than a browser can render them, so people assume it never matters. It does in two cases: a slow mobile connection, and a server that fans one generation out to several consumers, such as a UI plus a logger plus a text-to-speech engine.

The Web Streams API handles backpressure for you if you let it. With a `pull`-based source, the runtime asks for more data only when the internal queue has room. If you instead push into the controller from an event callback with no regard for `controller.desiredSize`, you are building an unbounded buffer in server memory. The route handler above pulls one provider chunk per `pull` call for exactly this reason. For fan-out, `stream.tee()` gives you two branches, but it queues data for whichever branch is behind, so a slow consumer on one branch grows memory while the other races ahead. For side consumers such as logging, I prefer collecting deltas into a plain array and writing once at the end.

## Cancellation end to end

Cancellation needs to travel in the opposite direction to the tokens. The user clicks stop, the client aborts its `fetch`, the server sees `req.signal` fire or the stream's `cancel()` run, and the server aborts the provider request. Miss any link and you keep paying for tokens no one will read.

On the client, keep one `AbortController` per generation and abort it on stop, on unmount, and when the user sends a new message before the last one finished. On the server, treat an abort as a normal outcome, not an error. Record partial usage if the provider reports it, save whatever partial text you want to keep, and skip error alerting. Otherwise your error dashboard fills with every user who changed their mind.

## Streaming structured output

Streaming plain text is easy. Streaming JSON is harder, because a half-received JSON object does not parse. There are three approaches, and they suit different jobs:

1. Stream text, parse at the end. Show a loading state or the raw text while it streams, then validate the full object with a schema library once the done event arrives. Simple and safe, and right when the UI cannot do anything useful with half an object.
2. Use a partial JSON parser. Libraries exist that repair incomplete JSON into the best-guess object so far, which lets you render fields as they fill in. Treat every partial value as provisional, and only trust the final, validated result.
3. Change the protocol. Instead of one big JSON blob, ask the model for newline-delimited records, or use tool calls where each call is a complete unit. Each line or call can be validated as soon as it lands.

For feedback screens, I lean toward the third option. In the [AI Avatar case study](/projects/ai-avatar), the interview feedback is structured, and streaming it as separate, complete sections means each part of the screen can render and validate independently instead of waiting on one large object.

## UI concerns

The front end is where streaming either feels good or feels broken. A few things I always handle:

- Render deltas into state efficiently. Appending to a string in React state on every token causes a re-render per token. Batch updates with `requestAnimationFrame` or a short interval so the UI updates at frame rate rather than token rate.
- Markdown mid-stream. A half-written code fence or list will render oddly for a moment. Either use a renderer that tolerates incomplete markdown, or close open fences temporarily before rendering.
- Scroll behaviour. Auto-scroll only if the user is already at the bottom. If they scrolled up to read, do not yank them down.
- Accessibility. Screen readers announcing every token is unusable. Put the streaming region in a polite live region and announce completion, or update the accessible text in larger chunks.
- Clear states. Distinguish "waiting for first token", "streaming", "stopped by user", "failed" and "done". Each needs a different affordance, such as a stop button, retry, or copy.

Here is a minimal client reader for the SSE-over-POST format above:

```ts
export async function streamChat(messages: unknown[], onText: (t: string) => void, signal: AbortSignal) {
  const res = await fetch("/api/chat", { method: "POST", body: JSON.stringify({ messages }), signal });
  if (!res.body) throw new Error("No response body");
  const reader = res.body.pipeThrough(new TextDecoderStream()).getReader();
  let buffer = "";
  while (true) {
    const { value, done } = await reader.read();
    if (done) break;
    buffer += value;
    const events = buffer.split("\n\n");
    buffer = events.pop() ?? "";
    for (const evt of events) {
      if (!evt.startsWith("data: ")) continue;
      const data = JSON.parse(evt.slice(6));
      if (data.type === "text") onText(data.text);
    }
  }
}
```

Note the buffer. Network chunks do not line up with your event boundaries, so you must hold the trailing partial event until the rest of it arrives.

## When not to stream

Streaming is not free. Skip it for short classification or extraction calls where the whole answer is a few tokens, for background jobs no human is watching, and for responses that must be fully validated before anyone sees them, such as content that goes through moderation. In those cases a normal request is simpler to retry, cache and test. For the broader set of techniques that make responses feel fast, see [how to reduce LLM latency](/blog/reduce-llm-latency).

## Key takeaways

- Normalise every provider's stream into one internal event type at the server boundary.
- Use SSE framing over a POST `fetch` by default, and set headers so proxies do not buffer.
- Let the Web Streams API manage backpressure with pull-based sources instead of pushing blindly.
- Wire a single abort path from the stop button to the provider call, and treat aborts as normal.
- Stream structured output as complete units where you can, and validate only the final result.

## Getting help with streaming

If your streamed responses stall in production, cost more than they should, or feel jumpy in the UI, the cause is usually one missing link in the chain above. I build these pipelines as part of my [LLM development](/llm-developer) and [AI development](/ai-developer) work, and I am happy to look at yours. You can reach me through the [hire me page](/hire-me).
