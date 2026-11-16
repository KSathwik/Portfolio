/*
 * The banner under the introduction: a notebook sketch of how my RAG assistant works,
 * drawn the way I'd draw it on a whiteboard. Pure SVG, rendered on the server.
 * Every "hand-drawn" wobble comes from a seeded generator, so server and client always match.
 */

type Pt = [number, number];

/* Small seeded PRNG (mulberry32): same seed, same wobble, every render. */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const r1 = (n: number) => Math.round(n * 10) / 10;

/* A rectangle drawn twice with slightly different hands, like a pen going round once more. */
function roughRect(x: number, y: number, w: number, h: number, seed: number) {
  const rand = rng(seed);
  const j = (amt = 2.2) => (rand() - 0.5) * amt * 2;
  const pass = () => {
    const p: Pt[] = [
      [x + j(), y + j()],
      [x + w + j(), y + j()],
      [x + w + j(), y + h + j()],
      [x + j(), y + h + j()],
    ];
    const [a, b, c, d] = p;
    // Each side bows a little through a midpoint, and the stroke overshoots where it closes.
    return (
      `M${r1(a[0])},${r1(a[1])} ` +
      `Q${r1((a[0] + b[0]) / 2 + j())},${r1((a[1] + b[1]) / 2 + j(1.6))} ${r1(b[0])},${r1(b[1])} ` +
      `Q${r1((b[0] + c[0]) / 2 + j(1.6))},${r1((b[1] + c[1]) / 2 + j())} ${r1(c[0])},${r1(c[1])} ` +
      `Q${r1((c[0] + d[0]) / 2 + j())},${r1((c[1] + d[1]) / 2 + j(1.6))} ${r1(d[0])},${r1(d[1])} ` +
      `Q${r1((d[0] + a[0]) / 2 + j(1.6))},${r1((d[1] + a[1]) / 2 + j())} ${r1(a[0] + 6)},${r1(a[1] + j())}`
    );
  };
  return [pass(), pass()];
}

/* A loose arrow from a to b, bending by `bend`, with a two-stroke head. */
function arrow(a: Pt, b: Pt, bend: number, seed: number) {
  const rand = rng(seed);
  const mx = (a[0] + b[0]) / 2;
  const my = (a[1] + b[1]) / 2 - bend;
  const shaft = `M${a[0]},${a[1]} Q${r1(mx + (rand() - 0.5) * 6)},${r1(my)} ${b[0]},${b[1]}`;
  const ang = Math.atan2(b[1] - my, b[0] - mx);
  const head = (da: number) =>
    `${r1(b[0] - 11 * Math.cos(ang + da))},${r1(b[1] - 11 * Math.sin(ang + da))}`;
  return { shaft, head: `M${head(0.5)} L${b[0]},${b[1]} L${head(-0.5)}` };
}

/* A wobbly circle. */
function roughCircle(cx: number, cy: number, rad: number, seed: number) {
  const rand = rng(seed);
  const pts: string[] = [];
  const steps = 14;
  for (let i = 0; i <= steps + 1; i++) {
    const t = (i / steps) * Math.PI * 2 - 0.4;
    const rr = rad + (rand() - 0.5) * 3.4;
    pts.push(`${r1(cx + rr * Math.cos(t))},${r1(cy + rr * Math.sin(t))}`);
  }
  return `M${pts[0]} ${pts.slice(1).map((p) => `L${p}`).join(" ")}`;
}

type Box = { x: number; y: number; w: number; h: number; label: string; sub?: string; seed: number; accent?: boolean };

const boxes: Box[] = [
  { x: 214, y: 104, w: 112, h: 54, label: "chunk", sub: "split by meaning", seed: 11 },
  { x: 376, y: 104, w: 112, h: 54, label: "embed", sub: "MiniLM vectors", seed: 23 },
  { x: 548, y: 44, w: 132, h: 54, label: "FAISS", sub: "dense / meaning", seed: 37 },
  { x: 548, y: 164, w: 132, h: 54, label: "BM25", sub: "sparse / exact words", seed: 41 },
  { x: 846, y: 104, w: 120, h: 54, label: "reflect", sub: "is it grounded?", seed: 53, accent: true },
];

/* Wide screens: the pipeline runs left to right. */
function HorizontalSketch() {
  const arrows = [
    arrow([182, 131], [210, 131], 4, 1),
    arrow([330, 131], [372, 131], 6, 2),
    arrow([492, 124], [544, 74], 10, 3),
    arrow([492, 138], [544, 190], -10, 4),
    arrow([684, 72], [742, 118], -6, 5),
    arrow([684, 190], [742, 146], 6, 6),
    arrow([806, 131], [842, 131], 5, 7),
    arrow([970, 131], [1012, 131], 6, 8),
  ];
  // The "nope, try again" loop: reflection sends a weak draft back to retrieval.
  const retry = `M906,160 C906,236 760,246 690,214`;
  const docs = [roughRect(70, 96, 92, 70, 71), roughRect(62, 104, 92, 70, 72), roughRect(54, 112, 92, 70, 73)];

  return (
      <div className="sketch-scroll sketch-wide">
        <svg
          className="sketch"
          viewBox="0 0 1200 270"
          aria-hidden="true"
          focusable="false"
          preserveAspectRatio="xMidYMid meet"
        >
          {/* Title, top left, like the heading of a notebook page */}
          <text x="40" y="40" className="sk-hand sk-title">
            how my RAG assistant thinks, roughly
          </text>
          <path
            className="sk-line sk-note-line"
            pathLength={1}
            d="M40,50 C120,54 220,47 318,52"
          />

          {/* Source documents: a little stack of pages */}
          {docs.map(([a, b], i) => (
            <g key={i} className="sk-paper">
              <path d={a} className="sk-line" pathLength={1} style={{ "--d": `${i * 0.08}s` } as React.CSSProperties} />
              <path d={b} className="sk-line sk-faint" pathLength={1} />
            </g>
          ))}
          {[132, 144, 156, 168].map((y, i) => (
            <path key={y} className="sk-line sk-faint" pathLength={1} d={`M64,${y} L${128 - i * 8},${y + 1}`} />
          ))}
          <text x="100" y="208" textAnchor="middle" className="sk-hand sk-label-sm">
            your PDFs &amp; docs
          </text>

          {/* The pipeline boxes */}
          {boxes.map((b, i) => {
            const [p1, p2] = roughRect(b.x, b.y, b.w, b.h, b.seed);
            return (
              <g key={b.label} className={b.accent ? "sk-accent" : undefined} style={{ "--d": `${0.25 + i * 0.12}s` } as React.CSSProperties}>
                <path d={p1} className="sk-box" />
                <path d={p1} className="sk-line" pathLength={1} />
                <path d={p2} className="sk-line sk-faint" pathLength={1} />
                <text x={b.x + b.w / 2} y={b.y + b.h * 0.48} textAnchor="middle" className="sk-mono">
                  {b.label}
                </text>
                {b.sub && (
                  <text x={b.x + b.w / 2} y={b.y + b.h * 0.81} textAnchor="middle" className="sk-hand sk-sub">
                    {b.sub}
                  </text>
                )}
              </g>
            );
          })}

          {/* Rank fusion: where the two searches meet */}
          <g style={{ "--d": "0.8s" } as React.CSSProperties}>
            <path d={roughCircle(774, 131, 30, 91)} className="sk-box" />
            <path d={roughCircle(774, 131, 30, 91)} className="sk-line" pathLength={1} />
            <text x="774" y="137" textAnchor="middle" className="sk-mono">
              RRF
            </text>
          </g>

          {/* The answer, as a speech bubble with citations */}
          <g className="sk-answer" style={{ "--d": "1.1s" } as React.CSSProperties}>
            <path
              className="sk-box sk-box--answer"
              d="M1018,96 C1060,90 1130,90 1166,98 C1176,118 1176,150 1164,166 C1130,172 1080,172 1056,168 L1036,190 L1040,166 C1024,164 1014,150 1014,132 C1014,116 1014,104 1018,96 Z"
            />
            <path
              className="sk-line"
              pathLength={1}
              d="M1018,96 C1060,90 1130,90 1166,98 C1176,118 1176,150 1164,166 C1130,172 1080,172 1056,168 L1036,190 L1040,166 C1024,164 1014,150 1014,132 C1014,116 1014,104 1018,96 Z"
            />
            <text x="1092" y="124" textAnchor="middle" className="sk-mono">
              answer
            </text>
            <text x="1092" y="148" textAnchor="middle" className="sk-hand sk-cite">
              + sources [1] [2]
            </text>
          </g>

          {/* Arrows between steps */}
          {arrows.map((a, i) => (
            <g key={i} className="sk-arrow" style={{ "--d": `${0.35 + i * 0.1}s` } as React.CSSProperties}>
              <path d={a.shaft} className="sk-line" pathLength={1} />
              <path d={a.head} className="sk-line" pathLength={1} />
            </g>
          ))}

          {/* The retry loop, dashed, in the note colour */}
          <g className="sk-note" style={{ "--d": "1.4s" } as React.CSSProperties}>
            <path d={retry} className="sk-line sk-dash" />
            <path d="M700,206 L688,214 L702,222" className="sk-line" pathLength={1} />
            <text x="824" y="250" textAnchor="middle" className="sk-hand sk-note-text">
              not grounded? go fetch better context
            </text>
          </g>

          {/* Margin notes */}
          <g className="sk-note" style={{ "--d": "1.6s" } as React.CSSProperties}>
            <text x="618" y="128" textAnchor="middle" className="sk-hand sk-note-text sk-note-sm">
              both, not either
            </text>
            <path className="sk-line" pathLength={1} d="M868,64 C830,64 800,74 788,96" />
            <path className="sk-line" pathLength={1} d="M782,86 L788,97 L798,90" />
            <text x="876" y="70" className="sk-hand sk-note-text">
              fuse the two rankings
            </text>
          </g>
        </svg>
      </div>
  );
}

const vBoxes: Box[] = [
  { x: 124, y: 216, w: 112, h: 48, label: "chunk", sub: "split by meaning", seed: 11 },
  { x: 124, y: 296, w: 112, h: 48, label: "embed", sub: "MiniLM vectors", seed: 23 },
  { x: 24, y: 388, w: 138, h: 48, label: "FAISS", sub: "dense / meaning", seed: 37 },
  { x: 198, y: 388, w: 138, h: 48, label: "BM25", sub: "sparse / exact words", seed: 41 },
  { x: 120, y: 580, w: 120, h: 48, label: "reflect", sub: "is it grounded?", seed: 53, accent: true },
];

const BUBBLE_V =
  "M96,672 C140,664 220,664 264,672 C274,688 274,712 262,724 C230,730 160,730 128,726 L108,744 L112,724 C98,720 90,708 90,696 C90,684 92,676 96,672 Z";

/* Phones: the same pipeline, drawn top to bottom so it fits the screen without swiping. */
function VerticalSketch() {
  const arrows = [
    arrow([180, 184], [180, 212], 0, 1),
    arrow([180, 268], [180, 292], 0, 2),
    arrow([164, 348], [108, 384], 6, 3),
    arrow([196, 348], [252, 384], 6, 4),
    arrow([94, 440], [164, 500], -6, 5),
    arrow([266, 440], [196, 500], -6, 6),
    arrow([180, 550], [180, 576], 0, 7),
    arrow([180, 632], [180, 662], 0, 8),
  ];
  const docs = [roughRect(148, 92, 70, 50, 71), roughRect(142, 98, 70, 50, 72), roughRect(136, 104, 70, 50, 73)];

  return (
    <svg className="sketch sketch--v" viewBox="0 0 360 760" aria-hidden="true" focusable="false">
      <text x="24" y="36" className="sk-hand sk-title">
        how my RAG assistant
      </text>
      <text x="24" y="62" className="sk-hand sk-title">
        thinks, roughly
      </text>
      <path className="sk-line sk-note-line" pathLength={1} d="M24,72 C80,76 140,70 196,74" />

      {docs.map(([a, b], i) => (
        <g key={i} className="sk-paper">
          <path d={a} className="sk-line" pathLength={1} style={{ "--d": `${i * 0.08}s` } as React.CSSProperties} />
          <path d={b} className="sk-line sk-faint" pathLength={1} />
        </g>
      ))}
      {[118, 128, 138, 148].map((y, i) => (
        <path key={y} className="sk-line sk-faint" pathLength={1} d={`M144,${y} L${194 - i * 7},${y + 1}`} />
      ))}
      <text x="180" y="178" textAnchor="middle" className="sk-hand sk-label-sm">
        your PDFs &amp; docs
      </text>

      {vBoxes.map((b, i) => {
        const [p1, p2] = roughRect(b.x, b.y, b.w, b.h, b.seed);
        return (
          <g key={b.label} className={b.accent ? "sk-accent" : undefined} style={{ "--d": `${0.25 + i * 0.12}s` } as React.CSSProperties}>
            <path d={p1} className="sk-box" />
            <path d={p1} className="sk-line" pathLength={1} />
            <path d={p2} className="sk-line sk-faint" pathLength={1} />
            <text x={b.x + b.w / 2} y={b.y + b.h * 0.48} textAnchor="middle" className="sk-mono">
              {b.label}
            </text>
            {b.sub && (
              <text x={b.x + b.w / 2} y={b.y + b.h * 0.81} textAnchor="middle" className="sk-hand sk-sub">
                {b.sub}
              </text>
            )}
          </g>
        );
      })}

      <g style={{ "--d": "0.8s" } as React.CSSProperties}>
        <path d={roughCircle(180, 522, 26, 91)} className="sk-box" />
        <path d={roughCircle(180, 522, 26, 91)} className="sk-line" pathLength={1} />
        <text x="180" y="528" textAnchor="middle" className="sk-mono">
          RRF
        </text>
      </g>

      <g className="sk-answer" style={{ "--d": "1.1s" } as React.CSSProperties}>
        <path className="sk-box sk-box--answer" d={BUBBLE_V} />
        <path className="sk-line" pathLength={1} d={BUBBLE_V} />
        <text x="180" y="694" textAnchor="middle" className="sk-mono">
          answer
        </text>
        <text x="180" y="716" textAnchor="middle" className="sk-hand sk-cite">
          + sources [1] [2]
        </text>
      </g>

      {arrows.map((a, i) => (
        <g key={i} className="sk-arrow" style={{ "--d": `${0.35 + i * 0.1}s` } as React.CSSProperties}>
          <path d={a.shaft} className="sk-line" pathLength={1} />
          <path d={a.head} className="sk-line" pathLength={1} />
        </g>
      ))}

      {/* Retry loop: a weak draft goes back up for better context */}
      <g className="sk-note" style={{ "--d": "1.4s" } as React.CSSProperties}>
        <path d="M244,606 C320,606 348,522 304,444" className="sk-line sk-dash" />
        <path d="M296,453 L304,442 L311,454" className="sk-line" pathLength={1} />
        <text x="252" y="640" className="sk-hand sk-note-text sk-note-sm">
          not grounded?
        </text>
        <text x="252" y="657" className="sk-hand sk-note-text sk-note-sm">
          fetch again
        </text>
      </g>

      <g className="sk-note" style={{ "--d": "1.6s" } as React.CSSProperties}>
        <text x="180" y="462" textAnchor="middle" className="sk-hand sk-note-text sk-note-sm">
          both, not either
        </text>
        <text x="20" y="516" className="sk-hand sk-note-text sk-note-sm">
          fuse the
        </text>
        <text x="20" y="534" className="sk-hand sk-note-text sk-note-sm">
          two rankings
        </text>
        <path className="sk-line" pathLength={1} d="M114,528 C128,530 140,528 150,524" />
        <path className="sk-line" pathLength={1} d="M143,519 L151,524 L143,530" />
      </g>
    </svg>
  );
}

export function SketchBanner() {
  return (
    <figure className="sketch-band m-0">
      <HorizontalSketch />
      <VerticalSketch />
      <figcaption className="visually-hidden">
        A hand-drawn sketch of a retrieval-augmented generation pipeline: documents are chunked and
        embedded, searched two ways (FAISS for meaning and BM25 for exact words), the rankings are
        fused, a reflection step checks the draft is grounded and loops back for better context if
        not, and the answer comes back with its sources.
      </figcaption>
    </figure>
  );
}
