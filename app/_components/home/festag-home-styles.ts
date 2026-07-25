/** Festag marketing home — light Vercel-grade, full-bleed, serious. */
export const FESTAG_HOME_STYLES = `
  .fh-root {
    --fh-canvas: #f7f7f8;
    --fh-surface: #ffffff;
    --fh-ink: #0a0a0b;
    --fh-muted: #5c5c62;
    --fh-faint: #8a8a91;
    --fh-line: rgba(15, 15, 17, 0.08);
    --fh-line-strong: rgba(15, 15, 17, 0.12);
    --fh-slate: #5b647d;
    --fh-shadow: 0 1px 2px rgba(15, 15, 17, 0.04), 0 18px 48px rgba(15, 15, 17, 0.06);
    --fh-shadow-soft: 0 1px 2px rgba(15, 15, 17, 0.03), 0 12px 32px rgba(15, 15, 17, 0.05);
    --fh-radius: 14px;
    --fh-ease: cubic-bezier(0.16, 1, 0.3, 1);
    --fh-max: 1240px;

    min-height: 100dvh;
    background: var(--fh-canvas);
    color: var(--fh-ink);
    font-family: var(--font-aeonik), "Aeonik", system-ui, sans-serif;
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
    background: rgba(247, 247, 248, 0.82);
    backdrop-filter: blur(16px) saturate(140%);
    -webkit-backdrop-filter: blur(16px) saturate(140%);
    border-bottom: 1px solid transparent;
    transition: border-color 0.2s ease, background 0.2s ease;
  }
  .fh-nav.is-scrolled {
    border-bottom-color: var(--fh-line);
    background: rgba(247, 247, 248, 0.92);
  }
  .fh-nav-inner {
    max-width: var(--fh-max);
    margin: 0 auto;
    padding: 12px clamp(20px, 4vw, 40px);
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 20px;
  }
  .fh-nav-left {
    display: flex;
    align-items: center;
    gap: clamp(20px, 3vw, 40px);
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
    border-radius: 7px;
    overflow: hidden;
    background: #000;
    box-shadow: inset 0 0 0 1px rgba(255,255,255,0.08);
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
  }
  .fh-nav-links {
    display: flex;
    align-items: center;
    gap: 2px;
  }
  .fh-nav-link {
    padding: 8px 11px;
    border-radius: 8px;
    font-size: 13.5px;
    color: var(--fh-muted);
    transition: color 0.15s ease, background 0.15s ease;
    white-space: nowrap;
  }
  .fh-nav-link:hover {
    color: var(--fh-ink);
    background: rgba(15, 15, 17, 0.04);
  }
  .fh-nav-right {
    display: flex;
    align-items: center;
    gap: 8px;
    flex-shrink: 0;
  }

  .fh-btn {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    height: 34px;
    padding: 0 14px;
    border-radius: 8px;
    font-size: 13px;
    font-weight: 500;
    letter-spacing: -0.01em;
    white-space: nowrap;
    transition: background 0.15s ease, border-color 0.15s ease, color 0.15s ease, transform 0.15s var(--fh-ease);
  }
  .fh-btn:active { transform: scale(0.98); }
  .fh-btn-outline {
    background: var(--fh-surface);
    color: var(--fh-ink);
    border: 1px solid var(--fh-line-strong);
    box-shadow: 0 1px 1px rgba(15, 15, 17, 0.02);
  }
  .fh-btn-outline:hover {
    background: #fafafa;
    border-color: rgba(15, 15, 17, 0.16);
  }
  .fh-btn-solid {
    background: var(--fh-ink);
    color: #fafafa;
    border: 1px solid transparent;
  }
  .fh-btn-solid:hover { background: #1a1a1c; }
  .fh-btn-lg {
    height: 44px;
    padding: 0 20px;
    font-size: 14.5px;
    border-radius: 10px;
  }

  .fh-nav-menu {
    display: none;
    width: 36px;
    height: 36px;
    border-radius: 8px;
    align-items: center;
    justify-content: center;
  }
  .fh-nav-menu:hover { background: rgba(15, 15, 17, 0.05); }

  /* ——— Hero ——— */
  .fh-hero {
    padding: clamp(56px, 10vh, 104px) clamp(20px, 4vw, 40px) clamp(64px, 10vh, 96px);
  }
  .fh-hero-inner {
    max-width: 820px;
    margin: 0 auto;
    text-align: center;
  }
  .fh-hero-logo {
    position: relative;
    width: 120px;
    height: 120px;
    margin: 0 auto 36px;
  }
  .fh-hero-logo-glow {
    position: absolute;
    inset: -28%;
    border-radius: 50%;
    background: radial-gradient(circle, rgba(91,100,125,0.18) 0%, transparent 65%);
    filter: blur(18px);
    pointer-events: none;
  }
  .fh-hero-logo-img {
    position: relative;
    width: 100% !important;
    height: 100% !important;
    object-fit: cover;
    border-radius: 26%;
    box-shadow:
      0 0 0 1px rgba(15,15,17,0.08),
      0 24px 60px rgba(15,15,17,0.14);
    background: #000;
  }
  .fh-hero-title {
    margin: 0;
    font-size: clamp(40px, 6.5vw, 64px);
    line-height: 1.05;
    letter-spacing: -0.055em;
    font-weight: 560;
  }
  .fh-hero-lead {
    margin: 22px auto 0;
    max-width: 48ch;
    font-size: clamp(16px, 1.6vw, 18.5px);
    line-height: 1.55;
    color: var(--fh-muted);
    letter-spacing: -0.02em;
  }
  .fh-hero-actions {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
    margin-top: 32px;
  }
  .fh-hero-actions--left { justify-content: flex-start; }
  .fh-hero-note {
    margin: 22px 0 0;
    font-size: 13.5px;
    color: var(--fh-faint);
  }

  /* ——— Bands ——— */
  .fh-band {
    padding: clamp(72px, 11vh, 120px) clamp(20px, 4vw, 40px);
    border-top: 1px solid var(--fh-line);
  }
  .fh-band--tight { padding-block: clamp(56px, 8vh, 88px); }
  .fh-band--muted { background: #f0f0f2; }
  .fh-band--cta {
    background: var(--fh-surface);
  }
  .fh-band-inner {
    max-width: var(--fh-max);
    margin: 0 auto;
  }
  .fh-center { text-align: center; }
  .fh-band-title {
    margin: 0 0 clamp(36px, 5vh, 56px);
    max-width: 18ch;
    font-size: clamp(32px, 4.6vw, 52px);
    line-height: 1.08;
    letter-spacing: -0.048em;
    font-weight: 560;
  }
  .fh-band-title--sm {
    max-width: 22ch;
    font-size: clamp(28px, 3.8vw, 40px);
  }
  .fh-center .fh-band-title {
    margin-left: auto;
    margin-right: auto;
  }
  .fh-band-lead {
    margin: 14px 0 0;
    max-width: 46ch;
    font-size: 16px;
    line-height: 1.6;
    color: var(--fh-muted);
  }
  .fh-band-lead--center {
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 28px;
  }

  /* ——— Tagro trio ——— */
  .fh-trio {
    display: grid;
    grid-template-columns: 0.7fr 1.35fr 0.95fr;
    gap: clamp(20px, 3vw, 36px);
    align-items: center;
  }
  .fh-trio-side--left {
    display: flex;
    justify-content: flex-end;
  }
  .fh-ghost-card {
    width: min(100%, 180px);
    aspect-ratio: 0.85;
    border-radius: 16px;
    background: rgba(255,255,255,0.55);
    border: 1px solid var(--fh-line);
    box-shadow: var(--fh-shadow-soft);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 12px;
    opacity: 0.72;
    transform: rotate(-4deg);
  }
  .fh-ghost-card span {
    font-size: 13px;
    color: var(--fh-muted);
  }
  .fh-chat-card {
    background: var(--fh-surface);
    border: 1px solid var(--fh-line);
    border-radius: 18px;
    box-shadow: var(--fh-shadow);
    overflow: hidden;
  }
  .fh-chat-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 12px 14px;
    border-bottom: 1px solid var(--fh-line);
    font-size: 13px;
    color: var(--fh-muted);
  }
  .fh-chat-icons {
    display: inline-flex;
    gap: 8px;
  }
  .fh-chat-icons i {
    width: 14px;
    height: 14px;
    border-radius: 3px;
    background: rgba(15,15,17,0.08);
  }
  .fh-chat-body {
    padding: 28px 22px 18px;
  }
  .fh-chat-body img {
    border-radius: 8px;
    margin-bottom: 14px;
  }
  .fh-chat-body h3 {
    margin: 0;
    font-size: 22px;
    letter-spacing: -0.03em;
    font-weight: 560;
  }
  .fh-chat-body ul {
    list-style: none;
    margin: 18px 0 0;
    padding: 0;
    display: grid;
    gap: 10px;
  }
  .fh-chat-body li {
    padding: 10px 12px;
    border-radius: 10px;
    background: #f4f4f5;
    font-size: 13.5px;
    color: var(--fh-muted);
  }
  .fh-chat-input {
    margin: 8px 14px 14px;
    display: flex;
    align-items: center;
    gap: 10px;
    padding: 10px 12px;
    border-radius: 999px;
    border: 1px solid var(--fh-line-strong);
    background: #fafafa;
    font-size: 13px;
    color: var(--fh-faint);
  }
  .fh-chip {
    display: inline-flex;
    align-items: center;
    height: 24px;
    padding: 0 9px;
    border-radius: 999px;
    background: #eeeef0;
    color: var(--fh-ink);
    font-size: 12px;
    white-space: nowrap;
  }
  .fh-side-copy {
    margin: 0 0 22px;
    font-size: 15.5px;
    line-height: 1.55;
    color: var(--fh-muted);
  }
  .fh-feat-block { }
  .fh-feat-label {
    font-size: 12px;
    color: var(--fh-faint);
    margin-bottom: 10px;
    letter-spacing: -0.01em;
  }
  .fh-feat-block ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 8px;
  }
  .fh-feat-block li {
    font-size: 14.5px;
    letter-spacing: -0.015em;
    color: var(--fh-ink);
  }

  /* ——— Install steps ——— */
  .fh-split {
    display: grid;
    grid-template-columns: minmax(0, 0.95fr) minmax(0, 1.05fr);
    gap: clamp(28px, 5vw, 64px);
    align-items: start;
  }
  .fh-split .fh-band-title { margin-bottom: 0; }
  .fh-steps {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 0;
    background: var(--fh-surface);
    border: 1px solid var(--fh-line);
    border-radius: 18px;
    overflow: hidden;
    box-shadow: var(--fh-shadow-soft);
  }
  .fh-steps li {
    display: grid;
    grid-template-columns: 52px 1fr;
    gap: 14px;
    padding: 18px 18px;
    border-bottom: 1px solid var(--fh-line);
  }
  .fh-steps li:last-child { border-bottom: 0; }
  .fh-steps span {
    font-size: 13px;
    color: var(--fh-faint);
    font-variant-numeric: tabular-nums;
    padding-top: 2px;
  }
  .fh-steps strong {
    display: block;
    font-size: 15px;
    font-weight: 500;
    letter-spacing: -0.02em;
  }
  .fh-steps p {
    margin: 6px 0 0;
    font-size: 13.5px;
    line-height: 1.5;
    color: var(--fh-muted);
  }

  /* ——— Feature rows ——— */
  .fh-feature-row {
    display: grid;
    grid-template-columns: minmax(240px, 0.85fr) minmax(0, 1.35fr);
    gap: clamp(24px, 4vw, 48px);
    align-items: start;
  }
  .fh-feature-row--rev {
    grid-template-columns: minmax(0, 1.25fr) minmax(240px, 0.9fr);
  }
  .fh-feature-copy p {
    margin: 0 0 22px;
    font-size: 15.5px;
    line-height: 1.55;
    color: var(--fh-muted);
  }
  .fh-text-link {
    display: inline-flex;
    margin-top: 22px;
    font-size: 14px;
    font-weight: 500;
    color: var(--fh-ink);
  }
  .fh-text-link:hover { opacity: 0.7; }

  .fh-product-frame {
    background: var(--fh-surface);
    border: 1px solid var(--fh-line);
    border-radius: 18px;
    overflow: hidden;
    box-shadow: var(--fh-shadow);
  }
  .fh-product-chrome {
    display: flex;
    align-items: center;
    gap: 12px;
    padding: 11px 14px;
    border-bottom: 1px solid var(--fh-line);
    background: #fafafa;
    font-size: 12px;
    color: var(--fh-faint);
  }
  .fh-dots {
    display: inline-flex;
    gap: 5px;
  }
  .fh-dots i {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: rgba(15,15,17,0.12);
  }
  .fh-product-body {
    display: grid;
    grid-template-columns: 168px 1fr;
    min-height: 320px;
  }
  .fh-product-rail {
    padding: 14px 10px;
    border-right: 1px solid var(--fh-line);
    background: #fbfbfc;
    font-size: 13px;
    color: var(--fh-faint);
  }
  .fh-product-rail-brand {
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 4px 8px 14px;
    color: var(--fh-ink);
    font-weight: 500;
  }
  .fh-product-rail-brand img { border-radius: 5px; }
  .fh-product-rail > div:not(.fh-product-rail-brand) {
    padding: 8px 10px;
    border-radius: 8px;
    margin-bottom: 2px;
  }
  .fh-product-rail .is-active {
    background: rgba(15,15,17,0.05);
    color: var(--fh-ink);
  }
  .fh-product-main { padding: 22px; }
  .fh-product-head {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    margin-bottom: 18px;
  }
  .fh-product-head h3 {
    margin: 0;
    font-size: 22px;
    letter-spacing: -0.03em;
    font-weight: 560;
  }
  .fh-product-head p {
    margin: 6px 0 0;
    font-size: 13.5px;
    color: var(--fh-muted);
  }
  .fh-pill {
    height: 26px;
    padding: 0 11px;
    border-radius: 999px;
    background: rgba(91,100,125,0.12);
    color: var(--fh-slate);
    font-size: 12px;
    display: inline-flex;
    align-items: center;
    flex-shrink: 0;
  }
  .fh-product-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
  }
  .fh-product-grid article {
    padding: 14px;
    border-radius: 12px;
    background: #f6f6f7;
    border: 1px solid var(--fh-line);
  }
  .fh-product-grid .fh-span { grid-column: 1 / -1; }
  .fh-product-grid h4 {
    margin: 0;
    font-size: 12px;
    font-weight: 500;
    color: var(--fh-faint);
  }
  .fh-product-grid p {
    margin: 8px 0 0;
    font-size: 14px;
    line-height: 1.45;
  }

  .fh-shot-card {
    background: var(--fh-surface);
    border: 1px solid var(--fh-line);
    border-radius: 18px;
    padding: 28px;
    box-shadow: var(--fh-shadow);
  }
  .fh-shot-top {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 22px;
    font-size: 13px;
    color: var(--fh-muted);
  }
  .fh-shot-top img { border-radius: 5px; }
  .fh-shot-card h3 {
    margin: 0;
    font-size: 28px;
    letter-spacing: -0.035em;
    font-weight: 560;
  }
  .fh-shot-card > p {
    margin: 12px 0 0;
    font-size: 15px;
    line-height: 1.55;
    color: var(--fh-muted);
    max-width: 42ch;
  }
  .fh-shot-rows {
    margin-top: 28px;
    display: grid;
    gap: 8px;
  }
  .fh-shot-rows > div {
    display: flex;
    justify-content: space-between;
    gap: 16px;
    padding: 12px 14px;
    border-radius: 10px;
    background: #f6f6f7;
    border: 1px solid var(--fh-line);
    font-size: 13.5px;
  }
  .fh-shot-rows b { font-weight: 500; }
  .fh-shot-rows span { color: var(--fh-muted); }

  /* ——— Cards ——— */
  .fh-cards {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
  }
  .fh-card {
    background: var(--fh-surface);
    border: 1px solid var(--fh-line);
    border-radius: 16px;
    padding: 22px 20px 24px;
    min-height: 148px;
    transition: border-color 0.2s ease, box-shadow 0.2s ease;
  }
  .fh-card:hover {
    border-color: rgba(91,100,125,0.28);
    box-shadow: var(--fh-shadow-soft);
  }
  .fh-card h3 {
    margin: 0;
    font-size: 16px;
    letter-spacing: -0.02em;
    font-weight: 500;
  }
  .fh-card p {
    margin: 10px 0 0;
    font-size: 14px;
    line-height: 1.55;
    color: var(--fh-muted);
  }

  .fh-logos {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: clamp(18px, 3vw, 36px);
    margin: 8px 0 28px;
    color: var(--fh-faint);
    font-size: 14px;
    font-weight: 500;
    letter-spacing: -0.01em;
  }

  .fh-cta {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 28px;
    padding: 36px 32px;
    border-radius: 20px;
    background: #0a0a0b;
    color: #ededef;
  }
  .fh-cta h2 {
    margin: 0;
    font-size: clamp(24px, 3.2vw, 34px);
    letter-spacing: -0.04em;
    font-weight: 560;
    max-width: 16ch;
  }
  .fh-cta p {
    margin: 12px 0 0;
    color: rgba(237,237,239,0.58);
    font-size: 15px;
    line-height: 1.5;
    max-width: 42ch;
  }
  .fh-cta .fh-btn-outline {
    background: transparent;
    color: #ededef;
    border-color: rgba(255,255,255,0.16);
  }
  .fh-cta .fh-btn-outline:hover {
    background: rgba(255,255,255,0.06);
  }
  .fh-cta .fh-btn-solid {
    background: #ededef;
    color: #0a0a0b;
  }
  .fh-cta .fh-btn-solid:hover { background: #fff; }

  /* ——— Footer ——— */
  .fh-footer {
    border-top: 1px solid var(--fh-line);
    padding: 48px clamp(20px, 4vw, 40px) 56px;
    background: var(--fh-canvas);
  }
  .fh-footer-inner {
    max-width: var(--fh-max);
    margin: 0 auto;
    display: grid;
    grid-template-columns: 1.3fr repeat(3, minmax(0, 1fr));
    gap: 32px;
  }
  .fh-footer-brand p {
    margin: 14px 0 0;
    max-width: 260px;
    font-size: 13.5px;
    line-height: 1.5;
    color: var(--fh-faint);
  }
  .fh-footer h3 {
    margin: 0 0 14px;
    font-size: 13px;
    font-weight: 500;
  }
  .fh-footer ul {
    list-style: none;
    margin: 0;
    padding: 0;
    display: grid;
    gap: 10px;
  }
  .fh-footer a {
    font-size: 13.5px;
    color: var(--fh-muted);
  }
  .fh-footer a:hover { color: var(--fh-ink); }
  .fh-footer-bottom {
    max-width: var(--fh-max);
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
    background: rgba(0,0,0,0.35);
    backdrop-filter: blur(4px);
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
    background: var(--fh-surface);
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
    background: rgba(15,15,17,0.12);
    margin: 4px auto 16px;
  }
  .fh-sheet a {
    display: block;
    padding: 14px 4px;
    font-size: 16px;
    border-bottom: 1px solid var(--fh-line);
  }
  .fh-sheet a:last-of-type { border-bottom: 0; }
  .fh-sheet-cta {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 12px;
  }
  .fh-sheet-cta .fh-btn { width: 100%; height: 44px; }

  @media (max-width: 980px) {
    .fh-nav-links { display: none; }
    .fh-nav-menu { display: inline-flex; }
    .fh-trio {
      grid-template-columns: 1fr;
      gap: 28px;
    }
    .fh-trio-side--left { display: none; }
    .fh-split,
    .fh-feature-row,
    .fh-feature-row--rev {
      grid-template-columns: 1fr;
    }
    .fh-product-body { grid-template-columns: 1fr; }
    .fh-product-rail { display: none; }
    .fh-cards { grid-template-columns: 1fr; }
    .fh-footer-inner { grid-template-columns: 1fr 1fr; }
    .fh-band-title { max-width: none; }
  }

  @media (max-width: 560px) {
    .fh-nav-right .fh-btn-outline { display: none; }
    .fh-nav-right .fh-btn-solid { display: inline-flex; }
    .fh-footer-inner { grid-template-columns: 1fr; }
    .fh-cta { padding: 26px 20px; }
    .fh-product-grid { grid-template-columns: 1fr; }
    .fh-product-grid .fh-span { grid-column: auto; }
    .fh-hero-logo { width: 96px; height: 96px; }
  }
`
