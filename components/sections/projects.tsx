"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ExternalLink, Layers, CheckCircle2, Cpu } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import { PROJECTS_DATA } from "@/data/portfolio-data";
import { Project } from "@/types/portfolio";

const categories = ["All", "AI/ML", "Enterprise"];

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeCategory, setActiveCategory] = useState("All");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && selectedProject) {
        setSelectedProject(null);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject]);

  useEffect(() => {
    if (selectedProject) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedProject]);

  const filteredProjects =
    activeCategory === "All"
      ? PROJECTS_DATA
      : PROJECTS_DATA.filter((p) => p.category === activeCategory);

  return (
    <section id="projects" className="section-padding px-4 sm:px-6 lg:px-8 relative" aria-label="Projects Section">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <div className="anthropic-tag mb-3">PROJECTS</div>
          <h2 className="text-4xl sm:text-5xl font-serif tracking-tight mb-4">
            Production &amp; GenAI Projects
          </h2>
          <p className="text-muted-foreground max-w-2xl text-base font-sans mb-8 leading-relaxed">
            Explorations and production implementations across Generative AI, Hybrid RAG, Multi-Agent ReAct workflows, and enterprise platform security.
          </p>

          <div className="flex items-center gap-2 flex-wrap" role="tablist" aria-label="Filter projects by category">
            {categories.map((category) => (
              <button
                key={category}
                role="tab"
                aria-selected={activeCategory === category}
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

        <div className="grid gap-6 md:grid-cols-2">
          {filteredProjects.map((project, index) => (
            <motion.article
              key={project.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              tabIndex={0}
              role="button"
              aria-label={`View details for ${project.title}`}
              onClick={() => setSelectedProject(project)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  setSelectedProject(project);
                }
              }}
              className="group relative p-6 sm:p-8 rounded-2xl border border-border bg-card/70 backdrop-blur-md hover:bg-card hover:border-foreground/30 transition-all cursor-pointer shadow-sm flex flex-col justify-between focus:outline-none focus:ring-2 focus:ring-foreground/50"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="anthropic-tag">{project.category}</span>
                  <span className="p-2 rounded-full bg-secondary border border-border text-muted-foreground group-hover:text-foreground transition-colors">
                    <ExternalLink size={14} />
                  </span>
                </div>

                <h3 className="text-2xl font-serif tracking-tight mb-3 text-foreground group-hover:text-foreground/90 transition-colors">
                  {project.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground mb-6 line-clamp-3 leading-relaxed font-sans">
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

              <div className="flex flex-wrap items-center justify-between pt-4 border-t border-border/50 gap-2">
                <div className="flex flex-wrap gap-2">
                  {project.technologies.slice(0, 5).map((tech) => (
                    <span
                      key={tech}
                      className="font-mono text-[11px] text-muted-foreground"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <span className="anthropic-tag text-[10px] underline underline-offset-4 group-hover:text-foreground">
                  Architecture &amp; Metrics &rarr;
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </div>

      {/* Accessible Interactive Detail Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-md overflow-y-auto"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="relative w-full max-w-2xl p-6 sm:p-8 rounded-3xl border border-border bg-card shadow-2xl overflow-hidden my-8"
          >
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-6 right-6 w-8 h-8 rounded-full bg-secondary border border-border flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
              aria-label="Close modal"
            >
              &times;
            </button>

            <div className="anthropic-tag mb-2">{selectedProject.category}</div>
            <h3 id="modal-title" className="text-2xl sm:text-3xl font-serif tracking-tight mb-4 text-foreground">
              {selectedProject.title}
            </h3>

            <p className="text-sm text-muted-foreground mb-6 leading-relaxed font-sans">
              {selectedProject.longDescription}
            </p>

            {/* Metrics */}
            {selectedProject.metrics && (
              <div className="mb-6 p-4 rounded-xl bg-secondary/40 border border-border/50">
                <div className="anthropic-tag mb-2 flex items-center gap-1.5 text-foreground">
                  <CheckCircle2 size={14} className="text-emerald-500" />
                  Key Impact Metrics
                </div>
                <ul className="space-y-1.5">
                  {selectedProject.metrics.map((m, i) => (
                    <li key={i} className="text-xs text-muted-foreground flex items-start gap-2 font-mono">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                      {m}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Architecture Steps */}
            {selectedProject.architecture && (
              <div className="mb-6 p-4 rounded-xl bg-secondary/40 border border-border/50">
                <div className="anthropic-tag mb-2 flex items-center gap-1.5 text-foreground">
                  <Cpu size={14} className="text-indigo-400" />
                  System Architecture Pipeline
                </div>
                <ul className="space-y-2">
                  {selectedProject.architecture.map((step, i) => (
                    <li key={i} className="text-xs text-muted-foreground flex items-start gap-2">
                      <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-muted text-foreground shrink-0">
                        0{i + 1}
                      </span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="mb-6">
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

            <div className="flex flex-wrap items-center gap-3 pt-2 border-t border-border/50">
              <a
                href={selectedProject.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="anthropic-pill bg-foreground text-background hover:opacity-90 flex items-center gap-2"
              >
                <GitHubIcon className="w-3.5 h-3.5" />
                <span>Inspect Repository</span>
              </a>
              <button
                onClick={() => setSelectedProject(null)}
                className="anthropic-pill bg-secondary text-foreground border border-border hover:bg-muted"
              >
                Close Preview
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </section>
  );
}
