/** Festag marketing home — Linear/Vercel craft, OLED, Geist. */
export const FESTAG_HOME_STYLES = `
  .fh-root {
    --fh-canvas: #000000;
    --fh-ink: #ededef;
    --fh-muted: rgba(237, 237, 239, 0.58);
    --fh-faint: rgba(237, 237, 239, 0.34);
    --fh-line: rgba(255, 255, 255, 0.08);
    --fh-surface: #0a0a0b;
    --fh-surface-2: #111113;
    --fh-slate: #5b647d;
    --fh-slate-soft: rgba(91, 100, 125, 0.32);
    --fh-btn-bg: #ededef;
    --fh-btn-fg: #0a0a0b;
    --fh-btn-hover: #ffffff;
    --fh-ghost-border: rgba(255, 255, 255, 0.14);
    --fh-ghost-hover: rgba(255, 255, 255, 0.05);
    --fh-radius-pill: 999px;
    --fh-radius-mark: 6px;
    --fh-radius-panel: 16px;
    --fh-ease: cubic-bezier(0.16, 1, 0.3, 1);

    min-height: 100dvh;
    background: var(--fh-canvas);
    color: var(--fh-ink);
    font-family: var(--font-geist-sans), system-ui, sans-serif;
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

  /* ——— Nav ——— */
  .fh-nav {
    position: sticky;
    top: 0;
    z-index: 40;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
    padding: 12px clamp(18px, 4vw, 40px);
    background: rgba(0, 0, 0, 0.62);
    backdrop-filter: blur(20px) saturate(160%);
    -webkit-backdrop-filter: blur(20px) saturate(160%);
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
    width: 28px;
    height: 28px;
    border-radius: var(--fh-radius-mark);
    overflow: hidden;
    display: grid;
    place-items: center;
    background: #000;
    box-shadow: inset 0 0 0 1px rgba(255, 255, 255, 0.08);
  }
  .fh-brand-mark img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .fh-brand-name {
    font-size: 15px;
    font-weight: 500;
    letter-spacing: -0.03em;
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
    height: 34px;
    padding: 0 15px;
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
  .fh-btn-ask {
    background: rgba(91, 100, 125, 0.18);
    color: rgba(237, 237, 239, 0.92);
    border: 1px solid rgba(91, 100, 125, 0.32);
  }
  .fh-btn-ask:hover {
    background: rgba(91, 100, 125, 0.28);
    border-color: rgba(91, 100, 125, 0.45);
  }
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

  /* ——— Hero ——— */
  .fh-hero {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: clamp(48px, 10vh, 96px) clamp(18px, 4vw, 40px) clamp(36px, 6vh, 56px);
    overflow: hidden;
  }

  .fh-hero-orbit {
    position: relative;
    width: min(100%, 480px);
    height: clamp(200px, 32vw, 280px);
    display: grid;
    place-items: center;
    margin-bottom: clamp(28px, 5vh, 44px);
  }
  .fh-hero-glow {
    position: absolute;
    inset: -18% -28%;
    border-radius: 50%;
    background:
      radial-gradient(circle at 50% 42%, rgba(255, 255, 255, 0.2) 0%, transparent 42%),
      radial-gradient(circle at 50% 50%, rgba(91, 100, 125, 0.38) 0%, transparent 60%);
    filter: blur(32px);
    animation: fhPulse 8s ease-in-out infinite;
    pointer-events: none;
  }
  .fh-hero-ring {
    position: absolute;
    width: clamp(168px, 26vw, 236px);
    height: clamp(168px, 26vw, 236px);
    border-radius: 28%;
    background: radial-gradient(circle at 40% 30%, rgba(255,255,255,0.08), transparent 55%);
    box-shadow:
      inset 0 0 0 1px rgba(255, 255, 255, 0.1),
      0 0 80px rgba(91, 100, 125, 0.18);
    pointer-events: none;
  }
  .fh-hero-mark-wrap {
    position: relative;
    width: clamp(132px, 22vw, 188px);
    height: clamp(132px, 22vw, 188px);
    border-radius: 22%;
    overflow: hidden;
    background: #000;
    box-shadow:
      0 0 0 1px rgba(255, 255, 255, 0.14),
      0 0 0 8px rgba(255, 255, 255, 0.03),
      0 32px 90px rgba(0, 0, 0, 0.7),
      0 0 70px rgba(180, 190, 210, 0.18);
    animation: fhRise 0.9s var(--fh-ease) both;
  }
  .fh-hero-mark {
    width: 100% !important;
    height: 100% !important;
    object-fit: cover;
    display: block;
    transform: scale(1.02);
  }

  .fh-hero-copy {
    position: relative;
    z-index: 1;
    max-width: 820px;
    animation: fhRise 0.85s var(--fh-ease) 0.08s both;
  }
  .fh-hero-title {
    margin: 0;
    font-size: clamp(40px, 7.2vw, 72px);
    line-height: 1.02;
    letter-spacing: -0.055em;
    font-weight: 500;
    color: var(--fh-ink);
  }
  .fh-hero-title span {
    color: rgba(237, 237, 239, 0.42);
  }
  .fh-hero-lead {
    margin: 22px auto 0;
    max-width: 46ch;
    font-size: clamp(16px, 1.7vw, 19px);
    line-height: 1.5;
    letter-spacing: -0.02em;
    color: var(--fh-muted);
  }
  .fh-hero-actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-top: 32px;
  }

  /* ——— Product stage ——— */
  .fh-stage-section {
    padding: 0 clamp(18px, 4vw, 40px) clamp(48px, 8vh, 80px);
  }
  .fh-stage-frame {
    max-width: 1080px;
    margin: 0 auto;
    border-radius: 18px;
    overflow: hidden;
    background: linear-gradient(180deg, #151518 0%, #0c0c0e 100%);
    border: 1px solid rgba(255, 255, 255, 0.08);
    box-shadow:
      0 0 0 1px rgba(91, 100, 125, 0.08),
      0 40px 100px rgba(0, 0, 0, 0.55);
    animation: fhRise 1s var(--fh-ease) 0.12s both;
  }
  .fh-stage-chrome {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 12px 16px;
    border-bottom: 1px solid var(--fh-line);
    background: rgba(255, 255, 255, 0.02);
  }
  .fh-stage-dots {
    display: inline-flex;
    gap: 6px;
  }
  .fh-stage-dots i {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.12);
  }
  .fh-stage-url {
    font-size: 12px;
    color: var(--fh-faint);
    letter-spacing: -0.01em;
  }
  .fh-stage-body {
    display: grid;
    grid-template-columns: 188px 1fr;
    min-height: 340px;
  }
  .fh-stage-rail {
    padding: 18px 12px;
    border-right: 1px solid var(--fh-line);
    background: rgba(0, 0, 0, 0.28);
  }
  .fh-stage-rail-brand {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 8px 16px;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: -0.02em;
  }
  .fh-stage-rail-brand img {
    border-radius: 5px;
  }
  .fh-stage-rail-item {
    padding: 9px 10px;
    border-radius: 8px;
    font-size: 13px;
    color: var(--fh-faint);
    margin-bottom: 2px;
  }
  .fh-stage-rail-item.is-active {
    background: rgba(255, 255, 255, 0.06);
    color: var(--fh-ink);
  }
  .fh-stage-main {
    padding: 24px 24px 28px;
  }
  .fh-stage-top {
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 22px;
  }
  .fh-stage-title {
    margin: 0;
    font-size: 24px;
    letter-spacing: -0.035em;
    font-weight: 500;
  }
  .fh-stage-sub {
    margin: 8px 0 0;
    font-size: 14px;
    color: var(--fh-muted);
    line-height: 1.45;
    max-width: 42ch;
  }
  .fh-stage-pill {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    height: 26px;
    padding: 0 11px;
    border-radius: var(--fh-radius-pill);
    background: rgba(91, 100, 125, 0.22);
    color: #c8cfdd;
    font-size: 12px;
    letter-spacing: -0.01em;
    flex-shrink: 0;
  }
  .fh-stage-pill i {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #8fa0c4;
    box-shadow: 0 0 0 3px rgba(143, 160, 196, 0.18);
  }
  .fh-stage-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  .fh-stage-card {
    padding: 16px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
  .fh-stage-card--wide { grid-column: 1 / -1; }
  .fh-stage-card h3 {
    margin: 0;
    font-size: 12px;
    font-weight: 500;
    color: var(--fh-faint);
    letter-spacing: -0.01em;
  }
  .fh-stage-card p {
    margin: 8px 0 0;
    font-size: 14.5px;
    line-height: 1.45;
    color: rgba(237, 237, 239, 0.9);
  }

  /* ——— Logos ——— */
  .fh-logos {
    padding: 8px clamp(18px, 4vw, 40px) clamp(56px, 9vh, 88px);
    text-align: center;
  }
  .fh-logos-label {
    margin: 0 0 22px;
    font-size: 13px;
    color: var(--fh-faint);
    letter-spacing: -0.01em;
  }
  .fh-logos-row {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    gap: clamp(20px, 3.5vw, 44px);
    max-width: 920px;
    margin: 0 auto;
    opacity: 0.7;
  }
  .fh-logo-item {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    color: rgba(237, 237, 239, 0.78);
    font-size: 13px;
    letter-spacing: -0.01em;
  }

  /* ——— Sections ——— */
  .fh-section {
    padding: clamp(72px, 12vh, 120px) clamp(18px, 4vw, 40px);
    border-top: 1px solid var(--fh-line);
  }
  .fh-section-inner {
    max-width: 1080px;
    margin: 0 auto;
  }
  .fh-center { text-align: center; }
  .fh-section-title {
    margin: 0;
    max-width: 720px;
    font-size: clamp(28px, 4vw, 44px);
    line-height: 1.12;
    letter-spacing: -0.04em;
    font-weight: 500;
  }
  .fh-center .fh-section-title { margin-left: auto; margin-right: auto; }
  .fh-section-body {
    margin: 18px 0 0;
    max-width: 54ch;
    font-size: 16.5px;
    line-height: 1.6;
    color: var(--fh-muted);
  }
  .fh-center .fh-section-body { margin-left: auto; margin-right: auto; }

  .fh-statement {
    margin: 0 auto;
    max-width: 820px;
    font-size: clamp(28px, 4.4vw, 48px);
    line-height: 1.14;
    letter-spacing: -0.045em;
    font-weight: 500;
  }
  .fh-statement span {
    color: rgba(237, 237, 239, 0.42);
  }

  .fh-pillars {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
    margin-top: 48px;
    text-align: left;
  }
  .fh-pillar {
    background: var(--fh-surface);
    border: 1px solid var(--fh-line);
    border-radius: 16px;
    padding: 22px 20px 24px;
    min-height: 148px;
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

  /* ——— Surfaces ——— */
  .fh-surfaces {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
    margin-top: 40px;
  }
  .fh-surface {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 16px;
    padding: 22px;
    border-radius: 18px;
    background: var(--fh-surface);
    border: 1px solid var(--fh-line);
    transition: border-color 0.2s ease, background 0.2s ease, transform 0.2s var(--fh-ease);
    min-height: 200px;
  }
  .fh-surface:hover {
    background: var(--fh-surface-2);
    border-color: rgba(91, 100, 125, 0.4);
    transform: translateY(-1px);
  }
  .fh-surface-copy {
    display: flex;
    flex-direction: column;
    min-width: 0;
  }
  .fh-surface-copy h3 {
    margin: 0;
    font-size: 18px;
    letter-spacing: -0.03em;
    font-weight: 500;
  }
  .fh-surface-copy p {
    margin: 10px 0 0;
    font-size: 14px;
    line-height: 1.55;
    color: var(--fh-muted);
    flex: 1;
  }
  .fh-surface-link {
    margin-top: 16px;
    font-size: 13px;
    color: rgba(237, 237, 239, 0.72);
    letter-spacing: -0.01em;
  }
  .fh-surface:hover .fh-surface-link { color: var(--fh-ink); }
  .fh-surface-visual {
    min-width: 0;
    display: flex;
  }

  .fh-mini {
    flex: 1;
    width: 100%;
    border-radius: 12px;
    background: rgba(0, 0, 0, 0.45);
    border: 1px solid rgba(255, 255, 255, 0.06);
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 8px;
  }
  .fh-mini-bar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    font-size: 11px;
    color: var(--fh-faint);
  }
  .fh-mini-bar em {
    font-style: normal;
    color: #a8b0c4;
  }
  .fh-mini-metric strong {
    display: block;
    font-size: 16px;
    font-weight: 500;
    letter-spacing: -0.02em;
  }
  .fh-mini-metric p,
  .fh-mini-row p,
  .fh-mini-quote {
    margin: 4px 0 0;
    font-size: 12px;
    line-height: 1.45;
    color: var(--fh-muted);
  }
  .fh-mini-quote { margin: 4px 0 0; }
  .fh-mini-row {
    padding: 8px;
    border-radius: 8px;
    background: rgba(255, 255, 255, 0.03);
  }
  .fh-mini-row.is-active {
    background: rgba(91, 100, 125, 0.18);
  }
  .fh-mini-row b {
    display: block;
    font-size: 12.5px;
    font-weight: 500;
    letter-spacing: -0.015em;
  }
  .fh-mini-bars {
    display: flex;
    align-items: flex-end;
    gap: 5px;
    height: 48px;
    margin-top: auto;
    padding-top: 8px;
  }
  .fh-mini-bars i {
    flex: 1;
    border-radius: 4px 4px 2px 2px;
    background: linear-gradient(180deg, rgba(168, 176, 196, 0.55), rgba(91, 100, 125, 0.2));
  }

  /* ——— GitHub ——— */
  .fh-github {
    display: grid;
    grid-template-columns: minmax(0, 1.05fr) minmax(0, 0.95fr);
    gap: clamp(28px, 5vw, 56px);
    align-items: center;
  }
  .fh-github .fh-hero-actions {
    justify-content: flex-start;
    margin-top: 28px;
  }
  .fh-github-card {
    border-radius: 18px;
    background: var(--fh-surface);
    border: 1px solid var(--fh-line);
    padding: 22px;
    box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35);
  }
  .fh-github-card-top {
    display: flex;
    align-items: center;
    gap: 10px;
    font-size: 13.5px;
    color: var(--fh-muted);
    margin-bottom: 16px;
  }
  .fh-github-pr {
    padding: 14px;
    border-radius: 12px;
    background: rgba(255, 255, 255, 0.03);
    border: 1px solid rgba(255, 255, 255, 0.05);
  }
  .fh-github-pr b {
    display: block;
    font-size: 14.5px;
    font-weight: 500;
    letter-spacing: -0.02em;
  }
  .fh-github-pr p {
    margin: 6px 0 0;
    font-size: 12.5px;
    color: var(--fh-faint);
  }
  .fh-github-signal {
    margin-top: 10px;
    padding: 14px;
    border-radius: 12px;
    background: rgba(91, 100, 125, 0.16);
    border: 1px solid rgba(91, 100, 125, 0.28);
  }
  .fh-github-signal span {
    display: block;
    font-size: 11px;
    color: #a8b0c4;
    letter-spacing: -0.01em;
  }
  .fh-github-signal p {
    margin: 6px 0 0;
    font-size: 13.5px;
    line-height: 1.45;
    color: rgba(237, 237, 239, 0.9);
  }

  /* ——— CTA ——— */
  .fh-cta-band {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 24px;
    padding: 36px 32px;
    border-radius: 20px;
    background:
      radial-gradient(80% 120% at 0% 0%, rgba(91, 100, 125, 0.22), transparent 55%),
      var(--fh-surface);
    border: 1px solid var(--fh-line);
  }
  .fh-cta-band h2 {
    margin: 0;
    font-size: clamp(24px, 3.2vw, 34px);
    letter-spacing: -0.04em;
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
  .fh-cta-actions {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  /* ——— Footer ——— */
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

  /* ——— Mobile sheet ——— */
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
    flex-direction: column;
    gap: 8px;
    margin-top: 12px;
  }
  .fh-sheet-cta .fh-btn { width: 100%; height: 44px; }

  @keyframes fhPulse {
    0%, 100% { opacity: 0.72; transform: scale(1); }
    50% { opacity: 1; transform: scale(1.05); }
  }
  @keyframes fhRise {
    from { opacity: 0; transform: translateY(16px); }
    to { opacity: 1; transform: translateY(0); }
  }

  @media (prefers-reduced-motion: reduce) {
    .fh-hero-glow,
    .fh-hero-mark-wrap,
    .fh-hero-copy,
    .fh-stage-frame { animation: none; }
  }

  @media (max-width: 960px) {
    .fh-nav-links { display: none; }
    .fh-nav-menu { display: inline-flex; }
    .fh-stage-body { grid-template-columns: 1fr; }
    .fh-stage-rail { display: none; }
    .fh-pillars { grid-template-columns: 1fr; }
    .fh-surfaces { grid-template-columns: 1fr; }
    .fh-surface { grid-template-columns: 1fr; }
    .fh-github { grid-template-columns: 1fr; }
    .fh-footer-inner { grid-template-columns: 1fr 1fr; }
  }

  @media (max-width: 560px) {
    .fh-nav-right .fh-btn-ghost { display: none; }
    .fh-nav-right .fh-btn-ask { display: none; }
    .fh-footer-inner { grid-template-columns: 1fr; }
    .fh-cta-band { padding: 26px 20px; }
    .fh-stage-grid { grid-template-columns: 1fr; }
    .fh-stage-card--wide { grid-column: auto; }
    .fh-hero-title { font-size: clamp(34px, 10vw, 44px); }
  }
`
