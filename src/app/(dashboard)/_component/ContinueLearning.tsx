"use client";

import { getLastLessons } from "@/apis/lesson";
import { getUser } from "@/apis/user";
import Card from "@/components/Card";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface LessonInfo {
    category: string;
    content: string;
    idx: number;
}

export default function ContinueLearning() {
    const router = useRouter();

    const [infos, setInfos] = useState<LessonInfo[]>([]);

    const getLastLessonsInfo = async () => {
        const user = await getUser();
        if (!user) return;

        const { web, html, css, js } = user.last_lesson_idxs;
        const lessons = await getLastLessons({ idxs: [web, html, css, js] });
        setInfos([
            {
                category: "Web",
                content:
                    lessons.web?.type === "explanation" || lessons.web?.type === "example"
                        ? lessons.web.content
                        : lessons.web?.type === "quiz" || lessons.web?.type === "code"
                        ? lessons.web.question
                        : "남은 웹 강의가 없습니다.",
                idx: web,
            },
            {
                category: "HTML",
                content:
                    lessons.html?.type === "explanation" || lessons.html?.type === "example"
                        ? lessons.html.content
                        : lessons.html?.type === "quiz" || lessons.html?.type === "code"
                        ? lessons.html.question
                        : "남은 HTML 강의가 없습니다.",
                idx: html,
            },
            {
                category: "CSS",
                content:
                    lessons.css?.type === "explanation" || lessons.css?.type === "example"
                        ? lessons.css.content
                        : lessons.css?.type === "quiz" || lessons.css?.type === "code"
                        ? lessons.css.question
                        : "남은 CSS 강의가 없습니다.",
                idx: css,
            },
            {
                category: "JavaScript",
                content:
                    lessons.js?.type === "explanation" || lessons.js?.type === "example"
                        ? lessons.js.content
                        : lessons.js?.type === "quiz" || lessons.js?.type === "code"
                        ? lessons.js.question
                        : "남은 JavaScript 강의가 없습니다.",
                idx: js,
            },
        ]);
    };

    useEffect(() => {
        getLastLessonsInfo();
    }, []);

    return (
        <Card title="이어 학습하기" className="h-[500px] flex flex-col">
            <div className="flex flex-col gap-5 px-8 mt-6 pb-5 flex-1 overflow-y-auto">
                {infos.map((card, idx) => (
                    <div key={card.category} className={`rounded-[15px] shadow-[0_18px_40px_rgba(112,144,176,0.12)] bg-white py-[18px] px-6 flex flex-col justify-between`}>
                        <div>
                            <div className="text-[#2B3674] font-bold text-lg mb-2.5">{card.category}</div>
                            <div className="font-normal text-[#A3AED0] text-base leading-[26px]">{card.content}</div>
                        </div>

                        <div className="w-full flex justify-end mt-7">
                            <button
                                className="bg-[#3965FF] text-white px-6 py-2 rounded-[10px] hover:bg-[#3965FF]/90 transition text-sm"
                                onClick={() => {
                                    router.push(`/basic?category=${card.category.toLowerCase()}&lessonIdx=${card.idx}`);
                                }}
                            >
                                이어 학습하기
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </Card>
    );
}
