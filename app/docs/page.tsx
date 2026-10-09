import type { Metadata } from "next";
import Link from "next/link";
import { Icon, type IconName } from "../_components/ui/Icon";
import { Reveal, RevealGroup, RevealItem } from "../_components/ui/Reveal";
import { CtaBand, PageHero } from "../_components/ui/Section";

export const metadata: Metadata = {
  title: "Guides",
  description: "Einstieg in Festag: Workspace, Connectors, Tagro, Client Panel, White-Label und Datenschutz.",
};

type Guide = { title: string; body: string; href: string; time: string };

const SECTIONS: { id: string; icon: IconName; title: string; guides: Guide[] }[] = [
  {
    id: "start",
    icon: "bolt",
    title: "Einstieg",
    guides: [
      { title: "Was Festag ist — und was nicht", body: "Operational Intelligence über eurer Delivery. Kein PM-Tool, kein Chatbot.", href: "/product", time: "3 Min" },
      { title: "Workspace anlegen", body: "Organisation, Modus (Delivery, Teams, Agency) und erste Projekte.", href: "/product#execution", time: "5 Min" },
      { title: "Preise & Pläne", body: "Hobby, Workspace, Partner, Enterprise — und warum Festag pro Workspace statt pro Kopf kostet.", href: "/pricing", time: "2 Min" },
    ],
  },
  {
    id: "connectors",
    icon: "flow",
    title: "Connectors",
    guides: [
      { title: "GitHub, Linear, Jira, Slack verbinden", body: "Scopes, Kanäle, Repos — und was Festag bewusst nicht liest.", href: "/connectors", time: "6 Min" },
      { title: "Die Signal-Taxonomie", body: "Elf Bedeutungen, die jedes Signal bekommen kann.", href: "/connectors", time: "4 Min" },
      { title: "Cursor Cloud Agents (Beta)", body: "Dev-Tasks aus Tagro delegieren — mit Review und Freigabe.", href: "/tagro", time: "4 Min" },
    ],
  },
  {
    id: "tagro",
    icon: "sparkles",
    title: "Tagro & Intelligence",
    guides: [
      { title: "So antwortet Tagro", body: "Zusammenfassung, Kontext, Wirkung, Empfehlung, nächster Schritt.", href: "/tagro", time: "4 Min" },
      { title: "Decision Mode", body: "Optionen, Risiko-Delta und dokumentierte Entscheidungen.", href: "/tagro#demo", time: "3 Min" },
      { title: "Operational DNA & Company Brain", body: "Wie Festag lernt — und wie ihr es steuert.", href: "/intelligence", time: "7 Min" },
    ],
  },
  {
    id: "client",
    icon: "portal",
    title: "Client Experience",
    guides: [
      { title: "Client Panel einrichten", body: "Was Kunden sehen, was intern bleibt, wie Freigaben laufen.", href: "/product#client", time: "5 Min" },
      { title: "Reports mit Freigabe", body: "Tagro schreibt, ihr gebt frei — nichts geht automatisch raus.", href: "/product#decisions", time: "3 Min" },
      { title: "White-Label-Stufen", body: "Co-branded, subtle-branded, full White-Label.", href: "/enterprise#white-label", time: "4 Min" },
    ],
  },
  {
    id: "extension",
    icon: "puzzle",
    title: "Chrome Extension",
    guides: [
      { title: "Installieren & verbinden", body: "In unter einer Minute mit eurem Workspace.", href: "/extension", time: "2 Min" },
      { title: "Status, Entscheidung, Evidence", body: "Die drei Aktionen der Extension im Überblick.", href: "/extension", time: "3 Min" },
    ],
  },
  {
    id: "security",
    icon: "shield",
    title: "Security & Datenschutz",
    guides: [
      { title: "Adaptive Intelligence & Datenschutz", body: "Opt-in-Profile, Aggregate statt Rohdaten, Export und Löschung.", href: "/intelligence#privacy", time: "5 Min" },
      { title: "Enterprise Security", body: "SSO, SCIM, Datenresidenz, DPA.", href: "/enterprise#security", time: "4 Min" },
      { title: "Datenschutzerklärung", body: "Was wir speichern und warum.", href: "/legal/privacy", time: "6 Min" },
    ],
  },
];

export default function DocsPage() {
  return (
    <>
      <PageHero
        eyebrow="Guides"
        title={
          <>
            Alles, um Festag in einer Woche produktiv zu nutzen.
          </>
        }
        lead="Kurze Guides statt Handbuch. Vom ersten Workspace bis zum White-Label-Portal."
      />

      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <div className="dc-layout">
            <nav className="dc-toc" aria-label="Inhalt">
              {SECTIONS.map((s) => (
                <a key={s.id} href={`#${s.id}`}>
                  <Icon name={s.icon} size={15} />
                  {s.title}
                </a>
              ))}
            </nav>
            <div className="dc-sections">
              {SECTIONS.map((s) => (
                <section key={s.id} id={s.id} className="dc-section">
                  <Reveal className="dc-section-head">
                    <span className="card-icon" style={{ margin: 0 }}>
                      <Icon name={s.icon} />
                    </span>
                    <h2 className="h3">{s.title}</h2>
                  </Reveal>
                  <RevealGroup className="rows">
                    {s.guides.map((g) => (
                      <RevealItem key={g.title}>
                        <Link href={g.href} className="row">
                          <span>
                            <span className="row-title" style={{ display: "block" }}>
                              {g.title}
                            </span>
                            <span className="row-body" style={{ display: "block" }}>
                              {g.body}
                            </span>
                          </span>
                          <span className="row-meta">
                            {g.time}
                            <Icon name="arrow" size={16} className="row-arrow" />
                          </span>
                        </Link>
                      </RevealItem>
                    ))}
                  </RevealGroup>
                </section>
              ))}
            </div>
          </div>
        </div>
      </section>

      <CtaBand title="Lieber zeigen lassen?" lead="20 Minuten, eure Tools, eure Projekte. Wir zeigen, was Festag daraus macht." />

      <style>{`
        .dc-layout { display: grid; grid-template-columns: 220px minmax(0, 1fr); gap: clamp(28px, 5vw, 72px); align-items: start; }
        .dc-toc { position: sticky; top: calc(var(--nav-h) + 24px); display: grid; gap: 2px; }
        .dc-toc a { display: flex; align-items: center; gap: 10px; padding: 8px 10px; border-radius: 6px; font-size: 14px; color: var(--muted); transition: all var(--dur) ease; }
        .dc-toc a:hover { background: var(--surface-2); color: var(--ink); }
        .dc-toc svg { color: var(--faint); }
        .dc-sections { display: grid; gap: clamp(40px, 6vw, 64px); }
        .dc-section-head { display: flex; align-items: center; gap: 14px; margin-bottom: 16px; }
        @media (max-width: 860px) { .dc-layout { grid-template-columns: 1fr; } .dc-toc { position: static; grid-template-columns: 1fr 1fr; } }
      `}</style>
    </>
  );
}
