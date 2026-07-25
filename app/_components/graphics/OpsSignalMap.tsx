import { SIGNAL_CUT } from "./tokens";

const STYLES = `
  .sc-map {
    position: relative;
    width: 100%;
    min-height: 320px;
    border-radius: 20px;
    background:
      linear-gradient(160deg, #ffffff 0%, ${SIGNAL_CUT.paper} 100%);
    border: 1px solid rgba(15,15,17,0.08);
    box-shadow:
      0 1px 2px rgba(15,15,17,0.03),
      0 24px 60px rgba(15,15,17,0.06);
    overflow: hidden;
  }
  .sc-map-grid {
    position: absolute;
    inset: 0;
    background-image:
      linear-gradient(rgba(91,100,125,0.06) 1px, transparent 1px),
      linear-gradient(90deg, rgba(91,100,125,0.06) 1px, transparent 1px);
    background-size: 28px 28px;
    mask-image: radial-gradient(ellipse at 50% 45%, black 20%, transparent 75%);
    -webkit-mask-image: radial-gradient(ellipse at 50% 45%, black 20%, transparent 75%);
  }
  .sc-map-cut {
    position: absolute;
    left: -10%;
    top: 18%;
    width: 120%;
    height: 64%;
    background: linear-gradient(
      ${SIGNAL_CUT.cutAngle}deg,
      transparent 0%,
      transparent 46%,
      rgba(91,100,125,0.07) 46.5%,
      rgba(91,100,125,0.07) 53.5%,
      transparent 54%,
      transparent 100%
    );
    pointer-events: none;
  }
  .sc-map-svg {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
    min-height: 320px;
    display: block;
  }
`;

/** Ops signal map — Status → Risk → Decision → Next along the cut. */
export function OpsSignalMap({ className }: { className?: string }) {
  return (
    <div className={`sc-map${className ? ` ${className}` : ""}`} aria-hidden>
      <style>{STYLES}</style>
      <div className="sc-map-grid" />
      <div className="sc-map-cut" />
      <svg className="sc-map-svg" viewBox="0 0 560 320" fill="none">
        <defs>
          <linearGradient id="scNode" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="100%" stopColor="#eef0f4" />
          </linearGradient>
          <filter id="scShadow" x="-30%" y="-30%" width="160%" height="160%">
            <feDropShadow dx="0" dy="8" stdDeviation="10" floodColor="#0a0a0b" floodOpacity="0.08" />
          </filter>
        </defs>

        {/* Path along diagonal cut */}
        <path
          d="M70 250 C160 230, 220 170, 280 140 S420 90, 500 70"
          stroke={SIGNAL_CUT.slate}
          strokeWidth="1.5"
          strokeDasharray="3 7"
          opacity="0.45"
        />
        <path
          d="M70 250 C160 230, 220 170, 280 140 S420 90, 500 70"
          stroke={SIGNAL_CUT.slate}
          strokeWidth="3"
          strokeLinecap="round"
          opacity="0.18"
        />

        {/* Nodes */}
        {[
          { x: 70, y: 250, label: "Signal", sub: "GitHub, Slack" },
          { x: 200, y: 175, label: "Status", sub: "Klarheit" },
          { x: 320, y: 125, label: "Risiko", sub: "Evidence" },
          { x: 430, y: 85, label: "Entscheidung", sub: "Freigabe" },
          { x: 510, y: 58, label: "Next", sub: "Aktion" },
        ].map((n, i) => (
          <g key={n.label} filter="url(#scShadow)">
            <rect
              x={n.x - 46}
              y={n.y - 28}
              width="92"
              height="52"
              rx="14"
              fill="url(#scNode)"
              stroke="rgba(15,15,17,0.08)"
            />
            {/* mini cut accent */}
            <path
              d={`M${n.x - 34} ${n.y + 18} L${n.x - 18} ${n.y + 2}`}
              stroke={SIGNAL_CUT.slate}
              strokeWidth="2"
              strokeLinecap="round"
              opacity="0.55"
            />
            <text
              x={n.x}
              y={n.y - 2}
              textAnchor="middle"
              fill="#0a0a0b"
              fontSize="12"
              fontFamily="var(--font-aeonik), system-ui, sans-serif"
              fontWeight="500"
            >
              {n.label}
            </text>
            <text
              x={n.x}
              y={n.y + 14}
              textAnchor="middle"
              fill="#8a8a91"
              fontSize="10"
              fontFamily="var(--font-aeonik), system-ui, sans-serif"
            >
              {n.sub}
            </text>
            {i < 4 && (
              <circle
                cx={n.x + 48}
                cy={n.y - 8}
                r="2.5"
                fill={SIGNAL_CUT.slate}
                opacity="0.5"
              />
            )}
          </g>
        ))}
      </svg>
    </div>
  );
}
