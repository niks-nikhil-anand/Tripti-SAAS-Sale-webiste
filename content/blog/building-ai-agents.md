---
title: Building AI Agents – Tool Calling, Loops and Guardrails
description: A practical guide to building AI agents with tool calling, when to use a workflow instead, planning loops, guardrails, human approval and observability.
category: ai
tags: [ai agents, tool calling, llm, guardrails, observability]
publishedAt: 2026-09-24
services: [ai-agent-development, ai-developer]
projects: [blog-automation]
related: [llm-streaming-architecture, rag-architecture-explained, ai-saas-architecture]
featured: false
---

Building AI agents comes down to a loop: the model reads the current state, decides whether to call a tool, your code runs that tool and feeds the result back, and the loop repeats until the model answers or a limit is hit. The hard part is not the loop. It is choosing where the model should have freedom, putting hard limits around it, and making every step visible so you can debug it. This guide walks through tool calling, the workflow versus agent decision, planning loops, guardrails, human approval and observability.

## Tool calling is the foundation

Tool calling (also called function calling) lets the model return a structured request instead of prose: a tool name plus JSON arguments that match a schema you provided. The model never executes anything. Your code decides whether to run the tool, runs it, and sends the result back as a tool message.

Good tool design matters more than prompt wording. A few rules I follow:

- Keep tools narrow. `get_order_status(orderId)` is easier for the model to use correctly than a generic `query_database(sql)`, and it is far safer.
- Write descriptions for the model, not for humans. Say when to use the tool, when not to, and what the output looks like.
- Validate arguments with a schema before execution. Models occasionally produce arguments that are well-formed JSON but semantically wrong, such as an ID from a different entity.
- Return compact, structured results. Dumping a large API response back into the context wastes tokens and makes the next decision worse.
- Return errors as data. If a tool fails, send a short, clear error message back so the model can recover, instead of throwing and ending the run.

## Workflows versus agents

Not every "agent" should be an agent. A workflow is a fixed sequence of steps you define in code, where the LLM does the work inside each step. An agent is a loop where the LLM decides which step comes next. Workflows are predictable, cheap to test and easy to reason about. Agents handle open-ended tasks, but they are harder to test and can wander.

My rule is to start with a workflow and add agency only where the path genuinely cannot be known in advance. The [blog automation case study](/projects/blog-automation) is a good example. The pipeline goes from trending topic to keyword research, outline, generation, SEO processing, human review and publish. That order never changes, so it is a workflow. The LLM does the creative work inside steps, and Qdrant supports internal linking and duplicate detection, but the orchestration is plain code. Turning that into a free-roaming agent would have added risk without adding value.

Agents earn their place in tasks like these:

- Research or support questions where the number of lookups depends on what the first lookup returns.
- Troubleshooting flows where each observation changes the next check.
- Multi-system tasks where the right tool depends on user input you cannot enumerate.

A common middle ground is a workflow with one agentic step, for example a fixed pipeline where only the research stage runs a bounded tool loop.

## The agent loop in code

Here is a minimal, provider-style tool loop with the limits that every production agent needs. It uses the OpenAI chat completions format, but the shape is the same elsewhere.

```ts
import OpenAI from "openai";
import type { ChatCompletionMessageParam, ChatCompletionTool } from "openai/resources/chat/completions";
const openai = new OpenAI();
type ToolFn = (args: unknown) => Promise<unknown>;
export async function runAgent(
  messages: ChatCompletionMessageParam[],
  tools: ChatCompletionTool[],
  handlers: Record<string, ToolFn>,
  maxSteps = 8
) {
  for (let step = 0; step < maxSteps; step++) {
    const res = await openai.chat.completions.create({ model: "gpt-4o", messages, tools });
    const msg = res.choices[0].message;
    messages.push(msg);
    if (!msg.tool_calls?.length) return { answer: msg.content, steps: step + 1 };
    for (const call of msg.tool_calls) {
      if (call.type !== "function") continue;
      const handler = handlers[call.function.name];
      let result: unknown;
      try {
        if (!handler) throw new Error(`Unknown tool ${call.function.name}`);
        result = await handler(JSON.parse(call.function.arguments));
      } catch (err) {
        result = { error: err instanceof Error ? err.message : "Tool failed" };
      }
      messages.push({ role: "tool", tool_call_id: call.id, content: JSON.stringify(result) });
    }
  }
  return { answer: null, steps: maxSteps, stopped: "max_steps" };
}
```

The important parts are the step cap, the unknown-tool check, and turning exceptions into tool results. In a real system each handler also validates its arguments with a schema and checks permissions for the current user.

## Planning loops

For longer tasks, a plain tool loop can lose the thread. Two patterns help.

The first is plan then execute. Ask the model to produce an explicit plan as structured output, a short list of steps with the tool each one needs, then run those steps, and only re-plan when a step fails or returns something unexpected. The plan becomes a checkpoint you can log, show to the user, or have a human approve.

The second is a reflection step. After a tool result, the model briefly assesses whether the goal is met, whether the result was useful, and what to do next. This catches loops where the agent keeps calling the same search with slightly different wording.

Both patterns cost extra model calls, so use them when tasks genuinely run long. For a two-step lookup, a plain loop is simpler and faster. Keep plans short. A plan of fifteen steps is usually a sign the task should be split into a workflow with smaller agents inside it.

## Guardrails

Guardrails are the code around the model that limits what can go wrong. The model's instructions are not a guardrail, because instructions can be ignored or overridden by content in the context. Real guardrails live in your code:

- Hard budgets. Cap steps, total tokens, wall-clock time and cost per run. When a budget runs out, stop and return a partial result with a clear status.
- Least-privilege tools. Give each agent only the tools it needs, scoped to the current user's permissions, and enforce those permissions inside the tool, not in the prompt.
- Treat tool output as untrusted. Web pages, emails and documents fetched by a tool can contain text that looks like instructions. Keep that content clearly separated as data and never let it widen the agent's permissions.
- Validate outputs. Check final answers against a schema, and for high-stakes outputs, run a second check such as a rules engine or a separate classifier call.
- Idempotent writes. If a tool creates or changes something, make it safe to retry, for example with an idempotency key, because agents do retry.

## Human approval

Some actions should never run on the model's decision alone: sending an email, issuing a refund, deleting data, publishing content. For these, the tool should not perform the action. It should create a pending action and pause the run.

The pattern I use is simple. The tool handler writes a proposed action to the database with its arguments and a human-readable summary, returns a "pending approval" result to the model, and the run is persisted and suspended. A reviewer sees the proposal in a UI, approves, edits or rejects it, and the run resumes with that decision as the tool result. This is also how the review step in the blog pipeline works: generation is automated, but nothing goes live until a person approves it.

Designing for pause and resume has a useful side effect. Runs become durable, so a server restart does not lose an agent halfway through a task. If the review UI streams progress to the reviewer, the same principles from [LLM streaming architecture](/blog/llm-streaming-architecture) apply.

## Observability

You cannot improve an agent you cannot see. Log every run as a trace, and every model call and tool call as a span inside it. For each step, record the input messages or a reference to them, the model's output, the tool name and arguments, the result, latency, token usage and any error.

With traces in place, you can answer the questions that actually come up. Why did the agent call the same tool three times? Which tool fails most often? Which step uses most of the token budget? You can also build a regression set: save real traces that went wrong, turn them into test cases, and replay them whenever you change a prompt, a tool description or the model.

A few practical notes. Redact personal data before it reaches your logging backend. Tag each trace with the prompt version and model name so you can compare changes. And alert on stops caused by budgets, since a rising rate of max-step stops usually means a tool or prompt has regressed.

## When not to build an agent

Skip the agent when the steps are known, when the task is a single retrieval plus an answer (plain RAG, covered in [RAG architecture explained](/blog/rag-architecture-explained), is simpler), or when every action needs approval anyway, in which case a workflow with a review queue is clearer. Agents cost more per task, take longer, and are harder to test, so the added flexibility needs to be worth that.

## Key takeaways

- Design narrow, well-described tools with schema validation, and return errors as data.
- Start with a workflow and add agent loops only where the path cannot be known in advance.
- Put guardrails in code, with step, token, time and cost budgets plus least-privilege tools.
- Route irreversible actions through a pending-approval step that pauses and resumes the run.
- Trace every model call and tool call so failures can become regression tests.

## Building an agent with help

If you are deciding whether your use case needs an agent or a workflow, or you have an agent that works in demos but misbehaves in production, I can help you design the loop, tools and guardrails. See my [AI agent development](/ai-agent-development) and [AI development](/ai-developer) services, or get in touch through the [hire me page](/hire-me).
