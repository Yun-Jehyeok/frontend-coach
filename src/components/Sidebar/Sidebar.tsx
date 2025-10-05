"use client";

import { BasicIcon, DashboardIcon, ProfileIcon, SignInIcon } from "@/assets/icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
    { name: "Dashboard", href: "/", icon: (isActive: boolean) => <DashboardIcon isActive={isActive} /> },
    { name: "Basic", href: "/basic", icon: (isActive: boolean) => <BasicIcon isActive={isActive} /> },
    { name: "Profile", href: "/profile", icon: (isActive: boolean) => <ProfileIcon isActive={isActive} /> },
    { name: "Sign In", href: "/signin", icon: (isActive: boolean) => <SignInIcon isActive={isActive} /> },
];

export default function Sidebar() {
    const path = usePathname();

    // if (path === "/signin") {
    //     return null;
    // }
    return (
        <div className="w-[290px] bg-white">
            <div className="w-full h-[130px] bg-white border-b border-[#F4F7FE] flex items-center justify-center text-[#2B3674] font-poppins font-bold text-[26px] leading-[26px]">
                FRONT&nbsp;<span className="font-normal">COACH</span>
            </div>

            <div>
                <div className="w-full h-fit pl-[31px] pt-[38px]">
                    <div className="w-full flex flex-col gap-5">
                        {navItems.map((item) => (
                            <Link key={item.name} href={item.href} className={"w-full h-9 flex items-center justify-between"}>
                                <div
                                    className={[
                                        "flex gap-3 items-center font-medium text-base leading-[30px] hover:text-[#2B3674]",
                                        path === item.href ? "text-[#2B3674] !font-bold" : "text-[#A3AED0]",
                                    ].join(" ")}
                                >
                                    {item.icon(path === item.href)}
                                    {item.name}
                                </div>

                                {path === item.href ? <div className="w-1 h-full rounded-full bg-[#4318FF]"></div> : null}
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
