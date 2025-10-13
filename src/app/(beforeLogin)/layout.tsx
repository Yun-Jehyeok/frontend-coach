"use client";

import Spinner from "@/components/Spinner";
import { useSession } from "next-auth/react";

export default function BeforeLoginLayout({ children }: { children: React.ReactNode }) {
    const { status } = useSession();

    if (status === "loading") {
        return (
            <div className="w-screen h-screen flex justify-center items-center">
                <Spinner />
            </div>
        );
    }
    if (status === "authenticated") {
        // 로그인된 상태라면 대시보드로 리다이렉트
        if (typeof window !== "undefined") {
            window.location.href = "/";
        }
    }

    return <>{children}</>;
}
