/**
 * MarketingFlow — Budget → Campaign → Leads → Approval → Result.
 * Calm SVG diagram, no playful icons.
 */

export function MarketingFlow({ className }: { className?: string }) {
  return (
    <div className={`card p-0 overflow-hidden ${className ?? ""}`}>
      <header className="px-6 py-4 border-b border-black/[0.06] flex items-center justify-between">
        <span className="t-mono text-fest-muted">marketing / projects</span>
        <span className="t-mono text-fest-muted">live</span>
      </header>
      <div className="p-6">
        <svg
          viewBox="0 0 720 220"
          className="w-full h-auto"
          role="img"
          aria-label="Marketing flow — budget flows into campaigns and produces approved leads"
        >
          {[
            { x: 0, label: "Budget", value: "€24.000" },
            { x: 180, label: "Campaign", value: "Performance" },
            { x: 360, label: "Leads", value: "412" },
            { x: 540, label: "Approval", value: "Tagro" },
          ].map((n, i) => (
            <g key={i}>
              <rect
                x={n.x + 10}
                y="60"
                width="160"
                height="100"
                rx="10"
                fill="rgba(91,100,125,0.06)"
                stroke="rgba(0,0,0,0.08)"
              />
              <text
                x={n.x + 26}
                y="86"
                fontFamily="Aeonik, sans-serif"
                fontSize="10"
                letterSpacing="0.2em"
                fill="#5A5A5A"
              >
                {n.label.toUpperCase()}
              </text>
              <text
                x={n.x + 26}
                y="124"
                fontFamily="Aeonik, sans-serif"
                fontSize="20"
                fontWeight={500}
                letterSpacing="-0.01em"
                fill="#111"
              >
                {n.value}
              </text>
            </g>
          ))}
          {[170, 350, 530].map((x, i) => (
            <path
              key={x}
              d={`M${x} 110 L ${x + 20} 110`}
              stroke="#5B647D"
              strokeWidth="1.4"
              fill="none"
              style={{
                strokeDasharray: 30,
                strokeDashoffset: 30,
                animation: `fest-line-draw 700ms ${300 + i * 200}ms var(--ease-out) forwards`,
              }}
            />
          ))}
          <g>
            <rect
              x="540"
              y="170"
              width="160"
              height="36"
              rx="8"
              fill="#5B647D"
            />
            <text
              x="558"
              y="193"
              fontFamily="Aeonik, sans-serif"
              fontSize="12"
              fontWeight={500}
              letterSpacing="0.012em"
              fill="#fff"
            >
              Client-Bericht erzeugt
            </text>
          </g>
        </svg>
      </div>
    </div>
  );
}
