/**
 * DecisionInbox — calm Linear-style list of pending decisions.
 * Used in the "Decisions" homepage section.
 */

const DECISIONS = [
  {
    project: "Q3 Performance Campaign",
    title: "Budget um 18 % erhöhen?",
    context: "CAC stabil, ROAS 3.4×",
    status: "Wartet auf Approval",
    tone: "amber",
  },
  {
    project: "Workspace v2",
    title: "Feature jetzt shippen oder Phase 2?",
    context: "QA grün, 2 Edge Cases offen",
    status: "Owner-Entscheidung",
    tone: "amber",
  },
  {
    project: "Brand Refresh",
    title: "Design-Richtung B bestätigen?",
    context: "3 Reviews positiv",
    status: "Klar",
    tone: "green",
  },
  {
    project: "Onboarding Flow",
    title: "Vendor wechseln?",
    context: "SLA zwei Mal verfehlt",
    status: "Risiko erkannt",
    tone: "red",
  },
];

const TONE: Record<string, string> = {
  green: "#7A8C6E",
  amber: "#B0925F",
  red: "#A06868",
};

export function DecisionInbox({ className }: { className?: string }) {
  return (
    <div className={`card card-dark p-0 overflow-hidden ${className ?? ""}`}>
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/[0.06]">
        <div className="flex items-center gap-3">
          <span className="t-mono text-white/40">decisions / inbox</span>
        </div>
        <span className="t-mono text-white/30">4 offen</span>
      </header>

      <ul className="divide-y divide-white/[0.06]">
        {DECISIONS.map((d, i) => (
          <li
            key={i}
            className="px-6 py-5 flex items-start gap-4 hover:bg-white/[0.02] transition-colors"
          >
            <span
              aria-hidden
              className="mt-2 w-2 h-2 rounded-full shrink-0"
              style={{ background: TONE[d.tone] }}
            />
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-3 text-[12px] text-white/45 tracking-[0.012em]">
                <span>{d.project}</span>
                <span className="opacity-50">·</span>
                <span>{d.context}</span>
              </div>
              <p className="mt-1 text-[15px] text-white font-medium tracking-[0.012em]">
                {d.title}
              </p>
            </div>
            <span className="t-mono text-white/40 shrink-0">{d.status}</span>
          </li>
        ))}
      </ul>

      <footer className="px-6 py-4 border-t border-white/[0.06] flex items-center justify-between">
        <span className="t-mono text-white/30">
          decisions move the work →
        </span>
        <button
          type="button"
          className="btn btn-ghost-dark h-8 px-3 text-[12px]"
        >
          Open inbox
        </button>
      </footer>
    </div>
  );
}
