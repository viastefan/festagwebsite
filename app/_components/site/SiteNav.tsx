"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "../ui/Logo";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { links, primaryNav, resourcesMenu } from "@/lib/site/links";

const EASE = [0.16, 1, 0.3, 1] as const;

export function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [lastPath, setLastPath] = useState(pathname);
  const closeTimer = useRef<number | null>(null);

  // Close overlays on route change (render-time state sync, no effect needed).
  if (pathname !== lastPath) {
    setLastPath(pathname);
    setSheetOpen(false);
    setMenuOpen(false);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSheetOpen(false);
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    document.documentElement.style.overflow = sheetOpen ? "hidden" : "";
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [sheetOpen]);

  const openMenu = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setMenuOpen(true);
  };
  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMenuOpen(false), 140);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const resourcesActive = resourcesMenu.some((i) => isActive(i.href));

  return (
    <>
      <header className={`nav${scrolled ? " is-scrolled" : ""}`}>
        <div className="nav-inner">
          <div className="nav-left">
            <Logo />
          </div>

          <nav className="nav-center" aria-label="Hauptnavigation">
            {primaryNav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="nav-link"
                aria-current={isActive(item.href) ? "page" : undefined}
              >
                {item.label}
              </Link>
            ))}
            <div className="nav-dd" onMouseEnter={openMenu} onMouseLeave={scheduleClose}>
              <button
                type="button"
                className="nav-link"
                aria-expanded={menuOpen}
                aria-haspopup="true"
                aria-current={resourcesActive ? "page" : undefined}
                onClick={() => setMenuOpen((v) => !v)}
                onFocus={openMenu}
              >
                Ressourcen
                <Icon name="chevronDown" />
              </button>
              <AnimatePresence>
                {menuOpen ? (
                  <motion.div
                    className="nav-menu"
                    role="menu"
                    initial={{ opacity: 0, y: -6, scale: 0.98, x: "-50%" }}
                    animate={{ opacity: 1, y: 0, scale: 1, x: "-50%" }}
                    exit={{ opacity: 0, y: -4, scale: 0.98, x: "-50%" }}
                    transition={{ duration: 0.2, ease: EASE }}
                    style={{ transformOrigin: "top center" }}
                  >
                    {resourcesMenu.map((item) => (
                      <Link key={item.href} href={item.href} className="nav-menu-item" role="menuitem">
                        <span className="nav-menu-icon">
                          <Icon name={item.icon} />
                        </span>
                        <span>
                          <span className="nav-menu-title">{item.label}</span>
                          <span className="nav-menu-body" style={{ display: "block" }}>
                            {item.body}
                          </span>
                        </span>
                      </Link>
                    ))}
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </div>
          </nav>

          <div className="nav-right">
            <Button href={links.login} variant="text">
              Anmelden
            </Button>
            <Button href="/contact" variant="ghost">
              Vertrieb kontaktieren
            </Button>
            <Button href={links.register} variant="solid">
              Kostenlos starten
            </Button>
            <button
              type="button"
              className="nav-burger"
              aria-label="Menü öffnen"
              aria-expanded={sheetOpen}
              onClick={() => setSheetOpen(true)}
            >
              <Icon name="menu" />
            </button>
          </div>
        </div>
      </header>

      <div
        className={`sheet-backdrop${sheetOpen ? " is-open" : ""}`}
        onClick={() => setSheetOpen(false)}
        aria-hidden
      />
      <div
        className={`sheet${sheetOpen ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Menü"
        aria-hidden={!sheetOpen}
        inert={!sheetOpen}
      >
        <div className="sheet-grip" />
        <div className="sheet-group">
          <div className="sheet-label">Produkt</div>
          {primaryNav.map((item) => (
            <Link key={item.href} href={item.href} className="sheet-link">
              {item.label}
              <Icon name="arrow" size={16} />
            </Link>
          ))}
        </div>
        <div className="sheet-group">
          <div className="sheet-label">Ressourcen</div>
          {resourcesMenu.map((item) => (
            <Link key={item.href} href={item.href} className="sheet-link">
              {item.label}
              <Icon name="arrow" size={16} />
            </Link>
          ))}
        </div>
        <div className="sheet-cta">
          <Button href={links.register} variant="solid">
            Kostenlos starten
          </Button>
          <Button href={links.login} variant="ghost">
            Anmelden
          </Button>
        </div>
      </div>
    </>
  );
}
