"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Icon } from "../ui/Icon";
import { Window } from "../ui/Window";
import { demoDecisions } from "@/lib/site/demo";
import { useTimeline } from "./hooks";

const EASE = [0.16, 1, 0.3, 1] as const;
// 0 idle · 1 hint recommended · 2 auto-pick · 3 hold
const AUTO = [3200, 1800, 5200] as const;

export function DecisionDemo() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.35 });
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [touched, setTouched] = useState(false);

  const d = demoDecisions[idx];
  const recommended = d.options.find((o) => o.recommended)?.id ?? d.options[0].id;

  const next = useCallback(() => {
    setPicked(null);
    setIdx((i) => (i + 1) % demoDecisions.length);
  }, []);
  const [step] = useTimeline(AUTO, inView && !reduced && !touched, next);

  // Auto-pick is derived: at step ≥ 2 the recommended option counts as chosen.
  const choice = picked ?? (!touched && step >= 2 ? recommended : null);
  const hint = !touched && step === 1;

  const health = choice ? (choice === recommended ? 81 : choice === "cut" ? 74 : 61) : 58;

  return (
    <div ref={ref} className="dd">
      <Window title="Entscheidungen" full>
        <div className="dd-body">
          <div className="dd-tabs" role="tablist">
            {demoDecisions.map((x, i) => (
              <button
                key={x.id}
                role="tab"
                type="button"
                aria-selected={i === idx}
                onClick={() => {
                  setTouched(true);
                  setIdx(i);
                  setPicked(null);
                }}
              >
                {x.project}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={d.id}
              className="dd-card"
              initial={reduced ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.35, ease: EASE }}
            >
              <div className="dd-head">
                <div>
                  <div className="dd-meta">
                    <span className="tag tag--warn">Entscheidung nötig</span>
                    <span>fällig {d.due}</span>
                  </div>
                  <div className="dd-q">{d.question}</div>
                </div>
                <HealthRing value={health} />
              </div>
              <p className="dd-ctx">{d.context}</p>

              <div className="dd-options" role="radiogroup" aria-label="Optionen">
                {d.options.map((o) => {
                  const isPicked = choice === o.id;
                  return (
                    <button
                      key={o.id}
                      type="button"
                      role="radio"
                      aria-checked={isPicked}
                      className={`dd-opt${o.recommended ? " is-rec" : ""}${isPicked ? " is-picked" : ""}${
                        hint && o.recommended ? " is-hint" : ""
                      }`}
                      onClick={() => {
                        setTouched(true);
                        setPicked(o.id);
                      }}
                    >
                      <span className="dd-radio" aria-hidden>
                        {isPicked ? <Icon name="check" size={11} /> : null}
                      </span>
                      <span className="dd-opt-copy">
                        <span className="dd-opt-label">
                          {o.label}
                          {o.recommended ? <em>Tagro empfiehlt</em> : null}
                        </span>
                        <span className="dd-opt-impact">{o.impact}</span>
                      </span>
                    </button>
                  );
                })}
              </div>

              <AnimatePresence>
                {choice ? (
                  <motion.div
                    className="dd-outcome"
                    initial={reduced ? false : { opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    transition={{ duration: 0.4, ease: EASE }}
                  >
                    <div className="dd-outcome-inner">
                      <Icon name="check" size={14} />
                      <span>{d.outcome[choice]}</span>
                    </div>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </motion.div>
          </AnimatePresence>
        </div>
      </Window>
      <style>{DD_CSS}</style>
    </div>
  );
}

function HealthRing({ value }: { value: number }) {
  const r = 22;
  const c = 2 * Math.PI * r;
  const tone = value >= 75 ? "var(--ok)" : value >= 65 ? "var(--warn)" : "var(--accent)";
  return (
    <div className="dd-ring" aria-label={`Projekt-Health ${value}`}>
      <svg width="56" height="56" viewBox="0 0 56 56">
        <circle cx="28" cy="28" r={r} fill="none" stroke="var(--surface-3)" strokeWidth="4" />
        <motion.circle
          cx="28"
          cy="28"
          r={r}
          fill="none"
          stroke={tone}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={c}
          initial={false}
          animate={{ strokeDashoffset: c * (1 - value / 100) }}
          transition={{ duration: 1, ease: EASE }}
          transform="rotate(-90 28 28)"
        />
      </svg>
      <motion.span key={value} initial={{ opacity: 0.4, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
        {value}
      </motion.span>
    </div>
  );
}

const DD_CSS = `
.dd-body { padding: 18px; background: var(--canvas); min-height: 440px; display: grid; gap: 14px; align-content: start; }
.dd-tabs { display: flex; gap: 6px; flex-wrap: wrap; }
.dd-tabs button {
  height: 30px; padding: 0 12px; border-radius: 999px; font-size: 12.5px; color: var(--muted);
  border: var(--hair) solid var(--line); background: #fff; transition: all var(--dur) ease;
}
.dd-tabs button[aria-selected="true"] { color: var(--ink); border-color: var(--line-strong); box-shadow: var(--sh-xs); }
.dd-card { background: #fff; border: var(--hair) solid var(--line); border-radius: 8px; padding: 18px; box-shadow: var(--sh-sm); }
.dd-head { display: flex; justify-content: space-between; gap: 16px; align-items: flex-start; }
.dd-meta { display: flex; align-items: center; gap: 10px; font-size: 12px; color: var(--faint); }
.dd-q { margin-top: 10px; font-size: 20px; line-height: 1.25; color: var(--ink); letter-spacing: var(--ls-display); }
.dd-ctx { margin-top: 10px; font-size: 13.5px; line-height: 1.55; color: var(--muted); }
.dd-ring { position: relative; width: 56px; height: 56px; flex-shrink: 0; }
.dd-ring span { position: absolute; inset: 0; display: grid; place-items: center; font-size: 15px; color: var(--ink); font-variant-numeric: tabular-nums; }
.dd-options { display: grid; gap: 8px; margin-top: 16px; }
.dd-opt {
  display: grid; grid-template-columns: 18px 1fr; gap: 12px; align-items: start; text-align: left;
  padding: 12px 14px; border-radius: 7px; border: var(--hair) solid var(--line); background: #fff;
  transition: border-color var(--dur) ease, background var(--dur) ease, box-shadow var(--dur) ease, opacity var(--dur) ease;
}
.dd-opt:not(:disabled):hover { border-color: var(--line-strong); background: #fcfbf9; }
.dd-opt.is-hint { border-color: rgba(59, 111, 212,0.4); box-shadow: 0 0 0 4px var(--accent-soft); }
.dd-opt.is-picked { border-color: var(--accent); background: var(--accent-tint); }
.dd-opt:disabled { opacity: 0.5; cursor: default; }
.dd-radio {
  width: 18px; height: 18px; border-radius: 50%; border: 1.5px solid var(--line-strong); margin-top: 1px;
  display: grid; place-items: center; color: #fff;
}
.dd-opt.is-picked .dd-radio { background: var(--accent); border-color: var(--accent); }
.dd-opt-copy { display: grid; gap: 3px; }
.dd-opt-label { display: flex; align-items: center; gap: 8px; flex-wrap: wrap; font-size: 14px; color: var(--ink); }
.dd-opt-label em { font-style: normal; font-size: 11px; color: var(--accent); background: var(--accent-tint); padding: 2px 7px; border-radius: 999px; }
.dd-opt.is-picked .dd-opt-label em { background: #fff; }
.dd-opt-impact { font-size: 12.5px; color: var(--muted); }
.dd-outcome { overflow: hidden; }
.dd-outcome-inner {
  margin-top: 12px; display: grid; grid-template-columns: 16px 1fr; gap: 10px; padding: 12px 14px;
  border-radius: 7px; background: var(--ok-soft); color: var(--ok); font-size: 13.5px; line-height: 1.5;
}
.dd-outcome-inner span { color: var(--ink-2); }
.dd-outcome-inner svg { margin-top: 3px; }
`;
