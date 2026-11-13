import { SKILL_CATEGORIES } from "@/data/portfolio-data";

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section section--tint">
      <div className="wrap">
        <div className="section-head">
          <span className="section-mark">04 Skills</span>
          <h2 id="skills-title" className="kicker-title">My toolkit</h2>
          <p>The languages, frameworks and platforms I reach for day to day.</p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {SKILL_CATEGORIES.map((category) => (
            <div
              key={category.title}
              className="card reveal flex flex-col gap-4 p-6"
            >
              <h3 className="text-[length:var(--text-lg)] font-medium text-ink">
                {category.title}
              </h3>
              <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0">
                {category.skills.map((skill) => (
                  <li key={skill} className="tag">
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
