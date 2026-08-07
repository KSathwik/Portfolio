"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Calendar } from "lucide-react";
import { EDUCATION_DATA } from "@/data/portfolio-data";

export function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="section-padding px-4 sm:px-6 lg:px-8" aria-label="Education Section">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="mb-16"
        >
          <div className="anthropic-tag mb-3">EDUCATION</div>
          <h2 className="text-4xl sm:text-5xl font-serif tracking-tight mb-4">
            Academic Background
          </h2>
        </motion.div>

        <div className="space-y-4 max-w-3xl">
          {EDUCATION_DATA.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              whileHover={{ y: -3, transition: { duration: 0.2 } }}
              className="card-glow p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-border hover:bg-card/80 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/50 border border-border/50 flex items-center justify-center shrink-0">
                  <GraduationCap size={20} className="text-muted-foreground" />
                </div>
                <div className="space-y-1.5 flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
                    <h3 className="text-base font-semibold text-foreground">{edu.degree}</h3>
                    <span className="px-2.5 py-0.5 text-xs font-mono font-medium text-foreground bg-accent border border-border/50 rounded-md w-fit">
                      {edu.score}
                    </span>
                  </div>
                  {edu.field && (
                    <p className="text-xs sm:text-sm text-muted-foreground">{edu.field}</p>
                  )}
                  <p className="text-xs text-muted-foreground">
                    {edu.institution}
                  </p>
                  <div className="flex items-center gap-1.5 pt-1 text-xs text-muted-foreground font-mono">
                    <Calendar size={12} />
                    <span>{edu.duration}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
