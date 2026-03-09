import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { requireAdmin, unauthorizedResponse } from '@/lib/admin-auth'

type Params = { params: Promise<{ id: string }> }

export async function GET(_request: NextRequest, { params }: Params) {
  try {
    const { id } = await params
    const payload = await getPayload({ config })
    const service = await payload.findByID({ collection: 'services', id })
    return NextResponse.json(service)
  } catch {
    return NextResponse.json({ error: 'Service not found' }, { status: 404 })
  }
}

export async function PATCH(request: NextRequest, { params }: Params) {
  const user = await requireAdmin(request)
  if (!user) return unauthorizedResponse()

  try {
    const { id } = await params
    const payload = await getPayload({ config })
    const body = await request.json()

    const service = await payload.update({
      collection: 'services',
      id,
      data: body,
    })

    return NextResponse.json(service)
  } catch (error) {
    console.error('Error updating service:', error)
    const message = error instanceof Error ? error.message : 'Failed to update service'
    return NextResponse.json({ errors: [{ message }] }, { status: 400 })
  }
}

export async function DELETE(request: NextRequest, { params }: Params) {
  const user = await requireAdmin(request)
  if (!user) return unauthorizedResponse()

  try {
    const { id } = await params
    const payload = await getPayload({ config })
    await payload.delete({ collection: 'services', id })
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('Error deleting service:', error)
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 400 })
  }
}
