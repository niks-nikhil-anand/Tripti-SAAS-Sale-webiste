import Link from "next/link";
import { ArrowRight, MapPin } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { ProfilePhoto } from "./ProfilePhoto";

/**
 * "Who you'll work with" — the trust block on landing pages and case studies.
 * States only verifiable facts: name, role, location, public profiles.
 */
export function AuthorCard({
  heading = "Who you'll work with",
  text = "You work directly with me, from the first call to deployment. No account managers or hand-offs: the person scoping your project is the person writing the code.",
}: {
  heading?: string;
  text?: string;
}) {
  return (
    <section
      aria-labelledby="author-h"
      className="mx-auto max-w-[1240px] px-4 pt-16 sm:px-6 sm:pt-20"
    >
      <div className="flex flex-col gap-6 rounded-[var(--r-lg)] border border-[var(--line)] bg-[linear-gradient(165deg,rgba(255,255,255,0.05),rgba(255,255,255,0.012))] p-6 sm:flex-row sm:items-center sm:gap-8 sm:p-8">
        <ProfilePhoto
          size={112}
          className="shrink-0 border-2 border-[var(--line2)] shadow-[0_0_0_6px_rgba(77,124,255,0.08)]"
        />
        <div className="min-w-0">
          <h2
            id="author-h"
            className="mb-2 font-[family-name:var(--m)] text-[10.5px] font-medium uppercase tracking-[0.22em] text-[var(--blue)]"
          >
            {heading}
          </h2>
          <p className="font-[family-name:var(--h)] text-[24px] font-bold leading-[1.1] tracking-[-0.02em] text-[var(--ink)] sm:text-[28px]">
            {siteConfig.legalName}
          </p>
          <p className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-[13.5px] text-[var(--dim)]">
            <span>Full Stack & AI Developer</span>
            <span className="inline-flex items-center gap-1">
              <MapPin aria-hidden="true" className="size-3.5" /> Bangalore, India · IST
            </span>
          </p>
          <p className="mt-3 max-w-[64ch] text-[14.5px] leading-[1.65] text-[#c3cbdd]">
            {text}
          </p>
          <div className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-[13.5px] font-semibold">
            <Link href="/about" className="inline-flex items-center gap-1.5">
              More about me <ArrowRight aria-hidden="true" className="size-3.5" />
            </Link>
            <a href={siteConfig.social.github} target="_blank" rel="noopener noreferrer me">
              GitHub
            </a>
            <a href={siteConfig.social.linkedin} target="_blank" rel="noopener noreferrer me">
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
