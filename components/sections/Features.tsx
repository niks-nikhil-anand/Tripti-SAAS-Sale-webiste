import { features } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { FeatureGlyph } from "@/components/ui/Icons";

export function Features() {
  return (
    <section
      id="features"
      aria-labelledby="features-heading"
      className="scroll-mt-24 py-20 sm:py-28"
    >
      <Container>
        <SectionHeading
          id="features-heading"
          eyebrow="Features"
          title="Everything a product team needs to answer its own questions"
          description="Not another dashboard tool. A governed semantic layer, a fast query engine and an AI that is only allowed to use metrics your team has approved."
        />

        <ul className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <li
              key={feature.title}
              className="group rounded-2xl border border-border bg-surface p-6 transition-[transform,border-color,box-shadow] duration-300 hover:-translate-y-1 hover:border-border-strong hover:shadow-xl hover:shadow-black/5 dark:hover:shadow-black/40"
            >
              <span className="inline-flex size-11 items-center justify-center rounded-xl bg-accent-soft text-accent transition-colors group-hover:bg-accent group-hover:text-accent-fg">
                <FeatureGlyph name={feature.icon} className="size-5" />
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight">
                {feature.title}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-7 text-fg-muted">
                {feature.description}
              </p>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  );
}
