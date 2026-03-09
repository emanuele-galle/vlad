'use client'

import { useState } from 'react'
import Link from 'next/link'
import { MapPin, Phone, Clock, Mail, Calendar, Instagram, Send, Loader2, CheckCircle } from 'lucide-react'
import { GradientOrb, NoiseTexture } from '@/components/BackgroundEffects'

const contactInfo = [
  {
    icon: MapPin,
    label: 'Indirizzo',
    value: 'Via Domenica Cimarosa 5',
    subValue: '20144 Milano (MI)',
    href: 'https://www.google.com/maps/search/?api=1&query=Via+Domenica+Cimarosa+5,+20144+Milano+MI',
  },
  {
    icon: Phone,
    label: 'Telefono',
    value: '+39 320 564 0409',
    href: 'tel:+393205640409',
  },
  {
    icon: Mail,
    label: 'Email',
    value: 'info@vladbarber.it',
    href: 'mailto:info@vladbarber.it',
  },
  {
    icon: Clock,
    label: 'Orari',
    value: 'Mar-Sab: 09:00-20:00',
    subValue: 'Lun e Dom: Chiuso',
  },
]

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'info',
    message: '',
  })
  const [loading, setLoading] = useState(false)
  const [success, setSuccess] = useState(false)
  const [error, setError] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }))
    setError('')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      })

      const data = await res.json()

      if (!res.ok) {
        throw new Error(data.error || 'Errore durante invio')
      }

      setSuccess(true)
      setFormData({ name: '', email: '', phone: '', subject: 'info', message: '' })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Errore durante invio messaggio')
    } finally {
      setLoading(false)
    }
  }

  return (
    <section id="contact" className="section-padding bg-[#151515] relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <GradientOrb color="dark" size="lg" position="bottom-left" blur="xl" animate={false} />
        <NoiseTexture opacity={0.02} />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Section Header */}
        <div
          className="text-center mb-16"
        >
          <p
            className="text-[#d4a855] text-sm md:text-lg tracking-[0.3em] uppercase mb-4"
            style={{ fontFamily: 'var(--font-cormorant), serif' }}
          >
            Vieni a Trovarci
          </p>
          <h2
            className="text-3xl md:text-5xl font-bold text-white mb-4"
            style={{ fontFamily: 'var(--font-cinzel), serif' }}
          >
            Contatti
          </h2>
          <div className="gold-divider" />
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left: Contact Info + Form */}
          <div>
            <h3
              className="text-2xl md:text-3xl font-semibold text-white mb-8"
              style={{ fontFamily: 'var(--font-cinzel), serif' }}
            >
              Informazioni di Contatto
            </h3>

            <div className="space-y-6 mb-8">
              {contactInfo.map((item) => (
                <div
                  key={item.label}
                  className="flex items-start gap-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#d4a855]/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-[#d4a855]" />
                  </div>
                  <div>
                    <p className="text-white/50 text-sm md:text-base">{item.label}</p>
                    {item.href ? (
                      <a
                        href={item.href}
                        target={item.href.startsWith('http') ? '_blank' : undefined}
                        rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                        className="text-white md:text-lg hover:text-[#d4a855] transition-colors"
                      >
                        {item.value}
                      </a>
                    ) : (
                      <p className="text-white md:text-lg">{item.value}</p>
                    )}
                    {item.subValue && (
                      <p className="text-white/60 text-sm md:text-base">{item.subValue}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Social Links */}
            <div className="mb-8 pt-6 border-t border-white/10">
              <p className="text-white/50 text-sm md:text-base mb-4">Seguici sui Social</p>
              <div className="flex gap-4">
                <a
                  href="https://www.instagram.com/vlad_barber_shop/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-12 h-12 rounded-xl bg-[#d4a855]/10 flex items-center justify-center hover:bg-[#d4a855]/20 transition-colors"
                >
                  <Instagram className="w-5 h-5 text-[#d4a855]" />
                </a>
              </div>
            </div>

            {/* CTA */}
            <Link
              href="/prenota"
              className="btn-gold inline-flex items-center gap-2"
            >
              <Calendar className="w-5 h-5" />
              Prenota un Appuntamento
            </Link>
          </div>

          {/* Right: Contact Form */}
          <div>
            <div className="bg-[#1a1a1a] rounded-2xl p-6 md:p-8 border border-white/5">
              <h3
                className="text-xl md:text-2xl font-semibold text-white mb-6"
                style={{ fontFamily: 'var(--font-cinzel), serif' }}
              >
                Inviaci un Messaggio
              </h3>

              {success ? (
                <div
                  className="text-center py-8"
                >
                  <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center">
                    <CheckCircle className="w-8 h-8 text-green-500" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    Messaggio Inviato!
                  </h4>
                  <p className="text-white/60 mb-6">
                    Ti risponderemo il prima possibile.
                  </p>
                  <button
                    onClick={() => setSuccess(false)}
                    className="text-[#d4a855] hover:underline"
                  >
                    Invia un altro messaggio
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Name & Email */}
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm md:text-base text-white/70 mb-2">
                        Nome *
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Il tuo nome"
                        className="w-full px-4 py-3 rounded-xl bg-[#111] border border-white/10 text-white text-[16px] placeholder:text-white/30 focus:outline-none focus:border-[#d4a855]/50 transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm md:text-base text-white/70 mb-2">
                        Email *
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="la@tua.email"
                        className="w-full px-4 py-3 rounded-xl bg-[#111] border border-white/10 text-white text-[16px] placeholder:text-white/30 focus:outline-none focus:border-[#d4a855]/50 transition-colors"
                      />
                    </div>
                  </div>

                  {/* Phone */}
                  <div>
                    <label htmlFor="phone" className="block text-sm md:text-base text-white/70 mb-2">
                      Telefono
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+39 ..."
                      className="w-full px-4 py-3 rounded-xl bg-[#111] border border-white/10 text-white text-[16px] placeholder:text-white/30 focus:outline-none focus:border-[#d4a855]/50 transition-colors"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="message" className="block text-sm md:text-base text-white/70 mb-2">
                      Messaggio *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows={4}
                      placeholder="Scrivi il tuo messaggio..."
                      className="w-full px-4 py-3 rounded-xl bg-[#111] border border-white/10 text-white text-[16px] placeholder:text-white/30 focus:outline-none focus:border-[#d4a855]/50 transition-colors resize-none"
                    />
                  </div>

                  {/* Error */}
                  {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
                      <p className="text-red-400 text-sm">{error}</p>
                    </div>
                  )}

                  {/* Submit */}
                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full btn-gold flex items-center justify-center gap-2"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" />
                        Invio in corso...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5" />
                        Invia Messaggio
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>

        {/* Map */}
        <div
          className="mt-12 relative rounded-xl overflow-hidden h-[300px]"
        >
          <iframe
            src="https://www.google.com/maps?q=Barbershop+Negrea,+Via+Domenico+Cimarosa+5,+20144+Milano&output=embed&z=16"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale"
          />
          <div className="absolute inset-0 pointer-events-none border border-[#d4a855]/20 rounded-xl" />
        </div>
      </div>
    </section>
  )
}
