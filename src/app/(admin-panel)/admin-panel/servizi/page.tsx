export const dynamic = 'force-dynamic'

import { getPayload } from 'payload'
import config from '@payload-config'
import Link from 'next/link'
import { Plus, Scissors } from 'lucide-react'
import { ServicesList } from '@/components/admin-panel/ServicesList'

async function getServices() {
  const payload = await getPayload({ config })
  const services = await payload.find({
    collection: 'services',
    sort: 'order',
    limit: 100,
  })
  return services.docs.map((s) => ({
    id: s.id,
    name: s.name as string,
    shortDescription: s.shortDescription as string | null | undefined,
    price: s.price as number,
    duration: s.duration as number,
    category: s.category as string,
    featured: Boolean(s.featured),
    active: s.active !== false,
    order: (s.order as number) ?? 0,
  }))
}

export default async function ServiziPage() {
  const services = await getServices()

  return (
    <div className="space-y-6 admin-fade-in">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">Servizi</h1>
          <p className="text-[rgba(255,255,255,0.6)] text-sm mt-1">
            Trascina per riordinare i servizi. L&apos;ordine si riflette sulla prenotazione.
          </p>
        </div>
        <Link href="/admin-panel/servizi/nuovo" className="admin-btn admin-btn-primary">
          <Plus className="w-5 h-5" />
          Nuovo Servizio
        </Link>
      </div>

      {/* Services List */}
      {services.length > 0 ? (
        <ServicesList initialServices={services} />
      ) : (
        <div className="admin-card p-12 text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-[rgba(212,168,85,0.1)] flex items-center justify-center">
            <Scissors className="w-8 h-8 text-[#d4a855]" />
          </div>
          <h3 className="text-lg font-semibold text-white mb-2">Nessun servizio</h3>
          <p className="text-[rgba(255,255,255,0.5)] mb-6">
            Inizia aggiungendo il primo servizio del salone
          </p>
          <Link href="/admin-panel/servizi/nuovo" className="admin-btn admin-btn-primary">
            <Plus className="w-5 h-5" />
            Aggiungi Servizio
          </Link>
        </div>
      )}
    </div>
  )
}
