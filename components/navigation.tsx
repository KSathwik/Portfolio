"use client";

import { useState, useEffect, useSyncExternalStore } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { ResumeDownload, ResumeView } from "@/components/resume-viewer";
import { useTheme } from "next-themes";
import { CommandPalette } from "@/components/command-palette";
import { PERSONAL_INFO } from "@/data/portfolio-data";

const emptySubscribe = () => () => {};
function useIsClient() {
  return useSyncExternalStore(
    emptySubscribe,
    () => true,
    () => false
  );
}

const navItems = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Lab", href: "#ai-lab" },
  { label: "Contact", href: "#contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useIsClient();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isDark = resolvedTheme === "dark";
  const themeLabel = isDark ? "Switch to light theme" : "Switch to dark theme";
  const toggleTheme = () => setTheme(isDark ? "light" : "dark");

  return (
    <header
      className={`sticky top-0 z-[var(--z-sticky-nav)] border-b transition-[border-color,background-color] duration-[var(--dur-short)] ${
        isScrolled ? "border-rule bg-paper/90 backdrop-blur-md" : "border-transparent bg-transparent"
      }`}
    >
      <nav aria-label="Main Navigation" className="wrap flex h-16 items-center justify-between gap-6">
        <a
          href="#about"
          className="group flex items-center gap-2.5 text-ink no-underline"
          aria-label="Sathwik Katkam, back to top"
        >
          <span
            aria-hidden="true"
            className="grid h-9 w-9 place-items-center rounded-full border border-rule-2 bg-transparent font-display text-[15px] font-medium text-ink transition-colors duration-[var(--dur-short)] group-hover:border-ink-3"
          >
            sk
          </span>
          <span className="whitespace-nowrap font-display text-lg font-medium tracking-[var(--tracking-display)] max-[22.5rem]:hidden">
            {PERSONAL_INFO.name}
          </span>
        </a>

        {/* Desktop Nav Items */}
        <div className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="whitespace-nowrap rounded-full px-3 py-2.5 text-sm font-medium text-ink-2 no-underline transition-colors duration-[var(--dur-micro)] hover:bg-paper-3 hover:text-ink"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* One set of controls at every width: search (and its Ctrl+K shortcut), theme, then résumé on desktop or the menu below it. */}
        <div className="flex items-center gap-2">
          <CommandPalette />

          {mounted && (
            <button
              type="button"
              onClick={toggleTheme}
              className="key key--icon"
              aria-label={themeLabel}
            >
              {isDark ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
            </button>
          )}

          <span className="hidden lg:contents">
            <ResumeView className="btn btn--sm" label="Resume" />
          </span>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="key key--icon lg:hidden"
            aria-label={isMobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={18} aria-hidden="true" /> : <Menu size={18} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="absolute inset-x-0 top-full border-b border-rule bg-paper lg:hidden"
          >
            <div className="wrap rows py-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block py-3 font-display text-lg text-ink no-underline"
                >
                  {item.label}
                </a>
              ))}
              <div className="py-4">
                <ResumeDownload className="btn btn--primary w-full" />
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
