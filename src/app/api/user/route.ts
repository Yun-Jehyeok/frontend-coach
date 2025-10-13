import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "../auth/[...nextauth]/route";

export async function GET() {
    try {
        // next-auth 세션에서 현재 로그인된 사용자 정보 가져오기
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "로그인된 사용자가 없습니다." }, { status: 401 });
        }

        // DB에서 해당 유저 정보 조회
        const result = await sql`SELECT * FROM users WHERE email = ${session.user.email};`;
        if (result.rows.length === 0) {
            return NextResponse.json({ error: "사용자 정보를 찾을 수 없습니다." }, { status: 404 });
        }

        return NextResponse.json({ user: result.rows[0] });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "서버 오류" }, { status: 500 });
    }
}
