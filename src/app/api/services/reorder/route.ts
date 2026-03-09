import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { requireAdmin, unauthorizedResponse } from '@/lib/admin-auth'

export async function PUT(request: NextRequest) {
  const user = await requireAdmin(request)
  if (!user) return unauthorizedResponse()

  try {
    const payload = await getPayload({ config })
    const { orderedIds } = await request.json()

    if (!Array.isArray(orderedIds) || orderedIds.length === 0) {
      return NextResponse.json({ error: 'orderedIds array required' }, { status: 400 })
    }

    // Fetch all services to include required localized fields in update
    const allServices = await payload.find({ collection: 'services', limit: 100 })
    const serviceMap = new Map(
      allServices.docs.map((s) => [String(s.id), s.name as string])
    )

    await Promise.all(
      orderedIds.map((id: string | number, index: number) =>
        payload.update({
          collection: 'services',
          id,
          data: {
            order: index,
            name: serviceMap.get(String(id)) || '',
          },
        })
      )
    )

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error reordering services:', error)
    return NextResponse.json({ error: 'Failed to reorder services' }, { status: 500 })
  }
}
