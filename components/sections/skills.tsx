"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Server,
  Brain,
  Monitor,
  Cloud,
  Shield,
  Wrench,
} from "lucide-react";
import { TextReveal } from "@/components/text-reveal";

const skillCategories = [
  {
    title: "Programming",
    icon: Server,
    skills: ["Python", "SQL"],
  },
  {
    title: "Backend Development",
    icon: Server,
    skills: ["FastAPI", "Flask", "REST APIs", "JWT/OAuth", "API Integration"],
  },
  {
    title: "Generative AI & LLMs",
    icon: Brain,
    skills: [
      "RAG",
      "LangChain",
      "FAISS",
      "Semantic Search",
      "Prompt Engineering",
      "OpenAI",
      "Gemini",
      "Ollama",
      "Multi-Agent Systems",
    ],
  },
  {
    title: "Frontend",
    icon: Monitor,
    skills: ["React.js", "Next.js", "TypeScript"],
  },
  {
    title: "Cloud & Enterprise",
    icon: Cloud,
    skills: ["Azure", "Salesforce", "AWS Lambda", "API Gateway", "DynamoDB", "Twilio"],
  },
  {
    title: "Data & AI",
    icon: Brain,
    skills: ["Machine Learning", "Data Preprocessing", "Feature Engineering", "Model Evaluation"],
  },
  {
    title: "Security",
    icon: Shield,
    skills: ["CVE Remediation", "Vulnerability Management", "Secure API Design"],
  },
  {
    title: "Tools & Version Control",
    icon: Wrench,
    skills: ["Git", "Bitbucket", "Postman", "Jupyter Notebook"],
  },
];

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="section-padding px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <div className="mb-16">
          <TextReveal as="h2" className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Skills &amp; Technologies
          </TextReveal>
          <TextReveal delay={0.1}>
            <div className="w-12 h-[2px] bg-foreground/20" />
          </TextReveal>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => (
            <motion.div
              key={category.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.08 }}
              whileHover={{ y: -4, transition: { duration: 0.2 } }}
              className="card-glow p-6 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-border hover:bg-card/80 transition-all group"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="w-9 h-9 rounded-lg bg-accent/50 border border-border/50 flex items-center justify-center group-hover:border-border transition-colors">
                  <category.icon
                    size={16}
                    className="text-muted-foreground group-hover:text-foreground transition-colors"
                  />
                </div>
                <h3 className="text-sm font-semibold">{category.title}</h3>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {category.skills.map((skill) => (
                  <motion.span
                    key={skill}
                    whileHover={{ scale: 1.05 }}
                    className="px-2.5 py-1 text-xs text-muted-foreground bg-accent/50 border border-border/30 rounded-md hover:border-border hover:text-foreground transition-all cursor-default"
                  >
                    {skill}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
