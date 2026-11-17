import { SKILL_CATEGORIES } from "@/data/portfolio-data";

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section section--tint">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="section-mark">04 Skills<span className="head-note" aria-hidden="true">most-used first</span></span>
          <h2 id="skills-title" className="kicker-title">My toolkit</h2>
          <p>What I reach for most days.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 md:gap-6 lg:grid-cols-3">
          {SKILL_CATEGORIES.map((category, ci) => (
            <div
              key={category.title}
              className="card reveal flex flex-col gap-4 p-6"
              style={{ "--i": ci } as React.CSSProperties}
            >
              <h3 className="text-[length:var(--text-lg)] font-medium text-ink">
                {category.title}
              </h3>
              <ul className="stagger m-0 flex list-none flex-wrap gap-1.5 p-0">
                {category.skills.map((skill, i) => (
                  <li key={skill} className="tag" style={{ "--i": i } as React.CSSProperties}>
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
