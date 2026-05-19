# Rapport d'Audit Complet — Fixturbo Frontend

> **Stack identifiée :** React 19 + Vite + TypeScript + Tailwind CSS v3 + shadcn/ui + Framer Motion + react-router
>
> **Date de l'audit :** 19/05/2026

---

## Table des matières
1. [Architecture & Dépendances](#1-architecture--dépendances)
2. [Code mort & Fichiers inutilisés](#2-code-mort--fichiers-inutilisés)
3. [CSS / Tailwind / Responsive](#3-css--tailwind--responsive)
4. [Composants mal structurés](#4-composants-mal-structurés)
5. [Design UI/UX & Cohérence visuelle](#5-design-uiux--cohérence-visuelle)
6. [Performances Frontend](#6-performances-frontend)
7. [Animations & Transitions](#7-animations--transitions)
8. [Accessibilité (a11y)](#8-accessibilité-a11y)
9. [PWA & SEO](#9-pwa--seo)
10. [Maintenabilité & Bonnes pratiques](#10-maintenabilité--bonnes-pratiques)

---

## 1. Architecture & Dépendances

### 1.1 — React-router inutile pour une Single Page
- **Problème :** `react-router` est importé et configuré avec `<BrowserRouter>` / `<Routes>` alors qu'il n'existe qu'une seule route (`/`).
- **Pourquoi c'est un problème :** Ajoute ~18 kB au bundle pour zéro valeur fonctionnelle. Complexifie le rendu et le SSR/hydratation si jamais migré.
- **Priorité :** Moyen
- **Solution :** Supprimer `react-router`, `<BrowserRouter>`, `<Routes>` et `<Route>`. Remplacer par un simple rendu conditionnel ou un import direct de `<Home />` dans `App.tsx`.
- **Fichiers concernés :** `src/main.tsx`, `src/App.tsx`, `package.json`

### 1.2 — Énorme sur-installation de dépendances shadcn/ui & tierces
- **Problème :** Près de 40 composants shadcn/ui sont présents dans `src/components/ui/`, mais **aucun** n'est importé hors du dossier `ui` (seuls des imports internes existent). De plus, des librairies comme `recharts`, `embla-carousel-react`, `input-otp`, `cmdk`, `vaul`, `sonner`, `react-resizable-panels`, `date-fns`, `react-day-picker` sont installées mais jamais utilisées.
- **Pourquoi c'est un problème :** Le `node_modules` et le bundle de build sont considérablement alourdis. Le temps d'installation et de build augmente. Risque de vulnérabilités sur des libs inutiles.
- **Priorité :** Critique
- **Solution :** Supprimer tous les composants `src/components/ui/` non utilisés (tous sauf éventuellement `button` si besoin futur). Désinstaller les packages inutilisés du `package.json` et réinstaller.
- **Fichiers concernés :** `package.json`, `src/components/ui/*`, `package-lock.json`

### 1.3 — Mauvaise configuration shadcn (`components.json`)
- **Problème :** Le champ `"tailwind.config"` pointe vers `postcss.config.js` au lieu de `tailwind.config.js`.
- **Pourquoi c'est un problème :** shadcn/ui CLI et les outils d'introspection ne trouveront pas la config Tailwind. Cela peut casser les ajouts futurs de composants.
- **Priorité :** Moyen
- **Solution :** Corriger la valeur en `"tailwind.config.js"`.
- **Fichiers concernés :** `components.json`

### 1.4 — Duplication de plugin d'animation Tailwind
- **Problème :** `tailwindcss-animate` et `tw-animate-css` sont tous deux installés. Seul `tailwindcss-animate` est utilisé dans `tailwind.config.js`.
- **Pourquoi c'est un problème :** Double dépendance inutile, risque de conflits CSS si les deux étaient importés.
- **Priorité :** Faible
- **Solution :** Désinstaller `tw-animate-css`.
- **Fichiers concernés :** `package.json`, `tailwind.config.js`

---

## 2. Code mort & Fichiers inutilisés

### 2.1 — `App.css` entièrement mort
- **Problème :** Le fichier contient les styles par défaut du template Vite (`#root`, `.logo`, `@keyframes logo-spin`, etc.) et **n'est jamais importé**.
- **Pourquoi c'est un problème :** Fichier fantôme qui prête à confusion pour les nouveaux développeurs.
- **Priorité :** Faible
- **Solution :** Supprimer `src/App.css`.
- **Fichiers concernés :** `src/App.css`

### 2.2 — Hook `useIsMobile` jamais utilisé
- **Problème :** `src/hooks/use-mobile.ts` existe mais aucun composant ne l'importe.
- **Pourquoi c'est un problème :** Code mort qui pourrait induire en erreur.
- **Priorité :** Faible
- **Solution :** Supprimer le fichier, ou l'utiliser dans `Navbar.tsx` pour remplacer la logique `lg:hidden` / `hidden lg:flex` si une logique JS est nécessaire.
- **Fichiers concernés :** `src/hooks/use-mobile.ts`

### 2.3 — Composants shadcn/ui inutilisés (57+ fichiers)
- **Problème :** Tout le dossier `src/components/ui/` (accordion, alert-dialog, breadcrumb, calendar, carousel, chart, command, dialog, drawer, dropdown-menu, form, hover-card, input-otp, menubar, navigation-menu, pagination, popover, resizable, scroll-area, select, sidebar, skeleton, slider, sonner, table, tabs, toast, toggle, tooltip, etc.) est présent mais **jamais consommé** par l'application.
- **Pourquoi c'est un problème :** Enorme charge de maintenance, risque de faux positifs lors des scans de sécurité, build plus lent.
- **Priorité :** Critique
- **Solution :** Supprimer le dossier entier `src/components/ui/`. Si besoin futur, ré-ajouter via `npx shadcn add <component>`.
- **Fichiers concernés :** `src/components/ui/*`

---

## 3. CSS / Tailwind / Responsive

### 3.1 — Classe `duration-400` et `duration-600` inexistantes dans Tailwind
- **Problème :** `duration-400` et `duration-600` sont utilisées dans `Projects.tsx`, `Services.tsx`, `Pricing.tsx`, etc. Tailwind v3 ne fournit que des multiples de 75/100/150/200/300/500/700/1000 par défaut.
- **Pourquoi c'est un problème :** Ces classes ne génèrent aucune règle CSS. Les transitions hover sont donc instantanées (fallback au défaut du navigateur `0s`), ce qui casse l'effet visuel attendu.
- **Priorité :** Moyen
- **Solution :** Remplacer par `duration-300` / `duration-500` ou ajouter les valeurs dans `tailwind.config.js` : `transitionDuration: { 400: '400ms', 600: '600ms' }`.
- **Fichiers concernés :** `src/sections/Projects.tsx`, `src/sections/Services.tsx`, `src/sections/Pricing.tsx`, `src/sections/Blog.tsx`, `src/sections/Team.tsx`

### 3.2 — Largeur max arbitraire `max-w-[1320px]` répétée partout
- **Problème :** La valeur `max-w-[1320px]` est dupliquée dans **chaque** section (`Hero`, `Services`, `About`, `Navbar`, `Footer`, etc.).
- **Pourquoi c'est un problème :** Si le design change (ex: passage à 1280px), il faut modifier ~15 fichiers. Risque d'oubli et d'incohérence visuelle.
- **Priorité :** Moyen
- **Solution :** Ajouter `container: { center: true, padding: '1.5rem', screens: { DEFAULT: '1320px' } }` dans `tailwind.config.js`, ou créer un composant `<Container>` réutilisable.
- **Fichiers concernés :** Tous les fichiers `src/sections/*.tsx`, `src/components/Navbar.tsx`, `src/components/Footer.tsx`

### 3.3 — `App.css` potentiellement en conflit si importé un jour
- **Problème :** `#root { max-width: 1280px; margin: 0 auto; padding: 2rem; text-align: center; }` dans `App.css` est incompatible avec le design full-width du site.
- **Pourquoi c'est un problème :** Si un développeur ajoute `import './App.css'` plus tard, le layout complet sera cassé (centrage forcé, padding, max-width).
- **Priorité :** Faible
- **Solution :** Supprimer `App.css` (voir 2.1).
- **Fichiers concernés :** `src/App.css`

### 3.4 — Styles en ligne dans le JSX (`style={{ clipPath: ... }}`, `style={{ textShadow: ... }}`)
- **Problème :** Plusieurs sections utilisent des `style={{ ... }}` inline pour des effets visuels (clip-path du Hero, text-shadow du StatsCounter, background repeating-linear-gradient de Appointment).
- **Pourquoi c'est un problème :** Pas de possibilité de surcharge via CSS, moins performant (objet recréé à chaque render), pollue le JSX. Le `text-shadow` inline dans `StatsCounter` duplique aussi la classe utilitaire `.text-shadow-hero` définie dans `index.css`.
- **Priorité :** Faible
- **Solution :** Déplacer ces styles dans des classes utilitaires Tailwind via `@layer utilities` dans `index.css`, ou utiliser des classes arbitraires Tailwind quand c'est possible.
- **Fichiers concernés :** `src/sections/Hero.tsx`, `src/sections/StatsCounter.tsx`, `src/sections/Appointment.tsx`

### 3.5 — Problème de responsive sur `WhatWeDo.tsx` en mobile
- **Problème :** En dessous de `lg`, les 3 colonnes passent à 1 colonne. Cependant, les items de gauche conservent `text-right` et `flex-row-reverse`, ce qui place l'icône à droite du texte sur mobile. Le résultat est un alignement contre-intuitif (texte collé à gauche, icône à droite).
- **Pourquoi c'est un problème :** Mauvaise expérience utilisateur mobile : le lecteur lit de gauche à droite mais l'icône est à droite.
- **Priorité :** Moyen
- **Solution :** Sur mobile (`flex-col`), forcer `text-left` et `flex-row` pour tous les `ServiceItem`, ou au moins aligner le texte à gauche avec l'icône en début de ligne.
- **Fichiers concernés :** `src/sections/WhatWeDo.tsx`

### 3.6 — Débordement horizontal potentiel (overflow) dans `About.tsx` et `FAQ.tsx`
- **Problème :** Des éléments positionnés en `absolute -left-4` (About trusted card) et `absolute -left-4 bottom-8` (FAQ floating card) peuvent dépasser du viewport sur mobile, créant un scroll horizontal (`overflow-x`).
- **Pourquoi c'est un problème :** Le `body` ou le `section` parent peut scroller horizontalement sur écran étroit.
- **Priorité :** Moyen
- **Solution :** Remplacer `-left-4` par `left-4` sur mobile via `left-4 lg:-left-4`, ou s'assurer que le parent a `overflow-hidden`.
- **Fichiers concernés :** `src/sections/About.tsx`, `src/sections/FAQ.tsx`

### 3.7 — Hauteur du Hero incorrecte sur mobile
- **Problème :** `min-h-[calc(100vh-130px)]` suppose que la top bar (50px) + le header (80px) sont toujours visibles. Or la top bar est `hidden lg:block`. Sur mobile, le décalage est donc trop grand (130px au lieu de 80px), laissant un espace blanc sous le Hero ou une section trop courte.
- **Pourquoi c'est un problème :** Espace blanc inutile ou contenu mal centré verticalement sur mobile.
- **Priorité :** Moyen
- **Solution :** Utiliser une hauteur responsive : `min-h-[calc(100vh-80px)] lg:min-h-[calc(100vh-130px)]`.
- **Fichiers concernés :** `src/sections/Hero.tsx`

### 3.8 — Utilisation de `padding: 2rem` sur `#root` dans `App.css` (code mort mais dangereux)
- **Problème :** Voir 2.1 et 3.3.
- **Priorité :** Faible

---

## 4. Composants mal structurés

### 4.1 — Carrousel `Team.tsx` non fonctionnel
- **Problème :** `useState(0)` avec `next`/`prev` existe, mais les deux cartes membres sont rendues en dur dans une grille (`grid-cols-2`). Le state ne contrôle rien visuellement.
- **Pourquoi c'est un problème :** Les flèches de navigation sont des boutons factices qui ne font rien. L'utilisateur est trompé.
- **Priorité :** Critique
- **Solution :** Implémenter un vrai carrousel avec défilement (scroll-snap, Embla, ou Framer Motion AnimatePresence) et afficher un membre à la fois, ou supprimer les boutons `prev`/`next` si le design reste une grille statique.
- **Fichiers concernés :** `src/sections/Team.tsx`

### 4.2 — Accordéon FAQ maison au lieu du composant shadcn/ui
- **Problème :** Un composant `AccordionItem` custom est écrit dans `FAQ.tsx` avec `AnimatePresence` et `motion.div`, alors que `src/components/ui/accordion.tsx` existe déjà (mais n'est pas utilisé).
- **Pourquoi c'est un problème :** Double emploi, maintenance plus difficile, comportement potentiellement différent de l'accessibilité (pas de `aria-expanded`, pas de `aria-controls`, pas de rôles ARIA sur le bouton custom).
- **Priorité :** Moyen
- **Solution :** Soit utiliser le composant `Accordion` de shadcn/ui (si conservé), soit s'assurer que l'implémentation custom respecte l'a11y.
- **Fichiers concernés :** `src/sections/FAQ.tsx`, `src/components/ui/accordion.tsx`

### 4.3 — `Footer.tsx` : Newsletter sans `<form>` ni label
- **Problème :** L'input email et le bouton d'envoi sont enveloppés dans un simple `<div className="flex">`, pas de `<form>`, pas de `<label>`, pas d'attribut `htmlFor`.
- **Pourquoi c'est un problème :** Les lecteurs d'écran ne comprennent pas le but de l'input. Pas de soumission native avec la touche Entrée.
- **Priorité :** Moyen
- **Solution :** Envelopper dans `<form onSubmit={...}>`, ajouter `<label htmlFor="footer-email" className="sr-only">Email</label>`, ajouter `type="submit"` au bouton.
- **Fichiers concernés :** `src/components/Footer.tsx`

### 4.4 — `Appointment.tsx` : formulaire incomplet
- **Problème :** Pas de labels visibles ni `sr-only` pour les champs (Name, Email, Message). Le textarea n'a pas d'attribut `required` alors que les inputs oui. Pas de validation d'email côté client. `alert()` brut pour la confirmation.
- **Pourquoi c'est un problème :** Mauvaise accessibilité, expérience utilisateur primitive, risque de soumission vide sur le message.
- **Priorité :** Moyen
- **Solution :** Ajouter des `<label>` (visibles ou sr-only), uniformiser les validations, remplacer `alert()` par un toast ou un message intégré au formulaire.
- **Fichiers concernés :** `src/sections/Appointment.tsx`

### 4.5 — `StatsCounter.tsx` : `useRef` + `useInView` redondant
- **Problème :** Le `ref` est passé au `<span>` pour `useInView`, mais `motion.div` parent a déjà `whileInView`. Le compteur utilise sa propre logique d'observation.
- **Pourquoi c'est un problème :** Double observation d'intersection (légère perte de perf, mais surtout logique dispersée).
- **Priorité :** Faible
- **Solution :** Utiliser `whileInView` du parent pour déclencher le compteur, ou fusionner la logique.
- **Fichiers concernés :** `src/sections/StatsCounter.tsx`

---

## 5. Design UI/UX & Cohérence visuelle

### 5.1 — Incohérence du titre du site (`index.html`)
- **Problème :** `<title>Fixturbo - Car Repair & Auto Services</title>` mais le contenu du Hero affiche "GROWTH ACCELERATOR" et des textes financiers / génériques.
- **Pourquoi c'est un problème :** L'utilisateur s'attend à un site de réparation auto, mais certaines sections (Pricing : "Investment Plan", "Stoke Market", "Return Account 30%") ressemblent à un site de trading/finance.
- **Priorité :** Critique
- **Solution :** Uniformiser le copywriting. Soit c'est un garage auto, soit c'est un site d'investissement. Corriger le Pricing pour refléter des forfaits de réparation auto.
- **Fichiers concernés :** `src/sections/Pricing.tsx`, `src/sections/Hero.tsx`, `src/sections/WorkProcess.tsx`, `index.html`

### 5.2 — Texte placeholder / Lorem ipsum encore présent
- **Problème :** Plusieurs sections contiennent du faux texte : "Vestibulum rhoncus nisl ac gravida porta", "Ut elementum et mollis eu sapien neque tempus", "It is a long established fact that a reader will be distracted".
- **Pourquoi c'est un problème :** Le site n'est pas prêt pour la production. Cela nuit à la crédibilité et au SEO.
- **Priorité :** Critique
- **Solution :** Rédiger du contenu réel pour toutes les sections.
- **Fichiers concernés :** `src/sections/Hero.tsx`, `src/sections/About.tsx`, `src/sections/Services.tsx`, `src/sections/WhatWeDo.tsx`, `src/sections/WorkProcess.tsx`, `src/sections/Newsletter.tsx`, `src/sections/Team.tsx`, `src/sections/Footer.tsx`

### 5.3 — Fautes de frappe et syntaxe
- **Problème :** "One Repair At Time" → "At **A** Time". "Stoke Market" → probablement "Stock Market" (encore une incohérence avec le thème auto).
- **Pourquoi c'est un problème :** Manque de professionnalisme.
- **Priorité :** Faible
- **Solution :** Relire et corriger tous les textes.
- **Fichiers concernés :** `src/sections/Hero.tsx`, `src/sections/Pricing.tsx`

### 5.4 — Liens morts (`href="#"`)
- **Problème :** Tous les liens sociaux, footer links, "Read More", "Privacy Policy", etc. pointent vers `#`.
- **Pourquoi c'est un problème :** Clic inutile, mauvais signal SEO, frustration utilisateur.
- **Priorité :** Moyen
- **Solution :** Soit créer les pages manquantes, soit retirer les liens, soit utiliser `aria-disabled` et un style neutre.
- **Fichiers concernés :** `src/components/Footer.tsx`, `src/components/Navbar.tsx`, `src/sections/Services.tsx`, `src/sections/Projects.tsx`, `src/sections/WorkProcess.tsx`, `src/sections/Blog.tsx`

### 5.5 — Le Pricing affiche les mêmes prix pour tous les forfaits
- **Problème :** Silver, Gold, Platinum affichent tous `1.00/USD`.
- **Pourquoi c'est un problème :** Incohérence visuelle et fonctionnelle.
- **Priorité :** Moyen
- **Solution :** Adapter les prix et features à chaque forfait.
- **Fichiers concernés :** `src/sections/Pricing.tsx`

---

## 6. Performances Frontend

### 6.1 — Aucun lazy-loading des sections
- **Problème :** Toutes les 14 sections sont importées statiquement dans `Home.tsx` et rendues dès le chargement initial.
- **Pourquoi c'est un problème :** Le bundle JS initial est chargé en entier, le DOM est énorme dès le départ. Time-to-Interactive (TTI) et First Contentful Paint (FCP) peuvent être dégradés.
- **Priorité :** Moyen
- **Solution :** Utiliser `React.lazy()` + `Suspense` pour les sections situées sous le fold (ex: `Blog`, `FAQ`, `Team`, `Testimonials`, `Pricing`).
- **Fichiers concernés :** `src/pages/Home.tsx`

### 6.2 — Images non optimisées et sans lazy-loading natif
- **Problème :** Les images utilisent la balise HTML `<img>` standard sans attribut `loading="lazy"` ni `decoding="async"`. Aucun srcset ni format moderne (WebP/AVIF). Le fichier `appointment-mechanic.png` est un PNG potentiellement lourd.
- **Pourquoi c'est un problème :** Le navigateur charge toutes les images dès le parsing HTML, y compris celles hors écran. Poids réseau important.
- **Priorité :** Moyen
- **Solution :** Ajouter `loading="lazy"` aux images hors Hero. Convertir les assets en WebP. Utiliser un service d'optimisation ou un plugin Vite (`vite-plugin-imagemin`).
- **Fichiers concernés :** Tous les `src/sections/*.tsx`, `public/assets/*`

### 6.3 — Pas de préconnexion (preconnect) pour Google Fonts
- **Problème :** L'import `@import url('https://fonts.googleapis.com/...')` dans `index.css` bloque le rendu sans preconnect.
- **Pourquoi c'est un problème :** Latence DNS + TCP + TLS sur le chargement de la police.
- **Priorité :** Faible
- **Solution :** Ajouter `<link rel="preconnect" href="https://fonts.googleapis.com">` et `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` dans `index.html`.
- **Fichiers concernés :** `index.html`, `src/index.css`

### 6.4 — Framer Motion chargé globalement sans code-splitting
- **Problème :** `framer-motion` est importé dans de nombreux composants (Hero, Navbar, About, Services, etc.).
- **Pourquoi c'est un problème :** Le bundle de framer-motion est conséquent (~40 kB gzippé). Même s'il est tree-shakeable, il est présent partout.
- **Priorité :** Faible
- **Solution :** Si les performances deviennent critiques, remplacer les animations simples par des animations CSS (`@keyframes`) ou utiliser `LazyMotion` avec `domAnimation` / `domMax` pour réduire le bundle.
- **Fichiers concernés :** Tous les fichiers utilisant `framer-motion`

---

## 7. Animations & Transitions

### 7.1 — Pas de respect de `prefers-reduced-motion`
- **Problème :** Toutes les animations Framer Motion et CSS (`motion.div`, `whileInView`, transitions Tailwind) tournent sans vérifier la préférence utilisateur.
- **Pourquoi c'est un problème :** Les utilisateurs souffrant de troubles vestibulaires (vertiges, épilepsie) peuvent être affectés.
- **Priorité :** Moyen
- **Solution :** Utiliser la Media Query CSS `prefers-reduced-motion` et le hook `useReducedMotion` de framer-motion pour désactiver les animations si demandé.
- **Fichiers concernés :** `src/components/ScrollReveal.tsx`, `src/sections/Hero.tsx`, `src/sections/StatsCounter.tsx`, etc.

### 7.2 — `whileInView` sans `viewport={{ once: true }}` sur certains éléments
- **Problème :** Dans `StatsCounter.tsx`, les `motion.div` enfants n'ont pas `once: true` (ils rebouclent à chaque scroll). Le `CountUp` lui a `useInView(ref, { once: true })`, créant un décalage : le chiffre ne recommence pas, mais le fade-in oui.
- **Pourquoi c'est un problème :** Comportement visuel étrange : les chiffres restent, mais la carte refade.
- **Priorité :** Faible
- **Solution :** Aligner les comportements : soit tout se rejoue, soit tout se joue une fois.
- **Fichiers concernés :** `src/sections/StatsCounter.tsx`

---

## 8. Accessibilité (a11y)

### 8.1 — Langue du document incorrecte
- **Problème :** `<html lang="en">` alors que le site semble destiné à un public francophone ou mixte, et que certains textes sont en anglais non finalisé.
- **Pourquoi c'est un problème :** Les lecteurs d'écran prononceront le contenu avec une voix anglaise, ce qui est désagréable ou incompréhensible pour les utilisateurs francophones.
- **Priorité :** Moyen
- **Solution :** Définir `lang="fr"` (ou la langue cible) dans `index.html`.
- **Fichiers concernés :** `index.html`

### 8.2 — Boutons sans `type` explicite
- **Problème :** Dans `Team.tsx`, `FAQ.tsx`, `Testimonials.tsx`, les boutons de navigation (`prev`/`next`) n'ont pas d'attribut `type="button"`.
- **Pourquoi c'est un problème :** S'ils sont un jour placés dans un `<form>`, ils soumettront le formulaire par défaut.
- **Priorité :** Faible
- **Solution :** Ajouter `type="button"` à tous les boutons non-soumission.
- **Fichiers concernés :** `src/sections/Team.tsx`, `src/sections/FAQ.tsx`, `src/sections/Testimonials.tsx`

### 8.3 — Contrastes de couleur à vérifier
- **Problème :** `text-white/50` sur fond blanc ? Non, c'est sur fond sombre. Cependant, `text-fixturbo-text-secondary` (#666666) sur fond `bg-fixturbo-bg-cream` (#F5F5F0) a un ratio de ~4.5:1 — c'est juste au seuil WCAG AA pour du texte normal.
- **Pourquoi c'est un problème :** Sur certains écrans mal calibrés, la lisibilité peut être insuffisante.
- **Priorité :** Faible
- **Solution :** Assombrir légèrement la couleur `text-secondary` vers `#555555` ou `#595959` pour un ratio > 4.5:1.
- **Fichiers concernés :** `tailwind.config.js`

### 8.4 — Images décoratives sans `alt` approprié ou avec `alt` répétitif
- **Problème :** Certaines images de fond (StatsCounter, Testimonials left image) ont des `alt` descriptifs alors qu'elles sont purement décoratives (arrière-plan). L'image `about-secondary.jpg` a un `alt` correct, mais `hero-bg.jpg` a un `alt` pertinent.
- **Pourquoi c'est un problème :** Les lecteurs d'écran vocalisent du bruit inutile.
- **Priorité :** Faible
- **Solution :** Mettre `alt=""` (string vide) sur les images purement décoratives avec `role="presentation"` ou `aria-hidden="true"`.
- **Fichiers concernés :** `src/sections/StatsCounter.tsx`, `src/sections/Testimonials.tsx`

### 8.5 — Focus visible insuffisant sur certains éléments interactifs
- **Problème :** Les liens sociaux du Footer et les cartes de projet n'ont pas de style de focus clairement visible.
- **Pourquoi c'est un problème :** Les utilisateurs naviguant au clavier ne voient pas où ils sont.
- **Priorité :** Moyen
- **Solution :** Ajouter `focus-visible:ring-2 focus-visible:ring-fixturbo-primary` sur tous les éléments interactifs (liens, boutons).
- **Fichiers concernés :** `src/components/Footer.tsx`, `src/sections/Projects.tsx`, `src/sections/Blog.tsx`

---

## 9. PWA & SEO

### 9.1 — Aucune configuration PWA
- **Problème :** Pas de `manifest.json`, pas de Service Worker, pas de `vite-plugin-pwa`. Le site est une simple SPA statique sans capacité offline.
- **Pourquoi c'est un problème :** Mauvais score Lighthouse, pas d'installation sur mobile, pas de caching.
- **Priorité :** Faible
- **Solution :** Ajouter `vite-plugin-pwa` et générer un `manifest.json` avec icônes, theme-color, etc.
- **Fichiers concernés :** `vite.config.ts`, `index.html`

### 9.2 — Meta tags SEO manquants
- **Problème :** `index.html` ne contient que `charset`, `viewport` et `title`. Pas de `meta name="description"`, pas de `meta property="og:*"`, pas de `theme-color`, pas de `link rel="canonical"`.
- **Pourquoi c'est un problème :** Partages sociaux vides, SEO de base inexistant.
- **Priorité :** Moyen
- **Solution :** Ajouter les balises meta essentielles. Pour une SPA, utiliser `react-helmet-async` si le SSR n'est pas prévu, ou au moins peupler `index.html`.
- **Fichiers concernés :** `index.html`

### 9.3 — Pas de sitemap ni de robots.txt
- **Problème :** Site à page unique mais pas de `robots.txt` ni `sitemap.xml`.
- **Pourquoi c'est un problème :** Les moteurs d'indexation n'ont pas d'instructions claires.
- **Priorité :** Faible
- **Solution :** Ajouter `robots.txt` et `sitemap.xml` dans `public/`.
- **Fichiers concernés :** `public/`

---

## 10. Maintenabilité & Bonnes pratiques

### 10.1 — Types `any` implicites ou manquants
- **Problème :** `Team.tsx` utilise `useState` sans type explicite : `const [, setCurrent] = useState(0);` (le state est un number, TS l'infère, ce n'est pas critique ici). Mais `ServiceItem` utilise `icon: typeof Car` qui est un type correct mais verbeux.
- **Pourquoi c'est un problème :** Le type `typeof Car` est spécifique à l'instance. Il faudrait plutôt utiliser `LucideIcon` (exporté par `lucide-react`).
- **Priorité :** Faible
- **Solution :** Importer `LucideIcon` depuis `lucide-react` et typer `icon: LucideIcon`.
- **Fichiers concernés :** `src/sections/WhatWeDo.tsx`, `src/sections/Services.tsx`, `src/sections/Pricing.tsx`, etc.

### 10.2 — Données statiques inline
- **Problème :** Les tableaux de données (`services`, `projects`, `team`, `testimonials`, `faqs`, etc.) sont définis en dur dans les composants.
- **Pourquoi c'est un problème :** Le code JSX est alourdi, difficile à localiser si besoin d'extraire vers une CMS ou API plus tard.
- **Priorité :** Faible
- **Solution :** Extraire ces données dans des fichiers `src/data/*.ts`. Cela clarifie le composant et facilite les migrations.
- **Fichiers concernés :** Tous les `src/sections/*.tsx`

### 10.3 — SVG inline dupliqué (logo Fixturbo)
- **Problème :** Le SVG du logo est copié-coller dans `Navbar.tsx` et `Footer.tsx`.
- **Pourquoi c'est un problème :** Si le logo change, il faut modifier deux endroits.
- **Priorité :** Faible
- **Solution :** Créer un composant `<Logo className="..." />` réutilisable.
- **Fichiers concernés :** `src/components/Navbar.tsx`, `src/components/Footer.tsx`

### 10.4 — `alert()` natif pour la confirmation de formulaire
- **Problème :** `Appointment.tsx` utilise `alert('Thank you! ...')`.
- **Pourquoi c'est un problème :** Bloque le thread principal, UX désagréable, non stylable.
- **Priorité :** Faible
- **Solution :** Utiliser `sonner` (déjà installé mais inutilisé !) ou un état local affichant un message de succès dans le DOM.
- **Fichiers concernés :** `src/sections/Appointment.tsx`

### 10.5 — Couleurs CSS variables vs couleurs statiques
- **Problème :** Des couleurs sont définies à la fois via `hsl(var(--primary))` (shadcn) et via des hex statiques (`fixturbo-primary`, etc.). Le thème ne supporte pas le dark mode malgré `darkMode: ["class"]` dans Tailwind.
- **Pourquoi c'est un problème :** Risque de conflit si jamais le dark mode est activé. Les variables shadcn resteront en clair tandis que les classes `fixturbo-*` resteront identiques.
- **Priorité :** Faible
- **Solution :** Harmoniser : soit utiliser uniquement les variables CSS pour toutes les couleurs, soit supprimer la config darkMode si non utilisée.
- **Fichiers concernés :** `tailwind.config.js`, `src/index.css`

---

## Récapitulatif par priorité

| Priorité | Quantité | Thèmes principaux |
|---|---|---|
| **Critique** | 4 | Dépendances inutilisées (shadcn + libs), texte placeholder/Lorem ipsum, carrousel non fonctionnel, incohérence thème (garage vs trading) |
| **Moyen** | 15 | React-router inutile, responsive mobile (WhatWeDo, Hero height, overflow), formulaires sans label, meta SEO, focus/accessibilité, `duration-400/600` invalides, config shadcn |
| **Faible** | 12 | Code mort (App.css, use-mobile), preconnect fonts, prefers-reduced-motion, type button, contrastes, duplication SVG, données inline |

---

## Prochaines étapes recommandées

1. **Nettoyage brutal** : supprimer `src/components/ui/*`, `src/App.css`, `src/hooks/use-mobile.ts`, et désinstaller les packages morts.
2. **Correction responsive** : fixer `WhatWeDo`, `Hero height`, `About/FAQ overflow`.
3. **Accessibilité** : ajouter des labels, `type="button"`, `prefers-reduced-motion`, corriger `lang`.
4. **Contenu** : remplacer tout le Lorem ipsum et uniformiser le thème (garage auto).
5. **Performance** : lazy-load les sections, optimiser les images, ajouter `loading="lazy"`.
6. **Refactor** : créer un composant `<Container>` et extraire les données dans `src/data/`.
