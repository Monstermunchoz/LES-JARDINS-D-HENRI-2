import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { servicePages, serviceCards } from '@/data/services'

export async function generateStaticParams() {
  return servicePages.map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const service = servicePages.find((s) => s.slug === slug)
  if (!service) return {}
  return {
    title: service.metaTitle,
    description: service.metaDescription,
  }
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const service = servicePages.find((s) => s.slug === slug)
  if (!service) notFound()

  const related = serviceCards.filter((c) => service.relatedServices.includes(c.id))

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: service.title,
    description: service.metaDescription,
    provider: {
      '@type': 'LandscapingBusiness',
      name: 'Les Jardins d\'Henri',
      url: 'https://lesjardinsdhenri.fr',
    },
  }

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* Breadcrumb */}
      <nav aria-label="Fil d'Ariane" style={{ paddingTop: '1.5rem', paddingBottom: '0.5rem' }}>
        <div className="container">
          <ol style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', listStyle: 'none', margin: 0, padding: 0, fontSize: '0.8125rem', color: 'var(--color-text)', opacity: 0.65 }}>
            <li><Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Accueil</Link></li>
            <li aria-hidden="true">›</li>
            <li><Link href="/services/" style={{ color: 'inherit', textDecoration: 'none' }}>Services</Link></li>
            <li aria-hidden="true">›</li>
            <li aria-current="page">{service.title}</li>
          </ol>
        </div>
      </nav>

      {/* Hero */}
      <section style={{ paddingTop: '2rem', paddingBottom: 0 }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2rem', alignItems: 'start' }}>
            <div>
              <h1 className="section-title" style={{ fontSize: 'clamp(1.75rem, 3.5vw, 2.75rem)', marginBottom: '1rem' }}>
                {service.headline}
              </h1>
              <p style={{ lineHeight: 1.75, maxWidth: '60ch', opacity: 0.85, marginBottom: '1.5rem' }}>
                {service.intro}
              </p>
              <Link href={`/devis/?type=${service.id === 'creation' ? 'creation-jardin' : service.id === 'terrasses' ? 'terrasse-dallage' : service.id === 'maconnerie' ? 'maconnerie-cloture' : service.id === 'piscines' ? 'piscine-pool-house' : service.id === 'plantations' ? 'plantations-arrosage' : 'entretien'}`} className="btn-primary">
                J&apos;ai un projet similaire
              </Link>
            </div>
            <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', aspectRatio: '16/9', position: 'relative' }}>
              <Image
                src={service.coverImage}
                alt={service.coverImageAlt}
                fill
                sizes="(max-width: 900px) 100vw, 55vw"
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Content sections */}
      <section style={{ paddingBlock: 'var(--section-gap)' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          {service.sections.map((sec, i) => (
            <div
              key={i}
              style={{
                marginBottom: '2.5rem',
                paddingBottom: '2.5rem',
                borderBottom: i < service.sections.length - 1 ? '1px solid var(--color-sage)' : 'none',
              }}
            >
              <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-display)', color: 'var(--color-green)', marginBottom: '0.75rem' }}>
                {sec.title}
              </h2>
              <p style={{ lineHeight: 1.75, marginBottom: sec.bullets ? '1rem' : 0 }}>
                {sec.content}
              </p>
              {sec.bullets && (
                <ul style={{ margin: 0, paddingLeft: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                  {sec.bullets.map((b, j) => (
                    <li key={j} style={{ lineHeight: 1.6 }}>{b}</li>
                  ))}
                </ul>
              )}
            </div>
          ))}

          {/* CTA */}
          <div style={{ padding: '2rem', background: 'var(--color-sage)', borderRadius: 'var(--radius-md)', textAlign: 'center' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', color: 'var(--color-green)', marginBottom: '0.5rem' }}>
              Vous avez un projet ?
            </h3>
            <p style={{ marginBottom: '1.25rem', opacity: 0.8 }}>
              Décrivez votre besoin et nous vous recontactons.
            </p>
            <Link href="/devis/" className="btn-primary">
              Demander un devis
            </Link>
          </div>
        </div>
      </section>

      {/* Related services */}
      {related.length > 0 && (
        <section aria-labelledby="related-title" style={{ paddingBottom: 'var(--section-gap)', background: 'var(--color-ivory)' }}>
          <div className="container">
            <h2 id="related-title" style={{ fontFamily: 'var(--font-display)', fontSize: '1.375rem', color: 'var(--color-green)', marginBottom: '1.5rem' }}>
              Autres prestations
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '1rem' }}>
              {related.map((r) => (
                <Link key={r.id} href={`/services/${r.slug}/`} style={{ textDecoration: 'none', color: 'inherit' }}>
                  <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '0.875rem', padding: '1rem', transition: 'box-shadow 0.15s' }}>
                    <div style={{ width: '56px', height: '56px', flexShrink: 0, borderRadius: 'var(--radius-sm)', overflow: 'hidden', position: 'relative' }}>
                      <Image src={r.image} alt="" fill sizes="56px" style={{ objectFit: 'cover' }} />
                    </div>
                    <div>
                      <p style={{ margin: 0, fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-green)', lineHeight: 1.3 }}>{r.title}</p>
                      <p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem', opacity: 0.65 }}>En savoir plus →</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
