"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import { BM25 } from "@/lib/site-search";

interface VectorResult {
  text: string;
  denseScore: number;
  sparseScore: number;
  fusedScore: number;
}

const SAMPLE_DOCS = [
  "AI Knowledge Assistant: hybrid RAG search in Python, FAISS for meaning plus BM25 for exact words.",
  "FastAPI microservice handling JWT authentication and high-concurrency requests.",
  "Multi-agent ReAct workflow for email drafting, planning, and self-reflection.",
  "LungAI: a DenseNet-121 chest X-ray classifier served through a FastAPI inference API.",
  "Salesforce Chatter API integration fetching support tickets and resolution logs.",
];

/*
 * A toy "embedding": each concept is a bag of related words. Dense similarity rewards
 * a document that shares the query's concepts even with different words; sparse (BM25-ish)
 * only rewards literal word overlap. Small, deterministic, and honest about what it is.
 */
const CONCEPTS: string[][] = [
  ["rag", "retrieval", "search", "hybrid", "faiss", "bm25", "vector", "knowledge", "semantic"],
  ["python", "fastapi", "flask", "microservice", "api"],
  ["vision", "x-ray", "classifier", "densenet", "image", "medical"],
  ["agent", "agents", "react", "reflection", "planning", "multi-agent", "workflow"],
  ["email", "gmail", "drafting"],
  ["salesforce", "ticket", "tickets", "support", "chatter"],
  ["security", "cve", "vulnerability", "jwt", "auth", "authentication", "oauth"],
];

const words = (s: string) => s.toLowerCase().match(/[a-z0-9-]+/g) ?? [];

function denseScore(query: string, doc: string) {
  const q = new Set(words(query));
  const d = new Set(words(doc));
  const asked = CONCEPTS.filter((c) => c.some((w) => q.has(w)));
  if (asked.length === 0) return 0.2;
  const hits = asked.reduce((sum, c) => sum + c.filter((w) => d.has(w)).length / Math.min(c.length, 4), 0);
  return Math.min(0.97, 0.2 + (0.75 * Math.min(hits, asked.length)) / asked.length);
}

const SEARCH_MODES = ["hybrid", "dense", "sparse"] as const;
const MODE_LABELS: Record<(typeof SEARCH_MODES)[number], string> = {
  hybrid: "Hybrid",
  dense: "Dense",
  sparse: "Sparse",
};

/* Min-max normalise a list of scores to 0..1, as the real retriever does before blending. */
function normalise(xs: number[]) {
  const lo = Math.min(...xs);
  const hi = Math.max(...xs);
  return xs.map((x) => (hi > lo ? (x - lo) / (hi - lo) : x > 0 ? 1 : 0));
}

const SPARSE = new BM25(SAMPLE_DOCS);

export function RAGVisualizer() {
  const [query, setQuery] = useState("Hybrid RAG search in Python");
  const [searchMode, setSearchMode] = useState<"hybrid" | "dense" | "sparse">("hybrid");
  // Same knob as the AI Knowledge Assistant's config: hybrid_dense_weight, 0.6 by default.
  const [denseWeight, setDenseWeight] = useState(0.6);

  const dense = normalise(SAMPLE_DOCS.map((d) => denseScore(query, d)));
  const sparse = normalise(SPARSE.scores(query));
  const results: VectorResult[] = SAMPLE_DOCS.map((text, i) => ({
    text,
    denseScore: dense[i],
    sparseScore: sparse[i],
    fusedScore: denseWeight * dense[i] + (1 - denseWeight) * sparse[i],
  }));
  const scoreOf = (r: VectorResult) =>
    searchMode === "hybrid" ? r.fusedScore : searchMode === "dense" ? r.denseScore : r.sparseScore;
  results.sort((a, b) => scoreOf(b) - scoreOf(a));

  return (
    <div className="grid gap-6">
      <div className="grid gap-2">
        <h3>Hybrid search, in miniature</h3>
        <p className="max-w-[60ch] text-ink-2">
          Sparse is real BM25 over these five lines. Dense is a stand-in for embeddings: it matches
          related words, not real vectors. Hybrid blends the two after normalising, the same formula my
          knowledge assistant uses. Try &ldquo;python api&rdquo; or &ldquo;ticket search&rdquo; and move the weight.
        </p>
      </div>

      {/* Controls */}
      <div className="flex flex-wrap items-end gap-x-8 gap-y-4">
        <div className="grid gap-2">
          <span className="label" id="rag-mode-label">Search mode</span>
          <div
            role="group"
            aria-labelledby="rag-mode-label"
            className="inline-flex items-center gap-1.5 rounded-[var(--radius-input)] bg-paper-3 p-1.5"
          >
            {SEARCH_MODES.map((mode) => (
              <button
                key={mode}
                type="button"
                aria-pressed={searchMode === mode}
                onClick={() => setSearchMode(mode)}
                className="key key--sm min-h-10"
              >
                {MODE_LABELS[mode]}
              </button>
            ))}
          </div>
        </div>

        <div className="grid min-w-[14rem] gap-2">
          <label htmlFor="rag-dense-weight" className="label flex items-baseline justify-between gap-4">
            <span>Dense weight</span>
            <span className="font-mono text-ink">
              {denseWeight.toFixed(1)} dense · {(1 - denseWeight).toFixed(1)} BM25
            </span>
          </label>
          <input
            id="rag-dense-weight"
            type="range"
            min={0}
            max={1}
            step={0.1}
            value={denseWeight}
            disabled={searchMode !== "hybrid"}
            aria-valuetext={`${denseWeight.toFixed(1)} dense, ${(1 - denseWeight).toFixed(1)} BM25`}
            onChange={(e) => setDenseWeight(Number(e.target.value))}
            className="h-11 w-full cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 [accent-color:var(--color-signal)]"
          />
        </div>
      </div>

      {/* The mapping: query in, ranked chunks out */}
      <div className="graphite cut grid overflow-hidden border md:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div className="grid content-start gap-4 p-5 sm:p-6">
          <label htmlFor="rag-query" className="label">
            Input query
          </label>
          <div className="flex items-center gap-2.5 rounded-[var(--radius-input)] border border-graphite-muted/40 bg-graphite-2 px-3 transition-[border-color] duration-[var(--dur-micro)] focus-within:border-signal-2">
            <Search size={16} aria-hidden="true" className="shrink-0 text-graphite-muted" />
            <input
              id="rag-query"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="code min-h-11 w-full bg-transparent text-base sm:text-[length:inherit] text-graphite-ink placeholder:text-graphite-muted"
              placeholder="Search the five lines..."
            />
          </div>

          <dl className="code grid grid-cols-[auto_minmax(0,1fr)] gap-x-4 gap-y-1">
            <dt className="muted">mode</dt>
            <dd className="token">{searchMode}</dd>
            <dt className="muted">dense_weight</dt>
            <dd className="token">{denseWeight.toFixed(1)}</dd>
            <dt className="muted">hybrid</dt>
            <dd>w * dense_norm + (1 - w) * bm25_norm</dd>
          </dl>
        </div>

        <div className="border-t border-graphite-2 md:border-t-0 md:border-l">
          <div className="flex items-center justify-between gap-4 border-b border-graphite-2 px-5 py-3 sm:px-6">
            <span className="label">Retrieved context chunks</span>
            <span className="label">Score (0–1, normalised)</span>
          </div>

          <ol>
            {results.map((item, idx) => {
              const score = scoreOf(item);

              return (
                <li
                  key={idx}
                  className="grid grid-cols-[auto_minmax(0,1fr)_auto] items-start gap-3 border-b border-graphite-2 px-5 py-3 last:border-b-0 sm:px-6"
                >
                  <span className="code muted">#{String(idx + 1).padStart(2, "0")}</span>
                  <p className="text-sm leading-relaxed">{item.text}</p>
                  <div className="grid justify-items-end gap-1.5 pt-0.5">
                    <span className="code token">{(score * 100).toFixed(1)}%</span>
                    <span
                      aria-hidden="true"
                      className="hidden h-1 w-20 overflow-hidden rounded-[2px] bg-graphite-2 sm:block"
                    >
                      <span
                        className="block h-full w-full origin-left bg-signal-2 transition-transform duration-[var(--dur-short)]"
                        style={{ transform: `scaleX(${score})` }}
                      />
                    </span>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </div>
  );
}
