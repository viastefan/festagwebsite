"use client";

import Image from "next/image";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";

/**
 * Produktvideo im Rahmen: startet nur im Sichtbereich, pausiert außerhalb, lädt erst kurz davor.
 * Mit „Bewegung reduzieren“ bleibt das Vorschaubild stehen, Abspielen geht per Knopf.
 */
function subscribeSmall(cb: () => void) {
  const mq = window.matchMedia("(max-width: 640px)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
function useSmall() {
  return useSyncExternalStore(
    subscribeSmall,
    () => window.matchMedia("(max-width: 640px)").matches,
    () => false,
  );
}

export function VideoBand({
  src,
  poster,
  mobileSrc,
  mobilePoster,
  label,
  caption,
  ratio = "16 / 9",
}: {
  src: string;
  poster: string;
  /** Hochformat-Version für Handys (bis 640 px Breite) */
  mobileSrc?: string;
  mobilePoster?: string;
  label: string;
  caption?: string;
  ratio?: string;
}) {
  const wrap = useRef<HTMLDivElement>(null);
  const vid = useRef<HTMLVideoElement>(null);
  const [playing, setPlaying] = useState(false);
  const [near, setNear] = useState(false);
  const manualPause = useRef(false);
  const small = useSmall() && !!mobileSrc;
  const useSrc = small ? (mobileSrc as string) : src;
  const usePoster = small ? (mobilePoster ?? poster) : poster;

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const io = new IntersectionObserver(
      ([e]) => {
        const v = vid.current;
        if (e.isIntersecting) {
          setNear(true);
          if (v && !reduced && !manualPause.current) v.play().catch(() => undefined);
        } else if (v) {
          v.pause();
        }
      },
      { rootMargin: "200px 0px", threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const toggle = () => {
    const v = vid.current;
    if (!v) return;
    if (v.paused) {
      manualPause.current = false;
      v.play().catch(() => undefined);
    } else {
      manualPause.current = true;
      v.pause();
    }
  };

  return (
    <figure className="vband" ref={wrap} style={{ aspectRatio: small ? "390 / 700" : ratio }}>
      <video
        key={useSrc}
        ref={vid}
        className="vband-video"
        muted
        loop
        playsInline
        preload={near ? "auto" : "none"}
        poster={usePoster}
        aria-label={label}
        onPlay={() => setPlaying(true)}
        onPause={() => setPlaying(false)}
      >
        {near ? <source src={useSrc} type="video/mp4" /> : null}
      </video>
      {caption ? <figcaption className="vband-cap">{caption}</figcaption> : null}
      <button type="button" className="vband-btn" onClick={toggle} aria-label={playing ? "Video pausieren" : "Video abspielen"}>
        {playing ? (
          <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden>
            <rect x="3.5" y="3" width="3" height="10" rx="1" />
            <rect x="9.5" y="3" width="3" height="10" rx="1" />
          </svg>
        ) : (
          <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden>
            <path d="M5 3.2v9.6a.8.8 0 0 0 1.2.7l7.6-4.8a.8.8 0 0 0 0-1.4L6.2 2.5A.8.8 0 0 0 5 3.2Z" />
          </svg>
        )}
      </button>
    </figure>
  );
}

/** Bild im ruhigen Rahmen mit kurzer Beschriftung und Chips. */
export function MediaBand({
  src,
  alt,
  pos = "center",
  ratio = "21 / 9",
  chips,
  caption,
  priority,
  tone = "dark",
}: {
  tone?: "dark" | "light";
  src: string;
  alt: string;
  pos?: string;
  ratio?: string;
  chips?: string[];
  caption?: string;
  priority?: boolean;
}) {
  return (
    <figure className={`mband${tone === "light" ? " mband--light" : ""}`} style={{ aspectRatio: ratio }}>
      <Image src={src} alt={alt} fill priority={priority} sizes="(max-width: 960px) 100vw, 1180px" style={{ objectFit: "cover", objectPosition: pos }} />
      <div className="mband-shade" aria-hidden />
      {caption || chips ? (
        <figcaption className="mband-cap">
          {caption ? <span className="mband-text">{caption}</span> : null}
          {chips ? (
            <span className="mband-chips">
              {chips.map((c) => (
                <span key={c}>{c}</span>
              ))}
            </span>
          ) : null}
        </figcaption>
      ) : null}
    </figure>
  );
}
