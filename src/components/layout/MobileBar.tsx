'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { identity } from '@/data/identity'

export function MobileBar() {
  const pathname = usePathname()
  // Hide on devis and contact pages where forms are prominent
  const path = pathname.replace(/\/$/, '')
  const hidden = path === '/devis' || path === '/contact'

  if (hidden) return null

  return (
    <div
      aria-label="Actions rapides"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 40,
        background: 'var(--color-white)',
        borderTop: '1px solid var(--color-stone)',
        display: 'flex',
        paddingBottom: 'env(safe-area-inset-bottom)',
      }}
      className="mobile-bar"
    >
      <a
        href={identity.phoneLink}
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.25rem',
          padding: '0.75rem 0.5rem',
          color: 'var(--color-green)',
          textDecoration: 'none',
          fontSize: '0.75rem',
          fontWeight: 600,
          borderRight: '1px solid var(--color-sage)',
          minHeight: '56px',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
        </svg>
        Appeler
      </a>
      <Link
        href="/devis/"
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '0.25rem',
          padding: '0.75rem 0.5rem',
          background: 'var(--color-green)',
          color: 'white',
          textDecoration: 'none',
          fontSize: '0.75rem',
          fontWeight: 600,
          minHeight: '56px',
        }}
      >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/>
          <polyline points="14,2 14,8 20,8"/>
          <line x1="16" y1="13" x2="8" y2="13"/>
          <line x1="16" y1="17" x2="8" y2="17"/>
          <polyline points="10,9 9,9 8,9"/>
        </svg>
        Mon devis
      </Link>

      <style>{`
        @media (min-width: 768px) {
          .mobile-bar { display: none !important; }
        }
      `}</style>
    </div>
  )
}
