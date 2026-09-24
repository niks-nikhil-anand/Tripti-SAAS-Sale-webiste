---
title: Building a Chat with PDF App – A RAG Build Walkthrough
description: A step-by-step walkthrough of building a Chat with PDF app in Next.js, from upload and background processing to chunking, retrieval and cited answers.
category: rag
tags: [rag, chat with pdf, nextjs, langchain, embeddings]
publishedAt: 2026-09-24
services: [rag-application-development, nextjs-developer]
projects: [chat-with-pdf]
related: [rag-architecture-explained, how-vector-search-works, llm-streaming-architecture]
featured: false
---

Building a Chat with PDF app means wiring four pieces together: an upload flow, a background job that turns the PDF into embedded chunks, a retrieval step that finds the passages relevant to each question, and an LLM call that answers from those passages with citations back to the page. This walkthrough follows the structure of my own Chat with PDF project, built with Next.js, LangChain, embeddings and vector search, and explains the decisions at each step and the mistakes worth avoiding.

## The shape of the system

Before writing code, it helps to fix the architecture, because the main design choice is where the slow work happens.

- **Upload:** the browser sends the file to storage, and the app records a document row with status `processing`.
- **Background processing:** a worker extracts text page by page, chunks it, creates embeddings and writes them to the vector store.
- **Chat:** each question is embedded, the closest chunks from that document are retrieved, and the LLM answers using only those chunks.
- **Citations:** the answer comes back with references to the file and page each claim came from.

The key rule is that the upload request never waits for embeddings. Parsing and embedding a long PDF can take a while, and doing it inside an HTTP request leads to timeouts on serverless platforms and a frozen UI. In my [Chat with PDF project](/projects/chat-with-pdf), uploads return quickly and processing happens in the background, with the UI reflecting the document's status.

## Step 1 – Handling uploads

In Next.js App Router, the upload can go to a Route Handler, but for larger files it is better to have the browser upload directly to object storage such as S3 with a presigned URL, then notify the app when the upload finishes. That keeps big payloads off your server.

Validate early: check the MIME type and file size, reject anything that is not a PDF, and store a content hash so re-uploading the same file does not trigger a second full ingestion.

The document record needs only a few fields to start: an ID, the owner, the storage key, the file name, a status (`processing`, `ready`, `failed`) and an error message for when things go wrong.

## Step 2 – The background job

The worker is where the real work happens. It can be a queue consumer (BullMQ on Redis is a common choice with Node.js), a separate container, or a serverless function triggered by the upload event. What matters is that it is retryable and idempotent: if it crashes halfway, running it again must not create duplicate chunks.

A simple way to guarantee that is to delete any existing chunks for the document ID before inserting new ones, and to update the status only at the very end.

```ts
import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";

export async function processDocument(doc: { id: string; ownerId: string; path: string; name: string }) {
  const pages = await new PDFLoader(doc.path, { splitPages: true }).load();

  const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 1000, chunkOverlap: 150 });
  const chunks = await splitter.splitDocuments(pages);

  const records = chunks.map((chunk, i) => ({
    id: `${doc.id}:${i}`,
    text: chunk.pageContent,
    metadata: {
      documentId: doc.id,
      ownerId: doc.ownerId,
      fileName: doc.name,
      page: chunk.metadata.loc?.pageNumber ?? null,
    },
  }));

  await vectorStore.deleteByDocument(doc.id);
  await vectorStore.upsert(records);
  await db.document.update({ where: { id: doc.id }, data: { status: "ready" } });
}
```

`vectorStore` and `db` stand in for your own vector store wrapper and database client. The details that matter are loading with `splitPages: true` so each page becomes its own document, and carrying the page number into every chunk's metadata. Without that, citations are impossible later.

## Step 3 – Extraction problems you will hit

PDFs are a layout format, not a text format, so extraction always needs some cleanup.

- **Scanned documents** have no text layer. If a page returns almost no text, flag it and route it to OCR, or tell the user the file looks scanned.
- **Repeated headers and footers** appear on every page and end up in every chunk. Detecting lines that repeat across most pages and removing them improves retrieval noticeably.
- **Tables** often come out as a flat run of values. For table-heavy documents, consider extracting tables separately and storing them as their own chunks with a short description.
- **Hyphenation and line breaks** split words across lines. A small normalisation pass that joins hyphenated words and collapses single newlines inside paragraphs helps both embeddings and readability of citations.

## Step 4 – Chunking and embeddings

For typical documents, chunks of roughly a page section with some overlap work well. Too small and the model loses context around the answer. Too large and each embedding becomes a blur of several topics.

When embedding, send chunks in batches rather than one call per chunk, and handle rate limits with retries and backoff. Record which embedding model produced the vectors on the document itself, so you can re-index cleanly if you ever change models.

For the vector store, anything with metadata filtering works: Qdrant, pgvector, or a managed option. The filter on `documentId` and `ownerId` is non-negotiable, because it is what stops one user's question from retrieving another user's content. If you want to understand how the search itself behaves, I explain similarity metrics, HNSW and filtering in [how vector search works](/blog/how-vector-search-works).

## Step 5 – Retrieval for each question

When a question arrives, three things happen before the LLM is called.

1. **Rewrite follow-ups.** "What about the second clause?" means nothing on its own. Use the last few messages to rewrite it into a standalone question before embedding it.
2. **Retrieve with filters.** Embed the question and fetch the top chunks where `documentId` is the current document and `ownerId` is the signed-in user.
3. **Check the scores.** If even the best match is weak, it is often better to tell the user the document does not seem to cover this than to let the model improvise.

Logging the retrieved chunks for each question is the single most useful debugging tool in a RAG app. When an answer is wrong, the log tells you straight away whether retrieval or generation was at fault.

## Step 6 – Generating answers with citations

The prompt gives the model numbered context blocks, each labelled with file name and page, and asks it to cite them inline.

```ts
const context = retrieved
  .map((c, i) => `[${i + 1}] ${c.metadata.fileName}, page ${c.metadata.page}\n${c.text}`)
  .join("\n\n");

const system =
  "You answer questions about the user's document. Use only the numbered context. " +
  "Cite sources inline like [1]. If the answer is not in the context, say so plainly.";

const stream = await llm.stream([
  { role: "system", content: system },
  { role: "user", content: `Context:\n${context}\n\nQuestion: ${question}` },
]);
```

Here `llm` is a LangChain chat model instance. Streaming the answer to the browser matters for perceived speed, because users see text appear right away instead of waiting for the full response. I cover the transport side of that in [LLM streaming architecture](/blog/llm-streaming-architecture).

Once the stream finishes, parse the `[n]` markers, map each one to the chunk you sent, and return a sources array with file name, page and snippet. Discard any number that does not match a real chunk. In the UI, render each citation as a small chip that opens the PDF viewer at the right page, so the user can check the claim in one click.

## Step 7 – The chat UI

A few details make the interface feel dependable:

- Show document status clearly. A document still `processing` should disable the chat input with a short explanation, and `failed` should show the reason and a retry button.
- Keep conversation history per document, stored on the server, so a refresh does not lose context.
- Show sources under each answer, not only inline markers, so users can scan them.
- Offer suggested first questions based on the document, which helps people who do not know what to ask.

## What I would watch for in production

- **Cost:** embedding is a one-off cost per document, but every question pays for retrieval context in the prompt. Keep the number of chunks sent to the LLM small and relevant.
- **Limits:** cap file size and page count per plan, and be clear with users about them.
- **Deletion:** when a user deletes a document, delete its chunks and stored file too. Stale vectors are both a privacy issue and a source of confusing answers.
- **Evaluation:** keep a small set of test PDFs with questions and expected source pages, and run it whenever you change chunking, embeddings or prompts.

## Key takeaways

- Never embed inside the upload request. Process documents in a retryable, idempotent background job.
- Keep page numbers and owner IDs on every chunk from the start, because citations and access control depend on them.
- Rewrite follow-up questions before retrieval, and filter every search by document and user.
- Log retrieved chunks for each answer so you can tell retrieval failures from generation failures.
- Validate citations in code and link them to the exact page in the viewer.

## Building your own document assistant

A Chat with PDF prototype comes together quickly. Making it reliable for real documents, many users and ongoing changes is where the engineering goes. If you want a document Q&A feature built into your product, I take on [RAG application development](/rag-application-development) from ingestion through to the chat UI, usually on [Next.js](/nextjs-developer). You can [tell me about your project here](/hire-me).
