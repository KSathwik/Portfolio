"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar, MapPin, CheckCircle2 } from "lucide-react";
import { TextReveal } from "@/components/text-reveal";
import { EXPERIENCE_DATA } from "@/data/portfolio-data";

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="section-padding px-4 sm:px-6 lg:px-8" aria-label="Work Experience Section">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <div className="mb-16">
          <div className="anthropic-tag mb-3">EXPERIENCE</div>
          <TextReveal as="h2" className="text-4xl sm:text-5xl font-serif tracking-tight mb-4">
            Professional Work
          </TextReveal>
        </div>

        <div className="space-y-12">
          {EXPERIENCE_DATA.map((exp, expIndex) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: expIndex * 0.15 }}
            >
              {/* Company Header */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/50 border border-border/50 flex items-center justify-center shrink-0">
                    <Briefcase size={18} className="text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">{exp.company}</h3>
                    <p className="text-sm text-muted-foreground">{exp.role}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 sm:ml-auto text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Calendar size={12} />
                    {exp.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={12} />
                    {exp.location}
                  </span>
                  {exp.current && (
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 rounded-full text-[10px] font-medium">
                      Current
                    </span>
                  )}
                </div>
              </div>

              {/* Experience Projects Grid */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 ml-0 sm:ml-[52px]">
                {exp.projects.map((project, projIndex) => (
                  <motion.div
                    key={project.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.2 + expIndex * 0.1 + projIndex * 0.08,
                    }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="card-glow p-5 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-border hover:bg-card/80 transition-all group flex flex-col justify-between"
                  >
                    <div>
                      <h4 className="text-sm font-semibold mb-2 text-foreground group-hover:text-foreground">
                        {project.name}
                      </h4>
                      <p className="text-xs text-muted-foreground mb-4 leading-relaxed line-clamp-3">
                        {project.description}
                      </p>

                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.technologies.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="px-2 py-0.5 text-[10px] font-mono font-medium text-muted-foreground bg-accent/50 border border-border/30 rounded-md"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>

                      <ul className="space-y-1.5 mb-4">
                        {project.responsibilities.map((resp, i) => (
                          <li
                            key={i}
                            className="text-[11px] text-muted-foreground flex items-start gap-2"
                          >
                            <span className="w-1 h-1 rounded-full bg-muted-foreground/50 mt-1.5 shrink-0" />
                            <span>{resp}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Quantified Metrics Highlight */}
                    {project.metrics && (
                      <div className="pt-3 border-t border-border/40 space-y-1">
                        {project.metrics.map((metric, i) => (
                          <div key={i} className="text-[10px] font-mono text-emerald-500 dark:text-emerald-400 flex items-center gap-1.5">
                            <CheckCircle2 size={11} className="shrink-0" />
                            <span>{metric}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
