import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell">
      <SiteNav />
      <main className="site-main">{children}</main>
      <SiteFooter />
    </div>
  );
}
