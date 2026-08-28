"use client";

import { useId, useState } from "react";
import { plans } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CheckIcon } from "@/components/ui/Icons";

type Cycle = "monthly" | "annual";

export function Pricing() {
  const [cycle, setCycle] = useState<Cycle>("annual");
  const groupId = useId();

  return (
    <section
      id="pricing"
      aria-labelledby="pricing-heading"
      className="scroll-mt-24 border-y border-border bg-bg-subtle py-20 sm:py-28"
    >
      <Container>
        <SectionHeading
          id="pricing-heading"
          eyebrow="Pricing"
          title="Priced per editor, not per person who wants a number"
          description="Viewers are unlimited on every plan. Start free, upgrade when your team outgrows it, cancel from settings without emailing anyone."
        />

        <div
          role="radiogroup"
          aria-label="Billing cycle"
          className="mx-auto mt-10 inline-flex rounded-xl border border-border bg-surface p-1"
        >
          {(["monthly", "annual"] as const).map((value) => (
            <button
              key={value}
              type="button"
              role="radio"
              aria-checked={cycle === value}
              id={`${groupId}-${value}`}
              onClick={() => setCycle(value)}
              className={cn(
                "rounded-lg px-4 py-2 text-sm font-medium capitalize transition-colors",
                cycle === value
                  ? "bg-accent text-accent-fg"
                  : "text-fg-muted hover:text-fg",
              )}
            >
              {value}
              {value === "annual" ? (
                <span
                  className={cn(
                    "ml-2 rounded-full px-2 py-0.5 text-[0.6875rem] font-semibold",
                    cycle === "annual"
                      ? "bg-white/20"
                      : "bg-accent-soft text-accent",
                  )}
                >
                  −20%
                </span>
              ) : null}
            </button>
          ))}
        </div>

        <div className="mt-12 grid items-start gap-6 lg:grid-cols-3">
          {plans.map((plan) => {
            const price = cycle === "annual" ? plan.annual : plan.monthly;
            const isCustom = price === null;

            return (
              <div
                key={plan.name}
                className={cn(
                  "relative flex h-full flex-col rounded-2xl border bg-surface p-7",
                  plan.featured
                    ? "ring-gradient border-transparent shadow-2xl shadow-accent/10 lg:-my-4 lg:py-11"
                    : "border-border",
                )}
              >
                {plan.featured ? (
                  <span className="absolute -top-3 left-7 rounded-full bg-accent px-3 py-1 text-[0.6875rem] font-semibold uppercase tracking-wider text-accent-fg">
                    Most popular
                  </span>
                ) : null}

                <h3 className="text-lg font-semibold tracking-tight">
                  {plan.name}
                </h3>
                <p className="mt-1.5 text-sm text-fg-muted">{plan.blurb}</p>

                <p className="mt-6 flex items-baseline gap-1.5">
                  {isCustom ? (
                    <span className="text-4xl font-semibold tracking-tight">
                      Custom
                    </span>
                  ) : (
                    <>
                      <span className="text-4xl font-semibold tracking-tight">
                        ${price}
                      </span>
                      <span className="text-sm text-fg-muted">
                        {price === 0 ? "forever" : "/ editor / month"}
                      </span>
                    </>
                  )}
                </p>
                <p className="mt-1 h-5 text-xs text-fg-muted">
                  {!isCustom && price !== 0 && cycle === "annual"
                    ? "billed annually"
                    : ""}
                </p>

                <Button
                  as="a"
                  href="#"
                  variant={plan.featured ? "primary" : "secondary"}
                  className="mt-6 w-full"
                >
                  {plan.cta}
                </Button>

                <ul className="mt-7 flex flex-col gap-3 border-t border-border pt-7">
                  {plan.features.map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm leading-6">
                      <CheckIcon className="mt-0.5 size-4 shrink-0 text-accent" />
                      <span className="text-fg-muted">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <p className="mt-10 text-center text-sm text-fg-muted">
          Prices in USD. Nonprofits and pre-seed startups get 50% off — just ask.
        </p>
      </Container>
    </section>
  );
}
