import Link from "next/link";
import { heroStack, siteConfig } from "@/lib/site";

export function Hero() {
  const waUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    "Hi, I found your website and would like to discuss a development project."
  )}`;

  return (
    <section className="relative max-w-[1240px] mx-auto px-4 sm:px-6 pt-7 sm:pt-14 pb-12 sm:pb-22 grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-center min-h-[78vh]">
      {/* Background Orbs & Grid */}
      <div
        aria-hidden="true"
        className="fixed inset-0 pointer-events-none z-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.035)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:72px_72px] [mask-image:radial-gradient(ellipse_80%_60%_at_50%_0%,#000_30%,transparent_78%)]"
      ></div>
      <div
        aria-hidden="true"
        className="orb fixed -top-[220px] -left-[140px] w-[620px] h-[620px] rounded-full pointer-events-none z-0 bg-[radial-gradient(circle,rgba(77,124,255,0.26),transparent_68%)] blur-[42px]"
      ></div>
      <div
        aria-hidden="true"
        className="orb fixed top-[12%] -right-[200px] w-[560px] h-[560px] rounded-full pointer-events-none z-0 bg-[radial-gradient(circle,rgba(139,92,246,0.2),transparent_68%)] blur-[48px] [animation-delay:-6s]"
      ></div>

      {/* Left Column Content */}
      <div className="relative z-10">
        <p className="inline-flex items-center gap-2.25 px-3.5 py-1.75 border border-[rgba(34,211,238,0.32)] rounded-full bg-[rgba(34,211,238,0.07)] font-['JetBrains_Mono'] text-[10.5px] tracking-[0.16em] uppercase text-[#7fe6f7] mb-6.5">
          <span className="dot w-1.75 h-1.75 rounded-full bg-[var(--cyan)] animate-[pulseDot_2.4s_ease-out_infinite]"></span>
          Available for select projects
        </p>

        <h1 className="font-['Space_Grotesk'] font-bold text-[38px] sm:text-[56px] lg:text-[72px] leading-[1.05] tracking-[-0.025em] max-w-[16ch] mb-6 text-[var(--ink)]">
          I Build Digital Products That <span className="grad-word">Think, Scale</span> &amp; Perform.
        </h1>

        <p className="text-[15.5px] sm:text-[18.5px] leading-[1.65] text-[var(--dim)] max-w-[56ch] mb-8.5">
          Full-stack developer specializing in React, Next.js, Python and AI — building production-grade applications, intelligent systems and high-performance digital products.
        </p>

        <div className="flex flex-wrap items-center gap-3.5">
          <Link
            href="/hire-me"
            className="inline-flex items-center gap-2.5 px-6.5 py-3.75 rounded-full font-['Space_Grotesk'] font-semibold text-[15.5px] text-white bg-gradient-to-r from-[#4d7cff] to-[#7c5cff] shadow-[0_18px_44px_-18px_rgba(77,124,255,0.9)] hover:shadow-[0_24px_54px_-18px_rgba(124,92,255,1)] hover:-translate-y-0.5 transition-all"
          >
            Start a Project →
          </Link>
          <a
            href="#projects"
            className="inline-flex items-center gap-2.5 px-6.5 py-3.75 border border-[var(--line2)] rounded-full bg-[var(--glass)] font-['Space_Grotesk'] font-semibold text-[15.5px] text-[var(--ink)] hover:bg-[var(--glass2)] hover:border-[rgba(77,124,255,0.5)] transition-all"
          >
            Explore My Work
          </a>
          <a
            href={waUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Message Tripti Shakya on WhatsApp"
            className="inline-flex items-center gap-2 text-[13.5px] text-[var(--faint)] hover:text-[#7fe6f7] transition-colors py-2"
          >
            <span
              aria-hidden="true"
              className="w-1.75 h-1.75 rounded-full bg-[#25d366]"
            ></span>
            or message on WhatsApp
          </a>
        </div>
      </div>

      {/* Right Column Profile Card */}
      <div className="relative z-10">
        <div
          aria-hidden="true"
          className="absolute -inset-x-8 -inset-y-12 rounded-full bg-[radial-gradient(circle_at_60%_40%,rgba(77,124,255,0.24),transparent_62%)] blur-[36px] pointer-events-none"
        ></div>

        <div className="relative border border-[var(--line2)] rounded-[var(--r-lg)] bg-[linear-gradient(160deg,rgba(255,255,255,0.07),rgba(255,255,255,0.02))] backdrop-blur-xl shadow-[0_40px_90px_-44px_rgba(0,0,0,0.95)] p-5.5 overflow-hidden">
          <div className="flex items-center justify-between gap-3 pb-4.5 border-b border-[var(--line)]">
            <div>
              <p className="font-['Space_Grotesk'] font-bold text-[19px] tracking-[0.01em] text-[var(--ink)]">
                TRIPTI SHAKYA
              </p>
              <p className="font-['JetBrains_Mono'] text-[10px] tracking-[0.18em] uppercase text-[var(--faint)] mt-1">
                Full-Stack + AI Developer
              </p>
            </div>
            <span className="font-['JetBrains_Mono'] text-[10px] tracking-[0.14em] text-[#7fe6f7] border border-[rgba(34,211,238,0.3)] rounded-full px-2.5 py-1">
              IST · REMOTE
            </span>
          </div>

          <div className="flex flex-wrap gap-2 py-4.5">
            {heroStack.map((tech) => (
              <span
                key={tech}
                className="font-['JetBrains_Mono'] text-[11.5px] px-2.75 py-1.5 border border-[var(--line)] rounded-lg bg-[rgba(255,255,255,0.04)] text-[#c6cfe4]"
              >
                {tech}
              </span>
            ))}
          </div>

          {/* Terminal Box */}
          <div className="border border-[var(--line)] rounded-[var(--r)] bg-[rgba(4,6,12,0.72)] overflow-hidden">
            <div className="flex items-center gap-1.75 px-3 py-2.5 border-b border-[var(--line)]">
              <span className="w-2.25 h-2.25 rounded-full bg-[#3a4258]"></span>
              <span className="w-2.25 h-2.25 rounded-full bg-[#3a4258]"></span>
              <span className="w-2.25 h-2.25 rounded-full bg-[#3a4258]"></span>
              <span className="font-['JetBrains_Mono'] text-[10.5px] text-[var(--faint)] ml-1.5">
                developer.ts
              </span>
            </div>
            <pre className="m-0 p-4 font-['JetBrains_Mono'] text-[12.5px] leading-[1.75] overflow-x-auto text-[#c6cfe4]">
              <span className="text-[#8b5cf6]">const</span>{" "}
              <span className="text-[#7fe6f7]">developer</span> = {"{\n"}
              {"  "}frontend: [<span className="text-[#9ae6b4]">"React"</span>,{" "}
              <span className="text-[#9ae6b4]">"Next.js"</span>],{"\n"}
              {"  "}backend: [<span className="text-[#9ae6b4]">"Python"</span>,{" "}
              <span className="text-[#9ae6b4]">"Node.js"</span>],{"\n"}
              {"  "}intelligence: [<span className="text-[#9ae6b4]">"LLMs"</span>,{" "}
              <span className="text-[#9ae6b4]">"RAG"</span>,{" "}
              <span className="text-[#9ae6b4]">"Agents"</span>]{"\n"}
              {"}"}
              <span className="text-[var(--cyan)] animate-[caret_1.1s_step-end_infinite]">
                ▍
              </span>
            </pre>
          </div>
        </div>
      </div>
    </section>
  );
}
