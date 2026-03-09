import { NextRequest, NextResponse } from 'next/server'

const ALLOWED_ORIGINS = [
  'https://vladbarber.it',
]

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // CORS for API routes
  if (pathname.startsWith('/api/')) {
    const origin = request.headers.get('origin') || ''
    const isAllowed = ALLOWED_ORIGINS.includes(origin)

    // Handle preflight
    if (request.method === 'OPTIONS') {
      return new NextResponse(null, {
        status: 204,
        headers: {
          'Access-Control-Allow-Origin': isAllowed ? origin : ALLOWED_ORIGINS[0],
          'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
          'Access-Control-Allow-Headers': 'Content-Type, Authorization',
          'Access-Control-Max-Age': '86400',
        },
      })
    }

    const response = NextResponse.next()
    response.headers.set('Access-Control-Allow-Origin', isAllowed ? origin : ALLOWED_ORIGINS[0])
    return response
  }

  // Admin panel protection (except login page)
  if (pathname.startsWith('/admin-panel') && !pathname.startsWith('/admin-panel/login')) {
    const token = request.cookies.get('payload-token')?.value
    if (!token) {
      return NextResponse.redirect(new URL('/admin-panel/login', request.url))
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/admin-panel/((?!login).*)', '/api/:path*'],
}
