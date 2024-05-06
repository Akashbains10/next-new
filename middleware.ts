import { apiRoutes, authRoutes, publicRoutes } from "./routes/routes";
import NextAuth from "next-auth";
import authConfig from "./server/auth.config";
import { NextAuthRequest } from "next-auth/lib";

const { auth } = NextAuth(authConfig);

export default auth((req:NextAuthRequest) => {
    const isLoggedIn = !!req.auth;
    console.log(req.auth , 'req.auth******************')
    const { nextUrl } = req;
    const isApiRoute = nextUrl.pathname.startsWith(apiRoutes);
    const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
    const isAuthRoutes = authRoutes.includes(nextUrl.pathname);

    if (isApiRoute) {
        return;
    } 
    if (isAuthRoutes) {
        if (isLoggedIn) {
            return Response.redirect(new URL('/', nextUrl))
        }
        return;
    }
    if (!isLoggedIn && !isPublicRoutes) {
        return Response.redirect(new URL('/auth/login', nextUrl))
    }
})

export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/(api|trpc)(.*)"],
}