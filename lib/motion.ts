/*
 * The site's motion values for script-driven animation (framer-motion, the theme wipe).
 * They mirror the CSS tokens in app/tokens.css, so CSS and JS move the same way.
 */
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;
export const EASE_IN = [0.7, 0, 0.84, 0] as const;
export const EASE_IN_OUT_CSS = "cubic-bezier(0.65, 0, 0.35, 1)";

/** Seconds, for framer-motion. */
export const DUR = { micro: 0.15, short: 0.22, ui: 0.32, enter: 0.64 } as const;

/** Enter with the ease-out curve, exit faster with ease-in. */
export const UI_TRANSITION = { duration: DUR.ui, ease: EASE_OUT } as const;
export const UI_EXIT = { duration: DUR.short, ease: EASE_IN } as const;

/** How long the theme circle takes to spread, in ms. */
export const THEME_WIPE_MS = 560;

/** Smooth scrolling, unless the visitor asked for less motion. */
export function scrollBehavior(): ScrollBehavior {
  if (typeof window === "undefined") return "auto";
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth";
}

/** Open a photo from "Through my lens" in the large viewer, from anywhere on the page. */
export const OPEN_PHOTO_EVENT = "portfolio:open-photo";
export function openPhoto(index: number) {
  window.dispatchEvent(new CustomEvent<number>(OPEN_PHOTO_EVENT, { detail: index }));
}
