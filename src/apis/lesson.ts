import { Lesson, LessonStep } from "@/types";

export const getAllLessons = async () => {
    const response = await fetch("/api/lesson", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        const { lessons } = (await response.json()) as { lessons: Lesson[] };
        return lessons;
    }

    throw new Error("레슨 정보를 가져올 수 없습니다.");
};

export const getLastLessons = async ({ idxs }: { idxs: number[] }) => {
    const query = new URLSearchParams({
        web: idxs[0].toString(),
        html: idxs[1].toString(),
        css: idxs[2].toString(),
        js: idxs[3].toString(),
    }).toString();

    const response = await fetch(`/api/lesson/last?${query}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });

    if (response.ok) {
        const { lessons } = (await response.json()) as {
            lessons: {
                web: LessonStep;
                html: LessonStep;
                css: LessonStep;
                js: LessonStep;
            };
        };

        return lessons;
    }

    throw new Error("레슨 정보를 가져올 수 없습니다.");
};
