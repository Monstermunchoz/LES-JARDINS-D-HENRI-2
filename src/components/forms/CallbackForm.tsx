'use client'

import { useState, useId } from 'react'
import { CaptchaField } from './CaptchaField'

export function CallbackForm() {
  const uid = useId()
  const [prenom, setPrenom] = useState('')
  const [phone, setPhone] = useState('')
  const [commune, setCommune] = useState('')
  const [loading, setLoading] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [error, setError] = useState('')
  const [captchaToken, setCaptchaToken] = useState('')
  const [captchaAnswer, setCaptchaAnswer] = useState('')
  const [captchaKey, setCaptchaKey] = useState(0)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!prenom.trim() || !phone.trim()) {
      setError('Veuillez indiquer votre prénom et votre téléphone.')
      return
    }
    if (!captchaAnswer.trim()) {
      setError('Veuillez répondre à la question de sécurité.')
      return
    }
    setError('')
    setLoading(true)
    try {
      const payload = {
        projectTypes: ['autre' as const],
        commune: commune.trim() || 'Non précisée',
        contactMode: 'telephone' as const,
        name: prenom.trim(),
        phone: phone.trim(),
        message: 'Demande de rappel',
        captchaToken,
        captchaAnswer: captchaAnswer.trim(),
      }
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      if (data.success) {
        setStatus('success')
      } else if (data.errors?.captchaAnswer) {
        setError(data.errors.captchaAnswer)
        setCaptchaKey((k) => k + 1)
      } else {
        setStatus('error')
        setError(data.message ?? 'Erreur lors de l\'envoi.')
      }
    } catch {
      setStatus('error')
      setError('Erreur réseau. Veuillez nous appeler directement.')
    } finally {
      setLoading(false)
    }
  }

  if (status === 'success') {
    return (
      <div role="alert" aria-live="polite" style={{ padding: '0.875rem', background: 'var(--color-white)', borderRadius: 'var(--radius-sm)', textAlign: 'center', fontSize: '0.875rem' }}>
        ✅ Demande reçue — nous vous rappelons dès que possible.
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      {error && <p role="alert" style={{ color: '#c0392b', fontSize: '0.8125rem', margin: 0 }}>{error}</p>}
      <div>
        <label htmlFor={`${uid}-prenom`} className="field-label" style={{ fontSize: '0.8125rem' }}>
          Prénom <span style={{ color: '#c0392b' }}>*</span>
        </label>
        <input
          id={`${uid}-prenom`}
          type="text"
          className="field-input"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          autoComplete="given-name"
          aria-required="true"
          style={{ fontSize: '0.9rem' }}
        />
      </div>
      <div>
        <label htmlFor={`${uid}-phone`} className="field-label" style={{ fontSize: '0.8125rem' }}>
          Téléphone <span style={{ color: '#c0392b' }}>*</span>
        </label>
        <input
          id={`${uid}-phone`}
          type="tel"
          className="field-input"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          autoComplete="tel"
          inputMode="tel"
          aria-required="true"
          style={{ fontSize: '0.9rem' }}
        />
      </div>
      <div>
        <label htmlFor={`${uid}-commune`} className="field-label" style={{ fontSize: '0.8125rem' }}>
          Commune <span style={{ opacity: 0.6, fontWeight: 400 }}>(facultatif)</span>
        </label>
        <input
          id={`${uid}-commune`}
          type="text"
          className="field-input"
          value={commune}
          onChange={(e) => setCommune(e.target.value)}
          autoComplete="address-level2"
          style={{ fontSize: '0.9rem' }}
        />
      </div>
      <CaptchaField
        key={captchaKey}
        id={`${uid}-captcha`}
        value={captchaAnswer}
        onChange={setCaptchaAnswer}
        onTokenChange={setCaptchaToken}
        compact
      />
      <button type="submit" className="btn-primary" disabled={loading} style={{ justifyContent: 'center' }}>
        {loading ? 'Envoi…' : 'Demander à être rappelé'}
      </button>
    </form>
  )
}
