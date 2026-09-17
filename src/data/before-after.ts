import type { BeforeAfterPair } from '@/lib/types'

/**
 * Paires avant/après issues du site existant.
 * Les thèmes proviennent des noms de fichiers et des rubriques.
 * Ils ne constituent pas des fiches de chantiers documentés.
 * Aucune localisation, date ou surface n'est déduite des photos.
 */
export const beforeAfterPairs: BeforeAfterPair[] = [
  {
    id: 'jardin-friche',
    title: 'Jardin en friche transformé',
    description: 'Transformation d\'un jardin laissé à l\'abandon en espace paysager ordonné et agréable.',
    before: {
      src: '/images/avant-jardin-friche-1529x823.jpg',
      alt: 'Jardin en friche avant travaux d\'aménagement paysager',
      width: 1529,
      height: 823,
    },
    after: {
      src: '/images/apres-jardin-amenage-1529x823.jpg',
      alt: 'Jardin aménagé et planté après intervention des Jardins d\'Henri',
      width: 1529,
      height: 823,
    },
    category: 'jardins-plantations',
  },
  {
    id: 'cloture-piscine',
    title: 'Clôture vitrée autour d\'une piscine',
    description: 'Pose d\'une clôture vitrée de sécurité autour d\'un bassin, intégrée dans le paysage.',
    before: {
      src: '/images/avant-cloture-vitree-piscine-1529x900.jpg',
      alt: 'Abords de piscine avant installation de la clôture vitrée',
      width: 1529,
      height: 900,
    },
    after: {
      src: '/images/apres-cloture-vitree-piscine-1529x900.jpg',
      alt: 'Clôture vitrée de sécurité installée autour de la piscine',
      width: 1529,
      height: 900,
    },
    category: 'piscines-pool-houses',
  },
  {
    id: 'terrasse-bois',
    title: 'Terrasse en bois',
    description: 'Création d\'une terrasse en bois sur un espace extérieur non aménagé.',
    before: {
      src: '/images/avant-terrasse-bois-1529x823.jpg',
      alt: 'Espace extérieur avant réalisation de la terrasse en bois',
      width: 1529,
      height: 823,
    },
    after: {
      src: '/images/apres-terrasse-bois-1529x823.jpg',
      alt: 'Terrasse en bois réalisée, espace de vie extérieur aménagé',
      width: 1529,
      height: 823,
    },
    category: 'terrasses-dallages',
  },
  {
    id: 'dallage-terrasse',
    title: 'Dallage de terrasse',
    description: 'Réfection et dallage d\'une terrasse existante avec pierre naturelle.',
    before: {
      src: '/images/avant-dallage-terrasse-1529x900.jpg',
      alt: 'Terrasse avant travaux de dallage en pierre naturelle',
      width: 1529,
      height: 900,
    },
    after: {
      src: '/images/apres-dallage-terrasse-1529x900.jpg',
      alt: 'Terrasse dallée en pierre naturelle après intervention',
      width: 1529,
      height: 900,
    },
    category: 'terrasses-dallages',
  },
  {
    id: 'dallage-piscine',
    title: 'Dallage autour d\'une piscine',
    description: 'Aménagement du pourtour d\'une piscine avec dallage antidérapant.',
    before: {
      src: '/images/avant-dallage-piscine-1529x950.jpg',
      alt: 'Pourtour de piscine avant aménagement du dallage',
      width: 1529,
      height: 950,
    },
    after: {
      src: '/images/apres-dallage-piscine-1529x950.jpg',
      alt: 'Pourtour de piscine dallé et aménagé',
      width: 1529,
      height: 950,
    },
    category: 'piscines-pool-houses',
  },
  {
    id: 'escalier-plantations',
    title: 'Escalier et plantations',
    description: 'Création d\'un escalier en pierre et mise en place de plantations sur terrain en pente.',
    before: {
      src: '/images/avant-escalier-plantations-768x1024.jpg',
      alt: 'Terrain en pente avant réalisation de l\'escalier et des plantations',
      width: 768,
      height: 1024,
    },
    after: {
      src: '/images/apres-escalier-plantations-768x1024.jpg',
      alt: 'Escalier en pierre et plantations réalisés sur terrain en pente',
      width: 768,
      height: 1024,
    },
    category: 'maconnerie-clotures',
  },
]
