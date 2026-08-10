<div align="center">

# Next Level Mentors — Podcast & Shows Platform

  <img src="https://img.shields.io/badge/Astro-6.6-FF5D01?logo=astro&logoColor=white" alt="Astro">
  <img src="https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black" alt="React">
  <img src="https://img.shields.io/badge/Tailwind_CSS-4.0-06B6D4?logo=tailwindcss&logoColor=white" alt="Tailwind CSS">
  <img src="https://img.shields.io/badge/GSAP-3-88CE02?logo=greensock&logoColor=white" alt="GSAP">
<img width="1648" height="1042" alt="Welcome" src="https://github.com/user-attachments/assets/c637079d-00af-4734-9c66-d33dc3711128" />

</div>

---

### Overview

A complete podcast, shows, and articles website with GSAP scroll-driven animations, dark mode, JSON-driven content, seamless image/video media, and a circular-reveal mobile menu. Built for creators, studios, and media brands.

### Features

- Light & dark mode with theme persistence (no flash on load)
- GSAP scroll-driven animations, page transitions, and micro-interactions
- Seamless media — drop an `.mp4` into any image field and it plays inline (`ProtectedMedia`)
- Multiple card layouts — rail (swipeable), mosaic (bento), gradient, and uniform grids
- Shows, podcast, and articles with detail pages
- Mentor profiles in a circular artist rail
- Instant client-side search
- Contact, sign-up, and account forms
- Circular-reveal mobile navigation
- Brand strip with hover-swap headline (react-icons)
- Per-page SEO via a single `BaseHead` (canonical, Open Graph, Twitter, JSON-LD)
- Dynamic `sitemap.xml`
- JSON-driven content — update copy without touching code
- Mobile-first responsive layouts

### Tech Stack

`Astro` `React` `Tailwind CSS` `GSAP` `react-icons`

### Project Structure

```text
src/
├── components/
│   ├── common/      Reusable UI (cards, buttons, media, icons, animation)
│   ├── sections/    Page sections (Hero, rails, mosaic, forms, CTA)
│   ├── global/      BaseHead, Navigation, Footer
│   └── data/        JSON content — one file per page
├── layout/          BaseLayout
├── lib/             Helpers (gsap-core, utils)
├── pages/           Routes + sitemap.xml.ts
└── styles/          global.css (design tokens + component classes)
```

### Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build

# Preview the production build
npm run preview
```

### Editing Content

All copy lives in `src/components/data/*.json`. Each page imports its own data
file and passes it to components as props — edit the JSON to change text,
links, media, and card layouts without touching any component.

```jsonc
// e.g. src/components/data/home.json
{
  "hero": {
    "headline": [{ "text": "Explore the" }, { "text": "Next", "accent": true }],
    "media": "/img/hero.jpg"
  }
}
```

To switch a card to a video, just point its `media` field at an `.mp4` URL —
no code changes needed.

### License

MIT
