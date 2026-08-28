import type { Block } from "@/lib/blog";

/**
 * Renders the structured body into real semantic HTML — h2/h3 with stable ids,
 * ul/ol, blockquote, pre. Crawlers get a parseable outline and the on-page
 * table of contents can link straight into it.
 */
export function PostBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="flex flex-col gap-6">
      {blocks.map((block, i) => {
        switch (block.type) {
          case "h2":
            return (
              <h2
                key={i}
                id={block.id}
                className="mt-6 scroll-mt-28 text-2xl font-semibold tracking-tight"
              >
                {block.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={i}
                id={block.id}
                className="mt-4 scroll-mt-28 text-xl font-semibold tracking-tight"
              >
                {block.text}
              </h3>
            );
          case "p":
            return (
              <p key={i} className="text-[1.0625rem] leading-8 text-fg-muted">
                {block.text}
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="flex flex-col gap-2.5 pl-1">
                {block.items.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[1.0625rem] leading-8 text-fg-muted"
                  >
                    <span aria-hidden="true" className="mt-3 size-1.5 shrink-0 rounded-full bg-accent" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="flex flex-col gap-2.5 pl-1">
                {block.items.map((item, n) => (
                  <li
                    key={item}
                    className="flex gap-3 text-[1.0625rem] leading-8 text-fg-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 inline-flex size-6 shrink-0 items-center justify-center rounded-full bg-accent-soft text-xs font-semibold text-accent"
                    >
                      {n + 1}
                    </span>
                    <span>{item}</span>
                  </li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="border-l-2 border-accent bg-surface-2 py-4 pl-5 pr-4 text-[1.0625rem] italic leading-8"
              >
                {block.text}
                {block.cite ? (
                  <cite className="mt-2 block text-sm not-italic text-fg-muted">
                    — {block.cite}
                  </cite>
                ) : null}
              </blockquote>
            );
          case "code":
            return (
              <pre
                key={i}
                className="overflow-x-auto rounded-xl border border-border bg-surface-2 p-4 text-[0.8125rem] leading-6"
              >
                <code className="font-mono">{block.code}</code>
              </pre>
            );
        }
      })}
    </div>
  );
}

/** Section links built from the body's own headings — no duplicate source of truth. */
export function TableOfContents({ blocks }: { blocks: Block[] }) {
  const headings = blocks.filter(
    (b): b is Extract<Block, { type: "h2" | "h3" }> =>
      b.type === "h2" || b.type === "h3",
  );

  if (headings.length < 2) return null;

  return (
    <nav aria-labelledby="toc-heading" className="rounded-2xl border border-border bg-surface p-5">
      <h2
        id="toc-heading"
        className="text-xs font-semibold uppercase tracking-[0.16em] text-fg-muted"
      >
        On this page
      </h2>
      <ul className="mt-4 flex flex-col gap-2.5">
        {headings.map((h) => (
          <li key={h.id} className={h.type === "h3" ? "pl-4" : undefined}>
            <a
              href={`#${h.id}`}
              className="text-sm leading-6 text-fg-muted transition-colors hover:text-accent"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
