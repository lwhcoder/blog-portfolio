import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname
  const authCookie = request.cookies.get('tools-auth')

  // Redirect to login if trying to access tools without auth
  if (path.startsWith('/tools') && !authCookie) {
    return NextResponse.redirect(new URL('/tools', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/tools/:path*']
}