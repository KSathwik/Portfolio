"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import {
  Mail,
  Send,
  FileDown,
  MapPin,
} from "lucide-react";
import { GitHubIcon, LinkedInIcon } from "@/components/icons";
import { TextReveal } from "@/components/text-reveal";

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/KSathwik",
    icon: GitHubIcon,
  },
  {
    label: "LinkedIn",
    href: "https://linkedin.com/in/katkam-sathwik-5b5285202",
    icon: LinkedInIcon,
  },
  {
    label: "Email",
    href: "mailto:sathwikkatkam@gmail.com",
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
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setIsSubmitting(false);
    setSubmitted(true);
    setFormState({ name: "", email: "", message: "" });
    setTimeout(() => setSubmitted(false), 3000);
  };

  return (
    <section id="contact" className="section-padding px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto" ref={ref}>
        <div className="mb-16">
          <TextReveal as="h2" className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Get in Touch
          </TextReveal>
          <TextReveal delay={0.1}>
            <div className="w-12 h-[2px] bg-foreground/20 mb-4" />
          </TextReveal>
          <TextReveal as="p" delay={0.2} className="text-muted-foreground max-w-lg">
            I&apos;m open to new opportunities and collaborations. Feel free to
            reach out if you&apos;d like to discuss a project or just connect.
          </TextReveal>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium mb-2"
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
                  className="block text-sm font-medium mb-2"
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
                  className="block text-sm font-medium mb-2"
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
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-foreground text-background text-sm font-medium rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
              >
                {isSubmitting ? (
                  "Sending..."
                ) : submitted ? (
                  "Message Sent!"
                ) : (
                  <>
                    Send Message
                    <Send size={14} />
                  </>
                )}
              </button>
            </form>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail size={16} />
                <a
                  href="mailto:sathwikkatkam@gmail.com"
                  className="hover:text-foreground transition-colors"
                >
                  sathwikkatkam@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <Mail size={16} />
                <a
                  href="tel:+916304651393"
                  className="hover:text-foreground transition-colors"
                >
                  +91 6304651393
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <MapPin size={16} />
                <span>Hyderabad, India</span>
              </div>
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium">Connect</p>
              <div className="flex items-center gap-3">
                {socialLinks.map((link) => (
                  <motion.a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ y: -2 }}
                    className="w-10 h-10 rounded-lg bg-accent/50 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground hover:border-border transition-all"
                    aria-label={link.label}
                  >
                    <link.icon className="w-[18px] h-[18px]" />
                  </motion.a>
                ))}
              </div>
            </div>

            <div className="pt-4">
              <a
                href="/resume.pdf"
                download
                className="inline-flex items-center gap-2 px-5 py-2.5 border border-border text-sm font-medium rounded-lg hover:bg-accent transition-colors"
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
