import { CircleCheck, Clock } from "lucide-react";
import { CERTIFICATIONS_DATA } from "@/data/portfolio-data";

export function Certifications() {
  return (
    <div id="certifications" className="min-w-0 scroll-mt-24">
      <h3 className="mb-6 text-[length:var(--text-2xl)] font-medium">Certifications</h3>

      <ul className="rows m-0 list-none border-y border-rule p-0">
        {CERTIFICATIONS_DATA.map((cert) => (
          <li key={cert.title} className="flex flex-col gap-2 py-5">
            <h4 className="font-display text-[length:var(--text-md)] font-medium text-ink">
              {cert.title}
            </h4>
            <p className="text-ink-2">{cert.issuer}</p>
            <p className="label flex items-center gap-1.5">
              {cert.inProgress ? (
                <Clock size={14} aria-hidden="true" />
              ) : (
                <CircleCheck size={14} aria-hidden="true" className="text-success" />
              )}
              {cert.inProgress ? "In progress" : cert.status}
            </p>

            {cert.highlights && (
              <ul className="m-0 mt-1 list-disc space-y-1 pl-5 text-sm text-ink-2 marker:text-ink-3">
                {cert.highlights.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            )}

            {cert.credentialUrl && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="link w-fit pt-1 text-sm"
              >
                View credential
                <span className="visually-hidden"> for {cert.title} (opens in a new tab)</span>
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
