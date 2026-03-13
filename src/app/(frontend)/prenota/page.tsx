export const dynamic = 'force-dynamic'

import { Metadata } from 'next'
import { getPayload } from 'payload'
import config from '@payload-config'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import BookingForm from '@/components/BookingForm'
import { defaultOpeningHours } from '@/lib/booking'
import type { OpeningHour, ClosedDay } from '@/lib/booking'

export const metadata: Metadata = {
  title: 'Prenota Appuntamento | Vlad Barber Milano',
  description:
    'Prenota il tuo appuntamento online da Vlad Barber. Taglio capelli, barba, meches. Via Domenica Cimarosa 5, Milano (MI).',
  alternates: {
    canonical: '/prenota',
  },
  openGraph: {
    title: 'Prenota Appuntamento | Vlad Barber Milano',
  },
}

const dayNameToNumber: Record<string, number> = {
  sunday: 0, monday: 1, tuesday: 2, wednesday: 3,
  thursday: 4, friday: 5, saturday: 6,
}

async function getBookingData() {
  const payload = await getPayload({ config })

  const [servicesResult, closedDaysResult, hoursResult] = await Promise.all([
    payload.find({ collection: 'services', where: { active: { equals: true } }, sort: 'order', limit: 50 }),
    payload.find({ collection: 'closed-days', limit: 100 }),
    payload.find({ collection: 'opening-hours', limit: 7 }),
  ])

  const services = servicesResult.docs.map((s) => ({
    id: String(s.id),
    name: s.name as string,
    price: s.price as number,
    duration: s.duration as number,
    shortDescription: (s.shortDescription as string) || undefined,
  }))

  const closedDays: ClosedDay[] = closedDaysResult.docs.map((d) => ({
    id: String(d.id),
    date: d.date as string,
    type: (d.type as ClosedDay['type']) || 'holiday',
    reason: (d.reason as string) || undefined,
    recurring: Boolean(d.recurring),
  }))

  let openingHours: OpeningHour[] = defaultOpeningHours
  if (hoursResult.docs.length > 0) {
    openingHours = hoursResult.docs.map((h) => ({
      dayOfWeek: dayNameToNumber[h.dayOfWeek as string] ?? 0,
      openTime: (h.openTime as string) || '09:00',
      closeTime: (h.closeTime as string) || '19:30',
      isClosed: Boolean(h.isClosed),
      breakStart: (h.breakStart as string) || undefined,
      breakEnd: (h.breakEnd as string) || undefined,
    }))
  }

  return { services, closedDays, openingHours }
}

export default async function PrenotaPage() {
  const { services, closedDays, openingHours } = await getBookingData()

  return (
    <>
      <Header />
      <main className="min-h-screen bg-[#0c0c0c] pt-24">
        <div className="max-w-4xl mx-auto px-4 py-6 md:py-12">
          <div className="text-center mb-6 md:mb-12">
            <p className="text-gold font-cormorant text-lg mb-2 hidden md:block">Vlad Barber</p>
            <h1 className="text-3xl md:text-5xl font-cinzel font-bold text-white mb-4">
              Prenota<span className="hidden md:inline"> il Tuo Appuntamento</span>
            </h1>
            <p className="text-white/60 max-w-2xl mx-auto hidden md:block">
              Seleziona il servizio e l&apos;orario che preferisci.
              Conferma la tua prenotazione in pochi click.
            </p>
          </div>
          <BookingForm
            initialServices={services}
            initialClosedDays={closedDays}
            initialOpeningHours={openingHours}
          />
        </div>
      </main>
      <Footer />
    </>
  )
}
