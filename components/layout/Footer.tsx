import Link from "next/link";
import { siteConfig } from "@/lib/site";

export function Footer() {
  const waUrl = `https://wa.me/${siteConfig.whatsappNumber}?text=${encodeURIComponent(
    "Hi, I found your website and would like to discuss a development project."
  )}`;

  return (
    <footer className="border-t border-[var(--line)] bg-gradient-to-b from-[rgba(255,255,255,0.02)] to-transparent mt-20">
      <div className="max-w-[1240px] mx-auto px-4 sm:px-6 py-10 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-8">
          <div className="sm:col-span-2 md:col-span-1">
            <p className="font-['Space_Grotesk'] font-bold text-[19px] mb-1 text-[var(--ink)]">
              TRIPTI.
            </p>
            <p className="font-['JetBrains_Mono'] text-[9.5px] tracking-[0.24em] text-[var(--faint)] uppercase mb-3.5">
              Developer
            </p>
            <p className="text-[13px] leading-[1.65] text-[var(--dim)] max-w-[34ch]">
              Full-stack, React, Next.js, Python and AI developer. Based in
              Bengaluru, India; working remotely with teams globally.
            </p>
          </div>

          <nav aria-label="Services">
            <p className="font-['JetBrains_Mono'] text-[10px] tracking-[0.18em] uppercase text-[var(--faint)] mb-3.5">
              Services
            </p>
            <div className="grid gap-2 text-[13px]">
              <Link
                href="/react-developer"
                className="text-[var(--dim)] hover:text-[var(--ink)]"
              >
                React Developer
              </Link>
              <Link
                href="/nextjs-developer"
                className="text-[var(--dim)] hover:text-[var(--ink)]"
              >
                Next.js Developer
              </Link>
              <Link
                href="/python-developer"
                className="text-[var(--dim)] hover:text-[var(--ink)]"
              >
                Python Developer
              </Link>
              <Link
                href="/ai-developer"
                className="text-[var(--dim)] hover:text-[var(--ink)]"
              >
                AI Developer
              </Link>
              <Link
                href="/full-stack-developer"
                className="text-[var(--dim)] hover:text-[var(--ink)]"
              >
                Full Stack Developer
              </Link>
              <Link
                href="/nodejs-developer"
                className="text-[var(--dim)] hover:text-[var(--ink)]"
              >
                Node.js Developer
              </Link>
              <Link
                href="/typescript-developer"
                className="text-[var(--dim)] hover:text-[var(--ink)]"
              >
                TypeScript Developer
              </Link>
              <Link
                href="/automation-development"
                className="text-[var(--dim)] hover:text-[var(--ink)]"
              >
                Automation Developer
              </Link>
              <Link
                href="/ai-chatbot-development"
                className="text-[var(--dim)] hover:text-[var(--ink)]"
              >
                Chatbot Developer
              </Link>
              <Link
                href="/api-development"
                className="text-[var(--dim)] hover:text-[var(--ink)]"
              >
                Backend & API Developer
              </Link>
            </div>
          </nav>

          <nav aria-label="Quick links">
            <p className="font-['JetBrains_Mono'] text-[10px] tracking-[0.18em] uppercase text-[var(--faint)] mb-3.5">
              Quick links
            </p>
            <div className="grid gap-2 text-[13px]">
              <Link href="/about" className="text-[var(--dim)] hover:text-[var(--ink)]">
                About
              </Link>
              <Link href="/projects" className="text-[var(--dim)] hover:text-[var(--ink)]">
                Projects
              </Link>
              <Link href="/#insights" className="text-[var(--dim)] hover:text-[var(--ink)]">
                Insights
              </Link>
              <Link href="/#testimonials" className="text-[var(--dim)] hover:text-[var(--ink)]">
                Testimonials
              </Link>
              <Link href="/#faq" className="text-[var(--dim)] hover:text-[var(--ink)]">
                FAQ
              </Link>
              <Link href="/#contact" className="text-[var(--dim)] hover:text-[var(--ink)]">
                Contact
              </Link>
              <Link href="/hire-me" className="text-[var(--dim)] hover:text-[var(--ink)]">
                Hire Me
              </Link>
            </div>
          </nav>

          <div>
            <p className="font-['JetBrains_Mono'] text-[10px] tracking-[0.18em] uppercase text-[var(--faint)] mb-3.5">
              Locations
            </p>
            <div className="grid gap-2 text-[13px] text-[var(--dim)]">
              <span>Based in Bengaluru</span>
              <span>Serving clients across India</span>
              <span>Remote for UAE, UK, US</span>
            </div>
          </div>

          <div>
            <p className="font-['JetBrains_Mono'] text-[10px] tracking-[0.18em] uppercase text-[var(--faint)] mb-3.5">
              Contact
            </p>
            <div className="grid gap-2 text-[13px]">
              <a
                href={`mailto:${siteConfig.email}`}
                className="text-[var(--dim)] hover:text-[var(--ink)] break-all"
              >
                {siteConfig.email}
              </a>
              <a
                href={`tel:${siteConfig.phone.replace(/[^0-9+]/g, "")}`}
                className="text-[var(--dim)] hover:text-[var(--ink)]"
              >
                {siteConfig.phone}
              </a>
              <a
                href={waUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#7fe6f7] hover:underline flex items-center gap-1.5"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-[#25d366]"></span>
                WhatsApp
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-[var(--line)] flex flex-col sm:flex-row items-center justify-between gap-4 text-[12px] text-[var(--faint)]">
          <p>© {new Date().getFullYear()} TRIPTI SHAKYA. All rights reserved.</p>
          <p className="font-['JetBrains_Mono']">Full-Stack + AI Developer</p>
        </div>
      </div>
    </footer>
  );
}
