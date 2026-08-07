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
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden pt-20"
    >
      {/* Hero-specific radial glow */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-violet-500/[0.08] via-blue-500/[0.04] to-transparent rounded-full blur-3xl dark:from-violet-500/[0.06] dark:via-blue-500/[0.03]" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-indigo-500/[0.06] via-purple-500/[0.03] to-transparent rounded-full blur-3xl dark:from-indigo-500/[0.04] dark:via-purple-500/[0.02]" />
      </div>

      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Left: Text Content */}
          <div className="flex-1 order-2 lg:order-1">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mb-6"
            >
              <span className="anthropic-tag inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/80 border border-border">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                ASSOCIATE SOFTWARE ENGINEER
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-5xl sm:text-6xl md:text-7xl lg:text-7xl font-serif tracking-tight mb-4 text-foreground"
            >
              Building intelligent, reliable AI systems.
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="h-8 sm:h-9 mb-6 font-mono text-xs uppercase tracking-widest text-muted-foreground"
            >
              <span>Sathwik Katkam — </span>
              <span>{displayText}</span>
              <span className="animate-pulse">_</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="text-base sm:text-lg text-muted-foreground max-w-xl mb-10 leading-relaxed font-sans"
            >
              Specializing in Generative AI, Retrieval-Augmented Generation (RAG), and Enterprise Platform Engineering. Crafting autonomous agents, scalable backends, and multi-provider LLM applications.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="flex flex-wrap items-center gap-3.5 mb-10"
            >
              <a
                href="#projects"
                className="anthropic-pill bg-foreground text-background hover:opacity-90 shadow-sm"
              >
                Explore Projects
                <ArrowDown size={14} className="ml-2 inline" />
              </a>
              <a
                href="/resume.pdf"
                download
                className="anthropic-pill bg-secondary text-foreground hover:bg-muted border border-border"
              >
                <FileDown size={14} className="mr-2 inline" />
                Resume
              </a>
              <a
                href="#contact"
                className="anthropic-pill bg-secondary text-foreground hover:bg-muted border border-border"
              >
                <Mail size={14} className="mr-2 inline" />
                Contact
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="flex flex-wrap items-center gap-2"
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

          {/* Right: Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9, x: 20 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="order-1 lg:order-2 shrink-0"
          >
            <div className="relative flex items-center justify-center">
              {/* Decorative rings */}
              <div className="absolute -inset-5 rounded-full border border-border/20 dark:border-border/10" />
              <div className="absolute -inset-10 rounded-full border border-border/10 dark:border-border/5" />
              <div className="absolute -inset-16 rounded-full border border-border/[0.06] dark:border-border/[0.03] hidden sm:block" />

              {/* Gradient glow behind image */}
              <div className="absolute -inset-6 bg-gradient-to-br from-violet-500/15 via-blue-500/10 to-indigo-500/15 rounded-full blur-2xl dark:from-violet-500/10 dark:via-blue-500/5 dark:to-indigo-500/10" />

              {/* Profile image with animated ring */}
              <div className="profile-ring rounded-full relative z-10">
                <div className="relative w-44 h-44 sm:w-52 sm:h-52 lg:w-60 lg:h-60 rounded-full overflow-hidden bg-background">
                  <Image
                    src="https://github.com/KSathwik.png"
                    alt="Sathwik Katkam"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>

              {/* Floating accent dots */}
              <motion.div
                animate={{ y: [-6, 6, -6] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-3 -right-3 w-3 h-3 rounded-full bg-violet-500/50 blur-[2px]"
              />
              <motion.div
                animate={{ y: [6, -6, 6] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -bottom-3 -left-3 w-2.5 h-2.5 rounded-full bg-blue-500/50 blur-[2px]"
              />
              <motion.div
                animate={{ x: [-4, 4, -4] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-1/2 -right-6 w-2 h-2 rounded-full bg-indigo-500/40 blur-[1px]"
              />
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden lg:flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-5 h-8 rounded-full border border-border/50 flex items-start justify-center p-1.5"
        >
          <div className="w-1 h-1.5 rounded-full bg-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}
