"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { Icon } from "../ui/Icon";
import { FestagMark } from "../ui/Logo";
import { Window } from "../ui/Window";
import { Typewriter } from "./Typewriter";
import {
  tagroAnswers,
  tagroFallback,
  tagroSuggestions,
  type TagroAnswer,
} from "@/lib/site/demo";

const EASE = [0.16, 1, 0.3, 1] as const;

type Msg =
  | { id: number; role: "user"; text: string }
  | { id: number; role: "tagro"; answer: TagroAnswer; decided?: string }
  | { id: number; role: "system"; text: string };

function match(q: string): TagroAnswer {
  const s = q.toLowerCase();
  let best: TagroAnswer | null = null;
  let score = 0;
  for (const a of tagroAnswers) {
    const hits = a.keys.filter((k) => s.includes(k)).length;
    if (hits > score) {
      score = hits;
      best = a;
    }
  }
  return best ?? tagroFallback;
}

const READ_STEPS = ["Durchsucht Company Brain", "Liest Signale · 14 Tage", "Prüft Operational DNA"];

export function TagroConsole({ compact }: { compact?: boolean }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const inView = useInView(ref, { amount: 0.35 });

  const [msgs, setMsgs] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const [readStep, setReadStep] = useState(0);
  const [touched, setTouched] = useState(false);
  const [autoIdx, setAutoIdx] = useState(0);
  const idRef = useRef(1);

  const send = useCallback(
    (text: string) => {
      const q = text.trim();
      if (!q || busy) return;
      const uid = idRef.current++;
      setMsgs((m) => [...m.slice(-4), { id: uid, role: "user", text: q }]);
      setInput("");
      setBusy(true);
      setReadStep(0);
      const timers: number[] = [];
      const base = reduced ? 0 : 420;
      READ_STEPS.forEach((_, i) => {
        timers.push(window.setTimeout(() => setReadStep(i + 1), base * (i + 1)));
      });
      timers.push(
        window.setTimeout(
          () => {
            const tid = idRef.current++;
            setMsgs((m) => [...m, { id: tid, role: "tagro", answer: match(q) }]);
            setBusy(false);
          },
          base * (READ_STEPS.length + 1),
        ),
      );
    },
    [busy, reduced],
  );

  const decide = (msgId: number, label: string) => {
    setTouched(true);
    setMsgs((m) =>
      m.map((x) => (x.id === msgId && x.role === "tagro" ? { ...x, decided: label } : x)),
    );
    const sid = idRef.current++;
    setMsgs((m) => [
      ...m,
      {
        id: sid,
        role: "system",
        text: `Entscheidung „${label}“ gespeichert — mit Begründung im Projekt. Kunde wird nach deiner Freigabe informiert.`,
      },
    ]);
  };

  // Pause autoplay after an answer so it can be read.
  const lastIsAnswer = msgs.at(-1)?.role === "tagro";
  const [hold, setHold] = useState(false);
  useEffect(() => {
    if (!lastIsAnswer || touched) return;
    const t1 = window.setTimeout(() => setHold(true), 0);
    const t2 = window.setTimeout(() => setHold(false), 7000);
    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
    };
  }, [lastIsAnswer, touched, msgs.length]);

  // Autoplay: type a suggestion into the composer, then send it.
  useEffect(() => {
    if (touched || reduced || !inView || busy || hold) return;
    const target = tagroSuggestions[autoIdx % tagroSuggestions.length];
    if (input.length < target.length) {
      const t = window.setTimeout(
        () => setInput(target.slice(0, input.length + 1)),
        input.length === 0 ? 1400 : 38,
      );
      return () => window.clearTimeout(t);
    }
    const t = window.setTimeout(() => {
      send(target);
      setAutoIdx((i) => i + 1);
    }, 500);
    return () => window.clearTimeout(t);
  }, [touched, reduced, inView, busy, hold, input, autoIdx, send]);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ top: el.scrollHeight, behavior: reduced ? "auto" : "smooth" });
  }, [msgs, busy, readStep, reduced]);

  const takeOver = () => {
    if (!touched) {
      setTouched(true);
      setInput("");
    }
  };

  return (
    <div ref={ref} className={`tc${compact ? " tc--compact" : ""}`}>
      <Window title="Tagro · Atlas Kundenportal" full>
        <div className="tc-body">
          <div className="tc-scroll" ref={scrollRef}>
            {msgs.length === 0 ? (
              <div className="tc-empty">
                <span className="tc-empty-mark">
                  <FestagMark />
                </span>
                <div className="tc-empty-title">Frag Tagro, was wirklich läuft.</div>
                <div className="tc-empty-sub">
                  Antworten mit Kontext, Empfehlung und Quelle — aus GitHub, Linear, Jira und Slack.
                </div>
              </div>
            ) : null}

            <AnimatePresence initial={false}>
              {msgs.map((m) => (
                <motion.div
                  key={m.id}
                  layout={!reduced}
                  initial={reduced ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                  className={`tc-msg tc-msg--${m.role}`}
                >
                  {m.role === "user" ? <div className="tc-user">{m.text}</div> : null}
                  {m.role === "system" ? (
                    <div className="tc-system">
                      <Icon name="check" size={13} />
                      {m.text}
                    </div>
                  ) : null}
                  {m.role === "tagro" ? (
                    <AnswerCard
                      answer={m.answer}
                      decided={m.decided}
                      instant={!!reduced}
                      onDecide={(label) => decide(m.id, label)}
                    />
                  ) : null}
                </motion.div>
              ))}
            </AnimatePresence>

            {busy ? (
              <div className="tc-reading" aria-live="polite">
                {READ_STEPS.slice(0, Math.max(1, readStep)).map((s, i) => (
                  <div key={s} className="tc-read">
                    {i < readStep - 1 || readStep === READ_STEPS.length ? (
                      <Icon name="check" size={12} />
                    ) : (
                      <span className="think" aria-hidden>
                        <span />
                        <span />
                        <span />
                      </span>
                    )}
                    {s}
                  </div>
                ))}
              </div>
            ) : null}
          </div>

          <div className="tc-foot">
            <div className="chips" role="list" aria-label="Vorschläge">
              {tagroSuggestions.slice(0, compact ? 3 : 4).map((s) => (
                <button
                  key={s}
                  type="button"
                  role="listitem"
                  onClick={() => {
                    takeOver();
                    send(s);
                  }}
                  disabled={busy}
                >
                  {s}
                </button>
              ))}
            </div>
            <form
              className="composer"
              onSubmit={(e) => {
                e.preventDefault();
                setTouched(true);
                send(input);
              }}
            >
              <Icon name="sparkles" size={16} style={{ color: "var(--burgundy)", flexShrink: 0 }} />
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => {
                  takeOver();
                  setInput(e.target.value);
                }}
                onFocus={takeOver}
                placeholder="Frag nach Status, Risiken, Entscheidungen…"
                aria-label="Frage an Tagro"
                maxLength={160}
              />
              <button
                type="submit"
                className="composer-send"
                disabled={!input.trim() || busy}
                aria-label="Senden"
              >
                <Icon name="send" />
              </button>
            </form>
            {!touched && !hold ? (
              <div className="tc-hint">
                <span className="live-dot" aria-hidden /> Live-Demo — klick ins Feld und frag selbst.
              </div>
            ) : (
              <div className="tc-hint">Demo-Workspace mit Beispieldaten. Tagro antwortet nur mit Quelle.</div>
            )}
          </div>
        </div>
      </Window>
      <style>{TC_CSS}</style>
    </div>
  );
}

function AnswerCard({
  answer,
  decided,
  instant,
  onDecide,
}: {
  answer: TagroAnswer;
  decided?: string;
  instant: boolean;
  onDecide: (label: string) => void;
}) {
  const [typed, setTyped] = useState(instant);
  return (
    <div className="tc-answer">
      <div className="tc-answer-head">
        <span className="tc-av">
          <FestagMark />
        </span>
        Tagro
      </div>
      <p className="tc-summary">
        <Typewriter text={answer.summary} instant={instant} speed={14} chunk={2} onDone={() => setTyped(true)} />
      </p>
      {typed ? (
        <motion.div
          className="tc-sections"
          initial={instant ? false : { opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: EASE }}
        >
          <Section label="Kontext" text={answer.context} />
          <Section label="Empfehlung" text={answer.recommendation} />
          <Section label="Nächster Schritt" text={answer.next} />
          {answer.options ? (
            <div className="tc-options">
              {answer.options.map((o) => (
                <button
                  key={o.label}
                  type="button"
                  className={`tc-option${o.recommended ? " is-rec" : ""}${decided === o.label ? " is-picked" : ""}`}
                  disabled={!!decided}
                  onClick={() => onDecide(o.label)}
                >
                  <span>{o.label}</span>
                  <em>{o.recommended ? `Empfohlen · ${o.impact}` : o.impact}</em>
                </button>
              ))}
            </div>
          ) : null}
          <div className="tc-sources">
            {answer.sources.map((s) => (
              <span key={s} className="tag tag--outline">
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      ) : null}
    </div>
  );
}

function Section({ label, text }: { label: string; text: string }) {
  return (
    <div className="tc-sec">
      <span>{label}</span>
      <p>{text}</p>
    </div>
  );
}

const TC_CSS = `
.tc .window-body { background: var(--canvas); }
.tc-body { display: flex; flex-direction: column; height: clamp(540px, 48vw, 620px); }
.tc--compact .tc-body { height: 520px; }
.tc-scroll {
  flex: 1; min-height: 0; overflow-y: auto; padding: 22px 22px 8px;
  display: flex; flex-direction: column; gap: 14px; scrollbar-width: thin;
}
.tc-empty { margin: auto; text-align: center; max-width: 360px; display: grid; justify-items: center; gap: 8px; }
.tc-empty-mark {
  width: 44px; height: 44px; border-radius: 8px; background: var(--ink); color: #fff;
  display: grid; place-items: center; margin-bottom: 6px;
}
.tc-empty-mark svg { width: 22px; height: 22px; }
.tc-empty-title { font-size: 18px; color: var(--ink); }
.tc-empty-sub { font-size: 13.5px; color: var(--muted); line-height: 1.5; }
.tc-msg--user { align-self: flex-end; max-width: 80%; }
.tc-user {
  padding: 10px 14px; border-radius: 8px 8px 4px 8px; background: var(--ink); color: #fff;
  font-size: 14px; line-height: 1.45;
}
.tc-msg--system { align-self: center; }
.tc-system {
  display: inline-flex; align-items: center; gap: 8px; padding: 7px 12px; border-radius: 999px;
  background: var(--ok-soft); color: var(--ok); font-size: 12.5px; text-align: center;
}
.tc-answer {
  background: #fff; border: var(--hair) solid var(--line); border-radius: 8px; padding: 16px 18px;
  box-shadow: var(--sh-xs); max-width: 640px;
}
.tc-answer-head { display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: var(--burgundy); }
.tc-av {
  width: 22px; height: 22px; border-radius: 5px; background: var(--ink); color: #fff;
  display: grid; place-items: center;
}
.tc-av svg { width: 12px; height: 12px; }
.tc-summary { margin-top: 10px; font-size: 16px; line-height: 1.45; color: var(--ink); }
.tc-sections { display: grid; gap: 12px; margin-top: 14px; padding-top: 14px; border-top: var(--hair) solid var(--line); }
.tc-sec { display: grid; grid-template-columns: 120px 1fr; gap: 12px; }
.tc-sec span { font-size: 12px; color: var(--faint); padding-top: 2px; }
.tc-sec p { font-size: 13.5px; line-height: 1.55; color: var(--ink-2); }
.tc-options { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 2px; }
.tc-option {
  display: grid; gap: 2px; text-align: left; padding: 10px 14px; border-radius: 7px;
  background: var(--surface-2); border: 1px solid transparent; min-width: 150px;
  transition: border-color var(--dur) ease, background var(--dur) ease, transform var(--dur) var(--ease);
}
.tc-option:not(:disabled):hover { border-color: var(--line-strong); background: #fff; transform: translateY(-1px); }
.tc-option span { font-size: 13.5px; color: var(--ink); }
.tc-option em { font-style: normal; font-size: 11.5px; color: var(--muted); }
.tc-option.is-rec { background: #fff; border-color: rgba(122,30,51,0.3); }
.tc-option.is-rec em { color: var(--burgundy); }
.tc-option.is-picked { background: var(--burgundy); border-color: var(--burgundy); }
.tc-option.is-picked span, .tc-option.is-picked em { color: #fff; }
.tc-option:disabled:not(.is-picked) { opacity: 0.45; cursor: default; }
.tc-sources { display: flex; flex-wrap: wrap; gap: 6px; }
.tc-reading { display: grid; gap: 6px; padding: 4px 4px; }
.tc-read { display: flex; align-items: center; gap: 8px; font-size: 12.5px; color: var(--muted); }
.tc-read svg { color: var(--ok); }
.tc-foot { padding: 12px 16px 14px; border-top: var(--hair) solid var(--line); background: #fbfaf8; display: grid; gap: 10px; }
.tc-hint { display: flex; align-items: center; gap: 8px; font-size: 12px; color: var(--faint); }
@media (max-width: 640px) {
  .tc-body { height: 600px; }
  .tc-scroll { padding: 16px 14px 8px; }
  .tc-sec { grid-template-columns: 1fr; gap: 2px; }
  .tc-msg--user { max-width: 92%; }
  .tc-foot .chips button:nth-child(n+3) { display: none; }
}
`;
