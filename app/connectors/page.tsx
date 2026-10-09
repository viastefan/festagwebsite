import type { Metadata } from "next";
import { Button } from "../_components/ui/Button";
import { Icon } from "../_components/ui/Icon";
import { Reveal, RevealGroup, RevealItem } from "../_components/ui/Reveal";
import { CtaBand, PageHero, SectionHead } from "../_components/ui/Section";
import { Stage } from "../_components/ui/Window";
import { ConnectorGraph } from "../_components/demos/ConnectorGraph";
import { connectors, CONNECTOR_STATUS_LABEL, signalTypes } from "@/lib/site/connectors";
import { links } from "@/lib/site/links";

export const metadata: Metadata = {
  title: "Connectors",
  description:
    "GitHub, Linear, Jira, Slack und mehr — Festag liest Arbeitssignale, ohne eure Workflows zu ersetzen.",
};

const STEPS = [
  { title: "Verbinden", body: "OAuth in unter einer Minute. Ihr wählt Repos, Teams und Kanäle — nichts darüber hinaus." },
  { title: "Lesen", body: "Festag liest Ereignisse, keine Postfächer. Signale werden klassifiziert und Projekten zugeordnet." },
  { title: "Verstehen", body: "Tagro verknüpft Belege, erkennt Risiken und entscheidet, wer was wissen muss." },
];

export default function ConnectorsPage() {
  return (
    <>
      <PageHero
        eyebrow="Connectors"
        title={
          <>
            Euer Team bleibt, wo es arbeitet. Festag <span className="serif accent">liest mit.</span>
          </>
        }
        lead="Festag sitzt über GitHub, Linear, Jira und Slack. Es ersetzt keine Workflows, erzeugt keine doppelten Tasks und verlangt von niemandem, alles aufzuschreiben."
      >
        <div className="btn-row">
          <Button href={links.register} variant="solid" size="lg" arrow>
            Tools verbinden
          </Button>
          <Button href="/contact" variant="soft" size="lg">
            Connector anfragen
          </Button>
        </div>
      </PageHero>

      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <Reveal>
            <Stage pad caption="Klick auf einen Connector">
              <div className="cn-graph">
                <ConnectorGraph />
              </div>
            </Stage>
          </Reveal>
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap wrap--wide">
          <SectionHead eyebrow="Alle Connectors" title="Live, in Beta und als Nächstes." />
          <RevealGroup className="grid-3">
            {connectors.map((c) => (
              <RevealItem key={c.id} className="card cn-card">
                <div className="cn-head">
                  <span className="cn-icon">
                    <Icon name={c.id} size={20} />
                  </span>
                  <div>
                    <div className="h4">{c.name}</div>
                    <div className="small">{c.category}</div>
                  </div>
                  <span
                    className={`tag ${c.status === "live" ? "tag--ok" : c.status === "beta" ? "tag--warn" : "tag--outline"}`}
                    style={{ marginLeft: "auto" }}
                  >
                    {CONNECTOR_STATUS_LABEL[c.status]}
                  </span>
                </div>
                <p className="body" style={{ fontSize: 14.5, marginTop: 14 }}>
                  {c.short}
                </p>
                <ul className="cn-signals">
                  {c.signals.map((s) => (
                    <li key={s}>
                      <Icon name="signal" size={12} />
                      {s}
                    </li>
                  ))}
                </ul>
                <div className="cn-never">
                  <Icon name="shield" size={13} />
                  {c.never}
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <SectionHead
            eyebrow="Signal-Taxonomie"
            title="Elf Bedeutungen. Jedes Signal bekommt genau eine."
            lead="Bevor etwas Report, Risiko, Entscheidung oder Kunden-Update wird, ist es ein klassifiziertes Signal. Das macht Festag erweiterbar — und erklärbar."
          />
          <Reveal className="cn-tax">
            {signalTypes.map((t) => (
              <div key={t.id} className="cn-tax-row">
                <span className={`status status--${t.tone === "ok" ? "ok" : t.tone === "warn" ? "warn" : t.tone === "risk" ? "risk" : ""}`}>
                  <i />
                  {t.label}
                </span>
                <span className="cn-tax-ex">{t.example}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <SectionHead eyebrow="So funktioniert es" title="Verbinden. Lesen. Verstehen." />
          <RevealGroup className="steps">
            {STEPS.map((s) => (
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

      <CtaBand
        title="Euer Tool fehlt?"
        lead="Sagt uns, woraus eure Arbeit besteht. Die Connector-Roadmap richtet sich nach echten Teams."
      />

      <style>{`
        .cn-graph { max-width: 980px; margin: 0 auto; background: rgba(255,255,255,0.72); backdrop-filter: blur(8px); border-radius: 20px; padding: clamp(16px, 3vw, 32px); border: 1px solid var(--line); }
        .cn-card { display: flex; flex-direction: column; }
        .cn-head { display: flex; align-items: center; gap: 12px; }
        .cn-icon { width: 42px; height: 42px; border-radius: 12px; background: var(--surface-2); display: grid; place-items: center; flex-shrink: 0; }
        .cn-signals { display: grid; gap: 6px; margin-top: 14px; }
        .cn-signals li { display: flex; align-items: center; gap: 8px; font-size: 13px; color: var(--ink-2); }
        .cn-signals svg { color: var(--burgundy); }
        .cn-never { margin-top: auto; padding-top: 14px; display: flex; gap: 8px; align-items: flex-start; font-size: 12.5px; color: var(--faint); border-top: 1px solid var(--line); margin-top: 16px; }
        .cn-never svg { flex-shrink: 0; margin-top: 2px; }
        .cn-tax { border-radius: 20px; border: 1px solid var(--line); background: var(--surface); overflow: hidden; }
        .cn-tax-row { display: grid; grid-template-columns: 240px 1fr; gap: 20px; padding: 14px 20px; border-top: 1px solid var(--line); align-items: center; }
        .cn-tax-row:first-child { border-top: 0; }
        .cn-tax-row .status { font-size: 14px; color: var(--ink); }
        .cn-tax-ex { font-size: 14px; color: var(--muted); }
        @media (max-width: 640px) { .cn-tax-row { grid-template-columns: 1fr; gap: 4px; } }
      `}</style>
    </>
  );
}
