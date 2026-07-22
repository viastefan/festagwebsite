/** Festag marketing home — Vercel-like structure, Festag OLED + Aeonik theme. */
export const FESTAG_HOME_STYLES = `
  .fh-root {
    --fh-canvas: #000000;
    --fh-text: #f5f5f7;
    --fh-muted: rgba(245, 245, 247, 0.62);
    --fh-faint: rgba(245, 245, 247, 0.38);
    --fh-line: rgba(255, 255, 255, 0.08);
    --fh-surface: #0c0c0e;
    --fh-surface-2: #121214;
    --fh-btn-bg: #ffffff;
    --fh-btn-fg: #1e1e20;
    --fh-btn-hover: #fafafa;
    --fh-ghost-border: rgba(255, 255, 255, 0.18);
    --fh-ghost-hover: rgba(255, 255, 255, 0.06);
    --fh-radius: 999px;
    --fh-ease: cubic-bezier(0.16, 1, 0.3, 1);

    min-height: 100dvh;
    background: var(--fh-canvas);
    color: var(--fh-text);
    font-family: var(--font-aeonik, "Aeonik"), Inter, -apple-system, BlinkMacSystemFont, sans-serif;
    font-weight: 400;
    -webkit-font-smoothing: antialiased;
    text-rendering: geometricPrecision;
    overflow-x: hidden;
  }

  .fh-root *,
  .fh-root *::before,
  .fh-root *::after { box-sizing: border-box; }

  .fh-root a { color: inherit; text-decoration: none; }
  .fh-root button {
    font: inherit;
    color: inherit;
    background: none;
    border: 0;
    cursor: pointer;
    padding: 0;
  }

  .fh-nav {
    position: sticky;
    top: 0;
    z-index: 40;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 14px clamp(18px, 4vw, 40px);
    background: rgba(0, 0, 0, 0.72);
    backdrop-filter: blur(16px) saturate(140%);
    -webkit-backdrop-filter: blur(16px) saturate(140%);
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s ease;
  }
  .fh-nav.is-scrolled { border-bottom-color: var(--fh-line); }

  .fh-nav-left {
    display: flex;
    align-items: center;
    gap: clamp(18px, 3vw, 36px);
    min-width: 0;
  }

  .fh-brand {
    display: inline-flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }
  .fh-brand-mark {
    width: 22px;
    height: 22px;
    border-radius: 6px;
    background: #0b1118;
    display: grid;
    place-items: center;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  }
  .fh-brand-mark svg { width: 14px; height: 14px; display: block; }
  .fh-brand-name {
    font-size: 15px;
    letter-spacing: -0.01em;
    color: var(--fh-text);
  }

  .fh-nav-links {
    display: flex;
    align-items: center;
    gap: 4px;
  }
  .fh-nav-link {
    padding: 8px 12px;
    border-radius: 10px;
    font-size: 13.5px;
    color: var(--fh-muted);
    transition: color 0.15s ease, background 0.15s ease;
    white-space: nowrap;
  }
  .fh-nav-link:hover {
    color: var(--fh-text);
    background: rgba(255, 255, 255, 0.04);
  }

  .fh-nav-right {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-shrink: 0;
  }

  .fh-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    height: 36px;
    padding: 0 16px;
    border-radius: var(--fh-radius);
    font-size: 13.5px;
    letter-spacing: -0.01em;
    white-space: nowrap;
    transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease, transform 0.15s var(--fh-ease);
  }
  .fh-btn:active { transform: scale(0.98); }
  .fh-btn-primary {
    background: var(--fh-btn-bg);
    color: var(--fh-btn-fg);
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.35);
  }
  .fh-btn-primary:hover { background: var(--fh-btn-hover); }
  .fh-btn-ghost {
    background: transparent;
    color: var(--fh-text);
    border: 1px solid var(--fh-ghost-border);
  }
  .fh-btn-ghost:hover { background: var(--fh-ghost-hover); }
  .fh-btn-lg {
    height: 44px;
    padding: 0 22px;
    font-size: 14.5px;
  }

  .fh-nav-menu {
    display: none;
    width: 36px;
    height: 36px;
    border-radius: 10px;
    align-items: center;
    justify-content: center;
    color: var(--fh-text);
  }
  .fh-nav-menu:hover { background: rgba(255, 255, 255, 0.06); }

  .fh-hero {
    position: relative;
    min-height: calc(100dvh - 64px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: clamp(40px, 8vh, 88px) clamp(18px, 4vw, 40px) 48px;
  }

  .fh-hero-grid {
    position: relative;
    z-index: 1;
    display: grid;
    grid-template-columns: minmax(0, 1.05fr) minmax(220px, 0.9fr) minmax(0, 0.95fr);
    align-items: center;
    gap: clamp(20px, 4vw, 48px);
    max-width: 1180px;
    margin: 0 auto;
    width: 100%;
  }

  .fh-hero-copy { max-width: 420px; }
  .fh-hero-title {
    margin: 0;
    font-size: clamp(40px, 5.6vw, 72px);
    line-height: 1.02;
    letter-spacing: -0.045em;
    font-weight: 400;
    color: var(--fh-text);
  }
  .fh-hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 28px;
  }

  .fh-hero-mark-wrap {
    position: relative;
    display: grid;
    place-items: center;
    min-height: clamp(220px, 36vw, 360px);
  }
  .fh-hero-glow {
    position: absolute;
    inset: -8% -18%;
    border-radius: 50%;
    background:
      radial-gradient(circle at 50% 48%, rgba(255, 255, 255, 0.38) 0%, rgba(232, 237, 244, 0.16) 32%, rgba(232, 237, 244, 0.04) 52%, transparent 70%);
    filter: blur(18px);
    animation: fhGlow 6.5s ease-in-out infinite;
    pointer-events: none;
  }
  .fh-hero-mark {
    position: relative;
    width: clamp(140px, 22vw, 220px);
    height: clamp(140px, 22vw, 220px);
    border-radius: 28px;
    background: linear-gradient(160deg, #141820 0%, #0b1118 100%);
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.1),
      0 0 80px rgba(232, 237, 244, 0.18),
      0 40px 80px rgba(0, 0, 0, 0.55);
    display: grid;
    place-items: center;
    animation: fhFloat 7s var(--fh-ease) infinite;
  }
  .fh-hero-mark svg {
    width: 58%;
    height: 58%;
    display: block;
  }

  .fh-hero-aside {
    display: flex;
    flex-direction: column;
    gap: 14px;
    justify-self: end;
    max-width: 260px;
    padding-top: 48px;
  }
  .fh-aside-line {
    margin: 0;
    font-size: clamp(15px, 1.5vw, 18px);
    line-height: 1.35;
    letter-spacing: -0.02em;
    color: var(--fh-text);
  }

  .fh-logos {
    position: relative;
    z-index: 1;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: clamp(22px, 4vw, 48px);
    margin: clamp(48px, 8vh, 80px) auto 0;
    max-width: 980px;
    opacity: 0.72;
  }
  .fh-logo-item {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: rgba(245, 245, 247, 0.78);
    font-size: 13px;
    letter-spacing: -0.01em;
  }
  .fh-logo-item svg { opacity: 0.9; }

  .fh-section {
    padding: clamp(72px, 12vh, 120px) clamp(18px, 4vw, 40px);
    border-top: 1px solid var(--fh-line);
  }
  .fh-section-inner {
    max-width: 1080px;
    margin: 0 auto;
  }
  .fh-section-title {
    margin: 0;
    max-width: 720px;
    font-size: clamp(28px, 4vw, 44px);
    line-height: 1.12;
    letter-spacing: -0.035em;
    font-weight: 400;
  }
  .fh-section-body {
    margin: 18px 0 0;
    max-width: 560px;
    font-size: 16.5px;
    line-height: 1.6;
    color: var(--fh-muted);
  }

  .fh-pillars {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 14px;
    margin-top: 40px;
  }
  .fh-pillar {
    background: var(--fh-surface);
    border: 1px solid var(--fh-line);
    border-radius: 22px;
    padding: 24px 22px 26px;
    min-height: 168px;
    transition: border-color 0.2s ease, background 0.2s ease;
  }
  .fh-pillar:hover {
    background: var(--fh-surface-2);
    border-color: rgba(255, 255, 255, 0.12);
  }
  .fh-pillar h3 {
    margin: 0;
    font-size: 17px;
    letter-spacing: -0.02em;
    font-weight: 400;
  }
  .fh-pillar p {
    margin: 12px 0 0;
    font-size: 14.5px;
    line-height: 1.55;
    color: var(--fh-muted);
  }

  .fh-cta-band {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding: 36px 32px;
    border-radius: 24px;
    background: var(--fh-surface);
    border: 1px solid var(--fh-line);
  }
  .fh-cta-band h2 {
    margin: 0;
    font-size: clamp(24px, 3vw, 32px);
    letter-spacing: -0.03em;
    font-weight: 400;
    max-width: 420px;
  }
  .fh-cta-band p {
    margin: 10px 0 0;
    color: var(--fh-muted);
    font-size: 15px;
    line-height: 1.5;
    max-width: 420px;
  }

  .fh-footer {
    border-top: 1px solid var(--fh-line);
    padding: 48px clamp(18px, 4vw, 40px) 56px;
  }
  .fh-footer-inner {
    max-width: 1080px;
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.2fr repeat(3, minmax(0, 1fr));
    gap: 32px;
  }
  .fh-footer-brand {
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .fh-footer-copy {
    margin: 0;
    max-width: 260px;
    font-size: 13.5px;
    line-height: 1.5;
    color: var(--fh-faint);
  }
  .fh-footer h3 {
    margin: 0 0 14px;
    font-size: 13px;
    letter-spacing: -0.01em;
    color: var(--fh-text);
    font-weight: 400;
  }
  .fh-footer ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
  }
  .fh-footer a {
    font-size: 13.5px;
    color: var(--fh-muted);
    transition: color 0.15s ease;
  }
  .fh-footer a:hover { color: var(--fh-text); }
  .fh-footer-bottom {
    max-width: 1080px;
    margin: 40px auto 0;
    padding-top: 24px;
    border-top: 1px solid var(--fh-line);
    font-size: 12.5px;
    color: var(--fh-faint);
  }

  .fh-sheet-backdrop {
    position: fixed;
    inset: 0;
    z-index: 50;
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(6px);
    -webkit-backdrop-filter: blur(6px);
    opacity: 0;
    pointer-events: none;
    transition: opacity 0.2s ease;
  }
  .fh-sheet-backdrop.is-open {
    opacity: 1;
    pointer-events: auto;
  }
  .fh-sheet {
    position: fixed;
    left: 12px;
    right: 12px;
    bottom: 12px;
    z-index: 51;
    background: var(--fh-surface-2);
    border: 1px solid var(--fh-line);
    border-radius: 22px;
    padding: 10px 16px 20px;
    transform: translateY(110%);
    transition: transform 0.28s var(--fh-ease);
  }
  .fh-sheet.is-open { transform: translateY(0); }
  .fh-sheet-grip {
    width: 36px;
    height: 4px;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.18);
    margin: 4px auto 16px;
  }
  .fh-sheet a {
    display: block;
    padding: 14px 4px;
    font-size: 16px;
    border-bottom: 1px solid var(--fh-line);
    color: var(--fh-text);
  }
  .fh-sheet a:last-of-type { border-bottom: 0; }
  .fh-sheet-cta {
    display: flex;
    margin-top: 12px;
  }
  .fh-sheet-cta .fh-btn { width: 100%; height: 44px; }

  @keyframes fhGlow {
    0%, 100% { opacity: 0.85; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.04); }
  }
  @keyframes fhFloat {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-8px); }
  }
  @keyframes fhIn {
    from { opacity: 0; transform: translateY(10px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .fh-hero-copy,
  .fh-hero-mark-wrap,
  .fh-hero-aside {
    animation: fhIn 0.7s var(--fh-ease) both;
  }
  .fh-hero-mark-wrap { animation-delay: 0.08s; }
  .fh-hero-aside { animation-delay: 0.16s; }

  @media (prefers-reduced-motion: reduce) {
    .fh-hero-glow,
    .fh-hero-mark,
    .fh-hero-copy,
    .fh-hero-mark-wrap,
    .fh-hero-aside { animation: none; }
  }

  @media (max-width: 960px) {
    .fh-nav-links { display: none; }
    .fh-nav-menu { display: inline-flex; }
    .fh-hero-grid {
      grid-template-columns: 1fr;
      text-align: left;
      gap: 36px;
    }
    .fh-hero-copy { max-width: none; }
    .fh-hero-mark-wrap { order: -1; min-height: 220px; }
    .fh-hero-aside {
      justify-self: start;
      padding-top: 0;
      max-width: none;
      gap: 10px;
    }
    .fh-pillars { grid-template-columns: 1fr; }
    .fh-footer-inner { grid-template-columns: 1fr 1fr; }
  }

  @media (max-width: 560px) {
    .fh-nav-right .fh-btn-ghost { display: none; }
    .fh-footer-inner { grid-template-columns: 1fr; }
    .fh-cta-band { padding: 28px 22px; }
  }
`
