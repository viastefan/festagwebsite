"use client";

import { useCallback, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Icon, type IconName } from "../ui/Icon";
import { FestagMark } from "../ui/Logo";
import { Typewriter } from "./Typewriter";
import { useTimeline } from "./hooks";

const EASE = [0.16, 1, 0.3, 1] as const;

type Tone = "ok" | "warn" | "risk";

type Scenario = {
  id: string;
  inbox: { title: string; sub: string; time: string };
  prompt: string;
  steps: { verb: string; detail: string; icon: IconName }[];
  answer: string;
  artifacts: { name: string; meta: string; icon: IconName }[];
  portal: {
    url: string;
    client: string;
    title: string;
    phase: string;
    health: [number, number];
    progress: [number, number];
    list: { label: string; meta: string; tone: Tone }[];
    highlight: string;
    decision?: string;
  };
  slack: { channel: string; text: string };
};

const SCENARIOS: Scenario[] = [
  {
    id: "atlas",
    inbox: { title: "Client-Update Atlas", sub: "Fertig · 1 Entscheidung", time: "jetzt" },
    prompt: "Bereite das Kunden-Update für Atlas vor — ruhig, ohne Technik.",
    steps: [
      { verb: "Liest", detail: "Linear ATL-81 … ATL-88", icon: "linear" },
      { verb: "Liest", detail: "Slack #atlas · 3 Threads", icon: "slack" },
      { verb: "Prüft", detail: "GitHub PR #398, #402", icon: "github" },
      { verb: "Gedanke", detail: "4 s", icon: "sparkles" },
    ],
    answer:
      "Fertig. Das Dashboard-Modul ist abnahmebereit und belegt. Der API-Zugang des Kunden fehlt seit drei Tagen und blockiert den Login-Meilenstein — ich habe eine Entscheidung vorbereitet und das Update in ruhiger Sprache formuliert. Technische Details bleiben intern.",
    artifacts: [
      { name: "Client-Update KW 41", meta: "+3 Punkte", icon: "doc" },
      { name: "Entscheidung · Launch", meta: "neu", icon: "decision" },
    ],
    portal: {
      url: "atlas.kunden.festag.app",
      client: "Atlas Logistik",
      title: "Atlas Kundenportal",
      phase: "Build",
      health: [58, 72],
      progress: [61, 68],
      list: [
        { label: "Dashboard-Modul abnahmebereit", meta: "PR #402", tone: "ok" },
        { label: "Rollen & Rechte abgenommen", meta: "Mo", tone: "ok" },
        { label: "API-Zugang ausstehend", meta: "seit 3 Tagen", tone: "risk" },
      ],
      highlight:
        "Das Dashboard ist abnahmebereit. Für den Login-Bereich brauchen wir noch Ihren API-Zugang — sonst verschiebt sich dieser Meilenstein um 3–5 Tage.",
      decision: "Launch um eine Woche verschieben?",
    },
    slack: { channel: "#atlas", text: "Update ist im Kundenportal. 1 Entscheidung offen bis 17:00." },
  },
  {
    id: "nordlicht",
    inbox: { title: "Entscheidung Zahlungsanbieter", sub: "Nordlicht · Vorlage", time: "4 Min" },
    prompt: "Stripe oder Adyen für Nordlicht? Bereite die Entscheidung vor.",
    steps: [
      { verb: "Liest", detail: "Kickoff-Transkript 12. Sep", icon: "audio" },
      { verb: "Prüft", detail: "Linear NOR-61 · Staging-Termin", icon: "linear" },
      { verb: "Nutzt", detail: "Decision DNA · 4 Muster", icon: "brain" },
      { verb: "Gedanke", detail: "3 s", icon: "sparkles" },
    ],
    answer:
      "Empfehlung: Stripe. In zwei Tagen integriert, der Abnahmetermin am Donnerstag hält. Rechnungskauf wurde im Kickoff nicht priorisiert — ich habe ihn als Objective für Phase 2 angelegt. Die Vorlage nennt beide Optionen mit Auswirkung.",
    artifacts: [
      { name: "Entscheidung · Zahlungsanbieter", meta: "2 Optionen", icon: "decision" },
      { name: "Objective · Rechnungskauf", meta: "Phase 2", icon: "target" },
    ],
    portal: {
      url: "nordlicht.kunden.festag.app",
      client: "Nordlicht GmbH",
      title: "Nordlicht Checkout",
      phase: "Build",
      health: [82, 88],
      progress: [74, 79],
      list: [
        { label: "Checkout-Flow auf Staging", meta: "PR #412", tone: "ok" },
        { label: "Zahlungsanbieter", meta: "Entscheidung", tone: "warn" },
        { label: "Abnahme Donnerstag", meta: "im Plan", tone: "ok" },
      ],
      highlight:
        "Für die Zahlungsabwicklung empfehlen wir Stripe: in zwei Tagen integriert, der Abnahmetermin bleibt. Rechnungskauf folgt in Phase 2.",
      decision: "Zahlungsanbieter bestätigen",
    },
    slack: { channel: "#nordlicht", text: "Entscheidungsvorlage liegt beim Kunden. Empfehlung: Stripe." },
  },
  {
    id: "exec",
    inbox: { title: "Executive Briefing", sub: "5 Projekte · Audio 2:10", time: "12 Min" },
    prompt: "Executive Briefing für Montag — alle Projekte, nur was zählt.",
    steps: [
      { verb: "Aggregiert", detail: "5 Projekte · 214 Signale", icon: "layers" },
      { verb: "Prüft", detail: "Objectives Q4", icon: "target" },
      { verb: "Prognostiziert", detail: "Verschiebungen · 14 Tage", icon: "chart" },
      { verb: "Gedanke", detail: "5 s", icon: "sparkles" },
    ],
    answer:
      "Drei Projekte im Plan, eines gefährdet, eines leicht verzögert. Atlas braucht heute eine Entscheidung; Kontor absorbiert zwei Tage Discovery ohne Terminwirkung. Meridian geht am 14. Oktober live.",
    artifacts: [
      { name: "Executive Briefing KW 41", meta: "Audio 2:10", icon: "audio" },
      { name: "Forecast · Atlas", meta: "+5 Tage", icon: "chart" },
    ],
    portal: {
      url: "app.festag.app/executive",
      client: "Studio Nord · Portfolio",
      title: "Executive Overview",
      phase: "5 Projekte",
      health: [74, 77],
      progress: [66, 69],
      list: [
        { label: "Meridian Relaunch", meta: "91 · Go-Live 14. Okt", tone: "ok" },
        { label: "Nordlicht Checkout", meta: "82 · im Plan", tone: "ok" },
        { label: "Atlas Kundenportal", meta: "58 · Entscheidung", tone: "risk" },
      ],
      highlight: "Atlas braucht heute Ihre Entscheidung. Alle anderen Projekte sind im Plan.",
    },
    slack: { channel: "@ceo", text: "Executive Briefing KW 41 ist bereit — 2 Min zum Hören." },
  },
];

const STATIC_INBOX = [
  { title: "Risiko Kontor erkannt", sub: "Discovery +2 Tage", time: "34 Min" },
  { title: "Velo Preview live", sub: "Kundenrelevant · Deploy #58", time: "1 Std" },
];

/** Stage index → meaning. Steps are revealed one per stage. */
function timelineFor(s: Scenario): number[] {
  const typeMs = Math.round(s.answer.length * 7.5) + 500;
  return [
    900, // 0 prompt
    ...s.steps.map((_, i) => (i === s.steps.length - 1 ? 1100 : 650)), // 1..n steps
    typeMs, // n+1 answer typing
    700, // n+2 artifacts
    2600, // n+3 awaiting approval
    5200, // n+4 approved + portal updated
  ];
}
const TIMELINES = SCENARIOS.map(timelineFor);

export function HeroStage() {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.25 });
  const [idx, setIdx] = useState(0);
  const [paused, setPaused] = useState(false);

  const scenario = SCENARIOS[idx];
  const timeline = TIMELINES[idx];
  const n = scenario.steps.length;

  const next = useCallback(() => setIdx((i) => (i + 1) % SCENARIOS.length), []);

  const [stageRaw, setStage] = useTimeline(timeline, inView && !reduced && !paused, next);
  const stage = reduced ? timeline.length - 1 : stageRaw;

  const ANSWER = n + 1;
  const ARTIFACTS = n + 2;
  const AWAIT = n + 3;
  const APPROVED = n + 4;

  const select = (i: number) => {
    setIdx(i);
    setStage(0);
    setPaused(false);
  };

  const approve = () => {
    if (stage === AWAIT) setStage(APPROVED);
  };

  const approved = stage >= APPROVED;

  return (
    <div className="hs" ref={ref}>
      <div className="window hs-window">
        <div className="window-bar">
          <div className="window-dots" aria-hidden>
            <span />
            <span />
            <span />
          </div>
          <div className="window-title">Festag</div>
          <div className="hs-bar-right">
            <span className="hs-avatars" aria-hidden>
              <i>MK</i>
              <i>SN</i>
              <i>
                <FestagMark className="hs-av-mark" />
              </i>
            </span>
          </div>
        </div>

        <div className="hs-body">
          {/* ── Left: inbox ── */}
          <aside className="hs-inbox" aria-label="Bereit für Review">
            <div className="hs-label">Bereit für Review {SCENARIOS.length + STATIC_INBOX.length}</div>
            {SCENARIOS.map((s, i) => (
              <button
                key={s.id}
                type="button"
                className="hs-item"
                aria-current={i === idx}
                onClick={() => select(i)}
              >
                <span className={`hs-check${i === idx && !approved ? " is-run" : ""}`} aria-hidden>
                  {i === idx && !approved ? <span className="hs-spin" /> : <Icon name="check" size={11} />}
                </span>
                <span className="hs-item-copy">
                  <span className="hs-item-title">{s.inbox.title}</span>
                  <span className="hs-item-sub">{s.inbox.sub}</span>
                </span>
                <span className="hs-item-time">{i === idx ? "jetzt" : s.inbox.time}</span>
              </button>
            ))}
            {STATIC_INBOX.map((s) => (
              <div key={s.title} className="hs-item hs-item--static">
                <span className="hs-check" aria-hidden>
                  <Icon name="check" size={11} />
                </span>
                <span className="hs-item-copy">
                  <span className="hs-item-title">{s.title}</span>
                  <span className="hs-item-sub">{s.sub}</span>
                </span>
                <span className="hs-item-time">{s.time}</span>
              </div>
            ))}
            <div className="hs-inbox-foot">
              <span className="live-dot" aria-hidden />
              Tagro liest 4 Quellen
            </div>
          </aside>

          {/* ── Middle: Tagro thread ── */}
          <section className="hs-thread" aria-live="polite">
            <div className="hs-thread-title">{scenario.inbox.title}</div>
            <div className="hs-thread-scroll">
              <AnimatePresence mode="wait">
                <motion.div
                  key={scenario.id}
                  initial={reduced ? false : { opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  className="hs-thread-inner"
                >
                  <div className="hs-prompt">{scenario.prompt}</div>

                  <div className="hs-steps">
                    {scenario.steps.map((st, i) =>
                      stage >= i + 1 ? (
                        <motion.div
                          key={st.detail}
                          className="hs-step"
                          initial={reduced ? false : { opacity: 0, x: -4 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Icon name={st.icon} size={13} />
                          <span>{st.verb}</span>
                          <em>{st.detail}</em>
                          {stage === i + 1 && i === n - 1 ? (
                            <span className="think" aria-hidden>
                              <span />
                              <span />
                              <span />
                            </span>
                          ) : null}
                        </motion.div>
                      ) : null,
                    )}
                  </div>

                  {stage >= ANSWER ? (
                    <p className="hs-answer">
                      <Typewriter
                        key={scenario.id}
                        text={scenario.answer}
                        instant={!!reduced || stage > ANSWER}
                        speed={16}
                        chunk={2}
                      />
                    </p>
                  ) : null}

                  {stage >= ARTIFACTS ? (
                    <div className="hs-artifacts">
                      {scenario.artifacts.map((a, i) => (
                        <motion.div
                          key={a.name}
                          className="hs-artifact"
                          initial={reduced ? false : { opacity: 0, y: 6 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }}
                        >
                          <Icon name={a.icon} size={14} />
                          <span>{a.name}</span>
                          <em>{a.meta}</em>
                        </motion.div>
                      ))}
                    </div>
                  ) : null}

                  {stage >= AWAIT ? (
                    <motion.div
                      className="hs-approve"
                      initial={reduced ? false : { opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      {approved ? (
                        <span className="hs-approved">
                          <Icon name="check" size={14} /> Freigegeben — Kunde sieht das Update
                        </span>
                      ) : (
                        <>
                          <span className="hs-approve-note">Nichts geht ohne deine Freigabe raus.</span>
                          <button type="button" className="btn btn--accent btn--sm hs-approve-btn" onClick={approve}>
                            Freigeben
                          </button>
                        </>
                      )}
                    </motion.div>
                  ) : null}
                </motion.div>
              </AnimatePresence>
            </div>

            <div className="hs-composer">
              <span className="hs-composer-ph">Rückfrage an Tagro…</span>
              <div className="hs-composer-row">
                <span className="hs-chip hs-chip--accent">
                  <Icon name="layers" size={12} /> Briefing
                  <Icon name="chevronDown" size={11} />
                </span>
                <span className="hs-chip">
                  Leqra 2 <Icon name="chevronDown" size={11} />
                </span>
                <span className="hs-send" aria-hidden>
                  <Icon name="send" size={13} />
                </span>
              </div>
            </div>
          </section>

          {/* ── Right: client portal preview ── */}
          <section className="hs-portal" aria-label="Vorschau Kundenportal">
            <div className="hs-browser">
              <Icon name="arrow" size={13} style={{ transform: "rotate(180deg)" }} />
              <Icon name="arrow" size={13} />
              <span className="hs-browser-url">
                <Icon name="lock" size={11} />
                {scenario.portal.url}
              </span>
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={scenario.id}
                className="hs-portal-body"
                initial={reduced ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="hs-p-client">{scenario.portal.client}</div>
                <div className="hs-p-title">{scenario.portal.title}</div>

                <div className="hs-p-metrics">
                  <Metric
                    label="Health"
                    value={approved ? scenario.portal.health[1] : scenario.portal.health[0]}
                    tone={approved ? "ok" : scenario.portal.health[0] < 65 ? "risk" : "ok"}
                  />
                  <Metric label="Phase" text={scenario.portal.phase} />
                  <Metric
                    label="Fortschritt"
                    value={approved ? scenario.portal.progress[1] : scenario.portal.progress[0]}
                    suffix="%"
                  />
                </div>
                <div className="bar bar--accent hs-p-bar">
                  <i
                    style={{
                      width: `${approved ? scenario.portal.progress[1] : scenario.portal.progress[0]}%`,
                    }}
                  />
                </div>

                <AnimatePresence>
                  {approved ? (
                    <motion.div
                      className="hs-p-highlight"
                      initial={reduced ? false : { opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.5, ease: EASE }}
                    >
                      <span className="hs-p-tag">Tagro · neu</span>
                      <p>{scenario.portal.highlight}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>

                <div className="hs-p-section">Diese Woche</div>
                <ul className="hs-p-list">
                  {scenario.portal.list.map((l) => (
                    <li key={l.label}>
                      <span className={`status status--${l.tone}`}>
                        <i />
                        {l.label}
                      </span>
                      <em>{l.meta}</em>
                    </li>
                  ))}
                </ul>

                {scenario.portal.decision ? (
                  <div className={`hs-p-decision${approved ? " is-live" : ""}`}>
                    <div>
                      <span className="hs-p-section" style={{ margin: 0 }}>
                        Ihre Entscheidung
                      </span>
                      <div className="hs-p-decision-q">{scenario.portal.decision}</div>
                    </div>
                    <span className="hs-p-decision-btn">Ansehen</span>
                  </div>
                ) : null}
              </motion.div>
            </AnimatePresence>
          </section>
        </div>
      </div>

      {/* Floating Slack notification */}
      <AnimatePresence>
        {approved ? (
          <motion.div
            key={scenario.id}
            className="hs-toast"
            initial={reduced ? false : { opacity: 0, y: 16, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.45, ease: EASE }}
          >
            <div className="hs-toast-bar">
              <Icon name="slack" size={13} />
              Slack · {scenario.slack.channel}
            </div>
            <div className="hs-toast-body">
              <span className="hs-toast-av">
                <FestagMark className="hs-av-mark" />
              </span>
              <div>
                <div className="hs-toast-name">
                  Tagro <em>App · jetzt</em>
                </div>
                <div className="hs-toast-text">{scenario.slack.text}</div>
              </div>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="hs-progress" aria-hidden>
        {SCENARIOS.map((s, i) => (
          <button
            key={s.id}
            type="button"
            tabIndex={-1}
            onClick={() => select(i)}
            className={i === idx ? "is-active" : i < idx ? "is-done" : ""}
          >
            <i
              style={{
                width: i === idx ? `${Math.round((stage / (timeline.length - 1)) * 100)}%` : undefined,
              }}
            />
          </button>
        ))}
      </div>

      <style>{HS_CSS}</style>
    </div>
  );
}

function Metric({
  label,
  value,
  text,
  suffix,
  tone,
}: {
  label: string;
  value?: number;
  text?: string;
  suffix?: string;
  tone?: Tone;
}) {
  return (
    <div className="hs-metric">
      <span>{label}</span>
      <strong className={tone ? `is-${tone}` : undefined}>
        {text ?? (
          <motion.span key={value} initial={{ opacity: 0.3, y: 4 }} animate={{ opacity: 1, y: 0 }}>
            {value}
            {suffix}
          </motion.span>
        )}
      </strong>
    </div>
  );
}

const HS_CSS = `
.hs { position: relative; }
.hs-window { height: clamp(520px, 52vw, 640px); }
.hs-bar-right { display: flex; justify-content: flex-end; }
.hs-avatars { display: flex; }
.hs-avatars i {
  width: 22px; height: 22px; border-radius: 50%;
  display: grid; place-items: center;
  font-style: normal; font-size: 9.5px; color: #fff;
  background: var(--slate); border: 2px solid #f8f7f4; margin-left: -6px;
}
.hs-avatars i:nth-child(2) { background: #8a684d; }
.hs-avatars i:nth-child(3) { background: var(--ink); }
.hs-av-mark { width: 11px; height: 11px; color: #fff; }

.hs-body {
  height: 100%;
  display: grid;
  grid-template-columns: 250px minmax(0, 1fr) minmax(0, 1.05fr);
  font-size: 13px;
  letter-spacing: var(--ls-ui);
}

/* inbox */
.hs-inbox {
  border-right: var(--hair) solid var(--line);
  background: #f6f5f1;
  padding: 12px 8px;
  display: flex; flex-direction: column; gap: 2px;
  min-height: 0; overflow: hidden;
}
.hs-label {
  font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase;
  color: var(--faint); padding: 4px 10px 8px;
}
.hs-item {
  display: grid; grid-template-columns: 18px 1fr auto; gap: 10px;
  align-items: start; text-align: left; width: 100%;
  padding: 10px; border-radius: 6px;
  transition: background var(--dur) ease;
}
.hs-item:not(.hs-item--static):hover { background: rgba(23,22,27,0.045); }
.hs-item[aria-current="true"] { background: #fff; box-shadow: var(--sh-xs); }
.hs-item--static { opacity: 0.72; }
.hs-check {
  width: 16px; height: 16px; margin-top: 1px; border-radius: 50%;
  border: 1.4px solid var(--faint); color: var(--muted);
  display: grid; place-items: center;
}
.hs-check.is-run { border-color: var(--burgundy-glow); }
.hs-spin {
  width: 10px; height: 10px; border-radius: 50%;
  border: 1.6px solid var(--burgundy); border-right-color: transparent;
  animation: hs-rot 0.8s linear infinite;
}
@keyframes hs-rot { to { transform: rotate(360deg); } }
.hs-item-copy { min-width: 0; display: grid; gap: 2px; }
.hs-item-title { color: var(--ink); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hs-item-sub { color: var(--muted); font-size: 12px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hs-item-time { font-size: 11.5px; color: var(--faint); }
.hs-inbox-foot {
  margin-top: auto; display: flex; align-items: center; gap: 8px;
  padding: 10px; font-size: 12px; color: var(--muted);
}

/* thread */
.hs-thread {
  border-right: var(--hair) solid var(--line);
  display: flex; flex-direction: column; min-height: 0; min-width: 0;
  background: #fff;
}
.hs-thread-title { padding: 14px 18px 0; color: var(--ink); font-size: 13.5px; }
.hs-thread-scroll { flex: 1; min-height: 0; overflow: hidden; padding: 12px 18px; }
.hs-thread-inner { display: flex; flex-direction: column; gap: 12px; }
.hs-prompt {
  padding: 11px 13px; border-radius: 7px;
  border: var(--hair) solid var(--line); background: #fbfaf8;
  color: var(--ink); line-height: 1.45;
}
.hs-steps { display: grid; gap: 7px; padding: 2px 2px; }
.hs-step { display: flex; align-items: center; gap: 7px; color: var(--ink-2); font-size: 12.5px; }
.hs-step svg { color: var(--faint); }
.hs-step em { font-style: normal; color: var(--faint); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.hs-answer { color: var(--ink); line-height: 1.55; font-size: 13.5px; }
.hs-artifacts { display: grid; gap: 6px; }
.hs-artifact {
  display: flex; align-items: center; gap: 9px;
  padding: 9px 11px; border-radius: 6px;
  border: var(--hair) solid var(--line); background: #fff;
  color: var(--ink); font-size: 12.5px;
}
.hs-artifact svg { color: var(--muted); }
.hs-artifact em { font-style: normal; color: var(--ok); margin-left: auto; }
.hs-approve { display: flex; align-items: center; justify-content: space-between; gap: 10px; }
.hs-approve-note { font-size: 12px; color: var(--muted); }
.hs-approve-btn { animation: hs-ping 1.6s ease-in-out infinite; }
@keyframes hs-ping {
  0%,100% { box-shadow: 0 0 0 0 rgba(122,30,51,0.35); }
  50% { box-shadow: 0 0 0 6px rgba(122,30,51,0); }
}
.hs-approved { display: inline-flex; align-items: center; gap: 7px; color: var(--ok); font-size: 12.5px; }
.hs-composer {
  margin: 0 14px 14px; padding: 10px 10px 8px 12px;
  border: var(--hair) solid var(--line-strong); border-radius: 8px; background: #fff;
  box-shadow: var(--sh-xs);
}
.hs-composer-ph { color: var(--faint); font-size: 13px; }
.hs-composer-row { display: flex; align-items: center; gap: 6px; margin-top: 10px; }
.hs-chip {
  display: inline-flex; align-items: center; gap: 5px; height: 24px; padding: 0 8px;
  border-radius: 999px; font-size: 11.5px; color: var(--muted);
}
.hs-chip--accent { background: var(--burgundy-tint); color: var(--burgundy); }
.hs-send {
  margin-left: auto; width: 26px; height: 26px; border-radius: 50%;
  display: grid; place-items: center; background: var(--surface-2); color: var(--muted);
}

/* portal */
.hs-portal { display: flex; flex-direction: column; min-height: 0; min-width: 0; background: #fff; }
.hs-browser {
  height: 42px; display: flex; align-items: center; gap: 12px; padding: 0 14px;
  border-bottom: var(--hair) solid var(--line); color: var(--faint);
}
.hs-browser-url {
  display: inline-flex; align-items: center; gap: 6px;
  color: var(--ink-2); font-size: 12.5px; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
}
.hs-portal-body { padding: 20px 22px; overflow: hidden; display: flex; flex-direction: column; }
.hs-p-client { font-size: 11.5px; color: var(--faint); letter-spacing: 0.06em; text-transform: uppercase; }
.hs-p-title {
  margin-top: 6px; font-size: 22px; letter-spacing: -0.005em; color: var(--ink);
  font-family: var(--font-serif), Georgia, serif; font-style: italic;
}
.hs-p-metrics { display: grid; grid-template-columns: repeat(3, 1fr); gap: 8px; margin-top: 16px; }
.hs-metric { display: grid; gap: 3px; }
.hs-metric > span { font-size: 11px; color: var(--faint); }
.hs-metric strong { font-weight: 400; font-size: 17px; color: var(--ink); font-variant-numeric: tabular-nums; }
.hs-metric strong.is-ok { color: var(--ok); }
.hs-metric strong.is-risk { color: var(--burgundy); }
.hs-p-bar { margin-top: 12px; }
.hs-p-highlight {
  margin-top: 14px; overflow: hidden;
  border-radius: 6px; border: 1px solid rgba(122,30,51,0.35);
  background: rgba(247,234,238,0.7);
}
.hs-p-tag {
  display: inline-block; margin: 0; padding: 3px 7px; font-size: 11px;
  color: var(--burgundy); background: var(--burgundy-tint); border-bottom-right-radius: 6px;
}
.hs-p-highlight p {
  padding: 6px 10px 10px; font-size: 14px; line-height: 1.5; color: var(--ink);
  font-family: var(--font-serif), Georgia, serif;
}
.hs-p-section { margin: 18px 0 8px; display: block; font-size: 11px; color: var(--faint); letter-spacing: 0.06em; text-transform: uppercase; }
.hs-p-list { display: grid; }
.hs-p-list li {
  display: flex; align-items: center; justify-content: space-between; gap: 10px;
  padding: 9px 0; border-top: var(--hair) solid var(--line);
}
.hs-p-list em { font-style: normal; font-size: 11.5px; color: var(--faint); white-space: nowrap; }
.hs-p-decision {
  margin-top: 14px; display: flex; align-items: center; justify-content: space-between; gap: 12px;
  padding: 12px 14px; border-radius: 7px; background: var(--surface-2);
  transition: background 0.4s ease, box-shadow 0.4s ease;
}
.hs-p-decision.is-live { background: #fff; box-shadow: 0 0 0 1px rgba(122,30,51,0.3), var(--sh-sm); }
.hs-p-decision-q { margin-top: 4px; color: var(--ink); font-size: 13.5px; }
.hs-p-decision-btn {
  flex-shrink: 0; height: 28px; padding: 0 12px; border-radius: 999px;
  display: inline-flex; align-items: center; font-size: 12px;
  background: var(--ink); color: #fff;
}

/* toast */
.hs-toast {
  position: absolute; right: clamp(-8px, -1vw, 0px); bottom: 40px; width: 300px;
  border-radius: 8px; background: rgba(255,255,255,0.96); backdrop-filter: blur(12px);
  border: var(--hair) solid var(--line); box-shadow: var(--sh-lg); overflow: hidden; z-index: 3;
}
.hs-toast-bar {
  display: flex; align-items: center; gap: 7px; padding: 8px 12px;
  font-size: 11.5px; color: var(--muted); border-bottom: var(--hair) solid var(--line); background: #fbfaf8;
}
.hs-toast-body { display: flex; gap: 10px; padding: 12px; }
.hs-toast-av {
  width: 28px; height: 28px; border-radius: 5px; background: var(--ink);
  display: grid; place-items: center; flex-shrink: 0;
}
.hs-toast-name { font-size: 13px; color: var(--ink); }
.hs-toast-name em { font-style: normal; font-size: 11px; color: var(--faint); margin-left: 4px; }
.hs-toast-text { margin-top: 2px; font-size: 12.5px; line-height: 1.45; color: var(--ink-2); }

/* scenario progress */
.hs-progress {
  position: absolute; left: 50%; bottom: -26px; transform: translateX(-50%);
  display: flex; gap: 6px;
}
.hs-progress button {
  position: relative; width: 36px; height: 3px; border-radius: 999px;
  background: rgba(23,22,27,0.14); overflow: hidden;
}
.hs-progress i {
  position: absolute; inset: 0 auto 0 0; width: 0; background: var(--ink);
  transition: width 0.6s var(--ease);
}
.hs-progress .is-done i { width: 100%; }

@media (max-width: 1100px) {
  .hs-body { grid-template-columns: 220px minmax(0,1fr) minmax(0,1fr); }
}
@media (max-width: 900px) {
  .hs-body { grid-template-columns: minmax(0,1fr) minmax(0,1fr); }
  .hs-inbox { display: none; }
  .hs-toast { display: none; }
}
@media (max-width: 640px) {
  .hs-window { height: 560px; }
  .hs-body { grid-template-columns: 1fr; }
  .hs-portal { display: none; }
  .hs-progress { bottom: -22px; }
}
`;
