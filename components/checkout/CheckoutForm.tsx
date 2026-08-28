"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { plans, type Plan } from "@/lib/site";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import { CheckIcon } from "@/components/ui/Icons";

type Cycle = "monthly" | "annual";

const paidPlans = plans.filter((p): p is Plan & { monthly: number } =>
  p.monthly !== null,
);

const field =
  "h-11 w-full rounded-xl border border-border bg-surface px-3.5 text-[0.9375rem] text-fg placeholder:text-fg-muted/70 transition-colors focus:border-accent";
const label = "text-sm font-medium";

export function CheckoutForm({ initialPlan }: { initialPlan: string }) {
  const [planName, setPlanName] = useState(
    paidPlans.find((p) => p.name.toLowerCase() === initialPlan.toLowerCase())
      ?.name ?? "Growth",
  );
  const [cycle, setCycle] = useState<Cycle>("annual");
  const [seats, setSeats] = useState(3);
  const [coupon, setCoupon] = useState("");
  const [applied, setApplied] = useState(false);

  const plan = paidPlans.find((p) => p.name === planName) ?? paidPlans[0];

  const totals = useMemo(() => {
    const unit = (cycle === "annual" ? plan.annual : plan.monthly) ?? 0;
    const months = cycle === "annual" ? 12 : 1;
    const subtotal = unit * seats * months;
    const discount = applied ? Math.round(subtotal * 0.2) : 0;
    const taxable = subtotal - discount;
    const tax = Math.round(taxable * 0.2);
    return { unit, months, subtotal, discount, tax, total: taxable + tax };
  }, [plan, cycle, seats, applied]);

  const money = (n: number) =>
    n.toLocaleString("en-US", { style: "currency", currency: "USD", maximumFractionDigits: 0 });

  return (
    <div className="grid items-start gap-8 lg:grid-cols-[1.35fr_1fr]">
      {/* ---------------------------------------------------------------- */}
      {/* Order form                                                        */}
      {/* ---------------------------------------------------------------- */}
      <form
        className="flex flex-col gap-8"
        onSubmit={(e) => e.preventDefault()}
        aria-labelledby="checkout-form-heading"
      >
        <h2 id="checkout-form-heading" className="sr-only">
          Order details
        </h2>

        <fieldset className="flex flex-col gap-4">
          <legend className="text-lg font-semibold tracking-tight">
            1. Choose your plan
          </legend>
          <div className="grid gap-3 sm:grid-cols-2">
            {paidPlans.map((p) => {
              const selected = p.name === planName;
              return (
                <label
                  key={p.name}
                  className={cn(
                    "cursor-pointer rounded-2xl border p-4 transition-colors",
                    selected
                      ? "border-accent bg-accent-soft"
                      : "border-border bg-surface hover:border-border-strong",
                  )}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="font-semibold">{p.name}</span>
                    <input
                      type="radio"
                      name="plan"
                      value={p.name}
                      // The wrapping <label> would otherwise name this control
                      // with the whole card's text, blurb and price included.
                      aria-label={`Select the ${p.name} plan`}
                      checked={selected}
                      onChange={() => setPlanName(p.name)}
                      className="size-4 accent-[var(--color-accent)]"
                    />
                  </span>
                  <span className="mt-1 block text-sm text-fg-muted">
                    {p.blurb}
                  </span>
                  <span className="mt-3 block text-sm font-medium">
                    {p.monthly === 0
                      ? "Free forever"
                      : `${money(cycle === "annual" ? p.annual ?? 0 : p.monthly)} / editor / mo`}
                  </span>
                </label>
              );
            })}
          </div>

          <div
            role="radiogroup"
            aria-label="Billing cycle"
            className="inline-flex w-fit rounded-xl border border-border bg-surface p-1"
          >
            {(["monthly", "annual"] as const).map((value) => (
              <button
                key={value}
                type="button"
                role="radio"
                aria-checked={cycle === value}
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
                      cycle === "annual" ? "bg-white/20" : "bg-accent-soft text-accent",
                    )}
                  >
                    −20%
                  </span>
                ) : null}
              </button>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="seats" className={label}>
              Editor seats
              <span className="ml-2 font-normal text-fg-muted">
                Viewers are always unlimited and free
              </span>
            </label>
            <input
              id="seats"
              name="seats"
              type="number"
              min={1}
              max={500}
              value={seats}
              onChange={(e) =>
                setSeats(Math.min(500, Math.max(1, Number(e.target.value) || 1)))
              }
              className={cn(field, "max-w-[10rem]")}
            />
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-4">
          <legend className="text-lg font-semibold tracking-tight">
            2. Your details
          </legend>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className={label}>
                Full name
              </label>
              <input id="name" name="name" autoComplete="name" required className={field} placeholder="Priya Raghavan" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className={label}>
                Work email
              </label>
              <input id="email" name="email" type="email" autoComplete="email" required className={field} placeholder="you@company.com" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="company" className={label}>
                Company
              </label>
              <input id="company" name="company" autoComplete="organization" className={field} placeholder="Northwind" />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="country" className={label}>
                Billing country
              </label>
              <select id="country" name="country" autoComplete="country-name" className={field} defaultValue="US">
                {["US", "GB", "IN", "DE", "CA", "AU", "SG", "Other"].map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </fieldset>

        <fieldset className="flex flex-col gap-4">
          <legend className="text-lg font-semibold tracking-tight">
            3. Payment
          </legend>

          {/*
            Deliberately no card-number, expiry or CVC inputs here. Card data
            must be entered into an iframe served by the payment provider
            (Stripe Payment Element, Adyen Drop-in, etc.) so the raw PAN never
            touches this origin — that is what keeps the integration in PCI DSS
            SAQ-A scope instead of the far heavier SAQ-D.

            To finish the integration:
              1. Create a PaymentIntent server-side in a Route Handler.
              2. Mount the provider's element into #payment-element below.
              3. Confirm the payment and redirect to /checkout/success.
          */}
          <div
            id="payment-element"
            className="rounded-2xl border border-dashed border-border-strong bg-surface-2 p-6 text-center"
          >
            <p className="text-sm font-medium">Payment provider element mounts here</p>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-6 text-fg-muted">
              Card details are collected inside the provider&rsquo;s hosted
              iframe, never by this page. See the comment in{" "}
              <code className="rounded bg-bg px-1.5 py-0.5 font-mono text-[0.8125rem]">
                CheckoutForm.tsx
              </code>{" "}
              for the three steps to wire it up.
            </p>
          </div>

          <div className="flex flex-col gap-2 sm:flex-row">
            <input
              aria-label="Coupon code"
              value={coupon}
              onChange={(e) => setCoupon(e.target.value)}
              className={cn(field, "sm:max-w-[16rem]")}
              placeholder="Coupon code"
            />
            <Button
              type="button"
              variant="secondary"
              onClick={() => setApplied(coupon.trim().length > 0)}
            >
              {applied ? "Applied" : "Apply"}
            </Button>
          </div>
        </fieldset>

        <div className="flex flex-col gap-3">
          <Button type="submit" size="lg" disabled>
            Complete purchase
          </Button>
          <p className="text-xs leading-5 text-fg-muted">
            Disabled until a payment provider is connected. By subscribing you
            agree to the terms and the DPA. Cancel any time from billing
            settings.
          </p>
        </div>
      </form>

      {/* ---------------------------------------------------------------- */}
      {/* Order summary                                                     */}
      {/* ---------------------------------------------------------------- */}
      <aside
        aria-labelledby="summary-heading"
        className="rounded-2xl border border-border bg-surface p-6 lg:sticky lg:top-24"
      >
        <h2 id="summary-heading" className="text-lg font-semibold tracking-tight">
          Order summary
        </h2>

        <dl className="mt-5 flex flex-col gap-3 text-sm">
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-fg-muted">
              {plan.name} · {seats} {seats === 1 ? "editor" : "editors"}
            </dt>
            <dd className="font-medium">{money(totals.subtotal)}</dd>
          </div>
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-fg-muted">
              Billed {cycle === "annual" ? "annually" : "monthly"}
            </dt>
            <dd className="text-fg-muted">
              {money(totals.unit)} × {seats} × {totals.months}
            </dd>
          </div>
          {totals.discount > 0 ? (
            <div className="flex items-baseline justify-between gap-4 text-emerald-600 dark:text-emerald-400">
              <dt>Coupon</dt>
              <dd>−{money(totals.discount)}</dd>
            </div>
          ) : null}
          <div className="flex items-baseline justify-between gap-4">
            <dt className="text-fg-muted">Estimated tax</dt>
            <dd className="text-fg-muted">{money(totals.tax)}</dd>
          </div>
          <div className="mt-2 flex items-baseline justify-between gap-4 border-t border-border pt-4 text-base">
            <dt className="font-semibold">Total due today</dt>
            <dd className="text-xl font-semibold tracking-tight">
              {money(totals.total)}
            </dd>
          </div>
        </dl>

        <ul className="mt-6 flex flex-col gap-2.5 border-t border-border pt-6">
          {plan.features.slice(0, 4).map((f) => (
            <li key={f} className="flex items-start gap-2.5 text-sm leading-6">
              <CheckIcon className="mt-0.5 size-4 shrink-0 text-accent" />
              <span className="text-fg-muted">{f}</span>
            </li>
          ))}
        </ul>

        <p className="mt-6 text-xs leading-5 text-fg-muted">
          14-day trial on paid plans, no charge until it ends. Need invoicing,
          a DPA or a security review?{" "}
          <Link href="/hire-me#contact" className="text-accent hover:underline">
            Talk to us
          </Link>
          .
        </p>
      </aside>
    </div>
  );
}
