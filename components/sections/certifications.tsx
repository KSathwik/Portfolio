"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Award } from "lucide-react";

const certifications = [
  {
    title: "Agentic AI",
    issuer: "DeepLearning.AI – Andrew Ng",
    status: "Completed",
    inProgress: false,
    highlights: [
      "Reflection, Tool Use, Planning & Multi-Agent Workflows",
      "AI integration with databases, APIs & web search",
      "Production deployment & evaluation",
    ],
  },
  {
    title: "IBM Generative AI Engineering Professional Certificate",
    issuer: "IBM – Coursera",
    status: "Completed",
    inProgress: false,
  },
];

export function Certifications() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="certifications"
      className="section-padding px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Certifications
          </h2>
          <div className="w-12 h-[2px] bg-foreground/20" />
        </motion.div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert, index) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="card-glow p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-border hover:bg-card/80 transition-all group"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-10 h-10 rounded-lg bg-accent/50 border border-border/50 flex items-center justify-center">
                  <Award
                    size={18}
                    className="text-muted-foreground group-hover:text-foreground transition-colors"
                  />
                </div>
                {cert.inProgress ? (
                  <span className="px-2.5 py-1 text-[10px] font-medium text-amber-500 bg-amber-500/10 border border-amber-500/20 rounded-full">
                    In Progress
                  </span>
                ) : (
                  <span className="px-2.5 py-1 text-[10px] font-medium text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                    Completed
                  </span>
                )}
              </div>
              <h3 className="text-sm font-semibold mb-1">{cert.title}</h3>
              <p className="text-xs text-muted-foreground mb-3">{cert.issuer}</p>
              {"highlights" in cert && cert.highlights && (
                <ul className="space-y-1.5">
                  {cert.highlights.map((item, i) => (
                    <li
                      key={i}
                      className="text-[11px] text-muted-foreground flex items-start gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-muted-foreground/50 mt-1.5 shrink-0" />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
