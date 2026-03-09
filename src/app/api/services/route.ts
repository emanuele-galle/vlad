import { NextRequest, NextResponse } from 'next/server'
import { getPayload } from 'payload'
import config from '@payload-config'
import { requireAdmin, unauthorizedResponse } from '@/lib/admin-auth'

export async function GET() {
  try {
    const payload = await getPayload({ config })

    const services = await payload.find({
      collection: 'services',
      where: {
        active: { equals: true },
      },
      sort: 'order',
      depth: 1,
    })

    const response = NextResponse.json(services)
    response.headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    return response
  } catch (error) {
    console.error('Error fetching services:', error)
    return NextResponse.json(
      { error: 'Failed to fetch services' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  const user = await requireAdmin(request)
  if (!user) return unauthorizedResponse()

  try {
    const payload = await getPayload({ config })
    const body = await request.json()

    const service = await payload.create({
      collection: 'services',
      data: {
        name: body.name,
        slug: body.slug,
        shortDescription: body.shortDescription || undefined,
        price: body.price,
        duration: body.duration,
        category: body.category,
        icon: body.icon || undefined,
        featured: body.featured ?? false,
        active: body.active ?? true,
        order: body.order ?? 0,
      },
    })

    return NextResponse.json(service, { status: 201 })
  } catch (error) {
    console.error('Error creating service:', error)
    const message = error instanceof Error ? error.message : 'Failed to create service'
    return NextResponse.json({ errors: [{ message }] }, { status: 400 })
  }
}
