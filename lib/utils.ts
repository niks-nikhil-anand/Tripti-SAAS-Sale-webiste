export type ClassValue = string | false | null | undefined;

/** Tiny classnames joiner — avoids pulling in a dependency for a landing page. */
export function cn(...classes: ClassValue[]): string {
  return classes.filter(Boolean).join(" ");
}
