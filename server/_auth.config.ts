import User from "@/models/user.model";
import { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import bcrypt from 'bcryptjs';
import db from "@/utils/connectDB";
import { getToken } from "next-auth/jwt";

const days = (i: number) => i * 24 * 60 * 60;

export default {
    session: {
        strategy: 'jwt',
        maxAge: days(1),
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async signIn({ account, user }) {
            if (account?.provider !== 'credentials') return true;
            const findUser = await User.findById(user.id);
            // if (!findUser?.isEmailVerified) return false; 
            return true;
        },
        async session({ session, token }) {
            if (token.sub && session) {
                session.user.id = token.sub
                session.user.role = token.role as string
            }
            return session;
        },
        async jwt({ token }) {
            if (token) {
                const user = await User.findById({ _id: token.sub })
                if (user) {
                    token.role = user.role
                }
            }
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
                    throw new Error("User not found")
                }

                if (!(await bcrypt.compare(password, findUser.password))) {
                    throw new Error('Invalid credentials');
                    // return { error: "Incorrect Password", status: false };

                }
                return findUser;
            },
        })
    ],
} satisfies NextAuthConfig