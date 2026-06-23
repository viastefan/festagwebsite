"use client";

import Link from "next/link";
import { useState, type ReactNode } from "react";
import { NewProjectPreview } from "./NewProjectPreview";
import { ProjectsDashboardPreviewLight } from "./ProjectsDashboardPreviewLight";

type FeatureId =
  | "projects"
  | "status"
  | "decisions"
  | "tagro"
  | "team"
  | "portal"
  | "whitelabel";

const FEATURES: {
  id: FeatureId;
  label: string;
  panel: ReactNode;
}[] = [
  {
    id: "projects",
    label: "Projekte",
    panel: <ProjectsDashboardPreviewLight />,
  },
  {
    id: "status",
    label: "Statusberichte",
    panel: (
      <div className="lp-panel-status">
        <p className="lp-panel-kicker">Statusbericht</p>
        <h3 className="lp-panel-title">Client-ready in Minuten, nicht in Stunden</h3>
        <div className="lp-panel-status-sheet">
          <p className="lp-panel-status-line">
            <span>Fortschritt</span>
            <strong>72%</strong>
          </p>
          <p className="lp-panel-status-line">
            <span>Nächster Meilenstein</span>
            <strong>Design Review</strong>
          </p>
          <p className="lp-panel-status-line">
            <span>Risiken</span>
            <strong>1 offen</strong>
          </p>
        </div>
      </div>
    ),
  },
  {
    id: "decisions",
    label: "Entscheidungen",
    panel: (
      <div className="lp-panel-inbox">
        <p className="lp-panel-kicker">Entscheidungen</p>
        <h3 className="lp-panel-title">Freigaben und Risiken an einem Ort</h3>
        <ul className="lp-panel-list">
          <li>
            <strong>Scope-Freigabe</strong>
            <span>Website Relaunch, wartet auf Review</span>
          </li>
          <li>
            <strong>Budget-Entscheidung</strong>
            <span>Phase 2, Empfehlung von Tagro</span>
          </li>
          <li>
            <strong>Go-Live Freigabe</strong>
            <span>Mobile App, bereit zur Abstimmung</span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "tagro",
    label: "Tagro KI",
    panel: <NewProjectPreview />,
  },
  {
    id: "team",
    label: "Team Workflow",
    panel: (
      <div className="lp-panel-inbox">
        <p className="lp-panel-kicker">Execution</p>
        <h3 className="lp-panel-title">Entwickler arbeiten im definierten Flow</h3>
        <ul className="lp-panel-list">
          <li>
            <strong>Sprint 14</strong>
            <span>4 Aufgaben in Review, 2 blockiert</span>
          </li>
          <li>
            <strong>Dev-Team</strong>
            <span>3 Entwickler aktiv am Website Relaunch</span>
          </li>
          <li>
            <strong>Nächster Schritt</strong>
            <span>API-Integration, ETA Freitag</span>
          </li>
        </ul>
      </div>
    ),
  },
  {
    id: "portal",
    label: "Client Portal",
    panel: <ProjectsDashboardPreviewLight />,
  },
  {
    id: "whitelabel",
    label: "White Label",
    panel: (
      <div className="lp-panel-status">
        <p className="lp-panel-kicker">White Label</p>
        <h3 className="lp-panel-title">Festag unter deiner Agentur-Marke</h3>
        <div className="lp-panel-status-sheet">
          <p className="lp-panel-status-line">
            <span>Branding</span>
            <strong>Eigenes Logo</strong>
          </p>
          <p className="lp-panel-status-line">
            <span>Portal</span>
            <strong>Custom Domain</strong>
          </p>
          <p className="lp-panel-status-line">
            <span>Delivery</span>
            <strong>Agentur-ready Reports</strong>
          </p>
        </div>
      </div>
    ),
  },
];

function FeatureIcon({ active }: { active: boolean }) {
  if (active) {
    return <span className="lp-apple-deep-swatch" aria-hidden />;
  }

  return (
    <span className="lp-apple-deep-plus" aria-hidden>
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path
          d="M5 1.5v7M1.5 5h7"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}

export function AppleProductDeepDive() {
  const [active, setActive] = useState<FeatureId>("projects");
  const current = FEATURES.find((item) => item.id === active) ?? FEATURES[0];

  return (
    <div className="lp-apple-deep">
      <div className="lp-apple-deep-nav">
        <p className="lp-apple-deep-brand">Festag</p>
        <div className="lp-apple-deep-nav-actions">
          <Link href="/product" className="lp-apple-deep-nav-link">
            Entdecken
          </Link>
          <a
            href="https://festag.app/login"
            className="lp-apple-deep-nav-cta"
            target="_blank"
            rel="noopener noreferrer"
          >
            Jetzt starten
          </a>
        </div>
      </div>

      <div className="lp-apple-deep-card">
        <div
          className="lp-apple-deep-list"
          role="tablist"
          aria-label="Festag Produktbereiche"
        >
          {FEATURES.map((feature) => {
            const isActive = active === feature.id;
            return (
              <button
                key={feature.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`lp-apple-deep-item${isActive ? " is-active" : ""}`}
                onClick={() => setActive(feature.id)}
              >
                <FeatureIcon active={isActive} />
                <span>{feature.label}</span>
              </button>
            );
          })}
        </div>

        <div className="lp-apple-deep-stage-wrap">
          <div className="lp-apple-deep-stage" role="tabpanel">
            <div className="lp-apple-deep-stage-inner" key={current.id}>
              {current.panel}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
