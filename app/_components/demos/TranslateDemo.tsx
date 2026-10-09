"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Icon } from "../ui/Icon";
import { Window } from "../ui/Window";
import { demoTranslations } from "@/lib/site/demo";
import { useTimeline } from "./hooks";

const EASE = [0.16, 1, 0.3, 1] as const;
const VIEWS = ["Intern", "Kunde sieht"] as const;
// 0 show raw · 1 show client · loop to next example
const AUTO = [2600, 4400] as const;

/** Internal chaos vs. client-ready translation. Toggle or let it play. */
export function TranslateDemo() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const [idx, setIdx] = useState(0);
  const [manualView, setManualView] = useState<number | null>(null);

  const next = useCallback(() => setIdx((i) => (i + 1) % demoTranslations.length), []);
  const [step] = useTimeline(AUTO, inView && !reduced && manualView === null, next);
  const view = manualView ?? (reduced ? 1 : step);
  const t = demoTranslations[idx];

  return (
    <div ref={ref} className="td">
      <Window url="studio-nord.kunden.festag.app" full>
        <div className="td-body">
          <div className="td-top">
            <div className="tabs" role="tablist" aria-label="Ansicht">
              {VIEWS.map((v, i) => (
                <button
                  key={v}
                  type="button"
                  role="tab"
                  aria-selected={view === i}
                  onClick={() => setManualView(i)}
                >
                  {view === i ? (
                    <motion.span
                      layoutId="td-thumb"
                      className="tabs-thumb"
                      style={{ inset: 0, position: "absolute" }}
                      transition={{ type: "spring", stiffness: 500, damping: 38 }}
                    />
                  ) : null}
                  <span style={{ position: "relative" }}>{v}</span>
                </button>
              ))}
            </div>
            <div className="td-pager">
              {demoTranslations.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Beispiel ${i + 1}`}
                  className={i === idx ? "is-active" : ""}
                  onClick={() => {
                    setIdx(i);
                    setManualView((v) => v ?? 1);
                  }}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            {view === 0 ? (
              <motion.div
                key={`raw-${idx}`}
                className="td-raw"
                initial={reduced ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6, filter: "blur(3px)" }}
                transition={{ duration: 0.35, ease: EASE }}
              >
                <div className="td-raw-head">
                  <Icon name="slack" size={14} />
                  <span>#projekt-intern</span>
                  <em>{t.source}</em>
                </div>
                <p className="mono">{t.raw}</p>
              </motion.div>
            ) : (
              <motion.div
                key={`client-${idx}`}
                className="td-client"
                initial={reduced ? false : { opacity: 0, y: 8, filter: "blur(4px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.5, ease: EASE }}
              >
                <div className="td-client-head">
                  <span className="tag tag--accent">Projekt-Update</span>
                  <span className="td-client-src">
                    <Icon name="shield" size={12} /> Belegt · {t.source}
                  </span>
                </div>
                <p>{t.client}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <div className="td-foot">
            <span>
              <Icon name="eye" size={13} /> Kunden sehen nie rohe Tickets, Threads oder Commits.
            </span>
          </div>
        </div>
      </Window>
      <style>{TD_CSS}</style>
    </div>
  );
}

const TD_CSS = `
.td-body { padding: 20px; min-height: 360px; background: var(--canvas); display: flex; flex-direction: column; gap: 16px; }
.td-top { display: flex; align-items: center; justify-content: space-between; gap: 12px; }
.td-pager { display: flex; gap: 6px; }
.td-pager button { width: 8px; height: 8px; border-radius: 50%; background: var(--surface-3); transition: background var(--dur) ease, transform var(--dur) var(--ease); }
.td-pager button.is-active { background: var(--accent); transform: scale(1.2); }
.td-raw, .td-client { flex: 1; border-radius: 8px; padding: 18px; }
.td-raw { background: #fff; border: var(--hair) dashed var(--line-strong); }
.td-raw-head { display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: var(--muted); }
.td-raw-head em { margin-left: auto; font-style: normal; font-size: 11.5px; color: var(--faint); }
.td-raw p { margin-top: 12px; font-size: 13.5px; line-height: 1.6; color: var(--ink-2); }
.td-client { background: #fff; border: 1px solid rgba(59, 111, 212,0.22); box-shadow: 0 0 0 4px var(--accent-soft), var(--sh-sm); }
.td-client-head { display: flex; align-items: center; justify-content: space-between; gap: 10px; flex-wrap: wrap; }
.td-client-src { display: inline-flex; align-items: center; gap: 6px; font-size: 11.5px; color: var(--faint); }
.td-client p { margin-top: 14px; font-size: 18px; line-height: 1.5; color: var(--ink);  }
.td-foot span { display: inline-flex; align-items: center; gap: 7px; font-size: 12px; color: var(--faint); }
`;
