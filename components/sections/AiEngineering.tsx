import { aiCapabilities } from "@/lib/site";

export function AiEngineering() {
  return (
    <section className="rv max-w-[1240px] mx-auto px-4 sm:px-6 pt-16 sm:pt-24 lg:pt-28">
      <div className="relative border border-[rgba(139,92,246,0.26)] rounded-[var(--r-lg)] bg-[linear-gradient(150deg,rgba(77,124,255,0.12),rgba(139,92,246,0.09),rgba(255,255,255,0.015))] overflow-hidden p-6 sm:p-10 lg:p-14">
        <div
          aria-hidden="true"
          className="absolute -top-[30%] -right-[10%] w-[520px] h-[520px] rounded-full bg-[radial-gradient(circle,rgba(34,211,238,0.16),transparent_66%)] blur-[40px] pointer-events-none"
        ></div>

        <div className="relative grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-14 items-start">
          <div>
            <p className="font-[family-name:var(--m)] text-[10.5px] tracking-[0.22em] uppercase text-[#7fe6f7] mb-4.5">
              03 — AI engineering
            </p>

            <h2 className="font-[family-name:var(--h)] text-[28px] sm:text-[38px] lg:text-[48px] leading-[1.08] max-w-[20ch] mb-5 text-[var(--ink)]">
              Building Software With Intelligence Inside.
            </h2>

            <p className="text-[var(--dim)] text-[15px] leading-[1.65] max-w-[52ch] mb-7">
              AI features that ship inside the product rather than beside it: retrieval measured for quality, agents with real tool access, and an evaluation set before anything reaches users.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-2 gap-2">
              {aiCapabilities.map((c) => (
                <span
                  key={c}
                  className="flex items-center gap-2.25 p-2.75 border border-[var(--line)] rounded-xl bg-[rgba(255,255,255,0.04)] text-[13px] text-[#cfd7ea]"
                >
                  <span
                    aria-hidden="true"
                    className="w-1.5 h-1.5 rounded-full bg-[var(--cyan)]"
                  ></span>
                  {c}
                </span>
              ))}
            </div>
          </div>

          {/* Reference Architecture Diagram SVG */}
          <figure className="m-0">
            <figcaption className="font-[family-name:var(--m)] text-[10px] tracking-[0.16em] uppercase text-[var(--faint)] mb-3.5">
              Reference architecture
            </figcaption>

            <svg
              viewBox="0 0 380 400"
              width="100%"
              role="img"
              aria-label="Architecture diagram: user request enters a Next.js application, passes to an AI orchestrator, which calls an LLM that uses RAG, tools and agents, all backed by a database."
              className="max-w-[420px] block mx-auto lg:mx-0"
            >
              <defs>
                <linearGradient id="ln" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#4d7cff"></stop>
                  <stop offset="100%" stopColor="#22d3ee"></stop>
                </linearGradient>
              </defs>

              <g fill="none" stroke="url(#ln)" strokeWidth="1.6" className="flow">
                <path d="M190 44 V76"></path>
                <path d="M190 120 V152"></path>
                <path d="M190 196 V228"></path>
                <path d="M190 272 V292 H70 V312"></path>
                <path d="M190 272 V312"></path>
                <path d="M190 272 V292 H310 V312"></path>
                <path d="M190 356 V376"></path>
              </g>

              <g
                fontFamily="JetBrains Mono, monospace"
                fontSize="11"
                fill="#dbe3f5"
                textAnchor="middle"
              >
                <g>
                  <rect
                    x="130"
                    y="16"
                    width="120"
                    height="28"
                    rx="8"
                    fill="rgba(255,255,255,.06)"
                    stroke="rgba(255,255,255,.16)"
                  ></rect>
                  <text x="190" y="34">
                    User
                  </text>
                </g>
                <g>
                  <rect
                    x="122"
                    y="76"
                    width="136"
                    height="44"
                    rx="10"
                    fill="rgba(77,124,255,.16)"
                    stroke="rgba(77,124,255,.42)"
                  ></rect>
                  <text x="190" y="103">
                    Next.js
                  </text>
                </g>
                <g>
                  <rect
                    x="106"
                    y="152"
                    width="168"
                    height="44"
                    rx="10"
                    fill="rgba(139,92,246,.16)"
                    stroke="rgba(139,92,246,.42)"
                  ></rect>
                  <text x="190" y="179">
                    AI Orchestrator
                  </text>
                </g>
                <g>
                  <rect
                    x="130"
                    y="228"
                    width="120"
                    height="44"
                    rx="10"
                    fill="rgba(34,211,238,.14)"
                    stroke="rgba(34,211,238,.42)"
                  ></rect>
                  <text x="190" y="255">
                    LLM
                  </text>
                </g>
                <g>
                  <rect
                    x="20"
                    y="312"
                    width="100"
                    height="44"
                    rx="10"
                    fill="rgba(255,255,255,.05)"
                    stroke="rgba(255,255,255,.16)"
                  ></rect>
                  <text x="70" y="339">
                    RAG
                  </text>
                  <rect
                    x="140"
                    y="312"
                    width="100"
                    height="44"
                    rx="10"
                    fill="rgba(255,255,255,.05)"
                    stroke="rgba(255,255,255,.16)"
                  ></rect>
                  <text x="190" y="339">
                    Tools
                  </text>
                  <rect
                    x="260"
                    y="312"
                    width="100"
                    height="44"
                    rx="10"
                    fill="rgba(255,255,255,.05)"
                    stroke="rgba(255,255,255,.16)"
                  ></rect>
                  <text x="310" y="339">
                    Agents
                  </text>
                </g>
                <g>
                  <rect
                    x="130"
                    y="376"
                    width="120"
                    height="24"
                    rx="8"
                    fill="rgba(255,255,255,.06)"
                    stroke="rgba(255,255,255,.16)"
                  ></rect>
                  <text x="190" y="392">
                    Database
                  </text>
                </g>
              </g>
            </svg>
          </figure>
        </div>
      </div>
    </section>
  );
}
