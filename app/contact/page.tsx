import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { breadcrumbList, graph, pageMetadata, person } from "@/lib/seo";
import { JsonLd } from "@/components/seo/JsonLd";
import { Breadcrumbs } from "@/components/ui/Breadcrumbs";
import { Eyebrow } from "@/components/ui/Section";

export const metadata: Metadata = pageMetadata({
  title: "Contact Tripti Shakya – Full Stack & AI Developer",
  description:
    "Contact Tripti Shakya, Full Stack & AI Developer in Bangalore, by email, LinkedIn or GitHub. For project enquiries, use the Hire Me form for a faster reply.",
  path: "/contact",
});

/** "https://www.linkedin.com/in/x/" -> "linkedin.com/in/x" */
const displayUrl = (url: string) =>
  url.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "");

const channels = [
  { label: "Email", value: siteConfig.email, href: `mailto:${siteConfig.email}` },
  { label: "LinkedIn", value: displayUrl(siteConfig.social.linkedin), href: siteConfig.social.linkedin },
  { label: "GitHub", value: displayUrl(siteConfig.social.github), href: siteConfig.social.github },
];

export default function ContactPage() {
  const trail = [
    { name: "Home", path: "/" },
    { name: "Contact", path: "/contact" },
  ];
  return (
    <div className="mx-auto max-w-[1240px] px-4 pb-24 pt-10 sm:px-6 sm:pt-14">
      <JsonLd data={graph(person, breadcrumbList(trail))} />
      <Breadcrumbs trail={trail} />
      <div className="mt-8 max-w-[720px]">
        <Eyebrow>Contact</Eyebrow>
        <h1 className="text-[34px] leading-[1.06] sm:text-[52px]">Get in touch</h1>
        <p className="mt-5 text-[16px] leading-[1.65] text-[#cfd7ea] sm:text-[18px]">
          For a project, the <Link href="/hire-me">Hire Me form</Link> asks the questions I
          need to reply with something useful. For anything else, use one of these.
        </p>
      </div>
      <ul className="mt-10 grid gap-3 sm:grid-cols-3">
        {channels.map((c) => (
          <li key={c.label}>
            <a
              href={c.href}
              className="block rounded-[var(--r-lg)] border border-[var(--line)] bg-[var(--glass)] p-5 transition-colors hover:border-[rgba(77,124,255,0.5)]"
              {...(c.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            >
              <span className="block font-[family-name:var(--m)] text-[10.5px] uppercase tracking-[0.2em] text-[var(--faint)]">
                {c.label}
              </span>
              <span className="mt-2 block break-all text-[15px] text-[var(--ink)]">{c.value}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
