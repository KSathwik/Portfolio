import Image from "next/image";
import { MetricLine } from "@/components/metric-line";
import { EXPERIENCE_DATA, PROJECTS_DATA } from "@/data/portfolio-data";


/* Match an experience entry to its project card even if punctuation differs. */
function normalizeName(name: string) {
  return name
    .toLowerCase()
    .replace(/(enterprise|platform)/g, "")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}
const PROJECT_IDS = new Map(PROJECTS_DATA.map((p) => [normalizeName(p.title), p.id]));

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="section">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="section-mark">03 Experience</span>
          <h2 id="experience-title" className="kicker-title">Where I&apos;ve worked</h2>
        </div>

        <ol className="border-b border-rule">
          {EXPERIENCE_DATA.map((exp) => (
            <li
              key={exp.id}
              className="reveal grid gap-x-[var(--gap-columns)] gap-y-6 border-t border-rule py-10 lg:grid-cols-12"
            >
              {/* The ruler: company, role, dates, place */}
              <div className="lg:col-span-4">
                <div className="ruler relative grid gap-1 pl-4 lg:sticky lg:top-24">
                  {exp.logo && (
                    <a
                      href={exp.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`logo-tile mb-3 ${exp.logoFill ? "logo-tile--fill" : ""}`}
                      aria-label={`${exp.company} website (opens in a new tab)`}
                    >
                      <Image src={exp.logo} alt="" width={exp.logoSize?.[0] ?? 56} height={exp.logoSize?.[1] ?? 56} sizes="112px" />
                    </a>
                  )}
                  <p className="font-display text-[length:var(--text-lg)] font-medium tracking-[var(--tracking-display)] text-ink">
                    {exp.company}
                  </p>
                  <p className="text-ink-2">{exp.role}</p>
                  <p className="label">{exp.duration}</p>
                  <p className="label">{exp.location}</p>
                  {exp.current && <p className="w-fit rounded-full bg-signal-wash px-2.5 py-1 text-xs font-medium text-signal-deep">Current role</p>}
                </div>
              </div>

              {/* The work */}
              <ul className="rows lg:col-span-8">
                {exp.projects.map((project) => {
                  const projectId = PROJECT_IDS.get(normalizeName(project.name));

                  return (
                    <li key={project.name} className="grid gap-4 py-6 first:pt-0">
                      <div className="grid gap-2">
                        <h3>{project.name}</h3>
                        <p className="text-ink-2">{project.description}</p>
                      </div>

                      {project.metrics && (
                        <ul className="rows border-y border-rule">
                          {project.metrics.map((metric, i) => (
                            <li key={i} className="py-2 text-sm text-ink-2">
                              <MetricLine text={metric} />
                            </li>
                          ))}
                        </ul>
                      )}

                      <div className="hidden flex-wrap gap-1.5 sm:flex">
                        {project.technologies.map((tech) => (
                          <span key={tech} className="tag">
                            {tech}
                          </span>
                        ))}
                      </div>

                      <div className="flex flex-wrap items-start gap-x-6 gap-y-2">
                        {project.responsibilities.length > 0 && (
                          <details className="group min-w-0 flex-1 basis-64">
                            <summary className="flex min-h-10 w-fit cursor-pointer items-center text-sm font-medium text-ink-2 transition-colors duration-[var(--dur-micro)] hover:text-ink">
                              Responsibilities ({project.responsibilities.length})
                            </summary>
                            <ul className="mt-1 grid list-disc gap-1 pl-5 text-sm text-ink-2 marker:text-ink-3">
                              {project.responsibilities.map((resp, i) => (
                                <li key={i}>{resp}</li>
                              ))}
                            </ul>
                          </details>
                        )}
                        {projectId && (
                          <a
                            href={`#${projectId}`}
                            className="link inline-flex min-h-10 items-center text-sm"
                          >
                            See the project
                            <span className="visually-hidden">: {project.name}</span>
                          </a>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
