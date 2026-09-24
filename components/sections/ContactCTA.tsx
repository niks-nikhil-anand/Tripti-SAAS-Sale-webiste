import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function ContactCTA() {
  const waUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    "Hi, I found your website and would like to discuss a development project."
  )}`;

  return (
    <section
      id="contact"
      className="rv max-w-[1240px] mx-auto px-4 sm:px-6 pt-16 sm:pt-24 lg:pt-28 pb-12 sm:pb-22"
    >
      <div className="relative border border-[rgba(77,124,255,0.3)] rounded-[var(--r-lg)] bg-[linear-gradient(150deg,rgba(77,124,255,0.16),rgba(139,92,246,0.1),rgba(255,255,255,0.015))] overflow-hidden p-8 sm:p-14 lg:p-20">
        <div
          aria-hidden="true"
          className="absolute -bottom-[60%] left-[20%] w-[620px] h-[620px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.2),transparent_66%)] blur-[56px] pointer-events-none"
        ></div>

        <div className="relative max-w-[760px]">
          <h2 className="font-[family-name:var(--h)] font-bold text-[32px] sm:text-[52px] lg:text-[68px] leading-[1.05] mb-5.5 text-[var(--ink)]">
            Have an Idea? <span className="grad-word">Let's Build It.</span>
          </h2>

          <p className="text-[15px] sm:text-[18px] leading-[1.6] text-[#cfd7ea] max-w-[52ch] mb-8.5">
            Tell me what you're building and I'll help turn it into a production-ready product.
          </p>

          <div className="flex flex-wrap items-center gap-3.5">
            <Link
              href="/hire-me"
              className="inline-flex items-center gap-2.5 px-6.5 py-3.75 rounded-full font-[family-name:var(--h)] font-semibold text-[15.5px] text-white bg-gradient-to-r from-[#4d7cff] to-[#7c5cff] shadow-[0_18px_44px_-18px_rgba(77,124,255,0.9)] hover:-translate-y-0.5 transition-all"
            >
              Start Your Project →
            </Link>
            <a
              href={waUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6.5 py-3.75 border border-[var(--line2)] rounded-full bg-[var(--glass)] font-[family-name:var(--h)] font-semibold text-[15.5px] text-[var(--ink)] hover:bg-[var(--glass2)] transition-all"
            >
              WhatsApp Me
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
