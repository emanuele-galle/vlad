import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { SignJWT } from 'jose'
import { rateLimit, getClientIP, RATE_LIMITS } from '@/lib/rate-limit'
import { sendEmail } from '@/lib/email'

const secret = process.env.CLIENT_AUTH_SECRET || process.env.PAYLOAD_SECRET
const RESET_SECRET = new TextEncoder().encode(secret + '-reset')

export async function POST(request: NextRequest) {
  try {
    const ip = getClientIP(request)
    const { allowed } = rateLimit(`forgot:${ip}`, RATE_LIMITS.cancel)
    if (!allowed) {
      return NextResponse.json(
        { error: 'Troppi tentativi. Riprova tra qualche minuto.' },
        { status: 429 }
      )
    }

    const { email } = await request.json()

    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Email richiesta' }, { status: 400 })
    }

    // Always return success to prevent email enumeration
    const successResponse = NextResponse.json({
      success: true,
      message: 'Se l\'email è associata a un account, riceverai un link per reimpostare la password.',
    })

    const payload = await getPayload({ config })

    const clients = await payload.find({
      collection: 'clients',
      where: { email: { equals: email.toLowerCase().trim() } },
      limit: 1,
    })

    if (clients.docs.length === 0) {
      return successResponse
    }

    const client = clients.docs[0]

    // Generate reset token (JWT, 1 hour expiry)
    const resetToken = await new SignJWT({
      clientId: String(client.id),
      email: client.email,
      purpose: 'password-reset',
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(RESET_SECRET)

    const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://vladbarber.it'
    const resetLink = `${baseUrl}/account/reset-password?token=${resetToken}`

    // Send reset email via SMTP
    await sendEmail({
      to: client.email as string,
      subject: 'Reimposta la tua password — Vlad Barber',
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #1a1a1a; color: #fff; border-radius: 12px; overflow: hidden;">
        <div style="background: #d4a855; padding: 24px; text-align: center;">
          <img src="https://vladbarber.it/images/logo/vlad-logo.webp" alt="Vlad Barber Shop" width="60" height="60" style="display: block; margin: 0 auto 12px; border-radius: 8px;" />
          <h1 style="margin: 0; color: #0c0c0c; font-size: 24px;">Reimposta Password</h1>
        </div>
        <div style="padding: 32px 24px;">
          <p>Ciao <strong>${client.name}</strong>,</p>
          <p>Hai richiesto di reimpostare la tua password. Clicca il pulsante qui sotto:</p>
          <div style="text-align: center; margin: 32px 0;">
            <a href="${resetLink}" style="background: #d4a855; color: #0c0c0c; padding: 14px 32px; border-radius: 8px; text-decoration: none; font-weight: bold;">Reimposta Password</a>
          </div>
          <p style="font-size: 14px; color: #999;">Il link scade tra 1 ora. Se non hai richiesto tu il reset, ignora questa email.</p>
        </div>
        <div style="background: #111; padding: 16px; text-align: center; font-size: 12px; color: #666;">
          Vlad Barber — Via Domenica Cimarosa 5, Milano
        </div>
      </div>`,
    })

    return successResponse
  } catch (error) {
    console.error('Forgot password error:', error)
    return NextResponse.json({ error: 'Errore interno' }, { status: 500 })
  }
}
