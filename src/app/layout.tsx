import SidebarProvider from "@/components/Sidebar/SidebarProvider";
import SessionWrapper from "@/components/Wrappers/SessionWrapper";
import { Analytics } from "@vercel/analytics/next";
import type { Metadata } from "next";
import { DM_Sans, Poppins } from "next/font/google";
import "./globals.css";
// @를 떼주자

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"], variable: "--font-poppins" });
const dmSans = DM_Sans({ subsets: ["latin"], weight: ["400", "500", "700"], variable: "--font-dm-sans" });

export const metadata: Metadata = {
    title: "웹개발 쌩기초, AI와 준비해요 - AI 챗봇 교육",
    description: "AI가 도와주는 웹개발 쌩기초 교육 서비스입니다. HTML, CSS, JavaScript 기초, AI와 함께 배워보세요!",
    openGraph: {
        title: "AI 챗봇 교육 - 웹개발 쌩기초, AI와 준비해요",
        description: "AI와 함께 프론트엔드 실력을 키우는 코칭 플랫폼입니다.",
        url: "https://fe-coach.com",
        siteName: "Frontend Coach",
        // images: [
        //   {
        //     url: "/og-image.png", // OG 이미지 경로
        //     width: 1200,
        //     height: 630,
        //     alt: "Frontend Coach",
        //   },
        // ],
        locale: "ko_KR",
        type: "website",
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body className={`${dmSans.variable} ${poppins.variable} min-w-[1200px] flex bg-[#F4F7FE] font-dmsans`}>
                <SessionWrapper>
                    <SidebarProvider />
                    <div className="flex-1">{children}</div>

                    <Analytics />
                </SessionWrapper>
            </body>
        </html>
    );
}
