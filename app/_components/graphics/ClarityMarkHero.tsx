import { SIGNAL_CUT } from "./tokens";

const STYLES = `
  .sc-field {
    position: relative;
    width: 100%;
    aspect-ratio: 1;
    max-width: 280px;
    margin: 0 auto;
    display: grid;
    place-items: center;
  }
  .sc-field-glow {
    position: absolute;
    inset: 8%;
    border-radius: 50%;
    background:
      radial-gradient(circle at 42% 38%, rgba(255,255,255,0.9) 0%, transparent 42%),
      radial-gradient(circle at 50% 55%, ${SIGNAL_CUT.slateSoft} 0%, transparent 62%);
    filter: blur(22px);
    animation: scPulse 8s ease-in-out infinite;
  }
  .sc-field-ring {
    position: absolute;
    inset: 12%;
    border-radius: 28%;
    border: 1px solid ${SIGNAL_CUT.slateLine};
    background:
      linear-gradient(145deg, rgba(255,255,255,0.55), rgba(245,245,242,0.2));
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.7),
      0 24px 60px rgba(15,15,17,0.08);
  }
  .sc-field-cut {
    position: absolute;
    inset: 18%;
    border-radius: 24%;
    overflow: hidden;
    background: #0a0a0b;
    box-shadow: 0 18px 40px rgba(15,15,17,0.16);
  }
  .sc-field-cut svg {
    width: 100%;
    height: 100%;
    display: block;
  }
  @keyframes scPulse {
    0%, 100% { opacity: 0.75; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.04); }
  }
  @media (prefers-reduced-motion: reduce) {
    .sc-field-glow { animation: none; }
  }
`;

/** Hero / brand presence — mark as physical clarity object. */
export function ClarityMarkHero({ className }: { className?: string }) {
  return (
    <div className={`sc-field${className ? ` ${className}` : ""}`} aria-hidden>
      <style>{STYLES}</style>
      <div className="sc-field-glow" />
      <div className="sc-field-ring" />
      <div className="sc-field-cut">
        <svg viewBox="0 0 120 120" fill="none">
          <defs>
            <linearGradient id="scMarkA" x1="20" y1="10" x2="90" y2="100">
              <stop offset="0%" stopColor="#ffffff" />
              <stop offset="55%" stopColor="#e8eaef" />
              <stop offset="100%" stopColor="#c5cad6" />
            </linearGradient>
            <linearGradient id="scMarkB" x1="70" y1="60" x2="110" y2="110">
              <stop offset="0%" stopColor="#f7f8fa" />
              <stop offset="100%" stopColor="#b8becc" />
            </linearGradient>
            <filter id="scSoft" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="0.6" />
            </filter>
          </defs>
          {/* Large piece */}
          <path
            fill="url(#scMarkA)"
            d="M28 22c0-4.4 3.6-8 8-8h40.5c3.1 0 5.9 1.8 7.2 4.6L99 50.2c1.1 2.3.7 5-.9 6.9L71.2 84.1c-1.7 1.7-4.4 1.9-6.3.5L31.4 65.2A8 8 0 0 1 28 58.6V22z"
          />
          {/* Small piece */}
          <path
            fill="url(#scMarkB)"
            d="M74.8 82.6c1.7-1.7 4.5-1.6 6.1.2L103 105c2.4 2.5.6 6.6-2.8 6.6H82c-4.4 0-8-3.6-8-8V91.4c0-2.2.9-4.3 2.5-5.8l-.7-.9-.9-.5z"
          />
          <path
            fill="url(#scMarkB)"
            d="M78.4 86.2 99.6 107.4H82c-2.2 0-4-1.8-4-4v-12.8c0-1.1.4-2.1 1.2-2.9l-.8-.5z"
          />
          {/* Cut channel highlight */}
          <path
            stroke="rgba(255,255,255,0.35)"
            strokeWidth="2.2"
            strokeLinecap="round"
            d="M52 78 L92 38"
            opacity="0.55"
          />
        </svg>
      </div>
    </div>
  );
}
