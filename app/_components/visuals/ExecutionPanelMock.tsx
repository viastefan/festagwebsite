/**
 * ExecutionPanelMock — contractor-facing view.
 * Three role surfaces (dev, marketer, operator) feed one project state.
 */

const TASKS = [
  {
    role: "dev",
    title: "Auth flow — refactor session refresh",
    project: "Workspace v2",
    status: "in review",
    proof: 3,
  },
  {
    role: "marketing",
    title: "Performance creative — Variant C",
    project: "Q3 Campaign",
    status: "approved",
    proof: 4,
  },
  {
    role: "ops",
    title: "Vendor SLA — escalation note",
    project: "Onboarding Flow",
    status: "blocked",
    proof: 1,
  },
  {
    role: "dev",
    title: "ProofGrid — empty-state polish",
    project: "Workspace v2",
    status: "verified",
    proof: 4,
  },
];

const ROLE_LABEL: Record<string, string> = {
  dev: "Developer",
  marketing: "Marketing",
  ops: "Operator",
};

const STATUS_TONE: Record<string, string> = {
  "in review": "rgba(91,100,125,0.5)",
  approved: "#7A8C6E",
  blocked: "#A06868",
  verified: "#B08A66",
};

export function ExecutionPanelMock({ className }: { className?: string }) {
  return (
    <div
      className={`card p-0 overflow-hidden ${className ?? ""}`}
    >
      <header className="px-6 py-4 border-b border-black/[0.06] flex items-center justify-between">
        <span className="t-mono text-fest-muted">execution / panel</span>
        <span className="t-mono text-fest-muted">3 rollen · 1 projekt</span>
      </header>

      <ul className="divide-y divide-black/[0.06]">
        {TASKS.map((t, i) => (
          <li
            key={i}
            className="px-6 py-4 grid grid-cols-[80px_1fr_auto] items-center gap-4"
          >
            <span className="t-mono text-fest-muted">
              {ROLE_LABEL[t.role]}
            </span>
            <div>
              <p className="text-[14.5px] tracking-[0.012em] text-fest-text font-medium">
                {t.title}
              </p>
              <p className="t-mono text-fest-muted mt-1">{t.project}</p>
            </div>
            <div className="flex items-center gap-3">
              <ProofBar level={t.proof} />
              <span
                className="t-mono"
                style={{ color: STATUS_TONE[t.status] }}
              >
                {t.status}
              </span>
            </div>
          </li>
        ))}
      </ul>

      <footer className="px-6 py-4 border-t border-black/[0.06] flex items-center justify-between">
        <span className="t-mono text-fest-muted">
          tagro verifies finishes →
        </span>
        <button className="btn btn-ghost-light h-8 px-3 text-[12px]">
          Open execution
        </button>
      </footer>
    </div>
  );
}

function ProofBar({ level }: { level: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4].map((i) => (
        <span
          key={i}
          className="h-2 w-3 rounded-[1.5px]"
          style={{
            background: i <= level ? "var(--primary)" : "rgba(0,0,0,0.06)",
          }}
        />
      ))}
    </div>
  );
}
