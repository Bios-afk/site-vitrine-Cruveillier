# Section "Présentation du cabinet" sur la page d'accueil

## Contexte

La page d'accueil (`src/pages/index.astro`) n'a pas de section qui présente le
cabinet lui-même (qui est Maître Anaïs Cruveiller, où, dans quel esprit) avant
d'entrer dans le détail des domaines de compétence. Le seul texte de ce type
existe aujourd'hui dans `home.json` sous `meta.description` et `hero.description`
(une seule phrase), pas assez pour porter la présentation complète fournie par la
cliente.

Objectif : ajouter une nouvelle section "Présentation du cabinet", positionnée
entre `FeatureStrip` (Efficacité / Rigueur / Proximité) et `GradientCards`
(Compétences), qui reprend le langage visuel de la carte `CtaBand` existante
(fond `--hero-surface`, coins `--radius-xl`) mais dans une disposition à deux
colonnes image + texte plutôt que le texte centré actuel du CTA.

## Contenu

Texte fourni par la cliente, structuré en paragraphes + deux points
d'adaptabilité distincts :

- **Eyebrow** : "Le cabinet"
- **Titre** : "Présentation du cabinet"
- **Paragraphe 1** : "Ecouter, comprendre, défendre telle est la devise du
  Cabinet d'Avocat Anaïs CRUVEILLER qui vous accueille en plein cœur de
  Bordeaux."
- **Paragraphe 2** (introduit les deux badges) : "Soucieux d'apporter des
  réponses adéquates à vos différentes problématiques, le Cabinet n'hésite pas
  à s'adapter à vos différents besoins :"
- **Badges d'adaptabilité** (voir Design visuel) :
  - "Des rendez-vous adaptés à vos contraintes professionnelles (horaires,
    déplacements)."
  - "Des rendez-vous adaptés à votre situation géographique."
- **Paragraphe 3** : "Maître Anaïs CRUVEILLER a choisi d'exercer en structure
  individuelle afin de pouvoir être au plus près de ses clients. Pour autant,
  elle n'hésite pas à s'adjoindre en cas de besoins les services de
  professionnels spécialisés."
- **Paragraphe 4** : "Fort de son dynamisme et de son souhait de rendre
  accessible à tous les différentes problématiques juridiques, le Cabinet
  d'Avocat Anaïs CRUVEILLER saura défendre vos intérêts et vous apporter des
  réponses pertinentes et argumentées."
- **Image** : photo du cabinet. Pas de photo définitive fournie pour l'instant
  → `/img/hero.jpg` réutilisée comme placeholder (chemin à changer dans
  `home.json` dès qu'une vraie photo est disponible, aucun changement de code
  nécessaire à ce moment-là).

## Design visuel

Réutilisation exclusive des tokens existants (couleurs, rayons, police) — pas de
nouvelle direction visuelle, conformément à la demande de rester dans le style
actuel du site.

- **Carte** : mêmes tokens que `CtaBand` (`background: var(--hero-surface)`,
  `border-radius: var(--radius-xl)`, `color: var(--on-hero)`), mais
  `overflow: hidden` pour permettre à l'image de "saigner" jusqu'aux bords de
  la carte (voir ci-dessous) — c'est ce conteneur qui reprend visuellement le
  bloc "Go to the next level with us".
- **Disposition** : deux colonnes via la classe utilitaire `.nlm-split`
  existante (déjà utilisée par `Footer.jsx`), avec `--split-cols: 1fr 1.1fr`,
  `--split-align: stretch` et `gap: 0` (override inline, la classe de base
  passe autrement à `gap: 2.5rem` ≥768px).
  - Colonne image : occupe toute la hauteur de la rangée (stretch), aucun
    rayon propre — c'est le `overflow: hidden` du parent qui la découpe aux
    coins de la carte. Sur mobile (`.nlm-split` repasse en une colonne),
    l'image devient la première rangée en haut, pleine largeur.
  - Colonne texte : padding interne `clamp(2rem, 5vw, 3.5rem)`, eyebrow
    (icône `scales` + "Le cabinet"), `<h2>` "Présentation du cabinet",
    paragraphes, badges, paragraphes suivants.
- **Badges d'adaptabilité** : les deux points ne sont pas rendus comme du texte
  à tiret (`FeatureStrip` utilise déjà ce pattern juste au-dessus pour
  Efficacité/Rigueur/Proximité — une répétition du même motif serait
  redondante). Ils sont rendus comme deux badges compacts avec icône, sur le
  modèle visuel de `.nlm-chip` (déjà utilisé pour les tags des cartes
  Compétences juste en dessous dans la page) :
  - icône `clock` + "Des rendez-vous adaptés à vos contraintes
    professionnelles (horaires, déplacements)."
  - icône `location` + "Des rendez-vous adaptés à votre situation
    géographique."
  - Empilés verticalement (pas en ligne), via le nouveau modificateur
    `.nlm-chip--on-hero` (voir Changements techniques) pour rester lisible sur
    `--hero-surface` — `.nlm-chip` seul est pensé pour un fond clair par
    défaut.
- **Animation** : `Reveal` en enveloppe de la carte, comme les autres sections
  (`CtaBand`, `FeatureStrip`).

## Changements techniques

- **Nouveau composant** `src/components/sections/PresentationBand.jsx` :
  - Props `{ data }` avec `{ eyebrow, title, image, paragraphs, badges }`.
  - `paragraphs` : tableau de strings, rendues en `<p>` séquentiels.
  - `badges` : tableau de `{ icon, text }`, rendues en badges façon chip
    on-hero (voir Design visuel).
  - Image rendue via `ProtectedMedia` (cohérence avec `Hero.jsx`, protection
    anti-clic-droit déjà en place ailleurs sur le site).
- `src/components/data/home.json` : nouvelle clé `presentationSection` entre
  `featureStrip` et `showsSection` :
  ```json
  "presentationSection": {
    "eyebrow": "Le cabinet",
    "title": "Présentation du cabinet",
    "image": { "src": "/img/hero.jpg", "alt": "Le Cabinet d'Avocat Anaïs Cruveiller à Bordeaux" },
    "paragraphs": [
      "Ecouter, comprendre, défendre telle est la devise du Cabinet d'Avocat Anaïs CRUVEILLER qui vous accueille en plein cœur de Bordeaux.",
      "Soucieux d'apporter des réponses adéquates à vos différentes problématiques, le Cabinet n'hésite pas à s'adapter à vos différents besoins :",
      "Maître Anaïs CRUVEILLER a choisi d'exercer en structure individuelle afin de pouvoir être au plus près de ses clients. Pour autant, elle n'hésite pas à s'adjoindre en cas de besoins les services de professionnels spécialisés.",
      "Fort de son dynamisme et de son souhait de rendre accessible à tous les différentes problématiques juridiques, le Cabinet d'Avocat Anaïs CRUVEILLER saura défendre vos intérêts et vous apporter des réponses pertinentes et argumentées."
    ],
    "badges": [
      { "icon": "clock", "text": "Des rendez-vous adaptés à vos contraintes professionnelles (horaires, déplacements)." },
      { "icon": "location", "text": "Des rendez-vous adaptés à votre situation géographique." }
    ]
  }
  ```
  Le badge "Des rendez-vous adaptés à…" est retiré du tableau `paragraphs` et
  déplacé dans `badges` (au lieu d'un préfixe `-` en dur dans une string, sur
  le modèle `featureStrip`) puisqu'il devient un composant visuel distinct.
- `src/styles/global.css` : nouveau modificateur `.nlm-chip--on-hero` (même
  logique que `.nlm-btn--on-hero` existant : fond
  `color-mix(in oklab, white 12%, transparent)`, texte `var(--on-hero)`,
  bordure `color-mix(in oklab, white 22%, transparent)`), appliqué en plus de
  `.nlm-chip` sur les badges de cette section.
- `src/pages/index.astro` :
  - `import PresentationBand from "../components/sections/PresentationBand.jsx";`
  - `<PresentationBand data={home.presentationSection} client:visible />`
    inséré entre `<FeatureStrip ... />` et `<GradientCards ... />`.

## Hors périmètre

- Remplacement du placeholder `/img/hero.jpg` par une vraie photo du cabinet :
  à faire dès que la cliente fournit le fichier, simple changement de valeur
  dans `home.json`.
- Ajout d'un bouton/CTA dans cette section (ex. "En savoir plus") : non
  demandé, la section a un rôle de présentation, le CTA final de la page
  (`CtaBand`) reste le seul appel à l'action de la page d'accueil.
- Réutilisation de cette section ou de son contenu sur la page `about.astro`
  (qui contient encore du contenu générique du template) : chantier séparé,
  non demandé ici.
