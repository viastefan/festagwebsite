"use client";

import { useRef, type MouseEvent } from "react";
import { MarkPieces } from "../brand/MarkPieces";

/** Large 2D Festag mark — hover lift, sheen, soft tilt */
export function FestagMarkHero() {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.setProperty("--mx", `${x * 8}deg`);
    el.style.setProperty("--my", `${-y * 8}deg`);
    el.style.setProperty("--sx", `${(x + 0.5) * 100}%`);
    el.style.setProperty("--sy", `${(y + 0.5) * 100}%`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--mx", "0deg");
    el.style.setProperty("--my", "0deg");
  };

  return (
    <div
      className="fm-hero"
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      aria-hidden
    >
      <div className="fm-hero-plate">
        <span className="fm-hero-ghost">Delivery</span>
        <div className="fm-hero-mark">
          <MarkPieces className="fm-hero-svg" />
        </div>
        <span className="fm-hero-name">Festag</span>
      </div>
      <style dangerouslySetInnerHTML={{ __html: FM_CSS }} />
    </div>
  );
}

const FM_CSS = `
  .fm-hero {
    --mx: 0deg;
    --my: 0deg;
    --sx: 50%;
    --sy: 40%;
    position: relative;
    width: 100%;
    max-width: 280px;
    aspect-ratio: 1 / 1.08;
    perspective: 900px;
  }
  .fm-hero-plate {
    position: absolute;
    inset: 0;
    border-radius: 28px;
    background:
      linear-gradient(160deg, rgba(255,255,255,0.92) 0%, rgba(247,248,248,0.55) 100%);
    border: 1px solid rgba(30, 30, 32, 0.08);
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,0.95),
      0 18px 48px rgba(30, 30, 32, 0.06);
    display: grid;
    place-items: center;
    overflow: hidden;
    transform: rotateX(var(--my)) rotateY(var(--mx)) translateZ(0);
    transition: transform 0.35s var(--ease), box-shadow 0.35s ease;
    will-change: transform;
  }
  .fm-hero:hover .fm-hero-plate {
    box-shadow:
      inset 0 1px 0 rgba(255,255,255,1),
      0 28px 64px rgba(30, 30, 32, 0.1);
  }
  .fm-hero-plate::after {
    content: "";
    position: absolute;
    inset: 0;
    background: radial-gradient(
      420px circle at var(--sx) var(--sy),
      rgba(255,255,255,0.55),
      transparent 55%
    );
    opacity: 0;
    transition: opacity 0.3s ease;
    pointer-events: none;
  }
  .fm-hero:hover .fm-hero-plate::after {
    opacity: 1;
  }
  .fm-hero-ghost {
    position: absolute;
    top: 18%;
    left: 12%;
    right: 12%;
    font-size: clamp(28px, 3.2vw, 40px);
    letter-spacing: var(--ls-display);
    color: rgba(30, 30, 32, 0.06);
    line-height: 1;
    pointer-events: none;
    user-select: none;
  }
  .fm-hero-mark {
    width: 42%;
    aspect-ratio: 1;
    color: #1e1e20;
    transform: translateY(4px) scale(1);
    transition: transform 0.4s var(--ease), color 0.3s ease;
  }
  .fm-hero:hover .fm-hero-mark {
    transform: translateY(-2px) scale(1.06);
    color: #5b647d;
  }
  .fm-hero-svg {
    width: 100%;
    height: 100%;
    display: block;
  }
  .fm-hero-name {
    position: absolute;
    bottom: 18%;
    font-size: 14px;
    letter-spacing: var(--ls-ui);
    color: var(--muted);
    transition: color 0.25s ease;
  }
  .fm-hero:hover .fm-hero-name {
    color: var(--heading);
  }
  @media (prefers-reduced-motion: reduce) {
    .fm-hero-plate,
    .fm-hero-mark {
      transition: none !important;
      transform: none !important;
    }
  }
`;
