export function Testimonials() {
  const tSlots = [
    { label: "Testimonial slot — awaiting a real client quote" },
    { label: "Testimonial slot — awaiting a real client quote" },
    { label: "Testimonial slot — awaiting a real client quote" },
  ];

  return (
    <section
      id="testimonials"
      className="rv max-w-[1240px] mx-auto px-4 sm:px-6 pt-16 sm:pt-24 lg:pt-28"
    >
      <p className="font-['JetBrains_Mono'] text-[10.5px] tracking-[0.22em] uppercase text-[var(--blue)] mb-4.5">
        06 — Client stories
      </p>

      <h2 className="font-['Space_Grotesk'] text-[30px] sm:text-[42px] lg:text-[52px] leading-[1.08] mb-6 text-[var(--ink)]">
        Testimonials.
      </h2>

      <p className="max-w-[66ch] text-[13.5px] leading-[1.65] text-[#cfd7ea] border border-[rgba(139,92,246,0.3)] rounded-[var(--r)] bg-[rgba(139,92,246,0.08)] p-3.5 sm:p-4 mb-7">
        [PLACEHOLDER] No testimonials were supplied, so none are shown. Nothing is fabricated and no Review or AggregateRating schema is emitted until real, permissioned quotes exist.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {tSlots.map((s, idx) => (
          <div
            key={idx}
            className="border border-dashed border-[var(--line2)] rounded-[var(--r-lg)] bg-[rgba(255,255,255,0.02)] p-6 min-h-[190px] flex flex-col gap-3"
          >
            <span className="font-['Space_Grotesk'] text-[34px] text-[var(--faint)] leading-none">
              “
            </span>
            <p className="font-['Space_Grotesk'] font-semibold text-[16px] text-[#cfd7ea]">
              {s.label}
            </p>
            <p className="text-[12.5px] leading-[1.6] text-[var(--faint)] mt-auto">
              Fields: quote, client name, role, company, linked case study, permission-to-publish flag.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
