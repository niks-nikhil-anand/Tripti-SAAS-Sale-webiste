import { Sparkles } from "lucide-react";

/**
 * Answer-first summary box. Short, self-contained sentences near the top of a
 * page are what featured snippets and AI overviews tend to quote, and they let
 * a skimming reader decide within seconds whether the page is for them.
 */
export function KeyTakeaways({ items }: { items: string[] }) {
  return (
    <aside
      aria-labelledby="takeaways-h"
      className="rounded-[var(--r-lg)] border border-[rgba(34,211,238,0.25)] bg-[linear-gradient(160deg,rgba(34,211,238,0.07),rgba(77,124,255,0.05))] p-6 sm:p-8"
    >
      <h2
        id="takeaways-h"
        className="mb-4 flex items-center gap-2 font-[family-name:var(--m)] text-[11px] font-medium uppercase tracking-[0.2em] text-[#7fe6f7]"
      >
        <Sparkles aria-hidden="true" className="size-4" /> Key takeaways
      </h2>
      <ul className="grid gap-3 sm:grid-cols-2">
        {items.map((t) => (
          <li
            key={t}
            className="relative pl-5 text-[14.5px] leading-[1.65] text-[#d3dbee] before:absolute before:left-0 before:top-[0.7em] before:size-1.5 before:rounded-full before:bg-[var(--cyan)] before:content-['']"
          >
            {t}
          </li>
        ))}
      </ul>
    </aside>
  );
}
