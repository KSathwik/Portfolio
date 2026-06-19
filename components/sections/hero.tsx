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
              className="mb-5"
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
              className="text-4xl sm:text-5xl md:text-6xl lg:text-6xl font-bold tracking-tight mb-3"
            >
              Sathwik Katkam
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="h-8 sm:h-9 mb-5"
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
              className="text-base sm:text-lg text-muted-foreground max-w-xl mb-8 leading-relaxed"
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
              className="flex flex-wrap items-center gap-3 mb-10"
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
