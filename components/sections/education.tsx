import { EDUCATION_DATA } from "@/data/portfolio-data";

export function Education() {
  return (
    <div id="education" className="min-w-0 scroll-mt-24">
      <h3 className="mb-6 text-[length:var(--text-2xl)] font-medium">Education</h3>

      <ol className="rows m-0 list-none border-y border-rule p-0">
        {EDUCATION_DATA.map((edu) => (
          <li key={edu.degree} className="grid grid-cols-[minmax(0,1fr)_auto] gap-x-6 gap-y-1 py-5">
            <h4 className="font-display text-[length:var(--text-md)] font-medium text-ink">
              {edu.degree}
            </h4>
            <p className="figure font-display font-medium text-ink">{edu.score}</p>
            {edu.field && <p className="col-span-2 text-ink-2">{edu.field}</p>}
            <p className="col-span-2 text-ink-2">{edu.institution}</p>
            <p className="label col-span-2 pt-1">{edu.duration}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
