"use client";

import "./desk.css";
import { useEffect, useState } from "react";
import { BrandLogo } from "../ui/BrandLogo";
import { Frame, I, useDemo, useScript } from "./demo-kit";

/* Inhalt aus festag.app/orchestration. Die doppelte Satzwiederholung der
   Live-Karten ist hier zu einem Satz geglättet. */

const PROJECT = "AVS";
const DELIVERY = "Startseite fertiggestellt";
const WHY =
  "Die neue Startseite wurde umgesetzt und ist bereit zur Ansicht. Die Abnahme steht aus.";

const OPEN = [
  "API-Schlüssel an den Kunden senden",
  "Login: Magic-Link-Mail übersetzen",
  "Designänderung",
  "Koalition",
  "Startseite fertiggestellt",
  "Rechnungsexport als PDF",
];

const IMPORTANT = ["Designänderung", "Startseite fertiggestellt"];
const DONE = ["Login überarbeitet", "Farbschema bestätigt", "Footer-Links bereinigt"];

const CARDS = [
  { id: "design", title: "Designänderung — Entscheidung", project: "MUC CARGO", time: "Heute, 14:32" },
  { id: "coal", title: "Koalition — Entscheidung", project: "AVS", time: "Heute, 14:32" },
  { id: "key", title: "API-Schlüssel an den Kunden senden", project: "MUC CARGO", time: "Heute, 14:32" },
  { id: "mail", title: "Login: Magic-Link-Mail übersetzen", project: "AVS", time: "Heute, 14:32" },
  { id: "home", title: "Startseite fertiggestellt abnehmen", project: "AVS", time: "Heute, 14:32" },
  { id: "pdf", title: "Rechnungsexport als PDF abnehmen", project: "Menke", time: "Heute, 14:32" },
] as const;

const STEPS = [
  { t: "Entworfen", when: "1. Nov." },
  { t: "Freigegeben", when: "" },
  { t: "Beim Client", when: "jetzt" },
  { t: "Abgenommen", when: "" },
] as const;

const PROMPTS = [
  "Was wartet auf meine Entscheidung?",
  "Wie ist der Stand meines Projekts?",
  "Wann wird es fertig?",
  "Was wurde zuletzt geliefert?",
];

const ANSWERS = [
  "Eine Lieferung wartet auf dich. „Startseite fertiggestellt“ von AVS ist bereit zur Ansicht, die Abnahme fehlt noch.",
  "AVS hat eine offene Lieferung und zwei Entscheidungen. MUC CARGO wartet auf den API-Schlüssel.",
  "Die Startseite von AVS ist umgesetzt. Fertig ist sie, wenn du sie abnimmst.",
  "Zuletzt erledigt: Login überarbeitet, heute früh. Farbschema bestätigt.",
];

const SOURCES = [
  "AVS · Startseite fertiggestellt · Heute, 14:32",
  "AVS · MUC CARGO · Heute, 14:32",
  "AVS · Startseite fertiggestellt · Heute, 14:32",
  "Login überarbeitet · Heute früh",
];

const STAND = [
  { name: "AVS", rows: [6, 7, 5, 4, 3] },
  { name: "MUC CARGO", rows: [4, 5, 3, 6, 2] },
  { name: "Menke", rows: [3, 2, 4, 3, 1] },
];
const STAND_ROWS = ["Entscheidungen", "Lieferungen", "Freigaben", "Aufgaben", "Risiken"];

function Mark() {
  return (
    <span className="dk-mark" aria-hidden>
      <svg viewBox="0 0 16 16" width="14" height="14">
        <path fill="currentColor" d="M3 2.2h10a1 1 0 0 1 1 1v9.6a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V3.2a1 1 0 0 1 1-1Zm1.4 2.2v1.2h7.2V4.4H4.4Zm0 2.6v1.2h5.2V7H4.4Zm0 2.6v1.2h6.2V9.6H4.4Z" />
      </svg>
    </span>
  );
}

function Dots({ n, on }: { n: number; on: number }) {
  return (
    <span className="dk-meter" aria-hidden>
      {Array.from({ length: n }, (_, i) => (
        <i key={i} className={i < on ? "is-on" : ""} />
      ))}
    </span>
  );
}

function Lens({ lens, onLens }: { lens: "dev" | "client"; onLens: (l: "dev" | "client") => void }) {
  return (
    <div className="dk-role">
      <button type="button" className={lens === "dev" ? "is-on" : ""} aria-pressed={lens === "dev"} onClick={() => onLens("dev")}>
        Developer
      </button>
      <span aria-hidden>/</span>
      <button type="button" className={lens === "client" ? "is-on" : ""} aria-pressed={lens === "client"} onClick={() => onLens("client")}>
        Client
      </button>
    </div>
  );
}

const DIFF = [
  { cls: "file", t: "avs/app/page.tsx" },
  { cls: "del", t: "− return <Hero />" },
  { cls: "add", t: "+ return <Delivery />" },
  { cls: "add", t: "+ Abnahme liegt beim Client" },
];

function CodeBlock({ shown }: { shown?: number }) {
  const body = (shown == null ? DIFF : DIFF.slice(0, shown)).filter((line) => line.cls !== "file");
  return (
    <div className="dk-file" aria-label="Änderung">
      <div className="dk-file-h">
        <span>avs/app/page.tsx</span>
        <em>{body.length > 0 ? "geändert" : "öffnet"}</em>
      </div>
      <pre className="dk-diff">
        {body.map((line, i) => (
          <span key={line.t} className={line.cls}>
            <i>{i + 1}</i>
            {line.t}
          </span>
        ))}
      </pre>
    </div>
  );
}

function ClientNote() {
  return (
    <div className="dk-note">
      <b>Für den Client</b>
      <p>{WHY}</p>
      <span>AVS · Heute, 14:32 · Abnahme offen</span>
    </div>
  );
}

function Stepper({ step, why, lens = "dev" }: { step: number; why: boolean; lens?: "dev" | "client" }) {
  const steps = lens === "client"
    ? ([{ t: "Entworfen", when: "1. Nov." }, { t: "Freigegeben", when: "" }, { t: "Bei dir", when: "jetzt" }, { t: "Abgenommen", when: "" }] as const)
    : STEPS;
  return (
    <div className="dk-delivery">
      <p className="dk-kicker">{lens === "client" ? "Für dich" : "Lieferung"}</p>
      <h3 className="dk-dtitle">{lens === "client" ? DELIVERY : `Lieferung: ${DELIVERY}`}</h3>
      <p className="dk-scope">{lens === "client" ? "AVS, bereit zur Ansicht" : PROJECT}</p>
      <ol className="dk-steps">
        {steps.map((s, i) => {
          const done = i < step;
          const now = i === step;
          return (
            <li key={s.t} className={done ? "is-done" : now ? "is-now" : ""}>
              <span className="dk-node" aria-hidden>
                {done ? I.check : null}
              </span>
              <span className="dk-step-t">{s.t}</span>
              <span className="dk-step-w">{now ? "jetzt" : done ? s.when : ""}</span>
            </li>
          );
        })}
      </ol>
      <div className={`dk-why${why ? " is-in" : ""}`}>
        <b>{lens === "client" ? "Stand" : "Beleg"}</b>
        <p>{WHY}</p>
      </div>
    </div>
  );
}

function Cards({ onOpen, hotId }: { onOpen: () => void; hotId: string | null }) {
  return (
    <div className="dk-cards">
      {CARDS.map((c) => (
        <button key={c.id} type="button" data-card={c.id} className={`dk-card${hotId === c.id ? " is-hot" : ""}`} onClick={onOpen}>
          <p>{c.title}</p>
          <span className="dk-proj">
            <i /> {c.project}
          </span>
          <span className="dk-card-foot">
            <span>{c.time}</span>
            <em>Wartet auf dich</em>
          </span>
        </button>
      ))}
    </div>
  );
}

function Plan({ onOpen, active }: { onOpen: () => void; active: boolean }) {
  return (
    <aside className="dk-pane" aria-label="Plan">
      <div className="dk-pane-h">
        <b>Plan</b>
        <span>Alle Projekte</span>
      </div>
      <div className="dk-plan-name">
        <span>{PROJECT}</span>
        <em>3 von 4</em>
      </div>
      <span className="dk-bar" aria-hidden>
        <i style={{ width: "75%" }} />
      </span>
      <button type="button" className={`dk-plan-row${active ? " is-on" : ""}`} onClick={onOpen}>
        <span className="dk-node is-open" aria-hidden />
        <span>Startseite fertiggestellt</span>
        <em>wartet</em>
      </button>
      <p className="dk-done-n">3 erledigt</p>
    </aside>
  );
}

function Prompts({ picked, onPick }: { picked: number | null; onPick: (i: number) => void }) {
  return (
    <div className="dk-ask">
      <div className="dk-ask-mark">
        <Mark />
        <b>Was soll passieren?</b>
      </div>
      <div className="dk-prompts">
        {PROMPTS.map((q, i) => (
          <button key={q} type="button" className={picked === i ? "is-on" : ""} onClick={() => onPick(i)}>
            {q}
            {i === 0 ? <span aria-hidden>↗</span> : null}
          </button>
        ))}
      </div>
      {picked !== null ? (
        <div className="dk-record">
          <p>{ANSWERS[picked]}</p>
          <span>{SOURCES[picked]}</span>
        </div>
      ) : null}
    </div>
  );
}

function StandList({ fill }: { fill: number }) {
  return (
    <div className="dk-stand">
      {STAND.map((p) => (
        <article key={p.name} className="dk-stand-card">
          <h3>{p.name}</h3>
          <ul>
            {STAND_ROWS.map((label, i) => (
              <li key={label}>
                <span>{label}</span>
                <Dots n={8} on={Math.min(8, Math.round((p.rows[i] * fill) / 8))} />
              </li>
            ))}
          </ul>
        </article>
      ))}
    </div>
  );
}

function Side({ mode, onMode }: { mode: "steer" | "aven"; onMode: (m: "steer" | "aven") => void }) {
  return (
    <aside className="dk-side">
      <div className="dk-search">Suchen oder Aven fragen</div>
      <button type="button" className="dk-nav">
        Neuer Chat <kbd>N</kbd>
      </button>
      <button type="button" className={`dk-nav${mode === "steer" ? " is-on" : ""}`} onClick={() => onMode("steer")}>
        Orchestration
      </button>
      <button type="button" className="dk-nav">
        Freigaben
      </button>
      <p className="dk-sec">
        Offen <em>9</em>
      </p>
      <ul className="dk-open">
        {OPEN.map((t) => (
          <li key={t}>
            <span className="dk-node is-open" aria-hidden />
            {t}
          </li>
        ))}
      </ul>
      <p className="dk-sec">Wichtig</p>
      <ul className="dk-open">
        {IMPORTANT.map((t) => (
          <li key={t}>
            <span className="dk-node is-open" aria-hidden />
            {t}
          </li>
        ))}
      </ul>
      <p className="dk-sec">
        Erledigt <em>3</em>
      </p>
      <ul className="dk-open">
        {DONE.map((t) => (
          <li key={t}>
            <span className="dk-node" aria-hidden />
            {t}
          </li>
        ))}
      </ul>
    </aside>
  );
}

function Top({
  tab,
  onTab,
}: {
  tab: "aktuell" | "plan" | "stand";
  onTab: (t: "aktuell" | "plan" | "stand") => void;
}) {
  return (
    <div className="dk-top">
      <div className="dk-ws">
        <Mark />
        <span>dirnbergerst…</span>
        <em className="dk-pro">Pro</em>
      </div>
      <div className="dk-mid">Alle Projekte</div>
      <div className="dk-tabs" role="tablist" aria-label="Ansicht">
        {(
          [
            ["aktuell", "Aktuell"],
            ["plan", "Plan"],
            ["stand", "Stand"],
          ] as const
        ).map(([id, label]) => (
          <button key={id} type="button" role="tab" aria-selected={tab === id} className={tab === id ? "is-on" : ""} onClick={() => onTab(id)}>
            {label}
          </button>
        ))}
      </div>
    </div>
  );
}

export function HeroApp() {
  const { ref, auto, reduced, onPointerDownCapture } = useDemo();
  const [mode, setMode] = useState<"steer" | "aven">("steer");
  const [tab, setTab] = useState<"aktuell" | "plan" | "stand">("plan");
  const [open, setOpen] = useState(false);
  const [why, setWhy] = useState(false);
  const [hot, setHot] = useState<string | null>(null);
  const [step, setStep] = useState(0);
  const [lens, setLens] = useState<"dev" | "client">("dev");
  const [cur, setCur] = useState({ x: 86, y: 168, show: false, down: false });

  useEffect(() => {
    if (!reduced) return;
    setOpen(true);
    setWhy(true);
    setHot("home");
    setStep(2);
  }, [reduced]);

  const place = (sel: string) => {
    const root = ref.current?.querySelector(".dk");
    const el = ref.current?.querySelector(sel);
    if (!root || !el) return;
    const a = el.getBoundingClientRect();
    const b = root.getBoundingClientRect();
    setCur({
      x: a.left - b.left + Math.min(a.width * 0.42, 180),
      y: a.top - b.top + a.height * 0.45,
      show: true,
      down: false,
    });
  };

  useScript(auto, [
    [700, () => {
      setMode("steer");
      setLens("dev");
      setTab("plan");
      setOpen(false);
      setWhy(false);
      setHot("design");
      setStep(0);
      place('[data-card="design"]');
    }],
    [900, () => {
      setHot("home");
      place('[data-card="home"]');
    }],
    [500, () => setCur((c) => ({ ...c, down: true }))],
    [220, () => {
      setCur((c) => ({ ...c, down: false }));
      setOpen(true);
      setTab("aktuell");
      setStep(1);
      setWhy(false);
    }],
    [800, () => {
      setStep(2);
      setWhy(true);
      place(".dk-diff");
    }],
    [1600, () => {
      setLens("client");
      setCur((c) => ({ ...c, show: false }));
    }],
    [1800, () => {
      setLens("dev");
      setOpen(false);
      setWhy(false);
      setHot(null);
      setStep(0);
      setTab("plan");
    }],
  ]);

  const showDelivery = open || tab === "aktuell";

  return (
    <div ref={ref} className="ad-hero-wrap" onPointerDownCapture={onPointerDownCapture}>
      <Lens
        lens={lens}
        onLens={(l) => {
          setLens(l);
          if (l === "client") {
            setOpen(true);
            setWhy(true);
            setStep(2);
          }
        }}
      />
      <Frame height={620} fixed title="Festag">
        <div className="dk">
          <Top
            tab={tab}
            onTab={(t) => {
              setTab(t);
              if (t === "aktuell") setOpen(true);
              if (t === "plan") setMode("steer");
            }}
          />
          <div className="dk-body">
            <Side
              mode={mode}
              onMode={(m) => {
                setMode(m);
                if (m === "aven") {
                  setOpen(false);
                  setTab("plan");
                }
              }}
            />
            <div className={`dk-center${tab === "stand" ? " is-wide" : ""}`}>
              {tab === "stand" ? (
                <StandList fill={8} />
              ) : lens === "client" ? (
                <>
                  <Stepper step={2} why lens="client" />
                  <p className="dk-scope">Dieselbe Lieferung. Ohne die interne Warteschlange.</p>
                </>
              ) : mode === "aven" && !showDelivery ? (
                <Prompts picked={null} onPick={() => setMode("aven")} />
              ) : showDelivery ? (
                <>
                  <Stepper step={step} why={why || reduced} lens="dev" />
                  <CodeBlock />
                </>
              ) : (
                <>
                  <div className="dk-head">
                    <h3>Orchestration</h3>
                    <div className="dk-seg" role="tablist" aria-label="Modus">
                      <button type="button" className={mode === "steer" ? "is-on" : ""} onClick={() => setMode("steer")}>
                        Steuern
                      </button>
                      <button type="button" className="ghost" onClick={() => setMode("aven")}>
                        Aven
                      </button>
                    </div>
                  </div>
                  <Cards
                    hotId={hot}
                    onOpen={() => {
                      setOpen(true);
                      setWhy(true);
                      setStep(2);
                      setTab("aktuell");
                    }}
                  />
                </>
              )}
            </div>
            {tab === "stand" || lens === "client" ? null : <Plan active={showDelivery} onOpen={() => { setOpen(true); setWhy(true); setTab("aktuell"); }} />}
          </div>
          <form className="dk-compose" onSubmit={(e) => e.preventDefault()}>
            <span className="dk-plus" aria-hidden>+</span>
            <input aria-label="Frag Aven oder gib eine Aufgabe" placeholder="Frag Aven oder gib eine Aufgabe…" />
            <span className="dk-compose-meta">Aven aus · Claude Code · Alle Projekte</span>
          </form>
          {cur.show && auto ? (
            <span className={`ad-cursor${cur.down ? " is-down" : ""}`} style={{ transform: `translate(${cur.x}px, ${cur.y}px)` }} aria-hidden>
              <svg viewBox="0 0 20 24" width="18" height="22">
                <path d="M3 2v17l4.5-4.2 3 6.4 2.7-1.2-3-6.3H17z" fill="#15130f" stroke="#fff" strokeWidth="1.4" strokeLinejoin="round" />
              </svg>
            </span>
          ) : null}
        </div>
      </Frame>
    </div>
  );
}

export function FeedScene() {
  const { ref, auto, reduced, onPointerDownCapture } = useDemo();
  const [step, setStep] = useState(2);
  const [why, setWhy] = useState(true);
  const [lens, setLens] = useState<"dev" | "client">("dev");
  const [lines, setLines] = useState(4);
  useEffect(() => {
    if (reduced) {
      setStep(2);
      setWhy(true);
      setLens("dev");
      setLines(4);
    }
  }, [reduced]);
  useScript(auto, [
    [700, () => { setLens("dev"); setStep(0); setWhy(false); setLines(1); }],
    [900, () => { setStep(1); setLines(2); }],
    [900, () => { setStep(2); setLines(3); }],
    [800, () => { setWhy(true); setLines(4); }],
    [1700, () => setLens("client")],
    [1900, () => { setLens("dev"); setStep(2); setWhy(true); setLines(4); }],
  ]);
  return (
    <div ref={ref} onPointerDownCapture={onPointerDownCapture}>
      <Lens lens={lens} onLens={setLens} />
      <Frame height={560} title="Lieferung">
        <div className="dk dk-slice">
          <div className="dk-stage">
            <Stepper step={step} why={lens === "dev" && why} lens={lens} />
            {lens === "dev" ? <CodeBlock shown={lines} /> : <ClientNote />}
          </div>
        </div>
      </Frame>
    </div>
  );
}

const CHOICES = ["Hell als Standard", "Dunkel als Standard"];
const PROOF = [
  "Hell wird der Standard. Die Lieferung geht erst raus, wenn jemand sie freigibt.",
  "Dunkel wird der Standard. Die Lieferung geht erst raus, wenn jemand sie freigibt.",
];

export function DecisionScene() {
  const { ref, auto, reduced, onPointerDownCapture } = useDemo();
  const [open, setOpen] = useState(false);
  const [pick, setPick] = useState<number | null>(null);
  useEffect(() => {
    if (reduced) {
      setOpen(true);
      setPick(0);
    }
  }, [reduced]);
  useScript(auto, [
    [800, () => { setOpen(false); setPick(null); }],
    [1400, () => setOpen(true)],
    [1200, () => setPick(0)],
    [2200, () => { setOpen(false); setPick(null); }],
  ]);
  return (
    <div ref={ref} onPointerDownCapture={onPointerDownCapture}>
      <Frame height={540} title="Orchestration">
        <div className="dk dk-slice">
          {open ? (
            <div className="dk-delivery">
              <p className="dk-kicker">Entscheidung · MUC CARGO</p>
              <h3 className="dk-dtitle">Neue Startseite: hell oder dunkel?</h3>
              <p className="dk-scope">Aven hat sie vorbereitet. Du gibst sie frei.</p>
              <div className="dk-choice">
                {CHOICES.map((choice, i) => (
                  <button key={choice} type="button" className={pick === i ? "is-on" : ""} onClick={() => { setOpen(true); setPick(i); }}>
                    <span className="dk-node" aria-hidden />
                    <span>{choice}</span>
                    {pick === i ? <em>gewählt</em> : null}
                  </button>
                ))}
              </div>
              <div className={`dk-why${pick !== null ? " is-in" : ""}`}>
                <b>Beleg</b>
                <p>{pick !== null ? PROOF[pick] : ""}</p>
              </div>
            </div>
          ) : (
            <>
              <div className="dk-head">
                <h3>Orchestration</h3>
                <span className="dk-card-foot">
                  <em>Wartet auf dich</em>
                </span>
              </div>
              <Cards hotId="design" onOpen={() => setOpen(true)} />
            </>
          )}
        </div>
      </Frame>
    </div>
  );
}

export function AskScene() {
  const { ref, auto, reduced, onPointerDownCapture } = useDemo();
  const [picked, setPicked] = useState<number | null>(null);
  const [shown, setShown] = useState(4);
  useEffect(() => {
    if (reduced) {
      setShown(4);
      setPicked(0);
    }
  }, [reduced]);
  useScript(auto, [
    [400, () => { setShown(1); setPicked(null); }],
    [500, () => setShown(2)],
    [500, () => setShown(3)],
    [500, () => setShown(4)],
    [900, () => setPicked(0)],
    [2200, () => setPicked(2)],
    [2200, () => setPicked(null)],
  ]);
  return (
    <div ref={ref} onPointerDownCapture={onPointerDownCapture}>
      <Frame height={480} title="Aven">
        <div className="dk dk-slice">
          <Prompts
            picked={picked}
            onPick={(i) => {
              setShown(4);
              setPicked(i);
            }}
          />
          <style>{`.dk-prompts button:nth-child(n + ${shown + 1}) { display: none; }`}</style>
        </div>
      </Frame>
    </div>
  );
}

export function HandoffScene() {
  const { ref, auto, reduced, onPointerDownCapture } = useDemo();
  const [beat, setBeat] = useState(4);
  useEffect(() => {
    if (reduced) setBeat(5);
  }, [reduced]);
  useScript(auto, [
    [500, () => setBeat(0)],
    [900, () => setBeat(1)],
    [1400, () => setBeat(2)],
    [900, () => setBeat(3)],
    [1100, () => setBeat(4)],
    [900, () => setBeat(5)],
    [2200, () => setBeat(5)],
  ]);
  const made = beat >= 4;
  return (
    <div ref={ref} onPointerDownCapture={onPointerDownCapture}>
      <Frame height={560} title="Neues Projekt">
        <div className="dk dk-slice">
          <div className="dk-birth">
            <p className="dk-birth-kicker">Alle Projekte</p>
            <h3>AVS bekommt eine Startseite.</h3>
            {beat >= 1 ? (
              <p className="dk-me">AVS braucht eine neue Startseite. Hell, die Lieferung liegt oben, Abnahme durch den Kunden.</p>
            ) : (
              <p className="dk-waitline">Ein Satz reicht.</p>
            )}
            {beat >= 2 ? (
              <p className="dk-aven-line">
                Projekt AVS. Die Startseite wird die erste Lieferung. Sag den Termin und wer abnimmt.
              </p>
            ) : null}
            {beat >= 3 ? (
              <div className="dk-actions">
                <button type="button" className={made ? "is-on" : ""} onClick={() => setBeat(4)}>
                  {made ? "Angelegt" : "Projekt anlegen"}
                </button>
                <button type="button" onClick={() => setBeat(2)}>
                  Live beschreiben
                </button>
                <button type="button" onClick={() => setBeat(0)}>
                  Verwerfen
                </button>
              </div>
            ) : null}
            {beat >= 4 ? (
              <article className="dk-ft">
                <p className="dk-ft-id">FT-050</p>
                <div className="dk-phone" aria-hidden>
                  <b>AVS</b>
                  <span>Die Startseite ist umgesetzt und wartet auf die Abnahme.</span>
                </div>
                <h4>Startseite fertiggestellt</h4>
                <p>Neue Startseite für AVS. Hell, mit der Lieferung oben.</p>
                {beat >= 5 ? (
                  <CodeBlock shown={4} />
                ) : (
                  <ul>
                    <li>Konzept & Design</li>
                    <li>Test & Abnahme</li>
                    <li>App-Store-Release</li>
                  </ul>
                )}
                <div className="dk-tools">
                  <span><BrandLogo name="github" size={13} /> GitHub</span>
                  <span><BrandLogo name="figma" size={13} /> Figma</span>
                  <span><BrandLogo name="slack" size={13} /> Slack</span>
                  <span>Vercel</span>
                </div>
              </article>
            ) : null}
          </div>
        </div>
      </Frame>
    </div>
  );
}

export function PortfolioScene() {
  const { ref, auto, reduced, onPointerDownCapture } = useDemo();
  const [fill, setFill] = useState(8);
  useEffect(() => {
    if (reduced) setFill(8);
  }, [reduced]);
  useScript(auto, [
    [400, () => setFill(0)],
    [500, () => setFill(2)],
    [500, () => setFill(4)],
    [500, () => setFill(6)],
    [500, () => setFill(8)],
    [2200, () => setFill(8)],
  ]);
  return (
    <div ref={ref} onPointerDownCapture={onPointerDownCapture}>
      <Frame height={560} title="Stand">
        <div className="dk dk-slice">
          <StandList fill={fill} />
        </div>
      </Frame>
    </div>
  );
}
