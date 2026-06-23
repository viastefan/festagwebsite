"use client";

import { useEffect, useState } from "react";

type PanelProps = {
  active: boolean;
};

export function LayoutExplorationsPanel({ active }: PanelProps) {
  const cards = [
    { label: "Exploration", title: "Gesamtbericht", active: true },
    { label: "Exploration", title: "Letzte 24h", active: false },
    { label: "Exploration", title: "Projektfilter", active: false },
  ];

  return (
    <div className={`lp-hiw-panel lp-hiw-panel--layouts${active ? " is-active" : ""}`} aria-hidden>
      <div className="lp-hiw-layouts-head">
        <span className="lp-hiw-layouts-pill">Desktop</span>
        <span className="lp-hiw-layouts-status">3 Varianten</span>
      </div>
      <div className="lp-hiw-layouts-track">
        {cards.map((card, i) => (
          <div
            key={card.title}
            className={`lp-hiw-layout-card${card.active ? " is-focus" : ""}`}
            style={{ animationDelay: `${i * 120}ms` }}
          >
            <span className="lp-hiw-layout-card-label">{card.label}</span>
            <div className="lp-hiw-layout-card-art">
              <div className="lp-hiw-layout-card-block is-hero" />
              <div className="lp-hiw-layout-card-row">
                <span />
                <span />
              </div>
            </div>
            <p className="lp-hiw-layout-card-title">{card.title}</p>
          </div>
        ))}
      </div>
      <p className="lp-hiw-panel-foot">
        Tagro platziert Status-, Risiko- und Entscheidungsansichten nebeneinander.
      </p>
    </div>
  );
}

const TAGRO_LINES = [
  { type: "user", text: "kunde will wissen ob wir noch im plan sind für release nächste woche??" },
  { type: "thought", text: "Thought 8s" },
  { type: "action", text: "Briefing-Struktur erstellt (2s)" },
  { type: "action", text: "Risiken und Blocker priorisiert." },
  {
    type: "output",
    text: "Release nächste Woche ist realistisch. 1 Blocker offen: API-Freigabe. Nächster Schritt: Design Review Freitag.",
  },
] as const;

export function TagroChatPanel({ active }: PanelProps) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!active) {
      setVisibleCount(0);
      return;
    }
    setVisibleCount(1);
    const timers = TAGRO_LINES.slice(1).map((_, i) =>
      window.setTimeout(() => setVisibleCount(i + 2), 700 + i * 900),
    );
    return () => timers.forEach(clearTimeout);
  }, [active]);

  return (
    <div className={`lp-hiw-panel lp-hiw-panel--tagro${active ? " is-active" : ""}`} aria-hidden>
      <div className="lp-hiw-tagro-window">
        <div className="lp-hiw-tagro-bar">
          <span className="lp-hiw-tagro-dot" />
          <span className="lp-hiw-tagro-dot" />
          <span className="lp-hiw-tagro-dot" />
          <span className="lp-hiw-tagro-title">Tagro</span>
        </div>
        <div className="lp-hiw-tagro-thread">
          {TAGRO_LINES.map((line, i) => (
            <div
              key={line.text}
              className={`lp-hiw-tagro-line lp-hiw-tagro-line--${line.type}${
                i < visibleCount ? " is-visible" : ""
              }`}
            >
              {line.type === "user" ? (
                <div className="lp-hiw-tagro-bubble lp-hiw-tagro-bubble--user">{line.text}</div>
              ) : line.type === "output" ? (
                <div className="lp-hiw-tagro-bubble lp-hiw-tagro-bubble--out">{line.text}</div>
              ) : (
                <p className="lp-hiw-tagro-meta">{line.text}</p>
              )}
            </div>
          ))}
        </div>
        <div className="lp-hiw-tagro-compose">
          <span className="lp-hiw-tagro-compose-ph">Add follow up…</span>
          <span className="lp-hiw-tagro-compose-send" aria-hidden>
            ↑
          </span>
        </div>
      </div>
    </div>
  );
}

const TERMINAL_LINES = [
  "Initializing delivery briefing…",
  "Festag CMS connected.",
  "Skill(translate-client-update)",
  "Rohinput → client-ready Status",
  "Bash(PUBLISH /portal/status/march-2026)",
  "Bericht veröffentlicht, 3 Projekte, 2 Freigaben offen",
] as const;

export function DeliveryTerminalPanel({ active }: PanelProps) {
  const [visibleCount, setVisibleCount] = useState(0);

  useEffect(() => {
    if (!active) {
      setVisibleCount(0);
      return;
    }
    setVisibleCount(1);
    const timers = TERMINAL_LINES.slice(1).map((_, i) =>
      window.setTimeout(() => setVisibleCount(i + 2), 500 + i * 650),
    );
    return () => timers.forEach(clearTimeout);
  }, [active]);

  return (
    <div className={`lp-hiw-panel lp-hiw-panel--terminal${active ? " is-active" : ""}`} aria-hidden>
      <div className="lp-hiw-terminal-window">
        <div className="lp-hiw-terminal-bar">
          <span className="lp-hiw-tagro-dot" />
          <span className="lp-hiw-tagro-dot" />
          <span className="lp-hiw-tagro-dot" />
          <span className="lp-hiw-terminal-title">festag-agent</span>
        </div>
        <div className="lp-hiw-terminal-tabs">
          <span className="is-active">tagro</span>
          <span>portal</span>
          <span>reports</span>
        </div>
        <div className="lp-hiw-terminal-body">
          <p className="lp-hiw-terminal-kicker">Tagro Delivery, Sonnet 4.6, Festag Team</p>
          <ul className="lp-hiw-terminal-log">
            {TERMINAL_LINES.map((line, i) => (
              <li key={line} className={i < visibleCount ? "is-visible" : ""}>
                {line}
              </li>
            ))}
          </ul>
        </div>
        <div className="lp-hiw-terminal-foot">
          <span>Copy client update</span>
          <button type="button">Senden</button>
        </div>
      </div>
    </div>
  );
}
