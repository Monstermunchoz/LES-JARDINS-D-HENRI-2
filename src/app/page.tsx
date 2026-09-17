import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { identity } from '@/data/identity'
import { portfolioItems } from '@/data/portfolio'
import { beforeAfterPairs } from '@/data/before-after'
import { BeforeAfterSlider } from '@/components/ui/BeforeAfterSlider'
import { QuoteFormWrapper } from '@/components/forms/QuoteFormWrapper'

export const metadata: Metadata = {
  title: `Paysagiste à Saint-Didier-au-Mont-d'Or | ${identity.brandName}`,
  description: 'Création de jardins, terrasses, maçonnerie paysagère et entretien dans les Monts d\'Or et la région lyonnaise. Découvrez nos réalisations et présentez votre projet.',
  openGraph: {
    title: `Paysagiste à Saint-Didier-au-Mont-d'Or | ${identity.brandName}`,
    description: 'Création de jardins, terrasses, maçonnerie paysagère et entretien dans les Monts d\'Or et la région lyonnaise.',
    images: [{ url: '/images/paysagiste-st-didier-au-mont-d-or-jardins.jpg', width: 2000, height: 935 }],
  },
}

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LandscapingBusiness',
  name: identity.brandName,
  legalName: identity.legalName,
  telephone: identity.phoneLink,
  email: identity.email,
  url: `https://${identity.domain}`,
  address: {
    '@type': 'PostalAddress',
    streetAddress: '43 rue du Commandant Israël',
    addressLocality: 'Saint-Didier-au-Mont-d\'Or',
    postalCode: '69370',
    addressCountry: 'FR',
  },
  areaServed: identity.territories.map((t) => ({ '@type': 'AdministrativeArea', name: t })),
  description: 'Paysagiste et maçonnerie extérieure dans les Monts d\'Or et la région lyonnaise.',
}

const faqs = [
  {
    q: 'Quelles zones géographiques couvrez-vous ?',
    a: 'Les Jardins d\'Henri interviennent dans les Monts d\'Or, la Métropole de Lyon, l\'Ouest Lyonnais, le Beaujolais et la Vallée d\'Azergues. Pour tout projet en dehors de ces zones, n\'hésitez pas à nous contacter pour en discuter.',
  },
  {
    q: 'Comment se déroule la prise de contact ?',
    a: 'Tout commence par un premier échange : vous nous décrivez votre projet et nous précisons ensemble le cadre de l\'intervention. Une visite sur place permet d\'évaluer les contraintes du terrain et de préparer un devis adapté.',
  },
  {
    q: 'Je n\'ai pas encore de projet précis, puis-je quand même vous contacter ?',
    a: 'Tout à fait. Il suffit d\'avoir une idée de ce que vous souhaitez améliorer : un coin du jardin, une allée, un espace non exploité. La précision vient avec la discussion et la visite.',
  },
  {
    q: 'Pouvez-vous combiner végétaux et maçonnerie dans un même projet ?',
    a: 'C\'est précisément la force des Jardins d\'Henri : la complémentarité entre paysage et maçonnerie extérieure dans un seul et même projet, sans coordination entre corps de métier différents.',
  },
  {
    q: 'Proposez-vous un service d\'entretien après la création ?',
    a: 'Oui. L\'entretien régulier peut être assuré par l\'équipe, selon la taille du jardin et vos besoins saisonniers. Nous pouvons en parler lors du premier échange.',
  },
  {
    q: 'Quelles informations fournir pour obtenir un devis ?',
    a: 'Le type de travaux envisagés, la commune du chantier et vos coordonnées suffisent pour démarrer. La surface, les matériaux et les détails se précisent lors de la visite.',
  },
]

export default function HomePage() {
  // First before/after for homepage
  const homePair = beforeAfterPairs[2] // terrasse-bois

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ── HERO ────────────────────────────────────────────────── */}
      <section
        aria-label="Présentation"
        style={{
          position: 'relative',
          minHeight: 'min(90svh, 860px)',
          display: 'flex',
          alignItems: 'flex-end',
          overflow: 'hidden',
        }}
      >
        {/* Photo plein écran */}
        <Image
          src="/images/paysagiste-st-didier-au-mont-d-or-jardins.jpg"
          alt="Jardin aménagé avec piscine et espaces paysagers — réalisation Les Jardins d'Henri"
          fill
          sizes="100vw"
          style={{ objectFit: 'cover', objectPosition: 'center 40%' }}
          priority
        />

        {/* Gradient pour lisibilité du texte en bas */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(to top, rgba(18,36,26,0.92) 0%, rgba(18,36,26,0.62) 45%, rgba(18,36,26,0.38) 100%)',
          }}
        />

        {/* Contenu */}
        <div
          className="container"
          style={{
            position: 'relative',
            zIndex: 1,
            paddingBottom: 'clamp(3rem, 7vw, 5.5rem)',
            paddingTop: '2rem',
          }}
        >
          <p
            style={{
              fontSize: '0.8125rem',
              fontWeight: 700,
              textTransform: 'uppercase',
              letterSpacing: '0.12em',
              color: 'rgba(255,255,255,0.65)',
              marginBottom: '0.875rem',
            }}
          >
            Paysagiste à Saint-Didier-au-Mont-d&apos;Or
          </p>
          <h1
            className="display-title"
            style={{
              fontSize: 'clamp(2.5rem, 5.5vw, 4.5rem)',
              color: 'white',
              marginBottom: '1.25rem',
              maxWidth: '18ch',
              lineHeight: 1.1,
            }}
          >
            Votre jardin, un nouvel espace à vivre.
          </h1>
          <p
            style={{
              fontSize: 'clamp(1rem, 1.4vw, 1.125rem)',
              lineHeight: 1.75,
              color: 'rgba(255,255,255,0.82)',
              maxWidth: '52ch',
              marginBottom: '2rem',
            }}
          >
            Création de jardins, terrasses, maçonnerie paysagère et entretien :
            Les Jardins d&apos;Henri vous accompagnent pour aménager un extérieur
            qui correspond à vos envies et à votre quotidien.
          </p>

          {/* CTAs */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem', marginBottom: '2.25rem' }}>
            <Link href="/devis/" className="btn-primary">
              Demander un devis
            </Link>
            <Link href="/realisations/" className="btn-outline-white">
              Voir nos réalisations
            </Link>
          </div>

          {/* Trust badges */}
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem' }}>
            {[
              { icon: '🗓', label: 'Depuis 2012' },
              { icon: '🌿', label: 'Création et entretien' },
              { icon: '🧱', label: 'Maçonnerie paysagère' },
            ].map(({ icon, label }) => (
              <div
                key={label}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.375rem',
                  fontSize: '0.875rem',
                  color: 'rgba(255,255,255,0.72)',
                }}
              >
                <span aria-hidden="true">{icon}</span>
                <span>{label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── RÉALISATIONS EN VEDETTE ─────────────────────────────── */}
      <section
        aria-labelledby="featured-title"
        style={{
          paddingBlock: 'var(--section-gap)',
          background: 'var(--color-sage)',
        }}
      >
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
            <h2 id="featured-title" className="section-title">
              Quelques réalisations
            </h2>
            <Link href="/realisations/" style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-green2)', textDecoration: 'none' }}>
              Voir tout le portfolio →
            </Link>
          </div>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '1rem',
            }}
          >
            {portfolioItems.slice(0, 4).map((item) => (
              <article
                key={item.id}
                className="card"
                style={{ overflow: 'hidden', borderRadius: 'var(--radius-md)' }}
              >
                <div style={{ aspectRatio: '4/3', position: 'relative', overflow: 'hidden' }}>
                  <Image
                    src={item.image}
                    alt={item.imageAlt}
                    fill
                    sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    style={{ objectFit: 'cover', objectPosition: item.focalPoint ?? 'center' }}
                  />
                </div>
                <div style={{ padding: '1rem' }}>
                  <p style={{ margin: 0, fontSize: '0.9375rem', fontWeight: 600, color: 'var(--color-green)' }}>
                    {item.title}
                  </p>
                  <p style={{ margin: '0.375rem 0 0', fontSize: '0.8125rem', color: 'var(--color-text)', opacity: 0.75, lineHeight: 1.5 }}>
                    {item.description}
                  </p>
                </div>
              </article>
            ))}
          </div>

          <div style={{ textAlign: 'center', marginTop: '2rem' }}>
            <Link href="/realisations/" className="btn-secondary">
              Voir tout le portfolio
            </Link>
          </div>
        </div>
      </section>

      {/* ── ENTRÉE PAR BESOIN ────────────────────────────────────── */}
      <section
        aria-labelledby="needs-title"
        style={{ paddingBlock: 'var(--section-gap)' }}
      >
        <div className="container">
          <h2 id="needs-title" className="section-title" style={{ textAlign: 'center', marginBottom: '0.75rem' }}>
            Quel est votre projet ?
          </h2>
          <p style={{ textAlign: 'center', color: 'var(--color-text)', opacity: 0.7, marginBottom: '2.5rem', maxWidth: '50ch', marginInline: 'auto' }}>
            Que vous souhaitiez créer, transformer ou entretenir votre extérieur, nous intervenons sur l&apos;ensemble du projet.
          </p>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1rem' }}>
            {[
              { title: 'Créer ou transformer son jardin', href: '/services/creation-amenagement-jardin/', icon: '🌳', desc: 'Conception, plantations, espaces paysagers sur mesure' },
              { title: 'Aménager une terrasse ou des accès', href: '/services/terrasses-dallages-acces/', icon: '🪨', desc: 'Dallage, bois, allées, entrées carrossables' },
              { title: 'Structurer l\'extérieur', href: '/services/maconnerie-paysagere/', icon: '🧱', desc: 'Murets, escaliers, clôtures, portails' },
              { title: 'Entretenir son jardin', href: '/services/entretien-jardin/', icon: '✂️', desc: 'Tonte, taille, élagage, soins saisonniers' },
            ].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="need-tile"
              >
                <div style={{ fontSize: '2rem', marginBottom: '0.75rem' }} aria-hidden="true">{item.icon}</div>
                <h3 style={{ margin: '0 0 0.5rem', fontSize: '1rem', fontWeight: 700, color: 'var(--color-green)', lineHeight: 1.3 }}>
                  {item.title}
                </h3>
                <p style={{ margin: 0, fontSize: '0.875rem', lineHeight: 1.55, opacity: 0.75 }}>
                  {item.desc}
                </p>
              </Link>
            ))}
          </div>

          <p style={{ textAlign: 'center', marginTop: '1.5rem', fontSize: '0.875rem' }}>
            Autres projets :{' '}
            <Link href="/services/piscines-pool-houses/" style={{ color: 'var(--color-green2)', fontWeight: 500 }}>piscines et pool houses</Link>
            {', '}
            <Link href="/services/plantations-arrosage/" style={{ color: 'var(--color-green2)', fontWeight: 500 }}>plantations et arrosage</Link>
          </p>
        </div>
      </section>

      {/* ── AVANT / APRÈS ────────────────────────────────────────── */}
      <section
        aria-labelledby="ba-title"
        style={{ paddingBlock: 'var(--section-gap)', background: 'var(--color-ivory)' }}
      >
        <div className="container">
          <h2 id="ba-title" className="section-title" style={{ marginBottom: '0.75rem' }}>
            Avant / après
          </h2>
          <p style={{ color: 'var(--color-text)', opacity: 0.7, marginBottom: '2rem', maxWidth: '55ch' }}>
            {homePair.description}
          </p>
          <div style={{ maxWidth: '780px' }}>
            <BeforeAfterSlider pair={homePair} />
          </div>
          <div style={{ marginTop: '1.5rem' }}>
            <Link href="/avant-apres/" className="btn-secondary">
              Voir toutes les transformations
            </Link>
          </div>
        </div>
      </section>

      {/* ── SAVOIR-FAIRE ─────────────────────────────────────────── */}
      <section
        aria-labelledby="expertise-title"
        style={{ paddingBlock: 'var(--section-gap)' }}
      >
        <div
          className="container"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr',
            gap: '2.5rem',
            alignItems: 'center',
          }}
        >
          <div>
            <h2 id="expertise-title" className="section-title" style={{ marginBottom: '1.25rem' }}>
              Paysage et maçonnerie :<br />
              <em style={{ fontStyle: 'italic' }}>une compétence complète</em>
            </h2>
            <p style={{ lineHeight: 1.75, marginBottom: '1rem' }}>
              Fondée en 2012, Les Jardins d&apos;Henri rassemble deux savoir-faire souvent séparés :
              la création et le soin des végétaux d&apos;une part, la maçonnerie extérieure de l&apos;autre.
              Cette complémentarité permet de concevoir et réaliser un projet extérieur complet —
              du soutènement à la plantation — sans coordination entre corps de métier différents.
            </p>
            <p style={{ lineHeight: 1.75, marginBottom: '1.5rem' }}>
              Henri VIREMOUNEIX conduit les chantiers avec une équipe formée en interne,
              attentive à l&apos;exécution et au suivi après intervention. La connaissance
              des pépinières locales et des matériaux adaptés au territoire permet de
              proposer des solutions durables et cohérentes avec les usages du jardin.
            </p>
          </div>
          <div style={{ borderRadius: 'var(--radius-lg)', overflow: 'hidden', aspectRatio: '4/3', position: 'relative' }}>
            <Image
              src="/images/pelle-plantation-grands-vegetaux-500x500.jpg"
              alt="Plantation de grands végétaux avec engin de chantier — Les Jardins d'Henri"
              fill
              sizes="(max-width: 900px) 100vw, 48vw"
              style={{ objectFit: 'cover' }}
            />
          </div>
        </div>
      </section>

      {/* ── PARCOURS DE PROJET ───────────────────────────────────── */}
      <section
        aria-labelledby="process-title"
        style={{
          paddingBlock: 'var(--section-gap)',
          background: 'var(--color-sage)',
        }}
      >
        <div className="container">
          <h2 id="process-title" className="section-title" style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
            Comment ça se passe ?
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '1.5rem' }}>
            {[
              { step: '01', title: 'Premier échange', desc: 'Vous décrivez votre projet et nous précisons ensemble le cadre de l\'intervention.' },
              { step: '02', title: 'Étude et devis', desc: 'Une visite sur place permet d\'évaluer le terrain et de préparer une proposition adaptée.' },
              { step: '03', title: 'Réalisation', desc: 'L\'équipe intervient sur l\'ensemble du chantier, du terrassement à la finition.' },
              { step: '04', title: 'Suivi', desc: 'Nous restons disponibles après intervention et pouvons assurer l\'entretien régulier.' },
            ].map((s) => (
              <div key={s.step} style={{ position: 'relative', paddingTop: '1rem' }}>
                <span style={{
                  display: 'block',
                  fontSize: '2.5rem',
                  fontFamily: 'var(--font-display)',
                  fontWeight: 500,
                  color: 'var(--color-stone)',
                  lineHeight: 1,
                  marginBottom: '0.875rem',
                }}>
                  {s.step}
                </span>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--color-green)', marginBottom: '0.5rem' }}>
                  {s.title}
                </h3>
                <p style={{ fontSize: '0.875rem', lineHeight: 1.6, opacity: 0.8, margin: 0 }}>
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
          <p style={{ fontSize: '0.8rem', textAlign: 'center', opacity: 0.55, marginTop: '1.5rem', fontStyle: 'italic' }}>
            Ce parcours illustre le déroulement habituel — les modalités exactes sont à définir lors du premier échange.
          </p>
        </div>
      </section>

      {/* ── ZONES D'INTERVENTION ─────────────────────────────────── */}
      <section
        aria-labelledby="territory-title"
        style={{ paddingBlock: 'var(--section-gap)' }}
      >
        <div className="container" style={{ maxWidth: '760px' }}>
          <h2 id="territory-title" className="section-title" style={{ marginBottom: '1rem' }}>
            Zones d&apos;intervention
          </h2>
          <p style={{ marginBottom: '1.5rem', lineHeight: 1.7 }}>
            Les Jardins d&apos;Henri interviennent dans les territoires suivants :
          </p>
          <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexWrap: 'wrap', gap: '0.625rem' }}>
            {identity.territories.map((t) => (
              <li
                key={t}
                style={{
                  padding: '0.5rem 1rem',
                  background: 'var(--color-sage)',
                  borderRadius: '999px',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  color: 'var(--color-green)',
                  border: '1px solid var(--color-green2)',
                }}
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────────── */}
      <section
        aria-labelledby="faq-title"
        style={{
          paddingBlock: 'var(--section-gap)',
          background: 'var(--color-sage)',
        }}
      >
        <div className="container" style={{ maxWidth: '760px' }}>
          <h2 id="faq-title" className="section-title" style={{ marginBottom: '2rem' }}>
            Questions fréquentes
          </h2>
          <dl style={{ margin: 0 }}>
            {faqs.map((faq, i) => (
              <div
                key={i}
                style={{
                  borderBottom: i < faqs.length - 1 ? '1px solid var(--color-stone)' : 'none',
                  paddingBlock: '1.25rem',
                }}
              >
                <dt style={{ fontWeight: 700, color: 'var(--color-green)', fontSize: '1rem', marginBottom: '0.5rem' }}>
                  {faq.q}
                </dt>
                <dd style={{ margin: 0, lineHeight: 1.7, opacity: 0.85 }}>
                  {faq.a}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* ── FORMULAIRE DE CONVERSION ─────────────────────────────── */}
      <section
        aria-labelledby="contact-form-title"
        style={{ paddingBlock: 'var(--section-gap)' }}
      >
        <div className="container" style={{ maxWidth: '640px' }}>
          <h2 id="contact-form-title" className="section-title" style={{ marginBottom: '0.5rem' }}>
            Parlons de votre extérieur
          </h2>
          <p style={{ marginBottom: '2rem', opacity: 0.75, lineHeight: 1.65 }}>
            Décrivez votre projet en quelques clics. Nous vous recontactons dans les meilleurs délais.
          </p>
          <QuoteFormWrapper />
          <p style={{ marginTop: '1.5rem', textAlign: 'center', fontSize: '0.875rem', opacity: 0.65 }}>
            Vous préférez appeler ?{' '}
            <a href={identity.phoneLink} style={{ color: 'var(--color-green)', fontWeight: 600 }}>
              {identity.phone}
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
