import Link from "next/link";
import { projects } from "@/lib/site";

export function SelectedWork() {
  return (
    <section
      id="projects"
      className="rv max-w-[1240px] mx-auto px-4 sm:px-6 pt-16 sm:pt-24 lg:pt-28"
    >
      <p className="font-['JetBrains_Mono'] text-[10.5px] tracking-[0.22em] uppercase text-[var(--blue)] mb-4.5">
        02 — Selected work
      </p>

      <h2 className="font-['Space_Grotesk'] text-[30px] sm:text-[42px] lg:text-[52px] leading-[1.08] max-w-[20ch] mb-8 text-[var(--ink)]">
        Selected Work. Built for the Real World.
      </h2>

      <div className="grid gap-7 sm:gap-12">
        {projects.map((p, idx) => (
          <article
            key={p.title}
            className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-11 items-center border border-[var(--line)] rounded-[var(--r-lg)] bg-[linear-gradient(165deg,rgba(255,255,255,0.045),rgba(255,255,255,0.012))] p-5 sm:p-7.5"
          >
            {/* Visual Graphic Representation */}
            <div className="border border-[var(--line2)] rounded-[var(--r)] overflow-hidden bg-[rgba(4,6,12,0.6)]">
              <div className="flex items-center gap-1.75 px-3.25 py-2.5 border-b border-[var(--line)]">
                <span className="w-2 h-2 rounded-full bg-[#3a4258]"></span>
                <span className="w-2 h-2 rounded-full bg-[#3a4258]"></span>
                <span className="w-2 h-2 rounded-full bg-[#3a4258]"></span>
                <span className="flex-1 ml-2 h-4.75 rounded-md bg-[rgba(255,255,255,0.05)]"></span>
              </div>
              <div className="aspect-[16/10] grid place-items-center bg-[radial-gradient(circle_at_50%_40%,rgba(77,124,255,0.16),transparent_65%)] p-6 text-center">
                <div>
                  <span className="font-['JetBrains_Mono'] text-[11px] tracking-[0.16em] uppercase text-[#7fe6f7] block mb-2">
                    Case Study #{idx + 1}
                  </span>
                  <span className="font-['Space_Grotesk'] font-bold text-[18px] text-[var(--ink)] block">
                    {p.industry} Architecture
                  </span>
                </div>
              </div>
            </div>

            {/* Case Study Details */}
            <div className="flex flex-col gap-3.5">
              <span className="self-start font-['JetBrains_Mono'] text-[10.5px] tracking-[0.14em] uppercase px-2.75 py-1 border border-[var(--line2)] rounded-full text-[#9db4ff]">
                {p.industry}
              </span>

              <h3 className="font-['Space_Grotesk'] font-bold text-[22px] sm:text-[28px] text-[var(--ink)]">
                {p.title}
              </h3>

              <div>
                <p className="font-['JetBrains_Mono'] text-[10px] tracking-[0.16em] uppercase text-[var(--faint)] mb-1">
                  Problem Solved
                </p>
                <p className="text-[14px] leading-[1.6] text-[var(--dim)]">
                  {p.problem}
                </p>
              </div>

              <div>
                <p className="font-['JetBrains_Mono'] text-[10px] tracking-[0.16em] uppercase text-[var(--faint)] mb-1">
                  Solution
                </p>
                <p className="text-[14px] leading-[1.6] text-[var(--dim)]">
                  {p.solution}
                </p>
              </div>

              <div className="flex flex-wrap gap-1.5 my-1">
                {p.stack.map((st) => (
                  <span
                    key={st}
                    className="font-['JetBrains_Mono'] text-[10.5px] px-2.25 py-1 rounded-md bg-[rgba(255,255,255,0.05)] text-[#aab5cc]"
                  >
                    {st}
                  </span>
                ))}
              </div>

              <div>
                <p className="font-['JetBrains_Mono'] text-[10px] tracking-[0.16em] uppercase text-[var(--faint)] mb-1">
                  Result
                </p>
                <p className="text-[14px] leading-[1.6] text-[var(--dim)]">
                  {p.result}
                </p>
              </div>

              <Link
                href="/hire-me"
                className="self-start inline-flex items-center gap-2 font-['Space_Grotesk'] font-semibold text-[14px] text-[#a9c0ff] hover:text-[#d6e2ff] hover:gap-3 transition-all mt-1"
              >
                Discuss Similar Project <span aria-hidden="true">→</span>
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
