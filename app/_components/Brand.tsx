/**
 * Festag wordmark — Aeonik Medium, optical kerning, signal-dot accent.
 * Pure SVG so it inherits currentColor in dark/light surfaces.
 */
export function FestagWordmark({
  className,
  showDot = true,
}: {
  className?: string;
  showDot?: boolean;
}) {
  return (
    <svg
      viewBox="0 0 128 22"
      className={className}
      role="img"
      aria-label="Festag"
    >
      <text
        x="0"
        y="17"
        fontFamily='"Aeonik", system-ui, sans-serif'
        fontWeight={500}
        fontSize="18"
        letterSpacing="-0.2"
        fill="currentColor"
      >
        festag
      </text>
      {showDot && (
        <circle cx="65" cy="6" r="1.6" fill="var(--primary, #5B647D)" />
      )}
    </svg>
  );
}

export function FestagMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      className={className}
      role="img"
      aria-label="Festag mark"
    >
      <rect width="32" height="32" rx="8" fill="currentColor" />
      <circle cx="16" cy="16" r="3.5" fill="#fff" />
      <circle
        cx="16"
        cy="16"
        r="8"
        fill="none"
        stroke="#fff"
        strokeOpacity="0.35"
        strokeWidth="1"
      />
    </svg>
  );
}
