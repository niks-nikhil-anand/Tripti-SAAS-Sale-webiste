import { marqueeItems } from "@/lib/site";

export function Marquee() {
  const doubleItems = [...marqueeItems, ...marqueeItems];

  return (
    <section
      aria-label="Technology stack"
      className="border-t border-b border-[var(--line)] bg-[rgba(255,255,255,0.015)] overflow-hidden py-5 [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)]"
    >
      <div className="marq-track flex w-max gap-0">
        {doubleItems.map((item, index) => (
          <span
            key={`${item}-${index}`}
            className="inline-flex items-center gap-3 px-6.5 font-[family-name:var(--h)] font-medium text-[15px] text-[#8b95ad] whitespace-nowrap"
          >
            <span
              aria-hidden="true"
              className="w-1.25 h-1.25 rounded-full bg-[var(--blue)]"
            ></span>
            {item}
          </span>
        ))}
      </div>
    </section>
  );
}
