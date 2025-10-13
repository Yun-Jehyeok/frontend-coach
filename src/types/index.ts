export interface Message {
    id: string;
    content: string;
    sender: "user" | "ai";
}

export interface ChatbotState {
    messages: Message[];
    loading: boolean;
}

export interface SidebarState {
    currentLesson: Lesson | null;
}

export interface User {
    id: number;
    created_at: string;
    email: string;
    nickname: string;
    tier: { lp: number; tier: string };
    last_lesson_idxs: {
        web: number;
        html: number;
        css: number;
        js: number;
    };
    today_lessons: {
        web: number[];
        html: number[];
        css: number[];
        js: number[];
        date: string | null;
    };
}

export type LessonStep =
    | { type: "explanation"; content: string }
    | { type: "example"; content: string }
    | { type: "quiz"; question: string; answer: string; hint?: string }
    | { type: "code"; question: string; codeValidation: string; hint?: string };

export interface Lesson {
    id: number;
    module_key: "web" | "html" | "css" | "js"; // DB의 module_key와 매핑
    title: string;
    steps: LessonStep[];
}
