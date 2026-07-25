"use client";

import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { FestagMark } from "./Brand";

export const ASK_AI_OPEN_EVENT = "festag:open-ask-ai";

export function openAskAi() {
  if (typeof window === "undefined") return;
  window.dispatchEvent(new CustomEvent(ASK_AI_OPEN_EVENT));
}

type Msg = { role: "user" | "assistant"; text: string };

const STARTERS = [
  "Was ist Festag?",
  "Was macht Tagro anders?",
  "Wie verbindet Festag GitHub?",
  "Für wen ist Festag?",
];

function answerFor(question: string): string {
  const q = question.toLowerCase();
  if (q.includes("tagro") || q.includes("chatbot") || q.includes("anders")) {
    return "Tagro ist kein Chatbot. Tagro ist der Operations Interpreter von Festag — er liest Arbeitssignale und übersetzt sie in Status, Risiken und nächste Schritte, die Kunden und Führung verstehen.";
  }
  if (q.includes("github") || q.includes("slack") || q.includes("linear")) {
    return "Festag ersetzt eure Tools nicht. Es sitzt darüber: Commits, PRs und Issues aus GitHub werden zu verständlichen Delivery-Signalen — ohne dass Teams ihre Workflows verlassen müssen.";
  }
  if (q.includes("wen") || q.includes("für")) {
    return "Für Agenturen, Software-Teams und projektbasierte Organisationen, die Delivery für Kunden und Führung klar machen wollen — nicht für generisches Task-Management.";
  }
  return "Festag ist eine Operational Intelligence Layer. Aus Arbeitssignalen wird klarer Fortschritt: Status, Risiken, Entscheidungen und nächste Schritte — client-ready und ruhig.";
}

const PANEL_STYLES = `
  .fai-root {
    --fai-ease: cubic-bezier(0.32, 0.72, 0, 1);
    --fai-ink: #ededef;
    --fai-muted: rgba(237, 237, 239, 0.58);
    --fai-faint: rgba(237, 237, 239, 0.34);
    --fai-line: rgba(255, 255, 255, 0.08);
    --fai-surface: #0c0c0e;
    --fai-panel: #111113;
    --fai-slate: #5b647d;
  }

  .fai-backdrop {
    position: fixed;
    inset: 0;
    z-index: 80;
    background: rgba(0, 0, 0, 0.45);
    backdrop-filter: blur(4px);
    -webkit-backdrop-filter: blur(4px);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s var(--fai-ease);
  }
  .fai-backdrop.is-open {
    opacity: 1;
    pointer-events: auto;
  }

  .fai-panel {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 81;
    width: min(420px, 100vw);
    height: 100dvh;
    display: flex;
    flex-direction: column;
    background: var(--fai-panel);
    color: var(--fai-ink);
    border-left: 1px solid var(--fai-line);
    box-shadow: -24px 0 80px rgba(0, 0, 0, 0.45);
    font-family: var(--font-geist-sans), system-ui, sans-serif;
    letter-spacing: -0.011em;
    -webkit-font-smoothing: antialiased;
    transform: translateX(104%);
    transition: transform 0.2s var(--fai-ease);
  }
  .fai-panel.is-open { transform: translateX(0); }

  .fai-head {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    padding: 18px 18px 14px;
    border-bottom: 1px solid var(--fai-line);
  }
  .fai-head-brand {
    display: flex;
    align-items: center;
    gap: 10px;
    min-width: 0;
  }
  .fai-head-brand img {
    border-radius: 6px;
    flex-shrink: 0;
  }
  .fai-head h2 {
    margin: 0;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: -0.025em;
    line-height: 1.3;
  }
  .fai-head p {
    margin: 4px 0 0;
    font-size: 13px;
    line-height: 1.45;
    color: var(--fai-muted);
  }
  .fai-close {
    width: 32px;
    height: 32px;
    border-radius: 10px;
    border: 0;
    background: transparent;
    color: var(--fai-ink);
    cursor: pointer;
    display: grid;
    place-items: center;
    flex-shrink: 0;
  }
  .fai-close:hover { background: rgba(255, 255, 255, 0.06); }

  .fai-body {
    flex: 1;
    overflow-y: auto;
    padding: 18px;
    display: flex;
    flex-direction: column;
    gap: 14px;
  }

  .fai-intro {
    margin: 0;
    font-size: 14.5px;
    line-height: 1.55;
    color: var(--fai-muted);
  }

  .fai-starters {
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .fai-starter {
    text-align: left;
    padding: 12px 14px;
    border-radius: 12px;
    border: 1px solid var(--fai-line);
    background: rgba(255, 255, 255, 0.03);
    color: var(--fai-ink);
    font: inherit;
    font-size: 13.5px;
    letter-spacing: -0.015em;
    cursor: pointer;
    transition: background 0.15s ease, border-color 0.15s ease;
  }
  .fai-starter:hover {
    background: rgba(91, 100, 125, 0.16);
    border-color: rgba(91, 100, 125, 0.35);
  }

  .fai-msg {
    max-width: 92%;
    padding: 12px 14px;
    border-radius: 14px;
    font-size: 14px;
    line-height: 1.5;
  }
  .fai-msg--user {
    align-self: flex-end;
    background: rgba(237, 237, 239, 0.92);
    color: #0a0a0b;
  }
  .fai-msg--assistant {
    align-self: flex-start;
    background: rgba(255, 255, 255, 0.04);
    border: 1px solid var(--fai-line);
    color: rgba(237, 237, 239, 0.92);
  }

  .fai-foot {
    padding: 14px 16px 18px;
    border-top: 1px solid var(--fai-line);
    background: rgba(0, 0, 0, 0.25);
  }
  .fai-composer {
    display: flex;
    align-items: flex-end;
    gap: 8px;
    padding: 8px 8px 8px 14px;
    border-radius: 16px;
    background: var(--fai-surface);
    border: 1px solid var(--fai-line);
  }
  .fai-composer textarea {
    flex: 1;
    resize: none;
    border: 0;
    background: transparent;
    color: var(--fai-ink);
    font: inherit;
    font-size: 14px;
    line-height: 1.45;
    min-height: 24px;
    max-height: 120px;
    padding: 8px 0;
    outline: none;
    field-sizing: content;
  }
  .fai-composer textarea::placeholder { color: var(--fai-faint); }
  .fai-send {
    width: 34px;
    height: 34px;
    border-radius: 999px;
    border: 0;
    background: #ededef;
    color: #0a0a0b;
    cursor: pointer;
    display: grid;
    place-items: center;
    flex-shrink: 0;
    transition: opacity 0.15s ease, transform 0.15s var(--fai-ease);
  }
  .fai-send:disabled {
    opacity: 0.35;
    cursor: default;
  }
  .fai-send:not(:disabled):active { transform: scale(0.96); }
  .fai-hint {
    margin: 10px 2px 0;
    font-size: 12px;
    color: var(--fai-faint);
    line-height: 1.4;
  }
  .fai-hint a {
    color: rgba(237, 237, 239, 0.72);
    text-decoration: none;
  }
  .fai-hint a:hover { color: var(--fai-ink); }

  @media (max-width: 560px) {
    .fai-panel {
      width: 100vw;
      border-left: 0;
      border-top: 1px solid var(--fai-line);
      top: auto;
      bottom: 0;
      height: min(88dvh, 720px);
      border-radius: 18px 18px 0 0;
      transform: translateY(110%);
    }
    .fai-panel.is-open { transform: translateY(0); }
  }
`;

export function AskAiTrigger({
  className,
  tone = "dark",
  onOpen,
}: {
  className?: string;
  tone?: "dark" | "light";
  onOpen?: () => void;
}) {
  return (
    <button
      type="button"
      className={className}
      data-tone={tone}
      onClick={() => {
        onOpen?.();
        openAskAi();
      }}
      aria-haspopup="dialog"
    >
      Ask AI
    </button>
  );
}

export function AskAiPanel() {
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [draft, setDraft] = useState("");
  const [msgs, setMsgs] = useState<Msg[]>([]);
  const titleId = useId();
  const bodyRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener(ASK_AI_OPEN_EVENT, onOpen);
    return () => window.removeEventListener(ASK_AI_OPEN_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    const t = window.setTimeout(() => inputRef.current?.focus(), 220);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.clearTimeout(t);
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    bodyRef.current?.scrollTo({ top: bodyRef.current.scrollHeight, behavior: "smooth" });
  }, [msgs, open]);

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed) return;
    setMsgs((prev) => [
      ...prev,
      { role: "user", text: trimmed },
      { role: "assistant", text: answerFor(trimmed) },
    ]);
    setDraft("");
  }

  if (!mounted) return null;

  return createPortal(
    <div className="fai-root">
      <style>{PANEL_STYLES}</style>
      <div
        className={`fai-backdrop${open ? " is-open" : ""}`}
        onClick={() => setOpen(false)}
        aria-hidden={!open}
      />
      <aside
        className={`fai-panel${open ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        aria-hidden={!open}
      >
        <div className="fai-head">
          <div className="fai-head-brand">
            <FestagMark size={28} />
            <div>
              <h2 id={titleId}>Frag Tagro zu Festag und Delivery Intelligence.</h2>
              <p>Ruhig, klar, entscheidungsreif — kein generischer Chatbot.</p>
            </div>
          </div>
          <button
            type="button"
            className="fai-close"
            aria-label="Schließen"
            onClick={() => setOpen(false)}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path
                d="M6 6l12 12M18 6L6 18"
                stroke="currentColor"
                strokeWidth="1.8"
                strokeLinecap="round"
              />
            </svg>
          </button>
        </div>

        <div className="fai-body" ref={bodyRef}>
          {msgs.length === 0 ? (
            <>
              <p className="fai-intro">
                Stelle eine Frage zu Festag, Tagro, Connectors oder dem Unterschied zu
                Slack und Linear.
              </p>
              <div className="fai-starters">
                {STARTERS.map((starter) => (
                  <button
                    key={starter}
                    type="button"
                    className="fai-starter"
                    onClick={() => send(starter)}
                  >
                    {starter}
                  </button>
                ))}
              </div>
            </>
          ) : (
            msgs.map((msg, i) => (
              <div
                key={`${msg.role}-${i}`}
                className={`fai-msg fai-msg--${msg.role}`}
              >
                {msg.text}
              </div>
            ))
          )}
        </div>

        <div className="fai-foot">
          <form
            className="fai-composer"
            onSubmit={(e) => {
              e.preventDefault();
              send(draft);
            }}
          >
            <textarea
              ref={inputRef}
              rows={1}
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              placeholder="Frage stellen…"
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault();
                  send(draft);
                }
              }}
            />
            <button
              type="submit"
              className="fai-send"
              aria-label="Senden"
              disabled={!draft.trim()}
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden>
                <path
                  d="M12 19V5M12 5l-6 6M12 5l6 6"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </form>
          <p className="fai-hint">
            Für live Tagro in eurem Workspace:{" "}
            <a href="https://festag.app" target="_blank" rel="noopener noreferrer">
              Open App
            </a>
          </p>
        </div>
      </aside>
    </div>,
    document.body,
  );
}
