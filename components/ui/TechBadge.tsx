import type { ReactNode } from "react";

export function TechBadge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-md border border-[var(--line)] bg-[rgba(255,255,255,0.04)] px-2 py-1 font-[family-name:var(--m)] text-[10.5px] text-[#aab5cc]">
      {children}
    </span>
  );
}
