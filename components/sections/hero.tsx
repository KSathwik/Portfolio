"use client";

import { motion } from "framer-motion";
import { ArrowDown, FileDown, Check, Copy } from "lucide-react";
import { useEffect, useState } from "react";
import Image from "next/image";
import { PERSONAL_INFO } from "@/data/portfolio-data";

const techBadges = [
  "Python",
  "FastAPI",
  "LangChain",
  "FAISS",
  "BM25",
  "React",
  "Next.js",
  "Azure",
  "AWS",
];

export function Hero() {
  const [currentRole, setCurrentRole] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [copied, setCopied] = useState(false);

  const roles = PERSONAL_INFO.roles;

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
  }, [displayText, isDeleting, currentRole, roles]);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden pt-20"
      aria-label="Hero Introduction"
    >
      {/* Background Radial Ambient Glow */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-violet-500/[0.08] via-blue-500/[0.04] to-transparent rounded-full blur-3xl dark:from-violet-500/[0.06] dark:via-blue-500/[0.03]" />
        <div className="absolute bottom-1/4 left-0 w-[400px] h-[400px] bg-gradient-to-tr from-indigo-500/[0.06] via-purple-500/[0.03] to-transparent rounded-full blur-3xl dark:from-indigo-500/[0.04] dark:via-purple-500/[0.02]" />
      </div>

      <div className="max-w-6xl mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
          {/* Left Column: Bio & Calls to Action */}
          <div className="flex-1 order-2 lg:order-1 text-center lg:text-left">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="mb-4"
            >
              <span className="anthropic-tag inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-secondary/80 border border-border">
                <span className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse" />
                ASSOCIATE SOFTWARE ENGINEER
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="text-4xl sm:text-6xl lg:text-7xl font-serif tracking-tight mb-4 text-foreground"
            >
              {PERSONAL_INFO.name}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="h-8 mb-6 font-mono text-xs sm:text-sm uppercase tracking-widest text-muted-foreground flex items-center justify-center lg:justify-start"
            >
              <span>Focus — </span>
              <span className="ml-2 text-foreground font-semibold">{displayText}</span>
              <span className="animate-pulse">_</span>
            </motion.div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="text-sm sm:text-base text-muted-foreground max-w-xl mb-8 leading-relaxed font-sans mx-auto lg:mx-0"
            >
              {PERSONAL_INFO.bio}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-3 mb-10"
            >
              <a
                href="#projects"
                className="anthropic-pill bg-foreground text-background hover:opacity-90 shadow-sm"
              >
                Explore Projects
                <ArrowDown size={14} className="ml-2 inline" />
              </a>
              <a
                href={PERSONAL_INFO.resumeUrl}
                download="Sathwik_Katkam_Resume.pdf"
                className="anthropic-pill bg-secondary text-foreground hover:bg-muted border border-border"
              >
                <FileDown size={14} className="mr-2 inline" />
                Resume
              </a>
              <button
                onClick={copyEmail}
                className="anthropic-pill bg-secondary text-foreground hover:bg-muted border border-border"
                aria-label="Copy Email"
              >
                {copied ? (
                  <>
                    <Check size={14} className="mr-2 inline text-emerald-500" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy size={14} className="mr-2 inline" />
                    Copy Email
                  </>
                )}
              </button>
            </motion.div>

            {/* Tech Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              className="flex flex-wrap items-center justify-center lg:justify-start gap-2"
            >
              {techBadges.map((badge, index) => (
                <motion.span
                  key={badge}
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3, delay: 0.6 + index * 0.04 }}
                  whileHover={{ scale: 1.05, y: -2 }}
                  className="px-3 py-1.5 text-xs font-medium text-muted-foreground bg-accent/50 border border-border/50 rounded-full hover:border-border hover:text-foreground transition-all cursor-default"
                >
                  {badge}
                </motion.span>
              ))}
            </motion.div>
          </div>

          {/* Right Column: Profile Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="order-1 lg:order-2 shrink-0"
          >
            <div className="relative flex items-center justify-center">
              <div className="absolute -inset-4 rounded-full border border-border/20 dark:border-border/10" aria-hidden="true" />
              <div className="absolute -inset-8 rounded-full border border-border/10 dark:border-border/5 hidden sm:block" aria-hidden="true" />
              <div className="absolute -inset-6 bg-gradient-to-br from-violet-500/15 via-blue-500/10 to-indigo-500/15 rounded-full blur-2xl dark:from-violet-500/10 dark:via-blue-500/5 dark:to-indigo-500/10" aria-hidden="true" />

              <div className="profile-ring rounded-full relative z-10">
                <div className="relative w-40 h-40 sm:w-52 sm:h-52 lg:w-60 lg:h-60 rounded-full overflow-hidden bg-background">
                  <Image
                    src="https://github.com/KSathwik.png"
                    alt="Sathwik Katkam Profile Avatar"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
