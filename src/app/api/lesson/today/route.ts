import { authOptions } from "@/lib/api";
import { Lesson, LessonStep, User } from "@/types";
import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export interface TodayLesson {
    category: string;
    content: LessonStep;
}

export async function GET() {
    try {
        // DB에서 전체 레슨 정보 조회
        const result = await sql`SELECT * FROM lessons;`;
        if (result.rows.length === 0) {
            return NextResponse.json({ error: "레슨 정보를 찾을 수 없습니다." }, { status: 404 });
        }

        const lessons = result.rows as Lesson[];

        // next-auth 세션에서 현재 로그인된 사용자 정보 가져오기
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "로그인된 사용자가 없습니다." }, { status: 401 });
        }

        // DB에서 해당 유저 정보 조회
        const userResponse = await sql`SELECT * FROM users WHERE email = ${session.user.email};`;
        if (userResponse.rows.length === 0) {
            return NextResponse.json({ error: "사용자 정보를 찾을 수 없습니다." }, { status: 404 });
        }
        const user = userResponse.rows[0] as User;

        // DB에서 해당 유저의 학습 진행 상황 조회
        if (user.today_lessons.date !== new Date().toISOString().split("T")[0]) {
            return NextResponse.json({ progress: [] });
        }

        const webTodayLessons = user.today_lessons.web;
        const htmlTodayLessons = user.today_lessons.html;
        const cssTodayLessons = user.today_lessons.css;
        const jsTodayLessons = user.today_lessons.js;

        const todayLessonsData: TodayLesson[] = [];

        webTodayLessons.forEach((lesson) => {
            const lessonData = lessons.find((l) => l.module_key === "web")!.steps.find((step, idx) => idx === lesson);
            if (lessonData) {
                todayLessonsData.push({
                    category: "Web",
                    content: lessonData,
                });
            }
        });

        htmlTodayLessons.forEach((lesson) => {
            const lessonData = lessons.find((l) => l.module_key === "html")!.steps.find((step, idx) => idx === lesson);
            if (lessonData) {
                todayLessonsData.push({
                    category: "HTML",
                    content: lessonData,
                });
            }
        });

        cssTodayLessons.forEach((lesson) => {
            const lessonData = lessons.find((l) => l.module_key === "css")!.steps.find((step, idx) => idx === lesson);
            if (lessonData) {
                todayLessonsData.push({
                    category: "CSS",
                    content: lessonData,
                });
            }
        });

        jsTodayLessons.forEach((lesson) => {
            const lessonData = lessons.find((l) => l.module_key === "js")!.steps.find((step, idx) => idx === lesson);
            if (lessonData) {
                todayLessonsData.push({
                    category: "JavaScript",
                    content: lessonData,
                });
            }
        });

        return NextResponse.json({ lessons: todayLessonsData });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "서버 오류" }, { status: 500 });
    }
}
