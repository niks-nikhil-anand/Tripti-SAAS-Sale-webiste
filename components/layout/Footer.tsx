import Link from "next/link";
import { footerNav, siteConfig } from "@/lib/site";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Icons";

const socials = [
  { label: "X", href: siteConfig.social.x, path: "M3 3h4.2l4.4 6.1L16.6 3H21l-6.9 8.9L21.4 21H17l-4.7-6.5L6.9 21H3l7.2-9.3L3 3Z" },
  {
    label: "LinkedIn",
    href: siteConfig.social.linkedin,
    path: "M4.5 3.5A2 2 0 1 1 4.5 7.5a2 2 0 0 1 0-4ZM3 9h3v12H3V9Zm6 0h2.9v1.6A3.4 3.4 0 0 1 15 8.7c3 0 3.6 2 3.6 4.5V21h-3v-6.6c0-1.6 0-3.6-2.2-3.6s-2.5 1.7-2.5 3.5V21H9V9Z",
  },
  {
    label: "GitHub",
    href: siteConfig.social.github,
    path: "M12 2a10 10 0 0 0-3.2 19.5c.5.1.7-.2.7-.5v-1.8c-2.8.6-3.4-1.3-3.4-1.3-.4-1.2-1.1-1.5-1.1-1.5-.9-.6.1-.6.1-.6 1 .1 1.5 1 1.5 1 .9 1.5 2.4 1.1 3 .8 0-.7.4-1.1.7-1.4-2.2-.2-4.6-1.1-4.6-5 0-1.1.4-2 1-2.7-.1-.3-.4-1.3.1-2.7 0 0 .8-.3 2.7 1a9.4 9.4 0 0 1 5 0c1.9-1.3 2.7-1 2.7-1 .5 1.4.2 2.4.1 2.7.6.7 1 1.6 1 2.7 0 3.9-2.4 4.8-4.6 5 .4.3.7 1 .7 2v2.9c0 .3.2.6.7.5A10 10 0 0 0 12 2Z",
  },
];

export function Footer() {
  return (
    <footer className="border-t border-border bg-bg-subtle">
      <Container className="py-14">
        <div className="grid gap-10 md:grid-cols-[1.3fr_repeat(4,1fr)]">
          <div className="flex flex-col gap-4">
            <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
              <Logo className="size-8" />
              <span>{siteConfig.name}</span>
            </Link>
            <p className="max-w-xs text-sm leading-6 text-fg-muted">
              {siteConfig.shortDescription}
            </p>
            <ul className="flex items-center gap-2">
              {socials.map((s) => (
                <li key={s.label}>
                  <a
                    href={s.href}
                    rel="noopener noreferrer me"
                    target="_blank"
                    aria-label={`${siteConfig.name} on ${s.label}`}
                    className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-surface text-fg-muted transition-colors hover:text-fg"
                  >
                    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className="size-4">
                      <path d={s.path} />
                    </svg>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {footerNav.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h3 className="text-sm font-semibold">{group.title}</h3>
              <ul className="mt-4 flex flex-col gap-2.5">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-fg-muted transition-colors hover:text-fg"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-border pt-6 text-sm text-fg-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.legalName}. All rights reserved.
          </p>
          <p className="flex items-center gap-2">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-emerald-500"
            />
            All systems operational
          </p>
        </div>
      </Container>
    </footer>
  );
}
