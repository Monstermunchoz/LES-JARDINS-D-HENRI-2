import type { Metadata } from 'next'
import Link from 'next/link'
import { beforeAfterPairs } from '@/data/before-after'
import { BeforeAfterSlider } from '@/components/ui/BeforeAfterSlider'

export const metadata: Metadata = {
  title: 'Avant / après — transformations paysagères',
  description: 'Découvrez les transformations avant et après réalisées par Les Jardins d\'Henri : jardins, terrasses, dallages, clôtures et aménagements extérieurs.',
}

export default function AvantApresPage() {
  return (
    <>
      <nav aria-label="Fil d'Ariane" style={{ paddingTop: '1.5rem', paddingBottom: '0.5rem' }}>
        <div className="container">
          <ol style={{ display: 'flex', gap: '0.5rem', listStyle: 'none', margin: 0, padding: 0, fontSize: '0.8125rem', color: 'var(--color-text)', opacity: 0.65 }}>
            <li><Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Accueil</Link></li>
            <li aria-hidden="true">›</li>
            <li aria-current="page">Avant / après</li>
          </ol>
        </div>
      </nav>

      <section style={{ paddingBlock: 'var(--section-gap)' }}>
        <div className="container">
          <h1 className="section-title" style={{ marginBottom: '0.75rem', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Avant / après
          </h1>
          <p style={{ maxWidth: '60ch', lineHeight: 1.75, marginBottom: '3rem', opacity: 0.8 }}>
            Ces comparaisons illustrent des transformations réelles. Faites glisser le curseur,
            utilisez les flèches du clavier ou les boutons pour afficher chaque état.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '4rem' }}>
            {beforeAfterPairs.map((pair) => (
              <article key={pair.id}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--color-green)', marginBottom: '0.5rem' }}>
                  {pair.title}
                </h2>
                <p style={{ marginBottom: '1.5rem', opacity: 0.75, lineHeight: 1.65, maxWidth: '60ch' }}>
                  {pair.description}
                </p>
                <div style={{ maxWidth: '780px' }}>
                  <BeforeAfterSlider pair={pair} />
                </div>
                <div style={{ marginTop: '1.25rem' }}>
                  <Link
                    href="/devis/"
                    style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-green2)', textDecoration: 'none' }}
                  >
                    J&apos;ai un projet similaire →
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
