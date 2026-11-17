"use client";

import { RAGVisualizer } from "@/components/ai/rag-visualizer";
import { AgentOrchestrator } from "@/components/ai/agent-orchestrator";

export function AISystemsLab() {
  return (
    <section id="ai-lab" aria-labelledby="ai-lab-title" className="section">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="section-mark">05 Lab<span className="head-note" aria-hidden="true">go on, press play</span></span>
          <h2 id="ai-lab-title" className="kicker-title">Two small demos to poke at</h2>
          <p>
            Watch hybrid search rank a few lines as you move the weight, then watch planning, drafting
            and reflection agents hand work to each other.
          </p>
        </div>

        <div className="grid gap-12 sm:gap-[var(--space-2xl)]">
          <RAGVisualizer />
          <AgentOrchestrator />
        </div>
      </div>
    </section>
  );
}
