"use client";

import { useEffect } from "react";

/** Wheel scroll that eases in quickly, so the page feels smooth without dragging. */
export function SmoothScroll() {
  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarse = window.matchMedia("(pointer: coarse)");
    if (reduce.matches || coarse.matches) return;

    let current = window.scrollY;
    let target = window.scrollY;
    let raf = 0;
    let driving = false;

    const max = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);

    const tick = () => {
      current += (target - current) * 0.16;
      if (Math.abs(target - current) < 0.4) {
        current = target;
        driving = false;
        window.scrollTo(0, current);
        raf = 0;
        return;
      }
      window.scrollTo(0, current);
      raf = window.requestAnimationFrame(tick);
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) return;
      const node = e.target instanceof Element ? e.target : null;
      if (node?.closest(".ad, .marquee, .msheet, .mega, textarea, input, select")) return;
      e.preventDefault();
      target = Math.min(max(), Math.max(0, target + e.deltaY * 0.92));
      if (!raf) {
        driving = true;
        raf = window.requestAnimationFrame(tick);
      }
    };

    const onScroll = () => {
      if (driving) return;
      current = target = window.scrollY;
    };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
