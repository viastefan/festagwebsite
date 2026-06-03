/**
 * ProofGridDemo — visualises evidence strength across a project grid.
 * Each cell encodes a proof state: manual → linked → approved → verified.
 */

type ProofStrength = 0 | 1 | 2 | 3 | 4;

const STRENGTH_FILL: Record<ProofStrength, string> = {
  0: "rgba(255,255,255,0.04)",
  1: "rgba(91,100,125,0.18)",
  2: "rgba(91,100,125,0.38)",
  3: "rgba(91,100,125,0.65)",
  4: "rgba(176,138,102,0.85)", // wood — fully verified, rare warmth accent
};

const STRENGTH_LABEL: Record<ProofStrength, string> = {
  0: "leer",
  1: "manuell",
  2: "verlinkt",
  3: "approved",
  4: "verifiziert",
};

// Pseudo-real evidence map: rows = phases, cols = artefacts.
const ROWS = ["Intake", "Plan", "Build", "QA", "Launch", "Report"];
const COLS = ["Brief", "Decision", "Asset", "Approval", "Metric", "Sign-off"];

const STRENGTHS: ProofStrength[][] = [
  [4, 3, 3, 4, 2, 4],
  [3, 4, 2, 3, 2, 3],
  [2, 3, 4, 2, 1, 2],
  [3, 2, 3, 4, 4, 3],
  [2, 3, 2, 3, 4, 4],
  [3, 4, 3, 4, 3, 4],
];

export function ProofGridDemo({ className }: { className?: string }) {
  const total = ROWS.length * COLS.length;
  const verified = STRENGTHS.flat().filter((v) => v >= 3).length;
  const pct = Math.round((verified / total) * 100);

  return (
    <div className={`card p-0 overflow-hidden ${className ?? ""}`}>
      <header className="px-6 py-4 border-b border-black/[0.06] flex items-center justify-between">
        <span className="t-mono text-fest-muted">proof / grid</span>
        <span className="t-mono text-fest-muted">
          {pct}% verifiziert
        </span>
      </header>

      <div className="p-6">
        <div className="grid grid-cols-[80px_repeat(6,1fr)] gap-1.5 items-center">
          <span />
          {COLS.map((c) => (
            <span
              key={c}
              className="t-mono text-fest-muted text-center text-[10px]"
            >
              {c}
            </span>
          ))}
          {ROWS.map((row, r) => (
            <RowFragment
              key={row}
              row={row}
              strengths={STRENGTHS[r]}
              rowIndex={r}
            />
          ))}
        </div>

        <div className="mt-6 flex items-center gap-5 flex-wrap">
          {([1, 2, 3, 4] as ProofStrength[]).map((s) => (
            <div key={s} className="flex items-center gap-2">
              <span
                className="w-3 h-3 rounded-sm"
                style={{ background: STRENGTH_FILL[s] }}
              />
              <span className="t-mono text-fest-muted">
                {STRENGTH_LABEL[s]}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function RowFragment({
  row,
  strengths,
  rowIndex,
}: {
  row: string;
  strengths: ProofStrength[];
  rowIndex: number;
}) {
  return (
    <>
      <span className="t-mono text-fest-muted text-[10px]">{row}</span>
      {strengths.map((s, i) => (
        <span
          key={i}
          className="aspect-square rounded-[3px]"
          style={{
            background: STRENGTH_FILL[s],
            animation: `fest-fragment-in 600ms ${(rowIndex * 6 + i) * 30}ms var(--ease-out) both`,
          }}
          aria-label={`${row} ${STRENGTH_LABEL[s]}`}
        />
      ))}
    </>
  );
}
