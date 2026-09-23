import type { Point } from "@/types/content";

export function PointGrid({ points, as = "h3" }: { points: Point[]; as?: "h3" | "h4" }) {
  const Heading = as;
  return (
    <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
      {points.map((p) => (
        <li
          key={p.title}
          className="rounded-[var(--r)] border border-[var(--line)] bg-[linear-gradient(165deg,rgba(255,255,255,0.045),rgba(255,255,255,0.01))] p-5"
        >
          <Heading className="mb-2 text-[15.5px] font-semibold tracking-normal text-[var(--ink)]">
            {p.title}
          </Heading>
          <p className="text-[13.5px] leading-[1.65] text-[var(--dim)]">{p.text}</p>
        </li>
      ))}
    </ul>
  );
}
