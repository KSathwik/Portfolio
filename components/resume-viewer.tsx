"use client";

import { useId, useRef } from "react";
import { Eye, FileDown, ExternalLink, X } from "lucide-react";
import { PERSONAL_INFO } from "@/data/portfolio-data";

export const RESUME_FILENAME = "Sathwik_Katkam_Resume.pdf";

/* Download link: the same PDF, saved under a readable filename. */
export function ResumeDownload({
  className = "btn btn--primary",
  label = "Download resume",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <a href={PERSONAL_INFO.resumeUrl} download={RESUME_FILENAME} className={className}>
      <FileDown size={16} aria-hidden="true" />
      {label}
    </a>
  );
}

/*
 * View in the browser: a native <dialog> (Esc closes it, focus is trapped and restored)
 * holding the PDF in an iframe. Without script, the link still opens the PDF in a new tab.
 */
export function ResumeView({
  className = "btn",
  label = "View resume",
  icon = true,
}: {
  className?: string;
  label?: string;
  /** Show the eye icon. Turn it off when the trigger is styled as a text link. */
  icon?: boolean;
}) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  // This component renders more than once on the page, so the title id has to be unique.
  const titleId = useId();

  const open = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Small screens rarely render PDFs inline: let the browser open it in a new tab.
    if (window.matchMedia("(max-width: 640px)").matches) return;
    e.preventDefault();
    dialogRef.current?.showModal();
  };

  return (
    <>
      <a
        href={PERSONAL_INFO.resumeUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={open}
        className={className}
      >
        {icon && <Eye size={16} aria-hidden="true" />}
        {label}
      </a>

      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        className="dialog resume-dialog"
        onClick={(e) => {
          if (e.target === dialogRef.current) dialogRef.current?.close();
        }}
      >
        <div className="flex h-full flex-col">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-rule px-4 py-3 sm:px-5">
            <h2 id={titleId} className="text-[length:var(--text-lg)]">
              Resume
            </h2>
            <div className="flex flex-wrap items-center gap-2">
              <a
                href={PERSONAL_INFO.resumeUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn--sm btn--ghost"
              >
                <ExternalLink size={14} aria-hidden="true" />
                Open in new tab
              </a>
              <a href={PERSONAL_INFO.resumeUrl} download={RESUME_FILENAME} className="btn btn--sm btn--primary">
                <FileDown size={14} aria-hidden="true" />
                Download
              </a>
              <button
                type="button"
                onClick={() => dialogRef.current?.close()}
                className="btn btn--sm btn--icon btn--ghost"
                aria-label="Close resume"
              >
                <X size={16} aria-hidden="true" />
              </button>
            </div>
          </div>
          <iframe
            src={`${PERSONAL_INFO.resumeUrl}#view=FitH`}
            title="Sathwik Katkam's resume (PDF)"
            className="min-h-0 w-full flex-1 bg-paper-2"
            loading="lazy"
          />
        </div>
      </dialog>
    </>
  );
}
