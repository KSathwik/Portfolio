"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUp } from "lucide-react";

const R = 22;
const C = 2 * Math.PI * R;

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let frame = 0;
    const handleScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        setIsVisible(window.scrollY > 400);
        setProgress(max > 0 ? Math.min(1, window.scrollY / max) : 0);
      });
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          initial={{ opacity: 0, y: 12, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 12, scale: 0.9 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          onClick={scrollToTop}
          className="btn btn--icon fixed bottom-4 left-4 z-[var(--z-sticky)] sm:bottom-6 sm:left-6"
          aria-label="Back to top"
        >
          {/* Reading progress, filling clockwise */}
          <svg className="top-ring" viewBox="0 0 48 48" aria-hidden="true">
            <circle className="track" cx="24" cy="24" r={R} />
            <circle className="fill" cx="24" cy="24" r={R} strokeDasharray={C} strokeDashoffset={C * (1 - progress)} />
          </svg>
          <ArrowUp size={16} aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
