"use client";

import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

type Hotspot = {
  id: string;
  title: string;
  description: string;
  top: string;
  left: string;
  width: string;
  height: string;
  popup: "left" | "right" | "top" | "bottom";
};

const HOTSPOTS: Hotspot[] = [
  {
    id: "scope",
    title: "Deine Statuszentrale",
    description:
      "Hier siehst du, was heute wichtig ist: Status, Berichte, offene Aufgaben und nächste Schritte.",
    top: "8%",
    left: "4%",
    width: "22%",
    height: "14%",
    popup: "right",
  },
  {
    id: "briefing",
    title: "Briefings statt Projektchaos",
    description:
      "Tagro fasst aktive Projekte, Aufgaben, Risiken und Entscheidungen in einem klaren Bericht zusammen.",
    top: "28%",
    left: "18%",
    width: "64%",
    height: "38%",
    popup: "top",
  },
  {
    id: "period",
    title: "Zeitraum wählen",
    description:
      "Heute, letzte 7 Tage oder 30 Tage — der Bericht passt sich dem gewählten Fenster an.",
    top: "8%",
    left: "72%",
    width: "18%",
    height: "14%",
    popup: "left",
  },
  {
    id: "wave",
    title: "Bericht anhören",
    description:
      "Die Wellenform zeigt live, welcher Satz gerade gesprochen wird — wie ein ruhiges Audio-Briefing.",
    top: "78%",
    left: "6%",
    width: "42%",
    height: "14%",
    popup: "top",
  },
  {
    id: "tagro",
    title: "Frag Tagro jederzeit",
    description:
      "Tagro übersetzt Projektarbeit in klare Antworten, nächste Schritte und Briefings.",
    top: "76%",
    left: "84%",
    width: "12%",
    height: "16%",
    popup: "left",
  },
];

const SAMPLE_LINES = [
  "Du hast 3 aktive Projekte.",
  "Eine Freigabe wartet auf dich.",
  "Das Website-Relaunch liegt im Plan.",
  "Nächster Schritt: Review mit dem Team.",
];

export function StatusabfragePreview({
  theme = "light",
}: {
  theme?: "light" | "dark";
}) {
  const [activeId, setActiveId] = useState<string | null>(null);
  const wrapRef = useRef<HTMLDivElement>(null);

  const close = useCallback(() => setActiveId(null), []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [close]);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target.closest(".status-hotspot-wrap")) return;
      close();
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, [close]);

  return (
    <div
      ref={wrapRef}
      className={`status-preview status-preview--stage${theme === "dark" ? " status-preview--dark" : ""}`}
    >
      <div className="status-preview-ui">
        <header className="status-preview-head">
          <div className="status-preview-head-copy">
            <p className="status-preview-kicker">Gesamtbericht</p>
            <h2 className="status-preview-headline">
              Keine Entscheidungen, kein Stress…
            </h2>
          </div>
          <div className="status-preview-head-actions">
            <span className="status-preview-pill">Gesamtbericht</span>
            <span className="status-preview-pill status-preview-pill--muted">
              Heute
            </span>
          </div>
        </header>

        <div className="status-preview-body">
          <div className="status-preview-lines">
            {SAMPLE_LINES.map((line, i) => (
              <p
                key={line}
                className={`status-preview-line${i === 1 ? " is-active" : ""}`}
              >
                {line}
              </p>
            ))}
          </div>
        </div>

        <footer className="status-preview-foot">
          <div className="status-preview-wave" aria-hidden>
            {Array.from({ length: 32 }).map((_, i) => (
              <span
                key={i}
                style={{
                  transform: `scaleY(${0.15 + ((i * 7) % 11) / 28})`,
                }}
              />
            ))}
          </div>
          <span className="status-preview-dur">0:42</span>
          <div className="status-preview-controls">
            <button type="button" className="status-preview-play" aria-label="Abspielen">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                <path d="M4 2.5v11l9-5.5-9-5.5Z" />
              </svg>
            </button>
            <button type="button" className="status-preview-tagro" aria-label="Tagro">
              <span className="status-preview-tagro-dot" />
            </button>
          </div>
        </footer>

        {HOTSPOTS.map((spot) => (
          <div
            key={spot.id}
            className="status-hotspot-wrap"
            style={{
              top: spot.top,
              left: spot.left,
              width: spot.width,
              height: spot.height,
            }}
          >
            <button
              type="button"
              className={`status-hotspot${activeId === spot.id ? " is-active" : ""}`}
              aria-label={spot.title}
              aria-expanded={activeId === spot.id}
              onClick={() =>
                setActiveId((cur) => (cur === spot.id ? null : spot.id))
              }
            />

            {activeId === spot.id && (
              <div
                className={`status-popup status-popup--${spot.popup}`}
                role="dialog"
                aria-labelledby={`popup-${spot.id}`}
              >
                <p className="status-popup-kicker">Einführung</p>
                <p id={`popup-${spot.id}`} className="status-popup-title">
                  {spot.title}
                </p>
                <p className="status-popup-text">{spot.description}</p>
                <button
                  type="button"
                  className="status-popup-close"
                  onClick={close}
                  aria-label="Schließen"
                >
                  ×
                </button>
              </div>
            )}
          </div>
        ))}
      </div>

      <Link
        href="https://festag.app/login"
        className="status-preview-floating-link"
        target="_blank"
        rel="noopener noreferrer"
      >
        In Festag öffnen →
      </Link>
    </div>
  );
}
