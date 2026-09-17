import type { Metadata } from 'next'
import Link from 'next/link'
import { identity } from '@/data/identity'
import { CallbackForm } from '@/components/forms/CallbackForm'

export const metadata: Metadata = {
  title: 'Contact',
  description: 'Contactez Les Jardins d\'Henri à Saint-Didier-au-Mont-d\'Or. Téléphone, e-mail et formulaire de rappel.',
}

export default function ContactPage() {
  return (
    <>
      <nav aria-label="Fil d'Ariane" style={{ paddingTop: '1.5rem', paddingBottom: '0.5rem' }}>
        <div className="container">
          <ol style={{ display: 'flex', gap: '0.5rem', listStyle: 'none', margin: 0, padding: 0, fontSize: '0.8125rem', color: 'var(--color-text)', opacity: 0.65 }}>
            <li><Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Accueil</Link></li>
            <li aria-hidden="true">›</li>
            <li aria-current="page">Contact</li>
          </ol>
        </div>
      </nav>

      <section style={{ paddingBlock: 'var(--section-gap)' }}>
        <div className="container">
          <h1 className="section-title" style={{ marginBottom: '2.5rem', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Nous contacter
          </h1>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2.5rem', maxWidth: '1000px' }}>

            {/* Contact info */}
            <div>
              <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', color: 'var(--color-green)', marginBottom: '1.25rem' }}>
                Coordonnées
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <p style={{ margin: '0 0 0.25rem', fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-green)' }}>Téléphone</p>
                  <a href={identity.phoneLink} style={{ fontSize: '1.125rem', fontWeight: 700, color: 'var(--color-text)', textDecoration: 'none' }}>
                    {identity.phone}
                  </a>
                </div>
                <div>
                  <p style={{ margin: '0 0 0.25rem', fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-green)' }}>E-mail</p>
                  <a href={`mailto:${identity.email}`} style={{ color: 'var(--color-text)', textDecoration: 'none' }}>
                    {identity.email}
                  </a>
                </div>
              </div>

              <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <address style={{ fontStyle: 'normal' }}>
                  <p style={{ margin: '0 0 0.375rem', fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-green)' }}>
                    {identity.headquarters.label}
                  </p>
                  {identity.headquarters.lines.map((line, i) => (
                    <p key={i} style={{ margin: 0, lineHeight: 1.6 }}>{line}</p>
                  ))}
                </address>
                <address style={{ fontStyle: 'normal' }}>
                  <p style={{ margin: '0 0 0.375rem', fontWeight: 600, fontSize: '0.875rem', color: 'var(--color-green)' }}>
                    {identity.warehouse.label}
                    <span style={{ fontWeight: 400, opacity: 0.6, fontSize: '0.8125rem', marginLeft: '0.5rem' }}>(non ouvert au public)</span>
                  </p>
                  {identity.warehouse.lines.map((line, i) => (
                    <p key={i} style={{ margin: 0, lineHeight: 1.6 }}>{line}</p>
                  ))}
                </address>
              </div>

              <div style={{ marginTop: '2rem' }}>
                <h3 style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-green)', marginBottom: '0.75rem' }}>
                  Zones d&apos;intervention
                </h3>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.65, margin: 0 }}>
                  {identity.territories.join(' — ')}
                </p>
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div style={{ padding: '1.75rem', background: 'var(--color-green)', borderRadius: 'var(--radius-md)', color: 'white' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', marginBottom: '0.75rem' }}>
                  Demander un devis
                </h2>
                <p style={{ opacity: 0.85, fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '1.25rem' }}>
                  Décrivez votre projet en quelques étapes. Nous vous recontactons pour en discuter.
                </p>
                <Link href="/devis/" className="btn-outline-white" style={{ justifyContent: 'center', display: 'flex' }}>
                  Accéder au formulaire →
                </Link>
              </div>

              <div style={{ padding: '1.75rem', background: 'var(--color-sage)', borderRadius: 'var(--radius-md)' }}>
                <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', color: 'var(--color-green)', marginBottom: '0.75rem' }}>
                  Demander à être rappelé
                </h2>
                <CallbackForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
