"use client";

import { ProgressResponse } from "@/app/api/lesson/progress/route";
import Card from "@/components/Card";
import { useEffect, useState } from "react";

export default function LearningProgressRate() {
    const [progressData, setProgressData] = useState<ProgressResponse[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch("/api/lesson/progress");
            const data = await response.json();

            if (data.progress) {
                setProgressData(data.progress);
            }
        };
        fetchData();
    }, []);

    console.log("progressData:", progressData);

    return (
        <Card title="학습 진도율">
            <div className="flex-1 overflow-y-auto">
                <div className="grid grid-cols-[1.2fr_2fr_1fr] gap-10 px-8 text-[#A3AED0] text-sm font-medium leading-6 border-b border-b-[#E9EDF7] pb-1.5">
                    <div>Title</div>
                    <div>진도율</div>
                    <div className="text-end">최종학습일</div>
                </div>

                <div className="mt-7 px-8 flex flex-col gap-4">
                    {progressData.map((row, i) => (
                        <div key={i} className="grid grid-cols-[1.2fr_2fr_1fr] gap-10 text-sm leading-6 text-[#2B3674] font-bold items-center">
                            <div>{row.title}</div>
                            <div>
                                <div className="w-full flex items-center gap-3">
                                    <div className="w-full max-w-[180px] h-2 rounded-full bg-[#E9E3FF] relative overflow-hidden">
                                        <div className="h-2 rounded-full bg-[#4318FF] transition-all" style={{ width: `${row.rate}%` }} />
                                    </div>
                                    <div className="flex-1">{String(Math.round(Number(row.rate)))}%</div>
                                </div>
                            </div>
                            <div className="text-end">{row.lastStudyDate || "학습 전"}</div>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    );
}
