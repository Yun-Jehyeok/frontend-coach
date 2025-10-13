import { sql } from "@vercel/postgres";
import NextAuth, { NextAuthOptions } from "next-auth";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import KakaoProvider from "next-auth/providers/kakao";

declare module "next-auth" {
    interface Session {
        user: {
            name?: string | null;
            email?: string | null;
            image?: string | null;
            nickname?: string | null;
        };
    }
    interface User {
        nickname?: string | null;
    }
}

export const authOptions: NextAuthOptions = {
    providers: [
        KakaoProvider({
            clientId: process.env.KAKAO_CLIENT_ID!,
            clientSecret: process.env.KAKAO_CLIENT_SECRET!,
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        }),
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID!,
            clientSecret: process.env.GITHUB_CLIENT_SECRET!,
        }),
    ],
    callbacks: {
        // 최초 로그인 시 DB에 유저 정보 저장
        async jwt({ token, account, profile, user }) {
            if (account && profile && user) {
                await sql`
                    INSERT INTO users (email, nickname)
                    VALUES (${user.email}, ${user.name})
                    ON CONFLICT (email) DO UPDATE SET nickname = ${user.name}
                `;
            }
            return token;
        },
        // 세션에 유저 정보 추가
        async session({ session, token }) {
            if (session.user) {
                session.user.email = token.email;
                session.user.nickname = typeof token.nickname === "string" ? token.nickname : null;
            }
            return session;
        },
        // 로그인 성공 시 항상 "/"로 이동
        async redirect() {
            return "/";
        },
    },
    pages: {
        signIn: "/auth/signin",
        signOut: "/auth/signout",
        error: "/auth/error",
        verifyRequest: "/auth/verify-request",
    },
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

