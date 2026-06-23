"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function HeroAnimatedContent() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className={`lp-hero-shell${ready ? " is-ready" : ""}`}>
      <div className="lp-hero-inner">
        <Link href="/now" className="lp-hero-kicker lp-rise lp-rise-1">
          <span className="lp-hero-kicker-badge">Neu</span>
          Wir entwickeln selber
          <span aria-hidden>→</span>
        </Link>

        <h1 id="lp-hero-title" className="lp-hero-title lp-rise lp-rise-1">
          <span className="lp-hero-title--desktop">
            <span className="lp-hero-title-muted">
              Festag verwandelt komplexe Projektarbeit{" "}
            </span>
            <span className="lp-hero-title-strong">
              in verständliche Fortschritte, Entscheidungen und Ergebnisse.
            </span>{" "}
            <span className="lp-hero-title-muted">Angetrieben von KI.</span>
          </span>
          <span className="lp-hero-title--mobile">
            <span className="lp-hero-title-line">Projekte verständlich machen.</span>
            <span className="lp-hero-title-line">Mit Tagro strukturieren.</span>
            <span className="lp-hero-title-line">Client-ready liefern.</span>
          </span>
        </h1>

        <div className="lp-hero-toolbar lp-rise lp-rise-2">
          <div className="lp-hero-actions">
            <a
              href="https://festag.app/login"
              className="lp-hero-btn lp-hero-btn--primary"
              target="_blank"
              rel="noopener noreferrer"
            >
              Jetzt onboarding durchführen
            </a>
            <a
              href="https://festag.app/login"
              className="lp-hero-btn lp-hero-btn--secondary"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Image
                src="/marketing/google-icon.svg"
                alt=""
                width={16}
                height={16}
                aria-hidden
                className="lp-hero-btn-icon"
              />
              Mit Google verbinden
            </a>
          </div>

          <Link href="/now" className="lp-hero-note lp-hero-note--desktop">
            <span className="lp-hero-note-badge">Neu</span>
            Wir entwickeln selber
            <span aria-hidden>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
