"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";
import { GALLERY_PHOTOS } from "@/data/portfolio-data";
import { OPEN_PHOTO_EVENT } from "@/lib/motion";

/*
 * Through my lens: photos I've taken, pinned up as prints on a wall (CSS columns keep each
 * photo's own shape). Any print opens a larger view; arrow keys and buttons step through.
 */
export function PhotoGallery() {
  const [index, setIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const titleId = useId();
  const count = GALLERY_PHOTOS.length;

  const open = (i: number) => {
    triggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
    setIndex(i);
    dialogRef.current?.showModal();
  };
  const close = () => dialogRef.current?.close();

  /* About's thumbnails open a photo here without scrolling the page. */
  useEffect(() => {
    const onOpen = (e: Event) => {
      const i = (e as CustomEvent<number>).detail;
      triggerRef.current = document.activeElement instanceof HTMLElement ? document.activeElement : null;
      setIndex(i);
      dialogRef.current?.showModal();
    };
    window.addEventListener(OPEN_PHOTO_EVENT, onOpen);
    return () => window.removeEventListener(OPEN_PHOTO_EVENT, onOpen);
  }, []);
  const step = useCallback((delta: number) => setIndex((i) => (i === null ? i : (i + delta + count) % count)), [count]);

  useEffect(() => {
    if (index === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight") step(1);
      if (e.key === "ArrowLeft") step(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [index, step]);

  if (count === 0) return null;
  const photo = index === null ? null : GALLERY_PHOTOS[index];

  return (
    <>
      <ul className="gallery m-0 list-none p-0">
        {GALLERY_PHOTOS.map((p, i) => (
          <li key={p.src} className="gallery-item reveal" style={{ "--i": i } as React.CSSProperties}>
            <figure className="polaroid gallery-print" style={{ "--tilt": `${[-1.6, 1.2, -0.8, 1.8, -1.2][i % 5]}deg` } as React.CSSProperties}>
              <button type="button" className="gallery-open" onClick={() => open(i)} aria-label={`View larger: ${p.alt}`}>
                <span className="polaroid-img block" style={{ aspectRatio: `${p.width} / ${p.height}` }}>
                  <Image src={p.src} alt="" fill sizes="(min-width: 1024px) 360px, (min-width: 640px) 45vw, 92vw" />
                </span>
                <span className="gallery-zoom" aria-hidden="true">
                  <Expand size={14} />
                </span>
              </button>
              <figcaption>{p.caption}</figcaption>
            </figure>
          </li>
        ))}
      </ul>

      {/* Larger view */}
      <dialog
        ref={dialogRef}
        aria-labelledby={titleId}
        className="dialog lightbox"
        onClose={() => {
          setIndex(null);
          triggerRef.current?.focus();
        }}
        onClick={(e) => {
          if (e.target === e.currentTarget) close();
        }}
      >
        {photo && (
          <figure className="m-0 grid gap-3">
            <div
              className="lightbox-frame"
              style={{ aspectRatio: `${photo.width} / ${photo.height}`, "--ar": photo.width / photo.height } as React.CSSProperties}
            >
              <Image key={photo.src} src={photo.src} alt={photo.alt} fill sizes="(min-width: 1024px) 70vw, 94vw" className="lightbox-img" />
            </div>
            <figcaption className="flex items-center justify-between gap-3 px-1">
              <span id={titleId} className="hand text-[1.35rem]">
                {photo.caption}
              </span>
              <span className="font-mono text-xs text-ink-3" aria-live="polite">
                {(index ?? 0) + 1} / {count}
              </span>
            </figcaption>
          </figure>
        )}
        <button type="button" onClick={close} className="btn btn--icon lightbox-close size-11" aria-label="Close photo" autoFocus>
          <X size={18} aria-hidden="true" />
        </button>
        <button type="button" onClick={() => step(-1)} className="btn btn--icon lightbox-nav lightbox-prev size-11" aria-label="Previous photo">
          <ChevronLeft size={20} aria-hidden="true" />
        </button>
        <button type="button" onClick={() => step(1)} className="btn btn--icon lightbox-nav lightbox-next size-11" aria-label="Next photo">
          <ChevronRight size={20} aria-hidden="true" />
        </button>
      </dialog>
    </>
  );
}
