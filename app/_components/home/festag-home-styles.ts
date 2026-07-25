/** Festag marketing home — clean product marketing, Festag slate + Geist. */
export const FESTAG_HOME_STYLES = `
  .fh-root {
    --fh-canvas: #000000;
    --fh-ink: #f4f5f7;
    --fh-muted: rgba(244, 245, 247, 0.58);
    --fh-faint: rgba(244, 245, 247, 0.34);
    --fh-line: rgba(255, 255, 255, 0.08);
    --fh-surface: #0c0c0e;
    --fh-surface-2: #121214;
    --fh-slate: #5b647d;
    --fh-slate-soft: rgba(91, 100, 125, 0.35);
    --fh-btn-bg: #f4f5f7;
    --fh-btn-fg: #0f1012;
    --fh-btn-hover: #ffffff;
    --fh-ghost-border: rgba(255, 255, 255, 0.14);
    --fh-ghost-hover: rgba(255, 255, 255, 0.05);
    --fh-radius-pill: 999px;
    --fh-radius-mark: 6px;
    --fh-radius-panel: 18px;
    --fh-ease: cubic-bezier(0.16, 1, 0.3, 1);

    min-height: 100dvh;
    background:
      radial-gradient(90% 55% at 72% 28%, rgba(91, 100, 125, 0.18) 0%, transparent 55%),
      radial-gradient(60% 40% at 18% 80%, rgba(91, 100, 125, 0.08) 0%, transparent 50%),
      var(--fh-canvas);
    color: var(--fh-ink);
    font-family: var(--font-geist-sans), var(--font-sans), system-ui, sans-serif;
    font-weight: 400;
    letter-spacing: -0.011em;
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
    background: rgba(0, 0, 0, 0.55);
    backdrop-filter: blur(18px) saturate(140%);
    -webkit-backdrop-filter: blur(18px) saturate(140%);
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
    border-radius: var(--fh-radius-mark);
    background: #0b1118;
    display: grid;
    place-items: center;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  }
  .fh-brand-mark svg { width: 13px; height: 13px; display: block; }
  .fh-brand-name {
    font-size: 15px;
    font-weight: 500;
    letter-spacing: -0.02em;
    color: var(--fh-ink);
  }

  .fh-nav-links {
    display: flex;
    align-items: center;
    gap: 2px;
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
    color: var(--fh-ink);
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
    border-radius: var(--fh-radius-pill);
    font-size: 13.5px;
    font-weight: 500;
    letter-spacing: -0.015em;
    white-space: nowrap;
    transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease, transform 0.15s var(--fh-ease);
  }
  .fh-btn:active { transform: scale(0.98); }
  .fh-btn-primary {
    background: var(--fh-btn-bg);
    color: var(--fh-btn-fg);
  }
  .fh-btn-primary:hover { background: var(--fh-btn-hover); }
  .fh-btn-ghost {
    background: transparent;
    color: var(--fh-ink);
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
    color: var(--fh-ink);
  }
  .fh-nav-menu:hover { background: rgba(255, 255, 255, 0.06); }

  /* Hero — brand first, one job */
  .fh-hero {
    position: relative;
    min-height: calc(100dvh - 64px);
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: clamp(48px, 9vh, 96px) clamp(18px, 4vw, 40px) 56px;
  }

  .fh-hero-shell {
    position: relative;
    z-index: 1;
    max-width: 1120px;
    margin: 0 auto;
    width: 100%;
    display: grid;
    grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
    gap: clamp(32px, 6vw, 72px);
    align-items: center;
  }

  .fh-hero-copy { max-width: 480px; }
  .fh-hero-brand {
    margin: 0;
    font-size: clamp(48px, 7vw, 84px);
    line-height: 0.95;
    letter-spacing: -0.055em;
    font-weight: 500;
    color: var(--fh-ink);
  }
  .fh-hero-lead {
    margin: 22px 0 0;
    max-width: 38ch;
    font-size: clamp(16px, 1.7vw, 19px);
    line-height: 1.45;
    letter-spacing: -0.02em;
    color: var(--fh-muted);
  }
  .fh-hero-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin-top: 30px;
  }

  .fh-stage {
    position: relative;
    min-height: clamp(280px, 42vw, 420px);
    display: grid;
    place-items: center;
  }
  .fh-stage-glow {
    position: absolute;
    inset: 8% 4%;
    border-radius: 50%;
    background: radial-gradient(circle at 50% 45%, var(--fh-slate-soft), transparent 68%);
    filter: blur(28px);
    animation: fhPulse 7s ease-in-out infinite;
    pointer-events: none;
  }
  .fh-stage-panel {
    position: relative;
    width: min(100%, 460px);
    border-radius: var(--fh-radius-panel);
    background: linear-gradient(165deg, #14161c 0%, #0c0c0e 100%);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow:
      0 0 0 1px rgba(91, 100, 125, 0.12),
      0 28px 80px rgba(0, 0, 0, 0.55);
    padding: 22px 22px 20px;
    animation: fhRise 0.8s var(--fh-ease) both;
  }
  .fh-stage-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    margin-bottom: 18px;
  }
  .fh-stage-kicker {
    font-size: 11px;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    color: var(--fh-faint);
  }
  .fh-stage-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    height: 24px;
    padding: 0 10px;
    border-radius: var(--fh-radius-pill);
    background: rgba(91, 100, 125, 0.22);
    color: #c8cfdd;
    font-size: 12px;
    letter-spacing: -0.01em;
  }
  .fh-stage-pill i {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #8fa0c4;
    box-shadow: 0 0 0 3px rgba(143, 160, 196, 0.18);
  }
  .fh-stage-title {
    margin: 0;
    font-size: 22px;
    letter-spacing: -0.03em;
    font-weight: 500;
  }
  .fh-stage-sub {
    margin: 8px 0 0;
    font-size: 13.5px;
    color: var(--fh-muted);
    line-height: 1.45;
  }
  .fh-stage-rows {
    display: grid;
    gap: 10px;
    margin-top: 20px;
  }
  .fh-stage-row {
    display: grid;
    grid-template-columns: 88px 1fr;
    gap: 12px;
    align-items: start;
    padding: 12px 12px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
  .fh-stage-row span {
    font-size: 12px;
    color: var(--fh-faint);
    letter-spacing: 0.04em;
    text-transform: uppercase;
  }
  .fh-stage-row p {
    margin: 0;
    font-size: 13.5px;
    line-height: 1.4;
    color: rgba(244, 245, 247, 0.88);
  }

  .fh-logos {
    position: relative;
    z-index: 1;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: clamp(18px, 3.5vw, 40px);
    margin: clamp(44px, 7vh, 72px) auto 0;
    max-width: 920px;
    opacity: 0.62;
  }
  .fh-logo-item {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: rgba(244, 245, 247, 0.78);
    font-size: 12.5px;
    letter-spacing: -0.01em;
  }

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
    letter-spacing: -0.04em;
    font-weight: 500;
  }
  .fh-section-body {
    margin: 18px 0 0;
    max-width: 54ch;
    font-size: 16.5px;
    line-height: 1.6;
    color: var(--fh-muted);
  }

  .fh-pillars {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
    margin-top: 40px;
  }
  .fh-pillar {
    background: var(--fh-surface);
    border: 1px solid var(--fh-line);
    border-radius: 16px;
    padding: 22px 20px 24px;
    min-height: 156px;
    transition: border-color 0.2s ease, background 0.2s ease;
  }
  .fh-pillar:hover {
    background: var(--fh-surface-2);
    border-color: rgba(91, 100, 125, 0.35);
  }
  .fh-pillar h3 {
    margin: 0;
    font-size: 16px;
    letter-spacing: -0.02em;
    font-weight: 500;
  }
  .fh-pillar p {
    margin: 10px 0 0;
    font-size: 14px;
    line-height: 1.55;
    color: var(--fh-muted);
  }

  .fh-cta-band {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding: 32px 30px;
    border-radius: 18px;
    background:
      linear-gradient(135deg, rgba(91, 100, 125, 0.16), transparent 55%),
      var(--fh-surface);
    border: 1px solid var(--fh-line);
  }
  .fh-cta-band h2 {
    margin: 0;
    font-size: clamp(22px, 3vw, 30px);
    letter-spacing: -0.035em;
    font-weight: 500;
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
    color: var(--fh-ink);
    font-weight: 500;
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
  .fh-footer a:hover { color: var(--fh-ink); }
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
    border-radius: 18px;
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
    color: var(--fh-ink);
  }
  .fh-sheet a:last-of-type { border-bottom: 0; }
  .fh-sheet-cta {
    display: flex;
    margin-top: 12px;
  }
  .fh-sheet-cta .fh-btn { width: 100%; height: 44px; }

  @keyframes fhPulse {
    0%, 100% { opacity: 0.75; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.04); }
  }
  @keyframes fhRise {
    from { opacity: 0; transform: translateY(14px); }
    to { opacity: 1; transform: translateY(0); }
  }
  .fh-hero-copy { animation: fhRise 0.7s var(--fh-ease) both; }

  @media (prefers-reduced-motion: reduce) {
    .fh-stage-glow,
    .fh-stage-panel,
    .fh-hero-copy { animation: none; }
  }

  @media (max-width: 960px) {
    .fh-nav-links { display: none; }
    .fh-nav-menu { display: inline-flex; }
    .fh-hero-shell {
      grid-template-columns: 1fr;
      gap: 40px;
    }
    .fh-stage { order: -1; min-height: 260px; }
    .fh-pillars { grid-template-columns: 1fr; }
    .fh-footer-inner { grid-template-columns: 1fr 1fr; }
  }

  @media (max-width: 560px) {
    .fh-nav-right .fh-btn-ghost { display: none; }
    .fh-footer-inner { grid-template-columns: 1fr; }
    .fh-cta-band { padding: 26px 20px; }
    .fh-stage-row { grid-template-columns: 1fr; gap: 4px; }
  }
`
