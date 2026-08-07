"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import { RAGVisualizer } from "@/components/ai/rag-visualizer";
import { AgentOrchestrator } from "@/components/ai/agent-orchestrator";

export function AISystemsLab() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="ai-lab" className="section-padding px-4 sm:px-6 lg:px-8 relative" aria-label="AI Systems Lab Section">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="anthropic-tag mb-3 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            AI SYSTEMS LAB
          </div>
          <h2 className="text-4xl sm:text-5xl font-serif tracking-tight mb-4">
            Interactive AI Demonstrations
          </h2>
          <p className="text-muted-foreground max-w-2xl text-base font-sans leading-relaxed">
            Test live simulated environments for Hybrid RAG vector retrieval, reciprocal rank fusion, and autonomous multi-agent ReAct orchestration.
          </p>
        </motion.div>

        {/* RAG Visualizer Demo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <RAGVisualizer />
        </motion.div>

        {/* Agent Orchestrator Demo */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <AgentOrchestrator />
        </motion.div>
      </div>
    </section>
  );
}
