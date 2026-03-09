import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { rateLimit, getClientIP, RATE_LIMITS } from '@/lib/rate-limit'
import { sendEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    // Rate limiting
    const ip = getClientIP(request)
    const { allowed } = rateLimit(`contact:${ip}`, RATE_LIMITS.contact)
    if (!allowed) {
      return NextResponse.json(
        { error: 'Troppi tentativi. Riprova tra qualche minuto.' },
        { status: 429 }
      )
    }

    const body = await request.json()
    const { name, email, phone, subject, message } = body

    // Validation
    if (!name || typeof name !== 'string' || name.trim().length < 2) {
      return NextResponse.json(
        { error: 'Nome richiesto (minimo 2 caratteri)' },
        { status: 400 }
      )
    }

    if (!email || typeof email !== 'string' || !email.includes('@')) {
      return NextResponse.json(
        { error: 'Email non valida' },
        { status: 400 }
      )
    }

    if (name.length > 100) {
      return NextResponse.json(
        { error: 'Nome troppo lungo' },
        { status: 400 }
      )
    }

    if (!message || typeof message !== 'string' || message.trim().length < 10) {
      return NextResponse.json(
        { error: 'Messaggio richiesto (minimo 10 caratteri)' },
        { status: 400 }
      )
    }

    if (message.length > 2000) {
      return NextResponse.json(
        { error: 'Messaggio troppo lungo (max 2000 caratteri)' },
        { status: 400 }
      )
    }

    if (phone && typeof phone === 'string' && phone.length > 20) {
      return NextResponse.json(
        { error: 'Telefono non valido' },
        { status: 400 }
      )
    }

    // Valid subjects
    const validSubjects = ['info', 'booking', 'collaboration', 'complaint', 'other']
    const validSubject = validSubjects.includes(subject) ? subject : 'info'

    // Create contact submission in Payload
    const payload = await getPayload({ config })

    const submission = await payload.create({
      collection: 'contact-submissions',
      data: {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || undefined,
        subject: validSubject,
        message: message.trim(),
        status: 'new',
      },
    })

    // Send email notification to admin
    const subjectLabels: Record<string, string> = {
      info: 'Informazioni', booking: 'Prenotazione', collaboration: 'Collaborazione',
      complaint: 'Reclamo', other: 'Altro',
    }
    await sendEmail({
      to: process.env.EMAIL_FROM || 'info@vladbarber.it',
      subject: `Nuovo messaggio: ${subjectLabels[validSubject] || validSubject} — ${name.trim()}`,
      html: `<div style="font-family: Arial, sans-serif; max-width: 600px;">
        <h2>Nuovo messaggio dal sito</h2>
        <p><strong>Nome:</strong> ${name.trim()}</p>
        <p><strong>Email:</strong> ${email.trim()}</p>
        ${phone ? `<p><strong>Telefono:</strong> ${phone.trim()}</p>` : ''}
        <p><strong>Oggetto:</strong> ${subjectLabels[validSubject] || validSubject}</p>
        <hr style="border: 1px solid #eee;" />
        <p>${message.trim().replace(/\n/g, '<br>')}</p>
      </div>`,
      replyTo: email.trim().toLowerCase(),
    })

    return NextResponse.json({
      success: true,
      message: 'Messaggio inviato con successo',
      id: submission.id,
    })
  } catch (error) {
    console.error('Contact submission error:', error)
    return NextResponse.json(
      { error: 'Errore durante invio messaggio' },
      { status: 500 }
    )
  }
}
