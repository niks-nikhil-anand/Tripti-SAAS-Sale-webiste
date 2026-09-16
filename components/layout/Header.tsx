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
        className="max-w-[1240px] mx-auto border border-white/15 rounded-2xl bg-[rgba(13,17,28,0.55)] backdrop-blur-2xl backdrop-saturate-150 shadow-[inset_0_1px_1px_0_rgba(255,255,255,0.18),0_20px_50px_-20px_rgba(0,0,0,0.8)] transition-all duration-300"
      >
        <div className="flex items-center justify-between gap-6 px-5 py-3">
          <Link
            href="/"
            onClick={closeMenu}
            className="mr-auto flex flex-col leading-none text-[var(--ink)] hover:opacity-90 transition-opacity"
          >
            <span className="font-['Space_Grotesk'] font-bold text-[18px] tracking-[-0.02em] bg-gradient-to-r from-white via-[#e9edf8] to-[#9aa4bb] bg-clip-text text-transparent">
              TRIPTI.
            </span>
            <span className="font-['JetBrains_Mono'] text-[9.5px] tracking-[0.24em] text-[#8e9bb4] uppercase mt-0.5">
              Developer
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav
            aria-label="Primary"
            className="nav-desktop hidden md:flex items-center gap-1.5 bg-white/[0.03] border border-white/[0.08] p-1.5 rounded-full backdrop-blur-md shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]"
          >
            <Link
              href="/"
              className={`px-4 py-1.5 rounded-full text-[13.5px] transition-all duration-200 ${
                pathname === "/"
                  ? "bg-white/10 text-white font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] border border-white/15"
                  : "text-[var(--dim)] hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              Home
            </Link>
            <Link
              href="/#about"
              className="px-4 py-1.5 rounded-full text-[13.5px] text-[var(--dim)] hover:text-white hover:bg-white/[0.06] transition-all duration-200"
            >
              About
            </Link>
            <Link
              href="/services/react"
              className={`px-4 py-1.5 rounded-full text-[13.5px] transition-all duration-200 ${
                pathname.startsWith("/services")
                  ? "bg-white/10 text-white font-medium shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] border border-white/15"
                  : "text-[var(--dim)] hover:text-white hover:bg-white/[0.06]"
              }`}
            >
              Services
            </Link>
            <Link
              href="/#projects"
              className="px-4 py-1.5 rounded-full text-[13.5px] text-[var(--dim)] hover:text-white hover:bg-white/[0.06] transition-all duration-200"
            >
              Projects
            </Link>
            <Link
              href="/#insights"
              className="px-4 py-1.5 rounded-full text-[13.5px] text-[var(--dim)] hover:text-white hover:bg-white/[0.06] transition-all duration-200"
            >
              Insights
            </Link>
            <Link
              href="/#contact"
              className="px-4 py-1.5 rounded-full text-[13.5px] text-[var(--dim)] hover:text-white hover:bg-white/[0.06] transition-all duration-200"
            >
              Contact
            </Link>
          </nav>

          <Link
            href="/hire-me"
            className="hidden md:inline-flex items-center gap-1.5 px-5 py-2.5 rounded-full font-['Space_Grotesk'] font-semibold text-[13.5px] text-white bg-gradient-to-r from-[#4d7cff] to-[#7c5cff] border border-white/20 shadow-[0_10px_26px_-10px_rgba(77,124,255,0.7)] hover:shadow-[0_14px_34px_-10px_rgba(124,92,255,0.9)] hover:scale-105 active:scale-95 transition-all"
          >
            Hire Me ↗
          </Link>

          {/* Mobile Burger Button */}
          <button
            type="button"
            className="nav-burger md:hidden flex items-center gap-2.5 px-4 py-2 min-h-[42px] border border-white/15 rounded-full bg-white/[0.06] text-white font-['Space_Grotesk'] text-[13px] cursor-pointer hover:bg-white/10 backdrop-blur-md transition-all"
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
            className="nav-drawer md:hidden border-t border-white/10 px-5 pt-3 pb-5 grid gap-1.5 animate-in fade-in slide-in-from-top-2 duration-200 bg-white/[0.02] backdrop-blur-xl"
          >
            <Link
              href="/"
              onClick={closeMenu}
              className="py-3 px-3 rounded-xl font-['Space_Grotesk'] font-semibold text-[18px] text-[var(--ink)] hover:bg-white/[0.06] flex items-center transition-all"
            >
              Home
            </Link>
            <Link
              href="/services/react"
              onClick={closeMenu}
              className="py-3 px-3 rounded-xl font-['Space_Grotesk'] font-semibold text-[18px] text-[var(--ink)] hover:bg-white/[0.06] flex items-center transition-all"
            >
              React Development
            </Link>
            <Link
              href="/hire-me"
              onClick={closeMenu}
              className="py-3 px-3 rounded-xl font-['Space_Grotesk'] font-semibold text-[18px] text-[#a9c0ff] hover:bg-white/[0.06] flex items-center transition-all"
            >
              Hire Me ↗
            </Link>
            <span className="pt-3 px-3 text-[12px] text-[var(--faint)]">
              Full-Stack & AI Engineering Portfolio
            </span>
          </nav>
        )}
      </header>
    </div>
  );
}

