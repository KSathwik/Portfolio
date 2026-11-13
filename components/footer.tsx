import { PERSONAL_INFO } from "@/data/portfolio-data";

const sectionLinks = [
  { label: "About", href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { label: "GitHub", href: "https://github.com/KSathwik", external: true },
  { label: "LinkedIn", href: "https://linkedin.com/in/katkam-sathwik-5b5285202", external: true },
  { label: "Email", href: "mailto:sathwikkatkam@gmail.com", external: false },
];

export function Footer() {
  return (
    <footer className="border-t border-rule bg-paper">
      <div className="wrap flex flex-col gap-8 pt-12 pb-24 sm:pb-12 md:flex-row md:items-start md:justify-between">
        <div className="flex flex-col gap-2">
          <span className="font-display text-lg font-medium tracking-[var(--tracking-display)] text-ink">
            {PERSONAL_INFO.name}
          </span>
          <p className="label">
            &copy; {new Date().getFullYear()} Sathwik Katkam
          </p>
        </div>

        <div className="flex flex-col gap-x-12 gap-y-4 sm:flex-row">
          <nav aria-label="Footer sections">
            <ul className="m-0 flex list-none flex-wrap gap-x-5 gap-y-2 p-0 text-sm">
              {sectionLinks.map((link) => (
                <li key={link.href}>
                  <a href={link.href} className="link text-ink-2">
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
                  className="link text-ink-2"
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
