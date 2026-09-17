import { MetadataRoute } from 'next'
import { siteConfig } from '@/data/config'
import { servicePages } from '@/data/services'

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.siteUrl

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: base + '/', lastModified: new Date(), changeFrequency: 'monthly', priority: 1.0 },
    { url: base + '/services/', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: base + '/realisations/', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: base + '/avant-apres/', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: base + '/entreprise/', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: base + '/devis/', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.9 },
    { url: base + '/contact/', lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    { url: base + '/mentions-legales/', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
    { url: base + '/confidentialite/', lastModified: new Date(), changeFrequency: 'yearly', priority: 0.2 },
  ]

  const serviceRoutes: MetadataRoute.Sitemap = servicePages.map((s) => ({
    url: base + `/services/${s.slug}/`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }))

  return [...staticRoutes, ...serviceRoutes]
}
