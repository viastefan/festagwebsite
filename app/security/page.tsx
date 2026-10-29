import type { Metadata } from "next";
import { PageHero, SectionHead, CtaBand } from "../_components/ui/Section";
import { Button } from "../_components/ui/Button";
import { Reveal } from "../_components/ui/Reveal";
import { Bento, BentoCell, KeyList, StatStrip } from "../_components/ui/Blocks2";
import { links } from "@/lib/site/links";

export const metadata: Metadata = {
  alternates: { canonical: "/security" },
  title: "Sicherheit und Vertrauen",
  description:
    "Server in Deutschland, kein Training auf euren Daten, Freigabe vor jedem Versand, Rechte pro Verbindung. Wie Festag mit euren Daten und Projekten umgeht.",
};

const READS: [string, string, string][] = [
  ["Pull Requests, Commits, Reviews", "GitHub", "Code selbst und Branches bleiben unberührt. Festag liest Ereignisse, schreibt nichts in euer Repo."],
  ["Tickets, Zyklen, Status", "Linear, Jira", "Titel, Status und Zuordnung. Kein Umbau eurer Boards, keine doppelten Aufgaben."],
  ["Ausgewählte Kanäle und Threads", "Slack", "Nur Kanäle, die ihr freigebt. Keine privaten Nachrichten."],
  ["Mails zu Projekten", "Gmail, IONOS", "Nur projektbezogene Nachrichten. Antworten gehen als Entwurf an euch, Senden ist eure Entscheidung."],
];

const STEPS = [
  { title: "Ihr verbindet, was ihr wollt", body: "Jede Verbindung ist freiwillig und einzeln widerrufbar. Zugriffe lassen sich pro Werkzeug einschränken, zum Beispiel „Claude Code darf keine Risiken melden“." },
  { title: "Aven liest Signale, keine Personen", body: "Festag bewertet Ereignisse im Projekt. Es gibt keine Screenshots, kein Tab-Tracking und keine Personen-Scores." },
  { title: "Nichts geht ohne Freigabe raus", body: "Ein Kunde sieht nur, was jemand aus eurem Team freigegeben hat. Einweg-Entscheidungen, hohes Budget und niedrige Sicherheit fallen immer auf Freigabe zurück." },
  { title: "Alles steht in der Historie", body: "Jeder Schritt ist protokolliert: wer, was, wann, in welchem Modus und mit welchem Beleg. Der Kunde sieht seine Fassung, ihr die vollständige." },
];

export default function SecurityPage() {
  return (
    <>
      <PageHero
        title="Vertrauen ist das Produkt."
        lead="Festag sieht, was Arbeit produziert, nicht, was Menschen tun. So gehen wir mit euren Daten, Projekten und Kunden um."
      >
        <div className="btn-row">
          <Button href={links.security} variant="solid" size="lg" arrow>
            Security-Team kontaktieren
          </Button>
          <Button href="/developers#auth" variant="soft" size="lg">
            Zugriff und Token
          </Button>
        </div>
      </PageHero>

      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <StatStrip
            items={[
              { v: "Deutschland", l: "Hosting und Verarbeitung" },
              { v: "0", l: "Training auf euren Daten" },
              { v: "SHA-256", l: "Token nur als Hash gespeichert" },
              { v: "Opt-in", l: "Persönliche Profile" },
            ]}
          />
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <SectionHead title="Vier Prinzipien, die im Produkt stecken." lead="Keine Versprechen im Kleingedruckten, sondern Verhalten, das ihr in der App seht." />
          <KeyList items={STEPS} />
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <SectionHead title="Was Festag liest, und was nicht." lead="Festag braucht Signale, um verständlich zu berichten. Mehr nicht." />
          <Reveal className="sec-table">
            <div className="sec-tr sec-th">
              <span>Signal</span>
              <span>Quelle</span>
              <span>Grenze</span>
            </div>
            {READS.map(([a, b, c]) => (
              <div key={a} className="sec-tr">
                <b>{a}</b>
                <span>{b}</span>
                <span>{c}</span>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <SectionHead title="Eure Daten bleiben eure." />
          <Bento>
            <BentoCell title="Server in Deutschland" body="Hosting und Verarbeitung in der EU, DSGVO-konform. Auftragsverarbeitung (AVV) ist Teil von Enterprise." />
            <BentoCell title="Kein Training" body="Festag trainiert keine öffentlichen Modelle auf eurem Workspace. Sprachmodelle sind austauschbare Zulieferer, nie die Marke." />
            <BentoCell title="Export und Löschung" body="Persönliche Profile sind Opt-in. Export und Löschung sind jederzeit möglich." />
            <BentoCell title="Zugriff geprüft" body="Jede Schnittstelle prüft den Aufrufer selbst und den Zugriff auf das Projekt. Tokens sind persönlich, gehasht und widerrufbar." />
            <BentoCell title="Rechte pro Verbindung" body="Für jede Verbindung lässt sich einstellen, was Festag darf. Gesperrte Werkzeuge lehnt die Schnittstelle ab." />
            <BentoCell title="Du entscheidest den Modus" body="Manuell, Freigabe oder automatisch, pro Projekt. Festag erzwingt nie Automatisierung, es bietet sie an." />
          </Bento>
        </div>
      </section>

      <CtaBand
        title="Fragen zu Sicherheit oder Datenschutz?"
        lead="Wir antworten direkt, mit Unterlagen für euer Security-Team."
        facts={["security@festag.app", "AVV und Security-Review in Enterprise", "Antwort in 24 Stunden"]}
      />
    </>
  );
}
