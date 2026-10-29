<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

# Festag Website — Agent Instructions

This repo is the **public marketing site** for Festag (`festag.app`), separate from the product app (`festag-mvp`).

## Product context (read before copy / IA / positioning)

1. `docs/festag-product-north-star.md` — Delivery Intelligence Platform
2. `docs/festag-adaptive-intelligence.md` — Adaptive Intelligence / OKM / Company Brain
3. `docs/leqra-festag-operating-architecture.md` — Leqra + Festag two-layer model

Cursor always applies `.cursor/rules/festag-marketing.mdc`.

## What Festag is (website language)

Describe Festag as:

- Operational Intelligence Platform
- Company Intelligence Layer
- Self-learning Operating System for modern organizations
- Delivery Intelligence for agencies and project teams

Never describe Festag as: AI assistant · chatbot · PM software · automation tool · Notion/Slack/Jira clone.

## Scope of this repo

- Marketing pages, careers, contact, product story, docs marketing surfaces
- Brand: **Geist Medium** (wie festag.app), Desert Sand, Hauptfarbe sehr dunkles, seltenes **Oxblood-Burgundy** `#3F1B24`, calm Linear/Vercel craft
- Primary product CTA → app login / `https://festag.app` (or configured app URL)

Do **not** rebuild the portal, auth chrome, or app UI rules here. Product app work stays in `festag-mvp`.

## Sync note

Product docs are copied from `festag-mvp/docs/`. When north-star positioning changes in the app repo, re-copy those three files into `docs/` here.

## Master-Regeln (vom Inhaber, gelten bis er sie ändert)

- **Motion / animierte Demos:** Maßgeblich ist ausschließlich `app/_components/appdemo/*` — es spiegelt
  festag.app (Status-Feed, Entscheidungskarte, Aven, Übergabe an den Coding-Agent) mit den Tokens aus
  `festag-mvp/components/os/os-tokens.ts`, in Hell **und** Dunkel. Die älteren Demos wurden gelöscht. Neue Demos bauen
  auf dem appdemo-Baukasten auf und folgen dem echten App-Look.
- **Farben:** Desert Sand wie die App im Hellen (Canvas `#F4F2EE`, Flächen `#FFFFFF`/`#EFECE6`, Ink `#15130F`).
  Hauptfarbe ist ein sehr dunkles Burgundy (`--accent` `#3F1B24`, wirkt fast schwarz) und wird nur ab und zu eingesetzt:
  Primärbutton, Links, Fokus. Nie als Fläche, Verlauf oder große Schrift; keine rötlichen Töne.
  Keine bunten Töne (kein Blau, Türkis, Grün, Orange). Status-Grün nur für „erledigt“.
- **Schrift:** Geist, Medium als Grundschnitt, Buchstabenabstand 0. Überschriften H1/H2 Regular, kompakt
  (H1 bis 46px). Hero ohne Fließtext. Alles kompakt: Buttons 36px, Sektionen ca. 52–92px.
- **Logo:** das neue Zeichen (abgerundetes Sechseck mit drei Balken, `public/brand/festag-mark.svg`) überall,
  auch Favicon und App-Icons; kleine Größe im Header.
- **Aven:** nur als Wort, ohne Symbol, ohne Avatar, ohne Sprecher-Etikett.
- **Mobil:** „Anmelden“ nur als Text, ohne Hintergrund-Container.
