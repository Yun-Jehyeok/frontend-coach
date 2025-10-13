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
    title: "Frontend Coach",
    description: "Your AI-powered frontend coding assistant",
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
