import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Serve images from local public folder only – no external domains
  images: {
    remotePatterns: [],
  },

  // Redirections préparées pour la migration depuis l'ancien site WordPress.
  // À activer une fois que le domaine de production pointe vers ce site.
  // Ne jamais rediriger vers l'accueil si une destination précise existe.
  async redirects() {
    return [
      {
        source: '/services-amenagements-paysagers-maconnerie-exterieure/',
        destination: '/services/',
        permanent: true,
      },
      {
        source: '/avant-apres-chantier-paysagiste/',
        destination: '/avant-apres/',
        permanent: true,
      },
      {
        source: '/realisations-espaces-exterieurs/',
        destination: '/realisations/',
        permanent: true,
      },
      {
        source: '/contactez-les-jardins-d-henri/',
        destination: '/contact/',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
