"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Mail,
  Send,
  FileDown,
  MapPin,
  CheckCircle2,
  AlertCircle,
  Phone,
} from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { TextReveal } from "@/components/text-reveal";
import { PERSONAL_INFO } from "@/data/portfolio-data";

const socialLinks = [
  {
    label: "GitHub",
    href: PERSONAL_INFO.github,
    icon: GitHubIcon,
  },
  {
    label: "LinkedIn",
    href: PERSONAL_INFO.linkedin,
    icon: LinkedInIcon,
  },
  {
    label: "Email",
    href: `mailto:${PERSONAL_INFO.email}`,
    icon: Mail,
  },
];

export function Contact() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    honeypot: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [status, setStatus] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: "" });

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formState),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setStatus({
          type: "success",
          message: data.message || "Message sent successfully!",
        });
        setFormState({ name: "", email: "", message: "", honeypot: "" });
      } else {
        setStatus({
          type: "error",
          message: data.message || "Failed to send message.",
        });
      }
    } catch (err) {
      console.error(err);
      setStatus({
        type: "error",
        message: "An unexpected error occurred. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="section-padding px-4 sm:px-6 lg:px-8" aria-label="Contact Section">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <div className="mb-16">
          <div className="anthropic-tag mb-3">CONTACT</div>
          <TextReveal as="h2" className="text-4xl sm:text-5xl font-serif tracking-tight mb-4">
            Get in Touch
          </TextReveal>
          <TextReveal as="p" delay={0.2} className="text-muted-foreground max-w-lg">
            I&apos;m open to software engineering, backend, and AI engineer roles. Feel free to reach out to discuss technical collaborations or opportunities.
          </TextReveal>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              {/* Honeypot field to trap spam bots */}
              <div className="hidden" aria-hidden="true">
                <input
                  type="text"
                  name="honeypot"
                  value={formState.honeypot}
                  onChange={(e) =>
                    setFormState({ ...formState, honeypot: e.target.value })
                  }
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2 text-foreground"
                >
                  Name
                </label>
                <input
                  id="name"
                  type="text"
                  required
                  value={formState.name}
                  onChange={(e) =>
                    setFormState({ ...formState, name: e.target.value })
                  }
                  className="w-full px-4 py-2.5 text-sm bg-card/50 border border-border/50 rounded-lg focus:border-foreground/30 focus:ring-1 focus:ring-foreground/10 outline-none transition-all placeholder:text-muted-foreground/50"
                  placeholder="Your name"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium mb-2 text-foreground"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={formState.email}
                  onChange={(e) =>
                    setFormState({ ...formState, email: e.target.value })
                  }
                  className="w-full px-4 py-2.5 text-sm bg-card/50 border border-border/50 rounded-lg focus:border-foreground/30 focus:ring-1 focus:ring-foreground/10 outline-none transition-all placeholder:text-muted-foreground/50"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium mb-2 text-foreground"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  className="w-full px-4 py-2.5 text-sm bg-card/50 border border-border/50 rounded-lg focus:border-foreground/30 focus:ring-1 focus:ring-foreground/10 outline-none transition-all resize-none placeholder:text-muted-foreground/50"
                  placeholder="Your message..."
                />
              </div>

              {status.message && (
                <div
                  className={`p-3 rounded-lg flex items-center gap-2 text-xs font-mono ${
                    status.type === "success"
                      ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                      : "bg-destructive/10 text-destructive border border-destructive/20"
                  }`}
                >
                  {status.type === "success" ? (
                    <CheckCircle2 size={14} className="shrink-0" />
                  ) : (
                    <AlertCircle size={14} className="shrink-0" />
                  )}
                  <span>{status.message}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="anthropic-pill bg-foreground text-background hover:opacity-90 disabled:opacity-50 flex items-center gap-2"
              >
                {isSubmitting ? (
                  "Sending Message..."
                ) : (
                  <>
                    Send Message
                    <Send size={14} />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Info & Socials */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail size={16} className="text-foreground shrink-0" />
                <a
                  href={`mailto:${PERSONAL_INFO.email}`}
                  className="hover:text-foreground transition-colors font-mono"
                >
                  {PERSONAL_INFO.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Phone size={16} className="text-foreground shrink-0" />
                <a
                  href={`tel:${PERSONAL_INFO.phone}`}
                  className="hover:text-foreground transition-colors font-mono"
                >
                  {PERSONAL_INFO.phone}
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin size={16} className="text-foreground shrink-0" />
                <span className="font-mono">{PERSONAL_INFO.location}</span>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">Connect</p>
              <div className="flex items-center gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-10 h-10 rounded-lg bg-accent/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border transition-all"
                    aria-label={link.label}
                  >
                    <link.icon className="w-[18px] h-[18px]" />
                  </a>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <a
                href={PERSONAL_INFO.resumeUrl}
                download="Sathwik_Katkam_Resume.pdf"
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-sm font-medium rounded-lg hover:bg-accent transition-colors text-foreground"
              >
                <FileDown size={16} />
                Download Resume
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
