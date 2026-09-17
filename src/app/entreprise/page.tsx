import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { identity } from '@/data/identity'

export const metadata: Metadata = {
  title: 'L\'entreprise — Henri VIREMOUNEIX, paysagiste',
  description: 'Découvrez les Jardins d\'Henri : paysagiste depuis 2012, spécialisé en création de jardins et maçonnerie extérieure dans les Monts d\'Or et la région lyonnaise.',
}

export default function EntreprisePage() {
  return (
    <>
      <nav aria-label="Fil d'Ariane" style={{ paddingTop: '1.5rem', paddingBottom: '0.5rem' }}>
        <div className="container">
          <ol style={{ display: 'flex', gap: '0.5rem', listStyle: 'none', margin: 0, padding: 0, fontSize: '0.8125rem', color: 'var(--color-text)', opacity: 0.65 }}>
            <li><Link href="/" style={{ color: 'inherit', textDecoration: 'none' }}>Accueil</Link></li>
            <li aria-hidden="true">›</li>
            <li aria-current="page">L&apos;entreprise</li>
          </ol>
        </div>
      </nav>

      {/* Hero section */}
      <section style={{ paddingBlock: 'var(--section-gap)' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '2.5rem', alignItems: 'center', maxWidth: '1000px' }}>
            <div>
              <h1 className="section-title" style={{ fontSize: 'clamp(1.875rem, 3.5vw, 3rem)', marginBottom: '1.25rem' }}>
                Un paysagiste de terrain,<br />
                <em style={{ fontStyle: 'italic' }}>formé au soin des matériaux comme des végétaux</em>
              </h1>
              <p style={{ lineHeight: 1.75, marginBottom: '1rem' }}>
                Les Jardins d&apos;Henri ont été fondés en 2012 par Henri VIREMOUNEIX à Saint-Didier-au-Mont-d&apos;Or.
              </p>
              <p style={{ lineHeight: 1.75, marginBottom: '1rem' }}>
                Henri associe une formation spécialisée en pépinière et en paysage à une expérience
                solide en maçonnerie de gros œuvre. Cette double compétence permet de concevoir et
                de réaliser un projet extérieur complet — du terrassement et des soutènements jusqu&apos;aux
                plantations et à l&apos;arrosage — sans coordination entre différents corps de métier.
              </p>
              <p style={{ lineHeight: 1.75 }}>
                L&apos;équipe est formée en interne. Elle intervient sur l&apos;ensemble du chantier avec une
                attention portée à l&apos;exécution et au suivi après intervention.
              </p>
            </div>
            <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', aspectRatio: '4/3', position: 'relative' }}>
              <Image
                src="/images/pelle-plantation-grands-vegetaux-500x500.jpg"
                alt="Travaux de plantation de grands végétaux — Les Jardins d'Henri"
                fill
                sizes="(max-width: 900px) 100vw, 50vw"
                style={{ objectFit: 'cover' }}
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section aria-labelledby="values-title" style={{ paddingBlock: 'var(--section-gap)', background: 'var(--color-sage)' }}>
        <div className="container">
          <h2 id="values-title" className="section-title" style={{ marginBottom: '2rem' }}>
            La complémentarité paysage / maçonnerie
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '1.5rem' }}>
            {[
              {
                title: 'Lecture du terrain',
                desc: 'Chaque projet commence par l\'analyse du sol, des pentes, des vues et des usages souhaités. Cette étape conditionne les choix de composition et de matériaux.',
                icon: '🔍',
              },
              {
                title: 'Maçonnerie et végétaux en un seul projet',
                desc: 'Soutènements, escaliers, allées et plantations sont conçus ensemble pour un résultat cohérent. Une seule équipe, de A à Z.',
                icon: '🤝',
              },
              {
                title: 'Connaissance des essences locales',
                desc: 'La formation en pépinière et la proximité des fournisseurs régionaux permettent de choisir des végétaux adaptés au sol et au climat lyonnais.',
                icon: '🌱',
              },
              {
                title: 'Suivi après chantier',
                desc: 'L\'équipe reste disponible après la réalisation pour les arrosages de reprise, les ajustements et, si souhaité, l\'entretien régulier.',
                icon: '🔄',
              },
            ].map((v) => (
              <div key={v.title} style={{ padding: '1.5rem', background: 'var(--color-white)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(215,199,171,0.4)' }}>
                <span style={{ fontSize: '1.875rem', display: 'block', marginBottom: '0.75rem' }} aria-hidden="true">{v.icon}</span>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-green)', marginBottom: '0.5rem' }}>{v.title}</h3>
                <p style={{ margin: 0, fontSize: '0.875rem', lineHeight: 1.65, opacity: 0.8 }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Identity */}
      <section aria-labelledby="identity-title" style={{ paddingBlock: 'var(--section-gap)' }}>
        <div className="container" style={{ maxWidth: '760px' }}>
          <h2 id="identity-title" className="section-title" style={{ marginBottom: '1.5rem' }}>
            Informations pratiques
          </h2>
          <dl style={{ display: 'grid', gridTemplateColumns: 'auto 1fr', gap: '0.625rem 1.5rem', fontSize: '0.9rem' }}>
            {[
              ['Activité', 'Services d\'aménagement paysager et maçonnerie extérieure'],
              ['Fondée en', identity.activityStart],
              ['Gérant', identity.manager],
              ['Forme juridique', 'SARL à associé unique (EURL)'],
              ['SIREN', identity.siren],
              ['RCS', identity.rcs],
            ].map(([label, value]) => (
              <div key={label} style={{ display: 'contents' }}>
                <dt style={{ fontWeight: 600, color: 'var(--color-green)', whiteSpace: 'nowrap' }}>{label}</dt>
                <dd style={{ margin: 0 }}>{value}</dd>
              </div>
            ))}
          </dl>

          <div style={{ marginTop: '2rem', padding: '1.5rem', background: 'var(--color-sage)', borderRadius: 'var(--radius-md)' }}>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', color: 'var(--color-green)', marginBottom: '0.5rem' }}>Zones d&apos;intervention</h3>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
              {identity.territories.map((t) => (
                <li key={t} style={{ padding: '0.375rem 0.75rem', background: 'var(--color-white)', borderRadius: '999px', fontSize: '0.875rem', fontWeight: 500, color: 'var(--color-green)' }}>
                  {t}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ paddingBottom: 'var(--section-gap)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.75rem', color: 'var(--color-green)', marginBottom: '0.75rem' }}>
            Vous avez un projet extérieur ?
          </h2>
          <p style={{ marginBottom: '1.5rem', opacity: 0.8, maxWidth: '45ch', marginInline: 'auto' }}>
            Contactez-nous pour en discuter. Nous étudions chaque demande et revenons vers vous.
          </p>
          <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link href="/devis/" className="btn-primary">Demander un devis</Link>
            <Link href="/contact/" className="btn-secondary">Nous contacter</Link>
          </div>
        </div>
      </section>
    </>
  )
}
