---
title: RAG vs Fine-Tuning – When to Use Each and When to Combine
description: RAG or fine-tuning? Learn what each changes in an LLM system, which problems each one solves, the costs involved, and when combining both makes sense.
category: rag
tags: [rag, fine-tuning, llm, prompt engineering]
publishedAt: 2026-09-24
services: [rag-developer, llm-developer, generative-ai-developer]
projects: [chat-with-pdf]
related: [rag-architecture-explained, how-vector-search-works]
featured: false
---

Use RAG when the model needs access to knowledge it does not have, such as private documents, fast-changing data or anything you must cite. Use fine-tuning when the model needs to behave differently, such as following a strict output format, adopting a consistent tone, or doing a narrow task more reliably with shorter prompts. When you need both specific knowledge and specific behaviour, combine them: fine-tune for how the model responds, and retrieve for what it knows.

## What each approach actually changes

The confusion between the two usually comes from treating them as alternative ways to "teach the model". They change very different parts of the system.

- **RAG changes the input.** The model's weights stay the same. At request time you search your data, select the relevant passages and put them in the prompt. The model reads them like a briefing note and answers from them.
- **Fine-tuning changes the model.** You train an existing model further on examples of inputs and desired outputs. The adjusted weights make certain patterns of response more likely, without any extra context at request time.

A useful shorthand is that RAG gives the model an open book during the exam, while fine-tuning changes how the student writes answers. An open book helps with facts. Practice changes habits.

## When RAG is the better choice

RAG fits most "answer questions about our stuff" requirements, which is what the majority of business AI features turn out to be.

- **Knowledge changes often.** Policies, product catalogues, tickets and documentation change weekly. With RAG you re-index a document and the next answer reflects it. With fine-tuning you would need to retrain.
- **Answers must be traceable.** RAG can return the exact passage and page it used. A fine-tuned model cannot tell you where it learned something, which matters in legal, healthcare, finance and support settings.
- **Data is per-user or per-tenant.** Each customer should only see answers from their own files. RAG handles this with a metadata filter at retrieval time. Fine-tuning a separate model for every tenant is rarely practical, and mixing tenants into one model is a data leak.
- **You need to delete data.** Removing a document from a vector index is a delete call. Removing knowledge from trained weights is not realistically possible without retraining.

In my [Chat with PDF project](/projects/chat-with-pdf) fine-tuning was never a serious option. Every user brings different documents, and the value of the product is answers grounded in those documents with citations. That is a retrieval problem by definition.

## When fine-tuning is the better choice

Fine-tuning earns its cost when the problem is behaviour rather than knowledge.

- **Strict, repeated output formats.** If every response must be a particular JSON shape, a specific report structure or a classification label from a fixed set, fine-tuning on good examples makes the model follow it more consistently.
- **Tone and style.** A support assistant that must sound like your brand, or a writing tool with a house style, can learn that from examples far more reliably than from a long style guide in the prompt.
- **Narrow, high-volume tasks.** Extraction, classification or routing tasks run thousands of times a day. A fine-tuned smaller model can match a larger general model on that one task, with shorter prompts and lower cost per call.
- **Shorter prompts.** Instructions and few-shot examples that you would otherwise send on every request get absorbed into the weights, which reduces input tokens and latency.

What fine-tuning does not do well is reliably inject facts. A model fine-tuned on your documentation will pick up vocabulary and some knowledge, but it will also blend it with what it already knew and state it confidently without a source. If factual accuracy matters, do not rely on fine-tuning alone.

## Try prompting first

Before either option, check whether a better prompt solves the problem. Clear instructions, a defined output schema, a couple of good examples and structured output features in modern LLM APIs handle a surprising share of "we need fine-tuning" requests.

```ts
const response = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  response_format: { type: "json_object" },
  messages: [
    {
      role: "system",
      content:
        "Classify the support ticket. Reply with JSON only: " +
        '{"category": "billing" | "bug" | "feature" | "other", "urgent": boolean}',
    },
    { role: "user", content: ticketText },
  ],
});
```

If this gets you most of the way, you have saved a training pipeline. If the model still drifts on format or tone after careful prompting, that is the signal fine-tuning might be worth it.

## Comparing the costs

The costs are different in kind, not just in size.

### Costs of RAG

- Building and running an ingestion pipeline: parsing, chunking, embedding, re-indexing on change.
- A vector database to host and back up.
- Longer prompts on every request, because retrieved context adds input tokens.
- Ongoing work on retrieval quality, which is where most of the tuning effort goes.

### Costs of fine-tuning

- Collecting and cleaning a training set of good input and output pairs, which is often the hardest part.
- Training runs, evaluation and iteration each time you change the data.
- Hosting or paying for access to a custom model, and re-doing the work when you want to move to a newer base model.
- Less transparency when something goes wrong, since you cannot inspect why a weight produced an answer.

For most teams, RAG is cheaper to start and easier to debug. Fine-tuning becomes attractive once a specific task is stable, high-volume and well understood.

## Combining RAG and fine-tuning

The two are not mutually exclusive, and in mature systems they often work together. The fine-tuned model handles behaviour, and retrieval supplies the facts.

Patterns that combine well:

1. **Fine-tune the answer format, retrieve the content.** A model trained to always produce answers with inline citations, a summary line and a confidence note, fed with retrieved chunks at runtime.
2. **Fine-tune for using context.** Train on examples where the model receives retrieved passages, some relevant and some not, and learns to rely on the right ones and to say "not found" when none apply. This directly reduces answers that ignore the context.
3. **Fine-tune the small helpers.** Keep a strong general model for the final answer, but fine-tune smaller models for query rewriting, routing or reranking inside the RAG pipeline, where speed and cost matter most.
4. **Fine-tune the embedding model.** If your domain vocabulary is unusual, adapting the embedding model on pairs of queries and relevant passages can improve retrieval more than any change to the LLM.

The order matters. Build RAG first, create an evaluation set, and find where it falls short. If the failures are about retrieving the wrong content, fix retrieval. If they are about the model mishandling correct content, that is when fine-tuning helps.

## A quick decision guide

Ask these questions in order:

1. Does the model lack information it needs? Start with RAG.
2. Does the information change, need citations, or differ per user? RAG, definitely.
3. Is the problem format, tone or task consistency? Try better prompting and structured output first.
4. Still inconsistent after prompting, and the task is stable and high-volume? Consider fine-tuning.
5. Need both correct facts and specific behaviour? Combine them.

For a deeper look at how the retrieval side is put together, see [RAG architecture explained](/blog/rag-architecture-explained), and for the search layer underneath it, [how vector search works](/blog/how-vector-search-works).

## Key takeaways

- RAG changes what the model sees at request time, while fine-tuning changes the model itself.
- Choose RAG for private, changing or per-tenant knowledge and whenever answers must be cited.
- Choose fine-tuning for stable behaviour problems like format, tone and narrow repeated tasks.
- Exhaust prompting and structured output before paying for a training pipeline.
- Combine them by fine-tuning behaviour and retrieving facts, but only after an evaluation shows where RAG falls short.

## Deciding for your own product

The right answer depends on your data, your users and how the feature will be measured. If you want help working out whether your use case needs retrieval, training or just a better prompt, my work as an [LLM developer](/llm-developer) covers all three, and I also build [RAG systems](/rag-developer) end to end. You can [start a conversation here](/hire-me).
