# Quran Web Application Frontend

Modern, reading-first Quran frontend built with the latest Next.js App Router and Tailwind CSS v4. It consumes the backend API from the sibling `backend` project and focuses on typography, comfort, and clean SSG-friendly architecture.

## Frontend Architecture

- Framework: `Next.js 16` with the App Router
- Styling: `Tailwind CSS v4` using the current PostCSS plugin flow
- Rendering strategy:
  - homepage uses static rendering with revalidation
  - surah detail pages use `generateStaticParams` plus static rendering with revalidation
  - search page is a client-side experience because it depends on user input
- State:
  - reading settings are stored in a `SettingsProvider`
  - settings persist in `localStorage`
  - Arabic font and text-size preferences are applied globally via CSS variables
- Data layer:
  - reusable API helpers live in `lib/api.ts`
  - the frontend reads `NEXT_PUBLIC_API_BASE_URL` from environment variables

## Tailwind CSS v4 Setup

This project uses the current Tailwind v4 approach:

- `@tailwindcss/postcss` in `postcss.config.mjs`
- `@import "tailwindcss";` in `app/globals.css`
- no legacy `tailwind.config.js` dependency

## Folder Structure

```text
frontend
|-- app
|   |-- globals.css
|   |-- layout.tsx
|   |-- loading.tsx
|   |-- page.tsx
|   |-- search
|   |   `-- page.tsx
|   `-- surah
|       `-- [id]
|           |-- not-found.tsx
|           `-- page.tsx
|-- components
|   |-- AyahItem.tsx
|   |-- EmptyState.tsx
|   |-- ErrorState.tsx
|   |-- Header.tsx
|   |-- LoadingSkeleton.tsx
|   |-- SearchBar.tsx
|   |-- SearchExperience.tsx
|   |-- SettingsPanel.tsx
|   |-- SurahCard.tsx
|   `-- SurahDirectory.tsx
|-- lib
|   |-- api.ts
|   |-- settings.ts
|   `-- utils.ts
|-- providers
|   `-- SettingsProvider.tsx
|-- .env.example
|-- eslint.config.mjs
|-- next.config.ts
|-- package.json
|-- postcss.config.mjs
`-- tsconfig.json
```

## Features Implemented

- Responsive surah directory homepage with client-side filtering
- Static surah detail pages with all ayahs
- Search experience for ayah translation text
- Highlighted keyword matches in translation results
- Sticky header
- Floating reading settings panel
- Arabic font switcher with `Amiri` and `Scheherazade New`
- Arabic font size slider
- Translation font size slider
- Persistent settings in `localStorage`
- Empty states, error states, and loading skeletons

## Environment Variables

Create `.env.local` from `.env.example`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000/api/v1
```

If your backend runs on another port or domain, update this value.

## How to Run Locally

From the `backend` folder:

```bash
npm run dev
```

From the `frontend` folder:

```bash
npm install
npm run dev
```

Open:

- frontend: `http://localhost:3000`
- backend API: `http://localhost:4000/api/v1`

## Production Build

```bash
npm run build
npm start
```

## Notes for Reviewers

- Homepage and surah pages are built to be statically generated where possible.
- Search is intentionally client-driven because it depends on real-time input.
- The app is designed as a reading product, not a dashboard, so spacing, type, and contrast are tuned for longer sessions.

## Suggested Next Step

The next strong improvement would be adding:

- bookmarked ayahs
- recently visited surahs
- deep-link copy actions for specific ayahs
