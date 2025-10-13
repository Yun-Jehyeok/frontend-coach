"use client";

import { getUser } from "@/apis/user";
import Card from "@/components/Card";
import { useEffect, useState } from "react";

// 숫자를 로마 숫자로 변환하는 함수
function toRoman(num: number): string {
    const romans = ["I", "II", "III", "IV"];
    // 1~5만 지원 (예: 4 → IV)
    return romans[num - 1] || num.toString();
}

// 티어 문자열에서 숫자 부분을 로마 숫자로 변환
function convertTierToRoman(tier: string): string {
    // 예: "Gold 4" → "Gold IV"
    const match = tier.match(/^(\D+)\s*(\d+)$/i);
    if (!match) return tier;
    const [, name, num] = match;
    return `${name.trim()} ${toRoman(Number(num))}`;
}

// 티어별 색상 매핑 (LOL 기준)
const tierColors: Record<string, string> = {
    iron: "#6B6B6B",
    bronze: "#CD7F32",
    silver: "#C0C0C0",
    gold: "#FFD700",
    platinum: "#00B8B8",
    diamond: "#4B69FF",
    master: "#C81AFF",
    grandmaster: "#FF2A2A",
    challenger: "#00FFB0",
};

// 티어명에서 색상 반환
function getTierColor(tier: string): string {
    const name = tier.split(" ")[0].toLowerCase();
    return tierColors[name] || "#FFD700";
}

export default function Tier() {
    const [tier, setTier] = useState<string>("Gold IV");
    const [lp, setLp] = useState<number>(0);

    const getUserInfo = async () => {
        try {
            const user = await getUser();
            if (!user) throw new Error("No user data");

            const rawTier = user.tier.tier || "Bronze V";
            setTier(convertTierToRoman(rawTier));
            setLp(user.tier.lp || 0);
        } catch (error) {
            console.error("Error fetching user:", error);
        }
    };

    useEffect(() => {
        getUserInfo();
    }, []);

    return (
        <Card
            customTitle={
                <div className="px-8">
                    <h2 className="text-sm leading-6 font-medium text-[#A3AED0] mb-1">티어</h2>
                    <div className="text-[34px] leading-[42px] font-bold" style={{ color: getTierColor(tier) }}>
                        {tier}
                    </div>
                </div>
            }
        >
            <div className="mx-auto w-36 h-36 rounded-full flex flex-col items-center justify-center mt-5 relative">
                {/* 테두리 (progress circle) */}
                <svg className="absolute top-0 left-0" width={144} height={144} viewBox="0 0 144 144">
                    <circle cx={72} cy={72} r={66} stroke="#E9E3FF" strokeWidth={12} fill="none" />
                    <circle
                        cx={72}
                        cy={72}
                        r={66}
                        stroke="#4318FF"
                        strokeWidth={12}
                        fill="none"
                        strokeDasharray={2 * Math.PI * 66}
                        strokeDashoffset={2 * Math.PI * 66 * (1 - lp / 100)}
                        strokeLinecap="round"
                        style={{ transition: "stroke-dashoffset 0.6s" }}
                    />
                </svg>
                <div className="w-[112px] h-[112px] rounded-full flex items-center justify-center z-10 font-bold text-2xl bg-white text-[#4318FF]">{lp} LP</div>
            </div>
        </Card>
    );
}
