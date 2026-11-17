"use client";

import Image from "next/image";
import { GALLERY_PHOTOS } from "@/data/portfolio-data";
import { openPhoto } from "@/lib/motion";

/* About: four of my photos as small prints. Each opens right here in the large viewer. */
export function PeekPhotos() {
  return (
    <div className="grid gap-2">
      <ul className="m-0 grid list-none grid-cols-4 gap-2 p-0">
        {GALLERY_PHOTOS.slice(0, 4).map((p, i) => (
          <li key={p.src}>
            <button
              type="button"
              onClick={() => openPhoto(i)}
              className="peek-thumb w-full cursor-zoom-in"
              style={{ "--tilt": `${[-3, 2, -1.5, 2.5][i]}deg` } as React.CSSProperties}
              aria-label={`View larger: ${p.alt}`}
            >
              <Image src={p.src} alt="" fill sizes="80px" />
            </button>
          </li>
        ))}
      </ul>
      <a href="#through-my-lens" className="link inline-flex min-h-11 w-fit items-center text-sm">
        See all {GALLERY_PHOTOS.length} photos
      </a>
    </div>
  );
}
