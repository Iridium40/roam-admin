import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddlewareClient({ req, res })

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Use APP_ENV or NODE_ENV to determine environment
  const appEnv = process.env.APP_ENV || process.env.NODE_ENV;
  let baseUrl: string;
  if (appEnv === 'production') {
    baseUrl = 'https://roamyourbestlifeops.com';
  } else {
    baseUrl = 'http://localhost:3000';
  }

  console.log('APP_ENV:', appEnv, 'Redirecting to:', baseUrl);

  // Redirect to login if not authenticated
  if (!user && req.nextUrl.pathname !== '/login') {
    return NextResponse.redirect(new URL('/login', baseUrl))
  }

  // Check admin privileges for authenticated users
  if (user && req.nextUrl.pathname !== '/login') {
    const { data: adminUser } = await supabase
      .from('admin_users')
      .select('role')
      .eq('user_id', user.id)
      .eq('is_active', true)
      .single()

    if (!adminUser) {
      await supabase.auth.signOut()
      return NextResponse.redirect(new URL('/login', baseUrl))
    }
  }

  return res
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
} 