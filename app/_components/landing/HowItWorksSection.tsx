import { FestagHowItWorksShowcase } from "./FestagHowItWorksShowcase";

export function HowItWorksSection() {
  return (
    <section id="how-it-works" className="lp-section lp-hiw-section">
      <div className="lp-hiw-shell">
        <header className="lp-section-header lp-section-header--left">
          <p className="lp-eyebrow">Produkterlebnis</p>
          <h2 className="lp-section-title">So funktioniert es</h2>
          <p className="lp-section-desc">
            Drei Schritte vom Rohinput zur client-ready Delivery Intelligence.
          </p>
        </header>

        <FestagHowItWorksShowcase />
      </div>
    </section>
  );
}
