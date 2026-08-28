import { siteConfig } from "@/lib/site";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { ArrowRightIcon } from "@/components/ui/Icons";

export function CTA() {
  return (
    <section aria-labelledby="cta-heading" className="pb-24 pt-4 sm:pb-32">
      <Container>
        <div className="ring-gradient relative overflow-hidden rounded-3xl border border-transparent bg-surface px-6 py-16 text-center sm:px-16">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-grid opacity-70" />
            <div className="absolute left-1/2 top-full size-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--glow-1)] blur-[100px]" />
          </div>

          <h2
            id="cta-heading"
            className="mx-auto max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
          >
            Your data already has the answer. Go get it.
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-7 text-fg-muted text-pretty">
            Connect a warehouse and ask your first question in under five minutes.
            Free for three editors, forever — no card, no sales call, no
            implementation project.
          </p>

          <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
            <Button as="a" href="#pricing" size="lg">
              Start free
              <ArrowRightIcon className="size-[18px]" />
            </Button>
            <Button
              as="a"
              href={`mailto:${siteConfig.email}`}
              size="lg"
              variant="secondary"
            >
              Book a 20-minute demo
            </Button>
          </div>
        </div>
      </Container>
    </section>
  );
}
