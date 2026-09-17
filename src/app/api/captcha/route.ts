import { NextResponse } from 'next/server'
import { generateCaptcha } from '@/lib/captcha'

export const dynamic = 'force-dynamic'

/** Fournit une question de sécurité et son jeton signé au formulaire. */
export async function GET() {
  return NextResponse.json(generateCaptcha(), {
    headers: { 'Cache-Control': 'no-store' },
  })
}
