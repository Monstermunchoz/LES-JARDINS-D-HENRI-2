import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { serviceCards } from '@/data/services'

export const metadata: Metadata = {
  title: 'Nos services d\'aménagement paysager et maçonnerie extérieure',
  description: 'Création de jardins, terrasses et dallages, maçonnerie paysagère, piscines, plantations et entretien. Découvrez l\'ensemble des prestations des Jardins d\'Henri.',
}

export default function ServicesPage() {
  return (
    <>
      {/* Breadcrumb */}
      <nav aria-label="Fil d'Ariane" style={{ paddingTop: '1.5rem', paddingBottom: '0.5rem' }}>
        <div className="container">
          <ol style={{ display: 'flex', gap: '0.5rem', listStyle: 'none', margin: 0, padding: 0, fontSize: '0.8125rem', color: 'var(--color-text)', opacity: 0.65 }}>
            <li><Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Accueil</Link></li>
            <li aria-hidden="true">›</li>
            <li aria-current="page">Services</li>
          </ol>
        </div>
      </nav>

      <section style={{ paddingBlock: 'var(--section-gap)' }}>
        <div className="container">
          <h1 className="section-title" style={{ marginBottom: '0.75rem', fontSize: 'clamp(2rem, 4vw, 3rem)' }}>
            Nos prestations
          </h1>
          <p style={{ maxWidth: '60ch', lineHeight: 1.75, marginBottom: '3rem', opacity: 0.8 }}>
            Les Jardins d&apos;Henri interviennent sur l&apos;ensemble des aménagements extérieurs :
            paysage, maçonnerie, végétaux et entretien. Chaque projet est traité dans sa globalité,
            de la conception à la réalisation.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {serviceCards.map((card) => (
              <Link
                key={card.id}
                href={`/services/${card.slug}/`}
                style={{ textDecoration: 'none', color: 'inherit' }}
              >
                <article
                  className="card card--hoverable"
                  style={{ height: '100%', display: 'flex', flexDirection: 'column' }}
                >
                  <div style={{ aspectRatio: '4/3', position: 'relative', overflow: 'hidden' }}>
                    <Image
                      src={card.image}
                      alt={card.imageAlt}
                      fill
                      sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      style={{ objectFit: 'cover', transition: 'transform 0.3s ease' }}
                    />
                  </div>
                  <div style={{ padding: '1.25rem', flex: 1, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                    <h2 style={{ margin: 0, fontSize: '1.0625rem', fontWeight: 700, color: 'var(--color-green)', lineHeight: 1.3 }}>
                      {card.title}
                    </h2>
                    <p style={{ margin: 0, fontSize: '0.875rem', lineHeight: 1.6, opacity: 0.75, flex: 1 }}>
                      {card.shortDescription}
                    </p>
                    <span style={{ fontSize: '0.875rem', fontWeight: 600, color: 'var(--color-green2)', marginTop: 'auto' }}>
                      En savoir plus →
                    </span>
                  </div>
                </article>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: '3rem', padding: '2rem', background: 'var(--color-sage)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', color: 'var(--color-green)', marginBottom: '0.75rem' }}>
              Un projet ? Décrivez-le nous.
            </h2>
            <p style={{ marginBottom: '1.25rem', opacity: 0.8 }}>
              Nous étudions chaque demande et vous recontactons pour en discuter.
            </p>
            <Link href="/devis/" className="btn-primary">
              Demander un devis gratuit
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}
