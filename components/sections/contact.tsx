"use client";

import { useState } from "react";
import { CircleCheck, CircleAlert, Copy, Check } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolio-data";
import { ResumeDownload, ResumeView } from "@/components/resume-viewer";

const socialLinks = [
  {
    label: "GitHub",
    href: PERSONAL_INFO.github,
  },
  {
    label: "LinkedIn",
    href: PERSONAL_INFO.linkedin,
  },
];

export function Contact() {
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
  const [copied, setCopied] = useState(false);
  /* Only the API's own validation errors mark fields invalid; network and server failures do not. */
  const [hasFieldErrors, setHasFieldErrors] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText(PERSONAL_INFO.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: null, message: "" });
    setHasFieldErrors(false);

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
        setHasFieldErrors(response.status === 400 || response.status === 422);
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

  const isInvalid = hasFieldErrors ? true : undefined;

  return (
    <section id="contact" aria-labelledby="contact-title" className="section">
      <div className="wrap">
        <div className="section-head">
          <span className="section-mark">07 Contact</span>
          <h2 id="contact-title" className="kicker-title">Let&apos;s build something</h2>
          <p>
            I&apos;m open to software engineering, backend, and AI engineer roles. Feel free to
            reach out to discuss technical collaborations or opportunities.
          </p>
        </div>

        <div className="grid gap-x-[var(--gap-columns)] gap-y-12 lg:grid-cols-12">
          {/* Direct contact first */}
          <div className="flex flex-col gap-8 lg:col-span-5">
            <div className="flex flex-col gap-3">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="link w-fit break-all font-display text-[length:var(--text-xl)] font-medium tracking-[var(--tracking-display)] sm:text-[length:var(--text-2xl)]"
              >
                {PERSONAL_INFO.email}
              </a>
              <button
                type="button"
                onClick={copyEmail}
                className="btn btn--sm w-fit"
              >
                {copied ? (
                  <>
                    <Check size={14} aria-hidden="true" className="text-success" />
                    Copied
                  </>
                ) : (
                  <>
                    <Copy size={14} aria-hidden="true" />
                    Copy email
                  </>
                )}
              </button>
              <span className="visually-hidden" aria-live="polite">
                {copied ? "Email address copied" : ""}
              </span>
            </div>

            <dl className="rows m-0 border-y border-rule">
              <div className="grid grid-cols-[6rem_minmax(0,1fr)] gap-4 py-3">
                <dt className="label">Phone</dt>
                <dd className="m-0">
                  <a href={`tel:${PERSONAL_INFO.phone.replace(/\s+/g, "")}`} className="link font-mono text-sm">
                    {PERSONAL_INFO.phone}
                  </a>
                </dd>
              </div>
              <div className="grid grid-cols-[6rem_minmax(0,1fr)] gap-4 py-3">
                <dt className="label">Location</dt>
                <dd className="m-0 text-ink-2">{PERSONAL_INFO.location}</dd>
              </div>
              <div className="grid grid-cols-[6rem_minmax(0,1fr)] gap-4 py-3">
                <dt className="label">Elsewhere</dt>
                <dd className="m-0 flex flex-wrap gap-x-5 gap-y-1">
                  {socialLinks.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link"
                    >
                      {link.label}
                    </a>
                  ))}
                </dd>
              </div>
            </dl>

            <div className="flex flex-wrap gap-3">
              <ResumeDownload className="btn" />
              <ResumeView className="btn btn--ghost" />
            </div>
          </div>

          {/* The form second */}
          <div className="cut cut--raised p-6 sm:p-8 lg:col-span-7">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
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

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="label">
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    autoComplete="name"
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                    disabled={isSubmitting}
                    aria-invalid={isInvalid}
                    className="input"
                    placeholder="Your name"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="label">
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    autoComplete="email"
                    value={formState.email}
                    onChange={(e) =>
                      setFormState({ ...formState, email: e.target.value })
                    }
                    disabled={isSubmitting}
                    aria-invalid={isInvalid}
                    className="input"
                    placeholder="your@email.com"
                  />
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="label">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formState.message}
                  onChange={(e) =>
                    setFormState({ ...formState, message: e.target.value })
                  }
                  disabled={isSubmitting}
                  aria-invalid={isInvalid}
                  aria-describedby="contact-status"
                  className="input resize-y"
                  placeholder="Your message..."
                />
              </div>

              <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className="btn btn--primary"
                >
                  {isSubmitting ? "Sending…" : "Send message"}
                </button>

                <p
                  id="contact-status"
                  role="status"
                  aria-live="polite"
                  className={`flex items-center gap-2 text-sm ${
                    status.type === "success" ? "text-success" : "text-error"
                  }`}
                >
                  {status.message && (
                    <>
                      {status.type === "success" ? (
                        <CircleCheck size={16} aria-hidden="true" className="shrink-0" />
                      ) : (
                        <CircleAlert size={16} aria-hidden="true" className="shrink-0" />
                      )}
                      <span>{status.message}</span>
                    </>
                  )}
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
