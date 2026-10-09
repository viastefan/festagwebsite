"use client";

import { useCallback, useMemo, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Icon, type IconName } from "../ui/Icon";
import { Window } from "../ui/Window";
import { demoProjects } from "@/lib/site/demo";
import { useInterval } from "./hooks";

const EASE = [0.16, 1, 0.3, 1] as const;

const SIDE: { label: string; icon: IconName; count?: number }[] = [
  { label: "Executive", icon: "chart" },
  { label: "Projekte", icon: "folder", count: 5 },
  { label: "Entscheidungen", icon: "decision", count: 4 },
  { label: "Activity", icon: "signal" },
  { label: "Objectives", icon: "target" },
  { label: "Tagro", icon: "sparkles" },
];

type Sort = "health" | "decisions" | "updated";

export function ExecutiveDemo() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3, once: false });
  const [sel, setSel] = useState(1);
  const [sort, setSort] = useState<Sort>("health");
  const [touched, setTouched] = useState(false);

  const rows = useMemo(() => {
    const r = [...demoProjects];
    if (sort === "health") r.sort((a, b) => a.health - b.health);
    if (sort === "decisions") r.sort((a, b) => b.decisions - a.decisions);
    return r;
  }, [sort]);

  const tick = useCallback(() => setSel((i) => (i + 1) % demoProjects.length), []);
  useInterval(tick, 3000, inView && !reduced && !touched);

  const selected = rows[sel % rows.length];
  const avg = Math.round(demoProjects.reduce((s, p) => s + p.health, 0) / demoProjects.length);

  return (
    <div ref={ref} className="ex">
      <Window title="Festag · Executive" full>
        <div className="app">
          <aside className="app-side">
            <div className="app-side-label">Studio Nord</div>
            {SIDE.map((s, i) => (
              <div key={s.label} className="app-side-item" aria-current={i === 0}>
                <Icon name={s.icon} />
                {s.label}
                {s.count ? <span className="count">{s.count}</span> : null}
              </div>
            ))}
          </aside>
          <div className="app-main">
            <div className="app-head">
              <div>
                <div className="app-title">Portfolio · KW 41</div>
                <div className="app-sub">Was läuft, was blockiert, wo du entscheiden musst.</div>
              </div>
              <span className="app-pill app-pill--accent">
                <Icon name="audio" size={12} /> Briefing 2:10
              </span>
            </div>

            <div className="ex-kpis">
              <Kpi label="Portfolio-Health" value={avg} active={inView} />
              <Kpi label="Offene Entscheidungen" value={4} active={inView} />
              <Kpi label="Risiken" value={2} active={inView} tone="risk" />
              <Kpi label="Im Plan" value={3} suffix=" / 5" active={inView} />
            </div>

            <div className="ex-table app-card">
              <div className="ex-thead">
                <span>Projekt</span>
                <div className="ex-sort" role="tablist" aria-label="Sortieren">
                  {(
                    [
                      ["health", "Health"],
                      ["decisions", "Entscheidungen"],
                      ["updated", "Aktualisiert"],
                    ] as [Sort, string][]
                  ).map(([k, l]) => (
                    <button
                      key={k}
                      type="button"
                      role="tab"
                      aria-selected={sort === k}
                      onClick={() => {
                        setTouched(true);
                        setSort(k);
                      }}
                    >
                      {l}
                    </button>
                  ))}
                </div>
              </div>
              <motion.ul layout={!reduced}>
                {rows.map((p, i) => (
                  <motion.li key={p.id} layout={!reduced} transition={{ duration: 0.4, ease: EASE }}>
                    <button
                      type="button"
                      className="app-row ex-row"
                      aria-pressed={selected.id === p.id}
                      onClick={() => {
                        setTouched(true);
                        setSel(i);
                      }}
                    >
                      <span>
                        <span className="app-row-title">{p.name}</span>
                        <span className="app-row-sub" style={{ display: "block" }}>
                          {p.client} · {p.phase}
                        </span>
                      </span>
                      <span className="ex-row-right">
                        <span className={`bar bar--${p.tone === "ok" ? "ok" : p.tone === "warn" ? "warn" : "accent"} ex-bar`}>
                          <i style={{ width: inView || reduced ? `${p.health}%` : "0%" }} />
                        </span>
                        <span className="ex-num">{p.health}</span>
                      </span>
                    </button>
                  </motion.li>
                ))}
              </motion.ul>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={selected.id}
                className="ex-detail"
                initial={reduced ? false : { opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: EASE }}
              >
                <Icon name="sparkles" size={14} />
                <span>
                  <strong>{selected.name}:</strong> {selected.next}.{" "}
                  {selected.decisions > 0
                    ? `${selected.decisions} Entscheidung${selected.decisions > 1 ? "en" : ""} offen.`
                    : "Keine Entscheidung nötig."}{" "}
                  <em>Aktualisiert {selected.updated}</em>
                </span>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Window>
      <style>{EX_CSS}</style>
    </div>
  );
}

function Kpi({
  label,
  value,
  suffix,
  tone,
  active,
}: {
  label: string;
  value: number;
  suffix?: string;
  tone?: "risk";
  active: boolean;
}) {
  return (
    <div className="ex-kpi">
      <span>{label}</span>
      <strong className={tone === "risk" ? "is-risk" : undefined}>
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: active ? 1 : 0.3 }}>
          {value}
        </motion.span>
        {suffix ? <em>{suffix}</em> : null}
      </strong>
    </div>
  );
}

const EX_CSS = `
.ex-kpis { display: grid; grid-template-columns: repeat(4, 1fr); gap: 10px; }
.ex-kpi { background: #fff; border: var(--hair) solid var(--line); border-radius: 7px; padding: 12px 14px; display: grid; gap: 4px; }
.ex-kpi > span { font-size: 11.5px; color: var(--faint); }
.ex-kpi strong { font-weight: 400; font-size: 24px; color: var(--ink); font-variant-numeric: tabular-nums; }
.ex-kpi strong.is-risk { color: var(--burgundy); }
.ex-kpi em { font-style: normal; font-size: 14px; color: var(--faint); }
.ex-table { padding: 6px; }
.ex-thead { display: flex; align-items: center; justify-content: space-between; gap: 10px; padding: 8px 10px 6px; font-size: 11.5px; color: var(--faint); }
.ex-sort { display: flex; gap: 2px; }
.ex-sort button { height: 24px; padding: 0 9px; border-radius: 999px; font-size: 11.5px; color: var(--faint); transition: all var(--dur) ease; }
.ex-sort button[aria-selected="true"] { background: var(--surface-2); color: var(--ink); }
.ex-row-right { display: flex; align-items: center; gap: 10px; }
.ex-bar { width: 110px; }
.ex-num { width: 24px; text-align: right; font-variant-numeric: tabular-nums; color: var(--ink); }
.ex-detail {
  display: grid; grid-template-columns: 16px 1fr; gap: 10px; padding: 12px 14px; border-radius: 7px;
  background: var(--burgundy-tint); color: var(--burgundy); font-size: 13px; line-height: 1.5;
}
.ex-detail svg { margin-top: 3px; }
.ex-detail span { color: var(--ink-2); }
.ex-detail strong { font-weight: 400; color: var(--ink); }
.ex-detail em { font-style: normal; color: var(--faint); margin-left: 4px; }
@container (max-width: 620px) {
  .ex-kpis { grid-template-columns: repeat(2, 1fr); }
  .ex-bar { width: 64px; }
  .ex-sort button:nth-child(3) { display: none; }
}
`;
