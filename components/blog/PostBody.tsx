import type { Block } from "@/lib/blog";
import { InlineText } from "./InlineText";

/** Turns parsed blocks into semantic HTML inside the article. */
export function PostBody({ blocks }: { blocks: Block[] }) {
  return (
    <div className="text-[16.5px] leading-[1.8] text-[#c9d1e2]">
      {blocks.map((b, i) => {
        switch (b.type) {
          case "h2":
            return (
              <h2
                key={i}
                id={b.id}
                className="mb-4 mt-12 scroll-mt-28 text-[26px] leading-[1.2] text-[var(--ink)] sm:text-[30px]"
              >
                {b.text}
              </h2>
            );
          case "h3":
            return (
              <h3
                key={i}
                id={b.id}
                className="mb-3 mt-8 scroll-mt-28 text-[20px] leading-[1.3] text-[var(--ink)]"
              >
                {b.text}
              </h3>
            );
          case "p":
            return (
              <p key={i} className="my-5">
                <InlineText text={b.text} />
              </p>
            );
          case "ul":
            return (
              <ul key={i} className="my-5 list-disc space-y-2 pl-6 marker:text-[var(--blue)]">
                {b.items.map((it, j) => (
                  <li key={j}>
                    <InlineText text={it} />
                  </li>
                ))}
              </ul>
            );
          case "ol":
            return (
              <ol key={i} className="my-5 list-decimal space-y-2 pl-6 marker:text-[var(--faint)]">
                {b.items.map((it, j) => (
                  <li key={j}>
                    <InlineText text={it} />
                  </li>
                ))}
              </ol>
            );
          case "quote":
            return (
              <blockquote
                key={i}
                className="my-7 border-l-2 border-[var(--blue)] bg-[rgba(77,124,255,0.06)] py-3 pl-5 pr-4 italic text-[#dbe2f2]"
              >
                <InlineText text={b.text} />
              </blockquote>
            );
          case "code":
            return (
              <figure
                key={i}
                className="my-7 overflow-hidden rounded-[var(--r)] border border-[var(--line)] bg-[rgba(4,6,12,0.85)]"
              >
                <figcaption className="border-b border-[var(--line)] px-4 py-2 font-[family-name:var(--m)] text-[10.5px] uppercase tracking-[0.16em] text-[var(--faint)]">
                  {b.lang}
                </figcaption>
                <pre className="overflow-x-auto p-4 font-[family-name:var(--m)] text-[13px] leading-[1.7] text-[#d3dbee]">
                  <code>{b.code}</code>
                </pre>
              </figure>
            );
        }
      })}
    </div>
  );
}

/** Contents list built from the h2 blocks. */
export function TableOfContents({ blocks }: { blocks: Block[] }) {
  const headings = blocks.filter(
    (b): b is Extract<Block, { type: "h2" }> => b.type === "h2",
  );
  if (headings.length < 3) return null;
  return (
    <nav aria-label="Table of contents">
      <p className="mb-3 font-[family-name:var(--m)] text-[10.5px] uppercase tracking-[0.2em] text-[var(--faint)]">
        On this page
      </p>
      <ol className="space-y-2 border-l border-[var(--line)] text-[13px]">
        {headings.map((h) => (
          <li key={h.id}>
            <a
              href={`#${h.id}`}
              className="-ml-px block border-l border-transparent pl-3 leading-[1.45] text-[var(--dim)] hover:border-[var(--blue)] hover:text-[var(--ink)]"
            >
              {h.text}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
