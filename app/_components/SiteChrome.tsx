"use client";

import { usePathname } from "next/navigation";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";

/**
 * Home (`/`) ships its own OLED nav + footer (Vercel-style).
 * All other routes keep the classic SiteNav / SiteFooter chrome.
 */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";

  if (isHome) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-full flex flex-col flex-1 bg-white text-[#1e1e1e]">
      <SiteNav />
      <main className="lp-main flex-1">{children}</main>
      <SiteFooter />
    </div>
  );
}
