import type { Metadata } from "next";
import { Btn, siteLinks } from "../_components/site/primitives";

export const metadata: Metadata = {
  title: "Preise",
  description:
    "Festag Pricing — klare Pläne für Teams und Organisationen, die Delivery Intelligence brauchen.",
};

const PLANS = [
  {
    name: "Team",
    price: "Auf Anfrage",
    body: "Für Agenturen und Software-Teams, die Kunden Klarheit verkaufen wollen.",
    points: ["Workspace & Projekte", "Connectors", "Tagro Briefings", "Entscheidungen"],
    featured: false,
  },
  {
    name: "Organization",
    price: "Auf Anfrage",
    body: "Für Portfolios, Führung und mehrere Brands — inkl. Executive und Company Brain.",
    points: ["Alles aus Team", "Executive Overview", "Objectives", "Adaptive Intelligence"],
    featured: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    body: "SSO, Security Review, White-Label und dedizierter Onboarding-Pfad.",
    points: ["SSO / SCIM", "Security & Privacy Controls", "White-Label Portal", "Priority Support"],
    featured: false,
  },
];

const FAQ = [
  {
    q: "Wie wird Festag berechnet?",
    a: "Nach Operating Model und Scope — nicht nach Ticketvolumen. Wir finden den Einstieg gemeinsam.",
  },
  {
    q: "Gibt es einen Trial?",
    a: "Ja. Workspace starten, Connectors verbinden, Tagro nutzen — ohne Sales-Theater.",
  },
  {
    q: "Was ist in Organization enthalten?",
    a: "Executive Overview, Objectives und Adaptive Intelligence für Portfolios und Führung.",
  },
  {
    q: "Enterprise und SSO?",
    a: "SSO/SCIM, Security Controls und White-Label Portal — wir starten mit einem kurzen Security-Call.",
  },
];

export default function PricingPage() {
  return (
    <div className="page">
      <div className="site-wrap">
        <h1 className="page-title">Preise</h1>
        <p className="page-body">
          Festag skaliert mit eurer Delivery — nicht mit Ticketvolumen. Sprecht mit uns für
          den Plan, der zu eurem Operating Model passt.
        </p>

        <div className="grid-3" style={{ marginTop: 40 }}>
          {PLANS.map((plan) => (
            <article
              key={plan.name}
              className={plan.featured ? "tile tile--featured" : "tile"}
            >
              <h3>{plan.name}</h3>
              <p className="tile-price">{plan.price}</p>
              <p style={{ marginBottom: 16 }}>{plan.body}</p>
              <ul className="tile-list">
                {plan.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <section className="page-block" style={{ marginTop: 64 }}>
          <h2>Häufige Fragen</h2>
          <div className="faq">
            {FAQ.map((item) => (
              <div key={item.q} className="faq-item">
                <p className="faq-q">{item.q}</p>
                <p className="faq-a">{item.a}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="cta-band">
          <h2>Wir finden den richtigen Einstieg.</h2>
          <p>Schreib uns — wir antworten ruhig und konkret.</p>
          <div className="cta-actions">
            <Btn href="/contact" variant="solid" size="lg">
              Kontakt
            </Btn>
            <Btn href={siteLinks.register} variant="ghost" size="lg" external>
              Trial starten
            </Btn>
          </div>
        </div>
      </div>
    </div>
  );
}
