"use client";

import { useEffect, useRef } from "react";

/*
 * The site's signature drawing: an ASCII field on an 8 by 16 cell, shaped by the work's own flow.
 * Here that flow is the AI Knowledge Assistant's hybrid retrieval: a cloud of raw chunks
 * on the left splits into a dense (FAISS) and a sparse (BM25) stream, which Reciprocal
 * Rank Fusion joins into one line on the right. 30 fps, a pointer lens, no animation
 * frames at all while off screen, one still frame under reduced motion; a dot grid
 * stands in without script. `bare` drops the labels and the lens for decorative use.
 */

const RAMP = " .:-=+*#%@";
const CELL_W = 8;
const CELL_H = 16;
const FPS = 30;

const SPLIT_START = 0.3;
const SPLIT_END = 0.72;
const SPREAD = 0.2;

function hash(x: number, y: number) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453;
  return s - Math.floor(s);
}

function smooth(t: number) {
  return t * t * (3 - 2 * t);
}

function noise(x: number, y: number) {
  const xi = Math.floor(x);
  const yi = Math.floor(y);
  const xf = smooth(x - xi);
  const yf = smooth(y - yi);
  const a = hash(xi, yi);
  const b = hash(xi + 1, yi);
  const c = hash(xi, yi + 1);
  const d = hash(xi + 1, yi + 1);
  return a + (b - a) * xf + (c - a) * yf + (a - b - c + d) * xf * yf;
}

function streamOffset(u: number) {
  if (u < SPLIT_START || u > SPLIT_END) return 0;
  const s = (u - SPLIT_START) / (SPLIT_END - SPLIT_START);
  return SPREAD * Math.sin(Math.PI * s);
}

type Palette = { tints: string[]; deep: string; font: string };

function readPalette(): Palette {
  const css = getComputedStyle(document.documentElement);
  const v = (name: string) => css.getPropertyValue(name).trim();
  return {
    tints: [v("--color-glyph-1"), v("--color-glyph-2"), v("--color-glyph-3"), v("--color-glyph-4")],
    deep: v("--color-signal-deep"),
    font: v("--font-outlier") || "ui-monospace, monospace",
  };
}

function density(u: number, v: number, cols: number, rows: number, t: number) {
  // A faint ground of texture everywhere.
  let d = 0.12 * noise(u * cols * 0.18 - t * 0.6, v * rows * 0.25);

  // Raw chunks: a drifting cloud on the left, thinning toward the split.
  if (u < SPLIT_START + 0.08) {
    const du = (u - 0.15) / 0.24;
    const dv = (v - 0.5) / 0.4;
    const falloff = Math.max(0, 1 - Math.sqrt(du * du + dv * dv));
    const grain = noise(u * cols * 0.35 - t * 1.4, v * rows * 0.45 + t * 0.3);
    d += Math.sqrt(falloff) * (0.15 + 1.0 * grain * grain * 1.4);
  }

  // Two streams, dense above and sparse below, converging into one fused line.
  const vr = v * rows;
  const pulse = (phase: number) => 0.55 + 0.45 * Math.sin(u * 42 - t * 5 + phase);
  if (u >= SPLIT_START - 0.04 && u <= SPLIT_END) {
    const off = streamOffset(u);
    const up = Math.abs(vr - (0.5 - off) * rows);
    const dn = Math.abs(vr - (0.5 + off) * rows);
    d += Math.exp(-((up / 1.15) ** 2)) * 0.82 * pulse(0);
    // The sparse stream is literally sparser: it skips cells.
    const keep = hash(Math.floor(u * cols), Math.floor(t * 6)) > 0.35 ? 1 : 0.35;
    d += Math.exp(-((dn / 1.15) ** 2)) * 0.78 * pulse(1.7) * keep;
  }
  if (u > SPLIT_END - 0.01 && u < 0.97) {
    const mid = Math.abs(vr - 0.5 * rows);
    d += Math.exp(-((mid / 1.35) ** 2)) * (0.92 + 0.08 * pulse(0.6));
  }
  return d;
}

export function RetrievalField({
  className = "h-[340px] sm:h-[420px] lg:h-[min(68vh,600px)]",
  bare = false,
}: {
  className?: string;
  /** Decorative mode: no labels, no pointer lens, hidden from assistive tech. */
  bare?: boolean;
}) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const canvas = canvasRef.current;
    if (!wrap || !canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let palette = readPalette();
    let cols = 0;
    let rows = 0;
    let raf = 0;
    let last = 0;
    let visible = false;
    let t = 2.4;
    const pointer = { x: -999, y: -999 };

    const resize = () => {
      const { width, height } = wrap.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      cols = Math.floor(width / CELL_W);
      rows = Math.floor(height / CELL_H);
      draw();
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.font = `400 12px ${palette.font}`;
      ctx.textBaseline = "top";
      let current = "";
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const u = x / cols;
          const v = y / rows;
          let d = density(u, v, cols, rows, t);
          const px = x - pointer.x;
          const py = (y - pointer.y) * 2;
          d += 0.45 * Math.exp(-(px * px + py * py) / 60);
          if (d < 0.08) continue;
          const c = Math.min(1, d);
          const glyph = RAMP[Math.min(RAMP.length - 1, Math.floor(c * RAMP.length))];
          if (glyph === " ") continue;
          const fill =
            c > 0.86 ? palette.deep : palette.tints[Math.min(3, Math.floor(c * 4.4))];
          if (fill !== current) {
            ctx.fillStyle = fill;
            current = fill;
          }
          ctx.fillText(glyph, x * CELL_W, y * CELL_H + 1);
        }
      }
    };

    const loop = (now: number) => {
      raf = 0;
      if (!visible || document.hidden) return;
      raf = requestAnimationFrame(loop);
      if (now - last < 1000 / FPS) return;
      last = now;
      t += 1 / FPS;
      draw();
    };

    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };
    // Runs the loop only while the field is on screen and the tab is visible.
    const start = () => {
      stop();
      if (reduce.matches) {
        draw();
      } else if (visible && !document.hidden) {
        raf = requestAnimationFrame(loop);
      }
    };

    const onPointer = (e: PointerEvent) => {
      const r = wrap.getBoundingClientRect();
      pointer.x = (e.clientX - r.left) / CELL_W;
      pointer.y = (e.clientY - r.top) / CELL_H;
      if (reduce.matches) draw();
    };
    const onLeave = () => {
      pointer.x = -999;
      pointer.y = -999;
      if (reduce.matches) draw();
    };

    const ro = new ResizeObserver(resize);
    ro.observe(wrap);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(wrap);
    const mo = new MutationObserver(() => {
      palette = readPalette();
      draw();
    });
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    reduce.addEventListener("change", start);
    document.addEventListener("visibilitychange", start);
    if (!bare) {
      wrap.addEventListener("pointermove", onPointer);
      wrap.addEventListener("pointerleave", onLeave);
    }
    document.fonts?.ready.then(() => draw());

    resize();
    start();
    wrap.dataset.live = "true";

    return () => {
      stop();
      ro.disconnect();
      io.disconnect();
      mo.disconnect();
      reduce.removeEventListener("change", start);
      document.removeEventListener("visibilitychange", start);
      wrap.removeEventListener("pointermove", onPointer);
      wrap.removeEventListener("pointerleave", onLeave);
    };
  }, [bare]);

  return (
    <figure
      className={`relative m-0 overflow-hidden ${bare ? "pointer-events-none" : ""} ${className}`}
      {...(bare
        ? { "aria-hidden": true }
        : {
            role: "img",
            "aria-label":
              "Hybrid retrieval: raw document chunks split into a dense FAISS search and a sparse BM25 search, which Reciprocal Rank Fusion joins into one ranked answer.",
          })}
    >
      <div
        ref={wrapRef}
        className="field-dots absolute inset-0 data-[live=true]:bg-none"
        aria-hidden="true"
      >
        <canvas ref={canvasRef} className="absolute inset-0" />
      </div>
      {!bare && (
        <>
          <FieldLabel style={{ left: "2%", top: "8%" }}>Raw chunks</FieldLabel>
          <FieldLabel style={{ left: "40%", top: "17%" }}>Dense search, FAISS</FieldLabel>
          <FieldLabel style={{ left: "40%", top: "78%" }}>Sparse search, BM25</FieldLabel>
          <FieldLabel style={{ left: "70%", top: "57%" }}>Fused by RRF</FieldLabel>
          <FieldLabel style={{ right: "0%", top: "40%" }}>Ranked context</FieldLabel>
        </>
      )}
    </figure>
  );
}

function FieldLabel({ children, style }: { children: React.ReactNode; style: React.CSSProperties }) {
  return (
    <span
      aria-hidden="true"
      style={style}
      className="label absolute hidden whitespace-nowrap bg-paper px-1.5 py-0.5 text-ink-2 sm:block"
    >
      {children}
    </span>
  );
}
