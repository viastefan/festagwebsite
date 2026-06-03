/**
 * InboxMock — notification surface that never lets important signals disappear.
 */

const ITEMS = [
  { kind: "Decision", text: "Performance Budget +18 % freigeben?", time: "vor 4 Min" },
  { kind: "Approval", text: "Brand-Refresh: Design B bestätigt", time: "vor 22 Min" },
  { kind: "Report",   text: "Wochenbericht für Munich Group bereit", time: "vor 1 Std" },
  { kind: "PDF",      text: "Vendor-Vertrag analysiert · 3 Risiken", time: "vor 2 Std" },
  { kind: "Risk",     text: "Onboarding SLA — beobachten", time: "heute 08:14", tone: "warn" as const },
];

export function InboxMock({ className }: { className?: string }) {
  return (
    <div
      className={`card card-dark p-0 overflow-hidden ${className ?? ""}`}
    >
      <header className="px-6 py-4 border-b border-white/[0.06] flex items-center justify-between">
        <span className="t-mono text-white/45">inbox</span>
        <span className="t-mono text-white/30">5 neu</span>
      </header>
      <ul className="divide-y divide-white/[0.06]">
        {ITEMS.map((it, i) => (
          <li
            key={i}
            className="px-6 py-4 flex items-start gap-4 hover:bg-white/[0.02] transition-colors"
          >
            <span
              className={`t-mono shrink-0 mt-0.5 ${
                it.tone === "warn" ? "text-[#B0925F]" : "text-white/45"
              }`}
            >
              {it.kind}
            </span>
            <p className="flex-1 text-[14px] text-white/90 tracking-[0.012em]">
              {it.text}
            </p>
            <span className="t-mono text-white/30 shrink-0">{it.time}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
