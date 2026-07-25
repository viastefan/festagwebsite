import { SIGNAL_CUT } from "./tokens";

const STYLES = `
  .sc-orbit {
    position: relative;
    width: 100%;
    aspect-ratio: 1.15;
    max-width: 420px;
    margin-left: auto;
  }
  .sc-orbit-svg {
    width: 100%;
    height: 100%;
    display: block;
  }
`;

/** Install / use constellation — four steps around the cut axis. */
export function InstallConstellation() {
  const steps = [
    { x: 70, y: 210, n: "01", label: "Workspace" },
    { x: 150, y: 120, n: "02", label: "Connect" },
    { x: 250, y: 80, n: "03", label: "Status" },
    { x: 340, y: 55, n: "04", label: "Alltag" },
  ];

  return (
    <div className="sc-orbit" aria-hidden>
      <style>{STYLES}</style>
      <svg className="sc-orbit-svg" viewBox="0 0 400 320" fill="none">
        <defs>
          <linearGradient id="scOrbFill" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#eef0f4" />
          </linearGradient>
        </defs>

        {/* Paper plate */}
        <rect
          x="16"
          y="16"
          width="368"
          height="288"
          rx="24"
          fill={SIGNAL_CUT.paper}
          stroke="rgba(15,15,17,0.07)"
        />

        {/* Diagonal cut channel */}
        <path
          d="M40 270 L360 50"
          stroke={SIGNAL_CUT.slate}
          strokeWidth="36"
          strokeLinecap="round"
          opacity="0.08"
        />
        <path
          d="M40 270 L360 50"
          stroke={SIGNAL_CUT.slate}
          strokeWidth="2"
          strokeDasharray="2 8"
          opacity="0.45"
        />

        {/* Center mark geometry */}
        <g transform="translate(168 118)">
          <rect width="64" height="64" rx="16" fill="#0a0a0b" />
          <path
            fill="#E8EDF4"
            d="M14 12c0-1.7 1.3-3 3-3h18c1.1 0 2.1.6 2.6 1.6L46 28c.4.8.3 1.7-.3 2.3L32 44c-.6.6-1.5.7-2.2.3L15.8 35.2A3 3 0 0 1 14 32.6V12z"
          />
          <path
            fill="#C5CAD6"
            d="M34 42c.6-.6 1.5-.5 2 .1L46 52c.7.8.2 2.1-.9 2.1H37c-1.7 0-3-1.3-3-3v-6.2c0-.8.3-1.5.9-2z"
          />
        </g>

        {steps.map((s) => (
          <g key={s.n}>
            <circle cx={s.x} cy={s.y} r="28" fill="url(#scOrbFill)" stroke="rgba(15,15,17,0.08)" />
            <text
              x={s.x}
              y={s.y - 2}
              textAnchor="middle"
              fill="#8a8a91"
              fontSize="10"
              fontFamily="var(--font-aeonik), system-ui, sans-serif"
            >
              {s.n}
            </text>
            <text
              x={s.x}
              y={s.y + 12}
              textAnchor="middle"
              fill="#0a0a0b"
              fontSize="11"
              fontWeight="500"
              fontFamily="var(--font-aeonik), system-ui, sans-serif"
            >
              {s.label}
            </text>
          </g>
        ))}
      </svg>
    </div>
  );
}
