import { NextRequest, NextResponse } from 'next/server'
import { validateQuoteForm, isSafeString } from '@/lib/validation'
import { verifyCaptcha } from '@/lib/captcha'
import { siteConfig } from '@/data/config'
import type { QuoteFormData, QuoteFormResult } from '@/lib/types'

// Simple in-memory rate limiting (per process, not distributed)
// In production, use a Redis-backed solution appropriate for the hosting.
const submissionLog = new Map<string, number[]>()
const RATE_LIMIT_WINDOW_MS = 60_000  // 1 minute
const RATE_LIMIT_MAX = 3             // max 3 requests per minute per IP

function checkRateLimit(ip: string): boolean {
  const now = Date.now()
  const submissions = (submissionLog.get(ip) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS)
  if (submissions.length >= RATE_LIMIT_MAX) return false
  submissions.push(now)
  submissionLog.set(ip, submissions)
  return true
}

function getClientIp(req: NextRequest): string {
  return req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ?? 'unknown'
}

function formatEmailBody(data: QuoteFormData): string {
  const projectLabels: Record<string, string> = {
    'creation-jardin': 'Création de jardin',
    'terrasse-dallage': 'Terrasse ou dallage',
    'allee-acces': 'Allée ou accès',
    'maconnerie-cloture': 'Maçonnerie, muret ou clôture',
    'piscine-pool-house': 'Piscine ou pool house',
    'plantations-arrosage': 'Plantations ou arrosage',
    'entretien': 'Entretien',
    'autre': 'Autre / besoin de conseils',
  }
  const types = data.projectTypes.map((t) => projectLabels[t] ?? t).join(', ')
  const contact = data.contactMode === 'telephone'
    ? `Téléphone : ${data.phone}`
    : `E-mail : ${data.email}`

  return [
    '=== Nouvelle demande de devis — Les Jardins d\'Henri ===',
    '',
    `Projet(s) : ${types}`,
    `Commune : ${data.commune}`,
    '',
    `Nom : ${data.name}`,
    `Mode de contact préféré : ${data.contactMode === 'telephone' ? 'Téléphone' : 'E-mail'}`,
    contact,
    '',
    data.message ? `Message : ${data.message}` : '(Aucun message)',
    '',
    '---',
    `Envoyé via le formulaire du site – ${new Date().toLocaleString('fr-FR', { timeZone: 'Europe/Paris' })}`,
  ].join('\n')
}

export async function POST(req: NextRequest): Promise<NextResponse<QuoteFormResult>> {
  const ip = getClientIp(req)

  // Rate limit
  if (!checkRateLimit(ip)) {
    return NextResponse.json(
      { success: false, demo: siteConfig.demoMode, message: 'Trop de demandes. Veuillez réessayer dans quelques instants.' },
      { status: 429 }
    )
  }

  let body: Partial<QuoteFormData>
  try {
    body = await req.json()
  } catch {
    return NextResponse.json(
      { success: false, demo: siteConfig.demoMode, message: 'Requête invalide.' },
      { status: 400 }
    )
  }

  // Honeypot check
  if (body.honeypot) {
    // Silent reject – looks like success to bots
    return NextResponse.json({ success: true, demo: true, message: 'Simulation — aucune donnée envoyée.' })
  }

  // Captcha (question de sécurité signée) – obligatoire pour toute demande
  if (!verifyCaptcha(body.captchaToken, body.captchaAnswer)) {
    return NextResponse.json(
      {
        success: false,
        demo: siteConfig.demoMode,
        message: 'La réponse à la question de sécurité est incorrecte ou expirée.',
        errors: { captchaAnswer: 'Réponse incorrecte ou expirée. Veuillez réessayer.' },
      },
      { status: 422 }
    )
  }

  // Validate
  const { valid, errors } = validateQuoteForm(body)
  if (!valid) {
    return NextResponse.json(
      { success: false, demo: siteConfig.demoMode, message: 'Veuillez corriger les erreurs.', errors },
      { status: 422 }
    )
  }

  const data = body as QuoteFormData

  // Header injection guard
  const fieldsToCheck = [data.name, data.email ?? '', data.phone ?? '', data.commune]
  if (fieldsToCheck.some((f) => !isSafeString(f))) {
    return NextResponse.json(
      { success: false, demo: siteConfig.demoMode, message: 'Données invalides.' },
      { status: 400 }
    )
  }

  // Demo mode – never sends to the company
  if (siteConfig.demoMode) {
    // Log to console only (no personal data)
    console.log('[DEMO] Quote request received for types:', data.projectTypes, 'commune:', data.commune)
    return NextResponse.json({
      success: true,
      demo: true,
      message: 'Simulation réussie — en mode démonstration, aucune demande n\'est transmise à l\'entreprise.',
    })
  }

  // Production mode – requires a configured transport
  if (!siteConfig.recipientEmail || !siteConfig.fromEmail) {
    // Configuration incomplete – explicit error, never a silent success
    console.error('[CONTACT] Production mode but FROM_EMAIL or RECIPIENT_EMAIL not configured.')
    return NextResponse.json(
      { success: false, demo: false, message: 'Erreur de configuration de l\'envoi. Veuillez nous appeler directement.' },
      { status: 500 }
    )
  }

  // ── Actual send ────────────────────────────────────────────────
  // Placeholder: replace with your email transport (nodemailer, Resend, etc.)
  // The transport must be configured via environment variables only.
  // Never log personal data (name, email, phone, message).
  //
  // Example with Resend:
  //   const { Resend } = await import('resend')
  //   const resend = new Resend(process.env.RESEND_API_KEY)
  //   await resend.emails.send({
  //     from: siteConfig.fromEmail,
  //     to: siteConfig.recipientEmail,
  //     replyTo: data.contactMode === 'email' ? data.email : undefined,
  //     subject: `Demande de devis – Les Jardins d'Henri`,
  //     text: formatEmailBody(data),
  //   })

  console.log('[CONTACT] Production send not yet implemented – formatEmailBody:', formatEmailBody(data).substring(0, 80))
  return NextResponse.json(
    { success: false, demo: false, message: 'Transport d\'envoi non encore configuré. Veuillez nous appeler directement.' },
    { status: 501 }
  )
}
