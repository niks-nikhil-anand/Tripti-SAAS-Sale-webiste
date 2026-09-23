import type { CaseStudy } from "@/types/content";

/**
 * Technical case studies. Results stay empty until an outcome is verified;
 * everything else describes the engineering, not claims about it.
 */
export const caseStudies: CaseStudy[] = [
  // ---------------------------------------------------------------------------
  // AI Avatar
  // ---------------------------------------------------------------------------
  {
    slug: "ai-avatar",
    title: "AI Interview Avatar",
    metaTitle: "AI Interview Avatar: Real-Time Voice AI Case Study",
    metaDescription:
      "How I built a real-time AI interview avatar with Next.js, Node.js, OpenAI and HeyGen: speech-to-text, streamed follow-up questions, turn-taking and feedback.",
    category: "Conversational AI",
    tagline:
      "A talking video interviewer that listens, asks its own follow-up questions and writes structured feedback.",
    summary:
      "Real-time interview avatar: speech-to-text, LLM-generated follow-ups, streamed speech through HeyGen, and structured feedback at the end.",
    stack: ["Next.js", "Node.js", "OpenAI", "HeyGen", "WebSockets", "TypeScript"],
    problem: [
      "Practising for interviews usually means reading a static list of questions or booking time with another person. A question list never reacts to what the candidate actually said, so it cannot probe a vague answer or follow an interesting thread. A human mock interviewer can, but they are hard to schedule and rarely available for the tenth repetition of the same round.",
      "The goal was an interviewer that behaves like a person on a video call: it speaks, waits, listens, and decides what to ask next from the answer it just heard. That puts hard constraints on the system. Every stage between the candidate finishing a sentence and the avatar starting to reply adds delay, and a conversation that stalls for several seconds stops feeling like a conversation at all.",
    ],
    overview: [
      "The app is a Next.js front end with a Node.js session service behind it. The browser captures microphone audio and streams it to a speech-to-text step. Final transcripts go to an OpenAI model that holds the interview plan, the running transcript and the role being practised, and it returns the next question as a token stream.",
      "Those tokens are grouped into short sentences and sent to HeyGen, which renders the avatar speaking them over a streaming video session. When the interview ends, a separate evaluation pass reads the full transcript and produces structured feedback: per-question notes, strengths, gaps and suggested better answers, validated against a schema before it is shown to the candidate.",
    ],
    requirements: [
      "Hold a spoken, two-way interview in the browser with no plugin or native app install.",
      "Generate each next question from the candidate's previous answer instead of reading from a fixed script.",
      "Start the avatar's reply quickly after the candidate stops speaking, so pauses feel natural.",
      "Handle turn-taking: detect the end of an answer and stop the avatar if the candidate interrupts.",
      "Keep the interview on topic for the chosen role, seniority and interview type.",
      "Produce structured, question-by-question feedback once the session ends.",
      "Store transcripts per session so feedback can be regenerated without replaying the interview.",
    ],
    challenges: [
      {
        title: "Latency stacks up across stages",
        text: "Speech recognition, model inference, speech synthesis and avatar rendering each add their own delay, and running them strictly one after another makes every reply feel slow. The pipeline had to overlap stages, so the avatar can start speaking the first sentence of a reply while the model is still generating the rest of it.",
      },
      {
        title: "Knowing when the candidate has finished",
        text: "People pause mid-thought, and a short silence is not always the end of an answer. Cutting in too early is rude; waiting too long feels dead. End-of-turn detection combines voice activity with a silence window and the transcript itself, so a trailing 'and' or an unfinished clause extends the wait instead of triggering a reply.",
      },
      {
        title: "Interruptions and barge-in",
        text: "If the candidate starts talking while the avatar is mid-sentence, the avatar has to stop, not finish its paragraph. That requires cancelling the in-flight model stream, clearing queued speech on the avatar session, and recording which part of the question was actually heard so the transcript stays accurate.",
      },
      {
        title: "Follow-ups that stay on track",
        text: "A free-running model will happily chase tangents or ask three questions at once. The prompt carries an explicit interview plan with topics to cover, and each turn the model chooses between probing the last answer and moving to the next topic, returning one question at a time.",
      },
      {
        title: "Feedback that is specific, not generic",
        text: "Asking a model to 'give feedback' produces vague encouragement. The evaluation step instead works from the stored transcript with a rubric per question type and a strict output schema, and every comment must point back to something the candidate actually said in that answer.",
      },
    ],
    architecture: {
      caption:
        "One conversational turn, from the candidate's voice to the avatar's reply.",
      steps: [
        "Mic audio stream",
        "Speech-to-text",
        "End-of-turn detection",
        "LLM next question",
        "Sentence chunking",
        "HeyGen avatar speech",
        "Transcript store",
        "Structured feedback",
      ],
      notes: [
        "The Node.js session service owns conversation state; the browser only streams audio and renders video, which keeps prompts and API keys off the client.",
        "Model output is streamed and cut at sentence boundaries, so speech synthesis starts on the first complete sentence rather than waiting for the whole reply.",
        "Each session has a state machine (listening, thinking, speaking, interrupted) that decides which events are allowed at any moment and prevents overlapping replies.",
        "Feedback generation runs after the interview on the saved transcript, fully separate from the real-time path, so it can use a slower, more careful prompt.",
      ],
    },
    stackDetail: [
      { group: "Frontend", items: ["Next.js (App Router)", "TypeScript", "Web Audio API", "Tailwind CSS"] },
      { group: "Realtime backend", items: ["Node.js", "WebSockets", "Session state machine"] },
      { group: "AI services", items: ["OpenAI (LLM)", "OpenAI speech-to-text", "HeyGen streaming avatar"] },
      { group: "Data", items: ["Session transcripts", "Interview plans per role", "JSON schema validation"] },
    ],
    implementation: [
      {
        title: "Streaming audio capture",
        text: "The browser captures microphone input with the Web Audio API, encodes small frames and sends them over a WebSocket to the session service. Partial transcripts come back for on-screen captions, while only finalised segments are appended to the conversation that the model sees.",
      },
      {
        title: "Turn manager as a state machine",
        text: "A small explicit state machine sits in the session service. Events such as speech started, silence detected, model token received and avatar finished speaking move it between states. Anything that arrives in the wrong state, like a second reply request while one is in flight, is dropped rather than queued.",
      },
      {
        title: "Question generation with an interview plan",
        text: "The system prompt includes the role, seniority, a list of topics with coverage flags and a short rolling summary of earlier answers. The model returns one question per turn, and the service marks topics as covered so the interview progresses instead of circling the same area.",
      },
      {
        title: "Sentence-level hand-off to the avatar",
        text: "Tokens from the model stream are buffered until a sentence boundary, then sent to the HeyGen session as a separate speak task. This keeps the first spoken words close to the start of generation and gives natural points at which an interruption can cancel the remaining speech.",
      },
      {
        title: "Schema-checked feedback",
        text: "After the call ends, the transcript is split by question and sent to an evaluation prompt that must return JSON matching a defined schema: score band, what went well, what was missing and an improved sample answer. Invalid output is retried once with the validation error attached.",
      },
    ],
    decisions: [
      {
        title: "Stream sentences instead of whole replies",
        text: "Sending complete replies to the avatar is simpler and gives smoother prosody across a paragraph. I chose sentence-level streaming because it cuts the silent gap before the avatar speaks, and interview questions are short enough that sentence breaks rarely sound unnatural.",
      },
      {
        title: "Server-held state, thin client",
        text: "Keeping the transcript and turn logic in the browser would reduce server work. I kept it on the Node.js service so prompts, keys and the interview plan never reach the client, and so a page refresh can resume the same session instead of losing it.",
      },
      {
        title: "Separate real-time and evaluation paths",
        text: "One model call could ask questions and grade answers as it goes, but that slows every turn and mixes two jobs in one prompt. Splitting them lets the live path stay fast and small while the feedback pass runs later with a longer, stricter rubric.",
      },
      {
        title: "Hosted avatar over self-rendered video",
        text: "Rendering a talking head myself would give more control over lip-sync and cost, but it is a large project on its own. Using HeyGen's streaming avatar kept the work focused on conversation quality, with the trade-off of depending on a third-party session API.",
      },
    ],
    performance: [
      {
        title: "Overlapping pipeline stages",
        text: "Transcription, generation and speech run concurrently wherever the data allows. The model begins as soon as the turn is final, and the avatar begins on the first sentence, so the perceived wait is closer to the slowest single stage than to the sum of all of them.",
      },
      {
        title: "Short, bounded prompts",
        text: "Long transcripts make every turn slower. The live prompt carries a rolling summary of earlier answers plus only the latest exchange in full, which keeps the token count per turn roughly flat as the interview gets longer.",
      },
      {
        title: "Warm sessions",
        text: "The avatar session and WebSocket connection are opened while the candidate is reading the instructions, before the first question. That moves connection setup and avatar start-up out of the moment where the candidate is waiting for the interviewer to speak.",
      },
      {
        title: "Cheap cancellation",
        text: "Interruptions abort the model stream with an AbortController and clear the avatar's speech queue in the same handler. Nothing continues generating tokens that will never be spoken, which saves cost and stops stale audio from leaking into the next turn.",
      },
    ],
    screenshots: [
      "Interview room: the avatar video on the left, live captions of the candidate's speech underneath, and a status pill showing listening, thinking or speaking.",
      "Session setup screen where the candidate picks role, seniority and interview type, with a microphone check before the avatar joins.",
      "Feedback report listing each question asked, the candidate's transcribed answer, strengths, gaps and a suggested stronger answer.",
    ],
    results: [],
    takeaways: [
      "In voice interfaces, perceived latency is a product decision as much as an engineering one: where you cut the stream and what the user sees while waiting matter as much as raw model speed.",
      "An explicit state machine for turn-taking removed a whole class of bugs around double replies and overlapping audio that ad hoc flags kept reintroducing.",
      "Separating the live conversation from the evaluation pass let each prompt be tuned for its own job instead of compromising between speed and depth.",
      "Structured output with schema validation is what makes model feedback usable in a UI; free text was too inconsistent to render reliably.",
    ],
    relatedPages: ["ai-developer", "llm-developer", "ai-avatar-development", "nextjs-developer"],
  },

  // ---------------------------------------------------------------------------
  // Blog Automation
  // ---------------------------------------------------------------------------
  {
    slug: "blog-automation",
    title: "AI Blog Automation Pipeline",
    metaTitle: "AI Blog Automation Pipeline with Qdrant: Case Study",
    metaDescription:
      "A Next.js and Node.js pipeline that turns trending topics into reviewed, SEO-ready articles, using OpenAI and Qdrant for internal links and duplicate checks.",
    category: "AI Automation",
    tagline:
      "From a trending topic to a reviewed, SEO-checked article, with vector search guarding against repeats.",
    summary:
      "Staged content pipeline: topic discovery, keyword research, outline, generation, SEO pass, human review and publishing, with Qdrant for links and dedupe.",
    stack: ["Next.js", "Node.js", "OpenAI", "Qdrant", "TypeScript"],
    problem: [
      "Publishing steadily on a blog takes a lot of repetitive work before any writing happens: spotting topics worth covering, checking which keywords they map to, drafting an outline and then linking the new post into existing ones. A single prompt that says 'write a blog post about X' skips all of that and tends to produce generic articles that overlap with what the site already has.",
      "The brief was a pipeline that automates the mechanical stages but keeps an editor in control. Each stage needed an output that a person could inspect and correct, and the system had to know what the site had already published so it would suggest relevant internal links and refuse to generate near-copies of existing posts.",
    ],
    overview: [
      "The pipeline runs as a sequence of jobs on a Node.js worker, with a Next.js dashboard for editors. A topic moves through keyword research, outline, draft, SEO processing and review, and each stage writes its result to the database so the next stage can start, retry or be rerun on its own.",
      "Qdrant holds embeddings of every published article and of the section-level chunks inside them. Before generation, a candidate topic is compared against that index to catch near-duplicates. After drafting, the same index is queried per section to suggest internal links to related posts, which the editor accepts or rejects during review.",
    ],
    requirements: [
      "Collect trending topic candidates and let an editor shortlist which ones enter the pipeline.",
      "Produce keyword research and an outline that an editor can edit before any article text is generated.",
      "Generate drafts section by section, following the approved outline and target keywords.",
      "Block or flag topics that are too close to something already published.",
      "Suggest internal links to existing articles based on meaning, not just matching words.",
      "Run an SEO pass covering title, meta description, headings, slug and keyword placement.",
      "Require human approval before anything is published.",
    ],
    challenges: [
      {
        title: "Duplicate content before it is written",
        text: "Checking for duplicates after generation wastes tokens and editor time. The check had to happen at the topic and outline stage, when there is only a title and a list of headings to compare, which means comparing intent rather than full text against the existing archive.",
      },
      {
        title: "Internal links that make sense",
        text: "Keyword matching suggests links whenever two posts share a word, which produces irrelevant anchors. Links needed to connect sections that are genuinely about the same thing, and to avoid linking one post to the same target repeatedly or to itself.",
      },
      {
        title: "Long-form coherence",
        text: "Generating a full article in one call drifts off the outline, repeats points and loses keywords in later sections. Generating per section fixes that but can make the piece read like stitched fragments, so each section call needs enough context about what came before.",
      },
      {
        title: "Keeping stages recoverable",
        text: "Any external call can fail or time out, and an editor may want to redo only the outline without regenerating everything. The pipeline needed idempotent stages with stored inputs and outputs, so a single step can be retried or rerun without side effects on the rest.",
      },
    ],
    architecture: {
      caption:
        "The article lifecycle, from a trending topic to a published post.",
      steps: [
        "Trending topic intake",
        "Keyword research",
        "Duplicate check (Qdrant)",
        "Outline generation",
        "Section drafting",
        "SEO and link pass",
        "Human review",
        "Publish and index",
      ],
      notes: [
        "Each stage is a job with a status, inputs and outputs stored in the database, so the dashboard shows exactly where every article sits and what each stage produced.",
        "Qdrant stores two kinds of vectors: one per article (title plus summary) for duplicate checks, and one per section chunk for internal-link suggestions.",
        "Publishing writes the final article to the CMS and then embeds it into Qdrant, so the next topic is always checked against an up-to-date archive.",
        "The review step is a hard gate: no stage after it runs without an editor's approval recorded against the article.",
      ],
    },
    stackDetail: [
      { group: "Dashboard", items: ["Next.js (App Router)", "TypeScript", "Tailwind CSS"] },
      { group: "Pipeline", items: ["Node.js workers", "Job queue with retries", "Stage status tracking"] },
      { group: "AI", items: ["OpenAI chat models", "OpenAI embeddings", "Structured JSON outputs"] },
      { group: "Search and storage", items: ["Qdrant vector database", "Payload filters", "Relational store for jobs"] },
    ],
    implementation: [
      {
        title: "Topic intake and shortlisting",
        text: "Candidate topics are collected from trend sources and normalised into a common shape with a title, source and short description. The dashboard lists them with a similarity warning already attached, so an editor can see at a glance whether the site has covered a topic before choosing to shortlist it.",
      },
      {
        title: "Duplicate detection with Qdrant",
        text: "A shortlisted topic and its keyword set are embedded and searched against article-level vectors in Qdrant. Results above a similarity threshold mark the topic as a likely duplicate and show the closest existing posts, and the editor can drop it, merge it into an update or override with a reason.",
      },
      {
        title: "Outline-first generation",
        text: "The model first returns a structured outline: H2 and H3 headings, the intent of each section and which keywords belong where. Editors can change it in the dashboard. Only after approval does drafting start, one section at a time, with the outline, prior section summaries and the target keywords in each prompt.",
      },
      {
        title: "Vector-based internal linking",
        text: "Each drafted section is embedded and searched against section-level chunks of published articles, with a payload filter that excludes the article itself. The top matches become link suggestions with a proposed anchor phrase from the draft, and the editor accepts or rejects each one during review.",
      },
      {
        title: "SEO processing",
        text: "A deterministic pass checks heading order, title and meta description length, slug format and whether target keywords appear in the title, first section and at least one heading. A model call rewrites only the fields that fail, so the checks stay predictable and the model has a narrow job.",
      },
    ],
    decisions: [
      {
        title: "Staged pipeline over one big prompt",
        text: "A single prompt is faster to build and cheaper per article. I split the work into stages because each one produces something an editor can inspect and fix, failures are isolated to one step, and prompts stay small enough to reason about and test.",
      },
      {
        title: "Qdrant for similarity rather than SQL text search",
        text: "Full-text search would have been simpler to run alongside the main database. Semantic search was the point, though: two articles can cover the same idea with different wording. Qdrant's payload filtering also made it easy to exclude drafts, the current article and unpublished content.",
      },
      {
        title: "Two vector granularities",
        text: "Storing only whole-article vectors keeps the index small but makes link suggestions vague. Storing only chunks makes duplicate checks noisy. Keeping both, in separate collections, costs more storage but lets each query use the level of detail it actually needs.",
      },
      {
        title: "Human review as a hard gate",
        text: "Automatic publishing would remove the last manual step. I kept a required approval because generated content can be confidently wrong, and publishing under someone's name needs a person who has read it. The pipeline's job is to make that review quick, not to skip it.",
      },
    ],
    performance: [
      {
        title: "Early rejection saves the expensive steps",
        text: "The duplicate check runs on a short embedding of the topic and keywords, before any long generation. Topics that fail never reach the drafting stage, which is where most of the token spend and waiting time in the pipeline sits.",
      },
      {
        title: "Parallel section drafting where safe",
        text: "Sections that do not depend on each other can be drafted concurrently once the outline is approved, each with the outline and keyword map as shared context. A final coherence pass then smooths transitions, rather than forcing every section to wait for the previous one.",
      },
      {
        title: "Cached embeddings",
        text: "Embeddings are stored with a content hash, so rerunning a stage on unchanged text reuses the existing vector instead of calling the embeddings API again. This keeps reruns after an outline tweak cheap and fast.",
      },
      {
        title: "Filtered vector queries",
        text: "Qdrant queries apply payload filters for status and article id before ranking, so searches only consider published content and skip the draft in progress. This keeps result sets small and avoids post-filtering large lists in application code.",
      },
    ],
    screenshots: [
      "Pipeline board showing articles as cards in columns for each stage, with status badges for running, failed and waiting for review.",
      "Topic detail view with the duplicate check result, listing the closest existing posts and their similarity, plus shortlist and override actions.",
      "Review screen with the draft on one side and suggested internal links, SEO checks and the approve button on the other.",
    ],
    results: [],
    takeaways: [
      "Breaking generation into inspectable stages mattered more for output quality than any single prompt improvement did.",
      "Vector search is most useful here as a guardrail: knowing what already exists changes what the pipeline should generate next.",
      "Deterministic checks around a model, rather than asking the model to self-check, made the SEO stage predictable and easy to debug.",
      "Storing every stage's input and output turned retries, reruns and audits from special cases into ordinary operations.",
    ],
    relatedPages: ["ai-developer", "generative-ai-developer", "automation-development", "saas-development"],
  },

  // ---------------------------------------------------------------------------
  // Chat with PDF
  // ---------------------------------------------------------------------------
  {
    slug: "chat-with-pdf",
    title: "Chat with PDF (RAG)",
    metaTitle: "Chat with PDF: RAG App with Page Citations Case Study",
    metaDescription:
      "Building a chat-with-PDF RAG app in Next.js and LangChain: background ingestion, chunking, embeddings, vector search and answers with page-level citations.",
    category: "RAG Application",
    tagline:
      "Ask questions about your documents and get answers that point to the exact page they came from.",
    summary:
      "Retrieval-augmented chat over uploaded PDFs: background ingestion, chunking, embeddings, vector search and grounded answers with page citations.",
    stack: ["Next.js", "LangChain", "RAG", "Embeddings", "Vector search", "TypeScript"],
    problem: [
      "Long PDFs such as contracts, manuals and research papers are slow to search by hand, and keyword search inside a viewer only finds exact words. Pasting a whole document into a chat model is not a real answer either: large files exceed the context window, costs grow with every question, and the model gives no reliable way to check where an answer came from.",
      "Users needed to ask questions in plain language and trust the reply. That meant answers grounded only in the uploaded document, a clear statement when the document does not contain the answer, and a citation to the page so the user can open the source and verify it in a click.",
    ],
    overview: [
      "The app separates ingestion from chat. When a user uploads a PDF, it is stored and a background job extracts text page by page, splits it into overlapping chunks, embeds each chunk and writes the vectors with page metadata to a vector index. The UI shows processing status and enables chat once the document is ready.",
      "At question time, LangChain rewrites the question into a standalone query using the chat history, retrieves the most relevant chunks for that document, and passes them to the LLM with instructions to answer only from the provided context and cite page numbers. Citations render as links that open the viewer at the right page.",
    ],
    requirements: [
      "Accept PDF uploads without blocking the UI while large files are processed.",
      "Show clear ingestion status: queued, extracting, embedding, ready or failed.",
      "Answer questions using only the content of the selected document or documents.",
      "Attach page-level citations to every answer and link each citation to the source page.",
      "Say plainly when the document does not contain enough information to answer.",
      "Support follow-up questions that refer to earlier turns in the conversation.",
      "Keep each user's documents isolated from other users in storage and retrieval.",
    ],
    challenges: [
      {
        title: "Preserving page numbers through chunking",
        text: "Standard text splitters work on one long string and lose track of where each piece came from. Citations need the page, so extraction keeps text per page and chunking carries page metadata forward, including chunks that span a page break and must record both pages.",
      },
      {
        title: "Chunk size versus answer quality",
        text: "Small chunks retrieve precisely but cut sentences and definitions away from their context. Large chunks keep context but dilute similarity scores and fill the prompt with irrelevant text. The splitter uses moderate chunks with overlap, respecting paragraph boundaries where the extracted text makes them visible.",
      },
      {
        title: "Follow-up questions",
        text: "A question like 'what about the second clause?' means nothing to a vector search on its own. Retrieval needed a condensing step that rewrites the latest message into a standalone question using the conversation history, before any embedding happens.",
      },
      {
        title: "Grounding and refusing to guess",
        text: "Language models fill gaps confidently. The answer prompt restricts the model to the retrieved context, requires a page reference for every claim, and gives it an explicit way to say the answer is not in the document, which the UI shows as a distinct state rather than an error.",
      },
    ],
    architecture: {
      caption:
        "Ingestion runs in the background; chat queries only the finished index.",
      steps: [
        "PDF upload",
        "Background job queue",
        "Per-page text extraction",
        "Chunking with metadata",
        "Embeddings to index",
        "Query and retrieve",
        "LLM grounded answer",
        "Cited response",
      ],
      notes: [
        "Uploads return immediately with a document id; extraction and embedding run as a job whose status the UI polls, so large files never hold a request open.",
        "Every vector carries document id, owner id and page numbers as metadata, and every search is filtered by owner and document before similarity ranking.",
        "LangChain chains handle question condensing, retrieval and answer generation as separate steps, which makes each one testable and swappable.",
        "Answers stream to the client token by token, and citations are parsed from the final output and matched against the retrieved chunks before rendering.",
      ],
    },
    stackDetail: [
      { group: "Frontend", items: ["Next.js (App Router)", "TypeScript", "Tailwind CSS", "PDF viewer"] },
      { group: "RAG pipeline", items: ["LangChain", "Text splitters", "Retrievers", "Prompt templates"] },
      { group: "AI and search", items: ["LLM chat model", "Embeddings model", "Vector database"] },
      { group: "Infrastructure", items: ["Object storage for files", "Background job worker", "Relational store for metadata"] },
    ],
    implementation: [
      {
        title: "Upload and job hand-off",
        text: "The upload route validates type and size, stores the file and creates a document record in a queued state. It then enqueues an ingestion job and returns. The client polls a lightweight status endpoint and enables the chat input only when the job reports the document as ready.",
      },
      {
        title: "Page-aware extraction and splitting",
        text: "Text is extracted page by page and cleaned of repeated headers, footers and hyphenated line breaks. A recursive splitter then chunks each page with overlap, and chunk metadata records the start and end page so a citation can point to the right place even across a page break.",
      },
      {
        title: "Embedding and indexing",
        text: "Chunks are embedded in batches and upserted with document id, owner id, page range and chunk index. Batching keeps the number of API calls down, and a failed batch is retried on its own without restarting the whole document.",
      },
      {
        title: "Conversational retrieval chain",
        text: "Each question first passes through a condensing prompt that uses recent chat history to produce a standalone query. The retriever searches only the selected document's vectors, and the top chunks are formatted with their page labels so the model can reference them directly.",
      },
      {
        title: "Citation rendering",
        text: "The answer prompt asks for inline page markers. After streaming finishes, the server checks each marker against the pages of the chunks actually retrieved and drops any that do not match. The client turns valid markers into buttons that open the PDF viewer at that page.",
      },
    ],
    decisions: [
      {
        title: "Background ingestion instead of processing on upload",
        text: "Processing inside the upload request is simpler and gives an instant ready state for small files. Large PDFs would hit request time limits, though, so ingestion moved to a job. The cost is a status UI and polling, which is also where failure messages naturally live.",
      },
      {
        title: "Page-level over paragraph-level citations",
        text: "Highlighting the exact sentence would be more precise, but PDF text extraction rarely maps cleanly back to on-page coordinates. Page citations are reliable across very different PDF layouts and still let a user verify an answer quickly, so they were the right first level of detail.",
      },
      {
        title: "Metadata filters over one index per user",
        text: "Separate indexes per user give hard isolation but multiply index management. A shared index with mandatory owner and document filters on every query keeps operations simple, with the isolation enforced in the single retrieval function that every search goes through.",
      },
      {
        title: "LangChain for orchestration",
        text: "Writing the chain by hand would remove a dependency and some abstraction. LangChain's splitters, retrievers and prompt templates saved time on standard parts and made it straightforward to swap the embedding model or vector store, at the cost of tracking its API changes.",
      },
    ],
    performance: [
      {
        title: "Streaming answers",
        text: "The answer streams to the browser as it is generated, so users start reading almost as soon as retrieval finishes. Citation validation runs on the completed text, which keeps it accurate without delaying the first visible words.",
      },
      {
        title: "Bounded context per question",
        text: "Only a small number of top chunks go into the prompt, and near-duplicate chunks from overlapping splits are collapsed first. This keeps prompts short, lowers cost per question and reduces the chance of the model latching onto marginally relevant text.",
      },
      {
        title: "Batched, resumable ingestion",
        text: "Embedding requests are sent in batches, and progress is stored per batch. If a job is interrupted, it resumes from the last completed batch instead of re-embedding the whole document from the first page.",
      },
      {
        title: "Filter before rank",
        text: "Owner and document filters are applied inside the vector query, not after it. The search only ranks vectors from the relevant document, which keeps latency steady as the total number of stored documents grows.",
      },
    ],
    screenshots: [
      "Document library listing uploaded PDFs with processing status badges and a progress indicator for files still being embedded.",
      "Split chat view with the conversation on the left and the PDF viewer on the right, jumping to the page of a clicked citation.",
      "An answer showing inline page citation chips, and a separate message style for questions the document cannot answer.",
    ],
    results: [],
    takeaways: [
      "Most RAG quality problems traced back to ingestion: poor text extraction and careless chunking hurt answers more than the choice of model did.",
      "Citations only build trust if they are checked; validating markers against retrieved chunks stopped the model from citing pages it never saw.",
      "Treating 'not in the document' as a first-class answer made the app more honest and clearly more useful than one that always produces a reply.",
      "Moving slow work into background jobs made the whole product feel faster, even though total processing time was unchanged.",
    ],
    relatedPages: ["rag-developer", "rag-application-development", "ai-developer", "nextjs-developer"],
  },

  // ---------------------------------------------------------------------------
  // Vercel Clone
  // ---------------------------------------------------------------------------
  {
    slug: "vercel-clone",
    title: "Deployment Platform (Vercel Clone)",
    metaTitle: "Building a Vercel-Style Deployment Platform: Case Study",
    metaDescription:
      "A Vercel-style deployment platform with Next.js, MongoDB, GitHub OAuth and Docker: isolated builds, queued jobs, streamed logs, previews and subdomains.",
    category: "Developer Platform",
    tagline:
      "Connect a GitHub repo, push, and get an isolated build, live logs and a URL for every deployment.",
    summary:
      "Git-based deployment platform: GitHub OAuth, queued Docker builds, streamed logs, generated subdomains, preview deploys and team access.",
    stack: ["Next.js", "MongoDB", "GitHub OAuth", "Docker", "Node.js", "TypeScript"],
    problem: [
      "Hosting platforms that deploy straight from a Git push hide a lot of machinery: authenticating with GitHub, cloning code, running untrusted build scripts safely, storing output, routing a hostname to the right build and showing logs while it all happens. I wanted to build that machinery myself to understand where the hard parts actually are.",
      "The system had to handle several users pushing at once without one build affecting another, give each deployment its own address, and let a team share projects with sensible permissions. It also had to stay understandable when things went wrong, which in a build system means clear logs and clear states for every deployment.",
    ],
    overview: [
      "Users sign in with GitHub OAuth and pick a repository. The platform registers a webhook, so each push creates a deployment record in MongoDB and places a build job on a queue. Build workers take jobs one at a time, run each build inside a fresh Docker container and upload the output as a versioned artifact.",
      "A routing layer maps hostnames to deployments: the production subdomain points to the latest successful build on the main branch, and every other branch or commit gets its own preview URL. Build output is streamed line by line to the dashboard, and team members see projects according to their role.",
    ],
    requirements: [
      "Sign in with GitHub and connect repositories the user has access to.",
      "Trigger a deployment automatically on push, and manually from the dashboard.",
      "Run every build in an isolated container with resource limits and a timeout.",
      "Queue builds so bursts of pushes are processed in order without overloading workers.",
      "Stream build logs to the browser in real time and keep them for later viewing.",
      "Assign a generated subdomain per project and a unique preview URL per deployment.",
      "Support teams with owner, member and viewer roles on shared projects.",
    ],
    challenges: [
      {
        title: "Running untrusted build code",
        text: "A build script can do anything: install packages, run shell commands, loop forever. Each build runs in its own container from a known base image, with CPU and memory limits, a wall-clock timeout, no access to the host filesystem and only the environment variables configured for that project.",
      },
      {
        title: "Concurrent pushes and ordering",
        text: "Several pushes to the same branch within a short window should not race each other to production. The queue processes jobs per project in order, and when a newer commit for the same branch is already queued, older pending builds are marked superseded instead of being built.",
      },
      {
        title: "Live logs from a container",
        text: "Build output has to reach the browser as it is produced, survive a page refresh mid-build and remain readable afterwards. The worker reads container stdout and stderr as a stream, publishes lines to a channel for live viewers and appends them to storage for history.",
      },
      {
        title: "Routing hostnames to builds",
        text: "Every request to a generated subdomain must resolve to the right static output without a database lookup on every file. The router resolves hostname to deployment id once, caches the mapping and invalidates it when a new production deployment is promoted.",
      },
      {
        title: "GitHub permissions and tokens",
        text: "OAuth tokens grant access to a user's repositories and must never reach build containers or the client. Tokens are stored encrypted on the server, used only to clone at build time, and the clone happens before user code runs so the token is not present in the build environment.",
      },
    ],
    architecture: {
      caption:
        "From a git push to a live URL, with each build isolated in its own container.",
      steps: [
        "GitHub push webhook",
        "Deployment record created",
        "Build job queued",
        "Worker clones repo",
        "Docker container build",
        "Logs streamed live",
        "Artifact uploaded",
        "Subdomain routes traffic",
      ],
      notes: [
        "MongoDB stores users, teams, projects, deployments and log metadata; each deployment moves through queued, building, ready, failed or superseded states.",
        "Build workers are stateless and pull from the queue, so more workers can be added without changing the web app or the router.",
        "Build output is stored as an immutable artifact per deployment, which makes rollbacks a pointer change rather than a rebuild.",
        "The dashboard subscribes to a deployment's log channel over a streaming connection, and falls back to stored logs once the build finishes.",
      ],
    },
    stackDetail: [
      { group: "Dashboard and API", items: ["Next.js (App Router)", "TypeScript", "Tailwind CSS", "Route handlers"] },
      { group: "Auth and integrations", items: ["GitHub OAuth", "GitHub webhooks", "Role-based access control"] },
      { group: "Build system", items: ["Docker", "Node.js build workers", "Job queue", "Object storage for artifacts"] },
      { group: "Data and routing", items: ["MongoDB", "Reverse proxy with wildcard subdomains", "Hostname cache"] },
    ],
    implementation: [
      {
        title: "GitHub OAuth and repo connection",
        text: "Users authenticate with GitHub OAuth, and the platform lists repositories through the GitHub API using the stored token. Connecting a repo creates a project record, generates a subdomain slug, and registers a webhook with a signing secret that is verified on every incoming push event.",
      },
      {
        title: "Queue and worker loop",
        text: "Each push creates a deployment document and a queue job holding the project id, commit and branch. Workers claim jobs atomically so two workers never take the same build, update the deployment status as they go and release the job on completion, failure or timeout.",
      },
      {
        title: "Containerised build step",
        text: "The worker clones the repository at the exact commit into a temporary directory, starts a container from a base image with that directory mounted, runs install and build commands, then copies the output directory out. The container and the working directory are removed afterwards whatever the outcome.",
      },
      {
        title: "Log streaming",
        text: "Container output is read line by line, timestamped and published to a per-deployment channel. The dashboard opens a streaming connection to that channel for live builds. Lines are also written to storage in batches, so a user who opens the page later sees the full history.",
      },
      {
        title: "Preview deployments and promotion",
        text: "Every deployment receives a preview URL built from the project slug and a short deployment id. Successful builds on the production branch are promoted automatically by updating the project's production pointer, and any earlier successful deployment can be promoted manually to roll back.",
      },
      {
        title: "Team access",
        text: "Projects belong to a user or a team. Team members have owner, member or viewer roles, checked in one authorisation helper used by every route handler: viewers can read logs and URLs, members can trigger deployments, and only owners can change settings, environment variables or membership.",
      },
    ],
    decisions: [
      {
        title: "A fresh container per build",
        text: "Reusing warm build environments would be faster, since dependencies stay installed. A new container for every build is slower but guarantees no state leaks between projects or users, which matters more when running code the platform did not write.",
      },
      {
        title: "MongoDB for platform data",
        text: "A relational database would enforce relationships more strictly. Deployments, however, carry varied metadata such as build settings, commit details and log pointers that change as the product grows, and MongoDB's flexible documents made those iterations easy while the core relations stayed simple.",
      },
      {
        title: "Queued builds over immediate builds",
        text: "Starting a build the moment a webhook arrives is simpler and faster when traffic is light. A queue adds a component to run, but it caps concurrency, keeps ordering per project and lets the platform supersede stale builds instead of wasting resources on them.",
      },
      {
        title: "Immutable artifacts for rollbacks",
        text: "Overwriting a project's files in place would save storage. Keeping every successful build as its own artifact costs more space but makes preview URLs permanent and rollbacks instant, since promotion just moves a pointer and never triggers a rebuild.",
      },
    ],
    performance: [
      {
        title: "Dependency cache between builds",
        text: "Package manager caches are stored per project and mounted read-write into new containers, so a fresh container still avoids downloading every dependency from scratch. The cache is keyed by the lockfile, which keeps it correct when dependencies change.",
      },
      {
        title: "Cached hostname resolution",
        text: "The router caches the hostname to deployment mapping in memory and invalidates it on promotion. Serving a file then needs no database query, only a lookup and a fetch from artifact storage.",
      },
      {
        title: "Superseding stale builds",
        text: "When several commits land on one branch in quick succession, only the newest pending build runs. Workers spend their time on the commit that will actually be deployed, which keeps queues short during busy periods.",
      },
      {
        title: "Batched log writes",
        text: "Live log lines go to subscribers immediately but are persisted in batches rather than one write per line. This keeps database load low during noisy builds without delaying what the user sees in the dashboard.",
      },
    ],
    screenshots: [
      "Project dashboard with the production URL, latest deployment status, branch and commit, and a list of recent preview deployments.",
      "Deployment detail page streaming build logs in a terminal-style panel with a live status indicator and elapsed time.",
      "Team settings screen showing members, their roles and controls for inviting people and changing permissions.",
    ],
    results: [],
    takeaways: [
      "Isolation is the core feature of a build platform; everything else, from logs to previews, is easier once each build is a disposable, well-bounded unit.",
      "Explicit deployment states made both the UI and the debugging story clear, because every failure has a specific place in the lifecycle.",
      "Treating build output as immutable turned rollbacks and preview URLs into simple pointer changes instead of separate features to build.",
      "Queues are worth their operational cost as soon as work arrives in bursts and ordering matters.",
    ],
    relatedPages: ["nextjs-developer", "full-stack-developer", "saas-development", "aws-developer"],
  },

  // ---------------------------------------------------------------------------
  // Resume Analyzer
  // ---------------------------------------------------------------------------
  {
    slug: "resume-analyzer",
    title: "AI Resume Analyzer",
    metaTitle: "AI Resume Analyzer with ATS-Style Checks: Case Study",
    metaDescription:
      "An AI resume analyzer in Next.js and OpenAI: PDF parsing, job description matching, ATS-style keyword and formatting checks, and line-level rewrite suggestions.",
    category: "AI Tool",
    tagline:
      "Compare a resume against a job description and get specific, line-by-line changes to make.",
    summary:
      "Resume analysis tool: PDF parsing, JD comparison, keyword coverage, formatting and content checks, role matching and line-level suggestions.",
    stack: ["Next.js", "OpenAI", "Tailwind CSS", "TypeScript", "PDF parsing"],
    problem: [
      "Job seekers often send the same resume to every role and get little signal back about why it did not work. Generic advice such as 'use action verbs' or 'tailor your resume' is easy to find but hard to apply, because it never says which line to change or what the target job actually asks for.",
      "Applicant tracking systems add another layer: resumes with unusual layouts or missing keywords can be parsed badly before a person reads them. The tool needed to show how a resume reads to a parser, how well it covers a specific job description, and exactly which lines to rewrite, with suggestions grounded in the candidate's real experience.",
    ],
    overview: [
      "A user uploads a resume PDF and pastes a job description. The server extracts text and layout signals from the PDF, splits the resume into sections and lines, and hashes the file so a repeat upload skips parsing. The job description is parsed into required skills, preferred skills and responsibilities.",
      "Analysis combines deterministic checks with model calls. Code handles keyword coverage and formatting rules; an OpenAI model handles role matching, content quality and rewrite suggestions, returning structured JSON tied to specific line ids. The Tailwind UI shows an overview, a keyword gap list and the resume itself with suggestions pinned to each line.",
    ],
    requirements: [
      "Parse text-based PDF resumes into sections and individual lines with stable ids.",
      "Extract required and preferred skills and key responsibilities from a pasted job description.",
      "Report keyword coverage: which job terms appear in the resume, which are missing, and where.",
      "Flag formatting patterns that commonly confuse ATS parsers, such as tables, columns and images.",
      "Assess content quality, including vague bullets, missing outcomes and weak verbs.",
      "Give line-level rewrite suggestions that do not invent experience the candidate does not have.",
      "Cache parsed resumes so re-analysing against a new job description is fast.",
    ],
    challenges: [
      {
        title: "PDFs are layout, not documents",
        text: "A PDF stores positioned text fragments, not paragraphs or sections. Two-column layouts can come out interleaved, and bullet characters vary. The parser groups fragments by position into lines, detects section headings by pattern and font cues, and records when the layout itself is likely to trouble an ATS.",
      },
      {
        title: "Keyword matching beyond exact strings",
        text: "A job may ask for 'Postgres' while the resume says 'PostgreSQL', or list 'CI/CD' where the resume names specific tools. Plain string matching undercounts coverage. Terms are normalised with an alias map first, and the model only resolves the ambiguous cases left after that.",
      },
      {
        title: "Suggestions that stay truthful",
        text: "A model asked to improve a resume will happily add skills and results the person never mentioned. The rewrite prompt is limited to the original line plus its section context, is told not to add facts, and marks any placeholder the candidate must fill in, such as a missing outcome.",
      },
      {
        title: "Pinning feedback to the right line",
        text: "Free-text feedback cannot be displayed next to the line it refers to. Every resume line gets an id during parsing, the model receives lines with their ids and must return suggestions keyed by id, and ids that do not exist in the parsed resume are discarded.",
      },
    ],
    architecture: {
      caption:
        "Resume and job description are parsed once, then analysed together.",
      steps: [
        "Upload resume PDF",
        "Hash and cache check",
        "Parse lines, sections",
        "Parse job description",
        "Rule-based checks",
        "LLM analysis (JSON)",
        "Merge and validate",
        "Annotated report",
      ],
      notes: [
        "The file hash is the cache key for parsed resumes, so the same PDF compared against several job descriptions is parsed only once.",
        "Keyword coverage and formatting checks are plain code, which keeps them fast, free and repeatable for the same input.",
        "Model calls return JSON validated against a schema; line ids in the output are checked against the parsed resume before merging.",
        "The report is assembled server-side from both sources and sent to the client as one typed object that the UI renders.",
      ],
    },
    stackDetail: [
      { group: "Frontend", items: ["Next.js (App Router)", "TypeScript", "Tailwind CSS"] },
      { group: "Parsing", items: ["PDF text extraction", "Line and section grouping", "Skill alias map"] },
      { group: "AI", items: ["OpenAI chat model", "Structured JSON outputs", "Schema validation"] },
      { group: "Caching", items: ["Content hash keys", "Parsed resume cache", "Analysis cache per JD"] },
    ],
    implementation: [
      {
        title: "Hash-based parse cache",
        text: "On upload, the server computes a SHA-256 hash of the file bytes and looks it up before parsing. A hit returns the stored parsed structure immediately. A miss runs the parser and stores the result under that hash, so identical files are never parsed twice, whoever uploads them.",
      },
      {
        title: "Line and section parsing",
        text: "Extracted text fragments are grouped into lines by vertical position, then assigned to sections using common heading names and formatting cues. Each line gets a stable id and a type such as heading, bullet or contact, which later checks and suggestions refer to.",
      },
      {
        title: "Job description extraction",
        text: "The job description goes through a model call that returns required skills, preferred skills, responsibilities and seniority signals as structured JSON. The extracted skills are normalised with the same alias map as the resume, so both sides of the comparison speak the same vocabulary.",
      },
      {
        title: "ATS-style and content checks",
        text: "Rule-based checks look for multi-column layouts, tables, images holding text, missing standard sections, inconsistent date formats and missing contact details. Content checks flag bullets with no measurable outcome, repeated opening verbs and overlong lines, each tied to the line ids involved.",
      },
      {
        title: "Role matching and line suggestions",
        text: "A second model call receives the parsed resume with line ids, the extracted job requirements and the keyword gaps. It returns a role-fit summary, the strongest and weakest areas, and rewrite suggestions keyed by line id, each with a reason and the job requirement it addresses.",
      },
    ],
    decisions: [
      {
        title: "Rules for what rules can do",
        text: "Sending everything to the model would be less code. Keyword coverage and formatting checks are deterministic problems, so solving them in code makes results consistent between runs and cheaper, and leaves the model to handle judgement calls like content quality and role fit.",
      },
      {
        title: "Hash the file, not the user",
        text: "Caching by user and filename is simpler but misses re-uploads under a new name and breaks when a file changes but keeps its name. Hashing the file bytes gives an exact identity for the content, so cache hits are always correct.",
      },
      {
        title: "Line ids over free-form feedback",
        text: "Free-form feedback is easier to prompt for and reads more naturally. Requiring suggestions keyed by line id adds parsing and validation work, but it is what allows the UI to show each suggestion next to the exact line it changes.",
      },
      {
        title: "Text-based PDFs first",
        text: "Supporting scanned resumes would need OCR and a noisier parsing path. I limited the first version to text-based PDFs and show a clear message when a file has no extractable text, which keeps parsing reliable for the common case.",
      },
    ],
    performance: [
      {
        title: "Parse once, compare many times",
        text: "Because parsed resumes are cached by hash, comparing one resume against several job descriptions only repeats the job description extraction and the analysis step. The PDF parse, usually the most fragile stage, runs once per unique file.",
      },
      {
        title: "Instant rule-based results",
        text: "Keyword and formatting checks finish before any model call returns, so the UI can show coverage and ATS warnings first and fill in role matching and line suggestions as they arrive.",
      },
      {
        title: "Compact model inputs",
        text: "The model receives the parsed resume as short id-prefixed lines rather than raw extracted text, and the job description as its structured extraction. Smaller, cleaner inputs keep calls quicker and cheaper and reduce misreads of the original layout.",
      },
      {
        title: "Analysis cache per pair",
        text: "Results are also cached under the combined resume hash and job description hash. Reopening a report or refreshing the page returns the stored analysis instead of running the model again.",
      },
    ],
    screenshots: [
      "Upload screen with a resume drop zone, a job description text area and a note about supported PDF types.",
      "Report overview showing role-fit summary, keyword coverage with matched and missing terms, and ATS formatting warnings.",
      "Annotated resume view with each line displayed as parsed and suggestion cards pinned beside the lines they refer to.",
    ],
    results: [],
    takeaways: [
      "Splitting deterministic checks from model judgement made the tool cheaper, faster and far easier to test.",
      "Stable ids from parsing to UI turned model output from a paragraph of advice into targeted, clickable edits.",
      "Content hashing is a small feature with outsized effect: it made repeat analyses fast and removed a whole class of stale-cache bugs.",
      "Constraining rewrites to the candidate's own facts mattered more than wording quality; an honest suggestion beats an impressive invented one.",
    ],
    relatedPages: ["ai-developer", "generative-ai-developer", "saas-development"],
  },
];
