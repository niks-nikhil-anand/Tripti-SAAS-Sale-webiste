import { logos } from "@/lib/site";
import { Container } from "@/components/ui/Container";

export function LogoCloud() {
  return (
    <section aria-labelledby="logos-heading" className="border-y border-border bg-bg-subtle py-12">
      <Container>
        <h2
          id="logos-heading"
          className="text-center text-xs font-semibold uppercase tracking-[0.18em] text-fg-muted"
        >
          Trusted by product and data teams at
        </h2>
        <div className="mt-8 grid grid-cols-2 items-center justify-items-center gap-x-6 gap-y-8 sm:grid-cols-3 lg:grid-cols-6">
          {logos.map((name) => (
            <span
              key={name}
              className="text-lg font-semibold tracking-tight text-fg-muted/70 transition-colors hover:text-fg"
            >
              {name}
            </span>
          ))}
        </div>
      </Container>
    </section>
  );
}
