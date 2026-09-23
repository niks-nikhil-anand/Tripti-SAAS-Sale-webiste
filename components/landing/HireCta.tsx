import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function HireCta({
  title = "Have a project in mind?",
  text = "Send a short description of what you are building. I will reply with questions, a suggested approach and next steps.",
  service,
}: {
  title?: string;
  text?: string;
  /** prefills the project type on /hire-me */
  service?: string;
}) {
  const href = service
    ? `/hire-me?service=${encodeURIComponent(service)}`
    : "/hire-me";
  return (
    <section
      aria-labelledby="hire-cta"
      className="mx-auto max-w-[1240px] px-4 pb-16 pt-16 sm:px-6 sm:pb-24 sm:pt-20"
    >
      <div className="relative overflow-hidden rounded-[var(--r-lg)] border border-[rgba(77,124,255,0.3)] bg-[linear-gradient(150deg,rgba(77,124,255,0.16),rgba(139,92,246,0.1),rgba(255,255,255,0.015))] p-7 sm:p-12">
        <h2 id="hire-cta" className="max-w-[24ch] text-[28px] leading-[1.1] sm:text-[44px]">
          {title}
        </h2>
        <p className="mt-4 max-w-[56ch] text-[15.5px] leading-[1.65] text-[#cfd7ea]">
          {text}
        </p>
        <div className="mt-7 flex flex-wrap gap-3">
          <Link
            href={href}
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#4d7cff] to-[#7c5cff] px-6 py-3 text-[15px] font-semibold text-white shadow-[0_18px_44px_-18px_rgba(77,124,255,0.9)] transition-transform hover:-translate-y-0.5 hover:text-white"
          >
            Hire Me <ArrowRight aria-hidden="true" className="size-4" />
          </Link>
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--line2)] bg-[var(--glass)] px-6 py-3 text-[15px] font-semibold text-[var(--ink)] transition-colors hover:bg-[var(--glass2)] hover:text-white"
          >
            View Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
