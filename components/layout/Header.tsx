"use me";
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => setMenuOpen((prev) => !prev);
  const closeMenu = () => setMenuOpen(false);

  return (
    <div className="sticky top-0 z-[60] p-3.5 sm:px-4">
      <header
        className="max-w-[1240px] mx-auto border border-[var(--line)] rounded-[var(--r-lg)] bg-[rgba(9,11,20,0.72)] backdrop-blur-xl shadow-[0_18px_50px_-28px_rgba(0,0,0,0.9)] transition-all duration-300"
      >
        <div className="flex items-center justify-between gap-6 px-4 py-3">
          <Link
            href="/"
            onClick={closeMenu}
            className="mr-auto flex flex-col leading-none text-[var(--ink)] hover:opacity-90"
          >
            <span className="font-['Space_Grotesk'] font-bold text-[18px] tracking-[-0.02em]">
              TRIPTI.
            </span>
            <span className="font-['JetBrains_Mono'] text-[9.5px] tracking-[0.24em] text-[var(--faint)] uppercase mt-0.5">
              Developer
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            aria-label="Primary"
            className="nav-desktop hidden md:flex items-center gap-6"
          >
            <Link
              href="/"
              className={`text-[14px] ${
                pathname === "/" ? "text-[var(--ink)] font-medium" : "text-[var(--dim)]"
              } hover:text-[var(--ink)] transition-colors`}
            >
              Home
            </Link>
            <Link
              href="/#about"
              className="text-[14px] text-[var(--dim)] hover:text-[var(--ink)] transition-colors"
            >
              About
            </Link>
            <Link
              href="/services/react"
              className={`text-[14px] ${
                pathname.startsWith("/services") ? "text-[var(--ink)] font-medium" : "text-[var(--dim)]"
              } hover:text-[var(--ink)] transition-colors`}
            >
              Services
            </Link>
            <Link
              href="/#projects"
              className="text-[14px] text-[var(--dim)] hover:text-[var(--ink)] transition-colors"
            >
              Projects
            </Link>
            <Link
              href="/#insights"
              className="text-[14px] text-[var(--dim)] hover:text-[var(--ink)] transition-colors"
            >
              Insights
            </Link>
            <Link
              href="/#contact"
              className="text-[14px] text-[var(--dim)] hover:text-[var(--ink)] transition-colors"
            >
              Contact
            </Link>
            <Link
              href="/hire-me"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full font-['Space_Grotesk'] font-semibold text-[13.5px] text-white bg-gradient-to-r from-[#4d7cff] to-[#7c5cff] shadow-[0_10px_26px_-12px_rgba(77,124,255,0.85)] hover:shadow-[0_14px_34px_-12px_rgba(124,92,255,0.95)] hover:-translate-y-0.5 transition-all"
            >
              Hire Me ↗
            </Link>
          </nav>

          {/* Mobile Burger Button */}
          <button
            type="button"
            className="nav-burger md:hidden flex items-center gap-2.5 px-3.5 py-2 min-h-[44px] border border-[var(--line2)] rounded-full bg-[var(--glass)] text-[var(--ink)] font-['Space_Grotesk'] text-[13px] cursor-pointer hover:bg-[var(--glass2)]"
            aria-label="Toggle navigation menu"
            aria-expanded={menuOpen}
            onClick={toggleMenu}
          >
            Menu
            <span
              aria-hidden="true"
              className="block w-3.5 h-2 border-t-[1.5px] border-b-[1.5px] border-current"
            ></span>
          </button>
        </div>

        {/* Mobile Drawer */}
        {menuOpen && (
          <nav
            aria-label="Mobile"
            className="nav-drawer md:hidden border-t border-[var(--line)] px-4 pt-2.5 pb-4.5 grid gap-1 animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <Link
              href="/"
              onClick={closeMenu}
              className="py-3.5 min-h-[48px] font-['Space_Grotesk'] font-semibold text-[20px] text-[var(--ink)] border-b border-[var(--line)] flex items-center"
            >
              Home
            </Link>
            <Link
              href="/services/react"
              onClick={closeMenu}
              className="py-3.5 min-h-[48px] font-['Space_Grotesk'] font-semibold text-[20px] text-[var(--ink)] border-b border-[var(--line)] flex items-center"
            >
              React Development
            </Link>
            <Link
              href="/hire-me"
              onClick={closeMenu}
              className="py-3.5 min-h-[48px] font-['Space_Grotesk'] font-semibold text-[20px] text-[#a9c0ff] border-b border-[var(--line)] flex items-center"
            >
              Hire Me ↗
            </Link>
            <span className="pt-3 text-[12px] text-[var(--faint)]">
              Full-Stack & AI Engineering Portfolio
            </span>
          </nav>
        )}
      </header>
    </div>
  );
}
