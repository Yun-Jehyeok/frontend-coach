"use client";

import { useSession } from "next-auth/react";
import Spinner from "./Spinner";

export default function Card({ title, customTitle, children, className }: { title?: string; customTitle?: React.ReactNode; children: React.ReactNode; className?: string }) {
    const { status } = useSession();

    return (
        <div className={`bg-white rounded-[20px] h-[300px] flex flex-col py-5 ${className}`}>
            {customTitle ? (
                customTitle
            ) : (
                <div className="px-8 pb-6">
                    <h2 className="text-2xl font-bold text-[#2B3674]">{title}</h2>
                </div>
            )}

            {status === "loading" && <Spinner />}
            {status === "unauthenticated" && <div className="flex-1 flex justify-center items-center text-[#A3AED0]">로그인이 필요한 서비스입니다.</div>}
            {status === "authenticated" && children}
        </div>
    );
}
