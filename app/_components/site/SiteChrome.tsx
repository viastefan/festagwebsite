import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  return (
    <div className="site-shell">
      <a href="#main-content" className="skip-link">Zum Inhalt springen</a>
      <SiteNav />
      <main id="main-content" className="site-main">{children}</main>
      <SiteFooter />
    </div>
  );
}
