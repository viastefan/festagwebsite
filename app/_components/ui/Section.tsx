import { Reveal } from "./Reveal";
import { Button } from "./Button";
export function SectionHead({
  eyebrow,
  title,
  lead,
  center,
  as = "h2",
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  center?: boolean;
  as?: "h1" | "h2";
}) {
  const H = as;
  // eyebrow kickers (small uppercase labels) are retired site-wide (2026-10) —
  // the prop stays for callers but renders nothing. Ebenso `lead`: unter Abschnittsköpfen steht kein Text
  // (Regel des Inhabers, 2026-10): Text gehört in Container oder Beschreibungen, nicht unter die Überschrift.
  void eyebrow;
  void lead;
  return (
    <Reveal className={`sec-head${center ? " sec-head--center" : ""}`}>
      <H className={as === "h1" ? "display display--sm" : "h2"}>{title}</H>
    </Reveal>
  );
}

export function PageHero({
  eyebrow,
  title,
  lead,
  children,
  center,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  lead?: React.ReactNode;
  children?: React.ReactNode;
  center?: boolean;
}) {
  void eyebrow;
  return (
    <section className={`page-hero${center ? " page-hero--center" : ""}`}>
      <div className="wrap">
        <Reveal>
          <h1 className="display">{title}</h1>
          {lead ? <p className="lead">{lead}</p> : null}
          {children}
        </Reveal>
      </div>
    </section>
  );
}

export function CtaBand({
  title = "Sieh, was in deinen Projekten wirklich läuft.",
  lead = "Erster Workspace kostenlos. Tools verbinden, Aven fragen, die erste Entscheidung treffen, in zehn Minuten.",
  facts = ["Server in Deutschland", "Nichts geht ohne Freigabe raus"],
}: {
  title?: string;
  lead?: string;
  facts?: string[];
}) {
  const fine = [lead, ...facts]
    .map((part) => part.trim())
    .filter(Boolean)
    .map((part) => (/[.!?]$/.test(part) ? part : `${part}.`))
    .join(" ");
  return (
    <section className="section">
      <div className="wrap">
        <Reveal className="cta">
          <h2 className="cta-title">{title}</h2>
          <p className="cta-fine">{fine}</p>
          <div className="btn-row">
            <Button href="/contact" variant="solid" size="lg" arrow>
              Demo ansehen
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
