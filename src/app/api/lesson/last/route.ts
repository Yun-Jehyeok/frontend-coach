import { Lesson, LessonStep } from "@/types";
import { sql } from "@vercel/postgres";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        // DB에서 전체 레슨 정보 조회
        const result = await sql`SELECT * FROM lessons;`;
        if (result.rows.length === 0) {
            return NextResponse.json({ error: "레슨 정보를 찾을 수 없습니다." }, { status: 404 });
        }

        const params = req.nextUrl.searchParams;
        let webIdx = Number(params.get("web"));
        let htmlIdx = Number(params.get("html"));
        let cssIdx = Number(params.get("css"));
        let jsIdx = Number(params.get("js"));

        webIdx === -1 ? (webIdx = 0) : webIdx;
        htmlIdx === -1 ? (htmlIdx = 0) : htmlIdx;
        cssIdx === -1 ? (cssIdx = 0) : cssIdx;
        jsIdx === -1 ? (jsIdx = 0) : jsIdx;

        const lessons = result.rows as Lesson[];

        let filteredLessons = {
            web: {} as LessonStep,
            html: {} as LessonStep,
            css: {} as LessonStep,
            js: {} as LessonStep,
        };

        lessons.forEach((lesson) => {
            if (lesson.module_key === "web") {
                filteredLessons.web = lesson.steps[webIdx];
            }
            if (lesson.module_key === "html") {
                filteredLessons.html = lesson.steps[htmlIdx];
            }
            if (lesson.module_key === "css") {
                filteredLessons.css = lesson.steps[cssIdx];
            }
            if (lesson.module_key === "js") {
                filteredLessons.js = lesson.steps[jsIdx];
            }
        });

        return NextResponse.json({ lessons: filteredLessons });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "서버 오류" }, { status: 500 });
    }
}
