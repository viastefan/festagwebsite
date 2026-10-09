import type { Metadata } from "next";
import { Icon, type IconName } from "../_components/ui/Icon";
import { Reveal, RevealGroup, RevealItem } from "../_components/ui/Reveal";
import { PageHero } from "../_components/ui/Section";
import { ContactForm } from "../_components/site/ContactForm";

export const metadata: Metadata = {
  title: "Kontakt",
  description: "Sales, Support, Security und Careers — direkt und ruhig.",
};

const CHANNELS: { icon: IconName; title: string; body: string; mail: string }[] = [
  { icon: "sparkles", title: "Sales & Demos", body: "Für Teams und Organisationen, die Festag evaluieren.", mail: "hello@festag.app" },
  { icon: "people", title: "Support", body: "Für bestehende Workspaces — ruhig, konkret, schnell.", mail: "support@festag.app" },
  { icon: "shield", title: "Security", body: "Security Reviews und Responsible Disclosure.", mail: "security@festag.app" },
  { icon: "mail", title: "Careers", body: "Rollen und Initiativbewerbungen.", mail: "careers@festag.app" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Kontakt"
        title={
          <>
            Sprecht mit Menschen, die <span className="serif accent">zuhören.</span>
          </>
        }
        lead="Wir zeigen Festag an euren echten Projekten — kein Pitch-Deck-Theater. Antwort werktags innerhalb von 24 Stunden."
      />
      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <div className="ct">
            <Reveal>
              <ContactForm />
            </Reveal>
            <RevealGroup className="ct-channels">
              {CHANNELS.map((c) => (
                <RevealItem key={c.title}>
                  <a href={`mailto:${c.mail}`} className="ct-channel">
                    <span className="card-icon" style={{ margin: 0 }}>
                      <Icon name={c.icon} />
                    </span>
                    <span>
                      <span className="h4" style={{ display: "block" }}>
                        {c.title}
                      </span>
                      <span className="small" style={{ display: "block", marginTop: 2 }}>
                        {c.body}
                      </span>
                      <span className="ct-mail">{c.mail}</span>
                    </span>
                  </a>
                </RevealItem>
              ))}
            </RevealGroup>
          </div>
        </div>
      </section>
      <style>{`
        .ct { display: grid; grid-template-columns: minmax(0, 7fr) minmax(0, 5fr); gap: clamp(20px, 4vw, 48px); align-items: start; }
        .ct-channels { display: grid; gap: 10px; }
        .ct-channel {
          display: grid; grid-template-columns: 36px 1fr; gap: 14px; padding: 18px 20px; border-radius: 18px;
          background: var(--surface-2); transition: background var(--dur) ease;
        }
        .ct-channel:hover { background: var(--surface-3); }
        .ct-mail { display: inline-block; margin-top: 8px; font-size: 14px; color: var(--burgundy); }
        @media (max-width: 960px) { .ct { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
}
