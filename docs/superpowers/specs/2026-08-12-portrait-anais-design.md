# Section "Maître Anaïs CRUVEILLER" (portrait) sur la page d'accueil

## Contexte

La page d'accueil présente le cabinet (`PresentationBand`) et ses domaines de
compétence (`GradientCards`), mais aucune section ne présente Maître Anaïs
Cruveiller elle-même — son parcours, sa formation, ses engagements
associatifs, et ce qui motive sa pratique du droit. La cliente a fourni un
texte de présentation personnelle complet à intégrer.

Objectif : ajouter une nouvelle section entre `PresentationBand` et
`GradientCards` sur `index.astro`, avec pour titre exact "Maître Anaïs
CRUVEILLER, Avocat à la Cour" (pas "À propos"), un portrait photo, et le
texte fourni.

Contrainte explicite de la cliente : ne pas répéter un type de container déjà
utilisé ailleurs sur la page (carte sombre `--hero-surface` de
`PresentationBand`/`CtaBand`, grille de cartes claires bordées de
`GradientCards`). Cette section doit avoir sa propre identité visuelle tout en
restant dans les mêmes tokens (couleurs, rayons, police) que le reste du
site.

## Contenu

- **Titre** : "Maître Anaïs CRUVEILLER, Avocat à la Cour" (texte exact fourni,
  conservé tel quel — pas de reformulation).
- **Portrait** : photo de Maître Cruveiller. Pas de photo définitive fournie
  → `/img/hero.jpg` en placeholder (comme pour `PresentationBand`), à
  remplacer dans `home.json` sans changement de code.
- **Paragraphes** (4, dans cet ordre) :
  1. "Maitre Anaïs CRUVEILLER est originaire de Blaye en région bordelaise."
  2. "Après avoir suivi un cursus de Droit privé Général et obtenu un Master 2
     « Droit et Pratiques des assurances, elle a obtenu le Certificat
     d'Aptitude à la profession d'Avocat et prêté serment en 2013."
  3. "Ayant pu acquérir de l'expérience professionnelles auprès de cabinets
     d'Avocats, d'établissements bancaires, de compagnies d'assurances, elle
     bénéficie d'une formation pratique et concrète, ancrée dans la réalité
     de la vie quotidienne."
  4. "Membre du Centre de défense pénale, du Centre de recherche,
     d'information et de consultation sur les Droits de l'enfant (CRIC) et de
     l'Institut du Droit Equin, elle sait s'entourer de confrères et de
     professionnels pouvant apporter un éclairage particuliers sur des
     problématiques techniques."
- **Phrase de transition** (avant les citations) : "En choisissant
  d'embrasser la profession d'Avocat, Maître Anaïs CRUVEILLER a souhaité
  mettre en application ses compétences techniques et ses valeurs humaines :"
- **Citations** (2, affichées en pull-quotes) :
  1. « Parce que derrière chaque dossier, il y a une personne, une famille,
     il est essentiel que celle-ci soit informé à chaque étape de la
     procédure et puisse comprendre les enjeux de celle-ci »
  2. « Parce que passer la porte d'un Cabinet d'Avocat n'est pas un geste
     anodin, parce qu'il est essentiel d'établir une relation de confiance,
     l'Avocat doit être un partenaire à l'écoute des problématiques de son
     Client. »

Tout le texte ci-dessus est copié verbatim depuis le message de la cliente
(fautes de frappe/accords d'origine comprises — pas de correction
orthographique non demandée).

## Design visuel

Approuvé avec la cliente : pas de carte/container (ni fond `--hero-surface`,
ni `.nlm-card` bordé) — la section vit directement sur le fond de page, en
grille asymétrique à deux colonnes (~2fr photo / 3fr texte), réutilisant
uniquement la mécanique de grille de `.nlm-split` (sans son habillage de
carte). Sur mobile, une seule colonne (comportement déjà géré par
`.nlm-split`), photo au-dessus du texte.

- **Portrait** : traitement "cadre décalé" — un aplat `background: var(--accent)`
  positionné en absolu, décalé d'environ 1rem (bas + droite) derrière la
  photo, tous deux avec `border-radius: var(--radius-lg)` ; la photo
  elle-même a une légère ombre portée (`box-shadow`) pour se détacher du
  cadre. Nouveau device visuel, pas de réutilisation littérale d'un pattern
  existant, mais tokens (`--accent`, `--radius-lg`) inchangés.
- **Texte** : titre en `<h2 class="nlm-display">` (comme les autres titres de
  section), paragraphes en `--foreground-secondary`, phrase de transition
  identique aux paragraphes.
- **Citations (pull-quotes)** : nouveau style dédié — texte plus grand que le
  corps (`~1.15rem`), couleur pleine `--foreground` (pas atténuée, contraste
  avec le reste du texte), `border-left: 3px solid var(--accent)`,
  `padding-left`. Pas de gros guillemet décoratif surdimensionné — juste les
  guillemets français « » dans le texte lui-même.
- **Animation** : `Reveal`, comme les autres sections de la page.

## Changements techniques

- **Nouveau composant** `src/components/sections/PortraitBand.jsx` :
  - Props `{ data }` avec `{ title, image, paragraphs, transition, quotes }`.
  - `image` : `{ src, alt }`, rendue via `ProtectedMedia` (cohérence avec
    `Hero.jsx`/`PresentationBand.jsx`), avec le cadre décalé en `<div>` `::before`-like
    (élément frère positionné derrière, pas de pseudo-élément CSS pour rester
    cohérent avec le style inline du reste du codebase).
  - `paragraphs` : tableau de strings → `<p>` séquentiels.
  - `transition` : string affichée comme un paragraphe final avant les
    citations (même style que `paragraphs`, champ séparé uniquement pour
    clarifier l'intention dans le JSON).
  - `quotes` : tableau de strings → chaque citation dans un `<blockquote>`
    stylé en pull-quote.
- `src/components/data/home.json` : nouvelle clé `portraitSection` entre
  `presentationSection` et `competencesSection` :
  ```json
  "portraitSection": {
    "title": "Maître Anaïs CRUVEILLER, Avocat à la Cour",
    "image": { "src": "/img/hero.jpg", "alt": "Maître Anaïs Cruveiller" },
    "paragraphs": [
      "Maitre Anaïs CRUVEILLER est originaire de Blaye en région bordelaise.",
      "Après avoir suivi un cursus de Droit privé Général et obtenu un Master 2 « Droit et Pratiques des assurances, elle a obtenu le Certificat d'Aptitude à la profession d'Avocat et prêté serment en 2013.",
      "Ayant pu acquérir de l'expérience professionnelles auprès de cabinets d'Avocats, d'établissements bancaires, de compagnies d'assurances, elle bénéficie d'une formation pratique et concrète, ancrée dans la réalité de la vie quotidienne.",
      "Membre du Centre de défense pénale, du Centre de recherche, d'information et de consultation sur les Droits de l'enfant (CRIC) et de l'Institut du Droit Equin, elle sait s'entourer de confrères et de professionnels pouvant apporter un éclairage particuliers sur des problématiques techniques."
    ],
    "transition": "En choisissant d'embrasser la profession d'Avocat, Maître Anaïs CRUVEILLER a souhaité mettre en application ses compétences techniques et ses valeurs humaines :",
    "quotes": [
      "Parce que derrière chaque dossier, il y a une personne, une famille, il est essentiel que celle-ci soit informé à chaque étape de la procédure et puisse comprendre les enjeux de celle-ci",
      "Parce que passer la porte d'un Cabinet d'Avocat n'est pas un geste anodin, parce qu'il est essentiel d'établir une relation de confiance, l'Avocat doit être un partenaire à l'écoute des problématiques de son Client."
    ]
  }
  ```
  (Les guillemets français d'ouverture/fermeture sont ajoutés au rendu par le
  composant, pas stockés dans le JSON, pour éviter la duplication si le style
  de citation change plus tard.)
- `src/styles/global.css` : nouvelles classes `.nlm-portrait-frame` (le cadre
  décalé) et `.nlm-pullquote` (le style de citation).
- `src/pages/index.astro` : import de `PortraitBand`, rendu entre
  `<PresentationBand ... />` et `<GradientCards ... />`.

## Hors périmètre

- Remplacement du placeholder `/img/hero.jpg` par une vraie photo de Maître
  Cruveiller : à faire dès que la cliente fournit le fichier, simple
  changement de valeur dans `home.json`.
- Lien de navigation dédié vers cette section (ancre `#portrait` ou autre) :
  non demandé.
