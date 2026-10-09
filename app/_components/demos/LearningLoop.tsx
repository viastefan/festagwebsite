"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { FestagMark } from "../ui/Logo";
import { useInterval } from "./hooks";

const EASE = [0.16, 1, 0.3, 1] as const;

const LOOP = [
  { label: "Projekt startet", body: "Tagro plant mit dem, was eure Organisation schon weiß — nicht mit einer leeren Vorlage." },
  { label: "Team liefert", body: "Arbeit passiert in GitHub, Linear, Jira, Slack. Niemand dokumentiert extra." },
  { label: "Festag beobachtet", body: "Signale werden gelesen, klassifiziert und mit Belegen verknüpft." },
  { label: "Muster entstehen", body: "Wer entscheidet wie schnell? Wo staut es? Was heißt „fertig“ bei euch?" },
  { label: "Company Brain lernt", body: "Muster werden als Operational DNA gespeichert — aggregiert, workspace-gebunden." },
  { label: "Workflow verbessert sich", body: "Planung, Risiko-Hinweise und Briefings passen sich eurer Arbeitsweise an." },
  { label: "Nächstes Projekt ist besser", body: "Jedes Projekt macht das System klüger. Intelligenz, die sich verzinst." },
];

const DNA = [
  { k: "Decision DNA", v: "Bevorzugt Speed vor Perfektion bei MVPs", c: 0.86 },
  { k: "Communication DNA", v: "CEO: kurze Executive Summaries, ohne Technik", c: 0.91 },
  { k: "Quality DNA", v: "„Fertig“ = auf Staging + Kundenfreigabe", c: 0.78 },
  { k: "Delivery DNA", v: "Design-Freigaben sind der häufigste Engpass", c: 0.82 },
];

export function LearningLoop() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);
  const tick = useCallback(() => setActive((i) => (i + 1) % LOOP.length), []);
  useInterval(tick, 2400, inView && !reduced && !touched);

  const R = 150;
  return (
    <div ref={ref} className="ll">
      <div className="ll-ring">
        <svg viewBox="0 0 400 400" className="ll-svg" aria-hidden>
          <circle cx="200" cy="200" r={R} fill="none" stroke="rgba(23,22,27,0.08)" strokeWidth="1.5" />
          <motion.circle
            cx="200"
            cy="200"
            r={R}
            fill="none"
            stroke="var(--burgundy)"
            strokeWidth="2"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * R}
            animate={{ strokeDashoffset: 2 * Math.PI * R * (1 - (active + 1) / LOOP.length) }}
            transition={{ duration: 0.8, ease: EASE }}
            transform="rotate(-90 200 200)"
          />
        </svg>
        {LOOP.map((l, i) => {
          const a = (i / LOOP.length) * Math.PI * 2 - Math.PI / 2;
          const x = 50 + (Math.cos(a) * R * 100) / 400;
          const y = 50 + (Math.sin(a) * R * 100) / 400;
          return (
            <button
              key={l.label}
              type="button"
              className={`ll-dot${i === active ? " is-active" : ""}${i < active ? " is-done" : ""}`}
              style={{ left: `${x}%`, top: `${y}%` }}
              onClick={() => {
                setTouched(true);
                setActive(i);
              }}
              aria-label={l.label}
              aria-pressed={i === active}
            >
              {i + 1}
            </button>
          );
        })}
        <div className="ll-center">
          <FestagMark className="ll-mark" />
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={reduced ? false : { opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="ll-center-copy"
            >
              <div className="ll-center-label">{LOOP[active].label}</div>
              <div className="ll-center-body">{LOOP[active].body}</div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <div className="ll-dna">
        <div className="ll-dna-head">
          <span className="eyebrow">Operational DNA · Studio Nord</span>
          <span className="small">aggregiert · workspace-gebunden</span>
        </div>
        {DNA.map((d, i) => (
          <div key={d.k} className="ll-fact">
            <div className="ll-fact-k">{d.k}</div>
            <div className="ll-fact-v">{d.v}</div>
            <div className="ll-fact-c">
              <span className="bar bar--accent">
                <i style={{ width: inView || reduced ? `${d.c * 100}%` : "0%", transitionDelay: `${i * 0.12}s` }} />
              </span>
              <em>{Math.round(d.c * 100)} %</em>
            </div>
          </div>
        ))}
      </div>
      <style>{LL_CSS}</style>
    </div>
  );
}

const LL_CSS = `
.ll { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: clamp(24px, 4vw, 56px); align-items: center; }
.ll-ring { position: relative; width: 100%; max-width: 440px; aspect-ratio: 1; margin-inline: auto; }
.ll-svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.ll-dot {
  position: absolute; transform: translate(-50%, -50%);
  width: 32px; height: 32px; border-radius: 50%; background: #fff; border: var(--hair) solid var(--line-strong);
  font-size: 12px; color: var(--muted); display: grid; place-items: center;
  transition: all 0.3s var(--ease);
}
.ll-dot.is-done { border-color: rgba(122,30,51,0.35); color: var(--burgundy); }
.ll-dot.is-active { background: var(--burgundy); border-color: var(--burgundy); color: #fff; transform: translate(-50%, -50%) scale(1.15); box-shadow: 0 0 0 6px var(--burgundy-soft); }
.ll-center { position: absolute; inset: 24%; display: grid; place-items: center; text-align: center; align-content: center; gap: 12px; }
.ll-mark { width: 30px; height: 30px; color: var(--ink); }
.ll-center-label { font-size: 17px; color: var(--ink); }
.ll-center-body { margin-top: 6px; font-size: 13px; line-height: 1.5; color: var(--muted); }
.ll-dna { background: #fff; border: var(--hair) solid var(--line); border-radius: 10px; padding: 20px; box-shadow: var(--sh-sm); display: grid; gap: 4px; }
.ll-dna-head { display: flex; justify-content: space-between; align-items: center; gap: 12px; flex-wrap: wrap; margin-bottom: 8px; }
.ll-fact { padding: 12px 0; border-top: var(--hair) solid var(--line); display: grid; gap: 4px; }
.ll-fact-k { font-size: 12px; color: var(--burgundy); }
.ll-fact-v { font-size: 14.5px; color: var(--ink); }
.ll-fact-c { display: grid; grid-template-columns: 1fr 44px; gap: 10px; align-items: center; margin-top: 4px; }
.ll-fact-c em { font-style: normal; font-size: 12px; color: var(--faint); text-align: right; font-variant-numeric: tabular-nums; }
@media (max-width: 860px) { .ll { grid-template-columns: 1fr; } }
`;
