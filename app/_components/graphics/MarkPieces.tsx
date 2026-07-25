/** Vector mark pieces — reusable in Signal Cut compositions. */
export function MarkPieces({
  className,
  fill = "currentColor",
}: {
  className?: string;
  fill?: string;
}) {
  return (
    <svg
      className={className}
      viewBox="0 0 64 64"
      fill="none"
      aria-hidden
    >
      {/* Large piece — top-left, diagonal cut bottom-right */}
      <path
        fill={fill}
        d="M14 8c0-2.2 1.8-4 4-4h22.2c1.5 0 2.9.8 3.6 2.1L52.5 24c.5.9.4 2-.3 2.8L36.8 42.2c-.8.8-2 .9-2.9.3L16.1 30.8A4 4 0 0 1 14 27.4V8z"
      />
      {/* Small piece — bottom-right */}
      <path
        fill={fill}
        d="M38.2 40.6c.8-.8 2.1-.8 2.9 0l8.4 8.4c1.4 1.4.4 3.8-1.6 3.8H42c-2.2 0-4-1.8-4-4v-5.9c0-1.1.4-2.1 1.2-2.8l-.9-.5z"
        opacity="0.92"
      />
      <path
        fill={fill}
        d="M40.6 42.4 50.2 52H42c-1.1 0-2-.9-2-2v-5.5c0-.5.2-1 .6-1.4z"
      />
    </svg>
  );
}
