---
title: RAG Architecture Explained – From Documents to Cited Answers
description: Learn how a RAG pipeline works end to end, covering chunking, embeddings, vector search, retrieval, prompting and citations, with trade-offs at each stage.
category: rag
tags: [rag, llm, embeddings, vector database, retrieval]
publishedAt: 2026-09-24
services: [rag-developer, rag-application-development]
projects: [chat-with-pdf]
related: [how-vector-search-works, rag-vs-fine-tuning, building-chat-with-pdf]
featured: true
---

RAG (retrieval-augmented generation) architecture is a pipeline that finds the most relevant pieces of your own documents at question time and hands them to a language model, so the model answers from your content instead of from memory. It has two halves: an ingestion path that turns documents into searchable chunks, and a query path that retrieves those chunks and asks the LLM to answer with citations. Almost every quality problem in a RAG system can be traced to one specific stage, which is why it pays to understand each one.

## The two halves of a RAG system

It helps to separate the system into two flows that run at different times and have different performance needs.

- **Ingestion (offline):** load documents, extract text, split it into chunks, create an embedding for each chunk, and store the vectors with metadata in a vector database.
- **Query (online):** embed the user's question, retrieve the closest chunks, optionally rerank them, build a prompt, call the LLM, and return an answer that points back to its sources.

Ingestion can be slow and batch-oriented. It runs once per document (and again when the document changes). The query path runs on every message and sits in front of a waiting user, so latency matters there. Keeping them as separate services or jobs means a large upload never slows down someone who is chatting.

## Stage 1 – Loading and extracting documents

Everything downstream depends on clean text. PDFs are the usual headache: multi-column layouts, headers and footers repeated on every page, tables flattened into a stream of numbers, and scanned pages that contain no text layer at all.

A few practical rules I follow:

- Keep the page number and source file with every piece of text you extract. You will need them for citations later, and they are very hard to recover afterwards.
- Strip repeated headers, footers and page numbers before chunking, otherwise they pollute every embedding.
- Detect scanned pages early and route them to OCR rather than silently indexing empty text.
- Store the raw extracted text separately from the chunks, so you can re-chunk without re-parsing.

## Stage 2 – Chunking

Embedding models and LLM context windows both work best with focused passages, so documents are split into chunks. Chunk size is a trade-off. Small chunks give precise matches but lose surrounding context. Large chunks carry more context but dilute the embedding, so the vector represents several ideas at once and matches nothing strongly.

Reasonable defaults for prose are a few hundred tokens per chunk with some overlap between neighbours, so a sentence cut at a boundary still appears whole in one of them. Better still is structure-aware splitting: break on headings, then paragraphs, then sentences, and only fall back to a hard character limit when a section is too long.

```ts
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 1000,
  chunkOverlap: 150,
  separators: ["\n## ", "\n### ", "\n\n", "\n", ". ", " "],
});

const chunks = await splitter.createDocuments(
  pages.map((p) => p.text),
  pages.map((p) => ({ source: p.fileName, page: p.pageNumber })),
);
```

Note that `chunkSize` here is in characters, not tokens. The important part is the second argument: every chunk inherits its source and page metadata.

## Stage 3 – Embeddings

An embedding model turns each chunk into a vector, a list of numbers where texts with similar meaning land close together. The question gets embedded with the same model at query time, and "relevance" becomes a distance calculation.

Decisions that matter here:

- **Use one model for both documents and queries.** Vectors from different models live in different spaces and cannot be compared.
- **Version your embeddings.** If you switch models, you have to re-embed the whole corpus. Store the model name alongside each vector so a migration is a planned job, not a surprise.
- **Embed what the user will search for.** Prepending the document title or section heading to a chunk before embedding often improves matches, because the chunk text alone may not mention the topic by name.

## Stage 4 – The vector database

The vectors and their metadata go into a vector database such as Qdrant, pgvector in PostgreSQL, or a managed service. Its job is to find the nearest vectors to a query vector quickly, even across millions of chunks, using an approximate nearest neighbour index.

Metadata is as important as the vectors. Storing `tenantId`, `documentId`, `page` and `createdAt` on each point lets you filter at search time: only this user's files, only this document, only content from this year. In a multi-tenant SaaS, that filter is also a security boundary, so it must be applied on the server, never trusted from the client. I cover indexes, distance metrics and filtering in more depth in [how vector search works](/blog/how-vector-search-works).

## Stage 5 – Retrieval and reranking

Retrieval is where most RAG systems quietly fail. The LLM can only be as good as the chunks it receives, and a wrong chunk produces a confident wrong answer.

Common techniques, roughly in the order I reach for them:

1. **Top-k similarity search** with a metadata filter. Start with something like 5 to 10 chunks.
2. **Hybrid search**, combining vector similarity with keyword matching (BM25 or sparse vectors). This rescues queries with exact terms like product codes, names or error messages that embeddings handle poorly.
3. **Reranking**, where you retrieve a wider set (say 30 to 50) and use a cross-encoder or reranking model to reorder them by relevance to the exact question, then keep the top few.
4. **Query rewriting**, where a follow-up like "what about the second one?" is rewritten into a standalone question using chat history before it is embedded.

Do not add all four on day one. Build a small evaluation set of real questions with known source passages first, then add a technique only when it measurably improves which chunks come back.

## Stage 6 – Prompting the LLM

The retrieved chunks are placed into the prompt with clear instructions. The prompt should tell the model to answer only from the provided context, to say when the context does not contain the answer, and to reference sources by an identifier you control.

```ts
function buildPrompt(question: string, chunks: RetrievedChunk[]) {
  const context = chunks
    .map((c, i) => `[${i + 1}] (${c.source}, page ${c.page})\n${c.text}`)
    .join("\n\n");

  return [
    {
      role: "system",
      content:
        "Answer using only the numbered context below. Cite sources inline as [n]. " +
        "If the context does not contain the answer, say you could not find it.",
    },
    { role: "user", content: `Context:\n${context}\n\nQuestion: ${question}` },
  ];
}
```

Numbering the chunks gives the model a simple citation format, and it gives your code a way to map `[2]` back to a real file and page.

## Stage 7 – Returning a cited answer

Citations are what make a RAG answer trustworthy. After generation, parse the `[n]` markers, map them to the chunks you sent, and return structured sources alongside the text: file name, page, and the snippet. The UI can then render clickable references that open the original document at the right page.

Two safeguards are worth adding. First, drop any citation number that does not match a chunk you actually sent, since models occasionally invent one. Second, if the model cites nothing at all, treat that as a signal that retrieval probably missed and consider showing a softer "I could not find this in your documents" response.

In the [Chat with PDF case study](/projects/chat-with-pdf) I followed exactly this shape: uploads are processed in the background, chunks keep their page metadata, and every answer comes back with citations the user can check. The full build is written up in [building a Chat with PDF app](/blog/building-chat-with-pdf).

## Where RAG architectures break

Knowing the failure modes saves a lot of debugging time.

- **Answer is wrong but sounds right:** usually retrieval returned the wrong chunks. Log the retrieved chunks for every query so you can see this directly.
- **Answer is "not found" but the content exists:** chunking split the answer across boundaries, the query uses different vocabulary from the document, or the metadata filter is too strict. Hybrid search and query rewriting help.
- **Answers are slow:** check embedding calls, retrieval, reranking and generation separately. Streaming the LLM response hides much of the perceived delay.
- **Stale answers:** the document changed but the old chunks were never deleted. Tie every chunk to a document ID and version so re-ingestion replaces them cleanly.

## When RAG is not the right tool

RAG is a strong fit when answers live in documents that change or are private. It is a weak fit when the task is about style, format or a skill the model lacks, because retrieval adds facts, not behaviour. It also struggles with questions that need aggregation across a whole corpus ("how many contracts mention X?"), which are better served by structured extraction into a database and a real query. When the gap is behaviour rather than knowledge, fine-tuning or better prompting is usually the better lever.

## Key takeaways

- A RAG system is two pipelines, offline ingestion and online querying, and they should scale independently.
- Keep source and page metadata attached from extraction onwards, or citations become impossible.
- Retrieval quality decides answer quality, so log retrieved chunks and evaluate them with real questions.
- Add hybrid search, reranking and query rewriting only when an evaluation shows they help.
- Validate citations in code before showing them to the user.

## Need a RAG system built properly

If you are planning a document assistant, an internal knowledge search or a support bot grounded in your own content, I design and build these end to end, from ingestion to cited answers. You can read more about my [RAG development work](/rag-developer) or [get in touch here](/hire-me) to talk through your use case.
