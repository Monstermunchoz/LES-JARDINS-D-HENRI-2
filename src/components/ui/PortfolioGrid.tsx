'use client'

import Image from 'next/image'
import { useState, useCallback } from 'react'
import { portfolioItems, portfolioCategories } from '@/data/portfolio'
import type { PortfolioCategory, PortfolioItem } from '@/lib/types'
import { Lightbox } from './Lightbox'

export function PortfolioGrid() {
  const [activeCategory, setActiveCategory] = useState<PortfolioCategory>('tous')
  const [lightboxItem, setLightboxItem] = useState<PortfolioItem | null>(null)
  const [visible, setVisible] = useState(9)

  const filtered = activeCategory === 'tous'
    ? portfolioItems
    : portfolioItems.filter((item) => item.categories.includes(activeCategory as Exclude<PortfolioCategory, 'tous'>))

  const openLightbox = useCallback((item: PortfolioItem) => setLightboxItem(item), [])
  const closeLightbox = useCallback(() => setLightboxItem(null), [])

  const lightboxIndex = lightboxItem ? filtered.findIndex((i) => i.id === lightboxItem.id) : -1
  const prevItem = lightboxIndex > 0 ? filtered[lightboxIndex - 1] : null
  const nextItem = lightboxIndex < filtered.length - 1 ? filtered[lightboxIndex + 1] : null

  return (
    <div>
      {/* Filters */}
      <div
        role="group"
        aria-label="Filtrer par catégorie"
        style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '2rem' }}
      >
        {portfolioCategories.map((cat) => {
          const count = cat.id === 'tous'
            ? portfolioItems.length
            : portfolioItems.filter((i) => i.categories.includes(cat.id as Exclude<PortfolioCategory, 'tous'>)).length
          if (count === 0 && cat.id !== 'tous') return null
          return (
            <button
              key={cat.id}
              onClick={() => { setActiveCategory(cat.id); setVisible(9) }}
              aria-pressed={activeCategory === cat.id}
              style={{
                padding: '0.5rem 1rem',
                borderRadius: '999px',
                border: `1.5px solid ${activeCategory === cat.id ? 'var(--color-green)' : 'var(--color-stone)'}`,
                background: activeCategory === cat.id ? 'var(--color-green)' : 'var(--color-white)',
                color: activeCategory === cat.id ? 'white' : 'var(--color-text)',
                fontSize: '0.875rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'background 0.15s, color 0.15s, border-color 0.15s',
                fontFamily: 'var(--font-body)',
              }}
            >
              {cat.label} ({count})
            </button>
          )
        })}
      </div>

      {/* Grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
          gap: '1rem',
        }}
      >
        {filtered.slice(0, visible).map((item) => (
          <article key={item.id}>
            <button
              onClick={() => openLightbox(item)}
              style={{
                display: 'block',
                width: '100%',
                background: 'none',
                border: 'none',
                padding: 0,
                cursor: 'zoom-in',
                borderRadius: 'var(--radius-md)',
                overflow: 'hidden',
              }}
              aria-label={`Ouvrir : ${item.title}`}
            >
              <div style={{ aspectRatio: '4/3', position: 'relative', overflow: 'hidden', borderRadius: 'var(--radius-md)' }}>
                <Image
                  src={item.image}
                  alt={item.imageAlt}
                  fill
                  sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  style={{ objectFit: 'cover', objectPosition: item.focalPoint ?? 'center', transition: 'transform 0.3s ease' }}
                  onMouseOver={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1.03)' }}
                  onMouseOut={(e) => { (e.currentTarget as HTMLElement).style.transform = 'scale(1)' }}
                />
              </div>
              <div style={{ padding: '0.75rem 0.25rem', textAlign: 'left' }}>
                <p style={{ margin: 0, fontWeight: 600, fontSize: '0.9rem', color: 'var(--color-green)' }}>
                  {item.title}
                </p>
                <p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem', opacity: 0.65, lineHeight: 1.5 }}>
                  {item.description}
                </p>
              </div>
            </button>
          </article>
        ))}
      </div>

      {/* Load more */}
      {visible < filtered.length && (
        <div style={{ textAlign: 'center', marginTop: '2rem' }}>
          <button
            className="btn-secondary"
            onClick={() => setVisible((v) => v + 6)}
          >
            Voir plus ({filtered.length - visible} restants)
          </button>
        </div>
      )}

      {filtered.length === 0 && (
        <p style={{ textAlign: 'center', opacity: 0.6, padding: '2rem 0' }}>
          Aucune réalisation dans cette catégorie pour l&apos;instant.
        </p>
      )}

      {/* Lightbox */}
      {lightboxItem && (
        <Lightbox
          item={lightboxItem}
          onClose={closeLightbox}
          onPrev={prevItem ? () => openLightbox(prevItem) : undefined}
          onNext={nextItem ? () => openLightbox(nextItem) : undefined}
        />
      )}
    </div>
  )
}
