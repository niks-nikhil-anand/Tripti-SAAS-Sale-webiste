import type { ReactElement, SVGProps } from "react";
import type { FeatureIcon } from "@/lib/site";

const strokeProps = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.7,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

function Svg({ children, ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" {...strokeProps} {...props}>
      {children}
    </svg>
  );
}

const featureIcons: Record<FeatureIcon, (p: SVGProps<SVGSVGElement>) => ReactElement> = {
  sparkles: (p) => (
    <Svg {...p}>
      <path d="m12 3 1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3Z" />
      <path d="M18.5 15.5 19 17l1.5.5L19 18l-.5 1.5L18 18l-1.5-.5L18 17l.5-1.5Z" />
    </Svg>
  ),
  shield: (p) => (
    <Svg {...p}>
      <path d="M12 3 5 6v5.5c0 4.2 2.9 7.6 7 9.5 4.1-1.9 7-5.3 7-9.5V6l-7-3Z" />
      <path d="m9.2 12.2 2 2 3.6-3.9" />
    </Svg>
  ),
  bolt: (p) => (
    <Svg {...p}>
      <path d="M13.5 2 5 13.2h5.6L10 22l8.6-11.4h-5.7L13.5 2Z" />
    </Svg>
  ),
  graph: (p) => (
    <Svg {...p}>
      <path d="M4 20V4M4 20h16" />
      <path d="m7.5 15.5 3.3-4.2 3 2.4 4.2-6" />
      <circle cx="10.8" cy="11.3" r="1.1" />
      <circle cx="18" cy="7.7" r="1.1" />
    </Svg>
  ),
  plug: (p) => (
    <Svg {...p}>
      <ellipse cx="12" cy="6" rx="7" ry="3" />
      <path d="M5 6v6c0 1.7 3.1 3 7 3s7-1.3 7-3V6" />
      <path d="M5 12v6c0 1.7 3.1 3 7 3s7-1.3 7-3v-6" />
    </Svg>
  ),
  users: (p) => (
    <Svg {...p}>
      <circle cx="9" cy="8.5" r="3.2" />
      <path d="M3.5 19.5a5.5 5.5 0 0 1 11 0" />
      <path d="M16 5.6a3.2 3.2 0 0 1 0 6.2M17.2 15a5.5 5.5 0 0 1 3.3 4.5" />
    </Svg>
  ),
};

export function FeatureGlyph({
  name,
  className,
}: {
  name: FeatureIcon;
  className?: string;
}) {
  return featureIcons[name]({ className });
}

export function CheckIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg strokeWidth={2} {...props}>
      <path d="m5 12.5 4.2 4.2L19 7" />
    </Svg>
  );
}

export function ArrowRightIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <path d="M4 12h15m-5.5-5.5L19 12l-5.5 5.5" />
    </Svg>
  );
}

export function MenuIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg strokeWidth={1.9} {...props}>
      <path d="M4 7h16M4 12h16M4 17h16" />
    </Svg>
  );
}

export function CloseIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg strokeWidth={1.9} {...props}>
      <path d="M6 6l12 12M18 6 6 18" />
    </Svg>
  );
}

export function ChevronDownIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <Svg {...props}>
      <path d="m6 9.5 6 6 6-6" />
    </Svg>
  );
}

export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <defs>
        <linearGradient id="sp-logo" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--color-accent)" />
          <stop offset="100%" stopColor="var(--color-accent-2)" />
        </linearGradient>
      </defs>
      <rect width="32" height="32" rx="9" fill="url(#sp-logo)" />
      <path
        d="M10 21.5 16 8l6 13.5-6-3.4-6 3.4Z"
        fill="none"
        stroke="#fff"
        strokeWidth="1.9"
        strokeLinejoin="round"
      />
    </svg>
  );
}
