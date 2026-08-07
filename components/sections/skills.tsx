"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Server,
  Brain,
  Monitor,
  Cloud,
  Shield,
  Database,
} from "lucide-react";
import { TextReveal } from "@/components/text-reveal";
import { SKILL_CATEGORIES } from "@/data/portfolio-data";

const iconMap: Record<string, typeof Server> = {
  Brain,
  Server,
  Monitor,
  Cloud,
  Database,
  Shield,
};

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding px-4 sm:px-6 lg:px-8" aria-label="Skills & Technologies Section">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <div className="mb-16">
          <div className="anthropic-tag mb-3">SKILLS</div>
          <TextReveal as="h2" className="text-4xl sm:text-5xl font-serif tracking-tight mb-4">
            Skills &amp; Technologies
          </TextReveal>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {SKILL_CATEGORIES.map((category, index) => {
            const IconComponent = iconMap[category.icon] || Server;
            return (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="card-glow p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-border hover:bg-card/80 transition-all group"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-lg bg-accent/50 border border-border/50 flex items-center justify-center group-hover:border-border transition-colors">
                    <IconComponent
                      size={16}
                      className="text-muted-foreground group-hover:text-foreground transition-colors"
                    />
                  </div>
                  <h3 className="text-sm font-semibold text-foreground">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <span
                      key={skill}
                      className="px-2.5 py-1 text-xs text-muted-foreground bg-accent/50 border border-border/30 rounded-md hover:border-border hover:text-foreground transition-all cursor-default font-mono"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
