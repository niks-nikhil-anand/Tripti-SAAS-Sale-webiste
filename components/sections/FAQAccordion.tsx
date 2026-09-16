"use client";

import { useState } from "react";

export type FAQItem = {
  q: string;
  a: string;
};

interface FAQAccordionProps {
  id?: string;
  labelNumber?: string;
  title: string;
  subtitle?: string;
  faqs: readonly FAQItem[];
}

export function FAQAccordion({
  id = "faq",
  labelNumber = "09 — FAQ",
  title = "Questions Buyers Ask First.",
  subtitle,
  faqs,
}: FAQAccordionProps) {
  const [openIndexes, setOpenIndexes] = useState<Record<number, boolean>>({});

  const toggle = (index: number) => {
    setOpenIndexes((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  return (
    <section
      id={id}
      className="rv max-w-[1240px] mx-auto px-4 sm:px-6 pt-16 sm:pt-24 lg:pt-28"
    >
      {labelNumber && (
        <p className="font-['JetBrains_Mono'] text-[10.5px] tracking-[0.22em] uppercase text-[var(--blue)] mb-4.5">
          {labelNumber}
        </p>
      )}

      <h2 className="font-['Space_Grotesk'] text-[30px] sm:text-[42px] lg:text-[52px] leading-[1.08] max-w-[20ch] mb-4 text-[var(--ink)]">
        {title}
      </h2>

      {subtitle && (
        <p className="text-[var(--dim)] text-[15px] leading-[1.65] max-w-[64ch] mb-8">
          {subtitle}
        </p>
      )}

      <div className="grid gap-2.5 max-w-[900px]">
        {faqs.map((f, idx) => {
          const isOpen = Boolean(openIndexes[idx]);
          return (
            <div
              key={idx}
              className="border border-[var(--line)] rounded-[var(--r)] bg-[rgba(255,255,255,0.028)] overflow-hidden transition-colors"
            >
              <button
                type="button"
                onClick={() => toggle(idx)}
                aria-expanded={isOpen}
                className="w-full flex items-center gap-4.5 p-4.75 sm:px-5 min-h-[58px] bg-none border-0 cursor-pointer text-left font-['Space_Grotesk'] font-semibold text-[16.5px] text-[var(--ink)] hover:text-[#a9c0ff] transition-colors"
              >
                <span className="flex-1">{f.q}</span>
                <span
                  aria-hidden="true"
                  className={`text-xl font-mono text-[#7fe6f7] transition-transform duration-200 ${
                    isOpen ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
              </button>
              {isOpen && (
                <p className="px-5 pb-5.5 text-[14.5px] leading-[1.7] text-[var(--dim)] max-w-[76ch] animate-in fade-in duration-200">
                  {f.a}
                </p>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
