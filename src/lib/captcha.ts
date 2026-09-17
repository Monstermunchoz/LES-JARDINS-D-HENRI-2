import { createHmac, randomBytes, randomInt, timingSafeEqual } from 'crypto'

/**
 * Captcha auto-hébergé, sans service tiers (conforme à la règle « aucun tiers »).
 *
 * Principe : le serveur génère une petite question arithmétique et un jeton
 * signé (HMAC) contenant la réponse hachée et une date d'expiration.
 * Le visiteur renvoie le jeton et sa réponse ; le serveur vérifie la signature,
 * l'expiration puis la réponse. Aucun état n'est conservé côté serveur.
 *
 * Secret : CAPTCHA_SECRET dans l'environnement. En son absence, un secret
 * aléatoire est généré au démarrage du processus (suffisant pour un serveur
 * unique ; sur plusieurs instances, définir CAPTCHA_SECRET pour que les
 * jetons soient valides partout).
 */

const SECRET = process.env.CAPTCHA_SECRET ?? randomBytes(32).toString('hex')
const TTL_MS = 15 * 60 * 1000 // 15 minutes

export interface CaptchaChallenge {
  question: string
  token: string
}

function sign(payload: string): string {
  return createHmac('sha256', SECRET).update(payload).digest('base64url')
}

function hashAnswer(answer: string, nonce: string): string {
  return createHmac('sha256', SECRET).update(`${nonce}:${answer}`).digest('base64url')
}

export function generateCaptcha(): CaptchaChallenge {
  const a = randomInt(1, 10)
  const b = randomInt(1, 10)
  const useAddition = randomInt(0, 2) === 0
  // Pour la soustraction, on garde un résultat positif.
  const [x, y] = useAddition ? [a, b] : a >= b ? [a, b] : [b, a]
  const answer = useAddition ? x + y : x - y
  const question = useAddition
    ? `Combien font ${x} + ${y} ?`
    : `Combien font ${x} − ${y} ?`

  const nonce = randomBytes(8).toString('hex')
  const expires = Date.now() + TTL_MS
  const payload = `${nonce}.${expires}.${hashAnswer(String(answer), nonce)}`
  const token = `${payload}.${sign(payload)}`

  return { question, token }
}

export function verifyCaptcha(token: unknown, answer: unknown): boolean {
  if (typeof token !== 'string' || typeof answer !== 'string') return false
  const parts = token.split('.')
  if (parts.length !== 4) return false
  const [nonce, expiresRaw, answerHash, signature] = parts

  const payload = `${nonce}.${expiresRaw}.${answerHash}`
  const expectedSig = sign(payload)
  if (signature.length !== expectedSig.length) return false
  if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) return false

  const expires = Number(expiresRaw)
  if (!Number.isFinite(expires) || Date.now() > expires) return false

  const normalized = answer.trim().replace(/\s+/g, '')
  if (!/^\d{1,3}$/.test(normalized)) return false
  const givenHash = hashAnswer(String(Number(normalized)), nonce)
  if (givenHash.length !== answerHash.length) return false
  return timingSafeEqual(Buffer.from(givenHash), Buffer.from(answerHash))
}
