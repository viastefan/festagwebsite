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
- Brand: **Aeonik Regular**, slate `#5B647D`, calm Linear/Vercel craft
- Primary product CTA → app login / `https://festag.app` (or configured app URL)

Do **not** rebuild the portal, auth chrome, or app UI rules here. Product app work stays in `festag-mvp`.

## Sync note

Product docs are copied from `festag-mvp/docs/`. When north-star positioning changes in the app repo, re-copy those three files into `docs/` here.
