import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

// JWT 시크릿 키 (환경변수로 관리 권장)
const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "your_jwt_refresh_secret_key";

// 로그인 API (POST)
export async function POST(req: NextRequest) {
    try {
        const { email, password } = await req.json();

        if (!email || !password) {
            return NextResponse.json({ error: "필수 입력값이 누락되었습니다." }, { status: 400 });
        }

        // 이메일로 사용자 조회
        const { rows } = await sql`SELECT id, password, nickname FROM users WHERE email = ${email}`;
        if (rows.length === 0) {
            return NextResponse.json({ error: "존재하지 않는 이메일입니다." }, { status: 404 });
        }

        const user = rows[0];

        // 비밀번호 비교
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return NextResponse.json({ error: "비밀번호가 일치하지 않습니다." }, { status: 401 });
        }

        // accessToken 발급 (짧은 만료)
        const accessToken = jwt.sign(
            {
                id: user.id,
                email,
                nickname: user.nickname,
            },
            JWT_SECRET,
            { expiresIn: "15m" }
        );

        // refreshToken 발급 (긴 만료)
        const refreshToken = jwt.sign(
            {
                id: user.id,
                email,
            },
            JWT_REFRESH_SECRET,
            { expiresIn: "14d" }
        );

        // refreshToken을 DB에 저장
        await sql`
            UPDATE users SET refreshToken = ${refreshToken}
            WHERE id = ${user.id}
        `;

        const response = NextResponse.json({
            message: "로그인 성공",
            accessToken,
            user: {
                id: user.id,
                email,
                nickname: user.nickname,
            },
        });

        // refreshToken을 HttpOnly 쿠키로 설정
        response.cookies.set("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: "strict",
            maxAge: 14 * 24 * 60 * 60, // 14일
        });

        return response;
    } catch (error) {
        return NextResponse.json({ error: "로그인 중 오류가 발생했습니다.", detail: (error as Error).message }, { status: 500 });
    }
}
