/**
 * SignalRouter — the hero system diagram.
 * Left: raw project signals (chaos).
 * Middle: Festag control layer (Tagro, ProofGrid, Nexora, Decision).
 * Right: structured outputs (Reports, Decisions, Execution, Proof).
 *
 * Pure SVG + CSS keyframes. No JS. Respects prefers-reduced-motion.
 */

const SIGNALS_IN = [
  { y: 32, label: "Client PDF" },
  { y: 78, label: "Slack note" },
  { y: 124, label: "Task" },
  { y: 170, label: "Campaign result" },
  { y: 216, label: "Work session" },
  { y: 262, label: "Decision request" },
];

const LAYERS = [
  { y: 70, label: "Tagro" },
  { y: 122, label: "ProofGrid" },
  { y: 174, label: "Nexora" },
  { y: 226, label: "Decisions" },
];

const SIGNALS_OUT = [
  { y: 50, label: "Client Report" },
  { y: 100, label: "Decision Inbox" },
  { y: 150, label: "Execution Task" },
  { y: 200, label: "Proof Evidence" },
  { y: 250, label: "Briefing" },
];

export function SignalRouter({ className }: { className?: string }) {
  return (
    <div className={className}>
      <svg
        viewBox="0 0 960 320"
        className="w-full h-auto"
        role="img"
        aria-label="Festag signal router — raw project signals routed into reports, decisions, execution and proof"
      >
        {/* Inputs */}
        {SIGNALS_IN.map((s, i) => (
          <g key={`in-${i}`} style={{ animation: `fest-fragment-in 700ms ${i * 80}ms var(--ease-out) both` }}>
            <rect
              x="10"
              y={s.y - 14}
              width="170"
              height="28"
              rx="6"
              fill="rgba(255,255,255,0.04)"
              stroke="rgba(255,255,255,0.10)"
            />
            <circle cx="26" cy={s.y} r="2" fill="#5B647D" />
            <text
              x="40"
              y={s.y + 4}
              fontFamily="Aeonik, sans-serif"
              fontSize="11"
              letterSpacing="0.04em"
              fill="rgba(255,255,255,0.7)"
            >
              {s.label}
            </text>
          </g>
        ))}

        {/* Connector lines IN → core */}
        {SIGNALS_IN.map((s, i) => (
          <path
            key={`l-in-${i}`}
            d={`M180 ${s.y} C 280 ${s.y}, 320 160, 400 ${LAYERS[i % LAYERS.length].y}`}
            stroke="rgba(91,100,125,0.35)"
            strokeWidth="1"
            fill="none"
            style={{
              strokeDasharray: 320,
              strokeDashoffset: 320,
              animation: `fest-line-draw 1400ms ${300 + i * 80}ms var(--ease-out) forwards`,
            }}
          />
        ))}

        {/* Core layer */}
        <g>
          <rect
            x="400"
            y="40"
            width="160"
            height="240"
            rx="14"
            fill="rgba(91,100,125,0.10)"
            stroke="rgba(91,100,125,0.45)"
          />
          <text
            x="480"
            y="32"
            textAnchor="middle"
            fontFamily="Aeonik, sans-serif"
            fontSize="10"
            letterSpacing="0.2em"
            fill="rgba(255,255,255,0.55)"
          >
            FESTAG CONTROL LAYER
          </text>
          {LAYERS.map((l, i) => (
            <g key={`layer-${i}`}>
              <rect
                x="416"
                y={l.y - 16}
                width="128"
                height="32"
                rx="6"
                fill="rgba(255,255,255,0.04)"
                stroke="rgba(255,255,255,0.10)"
              />
              <circle
                cx="430"
                cy={l.y}
                r="2.5"
                fill="#5B647D"
                className="fest-pulse-dot"
                style={{ animationDelay: `${i * 300}ms` }}
              />
              <text
                x="446"
                y={l.y + 4}
                fontFamily="Aeonik, sans-serif"
                fontSize="12"
                fontWeight={500}
                letterSpacing="0.012em"
                fill="rgba(255,255,255,0.92)"
              >
                {l.label}
              </text>
            </g>
          ))}
        </g>

        {/* Connector lines core → out */}
        {SIGNALS_OUT.map((s, i) => (
          <path
            key={`l-out-${i}`}
            d={`M560 ${LAYERS[i % LAYERS.length].y} C 640 ${LAYERS[i % LAYERS.length].y}, 680 160, 770 ${s.y}`}
            stroke="rgba(91,100,125,0.5)"
            strokeWidth="1"
            fill="none"
            style={{
              strokeDasharray: 320,
              strokeDashoffset: 320,
              animation: `fest-line-draw 1400ms ${700 + i * 80}ms var(--ease-out) forwards`,
            }}
          />
        ))}

        {/* Outputs */}
        {SIGNALS_OUT.map((s, i) => (
          <g key={`out-${i}`} style={{ animation: `fest-fragment-in 700ms ${600 + i * 80}ms var(--ease-out) both` }}>
            <rect
              x="770"
              y={s.y - 14}
              width="180"
              height="28"
              rx="6"
              fill="rgba(255,255,255,0.06)"
              stroke="rgba(255,255,255,0.14)"
            />
            <circle cx="786" cy={s.y} r="2" fill="#fff" />
            <text
              x="800"
              y={s.y + 4}
              fontFamily="Aeonik, sans-serif"
              fontSize="11"
              letterSpacing="0.04em"
              fill="rgba(255,255,255,0.92)"
            >
              {s.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
