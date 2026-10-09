import type { Metadata } from "next";
import Image from "next/image";
import { Button, TextLink } from "../_components/ui/Button";
import { Icon, type IconName } from "../_components/ui/Icon";
import { Reveal, RevealGroup, RevealItem } from "../_components/ui/Reveal";
import { CtaBand } from "../_components/ui/Section";
import { VoicesGrid } from "../_components/site/Blocks";

export const metadata: Metadata = {
  title: "Community",
  description:
    "Agenturen, Studios und Teams, die Delivery neu denken: Early Access, Partner-Programm, Office Hours und Roadmap mit dem Festag-Produktteam.",
};

const JOIN_MAIL = "mailto:hello@festag.app?subject=Festag%20Community";
const PARTNER_MAIL = "mailto:hello@festag.app?subject=Festag%20Partner-Programm";

const STRIP = [
  { src: "/brand/bg-office.jpg", alt: "Team im Studio", pos: "center 45%" },
  { src: "/media/brand-world.jpg", alt: "Festag Markenwelt", pos: "center" },
  { src: "/media/team-studio.jpg", alt: "Team mit Laptop in einem hellen Haus", pos: "center 40%" },
  { src: "/media/voice-orb.jpg", alt: "Festag Voice Intelligence", pos: "center" },
  { src: "/media/waves-dark.jpg", alt: "Signale als Wellen", pos: "center" },
];

const PROGRAMS: { icon: IconName; title: string; body: string; cta: { label: string; href: string } }[] = [
  {
    icon: "sparkles",
    title: "Early Access",
    body: "Neue Funktionen zuerst nutzen — Operational DNA, Executive Forecast, Cursor Agents — und direkt Feedback geben.",
    cta: { label: "Platz anfragen", href: JOIN_MAIL },
  },
  {
    icon: "layers",
    title: "Partner-Programm",
    body: "Für Agenturen und Studios: Festag unter eigener Marke anbieten und Kunden Workspaces inklusive geben.",
    cta: { label: "Partner werden", href: PARTNER_MAIL },
  },
  {
    icon: "people",
    title: "Office Hours",
    body: "Live-Sessions mit dem Produktteam: eure Delivery-Fragen, echte Projekte, offene Roadmap.",
    cta: { label: "Teilnehmen", href: JOIN_MAIL },
  },
  {
    icon: "target",
    title: "Roadmap & Feedback",
    body: "Was als Nächstes kommt, entscheiden echte Teams. Wünsche landen direkt beim Produktteam.",
    cta: { label: "Changelog ansehen", href: "/changelog" },
  },
];

const PRINCIPLES = [
  { k: "Ehrlich", v: "Wir zeigen, was Festag kann — und was noch nicht." },
  { k: "Praktisch", v: "Es geht um echte Projekte, nicht um Demos." },
  { k: "Ruhig", v: "Kein Hype, keine Growth-Hacks. Klarheit für Kunden." },
];

export default function CommunityPage() {
  return (
    <>
      <section className="page-hero page-hero--center cm-hero">
        <div className="wrap">
          <Reveal>
            <h1 className="display">
              Werde Teil der
              <br />
              Festag-Community.
            </h1>
            <p className="lead">
              Agenturen, Studios und Teams, die Delivery neu denken — mit Early Access, Partner-Programm und Office Hours
              direkt mit dem Produktteam.
            </p>
            <div className="btn-row">
              <Button href={JOIN_MAIL} variant="solid" size="lg">
                Community beitreten
              </Button>
              <Button href="#programme" variant="text" size="lg">
                Programme ansehen
              </Button>
            </div>
          </Reveal>
        </div>
      </section>

      <Reveal className="cm-strip" y={24}>
        {STRIP.map((s, i) => (
          <div key={s.src} className={`cm-tile cm-tile--${i}`}>
            <Image src={s.src} alt={s.alt} fill sizes="(max-width: 760px) 70vw, 28vw" style={{ objectFit: "cover", objectPosition: s.pos }} />
          </div>
        ))}
      </Reveal>

      <section className="section" id="programme">
        <div className="wrap wrap--wide">
          <Reveal className="cm-head">
            <h2 className="h3">
              Vier Wege, mitzubauen.
              <span style={{ display: "block", color: "var(--muted)" }}>
                Jeder davon ist kostenlos — und jeder macht Festag besser.
              </span>
            </h2>
          </Reveal>
          <RevealGroup className="cm-programs">
            {PROGRAMS.map((p) => (
              <RevealItem key={p.title} className="cm-program">
                <span className="cm-icon">
                  <Icon name={p.icon} size={18} />
                </span>
                <h3 className="h4">{p.title}</h3>
                <p className="body" style={{ fontSize: 14.5 }}>
                  {p.body}
                </p>
                <TextLink href={p.cta.href}>{p.cta.label}</TextLink>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <Reveal className="cm-split">
            <div className="cm-split-media">
              <Image
                src="/media/team-studio.jpg"
                alt="Ein kleines Team arbeitet entspannt zusammen"
                fill
                sizes="(max-width: 960px) 100vw, 55vw"
                style={{ objectFit: "cover", objectPosition: "center 40%" }}
              />
            </div>
            <div className="cm-split-copy">
              <p className="h3">Wofür diese Community steht.</p>
              <dl className="cm-principles">
                {PRINCIPLES.map((p) => (
                  <div key={p.k}>
                    <dt>{p.k}</dt>
                    <dd>{p.v}</dd>
                  </div>
                ))}
              </dl>
              <TextLink href="/company">Das Team dahinter</TextLink>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <Reveal>
            <h2 className="h3" style={{ marginBottom: 24 }}>
              Aus dem Early Access
            </h2>
          </Reveal>
          <VoicesGrid limit={3} />
        </div>
      </section>

      <CtaBand title="Bau mit uns." lead="Schreib uns, woran ihr arbeitet — wir melden uns innerhalb von 24 Stunden." />

      <style>{`
        .cm-hero { padding-bottom: clamp(40px, 6vw, 72px); }
        .cm-hero .display { margin-inline: auto; }
        .cm-strip {
          display: grid; grid-template-columns: 0.9fr 1.3fr 1.3fr 1.3fr 0.9fr; gap: 10px;
          height: clamp(260px, 34vw, 480px); padding-inline: 0; overflow: hidden;
        }
        .cm-tile { position: relative; overflow: hidden; border-radius: var(--r-lg); background: var(--surface-3); }
        .cm-tile--0 { border-radius: 0 var(--r-lg) var(--r-lg) 0; }
        .cm-tile--4 { border-radius: var(--r-lg) 0 0 var(--r-lg); }
        .cm-head { margin-bottom: clamp(24px, 4vw, 40px); max-width: 760px; }
        .cm-programs { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 10px; }
        .cm-program {
          display: grid; gap: 10px; align-content: start; padding: 22px; border-radius: var(--r-xl);
          background: var(--surface-2); border: var(--hair) solid var(--line);
        }
        .cm-program .link { margin-top: 6px; font-size: 14.5px; }
        .cm-icon { width: 38px; height: 38px; border-radius: 10px; background: #fff; color: var(--accent); display: grid; place-items: center; box-shadow: 0 0 0 var(--hair) var(--line), var(--sh-xs); margin-bottom: 6px; }
        .cm-split {
          display: grid; grid-template-columns: minmax(0, 8fr) minmax(0, 5fr); gap: clamp(16px, 2vw, 24px);
          padding: clamp(12px, 1.4vw, 18px); border-radius: var(--r-xl); background: var(--surface-2);
        }
        .cm-split-media { position: relative; min-height: clamp(260px, 32vw, 440px); border-radius: var(--r-lg); overflow: hidden; }
        .cm-split-copy { display: grid; align-content: center; gap: 20px; padding: clamp(14px, 2vw, 28px); }
        .cm-principles { margin: 0; display: grid; gap: 14px; }
        .cm-principles div { display: grid; gap: 2px; padding-top: 12px; border-top: var(--hair) solid var(--line); }
        .cm-principles dt { font-size: 15px; font-weight: 500; color: var(--ink); }
        .cm-principles dd { margin: 0; font-size: 14.5px; color: var(--muted); }
        @media (max-width: 1100px) { .cm-programs { grid-template-columns: 1fr 1fr; } }
        @media (max-width: 960px) { .cm-split { grid-template-columns: 1fr; } }
        @media (max-width: 760px) {
          .cm-strip { grid-template-columns: 0.4fr 1fr 0.4fr; height: 300px; }
          .cm-tile--3, .cm-tile--4 { display: none; }
          .cm-tile--2 { border-radius: var(--r-lg) 0 0 var(--r-lg); }
        }
        @media (max-width: 560px) { .cm-programs { grid-template-columns: 1fr; } }
      `}</style>
    </>
  );
}
