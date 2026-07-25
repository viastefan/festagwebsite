import Image from "next/image";

/**
 * Festag wordmark — Aeonik Regular, optical kerning.
 * Pure SVG so it inherits currentColor on dark/light surfaces.
 */
export function FestagWordmark({
  className,
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 92 22"
      className={className}
      role="img"
      aria-label="Festag"
    >
      <text
        x="0"
        y="17"
        fontFamily='var(--font-aeonik), "Aeonik", system-ui, sans-serif'
        fontWeight={400}
        fontSize="18"
        letterSpacing="-0.35"
        fill="currentColor"
      >
        Festag
      </text>
    </svg>
  );
}

/** Current Festag split-mark (PNG from festag-mvp brand). */
export function FestagMark({
  className,
  size = 28,
  priority = false,
}: {
  className?: string;
  size?: number;
  priority?: boolean;
}) {
  return (
    <Image
      src="/brand/festag-mark.png"
      alt=""
      width={size}
      height={size}
      className={className}
      priority={priority}
      quality={100}
      unoptimized
      aria-hidden
    />
  );
}

export function FestagBrandLockup({
  markSize = 22,
  className,
}: {
  markSize?: number;
  className?: string;
}) {
  return (
    <span className={className} style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
      <FestagMark size={markSize} />
      <FestagWordmark className="fh-wordmark" />
    </span>
  );
}
