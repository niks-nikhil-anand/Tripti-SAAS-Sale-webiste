import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Every section gets exactly one h2, wired to its section via aria-labelledby
 * from the caller. Keeps the document outline clean for crawlers and screen
 * readers alike.
 */
export function SectionHeading({
  id,
  eyebrow,
  title,
  description,
  align = "center",
  className,
}: {
  id: string;
  eyebrow?: string;
  title: ReactNode;
  description?: ReactNode;
  align?: "center" | "left";
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center" : "items-start",
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
          {eyebrow}
        </p>
      ) : null}
      <h2
        id={id}
        className="max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl"
      >
        {title}
      </h2>
      {description ? (
        <p className="max-w-2xl text-base leading-7 text-fg-muted text-pretty">
          {description}
        </p>
      ) : null}
    </div>
  );
}
