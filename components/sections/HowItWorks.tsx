import { steps } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function HowItWorks() {
  return (
    <section
      id="how-it-works"
      aria-labelledby="how-it-works-heading"
      className="scroll-mt-24 border-y border-border bg-bg-subtle py-20 sm:py-28"
    >
      <Container>
        <SectionHeading
          id="how-it-works-heading"
          eyebrow="How it works"
          title="Live in an afternoon, not a quarter"
          description="No pipeline to build, no events to re-instrument, no rip-and-replace of the models your analytics engineers already maintain."
        />

        <ol className="relative mt-14 grid gap-8 md:grid-cols-3">
          {/* The connector only makes sense on the 3-across layout. */}
          <div
            aria-hidden="true"
            className="absolute left-0 right-0 top-6 hidden h-px bg-gradient-to-r from-transparent via-border-strong to-transparent md:block"
          />
          {steps.map((step, i) => (
            <li key={step.title} className="relative flex flex-col gap-3">
              <span className="inline-flex size-12 items-center justify-center rounded-full border border-border bg-surface text-base font-semibold text-accent shadow-sm">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-lg font-semibold tracking-tight">
                {step.title}
              </h3>
              <p className="text-[0.9375rem] leading-7 text-fg-muted">
                {step.description}
              </p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  );
}
