"use client";

import "./appdemo.css";
import { useState, type CSSProperties, type KeyboardEvent } from "react";
import { Frame, I, useDemo, useScript } from "./demo-kit";

export { AskScene, DecisionScene, FeedScene, HandoffScene, HeroApp, PortfolioScene } from "./desk";

/* ───────── Bausteine für Gedächtnis und Konnektoren ───────── */

const ART: Record<string, [string, string]> = {
  zahlung: ["#d8cdc2", "#f2ece4"],
  api: ["#e0d2b8", "#f5eddc"],
  dash: ["#d6d2c2", "#efece2"],
  farbe: ["#d2c8c0", "#f0eae4"],
};
type ArtKey = keyof typeof ART;

function Thumb({ seed, lg }: { seed: ArtKey; lg?: boolean }) {
  const [c1, c2] = ART[seed];
  return (
    <span className={`ad-thumb${lg ? " is-lg" : ""}`} aria-hidden style={{ "--c1": c1, "--c2": c2 } as CSSProperties}>
      <span className="ad-sheet back" />
      <span className="ad-sheet mid" />
      <span className="ad-sheet front">
        <span className="ad-art" />
      </span>
    </span>
  );
}

type RingState = "open" | "busy" | "done";

function Ring({ state }: { state: RingState }) {
  return (
    <span className={`ad-ring${state === "done" ? " is-done" : state === "busy" ? " is-busy" : ""}`} aria-hidden>
      {state === "done" ? I.check : null}
    </span>
  );
}

function ExpandRow({
  title,
  text,
  when,
  seed,
  ring,
  onRing,
  open,
  onClick,
  detail,
  dim,
  isNew,
}: {
  title: string;
  text?: string;
  when?: string;
  seed?: ArtKey;
  ring?: RingState;
  onRing?: () => void;
  open?: boolean;
  onClick?: () => void;
  detail?: React.ReactNode;
  dim?: boolean;
  isNew?: boolean;
}) {
  const click = onClick
    ? {
        role: "button" as const,
        tabIndex: 0,
        "aria-expanded": detail ? !!open : undefined,
        onClick,
        onKeyDown: (e: KeyboardEvent) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick();
          }
        },
      }
    : {};
  return (
    <div className={`ad-rowwrap${dim ? " is-dim" : ""}${isNew ? " is-new" : ""}`}>
      <div className={`ad-row${ring === "done" ? " is-done" : ""}${onClick ? " is-click" : ""}`} {...click}>
        {seed ? <Thumb seed={seed} /> : null}
        <div className="ad-row-copy">
          <p className="ad-row-title">{title}</p>
          {text ? <p className="ad-row-text">{text}</p> : null}
        </div>
        {when || ring ? (
          <div className="ad-row-side">
            <span className="ad-when">{when}</span>
            {ring ? (
              onRing ? (
                <button
                  type="button"
                  className="ad-ringbtn"
                  aria-label={ring === "done" ? "Als offen markieren" : "Abhaken"}
                  onClick={(e) => {
                    e.stopPropagation();
                    onRing();
                  }}
                >
                  <Ring state={ring} />
                </button>
              ) : (
                <Ring state={ring} />
              )
            ) : null}
          </div>
        ) : null}
      </div>
      {open && detail ? <div className="ad-detail">{detail}</div> : null}
    </div>
  );
}

const LEARNED = [
  { t: "Gelernt aus der letzten Abnahme", s: "Fertig heißt bei euch: der Client hat abgenommen, nicht nur dass der Beleg da ist." },
  { t: "Gelernt aus 3 Lieferungen", s: "Die Formulierung an den Client geht raus, sobald die Umsetzung belegt ist." },
  { t: "Regel vorgeschlagen", s: "Lieferungen an den Client legt Aven vor. Abgenommen bleibt ein eigener Schritt." },
];

export function MemoryScene() {
  const { ref, auto, onPointerDownCapture } = useDemo();
  const [ok, setOk] = useState<boolean[]>([false, false, false]);
  const set = (i: number, v: boolean) => setOk((o) => o.map((x, k) => (k === i ? v : x)));
  useScript(auto, [
    [1200, () => set(0, true)],
    [1400, () => set(1, true)],
    [1400, () => set(2, true)],
    [2800, () => setOk([false, false, false])],
  ]);
  return (
    <div ref={ref} onPointerDownCapture={onPointerDownCapture}>
      <Frame height={330} title="Gedächtnis">
        <div className="ad-h">
          <b>Was Aven über euch weiß</b>
          <span>Tippe, um etwas zu bestätigen</span>
        </div>
        <div className="ad-list">
          {LEARNED.map((l, i) => (
            <ExpandRow
              key={l.t}
              title={l.t}
              text={l.s}
              ring={ok[i] ? "done" : "open"}
              onClick={() => set(i, !ok[i])}
              onRing={() => set(i, !ok[i])}
            />
          ))}
        </div>
      </Frame>
    </div>
  );
}

const TOOLS: [string, string][] = [
  ["GitHub", "Commits, Pull Requests, Reviews"],
  ["Linear", "Tickets, Zyklen, Status"],
  ["Slack", "Kanäle und Threads, nur ausgewählte"],
  ["Jira", "Epics, Sprints, Blocker"],
  ["Notion", "Dokumente und Entscheidungen"],
];

export function ConnectorsScene() {
  const { ref, auto, onPointerDownCapture } = useDemo();
  const [on, setOn] = useState<boolean[]>(TOOLS.map(() => false));
  const set = (i: number, v: boolean) => setOn((o) => o.map((x, k) => (k === i ? v : x)));
  useScript(auto, [
    [1000, () => set(0, true)],
    [900, () => set(1, true)],
    [900, () => set(2, true)],
    [900, () => set(3, true)],
    [900, () => set(4, true)],
    [2800, () => setOn(TOOLS.map(() => false))],
  ]);
  const n = on.filter(Boolean).length;
  return (
    <div ref={ref} onPointerDownCapture={onPointerDownCapture}>
      <Frame height={410} title="Konnektoren">
        <div className="ad-h">
          <b>Konnektoren</b>
          <span>{n} von 5 verbunden</span>
        </div>
        <div className="ad-list">
          {TOOLS.map(([name, desc], i) => (
            <ExpandRow
              key={name}
              title={name}
              text={on[i] ? `${desc}. Verbunden.` : desc}
              ring={on[i] ? "done" : "open"}
              onClick={() => set(i, !on[i])}
              onRing={() => set(i, !on[i])}
            />
          ))}
        </div>
      </Frame>
    </div>
  );
}
