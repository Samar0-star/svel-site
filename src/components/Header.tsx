"use client";

import React from "react";
import { ThemeToggle } from "./ThemeToggle";

interface HeaderProps {
  onOpenDemo?: () => void;
  onOpenContact?: () => void;
}

export function Header({ onOpenContact }: HeaderProps) {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleContactClick = () => {
    if (onOpenContact) {
      onOpenContact();
    } else {
      scrollTo("contact");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-[#FAFAF8]/85 dark:bg-[#0B0C0E]/85 border-b border-hairline dark:border-white/10 transition-colors">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: Minimalist ULTRON Wordmark + Crisp Red-and-Blue Twin-Dot Emblem */}
        <a
          href="#"
          onClick={(e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: "smooth" });
          }}
          className="flex items-center gap-2 group focus:outline-none"
          aria-label="ULTRON Home"
        >
          <span className="font-sans font-medium text-[16px] tracking-tight text-ink-primary dark:text-white">
            ULTRON
          </span>
          <span className="inline-flex items-center gap-1" aria-hidden="true">
            <span className="w-1.5 h-1.5 rounded-full bg-[#2563EB] transition-transform group-hover:scale-110" />
            <span className="w-1.5 h-1.5 rounded-full bg-[#E11D48] transition-transform group-hover:scale-110" />
          </span>
        </a>

        {/* Right: Exactly 2 links + Theme Toggle + Crisp Pill CTA */}
        <nav className="flex items-center gap-6 sm:gap-7 text-[14px]" aria-label="Main navigation">
          <a
            href="#how-it-works"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("how-it-works");
            }}
            className="text-ink-muted dark:text-white/60 hover:text-ink-primary dark:hover:text-white transition-colors duration-200"
          >
            How It Works
          </a>
          <a
            href="#why-now"
            onClick={(e) => {
              e.preventDefault();
              scrollTo("why-now");
            }}
            className="text-ink-muted dark:text-white/60 hover:text-ink-primary dark:hover:text-white transition-colors duration-200"
          >
            Why Now
          </a>

          {/* Dark Mode Switcher */}
          <ThemeToggle />

          <button
            onClick={handleContactClick}
            className="px-4 py-1.5 rounded-full bg-ink-primary dark:bg-white text-[#FAFAF8] dark:text-[#111215] text-[13px] font-medium tracking-tight hover:bg-black dark:hover:bg-white/90 transition-all shadow-sm"
          >
            Talk to Us
          </button>
        </nav>
      </div>
    </header>
  );
}
