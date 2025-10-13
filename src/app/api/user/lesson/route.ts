import { authOptions } from "@/lib/api";
import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";
import { NextRequest, NextResponse } from "next/server";

export async function PUT(req: NextRequest) {
    try {
        // next-auth 세션에서 현재 로그인된 사용자 정보 가져오기
        const session = await getServerSession(authOptions);

        if (!session || !session.user?.email) {
            return NextResponse.json({ error: "로그인된 사용자가 없습니다." }, { status: 401 });
        }

        const { lesson } = await req.json();

        // DB에서 해당 유저 정보 조회
        const userResponse = await sql`SELECT * FROM users WHERE email = ${session.user.email};`;
        if (userResponse.rows.length === 0) {
            return NextResponse.json({ error: "사용자 정보를 찾을 수 없습니다." }, { status: 404 });
        }

        const user = userResponse.rows[0];

        // 1. last_lesson_idxs 업데이트
        const updatedLastLessonIdxs = { ...user.last_lesson_idxs, [lesson.module_key]: lesson.stepIdx };

        // 2. today_lessons 업데이트 (중복 제거)
        const todayLessonsArr = Array.isArray(user.today_lessons[lesson.module_key]) ? user.today_lessons[lesson.module_key] : [];
        let updatedTodayLessonsArr = [...todayLessonsArr];

        if (user.today_lessons.date !== new Date().toISOString().split("T")[0]) {
            // 날짜가 다르면 초기화
            updatedTodayLessonsArr = [];
        }

        // stepIdx가 0 미만인 경우엔 레슨 시작 전이므로 today_lessons에 추가하지 않음
        if (lesson.stepIdx >= 0) {
            updatedTodayLessonsArr = Array.from(new Set([...todayLessonsArr, lesson.stepIdx]));
        }
        const updatedTodayLessons = { ...user.today_lessons, date: new Date().toISOString().split("T")[0], [lesson.module_key]: updatedTodayLessonsArr };

        // 티어 단계 및 순서 정의 (LOL 기준)
        const tierOrder = [
            "Iron 4",
            "Iron 3",
            "Iron 2",
            "Iron 1",
            "Bronze 4",
            "Bronze 3",
            "Bronze 2",
            "Bronze 1",
            "Silver 4",
            "Silver 3",
            "Silver 2",
            "Silver 1",
            "Gold 4",
            "Gold 3",
            "Gold 2",
            "Gold 1",
            "Platinum 4",
            "Platinum 3",
            "Platinum 2",
            "Platinum 1",
            "Diamond 4",
            "Diamond 3",
            "Diamond 2",
            "Diamond 1",
            "Master 1",
            "Grandmaster 1",
            "Challenger 1",
        ];

        // 티어/LP 계산 함수
        function getNextTierAndLp(currentTier: string, currentLp: number, score: number) {
            let lp = currentLp + score;
            let tierIdx = tierOrder.indexOf(currentTier);

            while (lp >= 100 && tierIdx < tierOrder.length - 1) {
                lp -= 100;
                tierIdx += 1;
            }

            // 티어가 끝까지 올라가면 LP는 100을 넘지 않게 고정
            if (tierIdx === tierOrder.length - 1 && lp > 100) lp = 100;

            return {
                tier: tierOrder[tierIdx],
                lp,
            };
        }

        // 티어/LP 업데이트
        const { tier: newTier, lp: newLp } = getNextTierAndLp(user.tier.tier, user.tier.lp, lesson.score);

        // SQL로 업데이트 (last_lesson_idxs, today_lessons, tier)
        const updatedUser = await sql`
            UPDATE users
            SET last_lesson_idxs = ${JSON.stringify(updatedLastLessonIdxs)},
                today_lessons = ${JSON.stringify(updatedTodayLessons)},
                tier = ${JSON.stringify({ tier: newTier, lp: newLp })}
            WHERE id = ${user.id}
        `;

        return NextResponse.json({ user: updatedUser.rows[0], message: "User lesson updated successfully" });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "서버 오류" }, { status: 500 });
    }
}
