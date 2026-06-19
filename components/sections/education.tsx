"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, Calendar } from "lucide-react";

const educationData = [
  {
    degree: "Bachelor of Technology (B.Tech)",
    field: "Computer Science & Engineering – Data Science",
    institution: "ACE Engineering College, Hyderabad",
    duration: "2020 – 2024",
    score: "CGPA: 8.33",
  },
  {
    degree: "Intermediate",
    field: "MPC",
    institution: "SR Junior College, Hyderabad",
    duration: "2018 – 2020",
    score: "89%",
  },
  {
    degree: "SSC",
    field: "",
    institution: "Panchavati Vidyalaya, Mahabubnagar",
    duration: "2017 – 2018",
    score: "95%",
  },
];

export function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="section-padding px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Education
          </h2>
          <div className="w-12 h-[2px] bg-foreground/20" />
        </motion.div>

        <div className="space-y-4 max-w-2xl">
          {educationData.map((edu, index) => (
            <motion.div
              key={edu.degree}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + index * 0.1 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="card-glow p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-border hover:bg-card/80 transition-all"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-lg bg-accent/50 border border-border/50 flex items-center justify-center shrink-0">
                  <GraduationCap size={20} className="text-muted-foreground" />
                </div>
                <div className="space-y-2">
                  <h3 className="text-base font-semibold">{edu.degree}</h3>
                  {edu.field && (
                    <p className="text-sm text-muted-foreground">{edu.field}</p>
                  )}
                  <p className="text-sm text-muted-foreground">
                    {edu.institution}
                  </p>
                  <div className="flex items-center gap-4 pt-2">
                    <span className="flex items-center gap-1.5 text-xs text-muted-foreground">
                      <Calendar size={12} />
                      {edu.duration}
                    </span>
                    <span className="px-2.5 py-1 text-xs font-medium text-foreground bg-accent border border-border/50 rounded-md">
                      {edu.score}
                    </span>
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
