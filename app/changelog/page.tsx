import type { Metadata } from "next";
import Link from "next/link";
import { Reveal } from "../_components/ui/Reveal";
import { CtaBand } from "../_components/ui/Section";
import { Icon } from "../_components/ui/Icon";
import { formatDate } from "../_components/site/Blocks";
import { UpdateArt } from "../_components/site/UpdateArt";
import { changelog } from "@/lib/site/content";

export const metadata: Metadata = {
  title: "Changelog",
  description: "Was neu ist in Festag — Connectors, Tagro, Executive, Adaptive Intelligence.",
};

export default function ChangelogPage() {
  return (
    <>
      <section className="page-hero">
        <div className="wrap cl-wrap">
          <Reveal>
            <h1 className="display display--sm">Changelog</h1>
            <p className="lead" style={{ marginTop: 14 }}>
              Neue Funktionen, Verbesserungen und was wir daraus gelernt haben.
            </p>
          </Reveal>
        </div>
      </section>

      <section className="section section--flush-top">
        <div className="wrap cl-wrap">
          <ol className="cl">
            {changelog.map((e) => (
              <li key={e.version} id={`v${e.version}`} className="cl-item">
                <div className="cl-meta">
                  <span className="cl-version">{e.version}</span>
                  <time dateTime={e.date}>{formatDate(e.date)}</time>
                </div>
                <Reveal className="cl-body">
                  <Link href={`#v${e.version}`} className="cl-title">
                    <h2 className="h3">{e.title}</h2>
                  </Link>
                  <p className="cl-text">{e.body}</p>
                  <div className="cl-media">
                    <UpdateArt art={e.art} />
                  </div>
                  <ul className="cl-list">
                    {e.highlights.map((h) => (
                      <li key={h}>
                        <Icon name="check" size={14} />
                        {h}
                      </li>
                    ))}
                  </ul>
                  <div className="cl-tags">
                    {e.tags.map((t) => (
                      <span key={t} className="tag">
                        {t}
                      </span>
                    ))}
                  </div>
                </Reveal>
              </li>
            ))}
          </ol>
        </div>
      </section>
      <CtaBand />
      <style>{`
        .cl-wrap { max-width: 1040px; }
        .cl { display: grid; }
        .cl-item {
          display: grid; grid-template-columns: 180px minmax(0, 1fr); gap: clamp(20px, 4vw, 64px);
          padding-block: clamp(36px, 5vw, 64px); border-top: var(--hair) solid var(--line);
          scroll-margin-top: calc(var(--nav-h) + 16px);
        }
        .cl-meta { position: sticky; top: calc(var(--nav-h) + 28px); align-self: start; display: grid; gap: 6px; }
        .cl-version {
          justify-self: start; height: 24px; padding: 0 9px; border-radius: 999px; display: inline-flex; align-items: center;
          background: var(--surface-2); font-size: 12.5px; color: var(--ink); font-variant-numeric: tabular-nums;
        }
        .cl-meta time { font-size: 13.5px; color: var(--muted); }
        .cl-title:hover h2 { color: var(--accent); }
        .cl-title h2 { transition: color var(--dur) ease; }
        .cl-text { margin-top: 14px; font-size: 16.5px; line-height: 1.65; color: var(--ink-2); max-width: 64ch; }
        .cl-media { margin-top: 24px; }
        .cl-list { margin-top: 22px; display: grid; gap: 10px; }
        .cl-list li { display: grid; grid-template-columns: 16px 1fr; gap: 10px; font-size: 15px; line-height: 1.5; color: var(--ink-2); }
        .cl-list svg { color: var(--accent); margin-top: 3px; }
        .cl-tags { display: flex; gap: 6px; margin-top: 20px; flex-wrap: wrap; }
        @media (max-width: 760px) {
          .cl-item { grid-template-columns: 1fr; gap: 14px; }
          .cl-meta { position: static; display: flex; align-items: center; gap: 10px; }
        }
      `}</style>
    </>
  );
}
