import { locationCards } from "@/lib/site";

export function LocationsServed() {
  return (
    <section className="rv max-w-[1240px] mx-auto px-4 sm:px-6 pt-16 sm:pt-24 lg:pt-28">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-7 lg:gap-13 items-center">
        <div>
          <p className="font-['JetBrains_Mono'] text-[10.5px] tracking-[0.22em] uppercase text-[var(--blue)] mb-4.5">
            07 — Locations served
          </p>

          <h2 className="font-['Space_Grotesk'] text-[28px] sm:text-[38px] lg:text-[46px] leading-[1.08] mb-5 text-[var(--ink)]">
            Based in <span className="grad-word">Bengaluru, India</span>. Working With Teams Worldwide.
          </h2>

          <p className="text-[var(--dim)] text-[14.5px] leading-[1.65] max-w-[52ch] mb-6.5">
            One real base, stated plainly. Remote-service engagements carry clear commitments — time-zone overlap, contracting transparency, and regular async review cadences.
          </p>

          <div className="grid gap-3">
            {locationCards.map((l, idx) => (
              <div
                key={idx}
                className="border border-[var(--line)] border-l-2 border-l-[rgba(77,124,255,0.6)] rounded-[var(--r)] bg-[rgba(255,255,255,0.03)] p-4 sm:p-4.5"
              >
                <p className="font-['JetBrains_Mono'] text-[10px] tracking-[0.18em] uppercase text-[#7fe6f7] mb-1.75">
                  {l.kind}
                </p>
                <h3 className="font-['Space_Grotesk'] font-bold text-[17px] mb-1.75 text-[var(--ink)]">
                  {l.place}
                </h3>
                <p className="text-[13px] leading-[1.6] text-[var(--dim)]">
                  {l.body}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 3D Wireframe Globe Graphic SVG */}
        <div className="only-wide hidden lg:grid place-items-center" aria-hidden="true">
          <svg
            viewBox="0 0 240 240"
            width="100%"
            className="max-w-[340px]"
            role="presentation"
          >
            <circle
              cx="120"
              cy="120"
              r="96"
              fill="none"
              stroke="rgba(255,255,255,.12)"
            ></circle>
            <circle cx="120" cy="120" r="96" fill="url(#g2)"></circle>
            <defs>
              <radialGradient id="g2" cx="35%" cy="30%">
                <stop offset="0%" stopColor="rgba(77,124,255,.22)"></stop>
                <stop offset="100%" stopColor="rgba(7,8,13,0)"></stop>
              </radialGradient>
            </defs>
            <g fill="none" stroke="rgba(255,255,255,.1)">
              <ellipse cx="120" cy="120" rx="96" ry="34"></ellipse>
              <ellipse cx="120" cy="120" rx="96" ry="66"></ellipse>
              <ellipse cx="120" cy="120" rx="34" ry="96"></ellipse>
              <ellipse cx="120" cy="120" rx="66" ry="96"></ellipse>
            </g>
            <g
              className="flow"
              fill="none"
              stroke="rgba(34,211,238,.75)"
              strokeWidth="1.4"
            >
              <path d="M150 150 C 110 130, 80 90, 66 74"></path>
              <path d="M150 150 C 180 120, 190 96, 196 86"></path>
              <path d="M150 150 C 120 176, 92 180, 74 172"></path>
            </g>
            <circle cx="150" cy="150" r="5.5" fill="#22d3ee"></circle>
            <circle cx="66" cy="74" r="3" fill="#8b5cf6"></circle>
            <circle cx="196" cy="86" r="3" fill="#8b5cf6"></circle>
            <circle cx="74" cy="172" r="3" fill="#8b5cf6"></circle>
          </svg>
        </div>
      </div>
    </section>
  );
}
