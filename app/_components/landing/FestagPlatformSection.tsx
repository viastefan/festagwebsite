import { HeroTrustStrip } from "./HeroTrustStrip";
import { SystemMotionStage } from "./SystemMotionStage";

export function FestagPlatformSection() {
  return (
    <div className="lp-ps-platform">
      <div className="lp-ps-shell">
        <div className="lp-ps-platform-grid">
          <div className="lp-ps-platform-copy">
            <p className="lp-ps-eyebrow">Festag Core</p>
            <h2 className="lp-ps-platform-title">
              Tagro und Delivery Layer.
              <span>Extrem klar. Extrem effizient.</span>
            </h2>
            <p className="lp-ps-platform-lead">
              Festag verwandelt Arbeitssignale in verständliche Fortschritte,
              Entscheidungen und Ergebnisse — ohne eure Execution-Tools zu
              ersetzen.
            </p>
            <ul className="lp-ps-platform-list">
              <li>Tagro strukturiert Ideen in Pläne und nächste Schritte</li>
              <li>Teams arbeiten sichtbar, Kunden verstehen den Stand</li>
              <li>Status, Risiken und Freigaben bleiben auditierbar</li>
            </ul>
          </div>

          <div className="lp-ps-platform-stage">
            <div className="lp-ps-platform-shot">
              <SystemMotionStage />
            </div>
          </div>
        </div>

        <HeroTrustStrip />
      </div>
    </div>
  );
}
