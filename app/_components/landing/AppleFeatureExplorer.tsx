"use client";

import { useState } from "react";
import {
  DecisionsCloserPanel,
  IntegrationsCloserPanel,
  PortalCloserPanel,
  ProjectsCloserPanel,
  StatusCloserPanel,
  TagroCloserPanel,
  TeamCloserPanel,
  WhitelabelCloserPanel,
} from "./FeatureDashboardPanels";

type FeatureId =
  | "projects"
  | "status"
  | "decisions"
  | "tagro"
  | "team"
  | "portal"
  | "whitelabel"
  | "integrations";

const FEATURES: {
  id: FeatureId;
  label: string;
  title: string;
  body: string;
  swatch: string;
  panel: React.ReactNode;
}[] = [
  {
    id: "projects",
    label: "Projekte",
    title: "Projekte",
    body: "Alle Projekte auf einem Blick, strukturiert und KI gesteuert.",
    swatch: "#8e9ab3",
    panel: <ProjectsCloserPanel />,
  },
  {
    id: "status",
    label: "Statusberichte",
    title: "Statusberichte",
    body: "Client-ready Reports in Minuten, nicht in Stunden.",
    swatch: "#5a9a7a",
    panel: <StatusCloserPanel />,
  },
  {
    id: "decisions",
    label: "Entscheidungen",
    title: "Entscheidungen",
    body: "Freigaben, Risiken und nächste Schritte an einem Ort.",
    swatch: "#b8895a",
    panel: <DecisionsCloserPanel />,
  },
  {
    id: "tagro",
    label: "Tagro KI",
    title: "Tagro KI",
    body: "Strukturiert Ideen in Pläne, Aufgaben und klare nächste Schritte.",
    swatch: "#8f84c9",
    panel: <TagroCloserPanel />,
  },
  {
    id: "team",
    label: "Team Workflow",
    title: "Team Workflow",
    body: "Entwickler arbeiten in einem definierten Flow, nicht in Black Boxes.",
    swatch: "#5d8fad",
    panel: <TeamCloserPanel />,
  },
  {
    id: "portal",
    label: "Client Portal",
    title: "Client Portal",
    body: "Auftraggeber sehen Fortschritt, Risiken und Entscheidungen live.",
    swatch: "#727b92",
    panel: <PortalCloserPanel />,
  },
  {
    id: "whitelabel",
    label: "White Label",
    title: "White Label",
    body: "Festag unter deiner Agentur-Marke, portal-ready.",
    swatch: "#b9a574",
    panel: <WhitelabelCloserPanel />,
  },
  {
    id: "integrations",
    label: "Integrationen",
    title: "Integrationen",
    body: "Anbindung an GitHub, Google und deine Delivery-Tools.",
    swatch: "#6a7388",
    panel: <IntegrationsCloserPanel />,
  },
];

function FeatureIcon({ active, swatch }: { active: boolean; swatch: string }) {
  if (active) {
    return (
      <span
        className="lp-apple-closer-swatch"
        style={{ backgroundColor: swatch }}
        aria-hidden
      />
    );
  }

  return (
    <span className="lp-apple-closer-plus" aria-hidden>
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

export function AppleFeatureExplorer() {
  const [active, setActive] = useState<FeatureId>("projects");
  const current = FEATURES.find((item) => item.id === active) ?? FEATURES[0];

  return (
    <div className="lp-apple-closer">
      <div className="lp-apple-closer-card">
        <div
          className="lp-apple-closer-list"
          role="tablist"
          aria-label="Festag Produktfeatures"
        >
          {FEATURES.map((feature) => {
            const isActive = active === feature.id;
            return (
              <button
                key={feature.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`lp-apple-closer-item${isActive ? " is-active" : ""}`}
                onClick={() => setActive(feature.id)}
              >
                <FeatureIcon active={isActive} swatch={feature.swatch} />
                <span>{feature.label}</span>
              </button>
            );
          })}
        </div>

        <div className="lp-apple-closer-stage" role="tabpanel">
          <div className="lp-apple-closer-visual" key={current.id}>
            {current.panel}
          </div>
          <p className="lp-apple-closer-caption">
            <strong>{current.title}.</strong> {current.body}
          </p>
        </div>
      </div>
    </div>
  );
}
