"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Calendar, MapPin } from "lucide-react";
import { TextReveal } from "@/components/text-reveal";

const experiences = [
  {
    company: "Primesoft Solutions Pvt Ltd",
    role: "Associate Software Engineer",
    duration: "June 2025 – Present",
    location: "Hyderabad, India",
    current: true,
    projects: [
      {
        name: "Support Ticket AI Assistant",
        description:
          "Developed an AI-powered Support Ticket Assistant using Retrieval-Augmented Generation (RAG), semantic search, and vector databases to improve customer support operations.",
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
        responsibilities: [
          "Developed AI-powered support assistant using RAG architecture",
          "Implemented semantic search using FAISS vector databases",
          "Built document ingestion pipelines using LangChain and Sentence Transformers",
          "Integrated Salesforce APIs to retrieve support tickets, comments, and Chatter feeds",
          "Implemented support for OpenAI, Gemini, and Ollama-based LLMs",
          "Built authentication and feedback management features",
        ],
      },
      {
        name: "AI Email Orchestration System",
        description:
          "Developed a multi-agent AI-powered email orchestration platform that automates personalized email generation through specialized AI agents.",
        technologies: [
          "Python",
          "FastAPI",
          "React",
          "TypeScript",
          "LangChain",
          "FAISS",
          "LLM APIs",
          "AWS",
          "JWT",
          "OAuth",
        ],
        responsibilities: [
          "Developed a multi-agent email orchestration platform",
          "Implemented Planning, Generation, and Reflection agents",
          "Built a custom ReAct-based reasoning workflow",
          "Integrated JWT/OAuth authentication",
          "Integrated Gmail-based workflows",
          "Developed backend APIs and automation pipelines",
        ],
      },
      {
        name: "SmartFit – Enterprise Application",
        description:
          "Contributed to enterprise application enhancements, security remediation activities, and platform reliability improvements.",
        technologies: ["Next.js", "React", "TypeScript", "Azure", "Twilio"],
        responsibilities: [
          "Worked on enhancement activities across multiple modules",
          "Resolved Twilio SMS integration issues and OTP delivery failures",
          "Implemented CVE remediation and security hardening activities",
          "Fixed container and Next.js vulnerabilities",
          "Resolved file upload processing issues and improved stability",
          "Improved UI responsiveness and user experience",
        ],
      },
    ],
  },
  {
    company: "Venago Innovations",
    role: "Python Developer Intern",
    duration: "June 2024 – September 2024",
    location: "Hyderabad, India",
    current: false,
    projects: [
      {
        name: "Cloud-Native Services",
        description:
          "Developed Python-based cloud services and REST APIs using modern serverless architectures.",
        technologies: [
          "Python",
          "Flask",
          "AWS Lambda",
          "API Gateway",
          "DynamoDB",
        ],
        responsibilities: [
          "Developed Python-based services using Flask",
          "Built REST APIs for cloud applications",
          "Worked with AWS Lambda and API Gateway",
          "Used DynamoDB for cloud-native data solutions",
        ],
      },
    ],
  },
];

export function Experience() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="section-padding px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <div className="mb-16">
          <TextReveal as="h2" className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Experience
          </TextReveal>
          <TextReveal delay={0.1}>
            <div className="w-12 h-[2px] bg-foreground/20" />
          </TextReveal>
        </div>

        <div className="space-y-12">
          {experiences.map((exp, expIndex) => (
            <motion.div
              key={exp.company}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: expIndex * 0.15 }}
            >
              {/* Company Header */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-accent/50 border border-border/50 flex items-center justify-center">
                    <Briefcase size={18} className="text-muted-foreground" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{exp.company}</h3>
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

              {/* Projects */}
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 ml-0 sm:ml-[52px]">
                {exp.projects.map((project, projIndex) => (
                  <motion.div
                    key={project.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{
                      duration: 0.4,
                      delay: 0.3 + expIndex * 0.15 + projIndex * 0.1,
                    }}
                    whileHover={{ y: -4, transition: { duration: 0.2 } }}
                    className="card-glow p-5 rounded-xl border border-border/50 bg-card/50 backdrop-blur-sm hover:border-border hover:bg-card/80 transition-all group"
                  >
                    <h4 className="text-sm font-semibold mb-2 group-hover:text-foreground">
                      {project.name}
                    </h4>
                    <p className="text-xs text-muted-foreground mb-4 line-clamp-3">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {project.technologies.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="px-2 py-0.5 text-[10px] font-medium text-muted-foreground bg-accent/50 border border-border/30 rounded-md"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 5 && (
                        <span className="px-2 py-0.5 text-[10px] font-medium text-muted-foreground bg-accent/50 border border-border/30 rounded-md">
                          +{project.technologies.length - 5}
                        </span>
                      )}
                    </div>
                    <ul className="space-y-1.5">
                      {project.responsibilities.slice(0, 3).map((resp, i) => (
                        <li
                          key={i}
                          className="text-[11px] text-muted-foreground flex items-start gap-2"
                        >
                          <span className="w-1 h-1 rounded-full bg-muted-foreground/50 mt-1.5 shrink-0" />
                          {resp}
                        </li>
                      ))}
                    </ul>
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
