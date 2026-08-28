import { testimonials } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

export function Testimonials() {
  return (
    <section
      id="testimonials"
      aria-labelledby="testimonials-heading"
      className="scroll-mt-24 py-20 sm:py-28"
    >
      <Container>
        <SectionHeading
          id="testimonials-heading"
          eyebrow="Customers"
          title="The teams who stopped filing data tickets"
          description="Read what data leads and product managers say after their first quarter on Stackpilot."
        />

        <div className="mt-14 grid gap-5 lg:grid-cols-3">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="flex flex-col justify-between gap-6 rounded-2xl border border-border bg-surface p-6"
            >
              <blockquote className="text-[0.9375rem] leading-7 text-pretty">
                <span aria-hidden="true" className="text-accent">
                  &ldquo;
                </span>
                {t.quote}
                <span aria-hidden="true" className="text-accent">
                  &rdquo;
                </span>
              </blockquote>
              <figcaption className="flex items-center gap-3 border-t border-border pt-5">
                <span
                  aria-hidden="true"
                  className="inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent"
                >
                  {initials(t.name)}
                </span>
                <span className="flex flex-col">
                  <span className="text-sm font-semibold">{t.name}</span>
                  <span className="text-sm text-fg-muted">
                    {t.role}, {t.company}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </Container>
    </section>
  );
}
