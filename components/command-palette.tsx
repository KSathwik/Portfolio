"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { Search, X, FolderGit2, Briefcase, Award, Code2 } from "lucide-react";
import { PROJECTS_DATA, EXPERIENCE_DATA, SKILL_CATEGORIES, CERTIFICATIONS_DATA } from "@/data/portfolio-data";

/*
 * Site search in a native modal <dialog>: showModal() makes the rest of the page inert, so Tab
 * stays inside; Escape closes it; focus goes to the input on open and back to whatever had it
 * before on close. Ctrl+K (Cmd+K on a Mac) toggles it from anywhere.
 */
export function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState("");
  const dialogRef = useRef<HTMLDialogElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const returnFocusRef = useRef<HTMLElement | null>(null);

  const open = useCallback(() => {
    const dialog = dialogRef.current;
    if (!dialog || dialog.open) return;
    returnFocusRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    dialog.showModal();
    setIsOpen(true);
    inputRef.current?.focus();
  }, []);

  const close = useCallback(() => {
    dialogRef.current?.close();
  }, []);

  // Fired by close(), by Escape and by form submission: one place to reset and restore focus.
  const handleClose = () => {
    setIsOpen(false);
    setQuery("");
    const target = returnFocusRef.current;
    returnFocusRef.current = null;
    if (target && target.isConnected) target.focus();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (dialogRef.current?.open) close();
        else open();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [open, close]);

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

  // The first eight results, grouped by type in the order they arrive.
  const visibleResults = searchResults.slice(0, 8);
  const groups = visibleResults.reduce<{ type: string; items: typeof visibleResults }[]>(
    (acc, result) => {
      const group = acc.find((g) => g.type === result.type);
      if (group) group.items.push(result);
      else acc.push({ type: result.type, items: [result] });
      return acc;
    },
    []
  );

  const handleSelect = (href: string) => {
    close();
    document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="btn btn--icon btn--ghost"
        aria-label="Search (Ctrl K)"
        aria-keyshortcuts="Control+K Meta+K"
        aria-haspopup="dialog"
        aria-expanded={isOpen}
      >
        <Search size={16} aria-hidden="true" />
      </button>

      <dialog
        ref={dialogRef}
        className="dialog palette-dialog"
        aria-label="Search the portfolio"
        onClose={handleClose}
        onClick={(e) => {
          // A click on the backdrop lands on the dialog element itself.
          if (e.target === dialogRef.current) close();
        }}
      >
        <div className="flex items-center gap-2 border-b border-rule p-3">
          <div className="relative flex-1">
            <Search
              size={16}
              aria-hidden="true"
              className="pointer-events-none absolute top-1/2 left-3 -translate-y-1/2 text-ink-3"
            />
            <input
              ref={inputRef}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search projects, skills, experience or certifications"
              aria-label="Search the portfolio"
              className="input pl-9 text-sm"
            />
          </div>
          <button type="button" onClick={close} className="btn btn--icon btn--ghost" aria-label="Close search">
            <X size={16} aria-hidden="true" />
          </button>
        </div>

        <div className="max-h-[min(380px,60svh)] overflow-y-auto py-2" aria-live="polite">
          {searchResults.length === 0 ? (
            <p className="px-4 py-12 text-center text-sm text-ink-3">
              No results found for &quot;{query}&quot;
            </p>
          ) : (
            groups.map((group) => (
              <div key={group.type} className="pb-2">
                <p className="label px-4 pt-2 pb-1">{group.type}</p>
                <ul className="rows m-0 list-none p-0">
                  {group.items.map((result) => (
                    <li key={result.id}>
                      <button
                        type="button"
                        onClick={() => handleSelect(result.href)}
                        className="flex w-full cursor-pointer items-center gap-3 px-4 py-3 text-left transition-colors duration-[var(--dur-micro)] hover:bg-paper-3 focus-visible:bg-paper-3 focus-visible:outline-offset-[-2px]"
                      >
                        <result.icon size={16} aria-hidden="true" className="shrink-0 text-ink-3" />
                        <span className="flex min-w-0 flex-col">
                          <span className="font-display text-sm font-medium text-ink">{result.title}</span>
                          <span className="line-clamp-1 text-xs text-ink-3">{result.subtitle}</span>
                        </span>
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            ))
          )}
        </div>

        <div className="label flex items-center justify-between gap-4 border-t border-rule bg-paper-2 px-4 py-2.5">
          <span>Choose a result to jump to it</span>
          <span className="flex items-center gap-1.5">
            <kbd className="rounded-[4px] border border-rule-2 bg-key-face px-1.5 font-mono text-xs text-ink-2 shadow-key">
              Esc
            </kbd>
            to close
          </span>
        </div>
      </dialog>
    </>
  );
}
