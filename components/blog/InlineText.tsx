import Link from "next/link";
import type { ReactNode } from "react";

/**
 * Renders the inline Markdown subset used in posts: [text](href), `code` and
 * **bold**. Internal links go through next/link (prefetch + client nav);
 * external links open in a new tab with rel="noopener".
 */
const TOKEN = /(\[[^\]]+\]\([^)\s]+\)|`[^`]+`|\*\*[^*]+\*\*)/g;

const linkClass =
  "font-medium text-[#a9c0ff] underline decoration-[rgba(169,192,255,0.35)] underline-offset-[3px] hover:text-white hover:decoration-white";

export function InlineText({ text }: { text: string }) {
  const parts = text.split(TOKEN).filter(Boolean);
  return <>{parts.map((part, i) => renderToken(part, i))}</>;
}

function renderToken(part: string, key: number): ReactNode {
  const link = /^\[([^\]]+)\]\(([^)\s]+)\)$/.exec(part);
  if (link) {
    const [, label, href] = link;
    return href.startsWith("/") ? (
      <Link key={key} href={href} className={linkClass}>
        <InlineText text={label} />
      </Link>
    ) : (
      <a key={key} href={href} target="_blank" rel="noopener noreferrer" className={linkClass}>
        <InlineText text={label} />
      </a>
    );
  }
  if (part.length > 2 && part.startsWith("`") && part.endsWith("`")) {
    return (
      <code
        key={key}
        className="rounded-md border border-[var(--line)] bg-[rgba(255,255,255,0.06)] px-1.5 py-0.5 font-[family-name:var(--m)] text-[0.86em] text-[#d8e1ff]"
      >
        {part.slice(1, -1)}
      </code>
    );
  }
  if (part.length > 4 && part.startsWith("**") && part.endsWith("**")) {
    return (
      <strong key={key} className="font-semibold text-[var(--ink)]">
        {part.slice(2, -2)}
      </strong>
    );
  }
  return part;
}
