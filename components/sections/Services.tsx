import Link from "next/link";
import { services } from "@/lib/site";

export function Services() {
  return (
    <section
      id="services"
      className="rv max-w-[1240px] mx-auto px-4 sm:px-6 pt-16 sm:pt-24 lg:pt-28"
    >
      <p className="font-['JetBrains_Mono'] text-[10.5px] tracking-[0.22em] uppercase text-[var(--blue)] mb-4.5">
        01 — Services
      </p>

      <h2 className="font-['Space_Grotesk'] text-[30px] sm:text-[42px] lg:text-[52px] leading-[1.08] max-w-[22ch] mb-5 text-[var(--ink)]">
        Engineering Across The Entire Stack.
      </h2>

      <p className="color-[var(--dim)] text-[var(--dim)] max-w-[64ch] text-[15.5px] leading-[1.65] mb-11">
        Ten specialized engineering services covering client applications, backend architectures, AI intelligence systems, automation, and full-stack production delivery.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((s) => (
          <article
            key={s.id}
            className="rv relative border border-[var(--line)] rounded-[var(--r-lg)] bg-[linear-gradient(165deg,rgba(255,255,255,0.055),rgba(255,255,255,0.015))] p-6 flex flex-col gap-3 min-h-[246px] transition-all duration-400 hover:-translate-y-1 hover:border-[rgba(77,124,255,0.5)] hover:shadow-[0_30px_60px_-34px_rgba(77,124,255,0.6)]"
          >
            <div className="flex items-center justify-between">
              <span className="font-['JetBrains_Mono'] text-[11px] tracking-[0.14em] text-[var(--faint)]">
                {s.num}
              </span>
              <span
                aria-hidden="true"
                className="grid place-items-center w-9.5 h-9.5 border border-[var(--line2)] rounded-xl bg-[rgba(77,124,255,0.1)] text-[#9db4ff] text-lg"
              >
                {s.icon}
              </span>
            </div>

            <h3 className="font-['Space_Grotesk'] font-bold text-[21px] text-[var(--ink)]">
              {s.name}
            </h3>

            <p className="text-[13.5px] leading-[1.6] text-[var(--dim)] flex-1">
              {s.blurb}
            </p>

            <div className="flex flex-wrap gap-1.5 my-1">
              {s.tags.map((tg) => (
                <span
                  key={tg}
                  className="font-['JetBrains_Mono'] text-[10.5px] px-2.25 py-1 rounded-md bg-[rgba(255,255,255,0.05)] text-[#aab5cc]"
                >
                  {tg}
                </span>
              ))}
            </div>

            <Link
              href={s.href}
              className="inline-flex items-center gap-2 font-['Space_Grotesk'] font-semibold text-[13.5px] text-[#a9c0ff] hover:text-[#d6e2ff] hover:gap-3 transition-all mt-auto"
            >
              {s.cta} <span aria-hidden="true">→</span>
            </Link>
          </article>
        ))}
      </div>
    </section>
  );
}
