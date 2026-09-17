'use client'

import { useState, useRef, useId } from 'react'
import type { ProjectType, ContactMode, QuoteFormData, QuoteFormResult } from '@/lib/types'
import { CaptchaField } from './CaptchaField'

const PROJECT_OPTIONS: { id: ProjectType; label: string; icon: string }[] = [
  { id: 'creation-jardin',       label: 'Création de jardin',           icon: '🌳' },
  { id: 'terrasse-dallage',      label: 'Terrasse ou dallage',          icon: '🪨' },
  { id: 'allee-acces',           label: 'Allée ou accès',               icon: '🚗' },
  { id: 'maconnerie-cloture',    label: 'Maçonnerie, muret ou clôture', icon: '🧱' },
  { id: 'piscine-pool-house',    label: 'Piscine ou pool house',        icon: '💦' },
  { id: 'plantations-arrosage',  label: 'Plantations ou arrosage',      icon: '🌿' },
  { id: 'entretien',             label: 'Entretien',                     icon: '✂️' },
  { id: 'autre',                 label: 'Autre / besoin de conseils',    icon: '💬' },
]

interface Props {
  presetType?: ProjectType
}

export function QuoteForm({ presetType }: Props) {
  const uid = useId()
  const errorSummaryRef = useRef<HTMLDivElement>(null)

  const [step, setStep] = useState<1 | 2>(1)
  const [loading, setLoading] = useState(false)
  const [result, setResult] = useState<QuoteFormResult | null>(null)
  const [showDetails, setShowDetails] = useState(false)

  // Step 1
  const [selectedTypes, setSelectedTypes] = useState<ProjectType[]>(presetType ? [presetType] : [])
  const [commune, setCommune] = useState('')

  // Step 2
  const [contactMode, setContactMode] = useState<ContactMode>('telephone')
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [echéance, setEcheance] = useState('')
  const [surface, setSurface] = useState('')

  // Captcha
  const [captchaToken, setCaptchaToken] = useState('')
  const [captchaAnswer, setCaptchaAnswer] = useState('')
  const [captchaKey, setCaptchaKey] = useState(0) // force une nouvelle question après un refus

  // Errors
  const [errors, setErrors] = useState<Partial<Record<string, string>>>({})

  const toggleType = (t: ProjectType) => {
    setSelectedTypes((prev) =>
      prev.includes(t) ? prev.filter((x) => x !== t) : [...prev, t]
    )
    if (errors.projectTypes) setErrors((e) => ({ ...e, projectTypes: undefined }))
  }

  const validateStep1 = () => {
    const errs: Record<string, string> = {}
    if (selectedTypes.length === 0) errs.projectTypes = 'Veuillez choisir au moins un type de projet.'
    if (!commune.trim()) errs.commune = 'Veuillez indiquer la commune du chantier.'
    setErrors(errs)
    if (Object.keys(errs).length > 0) {
      errorSummaryRef.current?.focus()
      return false
    }
    return true
  }

  const goStep2 = () => {
    if (validateStep1()) setStep(2)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs: Record<string, string> = {}
    if (!name.trim()) errs.name = 'Veuillez indiquer votre nom.'
    if (contactMode === 'telephone' && !phone.trim()) errs.phone = 'Veuillez indiquer votre téléphone.'
    if (contactMode === 'email' && !email.trim()) errs.email = 'Veuillez indiquer votre adresse e-mail.'
    if (contactMode === 'email' && email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) {
      errs.email = 'L\'adresse e-mail semble invalide.'
    }
    if (!captchaAnswer.trim()) errs.captchaAnswer = 'Veuillez répondre à la question de sécurité.'
    setErrors(errs)
    if (Object.keys(errs).length > 0) {
      errorSummaryRef.current?.focus()
      return
    }

    setLoading(true)
    try {
      const payload: Partial<QuoteFormData> = {
        projectTypes: selectedTypes,
        commune: commune.trim(),
        contactMode,
        name: name.trim(),
        phone: phone.trim() || undefined,
        email: email.trim() || undefined,
        message: message.trim() || undefined,
        captchaToken,
        captchaAnswer: captchaAnswer.trim(),
      }
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data: QuoteFormResult = await res.json()
      if (!data.success && data.errors?.captchaAnswer) {
        // Mauvaise réponse : on reste sur le formulaire avec une nouvelle question
        setErrors({ captchaAnswer: data.errors.captchaAnswer })
        setCaptchaKey((k) => k + 1)
        errorSummaryRef.current?.focus()
        return
      }
      setResult(data)
    } catch {
      setResult({
        success: false,
        demo: false,
        message: 'Une erreur réseau s\'est produite. Veuillez réessayer ou nous appeler directement.',
      })
    } finally {
      setLoading(false)
    }
  }

  // ── Success screen ────────────────────────────────────────────
  if (result?.success) {
    return (
      <div
        role="alert"
        aria-live="polite"
        style={{
          padding: '2rem',
          background: 'var(--color-sage)',
          borderRadius: 'var(--radius-md)',
          border: '1.5px solid var(--color-green2)',
          textAlign: 'center',
        }}
      >
        <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>✅</div>
        <p style={{ fontWeight: 700, fontSize: '1.1rem', color: 'var(--color-green)', marginBottom: '0.5rem' }}>
          Demande envoyée
        </p>
        <p style={{ marginBottom: '0.75rem', lineHeight: 1.6 }}>{result.message}</p>
        {result.demo && (
          <p style={{ fontSize: '0.8125rem', opacity: 0.65, fontStyle: 'italic', background: 'rgba(0,0,0,0.06)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)' }}>
            Mode démonstration — aucune donnée transmise à l&apos;entreprise.
          </p>
        )}
      </div>
    )
  }

  // ── Error screen ─────────────────────────────────────────────
  if (result && !result.success) {
    return (
      <div role="alert" aria-live="polite" style={{ padding: '1.5rem', background: '#fef2f2', borderRadius: 'var(--radius-md)', border: '1.5px solid #fca5a5' }}>
        <p style={{ fontWeight: 600, color: '#991b1b', marginBottom: '0.5rem' }}>Échec de l&apos;envoi</p>
        <p style={{ marginBottom: '1rem', lineHeight: 1.6 }}>{result.message}</p>
        <button className="btn-secondary" onClick={() => setResult(null)}>
          Réessayer
        </button>
      </div>
    )
  }

  return (
    <form onSubmit={handleSubmit} noValidate>
      {/* Honeypot – hidden from real users */}
      <input type="text" name="website" tabIndex={-1} aria-hidden="true" style={{ display: 'none' }} autoComplete="off" />

      {/* Progress */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
        {[1, 2].map((n) => (
          <div key={n} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
            <div style={{
              width: '28px', height: '28px', borderRadius: '50%',
              background: step >= n ? 'var(--color-green)' : 'var(--color-stone)',
              color: step >= n ? 'white' : 'var(--color-text)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '0.8125rem', fontWeight: 700,
            }}>
              {n}
            </div>
            <span style={{ fontSize: '0.8125rem', fontWeight: step === n ? 600 : 400, color: step === n ? 'var(--color-green)' : 'var(--color-text)', opacity: step === n ? 1 : 0.6 }}>
              {n === 1 ? 'Votre projet' : 'Vos coordonnées'}
            </span>
            {n < 2 && <span style={{ color: 'var(--color-stone)', fontSize: '1rem' }}>›</span>}
          </div>
        ))}
      </div>

      {/* Error summary */}
      {Object.keys(errors).length > 0 && (
        <div
          ref={errorSummaryRef}
          tabIndex={-1}
          role="alert"
          aria-live="assertive"
          style={{ padding: '0.875rem 1rem', background: '#fef2f2', border: '1px solid #fca5a5', borderRadius: 'var(--radius-sm)', marginBottom: '1rem' }}
        >
          <p style={{ fontWeight: 600, color: '#991b1b', marginBottom: '0.25rem', fontSize: '0.875rem' }}>
            Veuillez corriger les erreurs suivantes :
          </p>
          <ul style={{ margin: 0, paddingLeft: '1.25rem', fontSize: '0.875rem', color: '#b91c1c' }}>
            {Object.values(errors).map((e, i) => <li key={i}>{e}</li>)}
          </ul>
        </div>
      )}

      {/* ── STEP 1 ────────────────────────────────────────────── */}
      {step === 1 && (
        <div>
          <fieldset style={{ border: 'none', padding: 0, margin: '0 0 1.5rem' }}>
            <legend style={{ display: 'block', fontWeight: 700, color: 'var(--color-green)', marginBottom: '0.875rem', fontSize: '0.9375rem' }}>
              Quel type de travaux envisagez-vous ?{' '}
              <span style={{ color: '#c0392b' }} aria-label="requis">*</span>
            </legend>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '0.5rem' }}>
              {PROJECT_OPTIONS.map((opt) => {
                const checked = selectedTypes.includes(opt.id)
                return (
                  <label
                    key={opt.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      padding: '0.625rem 0.875rem',
                      borderRadius: 'var(--radius-sm)',
                      border: `1.5px solid ${checked ? 'var(--color-green)' : 'var(--color-stone)'}`,
                      background: checked ? 'var(--color-sage)' : 'var(--color-white)',
                      cursor: 'pointer',
                      fontSize: '0.875rem',
                      fontWeight: checked ? 600 : 400,
                      color: checked ? 'var(--color-green)' : 'var(--color-text)',
                      transition: 'border-color 0.12s, background 0.12s',
                      userSelect: 'none',
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleType(opt.id)}
                      style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
                    />
                    <span aria-hidden="true">{opt.icon}</span>
                    {opt.label}
                  </label>
                )
              })}
            </div>
            {errors.projectTypes && (
              <span className="field-error" role="alert">{errors.projectTypes}</span>
            )}
          </fieldset>

          <div style={{ marginBottom: '1.5rem' }}>
            <label htmlFor={`${uid}-commune`} className="field-label">
              Commune ou code postal du chantier{' '}
              <span style={{ color: '#c0392b' }} aria-label="requis">*</span>
            </label>
            <input
              id={`${uid}-commune`}
              type="text"
              className={`field-input${errors.commune ? ' error' : ''}`}
              value={commune}
              onChange={(e) => { setCommune(e.target.value); setErrors((er) => ({ ...er, commune: undefined })) }}
              placeholder="Ex. : Saint-Didier-au-Mont-d'Or"
              autoComplete="address-level2"
              aria-required="true"
              aria-describedby={errors.commune ? `${uid}-commune-err` : undefined}
            />
            {errors.commune && <span id={`${uid}-commune-err`} className="field-error" role="alert">{errors.commune}</span>}
          </div>

          <button type="button" onClick={goStep2} className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
            Continuer →
          </button>
        </div>
      )}

      {/* ── STEP 2 ────────────────────────────────────────────── */}
      {step === 2 && (
        <div>
          {/* Contact mode */}
          <fieldset style={{ border: 'none', padding: 0, margin: '0 0 1.25rem' }}>
            <legend className="field-label" style={{ marginBottom: '0.625rem' }}>
              Comment préférez-vous être recontacté ?{' '}
              <span style={{ color: '#c0392b' }} aria-label="requis">*</span>
            </legend>
            <div style={{ display: 'flex', gap: '0.625rem' }}>
              {(['telephone', 'email'] as ContactMode[]).map((mode) => (
                <label
                  key={mode}
                  style={{
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.375rem',
                    padding: '0.625rem',
                    border: `1.5px solid ${contactMode === mode ? 'var(--color-green)' : 'var(--color-stone)'}`,
                    borderRadius: 'var(--radius-sm)',
                    background: contactMode === mode ? 'var(--color-sage)' : 'var(--color-white)',
                    cursor: 'pointer',
                    fontWeight: contactMode === mode ? 600 : 400,
                    color: contactMode === mode ? 'var(--color-green)' : 'var(--color-text)',
                    fontSize: '0.9rem',
                    transition: 'border-color 0.12s, background 0.12s',
                    userSelect: 'none',
                  }}
                >
                  <input
                    type="radio"
                    name="contactMode"
                    value={mode}
                    checked={contactMode === mode}
                    onChange={() => setContactMode(mode)}
                    style={{ position: 'absolute', opacity: 0, width: 0, height: 0 }}
                  />
                  {mode === 'telephone' ? '📞 Téléphone' : '✉️ E-mail'}
                </label>
              ))}
            </div>
          </fieldset>

          {/* Name */}
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor={`${uid}-name`} className="field-label">
              Nom et prénom <span style={{ color: '#c0392b' }} aria-label="requis">*</span>
            </label>
            <input
              id={`${uid}-name`}
              type="text"
              className={`field-input${errors.name ? ' error' : ''}`}
              value={name}
              onChange={(e) => { setName(e.target.value); setErrors((er) => ({ ...er, name: undefined })) }}
              autoComplete="name"
              aria-required="true"
              aria-describedby={errors.name ? `${uid}-name-err` : undefined}
            />
            {errors.name && <span id={`${uid}-name-err`} className="field-error" role="alert">{errors.name}</span>}
          </div>

          {/* Phone / Email */}
          {contactMode === 'telephone' ? (
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor={`${uid}-phone`} className="field-label">
                Téléphone <span style={{ color: '#c0392b' }} aria-label="requis">*</span>
              </label>
              <input
                id={`${uid}-phone`}
                type="tel"
                className={`field-input${errors.phone ? ' error' : ''}`}
                value={phone}
                onChange={(e) => { setPhone(e.target.value); setErrors((er) => ({ ...er, phone: undefined })) }}
                autoComplete="tel"
                inputMode="tel"
                aria-required="true"
                aria-describedby={errors.phone ? `${uid}-phone-err` : undefined}
              />
              {errors.phone && <span id={`${uid}-phone-err`} className="field-error" role="alert">{errors.phone}</span>}
            </div>
          ) : (
            <div style={{ marginBottom: '1rem' }}>
              <label htmlFor={`${uid}-email`} className="field-label">
                Adresse e-mail <span style={{ color: '#c0392b' }} aria-label="requis">*</span>
              </label>
              <input
                id={`${uid}-email`}
                type="email"
                className={`field-input${errors.email ? ' error' : ''}`}
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors((er) => ({ ...er, email: undefined })) }}
                autoComplete="email"
                inputMode="email"
                aria-required="true"
                aria-describedby={errors.email ? `${uid}-email-err` : undefined}
              />
              {errors.email && <span id={`${uid}-email-err`} className="field-error" role="alert">{errors.email}</span>}
            </div>
          )}

          {/* Message */}
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor={`${uid}-message`} className="field-label">
              Message <span style={{ fontSize: '0.8125rem', fontWeight: 400, opacity: 0.65 }}>(facultatif)</span>
            </label>
            <textarea
              id={`${uid}-message`}
              className="field-input"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              rows={3}
              maxLength={2000}
              style={{ resize: 'vertical', minHeight: '80px' }}
              placeholder="Décrivez votre projet en quelques mots..."
            />
          </div>

          {/* Détails facultatifs */}
          <div style={{ marginBottom: '1.5rem' }}>
            <button
              type="button"
              onClick={() => setShowDetails((v) => !v)}
              style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--color-green2)', fontSize: '0.875rem', fontWeight: 600, padding: 0, display: 'flex', alignItems: 'center', gap: '0.375rem' }}
              aria-expanded={showDetails}
            >
              <span style={{ display: 'inline-block', transform: showDetails ? 'rotate(90deg)' : 'none', transition: 'transform 0.15s' }}>›</span>
              Précisions facultatives
            </button>
            {showDetails && (
              <div style={{ marginTop: '1rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                <div>
                  <label htmlFor={`${uid}-echeance`} className="field-label" style={{ fontWeight: 400 }}>
                    Échéance envisagée
                  </label>
                  <select
                    id={`${uid}-echeance`}
                    className="field-input"
                    value={echéance}
                    onChange={(e) => setEcheance(e.target.value)}
                  >
                    <option value="">Je ne sais pas encore</option>
                    <option value="urgent">Urgent</option>
                    <option value="3-mois">Dans 3 mois</option>
                    <option value="6-mois">Dans 6 mois</option>
                    <option value="1-an">Dans 1 an</option>
                  </select>
                </div>
                <div>
                  <label htmlFor={`${uid}-surface`} className="field-label" style={{ fontWeight: 400 }}>
                    Surface approximative
                  </label>
                  <input
                    id={`${uid}-surface`}
                    type="text"
                    className="field-input"
                    value={surface}
                    onChange={(e) => setSurface(e.target.value)}
                    placeholder="Ex. : 200 m²"
                  />
                </div>
              </div>
            )}
          </div>

          {/* Captcha */}
          <CaptchaField
            key={captchaKey}
            id={`${uid}-captcha`}
            value={captchaAnswer}
            onChange={(v) => { setCaptchaAnswer(v); setErrors((er) => ({ ...er, captchaAnswer: undefined })) }}
            onTokenChange={setCaptchaToken}
            error={errors.captchaAnswer}
          />

          {/* Privacy note */}
          <p style={{ fontSize: '0.8125rem', opacity: 0.65, lineHeight: 1.55, marginBottom: '1.25rem' }}>
            Vos coordonnées sont utilisées uniquement pour répondre à votre demande.{' '}
            <a href="/confidentialite/" style={{ color: 'var(--color-green2)', fontWeight: 500 }}>Politique de confidentialité</a>.
          </p>

          <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
            <button
              type="button"
              onClick={() => { setStep(1); setErrors({}) }}
              className="btn-secondary"
            >
              ← Retour
            </button>
            <button
              type="submit"
              className="btn-primary"
              style={{ flex: 1, justifyContent: 'center', minWidth: '180px' }}
              disabled={loading}
            >
              {loading ? 'Envoi en cours…' : 'Envoyer ma demande'}
            </button>
          </div>
        </div>
      )}
    </form>
  )
}
