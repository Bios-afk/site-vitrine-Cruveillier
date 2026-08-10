# Transformation de la section GradientCards en section "Compétences"

## Contexte

La page d'accueil (`src/pages/index.astro`) contient encore une section héritée du
template de base "Next Level Mentors" : `GradientCards`, utilisée pour des cartes
vidéo de "masterclasses" (dégradés vifs, bouton play, avatar, auteur/rôle). Cette
section n'a pas de sens pour le site du Cabinet d'Avocat Anaïs Cruveiller.

Objectif : transformer cette section en une présentation des **compétences /
domaines d'intervention** du cabinet, en gardant la mécanique visuelle de carte à
fond dégradé (déjà en place et fonctionnelle) mais avec un contenu et un style
adaptés à un site d'avocat.

`GradientCards` n'est utilisé qu'à un seul endroit du site (`index.astro`), donc le
composant est modifié directement plutôt que dupliqué ou rendu générique pour un
usage vidéo qui n'existe plus.

## Contenu

Chaque carte affiche :
- **Titre** du domaine de compétence (ex. "Droit des contrats et droit des assurances")
- **Description** : une phrase de problématique juridique spécifique au domaine
- **Tags** : une liste de mots-clés associés (ex. "Baux", "Contrats", "Créances", "Conseils précontractuels")

Contenu de départ (brouillon validé, modifiable ensuite dans `home.json`) :

1. **Droit des contrats et droit des assurances**
   Description : "Litiges contractuels, sinistres, refus de garantie : les rapports
   contractuels et assurantiels génèrent souvent des tensions qui nécessitent un
   accompagnement juridique rigoureux."
   Tags : Baux, Contrats, Créances, Conseils précontractuels, Sinistres

2. **Droit immobilier**
   Description : "Vente, construction, copropriété, troubles de voisinage : les
   questions immobilières impliquent des enjeux financiers et juridiques majeurs."
   Tags : Vente immobilière, Construction, Copropriété, Troubles de voisinage

3. **Droit de la famille**
   Description : "Séparation, divorce, autorité parentale, succession : les
   événements de la vie familiale exigent un accompagnement humain autant que
   juridique."
   Tags : Divorce, Garde d'enfants, Pension alimentaire, Succession

4. **Droit du travail**
   Description : "Licenciement, rupture conventionnelle, harcèlement, contentieux
   prud'homal : les relations de travail sont sources de litiges qui nécessitent
   d'être défendu avec fermeté."
   Tags : Licenciement, Rupture conventionnelle, Contentieux prud'homal, Harcèlement

Section : eyebrow "Compétences", titre "Des solutions concrètes à vos
problématiques juridiques" (ou équivalent), pas d'intro obligatoire.

## Design visuel

- Les 4 dégradés vifs actuels (`#FF8A5B→#FF6FB5→#C86DD7`, `#2AF598→#1CB5E0→#4F8DFD`,
  etc.) sont remplacés par 4 dégradés sobres "ton sur ton", dans la famille de
  couleurs du site (accent or/bronze `--accent: #b08d3d` + tons anthracite/olive du
  thème sombre `--background` dark `#12160b`). Les 4 variantes doivent se lire
  comme une même famille (même logique de dégradé, légères variations de teinte),
  pas comme des couleurs arbitraires.
- Le titre de carte passe de **tout-majuscule** à **casse normale** (Title Case /
  phrase normale), toujours en gras, pour rester lisible avec des intitulés
  juridiques plus longs que les titres courts du template d'origine.
- La description (phrase de problématique) s'affiche sous le titre, en texte clair
  sur fond dégradé, taille de corps de texte standard.
- Les tags s'affichent sous forme de petites pastilles ("chips") en verre dépoli
  (fond blanc semi-transparent, façon `.nlm-btn--on-hero`), qui passent à la ligne
  si nécessaire (flex-wrap).
- Une flèche (icône `ArrowUpRight`, déjà présente dans `Icons.jsx`) apparaît en bas
  de carte. **Toute la carte est cliquable** et pointe vers `/contact` (pas de
  pages de détail par compétence pour l'instant — voir "Hors périmètre").
- Suppression complète du bouton play, de l'avatar et des champs auteur/rôle
  (`ProtectedMedia`, `Play` icon ne sont plus utilisés par ce composant).

## Changements techniques

- `src/components/sections/GradientCards.jsx` :
  - Retirer les imports `ProtectedMedia` et `Play` (plus utilisés).
  - Remplacer le rendu de `.nlm-gcard__meta` (auteur/rôle) par une description et
    une liste de tags.
  - Remplacer `.nlm-gcard__footer` (play + avatar) par une flèche seule.
  - `item.href` reste le mécanisme qui rend la carte cliquable (`<a>` vs `<div>`) —
    inchangé, mais chaque item du contenu compétences fournira `href: "/contact"`.
  - Palette de dégradés par défaut (`FALLBACK_GRADIENTS`) remplacée par la
    nouvelle palette sobre à 4 tons.
- `src/styles/global.css` :
  - `.nlm-gcard__title` : retirer `text-transform: uppercase`.
  - Nouvelles classes pour la description (`.nlm-gcard__desc` ou équivalent) et les
    tags (`.nlm-gcard__tags`, `.nlm-gcard__tag`), basées sur le look "glass" déjà
    utilisé par `.nlm-btn--on-hero`.
  - `.nlm-gcard__footer` simplifié (une seule flèche au lieu de play + avatar).
- `src/components/data/home.json` :
  - Renommer `masterclassSection` → `competencesSection` et `masterclasses` →
    `competences` (clés plus explicites ; ces clés génériques de template n'ont pas
    de sens conservées telles quelles).
  - Nouveau contenu (voir section Contenu ci-dessus), avec `href: "/contact"` sur
    chaque carte et sans `author`/`role`/`avatar`.
- `src/pages/index.astro` : mettre à jour les props passées à `<GradientCards>`
  (`data={home.competencesSection}` / `items={home.competences}`).

## Hors périmètre

- Création de pages de détail par compétence (ex. `/competences/droit-des-contrats`) :
  chantier séparé, à traiter une fois le contenu juridique complet de chaque page
  disponible. Pour l'instant, toutes les cartes pointent vers `/contact`.
- Modification de la navigation (`navigation.json`) : pas d'ancre ou de lien dédié
  "Compétences" ajouté pour l'instant.
