"use client";

import { useCallback, useRef, useState } from "react";

const CARDS = [
  {
    id: "status",
    kicker: "Statusberichte",
    title: "Client-ready in Minuten.",
    body: "Fortschritt, Risiken und nächste Schritte — verständlich aufbereitet, nicht aus Slides zusammengebastelt.",
    tone: "light" as const,
  },
  {
    id: "decisions",
    kicker: "Entscheidungen",
    title: "Klarheit statt Rückfragen.",
    body: "Offene Punkte, Freigaben und Historie an einem Ort — nachvollziehbar für Team und Kunde.",
    tone: "dark" as const,
  },
  {
    id: "tagro",
    kicker: "Tagro KI",
    title: "Briefings statt Projektchaos.",
    body: "Tagro fasst Signale zusammen, beantwortet Kontextfragen und hält das Projekt interpretierbar.",
    tone: "accent" as const,
  },
  {
    id: "portal",
    kicker: "Client Portal",
    title: "Transparenz schafft Vertrauen.",
    body: "Kunden sehen, was passiert — ohne zusätzliche Calls, ohne manuelle Updates.",
    tone: "light" as const,
  },
  {
    id: "integrations",
    kicker: "Integrationen",
    title: "Execution bleibt in euren Tools.",
    body: "Festag sitzt darüber als Delivery Intelligence Layer — nicht als Ersatz für Jira, Linear oder GitHub.",
    tone: "dark" as const,
  },
  {
    id: "team",
    kicker: "Team Workflow",
    title: "Strukturiert statt fragmentiert.",
    body: "Scope, Aufgaben und Verantwortlichkeiten bleiben sichtbar — vom Kickoff bis zum Release.",
    tone: "accent" as const,
  },
] as const;

function CardVisual({ tone, kicker }: { tone: (typeof CARDS)[number]["tone"]; kicker: string }) {
  return (
    <div className={`lp-ps-gallery-art lp-ps-gallery-art--${tone}`} aria-hidden>
      <span className="lp-ps-gallery-art-kicker">{kicker}</span>
      <div className="lp-ps-gallery-art-bars">
        <span />
        <span />
        <span />
      </div>
      <div className="lp-ps-gallery-art-chips">
        <span className="is-active">Live</span>
        <span>Scope</span>
        <span>Next</span>
      </div>
    </div>
  );
}

export function FestagFeatureGallery() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const updateActiveFromScroll = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;

    const slides = Array.from(track.children) as HTMLElement[];
    const center = track.scrollLeft + track.clientWidth * 0.22;
    let nextIndex = 0;
    let minDistance = Number.POSITIVE_INFINITY;

    slides.forEach((slide, index) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth * 0.5;
      const distance = Math.abs(center - slideCenter);
      if (distance < minDistance) {
        minDistance = distance;
        nextIndex = index;
      }
    });

    setActiveIndex(nextIndex);
  }, []);

  return (
    <div className="lp-ps-gallery">
      <div className="lp-ps-shell">
        <header className="lp-ps-gallery-head">
          <p className="lp-ps-eyebrow">Alles in einem</p>
          <h2 className="lp-ps-gallery-title">
            Delivery Intelligence.
            <span>Bleib verbunden. Mit Team und Kunde.</span>
          </h2>
        </header>
      </div>

      <div className="lp-ps-gallery-track-wrap">
        <div
          ref={trackRef}
          className="lp-ps-gallery-track"
          aria-label="Festag Funktionen"
          onScroll={updateActiveFromScroll}
        >
          {CARDS.map((card) => (
            <article key={card.id} className="lp-ps-gallery-card">
              <div className="lp-ps-gallery-card-visual">
                <CardVisual tone={card.tone} kicker={card.kicker} />
              </div>
              <p className="lp-ps-gallery-card-caption">
                <strong>{card.title}</strong> {card.body}
              </p>
            </article>
          ))}
        </div>
      </div>

      <div className="lp-ps-shell">
        <div className="lp-ps-gallery-dots" aria-hidden>
          {CARDS.map((card, index) => (
            <span key={card.id} className={index === activeIndex ? "is-active" : undefined} />
          ))}
        </div>
      </div>
    </div>
  );
}
