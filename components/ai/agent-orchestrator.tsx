"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, CheckCircle2, RefreshCw } from "lucide-react";

interface AgentNode {
  id: string;
  name: string;
  role: string;
  status: "idle" | "running" | "completed";
  prompt: string;
  output: string;
}

/* An illustrated walk-through of the email system's loop. Example text, not live output. */
const AGENTS_WORKFLOW: AgentNode[] = [
  {
    id: "planner",
    name: "Planning agent",
    role: "Works out what the email needs",
    status: "completed",
    prompt: "Request: \"Follow up with Priya about the Q3 integration demo, keep it short.\" List the facts, the tone and what's still missing.",
    output: "Plan: recipient Priya; purpose, follow-up on the Q3 demo; tone, friendly and brief; fetch the demo date and open action items from the CRM notes.",
  },
  {
    id: "executor",
    name: "Generation agent",
    role: "Writes the draft from the plan",
    status: "completed",
    prompt: "Write the email from the plan, using only facts from the request and the retrieved CRM notes.",
    output: "Draft: \"Hi Priya, thanks again for joining the integration demo. As promised, here are the two open items...\"",
  },
  {
    id: "reflection",
    name: "Reflection agent",
    role: "Checks it before you see it",
    status: "completed",
    prompt: "Check the draft: is every fact in the request or the notes? Does the tone match? Is anything from the plan missing?",
    output: "One issue: the demo date from the notes is missing. Sent back to the generation agent once; the revised draft passes.",
  },
];

export function AgentOrchestrator() {
  const [selectedAgent, setSelectedAgent] = useState<AgentNode>(AGENTS_WORKFLOW[0]);
  const [isRunningSim, setIsRunningSim] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

  const timers = useRef<number[]>([]);
  const clearTimers = () => {
    timers.current.forEach((t) => window.clearTimeout(t));
    timers.current = [];
  };
  useEffect(() => clearTimers, []);

  const runSimulation = () => {
    clearTimers();
    setIsRunningSim(true);
    setActiveStep(0);
    setSelectedAgent(AGENTS_WORKFLOW[0]);
    timers.current.push(
      window.setTimeout(() => {
        setActiveStep(1);
        setSelectedAgent(AGENTS_WORKFLOW[1]);
      }, 1000),
      window.setTimeout(() => {
        setActiveStep(2);
        setSelectedAgent(AGENTS_WORKFLOW[2]);
        setIsRunningSim(false);
      }, 2000),
    );
  };

  return (
    <div className="grid gap-6">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div className="grid gap-2">
          <h3>Plan, draft, reflect: the email agents&apos; loop</h3>
          <p className="max-w-[60ch] text-ink-2">
            A walk-through of how my email system&apos;s three agents hand work to each other. The text is an
            illustrative example, not live output; the real system runs inside Primesoft.
          </p>
        </div>

        <button
          type="button"
          onClick={runSimulation}
          disabled={isRunningSim}
          className="key key--primary self-start sm:self-auto"
        >
          {isRunningSim ? (
            <>
              <RefreshCw size={16} aria-hidden="true" className="animate-spin" />
              <span>Playing…</span>
            </>
          ) : (
            <>
              <Play size={16} aria-hidden="true" />
              <span>Play the example</span>
            </>
          )}
        </button>
      </div>

      <div className="grid gap-x-[var(--gap-columns)] gap-y-6 lg:grid-cols-12">
        {/* The trail: one hairline spine, a notched tick per step */}
        <ol className="grid content-start border-l border-rule-2 lg:col-span-5">
          {AGENTS_WORKFLOW.map((agent, index) => {
            const isActive = selectedAgent.id === agent.id;
            const isSimActive = isRunningSim && activeStep === index;

            return (
              <li key={agent.id} className="relative">
                <span
                  aria-hidden="true"
                  className={`absolute top-6 -left-px h-px w-3 ${isActive ? "bg-signal" : "bg-ink-3"}`}
                />
                <button
                  type="button"
                  aria-pressed={isActive}
                  onClick={() => setSelectedAgent(agent)}
                  className={`grid w-full gap-1 py-3 pr-3 pl-6 text-left transition-colors duration-[var(--dur-micro)] ${
                    isActive ? "bg-paper-2" : "hover:bg-paper-2"
                  }`}
                >
                  <span className="flex items-center justify-between gap-3">
                    <span className="label">Step 0{index + 1}</span>
                    {isSimActive ? (
                      <span className="label flex items-center gap-1.5 text-signal-deep">
                        <RefreshCw size={14} aria-hidden="true" className="animate-spin" />
                        Working
                      </span>
                    ) : (
                      <span className="label flex items-center gap-1.5">
                        <CheckCircle2 size={14} aria-hidden="true" className="text-success" />
                        Ready
                      </span>
                    )}
                  </span>
                  <span className="font-display text-[length:var(--text-lg)] font-medium tracking-[var(--tracking-display)] text-ink">
                    {agent.name}
                  </span>
                  <span className="text-sm text-ink-2">{agent.role}</span>
                </button>
              </li>
            );
          })}
        </ol>

        {/* Selected Agent Inspector */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div
              key={selectedAgent.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="cut grid gap-5 p-5 sm:p-6"
            >
              <div className="grid gap-1 border-b border-rule pb-4">
                <h4 className="font-display text-[length:var(--text-lg)] font-medium tracking-[var(--tracking-display)] text-ink">
                  {selectedAgent.name}
                </h4>
                <p className="label">Role: {selectedAgent.role}</p>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <div className="grid content-start gap-2">
                  <span className="label">What it&apos;s asked</span>
                  <p className="graphite cut cut--sm code border p-3">{selectedAgent.prompt}</p>
                </div>

                <div className="grid content-start gap-2">
                  <span className="label">What it hands on (example)</span>
                  <p className="graphite cut cut--sm code border p-3">
                    <span className="token">{selectedAgent.output}</span>
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
