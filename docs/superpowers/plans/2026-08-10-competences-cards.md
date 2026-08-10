# Compétences Cards Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Replace the homepage's video-testimonial "masterclasses" `GradientCards` section with a "Compétences" section presenting the cabinet's practice areas (title, problem-statement description, keyword tags).

**Architecture:** `GradientCards.jsx` is the only consumer of its own markup (no other page reuses it), so it is edited in place rather than made generic. Three layers change independently and each stays buildable on its own: CSS (new description/tag/arrow styles, drop uppercase title), component (render description+tags+arrow instead of author/role+play+avatar, new sober gradient palette), then content (`home.json` renamed keys + real copy, `index.astro` prop wiring).

**Tech Stack:** Astro 6 + React 19 (`.jsx` islands), plain CSS in `src/styles/global.css` (no CSS modules/Tailwind classes used in this component), no test runner configured in this repo — verification is `npm run build` (type/syntax correctness) plus a manual visual check with `npm run dev` in the browser, per project convention for UI work.

## Global Constraints

- Only `src/pages/index.astro` renders `GradientCards` — confirmed via repo-wide grep; no other page depends on its current (video-card) markup or on the `masterclassSection`/`masterclasses` JSON keys.
- No automated test framework exists in this repo (`package.json` has no test script/dependency). Do not invent a test runner; verification steps use `npm run build` and manual browser checks instead of unit tests.
- Keep the accent/dark-neutral palette in visual parity with the site's existing tokens: `--accent: #b08d3d`, `--accent-strong: #96742a`, dark-theme `--background: #12160b`, `--foreground: #f4f2e7`.
- Cards must remain link-wrappable via the existing `item.href ? "a" : "div"` mechanism already in `GradientCards.jsx` — do not change that mechanism.

---

## File Structure

- **Modify** `src/styles/global.css` (lines ~1059-1160, the `.nlm-gcard*` block): drop title uppercase, add `.nlm-gcard__desc`, `.nlm-gcard__tags`, `.nlm-gcard__tag`, replace `.nlm-gcard__play`/`.nlm-gcard__avatar` with `.nlm-gcard__arrow`, remove now-unused `.nlm-gcard__meta`/`__author`/`__role`.
- **Modify** `src/components/sections/GradientCards.jsx`: drop `Play`/`ProtectedMedia` imports, render `item.description` + `item.tags` + a single arrow instead of author/role/play/avatar, replace `FALLBACK_GRADIENTS` with the sober 4-tone palette.
- **Modify** `src/components/data/home.json`: rename `masterclassSection` → `competencesSection`, `masterclasses` → `competences`, replace content with the 4 practice-area entries (title/description/tags/href, no author/role/avatar/gradient overrides — let the component's fallback palette apply).
- **Modify** `src/pages/index.astro`: update the `<GradientCards data=... items=...>` call to the renamed keys.

---

## Task 1: Restyle the gradient card CSS (sentence-case title, description, tag chips, single arrow footer)

**Files:**
- Modify: `src/styles/global.css:1059-1160`

**Interfaces:**
- Produces: CSS classes `.nlm-gcard__desc`, `.nlm-gcard__tags`, `.nlm-gcard__tag`, `.nlm-gcard__arrow` (new), and `.nlm-gcard__title` with uppercase removed — these are the exact class names Task 2's JSX must use.
- Removes: `.nlm-gcard__meta`, `.nlm-gcard__author`, `.nlm-gcard__role`, `.nlm-gcard__play`, `.nlm-gcard__avatar` (confirmed unused outside this file and `GradientCards.jsx`).

- [ ] **Step 1: Replace the `.nlm-gcard__title` rule to drop forced uppercase and resize for longer French phrases**

In `src/styles/global.css`, replace:

```css
  .nlm-gcard__title {
    font-weight: 800;
    line-height: 1.02;
    letter-spacing: 0.01em;
    text-transform: uppercase;
    font-size: clamp(1.5rem, 2.6vw, 1.9rem);
    text-shadow: 0 2px 16px rgba(0, 0, 0, 0.18);
  }
```

with:

```css
  .nlm-gcard__title {
    font-weight: 700;
    line-height: 1.18;
    letter-spacing: -0.005em;
    font-size: clamp(1.2rem, 2.1vw, 1.5rem);
    text-shadow: 0 2px 16px rgba(0, 0, 0, 0.18);
  }
```

- [ ] **Step 2: Replace `.nlm-gcard__meta`/`__author`/`__role` with `.nlm-gcard__desc` and `.nlm-gcard__tags`/`__tag`**

Replace:

```css
  .nlm-gcard__meta {
    margin-top: 0.9rem;
    display: flex;
    flex-direction: column;
    gap: 0.1rem;
  }
  .nlm-gcard__author {
    font-weight: 600;
    font-size: 0.95rem;
  }
  .nlm-gcard__role {
    font-size: 0.82rem;
    color: rgba(255, 255, 255, 0.72);
  }
```

with:

```css
  .nlm-gcard__desc {
    margin-top: 0.65rem;
    font-size: 0.92rem;
    line-height: 1.5;
    color: rgba(255, 255, 255, 0.86);
  }

  .nlm-gcard__tags {
    margin-top: 1rem;
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
  }

  .nlm-gcard__tag {
    display: inline-flex;
    align-items: center;
    padding: 0.3rem 0.65rem;
    border-radius: var(--radius-pill);
    font-size: 0.72rem;
    font-weight: 600;
    letter-spacing: 0.01em;
    color: #fff;
    background: color-mix(in oklab, white 16%, transparent);
    border: 1px solid color-mix(in oklab, white 24%, transparent);
    backdrop-filter: blur(6px);
  }
```

- [ ] **Step 3: Simplify the footer to a single arrow (replace play button + avatar)**

Replace:

```css
  .nlm-gcard__footer {
    margin-top: 1.5rem;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    gap: 1rem;
  }

  .nlm-gcard__play {
    display: grid;
    place-items: center;
    width: 2.75rem;
    height: 2.75rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.92);
    color: #16181f;
    box-shadow: 0 10px 22px -10px rgba(0, 0, 0, 0.45);
    transition: transform 0.3s var(--ease-out), background-color 0.25s ease;
  }
  .nlm-gcard:hover .nlm-gcard__play {
    transform: scale(1.08);
    background: #fff;
  }

  .nlm-gcard__avatar {
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 0.85rem;
    overflow: hidden;
    border: 2px solid rgba(255, 255, 255, 0.7);
    box-shadow: 0 10px 24px -10px rgba(0, 0, 0, 0.45);
    flex-shrink: 0;
  }
```

with:

```css
  .nlm-gcard__footer {
    margin-top: 1.5rem;
    display: flex;
    align-items: center;
    justify-content: flex-end;
  }

  .nlm-gcard__arrow {
    display: grid;
    place-items: center;
    width: 2.5rem;
    height: 2.5rem;
    border-radius: 999px;
    background: rgba(255, 255, 255, 0.92);
    color: #16181f;
    box-shadow: 0 10px 22px -10px rgba(0, 0, 0, 0.45);
    transition: transform 0.3s var(--ease-out), background-color 0.25s ease;
  }
  .nlm-gcard:hover .nlm-gcard__arrow {
    transform: scale(1.08) translate(2px, -2px);
    background: #fff;
  }
```

- [ ] **Step 4: Verify the stylesheet builds**

Run: `npm run build`
Expected: build completes with no CSS/Astro errors (the removed/renamed classes are still referenced by `GradientCards.jsx` at this point, which is fine — stale class names on existing markup don't fail an Astro/Vite build, they just render unstyled until Task 2 lands).

- [ ] **Step 5: Commit**

```bash
git add src/styles/global.css
git commit -m "style: restyle gradient cards for competences (desc, tags, arrow)"
```

---

## Task 2: Update `GradientCards.jsx` to render description, tags, and a single arrow link

**Files:**
- Modify: `src/components/sections/GradientCards.jsx`

**Interfaces:**
- Consumes: CSS classes from Task 1 (`.nlm-gcard__desc`, `.nlm-gcard__tags`, `.nlm-gcard__tag`, `.nlm-gcard__arrow`, `.nlm-gcard__title`).
- Consumes: `ArrowUpRight` from `src/components/common/Icons.jsx` (existing export, signature `{ size = 18, className = "" }`).
- Produces: `GradientCards` now expects each item in `items` to optionally have `description: string` and `tags: string[]`, in addition to the existing `title`, `href`, `gradient`. `author`, `role`, `avatar` are no longer read (dead props if still present in data — harmless).

- [ ] **Step 1: Replace the file contents**

Replace the full contents of `src/components/sections/GradientCards.jsx` with:

```jsx
import Container from "../common/Container.jsx";
import SectionHeading from "../common/SectionHeading.jsx";
import Stagger from "../common/Stagger.jsx";
import { ArrowUpRight } from "../common/Icons.jsx";

const FALLBACK_GRADIENTS = [
  "linear-gradient(150deg, #2f2a1a 0%, #4a3d20 55%, #6b5226 100%)",
  "linear-gradient(150deg, #1c2412 0%, #2a3319 55%, #3d4a26 100%)",
  "linear-gradient(150deg, #241f14 0%, #3a2f1c 55%, #8a6a2e 100%)",
  "linear-gradient(150deg, #221f1a 0%, #33302a 55%, #4a4438 100%)",
];

export default function GradientCards({ data = {}, items = [] }) {
  const { eyebrow, title, intro, align = "left", id } = data;

  return (
    <Container as="section" id={id} style={{ paddingBlock: "clamp(2.5rem, 5vw, 4rem)" }}>
      {(title || eyebrow) && (
        <div style={{ marginBottom: "2.5rem" }}>
          <SectionHeading eyebrow={eyebrow} title={title} intro={intro} align={align} />
        </div>
      )}

      <Stagger className="nlm-cluster" style={{ "--cluster-min": "17rem" }}>
        {items.map((item, i) => {
          const gradient = item.gradient || FALLBACK_GRADIENTS[i % FALLBACK_GRADIENTS.length];
          const Wrapper = item.href ? "a" : "div";
          return (
            <Wrapper key={i} href={item.href} className="nlm-gcard group" style={{ background: gradient }}>
              <span className="nlm-gcard__pattern" aria-hidden="true" />

              <div className="nlm-gcard__body">
                <h3 className="nlm-gcard__title">{item.title}</h3>
                {item.description && <p className="nlm-gcard__desc">{item.description}</p>}
                {item.tags?.length > 0 && (
                  <div className="nlm-gcard__tags">
                    {item.tags.map((tag, j) => (
                      <span key={j} className="nlm-gcard__tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              <div className="nlm-gcard__footer">
                <span className="nlm-gcard__arrow" aria-hidden="true">
                  <ArrowUpRight size={18} />
                </span>
              </div>
            </Wrapper>
          );
        })}
      </Stagger>
    </Container>
  );
}
```

- [ ] **Step 2: Verify the build**

Run: `npm run build`
Expected: build completes with no errors (existing `home.json` `masterclasses` items still render — title only, since they have no `description`/`tags` yet; that's expected and fixed in Task 3).

- [ ] **Step 3: Commit**

```bash
git add src/components/sections/GradientCards.jsx
git commit -m "feat: render description/tags/arrow in GradientCards instead of video meta"
```

---

## Task 3: Replace masterclass content with Compétences content and wire it up

**Files:**
- Modify: `src/components/data/home.json`
- Modify: `src/pages/index.astro:29-33`

**Interfaces:**
- Consumes: `GradientCards` props from Task 2 — `data: { eyebrow, title, intro, align, id }`, `items: Array<{ title, description, tags, href }>`.

- [ ] **Step 1: Replace `masterclassSection` and `masterclasses` in `home.json`**

In `src/components/data/home.json`, replace this block (currently lines 157-188):

```json
  "masterclassSection": {
    "eyebrow": "Masterclasses",
    "title": "Learn from the best, on your time",
    "intro": "Self-paced sessions led by mentors at the top of their craft.",
    "align": "left"
  },
  "masterclasses": [
    {
      "title": "Creative Confidence",
      "author": "Natasha Rose",
      "role": "Senior Designer",
      "href": "/shows",
      "gradient": "linear-gradient(150deg, #FF8A5B 0%, #FF6FB5 55%, #C86DD7 100%)",
      "avatar": "https://i.pravatar.cc/200?img=5"
    },
    {
      "title": "Financial Freedom",
      "author": "Elisa Smith",
      "role": "Finance Mentor",
      "href": "/shows",
      "gradient": "linear-gradient(150deg, #2AF598 0%, #1CB5E0 60%, #4F8DFD 100%)",
      "avatar": "https://i.pravatar.cc/200?img=20"
    },
    {
      "title": "Business Strategy",
      "author": "Samantha William",
      "role": "Growth Lead",
      "href": "/shows",
      "gradient": "linear-gradient(150deg, #7B5CFF 0%, #9D50FF 55%, #C86DD7 100%)",
      "avatar": "https://i.pravatar.cc/200?img=32"
    }
  ],
```

with:

```json
  "competencesSection": {
    "eyebrow": "Compétences",
    "title": "Des solutions concrètes à vos problématiques juridiques",
    "intro": "Quatre domaines d'intervention pour accompagner particuliers et professionnels.",
    "align": "left"
  },
  "competences": [
    {
      "title": "Droit des contrats et droit des assurances",
      "description": "Litiges contractuels, sinistres, refus de garantie : les rapports contractuels et assurantiels génèrent souvent des tensions qui nécessitent un accompagnement juridique rigoureux.",
      "tags": ["Baux", "Contrats", "Créances", "Conseils précontractuels", "Sinistres"],
      "href": "/contact"
    },
    {
      "title": "Droit immobilier",
      "description": "Vente, construction, copropriété, troubles de voisinage : les questions immobilières impliquent des enjeux financiers et juridiques majeurs.",
      "tags": ["Vente immobilière", "Construction", "Copropriété", "Troubles de voisinage"],
      "href": "/contact"
    },
    {
      "title": "Droit de la famille",
      "description": "Séparation, divorce, autorité parentale, succession : les événements de la vie familiale exigent un accompagnement humain autant que juridique.",
      "tags": ["Divorce", "Garde d'enfants", "Pension alimentaire", "Succession"],
      "href": "/contact"
    },
    {
      "title": "Droit du travail",
      "description": "Licenciement, rupture conventionnelle, harcèlement, contentieux prud'homal : les relations de travail sont sources de litiges qui nécessitent d'être défendu avec fermeté.",
      "tags": ["Licenciement", "Rupture conventionnelle", "Contentieux prud'homal", "Harcèlement"],
      "href": "/contact"
    }
  ],
```

- [ ] **Step 2: Update `index.astro` to use the renamed keys**

In `src/pages/index.astro`, replace:

```astro
  <GradientCards
    data={home.masterclassSection}
    items={home.masterclasses}
    client:visible
  />
```

with:

```astro
  <GradientCards
    data={home.competencesSection}
    items={home.competences}
    client:visible
  />
```

- [ ] **Step 3: Verify the build**

Run: `npm run build`
Expected: build completes with no errors, no references to `masterclassSection`/`masterclasses` remain (`grep -rn "masterclassSection\|masterclasses" src` returns nothing).

- [ ] **Step 4: Manual visual check**

Run: `npm run dev`, open the homepage in a browser, scroll to the "Compétences" section.
Expected: 4 cards in sober gold/anthracite gradients, each showing a sentence-case title, the problem-statement description, wrapped tag chips, and a single arrow in the bottom-right corner. Confirm the whole card is a clickable link to `/contact` (hover shows pointer + arrow shifts slightly per the `:hover` rule from Task 1) and that layout holds up on a narrow (mobile-width) viewport.

- [ ] **Step 5: Commit**

```bash
git add src/components/data/home.json src/pages/index.astro
git commit -m "content: replace masterclasses with competences content"
```
