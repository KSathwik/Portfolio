"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Sparkles } from "lucide-react";

interface VectorResult {
  text: string;
  denseScore: number;
  sparseScore: number;
  fusedScore: number;
}

const SAMPLE_DOCS = [
  "Sathwik built an AI Knowledge Assistant with FAISS and BM25 hybrid search.",
  "FastAPI microservice handling JWT authentication and high-concurrency requests.",
  "Multi-agent ReAct workflow for email drafting, planning, and self-reflection.",
  "CVE vulnerability remediation on container images and Next.js applications.",
  "Salesforce Chatter API integration fetching support tickets and resolution logs.",
];

export function RAGVisualizer() {
  const [query, setQuery] = useState("Hybrid RAG search in Python");
  const [searchMode, setSearchMode] = useState<"hybrid" | "dense" | "sparse">("hybrid");
  const [chunkSize, setChunkSize] = useState(256);

  const results: VectorResult[] = SAMPLE_DOCS.map((text) => {
    let denseScore = 0.45;
    let sparseScore = 0.30;

    const q = query.toLowerCase();
    const t = text.toLowerCase();

    if (q.includes("rag") && t.includes("rag")) denseScore += 0.42;
    if (q.includes("python") && (t.includes("fastapi") || t.includes("python"))) denseScore += 0.35;
    if (q.includes("agent") && t.includes("agent")) denseScore += 0.48;
    if (q.includes("salesforce") && t.includes("salesforce")) denseScore += 0.40;

    if (q.split(" ").some((w) => w.length > 3 && t.includes(w))) sparseScore += 0.38;

    const hashOffset = (text.length % 5) * 0.01;
    denseScore = Math.min(0.98, denseScore + hashOffset);
    sparseScore = Math.min(0.95, sparseScore + hashOffset);
    const fusedScore = Number(((denseScore * 0.6 + sparseScore * 0.4)).toFixed(3));

    return {
      text,
      denseScore: Number(denseScore.toFixed(3)),
      sparseScore: Number(sparseScore.toFixed(3)),
      fusedScore,
    };
  }).sort((a, b) => b.fusedScore - a.fusedScore);

  return (
    <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card/60 backdrop-blur-md my-12">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
        <div>
          <div className="anthropic-tag mb-2 flex items-center gap-1.5 text-foreground">
            <Sparkles size={14} className="text-emerald-500" />
            INTERACTIVE AI LAB DEMO
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif tracking-tight text-foreground">
            Hybrid RAG &amp; Vector Search Simulator
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground font-sans mt-1">
            Simulate Dense FAISS vector retrieval combined with Sparse BM25 Reciprocal Rank Fusion (RRF).
          </p>
        </div>

        {/* Search Mode Pills */}
        <div className="flex items-center gap-1.5 bg-secondary/80 p-1 rounded-full border border-border/60 self-start md:self-auto">
          {(["hybrid", "dense", "sparse"] as const).map((mode) => (
            <button
              key={mode}
              onClick={() => setSearchMode(mode)}
              className={`px-3 py-1 text-[11px] font-mono uppercase tracking-wider rounded-full transition-all ${
                searchMode === mode
                  ? "bg-foreground text-background font-semibold"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Interactive Controls */}
      <div className="grid gap-4 sm:grid-cols-3 mb-8">
        <div className="sm:col-span-2">
          <label className="block font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-2">
            Input Query
          </label>
          <div className="flex items-center px-3.5 py-2.5 bg-secondary/50 border border-border/60 rounded-xl">
            <Search size={16} className="text-muted-foreground mr-2.5 shrink-0" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full text-xs font-mono bg-transparent outline-none text-foreground placeholder:text-muted-foreground"
              placeholder="Search vector database..."
            />
          </div>
        </div>

        <div>
          <label className="block font-mono text-[11px] uppercase tracking-wider text-muted-foreground mb-2 flex items-center justify-between">
            <span>Chunk Size: {chunkSize} tokens</span>
          </label>
          <div className="flex items-center gap-2 pt-2">
            {[128, 256, 512, 1024].map((size) => (
              <button
                key={size}
                onClick={() => setChunkSize(size)}
                className={`flex-1 py-1.5 font-mono text-[10px] rounded-lg border transition-all ${
                  chunkSize === size
                    ? "bg-foreground text-background border-foreground"
                    : "bg-secondary/40 text-muted-foreground border-border hover:border-foreground/40"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Vector Results Output List */}
      <div className="space-y-3">
        <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-muted-foreground px-2">
          <span>Retrieved Context Chunks</span>
          <span>Similarity Score</span>
        </div>

        {results.map((item, idx) => {
          const score =
            searchMode === "hybrid"
              ? item.fusedScore
              : searchMode === "dense"
              ? item.denseScore
              : item.sparseScore;

          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: idx * 0.05 }}
              className="p-4 rounded-xl border border-border/50 bg-secondary/30 hover:border-border transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3"
            >
              <div className="flex items-start gap-3">
                <span className="font-mono text-[10px] px-2 py-0.5 rounded bg-muted text-foreground font-semibold mt-0.5">
                  #0{idx + 1}
                </span>
                <p className="text-xs text-foreground font-sans leading-relaxed">
                  {item.text}
                </p>
              </div>

              <div className="flex items-center gap-3 shrink-0 self-end sm:self-auto">
                <div className="w-24 h-2 bg-muted rounded-full overflow-hidden hidden sm:block">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-500"
                    style={{ width: `${Math.round(score * 100)}%` }}
                  />
                </div>
                <span className="font-mono text-xs text-emerald-500 font-semibold px-2 py-1 rounded bg-emerald-500/10 border border-emerald-500/20">
                  {(score * 100).toFixed(1)}%
                </span>
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
