import type { PortfolioItem } from '@/lib/types'

/**
 * Albums thématiques du portfolio.
 * Ces ensembles proviennent du site existant et sont des albums,
 * pas des fiches de chantiers individuels documentés.
 * Aucune localisation, date ou surface n'est déduite des photos.
 */
export const portfolioItems: PortfolioItem[] = [
  {
    id: 'jardin-piscine',
    title: 'Jardin avec espace piscine',
    description: 'Aménagement complet d\'un espace extérieur alliant pelouse, végétaux et bassin.',
    image: '/images/paysagiste-st-didier-au-mont-d-or-jardins.jpg',
    imageAlt: 'Vue d\'ensemble d\'un jardin aménagé avec piscine et espaces verts',
    imageWidth: 2000,
    imageHeight: 935,
    categories: ['jardins-plantations', 'piscines-pool-houses'],
    focalPoint: 'center center',
  },
  {
    id: 'terrasse-bois-glycine',
    title: 'Terrasse en bois',
    description: 'Terrasse en bois exotique avec pergola, intégrée dans un espace de vie extérieur.',
    image: '/images/terrasse-bois-atelier-glycine-500x500.jpg',
    imageAlt: 'Terrasse en bois exotique aménagée avec mobilier extérieur',
    imageWidth: 500,
    imageHeight: 500,
    categories: ['terrasses-dallages'],
  },
  {
    id: 'poolhouse-piscine',
    title: 'Pool house et maçonnerie autour d\'une piscine',
    description: 'Construction d\'un pool house avec maçonnerie soignée et dallage de pourtour.',
    image: '/images/poolhouse-maconnerie-piscine-500x500.jpg',
    imageAlt: 'Pool house et abords maçonnés d\'une piscine',
    imageWidth: 500,
    imageHeight: 500,
    categories: ['piscines-pool-houses', 'maconnerie-clotures'],
  },
  {
    id: 'plantation-grands-sujets',
    title: 'Plantation de grands végétaux',
    description: 'Mise en place de grands sujets et d\'arbres à l\'aide d\'engins adaptés.',
    image: '/images/pelle-plantation-grands-vegetaux-500x500.jpg',
    imageAlt: 'Plantation de grands végétaux avec engin de chantier paysager',
    imageWidth: 500,
    imageHeight: 500,
    categories: ['jardins-plantations'],
  },
  {
    id: 'cloture-ajouree',
    title: 'Clôture ajourée',
    description: 'Réalisation d\'une clôture ajourée délimitant un espace paysager.',
    image: '/images/cloture-ajouree-500x500.jpg',
    imageAlt: 'Clôture ajourée intégrée dans un espace vert',
    imageWidth: 500,
    imageHeight: 500,
    categories: ['maconnerie-clotures'],
  },
  {
    id: 'dallage-terrasse',
    title: 'Dallage et terrasse',
    description: 'Réalisation d\'un dallage en pierre naturelle pour une terrasse extérieure.',
    image: '/images/dallage2-terrasse.jpg',
    imageAlt: 'Dallage en pierre naturelle pour terrasse extérieure',
    imageWidth: 800,
    imageHeight: 533,
    categories: ['terrasses-dallages'],
  },
  {
    id: 'muret-pierre',
    title: 'Muret en pierre naturelle',
    description: 'Muret de soutènement en pierre naturelle, réalisé selon les règles de l\'art.',
    image: '/images/muret1-pierre-naturelle.jpg',
    imageAlt: 'Muret en pierre naturelle dans un jardin aménagé',
    imageWidth: 800,
    imageHeight: 533,
    categories: ['maconnerie-clotures'],
  },
  {
    id: 'terrasse-bois-exotique',
    title: 'Terrasse en bois exotique',
    description: 'Terrasse en bois exotique entourée de végétaux, créant un espace chaleureux.',
    image: '/images/terrasse-bois-exotique-exterieur.jpg',
    imageAlt: 'Terrasse en bois exotique entourée de végétaux',
    imageWidth: 800,
    imageHeight: 533,
    categories: ['terrasses-dallages', 'jardins-plantations'],
  },
]

export const portfolioCategories = [
  { id: 'tous' as const, label: 'Tous' },
  { id: 'jardins-plantations' as const, label: 'Jardins et plantations' },
  { id: 'terrasses-dallages' as const, label: 'Terrasses et dallages' },
  { id: 'allees-acces' as const, label: 'Allées et accès' },
  { id: 'maconnerie-clotures' as const, label: 'Maçonnerie et clôtures' },
  { id: 'piscines-pool-houses' as const, label: 'Piscines et pool houses' },
]
