"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ExternalLink, Layers } from "lucide-react";
import { GitHubIcon } from "@/components/icons";

const projects = [
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

  const filteredProjects =
    activeCategory === "All"
      ? projects
      : projects.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="section-padding px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Projects
          </h2>
          <div className="w-12 h-[2px] bg-foreground/20 mb-8" />

          <div className="flex items-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-4 py-1.5 text-sm rounded-lg transition-all ${
                  activeCategory === category
                    ? "bg-foreground text-background font-medium"
                    : "text-muted-foreground hover:text-foreground hover:bg-accent"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
              className="card-glow group relative p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-border hover:bg-card/80 transition-all"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent/50 border border-border/50 flex items-center justify-center">
                  <Layers size={18} className="text-muted-foreground" />
                </div>
                <div className="flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    <GitHubIcon className="w-3.5 h-3.5" />
                  </span>
                  <span className="p-1.5 rounded-md hover:bg-accent text-muted-foreground hover:text-foreground transition-colors cursor-pointer">
                    <ExternalLink size={14} />
                  </span>
                </div>
              </div>

              <h3 className="text-base font-semibold mb-2">{project.title}</h3>
              <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5 mb-4">
                {project.highlights.map((highlight) => (
                  <span
                    key={highlight}
                    className="px-2.5 py-1 text-[10px] font-medium text-foreground/80 bg-accent border border-border/50 rounded-md"
                  >
                    {highlight}
                  </span>
                ))}
              </div>

              <div className="flex flex-wrap gap-1.5 pt-4 border-t border-border/30">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="text-[10px] text-muted-foreground"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
