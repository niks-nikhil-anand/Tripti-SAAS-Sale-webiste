---
title: How Vector Search Works – Embeddings, HNSW and Hybrid Search
description: A practical guide to vector search, covering embeddings, cosine and dot product similarity, HNSW indexes, Qdrant, metadata filters and hybrid retrieval.
category: rag
tags: [vector search, embeddings, qdrant, hnsw, hybrid search]
publishedAt: 2026-09-24
services: [rag-developer, ai-developer]
projects: [chat-with-pdf, blog-automation]
related: [rag-architecture-explained, building-chat-with-pdf]
featured: false
---

Vector search works by converting text (or images, or audio) into lists of numbers called embeddings, storing them in an index, and at query time finding the stored vectors that sit closest to the query's vector. "Closest" is measured with a similarity metric such as cosine similarity, and an approximate nearest neighbour index like HNSW makes that lookup fast without comparing the query against every vector. Add metadata filters and keyword matching on top, and you have the retrieval layer behind most RAG systems.

## What an embedding actually is

An embedding model reads a piece of text and outputs a fixed-length vector, often several hundred to a few thousand numbers. You cannot read meaning from any individual number. What matters is geometry: the model is trained so that texts with similar meaning produce vectors pointing in similar directions.

That is why "How do I reset my password?" and "I forgot my login credentials" end up near each other even though they share almost no words, while "password" in a security policy and "password" in a crossword clue may land further apart than you would expect.

A few properties follow from this:

- Vectors are only comparable if they come from the same model. Switching models means re-embedding everything.
- The model decides what "similar" means. A general-purpose model may not separate two closely related legal clauses the way a domain expert would.
- Embeddings capture topic and intent well, but they are weaker at exact tokens like SKUs, version strings, error codes and rare names.

## Similarity metrics

Once everything is a vector, relevance becomes a distance calculation. The three common metrics are:

- **Cosine similarity:** compares the angle between two vectors and ignores their length. It is the usual default for text embeddings.
- **Dot product:** multiplies and sums the components. On normalised vectors (length 1) it ranks results the same way as cosine, and it is cheap to compute. Many embedding APIs return normalised vectors for exactly this reason.
- **Euclidean distance:** the straight-line distance between two points. It is common in image and some recommendation workloads, and less common for text.

The rule that matters in practice is to use the metric the embedding model was trained for. The model's documentation will say. Picking the wrong one does not throw an error; it just returns subtly worse results.

```python
import numpy as np

def cosine(a: np.ndarray, b: np.ndarray) -> float:
    return float(np.dot(a, b) / (np.linalg.norm(a) * np.linalg.norm(b)))

a = np.random.rand(8)
b = np.random.rand(8)

# With normalised vectors, cosine and dot product give the same result
a = a / np.linalg.norm(a)
b = b / np.linalg.norm(b)
assert abs(cosine(a, b) - float(np.dot(a, b))) < 1e-6
```

## Why exact search does not scale

The simplest vector search compares the query against every stored vector and sorts the scores. This is called brute-force or flat search, and it is perfectly fine for a few thousand vectors. It even gives exact results.

The cost grows linearly with the collection, though. Every query touches every vector, across every dimension. Once you have millions of chunks and many concurrent users, that becomes too slow and too expensive. Approximate nearest neighbour (ANN) indexes solve this by giving up a tiny amount of accuracy in exchange for searching only a small fraction of the data.

## How HNSW works, conceptually

HNSW (Hierarchical Navigable Small World) is the ANN index used by default in Qdrant and many other vector databases. You do not need the maths to use it well, but the mental model helps you tune it.

Picture each vector as a node in a graph, connected to a handful of its nearest neighbours. Searching means starting at some node and repeatedly hopping to whichever neighbour is closer to the query, until no neighbour is closer. That alone can get stuck in a local area, so HNSW adds layers:

1. The top layer contains only a few nodes with long-range connections, like a motorway network.
2. Each layer below contains more nodes with shorter connections, like main roads and then local streets.
3. A search enters at the top, greedily moves towards the query, then drops down a layer and repeats, refining the position at each level.
4. At the bottom layer, which contains every vector, it explores a candidate list around the best area found and returns the top results.

Three settings control the trade-offs:

- **m:** how many connections each node keeps. More connections mean better recall and more memory.
- **ef_construct:** how thoroughly the graph is built. Higher values mean a better graph and slower indexing.
- **ef (search time):** how many candidates are explored per query. Higher values mean better recall and slower queries.

The defaults are sensible for most RAG workloads. I only change them after measuring recall against a flat search on a sample of real queries.

## Vector search in Qdrant

Qdrant stores **points**, where each point has an ID, a vector (or several named vectors) and a JSON **payload** for metadata. Points live in a **collection** that defines the vector size and distance metric.

```ts
import { QdrantClient } from "@qdrant/js-client-rest";

const qdrant = new QdrantClient({ url: process.env.QDRANT_URL });

await qdrant.createCollection("chunks", {
  vectors: { size: 1536, distance: "Cosine" },
});

await qdrant.createPayloadIndex("chunks", {
  field_name: "tenantId",
  field_schema: "keyword",
});

const results = await qdrant.search("chunks", {
  vector: queryEmbedding,
  limit: 8,
  with_payload: true,
  filter: {
    must: [
      { key: "tenantId", match: { value: tenantId } },
      { key: "documentId", match: { any: selectedDocIds } },
    ],
  },
});
```

The vector `size` must match your embedding model's output dimension. The payload index on `tenantId` matters because it lets Qdrant apply the filter efficiently instead of scanning payloads.

In my [blog automation project](/projects/blog-automation) I used Qdrant for two jobs beyond plain retrieval: finding existing articles that are semantically close to a new draft, to suggest internal links, and flagging drafts that are too similar to something already published.

## Metadata filtering

Pure similarity is rarely what an application needs. Users want results from their workspace, from a chosen document, from a date range or in a given language. Metadata filters restrict the search to points whose payload matches a condition.

How the filter interacts with the ANN index matters. If you search first and filter afterwards, a strict filter can throw away most of the results and leave you with too few. Qdrant applies filters during the graph traversal, and it switches strategy when a filter is very selective, which avoids that problem as long as the filtered fields are indexed.

In a multi-tenant product, the tenant filter is also an access control rule. Build it on the server from the authenticated session, never from a value the client sends.

## Hybrid search

Because embeddings are weak on exact terms, many production systems combine two retrievers:

- **Dense retrieval:** the vector search described above, good at meaning and paraphrase.
- **Sparse or keyword retrieval:** BM25 or learned sparse vectors, good at exact words, codes and names.

The two result lists are merged, commonly with Reciprocal Rank Fusion (RRF). RRF ignores the raw scores, which are not comparable across methods, and instead rewards documents that rank highly in either list.

```ts
function reciprocalRankFusion(lists: string[][], k = 60) {
  const scores = new Map<string, number>();
  for (const list of lists) {
    list.forEach((id, rank) => {
      scores.set(id, (scores.get(id) ?? 0) + 1 / (k + rank + 1));
    });
  }
  return [...scores.entries()].sort((a, b) => b[1] - a[1]).map(([id]) => id);
}
```

Qdrant can store dense and sparse vectors on the same point and run the fusion inside a single query, which saves you from maintaining a separate keyword engine. If your users search mostly in natural language about concepts, dense search alone may be enough. If they paste error messages, part numbers or names, hybrid search is usually worth it.

## When vector search is the wrong tool

Vector search answers "what is most similar to this?". It does not answer "how many?", "which is the latest?" or "list every record where X is true". Those are database queries. Forcing them through similarity search gives partial, unordered results. A good pattern is to extract structured fields during ingestion into PostgreSQL or the payload, then use real filters and aggregations for those questions and reserve vector search for fuzzy, meaning-based lookup.

It is also unnecessary for tiny datasets. If you have a few hundred FAQ entries, a flat search in memory or even a good keyword search may be simpler to run and easier to reason about.

## Key takeaways

- Embeddings map meaning to geometry, and only vectors from the same model can be compared.
- Use the similarity metric the embedding model was designed for, usually cosine for text.
- HNSW trades a little accuracy for large speed gains, and its defaults suit most RAG workloads.
- Index the payload fields you filter on, and treat tenant filters as security rules.
- Add hybrid search when users rely on exact terms that embeddings handle poorly.

## Getting vector search right in your product

Retrieval quality is the part of an AI feature users feel most, even if they never see it. If you are designing search, recommendations or a RAG pipeline and want a second pair of eyes on embeddings, indexing or filtering, my [AI development work](/ai-developer) covers exactly this. For how retrieval fits into the full pipeline, see [RAG architecture explained](/blog/rag-architecture-explained), or [reach out here](/hire-me) to discuss your project.
