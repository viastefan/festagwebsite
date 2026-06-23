import Link from "next/link";
import type { ReactNode } from "react";

type PillVariant = "primary" | "ghost" | "white";

const VARIANT: Record<PillVariant, string> = {
  primary:
    "bg-fest-primary text-white border border-[rgba(176,177,183,0.2)] shadow-[0_4px_2px_rgba(0,0,0,0.05)] hover:bg-fest-primary-hover",
  ghost:
    "bg-transparent text-[#a3a7b1] border border-[#ebebf4] shadow-[0_2px_2px_rgba(0,0,0,0.05)] hover:border-[#d9d9d9] hover:text-[#8f93a4]",
  white:
    "bg-white text-[#1e1e1e] border border-[rgba(176,177,183,0.2)] shadow-[0_4px_2px_rgba(0,0,0,0.05)] hover:bg-[#fafafa]",
};

type PillButtonProps = {
  children: ReactNode;
  href: string;
  variant?: PillVariant;
  className?: string;
  external?: boolean;
};

export function PillButton({
  children,
  href,
  variant = "primary",
  className = "",
  external,
}: PillButtonProps) {
  const cls = `inline-flex items-center justify-center gap-2 rounded-full px-6 py-3.5 text-[14px] font-medium tracking-[0.02em] transition-colors duration-200 ${VARIANT[variant]} ${className}`;

  if (external) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}
