'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'
import type { PortfolioItem } from '@/lib/types'

interface Props {
  item: PortfolioItem
  onClose: () => void
  onPrev?: () => void
  onNext?: () => void
}

export function Lightbox({ item, onClose, onPrev, onNext }: Props) {
  const closeRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    closeRef.current?.focus()
    document.body.style.overflow = 'hidden'
    return () => { document.body.style.overflow = '' }
  }, [])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft' && onPrev) onPrev()
      if (e.key === 'ArrowRight' && onNext) onNext()
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [onClose, onPrev, onNext])

  return (
    <div
      className="lightbox-overlay"
      role="dialog"
      aria-label={item.title}
      aria-modal="true"
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      {/* Close */}
      <button
        ref={closeRef}
        onClick={onClose}
        aria-label="Fermer"
        style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          background: 'rgba(255,255,255,0.15)',
          border: 'none',
          borderRadius: '50%',
          width: '44px',
          height: '44px',
          cursor: 'pointer',
          color: 'white',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '1.25rem',
          zIndex: 10,
        }}
      >
        ✕
      </button>

      {/* Prev */}
      {onPrev && (
        <button
          onClick={onPrev}
          aria-label="Image précédente"
          style={{
            position: 'absolute',
            left: '0.75rem',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.15)',
            border: 'none',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            cursor: 'pointer',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.25rem',
            zIndex: 10,
          }}
        >
          ‹
        </button>
      )}

      {/* Next */}
      {onNext && (
        <button
          onClick={onNext}
          aria-label="Image suivante"
          style={{
            position: 'absolute',
            right: '0.75rem',
            top: '50%',
            transform: 'translateY(-50%)',
            background: 'rgba(255,255,255,0.15)',
            border: 'none',
            borderRadius: '50%',
            width: '44px',
            height: '44px',
            cursor: 'pointer',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.25rem',
            zIndex: 10,
          }}
        >
          ›
        </button>
      )}

      {/* Image */}
      <figure style={{ margin: 0, maxWidth: 'min(900px, calc(100vw - 8rem))', maxHeight: 'calc(100vh - 6rem)', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
        <div style={{ position: 'relative', width: 'min(900px, calc(100vw - 8rem))', aspectRatio: `${item.imageWidth} / ${item.imageHeight}`, borderRadius: 'var(--radius-md)', overflow: 'hidden', maxHeight: 'calc(100vh - 10rem)' }}>
          <Image
            src={item.image}
            alt={item.imageAlt}
            fill
            sizes="(max-width: 900px) 100vw, 900px"
            style={{ objectFit: 'contain' }}
            priority
          />
        </div>
        <figcaption style={{ color: 'rgba(255,255,255,0.85)', textAlign: 'center', fontSize: '0.9rem', lineHeight: 1.5 }}>
          <strong>{item.title}</strong>
          {item.description && <><br /><span style={{ opacity: 0.7, fontSize: '0.8rem' }}>{item.description}</span></>}
        </figcaption>
      </figure>
    </div>
  )
}
