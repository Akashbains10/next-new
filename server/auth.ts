import NextAuth from "next-auth"
import authConfig from "@/server/auth.config";


const days = (i: number) => i * 24 * 60 * 60;
export const {
  handlers: { GET, POST },
  auth,
} = NextAuth({
  session: {
    strategy: 'jwt',
    maxAge: days(1),
  },
  secret: process.env.AUTH_SECRET,
  ...authConfig
})