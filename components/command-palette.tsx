"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, X, FolderGit2, Briefcase, Award, Code2, ArrowRight } from "lucide-react";
import { PROJECTS_DATA, EXPERIENCE_DATA, SKILL_CATEGORIES, CERTIFICATIONS_DATA } from "@/data/portfolio-data";

export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const searchResults = [
    ...PROJECTS_DATA.filter(
      (p) =>
        p.title.toLowerCase().includes(query.toLowerCase()) ||
        p.technologies.some((t) => t.toLowerCase().includes(query.toLowerCase())) ||
        p.description.toLowerCase().includes(query.toLowerCase())
    ).map((p) => ({
      id: p.id,
      title: p.title,
      type: "Project",
      subtitle: p.technologies.slice(0, 4).join(", "),
      icon: FolderGit2,
      href: `#projects`,
    })),
    ...EXPERIENCE_DATA.flatMap((e) =>
      e.projects
        .filter(
          (proj) =>
            proj.name.toLowerCase().includes(query.toLowerCase()) ||
            proj.technologies.some((t) => t.toLowerCase().includes(query.toLowerCase()))
        )
        .map((proj) => ({
          id: `${e.id}-${proj.name}`,
          title: `${proj.name} (${e.company})`,
          type: "Experience",
          subtitle: proj.description.slice(0, 60) + "...",
          icon: Briefcase,
          href: `#experience`,
        }))
    ),
    ...SKILL_CATEGORIES.filter(
      (s) =>
        s.title.toLowerCase().includes(query.toLowerCase()) ||
        s.skills.some((sk) => sk.toLowerCase().includes(query.toLowerCase()))
    ).map((s) => ({
      id: s.title,
      title: s.title,
      type: "Skill Category",
      subtitle: s.skills.join(", "),
      icon: Code2,
      href: `#skills`,
    })),
    ...CERTIFICATIONS_DATA.filter((c) =>
      c.title.toLowerCase().includes(query.toLowerCase())
    ).map((c) => ({
      id: c.title,
      title: c.title,
      type: "Certification",
      subtitle: c.issuer,
      icon: Award,
      href: `#certifications`,
    })),
  ];

  const handleSelect = (href: string) => {
    setIsOpen(false);
    setQuery("");
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Shortcut Button Hint in Navbar or floating */}
      <button
        onClick={() => setIsOpen(true)}
        className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary/80 border border-border text-xs text-muted-foreground hover:text-foreground transition-all cursor-pointer"
        aria-label="Open Command Search"
      >
        <Search size={13} />
        <span>Search portfolio...</span>
        <kbd className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-muted border border-border">
          Ctrl+K
        </kbd>
      </button>

      <AnimatePresence>
        {isOpen && (
          <div className="fixed inset-0 z-[300] flex items-start justify-center pt-20 px-4 bg-background/80 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -10 }}
              transition={{ duration: 0.2 }}
              className="w-full max-w-2xl bg-card border border-border rounded-2xl shadow-2xl overflow-hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Command Search Palette"
            >
              <div className="flex items-center px-4 border-b border-border">
                <Search size={18} className="text-muted-foreground mr-3" />
                <input
                  type="text"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Type to search projects, skills, experience, or certifications..."
                  className="w-full py-4 text-sm bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground"
                  autoFocus
                />
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1 rounded-md text-muted-foreground hover:text-foreground"
                  aria-label="Close modal"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="max-h-[380px] overflow-y-auto p-2">
                {searchResults.length === 0 ? (
                  <div className="py-12 text-center text-sm text-muted-foreground">
                    No results found for &quot;{query}&quot;
                  </div>
                ) : (
                  searchResults.slice(0, 8).map((result) => (
                    <button
                      key={result.id}
                      onClick={() => handleSelect(result.href)}
                      className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-secondary/70 transition-colors text-left group"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg bg-accent/50 border border-border/50 flex items-center justify-center shrink-0">
                          <result.icon size={15} className="text-muted-foreground group-hover:text-foreground" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-foreground flex items-center gap-2">
                            {result.title}
                            <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-secondary text-muted-foreground">
                              {result.type}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground line-clamp-1">
                            {result.subtitle}
                          </div>
                        </div>
                      </div>
                      <ArrowRight size={14} className="text-muted-foreground group-hover:text-foreground opacity-0 group-hover:opacity-100 transition-all transform -translate-x-1 group-hover:translate-x-0" />
                    </button>
                  ))
                )}
              </div>

              <div className="px-4 py-2.5 bg-secondary/30 border-t border-border flex items-center justify-between font-mono text-[11px] text-muted-foreground">
                <span>Navigate with click or enter</span>
                <span>ESC to close</span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
