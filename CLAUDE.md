# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this repo is

This is the marketing/vitrine website for **Cabinet d'Avocat Anaïs Cruveiller**, a lawyer based in Bordeaux. It was bootstrapped from a purchased Astro template called **"Flux Theme" / "Next Level Mentors"** (a podcast/mentors platform template) and is being progressively converted into the law firm's real site.

This matters for day-to-day work because the migration is **incomplete and both layers currently coexist**:

- Real content: `home.json`'s `hero`, `featureStrip`, `presentationSection`, and `competences` blocks, plus `about.json`, `contact.json`, etc. — these describe the actual law practice (droit des contrats, droit équin, droit pénal, droit de la famille…).
- Leftover template content: `home.json`'s `shows`/`podcast` arrays (Unsplash stock images, "Next Level Mentors" subtitles), `navigation.json` links (Podcast/Shows/Articles), and pages like `mentors.astro`, `podcast/`, `shows/`, `articles/` — these are template scaffolding not yet replaced or removed.
- Naming: CSS classes, JS identifiers, and storage keys still use the `nlm-` (Next Level Mentors) prefix throughout (`nlm-theme` localStorage key, `nlm-smooth` GSAP ease, `.nlm-chip`, `.nlm-display`, etc.). This is inherited template naming, not a bug — don't "fix" it reflexively.
- `astro.config.mjs` (`site`) and `BaseHead.astro` (`siteOrigin`) both still point at `https://nextlevelmentors.show`, the template vendor's domain, not a real Cruveiller domain.
- `.github/workflows/notify-buyers.yml` is vendor boilerplate from the template marketplace (flux-theme.online) that pings the vendor's site on GitHub releases — it's unrelated to deploying this site.

When asked to add or edit content, prefer editing the real (law-firm) data blocks and don't assume the podcast/shows/mentors scaffolding is meaningful unless the task is specifically about removing/replacing it.

## Commands

```bash
npm install       # install dependencies
npm run dev        # astro dev --host (LAN-accessible dev server)
npm run dev:local  # astro dev (localhost only)
npm run build       # astro build — also the closest thing to a test suite
npm run preview     # preview the production build
```

There is no lint or test script, and no test framework/files exist anywhere in the repo. **`npm run build` is the verification step** for any change — it catches JSX/Astro/JSON syntax errors. For content-only JSON edits, `node -e "JSON.parse(require('fs').readFileSync('src/components/data/<file>.json','utf8'))"` is a faster sanity check. UI changes should also get a manual browser check (`npm run dev:local`), including a mobile-width check and a `prefers-reduced-motion: reduce` check, since most sections animate in via GSAP.

Both `package-lock.json` and `bun.lock` are present; `npm` is the documented/actual workflow (README, `package.json` scripts).

## Architecture

**Page → data → sections pipeline.** Each route in `src/pages/*.astro` imports exactly one JSON file from `src/components/data/` (one file per page) and passes slices of it as `data`/`items` props to React section components from `src/components/sections/`. To change copy, links, or media, edit the JSON — not the components. To change a card from an image to a video, just point its `media` field at an `.mp4` URL (see `ProtectedMedia`/`isVideoSrc` below).

`src/layout/BaseLayout.astro` is the shell every page renders through: `BaseHead` (meta/SEO/JSON-LD/theme-flash-prevention script) → `astro:transitions`' `ClientRouter` → `Navigation` (persisted across transitions) → `PageTransition` wrapper around `<slot />` → `Footer`.

**Hydration boundaries.** Sections are Astro-rendered but hydrate as React islands via `client:load` (above-the-fold, e.g. `Hero`) or `client:visible` (everything below the fold). Keep new sections consistent with this pattern rather than hydrating everything eagerly.

**Component layers:**

- `src/components/global/` — `BaseHead`, `Navigation`, `Footer`: one per site, not per page.
- `src/components/sections/` — page-level blocks (`Hero`, `FeatureStrip`, `PresentationBand`, `GradientCards`, `ContentSection`, `CtaBand`, `ContactForm`, `SearchPage`, …), each taking a `{ data }` (and sometimes `items`) prop shaped to match its JSON block.
- `src/components/common/` — reusable primitives: layout (`Container`, `SectionHeading`), animation (`Reveal`, `Stagger`, `PageTransition`, `CountUp` — all GSAP-backed), card/list layouts (`CardGrid`, `Rail`/`RailCard`, `MosaicCard`, `MediaCard`, `AvatarGroup`), media (`ProtectedMedia`), icons (`Icons`, `IcooniaIcon` — backed by the Icoonia SVG set in `public/icoonia/`), and `ThemeToggle`.

**Media handling.** `src/lib/utils.js` provides `resolveMedia`/`isVideoSrc`: any `media`/`image`/`src` field ending in a video extension is automatically rendered as a (muted, autoplaying, loop) `<video>` instead of an `<img>` by `ProtectedMedia`, with right-click/drag-save disabled. Content authors don't need separate video/image components — just change the file extension in JSON.

**Animation.** `src/lib/gsap-core.js` is the single place GSAP plugins (`ScrollTrigger`, `CustomEase`) get registered and the shared ease (`nlm-smooth`) and timing constants (`EASE`, `DUR`, `STAGGER`) are defined. Always pull from `getGsap()` here rather than importing/registering GSAP plugins directly in a component, and reuse `prefersReducedMotion()` for any new animation to keep reduced-motion behavior consistent (existing sections rely on `Reveal` for this).

**Theming.** All design tokens are CSS custom properties in `src/styles/global.css` (`:root` = light, `.dark` = dark overrides), fed into Tailwind v4 via `@theme inline`. Theme is chosen by an inline script in `BaseHead.astro` that runs before paint (reads `localStorage["nlm-theme"]`, falls back to `prefers-color-scheme`) and toggles the `dark` class on `<html>`; because Astro's View Transitions (`ClientRouter`) swap the DOM without re-running head scripts, the same function is re-invoked on the `astro:after-swap` event to keep the theme correct across client-side navigations. `ThemeToggle` mirrors this same class + localStorage key.

**Styling conventions.** Tailwind utility classes are used for most layout; one-off/complex layout is done via inline `style={{}}` (see `CtaBand.jsx`, `PresentationBand.jsx`), while reusable visual patterns become named classes in `global.css` (`.nlm-chip`, `.nlm-gcard__*`, `.nlm-presentation-badge`, …). Follow whichever pattern the component you're editing already uses.

**Path alias.** `@/*` maps to `src/*` (see `tsconfig.json`), though most existing imports use relative paths — either is fine.

## Development workflow for larger features

For non-trivial features, this repo has an established pattern of writing a **spec** (`docs/superpowers/specs/YYYY-MM-DD-<feature>-design.md`) followed by a task-by-task **implementation plan** (`docs/superpowers/plans/YYYY-MM-DD-<feature>.md`, using `- [ ]` checkboxes and explicit before/after code snippets) before touching code — see the existing `presentation-cabinet` and `competences-cards` spec/plan pairs for the expected format. Plans are written to be executed by the Superpowers `subagent-driven-development` / `executing-plans` skills. Follow this convention for similarly-sized work rather than jumping straight to code.
