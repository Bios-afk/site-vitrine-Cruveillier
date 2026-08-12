# Section "Présentation du cabinet" Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a new "Présentation du cabinet" section to the home page — a two-column card (image + text) reusing the visual language of the existing `CtaBand` card, positioned between `FeatureStrip` and `GradientCards`.

**Architecture:** One new presentational React component (`PresentationBand.jsx`) consuming a new `presentationSection` block in `home.json`, following the exact `Container` → `Reveal` → content pattern already used by `CtaBand.jsx` and `FeatureStrip.jsx`. Two new CSS classes support a badge treatment that doesn't exist yet in the design system (full-sentence badge on a dark surface — distinct from the short-tag `.nlm-chip`). No new dependencies, no new pages, no routing changes.

**Tech Stack:** Astro (page shell, static `.astro` files), React 19 (interactive/animated section components, hydrated via `client:visible`), Tailwind v4 + hand-written CSS component classes in `src/styles/global.css`, GSAP-backed `Reveal` wrapper for scroll-in animation.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-08-12-presentation-cabinet-design.md` — every task below implements a specific part of it.
- Reuse existing design tokens only (`--hero-surface`, `--on-hero`, `--on-hero-muted`, `--radius-xl`, `--radius-lg`, `--accent`, `--font-sans` via `.nlm-display`/`.nlm-eyebrow`) — no new colors, fonts, or radii invented.
- Content order inside the text column is fixed: `paragraphsBefore` → `badges` → `paragraphsAfter`. Do not collapse these into a single `paragraphs` array — that was a real ordering bug caught during spec review.
- Badges use new classes `.nlm-presentation-badge` / `.nlm-presentation-badge__icon` — **not** `.nlm-chip` (chip is a short single-line tag pill; badge text here is a full sentence).
- Placeholder image is `/img/hero.jpg` (already in `public/img/`) — do not source or generate a new image.
- This repo has no test runner (`package.json` has no test script, no `*.test.*`/`*.spec.*` files exist anywhere). Verification for every task is: `npm run build` succeeds (catches JSX/Astro/JSON syntax errors), plus a final manual browser check in the last task. Do not add a test framework as part of this work.
- Follow existing file conventions exactly: components in `src/components/sections/`, colocated inline `style={{}}` for one-off layout (as `CtaBand.jsx` does), reusable visual patterns as classes in `global.css` (as `.nlm-chip`, `.nlm-gcard__*` do).

---

### Task 1: Add `presentationSection` content to `home.json`

**Files:**
- Modify: `src/components/data/home.json:58` (insert new top-level key right after the `featureStrip` block closes, before `showsSection` starts)

**Interfaces:**
- Produces: `home.presentationSection` object with shape `{ eyebrow: string, title: string, image: { src: string, alt: string }, paragraphsBefore: string[], badges: { icon: string, text: string }[], paragraphsAfter: string[] }` — this exact shape is consumed by `PresentationBand` in Task 3.

- [ ] **Step 1: Insert the new JSON block**

Open `src/components/data/home.json`. Find this exact boundary (currently lines 57–59):

```json
      }
    ]
  },
  "showsSection": {
```

Replace it with (adds a new `presentationSection` key between the `featureStrip` object and `showsSection`):

```json
      }
    ]
  },
  "presentationSection": {
    "eyebrow": "Le cabinet",
    "title": "Présentation du cabinet",
    "image": {
      "src": "/img/hero.jpg",
      "alt": "Le Cabinet d'Avocat Anaïs Cruveiller à Bordeaux"
    },
    "paragraphsBefore": [
      "Ecouter, comprendre, défendre telle est la devise du Cabinet d'Avocat Anaïs CRUVEILLER qui vous accueille en plein cœur de Bordeaux.",
      "Soucieux d'apporter des réponses adéquates à vos différentes problématiques, le Cabinet n'hésite pas à s'adapter à vos différents besoins :"
    ],
    "badges": [
      { "icon": "clock", "text": "Des rendez-vous adaptés à vos contraintes professionnelles (horaires, déplacements)." },
      { "icon": "location", "text": "Des rendez-vous adaptés à votre situation géographique." }
    ],
    "paragraphsAfter": [
      "Maître Anaïs CRUVEILLER a choisi d'exercer en structure individuelle afin de pouvoir être au plus près de ses clients. Pour autant, elle n'hésite pas à s'adjoindre en cas de besoins les services de professionnels spécialisés.",
      "Fort de son dynamisme et de son souhait de rendre accessible à tous les différentes problématiques juridiques, le Cabinet d'Avocat Anaïs CRUVEILLER saura défendre vos intérêts et vous apporter des réponses pertinentes et argumentées."
    ]
  },
  "showsSection": {
```

- [ ] **Step 2: Verify the JSON is valid**

Run: `node -e "JSON.parse(require('fs').readFileSync('src/components/data/home.json', 'utf8')); console.log('valid')"`
Expected: `valid` printed, no exception.

- [ ] **Step 3: Commit**

```bash
git add src/components/data/home.json
git commit -m "content: add presentationSection data to home.json"
```

---

### Task 2: Add the on-hero badge CSS classes to `global.css`

**Files:**
- Modify: `src/styles/global.css:269-272` (insert new rules right after the existing `.nlm-chip--accent` rule, before `.nlm-media`)

**Interfaces:**
- Produces: CSS classes `.nlm-presentation-badge` (container: icon + text row) and `.nlm-presentation-badge__icon` (circular icon slot) — consumed by `PresentationBand.jsx` in Task 3.

- [ ] **Step 1: Insert the new CSS rules**

Open `src/styles/global.css`. Find this exact block (currently lines 269–273):

```css
  .nlm-chip--accent {
    background: color-mix(in oklab, var(--accent) 22%, transparent);
    color: color-mix(in oklab, var(--accent-tint) 70%, var(--foreground));
  }

  .nlm-media {
```

Replace it with (adds the two new rules between `.nlm-chip--accent` and `.nlm-media`):

```css
  .nlm-chip--accent {
    background: color-mix(in oklab, var(--accent) 22%, transparent);
    color: color-mix(in oklab, var(--accent-tint) 70%, var(--foreground));
  }

  .nlm-presentation-badge {
    display: flex;
    align-items: flex-start;
    gap: 0.75rem;
    padding: 0.9rem 1.1rem;
    border-radius: var(--radius-lg);
    background: color-mix(in oklab, white 12%, transparent);
    border: 1px solid color-mix(in oklab, white 22%, transparent);
    color: var(--on-hero);
    font-size: 0.95rem;
    line-height: 1.5;
  }

  .nlm-presentation-badge__icon {
    flex-shrink: 0;
    display: grid;
    place-items: center;
    width: 2rem;
    height: 2rem;
    border-radius: 999px;
    background: color-mix(in oklab, white 14%, transparent);
    color: var(--on-hero);
  }

  .nlm-media {
```

- [ ] **Step 2: Verify the dev server still builds CSS without errors**

Run: `npm run build`
Expected: build completes successfully (exit code 0), no Tailwind/CSS syntax errors mentioned in the output.

- [ ] **Step 3: Commit**

```bash
git add src/styles/global.css
git commit -m "style: add on-hero badge classes for presentation section"
```

---

### Task 3: Create the `PresentationBand` component

**Files:**
- Create: `src/components/sections/PresentationBand.jsx`

**Interfaces:**
- Consumes: `home.presentationSection` shape produced in Task 1 (`{ eyebrow, title, image: { src, alt }, paragraphsBefore, badges: [{icon, text}], paragraphsAfter }`); CSS classes `.nlm-presentation-badge` / `.nlm-presentation-badge__icon` from Task 2; existing components `Container` (`src/components/common/Container.jsx`), `Reveal` (`src/components/common/Reveal.jsx`), `ProtectedMedia` (`src/components/common/ProtectedMedia.jsx`), `Icon` (`src/components/common/Icons.jsx`); existing utility class `.nlm-split` (`src/styles/global.css:791`).
- Produces: default export `PresentationBand({ data })` — a React component taking the same `{ data }` prop shape as `CtaBand`, `FeatureStrip`. Consumed by `index.astro` in Task 4.

- [ ] **Step 1: Write the component**

Create `src/components/sections/PresentationBand.jsx`:

```jsx
import Container from "../common/Container.jsx";
import Reveal from "../common/Reveal.jsx";
import ProtectedMedia from "../common/ProtectedMedia.jsx";
import { Icon } from "../common/Icons.jsx";

export default function PresentationBand({ data }) {
  const {
    eyebrow,
    title,
    image,
    paragraphsBefore = [],
    badges = [],
    paragraphsAfter = [],
  } = data || {};

  return (
    <Container as="section" style={{ paddingBlock: "clamp(2.5rem, 5vw, 4rem)" }}>
      <Reveal
        style={{
          borderRadius: "var(--radius-xl)",
          background: "var(--hero-surface)",
          color: "var(--on-hero)",
          overflow: "hidden",
        }}
      >
        <div
          className="nlm-split"
          style={{ "--split-cols": "1fr 1.1fr", "--split-align": "stretch", gap: 0 }}
        >
          {image && (
            <div style={{ position: "relative", minHeight: "22rem" }}>
              <ProtectedMedia
                src={image}
                alt={image.alt}
                imgProps={{ loading: "lazy", style: { position: "absolute", inset: 0 } }}
              />
            </div>
          )}

          <div style={{ padding: "clamp(2rem, 5vw, 3.5rem)" }}>
            {eyebrow && (
              <p className="nlm-eyebrow" style={{ color: "var(--on-hero-muted)" }}>
                <Icon name="scales" size={14} className="nlm-accent-text" />
                {eyebrow}
              </p>
            )}

            {title && (
              <h2
                className="nlm-display nlm-text-balance"
                style={{ marginTop: "1rem", fontSize: "clamp(1.7rem, 3.4vw, 2.4rem)" }}
              >
                {title}
              </h2>
            )}

            {paragraphsBefore.map((p, i) => (
              <p key={`before-${i}`} style={{ marginTop: "1.1rem", color: "var(--on-hero-muted)", lineHeight: 1.65 }}>
                {p}
              </p>
            ))}

            {badges.length > 0 && (
              <div style={{ marginTop: "1.25rem", display: "flex", flexDirection: "column", gap: "0.75rem" }}>
                {badges.map((b, i) => (
                  <div key={i} className="nlm-presentation-badge">
                    <span className="nlm-presentation-badge__icon">
                      <Icon name={b.icon} size={16} />
                    </span>
                    <span>{b.text}</span>
                  </div>
                ))}
              </div>
            )}

            {paragraphsAfter.map((p, i) => (
              <p key={`after-${i}`} style={{ marginTop: "1.1rem", color: "var(--on-hero-muted)", lineHeight: 1.65 }}>
                {p}
              </p>
            ))}
          </div>
        </div>
      </Reveal>
    </Container>
  );
}
```

- [ ] **Step 2: Verify it builds**

Run: `npm run build`
Expected: build completes successfully (exit code 0). Note: Astro only compiles files that are actually imported by a page, and this component isn't wired into `index.astro` yet — this run just confirms the rest of the site still builds cleanly. Full validation of `PresentationBand.jsx` itself (JSX syntax, import paths, prop usage) happens in Task 4's build once it's referenced from `index.astro`.

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/PresentationBand.jsx
git commit -m "feat: add PresentationBand section component"
```

---

### Task 4: Wire `PresentationBand` into the home page

**Files:**
- Modify: `src/pages/index.astro:1-35`

**Interfaces:**
- Consumes: `PresentationBand` default export from Task 3, `home.presentationSection` data from Task 1.

- [ ] **Step 1: Add the import**

In `src/pages/index.astro`, find:

```astro
import FeatureStrip from "../components/sections/FeatureStrip.jsx";
import ContentSection from "../components/sections/ContentSection.jsx";
```

Replace with:

```astro
import FeatureStrip from "../components/sections/FeatureStrip.jsx";
import PresentationBand from "../components/sections/PresentationBand.jsx";
import ContentSection from "../components/sections/ContentSection.jsx";
```

- [ ] **Step 2: Render the section between `FeatureStrip` and `GradientCards`**

Find:

```astro
  <FeatureStrip data={home.featureStrip} client:visible />
  <!-- <BrandStrip data={home.brandStrip} client:visible /> -->
  <GradientCards
```

Replace with:

```astro
  <FeatureStrip data={home.featureStrip} client:visible />
  <!-- <BrandStrip data={home.brandStrip} client:visible /> -->
  <PresentationBand data={home.presentationSection} client:visible />
  <GradientCards
```

- [ ] **Step 3: Verify the build**

Run: `npm run build`
Expected: build completes successfully (exit code 0), no errors referencing `index.astro` or `PresentationBand.jsx`.

- [ ] **Step 4: Commit**

```bash
git add src/pages/index.astro
git commit -m "feat: render presentation-cabinet section on home page"
```

---

### Task 5: Manual visual verification in the browser

**Files:** none (verification only)

- [ ] **Step 1: Start the dev server**

Run: `npm run dev:local` (runs `astro dev` without `--host`, binds to localhost only)
Expected: server starts, prints a local URL (typically `http://localhost:4321`).

- [ ] **Step 2: Check the section on desktop width**

Open the home page in a browser at a desktop viewport (≥1024px wide). Confirm:
- The new dark rounded card appears between the Efficacité/Rigueur/Proximité row and the Compétences cards.
- Image fills the left column edge-to-edge (no visible gap or radius seam against the card edge), text sits in the right column with its own padding.
- Eyebrow "Le cabinet" with a small icon, then "Présentation du cabinet" heading, then paragraph 1, paragraph 2, the two badges (clock icon / location icon) stacked vertically, then the final two paragraphs — in that order.
- Text is legible against the dark green background (`--on-hero` / `--on-hero-muted`).

- [ ] **Step 3: Check the section on mobile width**

Resize the browser (or use device emulation) to ~375px wide. Confirm:
- Layout stacks to a single column: image on top (full width), text below it.
- No horizontal scrollbar or overflow introduced by the badges or paragraphs.
- Badge text wraps onto multiple lines cleanly (no clipped text, no overflow past the card edge).

- [ ] **Step 4: Check reduced-motion behavior**

Enable "prefers-reduced-motion: reduce" in browser dev tools (or OS accessibility settings), reload the page, and confirm the section is visible immediately (no stuck-invisible content) — this is handled by the existing `Reveal` component (`src/components/common/Reveal.jsx:24-27`), not new code in this plan, so this step is a regression check rather than new behavior to build.

- [ ] **Step 5: Stop the dev server**

Stop the process started in Step 1 (Ctrl-C in that terminal, or kill the background job if run in background).

No commit for this task — it's verification only, and Task 4 already committed all the code changes it validates.
