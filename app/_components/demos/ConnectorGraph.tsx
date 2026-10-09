"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Icon } from "../ui/Icon";
import { FestagMark } from "../ui/Logo";
import { connectors, CONNECTOR_STATUS_LABEL } from "@/lib/site/connectors";
import { useInterval } from "./hooks";

const EASE = [0.16, 1, 0.3, 1] as const;
const W = 720;
const H = 440;
const CX = W / 2;
const CY = H / 2;

/** Connectors orbit Festag; signals travel inward. Click a node for details. */
export function ConnectorGraph({ items = connectors.slice(0, 10) }: { items?: typeof connectors }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [active, setActive] = useState(0);
  const [touched, setTouched] = useState(false);

  const tick = useCallback(() => setActive((i) => (i + 1) % items.length), [items.length]);
  useInterval(tick, 2600, inView && !reduced && !touched);

  const nodes = items.map((c, i) => {
    const a = (i / items.length) * Math.PI * 2 - Math.PI / 2;
    const rx = W * 0.4;
    const ry = H * 0.38;
    return { c, x: CX + Math.cos(a) * rx, y: CY + Math.sin(a) * ry };
  });
  const cur = items[active];

  return (
    <div ref={ref} className="cg">
      <div className="cg-canvas">
        <svg viewBox={`0 0 ${W} ${H}`} className="cg-svg" aria-hidden>
          <defs>
            <radialGradient id="cg-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(122,30,51,0.18)" />
              <stop offset="100%" stopColor="rgba(122,30,51,0)" />
            </radialGradient>
          </defs>
          <ellipse cx={CX} cy={CY} rx={W * 0.4} ry={H * 0.38} fill="none" stroke="rgba(23,22,27,0.06)" />
          <ellipse cx={CX} cy={CY} rx={W * 0.22} ry={H * 0.2} fill="none" stroke="rgba(23,22,27,0.05)" />
          <circle cx={CX} cy={CY} r={120} fill="url(#cg-glow)" />
          {nodes.map(({ c, x, y }, i) => {
            const on = i === active;
            const soon = c.status === "soon";
            return (
              <g key={c.id}>
                <line
                  x1={x}
                  y1={y}
                  x2={CX}
                  y2={CY}
                  stroke={on ? "var(--burgundy)" : "rgba(23,22,27,0.12)"}
                  strokeWidth={on ? 1.5 : 1}
                  strokeDasharray={soon ? "2 5" : "4 4"}
                  className={on && !reduced ? "cg-flow" : undefined}
                />
                {!soon && !reduced && inView ? (
                  <motion.circle
                    r={on ? 3.5 : 2.2}
                    fill={on ? "var(--burgundy)" : "rgba(23,22,27,0.35)"}
                    initial={{ cx: x, cy: y, opacity: 0 }}
                    animate={{ cx: [x, CX], cy: [y, CY], opacity: [0, 1, 0] }}
                    transition={{
                      duration: on ? 1.4 : 2.6,
                      repeat: Infinity,
                      delay: (i * 0.37) % 2,
                      ease: "easeIn",
                    }}
                  />
                ) : null}
              </g>
            );
          })}
        </svg>

        <div className="cg-core" style={{ left: `${(CX / W) * 100}%`, top: `${(CY / H) * 100}%` }}>
          <FestagMark className="cg-core-mark" />
        </div>

        {nodes.map(({ c, x, y }, i) => (
          <button
            key={c.id}
            type="button"
            className={`cg-node${i === active ? " is-active" : ""}${c.status === "soon" ? " is-soon" : ""}`}
            style={{ left: `${(x / W) * 100}%`, top: `${(y / H) * 100}%` }}
            onClick={() => {
              setTouched(true);
              setActive(i);
            }}
            aria-label={`${c.name} — ${CONNECTOR_STATUS_LABEL[c.status]}`}
            aria-pressed={i === active}
          >
            <Icon name={c.id} size={18} />
            <span className="cg-node-label">{c.name}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={cur.id}
          className="cg-detail"
          initial={reduced ? false : { opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -4 }}
          transition={{ duration: 0.35, ease: EASE }}
        >
          <div className="cg-detail-head">
            <span className="cg-detail-icon">
              <Icon name={cur.id} size={18} />
            </span>
            <div>
              <div className="cg-detail-name">
                {cur.name}
                <span className={`tag ${cur.status === "soon" ? "tag--outline" : cur.status === "beta" ? "tag--warn" : "tag--ok"}`}>
                  {CONNECTOR_STATUS_LABEL[cur.status]}
                </span>
              </div>
              <div className="cg-detail-short">{cur.short}</div>
            </div>
          </div>
          <div className="cg-detail-signals">
            {cur.signals.map((s) => (
              <span key={s} className="tag">
                <Icon name="signal" size={11} /> {s}
              </span>
            ))}
          </div>
          <div className="cg-detail-never">
            <Icon name="shield" size={13} /> {cur.never}
          </div>
        </motion.div>
      </AnimatePresence>
      <style>{CG_CSS}</style>
    </div>
  );
}

const CG_CSS = `
.cg { display: grid; gap: 18px; }
.cg-canvas { position: relative; width: 100%; aspect-ratio: ${W} / ${H}; }
.cg-svg { position: absolute; inset: 0; width: 100%; height: 100%; }
.cg-flow { animation: fs-dash 0.9s linear infinite; }
.cg-core {
  position: absolute; transform: translate(-50%, -50%);
  width: 76px; height: 76px; border-radius: 12px; background: var(--ink); color: #fff;
  display: grid; place-items: center; box-shadow: 0 0 0 10px rgba(122,30,51,0.06), var(--sh-lg);
}
.cg-core-mark { width: 36px; height: 36px; }
.cg-node {
  position: absolute; transform: translate(-50%, -50%);
  width: 48px; height: 48px; border-radius: 8px; background: #fff; color: var(--ink);
  border: var(--hair) solid var(--line); box-shadow: var(--sh-sm);
  display: grid; place-items: center;
  transition: transform var(--dur) var(--ease), border-color var(--dur) ease, box-shadow var(--dur) ease, color var(--dur) ease;
}
.cg-node:hover { transform: translate(-50%, -50%) scale(1.06); }
.cg-node.is-active { border-color: var(--burgundy); color: var(--burgundy); box-shadow: 0 0 0 5px var(--burgundy-soft), var(--sh-md); transform: translate(-50%, -50%) scale(1.08); }
.cg-node.is-soon { color: var(--faint); background: #fbfaf8; }
.cg-node-label {
  position: absolute; top: calc(100% + 6px); left: 50%; transform: translateX(-50%);
  font-size: 11.5px; color: var(--muted); white-space: nowrap;
}
.cg-node.is-active .cg-node-label { color: var(--ink); }
.cg-detail { background: #fff; border: var(--hair) solid var(--line); border-radius: 10px; padding: 18px 20px; box-shadow: var(--sh-sm); display: grid; gap: 14px; }
.cg-detail-head { display: grid; grid-template-columns: 40px 1fr; gap: 14px; align-items: start; }
.cg-detail-icon { width: 40px; height: 40px; border-radius: 7px; background: var(--surface-2); display: grid; place-items: center; }
.cg-detail-name { display: flex; align-items: center; gap: 10px; font-size: 17px; color: var(--ink); }
.cg-detail-short { margin-top: 4px; font-size: 14px; color: var(--muted); line-height: 1.5; }
.cg-detail-signals { display: flex; flex-wrap: wrap; gap: 6px; }
.cg-detail-never { display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: var(--faint); }
@media (max-width: 640px) {
  .cg-canvas { aspect-ratio: 1 / 1; }
  .cg-node { width: 38px; height: 38px; border-radius: 6px; }
  .cg-node svg { width: 15px; height: 15px; }
  .cg-node-label { display: none; }
  .cg-core { width: 56px; height: 56px; border-radius: 8px; }
  .cg-core-mark { width: 26px; height: 26px; }
}
`;
