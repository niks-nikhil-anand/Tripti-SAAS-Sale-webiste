import type { ReactNode } from "react";
import { Container } from "./Container";
import { Breadcrumbs, type Crumb } from "./Breadcrumbs";

/**
 * Shared masthead for every inner page: breadcrumb trail, the page's single h1,
 * and a lede. Keeping it in one component is what stops the heading hierarchy
 * drifting between routes.
 */
export function PageHeader({
  trail,
  eyebrow,
  title,
  description,
  children,
}: {
  trail: Crumb[];
  eyebrow?: string;
  title: string;
  description: string;
  children?: ReactNode;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_60%_70%_at_50%_0%,#000_40%,transparent_100%)]" />
        <div className="absolute left-1/2 top-[-18rem] size-[34rem] -translate-x-1/2 rounded-full bg-[var(--glow-1)] blur-[110px]" />
      </div>

      <Container className="py-12 sm:py-16">
        <Breadcrumbs trail={trail} />
        <div className="mt-8 flex max-w-3xl flex-col gap-4 animate-rise">
          {eyebrow ? (
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              {eyebrow}
            </p>
          ) : null}
          <h1 className="text-4xl font-semibold leading-[1.1] tracking-tight text-balance sm:text-5xl">
            {title}
          </h1>
          <p className="text-lg leading-8 text-fg-muted text-pretty">
            {description}
          </p>
          {children}
        </div>
      </Container>
    </section>
  );
}
