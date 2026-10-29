import { Reveal } from "./Reveal";
import { Button } from "./Button";
import { links } from "@/lib/site/links";

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
  // the prop stays for callers but renders nothing.
  void eyebrow;
  return (
    <Reveal className={`sec-head${center ? " sec-head--center" : ""}`}>
      <H className={as === "h1" ? "display display--sm" : "h2"}>{title}</H>
      {lead ? <p className="lead">{lead}</p> : null}
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
  title = "Festag jetzt testen.",
  lead = "Erster Workspace kostenlos. Tools verbinden, Aven öffnen — in zehn Minuten sehen, was wirklich läuft.",
}: {
  title?: string;
  lead?: string;
}) {
  return (
    <section className="section">
      <div className="wrap">
        <Reveal className="cta">
          <h2 className="cta-title">{title}</h2>
          <p className="lead">{lead}</p>
          <div className="btn-row">
            <Button href={links.register} variant="solid" size="lg" arrow>
              Kostenlos starten
            </Button>
            <Button href="/contact" variant="soft" size="lg">
              Demo anfragen
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
