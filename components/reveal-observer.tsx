"use client";

import { useEffect } from "react";

/*
 * Scroll reveals that work in every browser: each `.reveal` gets `.is-in` the first time it
 * scrolls into view, and CSS does the rest (fade, rise, staggered children, drawn lines).
 * Without script, or with reduced motion, everything is simply visible.
 */
export function RevealObserver() {
  useEffect(() => {
    const root = document.documentElement;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches || !("IntersectionObserver" in window)) {
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-in");
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
    );

    const watch = () =>
      document.querySelectorAll(".reveal:not(.is-in)").forEach((el) => io.observe(el));

    // Hide-until-seen only starts once the observer is ready, so nothing gets stuck hidden.
    root.classList.add("motion-ready");
    watch();

    // Sections can render new reveal targets later (the gallery, a dialog); pick those up too.
    let pending = 0;
    const mo = new MutationObserver(() => {
      if (pending) return;
      pending = requestAnimationFrame(() => {
        pending = 0;
        watch();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      cancelAnimationFrame(pending);
      io.disconnect();
      mo.disconnect();
      root.classList.remove("motion-ready");
    };
  }, []);

  return null;
}
