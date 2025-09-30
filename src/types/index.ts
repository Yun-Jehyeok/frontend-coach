export interface Message {
    id: string;
    content: string;
    sender: 'user' | 'ai';
}

export interface Lesson {
    title: string;
    content: string;
    codeExamples: string[];
}

export interface ChatbotState {
    messages: Message[];
    loading: boolean;
}

export interface SidebarState {
    currentLesson: Lesson | null;
}