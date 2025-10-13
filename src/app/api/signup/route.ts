import { sql } from "@vercel/postgres";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "your_jwt_refresh_secret_key";

// 회원가입 API (POST)
export async function POST(req: NextRequest) {
    try {
        const { email, password, nickname } = await req.json();

        if (!email || !password || !nickname) {
            return NextResponse.json({ error: "필수 입력값이 누락되었습니다." }, { status: 400 });
        }

        // 이메일 중복 체크
        const { rows } = await sql`SELECT id FROM users WHERE email = ${email}`;
        if (rows.length > 0) {
            return NextResponse.json({ error: "이미 가입된 이메일입니다." }, { status: 409 });
        }

        // 비밀번호 해싱 (bcrypt 사용)
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 회원 정보 저장
        const result = await sql`
            INSERT INTO users (email, password, nickname)
            VALUES (${email}, ${hashedPassword}, ${nickname})
            RETURNING id, email, nickname
        `;
        const user = result.rows[0];

        // accessToken, refreshToken 발급
        const accessToken = jwt.sign({ id: user.id, email: user.email, nickname: user.nickname }, JWT_SECRET, { expiresIn: "15m" });
        const refreshToken = jwt.sign({ id: user.id, email: user.email }, JWT_REFRESH_SECRET, { expiresIn: "14d" });

        // refreshToken DB 저장
        await sql`
            UPDATE users SET refresh_token = ${refreshToken}
            WHERE id = ${user.id}
        `;

        // refreshToken을 HttpOnly 쿠키로 설정
        const response = NextResponse.json({
            message: "회원가입이 완료되었습니다.",
            accessToken,
            user: {
                id: user.id,
                email: user.email,
                nickname: user.nickname,
            },
        });

        response.cookies.set("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: "strict",
            maxAge: 14 * 24 * 60 * 60, // 14일
        });

        return response;
    } catch (error) {
        return NextResponse.json({ error: "회원가입 중 오류가 발생했습니다.", detail: (error as Error).message }, { status: 500 });
    }
}
