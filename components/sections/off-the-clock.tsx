"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ExternalLink, Music2 } from "lucide-react";
import { GALLERY_PHOTOS, MUSIC_ARTISTS } from "@/data/portfolio-data";
import { PhotoGallery } from "@/components/photo-gallery";

/*
 * Off the clock: what I listen to, and (once I add them) photos I've taken.
 * The player is Spotify's own embed, so each artist's photo and their current top songs
 * come straight from Spotify and stay up to date without me touching this file.
 */
export function OffTheClock() {
  const [activeId, setActiveId] = useState(MUSIC_ARTISTS[0].spotifyId);
  const [loadedId, setLoadedId] = useState<string | null>(null);
  const active = MUSIC_ARTISTS.find((a) => a.spotifyId === activeId) ?? MUSIC_ARTISTS[0];

  /*
   * If the iframe's load event was missed (it can fire before hydration), show it anyway, but only
   * once the player has been on screen a while: a lazy iframe doesn't start loading before that.
   */
  const playerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = playerRef.current;
    if (!el) return;
    let t = 0;
    const io = new IntersectionObserver(([entry]) => {
      window.clearTimeout(t);
      if (entry.isIntersecting) t = window.setTimeout(() => setLoadedId(activeId), 4000);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      window.clearTimeout(t);
    };
  }, [activeId]);

  return (
    <section id="off-the-clock" aria-labelledby="off-the-clock-title" className="section">
      <div className="wrap">
        <div className="section-head reveal">
          <span className="section-mark">07 Off the clock<span className="head-note" aria-hidden="true">headphones on</span></span>
          <h2 id="off-the-clock-title" className="kicker-title">What&apos;s playing while I code</h2>
          <p>
            Most of my debugging happens with headphones on, usually to film music. Pick an artist
            to hear their top songs.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-x-[var(--gap-columns)] gap-y-8 lg:grid-cols-12">
          {/* Artist picker */}
          <div className="reveal min-w-0 lg:col-span-5">
            <ul className="artist-grid m-0 list-none p-0" role="list">
              {MUSIC_ARTISTS.map((artist, i) => {
                const selected = artist.spotifyId === activeId;
                return (
                  <li key={artist.spotifyId} style={{ "--i": i } as React.CSSProperties}>
                    <button
                      type="button"
                      className="artist"
                      aria-pressed={selected}
                      onClick={() => setActiveId(artist.spotifyId)}
                    >
                      <span className="artist-photo">
                        <Image src={artist.image} alt="" fill sizes="64px" />
                        {selected && (
                          <span className="artist-eq" aria-hidden="true">
                            <i />
                            <i />
                            <i />
                          </span>
                        )}
                      </span>
                      <span className="grid min-w-0 gap-0.5 text-left">
                        <span className="truncate font-medium text-ink">{artist.name}</span>
                        <span className="truncate text-xs text-ink-3">{artist.known}</span>
                      </span>
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Player */}
          <div className="reveal flex min-w-0 flex-col gap-3 lg:col-span-7">
            <div ref={playerRef} className="player" aria-busy={loadedId !== active.spotifyId}>
              {loadedId !== active.spotifyId && (
                <div className="player-skeleton" aria-hidden="true">
                  <span className="psk-art" />
                  <span className="psk-title" />
                  <span className="psk-rows" />
                </div>
              )}
              <iframe
                key={active.spotifyId}
                onLoad={() => setLoadedId(active.spotifyId)}
                className={loadedId === active.spotifyId ? "is-loaded relative" : "relative"}
                title={`${active.name}: top songs on Spotify`}
                src={`https://open.spotify.com/embed/artist/${active.spotifyId}?utm_source=generator&theme=0`}
                width="100%"
                height="380"
                loading="lazy"
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
              />
            </div>
            <p className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-ink-3">
              <span className="inline-flex items-center gap-1.5">
                <Music2 size={13} aria-hidden="true" />
                Top songs update live from Spotify.
              </span>
              <a
                href={`https://open.spotify.com/artist/${active.spotifyId}`}
                target="_blank"
                rel="noopener noreferrer"
                className="link inline-flex min-h-11 items-center gap-1"
              >
                Open {active.name} on Spotify
                <ExternalLink size={12} aria-hidden="true" />
                <span className="visually-hidden"> (opens in a new tab)</span>
              </a>
            </p>
          </div>
        </div>

        {/* Through my lens: shows up as soon as photos are added to GALLERY_PHOTOS */}
        {GALLERY_PHOTOS.length > 0 && (
          <div id="through-my-lens" className="mt-12 scroll-mt-24 sm:mt-[var(--space-2xl)]">
            <div className="reveal mb-8 grid max-w-[46rem] gap-2 sm:mb-10">
              <h3 className="text-[length:var(--text-2xl)] font-medium">Through my lens</h3>
              <p className="text-ink-2">
                I take my phone camera everywhere: waterfalls, early beaches, festival nights. Open
                any print to see it bigger.
              </p>
            </div>
            <PhotoGallery />
          </div>
        )}
      </div>
    </section>
  );
}
