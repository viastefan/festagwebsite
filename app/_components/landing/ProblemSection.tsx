import { AppleFeatureExplorer } from "./AppleFeatureExplorer";

export function ProblemSection() {
  return (
    <section id="services" className="lp-section lp-apple-section">
      <div className="lp-apple-shell">
        <div className="lp-apple-closer-intro">
          <p className="lp-apple-closer-eyebrow">Dashboard Funktionen</p>
          <h2 className="lp-apple-closer-title">Sieh es dir genauer an.</h2>
        </div>

        <AppleFeatureExplorer />
      </div>
    </section>
  );
}
