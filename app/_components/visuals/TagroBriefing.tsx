/**
 * TagroBriefing — a calm briefing card showing how Tagro compresses
 * scattered signals into a single human-readable status.
 */

export function TagroBriefing({ className }: { className?: string }) {
  return (
    <div
      className={`card card-dark p-0 overflow-hidden relative ${className ?? ""}`}
    >
      <header className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="w-2 h-2 rounded-full bg-[#5B647D] fest-pulse-dot" />
          <span className="t-mono text-white/45">tagro / briefing</span>
        </div>
        <span className="t-mono text-white/30">heute, 09:14</span>
      </header>

      <div className="p-7">
        <p className="text-white/55 text-[12px] tracking-[0.18em] uppercase mb-4">
          Statusabfrage
        </p>
        <p className="text-[22px] leading-[1.45] tracking-[0.012em] text-white font-medium">
          <span className="text-white">2 Entscheidungen</span> warten auf dich.{" "}
          <span className="text-white/55">
            1 Report ist freigegeben, kein kritisches Risiko aktiv.
          </span>{" "}
          Marketing hat <span className="text-white">3 Leads</span> aus dem
          Performance-Kanal gemeldet.
        </p>

        <ul className="mt-7 grid gap-3">
          <BriefingLine label="Decision" text="Budget Q3 +18 % freigeben?" />
          <BriefingLine label="Decision" text="Feature-Cut vor Launch bestätigen?" />
          <BriefingLine label="Proof" text="Onboarding-Video verifiziert (3 Approver)" />
          <BriefingLine label="Risk" text="Vendor SLA nicht erfüllt — beobachten" tone="warn" />
        </ul>

        <div className="mt-7 flex items-center justify-between">
          <span className="t-mono text-white/35">tagro · live transcript</span>
          <div className="flex items-center gap-2">
            <button className="btn btn-ghost-dark h-8 px-3 text-[12px]">
              Bericht anhören
            </button>
            <button className="btn btn-primary h-8 px-3 text-[12px]">
              Status abrufen
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function BriefingLine({
  label,
  text,
  tone = "default",
}: {
  label: string;
  text: string;
  tone?: "default" | "warn";
}) {
  return (
    <li className="flex items-start gap-3 text-[14px] text-white/85">
      <span
        className={`mt-1 t-mono shrink-0 ${
          tone === "warn" ? "text-[#B0925F]" : "text-white/40"
        }`}
      >
        {label}
      </span>
      <span className="tracking-[0.012em]">{text}</span>
    </li>
  );
}
