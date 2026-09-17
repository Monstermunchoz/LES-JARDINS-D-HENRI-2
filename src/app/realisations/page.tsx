import type { Metadata } from 'next'
import Link from 'next/link'
import { PortfolioGrid } from '@/components/ui/PortfolioGrid'

export const metadata: Metadata = {
  title: 'Réalisations paysagères',
  description: 'Portfolio des réalisations des Jardins d\'Henri : jardins et plantations, terrasses et dallages, maçonnerie, piscines. Aménagements extérieurs dans la région lyonnaise.',
}

export default function RealisationsPage() {
  return (
    <>
      <nav aria-label="Fil d'Ariane" style={{ paddingTop: '1.5rem', paddingBottom: '0.5rem' }}>
        <div className="container">
          <ol style={{ display: 'flex', gap: '0.5rem', listStyle: 'none', margin: 0, padding: 0, fontSize: '0.8125rem', color: 'var(--color-text)', opacity: 0.65 }}>
            <li><Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Accueil</Link></li>
            <li aria-hidden="true">›</li>
            <li aria-current="page">Réalisations</li>
          </ol>
        </div>
      </nav>

      <section style={{ paddingBlock: 'var(--section-gap)' }}>
        <div className="container">
          <h1 className="section-title" style={{ marginBottom: '0.75rem', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Nos réalisations
          </h1>
          <p style={{ maxWidth: '60ch', lineHeight: 1.75, marginBottom: '2.5rem', opacity: 0.8 }}>
            Chaque album illustre un type d&apos;aménagement réalisé par les Jardins d&apos;Henri.
            Ces ensembles ne sont pas des fiches de chantiers individuels documentés —
            ils donnent un aperçu de la diversité des prestations.
          </p>
          <PortfolioGrid />
        </div>
      </section>
    </>
  )
}
