# Les Jardins d'Henri — site vitrine

Refonte du site de **Les Jardins d'Henri**, paysagiste et maçonnerie extérieure à Saint-Didier-au-Mont-d'Or (Monts d'Or, région lyonnaise).

Stack : Next.js (App Router), React, TypeScript strict, Tailwind CSS. Aucun service tiers (pas de tracker, pas de police distante, pas de carte embarquée) ; le captcha des formulaires est auto-hébergé.

## Installation et démarrage

```bash
npm install
npm run dev        # http://localhost:3000
```

## Compilation et production

```bash
npm run build
npm start
```

Le site utilise des routes serveur (`/api/contact`, `/api/captcha`) : il doit être hébergé sur un environnement Node (Vercel, serveur Node, etc.), pas en export statique.

Vérifications : `npm run typecheck` (TypeScript) et `npm run lint` (ESLint).

## Configuration

Copier `.env.example` en `.env.local` :

| Variable | Rôle |
|---|---|
| `DEMO_MODE` | `true` par défaut : aucun message n'est transmis, bandeau de démonstration affiché, site en `noindex`. Passer à `false` en production. |
| `NEXT_PUBLIC_SITE_URL` | URL publique (canonical, sitemap). |
| `RECIPIENT_EMAIL` / `FROM_EMAIL` | Destinataire des demandes et expéditeur autorisé. |
| `CAPTCHA_SECRET` | Secret de signature du captcha (facultatif sur une seule instance). |

En production, l'envoi réel des demandes doit être branché dans `src/app/api/contact/route.ts` (exemple Resend en commentaire). Sans transport configuré, le formulaire renvoie une erreur explicite — jamais de faux succès.

## Passage en production

1. `DEMO_MODE=false` et variables d'envoi renseignées.
2. Retirer `robots: { index: false }` dans `src/app/layout.tsx` (le `robots.ts` suit déjà `DEMO_MODE`).
3. Compléter les mentions légales (hébergeur, médiation) et la politique de confidentialité (durée de conservation) dans `src/app/mentions-legales/` et `src/app/confidentialite/`.
4. Activer les redirections de l'ancien site (déjà déclarées dans `next.config.ts`) une fois le domaine pointé.

## Structure

- `src/data/` — contenu structuré : identité de l'entreprise, services, albums du portfolio, paires avant/après, configuration.
- `src/app/` — pages (`/`, `/services/…`, `/realisations/`, `/avant-apres/`, `/entreprise/`, `/devis/`, `/contact/`, mentions légales, confidentialité, 404), routes API, sitemap, robots.
- `src/components/` — en-tête, pied de page, barre mobile, formulaires (devis en deux étapes, rappel, captcha), grille portfolio, visionneuse, comparateur avant/après.
- `src/lib/` — types, validation, captcha.
- `public/images/` — photos réelles du site existant et logos.

Sur mobile (< 768 px), tout le contenu est centré (règles dans `src/app/globals.css`).
