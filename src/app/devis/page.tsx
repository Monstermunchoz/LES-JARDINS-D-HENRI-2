import type { Metadata } from 'next'
import Link from 'next/link'
import { Suspense } from 'react'
import { QuoteForm } from '@/components/forms/QuoteForm'
import { QuoteFormPreset } from '@/components/forms/QuoteFormPreset'
import { identity } from '@/data/identity'

export const metadata: Metadata = {
  title: 'Votre projet d\'aménagement extérieur',
  description: 'Décrivez votre projet paysager à Les Jardins d\'Henri. Devis gratuit pour jardins, terrasses, maçonnerie et entretien dans les Monts d\'Or et la région lyonnaise.',
}

export default function DevisPage() {
  return (
    <>
      {/* Compact header area */}
      <div style={{ background: 'var(--color-green)', paddingBlock: 'clamp(2rem, 4vw, 3rem)' }}>
        <div className="container">
          <nav aria-label="Fil d'Ariane" style={{ marginBottom: '1.25rem' }}>
            <ol style={{ display: 'flex', gap: '0.5rem', listStyle: 'none', margin: 0, padding: 0, fontSize: '0.8125rem', color: 'rgba(255,255,255,0.6)' }}>
              <li><Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Accueil</Link></li>
              <li aria-hidden="true">›</li>
              <li aria-current="page" style={{ color: 'rgba(255,255,255,0.9)' }}>Demander un devis</li>
            </ol>
          </nav>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', color: 'white', fontWeight: 500, marginBottom: '0.75rem', lineHeight: 1.2 }}>
            Parlez-nous de votre projet
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.8)', maxWidth: '50ch', lineHeight: 1.65 }}>
            Paysagiste à Saint-Didier-au-Mont-d&apos;Or — création de jardins, terrasses,
            maçonnerie paysagère et entretien dans les Monts d&apos;Or et la région lyonnaise.
          </p>
        </div>
      </div>

      {/* Main content */}
      <div className="container" style={{ paddingBlock: 'var(--section-gap)' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem', maxWidth: '960px' }}>

          {/* Form */}
          <div style={{ maxWidth: '620px' }}>
            <Suspense fallback={<QuoteForm />}>
              <QuoteFormPreset />
            </Suspense>
          </div>

          {/* Side info */}
          <aside aria-label="Informations pratiques">
            <div style={{ position: 'sticky', top: '5.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ padding: '1.5rem', background: 'var(--color-sage)', borderRadius: 'var(--radius-md)' }}>
                <h2 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-green)', marginBottom: '0.875rem' }}>
                  Vous préférez appeler ?
                </h2>
                <a href={identity.phoneLink} className="btn-primary" style={{ display: 'flex', justifyContent: 'center' }}>
                  {identity.phone}
                </a>
              </div>
              <div style={{ padding: '1.5rem', background: 'var(--color-white)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-stone)' }}>
                <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-green)', marginBottom: '0.875rem' }}>
                  Comment ça fonctionne ?
                </h2>
                <ol style={{ margin: 0, paddingLeft: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                  {[
                    'Vous envoyez votre demande',
                    'Nous étudions votre projet',
                    'Nous vous recontactons',
                    'Visite et devis sur place',
                  ].map((step, i) => (
                    <li key={i} style={{ fontSize: '0.875rem', lineHeight: 1.6 }}>{step}</li>
                  ))}
                </ol>
                <p style={{ margin: '0.75rem 0 0', fontSize: '0.8rem', opacity: 0.6, fontStyle: 'italic' }}>
                  Le déroulement exact est à définir lors du premier échange.
                </p>
              </div>
              <div style={{ padding: '1.5rem', background: 'var(--color-white)', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-stone)' }}>
                <h2 style={{ fontSize: '0.9375rem', fontWeight: 700, color: 'var(--color-green)', marginBottom: '0.625rem' }}>
                  Zones d&apos;intervention
                </h2>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
                  Monts d&apos;Or, Métropole de Lyon, Ouest Lyonnais, Beaujolais, Vallée d&apos;Azergues
                </p>
              </div>
            </div>
          </aside>
        </div>
      </div>

      <style>{`
        @media (min-width: 900px) {
          .devis-grid {
            grid-template-columns: 1fr 320px !important;
          }
        }
      `}</style>
    </>
  )
}
