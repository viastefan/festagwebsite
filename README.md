# festag.app — Website

Public marketing site for Festag. Separate from the product app (`festag-mvp`).

**Stack:** Next.js 16 · React 19 · Tailwind v4 · Motion 12 · Aeonik + Editor's Note (serif accent)

## Design system

- Canvas `#f7f6f2` (warm paper) · Ink `#17161b` · Accent burgundy `#7a1e33`
- Tokens and all shared classes live in `app/globals.css`
- Craft bar: Cursor / Linear — product windows on painted "stages", calm motion,
  `prefers-reduced-motion` respected everywhere

## Interactive demos (`app/_components/demos/`)

Auto-playing, clickable simulations of the app. They pause off-screen and stop
autoplay once a visitor interacts.

| Demo | What it shows |
|---|---|
| `HeroStage` | Inbox → Tagro working → client portal updates after approval |
| `TagroConsole` | Typeable Tagro with structured, sourced answers |
| `DecisionDemo` | Options, risk delta, health ring, recorded outcome |
| `TranslateDemo` | Internal chatter vs. client-ready translation |
| `ExecutiveDemo` | Portfolio health, sortable, selectable |
| `SignalFlow` | Signal → meaning → client view |
| `ConnectorGraph` | Connectors orbiting Festag, click for details |
| `LearningLoop` | Adaptive Intelligence loop + Operational DNA |

## Content

Editable data lives in `lib/site/`: `links.ts`, `connectors.ts`, `pricing.ts`,
`content.ts` (voices, changelog, principles), `demo.ts` (demo scripts).
Prices, early-access voices and changelog dates are placeholders — replace
before launch. Jobs stay in `lib/jobs.ts`.

## Routes

`/` · `/product` · `/tagro` · `/connectors` · `/intelligence` · `/pricing` ·
`/enterprise` · `/extension` · `/docs` · `/changelog` · `/careers` · `/contact` ·
`/legal/*`

## Run

```bash
npm install
npm run dev   # http://localhost:3001
```

Set `NEXT_PUBLIC_APP_URL` if the product app does not live on `https://festag.app`.
