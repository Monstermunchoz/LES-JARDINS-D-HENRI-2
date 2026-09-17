import { MetadataRoute } from 'next'
import { siteConfig } from '@/data/config'

export default function robots(): MetadataRoute.Robots {
  if (siteConfig.demoMode) {
    // Demo mode: block all indexing
    return {
      rules: { userAgent: '*', disallow: '/' },
    }
  }
  // Production: allow indexing, block API routes
  return {
    rules: [
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
    ],
    sitemap: siteConfig.siteUrl + '/sitemap.xml',
  }
}
