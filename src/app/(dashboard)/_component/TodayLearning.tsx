"use client";

import Card from "@/components/Card";
import { useEffect } from "react";

export default function TodayLearning() {
    useEffect(() => {
        // Fetch today's learning progress data
        const fetchData = async () => {
            const response = await fetch("/api/lesson/today");
            const data = await response.json();
            console.log("Today's Learning Data:", data);
        };
        fetchData();
    }, []);

    return (
        <Card title="오늘의 학습" className="h-[500px] flex flex-col">
            <div className="flex flex-col gap-6 px-8 mt-6 pb-5 flex-1 overflow-y-auto">
                {[
                    {
                        category: "Web",
                        color: "bg-[#E9E3FF]",
                        title: "웹(Web)이란?",
                        desc: "인터넷을 통해 정보를 주고받는 공간. 대부분의 사이트(네이버, 구글 등)는 웹사이트입니다.",
                    },
                    {
                        category: "HTML",
                        color: "bg-[#F4F7FE]",
                        title: "HTML이란?",
                        desc: "웹페이지의 구조를 만드는 언어. 텍스트, 이미지, 링크 등 다양한 요소를 배치합니다.",
                    },
                    {
                        category: "CSS",
                        color: "bg-[#E9E3FF]",
                        title: "CSS란?",
                        desc: "웹페이지의 디자인을 담당하는 언어. 색상, 레이아웃, 애니메이션 등을 꾸밉니다.",
                    },
                    {
                        category: "JavaScript",
                        color: "bg-[#F4F7FE]",
                        title: "JavaScript란?",
                        desc: "웹페이지에 동적인 기능을 추가하는 언어. 버튼 클릭, 데이터 처리 등 다양한 동작을 구현합니다.",
                    },
                ].map((card, idx) => (
                    <div key={card.category} className={`rounded-2xl shadow-sm ${card.color} p-6 flex flex-col justify-between`}>
                        <div>
                            <div className="text-[#4318FF] font-bold text-lg mb-2">{card.category}</div>
                            <div className="font-bold text-[#2B3674] text-base mb-1">{card.title}</div>
                            <div className="text-[#A3AED0] text-sm mb-4">{card.desc}</div>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}
