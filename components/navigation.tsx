"use client";

import { useState, useEffect, useLayoutEffect, useRef, useSyncExternalStore } from "react";
import { flushSync } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Moon, Sun } from "lucide-react";
import { ResumeDownload, ResumeView } from "@/components/resume-viewer";
import { useTheme } from "next-themes";
import { CommandPalette } from "@/components/command-palette";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import { EASE_IN_OUT_CSS, THEME_WIPE_MS, UI_EXIT, UI_TRANSITION } from "@/lib/motion";

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

/* Sections that light up a nav link while you're reading them. Sections without a link of
 * their own (Skills, Education, Off the clock) light up nothing rather than the wrong link. */
const SECTION_TO_LINK: Record<string, string> = {
  about: "#about",
  projects: "#projects",
  experience: "#experience",
  skills: "",
  "ai-lab": "#ai-lab",
  education: "",
  "off-the-clock": "",
  contact: "#contact",
};

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [active, setActive] = useState("#about");
  const [indicator, setIndicator] = useState<{ left: number; width: number; on: boolean } | null>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const { resolvedTheme, setTheme } = useTheme();
  const mounted = useIsClient();

  /*
   * One scroll handler does it all: solid background once scrolled, tuck the bar away while
   * reading down (back on any scroll up), and light up the section crossing a line 35% down
   * the screen. At the very bottom, the last section (Contact) wins.
   */
  useEffect(() => {
    const ids = Object.keys(SECTION_TO_LINK);
    let lastY = window.scrollY;
    let frame = 0;
    const update = () => {
      frame = 0;
      const y = window.scrollY;
      setIsScrolled(y > 40);
      if (Math.abs(y - lastY) > 6) {
        setIsHidden(y > lastY && y > 320);
        lastY = y;
      }

      const line = window.innerHeight * 0.35;
      const atBottom = window.innerHeight + y >= document.documentElement.scrollHeight - 4;
      // The section whose top has most recently passed the reading line.
      let current = "about";
      let best = -Infinity;
      for (const id of ids) {
        const top = document.getElementById(id)?.getBoundingClientRect().top;
        if (top !== undefined && top <= line && top > best) {
          best = top;
          current = id;
        }
      }
      setActive(atBottom ? "#contact" : SECTION_TO_LINK[current]);
    };
    // At most once per frame, however fast the scroll events come.
    const handleScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  /* Escape closes the phone menu. */
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [isMobileMenuOpen]);

  /* Slide the pill under the active link. */
  useLayoutEffect(() => {
    const measure = () => {
      const link = linksRef.current?.querySelector<HTMLAnchorElement>(`a[href="${active}"]`);
      // With no link to mark, the pill fades out where it was instead of vanishing.
      setIndicator((prev) =>
        link ? { left: link.offsetLeft, width: link.offsetWidth, on: true } : prev ? { ...prev, on: false } : null
      );
    };
    measure();
    // Web fonts can swap in after first paint and change link widths; measure again then.
    document.fonts?.ready.then(measure).catch(() => {});
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, [active]);

  const isDark = resolvedTheme === "dark";
  const themeLabel = isDark ? "Switch to light theme" : "Switch to dark theme";

  /* The new theme spreads out from the toggle as a circle (View Transitions), where supported. */
  const toggleTheme = (e: React.MouseEvent<HTMLButtonElement>) => {
    const next = isDark ? "light" : "dark";
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduce) {
      setTheme(next);
      return;
    }
    // From the pointer, or from the button's centre when toggled with the keyboard.
    let { clientX: x, clientY: y } = e;
    if (e.detail === 0) {
      const b = e.currentTarget.getBoundingClientRect();
      x = b.left + b.width / 2;
      y = b.top + b.height / 2;
    }
    const r = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const transition = document.startViewTransition(() => {
      flushSync(() => setTheme(next));
      document.documentElement.classList.toggle("dark", next === "dark");
    });
    transition.ready
      .then(() => {
        document.documentElement.animate(
          { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${r}px at ${x}px ${y}px)`] },
          { duration: THEME_WIPE_MS, easing: EASE_IN_OUT_CSS, pseudoElement: "::view-transition-new(root)" }
        );
      })
      // A second click mid-animation skips the first transition; the theme still changes.
      .catch(() => {});
  };

  return (
    <header
      className={`sticky top-0 z-[var(--z-sticky-nav)] border-b transition-[border-color,background-color,transform] duration-[var(--dur-short)] ease-[var(--ease-out)] ${
        isScrolled ? "border-rule bg-paper/90 backdrop-blur-md" : "border-transparent bg-transparent"
      } ${isHidden && !isMobileMenuOpen ? "-translate-y-full focus-within:translate-y-0" : "translate-y-0"}`}
    >
      <nav aria-label="Main Navigation" className="wrap flex h-16 items-center justify-between gap-3 sm:gap-6">
        <a
          href="#about"
          className="group flex items-center gap-2.5 text-ink no-underline"
          aria-label="Sathwik Katkam, back to top"
        >
          <span
            aria-hidden="true"
            className="grid h-9 w-9 place-items-center rounded-full border border-rule-2 bg-transparent font-display text-[15px] font-medium text-ink transition-colors duration-[var(--dur-short)] group-hover:border-ink-3"
          >
            SK
          </span>
          <span className="whitespace-nowrap font-display text-lg font-medium tracking-[var(--tracking-display)] max-[25rem]:hidden">
            {PERSONAL_INFO.name}
          </span>
        </a>

        {/* Desktop Nav Items */}
        <div ref={linksRef} className="relative hidden items-center gap-1 lg:flex">
          {/* The pill that slides to whichever section you're reading */}
          {indicator && (
            <span
              aria-hidden="true"
              className="nav-pill"
              style={{ transform: `translateX(${indicator.left}px)`, width: indicator.width, opacity: indicator.on ? 1 : 0 }}
            />
          )}
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              aria-current={active === item.href ? "location" : undefined}
              className="relative z-[1] whitespace-nowrap rounded-full px-3 py-2.5 text-sm font-medium text-ink-2 no-underline transition-colors duration-[var(--dur-short)] hover:text-ink aria-[current=location]:text-ink"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* One set of controls at every width: search (and its Ctrl+K shortcut), theme, then résumé on desktop or the menu below it. */}
        <div className="flex items-center gap-2">
          <CommandPalette />

          {mounted ? (
            <button
              type="button"
              onClick={toggleTheme}
              className="key key--icon"
              aria-label={themeLabel}
            >
              {isDark ? <Sun size={16} aria-hidden="true" /> : <Moon size={16} aria-hidden="true" />}
            </button>
          ) : (
            <span className="key key--icon invisible" aria-hidden="true" />
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
            <span className="menu-icon" aria-hidden="true">
              <Menu size={18} className={isMobileMenuOpen ? "is-off" : undefined} />
              <X size={18} className={isMobileMenuOpen ? undefined : "is-off"} />
            </span>
          </button>
        </div>
      </nav>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0, transition: UI_TRANSITION }}
            exit={{ opacity: 0, y: -8, transition: UI_EXIT }}
            className="absolute inset-x-0 top-full border-b border-rule bg-paper lg:hidden"
          >
            <div className="wrap rows py-2">
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-current={active === item.href ? "location" : undefined}
                  className="flex items-center justify-between py-3 font-display text-lg text-ink no-underline aria-[current=location]:text-signal"
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
