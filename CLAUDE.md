# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## État du dépôt

Le site est implémenté (Next.js 16, App Router, TypeScript strict, Tailwind 4) et fonctionnel. Le cahier des charges d'origine (`Prompt-Claude-Code-Les-Jardins-dHenri.md`, non inclus dans le dépôt) reste la référence pour les règles ci-dessous ; les repères de sections sont conservés pour mémoire. Il s'agit de la refonte du site de **Les Jardins d'Henri**, entreprise de paysage et de maçonnerie extérieure à Saint-Didier-au-Mont-d'Or.

Repères dans le cahier des charges :

- §1 dossier factuel : identité légale, adresses (siège et entrepôt), téléphone, territoires, prestations, partenaires, informations non établies
- §2 constats de l'audit du site WordPress existant
- §3 objectif commercial ; §4 direction artistique (palette, Manrope + Fraunces, grille 1 280 px)
- §5 routes ; §6 composition de l'accueil ; §7 formulaires et landing `/devis/` ; §8 portfolio et avant/après
- §9 mobile et accessibilité ; §10 SEO local et redirections ; §11 légal, crédit d'impôt, confidentialité
- §12 implémentation technique ; §13 vérifications ; §14 médias sources ; §15 ordre de travail et livrables

Le projet est une démonstration commerciale pour un prospect, avec une base technique exploitable ensuite. Tout le contenu du site, le README et la documentation sont en français.

## Stack et commandes

Stack imposée (§12) : **Next.js (App Router), React, TypeScript strict, Tailwind CSS**, gestionnaire **npm**, versions stables au moment de l'installation. Pas de bibliothèque lourde pour une interaction réalisable simplement.

Commandes (`package.json`) :

- `npm install` — installation
- `npm run dev` — serveur de développement (http://localhost:3000)
- `npm run build` puis `npm start` — compilation et serveur de production (déploiement Node requis pour les routes API)
- `npm run typecheck` — vérification TypeScript (`tsc --noEmit`)
- `npm run lint` — ESLint

Il n'y a pas de suite de tests automatisés ; les vérifications sont manuelles (voir §13).

Arborescence : `src/data/` (contenu structuré : identité, services, portfolio, avant/après, config), `src/app/` (routes, `api/contact`, `api/captcha`, sitemap, robots), `src/components/layout|forms|ui/`, `src/lib/` (types, validation, captcha), `public/images/` (photos réelles et logos).

Conventions : le style est écrit en inline dans les composants avec les tokens CSS de `globals.css` ; le centrage mobile (< 768 px) est assuré par des règles globales dans `globals.css` — ne pas le casser. Le captcha est auto-hébergé (`src/lib/captcha.ts`, jeton HMAC), aucun service tiers.

## Architecture cible

### Rendu

Pages pré-rendues et composants serveur pour tout le contenu. Composants client limités au menu mobile, aux filtres du portfolio, à la visionneuse, au comparateur avant/après, aux formulaires et à la barre mobile « Appeler / Mon devis ». Contenu, présentation, validation et transport des demandes sont séparés.

### Routes (§5)

`/`, `/services/` et six sous-pages services (`creation-amenagement-jardin`, `terrasses-dallages-acces`, `maconnerie-paysagere`, `piscines-pool-houses`, `plantations-arrosage`, `entretien-jardin`), `/realisations/`, `/avant-apres/`, `/entreprise/`, `/devis/`, `/contact/`, `/mentions-legales/`, `/confidentialite/`, page 404. Navigation principale : Services, Nos réalisations, Avant / après, L'entreprise, Contact, plus le bouton « Demander un devis ».

### Données (§12)

Contenu dans des fichiers structurés, sans CMS :

- un fichier central d'identité de l'entreprise, avec source et statut (« établi » / « à confirmer ») pour chaque donnée ;
- une collection de services reliée aux images et aux CTA préremplis ;
- une collection d'albums thématiques ; une fiche « projet » seulement si un chantier réel est documenté ;
- une collection de paires avant/après ;
- un manifeste des médias : origine, dimensions, crédit, statut des droits, points focaux ordinateur/mobile ;
- une configuration démonstration/production, envoi des demandes, contenus à confirmer.

Les champs inconnus restent absents. Les composants doivent accepter un enrichissement des données sans modification.

### Formulaires (§7, §12)

Un seul composant de formulaire et un seul schéma de données, réutilisés sur l'accueil et sur `/devis/`. Le rappel simple de `/contact/` partage le traitement serveur. Deux étapes : projet (choix multiples + commune requise) puis coordonnées (nom requis, téléphone ou e-mail selon le mode choisi). Pipeline : validation client pour l'ergonomie, validation serveur pour l'autorité, puis transport.

- **Mode démo par défaut** : rien n'est envoyé, et l'interface dit clairement que la demande n'a pas été transmise.
- **En production**, l'absence de configuration d'envoi provoque une erreur explicite : jamais de faux succès, jamais de bascule silencieuse en démo. Le succès n'est confirmé qu'après acceptation par le transport.
- Protections : honeypot non interactif, limitation de débit, vérification d'origine, anti-injection d'en-têtes, limites de longueur, pas de données personnelles dans les logs. Expéditeur autorisé et `Reply-To` ; jamais l'adresse du visiteur en `From`.
- `.env.example` avec valeurs factices : mode, URL publique, destinataire, transport, expéditeur. Aucun secret dans le code ni le dépôt.
- Préremplissage du type de besoin par paramètre d'URL limité à une liste blanche ; jamais de coordonnées dans l'URL.
- Événements `click_phone`, `click_quote`, `form_start`, `form_step_complete`, `form_success`, `form_error`, `project_view` structurés sans donnée personnelle, aucun collecteur tiers activé.

### SEO et déploiement (§10)

Prototype en `noindex, nofollow` avec un indicateur de démonstration discret. Canonical, Open Graph, sitemap, robots, icônes. JSON-LD `LocalBusiness` (ou sous-type), `Service`, `BreadcrumbList`, sans horaires, coordonnées GPS, `sameAs`, notes ni avis. Table de redirections 301 préparée (quatre anciennes routes WordPress, voir §10). L'envoi de formulaire exige un déploiement Node : ne pas exporter en statique en prétendant garder des routes serveur.

## Règles non négociables

- **Ne rien inventer.** Aucun horaire, tarif, délai, avis, compteur, effectif, nom de client, ni lieu/date/surface déduits des photos ou des chemins de fichiers. Les données manquantes vont dans la configuration et dans une liste de finalisation, jamais en « À COMPLÉTER » sur une page commerciale.
- **Logo** : deux fichiers fournis par le client, à ne pas redessiner : `public/images/logo-jardins-henri-vert.png` (version verte, en-tête sur fond clair) et `public/images/logo-jardins-henri-creme.png` (version crème détourée, pied de page sur fond vert). Ne pas suragrandir le raster. Secours : nom de marque en texte, pas de faux logo. Aucune mention de « Rivoire Paysage » sur le site.
- **À confirmer, donc désactivé par défaut** : « Compagnon du Devoir » en badge, logo UNEP, assurance décennale, logos partenaires, crédit d'impôt. Pour ce dernier, seule une formulation conditionnelle limitée à l'entretien courant est admise.
- **Homonyme** : une entreprise du même nom existe à Palaiseau (domaine avec tiret). Ne jamais importer ses coordonnées, projets ou textes.
- **Adresses** : l'entrepôt n'est pas une boutique ouverte au public. Ne pas affirmer que « 76 route de Fleurieu » et « Lieu-dit Dorieux » sont administrativement équivalents.
- **Médias** : uniquement les vraies photos du site existant (liste en §14), téléchargées en local, aucun hotlink HTTP en production. Jamais de banque d'images ni d'image générée présentée comme réalisation, jamais d'avant/après fabriqué. Les ensembles du portfolio sont des albums thématiques, pas des chantiers documentés.
- **Aucun tiers** : pas de tracker, pixel, carte embarquée, widget social. Polices et images servies localement. Pas de bandeau cookies tant qu'aucun traceur soumis à consentement n'est chargé.
- **Accessibilité** : cible WCAG 2.2 AA sans déclarer de certification. Contraste 4,5:1, zones tactiles 44 × 44 px, focus visible, Échap et retour du focus sur menu et visionneuse, `prefers-reduced-motion` respecté.
- **Hors périmètre** : publication sur le domaine du client, envoi de messages au prospect, activation de services payants. Ne jamais tester l'envoi vers l'entreprise ou le prospect.

## Vérifications avant livraison (§13)

Compilation de production et vérification TypeScript ; ouverture de toutes les routes ; contrôle visuel à 320, 360, 390, 768, 1 024, 1 440 et 1 920 px sans débordement horizontal ; navigation clavier et contrastes ; scénarios de formulaire (champs manquants, mode de contact, retour arrière, double clic, échec serveur, limitation de débit, démo sans envoi) ; transport testé en simulation ; redirections, canonical, noindex et métadonnées ; absence de ressource HTTP en configuration de production. Ne rapporter que les contrôles réellement exécutés, avec leurs limites.

## Livrables (§15)

Code source avec scripts ; prévisualisation locale ; README en français (installation, démarrage, compilation, hébergement Node, configuration des formulaires, passage en production dont retrait du noindex) ; fichier d'identité et collections de contenus ; manifeste des médias et relevé des sources ; table de redirections ; liste des informations à confirmer ; résultats des tests réellement exécutés.

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
