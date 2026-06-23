"use client";

import { useState } from "react";

const MODES = [
  {
    id: "email",
    label: "E-Mail Updates",
    gains: [
      "Live Statusberichte statt PDFs",
      "Entscheidungen mit Kontext und Historie",
      "Client-ready Export in Minuten",
      "Risiken sichtbar, bevor es eskaliert",
    ],
  },
  {
    id: "slack",
    label: "Slack und Calls",
    gains: [
      "Signale werden zu Delivery Intelligence",
      "Kein Status-Meeting mehr nötig",
      "Tagro fasst Threads zu Briefings",
      "Nächste Schritte klar für alle",
    ],
  },
  {
    id: "sheets",
    label: "Spreadsheets",
    gains: [
      "Ein System statt Tabellen-Chaos",
      "Fortschritt automatisch strukturiert",
      "CEO-sichere Übersicht pro Projekt",
      "Audit-Trail für jede Entscheidung",
    ],
  },
  {
    id: "none",
    label: "Kein System",
    gains: [
      "Projektstart in strukturiertem Scope",
      "KI zerlegt Ideen in umsetzbare Pläne",
      "Team arbeitet sichtbar, nicht blind",
      "Kunden verstehen, was passiert",
    ],
  },
] as const;

export function FestagUpgradeSection() {
  const [activeId, setActiveId] = useState<(typeof MODES)[number]["id"]>("email");
  const active = MODES.find((mode) => mode.id === activeId) ?? MODES[0];

  return (
    <div className="lp-ps-upgrade">
      <div className="lp-ps-shell">
        <div className="lp-ps-upgrade-intro">
          <p className="lp-ps-eyebrow">Lohnt sich der Wechsel?</p>
          <h2 className="lp-ps-upgrade-title">Absolut.</h2>
          <p className="lp-ps-upgrade-lead">
            Wähle, wie du heute arbeitest — und sieh, was Festag zusätzlich liefert.
          </p>
        </div>

        <div className="lp-ps-upgrade-picker" role="tablist" aria-label="Vergleichsmodus">
          {MODES.map((mode) => (
            <button
              key={mode.id}
              type="button"
              role="tab"
              aria-selected={activeId === mode.id}
              className={activeId === mode.id ? "is-active" : undefined}
              onClick={() => setActiveId(mode.id)}
            >
              {mode.label}
            </button>
          ))}
        </div>

        <div className="lp-ps-upgrade-panel" role="tabpanel">
          <div className="lp-ps-upgrade-col">
            <span className="lp-ps-upgrade-label">Heute</span>
            <p className="lp-ps-upgrade-before">{active.label}</p>
            <ul className="lp-ps-upgrade-list lp-ps-upgrade-list--muted">
              <li>Manueller Aufwand für Status</li>
              <li>Wenig Vertrauen beim Kunden</li>
              <li>Entscheidungen verstreut</li>
            </ul>
          </div>
          <div className="lp-ps-upgrade-col lp-ps-upgrade-col--festag">
            <span className="lp-ps-upgrade-label">Mit Festag</span>
            <p className="lp-ps-upgrade-after">So viel mehr bekommst du</p>
            <ul className="lp-ps-upgrade-list">
              {active.gains.map((gain) => (
                <li key={gain}>{gain}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
