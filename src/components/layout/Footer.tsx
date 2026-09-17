import Link from 'next/link'
import Image from 'next/image'
import { identity } from '@/data/identity'

const currentYear = new Date().getFullYear()

const footerNav = [
  {
    title: 'Services',
    links: [
      { label: 'Création de jardin', href: '/services/creation-amenagement-jardin/' },
      { label: 'Terrasses et dallages', href: '/services/terrasses-dallages-acces/' },
      { label: 'Maçonnerie paysagère', href: '/services/maconnerie-paysagere/' },
      { label: 'Piscines et pool houses', href: '/services/piscines-pool-houses/' },
      { label: 'Plantations et arrosage', href: '/services/plantations-arrosage/' },
      { label: 'Entretien de jardins', href: '/services/entretien-jardin/' },
    ],
  },
  {
    title: 'Réalisations',
    links: [
      { label: 'Portfolio', href: '/realisations/' },
      { label: 'Avant / après', href: '/avant-apres/' },
    ],
  },
  {
    title: "L'entreprise",
    links: [
      { label: 'Notre histoire', href: '/entreprise/' },
      { label: 'Demander un devis', href: '/devis/' },
      { label: 'Contact', href: '/contact/' },
    ],
  },
  {
    title: 'Informations',
    links: [
      { label: 'Mentions légales', href: '/mentions-legales/' },
      { label: 'Politique de confidentialité', href: '/confidentialite/' },
    ],
  },
]

export function Footer() {
  return (
    <footer
      style={{
        background: 'var(--color-green)',
        color: 'rgba(255,255,255,0.85)',
        paddingTop: '3rem',
        paddingBottom: '2rem',
        marginTop: 'var(--section-gap)',
      }}
    >
      <style>{`
        .footer-link { color: rgba(255,255,255,0.75); text-decoration: none; font-size: 0.875rem; transition: color 0.15s; }
        .footer-link:hover { color: white; }
        .footer-contact-link { color: var(--color-stone, #D7C7AB); text-decoration: none; display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; transition: color 0.15s; }
        .footer-contact-link:hover { color: white; }
      `}</style>

      <div className="container">
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
            gap: '2rem 3rem',
            marginBottom: '2.5rem',
          }}
        >
          {/* Brand column */}
          <div style={{ gridColumn: '1 / -1', maxWidth: '300px' }}>
            <Link href="/" aria-label={`${identity.brandName} — retour à l'accueil`}>
              <Image
                src="/images/logo-jardins-henri-creme.png"
                alt={`Logo ${identity.brandName}`}
                width={2004}
                height={641}
                sizes="220px"
                style={{ height: '3.5rem', width: 'auto' }}
              />
            </Link>
            <p style={{ marginTop: '1rem', fontSize: '0.875rem', lineHeight: 1.6, maxWidth: '260px' }}>
              Paysagiste et maçonnerie extérieure dans les Monts d&apos;Or, la Métropole de Lyon, l&apos;Ouest Lyonnais, le Beaujolais et la Vallée d&apos;Azergues.
            </p>
            <div style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
              <a href={identity.phoneLink} className="footer-contact-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/></svg>
                {identity.phone}
              </a>
              <a href={`mailto:${identity.email}`} className="footer-contact-link">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2"/><path d="M22 7l-10 7L2 7"/></svg>
                {identity.email}
              </a>
            </div>
          </div>

          {/* Nav columns */}
          {footerNav.map((col) => (
            <div key={col.title}>
              <h3 style={{ fontSize: '0.75rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', color: 'rgba(255,255,255,0.5)', margin: '0 0 0.875rem' }}>
                {col.title}
              </h3>
              <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link href={link.href} className="footer-link">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Addresses */}
        <div
          style={{
            borderTop: '1px solid rgba(255,255,255,0.12)',
            paddingTop: '1.5rem',
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem 2rem',
          }}
        >
          <address style={{ fontStyle: 'normal', fontSize: '0.8125rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.5)' }}>
            <strong style={{ color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: '0.25rem' }}>
              {identity.headquarters.label}
            </strong>
            {identity.headquarters.lines.map((line, i) => (
              <span key={i}>{line}<br /></span>
            ))}
          </address>
          <address style={{ fontStyle: 'normal', fontSize: '0.8125rem', lineHeight: 1.6, color: 'rgba(255,255,255,0.5)' }}>
            <strong style={{ color: 'rgba(255,255,255,0.7)', display: 'block', marginBottom: '0.25rem' }}>
              {identity.warehouse.label}
            </strong>
            {identity.warehouse.lines.map((line, i) => (
              <span key={i}>{line}<br /></span>
            ))}
            <small style={{ fontSize: '0.75rem' }}>Non ouvert au public</small>
          </address>
          <div style={{ fontSize: '0.8125rem', color: 'rgba(255,255,255,0.4)', lineHeight: 1.6 }}>
            <div>SIREN : {identity.siren}</div>
            <div>{identity.rcs}</div>
            <div style={{ marginTop: '0.5rem' }}>
              © {currentYear} {identity.brandName}
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
