import nodemailer from 'nodemailer'

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtps.aruba.it',
  port: Number(process.env.SMTP_PORT) || 465,
  secure: process.env.SMTP_SECURE !== 'false',
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
})

const FROM = `${process.env.EMAIL_FROM_NAME || 'Vlad Barber'} <${process.env.EMAIL_FROM || 'info@vladbarber.it'}>`

interface EmailOptions {
  to: string
  subject: string
  html: string
  replyTo?: string
}

export async function sendEmail({ to, subject, html, replyTo }: EmailOptions): Promise<boolean> {
  if (!process.env.SMTP_USER || !process.env.SMTP_PASS) {
    console.warn('SMTP not configured, skipping email')
    return false
  }

  try {
    await transporter.sendMail({
      from: FROM,
      to,
      subject,
      html,
      replyTo,
    })
    return true
  } catch (error) {
    console.error('Failed to send email:', error)
    return false
  }
}
