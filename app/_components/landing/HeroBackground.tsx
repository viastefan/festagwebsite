"use client";

import { useEffect } from "react";
import { HeroDotField } from "../home/HeroDotField";

export function HeroBackground() {
  useEffect(() => {
    const hero = document.querySelector(".lp-hero") as HTMLElement | null;
    if (!hero) return;

    const onMove = (e: MouseEvent) => {
      const rect = hero.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
        onLeave();
        return;
      }

      hero.style.setProperty("--mx", `${x}px`);
      hero.style.setProperty("--my", `${y}px`);
    };

    const onLeave = () => {
      hero.style.removeProperty("--mx");
      hero.style.removeProperty("--my");
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("mousemove", onMove);
    };
  }, []);

  return (
    <>
      <div className="lp-hero-spotlight" aria-hidden />
      <div className="lp-hero-dots" aria-hidden>
        <HeroDotField variant="dark" className="lp-hero-grid" rootSelector=".lp-hero" />
      </div>
    </>
  );
}
