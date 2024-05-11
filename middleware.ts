import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { apiRoutes, authRoutes, privateRoutes } from './routes/routes';

export default async function middleware(req: NextRequest) {
  const { nextUrl } = req;
  const token = await getToken({ req });
  const isLoggedIn = !!token;
  const isApiRoute = nextUrl.pathname.startsWith(apiRoutes);
  const isPrivateRoutes = privateRoutes.includes(nextUrl.pathname)
  const isAuthRoutes = authRoutes.includes(nextUrl.pathname);

  if (isApiRoute) return;

  if (isAuthRoutes) {
    if (isLoggedIn) {
      if (token?.role === 'admin') {
        return Response.redirect(new URL('/admin', nextUrl))
      } else if (token?.role === 'user') {
        return Response.redirect(new URL('/user', nextUrl))
      } else {
        return Response.redirect(new URL('/', nextUrl))
      }
    }
    return;
  }
  
  if (!isLoggedIn && isPrivateRoutes) return Response.redirect(new URL('/auth/login', nextUrl))
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
}
