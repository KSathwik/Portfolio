"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Layers } from "lucide-react";
import { GitHubIcon } from "@/components/icons";

const projects = [
  {
    title: "AI Knowledge Assistant (Exam Prep Bot)",
    description:
      "Production-ready AI Knowledge Assistant featuring Hybrid RAG (FAISS + BM25), Context-Aware Generation (CAG), and Multi-Agent Reflection pipelines supporting Claude, OpenAI, Gemini, and Ollama.",
    technologies: [
      "Python",
      "FastAPI",
      "React",
      "FAISS",
      "BM25",
      "Docker",
      "Ollama",
      "PostgreSQL",
    ],
    category: "AI/ML",
    highlights: [
      "Hybrid RAG + CAG",
      "Multi-Agent System",
      "Multi-LLM Support",
    ],
  },
  {
    title: "Support Ticket AI Assistant",
    description:
      "AI-powered Support Ticket Assistant using RAG, semantic search, and vector databases. Integrates with Salesforce for ticket management and supports multiple LLM providers.",
    technologies: [
      "Python",
      "LangChain",
      "FAISS",
      "Salesforce",
      "OpenAI",
      "Gemini",
      "Ollama",
      "Streamlit",
    ],
    category: "AI/ML",
    highlights: [
      "RAG Architecture",
      "Multi-LLM Support",
      "Salesforce Integration",
    ],
  },
  {
    title: "AI Email Orchestration System",
    description:
      "Multi-agent AI email platform with Planning, Generation, and Reflection agents. Custom ReAct-based reasoning workflow with JWT/OAuth authentication.",
    technologies: [
      "Python",
      "FastAPI",
      "React",
      "TypeScript",
      "SQLite",
      "JWT",
      "OAuth",
    ],
    category: "AI/ML",
    highlights: [
      "Multi-Agent System",
      "ReAct Workflow",
      "Full-Stack",
    ],
  },
  {
    title: "SmartFit – Enterprise Platform",
    description:
      "Enterprise application with security hardening, Twilio integrations, and platform reliability improvements across multiple modules and releases.",
    technologies: ["Next.js", "React", "TypeScript", "Azure", "Twilio"],
    category: "Enterprise",
    highlights: [
      "Security Remediation",
      "Twilio Integration",
      "Azure Cloud",
    ],
  },
];

const categories = ["All", "AI/ML", "Enterprise"];

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="section-padding px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <div className="anthropic-tag mb-3">02 / SELECTED WORK</div>
          <h2 className="text-4xl sm:text-5xl font-serif tracking-tight mb-6">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl text-base font-sans mb-8 leading-relaxed">
            Explorations and production implementations across Generative AI, Hybrid RAG, Multi-Agent workflows, and enterprise platform security.
          </p>

          <div className="flex items-center gap-2 flex-wrap">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`anthropic-pill ${
                  activeCategory === category
                    ? "bg-foreground text-background"
                    : "bg-secondary/60 text-muted-foreground hover:text-foreground border border-border"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-2">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              onClick={() => setSelectedProject(project)}
              className="group relative p-8 rounded-2xl border border-border bg-card/70 backdrop-blur-md hover:bg-card hover:border-foreground/30 transition-all cursor-pointer shadow-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-6">
                  <span className="anthropic-tag">{project.category}</span>
                  <div className="flex items-center gap-2 opacity-70 group-hover:opacity-100 transition-opacity">
                    <span className="p-2 rounded-full bg-secondary border border-border text-muted-foreground group-hover:text-foreground transition-colors">
                      <ExternalLink size={14} />
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl font-serif tracking-tight mb-3 text-foreground group-hover:text-foreground/90 transition-colors">
                  {project.title}
                </h3>
                <p className="text-sm text-muted-foreground mb-6 line-clamp-3 leading-relaxed font-sans">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-6">
                  {project.highlights.map((highlight) => (
                    <span
                      key={highlight}
                      className="px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-foreground/80 bg-secondary border border-border rounded-full"
                    >
                      {highlight}
                    </span>
                  ))}
                </div>
              </div>

              <div className="flex flex-wrap items-center justify-between pt-6 border-t border-border/50 gap-2">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[11px] text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <span className="anthropic-tag text-[10px] underline underline-offset-4 group-hover:text-foreground">
                  Read details &rarr;
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Anthropic-style Interactive Popover Modal */}
      {selectedProject && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-xl p-8 rounded-3xl border border-border bg-card shadow-2xl overflow-hidden"
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close modal"
            >
              &times;
            </button>

            <div className="anthropic-tag mb-2">{selectedProject.category}</div>
            <h3 className="text-3xl font-serif tracking-tight mb-4 text-foreground">
              {selectedProject.title}
            </h3>

            <p className="text-base text-muted-foreground mb-6 leading-relaxed font-sans">
              {selectedProject.description}
            </p>

            <div className="mb-6">
              <div className="anthropic-tag mb-2">Key Architecture Highlights</div>
              <div className="flex flex-wrap gap-2">
                {selectedProject.highlights.map((h) => (
                  <span
                    key={h}
                    className="px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-foreground bg-secondary border border-border rounded-full"
                  >
                    {h}
                  </span>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <div className="anthropic-tag mb-2">Tech Stack</div>
              <div className="flex flex-wrap gap-2">
                {selectedProject.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-2.5 py-1 font-mono text-[11px] text-muted-foreground bg-muted/50 rounded-md border border-border/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setSelectedProject(null)}
                className="anthropic-pill bg-foreground text-background hover:opacity-90"
              >
                Close Preview
              </button>
              <a
                href="https://github.com/KSathwik"
                target="_blank"
                rel="noopener noreferrer"
                className="anthropic-pill bg-secondary text-foreground border border-border hover:bg-muted"
              >
                <GitHubIcon className="w-3.5 h-3.5 mr-2 inline" />
                View Code
              </a>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
