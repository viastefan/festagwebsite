import type { Metadata } from "next";
import { Button } from "../_components/ui/Button";
import { Icon, type IconName } from "../_components/ui/Icon";
import { Reveal, RevealGroup, RevealItem } from "../_components/ui/Reveal";
import { CtaBand, PageHero, SectionHead } from "../_components/ui/Section";
import { Stage } from "../_components/ui/Window";
import { FestagMark } from "../_components/ui/Logo";
import { IconCard } from "../_components/site/Blocks";
import { links } from "@/lib/site/links";

export const metadata: Metadata = {
  title: "Chrome Extension",
  description:
    "Status, Entscheidungen und Evidence direkt im Browser erfassen — die Festag Chrome Extension, ohne Kontextwechsel.",
};

const FEATURES: { icon: IconName; title: string; body: string }[] = [
  { icon: "signal", title: "Status-Note in Sekunden", body: "Ein Satz reicht. Tagro ordnet ihn dem Projekt zu und macht daraus Fortschritt." },
  { icon: "decision", title: "Entscheidung anfragen", body: "Aus Slack Web, Jira oder Linear heraus — mit Kontext der aktuellen Seite." },
  { icon: "eye", title: "Screenshot als Evidence", body: "Bereich markieren, Projekt wählen — der Beleg hängt am richtigen Meilenstein." },
  { icon: "sparkles", title: "Tagro fragen", body: "Wie steht Atlas? Was blockiert? Antworten mit Quelle, ohne Tab-Wechsel." },
  { icon: "lock", title: "Nur was ihr sendet", body: "Kein Tab-Tracking, kein Seiten-Mitlesen. Die Extension sieht nur, was ihr aktiv teilt." },
  { icon: "bolt", title: "Tastenkürzel", body: "⌘⇧F öffnet Festag überall. Enter sendet. Esc schließt." },
];

const STEPS = [
  { title: "Installieren", body: "Extension laden und mit eurem Festag-Workspace verbinden — in unter einer Minute." },
  { title: "Signale erfassen", body: "Status, Entscheidungen und Notizen dort erfassen, wo ihr arbeitet." },
  { title: "Klarheit behalten", body: "Tagro und Dashboard bleiben synchron — ohne ein weiteres Tool zu stapeln." },
];

export default function ExtensionPage() {
  return (
    <>
      <PageHero
        eyebrow="Chrome Extension"
        title={
          <>
            Signale erfassen, <span className="serif accent">wo Arbeit passiert.</span>
          </>
        }
        lead="Die Festag Extension bringt Status-Notes, Entscheidungen und Evidence in jeden Tab — ohne Kontextwechsel, ohne Tracking."
      >
        <div className="btn-row">
          <Button href={links.register} variant="solid" size="lg" arrow>
            Workspace verbinden
          </Button>
          <Button href="/docs#extension" variant="soft" size="lg">
            Anleitung
          </Button>
        </div>
      </PageHero>

      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <Reveal>
            <Stage pad caption="Festag im Browser">
              <div className="xt-scene">
                <div className="window window--full xt-browser">
                  <div className="window-bar">
                    <div className="window-dots" aria-hidden>
                      <span />
                      <span />
                      <span />
                    </div>
                    <div className="window-url">
                      <Icon name="lock" />
                      <span>linear.app/studio-nord/issue/ATL-88</span>
                    </div>
                    <div className="xt-ext" aria-hidden>
                      <FestagMark className="xt-ext-mark" />
                    </div>
                  </div>
                  <div className="xt-page">
                    <div className="xt-issue">
                      <span className="small">ATL-88</span>
                      <div className="h4" style={{ marginTop: 6 }}>
                        OAuth-Callback schlägt in Staging fehl
                      </div>
                      <div className="xt-lines">
                        <span className="skeleton" style={{ width: "92%" }} />
                        <span className="skeleton" style={{ width: "78%" }} />
                        <span className="skeleton" style={{ width: "84%" }} />
                        <span className="skeleton" style={{ width: "40%" }} />
                      </div>
                      <div className="xt-meta">
                        <span className="status status--risk">
                          <i />
                          Blocked
                        </span>
                        <span className="small">Mara K. · vor 2 Std</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="xt-popup">
                  <div className="xt-popup-head">
                    <FestagMark className="xt-popup-mark" />
                    <span>Festag</span>
                    <span className="tag" style={{ marginLeft: "auto" }}>
                      Atlas Kundenportal
                    </span>
                  </div>
                  <div className="xt-popup-tabs">
                    <span className="is-on">Status</span>
                    <span>Entscheidung</span>
                    <span>Evidence</span>
                  </div>
                  <div className="xt-popup-input">
                    Login hängt am fehlenden API-Zugang des Kunden. Ohne Zugang bis Mittwoch rutscht der Meilenstein.
                  </div>
                  <div className="xt-popup-detect">
                    <Icon name="sparkles" size={13} />
                    Tagro erkennt: <strong>Blocker</strong> · verknüpft mit ATL-88
                  </div>
                  <div className="xt-popup-foot">
                    <span className="kbd">⌘ Enter</span>
                    <span className="btn btn--accent btn--sm">Senden</span>
                  </div>
                </div>
              </div>
            </Stage>
          </Reveal>
        </div>
      </section>

      <section className="section section--tight">
        <div className="wrap wrap--wide">
          <SectionHead title="Alles, was ein Projekt-Update braucht. In jedem Tab." />
          <RevealGroup className="grid-3">
            {FEATURES.map((f) => (
              <RevealItem key={f.title}>
                <IconCard icon={f.icon} title={f.title} body={f.body} />
              </RevealItem>
            ))}
          </RevealGroup>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="wrap wrap--wide">
          <SectionHead eyebrow="In drei Schritten" title="Installiert in unter einer Minute." />
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

      <CtaBand />

      <style>{`
        .xt-scene { position: relative; max-width: 980px; margin: 0 auto; padding-bottom: 40px; }
        .xt-browser { max-width: 820px; }
        .xt-ext { justify-self: end; width: 26px; height: 26px; border-radius: 8px; background: var(--ink); color: #fff; display: grid; place-items: center; box-shadow: 0 0 0 3px var(--burgundy-soft); }
        .xt-ext-mark { width: 13px; height: 13px; }
        .xt-page { padding: 28px; min-height: 340px; background: #fff; }
        .xt-issue { max-width: 460px; }
        .xt-lines { display: grid; gap: 10px; margin-top: 18px; }
        .xt-lines span { height: 9px; display: block; }
        .xt-meta { display: flex; gap: 16px; align-items: center; margin-top: 22px; }
        .xt-popup {
          position: absolute; right: 0; top: 56px; width: min(360px, 90%);
          background: #fff; border-radius: 18px; border: 1px solid var(--line); box-shadow: var(--sh-lg);
          padding: 16px; display: grid; gap: 12px; animation: fs-float 6s ease-in-out infinite;
        }
        .xt-popup-head { display: flex; align-items: center; gap: 8px; font-size: 14px; color: var(--ink); }
        .xt-popup-mark { width: 18px; height: 18px; }
        .xt-popup-tabs { display: flex; gap: 4px; }
        .xt-popup-tabs span { height: 28px; padding: 0 10px; display: inline-flex; align-items: center; border-radius: 999px; font-size: 12.5px; color: var(--muted); }
        .xt-popup-tabs span.is-on { background: var(--surface-2); color: var(--ink); }
        .xt-popup-input { padding: 12px 14px; border-radius: 12px; border: 1px solid var(--burgundy); box-shadow: 0 0 0 4px var(--burgundy-soft); font-size: 13.5px; line-height: 1.5; color: var(--ink); }
        .xt-popup-detect { display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: var(--muted); }
        .xt-popup-detect svg { color: var(--burgundy); }
        .xt-popup-detect strong { font-weight: 400; color: var(--burgundy); }
        .xt-popup-foot { display: flex; align-items: center; justify-content: space-between; }
        @media (max-width: 760px) {
          .xt-popup { position: relative; top: 0; right: auto; width: 100%; margin-top: -60px; animation: none; }
          .xt-scene { padding-bottom: 0; }
        }
      `}</style>
    </>
  );
}
