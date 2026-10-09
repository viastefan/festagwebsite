import type { Metadata } from "next";
import Link from "next/link";
import { Button, TextLink } from "../_components/ui/Button";
import { Icon } from "../_components/ui/Icon";
import { Reveal, RevealGroup, RevealItem } from "../_components/ui/Reveal";
import { CtaBand } from "../_components/ui/Section";
import { formatDate } from "../_components/site/Blocks";
import { UpdateArt } from "../_components/site/UpdateArt";
import { changelog, principles } from "@/lib/site/content";
import { getAllJobs } from "@/lib/jobs";

export const metadata: Metadata = {
  title: "Unternehmen",
  description:
    "Festag baut die Operational-Intelligence-Schicht für moderne Organisationen. Mission, Haltung und was gerade bei uns passiert.",
};

const FACTS = [
  { k: "Status", v: "Beta · v0.9" },
  { k: "Sitz", v: "Deutschland, remote in DACH" },
  { k: "Hosting", v: "Server in Deutschland" },
  { k: "Kategorie", v: "Operational Intelligence" },
];

const CHAPTERS = [
  {
    n: "01",
    title: "Das Problem",
    body: "Teams arbeiten — aber Kunden und Führung verstehen nicht, was passiert. Status wird von Hand gebaut, Vertrauen geht in E-Mail-Ketten verloren, Marge in Meetings.",
  },
  {
    n: "02",
    title: "Unsere Antwort",
    body: "Festag sitzt über GitHub, Linear, Jira und Slack und macht aus Arbeitssignalen verständlichen Projektstand: Status, Risiken, Entscheidungen — belegt, ruhig, freigegeben.",
  },
  {
    n: "03",
    title: "Wohin es geht",
    body: "Vom Delivery-Layer zum Company Brain: ein System, das versteht, wie eine Organisation entscheidet, liefert und lernt — und mit jedem Projekt besser wird.",
  },
];

export default function CompanyPage() {
  const latest = changelog.slice(0, 4);
  const roles = getAllJobs().length;

  return (
    <>
      <section className="page-hero">
        <div className="wrap co-wrap">
          <Reveal>
            <span className="eyebrow">Unternehmen</span>
            <h1 className="display" style={{ marginTop: 18 }}>
              Wir bauen Software, die <span className="serif accent">versteht,</span> wie Organisationen arbeiten.
            </h1>
            <p className="lead" style={{ marginTop: 22 }}>
              Festag ist eine Operational-Intelligence-Plattform für Agenturen, Software-Teams und Unternehmen mit
              Kundenprojekten. Wir verkaufen keine KI. Wir verkaufen Klarheit, Vertrauen und weniger Status-Arbeit.
            </p>
          </Reveal>
          <Reveal className="co-facts" delay={0.1}>
            {FACTS.map((f) => (
              <div key={f.k}>
                <dt>{f.k}</dt>
                <dd>{f.v}</dd>
              </div>
            ))}
          </Reveal>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="wrap co-wrap">
          <RevealGroup className="co-chapters">
            {CHAPTERS.map((c) => (
              <RevealItem key={c.n} className="co-chapter">
                <span className="co-n">{c.n}</span>
                <h2 className="h4">{c.title}</h2>
                <p className="body">{c.body}</p>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="wrap co-wrap">
          <Reveal className="co-quote">
            <p className="serif">„Das Team arbeitet. Der Kunde rätselt. Festag schließt die Lücke.“</p>
            <span className="small">Unser Leitsatz seit Tag eins</span>
          </Reveal>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="wrap co-wrap">
          <Reveal className="co-split">
            <div>
              <span className="eyebrow">Architektur</span>
              <h2 className="h3" style={{ marginTop: 14 }}>
                <span className="serif">Leqra denkt.</span> Festag handelt.
              </h2>
            </div>
            <p className="body" style={{ fontSize: 16.5 }}>
              Leqra ist unsere Intelligence-Engine: Wissen, Prozesse, Entscheidungslogik. Festag ist die sichtbare
              Ausführungsschicht in drei Modi — Delivery, Teams und Agency. Ein System, drei Oberflächen, eine
              operative Wahrheit. <TextLink href="/intelligence">Modelle & Intelligence</TextLink>
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="wrap co-wrap">
          <Reveal>
            <h2 className="h3">Woran wir glauben</h2>
          </Reveal>
          <RevealGroup className="co-principles">
            {principles.map((p) => (
              <RevealItem key={p.title} className="co-principle">
                <Icon name="check" size={15} />
                <div>
                  <div className="co-p-title">{p.title}</div>
                  <p className="small" style={{ marginTop: 4, fontSize: 14.5 }}>
                    {p.body}
                  </p>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section section--flush-top" id="aktuelles">
        <div className="wrap co-wrap">
          <Reveal className="co-news-head">
            <h2 className="h3">Aktuelles</h2>
            <TextLink href="/changelog">Alle Updates</TextLink>
          </Reveal>
          <ol className="co-news">
            {latest.map((e, i) => (
              <li key={e.version}>
                <Reveal className={`co-news-item${i === 0 ? " is-lead" : ""}`}>
                  <Link href={`/changelog#v${e.version}`} className="co-news-link">
                    {i === 0 ? (
                      <div className="co-news-art">
                        <UpdateArt art={e.art} />
                      </div>
                    ) : null}
                    <div className="co-news-meta">
                      <time dateTime={e.date}>{formatDate(e.date)}</time>
                      <span className="tag">{e.tags[0]}</span>
                    </div>
                    <div className="co-news-title">{e.title}</div>
                    <p className="small" style={{ fontSize: 15, marginTop: 6 }}>
                      {e.body}
                    </p>
                  </Link>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="wrap co-wrap">
          <Reveal className="co-join">
            <div>
              <h2 className="h3">Baue mit uns.</h2>
              <p className="body" style={{ marginTop: 8 }}>
                {roles} offene Rollen — Engineering, Design, AI, Marketing und Operations. Remote in DACH.
              </p>
            </div>
            <div className="btn-row">
              <Button href="/careers" variant="solid" arrow>
                Offene Rollen
              </Button>
              <Button href="/contact" variant="ghost">
                Kontakt
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaBand />

      <style>{`
        .co-wrap { max-width: 1040px; }
        .co-facts { margin: 44px 0 0; display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); border-top: var(--hair) solid var(--line); }
        .co-facts div { padding: 16px 16px 0 0; }
        .co-facts dt { font-size: 12.5px; color: var(--faint); }
        .co-facts dd { margin: 4px 0 0; font-size: 15px; color: var(--ink); }
        .co-chapters { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
        .co-chapter { padding: 22px; border-radius: var(--r-lg); background: var(--surface-2); border: var(--hair) solid var(--line); display: grid; gap: 8px; align-content: start; }
        .co-n { font-size: 12px; letter-spacing: 0.08em; color: var(--burgundy); }
        .co-chapter .body { font-size: 15px; }
        .co-quote { padding: clamp(28px, 5vw, 56px) 0; border-block: var(--hair) solid var(--line); text-align: center; display: grid; gap: 14px; }
        .co-quote p { font-size: clamp(26px, 3.4vw, 40px); line-height: 1.2; color: var(--ink); max-width: 26ch; margin-inline: auto; }
        .co-split { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: clamp(24px, 5vw, 64px); align-items: start; }
        .co-split .link { display: inline-flex; margin-left: 4px; }
        .co-principles { margin-top: 24px; display: grid; grid-template-columns: 1fr 1fr; gap: 0 40px; }
        .co-principle { display: grid; grid-template-columns: 18px 1fr; gap: 12px; padding: 18px 0; border-top: var(--hair) solid var(--line); }
        .co-principle svg { color: var(--burgundy); margin-top: 3px; }
        .co-p-title { font-size: 16px; color: var(--ink); }
        .co-news-head { display: flex; align-items: baseline; justify-content: space-between; gap: 16px; margin-bottom: 20px; }
        .co-news { display: grid; grid-template-columns: 1fr 1fr; gap: 12px; }
        .co-news > li:first-child { grid-row: span 3; }
        .co-news-item { height: 100%; }
        .co-news-link {
          display: block; height: 100%; padding: 18px; border-radius: var(--r-lg); background: var(--surface);
          border: var(--hair) solid var(--line); transition: border-color var(--dur) ease, box-shadow var(--dur) ease;
        }
        .co-news-link:hover { border-color: var(--line-strong); box-shadow: var(--sh-md); }
        .co-news-art { margin: -8px -8px 16px; }
        .co-news-meta { display: flex; align-items: center; gap: 10px; font-size: 13px; color: var(--muted); }
        .co-news-title { margin-top: 10px; font-size: 17px; line-height: 1.35; color: var(--ink); }
        .is-lead .co-news-title { font-size: 22px; }
        .co-join { display: flex; align-items: center; justify-content: space-between; gap: 24px; flex-wrap: wrap; padding: clamp(22px, 3vw, 36px); border-radius: var(--r-xl); background: var(--surface-2); border: var(--hair) solid var(--line); }
        @media (max-width: 860px) {
          .co-facts { grid-template-columns: 1fr 1fr; }
          .co-chapters, .co-principles, .co-news { grid-template-columns: 1fr; }
          .co-news > li:first-child { grid-row: auto; }
          .co-split { grid-template-columns: 1fr; }
        }
      `}</style>
    </>
  );
}
