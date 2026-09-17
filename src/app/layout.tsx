import type { Metadata } from 'next'
import localFont from 'next/font/local'
import './globals.css'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MobileBar } from '@/components/layout/MobileBar'
import { DemoBanner } from '@/components/layout/DemoBanner'
import { siteConfig } from '@/data/config'
import { identity } from '@/data/identity'

// Polices servies localement (fichiers dans src/fonts, aucun appel à Google Fonts)
const manrope = localFont({
  src: [{ path: '../fonts/manrope-latin-wght-normal.woff2', weight: '200 800', style: 'normal' }],
  display: 'swap',
  variable: '--font-manrope',
})

const fraunces = localFont({
  src: [
    { path: '../fonts/fraunces-latin-wght-normal.woff2', weight: '100 900', style: 'normal' },
    { path: '../fonts/fraunces-latin-wght-italic.woff2', weight: '100 900', style: 'italic' },
  ],
  display: 'swap',
  variable: '--font-fraunces',
})

export const metadata: Metadata = {
  metadataBase: siteConfig.siteUrl ? new URL(siteConfig.siteUrl) : undefined,
  title: {
    default: `Paysagiste à Saint-Didier-au-Mont-d'Or | ${identity.brandName}`,
    template: `%s | ${identity.brandName}`,
  },
  description: 'Création de jardins, terrasses, maçonnerie paysagère et entretien dans les Monts d\'Or et la région lyonnaise. Découvrez nos réalisations et présentez votre projet.',
  robots: {
    index: false,   // noindex en démo – retirer en production
    follow: false,
  },
  openGraph: {
    type: 'website',
    locale: 'fr_FR',
    siteName: identity.brandName,
  },
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" className={`${manrope.variable} ${fraunces.variable}`}>
      <body>
        <a href="#main-content" className="skip-link">
          Aller au contenu principal
        </a>
        {siteConfig.demoMode && <DemoBanner />}
        <Header />
        <main id="main-content" tabIndex={-1}>
          {children}
        </main>
        <Footer />
        <MobileBar />
      </body>
    </html>
  )
}
