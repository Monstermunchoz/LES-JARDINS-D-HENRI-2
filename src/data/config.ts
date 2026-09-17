import type { SiteConfig } from '@/lib/types'

/**
 * Configuration du site.
 * Les valeurs de production sont injectées via des variables d'environnement.
 * En l'absence de configuration, le site reste en mode démo
 * et aucun message ne part vers l'entreprise.
 */
export const siteConfig: SiteConfig = {
  demoMode: process.env.DEMO_MODE !== 'false',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000',
  recipientEmail: process.env.RECIPIENT_EMAIL ?? '',
  fromEmail: process.env.FROM_EMAIL ?? '',
}

/**
 * Routes à rediriger lors de la mise en production.
 * Format : [ancienne route, nouvelle route, code HTTP]
 */
export const redirects = [
  ['/services-amenagements-paysagers-maconnerie-exterieure/', '/services/', 301],
  ['/avant-apres-chantier-paysagiste/', '/avant-apres/', 301],
  ['/realisations-espaces-exterieurs/', '/realisations/', 301],
  ['/contactez-les-jardins-d-henri/', '/contact/', 301],
] as const

/**
 * Événements de conversion à envoyer au couche analytics,
 * sans activer de collecteur tiers par défaut.
 * La structure exclut toute donnée personnelle.
 */
export const ANALYTICS_EVENTS = {
  CLICK_PHONE: 'click_phone',
  CLICK_QUOTE: 'click_quote',
  FORM_START: 'form_start',
  FORM_STEP_COMPLETE: 'form_step_complete',
  FORM_SUCCESS: 'form_success',
  FORM_ERROR: 'form_error',
  PROJECT_VIEW: 'project_view',
} as const

/**
 * Valeurs autorisées pour le préremplissage du formulaire via URL.
 * Seules ces valeurs sont acceptées comme paramètre ?type=...
 * Jamais de coordonnées ni de données libres dans l'URL.
 */
export const ALLOWED_URL_PRESET_TYPES = [
  'creation-jardin',
  'terrasse-dallage',
  'allee-acces',
  'maconnerie-cloture',
  'piscine-pool-house',
  'plantations-arrosage',
  'entretien',
  'autre',
] as const
