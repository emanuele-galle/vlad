'use client'

import Image from 'next/image'
import { Award, Heart, Scissors, Users } from 'lucide-react'
import { GradientOrb, NoiseTexture, SectionDivider } from '@/components/BackgroundEffects'

const features = [
  {
    icon: Scissors,
    title: 'Precisione Artigianale',
    description: 'Tecniche tradizionali perfezionate con dedizione e passione',
  },
  {
    icon: Award,
    title: 'Prodotti Premium',
    description: 'Solo prodotti di prima qualità per risultati eccellenti',
  },
  {
    icon: Heart,
    title: 'Cura Personale',
    description: 'Ogni cliente riceve attenzione dedicata e personalizzata',
  },
  {
    icon: Users,
    title: 'Ambiente Accogliente',
    description: 'Un momento di relax in un ambiente familiare',
  },
]

export default function AboutSection() {
  return (
    <>
      <section id="about" className="section-padding bg-[#0c0c0c] relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 pointer-events-none">
          <GradientOrb color="dark" size="lg" position="top-right" blur="xl" animate={false} />
          <NoiseTexture opacity={0.02} />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p
              className="text-[#d4a855] text-sm md:text-lg tracking-[0.3em] uppercase mb-4"
              style={{ fontFamily: 'var(--font-cormorant), serif' }}
            >
              La Mia Storia
            </p>
            <h2
              className="text-3xl md:text-5xl font-bold text-white mb-4"
              style={{ fontFamily: 'var(--font-cinzel), serif' }}
            >
              Chi Siamo
            </h2>
            <div className="gold-divider" />
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Images */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="relative h-64 rounded-lg overflow-hidden group hover:scale-[1.03] transition-transform duration-300">
                  <Image
                    src="/images/gallery-2.webp"
                    alt="Vlad Barber - taglio capelli uomo Milano"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="relative h-48 rounded-lg overflow-hidden group hover:scale-[1.03] transition-transform duration-300">
                  <Image
                    src="/images/pennello-barbiere.webp"
                    alt="Strumenti da barbiere professionali a Milano"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="relative h-48 rounded-lg overflow-hidden group hover:scale-[1.03] transition-transform duration-300">
                  <Image
                    src="/images/rasatura-barba.webp"
                    alt="Rasatura barba tradizionale a Milano"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
                <div className="relative h-64 rounded-lg overflow-hidden group hover:scale-[1.03] transition-transform duration-300">
                  <Image
                    src="/images/gallery-4.webp"
                    alt="Interno Vlad Barber Shop Milano"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c0c]/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              </div>
            </div>

            {/* Text Content */}
            <div>
              <div>
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-[#d4a855]/20 to-[#d4a855]/5 flex items-center justify-center border border-[#d4a855]/20">
                    <span
                      className="text-2xl font-bold text-[#d4a855]"
                      style={{ fontFamily: 'var(--font-cinzel), serif' }}
                    >
                      8+
                    </span>
                  </div>
                  <p className="text-white/80 md:text-lg">Anni di Esperienza</p>
                </div>

                <h3
                  className="text-2xl md:text-4xl font-semibold text-white mb-6"
                  style={{ fontFamily: 'var(--font-cinzel), serif' }}
                >
                  Vlad — Il Tuo Barbiere di Fiducia
                </h3>

                <div className="space-y-4 text-white/70 md:text-lg mb-8">
                  <p>
                    Sono Vlad, titolare di Vlad Barber. Dal 2025 accolgo i miei
                    clienti in Via Domenica Cimarosa 5, nel cuore di Milano. Qui ho creato
                    uno spazio dove tradizione e cura del dettaglio si incontrano.
                  </p>
                  <p>
                    Ogni taglio, ogni rasatura è per me un&apos;occasione per esprimere la mia
                    passione. Utilizzo solo prodotti di prima qualità e dedico a ogni cliente
                    il tempo necessario per un risultato impeccabile e personalizzato.
                  </p>
                </div>

                {/* Features Grid */}
                <div className="grid grid-cols-2 gap-6">
                  {features.map((feature) => (
                    <div
                      key={feature.title}
                      className="flex items-start gap-3 group cursor-default"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-[#d4a855]/20 to-[#d4a855]/5 flex items-center justify-center flex-shrink-0 border border-[#d4a855]/10 group-hover:border-[#d4a855]/30 transition-colors duration-300">
                        <feature.icon className="w-5 h-5 text-[#d4a855] transition-transform duration-300 group-hover:scale-110" />
                      </div>
                      <div>
                        <h4 className="text-white font-medium text-sm md:text-lg group-hover:text-[#d4a855] transition-colors duration-300">
                          {feature.title}
                        </h4>
                        <p className="text-white/50 text-xs md:text-base mt-1">
                          {feature.description}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <SectionDivider variant="ornate" />
    </>
  )
}
