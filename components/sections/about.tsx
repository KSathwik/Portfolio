"use client";

import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Code2, Brain, Server, Shield } from "lucide-react";

const highlights = [
  {
    icon: Server,
    title: "Backend Development",
    description: "Python, FastAPI, Flask, REST APIs",
  },
  {
    icon: Brain,
    title: "Generative AI",
    description: "RAG, LangChain, Multi-Agent Systems",
  },
  {
    icon: Code2,
    title: "Full Stack",
    description: "React, Next.js, TypeScript",
  },
  {
    icon: Shield,
    title: "Cloud & Security",
    description: "Azure, AWS, CVE Remediation",
  },
];

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="section-padding px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            About Me
          </h2>
          <div className="w-12 h-[2px] bg-foreground/20" />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="space-y-5"
          >
            <p className="text-muted-foreground leading-relaxed">
              Associate Software Engineer with 1 year of experience in backend
              development, Generative AI, and enterprise application development.
              Experienced in building AI-powered solutions using
              Retrieval-Augmented Generation (RAG), semantic search, vector
              databases, Salesforce integrations, and multi-agent AI workflows.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Skilled in Python, FastAPI, LangChain, FAISS, React, Azure, and
              modern software development practices. My work includes developing
              an AI-powered Support Ticket Assistant and building a multi-agent
              AI Email Orchestration System.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Passionate about backend engineering, cloud technologies,
              application security, and building scalable AI-driven solutions.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-4"
          >
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + index * 0.1 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="card-glow p-5 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-border hover:bg-card/80 transition-all"
              >
                <item.icon className="w-5 h-5 text-muted-foreground mb-3" />
                <h3 className="text-sm font-medium mb-1">{item.title}</h3>
                <p className="text-xs text-muted-foreground">
                  {item.description}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
