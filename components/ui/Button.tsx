import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cn } from "@/lib/utils";

type Variant = "primary" | "secondary" | "ghost";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 rounded-xl font-medium whitespace-nowrap transition-[background-color,border-color,color,box-shadow,transform] duration-200 active:translate-y-px disabled:pointer-events-none disabled:opacity-60";

const variants: Record<Variant, string> = {
  primary:
    "bg-accent text-accent-fg shadow-lg shadow-accent/25 hover:bg-accent-hover hover:shadow-accent/35",
  secondary:
    "border border-border bg-surface text-fg hover:border-border-strong hover:bg-surface-2",
  ghost: "text-fg-muted hover:bg-surface-2 hover:text-fg",
};

const sizes: Record<Size, string> = {
  sm: "h-9 px-3.5 text-sm",
  md: "h-11 px-5 text-[0.9375rem]",
  lg: "h-12 px-6 text-base",
};

type SharedProps = {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
};

/** `as="a"` renders a link with anchor props; the default renders a button. */
type ButtonProps =
  | (SharedProps & { as?: "button" } & ComponentPropsWithoutRef<"button">)
  | (SharedProps & { as: "a" } & ComponentPropsWithoutRef<"a">);

export function Button({
  variant = "primary",
  size = "md",
  as = "button",
  className,
  children,
  ...rest
}: ButtonProps) {
  const classes = cn(base, variants[variant], sizes[size], className);

  if (as === "a") {
    return (
      <a className={classes} {...(rest as ComponentPropsWithoutRef<"a">)}>
        {children}
      </a>
    );
  }

  return (
    <button className={classes} {...(rest as ComponentPropsWithoutRef<"button">)}>
      {children}
    </button>
  );
}
