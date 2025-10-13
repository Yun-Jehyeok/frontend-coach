"use client";

import { SessionProvider } from "next-auth/react";
import Sidebar from "./Sidebar";

export default function SidebarProvider() {
    return (
        <SessionProvider>
            <Sidebar />
        </SessionProvider>
    );
}
