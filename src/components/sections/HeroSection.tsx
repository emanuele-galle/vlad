'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Calendar, ChevronDown } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden">
      {/* Background Image - statico, no parallax, no motion */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/hero-bg.webp"
          alt="Vlad Barber Milano - interno del salone"
          fill
          className="object-cover"
          priority
          sizes="100vw"
          quality={80}
        />
        <div className="absolute inset-0 overlay-hero" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center px-6 md:px-8 max-w-4xl mx-auto pt-20">
        <div className="relative py-8 md:py-12 px-6 md:px-10">
          <p
            className="text-[#d4a855] text-sm md:text-lg tracking-[0.3em] uppercase mb-4 font-semibold"
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              textShadow: '0 2px 8px rgba(0, 0, 0, 0.8)',
            }}
          >
            Milano
          </p>

          <h1
            className="text-3xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight"
            style={{
              fontFamily: 'var(--font-cinzel), serif',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.8), 0 4px 12px rgba(0, 0, 0, 0.5)',
            }}
          >
            Vlad Barber{' '}
            <span
              className="text-[#e8c882]"
              style={{
                textShadow: '0 2px 4px rgba(0, 0, 0, 0.8), 0 4px 12px rgba(0, 0, 0, 0.5)',
              }}
            >
              Milano
            </span>
            <span className="block text-xl md:text-3xl lg:text-4xl mt-2 text-white/90 font-normal">
              Il Tuo Barbiere di Fiducia
            </span>
          </h1>

          <p
            className="text-white/90 text-base md:text-xl lg:text-2xl max-w-2xl mx-auto mb-8 leading-relaxed"
            style={{
              fontFamily: 'var(--font-cormorant), serif',
              textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)',
            }}
          >
            Tradizione, precisione e passione dal 2021.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/prenota"
              className="btn-gold btn-ripple inline-flex items-center justify-center gap-3 text-base md:text-lg px-6 md:px-8 py-3 md:py-4 font-bold"
            >
              <Calendar className="w-5 h-5 md:w-6 md:h-6" />
              Prenota Appuntamento
            </Link>
            <Link
              href="#services"
              className="btn-outline-gold btn-ripple inline-flex items-center justify-center gap-3 text-base md:text-lg px-6 md:px-8 py-3 md:py-4 font-semibold"
            >
              Scopri i Servizi
            </Link>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 hidden md:flex"
        aria-hidden="true"
      >
        <div className="flex flex-col items-center gap-2 animate-bounce-subtle">
          <span
            className="text-white/60 text-sm uppercase tracking-wider font-medium"
            style={{ textShadow: '0 2px 4px rgba(0, 0, 0, 0.8)' }}
          >
            Scorri
          </span>
          <ChevronDown className="w-8 h-8 text-[#d4a855]" />
        </div>
      </div>
    </section>
  )
}
