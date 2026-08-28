"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";

const field =
  "w-full rounded-xl border border-border bg-surface px-3.5 py-2.5 text-[0.9375rem] text-fg placeholder:text-fg-muted/70 transition-colors focus:border-accent";
const label = "text-sm font-medium";

const budgets = [
  "Under $15k",
  "$15k – $50k",
  "$50k – $150k",
  "Over $150k",
  "Not sure yet",
];

/**
 * Client-side validation and state only — there is no submit endpoint wired up.
 * Point `onSubmit` at a Server Action or a Route Handler that forwards to your
 * CRM or inbox when you have one.
 */
export function ContactForm() {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div
        role="status"
        className="rounded-2xl border border-border bg-surface p-8 text-center"
      >
        <h3 className="text-lg font-semibold tracking-tight">
          That would normally be on its way
        </h3>
        <p className="mx-auto mt-3 max-w-md text-[0.9375rem] leading-7 text-fg-muted">
          This form has no backend connected yet, so nothing was sent. Wire{" "}
          <code className="rounded bg-surface-2 px-1.5 py-0.5 font-mono text-[0.8125rem]">
            onSubmit
          </code>{" "}
          in ContactForm.tsx to a Server Action, then this becomes a real
          enquiry.
        </p>
        <Button
          type="button"
          variant="secondary"
          className="mt-6"
          onClick={() => setSent(false)}
        >
          Back to the form
        </Button>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="flex flex-col gap-5 rounded-2xl border border-border bg-surface p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div className="flex flex-col gap-2">
          <label htmlFor="c-name" className={label}>
            Your name
          </label>
          <input id="c-name" name="name" autoComplete="name" required className={field} placeholder="Priya Raghavan" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="c-email" className={label}>
            Work email
          </label>
          <input id="c-email" name="email" type="email" autoComplete="email" required className={field} placeholder="you@company.com" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="c-company" className={label}>
            Company
          </label>
          <input id="c-company" name="company" autoComplete="organization" className={field} placeholder="Northwind" />
        </div>
        <div className="flex flex-col gap-2">
          <label htmlFor="c-budget" className={label}>
            Budget range
          </label>
          <select id="c-budget" name="budget" className={cn(field, "h-[46px]")} defaultValue={budgets[1]}>
            {budgets.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="c-stack" className={label}>
          Your current stack
        </label>
        <input id="c-stack" name="stack" className={field} placeholder="Snowflake + dbt + Looker, ~400 dashboards" />
      </div>

      <div className="flex flex-col gap-2">
        <label htmlFor="c-message" className={label}>
          What is blocking the team?
        </label>
        <textarea
          id="c-message"
          name="message"
          rows={5}
          required
          className={cn(field, "resize-y")}
          placeholder="Looker renewal in November. 400 dashboards, nobody trusts the activation number, two analysts drowning in ad-hoc requests."
        />
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <p className="text-xs leading-5 text-fg-muted">
          We reply within one business day. No sequence, no drip campaign.
        </p>
        <Button type="submit">Request a scoping call</Button>
      </div>
    </form>
  );
}
