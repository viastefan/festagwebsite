"use client";

import "./appdemo.css";
import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from "react";
import { BrandLogo } from "../ui/BrandLogo";
import { aven, STARTERS, type Ctx, type NavTarget, type Reply } from "./aven-brain";

/* ───────── Theme (Hell / Dunkel wie festag.app), geteilt von allen Demos ───────── */

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
  // Keine eigene Wahl: dem Schalter der Website folgen
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
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
  const mo = new MutationObserver(f);
  mo.observe(document.documentElement, { attributes: true, attributeFilter: ["data-theme"] });
  return () => {
    subs.delete(f);
    mo.disconnect();
  };
}
function useTheme(): Theme {
  return useSyncExternalStore(subscribe, readTheme, () => "light");
}

/* ───────── Steuerung: läuft von allein, bis jemand klickt ───────── */

function subscribeMotion(cb: () => void) {
  const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
  mq.addEventListener("change", cb);
  return () => mq.removeEventListener("change", cb);
}
function useReducedMotion() {
  return useSyncExternalStore(
    subscribeMotion,
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false,
  );
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

/** Spielt `steps` in Schleife ab, solange `active`. Schritt = [Wartezeit in ms, Aktion]. */
function useScript(active: boolean, steps: [number, () => void][]) {
  const ref = useRef(steps);
  useEffect(() => {
    ref.current = steps;
  });
  useEffect(() => {
    if (!active) return;
    let i = 0;
    let t = 0;
    const run = () => {
      const [ms, fn] = ref.current[i];
      t = window.setTimeout(() => {
        fn();
        i = (i + 1) % ref.current.length;
        run();
      }, ms);
    };
    run();
    return () => window.clearTimeout(t);
  }, [active]);
}

/** Jede Szene: Autoplay im Sichtbereich; der erste Klick darin übergibt die Steuerung an die Person. */
function useDemo() {
  const [ref, inView] = useInView<HTMLDivElement>();
  const reduced = useReducedMotion();
  const [manual, setManual] = useState(false);
  const auto = inView && !manual && !reduced;
  const onPointerDownCapture = useCallback((e: React.PointerEvent) => {
    if (!(e.target as HTMLElement).closest(".ad-theme")) setManual(true);
  }, []);
  return { ref, auto, onPointerDownCapture };
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
  up: (
    <svg viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 10V2.5M2.8 5.5 6 2.3l3.2 3.2" />
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

function Frame({
  children,
  rail,
  aside,
  title = "Festag",
  height,
  fixed,
}: {
  children: React.ReactNode;
  rail?: React.ReactNode;
  aside?: React.ReactNode;
  title?: string;
  height?: number;
  fixed?: boolean;
}) {
  const theme = useTheme();
  return (
    <div className="ad" data-theme={theme} style={height ? ({ "--ad-h": `${height}px` } as React.CSSProperties) : undefined}>
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
        <div className={`adw-body${rail ? "" : " no-rail"}${fixed ? " is-fixed" : ""}${aside ? " has-aside" : ""}`}>
          {rail}
          <div className="ad-main">{children}</div>
          {aside}
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
type ArtKey = keyof typeof ART;

function Thumb({ seed, lg }: { seed: ArtKey; lg?: boolean }) {
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

type RingState = "open" | "busy" | "done";

function Ring({ state }: { state: RingState }) {
  return (
    <span className={`ad-ring${state === "done" ? " is-done" : state === "busy" ? " is-busy" : ""}`} aria-hidden>
      {state === "done" ? I.check : null}
    </span>
  );
}

/** Zeile im Feed: antippbar, klappt Details auf, der Ring lässt sich einzeln abhaken. */
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
        onKeyDown: (e: React.KeyboardEvent) => {
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

/* ───────── Entscheidungen (Daten + Zustand) ───────── */

type Opt = { id: string; label: string; note: string; rec?: boolean };
type Dec = {
  id: string;
  seed: ArtKey;
  tag: string;
  deadline: string;
  title: string;
  sub: string;
  rowText: string;
  when: string;
  opts: Opt[];
  why: (o: Opt) => string;
  then: string;
  decidedTitle: (o: Opt) => string;
  steps: (o: Opt) => { t: string; s: string }[];
};

const ZAHLUNG: Dec = {
  id: "zahlung",
  seed: "zahlung",
  tag: "Nordlicht Checkout",
  deadline: "Deadline 14. Oktober",
  title: "Zahlungsanbieter wählen",
  sub: "Nordlicht wartet auf deine Wahl. Ohne Anbieter steht der Checkout still.",
  rowText: "Nordlicht Checkout wartet auf deine Wahl. Aven empfiehlt Mollie.",
  when: "jetzt",
  opts: [
    { id: "mollie", label: "Mollie", note: "Günstigere Gebühren bei eurem Volumen, SEPA und Klarna ohne Zusatzvertrag.", rec: true },
    { id: "stripe", label: "Stripe", note: "Größtes Ökosystem, bei eurem Volumen etwa 38 € mehr Gebühren im Monat." },
    { id: "adyen", label: "Adyen", note: "Lohnt sich erst bei deutlich höherem Volumen, teurere Einrichtung." },
  ],
  why: (o) =>
    o.id === "mollie"
      ? "Bei rund 600 Bestellungen im Monat spart ihr gegenüber Stripe etwa 38 € Gebühren. SEPA-Lastschrift und Klarna sind enthalten, die Anbindung dauert einen Tag statt drei."
      : o.id === "stripe"
        ? "Stripe hat das größte Ökosystem und die beste Dokumentation, kostet bei eurem Volumen aber etwa 38 € mehr im Monat. Die Anbindung dauert drei Tage."
        : "Adyen ist für Händler mit sehr hohem Volumen gebaut. Bei 600 Bestellungen zahlt ihr vor allem die Einrichtung und bekommt wenig dafür.",
  then: "Aven übergibt die Aufgabe an Claude Code und prüft den Pull Request.",
  decidedTitle: (o) => `${o.label} als Zahlungsmethode wählen`,
  steps: (o) => [
    { t: "An Claude Code weitergegeben", s: "Aven hat den Brief mit Kontext und Akzeptanzkriterien übergeben." },
    { t: "Pull Request #402 geöffnet", s: `${o.label}-Checkout, +142 −18, Tests grün` },
    { t: "Gemerged und live in der Vorschau", s: "Aven prüft den Beleg und schreibt das Update für Nordlicht." },
  ],
};

const API: Dec = {
  id: "api",
  seed: "api",
  tag: "Atlas Kundenportal",
  deadline: "Deadline 16. Oktober",
  title: "Zugang zur Kunden-API",
  sub: "Der Login-Meilenstein hängt seit drei Tagen am fehlenden Zugang.",
  rowText: "Atlas Kundenportal: Der Login-Meilenstein hängt seit drei Tagen am fehlenden Zugang.",
  when: "34 Min.",
  opts: [
    { id: "mail", label: "Zugang per Mail anfragen", note: "Aven entwirft die Mail, du sendest sie an den Kunden.", rec: true },
    { id: "sandbox", label: "Mit Sandbox-Zugang weiterbauen", note: "Der Login-Meilenstein läuft weiter, die echte Anbindung folgt später." },
    { id: "shift", label: "Meilenstein verschieben", note: "Launch eine Woche später, das Risiko sinkt um 42 %." },
  ],
  why: (o) =>
    o.id === "mail"
      ? "Der Zugang fehlt seit drei Tagen und blockiert drei Aufgaben. Eine klare Mail mit Frist ist der schnellste Weg, der Plan bleibt unverändert."
      : o.id === "sandbox"
        ? "Mit Sandbox-Daten kann das Team weiterarbeiten, muss die Anbindung aber später nachziehen. Das Risiko bleibt bestehen."
        : "Ein späterer Launch nimmt den Druck, verschiebt aber auch das Update an den Kunden um eine Woche.",
  then: "Aven legt die Aufgabe an und informiert den Kunden in ruhiger Sprache.",
  decidedTitle: (o) => `Atlas: ${o.label}`,
  steps: (o) => [
    { t: "Entscheidung festgehalten", s: `${o.label}. Aven hat die Begründung im Projekt abgelegt.` },
    { t: "An das Team übergeben", s: "Die Aufgabe liegt bei Claude Code, Aven prüft den Beleg." },
    { t: "Kunde informiert", s: "Aven hat das Update in ruhiger Sprache formuliert." },
  ],
};

type Phase = "idle" | "deciding" | "decided";

function useDecision(d: Dec) {
  const rec = d.opts.find((o) => o.rec) ?? d.opts[0];
  const [sel, setSel] = useState(rec.id);
  const [why, setWhy] = useState(false);
  const [others, setOthers] = useState(false);
  const [phase, setPhase] = useState<Phase>("idle");
  const [stage, setStage] = useState(0);

  useEffect(() => {
    if (phase === "deciding") {
      const t = window.setTimeout(() => {
        setPhase("decided");
        setStage(1);
      }, 900);
      return () => window.clearTimeout(t);
    }
    if (phase === "decided" && stage < 3) {
      const t = window.setTimeout(() => setStage((s) => s + 1), 1400);
      return () => window.clearTimeout(t);
    }
  }, [phase, stage]);

  const decide = useCallback(() => setPhase((p) => (p === "idle" ? "deciding" : p)), []);
  const reset = useCallback(() => {
    setPhase("idle");
    setStage(0);
    setWhy(false);
    setOthers(false);
    setSel(rec.id);
  }, [rec.id]);

  return { d, rec, sel, setSel, why, setWhy, others, setOthers, phase, stage, decide, reset, opt: d.opts.find((o) => o.id === sel) ?? rec };
}
type DecState = ReturnType<typeof useDecision>;

function Timeline({ items, stage }: { items: { t: string; s: string }[]; stage: number }) {
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
  s,
  onClose,
  onAsk,
}: {
  s: DecState;
  onClose?: () => void;
  onAsk?: (q: string) => void;
}) {
  const { d, opt, phase, stage } = s;
  const decided = phase === "decided";
  const busy = phase === "deciding";
  const [draft, setDraft] = useState("");
  return (
    <article className="ad-card" aria-label={d.title}>
      <div
        className={`ad-card-head${onClose ? " is-click" : ""}`}
        onClick={onClose}
        role={onClose ? "button" : undefined}
        tabIndex={onClose ? 0 : undefined}
        onKeyDown={(e) => {
          if (onClose && (e.key === "Enter" || e.key === " ")) {
            e.preventDefault();
            onClose();
          }
        }}
        aria-label={onClose ? "Karte schließen" : undefined}
      >
        <Thumb seed={d.seed} lg />
        <div className="ad-card-titles">
          <div className="ad-card-meta">
            <span className="ad-tag">{d.tag}</span>
            <span className="ad-when">{decided ? "Entschieden" : d.deadline}</span>
          </div>
          <p className="ad-card-title">{decided ? d.decidedTitle(opt) : d.title}</p>
          {decided ? null : <p className="ad-card-sub">{d.sub}</p>}
        </div>
        <Ring state={decided ? "done" : busy ? "busy" : "open"} />
      </div>

      {decided ? (
        <>
          <Timeline items={d.steps(opt)} stage={stage} />
          <button type="button" className="ad-link" onClick={s.reset}>
            Noch einmal durchspielen
          </button>
        </>
      ) : (
        <>
          <div className="ad-panel">
            <div>
              <small>{opt.rec ? "Aven empfiehlt" : "Deine Wahl"}</small>
              <strong>{opt.label}</strong>
              <p>{opt.note}</p>
            </div>
            <button type="button" className={`ad-cta${busy ? " is-press" : ""}`} onClick={s.decide} disabled={busy}>
              {busy ? "Wird festgehalten …" : "Entscheidung treffen"}
            </button>
          </div>
          {s.why ? <div className="ad-why"><b>Warum {opt.label}:</b> {d.why(opt)}</div> : null}
          {s.others ? (
            <div className="ad-opts" role="radiogroup" aria-label="Optionen">
              {d.opts.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  role="radio"
                  aria-checked={o.id === s.sel}
                  className={`ad-opt${o.id === s.sel ? " is-on" : ""}`}
                  onClick={() => s.setSel(o.id)}
                >
                  <span className="ad-radio" aria-hidden />
                  <span>
                    <b>{o.label}</b>
                    {o.rec ? <em>Empfohlen</em> : null}
                    <small>{o.note}</small>
                  </span>
                </button>
              ))}
            </div>
          ) : null}
          <div className="ad-chips">
            <button type="button" className={`ad-chip${s.others ? " is-on" : ""}`} aria-expanded={s.others} onClick={() => s.setOthers(!s.others)}>
              Andere Optionen {I.caret}
            </button>
            <span className="ad-chip is-static">Zahlung</span>
            <button type="button" className={`ad-chip${s.why ? " is-on" : ""}`} aria-expanded={s.why} onClick={() => s.setWhy(!s.why)}>
              Warum {I.caret}
            </button>
          </div>
          <p className="ad-then">
            Dann passiert: <b>{d.then}</b>
          </p>
        </>
      )}

      {onAsk ? (
        <form
          className="ad-ask"
          onSubmit={(e) => {
            e.preventDefault();
            const q = draft.trim();
            if (q) {
              onAsk(q);
              setDraft("");
            }
          }}
        >
          <input value={draft} onChange={(e) => setDraft(e.target.value)} placeholder="Frag Aven …" aria-label="Frag Aven" />
          <button type="submit" aria-label="Senden">
            {I.up}
          </button>
        </form>
      ) : null}
    </article>
  );
}

/* ───────── Aven: Fragen, Rückfragen und Vorschläge ───────── */

type Turn = { id: number; q: string; reply: Reply; thinking: boolean; acted: boolean };
type Host = { navigate: (v: NavTarget) => void; decide: (optionId: string) => void };

function AskPanel({ auto, seed, host }: { auto: boolean; seed?: { text: string; n: number } | null; host?: Host }) {
  const [turns, setTurns] = useState<Turn[]>([]);
  const [draft, setDraft] = useState("");
  const idRef = useRef(0);
  const autoIdx = useRef(0);
  const ctx = useRef<Ctx>({ lastTopic: null, lastOption: null });
  const timers = useRef<number[]>([]);
  const turnsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const list = timers.current;
    return () => list.forEach((t) => window.clearTimeout(t));
  }, []);

  // Neue Nachricht: im scrollenden Fenster nach unten (nie die ganze Seite bewegen)
  useEffect(() => {
    const box = turnsRef.current?.closest(".ad-main") as HTMLElement | null;
    if (box && box.scrollHeight > box.clientHeight) box.scrollTo({ top: box.scrollHeight, behavior: "smooth" });
  }, [turns]);

  const ask = useCallback((q: string) => {
    const reply = aven(q, ctx.current);
    if (reply.topic) ctx.current = { lastTopic: reply.topic, lastOption: reply.action?.kind === "decide" ? reply.action.optionId : ctx.current.lastOption };
    const id = ++idRef.current;
    setTurns((ts) => [...ts, { id, q, reply, thinking: true, acted: false }].slice(-4));
    timers.current.push(
      window.setTimeout(
        () => setTurns((ts) => ts.map((t) => (t.id === id ? { ...t, thinking: false } : t))),
        700 + Math.min(reply.text.length, 200) * 3,
      ),
    );
  }, []);

  const clear = useCallback(() => {
    setTurns([]);
    ctx.current = { lastTopic: null, lastOption: null };
  }, []);

  const seeded = useRef(0);
  useEffect(() => {
    if (seed && seed.n !== seeded.current) {
      seeded.current = seed.n;
      ask(seed.text);
    }
  }, [seed, ask]);

  useScript(auto, [
    [900, () => ask(STARTERS[autoIdx.current++ % STARTERS.length])],
    [6000, clear],
  ]);

  const last = turns[turns.length - 1];
  const asked = new Set(turns.map((t) => t.q.toLowerCase()));
  const chips = (last && !last.thinking ? last.reply.follow : STARTERS).filter((q) => !asked.has(q.toLowerCase())).slice(0, 3);

  const act = (t: Turn) => {
    const a = t.reply.action;
    if (!a) return;
    if (a.kind === "decide") {
      host?.decide(a.optionId);
      setTurns((ts) => ts.map((x) => (x.id === t.id ? { ...x, acted: true } : x)));
    } else {
      host?.navigate(a.view);
    }
  };

  return (
    <div className="ad-chat">
      <div className="ad-turns" ref={turnsRef} aria-live="polite">
        {turns.length === 0 ? (
          <p className="ad-empty">Frag, was wirklich läuft. Aven antwortet mit Quelle, versteht Rückfragen und öffnet Ansichten.</p>
        ) : null}
        {turns.map((t, ti) => {
          const words = t.reply.text.split(/(\s+)/);
          let w = 0;
          const fresh = ti === turns.length - 1;
          const a = t.reply.action;
          // Ansichten öffnen geht nur, wenn die Demo eine Navigation hat
          const showAction = a && (a.kind === "decide" || host);
          return (
            <div key={t.id} className="ad-turn">
              <div className="ad-me">{t.q}</div>
              <div className="ad-aven">
                <div className="ad-aven-body">
                  {t.thinking ? (
                    <span className="ad-dots" aria-label="Aven denkt nach">
                      <span />
                      <span />
                      <span />
                    </span>
                  ) : (
                    <>
                      <p>
                        {words.map((part, i) =>
                          /^\s+$/.test(part) || !fresh ? (
                            part
                          ) : (
                            <span key={i} className="ad-word" style={{ "--w": Math.min(w++, 60) } as React.CSSProperties}>
                              {part}
                            </span>
                          ),
                        )}
                      </p>
                      {t.reply.src.length ? (
                        <div className="ad-chips ad-src">
                          {t.reply.src.map((x) => (
                            <span key={x} className="ad-chip is-static">
                              {x}
                            </span>
                          ))}
                        </div>
                      ) : null}
                      {showAction && a ? (
                        a.kind === "decide" ? (
                          <div className="ad-propose ad-src">
                            <div>
                              <small>{t.acted ? "Festgehalten" : "Vorschlag"}</small>
                              <b>{a.title}</b>
                            </div>
                            {t.acted ? (
                              <span className="ad-done">
                                <Ring state="done" />
                                {host ? (
                                  <button type="button" className="ad-link" onClick={() => host.navigate("decisions")}>
                                    Ansehen
                                  </button>
                                ) : null}
                              </span>
                            ) : (
                              <button type="button" className="ad-cta" onClick={() => act(t)}>
                                Entscheidung treffen
                              </button>
                            )}
                          </div>
                        ) : (
                          <div className="ad-src">
                            <button type="button" className="ad-chip is-on" onClick={() => act(t)}>
                              {a.label} →
                            </button>
                          </div>
                        )
                      ) : null}
                    </>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="ad-dock">
      <div className="ad-suggest">
        {chips.map((q) => (
          <button key={q} type="button" className="ad-chip" onClick={() => ask(q)}>
            {q}
          </button>
        ))}
        {turns.length > 0 ? (
          <button type="button" className="ad-link" onClick={clear}>
            Neues Gespräch
          </button>
        ) : null}
      </div>
      <form
        className="ad-ask"
        onSubmit={(e) => {
          e.preventDefault();
          const q = draft.trim();
          if (q) {
            ask(q);
            setDraft("");
          }
        }}
      >
        <input value={draft} maxLength={200} onChange={(e) => setDraft(e.target.value)} placeholder="Frag Aven …" aria-label="Frag Aven" />
        <button type="submit" aria-label="Senden" disabled={!draft.trim()}>
          {I.up}
        </button>
      </form>
      </div>
    </div>
  );
}

/* ───────── Listen für Projekte, Lieferungen, Aufgaben ───────── */

const PROJECTS = [
  { id: "atlas", n: "Atlas Kundenportal", s: "Build, 68 %", h: 72, k: "1 Entscheidung wartet", seed: "api" as ArtKey, detail: "Phase Build. Offen: Zugang zur Kunden-API. Nächster Schritt: Login-Meilenstein, sobald der Zugang da ist." },
  { id: "nord", n: "Nordlicht Checkout", s: "Review, 81 %", h: 88, k: "Zahlungsanbieter offen", seed: "zahlung" as ArtKey, detail: "Phase Review. Offen: Wahl des Zahlungsanbieters. Danach geht der Checkout in die Vorschau." },
  { id: "velo", n: "Velo Preview", s: "Live, 100 %", h: 94, k: "Alles geliefert", seed: "dash" as ArtKey, detail: "Phase Live. Alle Lieferungen sind belegt und beim Kunden angekommen." },
  { id: "kontor", n: "Kontor Relaunch", s: "Discovery, 22 %", h: 54, k: "Risiko: Inhalte fehlen", seed: "farbe" as ArtKey, detail: "Phase Discovery. Risiko: Die Inhalte vom Kunden fehlen, das verschiebt den Start um etwa zwei Wochen." },
];

function ProjectsList({ auto }: { auto?: boolean }) {
  const [open, setOpen] = useState<string | null>(null);
  useScript(!!auto, [
    [1200, () => setOpen("atlas")],
    [2200, () => setOpen("nord")],
    [2200, () => setOpen("kontor")],
    [2600, () => setOpen(null)],
  ]);
  return (
    <div className="ad-list">
      {PROJECTS.map((p) => (
        <ExpandRow
          key={p.id}
          seed={p.seed}
          title={p.n}
          text={`${p.s}, ${p.k}`}
          when={`Health ${p.h}`}
          ring={p.h >= 85 ? "done" : "open"}
          open={open === p.id}
          onClick={() => setOpen(open === p.id ? null : p.id)}
          detail={
            <>
              <div className="ad-bar" aria-hidden>
                <i style={{ width: `${p.h}%` }} />
              </div>
              <p>{p.detail}</p>
            </>
          }
        />
      ))}
    </div>
  );
}

const LIEFER = [
  { id: "dash", t: "Dashboard-Modul", s: "PR #402, gemerged", w: "2 Std.", seed: "dash" as ArtKey, d: "Belegt durch Tests und Vorschau. Das Update an den Kunden ist formuliert und wartet auf Freigabe." },
  { id: "rollen", t: "Rollen und Rechte", s: "PR #398, gemerged", w: "Mo.", seed: "farbe" as ArtKey, d: "Vom Kunden abgenommen. Aven hat den Beleg ins Projekt gelegt." },
  { id: "velo", t: "Velo Preview", s: "Live seit einer Stunde", w: "1 Std.", seed: "api" as ArtKey, d: "Die Vorschau läuft, der Kunde hat den Link bekommen." },
];

function DeliveriesList() {
  const [open, setOpen] = useState<string | null>("dash");
  return (
    <div className="ad-list">
      {LIEFER.map((l) => (
        <ExpandRow
          key={l.id}
          seed={l.seed}
          title={l.t}
          text={l.s}
          when={l.w}
          ring="done"
          open={open === l.id}
          onClick={() => setOpen(open === l.id ? null : l.id)}
          detail={<p>{l.d}</p>}
        />
      ))}
    </div>
  );
}

function TasksList() {
  const [done, setDone] = useState<Record<string, boolean>>({ dash: true });
  const tasks = [
    { id: "hooks", t: "Mollie-Webhooks testen", s: "Nordlicht Checkout, Claude Code" },
    { id: "mail", t: "Zugang zur Atlas-API anfragen", s: "Atlas Kundenportal, du" },
    { id: "dash", t: "Dashboard-Modul abnehmen", s: "Atlas Kundenportal, erledigt" },
    { id: "copy", t: "Texte für Kontor sammeln", s: "Kontor Relaunch, Kunde" },
  ];
  return (
    <div className="ad-list">
      {tasks.map((x) => (
        <ExpandRow
          key={x.id}
          title={x.t}
          text={x.s}
          ring={done[x.id] ? "done" : "open"}
          onClick={() => setDone({ ...done, [x.id]: !done[x.id] })}
          onRing={() => setDone({ ...done, [x.id]: !done[x.id] })}
        />
      ))}
    </div>
  );
}

/* ───────── Zweites, überlappendes Fenster (Hero) ───────── */

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

/* ───────── Szene 1: Hero, eine kleine klickbare App ───────── */

type View = "status" | "decisions" | "projects" | "deliveries" | "tasks" | "aven";
const NAV: { v: View; label: string; key: string }[] = [
  { v: "status", label: "Status", key: "S" },
  { v: "decisions", label: "Entscheidungen", key: "E" },
  { v: "projects", label: "Projekte", key: "P" },
  { v: "deliveries", label: "Lieferungen", key: "L" },
  { v: "tasks", label: "Aufgaben", key: "A" },
];

function Rail({ view, onView, open }: { view: View; onView: (v: View) => void; open: number }) {
  return (
    <aside className="ad-rail" aria-label="Navigation">
      <div className="ad-rail-mark">
        <span className="ad-mark" />
        festag
      </div>
      {NAV.map((n) => (
        <button key={n.v} type="button" className={`ad-nav${view === n.v ? " is-active" : ""}`} onClick={() => onView(n.v)}>
          {n.label}
          {n.v === "decisions" && open > 0 ? <span className="n">{open}</span> : null}
          <span className="k">{n.key}</span>
        </button>
      ))}
      <div className="ad-rail-more">Mehr</div>
      <div className="ad-nav is-static">Aktivität</div>
      <div className="ad-nav is-static">Team</div>
      <div className="ad-recent">
        <span>Zuletzt ausgeführt</span>
        <i>Entscheidung erteilt: Farben und Schriften<small>14 Min.</small></i>
        <i>Zahlung von 2080 EUR genehmigt<small>5 Std.</small></i>
        <i>Aven-Aufgabe erteilt und angestoßen<small>3 Tage</small></i>
      </div>
      <div className="ad-rail-foot">
        <button type="button" className={`ad-nav${view === "aven" ? " is-active" : ""}`} onClick={() => onView("aven")}>
          Aven
        </button>
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

const VIEW_TITLE: Record<View, string> = {
  status: "Status",
  decisions: "Entscheidungen",
  projects: "Projekte",
  deliveries: "Lieferungen",
  tasks: "Aufgaben",
  aven: "Aven",
};

const DONE_ROWS = [
  { id: "dash", seed: "dash" as ArtKey, title: "Dashboard-Modul abgenommen", text: "Belegt durch PR #402. Das Update an den Kunden ist formuliert und wartet auf Freigabe.", when: "2 Std." },
  { id: "farbe", seed: "farbe" as ArtKey, title: "Farben und Schriften erteilt", text: "Entscheidung erteilt. Die Umsetzung ist an das Team übergeben.", when: "Gestern" },
];


/* Rechtes Panel „Aktuell“ wie in der App: Umgebung, Kontext, Konnektoren, Ausgaben, Läuft */
function useSeconds(active: boolean) {
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!active) return;
    const t = window.setInterval(() => setN((x) => x + 1), 1000);
    return () => {
      window.clearInterval(t);
      setN(0);
    };
  }, [active]);
  return n;
}

function Aside({ running, mode, onMode, known, done }: { running: boolean; mode: boolean; onMode: () => void; known: number; done: number }) {
  const sec = useSeconds(running);
  const mm = String(Math.floor(sec / 60)).padStart(2, "0");
  const ss = String(sec % 60).padStart(2, "0");
  return (
    <aside className="ad-aside" aria-label="Aktuell">
      <div className="ad-acard">
        <b>Umgebung</b>
        <p>Nordlicht Checkout</p>
        <small>Studio Nord, Entwickler-Ansicht</small>
        <button type="button" className="ad-switch" role="switch" aria-checked={mode} onClick={onMode}>
          <span>{mode ? "Aven führt Freigegebenes selbst aus" : "Aven wartet auf dein Okay"}</span>
          <i aria-hidden />
        </button>
      </div>
      <div className="ad-acard">
        <b>Läuft</b>
        {running ? (
          <p className="ad-ac-row ad-run">
            <span className="ad-pulse" aria-hidden /> Mollie-Checkout <em>{mm}:{ss}</em>
          </p>
        ) : (
          <p className="ad-muted">Nichts läuft gerade.</p>
        )}
      </div>
      <div className="ad-acard">
        <b>Kontext</b>
        <p>
          {done} von {known} geklärt
        </p>
        <div className="ad-bar" aria-hidden>
          <i style={{ width: `${(done / known) * 100}%` }} />
        </div>
      </div>
      <div className="ad-acard">
        <b>Konnektoren</b>
        <p className="ad-ac-row">
          <BrandLogo name="claude" size={14} /> Claude Code <em>verbunden</em>
        </p>
        <p className="ad-ac-row">
          <BrandLogo name="github" size={14} /> GitHub <em>verbunden</em>
        </p>
      </div>
      <div className="ad-acard">
        <b>Ausgaben</b>
        <p>Dashboard-Modul, PR #402</p>
        <p>Rollen und Rechte, PR #398</p>
      </div>
    </aside>
  );
}

export function HeroApp() {
  const { ref: demoRef, auto, onPointerDownCapture } = useDemo();
  const [view, setView] = useState<View>("status");
  const [openId, setOpenId] = useState<string | null>(null);
  const [seed, setSeed] = useState<{ text: string; n: number } | null>(null);
  const z = useDecision(ZAHLUNG);
  const a = useDecision(API);
  const decs = [z, a];
  const waiting = decs.filter((s) => s.phase !== "decided").length;

  const [autoMode, setAutoMode] = useState(false);
  const [cur, setCur] = useState<{ x: number; y: number; down: boolean; show: boolean }>({ x: 0, y: 0, down: false, show: false });

  /** Mauszeiger zu einem Element fahren (Mitte, leicht nach unten rechts) */
  const aim = useCallback((find: () => Element | null | undefined) => {
    const el = find();
    const w = demoRef.current;
    if (!el || !w) return;
    const a = el.getBoundingClientRect();
    const b = w.getBoundingClientRect();
    setCur({ x: a.left - b.left + Math.min(a.width * 0.5, 120), y: a.top - b.top + a.height * 0.55, down: false, show: true });
  }, [demoRef]);
  const press = useCallback(() => {
    setCur((c) => ({ ...c, down: true }));
    window.setTimeout(() => setCur((c) => ({ ...c, down: false })), 180);
  }, []);
  const q = (sel: string, text?: RegExp) => () => {
    const all = Array.from(demoRef.current?.querySelectorAll(sel) ?? []);
    return text ? all.find((e) => text.test(e.textContent ?? "")) : all[0];
  };

  useScript(auto, [
    [1300, () => aim(q(".ad-row.is-click"))],
    [1500, () => press()],
    [150, () => setOpenId("zahlung")],
    [1100, () => aim(q(".ad-chip", /^Warum/))],
    [1300, () => press()],
    [150, () => z.setWhy(true)],
    [1500, () => aim(q(".ad-cta"))],
    [1300, () => press()],
    [150, () => z.decide()],
    [1200, () => setCur((c) => ({ ...c, show: false }))],
    [5200, () => {
      z.reset();
      setOpenId(null);
    }],
  ]);

  const go = (v: View) => {
    setView(v);
    if (v !== "status" && v !== "decisions") setOpenId(null);
  };
  const ask = (text: string) => {
    setSeed({ text, n: (seed?.n ?? 0) + 1 });
    setView("aven");
  };

  const renderDecisions = (only: boolean) => (
    <div className="ad-list">
      {decs.map((s) => {
        const open = openId === s.d.id;
        return open ? (
          <DecisionCard key={s.d.id} s={s} onClose={() => setOpenId(null)} onAsk={ask} />
        ) : (
          <ExpandRow
            key={s.d.id}
            seed={s.d.seed}
            title={s.phase === "decided" ? s.d.decidedTitle(s.opt) : s.d.title}
            text={s.d.rowText}
            when={s.phase === "decided" ? "Erledigt" : s.d.when}
            ring={s.phase === "decided" ? "done" : "open"}
            dim={openId !== null}
            onClick={() => setOpenId(s.d.id)}
          />
        );
      })}
      {only
        ? null
        : DONE_ROWS.map((r) => (
            <ExpandRow key={r.id} seed={r.seed} title={r.title} text={r.text} when={r.when} ring="done" dim={openId !== null} />
          ))}
    </div>
  );

  const host: Host = {
    navigate: (v) => go(v),
    decide: (optionId) => {
      z.setSel(optionId);
      z.decide();
      setOpenId("zahlung");
      setView("status");
    },
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.metaKey || e.ctrlKey || e.altKey) return;
    const el = e.target as HTMLElement;
    if (el.closest("input, textarea")) return;
    const n = NAV.find((x) => x.key.toLowerCase() === e.key.toLowerCase());
    if (n) go(n.v);
  };

  const peekStep = z.phase === "idle" ? (openId === "zahlung" ? 1 : 0) : z.phase === "deciding" ? 2 : z.stage === 1 ? 3 : 4;

  return (
    <div
      ref={demoRef}
      className="ad-hero-wrap"
      onPointerDownCapture={onPointerDownCapture}
      onKeyDown={onKeyDown}
    >
      <Frame
        height={640}
        fixed
        rail={<Rail view={view} onView={go} open={waiting} />}
        aside={
          <Aside
            running={z.phase === "decided" && z.stage < 3}
            mode={autoMode}
            onMode={() => setAutoMode((m) => !m)}
            known={9}
            done={5 + decs.filter((s) => s.phase === "decided").length}
          />
        }
      >
        <div className="ad-tabs" role="tablist" aria-label="Ansicht">
          {[...NAV.map((n) => ({ v: n.v, label: n.label })), { v: "aven" as View, label: "Aven" }].map((n) => (
            <button key={n.v} type="button" role="tab" aria-selected={view === n.v} className={view === n.v ? "is-on" : ""} onClick={() => go(n.v)}>
              {n.label}
            </button>
          ))}
        </div>
        <div className="ad-h">
          <b>{VIEW_TITLE[view]}</b>
          <span>
            {view === "status" || view === "decisions"
              ? `${waiting} ${waiting === 1 ? "Entscheidung wartet" : "Entscheidungen warten"} auf dich`
              : view === "aven"
                ? "Antworten mit Quelle"
                : "Tippe auf eine Zeile"}
          </span>
        </div>
        {view === "status" ? renderDecisions(false) : null}
        {view === "decisions" ? renderDecisions(true) : null}
        {view === "projects" ? <ProjectsList /> : null}
        {view === "deliveries" ? <DeliveriesList /> : null}
        {view === "tasks" ? <TasksList /> : null}
        {view === "aven" ? <AskPanel auto={false} seed={seed} host={host} /> : null}
      </Frame>
      {(view === "status" || view === "decisions") && peekStep > 0 ? <Peek step={peekStep} /> : null}
      {cur.show && auto ? (
        <span className={`ad-cursor${cur.down ? " is-down" : ""}`} style={{ transform: `translate(${cur.x}px, ${cur.y}px)` }} aria-hidden>
          <svg viewBox="0 0 20 24" width="20" height="24">
            <path d="M3 2v17l4.5-4.2 3 6.4 2.7-1.2-3-6.3H17z" fill="#15130f" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
          </svg>
        </span>
      ) : null}
    </div>
  );
}

/* ───────── Szene 2: Status-Feed lebt ───────── */

const FEED_ROWS = [
  { id: "api", seed: "api" as ArtKey, title: "Zugang zur Kunden-API", text: "Atlas Kundenportal: Der Login-Meilenstein hängt seit drei Tagen am fehlenden Zugang.", when: "34 Min.", detail: "Linear ATL-81, Slack #atlas, drei Threads. Aven hat den Zusammenhang belegt." },
  { id: "dash", seed: "dash" as ArtKey, title: "Dashboard-Modul abgenommen", text: "Belegt durch PR #402. Das Update an den Kunden ist formuliert und wartet auf Freigabe.", when: "2 Std.", detail: "Tests grün, Vorschau abgenommen. Das Update liegt als Entwurf bereit." },
  { id: "farbe", seed: "farbe" as ArtKey, title: "Farben und Schriften erteilt", text: "Entscheidung erteilt. Die Umsetzung ist an das Team übergeben.", when: "Gestern", detail: "Entschieden von Sara Nord, umgesetzt in PR #391." },
];

export function FeedScene() {
  const { ref, auto, onPointerDownCapture } = useDemo();
  const [fresh, setFresh] = useState(false);
  const [done, setDone] = useState<Record<string, boolean>>({ dash: true, farbe: true });
  const [open, setOpen] = useState<string | null>(null);

  useScript(auto, [
    [1400, () => setFresh(true)],
    [1800, () => setDone((d) => ({ ...d, api: true }))],
    [2800, () => {
      setFresh(false);
      setDone({ dash: true, farbe: true });
    }],
  ]);

  return (
    <div ref={ref} onPointerDownCapture={onPointerDownCapture}>
      <Frame height={500}>
        <div className="ad-h">
          <b>Status</b>
          <button type="button" className="ad-link" onClick={() => setFresh(!fresh)}>
            {fresh ? "Signal zurücknehmen" : "Neues Signal auslösen"}
          </button>
        </div>
        <div className="ad-list">
          {fresh ? (
            <ExpandRow
              key="fresh"
              isNew
              seed="zahlung"
              title="Risiko erkannt: API-Zugang fehlt"
              text="Aven hat den Zusammenhang belegt und eine Entscheidung vorbereitet."
              when="jetzt"
              ring="open"
              open={open === "fresh"}
              onClick={() => setOpen(open === "fresh" ? null : "fresh")}
              detail={<p>Drei Aufgaben hängen am fehlenden Zugang. Empfehlung: Zugang per Mail anfragen, Frist in zwei Tagen.</p>}
            />
          ) : null}
          {FEED_ROWS.map((r) => (
            <ExpandRow
              key={r.id}
              seed={r.seed}
              title={r.title}
              text={r.text}
              when={done[r.id] && r.id === "api" ? "jetzt" : r.when}
              ring={done[r.id] ? "done" : "open"}
              onRing={() => setDone({ ...done, [r.id]: !done[r.id] })}
              open={open === r.id}
              onClick={() => setOpen(open === r.id ? null : r.id)}
              detail={<p>{r.detail}</p>}
            />
          ))}
        </div>
      </Frame>
    </div>
  );
}

/* ───────── Szene 3: Entscheidung treffen ───────── */

export function DecisionScene() {
  const { ref, auto, onPointerDownCapture } = useDemo();
  const z = useDecision(ZAHLUNG);
  useScript(auto, [
    [1400, () => z.setWhy(true)],
    [2400, () => z.decide()],
    [7000, () => z.reset()],
  ]);
  return (
    <div ref={ref} onPointerDownCapture={onPointerDownCapture}>
      <Frame height={600} title="Entscheidungen">
        <DecisionCard s={z} />
      </Frame>
    </div>
  );
}

/* ───────── Szene 4: Aven fragen ───────── */

export function AskScene() {
  const { ref, auto, onPointerDownCapture } = useDemo();
  return (
    <div ref={ref} onPointerDownCapture={onPointerDownCapture}>
      <Frame height={500} title="Aven">
        <AskPanel auto={auto} />
      </Frame>
    </div>
  );
}

/* ───────── Szene 5: Übergabe an den Coding-Agent ───────── */

const AGENTS = [
  { id: "claude", label: "Claude Code", logo: "claude" },
  { id: "cursor", label: "Cursor", logo: "cursor" },
];

export function HandoffScene() {
  const { ref, auto, onPointerDownCapture } = useDemo();
  const [agent, setAgent] = useState("claude");
  const [stage, setStage] = useState(0);
  const name = AGENTS.find((x) => x.id === agent)?.label ?? "Claude Code";

  useEffect(() => {
    if (stage > 0 && stage < 3) {
      const t = window.setTimeout(() => setStage((s) => s + 1), 1500);
      return () => window.clearTimeout(t);
    }
  }, [stage]);

  useScript(auto, [
    [1400, () => setStage((s) => (s === 0 ? 1 : s))],
    [7200, () => setStage(0)],
  ]);

  const items = [
    { t: `An ${name} weitergegeben`, s: "Aven hat den Brief mit Kontext und Akzeptanzkriterien übergeben." },
    { t: "Pull Request #402 geöffnet", s: "Mollie-Checkout, +142 −18, Tests grün" },
    { t: "Gemerged und live in der Vorschau", s: "Aven prüft den Beleg und schreibt das Update für Nordlicht." },
  ];

  return (
    <div ref={ref} onPointerDownCapture={onPointerDownCapture}>
      <Frame height={540} title="Lieferungen">
        <div className="ad-h">
          <b>Mollie als Zahlungsmethode wählen</b>
        </div>
        <div className="ad-chips" role="radiogroup" aria-label="Coding-Agent" style={{ marginBottom: 16 }}>
          {AGENTS.map((x) => (
            <button
              key={x.id}
              type="button"
              role="radio"
              aria-checked={agent === x.id}
              className={`ad-chip${agent === x.id ? " is-on" : ""}`}
              onClick={() => {
                setAgent(x.id);
                setStage(0);
              }}
            >
              <BrandLogo name={x.logo} size={13} />
              {x.label}
            </button>
          ))}
        </div>
        <div className="ad-list" style={{ gap: 16 }}>
          <div className="ad-brief">
            <b>Brief von Aven</b>
            Mollie-Checkout für Nordlicht einbauen: SEPA und Klarna, Webhooks, Testmodus. Akzeptiert, wenn alle Zahlungswege im
            Staging grün sind.
          </div>
          {stage === 0 ? (
            <div>
              <button type="button" className="ad-cta" onClick={() => setStage(1)}>
                Brief an {name} senden
              </button>
            </div>
          ) : (
            <>
              <Timeline items={items} stage={stage} />
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
              {stage >= 3 ? (
                <button type="button" className="ad-link" onClick={() => setStage(0)}>
                  Noch einmal durchspielen
                </button>
              ) : null}
            </>
          )}
        </div>
      </Frame>
    </div>
  );
}

/* ───────── Szene 6: Portfolio ───────── */

export function PortfolioScene() {
  const { ref, auto, onPointerDownCapture } = useDemo();
  return (
    <div ref={ref} onPointerDownCapture={onPointerDownCapture}>
      <Frame height={500} title="Projekte">
        <div className="ad-h">
          <b>Projekte</b>
          <span>4 aktiv, Health im Schnitt 77</span>
        </div>
        <ProjectsList auto={auto} />
      </Frame>
    </div>
  );
}

/* ───────── Szene 7: Gelerntes ───────── */

const LEARNED = [
  { t: "Gelernt aus „Mollie gewählt“", s: "Ihr entscheidet bei Zahlungen nach Gebühren, nicht nach Markenbekanntheit." },
  { t: "Gelernt aus 3 Lieferungen", s: "„Fertig“ heißt bei euch: Tests grün und Vorschau abgenommen." },
  { t: "Regel vorgeschlagen", s: "Entscheidungen unter 500 € bereitet Aven direkt zur Freigabe vor." },
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

/* ───────── Szene 8: Connectors ───────── */

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
