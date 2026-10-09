import { Icon } from "../ui/Icon";
import { FestagMark } from "../ui/Logo";
import type { ChangelogEntry } from "@/lib/site/content";

/**
 * Small static product vignettes per changelog topic — drawn in the same
 * window language as the live demos, so every update has a real visual.
 */
export function UpdateArt({ art }: { art: ChangelogEntry["art"] }) {
  return (
    <div className="ua" aria-hidden>
      <div className="ua-win">
        <div className="ua-bar">
          <span />
          <span />
          <span />
        </div>
        <div className="ua-body">{BODY[art]}</div>
      </div>
      <style>{UA_CSS}</style>
    </div>
  );
}

const Row = ({ l, r, tone }: { l: string; r: string; tone?: "ok" | "warn" | "risk" }) => (
  <div className="ua-row">
    <span className={`status${tone ? ` status--${tone}` : ""}`}>
      <i />
      {l}
    </span>
    <em>{r}</em>
  </div>
);

const BODY: Record<ChangelogEntry["art"], React.ReactNode> = {
  okm: (
    <>
      <div className="ua-label">Operational DNA · Studio Nord</div>
      {[
        ["Decision DNA", "Speed vor Perfektion bei MVPs", 86],
        ["Quality DNA", "„Fertig“ = Staging + Freigabe", 78],
        ["Delivery DNA", "Design-Freigaben sind Engpass", 82],
      ].map(([k, v, c]) => (
        <div key={k as string} className="ua-fact">
          <span>{k}</span>
          <strong>{v}</strong>
          <span className="bar bar--accent">
            <i style={{ width: `${c}%` }} />
          </span>
        </div>
      ))}
    </>
  ),
  executive: (
    <>
      <div className="ua-label">Portfolio · KW 41</div>
      <Row l="Meridian Relaunch" r="91" tone="ok" />
      <Row l="Nordlicht Checkout" r="82" tone="ok" />
      <Row l="Kontor App v2" r="70" tone="warn" />
      <Row l="Atlas Kundenportal" r="58 · +5 Tage" tone="risk" />
    </>
  ),
  cursor: (
    <>
      <div className="ua-chat">Behebe den OAuth-Callback in Staging (ATL-88).</div>
      <div className="ua-step">
        <Icon name="cursor" size={12} /> Delegiert an Cursor Cloud Agent
      </div>
      <div className="ua-step">
        <Icon name="github" size={12} /> PR #418 geöffnet · Review nötig
      </div>
      <div className="ua-pill">Freigabe ausstehend</div>
    </>
  ),
  objectives: (
    <>
      <div className="ua-label">Objective · Q4</div>
      <div className="ua-title">Self-Service-Onboarding live</div>
      <span className="bar bar--accent" style={{ marginTop: 4 }}>
        <i style={{ width: "64%" }} />
      </span>
      <Row l="Atlas Kundenportal" r="verknüpft" tone="ok" />
      <Row l="Rechnungskauf" r="Phase 2" tone="warn" />
    </>
  ),
  audio: (
    <>
      <div className="ua-label">Briefing KW 41 · 2:10</div>
      <div className="ua-wave">
        {Array.from({ length: 36 }).map((_, i) => (
          <i key={i} style={{ height: `${20 + ((i * 37) % 60)}%`, opacity: i < 14 ? 1 : 0.35 }} />
        ))}
      </div>
      <div className="ua-quote">„Das Dashboard ist abnahmebereit. Für den Login brauchen wir Ihren API-Zugang …“</div>
    </>
  ),
  extension: (
    <>
      <div className="ua-ext">
        <FestagMark className="ua-ext-mark" /> Status · Entscheidung · Evidence
      </div>
      <div className="ua-input">Login hängt am fehlenden API-Zugang.</div>
      <div className="ua-step">
        <Icon name="sparkles" size={12} /> Erkannt: Blocker · ATL-88
      </div>
    </>
  ),
  connectors: (
    <>
      <div className="ua-label">Connectors</div>
      <div className="ua-icons">
        {(["github", "linear", "jira", "slack"] as const).map((n) => (
          <span key={n}>
            <Icon name={n} size={16} />
          </span>
        ))}
      </div>
      <Row l="PR #412 gemerged" r="Fortschritt" tone="ok" />
      <Row l="ATL-88 blockiert" r="Blocker" tone="risk" />
    </>
  ),
  tagro: (
    <>
      <div className="ua-chat">Launch um eine Woche verschieben?</div>
      <div className="ua-opt is-rec">
        Eine Woche verschieben <em>Risiko −42 %</em>
      </div>
      <div className="ua-opt">
        Wie geplant <em>Risiko hoch</em>
      </div>
    </>
  ),
};

const UA_CSS = `
.ua {
  position: relative; width: 100%; aspect-ratio: 2.6 / 1; border-radius: 10px; overflow: hidden;
  background:
    radial-gradient(90% 70% at 70% 115%, rgba(46,107,255,0.22), transparent 60%),
    linear-gradient(180deg, #eef1f6, #dfe6f1);
  display: flex; align-items: flex-end; justify-content: center; padding: 8% 10% 0;
}
.ua::before {
  content: ""; position: absolute; inset: 0; background-image: url("/brand/login-bg-light.png");
  background-size: cover; background-position: center 65%; opacity: 0.7; mix-blend-mode: multiply;
}
.ua-win {
  position: relative; width: 100%; min-width: 0; max-width: 520px; height: 100%; background: #fff;
  border-radius: 8px 8px 0 0; box-shadow: var(--sh-window); overflow: hidden; display: flex; flex-direction: column;
}
.ua-bar { height: 26px; display: flex; gap: 5px; align-items: center; padding: 0 10px; border-bottom: var(--hair) solid var(--line); background: #fbfaf8; flex-shrink: 0; }
.ua-bar span { width: 7px; height: 7px; border-radius: 50%; background: #dcd9d2; }
.ua-body { min-width: 0; padding: 14px 16px; display: grid; gap: 8px; align-content: start; font-size: 12.5px; color: var(--ink-2); }
.ua-label { font-size: 10.5px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--faint); }
.ua-title { font-size: 15px; color: var(--ink); }
.ua-row { display: flex; justify-content: space-between; gap: 8px; padding: 6px 0; border-top: var(--hair) solid var(--line); }
.ua-row em { font-style: normal; color: var(--faint); font-size: 11.5px; }
.ua-fact { display: grid; grid-template-columns: 82px minmax(0, 1fr) 56px; gap: 8px; align-items: center; min-width: 0; }
.ua-fact span:first-child { color: var(--accent); font-size: 11px; }
.ua-fact strong { font-weight: 400; color: var(--ink); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ua-chat { justify-self: end; padding: 7px 11px; border-radius: 8px 8px 3px 8px; background: var(--ink); color: #fff; }
.ua-step { display: flex; align-items: center; gap: 7px; color: var(--muted); }
.ua-step svg { color: var(--accent); }
.ua-pill { justify-self: start; padding: 4px 9px; border-radius: 999px; background: var(--warn-soft); color: var(--warn); font-size: 11.5px; }
.ua-wave { display: flex; align-items: center; gap: 3px; height: 44px; }
.ua-wave i { flex: 1; border-radius: 2px; background: var(--accent); }
.ua-quote {  font-size: 14px; color: var(--ink); line-height: 1.4; }
.ua-ext { display: flex; align-items: center; gap: 8px; color: var(--ink); }
.ua-ext-mark { width: 14px; height: 14px; }
.ua-input { padding: 9px 11px; border-radius: 7px; border: var(--hair) solid var(--accent); box-shadow: 0 0 0 3px var(--accent-soft); color: var(--ink); }
.ua-icons { display: flex; gap: 6px; }
.ua-icons span { width: 30px; height: 30px; border-radius: 7px; background: var(--surface-2); display: grid; place-items: center; color: var(--ink); }
.ua-opt { display: flex; justify-content: space-between; padding: 8px 11px; border-radius: 7px; border: var(--hair) solid var(--line-strong); color: var(--ink); }
.ua-opt em { font-style: normal; font-size: 11.5px; color: var(--muted); }
.ua-opt.is-rec { border-color: var(--accent); background: var(--accent-tint); }
.ua-opt.is-rec em { color: var(--accent); }
@media (max-width: 760px) { .ua { aspect-ratio: 4 / 3; padding: 8% 6% 0; } }
`;
