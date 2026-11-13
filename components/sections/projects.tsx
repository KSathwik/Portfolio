"use client";

import { useState, useEffect, useRef, useId, Fragment } from "react";
import { X, ArrowUpRight } from "lucide-react";
import { RetrievalField } from "@/components/retrieval-field";
import { GitHubIcon } from "@/components/icons";
import { PROJECTS_DATA } from "@/data/portfolio-data";
import { Project } from "@/types/portfolio";

const FEATURED_ID = "ai-knowledge-assistant";

/* Figures inside a metric sentence (250ms, 94.2%, 50,000+, <0.1%, 3x) are machine values: set them in mono, keep the sentence exactly. */
const FIGURE = /(<?\d[\d,.]*(?:\+|%|ms|x)?)/g;
function MetricLine({ text }: { text: string }) {
  const parts = text.split(FIGURE);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <span key={i} className="font-mono font-medium text-signal">
            {part}
          </span>
        ) : (
          <Fragment key={i}>{part}</Fragment>
        )
      )}
    </>
  );
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const titleId = useId();

  const featured = PROJECTS_DATA.find((p) => p.id === FEATURED_ID);
  const others = PROJECTS_DATA.filter((p) => p.id !== FEATURED_ID);

  const openProject = (project: Project) => {
    triggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setSelectedProject(project);
  };

  const closeDialog = () => dialogRef.current?.close();

  /* Open the native modal once its content is rendered; Escape and close() both fire onClose. */
  useEffect(() => {
    const dialog = dialogRef.current;
    if (selectedProject && dialog && !dialog.open) {
      dialog.showModal();
      /* React's autoFocus runs before showModal(), so move focus explicitly once the modal is open. */
      closeButtonRef.current?.focus();
    }
  }, [selectedProject]);

  const handleClose = () => {
    setSelectedProject(null);
    const trigger = triggerRef.current;
    triggerRef.current = null;
    trigger?.focus();
  };

  return (
    <section id="projects" aria-labelledby="projects-title" className="section section--tint">
      <div className="wrap">
        <div className="section-head">
          <span className="section-mark">02 Projects</span>
          <h2 id="projects-title" className="kicker-title">Things I&apos;ve built</h2>
          <p>
            Production work and personal projects across retrieval, agents and enterprise
            platforms. Open any project for its architecture and results.
          </p>
        </div>

        {featured && (
          <article className="card featured reveal mb-6">
            <div className="featured-visual">
              <RetrievalField className="h-[260px] sm:h-[340px] lg:h-full lg:min-h-[440px]" />
            </div>
            <div className="flex flex-col gap-6 p-6 sm:p-10">
              <div className="flex flex-wrap items-center gap-2">
                <span className="tag">{featured.category}</span>
              </div>
              <div className="grid gap-3">
                <h3 className="text-[length:var(--text-3xl)] leading-[1.05] font-medium">{featured.title}</h3>
                <p className="text-ink-2">{featured.description}</p>
              </div>
              {featured.metrics && (
                <ul className="grid gap-2 border-y border-rule py-4 text-sm text-ink-2">
                  {featured.metrics.map((m) => (
                    <li key={m}>
                      <MetricLine text={m} />
                    </li>
                  ))}
                </ul>
              )}
              <div className="flex flex-wrap gap-1.5">
                {featured.technologies.slice(0, 4).map((tech) => (
                  <span key={tech} className="tag">
                    {tech}
                  </span>
                ))}
              </div>
              <div className="mt-auto flex flex-wrap items-center gap-3 pt-2">
                <button
                  type="button"
                  className="btn"
                  onClick={() => openProject(featured)}
                  aria-label={`Read the case study for ${featured.title}`}
                >
                  Read the case study
                  <ArrowUpRight size={16} aria-hidden="true" />
                </button>
                <a href={featured.repoUrl} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
                  <GitHubIcon className="h-4 w-4" />
                  Source
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              </div>
            </div>
          </article>
        )}

        <ul className="m-0 grid list-none gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
          {others.map((project) => (
            <li key={project.id} className="reveal">
              <article className="card card--lift relative flex h-full flex-col gap-5 p-6 sm:p-7">
                <div className="flex items-center justify-between gap-3">
                  <span className="tag">{project.category}</span>
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn--icon btn--ghost relative z-[1] -mr-2 -mt-2"
                    aria-label={`${project.title} source on GitHub (opens in a new tab)`}
                  >
                    <GitHubIcon className="h-4 w-4" />
                  </a>
                </div>
                <div className="grid gap-2">
                  <h3 className="text-[length:var(--text-title)] leading-[1.15] font-medium">{project.title}</h3>
                  <p className="text-sm text-ink-2">{project.description}</p>
                </div>
                {project.metrics?.[0] && (
                  <p className="border-l-2 border-clay pl-3 text-sm text-ink-2">
                    <MetricLine text={project.metrics[0]} />
                  </p>
                )}
                <div className="mt-auto flex flex-wrap gap-1.5">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <span key={tech} className="tag">
                      {tech}
                    </span>
                  ))}
                </div>
                {/* The pseudo-element stretches over the card, so the whole card opens the details. */}
                <button
                  type="button"
                  className="link inline-flex w-fit cursor-pointer items-center gap-1 text-sm font-medium after:absolute after:inset-0 after:rounded-[var(--radius-card)] after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-solid focus-visible:after:outline-[color:var(--color-focus)]"
                  onClick={() => openProject(project)}
                  aria-label={`View details for ${project.title}`}
                >
                  View details
                  <ArrowUpRight size={14} aria-hidden="true" />
                </button>
              </article>
            </li>
          ))}
        </ul>
      </div>

      {/* Project detail modal: native dialog gives focus trapping, Escape and the backdrop. */}
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        onClose={handleClose}
        onClick={(e) => {
          if (e.target === e.currentTarget) closeDialog();
        }}
        className="dialog w-[min(42rem,calc(100vw-32px))] max-w-none max-h-[calc(100svh-32px)] overflow-y-auto p-0"
      >
        {selectedProject && (
          <div className="relative p-6 sm:p-10">
            <button
              ref={closeButtonRef}
              type="button"
              onClick={closeDialog}
              autoFocus
              className="btn btn--icon absolute top-5 right-5"
              aria-label="Close project details"
            >
              <X size={16} aria-hidden="true" />
            </button>

            <p className="label mb-2">{selectedProject.category}</p>
            <h2 id={titleId} className="mb-4 pr-12 text-[length:var(--text-2xl)] font-medium">
              {selectedProject.title}
            </h2>

            <p className="mb-8 text-ink-2">{selectedProject.longDescription}</p>

            <div className="mb-8">
              <p className="label mb-2">Highlights</p>
              <ul className="rows border-y border-rule">
                {selectedProject.highlights.map((highlight) => (
                  <li key={highlight} className="py-2 text-sm text-ink">
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            {selectedProject.metrics && (
              <div className="mb-8">
                <p className="label mb-2">Key impact metrics</p>
                <ul className="rows border-y border-rule">
                  {selectedProject.metrics.map((m, i) => (
                    <li key={i} className="py-2 text-sm text-ink-2">
                      <MetricLine text={m} />
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {selectedProject.architecture && (
              <div className="mb-8">
                <p className="label mb-2">System architecture pipeline</p>
                <ol className="graphite cut cut--sm code grid gap-2 border p-4">
                  {selectedProject.architecture.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="token shrink-0">0{i + 1}</span>
                      <span>{step}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            <div className="mb-8">
              <p className="label mb-2">Tech stack</p>
              <div className="flex flex-wrap gap-1.5">
                {selectedProject.technologies.map((tech) => (
                  <span key={tech} className="tag">
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-3 border-t border-rule pt-6">
              <a
                href={selectedProject.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn"
              >
                <GitHubIcon className="h-3.5 w-3.5" aria-hidden="true" />
                <span>Inspect repository</span>
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
              <button type="button" onClick={closeDialog} className="btn btn--ghost">
                Close
              </button>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
