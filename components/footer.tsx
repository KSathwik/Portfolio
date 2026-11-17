import { PERSONAL_INFO } from "@/data/portfolio-data";

const sectionLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Lab", href: "#ai-lab" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { label: "GitHub", href: PERSONAL_INFO.github, external: true },
  { label: "LinkedIn", href: PERSONAL_INFO.linkedin, external: true },
  { label: "Email", href: `mailto:${PERSONAL_INFO.email}`, external: false },
];

export function Footer() {
  return (
    <footer className="border-t border-rule bg-paper">
      <div className="wrap flex flex-col gap-8 pt-12 pb-24 sm:pb-12 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-2">
          <span className="font-display text-lg font-medium tracking-[var(--tracking-display)] text-ink">
            {PERSONAL_INFO.name}
          </span>
          <p className="text-sm text-ink-2">
            &copy; {new Date().getFullYear()} · Drawn, written and built by me in Hyderabad
          </p>
        </div>

        <div className="flex flex-col gap-x-12 gap-y-4 sm:flex-row">
          <nav aria-label="Footer sections">
            <ul className="m-0 flex list-none flex-wrap gap-x-5 gap-y-2 p-0 text-sm">
              {sectionLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="link inline-flex min-h-11 items-center text-ink-2">
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
          <ul className="m-0 flex list-none flex-wrap gap-x-5 gap-y-2 p-0 text-sm" aria-label="Elsewhere">
            {socialLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  className="link inline-flex min-h-11 items-center text-ink-2"
                  {...(link.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
