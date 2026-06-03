/**
 * ClientPanelMock — minimal version of the Festag client status room.
 * Notion-like quiet surface, latest report on the left, pulse on the right.
 */

export function ClientPanelMock({ className }: { className?: string }) {
  return (
    <div
      className={`card p-0 overflow-hidden bg-fest-paper border-black/[0.06] ${className ?? ""}`}
    >
      <header className="px-6 py-4 border-b border-black/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[#7A8C6E]" />
          <span className="t-mono text-fest-muted">client · KW 23</span>
        </div>
        <span className="t-mono text-fest-muted">geteilt mit 4 Personen</span>
      </header>

      <div className="grid md:grid-cols-[1.4fr_1fr]">
        <article className="p-7 border-r border-black/[0.06]">
          <p className="t-eyebrow mb-3">Statusbericht</p>
          <h4 className="text-[20px] tracking-[0.012em] text-fest-text font-medium leading-snug">
            Performance-Kampagne läuft stabil.
          </h4>
          <p className="mt-3 text-[14.5px] text-fest-muted tracking-[0.017em] leading-[1.65]">
            CAC bleibt unter Ziel, ROAS bei 3,4×. Diese Woche{" "}
            <em className="t-serif-italic not-italic">three approvals</em>{" "}
            erteilt, ein Vendor-Risiko wird beobachtet. Nichts blockiert
            Launch.
          </p>

          <div className="mt-7 grid grid-cols-3 gap-4">
            <Stat label="Approvals" value="3" />
            <Stat label="Decisions" value="2" />
            <Stat label="Proof" value="84%" />
          </div>
        </article>

        <aside className="p-7 bg-white/60">
          <p className="t-eyebrow mb-4">Heute aktiv</p>
          <ul className="grid gap-3 text-[13.5px] text-fest-text tracking-[0.012em]">
            <li className="flex items-center gap-2">
              <Dot tone="green" /> Status ist klar
            </li>
            <li className="flex items-center gap-2">
              <Dot tone="amber" /> Budget-Freigabe offen
            </li>
            <li className="flex items-center gap-2">
              <Dot tone="amber" /> Asset-Approval erwartet
            </li>
            <li className="flex items-center gap-2">
              <Dot tone="muted" /> Nächster Report Freitag
            </li>
          </ul>

          <div className="mt-7 grid gap-2">
            <button className="btn btn-primary w-full justify-center h-10 text-[13px]">
              Status abrufen
            </button>
            <button className="btn btn-ghost-light w-full justify-center h-10 text-[13px]">
              Bericht anhören
            </button>
          </div>
        </aside>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-[26px] text-fest-text font-medium tracking-[-0.01em]">
        {value}
      </p>
      <p className="t-mono text-fest-muted mt-1">{label}</p>
    </div>
  );
}

function Dot({ tone }: { tone: "green" | "amber" | "muted" }) {
  const c =
    tone === "green" ? "#7A8C6E" : tone === "amber" ? "#B0925F" : "#A3A3A3";
  return (
    <span
      aria-hidden
      className="w-1.5 h-1.5 rounded-full"
      style={{ background: c }}
    />
  );
}
