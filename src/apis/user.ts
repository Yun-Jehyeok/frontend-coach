import { User } from "@/types";

/**
 * 유저 정보 가져오기
 * @returns 유저 정보
 */
export const getUser = async () => {
    const response = await fetch("/api/user", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        const { user } = (await response.json()) as { user: User };
        return user;
    }

    throw new Error("사용자 정보를 가져올 수 없습니다.");
};

/**
 * 유저 lesson 정보 업데이트
 * @param lesson
 * @returns
 */
interface UpdateUserLessonsRequest {
    module_key: "web" | "html" | "css" | "js";
    stepIdx: number;
    score: number;
}
export const updateUserLessons = async (lesson: UpdateUserLessonsRequest) => {
    const response = await fetch("/api/user/lesson", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ lesson }),
    });

    if (response.ok) {
        return { success: true, user: (await response.json()).user as User };
    }

    throw new Error("사용자 레슨 정보를 업데이트할 수 없습니다.");
};
