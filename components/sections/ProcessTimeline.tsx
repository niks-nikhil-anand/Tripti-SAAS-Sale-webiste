import { processTimeline } from "@/lib/site";

export function ProcessTimeline() {
  return (
    <section className="rv max-w-[1240px] mx-auto px-4 sm:px-6 pt-16 sm:pt-24 lg:pt-28">
      <p className="font-['JetBrains_Mono'] text-[10.5px] tracking-[0.22em] uppercase text-[var(--blue)] mb-4.5">
        05 — Process
      </p>

      <h2 className="font-['Space_Grotesk'] text-[30px] sm:text-[42px] lg:text-[52px] leading-[1.08] max-w-[20ch] mb-11 text-[var(--ink)]">
        From Discovery to Scale.
      </h2>

      <ol className="list-none m-0 p-0 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-6 lg:gap-0">
        {processTimeline.map((t) => (
          <li key={t.n} className="relative pr-4">
            <div
              aria-hidden="true"
              className="relative h-0.5 bg-[linear-gradient(to_right,rgba(77,124,255,0.55),rgba(139,92,246,0.25))] mb-5.5 hidden lg:block"
            >
              <span className="absolute -top-[5px] left-0 w-3 h-3 rounded-full bg-[var(--bg)] border-2 border-[var(--blue)] shadow-[0_0_16px_rgba(77,124,255,0.9)]"></span>
            </div>
            <p className="font-['JetBrains_Mono'] text-[11px] tracking-[0.16em] text-[#7fe6f7] mb-2">
              {t.n}
            </p>
            <h3 className="font-['Space_Grotesk'] font-bold text-[17px] tracking-[0.02em] uppercase mb-2.5 text-[var(--ink)]">
              {t.title}
            </h3>
            <p className="text-[13px] leading-[1.6] text-[var(--dim)] max-w-[30ch]">
              {t.body}
            </p>
          </li>
        ))}
      </ol>
    </section>
  );
}
