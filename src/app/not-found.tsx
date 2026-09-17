import Link from 'next/link'

export default function NotFound() {
  return (
    <section
      style={{
        paddingBlock: 'clamp(4rem, 8vw, 8rem)',
        textAlign: 'center',
      }}
    >
      <div className="container" style={{ maxWidth: '540px' }}>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '5rem', lineHeight: 1, color: 'var(--color-stone)', marginBottom: '1rem' }}>
          404
        </p>
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 3vw, 2rem)', color: 'var(--color-green)', marginBottom: '1rem' }}>
          Page introuvable
        </h1>
        <p style={{ opacity: 0.75, lineHeight: 1.7, marginBottom: '2rem' }}>
          La page que vous recherchez n&apos;existe pas ou a été déplacée.
        </p>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/services/" className="btn-secondary">Nos services</Link>
          <Link href="/realisations/" className="btn-secondary">Nos réalisations</Link>
          <Link href="/contact/" className="btn-primary">Nous contacter</Link>
        </div>
      </div>
    </section>
  )
}
