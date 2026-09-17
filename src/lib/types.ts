// ────────────────────────────────────────────────────────────────
// Types – Les Jardins d'Henri
// ────────────────────────────────────────────────────────────────

export type DataStatus = 'etabli' | 'a-confirmer'

// ────────────────────────────────────────────────────────────────
// Identité entreprise
// ────────────────────────────────────────────────────────────────

export interface CompanyAddress {
  label: string
  lines: string[]
  mapLink?: string
}

export interface CompanyIdentity {
  brandName: string
  legalName: string
  siren: string
  siret: string
  rcs: string
  vatNumber: string
  capital: string
  activityStart: string
  apeCode: string
  apeLabel: string
  manager: string
  phone: string
  phoneLink: string
  email: string
  domain: string
  headquarters: CompanyAddress
  warehouse: CompanyAddress
  territories: string[]
}

// ────────────────────────────────────────────────────────────────
// Services
// ────────────────────────────────────────────────────────────────

export interface ServiceCard {
  id: string
  title: string
  slug: string
  shortDescription: string
  image: string
  imageAlt: string
  imageWidth: number
  imageHeight: number
}

export interface ServicePage {
  id: string
  title: string
  slug: string
  metaTitle: string
  metaDescription: string
  headline: string
  intro: string
  sections: ServiceSection[]
  coverImage: string
  coverImageAlt: string
  relatedServices: string[]
}

export interface ServiceSection {
  title: string
  content: string
  bullets?: string[]
}

// ────────────────────────────────────────────────────────────────
// Portfolio
// ────────────────────────────────────────────────────────────────

export type PortfolioCategory =
  | 'tous'
  | 'jardins-plantations'
  | 'terrasses-dallages'
  | 'allees-acces'
  | 'maconnerie-clotures'
  | 'piscines-pool-houses'

export interface PortfolioItem {
  id: string
  title: string
  description: string
  image: string
  imageAlt: string
  imageWidth: number
  imageHeight: number
  categories: Exclude<PortfolioCategory, 'tous'>[]
  focalPoint?: string  // e.g. 'center top'
}

// ────────────────────────────────────────────────────────────────
// Avant / après
// ────────────────────────────────────────────────────────────────

export interface BeforeAfterPair {
  id: string
  title: string
  description: string
  before: {
    src: string
    alt: string
    width: number
    height: number
  }
  after: {
    src: string
    alt: string
    width: number
    height: number
  }
  category?: Exclude<PortfolioCategory, 'tous'>
}

// ────────────────────────────────────────────────────────────────
// Formulaire devis
// ────────────────────────────────────────────────────────────────

export type ProjectType =
  | 'creation-jardin'
  | 'terrasse-dallage'
  | 'allee-acces'
  | 'maconnerie-cloture'
  | 'piscine-pool-house'
  | 'plantations-arrosage'
  | 'entretien'
  | 'autre'

export type ContactMode = 'telephone' | 'email'

export interface QuoteFormData {
  projectTypes: ProjectType[]
  commune: string
  contactMode: ContactMode
  name: string
  phone?: string
  email?: string
  message?: string
  // Captcha auto-hébergé : jeton signé fourni par /api/captcha et réponse du visiteur
  captchaToken?: string
  captchaAnswer?: string
  // Hidden honeypot – never sent to server
  honeypot?: string
}

export interface QuoteFormResult {
  success: boolean
  demo: boolean
  message: string
  errors?: Partial<Record<keyof QuoteFormData, string>>
}

// ────────────────────────────────────────────────────────────────
// Config
// ────────────────────────────────────────────────────────────────

export interface SiteConfig {
  demoMode: boolean
  siteUrl: string
  recipientEmail: string
  fromEmail: string
}
