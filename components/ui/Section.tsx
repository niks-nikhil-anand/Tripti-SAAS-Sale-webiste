import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/** Page-width section shell shared by the landing and case-study templates. */
export function Section({
  id,
  children,
  className,
  labelledBy,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  labelledBy?: string;
}) {
  return (
    <section
      id={id}
      aria-labelledby={labelledBy}
      className={cn("mx-auto max-w-[1240px] px-4 pt-16 sm:px-6 sm:pt-20", className)}
    >
      {children}
    </section>
  );
}

export function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 font-[family-name:var(--m)] text-[10.5px] uppercase tracking-[0.22em] text-[var(--blue)]">
      {children}
    </p>
  );
}

export function H2({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <h2
      id={id}
      className="max-w-[28ch] text-[26px] leading-[1.12] text-[var(--ink)] text-balance sm:text-[34px]"
    >
      {children}
    </h2>
  );
}
