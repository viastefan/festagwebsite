import type { ReactNode } from "react";
import { NewProjectPreview } from "./NewProjectPreview";
import { ProjectsDashboardPreviewLight } from "./ProjectsDashboardPreviewLight";

function CloserDashShell({ children }: { children: ReactNode }) {
  return <div className="lp-closer-dash">{children}</div>;
}

export function ProjectsCloserPanel() {
  return (
    <CloserDashShell>
      <ProjectsDashboardPreviewLight showcase />
    </CloserDashShell>
  );
}

export function StatusCloserPanel() {
  return (
    <CloserDashShell>
      <div className="lp-panel-status">
        <p className="lp-panel-kicker">Statusbericht</p>
        <h3 className="lp-panel-title">Website Relaunch, März 2026</h3>
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
          <p className="lp-panel-status-line">
            <span>Client-Update</span>
            <strong>Bereit zum Senden</strong>
          </p>
        </div>
      </div>
    </CloserDashShell>
  );
}

export function DecisionsCloserPanel() {
  return (
    <CloserDashShell>
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
    </CloserDashShell>
  );
}

export function TagroCloserPanel() {
  return (
    <CloserDashShell>
      <NewProjectPreview showcase />
    </CloserDashShell>
  );
}

export function TeamCloserPanel() {
  return (
    <CloserDashShell>
      <div className="lp-panel-inbox">
        <p className="lp-panel-kicker">Execution</p>
        <h3 className="lp-panel-title">Team arbeitet im definierten Flow</h3>
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
    </CloserDashShell>
  );
}

export function PortalCloserPanel() {
  return (
    <CloserDashShell>
      <div className="lp-panel-status">
        <p className="lp-panel-kicker">Client Portal</p>
        <h3 className="lp-panel-title">Fortschritt live für Auftraggeber</h3>
        <div className="lp-panel-status-sheet">
          <p className="lp-panel-status-line">
            <span>Gesamtstatus</span>
            <strong>Auf Kurs</strong>
          </p>
          <p className="lp-panel-status-line">
            <span>Offene Entscheidungen</span>
            <strong>2</strong>
          </p>
          <p className="lp-panel-status-line">
            <span>Letztes Update</span>
            <strong>Heute, 09:40</strong>
          </p>
        </div>
      </div>
    </CloserDashShell>
  );
}

export function WhitelabelCloserPanel() {
  return (
    <CloserDashShell>
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
            <strong>portal.deine-agentur.de</strong>
          </p>
          <p className="lp-panel-status-line">
            <span>Reports</span>
            <strong>Agentur-ready</strong>
          </p>
        </div>
      </div>
    </CloserDashShell>
  );
}

export function IntegrationsCloserPanel() {
  return (
    <CloserDashShell>
      <div className="lp-panel-inbox">
        <p className="lp-panel-kicker">Integrationen</p>
        <h3 className="lp-panel-title">Anbindung an deine Delivery-Tools</h3>
        <ul className="lp-panel-list lp-panel-list--integrations">
          <li>
            <strong>GitHub</strong>
            <span>Commits, PRs und Releases synchron</span>
          </li>
          <li>
            <strong>Google Workspace</strong>
            <span>Dokumente und Kalender verknüpft</span>
          </li>
          <li>
            <strong>Slack</strong>
            <span>Status-Signale ins Portal</span>
          </li>
        </ul>
      </div>
    </CloserDashShell>
  );
}
