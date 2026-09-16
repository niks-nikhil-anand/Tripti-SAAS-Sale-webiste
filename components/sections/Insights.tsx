import Link from "next/link";
import { featuredArticle, insightsArticles } from "@/lib/site";

export function Insights() {
  return (
    <section
      id="insights"
      className="rv max-w-[1240px] mx-auto px-4 sm:px-6 pt-16 sm:pt-24 lg:pt-28"
    >
      <p className="font-['JetBrains_Mono'] text-[10.5px] tracking-[0.22em] uppercase text-[var(--blue)] mb-4.5">
        08 — Insights
      </p>

      <h2 className="font-['Space_Grotesk'] text-[30px] sm:text-[42px] lg:text-[52px] leading-[1.08] max-w-[18ch] mb-5 text-[var(--ink)]">
        Insights &amp; Engineering Notes.
      </h2>

      <p className="text-[var(--dim)] max-w-[62ch] text-[15px] leading-[1.65] mb-10">
        Articles and technical guides answering real engineering and architecture questions buyers search.
      </p>

      {/* Featured Article Card */}
      <article className="rv border border-[var(--line2)] rounded-[var(--r-lg)] bg-[linear-gradient(150deg,rgba(77,124,255,0.1),rgba(255,255,255,0.02))] p-5.5 sm:p-9.5 mb-4 grid gap-3.5">
        <div className="flex flex-wrap items-center gap-3 font-['JetBrains_Mono'] text-[10.5px] tracking-[0.14em] uppercase text-[var(--faint)]">
          <span className="px-2.75 py-1 border border-[rgba(34,211,238,0.34)] rounded-full text-[#7fe6f7]">
            Featured · {featuredArticle.cat}
          </span>
          <span>{featuredArticle.read}</span>
          <span>·</span>
          <span>{featuredArticle.date}</span>
        </div>

        <h3 className="font-['Space_Grotesk'] font-bold text-[24px] sm:text-[32px] lg:text-[38px] max-w-[24ch] text-[var(--ink)]">
          {featuredArticle.title}
        </h3>

        <p className="text-[15px] leading-[1.65] text-[var(--dim)] max-w-[62ch]">
          {featuredArticle.desc}
        </p>

        <Link
          href="/hire-me"
          className="inline-flex items-center gap-2 font-['Space_Grotesk'] font-semibold text-[14px] text-[#a9c0ff] hover:text-[#d6e2ff] hover:gap-3 transition-all"
        >
          Read the article <span aria-hidden="true">→</span>
        </Link>
      </article>

      {/* Article Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {insightsArticles.map((b) => (
          <article
            key={b.title}
            className="rv border border-[var(--line)] rounded-[var(--r-lg)] bg-[rgba(255,255,255,0.028)] p-5.5 flex flex-col gap-2.75 min-h-[220px] transition-all duration-400 hover:-translate-y-1 hover:border-[rgba(77,124,255,0.45)]"
          >
            <span className="self-start font-['JetBrains_Mono'] text-[10px] tracking-[0.16em] uppercase text-[#9db4ff] border border-[var(--line2)] rounded-full px-2.5 py-1">
              {b.cat}
            </span>

            <h3 className="font-['Space_Grotesk'] font-bold text-[18px] text-[var(--ink)]">
              {b.title}
            </h3>

            <p className="text-[13.5px] leading-[1.6] text-[var(--dim)] flex-1">
              {b.desc}
            </p>

            <div className="flex items-center gap-2.5 font-['JetBrains_Mono'] text-[10.5px] text-[var(--faint)] pt-2 border-t border-[var(--line)]">
              <span>{b.read}</span>
              <span>·</span>
              <span>{b.date}</span>
              <Link
                href="/hire-me"
                aria-label={`Read ${b.title}`}
                className="ml-auto text-[15px] text-[#a9c0ff] hover:text-[#d6e2ff]"
              >
                →
              </Link>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
