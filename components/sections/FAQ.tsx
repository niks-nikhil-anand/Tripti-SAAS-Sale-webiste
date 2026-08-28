import { faqs } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ChevronDownIcon } from "@/components/ui/Icons";

/**
 * Native <details>/<summary> rather than a JS accordion: it works before
 * hydration, is keyboard accessible for free, and crawlers see every answer in
 * the HTML — which is what the FAQPage structured data claims is there.
 */
export function FAQ() {
  return (
    <section
      id="faq"
      aria-labelledby="faq-heading"
      className="scroll-mt-24 py-20 sm:py-28"
    >
      <Container className="max-w-3xl">
        <SectionHeading
          id="faq-heading"
          eyebrow="FAQ"
          title="Questions we get on every first call"
        />

        <div className="mt-12 divide-y divide-border border-y border-border">
          {faqs.map((faq) => (
            <details key={faq.question} name="faq" className="group py-1">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-4 text-left text-[0.9375rem] font-medium transition-colors hover:text-accent [&::-webkit-details-marker]:hidden">
                {faq.question}
                <ChevronDownIcon className="size-5 shrink-0 text-fg-muted transition-transform duration-300 group-open:-rotate-180" />
              </summary>
              <p className="pb-5 pr-10 text-[0.9375rem] leading-7 text-fg-muted">
                {faq.answer}
              </p>
            </details>
          ))}
        </div>
      </Container>
    </section>
  );
}
