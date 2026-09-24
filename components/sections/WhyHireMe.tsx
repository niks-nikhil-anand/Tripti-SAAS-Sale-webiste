import { whyHireMeReasons } from "@/lib/site";

export function WhyHireMe() {
  return (
    <section className="rv max-w-[1240px] mx-auto px-4 sm:px-6 pt-16 sm:pt-24 lg:pt-28">
      <p className="font-[family-name:var(--m)] text-[10.5px] tracking-[0.22em] uppercase text-[var(--blue)] mb-4.5">
        04 — Why hire me
      </p>

      <h2 className="font-[family-name:var(--h)] text-[30px] sm:text-[42px] lg:text-[52px] leading-[1.08] max-w-[20ch] mb-11 text-[var(--ink)]">
        Why Work With Me.
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {whyHireMeReasons.map((r) => (
          <div
            key={r.n}
            className="rv border-t border-[var(--line2)] pt-5.5 flex flex-col"
          >
            <p className="font-[family-name:var(--h)] font-bold text-[38px] sm:text-[48px] lg:text-[60px] leading-none mb-4 bg-[linear-gradient(140deg,#4d7cff,#8b5cf6)] [mask-image:linear-gradient(to_bottom,#000,#000)] bg-clip-text text-transparent">
              {r.n}
            </p>
            <h3 className="font-[family-name:var(--h)] font-bold text-[20px] mb-2.5 text-[var(--ink)]">
              {r.t}
            </h3>
            <p className="text-[14px] leading-[1.65] text-[var(--dim)]">
              {r.b}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
