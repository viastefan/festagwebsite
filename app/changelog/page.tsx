import type { Metadata } from "next";
import { Reveal } from "../_components/ui/Reveal";
import { CtaBand, PageHero } from "../_components/ui/Section";
import { formatDate } from "../_components/site/Blocks";
import { changelog } from "@/lib/site/content";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Was neu ist in Festag — Connectors, Tagro, Executive, Adaptive Intelligence.",
};

export default function ChangelogPage() {
  return (
    <>
      <PageHero
        eyebrow="Changelog"
        title={
          <>
            Was neu ist. <span className="serif accent">Ohne Nebel.</span>
          </>
        }
        lead="Jede Woche ein Stück mehr Klarheit. Hier steht, was ausgeliefert wurde — und warum."
      />
      <section className="section section--flush-top">
        <div className="wrap">
          <ol className="cl">
            {changelog.map((e) => (
              <li key={e.version} id={`v${e.version}`} className="cl-item">
                <Reveal className="cl-grid">
                  <div className="cl-meta">
                    <time dateTime={e.date}>{formatDate(e.date)}</time>
                    <span className="tag tag--outline">v{e.version}</span>
                  </div>
                  <div className="cl-body">
                    <h2 className="h3">{e.title}</h2>
                    <p className="body" style={{ marginTop: 12, fontSize: 16 }}>
                      {e.body}
                    </p>
                    <div className="cl-tags">
                      {e.tags.map((t) => (
                        <span key={t} className="tag tag--accent">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <CtaBand />
      <style>{`
        .cl { display: grid; }
        .cl-item { border-top: 1px solid var(--line); padding-block: clamp(28px, 4vw, 44px); scroll-margin-top: calc(var(--nav-h) + 16px); }
        .cl-grid { display: grid; grid-template-columns: 200px minmax(0, 1fr); gap: clamp(20px, 4vw, 56px); }
        .cl-meta { display: grid; gap: 10px; align-content: start; justify-items: start; font-size: 14px; color: var(--muted); position: sticky; top: calc(var(--nav-h) + 24px); }
        .cl-tags { display: flex; gap: 6px; margin-top: 16px; flex-wrap: wrap; }
        @media (max-width: 720px) { .cl-grid { grid-template-columns: 1fr; } .cl-meta { position: static; display: flex; align-items: center; } }
      `}</style>
    </>
  );
}
