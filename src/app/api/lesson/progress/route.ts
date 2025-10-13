import { authOptions } from "@/lib/api";
import { Lesson, User } from "@/types";
import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

export interface ProgressResponse {
    title: string;
    rate: number;
    lastStudyDate: string | null;
}

export async function GET() {
    try {
        // DB에서 전체 레슨 정보 조회
        const result = await sql`SELECT * FROM lessons;`;
        if (result.rows.length === 0) {
            return NextResponse.json({ error: "레슨 정보를 찾을 수 없습니다." }, { status: 404 });
        }

        const lessons = result.rows as Lesson[];
        const webTotalLength = lessons.filter((lesson) => lesson.module_key === "web")[0].steps.length;
        const htmlTotalLength = lessons.filter((lesson) => lesson.module_key === "html")[0].steps.length;
        const cssTotalLength = lessons.filter((lesson) => lesson.module_key === "css")[0].steps.length;
        const jsTotalLength = lessons.filter((lesson) => lesson.module_key === "js")[0].steps.length;

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
        const webProgress = user.last_lesson_idxs.web === -1 ? 0 : user.last_lesson_idxs.web;
        const htmlProgress = user.last_lesson_idxs.html === -1 ? 0 : user.last_lesson_idxs.html;
        const cssProgress = user.last_lesson_idxs.css === -1 ? 0 : user.last_lesson_idxs.css;
        const jsProgress = user.last_lesson_idxs.js === -1 ? 0 : user.last_lesson_idxs.js;

        const progressData: ProgressResponse[] = [
            {
                title: "Web",
                rate: Math.min((webProgress / webTotalLength) * 100, 100),
                lastStudyDate: webProgress === 0 ? user.today_lessons.date : null,
            },
            {
                title: "HTML",
                rate: Math.min((htmlProgress / htmlTotalLength) * 100, 100),
                lastStudyDate: htmlProgress === 0 ? user.today_lessons.date : null,
            },
            {
                title: "CSS",
                rate: Math.min((cssProgress / cssTotalLength) * 100, 100),
                lastStudyDate: cssProgress === 0 ? user.today_lessons.date : null,
            },
            {
                title: "JavaScript",
                rate: Math.min((jsProgress / jsTotalLength) * 100, 100),
                lastStudyDate: jsProgress === 0 ? user.today_lessons.date : null,
            },
        ];

        return NextResponse.json({ progress: progressData });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "서버 오류" }, { status: 500 });
    }
}
