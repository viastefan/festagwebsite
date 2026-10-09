import type { Metadata } from "next";
import { Button } from "../_components/ui/Button";
import { Icon, type IconName } from "../_components/ui/Icon";
import { Reveal, RevealGroup, RevealItem } from "../_components/ui/Reveal";
import { PageHero, SectionHead } from "../_components/ui/Section";
import { Stage } from "../_components/ui/Window";
import { ExecutiveDemo } from "../_components/demos/ExecutiveDemo";
import { ContactForm } from "../_components/site/ContactForm";
import { IconCard } from "../_components/site/Blocks";

export const metadata: Metadata = {
  title: "Enterprise",
  description:
    "Festag Enterprise: Full White-Label, SAML SSO & SCIM, Datenresidenz Deutschland, Security Review und dedizierter Onboarding-Pfad.",
};

const SECURITY: { icon: IconName; title: string; body: string }[] = [
  { icon: "server", title: "Datenresidenz Deutschland", body: "Hosting und Verarbeitung in Deutschland. Vertraglich zugesichert in Enterprise." },
  { icon: "key", title: "SAML SSO & SCIM", body: "SAML 2.0 mit eurem Identity Provider. Provisioning und Deprovisioning über SCIM." },
  { icon: "lock", title: "Permission-aware", body: "Tagro sieht nur, was die fragende Person sehen darf. Workspace-Isolation per Row-Level-Security." },
  { icon: "eye", title: "Keine Überwachung", body: "Keine Screenshots, kein Activity-Tracking, keine Personen-Scores. Signale, nicht Menschen." },
  { icon: "brain", title: "Kein Training auf euren Daten", body: "Keine öffentlichen Modelle werden auf eurem Workspace trainiert. Dokumentierte Auftragsverarbeiter." },
  { icon: "doc", title: "DPA & Security Review", body: "AVV nach DSGVO, Security-Fragebögen, Architektur-Review mit eurem Team." },
];

const WL: { name: string; body: string; points: string[] }[] = [
  {
    name: "Co-branded",
    body: "Für den Start: „Powered by Festag“ im Portal.",
    points: ["Euer Logo & Farben", "Festag-Domain", "Tagro sichtbar"],
  },
  {
    name: "Subtle-branded",
    body: "Eure Marke vorne, Tagro als Briefing-Engine.",
    points: ["Eigene Domain", "Mehrere Marken", "Eigene E-Mail-Absender"],
  },
  {
    name: "Full White-Label",
    body: "Kein Festag-Branding für eure Kunden.",
    points: ["Eigener Interpreter-Name", "Eigene Domain & Mails", "Tenant pro Marke"],
  },
];

const ONBOARD = [
  { title: "Security-Call", body: "30 Minuten mit eurem Security-Team: Datenflüsse, Auftragsverarbeiter, Architektur." },
  { title: "Pilot mit echten Projekten", body: "Zwei bis drei laufende Projekte, eure Connectors, eure Kunden — vier Wochen." },
  { title: "Rollout & Operational DNA", body: "Teams, Marken und Portfolios. Festag lernt, wie ihr arbeitet — von Tag eins an." },
];

export default function EnterprisePage() {
  return (
    <>
      <PageHero
        eyebrow="Enterprise"
        title={
          <>
            Operational Intelligence für Organisationen mit <span className="serif accent">mehr als einem</span>{" "}
            Portfolio.
          </>
        }
        lead="Für Agentur-Gruppen, Software-Studios und Unternehmen mit internen Projektteams: White-Label, SSO, Datenresidenz und ein Onboarding, das eure Arbeitsweise lernt."
      >
        <div className="btn-row">
          <Button href="#contact" variant="solid" size="lg" arrow>
            Vertrieb kontaktieren
          </Button>
          <Button href="/pricing" variant="soft" size="lg">
            Pläne vergleichen
          </Button>
        </div>
      </PageHero>

      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <Reveal>
            <Stage pad caption="Executive Overview · Beispiel-Portfolio">
              <div style={{ maxWidth: 1040, margin: "0 auto" }}>
                <ExecutiveDemo />
              </div>
            </Stage>
          </Reveal>
        </div>
      </section>

      <section className="section section--tight" id="white-label">
        <div className="wrap wrap--wide">
          <SectionHead
            eyebrow="White-Label"
            title="Festag als euer Produkt."
            lead="Der Agency-Modus macht aus Festag ein Plattformgeschäft: Ihr verkauft Delivery Intelligence unter eurer Marke — Leqra bleibt die Engine."
          />
          <RevealGroup className="grid-3">
            {WL.map((w, i) => (
              <RevealItem key={w.name} className={`card${i === 2 ? " ent-wl-top" : ""}`}>
                <span className="tag tag--accent">Stufe {i + 1}</span>
                <h3 className="h4" style={{ marginTop: 16 }}>
                  {w.name}
                </h3>
                <p className="body" style={{ fontSize: 14.5 }}>
                  {w.body}
                </p>
                <ul className="plan-list" style={{ marginTop: 18 }}>
                  {w.points.map((p) => (
                    <li key={p}>
                      <Icon name="check" />
                      {p}
                    </li>
                  ))}
                </ul>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section section--flush-top" id="security">
        <div className="wrap wrap--wide">
          <SectionHead
            eyebrow="Security & Datenschutz"
            title="Vertrauen ist das Produkt. Also behandeln wir es so."
          />
          <RevealGroup className="grid-3">
            {SECURITY.map((s) => (
              <RevealItem key={s.title}>
                <IconCard icon={s.icon} title={s.title} body={s.body} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <SectionHead eyebrow="Onboarding" title="Vom ersten Call zum ersten Kunden-Report in vier Wochen." />
          <RevealGroup className="steps">
            {ONBOARD.map((s) => (
              <RevealItem key={s.title} className="step">
                <h3 className="h4">{s.title}</h3>
                <p className="body" style={{ fontSize: 14.5, marginTop: 6 }}>
                  {s.body}
                </p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section section--flush-top" id="contact">
        <div className="wrap wrap--wide">
          <div className="ent-contact">
            <Reveal>
              <span className="eyebrow">Vertrieb</span>
              <h2 className="h2" style={{ marginTop: 16 }}>
                Sprecht mit uns.
              </h2>
              <p className="lead" style={{ marginTop: 16 }}>
                Wir zeigen Festag an euren echten Projekten — kein Pitch-Deck-Theater.
              </p>
              <ul className="ent-list">
                <li>
                  <Icon name="check" size={15} /> Live-Demo mit eurem Stack
                </li>
                <li>
                  <Icon name="check" size={15} /> Security-Unterlagen & AVV
                </li>
                <li>
                  <Icon name="check" size={15} /> Individuelles Angebot
                </li>
              </ul>
            </Reveal>
            <Reveal>
              <ContactForm />
            </Reveal>
          </div>
        </div>
      </section>

      <style>{`
        .ent-wl-top { border-color: rgba(122,30,51,0.3); box-shadow: 0 0 0 1px rgba(122,30,51,0.1), var(--sh-md); }
        .ent-contact { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: clamp(28px, 5vw, 72px); align-items: start; }
        .ent-list { display: grid; gap: 10px; margin-top: 24px; }
        .ent-list li { display: flex; align-items: center; gap: 10px; font-size: 15px; color: var(--ink-2); }
        .ent-list svg { color: var(--burgundy); }
        @media (max-width: 960px) { .ent-contact { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
}
