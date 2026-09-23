import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { LandingPage } from "@/types/content";
import { PageIcon } from "@/components/ui/PageIcon";

/**
 * The whole card is one link (the stretched ::after on the title anchor), so
 * the click target is large but screen readers hear a single, named link.
 */
export function PageCard({
  page,
  compact = false,
}: {
  page: LandingPage;
  compact?: boolean;
}) {
  return (
    <article className="group relative flex flex-col gap-3 rounded-[var(--r-lg)] border border-[var(--line)] bg-[linear-gradient(165deg,rgba(255,255,255,0.05),rgba(255,255,255,0.012))] p-5 transition-[border-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-[rgba(77,124,255,0.5)] hover:shadow-[0_24px_50px_-30px_rgba(77,124,255,0.6)] focus-within:border-[rgba(77,124,255,0.6)]">
      <div className="flex items-center justify-between">
        <span className="grid size-9 place-items-center rounded-xl border border-[var(--line2)] bg-[rgba(77,124,255,0.1)] text-[#9db4ff]">
          <PageIcon name={page.icon} />
        </span>
        <ArrowUpRight
          aria-hidden="true"
          className="size-4 text-[var(--faint)] transition-[color,transform] duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[#a9c0ff]"
        />
      </div>
      <h3 className="text-[17px] font-semibold text-[var(--ink)]">
        <Link
          href={`/${page.slug}`}
          className="text-[var(--ink)] after:absolute after:inset-0 after:rounded-[var(--r-lg)] after:content-[''] hover:text-white focus-visible:outline-none"
        >
          {page.navLabel}
        </Link>
      </h3>
      {compact ? null : (
        <p className="text-[13.5px] leading-[1.6] text-[var(--dim)]">
          {page.cardBlurb}
        </p>
      )}
    </article>
  );
}
