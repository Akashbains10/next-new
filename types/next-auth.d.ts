import NextAuth, { DefaultSession, User } from "next-auth"

type UserId = string

declare module "next-auth/jwt" {
    interface JWT {
        id: UserId
    }
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: User & {
      id: UserId,
      role: string
    } & DefaultSession["user"]
  }
}