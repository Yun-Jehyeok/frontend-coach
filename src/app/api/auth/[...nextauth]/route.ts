import { authOptions } from "@/lib/api";
import NextAuth from "next-auth";

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

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
