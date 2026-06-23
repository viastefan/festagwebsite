"use client";

import { useEffect, useRef } from "react";

type Dot = { x: number; y: number; ox: number; oy: number };

const PRESETS = {
  light: {
    gap: 20,
    radius: 110,
    push: 18,
    dotR: 0.7,
    baseAlpha: 0,
    hoverAlpha: 0.18,
    rgb: "91, 100, 125",
  },
  dark: {
    gap: 20,
    radius: 110,
    push: 18,
    dotR: 0.7,
    baseAlpha: 0.055,
    hoverAlpha: 0.2,
    rgb: "255, 255, 255",
  },
} as const;

export function HeroDotField({
  variant = "light",
  className = "hero-dot-field",
  rootSelector,
}: {
  variant?: "light" | "dark";
  className?: string;
  rootSelector?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouseRef = useRef({ x: -9999, y: -9999, active: false });
  const dotsRef = useRef<Dot[]>([]);
  const frameRef = useRef<number>(0);
  const presetRef = useRef(PRESETS[variant]);

  useEffect(() => {
    presetRef.current = PRESETS[variant];
  }, [variant]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const layerEl = canvas.parentElement as HTMLElement | null;
    const rootEl =
      (canvas.closest(".lp-hero") ??
        (rootSelector ? canvas.closest(rootSelector) : null) ??
        layerEl) as HTMLElement | null;

    const bounds = () => {
      const box =
        layerEl?.getBoundingClientRect() ??
        rootEl?.getBoundingClientRect() ??
        canvas.getBoundingClientRect();
      return box;
    };

    const syncSize = () => {
      const box = bounds();
      if (box.width < 1 || box.height < 1) return false;

      canvas.style.width = `${box.width}px`;
      canvas.style.height = `${box.height}px`;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(box.width * dpr);
      canvas.height = Math.floor(box.height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      return true;
    };

    const buildGrid = () => {
      if (!syncSize()) return;

      const preset = presetRef.current;
      const box = bounds();
      const cols = Math.ceil(box.width / preset.gap) + 2;
      const rows = Math.ceil(box.height / preset.gap) + 2;
      const offset = preset.gap / 2;
      const dots: Dot[] = [];

      for (let row = -1; row < rows; row += 1) {
        for (let col = -1; col < cols; col += 1) {
          const x = col * preset.gap + offset;
          const y = row * preset.gap + offset;
          dots.push({ x, y, ox: x, oy: y });
        }
      }

      dotsRef.current = dots;
    };

    const draw = () => {
      const preset = presetRef.current;
      const box = bounds();

      if (box.width < 1 || box.height < 1) {
        frameRef.current = requestAnimationFrame(draw);
        return;
      }

      if (dotsRef.current.length === 0) {
        buildGrid();
      }

      ctx.clearRect(0, 0, box.width, box.height);
      const { x: mx, y: my, active } = mouseRef.current;

      for (const dot of dotsRef.current) {
        let tx = dot.ox;
        let ty = dot.oy;
        let alpha = 0;

        const fadeStart = box.height * 0.22;
        const fadeEnd = box.height * 0.5;
        const yFade =
          dot.oy <= fadeStart
            ? 1
            : dot.oy >= fadeEnd
              ? 0
              : 1 - (dot.oy - fadeStart) / (fadeEnd - fadeStart);

        if (yFade <= 0.01) {
          dot.x += (tx - dot.x) * 0.16;
          dot.y += (ty - dot.y) * 0.16;
          continue;
        }

        if (active) {
          const dx = dot.ox - mx;
          const dy = dot.oy - my;
          const dist = Math.hypot(dx, dy);
          if (dist < preset.radius && dist > 0.001) {
            const t = Math.pow(1 - dist / preset.radius, 1.5);
            const force = t * preset.push;
            tx += (dx / dist) * force;
            ty += (dy / dist) * force;
            alpha = preset.hoverAlpha * t;
          }
        }

        dot.x += (tx - dot.x) * 0.16;
        dot.y += (ty - dot.y) * 0.16;

        const displaced = Math.hypot(dot.x - dot.ox, dot.y - dot.oy);
        if (!active && displaced > 0.4) {
          alpha = Math.max(alpha, preset.hoverAlpha * Math.min(1, displaced / preset.push) * 0.45);
        }

        if (alpha <= 0.008) continue;

        alpha *= yFade;

        ctx.beginPath();
        ctx.arc(dot.x, dot.y, preset.dotR, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${preset.rgb}, ${alpha})`;
        ctx.fill();
      }

      frameRef.current = requestAnimationFrame(draw);
    };

    const onMove = (e: MouseEvent) => {
      const box = (rootEl ?? layerEl)?.getBoundingClientRect();
      if (!box) return;

      const x = e.clientX - box.left;
      const y = e.clientY - box.top;

      if (x < 0 || y < 0 || x > box.width || y > box.height) {
        mouseRef.current.active = false;
        return;
      }

      mouseRef.current = { x, y, active: true };
    };

    const refresh = () => {
      buildGrid();
    };

    let tries = 0;
    const boot = () => {
      refresh();
      if (dotsRef.current.length === 0 && tries < 40) {
        tries += 1;
        requestAnimationFrame(boot);
        return;
      }
      draw();
    };

    boot();

    const ro = new ResizeObserver(refresh);
    if (layerEl) ro.observe(layerEl);
    if (rootEl && rootEl !== layerEl) ro.observe(rootEl);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("resize", refresh);

    return () => {
      cancelAnimationFrame(frameRef.current);
      ro.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", refresh);
    };
  }, [variant, rootSelector]);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}
