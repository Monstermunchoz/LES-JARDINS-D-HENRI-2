'use client'

import Image from 'next/image'
import { useState, useRef, useCallback } from 'react'
import type { BeforeAfterPair } from '@/lib/types'

interface Props {
  pair: BeforeAfterPair
}

export function BeforeAfterSlider({ pair }: Props) {
  const [position, setPosition] = useState(50)
  const containerRef = useRef<HTMLDivElement>(null)
  const dragging = useRef(false)

  const updatePosition = useCallback((clientX: number) => {
    const el = containerRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = Math.max(0, Math.min(clientX - rect.left, rect.width))
    setPosition((x / rect.width) * 100)
  }, [])

  const onMouseDown = (e: React.MouseEvent) => {
    dragging.current = true
    updatePosition(e.clientX)
  }
  const onMouseMove = (e: React.MouseEvent) => {
    if (dragging.current) updatePosition(e.clientX)
  }
  const onMouseUp = () => { dragging.current = false }

  const onTouchStart = (e: React.TouchEvent) => {
    dragging.current = true
    updatePosition(e.touches[0].clientX)
  }
  const onTouchMove = (e: React.TouchEvent) => {
    if (dragging.current) updatePosition(e.touches[0].clientX)
  }
  const onTouchEnd = () => { dragging.current = false }

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') setPosition((p) => Math.max(0, p - 5))
    if (e.key === 'ArrowRight') setPosition((p) => Math.min(100, p + 5))
  }

  return (
    <div>
      {/* Slider */}
      <div
        ref={containerRef}
        role="img"
        aria-label={`Comparaison avant/après : ${pair.title}`}
        style={{
          position: 'relative',
          overflow: 'hidden',
          borderRadius: 'var(--radius-md)',
          aspectRatio: `${pair.before.width} / ${pair.before.height}`,
          maxWidth: '100%',
          cursor: 'ew-resize',
          userSelect: 'none',
        }}
        onMouseDown={onMouseDown}
        onMouseMove={onMouseMove}
        onMouseUp={onMouseUp}
        onMouseLeave={onMouseUp}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        {/* After (full) */}
        <Image
          src={pair.after.src}
          alt={pair.after.alt}
          fill
          sizes="(max-width: 780px) 100vw, 780px"
          style={{ objectFit: 'cover', pointerEvents: 'none' }}
          draggable={false}
        />

        {/* Before (clipped) */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            clipPath: `inset(0 ${100 - position}% 0 0)`,
          }}
        >
          <Image
            src={pair.before.src}
            alt={pair.before.alt}
            fill
            sizes="(max-width: 780px) 100vw, 780px"
            style={{ objectFit: 'cover', pointerEvents: 'none' }}
            draggable={false}
          />
        </div>

        {/* Divider */}
        <div
          style={{
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: `${position}%`,
            transform: 'translateX(-50%)',
            width: '3px',
            background: 'white',
            boxShadow: '0 0 8px rgba(0,0,0,0.4)',
            pointerEvents: 'none',
          }}
        >
          {/* Handle */}
          <div
            tabIndex={0}
            role="slider"
            aria-label="Déplacer pour comparer avant et après"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={Math.round(position)}
            onKeyDown={onKeyDown}
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '44px',
              height: '44px',
              background: 'white',
              borderRadius: '50%',
              boxShadow: '0 2px 12px rgba(0,0,0,0.25)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--color-green)',
              cursor: 'ew-resize',
              pointerEvents: 'all',
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M5 4l-3 4 3 4M11 4l3 4-3 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </div>

        {/* Labels */}
        <span style={{ position: 'absolute', top: '0.75rem', left: '0.75rem', background: 'rgba(0,0,0,0.55)', color: 'white', fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 0.625rem', borderRadius: '999px', letterSpacing: '0.05em', pointerEvents: 'none' }}>
          Avant
        </span>
        <span style={{ position: 'absolute', top: '0.75rem', right: '0.75rem', background: 'rgba(32,61,48,0.8)', color: 'white', fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 0.625rem', borderRadius: '999px', letterSpacing: '0.05em', pointerEvents: 'none' }}>
          Après
        </span>
      </div>

      {/* Fallback static buttons */}
      <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem' }}>
        <button
          onClick={() => setPosition(95)}
          className="btn-secondary"
          style={{ flex: 1, padding: '0.5rem', fontSize: '0.8125rem', justifyContent: 'center' }}
        >
          Voir Avant
        </button>
        <button
          onClick={() => setPosition(5)}
          className="btn-primary"
          style={{ flex: 1, padding: '0.5rem', fontSize: '0.8125rem', justifyContent: 'center' }}
        >
          Voir Après
        </button>
        <button
          onClick={() => setPosition(50)}
          style={{ padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)', border: '1.5px solid var(--color-stone)', background: 'transparent', cursor: 'pointer', fontSize: '0.8125rem', color: 'var(--color-text)' }}
        >
          50/50
        </button>
      </div>
    </div>
  )
}
