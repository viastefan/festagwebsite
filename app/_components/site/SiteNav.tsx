"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "motion/react";
import { Logo } from "../ui/Logo";
import { Button } from "../ui/Button";
import { Icon } from "../ui/Icon";
import { announcement, links, primaryNav, productMenu, resourcesMenu } from "@/lib/site/links";

const EASE = [0.16, 1, 0.3, 1] as const;
type MenuId = "product" | "resources";

export function SiteNav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const [menu, setMenu] = useState<MenuId | null>(null);
  const [lastPath, setLastPath] = useState(pathname);
  const closeTimer = useRef<number | null>(null);
  const headerRef = useRef<HTMLElement>(null);
  const [top, setTop] = useState(90);
  const measure = () => {
    const b = headerRef.current?.getBoundingClientRect().bottom;
    if (b) setTop(Math.round(b));
  };

  if (pathname !== lastPath) {
    setLastPath(pathname);
    setSheetOpen(false);
    setMenu(null);
  }

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setSheetOpen(false);
        setMenu(null);
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

  const open = (id: MenuId) => {
    measure();
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    setMenu(id);
  };
  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setMenu(null), 120);
  };

  const isActive = (href: string) => pathname === href || pathname.startsWith(`${href}/`);
  const groupActive = (id: MenuId) =>
    (id === "product" ? productMenu : resourcesMenu).some((i) => isActive(i.href));

  return (
    <>
      <div className="announce">
        <Link href={announcement.href} className="announce-link">
          <span className="announce-tag">{announcement.label}</span>
          <span className="announce-text">{announcement.text}</span>
          <Icon name="arrow" size={13} />
        </Link>
      </div>

      <header ref={headerRef} className={`nav${scrolled ? " is-scrolled" : ""}${menu ? " has-menu" : ""}`}>
        <div className="nav-inner">
          <div className="nav-left">
            <Logo />
          </div>

          <nav className="nav-center" aria-label="Hauptnavigation" onMouseLeave={scheduleClose}>
            {primaryNav.map((item) =>
              item.menu ? (
                <button
                  key={item.label}
                  type="button"
                  className="nav-link"
                  aria-expanded={menu === item.menu}
                  aria-haspopup="true"
                  aria-current={groupActive(item.menu) ? "page" : undefined}
                  onMouseEnter={() => open(item.menu!)}
                  onFocus={() => open(item.menu!)}
                  onClick={() => setMenu((m) => (m === item.menu ? null : item.menu!))}
                >
                  {item.label}
                  <Icon name="chevronDown" />
                </button>
              ) : (
                <Link
                  key={item.href}
                  href={item.href}
                  className="nav-link"
                  aria-current={isActive(item.href) ? "page" : undefined}
                  onMouseEnter={scheduleClose}
                >
                  {item.label}
                </Link>
              ),
            )}
          </nav>

          <div className="nav-right">
            <Button href={links.login} variant="text">
              Anmelden
            </Button>
            <Button href="/contact" variant="ghost">
              Demo anfragen
            </Button>
            <Button href={links.register} variant="solid">
              Kostenlos starten
            </Button>
            <button
              type="button"
              className={`nav-burger${sheetOpen ? " is-open" : ""}`}
              aria-label={sheetOpen ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={sheetOpen}
              onClick={() => {
                measure();
                setSheetOpen((v) => !v);
              }}
            >
              <span />
              <span />
            </button>
          </div>
        </div>
      </header>

      {/* Mega menu — sibling of the header so its backdrop-filter sees the page */}
      <AnimatePresence>
        {menu ? (
          <motion.div
            key="mega"
            className="mega"
            style={{ top }}
            onMouseEnter={() => open(menu)}
            onMouseLeave={scheduleClose}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22, ease: EASE }}
          >
            <div className="mega-inner">
              <div className="mega-grid">
                {(menu === "product" ? productMenu : resourcesMenu).map((item) => (
                  <Link key={item.href} href={item.href} className="mega-item">
                    <span className="mega-icon">
                      <Icon name={item.icon} size={16} />
                    </span>
                    <span>
                      <span className="mega-title">{item.label}</span>
                      <span className="mega-body">{item.body}</span>
                    </span>
                  </Link>
                ))}
              </div>
              <Link href={menu === "product" ? "/tagro" : "/changelog"} className="mega-feature">
                <span className="mega-feature-art" aria-hidden>
                  <span className="mega-feature-chip">
                    <Icon name="sparkles" size={12} /> Tagro
                  </span>
                  <span className="mega-feature-line" />
                  <span className="mega-feature-line mega-feature-line--short" />
                  <span className="mega-feature-opt">Eine Woche verschieben · Risiko −42 %</span>
                </span>
                <span className="mega-title">{menu === "product" ? "Tagro live ausprobieren" : "Was ist neu"}</span>
                <span className="mega-body">
                  {menu === "product"
                    ? "Frag den Interpreter selbst — mit Beispiel-Workspace."
                    : "Operational DNA, Executive Forecast, Cursor Agents."}
                </span>
              </Link>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      {/* Mobile — full-screen frosted sheet */}
      <AnimatePresence>
        {sheetOpen ? (
          <motion.div
            key="m"
            className="msheet"
            style={{ top }}
            role="dialog"
            aria-modal="true"
            aria-label="Menü"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            <motion.nav
              className="msheet-inner"
              initial="hidden"
              animate="show"
              variants={{ hidden: {}, show: { transition: { staggerChildren: 0.035, delayChildren: 0.05 } } }}
            >
              <MGroup label="Produkt" items={productMenu} isActive={isActive} />
              <MGroup
                label="Unternehmen"
                items={[
                  { href: "/enterprise", label: "Enterprise" },
                  { href: "/pricing", label: "Preise" },
                  { href: "/community", label: "Community" },
                ]}
                isActive={isActive}
              />
              <MGroup label="Ressourcen" items={resourcesMenu.filter((i) => i.href !== "/community")} isActive={isActive} />
              <motion.div className="msheet-cta" variants={ITEM}>
                <Button href={links.register} variant="solid" size="lg" arrow>
                  Kostenlos starten
                </Button>
                <Button href={links.login} variant="ghost" size="lg">
                  Anmelden
                </Button>
              </motion.div>
            </motion.nav>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

const ITEM = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: EASE } },
};

function MGroup({
  label,
  items,
  isActive,
}: {
  label: string;
  items: { href: string; label: string }[];
  isActive: (h: string) => boolean;
}) {
  return (
    <div className="msheet-group">
      <motion.div className="msheet-label" variants={ITEM}>
        {label}
      </motion.div>
      {items.map((i) => (
        <motion.div key={i.href} variants={ITEM}>
          <Link href={i.href} className="msheet-link" aria-current={isActive(i.href) ? "page" : undefined}>
            {i.label}
            <Icon name="arrow" size={16} />
          </Link>
        </motion.div>
      ))}
    </div>
  );
}
