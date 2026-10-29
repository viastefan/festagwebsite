"use client";

import "./appdemo.css";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { useTimeline } from "./hooks";

/* ───────── Theme (Hell / Dunkel wie festag.app) — geteilt von allen Demos ───────── */

type Theme = "light" | "dark";
const KEY = "festag-demo-theme";
const subs = new Set<() => void>();
let current: Theme | null = null;

function readTheme(): Theme {
  if (current) return current;
  try {
    const s = window.localStorage.getItem(KEY);
    if (s === "light" || s === "dark") return (current = s);
  } catch {
    /* privater Modus */
  }
  return (current = "light");
}
function setTheme(t: Theme) {
  current = t;
  try {
    window.localStorage.setItem(KEY, t);
  } catch {
    /* ignorieren */
  }
  subs.forEach((f) => f());
}
function subscribe(f: () => void) {
  subs.add(f);
  return () => {
    subs.delete(f);
  };
}
function useTheme(): Theme {
  return useSyncExternalStore(subscribe, readTheme, () => "light");
}

function useReducedMotion() {
  const [r, setR] = useState(false);
  useEffect(() => {
    setR(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  }, []);
  return r;
}

function useInView<T extends Element>() {
  const ref = useRef<T>(null);
  const [v, setV] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setV(e.isIntersecting), { threshold: 0.2 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return [ref, v] as const;
}

/** Läuft nur im Sichtbereich; mit reduzierter Bewegung steht der Endzustand. */
function useScene(durations: readonly number[]) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const [step] = useTimeline(durations, inView && !reduced);
  return { ref, step: reduced ? durations.length - 2 : step };
}

/* ───────── Icons ───────── */

const I = {
  check: (
    <svg viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
      <path d="m5 10.5 3.2 3.2L15 6.8" />
    </svg>
  ),
  sun: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="8" cy="8" r="2.6" />
      <path d="M8 1.5v1.6M8 12.9v1.6M1.5 8h1.6M12.9 8h1.6M3.4 3.4l1.1 1.1M11.5 11.5l1.1 1.1M3.4 12.6l1.1-1.1M11.5 4.5l1.1-1.1" />
    </svg>
  ),
  moon: (
    <svg viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M13.2 9.6A5.4 5.4 0 0 1 6.4 2.8a5.4 5.4 0 1 0 6.8 6.8Z" />
    </svg>
  ),
  caret: (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="m3 4.5 3 3 3-3" />
    </svg>
  ),
  info: (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round">
      <circle cx="6" cy="6" r="4.6" />
      <path d="M6 5.4V8.4M6 3.8v.1" />
    </svg>
  ),
  mark: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3.5v4M12 16.5v4M3.5 12h4M16.5 12h4" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" stroke="none" />
    </svg>
  ),
  up: (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 10V2.5M2.8 5.5 6 2.3l3.2 3.2" />
    </svg>
  ),
  logo: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M4 6.5C4 5.1 5.1 4 6.5 4H17a3 3 0 0 1 0 6H9.5v2H15a3 3 0 0 1 0 6h-4.5v2.5a1.5 1.5 0 0 1-3 0V14H6.5A2.5 2.5 0 0 1 4 11.5v-5Z" />
    </svg>
  ),
};

/* ───────── Rahmen ───────── */

function ThemeSwitch({ theme }: { theme: Theme }) {
  return (
    <div className="ad-theme" role="group" aria-label="Darstellung">
      <button type="button" aria-label="Hell" aria-pressed={theme === "light"} onClick={() => setTheme("light")}>
        {I.sun}
      </button>
      <button type="button" aria-label="Dunkel" aria-pressed={theme === "dark"} onClick={() => setTheme("dark")}>
        {I.moon}
      </button>
    </div>
  );
}

function Rail() {
  return (
    <aside className="ad-rail" aria-hidden>
      <div className="ad-rail-mark">
        <span className="ad-mark" />
        festag
      </div>
      <div className="ad-nav is-active">
        Status
        <span className="k">S</span>
      </div>
      <div className="ad-nav">
        Entscheidungen
        <span className="n">2</span>
        <span className="k">E</span>
      </div>
      <div className="ad-nav">
        Projekte<span className="k">P</span>
      </div>
      <div className="ad-nav">
        Lieferungen<span className="k">L</span>
      </div>
      <div className="ad-nav">
        Aufgaben<span className="k">A</span>
      </div>
      <div className="ad-rail-more">Mehr</div>
      <div className="ad-nav">Aktivität</div>
      <div className="ad-nav">Team</div>
      <div className="ad-rail-foot">
        <div className="ad-nav">Aven</div>
        <div className="ad-user">
          <i>SN</i>
          <span>
            Sara Nord<small>Studio Nord</small>
          </span>
        </div>
      </div>
    </aside>
  );
}

function Frame({
  children,
  rail = true,
  title = "Festag",
  height,
  fixed,
  className,
}: {
  children: React.ReactNode;
  rail?: boolean;
  title?: string;
  height?: number;
  fixed?: boolean;
  className?: string;
}) {
  const theme = useTheme();
  return (
    <div
      className={`ad ${className ?? ""}`}
      data-theme={theme}
      style={height ? ({ "--ad-h": `${height}px` } as React.CSSProperties) : undefined}
    >
      <div className="adw">
        <div className="adw-bar">
          <div className="adw-dots" aria-hidden>
            <span />
            <span />
            <span />
          </div>
          <div className="adw-title">{title}</div>
          <div className="adw-tools">
            <ThemeSwitch theme={theme} />
          </div>
        </div>
        <div className={`adw-body${rail ? "" : " no-rail"}${fixed ? " is-fixed" : ""}`}>
          {rail ? <Rail /> : null}
          <div className="ad-main">{children}</div>
        </div>
      </div>
    </div>
  );
}

/* ───────── Bausteine ───────── */

const ART: Record<string, [string, string]> = {
  zahlung: ["#d8cdc2", "#f2ece4"],
  api: ["#e0d2b8", "#f5eddc"],
  dash: ["#d6d2c2", "#efece2"],
  farbe: ["#d2c8c0", "#f0eae4"],
};

function Thumb({ seed, lg }: { seed: keyof typeof ART; lg?: boolean }) {
  const [c1, c2] = ART[seed];
  return (
    <span className={`ad-thumb${lg ? " is-lg" : ""}`} aria-hidden style={{ "--c1": c1, "--c2": c2 } as React.CSSProperties}>
      <span className="ad-sheet back" />
      <span className="ad-sheet mid" />
      <span className="ad-sheet front">
        <span className="ad-art" />
      </span>
    </span>
  );
}

function Ring({ state }: { state: "open" | "busy" | "done" }) {
  return (
    <span className={`ad-ring${state === "done" ? " is-done" : state === "busy" ? " is-busy" : ""}`} aria-hidden>
      {state === "done" ? I.check : null}
    </span>
  );
}

type RowData = {
  key: string;
  seed: keyof typeof ART;
  title: string;
  text: string;
  when: string;
  done?: boolean;
};

function Row({ r, dim, isNew }: { r: RowData; dim?: boolean; isNew?: boolean }) {
  return (
    <div className={`ad-row${r.done ? " is-done" : ""}${dim ? " is-dim" : ""}${isNew ? " is-new" : ""}`}>
      <Thumb seed={r.seed} />
      <div className="ad-row-copy">
        <h4 className="ad-row-title">{r.title}</h4>
        <p className="ad-row-text">{r.text}</p>
      </div>
      <div className="ad-row-side">
        <span className="ad-when">{r.when}</span>
        <Ring state={r.done ? "done" : "open"} />
      </div>
    </div>
  );
}

const ROWS: RowData[] = [
  {
    key: "api",
    seed: "api",
    title: "Zugang zur Kunden-API",
    text: "Atlas Kundenportal: Der Login-Meilenstein hängt seit drei Tagen am fehlenden Zugang.",
    when: "34 Min.",
  },
  {
    key: "dash",
    seed: "dash",
    title: "Dashboard-Modul abgenommen",
    text: "Belegt durch PR #402. Das Update an den Kunden ist formuliert und wartet auf Freigabe.",
    when: "2 Std.",
    done: true,
  },
  {
    key: "farbe",
    seed: "farbe",
    title: "Farben und Schriften erteilt",
    text: "Entscheidung erteilt. Die Umsetzung ist an das Team übergeben.",
    when: "Gestern",
    done: true,
  },
];

/* Die eine Entscheidung, um die sich alles dreht. */
const DECISION = {
  tag: "Nordlicht Checkout",
  deadline: "Deadline 14. Oktober",
  title: "Zahlungsanbieter wählen",
  decidedTitle: "Mollie als Zahlungsmethode wählen",
  sub: "Nordlicht wartet auf deine Wahl. Ohne Anbieter steht der Checkout still.",
  rec: "Mollie",
  recText: "Günstigere Gebühren bei eurem Volumen, SEPA und Klarna ohne Zusatzvertrag.",
  why: (
    <>
      <b>Warum Mollie:</b> Bei rund 600 Bestellungen im Monat spart ihr gegenüber Stripe etwa 38 € Gebühren. SEPA-Lastschrift und
      Klarna sind enthalten, die Anbindung dauert einen Tag statt drei.
    </>
  ),
};

function Timeline({ stage }: { stage: number }) {
  const items = [
    { t: "An Claude Code weitergegeben", s: "Aven hat den Brief mit Kontext und Akzeptanzkriterien übergeben." },
    { t: "Pull Request #402 geöffnet", s: "Mollie-Checkout, +142 −18, Tests grün" },
    { t: "Gemerged und live in der Vorschau", s: "Aven prüft den Beleg und schreibt das Update für Nordlicht." },
  ];
  return (
    <ol className="ad-tl">
      {items.map((it, i) => {
        const on = stage > i;
        const busy = stage === i;
        return (
          <li key={it.t} className={on || busy ? "is-on" : ""}>
            <Ring state={on ? "done" : busy ? "busy" : "open"} />
            <div>
              <b>{it.t}</b>
              <small>{it.s}</small>
            </div>
          </li>
        );
      })}
    </ol>
  );
}

function DecisionCard({
  press,
  busy,
  decided,
  why,
  stage,
}: {
  press?: boolean;
  busy?: boolean;
  decided?: boolean;
  why?: boolean;
  stage?: number;
}) {
  return (
    <article className="ad-card" aria-label="Entscheidung">
      <div className="ad-card-head">
        <Thumb seed="zahlung" lg />
        <div className="ad-card-titles">
          <div className="ad-card-meta">
            <span className="ad-tag">{DECISION.tag}</span>
            <span className="ad-when">{decided ? "Entschieden" : DECISION.deadline}</span>
          </div>
          <h3 className="ad-card-title">{decided ? DECISION.decidedTitle : DECISION.title}</h3>
          {decided ? null : <p className="ad-card-sub">{DECISION.sub}</p>}
        </div>
        <Ring state={decided ? "done" : busy ? "busy" : "open"} />
      </div>

      {decided ? (
        <Timeline stage={stage ?? 0} />
      ) : (
        <>
          <div className="ad-panel">
            <div>
              <small>
                Aven empfiehlt
              </small>
              <strong>{DECISION.rec}</strong>
              <p>{DECISION.recText}</p>
            </div>
            <span className={`ad-cta${press ? " is-press" : ""}`}>Entscheidung treffen</span>
          </div>
          {why ? <div className="ad-why">{DECISION.why}</div> : null}
          <div className="ad-chips">
            <span className="ad-chip">Andere Optionen {I.caret}</span>
            <span className="ad-chip is-static">Zahlung</span>
            <span className={`ad-chip${why ? " is-on" : ""}`}>Warum {I.caret}</span>
          </div>
          <p className="ad-then">
            Dann passiert: <b>Aven übergibt die Aufgabe an Claude Code</b> und prüft den Pull Request.
          </p>
        </>
      )}

      <div className="ad-ask">
        <span>Frag Aven …</span>
        <i>{I.up}</i>
      </div>
    </article>
  );
}


/* Zweites, überlappendes Fenster wie bei Cursor („CLI“): Avens Verlauf. */
function Peek({ step }: { step: number }) {
  const theme = useTheme();
  const lines: [string, string][] = [
    ["Liest", "Linear ATL-81 … ATL-88"],
    ["Liest", "Slack #atlas, 3 Threads"],
    ["Prüft", "GitHub PR #398, #402"],
  ];
  return (
    <div className="ad ad-peek" data-theme={theme} aria-hidden>
      <div className="adw">
        <div className="adw-bar">
          <div className="adw-dots">
            <span />
            <span />
            <span />
          </div>
          <div className="adw-title">Aven</div>
          <div />
        </div>
        <div className="ad-peek-body">
          {lines.map(([k, v], i) =>
            step >= 1 + i ? (
              <div key={v} className="ad-peek-line ad-src">
                <i />
                <b>{k}</b> {v}
              </div>
            ) : null,
          )}
          {step >= 4 ? (
            <p className="ad-src">
              Der API-Zugang fehlt seit drei Tagen und blockiert den Login-Meilenstein. Ich habe die Entscheidung vorbereitet.
            </p>
          ) : null}
          {step >= 4 ? (
            <div className="ad-peek-code ad-src">
              decision/zahlung.ts <span className="add">+142</span> <span className="del">−18</span>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

/* ───────── Szene 1: Hero — vom Feed zur getroffenen Entscheidung ───────── */

const HERO_STEPS = [1900, 2300, 2700, 1200, 1500, 1500, 1500, 2800] as const;

export function HeroApp() {
  const { ref, step } = useScene(HERO_STEPS);
  const open = step >= 1;
  const decided = step >= 4;
  const stage = Math.min(Math.max(step - 3, 0), 3);
  return (
    <div ref={ref} className="ad-hero-wrap">
      <Frame height={640} fixed>
        <div className="ad-h">
          <b>Status</b>
          <span>2 Entscheidungen warten auf dich</span>
        </div>
        <div className="ad-list">
          {open ? (
            <DecisionCard
              press={step === 3}
              busy={step === 3}
              decided={decided}
              why={step === 2 || step === 3}
              stage={stage}
            />
          ) : (
            <Row
              r={{
                key: "zahlung",
                seed: "zahlung",
                title: DECISION.title,
                text: "Nordlicht Checkout wartet auf deine Wahl. Aven empfiehlt Mollie.",
                when: "jetzt",
              }}
            />
          )}
          {ROWS.map((r, i) => (
            <Row key={r.key} r={r} dim={open} isNew={false} />
          ))}
        </div>
      </Frame>
      <Peek step={step} />
    </div>
  );
}

/* ───────── Szene 2: Status-Feed lebt ───────── */

const FEED_STEPS = [1400, 1800, 1800, 2600] as const;

export function FeedScene() {
  const { ref, step } = useScene(FEED_STEPS);
  const fresh: RowData = {
    key: "risiko",
    seed: "zahlung",
    title: "Risiko erkannt: API-Zugang fehlt",
    text: "Aven hat den Zusammenhang belegt und eine Entscheidung vorbereitet.",
    when: "jetzt",
  };
  const rows: RowData[] = ROWS.map((r) => (r.key === "api" && step >= 2 ? { ...r, done: true, when: "jetzt" } : r));
  return (
    <div ref={ref}>
      <Frame rail={false} height={470}>
        <div className="ad-h">
          <b>Status</b>
          <span>Alles, was heute zählt</span>
        </div>
        <div className="ad-list">
          {step >= 1 ? <Row key="fresh" r={fresh} isNew /> : null}
          {rows.map((r) => (
            <Row key={r.key} r={r} />
          ))}
        </div>
      </Frame>
    </div>
  );
}

/* ───────── Szene 3: Entscheidung treffen ───────── */

const DEC_STEPS = [1500, 2600, 1100, 1300, 3000] as const;

export function DecisionScene() {
  const { ref, step } = useScene(DEC_STEPS);
  const decided = step >= 3;
  return (
    <div ref={ref}>
      <Frame rail={false} height={500} title="Entscheidungen">
        <DecisionCard
          why={step === 1 || step === 2}
          press={step === 2}
          busy={step === 2}
          decided={decided}
          stage={decided ? (step === 3 ? 1 : 3) : 0}
        />
      </Frame>
    </div>
  );
}

/* ───────── Szene 4: Aven fragen ───────── */

const ANSWER =
  "Der API-Zugang des Kunden fehlt seit drei Tagen und blockiert den Login-Meilenstein. Ich habe eine Entscheidung vorbereitet und das Update in ruhiger Sprache formuliert.";

export function AskScene() {
  const { ref, step } = useScene([900, 1200, 3400, 3000] as const);
  const words = ANSWER.split(/(\s+)/);
  let w = 0;
  return (
    <div ref={ref}>
      <Frame rail={false} height={470} title="Aven">
        <div className="ad-chat">
          <div className="ad-me">Warum hängt der Login-Meilenstein?</div>
          {step >= 1 ? (
            <div className="ad-aven">
              <div className="ad-aven-body">
                {step === 1 ? (
                  <span className="ad-dots" aria-label="Aven denkt nach">
                    <span />
                    <span />
                    <span />
                  </span>
                ) : (
                  <p>
                    {words.map((part, i) =>
                      /^\s+$/.test(part) ? (
                        part
                      ) : (
                        <span key={i} className="ad-word" style={{ "--w": Math.min(w++, 60) } as React.CSSProperties}>
                          {part}
                        </span>
                      ),
                    )}
                  </p>
                )}
                {step >= 3 ? (
                  <>
                    <div className="ad-chips ad-src">
                      <span className="ad-chip">Linear ATL-81</span>
                      <span className="ad-chip">Slack #atlas</span>
                      <span className="ad-chip">GitHub PR #402</span>
                    </div>
                    <span className="ad-cta ad-src" style={{ alignSelf: "flex-start" }}>
                      Entscheidung ansehen
                    </span>
                  </>
                ) : null}
              </div>
            </div>
          ) : null}
        </div>
      </Frame>
    </div>
  );
}

/* ───────── Szene 5: Übergabe an den Coding-Agent ───────── */

export function HandoffScene() {
  const { ref, step } = useScene([1200, 1500, 1500, 1500, 3000] as const);
  const stage = Math.min(step, 3);
  return (
    <div ref={ref}>
      <Frame rail={false} height={500} title="Lieferungen">
        <div className="ad-h">
          <b>Mollie als Zahlungsmethode wählen</b>
          <span className="ad-agent">
            <i />
            Claude Code
          </span>
        </div>
        <div className="ad-list" style={{ gap: 18 }}>
          <div className="ad-brief">
            <b>Brief von Aven</b>
            Mollie-Checkout für Nordlicht einbauen: SEPA und Klarna, Webhooks, Testmodus. Akzeptiert, wenn alle Zahlungswege im
            Staging grün sind.
          </div>
          <Timeline stage={stage} />
          {stage >= 2 ? (
            <div className="ad-pr ad-src">
              <span>
                #402 Mollie-Checkout <em>Nordlicht</em>
              </span>
              <span>
                <span className="add">+142</span> <em>−18</em>
              </span>
            </div>
          ) : null}
        </div>
      </Frame>
    </div>
  );
}

/* ───────── Szene 6: Portfolio (Führung) ───────── */

const PORTFOLIO = [
  { n: "Atlas Kundenportal", s: "Build, 68 %", h: 72, k: "1 Entscheidung wartet", seed: "api" as const },
  { n: "Nordlicht Checkout", s: "Review, 81 %", h: 88, k: "Zahlungsanbieter offen", seed: "zahlung" as const },
  { n: "Velo Preview", s: "Live, 100 %", h: 94, k: "Alles geliefert", seed: "dash" as const },
  { n: "Kontor Relaunch", s: "Discovery, 22 %", h: 54, k: "Risiko: Inhalte fehlen", seed: "farbe" as const },
];

export function PortfolioScene() {
  const { ref, step } = useScene([1200, 1000, 1000, 1000, 1000, 2800] as const);
  return (
    <div ref={ref}>
      <Frame rail={false} height={470} title="Projekte">
        <div className="ad-h">
          <b>Projekte</b>
          <span>4 aktiv, Health im Schnitt 77</span>
        </div>
        <div className="ad-list">
          {PORTFOLIO.map((p, i) =>
            step >= i ? (
              <div key={p.n} className="ad-row is-new">
                <Thumb seed={p.seed} />
                <div className="ad-row-copy">
                  <h4 className="ad-row-title">{p.n}</h4>
                  <p className="ad-row-text">
                    {p.s}, {p.k}
                  </p>
                </div>
                <div className="ad-row-side">
                  <span className="ad-when">Health {p.h}</span>
                  <Ring state={p.h >= 85 ? "done" : "open"} />
                </div>
              </div>
            ) : null,
          )}
        </div>
      </Frame>
    </div>
  );
}

/* ───────── Szene 7: Gelerntes (Adaptive Intelligence) ───────── */

export function MemoryScene() {
  const { ref, step } = useScene([1200, 1400, 1400, 1400, 2800] as const);
  const items = [
    ["Gelernt aus „Mollie gewählt“", "Ihr entscheidet bei Zahlungen nach Gebühren, nicht nach Markenbekanntheit."],
    ["Gelernt aus 3 Lieferungen", "„Fertig“ heißt bei euch: Tests grün und Vorschau abgenommen."],
    ["Regel vorgeschlagen", "Entscheidungen unter 500 € bereitet Aven direkt zur Freigabe vor."],
  ];
  return (
    <div ref={ref}>
      <Frame rail={false} height={470} title="Gedächtnis">
        <div className="ad-h">
          <b>Was Aven über euch weiß</b>
          <span>Wächst mit jedem Projekt</span>
        </div>
        <ol className="ad-tl" style={{ gap: 4 }}>
          {items.map(([t, d], i) => (
            <li key={t} className={step > i ? "is-on" : ""}>
              <Ring state={step > i + 1 ? "done" : step > i ? "busy" : "open"} />
              <div>
                <b>{t}</b>
                <small>{d}</small>
              </div>
            </li>
          ))}
        </ol>
      </Frame>
    </div>
  );
}

/* ───────── Szene 8: Connectors ───────── */

export function ConnectorsScene() {
  const { ref, step } = useScene([1000, 900, 900, 900, 900, 2800] as const);
  const tools: [string, string][] = [
    ["GitHub", "Commits, Pull Requests, Reviews"],
    ["Linear", "Tickets, Zyklen, Status"],
    ["Slack", "Kanäle und Threads, nur ausgewählte"],
    ["Jira", "Epics, Sprints, Blocker"],
    ["Notion", "Dokumente und Entscheidungen"],
  ];
  return (
    <div ref={ref}>
      <Frame rail={false} height={470} title="Konnektoren">
        <div className="ad-h">
          <b>Konnektoren</b>
          <span>{Math.max(0, Math.min(step - 1, 5))} von 5 verbunden</span>
        </div>
        <div className="ad-list">
          {tools.map(([n, d], i) => (
            <div key={n} className="ad-row" style={{ gap: 16 }}>
              <div className="ad-row-copy">
                <h4 className="ad-row-title">{n}</h4>
                <p className="ad-row-text">{d}</p>
              </div>
              <div className="ad-row-side" style={{ justifyContent: "center" }}>
                <Ring state={step > i + 1 ? "done" : step > i ? "busy" : "open"} />
              </div>
            </div>
          ))}
        </div>
      </Frame>
    </div>
  );
}
