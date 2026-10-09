"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Icon } from "../ui/Icon";
import { TextLink } from "../ui/Button";
import { Reveal, RevealGroup, RevealItem } from "../ui/Reveal";
import { useInterval, useTimeline } from "./hooks";

const EASE = [0.16, 1, 0.3, 1] as const;

/** Cursor-style three-up: title, muted sub, link, then a live mini-visual. */
export function BentoTrio() {
  return (
    <section className="section section--flush-top">
      <div className="wrap wrap--wide">
        <Reveal className="bt-head">
          <h2 className="h3">
            Für echte Delivery gemacht
            <span style={{ display: "block", color: "var(--muted)" }}>
              Festag liest Signale, schreibt Briefings, verknüpft Kontext und hält jede Entscheidung fest.
            </span>
          </h2>
        </Reveal>
        <RevealGroup className="bt-grid">
          <RevealItem className="bt-card">
            <CardCopy
              title="Briefings in Sekunden"
              body="Tagro liest, was seit dem letzten Update passiert ist, und schreibt das Briefing — mit Quellen, bereit zur Freigabe."
              href="/tagro"
            />
            <div className="bt-well">
              <BriefingRun />
            </div>
          </RevealItem>
          <RevealItem className="bt-card">
            <CardCopy
              title="Kontext per @-Erwähnung"
              body="Verweise auf Tickets, PRs, Threads oder Dateien — Tagro nutzt genau das, was wichtig ist."
              href="/connectors"
            />
            <div className="bt-well bt-well--tint">
              <MentionComposer />
            </div>
          </RevealItem>
          <RevealItem className="bt-card">
            <CardCopy
              title="Timeline & Belege"
              body="Sieh, wie sich ein Projekt entwickelt hat — jede Entscheidung, jede Freigabe, jeder Beleg an seinem Platz."
              href="/product#decisions"
            />
            <div className="bt-well">
              <ProjectTimeline />
            </div>
          </RevealItem>
        </RevealGroup>
      </div>
      <style>{BT_CSS}</style>
    </section>
  );
}

function CardCopy({ title, body, href }: { title: string; body: string; href: string }) {
  return (
    <div className="bt-copy">
      <h3 className="bt-title">{title}</h3>
      <p className="bt-body">{body}</p>
      <TextLink href={href}>Mehr erfahren</TextLink>
    </div>
  );
}

/* ── 1 · Briefing run (terminal-like log) ── */
const LOG = [
  "Liest Linear ATL-81 … ATL-88",
  "Liest Slack #atlas · 3 Threads",
  "Prüft GitHub PR #398, #402",
  "Klassifiziert 14 Signale",
  "Schreibt Briefing für Kunde",
];
const RUN = [700, 520, 520, 520, 520, 520, 900, 3600] as const;

function BriefingRun() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [stepRaw] = useTimeline(RUN, inView && !reduced);
  const step = reduced ? RUN.length - 1 : stepRaw;
  const lines = Math.max(0, Math.min(LOG.length, step - 1));
  const done = step >= LOG.length + 1;
  return (
    <div ref={ref} className="br">
      <div className="br-prompt">Briefing für Atlas</div>
      <div className="br-step">
        <span>Liest</span> Workspace Atlas
      </div>
      <div className="br-step">
        <span>Startet</span> Briefing-Run
      </div>
      <div className="br-log mono">
        <div className="br-cmd">$ tagro brief --projekt atlas</div>
        {LOG.slice(0, lines).map((l) => (
          <motion.div key={l} initial={reduced ? false : { opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }}>
            {l}…
          </motion.div>
        ))}
        {done ? <div className="br-ok">✓ Briefing fertig in 3,8 s · 4 Quellen</div> : null}
      </div>
      <AnimatePresence>
        {done ? (
          <motion.div className="br-final" initial={reduced ? false : { opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }}>
            Briefing fertig. Zur Freigabe senden?
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

/* ── 2 · Mention composer ── */
const MENTIONS = [
  { id: "ATL-88", icon: "linear" as const, sub: "OAuth-Callback blockiert" },
  { id: "PR #402", icon: "github" as const, sub: "Dashboard-Modul" },
  { id: "#atlas", icon: "slack" as const, sub: "3 Threads heute" },
];
const PROMPTS = ["Erkläre", "Fasse zusammen", "Was blockiert"];

function MentionComposer() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [i, setI] = useState(0);
  const [touched, setTouched] = useState(false);
  const tick = useCallback(() => setI((x) => (x + 1) % MENTIONS.length), []);
  useInterval(tick, 2400, inView && !reduced && !touched);
  const m = MENTIONS[i];
  return (
    <div ref={ref} className="mc">
      <div className="mc-list" role="listbox" aria-label="Kontext">
        {MENTIONS.map((x, k) => (
          <button
            key={x.id}
            type="button"
            role="option"
            aria-selected={k === i}
            className="mc-item"
            onClick={() => {
              setTouched(true);
              setI(k);
            }}
          >
            <Icon name={x.icon} size={12} />
            <span>{x.id}</span>
            <em>{x.sub}</em>
          </button>
        ))}
      </div>
      <div className="mc-box">
        <div className="mc-text">
          {PROMPTS[i]}{" "}
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.span
              key={m.id}
              className="mc-chip"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.25, ease: EASE }}
            >
              {m.id}
            </motion.span>
          </AnimatePresence>{" "}
          dem Kunden
          <span className="typing-caret" aria-hidden />
        </div>
        <div className="mc-row">
          <span className="mc-pill">
            <Icon name="layers" size={11} /> Briefing <Icon name="chevronDown" size={10} />
          </span>
          <span className="mc-model">
            Leqra 2 <Icon name="chevronDown" size={10} />
          </span>
          <span className="mc-send">
            <Icon name="send" size={12} />
          </span>
        </div>
      </div>
    </div>
  );
}

/* ── 3 · Project timeline ── */
const EVENTS = [
  { label: "Kickoff & Scope", when: "8. Sep" },
  { label: "Design v1 freigegeben", when: "15. Sep" },
  { label: "Rollen & Rechte abgenommen", when: "29. Sep" },
  { label: "Dashboard-Modul abnahmebereit", when: "Gestern" },
  { label: "API-Zugang angefragt", when: "vor 3 Std" },
  { label: "Entscheidung: Launch +1 Woche", when: "vor 1 Std" },
  { label: "Client-Update KW 41", when: "Jetzt" },
];

function ProjectTimeline() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.4 });
  const [active, setActive] = useState(3);
  const [touched, setTouched] = useState(false);
  const tick = useCallback(() => setActive((x) => (x + 1) % EVENTS.length), []);
  useInterval(tick, 2200, inView && !reduced && !touched);
  return (
    <div ref={ref} className="tl">
      {EVENTS.map((e, k) => (
        <button
          key={e.label}
          type="button"
          className={`tl-row${k === active ? " is-active" : ""}`}
          onClick={() => {
            setTouched(true);
            setActive(k);
          }}
          onMouseEnter={() => {
            setTouched(true);
            setActive(k);
          }}
        >
          {k === active ? (
            <motion.span layoutId="tl-hl" className="tl-hl" transition={{ type: "spring", stiffness: 500, damping: 40 }} />
          ) : null}
          <span className="tl-label">{e.label}</span>
          {k === active ? <Icon name="doc" size={12} className="tl-ico" /> : null}
          <span className="tl-when">{e.when}</span>
          <span className="tl-tick" />
        </button>
      ))}
    </div>
  );
}

const BT_CSS = `
.bt-head { margin-bottom: clamp(28px, 4vw, 44px); max-width: 820px; }
.bt-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
.bt-card {
  display: flex; flex-direction: column; gap: 24px; padding: 22px; border-radius: var(--r-lg);
  background: var(--surface-2); border: var(--hair) solid var(--line);
}
.bt-title { font-size: 19px; color: var(--ink); letter-spacing: var(--ls-display); }
.bt-body { margin-top: 6px; font-size: 16.5px; line-height: 1.5; color: var(--muted); text-wrap: pretty; }
.bt-copy .link { margin-top: 18px; font-size: 15.5px; }
.bt-well {
  margin-top: auto; height: 340px; border-radius: var(--r-md); background: #ebe8e1;
  border: var(--hair) solid var(--line); display: grid; place-items: center; padding: 20px; overflow: hidden;
}
.bt-well--tint { background: linear-gradient(180deg, #d9d2d4, #cdc4c7); }

/* briefing run */
.br { width: 100%; max-width: 320px; display: grid; gap: 8px; font-size: 13px; }
.br-prompt { padding: 9px 12px; border-radius: 7px; background: #f4f2ed; border: var(--hair) solid var(--line-strong); color: var(--ink); }
.br-step { color: var(--muted); padding-left: 4px; }
.br-step span { color: var(--ink-2); }
.br-log {
  padding: 10px 12px; border-radius: 7px; background: #f4f2ed; border: var(--hair) solid var(--line);
  font-size: 11.5px; line-height: 1.7; color: var(--ink-2); min-height: 150px;
}
.br-cmd { color: var(--ink); }
.br-ok { color: var(--ok); }
.br-final { color: var(--ink); padding-left: 4px; }

/* mention composer */
.mc { width: 100%; max-width: 340px; display: grid; gap: 8px; }
.mc-list { width: 72%; padding: 4px; border-radius: 7px; background: rgba(255,255,255,0.35); display: grid; }
.mc-item { display: flex; align-items: center; gap: 7px; padding: 6px 8px; border-radius: 5px; font-size: 12px; color: var(--muted); text-align: left; }
.mc-item em { font-style: normal; color: var(--faint); font-size: 11px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.mc-item[aria-selected="true"] { background: rgba(255,255,255,0.75); color: var(--ink); }
.mc-box { padding: 12px 12px 10px; border-radius: 8px; background: #fff; box-shadow: var(--sh-md); }
.mc-text { font-size: 14px; color: var(--ink); line-height: 1.6; min-height: 44px; }
.mc-chip { display: inline-block; padding: 1px 6px; border-radius: 4px; background: var(--accent-tint); color: var(--accent); }
.mc-row { display: flex; align-items: center; gap: 8px; margin-top: 10px; }
.mc-pill { display: inline-flex; align-items: center; gap: 4px; height: 22px; padding: 0 8px; border-radius: 999px; background: var(--surface-2); font-size: 11px; color: var(--ink-2); }
.mc-model { display: inline-flex; align-items: center; gap: 3px; font-size: 11px; color: var(--muted); }
.mc-send { margin-left: auto; width: 24px; height: 24px; border-radius: 50%; background: var(--ink); color: #fff; display: grid; place-items: center; }

/* timeline */
.tl { width: 100%; max-width: 360px; display: grid; gap: 2px; }
.tl-row {
  position: relative; display: grid; grid-template-columns: 1fr auto auto 22px; align-items: center; gap: 10px;
  padding: 9px 12px; border-radius: 7px; text-align: left; font-size: 13.5px; color: var(--muted);
  transition: color var(--dur) ease;
}
.tl-row.is-active { color: var(--ink); }
.tl-hl { position: absolute; inset: 0 30px 0 0; border-radius: 7px; background: #fff; box-shadow: var(--sh-sm); z-index: 0; }
.tl-label, .tl-when, .tl-ico, .tl-tick { position: relative; z-index: 1; }
.tl-label { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.tl-ico { color: var(--accent); }
.tl-when { font-size: 12px; color: var(--faint); white-space: nowrap; }
.tl-row.is-active .tl-when { color: var(--ink); }
.tl-tick { height: 1px; background: var(--line-strong); }
.tl-row.is-active .tl-tick { height: 2px; background: var(--ink); }

@media (max-width: 1100px) { .bt-grid { grid-template-columns: 1fr 1fr; } }
@media (max-width: 720px) { .bt-grid { grid-template-columns: 1fr; } .bt-well { height: 300px; } }
`;
