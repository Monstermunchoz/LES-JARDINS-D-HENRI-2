import type { CompanyIdentity } from '@/lib/types'

/**
 * Données factuelles de l'entreprise.
 * Sources : site existant, RNE/INPI (15 sept. 2026), Pappers.
 * Les champs marqués à-confirmer ne doivent pas être publiés
 * sans validation préalable du client.
 */
export const identity: CompanyIdentity = {
  brandName: 'Les Jardins d\'Henri',
  legalName: 'LES JARDINS D HENRI',
  siren: '751 016 619',
  siret: '751 016 619 00015',
  rcs: '751 016 619 R.C.S. Lyon',
  vatNumber: 'FR23751016619',   // status: à vérifier auprès de VIES
  capital: '5 500 €',
  activityStart: '17 avril 2012',
  apeCode: '81.30Z',
  apeLabel: 'Services d\'aménagement paysager',
  manager: 'Henri VIREMOUNEIX',
  phone: '06 23 88 81 09',
  phoneLink: 'tel:+33623888109',
  email: 'contact@lesjardinsdhenri.fr',
  domain: 'lesjardinsdhenri.fr',

  headquarters: {
    label: 'Siège social',
    lines: [
      '43 rue du Commandant Israël',
      '69370 Saint-Didier-au-Mont-d\'Or',
      'France',
    ],
    // Lien à vérifier avant activation en production
    mapLink: 'https://maps.google.com/?q=43+rue+du+Commandant+Isra%C3%ABl,+69370+Saint-Didier-au-Mont-d%27Or',
  },

  warehouse: {
    label: 'Entrepôt',
    lines: [
      '76 route de Fleurieu',
      '69380 Châtillon d\'Azergues',
    ],
    // Note : adresse administrative au RNE : « Lieu-dit Dorieux, 69380 Châtillon »
    // Ne pas affirmer que les deux libellés sont équivalents sans confirmation.
  },

  territories: [
    'Monts d\'Or',
    'Métropole de Lyon',
    'Ouest Lyonnais',
    'Beaujolais',
    'Vallée d\'Azergues',
  ],
}

/**
 * Éléments à confirmer avec le client avant publication.
 * Ne pas afficher dans les pages commerciales sans validation.
 */
export const pendingConfirmation = {
  compagnonDuDevoir: true,     // Henri mentionné comme Compagnon du Devoir – à confirmer
  unepMember: true,            // Logo UNEP présent sur l'ancien site – adhésion à vérifier
  decennaleInsurance: true,    // Mentionnée sur l'ancien site – numéro/assureur à confirmer
  partners: [
    { name: 'Végétal Concept', city: 'Saint-Priest', url: 'http://www.vegetal-concept.com' },
    { name: 'Pépinières REY', city: 'Morancé', url: 'http://www.pepinieres-rey.com' },
    { name: 'BigMat', city: 'Lentilly', url: 'https://www.bigmat.fr' },
    { name: 'BML', city: 'Lozanne', url: 'https://betonalyon.fr/' },
  ],
  taxCreditService: true,      // Dispositif SAP/crédit d'impôt – à confirmer avant activation
}

/**
 * Mentions légales – données manquantes à compléter.
 * À ne pas exposer publiquement dans cet état.
 */
export const legalPending = {
  publisher: 'Henri VIREMOUNEIX',    // à confirmer : responsable de publication
  hosting: null,                      // hébergeur : à renseigner
  privacyContact: null,               // coordonnées DPO/contact RGPD : à définir
  cookiePolicy: null,                 // politique cookies : pas de traceurs en démo
  mediationInfo: null,                // médiation consommateurs : à renseigner
}
