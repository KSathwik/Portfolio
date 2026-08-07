"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, GitBranch, ArrowRight, Play, CheckCircle2, RefreshCw } from "lucide-react";

interface AgentNode {
  id: string;
  name: string;
  role: string;
  status: "idle" | "running" | "completed";
  prompt: string;
  output: string;
}

const AGENTS_WORKFLOW: AgentNode[] = [
  {
    id: "planner",
    name: "Planning Agent",
    role: "Goal Decomposition & Strategy",
    status: "completed",
    prompt: "Decompose user query into 3 sequential micro-tasks: 1. Research context, 2. Draft structure, 3. Check constraints.",
    output: "Execution Plan generated: [Task 1: Fetch user history], [Task 2: Compose personalized pitch], [Task 3: Validate security].",
  },
  {
    id: "executor",
    name: "Execution Agent",
    role: "ReAct Tool Execution & Generation",
    status: "completed",
    prompt: "Execute Plan Step 2 using LLM Tool Call with retrieved vector context.",
    output: "Draft generated: 'Dear Hiring Manager, Sathwik brings 1 YOE in production FastAPI & LangChain microservices...'",
  },
  {
    id: "reflection",
    name: "Reflection Agent",
    role: "Quality Control & ReAct Evaluation",
    status: "completed",
    prompt: "Evaluate generated email draft against tone guidelines, conciseness, and accuracy constraints.",
    output: "Evaluation Score: 94/100. Feedback: Approved for dispatch. Zero security leaks detected.",
  },
];

export function AgentOrchestrator() {
  const [selectedAgent, setSelectedAgent] = useState<AgentNode>(AGENTS_WORKFLOW[0]);
  const [isRunningSim, setIsRunningSim] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const runSimulation = () => {
    setIsRunningSim(true);
    setActiveStep(0);
    setSelectedAgent(AGENTS_WORKFLOW[0]);

    setTimeout(() => {
      setActiveStep(1);
      setSelectedAgent(AGENTS_WORKFLOW[1]);
    }, 1000);

    setTimeout(() => {
      setActiveStep(2);
      setSelectedAgent(AGENTS_WORKFLOW[2]);
      setIsRunningSim(false);
    }, 2000);
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl border border-border bg-card/60 backdrop-blur-md my-12">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
        <div>
          <div className="anthropic-tag mb-2 flex items-center gap-1.5 text-foreground">
            <GitBranch size={14} className="text-indigo-400" />
            MULTI-AGENT SYSTEM LAB
          </div>
          <h3 className="text-2xl sm:text-3xl font-serif tracking-tight text-foreground">
            Autonomous ReAct Agent Orchestrator
          </h3>
          <p className="text-xs sm:text-sm text-muted-foreground font-sans mt-1">
            Interactive state machine showing Planning, Execution, and Reflection feedback loops.
          </p>
        </div>

        <button
          onClick={runSimulation}
          disabled={isRunningSim}
          className="anthropic-pill bg-foreground text-background hover:opacity-90 disabled:opacity-50 flex items-center gap-2 self-start sm:self-auto"
        >
          {isRunningSim ? (
            <>
              <RefreshCw size={13} className="animate-spin" />
              <span>Orchestrating...</span>
            </>
          ) : (
            <>
              <Play size={13} />
              <span>Run Agent Loop</span>
            </>
          )}
        </button>
      </div>

      {/* Agent Workflow Nodes */}
      <div className="grid gap-4 md:grid-cols-3 mb-8 relative">
        {AGENTS_WORKFLOW.map((agent, index) => {
          const isActive = selectedAgent.id === agent.id;
          const isSimActive = isRunningSim && activeStep === index;

          return (
            <div
              key={agent.id}
              onClick={() => setSelectedAgent(agent)}
              className={`p-5 rounded-2xl border transition-all cursor-pointer relative ${
                isActive
                  ? "bg-secondary border-foreground/40 shadow-md"
                  : "bg-secondary/30 border-border/60 hover:border-border"
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="font-mono text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-muted text-foreground">
                  Step 0{index + 1}
                </span>
                {isSimActive ? (
                  <span className="flex items-center gap-1 font-mono text-[10px] text-amber-500">
                    <RefreshCw size={10} className="animate-spin" />
                    Executing
                  </span>
                ) : (
                  <span className="flex items-center gap-1 font-mono text-[10px] text-emerald-500">
                    <CheckCircle2 size={10} />
                    Ready
                  </span>
                )}
              </div>

              <h4 className="text-base font-semibold text-foreground mb-1">{agent.name}</h4>
              <p className="text-xs text-muted-foreground font-sans line-clamp-2">{agent.role}</p>

              {index < AGENTS_WORKFLOW.length - 1 && (
                <div className="hidden md:block absolute -right-3 top-1/2 -translate-y-1/2 z-10 text-muted-foreground/40">
                  <ArrowRight size={16} />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Selected Agent Inspector */}
      <AnimatePresence mode="wait">
        <motion.div
          key={selectedAgent.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
          className="p-6 rounded-2xl bg-secondary/40 border border-border/60 space-y-4"
        >
          <div className="flex items-center justify-between border-b border-border/40 pb-3">
            <div className="flex items-center gap-2">
              <Bot size={18} className="text-foreground" />
              <h4 className="text-sm font-semibold font-mono text-foreground">
                Agent State Inspector: {selectedAgent.name}
              </h4>
            </div>
            <span className="font-mono text-[10px] text-muted-foreground uppercase">
              Role: {selectedAgent.role}
            </span>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <span className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">
                System Prompt / Directive
              </span>
              <div className="p-3 rounded-xl bg-card border border-border/50 font-mono text-xs text-foreground/90 leading-relaxed">
                {selectedAgent.prompt}
              </div>
            </div>

            <div>
              <span className="block font-mono text-[10px] uppercase tracking-wider text-muted-foreground mb-1.5">
                Execution Output &amp; State Variables
              </span>
              <div className="p-3 rounded-xl bg-card border border-border/50 font-mono text-xs text-emerald-400 dark:text-emerald-300 leading-relaxed">
                {selectedAgent.output}
              </div>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
