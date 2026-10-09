"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Icon } from "../ui/Icon";
import { Window } from "../ui/Window";
import { demoSignals } from "@/lib/site/demo";
import { useInterval } from "./hooks";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Raw work signal → meaning → client translation. Auto-cycles, clickable. */
export function SignalFlow() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);

  const tick = useCallback(() => setActive((i) => (i + 1) % demoSignals.length), []);
  useInterval(tick, 3400, inView && !reduced && !touched);

  const s = demoSignals[active];

  return (
    <div ref={ref} className="sf">
      <Window title="Activity Intelligence · Live" full>
        <div className="sf-body">
          <ul className="sf-list" aria-label="Eingehende Signale">
            {demoSignals.map((sig, i) => (
              <li key={sig.id}>
                <button
                  type="button"
                  className="sf-row"
                  aria-pressed={i === active}
                  onClick={() => {
                    setTouched(true);
                    setActive(i);
                  }}
                >
                  <span className="sf-src">
                    <Icon name={sig.source} size={14} />
                  </span>
                  <span className="sf-raw">{sig.raw}</span>
                  {i === active && !touched && !reduced ? (
                    <motion.span
                      className="sf-timer"
                      key={`t-${active}`}
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 3.4, ease: "linear" }}
                    />
                  ) : null}
                </button>
              </li>
            ))}
          </ul>

          <div className="sf-pipe">
            <AnimatePresence mode="wait">
              <motion.div
                key={s.id}
                className="sf-stack"
                initial={reduced ? false : "hidden"}
                animate="show"
                exit={{ opacity: 0, transition: { duration: 0.15 } }}
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.18 } } }}
              >
                <Stage label="Signal" icon={s.source}>
                  <span className="mono sf-mono">{s.raw}</span>
                </Stage>
                <Connector />
                <Stage label="Bedeutung" icon="sparkles">
                  <span className={`tag tag--${s.tone === "ok" ? "ok" : s.tone === "risk" ? "accent" : "warn"}`}>
                    {s.type}
                  </span>
                  <span className="sf-meaning">{s.meaning}</span>
                </Stage>
                <Connector />
                <Stage label="Kunde sieht" icon="portal" accent>
                  <span className="sf-project">{s.project}</span>
                  <span className="sf-client">{s.meaning}</span>
                </Stage>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </Window>
      <style>{SF_CSS}</style>
    </div>
  );
}

function Stage({
  label,
  icon,
  accent,
  children,
}: {
  label: string;
  icon: React.ComponentProps<typeof Icon>["name"];
  accent?: boolean;
  children: React.ReactNode;
}) {
  return (
    <motion.div
      className={`sf-stage${accent ? " is-accent" : ""}`}
      variants={{
        hidden: { opacity: 0, y: 10, filter: "blur(4px)" },
        show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5, ease: EASE } },
      }}
    >
      <div className="sf-stage-label">
        <Icon name={icon} size={13} />
        {label}
      </div>
      <div className="sf-stage-body">{children}</div>
    </motion.div>
  );
}

function Connector() {
  return (
    <motion.div
      className="sf-conn"
      aria-hidden
      variants={{ hidden: { opacity: 0, scaleY: 0 }, show: { opacity: 1, scaleY: 1, transition: { duration: 0.3 } } }}
    >
      <svg width="2" height="22" viewBox="0 0 2 22">
        <line x1="1" y1="0" x2="1" y2="22" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" />
      </svg>
    </motion.div>
  );
}

const SF_CSS = `
.sf-body { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); min-height: 440px; background: var(--canvas); }
.sf-list { border-right: var(--hair) solid var(--line); padding: 10px; display: grid; align-content: start; gap: 2px; background: #fff; }
.sf-row {
  position: relative; width: 100%; display: grid; grid-template-columns: 26px 1fr; gap: 10px; align-items: center;
  text-align: left; padding: 9px 10px; border-radius: 6px; overflow: hidden;
  transition: background var(--dur) ease;
}
.sf-row:hover { background: var(--surface-2); }
.sf-row[aria-pressed="true"] { background: var(--accent-tint); }
.sf-src { width: 26px; height: 26px; border-radius: 5px; background: var(--surface-2); display: grid; place-items: center; color: var(--ink); }
.sf-row[aria-pressed="true"] .sf-src { background: #fff; }
.sf-raw { font-size: 12.5px; color: var(--ink-2); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; font-family: var(--mono); }
.sf-timer { position: absolute; left: 0; right: 0; bottom: 0; height: 2px; background: var(--accent); transform-origin: left; opacity: 0.5; }
.sf-pipe { padding: 22px; display: flex; align-items: center; }
.sf-stack { width: 100%; display: flex; flex-direction: column; align-items: stretch; }
.sf-stage { background: #fff; border: var(--hair) solid var(--line); border-radius: 8px; padding: 12px 14px; box-shadow: var(--sh-xs); }
.sf-stage.is-accent { border-color: rgba(59, 111, 212,0.3); box-shadow: 0 0 0 4px var(--accent-soft); }
.sf-stage-label { display: flex; align-items: center; gap: 6px; font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--faint); }
.sf-stage.is-accent .sf-stage-label { color: var(--accent); }
.sf-stage-body { margin-top: 8px; display: flex; flex-wrap: wrap; align-items: center; gap: 8px; }
.sf-mono { font-size: 12.5px; color: var(--ink-2); line-height: 1.5; }
.sf-meaning { font-size: 14px; color: var(--ink); line-height: 1.45; }
.sf-project { width: 100%; font-size: 11.5px; color: var(--faint); }
.sf-client { font-size: 15px; color: var(--ink); line-height: 1.45;  }
.sf-conn { display: grid; place-items: center; color: var(--accent); height: 26px; transform-origin: top; }
.sf-conn line { animation: fs-dash 1.2s linear infinite; }
@media (max-width: 760px) {
  .sf-body { grid-template-columns: 1fr; }
  .sf-list { border-right: 0; border-bottom: var(--hair) solid var(--line); max-height: 220px; overflow: auto; }
}
`;
