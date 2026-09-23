import { ArrowDown, ArrowRight } from "lucide-react";

/**
 * A flow of steps drawn with plain HTML so it is readable by crawlers and
 * screen readers (an ordered list) and costs no client JavaScript. Horizontal
 * on wide screens, vertical on phones.
 */
export function ArchitectureDiagram({
  title,
  caption,
  steps,
}: {
  title: string;
  caption?: string;
  steps: string[];
}) {
  return (
    <figure className="relative overflow-hidden rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--bg2)] p-5 sm:p-8">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:28px_28px]"
      />
      <figcaption className="relative mb-6">
        <span className="block font-[family-name:var(--m)] text-[10.5px] uppercase tracking-[0.22em] text-[var(--cyan)]">
          {title}
        </span>
        {caption ? (
          <span className="mt-2 block max-w-[70ch] text-[13.5px] leading-[1.6] text-[var(--dim)]">
            {caption}
          </span>
        ) : null}
      </figcaption>
      <ol className="relative flex flex-col items-stretch gap-2 lg:flex-row lg:flex-wrap lg:items-center">
        {steps.map((step, i) => (
          <li key={step} className="flex flex-col items-center gap-2 lg:flex-row">
            <span className="flex w-full items-center gap-2.5 rounded-xl border border-[var(--line2)] bg-[rgba(13,17,28,0.9)] px-3.5 py-2.5 text-[13.5px] font-medium text-[var(--ink)] shadow-[inset_0_1px_0_rgba(255,255,255,0.06)] lg:w-auto">
              <span className="font-[family-name:var(--m)] text-[10px] text-[var(--faint)]">
                {String(i + 1).padStart(2, "0")}
              </span>
              {step}
            </span>
            {i < steps.length - 1 ? (
              <>
                <ArrowDown aria-hidden="true" className="size-4 text-[var(--blue)] lg:hidden" />
                <ArrowRight aria-hidden="true" className="hidden size-4 text-[var(--blue)] lg:block" />
              </>
            ) : null}
          </li>
        ))}
      </ol>
    </figure>
  );
}
