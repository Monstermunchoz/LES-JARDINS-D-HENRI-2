'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect, useRef } from 'react'
import { identity } from '@/data/identity'

const navLinks = [
  {
    label: 'Services',
    href: '/services/',
    children: [
      { label: 'Création et aménagement', href: '/services/creation-amenagement-jardin/' },
      { label: 'Terrasses, dallages et accès', href: '/services/terrasses-dallages-acces/' },
      { label: 'Maçonnerie paysagère', href: '/services/maconnerie-paysagere/' },
      { label: 'Piscines et pool houses', href: '/services/piscines-pool-houses/' },
      { label: 'Plantations et arrosage', href: '/services/plantations-arrosage/' },
      { label: 'Entretien de jardins', href: '/services/entretien-jardin/' },
    ],
  },
  { label: 'Nos réalisations', href: '/realisations/' },
  { label: 'Avant / après', href: '/avant-apres/' },
  { label: 'L\'entreprise', href: '/entreprise/' },
  { label: 'Contact', href: '/contact/' },
]

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [servicesOpen, setServicesOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const menuRef = useRef<HTMLDivElement>(null)
  const triggerRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false)
        setServicesOpen(false)
        triggerRef.current?.focus()
      }
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  // Trap focus when menu open
  useEffect(() => {
    if (menuOpen && menuRef.current) {
      const focusable = menuRef.current.querySelectorAll<HTMLElement>(
        'a, button, [tabindex]:not([tabindex="-1"])'
      )
      focusable[0]?.focus()
    }
  }, [menuOpen])

  // Body scroll lock
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  return (
    <header
      className="header"
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 50,
        background: 'var(--color-ivory)',
        borderBottom: scrolled ? '1px solid var(--color-stone)' : '1px solid transparent',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        boxShadow: scrolled ? '0 1px 12px rgba(32,61,48,0.06)' : 'none',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: '4.5rem', gap: '1rem' }}>

        {/* Logo */}
        <Link href="/" aria-label={`${identity.brandName} — retour à l'accueil`} style={{ flexShrink: 0, display: 'flex', alignItems: 'center' }}>
          <Image
            src="/images/logo-jardins-henri-vert.png"
            alt={`Logo ${identity.brandName}`}
            width={2013}
            height={660}
            sizes="200px"
            style={{ height: '3.25rem', width: 'auto', objectFit: 'contain' }}
            priority
          />
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Navigation principale" style={{ display: 'none' }} className="desktop-nav">
          <ul style={{ display: 'flex', alignItems: 'center', gap: '0.125rem', listStyle: 'none', margin: 0, padding: 0 }}>
            {navLinks.map((link) =>
              link.children ? (
                <li key={link.href} style={{ position: 'relative' }}>
                  <button
                    aria-expanded={servicesOpen}
                    aria-haspopup="true"
                    onClick={() => setServicesOpen((v) => !v)}
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '6px',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      color: 'var(--color-text)',
                      fontFamily: 'var(--font-body)',
                      transition: 'color 0.15s',
                    }}
                    onMouseOver={(e) => (e.currentTarget.style.color = 'var(--color-green)')}
                    onMouseOut={(e) => (e.currentTarget.style.color = 'var(--color-text)')}
                  >
                    {link.label}
                    <svg width="12" height="12" viewBox="0 0 12 12" aria-hidden="true" style={{ transform: servicesOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.15s' }}>
                      <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  {servicesOpen && (
                    <ul
                      style={{
                        position: 'absolute',
                        top: 'calc(100% + 0.5rem)',
                        left: 0,
                        background: 'var(--color-white)',
                        border: '1px solid var(--color-stone)',
                        borderRadius: 'var(--radius-md)',
                        boxShadow: '0 8px 32px rgba(32,61,48,0.12)',
                        listStyle: 'none',
                        padding: '0.5rem',
                        margin: 0,
                        minWidth: '240px',
                        zIndex: 60,
                      }}
                    >
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setServicesOpen(false)}
                            style={{
                              display: 'block',
                              padding: '0.625rem 0.875rem',
                              borderRadius: '6px',
                              fontSize: '0.875rem',
                              color: 'var(--color-text)',
                              textDecoration: 'none',
                              transition: 'background 0.1s',
                            }}
                            onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.background = 'var(--color-sage)'; (e.currentTarget as HTMLElement).style.color = 'var(--color-green)' }}
                            onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = 'var(--color-text)' }}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ) : (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    style={{
                      display: 'block',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '6px',
                      fontSize: '0.9rem',
                      fontWeight: 500,
                      color: 'var(--color-text)',
                      textDecoration: 'none',
                      transition: 'color 0.15s',
                    }}
                    onMouseOver={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--color-green)')}
                    onMouseOut={(e) => ((e.currentTarget as HTMLElement).style.color = 'var(--color-text)')}
                  >
                    {link.label}
                  </Link>
                </li>
              )
            )}
          </ul>
        </nav>

        {/* Right zone */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexShrink: 0 }}>
          <Link
            href={identity.phoneLink}
            style={{ display: 'none' }}
            className="phone-link"
            aria-label={`Appeler le ${identity.phone}`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
            </svg>
            <span>{identity.phone}</span>
          </Link>
          <Link href="/devis/" className="btn-primary" style={{ display: 'none' }} id="header-cta">
            Demander un devis
          </Link>

          {/* Burger */}
          <button
            ref={triggerRef}
            aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen((v) => !v)}
            className="burger-btn"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0.5rem',
              borderRadius: '6px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              color: 'var(--color-green)',
            }}
          >
            <span style={{ display: 'block', width: '22px', height: '2px', background: 'currentColor', borderRadius: '2px', transition: 'transform 0.2s, opacity 0.2s', transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none' }} />
            <span style={{ display: 'block', width: '22px', height: '2px', background: 'currentColor', borderRadius: '2px', transition: 'opacity 0.2s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: '22px', height: '2px', background: 'currentColor', borderRadius: '2px', transition: 'transform 0.2s, opacity 0.2s', transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
          </button>
        </div>
      </div>

      {/* Mobile/tablet drawer */}
      {menuOpen && (
        <div
          id="mobile-menu"
          ref={menuRef}
          role="dialog"
          aria-label="Menu de navigation"
          aria-modal="true"
          style={{
            position: 'fixed',
            inset: 0,
            top: '4.5rem',
            background: 'var(--color-ivory)',
            zIndex: 49,
            overflowY: 'auto',
            padding: '1.5rem var(--side-padding) 6rem',
          }}
        >
          <nav aria-label="Navigation mobile">
            <ul style={{ listStyle: 'none', margin: 0, padding: 0, display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    style={{
                      display: 'block',
                      padding: '0.875rem 0',
                      borderBottom: '1px solid var(--color-sage)',
                      fontWeight: 600,
                      fontSize: '1.1rem',
                      color: 'var(--color-green)',
                      textDecoration: 'none',
                    }}
                  >
                    {link.label}
                  </Link>
                  {link.children && (
                    <ul style={{ listStyle: 'none', margin: '0.25rem 0 0.5rem 1rem', padding: 0 }}>
                      {link.children.map((child) => (
                        <li key={child.href}>
                          <Link
                            href={child.href}
                            onClick={() => setMenuOpen(false)}
                            style={{
                              display: 'block',
                              padding: '0.5rem 0',
                              fontSize: '0.9375rem',
                              color: 'var(--color-text)',
                              textDecoration: 'none',
                            }}
                          >
                            {child.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
            <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              <Link href="/devis/" className="btn-primary" onClick={() => setMenuOpen(false)} style={{ textAlign: 'center', justifyContent: 'center' }}>
                Demander un devis
              </Link>
              <Link href={identity.phoneLink} className="btn-secondary" style={{ textAlign: 'center', justifyContent: 'center' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .84h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L6.09 8.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z"/>
                </svg>
                {identity.phone}
              </Link>
            </div>
          </nav>
        </div>
      )}

      <style>{`
        @media (min-width: 900px) {
          .desktop-nav { display: block !important; }
          .phone-link { display: flex !important; align-items: center; gap: 0.375rem; color: var(--color-text); font-size: 0.875rem; font-weight: 500; text-decoration: none; padding: 0.375rem 0.625rem; border-radius: 6px; transition: color 0.15s; }
          .phone-link:hover { color: var(--color-green); }
          #header-cta { display: inline-flex !important; }
          .burger-btn { display: none !important; }
        }
      `}</style>
    </header>
  )
}
