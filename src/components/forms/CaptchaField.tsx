'use client'

import { useCallback, useEffect, useState } from 'react'

interface Props {
  id: string
  value: string
  onChange: (value: string) => void
  onTokenChange: (token: string) => void
  error?: string
  compact?: boolean
}

/**
 * Champ « question de sécurité » : récupère une question et un jeton signé
 * depuis /api/captcha, sans aucun service tiers.
 */
export function CaptchaField({ id, value, onChange, onTokenChange, error, compact }: Props) {
  const [question, setQuestion] = useState<string | null>(null)
  const [loadError, setLoadError] = useState(false)

  const [reloadCount, setReloadCount] = useState(0)

  // Chargement (et rechargement) de la question depuis le serveur
  useEffect(() => {
    let cancelled = false
    fetch('/api/captcha', { cache: 'no-store' })
      .then((res) => {
        if (!res.ok) throw new Error('captcha')
        return res.json() as Promise<{ question: string; token: string }>
      })
      .then((data) => {
        if (cancelled) return
        setQuestion(data.question)
        setLoadError(false)
        onTokenChange(data.token)
      })
      .catch(() => { if (!cancelled) setLoadError(true) })
    return () => { cancelled = true }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reloadCount])

  const load = useCallback(() => {
    setQuestion(null)
    setLoadError(false)
    onChange('')
    setReloadCount((n) => n + 1)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div style={{ marginBottom: compact ? 0 : '1rem' }}>
      <label htmlFor={id} className="field-label" style={compact ? { fontSize: '0.8125rem' } : undefined}>
        Vérification anti-robot <span style={{ color: '#c0392b' }} aria-label="requis">*</span>
      </label>
      <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'stretch', flexWrap: 'wrap' }}>
        <span
          aria-live="polite"
          style={{
            flex: '1 1 160px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0.625rem 0.875rem',
            background: 'var(--color-sage)',
            border: '1.5px solid var(--color-stone)',
            borderRadius: 'var(--radius-sm)',
            fontWeight: 600,
            color: 'var(--color-green)',
            fontSize: compact ? '0.875rem' : '0.9375rem',
            minHeight: '44px',
          }}
        >
          {loadError ? 'Question indisponible' : question ?? 'Chargement…'}
        </span>
        <input
          id={id}
          type="text"
          inputMode="numeric"
          autoComplete="off"
          className={`field-input${error ? ' error' : ''}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="Réponse"
          aria-required="true"
          aria-describedby={error ? `${id}-err` : undefined}
          disabled={!question}
          style={{ flex: '0 1 110px', minWidth: '90px', textAlign: 'center', fontSize: compact ? '0.9rem' : undefined }}
        />
        <button
          type="button"
          onClick={load}
          aria-label="Nouvelle question"
          title="Nouvelle question"
          style={{
            width: '44px',
            minHeight: '44px',
            borderRadius: 'var(--radius-sm)',
            border: '1.5px solid var(--color-stone)',
            background: 'var(--color-white)',
            cursor: 'pointer',
            color: 'var(--color-green)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M21 12a9 9 0 11-2.64-6.36" />
            <polyline points="21 3 21 9 15 9" />
          </svg>
        </button>
      </div>
      {error && <span id={`${id}-err`} className="field-error" role="alert">{error}</span>}
    </div>
  )
}
