export function AppleCrosshairIcon({ className = "lp-apple-crosshair" }: { className?: string }) {
  return (
    <svg
      className={className}
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      aria-hidden
    >
      <circle cx="10" cy="10" r="7.5" stroke="currentColor" strokeWidth="1.2" />
      <path d="M10 2v16M2 10h16" stroke="currentColor" strokeWidth="1.2" />
      <circle cx="10" cy="10" r="1.5" fill="currentColor" />
    </svg>
  );
}
