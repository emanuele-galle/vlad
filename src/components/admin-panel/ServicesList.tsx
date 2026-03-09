'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { Pencil, Scissors, Clock, Euro, GripVertical, Loader2 } from 'lucide-react'
import { DeleteButton } from '@/components/admin-panel/DeleteButton'
import { useToast } from '@/components/Toast'
import { useRouter } from 'next/navigation'

interface Service {
  id: number | string
  name: string
  shortDescription?: string | null
  price: number
  duration: number
  category: string
  featured?: boolean
  active?: boolean
  order?: number
}

const categoryLabels: Record<string, string> = {
  haircut: 'Taglio',
  beard: 'Barba',
  styling: 'Styling',
  treatment: 'Trattamento',
  package: 'Pacchetto',
}

export function ServicesList({ initialServices }: { initialServices: Service[] }) {
  const [services, setServices] = useState(initialServices)
  const [dragIndex, setDragIndex] = useState<number | null>(null)
  const [overIndex, setOverIndex] = useState<number | null>(null)
  const [saving, setSaving] = useState(false)
  const { showToast } = useToast()
  const router = useRouter()
  const dragNode = useRef<HTMLDivElement | null>(null)

  const handleDragStart = (index: number, e: React.DragEvent<HTMLDivElement>) => {
    setDragIndex(index)
    dragNode.current = e.currentTarget
    e.dataTransfer.effectAllowed = 'move'
    // Make the drag image slightly transparent
    requestAnimationFrame(() => {
      if (dragNode.current) dragNode.current.style.opacity = '0.4'
    })
  }

  const handleDragEnd = async () => {
    if (dragNode.current) dragNode.current.style.opacity = '1'

    if (dragIndex !== null && overIndex !== null && dragIndex !== overIndex) {
      const reordered = [...services]
      const [moved] = reordered.splice(dragIndex, 1)
      reordered.splice(overIndex, 0, moved)
      setServices(reordered)

      setSaving(true)
      try {
        const res = await fetch('/api/services/reorder', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ orderedIds: reordered.map((s) => s.id) }),
        })
        if (!res.ok) throw new Error('Reorder failed')
        showToast('success', 'Ordine servizi aggiornato', 'Salvato')
        router.refresh()
      } catch {
        setServices(initialServices)
        showToast('error', 'Errore nel salvataggio ordine', 'Errore')
      } finally {
        setSaving(false)
      }
    }

    setDragIndex(null)
    setOverIndex(null)
  }

  const handleDragOver = (index: number, e: React.DragEvent) => {
    e.preventDefault()
    e.dataTransfer.dropEffect = 'move'
    if (overIndex !== index) setOverIndex(index)
  }

  return (
    <div className="grid gap-2 relative">
      {saving && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-black/30 rounded-xl">
          <Loader2 className="w-6 h-6 text-[#d4a855] animate-spin" />
        </div>
      )}
      {services.map((service, index) => (
        <div
          key={service.id}
          draggable
          onDragStart={(e) => handleDragStart(index, e)}
          onDragEnd={handleDragEnd}
          onDragOver={(e) => handleDragOver(index, e)}
          onDragEnter={(e) => e.preventDefault()}
          className={`admin-card p-4 flex items-center gap-3 cursor-grab active:cursor-grabbing transition-all ${
            overIndex === index && dragIndex !== null && dragIndex !== index
              ? 'border-[#d4a855] border-dashed scale-[1.01]'
              : ''
          } ${dragIndex === index ? 'opacity-40' : ''}`}
        >
          {/* Drag Handle */}
          <div className="flex-shrink-0 text-[rgba(255,255,255,0.3)] hover:text-[rgba(255,255,255,0.6)] touch-none">
            <GripVertical className="w-5 h-5" />
          </div>

          {/* Icon */}
          <div className="w-11 h-11 rounded-lg bg-[rgba(212,168,85,0.1)] flex items-center justify-center flex-shrink-0">
            <Scissors className="w-5 h-5 text-[#d4a855]" />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-0.5">
              <h3 className="text-base font-semibold text-white truncate">
                {service.name}
              </h3>
              {service.featured && (
                <span className="admin-badge admin-badge-gold text-xs">In evidenza</span>
              )}
              {!service.active && (
                <span className="admin-badge admin-badge-error text-xs">Disattivo</span>
              )}
            </div>
            <div className="flex items-center gap-3 text-sm">
              <span className="flex items-center gap-1 text-[rgba(255,255,255,0.6)]">
                <Euro className="w-3.5 h-3.5" />
                {service.price}
              </span>
              <span className="flex items-center gap-1 text-[rgba(255,255,255,0.6)]">
                <Clock className="w-3.5 h-3.5" />
                {service.duration} min
              </span>
              <span className="admin-badge admin-badge-gold text-xs">
                {categoryLabels[service.category] || service.category}
              </span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-shrink-0">
            <Link
              href={`/admin-panel/servizi/${service.id}`}
              className="admin-btn admin-btn-secondary py-2 px-3"
            >
              <Pencil className="w-4 h-4" />
            </Link>
            <DeleteButton collection="services" id={String(service.id)} name={service.name} />
          </div>
        </div>
      ))}
    </div>
  )
}
