"use client";

import { motion } from "framer-motion";
import { ArrowDown, FileDown, Mail } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";

const techBadges = [
  "Python",
  "FastAPI",
  "LangChain",
  "FAISS",
  "React",
  "Next.js",
  "Azure",
  "AWS",
  "Salesforce",
];

const roles = [
  "Associate Software Engineer",
  "Backend Developer",
  "AI Engineer",
];

export function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const role = roles[currentRole];
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          if (displayText.length < role.length) {
            setDisplayText(role.slice(0, displayText.length + 1));
          } else {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          if (displayText.length > 0) {
            setDisplayText(displayText.slice(0, -1));
          } else {
            setIsDeleting(false);
            setCurrentRole((prev) => (prev + 1) % roles.length);
          }
        }
      },
      isDeleting ? 40 : 80
    );
    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentRole]);

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Background gradient */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-6 flex justify-center"
        >
          <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 border-border/50 shadow-lg">
            <Image
              src="https://github.com/KSathwik.png"
              alt="Sathwik Katkam"
              fill
              className="object-cover"
              priority
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-6"
        >
          <span className="inline-flex items-center gap-2 px-3 py-1 text-xs font-medium text-muted-foreground bg-accent/50 border border-border/50 rounded-full">
            <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
            Available for opportunities
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-4"
        >
          Sathwik Katkam
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="h-8 sm:h-10 mb-6"
        >
          <span className="text-lg sm:text-xl md:text-2xl text-muted-foreground font-light">
            {displayText}
            <span className="animate-pulse">|</span>
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto mb-8 leading-relaxed"
        >
          Backend Developer specializing in Generative AI, Retrieval-Augmented
          Generation (RAG), and Enterprise Application Development. Building
          AI-powered applications, scalable backend systems, and intelligent
          automation solutions.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background text-sm font-medium rounded-lg hover:opacity-90 transition-opacity"
          >
            View Projects
            <ArrowDown size={16} />
          </a>
          <a
            href="/resume.pdf"
            download
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-sm font-medium rounded-lg hover:bg-accent transition-colors"
          >
            <FileDown size={16} />
            Download Resume
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-sm font-medium rounded-lg hover:bg-accent transition-colors"
          >
            <Mail size={16} />
            Contact Me
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="flex flex-wrap items-center justify-center gap-2"
        >
          {techBadges.map((badge, index) => (
            <motion.span
              key={badge}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
              whileHover={{ scale: 1.05, y: -2 }}
              className="px-3 py-1.5 text-xs font-medium text-muted-foreground bg-accent/50 border border-border/50 rounded-full hover:border-border hover:text-foreground transition-all cursor-default"
            >
              {badge}
            </motion.span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
