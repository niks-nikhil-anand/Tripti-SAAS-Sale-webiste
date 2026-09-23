import { TechBadge } from "@/components/ui/TechBadge";

export function StackGrid({ stack }: { stack: { group: string; items: string[] }[] }) {
  return (
    <dl className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {stack.map((g) => (
        <div
          key={g.group}
          className="rounded-[var(--r)] border border-[var(--line)] bg-[var(--glass)] p-4"
        >
          <dt className="mb-3 font-[family-name:var(--m)] text-[10.5px] uppercase tracking-[0.18em] text-[var(--faint)]">
            {g.group}
          </dt>
          <dd className="flex flex-wrap gap-1.5">
            {g.items.map((i) => (
              <TechBadge key={i}>{i}</TechBadge>
            ))}
          </dd>
        </div>
      ))}
    </dl>
  );
}
