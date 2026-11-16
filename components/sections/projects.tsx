"use client";

import { useState, useEffect, useRef, useId } from "react";
import { MetricLine } from "@/components/metric-line";
import { X, ArrowUpRight, Lock } from "lucide-react";
import { RetrievalField } from "@/components/retrieval-field";
import { ProjectField } from "@/components/project-fields";
import { GitHubIcon } from "@/components/icons";
import { PROJECTS_DATA } from "@/data/portfolio-data";
import { Project } from "@/types/portfolio";

const FEATURED_ID = "ai-knowledge-assistant";


/* Where it was built; a lock marks company work whose code is private. */
function Context({ project }: { project: Project }) {
  if (!project.context) return null;
  const isPrivate = !project.repoUrl;
  return (
    <span className="inline-flex items-center gap-1.5 text-xs text-ink-3">
      {isPrivate && <Lock size={12} aria-hidden="true" />}
      {project.context}
    </span>
  );
}

export function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const clearTimer = useRef<number | undefined>(undefined);
  const titleId = useId();

  useEffect(() => () => window.clearTimeout(clearTimer.current), []);

  const featured = PROJECTS_DATA.find((p) => p.id === FEATURED_ID);
  const others = PROJECTS_DATA.filter((p) => p.id !== FEATURED_ID);

  const openProject = (project: Project) => {
    triggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    window.clearTimeout(clearTimer.current);
    const dialog = dialogRef.current;
    // Reopening the project that's still mounted (closed a moment ago): state won't change, so open directly.
    if (selectedProject?.id === project.id && dialog && !dialog.open) {
      dialog.showModal();
      closeButtonRef.current?.focus();
      return;
    }
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
    // Let the close transition play before the content goes away.
    window.clearTimeout(clearTimer.current);
    clearTimer.current = window.setTimeout(() => setSelectedProject((p) => (dialogRef.current?.open ? p : null)), 340);
    const trigger = triggerRef.current;
    triggerRef.current = null;
    trigger?.focus();
  };

  return (
    <section id="projects" aria-labelledby="projects-title" className="section section--tint">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="section-mark">02 Projects</span>
          <h2 id="projects-title" className="kicker-title">Things I&apos;ve built</h2>
          <p>
            Production work and personal projects across retrieval, agents and enterprise
            platforms. Open any project for its architecture and results.
          </p>
        </div>

        {featured && (
          <article id={featured.id} className="card featured reveal mb-6 scroll-mt-24">
            <div className="featured-visual">
              <RetrievalField className="h-[260px] sm:h-[340px] lg:h-full lg:min-h-[440px]" />
            </div>
            <div className="flex flex-col gap-6 p-6 sm:p-10">
              <div className="flex flex-wrap items-center gap-3">
                <span className="tag tag--accent">Featured</span>
                <Context project={featured} />
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
                {featured.repoUrl && (
                  <a href={featured.repoUrl} target="_blank" rel="noopener noreferrer" className="btn btn--ghost">
                    <GitHubIcon className="h-4 w-4" />
                    Source on GitHub
                    <span className="visually-hidden"> (opens in a new tab)</span>
                  </a>
                )}
              </div>
            </div>
          </article>
        )}

        <ul className="m-0 grid list-none gap-6 p-0 md:grid-cols-2 lg:grid-cols-3">
          {others.map((project) => (
            <li key={project.id} id={project.id} className="reveal scroll-mt-24">
              <article className="card card--lift relative flex h-full flex-col gap-5 overflow-hidden p-6 sm:p-7">
                {/* A small live drawing of how this project works */}
                <div className="project-visual -mx-6 -mt-6 sm:-mx-7 sm:-mt-7">
                  <ProjectField id={project.id} className="h-44" />
                </div>
                <div className="flex min-h-10 items-center justify-between gap-3">
                  <Context project={project} />
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--icon btn--ghost relative z-[1] -mr-2"
                      aria-label={`${project.title} source on GitHub (opens in a new tab)`}
                    >
                      <GitHubIcon className="h-4 w-4" />
                    </a>
                  )}
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
                  className="link inline-flex min-h-11 w-fit cursor-pointer items-center gap-1 text-sm font-medium after:absolute after:inset-0 after:rounded-[var(--radius-card)] after:content-[''] focus-visible:outline-none focus-visible:after:outline-2 focus-visible:after:outline-offset-2 focus-visible:after:outline-solid focus-visible:after:outline-[color:var(--color-focus)]"
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
        className="dialog dialog--sheet w-[min(42rem,calc(100vw-32px))] max-w-none max-h-[calc(100svh-32px)] overflow-y-auto p-0"
      >
        {selectedProject && (
          <div className="relative">
            {/* Title bar stays put while the details scroll, so Close is always in reach. */}
            <div className="sticky top-0 z-10 flex items-start justify-between gap-4 border-b border-rule bg-paper px-6 pt-5 pb-4 sm:px-10 sm:pt-8">
              <div className="grid min-w-0 gap-1">
                <p className="label">{selectedProject.context ?? selectedProject.category}</p>
                <h2 id={titleId} className="text-[length:var(--text-2xl)] leading-tight font-medium">
                  {selectedProject.title}
                </h2>
              </div>
              <button
                ref={closeButtonRef}
                type="button"
                onClick={closeDialog}
                autoFocus
                className="btn btn--icon size-11 shrink-0"
                aria-label="Close project details"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>
            <div className="p-6 sm:px-10 sm:pb-10">

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
                <p className="label mb-2">Results</p>
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
                <p className="label mb-2">How it works</p>
                <ol className="graphite cut cut--sm code grid gap-2 border p-4">
                  {selectedProject.architecture.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="token shrink-0">{String(i + 1).padStart(2, "0")}</span>
                      <span>{step.replaceAll("->", "→")}</span>
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
              {selectedProject.repoUrl ? (
                <a
                  href={selectedProject.repoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn"
                >
                  <GitHubIcon className="h-3.5 w-3.5" aria-hidden="true" />
                  <span>View the code</span>
                  <span className="visually-hidden"> (opens in a new tab)</span>
                </a>
              ) : (
                <p className="inline-flex items-center gap-1.5 text-sm text-ink-3">
                  <Lock size={14} aria-hidden="true" />
                  Company project, so the code is private. Happy to walk through it in an interview.
                </p>
              )}
              <button type="button" onClick={closeDialog} className="btn btn--ghost">
                Close
              </button>
            </div>
            </div>
          </div>
        )}
      </dialog>
    </section>
  );
}
