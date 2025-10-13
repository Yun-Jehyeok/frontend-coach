"use client";

import { TodayLesson } from "@/app/api/lesson/today/route";
import Card from "@/components/Card";
import Spinner from "@/components/Spinner";
import { useEffect, useState } from "react";

export default function TodayLearning() {
    const [loading, setLoading] = useState(true);
    const [lessons, setLessons] = useState<TodayLesson[]>([]);

    useEffect(() => {
        // Fetch today's learning lessons data
        const fetchData = async () => {
            const response = await fetch("/api/lesson/today");
            const data = await response.json();

            if (data.lessons) {
                setLessons(data.lessons);
            }
            setLoading(false);
        };

        fetchData();
    }, []);

    return (
        <Card title="오늘의 학습" className="h-[500px] flex flex-col">
            {loading ? (
                <Spinner />
            ) : (
                <div className="flex flex-col gap-6 px-8 mt-6 pb-5 flex-1 overflow-y-auto">
                    {lessons.length ? (
                        lessons.map((card, idx) => (
                            <div key={card.category} className={`rounded-2xl shadow-sm ${idx % 2 === 0 ? "bg-[#E9E3FF]" : "bg-[#F4F7FE]"} p-6 flex flex-col justify-between`}>
                                <div>
                                    <div className="text-[#4318FF] font-bold text-lg mb-2">{card.category}</div>
                                    <div className="font-bold text-[#2B3674] text-base mb-1">
                                        {card.content.type === "explanation" || card.content.type === "example"
                                            ? card.content.content
                                            : card.content.type === "quiz" || card.content.type === "code"
                                            ? card.content.question
                                            : "오늘의 학습 내용이 없습니다."}
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="h-full flex flex-col justify-center text-center text-[#A3AED0]">오늘의 학습 내용이 없습니다.</div>
                    )}
                </div>
            )}
        </Card>
    );
}
