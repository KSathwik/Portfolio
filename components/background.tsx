"use client";

import { motion } from "framer-motion";

export function Background() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-background" />

      {/* Animated gradient mesh */}
      <motion.div
        animate={{
          x: [0, 40, -30, 0],
          y: [0, -40, 30, 0],
          scale: [1, 1.1, 0.95, 1],
        }}
        transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
        className="absolute -top-60 -right-60 w-[700px] h-[700px] rounded-full bg-gradient-to-br from-violet-500/[0.06] via-indigo-500/[0.04] to-transparent blur-[80px] dark:from-violet-500/[0.04] dark:via-indigo-500/[0.025]"
      />
      <motion.div
        animate={{
          x: [0, -30, 40, 0],
          y: [0, 30, -40, 0],
          scale: [1, 0.95, 1.1, 1],
        }}
        transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
        className="absolute -bottom-60 -left-60 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-blue-500/[0.06] via-cyan-500/[0.03] to-transparent blur-[80px] dark:from-blue-500/[0.04] dark:via-cyan-500/[0.02]"
      />
      <motion.div
        animate={{
          x: [0, 20, -20, 0],
          y: [0, -25, 20, 0],
        }}
        transition={{ duration: 35, repeat: Infinity, ease: "linear" }}
        className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-gradient-to-r from-purple-500/[0.03] via-pink-500/[0.02] to-transparent blur-[60px] dark:from-purple-500/[0.02] dark:via-pink-500/[0.01]"
      />

      {/* Grid pattern - horizontal and vertical lines */}
      <div
        className="absolute inset-0 opacity-[0.35] dark:opacity-[0.08]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: "80px 80px",
        }}
      />

      {/* Smaller dot grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.25] dark:opacity-[0.1]"
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, currentColor 0.5px, transparent 0.5px)`,
          backgroundSize: "24px 24px",
          color: "var(--border)",
        }}
      />

      {/* Diagonal accent lines */}
      <div
        className="absolute inset-0 opacity-[0.03] dark:opacity-[0.02]"
        style={{
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 80px,
            currentColor 80px,
            currentColor 81px
          )`,
          color: "var(--foreground)",
        }}
      />

      {/* Radial vignette - draws focus to center */}
      <div
        className="absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at center, transparent 0%, transparent 50%, var(--background) 100%)`,
        }}
      />

      {/* Corner accents */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-gradient-to-br from-violet-500/[0.04] to-transparent dark:from-violet-500/[0.02]" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-gradient-to-tl from-blue-500/[0.04] to-transparent dark:from-blue-500/[0.02]" />

      {/* Noise texture */}
      <div
        className="absolute inset-0 opacity-[0.015] dark:opacity-[0.025]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 512 512' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.7' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
        }}
      />

      {/* Top/bottom fades for clean edges */}
      <div className="absolute top-0 left-0 right-0 h-40 bg-gradient-to-b from-background via-background/60 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-background to-transparent" />
    </div>
  );
}
