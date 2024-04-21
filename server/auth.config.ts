import User from "@/models/user.model";
import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import db from "@/utils/connectDB";


async function getUser(email: string, password: string): Promise<any> {
    return {
        id: 1,
        name: 'test user',
        email: email,
        password: password,
    };
}
export default {
    callbacks: {
        // go to this article to learn aboute protected route using authorized
        // https://fajarwz.com/blog/email-authentication-and-verification-in-nextjs-14-with-next-auth-and-prisma/
        
        // authorized({request: {nextUrl}, auth}) {
        //     console.log(nextUrl, 'nexturl')
        //     return true;
        // },
        async signIn({ account, user }) {
            if (account?.provider !== 'credentials') return true;
            const findUser = await User.findById(user.id);
            if (!findUser?.isEmailVerified) return false;   
            return true;
        },
        async session({ session, token }) {
            if (token.sub && session) {
                session.user.id = token.sub
            }
            console.log(session, 'session');
            return session;
        },
        async jwt({ token }) {
            return token;
        }
    },
    providers: [
        Credentials({
            name: 'Credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' },
            },
            async authorize(credentials, req) {
                await db.connectDB();
                const { email, password } = credentials as {
                    email: string;
                    password: string;
                };
                const findUser = await User.findOne({ email: email });
                if (!findUser) {
                    throw new Error('User not found')
                }
                // if (!(await bcrypt.compare(password, findUser.password))) {
                //     throw new Error('Invalid credentials')
                // }
                return findUser;
            },
        })
    ],
} satisfies NextAuthConfig