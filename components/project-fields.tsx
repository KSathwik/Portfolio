"use client";

import { AsciiField, hash, noise, type Density, type FieldLabelSpec } from "@/components/retrieval-field";

/*
 * One small live drawing per project, in the same ASCII style as the featured card.
 * Each density works in "isotropic" units: x = u * cols, y = v * rows * 2 (a cell is twice
 * as tall as it is wide), so circles look like circles.
 */

const gauss = (d: number, w: number) => Math.exp(-((d / w) ** 2));
const ground = (u: number, v: number, cols: number, rows: number, t: number) => {
  const n = noise(u * cols * 0.22 - t * 0.6, v * rows * 0.4 + t * 0.15);
  return 0.16 * n * n * 1.6;
};

/* Distance from point (px, py) to the segment a-b. */
function segDist(px: number, py: number, ax: number, ay: number, bx: number, by: number) {
  const dx = bx - ax;
  const dy = by - ay;
  const k = Math.max(0, Math.min(1, ((px - ax) * dx + (py - ay) * dy) / (dx * dx + dy * dy || 1)));
  return Math.hypot(px - (ax + k * dx), py - (ay + k * dy));
}

/* ---------- Support Ticket AI Assistant: a new ticket finds its closest past resolution ---------- */
const supportDensity: Density = (u, v, cols, rows, t) => {
  const x = u * cols;
  const y = v * rows * 2;
  const W = cols;
  const H = rows * 2;
  let d = ground(u, v, cols, rows, t);

  // The archive of past tickets: short shelves stacked in the middle.
  const shelfL = W * 0.44;
  const shelfR = W * 0.66;
  const shelves = 5;
  const gap = H / (shelves + 1);
  const cycle = Math.floor(t / 2.6);
  const match = 1 + ((cycle * 3) % shelves);
  for (let i = 1; i <= shelves; i++) {
    const sy = i * gap;
    if (x > shelfL && x < shelfR) {
      const on = i === match;
      d += gauss(y - sy, on ? 1.4 : 1) * (on ? 0.95 : 0.32 + 0.12 * noise(x * 0.6, i * 3));
    }
  }

  // The new ticket travels in from the left on the centre line.
  const phase = (t % 2.6) / 2.6;
  const tx = W * 0.04 + phase * (shelfL - W * 0.08);
  d += 0.95 * Math.exp(-(((x - tx) / 2.2) ** 2 + ((y - H / 2) / 2.4) ** 2));
  if (x < shelfL) d += gauss(y - H / 2, 0.8) * 0.18;

  // From the matched shelf, a beam carries the suggested fix out to the right.
  const my = match * gap;
  if (x >= shelfR - 1) {
    const dist = segDist(x, y, shelfR, my, W * 0.96, H / 2);
    const pulse = 0.55 + 0.45 * Math.sin(x * 0.7 - t * 6);
    d += gauss(dist, 1.1) * 0.85 * pulse;
  }
  return d;
};

/* ---------- AI Email Orchestration: plan, draft, reflect, revise once, then send ---------- */
const emailDensity: Density = (u, v, cols, rows, t) => {
  const x = u * cols;
  const y = v * rows * 2;
  const W = cols;
  const H = rows * 2;
  let d = ground(u, v, cols, rows, t);

  const cy = H * 0.58;
  const nodes = [W * 0.14, W * 0.42, W * 0.7];
  const r = Math.min(H * 0.16, W * 0.07);
  const outX = W * 0.95;

  // The path: a line through the agents and a revision arc above draft and reflect.
  if (x > nodes[0] && x < outX) d += gauss(y - cy, 0.7) * 0.22;
  const arcCx = (nodes[1] + nodes[2]) / 2;
  const arcR = (nodes[2] - nodes[1]) / 2;
  const onArc = Math.abs(Math.hypot(x - arcCx, y - cy) - arcR);
  if (y < cy) d += gauss(onArc, 0.8) * 0.2;

  // Where the message is now: plan > draft > reflect > (arc back) draft > reflect > send.
  const T = 6;
  const p = (t % T) / T;
  let mx = 0;
  let my = cy;
  if (p < 0.2) mx = nodes[0] + (nodes[1] - nodes[0]) * (p / 0.2);
  else if (p < 0.4) mx = nodes[1] + (nodes[2] - nodes[1]) * ((p - 0.2) / 0.2);
  else if (p < 0.6) {
    const a = Math.PI * ((p - 0.4) / 0.2); // over the top, right to left
    mx = arcCx + arcR * Math.cos(a);
    my = cy - arcR * Math.sin(a);
  } else if (p < 0.8) mx = nodes[1] + (nodes[2] - nodes[1]) * ((p - 0.6) / 0.2);
  else mx = nodes[2] + (outX - nodes[2]) * ((p - 0.8) / 0.2);
  d += 1.0 * Math.exp(-(((x - mx) / 1.6) ** 2 + ((y - my) / 1.6) ** 2));

  // The three agents as rings; each brightens as the message passes through it.
  nodes.forEach((nx) => {
    const dist = Math.hypot(x - nx, y - cy);
    const near = Math.exp(-(((mx - nx) / 3) ** 2 + ((my - cy) / 3) ** 2));
    d += gauss(dist - r, 0.9) * (0.5 + 0.45 * near);
    if (dist < r - 1) d += 0.12 + 0.35 * near * noise(x * 0.8 + t, y * 0.8);
  });
  return d;
};

/* ---------- LungAI: a scan line over two lungs, six class scores on the right ---------- */
const SCORES = [0.22, 0.18, 0.3, 0.86, 0.26, 0.4]; // the fourth class wins, as in a real prediction
const lungDensity: Density = (u, v, cols, rows, t) => {
  const x = u * cols;
  const y = v * rows * 2;
  const W = cols;
  const H = rows * 2;
  let d = ground(u, v, cols, rows, t) * 0.6;

  // Two lobes, with rib-like texture inside.
  const lobes = [W * 0.2, W * 0.4];
  const rx = W * 0.085;
  const ry = H * 0.36;
  const top = H * 0.12;
  const bottom = H * 0.86;
  let inside = false;
  lobes.forEach((lx, i) => {
    const e = ((x - lx) / rx) ** 2 + ((y - H * 0.5) / ry) ** 2;
    if (e < 1) {
      inside = true;
      const ribs = 0.5 + 0.5 * Math.sin(y * 0.9 + (i ? -1 : 1) * x * 0.25);
      d += 0.2 + 0.28 * ribs * noise(x * 0.5, y * 0.3);
    }
    d += gauss(Math.abs(Math.sqrt(e) - 1) * rx, 0.8) * 0.45;
  });
  // The spine between them.
  if (y > top && y < bottom) d += gauss(x - W * 0.3, 0.6) * 0.3;

  // The scan line sweeps down over the lungs.
  const scanY = top + ((t * 0.32) % 1) * (bottom - top);
  if (x > W * 0.08 && x < W * 0.52) d += gauss(y - scanY, 1) * (inside ? 1 : 0.5);

  // Six class scores as bars that settle and breathe.
  const barL = W * 0.6;
  const barW = (W * 0.36) / SCORES.length;
  const base = H * 0.86;
  const i = Math.floor((x - barL) / barW);
  if (i >= 0 && i < SCORES.length && (x - barL) % barW < barW * 0.62) {
    const h = SCORES[i] * (0.86 + 0.14 * Math.sin(t * 1.6 + i * 1.3)) * H * 0.7;
    if (y < base && y > base - h) d += i === 3 ? 0.95 : 0.42 + 0.1 * hash(i, Math.floor(y));
  }
  if (x > barL - 1 && x < barL + barW * SCORES.length) d += gauss(y - base, 0.6) * 0.35;
  return d;
};

const FIELDS: Record<string, { density: Density; labels: FieldLabelSpec[]; aria: string }> = {
  "support-ticket-ai-assistant": {
    density: supportDensity,
    labels: [
      { text: "New ticket", style: { left: "3%", top: "10%" } },
      { text: "Past fixes", style: { left: "46%", top: "4%" } },
      { text: "Suggested fix", style: { right: "2%", top: "10%" } },
    ],
    aria: "A new support ticket travels to an archive of past tickets, the closest match lights up, and a suggested fix goes out.",
  },
  "ai-email-orchestration": {
    density: emailDensity,
    labels: [
      { text: "Plan", style: { left: "8%", top: "10%" } },
      { text: "Draft", style: { left: "36%", top: "10%" } },
      { text: "Reflect", style: { left: "63%", top: "10%" } },
      { text: "Send", style: { right: "2%", top: "34%" } },
    ],
    aria: "A message moves through planning, drafting and reflection agents, loops back once for a revision, then is sent.",
  },
  "lungai-chest-xray": {
    density: lungDensity,
    labels: [
      { text: "Chest X-ray", style: { left: "4%", top: "4%" } },
      { text: "6 class scores", style: { right: "3%", top: "4%" } },
    ],
    aria: "A scan line moves over a chest X-ray while six class scores rise beside it, one clearly highest.",
  },
};

export function hasProjectField(id: string) {
  return id in FIELDS;
}

export function ProjectField({ id, className = "h-44" }: { id: string; className?: string }) {
  const f = FIELDS[id];
  if (!f) return null;
  return (
    <AsciiField
      density={f.density}
      labels={f.labels}
      ariaLabel={f.aria}
      className={className}
      cellW={7}
      cellH={14}
      fontSize={12}
      gain={1.45}
    />
  );
}
