"use client";

import { useEffect, useState } from "react";

const USER_Q = "Soll der Launch um eine Woche verschoben werden?";

const TAGRO_LINES = [
  "Zwei kritische Abhängigkeiten sind noch offen, und der Kunde hat Freigabe erst für Freitag signalisiert.",
  "Beste Option: eine Woche verschieben — Scope bleibt stabil, Risiko sinkt messbar.",
] as const;

const OPTIONS = [
  {
    id: "shift",
    title: "Eine Woche verschieben",
    meta: "Empfohlen, Risiko −42%",
    recommended: true,
  },
  {
    id: "keep",
    title: "Wie geplant weiter",
    meta: "Höheres Freigabe-Risiko",
    recommended: false,
  },
] as const;

type Phase =
  | "idle"
  | "user"
  | "thinking"
  | "line0"
  | "line1"
  | "options"
  | "hold";

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    const onChange = () => setReduced(mq.matches);
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

export function TagroDecisionChat({ compact = false }: { compact?: boolean }) {
  const reduced = usePrefersReducedMotion();
  const [phase, setPhase] = useState<Phase>("idle");
  const [typed0, setTyped0] = useState("");
  const [typed1, setTyped1] = useState("");
  const [cycle, setCycle] = useState(0);

  useEffect(() => {
    if (reduced) {
      setPhase("hold");
      setTyped0(TAGRO_LINES[0]);
      setTyped1(TAGRO_LINES[1]);
      return;
    }

    setPhase("idle");
    setTyped0("");
    setTyped1("");

    const timers: number[] = [];
    const wait = (ms: number, fn: () => void) => {
      timers.push(window.setTimeout(fn, ms));
    };

    wait(80, () => setPhase("user"));
    wait(520, () => setPhase("thinking"));
    wait(980, () => setPhase("line0"));

    return () => timers.forEach(clearTimeout);
  }, [cycle, reduced]);

  useEffect(() => {
    if (reduced || phase !== "line0") return;
    let i = 0;
    const full = TAGRO_LINES[0];
    const id = window.setInterval(() => {
      i += 1;
      setTyped0(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(id);
        setPhase("line1");
      }
    }, 16);
    return () => clearInterval(id);
  }, [phase, reduced]);

  useEffect(() => {
    if (reduced || phase !== "line1") return;
    let i = 0;
    const full = TAGRO_LINES[1];
    const id = window.setInterval(() => {
      i += 1;
      setTyped1(full.slice(0, i));
      if (i >= full.length) {
        clearInterval(id);
        setPhase("options");
      }
    }, 16);
    return () => clearInterval(id);
  }, [phase, reduced]);

  useEffect(() => {
    if (reduced || phase !== "options") return;
    const t = window.setTimeout(() => setPhase("hold"), 700);
    return () => clearTimeout(t);
  }, [phase, reduced]);

  useEffect(() => {
    if (reduced || phase !== "hold") return;
    const t = window.setTimeout(() => setCycle((c) => c + 1), 4200);
    return () => clearTimeout(t);
  }, [phase, reduced]);

  const showUser = phase !== "idle";
  const showThinking = phase === "thinking";
  const showReply =
    phase === "line0" ||
    phase === "line1" ||
    phase === "options" ||
    phase === "hold";
  const showOptions = phase === "options" || phase === "hold";
  const typing = phase === "line0" || phase === "line1";

  return (
    <div
      className={`tagro-chat${compact ? " tagro-chat--compact" : ""}`}
      aria-label="Beispiel: Tagro zu einer Entscheidung"
    >
      <div className="tagro-chat-stage">
        {showUser ? (
          <div className="tagro-chat-user" role="status">
            {USER_Q}
          </div>
        ) : null}

        {showThinking ? (
          <div className="tagro-chat-think" aria-hidden>
            <span />
            <span />
            <span />
          </div>
        ) : null}

        {showReply ? (
          <div className="tagro-chat-reply">
            <div className="tagro-chat-reply-label">Tagro</div>
            <p>
              {typed0}
              {typed0 && typed1 ? " " : null}
              {typed1}
              {typing ? <span className="tagro-chat-caret" aria-hidden /> : null}
            </p>
          </div>
        ) : null}

        {showOptions ? (
          <div className="tagro-chat-options" role="list">
            {OPTIONS.map((opt) => (
              <div
                key={opt.id}
                role="listitem"
                className={
                  opt.recommended
                    ? "tagro-chat-option tagro-chat-option--best"
                    : "tagro-chat-option"
                }
              >
                <div className="tagro-chat-option-title">{opt.title}</div>
                <div className="tagro-chat-option-meta">{opt.meta}</div>
              </div>
            ))}
          </div>
        ) : null}
      </div>

      <div className="tagro-chat-composer" aria-hidden>
        <span>Entscheidung stellen…</span>
        <span className="tagro-chat-composer-send">↵</span>
      </div>

      <style dangerouslySetInnerHTML={{ __html: TAGRO_CHAT_CSS }} />
    </div>
  );
}

const TAGRO_CHAT_CSS = `
  .tagro-chat {
    width: 100%;
    max-width: 640px;
    margin: 0 auto;
    display: grid;
    gap: 14px;
  }
  .tagro-chat--compact {
    max-width: none;
    margin: 0;
    gap: 12px;
  }
  .tagro-chat-stage {
    min-height: 280px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    gap: 14px;
    justify-content: flex-end;
  }
  .tagro-chat--compact .tagro-chat-stage {
    min-height: 300px;
    gap: 12px;
  }
  .tagro-chat-user {
    align-self: flex-end;
    max-width: 92%;
    padding: 12px 16px;
    border-radius: 18px 18px 6px 18px;
    background: rgba(255, 255, 255, 0.92);
    border: 1px solid rgba(30, 30, 32, 0.08);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
    font-size: 14.5px;
    line-height: 1.45;
    letter-spacing: var(--ls-ui);
    color: var(--ink);
    animation: tagro-in 0.45s var(--ease) both;
  }
  .tagro-chat--compact .tagro-chat-user {
    font-size: 13.5px;
    padding: 11px 14px;
  }
  .tagro-chat-think {
    align-self: flex-start;
    display: flex;
    gap: 5px;
    padding: 10px 14px;
  }
  .tagro-chat-think span {
    width: 5px;
    height: 5px;
    border-radius: 999px;
    background: rgba(91, 100, 125, 0.45);
    animation: tagro-dot 1s ease-in-out infinite;
  }
  .tagro-chat-think span:nth-child(2) { animation-delay: 0.15s; }
  .tagro-chat-think span:nth-child(3) { animation-delay: 0.3s; }
  .tagro-chat-reply {
    align-self: stretch;
    animation: tagro-in 0.4s var(--ease) both;
  }
  .tagro-chat-reply-label {
    font-size: 12.5px;
    letter-spacing: var(--ls-ui);
    color: var(--slate);
    margin-bottom: 8px;
  }
  .tagro-chat-reply p {
    margin: 0;
    font-size: 15.5px;
    line-height: 1.55;
    letter-spacing: var(--ls-ui);
    color: var(--ink);
    max-width: 46ch;
  }
  .tagro-chat--compact .tagro-chat-reply p {
    font-size: 14.5px;
    max-width: none;
  }
  .tagro-chat-caret {
    display: inline-block;
    width: 1.5px;
    height: 1em;
    margin-left: 2px;
    vertical-align: -0.12em;
    background: var(--slate);
    animation: tagro-blink 0.9s step-end infinite;
  }
  .tagro-chat-options {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    margin-top: 4px;
    animation: tagro-in 0.5s var(--ease) both;
  }
  .tagro-chat-option {
    padding: 14px 16px;
    border-radius: 16px;
    background: rgba(255, 255, 255, 0.72);
    border: 1px solid rgba(30, 30, 32, 0.08);
  }
  .tagro-chat-option--best {
    background: #ffffff;
    border-color: rgba(91, 100, 125, 0.35);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
  }
  .tagro-chat-option-title {
    font-size: 14.5px;
    letter-spacing: var(--ls-display);
    color: var(--ink);
  }
  .tagro-chat--compact .tagro-chat-option {
    padding: 12px 14px;
  }
  .tagro-chat--compact .tagro-chat-option-title {
    font-size: 13.5px;
  }
  .tagro-chat-option-meta {
    margin-top: 4px;
    font-size: 12.5px;
    letter-spacing: var(--ls-body);
    color: var(--muted);
  }
  .tagro-chat-option--best .tagro-chat-option-meta {
    color: var(--slate);
  }
  .tagro-chat-composer {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 48px;
    padding: 0 16px;
    border-radius: 14px;
    background: #ffffff;
    border: 1px solid rgba(30, 30, 32, 0.1);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.04);
    color: var(--faint);
    font-size: 14.5px;
    letter-spacing: var(--ls-ui);
    pointer-events: none;
    user-select: none;
  }
  .tagro-chat--compact .tagro-chat-composer {
    height: 44px;
    font-size: 13.5px;
  }
  .tagro-chat-composer-send {
    color: var(--slate);
    opacity: 0.55;
    font-size: 15px;
  }
  @keyframes tagro-in {
    from { opacity: 0; transform: translateY(8px); }
    to { opacity: 1; transform: translateY(0); }
  }
  @keyframes tagro-dot {
    0%, 80%, 100% { opacity: 0.35; transform: translateY(0); }
    40% { opacity: 1; transform: translateY(-3px); }
  }
  @keyframes tagro-blink {
    50% { opacity: 0; }
  }
  @media (max-width: 640px) {
    .tagro-chat-stage,
    .tagro-chat--compact .tagro-chat-stage { min-height: 260px; }
    .tagro-chat-options { grid-template-columns: 1fr; }
  }
  @media (prefers-reduced-motion: reduce) {
    .tagro-chat-user,
    .tagro-chat-reply,
    .tagro-chat-options,
    .tagro-chat-think span,
    .tagro-chat-caret {
      animation: none !important;
    }
  }
`;
