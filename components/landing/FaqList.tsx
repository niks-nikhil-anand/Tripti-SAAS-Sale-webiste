import { Plus } from "lucide-react";
import type { Faq } from "@/types/content";

/**
 * Native <details> gives keyboard support and open/close with zero client JS,
 * and the answers stay in the HTML, which matters because FAQPage markup is
 * only valid when the answers are visible on the page.
 */
export function FaqList({ faqs }: { faqs: Faq[] }) {
  return (
    <div className="divide-y divide-[var(--line)] rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--glass)]">
      {faqs.map((f) => (
        <details key={f.q} className="group px-5 sm:px-6">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 py-5 text-[15.5px] font-semibold text-[var(--ink)] [&::-webkit-details-marker]:hidden">
            <h3 className="text-[15.5px] font-semibold tracking-normal">{f.q}</h3>
            <Plus
              aria-hidden="true"
              className="size-4 shrink-0 text-[var(--dim)] transition-transform duration-200 group-open:rotate-45"
            />
          </summary>
          <p className="max-w-[75ch] pb-5 text-[14.5px] leading-[1.7] text-[var(--dim)]">
            {f.a}
          </p>
        </details>
      ))}
    </div>
  );
}
