import { cn } from "@/lib/utils";

const series = [
  4, 9, 7, 14, 12, 19, 17, 24, 22, 29, 26, 34, 31, 40, 44, 41, 52, 58, 55, 66,
];

const W = 560;
const H = 170;

function buildPath(values: number[], close: boolean) {
  const max = Math.max(...values);
  const step = W / (values.length - 1);
  const points = values.map((v, i) => {
    const x = i * step;
    const y = H - (v / max) * (H - 12) - 6;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });
  const line = `M${points.join(" L")}`;
  return close ? `${line} L${W},${H} L0,${H} Z` : line;
}

function Tile({
  label,
  value,
  delta,
  up = true,
}: {
  label: string;
  value: string;
  delta: string;
  up?: boolean;
}) {
  return (
    <div className="rounded-xl border border-border bg-bg/60 p-3">
      <p className="text-[0.6875rem] text-fg-muted">{label}</p>
      <p className="mt-1 text-lg font-semibold tracking-tight">{value}</p>
      <p
        className={cn(
          "mt-0.5 text-[0.6875rem] font-medium",
          up ? "text-emerald-500" : "text-rose-500",
        )}
      >
        {up ? "▲" : "▼"} {delta}
      </p>
    </div>
  );
}

/**
 * A decorative mock of the product UI. Built from markup rather than a
 * screenshot so it stays crisp at any density and re-themes with the page —
 * and so the page ships no render-blocking hero image.
 */
export function AppPreview({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn(
        "ring-gradient overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl shadow-black/10 dark:shadow-black/50",
        className,
      )}
    >
      {/* Window chrome */}
      <div className="flex items-center gap-2 border-b border-border bg-surface-2 px-4 py-3">
        <span className="size-2.5 rounded-full bg-rose-400/70" />
        <span className="size-2.5 rounded-full bg-amber-400/70" />
        <span className="size-2.5 rounded-full bg-emerald-400/70" />
        <div className="ml-3 hidden rounded-md border border-border bg-bg px-3 py-1 text-[0.6875rem] text-fg-muted sm:block">
          app.stackpilot.com / explore
        </div>
      </div>

      <div className="grid gap-4 p-4 sm:grid-cols-[150px_1fr] sm:p-5">
        {/* Sidebar */}
        <div className="hidden flex-col gap-1.5 sm:flex">
          {["Home", "Explore", "Metrics", "Funnels", "Retention", "Alerts"].map(
            (item, i) => (
              <div
                key={item}
                className={cn(
                  "rounded-lg px-3 py-2 text-[0.75rem]",
                  i === 1
                    ? "bg-accent-soft font-medium text-accent"
                    : "text-fg-muted",
                )}
              >
                {item}
              </div>
            ),
          )}
        </div>

        <div className="flex flex-col gap-4">
          {/* The "prompt" */}
          <div className="rounded-xl border border-border bg-bg px-3.5 py-3">
            <p className="text-[0.6875rem] uppercase tracking-[0.14em] text-fg-muted">
              Ask
            </p>
            <p className="mt-1.5 text-[0.8125rem] leading-5">
              Weekly activated accounts, split by plan, last 90 days
              <span className="ml-0.5 inline-block h-4 w-px translate-y-0.5 bg-accent animate-pulse-slow" />
            </p>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Tile label="Activated" value="8,412" delta="12.4%" />
            <Tile label="Week 4 retention" value="61%" delta="3.1%" />
            <Tile label="Time to value" value="2.4d" delta="0.6d" up={false} />
          </div>

          {/* Chart */}
          <div className="rounded-xl border border-border bg-bg p-3.5">
            <div className="flex items-center justify-between">
              <p className="text-[0.75rem] font-medium">Activated accounts</p>
              <p className="rounded-md bg-accent-soft px-2 py-0.5 text-[0.625rem] font-medium text-accent">
                metric: activated_account
              </p>
            </div>
            <svg
              viewBox={`0 0 ${W} ${H}`}
              className="mt-3 h-28 w-full sm:h-32"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="sp-area" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="var(--color-accent)" stopOpacity="0.35" />
                  <stop offset="100%" stopColor="var(--color-accent)" stopOpacity="0" />
                </linearGradient>
              </defs>
              {[0.25, 0.5, 0.75].map((f) => (
                <line
                  key={f}
                  x1="0"
                  x2={W}
                  y1={H * f}
                  y2={H * f}
                  stroke="var(--color-border)"
                  strokeWidth="1"
                  vectorEffect="non-scaling-stroke"
                />
              ))}
              <path d={buildPath(series, true)} fill="url(#sp-area)" />
              <path
                d={buildPath(series, false)}
                fill="none"
                stroke="var(--color-accent)"
                strokeWidth="2"
                strokeLinejoin="round"
                strokeLinecap="round"
                vectorEffect="non-scaling-stroke"
              />
              <path
                d={buildPath(
                  series.map((v) => v * 0.58),
                  false,
                )}
                fill="none"
                stroke="var(--color-accent-2)"
                strokeWidth="2"
                strokeDasharray="5 4"
                vectorEffect="non-scaling-stroke"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}
