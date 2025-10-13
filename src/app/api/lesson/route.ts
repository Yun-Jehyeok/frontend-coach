import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        // DB에서 전체 레슨 정보 조회
        const result = await sql`SELECT * FROM lessons;`;
        if (result.rows.length === 0) {
            return NextResponse.json({ error: "레슨 정보를 찾을 수 없습니다." }, { status: 404 });
        }

        return NextResponse.json({ lessons: result.rows });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "서버 오류" }, { status: 500 });
    }
}
