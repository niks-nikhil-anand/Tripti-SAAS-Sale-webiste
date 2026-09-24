import { Eyebrow, H2, Section } from "@/components/ui/Section";

/** The five steps from first message to development, as promised on /hire-me. */
export const engagementSteps = [
  {
    title: "Requirement review",
    text: "I read your brief and come back with the questions that change scope, cost or architecture.",
  },
  {
    title: "Technical discussion",
    text: "A call to walk through users, data, integrations and constraints, and to agree what success looks like.",
  },
  {
    title: "Scope and architecture",
    text: "A written plan: features in and out, the system design, the stack and the risks worth resolving early.",
  },
  {
    title: "Proposal",
    text: "Milestones, timeline and pricing based on that scope, so there are no surprises later.",
  },
  {
    title: "Development",
    text: "Iterative delivery with working previews, regular check-ins and a production deploy you own.",
  },
];

export function EngagementSteps() {
  return (
    <Section labelledBy="steps-h">
      <Eyebrow>How we start</Eyebrow>
      <H2 id="steps-h">From first message to first deploy</H2>
      <ol className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {engagementSteps.map((s, i) => (
          <li
            key={s.title}
            className="rounded-[var(--r)] border border-[var(--line)] bg-[var(--glass)] p-5"
          >
            <span className="font-[family-name:var(--m)] text-[11px] text-[var(--blue)]">
              {String(i + 1).padStart(2, "0")}
            </span>
            <h3 className="mt-2 text-[15.5px] font-semibold tracking-normal">{s.title}</h3>
            <p className="mt-2 text-[13px] leading-[1.6] text-[var(--dim)]">{s.text}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
