"use client";

import { RAGVisualizer } from "@/components/ai/rag-visualizer";
import { AgentOrchestrator } from "@/components/ai/agent-orchestrator";

export function AISystemsLab() {
  return (
    <section id="ai-lab" aria-labelledby="ai-lab-title" className="section">
      <div className="wrap">
        <div className="section-head">
          <span className="section-mark">05 Lab</span>
          <h2 id="ai-lab-title" className="kicker-title">Try how my systems think</h2>
          <p>
            Two small demos. Watch hybrid search rank documents, then watch planner, executor and
            critic agents hand work to each other.
          </p>
        </div>

        <div className="grid gap-[var(--space-3xl)]">
          <RAGVisualizer />
          <AgentOrchestrator />
        </div>
      </div>
    </section>
  );
}
