import { BRAND_PATHS } from "@/lib/site/brand-logos";

/** Einfarbiges Markenzeichen. Fällt auf nichts zurück, wenn es keins gibt. */
export function BrandLogo({ name, size = 20, className }: { name: string; size?: number; className?: string }) {
  const d = BRAND_PATHS[name];
  if (!d) return null;
  return (
    <svg className={`brand-logo${className ? ` ${className}` : ""}`} viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden>
      <path d={d} />
    </svg>
  );
}

export const hasBrandLogo = (name: string) => name in BRAND_PATHS;
