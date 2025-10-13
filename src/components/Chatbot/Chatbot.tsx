import { getAllLessons as getAlllessonsApi } from "@/apis/lesson";
import { getUser, updateUserLessons } from "@/apis/user";
import { Lesson, LessonStep, User } from "@/types";
import React, { useEffect, useRef, useState, type FormEvent } from "react";
import Spinner from "../Spinner";

type Message = {
    role: "assistant" | "user";
    content: string;
};

interface ChatbotProps {
    codeInput: string;
    setCodeInput: (v: string) => void;
}

// 분류별 모듈 인덱스 매핑 (lessonModules 배열에 맞게 수정)
const CATEGORY_MODULES: Record<"Web" | "HTML" | "CSS" | "JS", number[]> = {
    Web: [0],
    HTML: [1],
    CSS: [2],
    JS: [3],
};

const INIT_MESSAGE: Message = {
    role: "assistant",
    content: "안녕하세요! 프론트엔드 커리큘럼을 따라 학습해볼까요?\n아래 '레슨 시작' 버튼을 눌러주세요.",
};

const codePrompt = (question: string, codeValidation: string, codeInput: string) => `
아래는 HTML 학습자의 코드 실습 문제입니다.
문제: ${question}
예상 정답 예시(힌트): ${codeValidation}
학생의 답안:
${codeInput}

학생의 답안이 문제의 요구사항을 충족하는지, 의미상 정답인지 "정답" 또는 "오답"으로만 답변해 주세요.
`;

const quizPrompt = (question: string, answer: string, userAnswer: string) => `
아래는 HTML 학습자의 퀴즈 문제입니다.
문제: ${question}
예상 정답 예시(힌트): ${answer}
학생의 답안:
${userAnswer}

학생의 답안이 의미상 정답인지 "정답" 또는 "오답"으로만 답변해 주세요.
`;

const Chatbot: React.FC<ChatbotProps> = ({ codeInput }) => {
    const [lessonModules, setLessonModules] = useState<Lesson[]>([]);
    const [user, setUser] = useState<User | null>(null);

    // 최초 렌더링 시점에만 user 정보 1회 fetch
    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getUser();
            if (userData) setUser(userData);
        };
        fetchUser();
        getAllLessons();
    }, []);

    const [isLoaded, setIsLoaded] = useState(false);

    // 상태
    const [selected, setSelected] = useState<"Web" | "HTML" | "CSS" | "JS">("Web");
    const [open, setOpen] = useState(false);
    const [moduleIdx, setModuleIdx] = useState(0);
    const [stepIdx, setStepIdx] = useState(-1); // -1: 시작 전
    const [messages, setMessages] = useState<Message[]>([INIT_MESSAGE]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [codeError, setCodeError] = useState<string | null>(null);

    // ref
    const chatEndRef = useRef<HTMLDivElement>(null);
    const nextBtnRef = useRef<HTMLButtonElement>(null);

    // 옵션
    const options = ["Web", "HTML", "CSS", "JS"];
    const filteredModules: Lesson[] = isLoaded ? CATEGORY_MODULES[selected].map((idx) => lessonModules[idx]).filter(Boolean) : [];
    const currentModule = filteredModules[moduleIdx];
    const currentStep: LessonStep | undefined = stepIdx >= 0 ? currentModule?.steps[stepIdx] : undefined;

    // DB에서 레슨 데이터 불러오기
    const getAllLessons = async () => {
        const res = await getAlllessonsApi();
        setLessonModules(res);
    };
    const getUserInfo = async () => {
        const user = await getUser();
        if (!user) return;

        setUser(user);
    };
    useEffect(() => {
        getAllLessons();
        getUserInfo();
    }, []);

    useEffect(() => {
        if (isLoaded) return;

        if (user !== null && lessonModules.length > 0) {
            setIsLoaded(true);
        }
    }, [lessonModules, user]);

    // 진행 상태는 user state 기반으로 관리
    useEffect(() => {
        if (!isLoaded || filteredModules.length === 0 || !user) return;

        // moduleIdx는 항상 0, stepIdx는 user.last_lesson_idxs[selected] 값 사용
        const userStepIdx = user.last_lesson_idxs?.[selected.toLowerCase() as "web" | "html" | "css" | "js"] ?? -1;
        setModuleIdx(0);
        setStepIdx(userStepIdx);

        setInput("");
        setCodeError(null);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isLoaded, selected, user]);

    useEffect(() => {
        if (stepIdx >= 0 && currentModule?.steps[stepIdx]) {
            showStep(stepIdx);
        }

        if (stepIdx < 0) {
            setMessages([INIT_MESSAGE]);
            setInput("");
            setCodeError(null);

            return;
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [moduleIdx, stepIdx, selected]);

    // 채팅 스크롤 항상 아래로
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

    // 설명/예시 단계에서 다음 버튼 자동 포커스
    useEffect(() => {
        if (stepIdx >= 0 && currentModule && currentStep && (currentStep.type === "explanation" || currentStep.type === "example") && nextBtnRef.current) {
            nextBtnRef.current.focus();
        }
    }, [stepIdx, currentModule, currentStep]);

    // 단계별 안내
    const showStep = (idx: number) => {
        const step = currentModule.steps[idx];
        if (!step) return;

        setMessages((prev) => [
            ...prev,
            {
                role: "assistant",
                content: step.type === "quiz" || step.type === "code" ? step.question : step.content,
            },
        ]);

        setInput("");
    };

    // 레슨 시작
    const startLesson = () => {
        setStepIdx(0);
        setMessages((prev) => [
            ...prev,
            {
                role: "assistant",
                content: `📚 [${currentModule.title}] 레슨을 시작합니다!`,
            },
        ]);
    };

    // 분류 변경
    const onChangeSelected = (selectedParams: typeof selected) => {
        setSelected(selectedParams);
        setOpen(false);

        // moduleIdx는 항상 0, stepIdx는 user.last_lesson_idxs[selectedParams] 값 사용
        const userStepIdx = user?.last_lesson_idxs?.[selectedParams.toLowerCase() as "web" | "html" | "css" | "js"] ?? -1;
        setModuleIdx(0);
        setStepIdx(userStepIdx);

        setMessages([INIT_MESSAGE]);
        setInput("");
        setCodeError(null);
    };

    // updateUserLessons는 비동기처리 없이 user state만 직접 업데이트
    const goNextStep = () => {
        if (!currentModule || !user) return;
        const nextStep = stepIdx + 1;

        updateUserLessons({ module_key: currentModule.module_key, stepIdx: nextStep, score: 10 });

        // lesson 정보 생성
        const lesson = {
            module_key: currentModule.module_key,
            stepIdx: nextStep,
            score: 10,
        };

        // #file:route.ts의 로직을 그대로 사용해서 user 정보 업데이트
        // 1. last_lesson_idxs 업데이트
        const updatedLastLessonIdxs = { ...user.last_lesson_idxs, [lesson.module_key]: lesson.stepIdx };

        // 2. today_lessons 업데이트 (중복 제거)
        const todayLessonsArr = Array.isArray(user.today_lessons[lesson.module_key]) ? user.today_lessons[lesson.module_key] : [];
        let updatedTodayLessonsArr = [...todayLessonsArr];
        if (lesson.stepIdx >= 0) {
            updatedTodayLessonsArr = Array.from(new Set([...todayLessonsArr, lesson.stepIdx]));
        }
        const updatedTodayLessons = { ...user.today_lessons, [lesson.module_key]: updatedTodayLessonsArr };

        // user state 직접 업데이트
        setUser({
            ...user,
            last_lesson_idxs: updatedLastLessonIdxs,
            today_lessons: updatedTodayLessons,
        });

        setStepIdx(nextStep);
    };

    // "레슨 처음부터" 버튼
    const resetProgress = () => {
        setModuleIdx(0);
        setStepIdx(0);

        setMessages([INIT_MESSAGE]);
        setInput("");
        setCodeError(null);

        if (!currentModule || !user) return;

        updateUserLessons({ module_key: currentModule.module_key, stepIdx: -1, score: 0 });

        // lesson 정보 생성
        const lesson = {
            module_key: currentModule.module_key,
            stepIdx: -1,
            score: 0,
        };

        // #file:route.ts의 로직을 그대로 사용해서 user 정보 업데이트
        const updatedLastLessonIdxs = { ...user.last_lesson_idxs, [lesson.module_key]: lesson.stepIdx };
        const todayLessonsArr = Array.isArray(user.today_lessons[lesson.module_key]) ? user.today_lessons[lesson.module_key] : [];
        let updatedTodayLessonsArr = [...todayLessonsArr];
        if (lesson.stepIdx >= 0) {
            updatedTodayLessonsArr = Array.from(new Set([...todayLessonsArr, lesson.stepIdx]));
        }
        const updatedTodayLessons = { ...user.today_lessons, [lesson.module_key]: updatedTodayLessonsArr };

        // 티어는 score가 0이므로 변화 없음
        setUser({
            ...user,
            last_lesson_idxs: updatedLastLessonIdxs,
            today_lessons: updatedTodayLessons,
        });
    };

    // 코드 실습 정답 체크
    const handleCodeCheck = async () => {
        if (!currentStep || currentStep.type !== "code") return;
        if (!codeInput.trim()) {
            setCodeError("코드를 입력해 주세요.");
            return;
        }

        const userCode = codeInput.replace(/\s/g, "").toLowerCase();
        const answerCode = currentStep.codeValidation.replace(/\s/g, "").toLowerCase();
        const isRoughlyCorrect = userCode.includes(answerCode);

        if (isRoughlyCorrect) {
            setCodeError(null);
            setMessages((prev) => [...prev, { role: "assistant", content: "정답입니다! 🎉" }]);
            setTimeout(goNextStep, 1200);
            return;
        }

        setCodeError("AI가 답변을 평가 중입니다...");

        try {
            const prompt = codePrompt(currentStep.question, currentStep.codeValidation, codeInput);

            const res = await fetch("/api/openai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: "당신은 프론트엔드 튜터입니다." },
                        { role: "user", content: prompt },
                    ],
                    max_tokens: 20,
                    temperature: 0,
                }),
            });

            const data = await res.json();
            const aiResult = data.choices?.[0]?.message?.content?.trim() || "";

            if (aiResult.includes("정답")) {
                setCodeError(null);
                setMessages((prev) => [...prev, { role: "assistant", content: "정답입니다! 🎉" }]);
                setTimeout(goNextStep, 1200);
            } else {
                setCodeError(`정답이 아닙니다. 힌트: ${currentStep.hint || ""}`);
            }
        } catch {
            setCodeError("AI 평가 중 오류가 발생했습니다. 다시 시도해 주세요.");
        }
    };

    // 퀴즈 정답 체크
    const handleQuiz = async (e: FormEvent) => {
        e.preventDefault();

        if (!currentStep || currentStep.type !== "quiz") return;

        setMessages((prev) => [...prev, { role: "user", content: input }]);

        const isRoughlyCorrect = input.trim().toLowerCase().includes(currentStep.answer.toLowerCase());
        if (isRoughlyCorrect) {
            setMessages((prev) => [...prev, { role: "assistant", content: "정답입니다! 🎉" }]);
            setInput("");
            setTimeout(goNextStep, 1200);
            return;
        }

        setMessages((prev) => [...prev, { role: "assistant", content: "AI가 답변을 평가 중입니다..." }]);

        try {
            const prompt = quizPrompt(currentStep.question, currentStep.answer, input);

            const res = await fetch("/api/openai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [
                        { role: "system", content: "당신은 프론트엔드 튜터입니다." },
                        { role: "user", content: prompt },
                    ],
                    max_tokens: 20,
                    temperature: 0,
                }),
            });

            const data = await res.json();
            const aiResult = data.choices?.[0]?.message?.content?.trim() || "";

            if (aiResult.includes("정답")) {
                setMessages((prev) => [...prev, { role: "assistant", content: "정답입니다! 🎉" }]);
                setInput("");
                setTimeout(goNextStep, 1200);
            } else {
                setMessages((prev) => [...prev, { role: "assistant", content: `정답이 아닙니다. 힌트: ${currentStep.hint || currentStep.answer}` }]);
                setInput("");
            }
        } catch {
            setMessages((prev) => [...prev, { role: "assistant", content: "AI 평가 중 오류가 발생했습니다. 다시 시도해 주세요." }]);
            setInput("");
        }
    };

    // 일반 챗봇 질문
    const handleChat = async (e: FormEvent) => {
        e.preventDefault();

        if (!input.trim()) return;

        setMessages((prev) => [...prev, { role: "user", content: input }]);
        setLoading(true);

        try {
            const res = await fetch("/api/openai", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    model: "gpt-3.5-turbo",
                    messages: [{ role: "system", content: "당신은 프론트엔드 입문자를 위한 친절한 튜터입니다." }, ...messages, { role: "user", content: input }],
                    max_tokens: 512,
                    temperature: 0.7,
                }),
            });

            const data = await res.json();
            const aiContent = data.choices?.[0]?.message?.content || "AI 응답을 가져오지 못했습니다. 잠시 후 다시 시도해 주세요.";
            setMessages((prev) => [...prev, { role: "assistant", content: aiContent }]);
        } catch {
            setMessages((prev) => [...prev, { role: "assistant", content: "AI 응답 중 오류가 발생했습니다." }]);
        } finally {
            setLoading(false);
            setInput("");
        }
    };

    // UI
    return (
        <section className="w-full h-full flex flex-col bg-white rounded-[20px] overflow-y-auto">
            <div className="py-5 px-8 w-full flex justify-between items-center">
                <h2 className="font-bold text-2xl text-[#2B3674]">{selected}</h2>
                <div className="relative w-[140px]">
                    <button
                        type="button"
                        className="w-full p-2 pl-4 rounded-lg border border-[#F4F7FE] bg-[#F4F7FE] text-[#2B3674] text-sm font-semibold shadow-sm flex items-center justify-between focus:outline-none transition cursor-pointer"
                        onClick={() => setOpen((v) => !v)}
                    >
                        {selected}
                        <span className={`ml-2 pointer-events-none text-[#A3AED0] ${open ? "transform -rotate-180" : ""} transition-all duration-150`}>
                            <svg width="16" height="16" fill="none" viewBox="0 0 24 24">
                                <path d="M7 10l5 5 5-5" stroke="#A3AED0" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </span>
                    </button>
                    {open && (
                        <ul className="absolute left-0 top-[120%] w-full bg-white border border-[#F4F7FE] rounded-lg shadow-lg z-10">
                            {options.map((opt) => (
                                <li
                                    key={opt}
                                    className={`px-4 py-2 cursor-pointer text-sm hover:bg-[#F4F7FE] transition ${selected === opt ? "bg-[#F4F7FE] text-[#4318FF] font-bold" : "text-[#2B3674]"}`}
                                    onClick={() => onChangeSelected(opt as typeof selected)}
                                >
                                    {opt}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>

            <div className="flex-1 px-8 flex flex-col py-5">
                {!isLoaded ? (
                    <Spinner />
                ) : (
                    <div className="flex-1 max-h-[calc(100vh-420px)] overflow-y-auto pr-2">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`mb-4 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                                {msg.role === "assistant" && <div className="flex-shrink-0 w-9 h-9 rounded-full bg-[#E9E3FF] flex items-center justify-center mr-3 text-xl shadow">🤖</div>}
                                <div
                                    className={`max-w-[75%] px-5 py-3 rounded-2xl text-base whitespace-pre-line break-words font-dmsans transition-all
                                    ${msg.role === "user" ? "bg-[#4318FF] text-white rounded-br-md" : "bg-[#F4F7FE] text-[#2B3674] rounded-bl-md border border-[#E9E3FF]"}`}
                                >
                                    {msg.content}
                                </div>
                            </div>
                        ))}
                        <div ref={chatEndRef} />
                    </div>
                )}

                {/* 단계별 입력 UI */}
                {stepIdx === -1 ? (
                    <form className="mt-6 flex gap-2" onSubmit={handleChat}>
                        <input
                            className="flex-1 border border-[#F4F7FE] rounded-lg px-4 py-3 bg-[#F4F7FE] text-[#2B3674] font-dmsans focus:outline-none focus:ring-2 focus:ring-[#4318FF] transition"
                            placeholder="질문을 입력하세요..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={loading}
                            autoFocus
                        />
                        <button
                            className="bg-[#4318FF] hover:bg-[#7551FF] text-white px-6 py-3 rounded-lg font-bold shadow transition disabled:bg-[#A3AED0]"
                            disabled={loading || !input.trim()}
                            type="submit"
                        >
                            {loading ? "전송 중..." : "전송"}
                        </button>
                    </form>
                ) : currentModule && stepIdx === currentModule.steps.length - 1 ? (
                    <div className="mt-6 text-[#A3AED0] text-base flex items-center gap-2 font-bold justify-center">🎉 학습이 종료되었습니다.</div>
                ) : currentStep?.type === "quiz" ? (
                    <form className="mt-6 flex gap-2" onSubmit={handleQuiz}>
                        <input
                            className="flex-1 border border-[#F4F7FE] rounded-lg px-4 py-3 bg-[#F4F7FE] text-[#2B3674] font-dmsans focus:outline-none focus:ring-2 focus:ring-[#4318FF] transition"
                            placeholder="정답을 입력하세요..."
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            disabled={loading}
                            autoFocus
                        />
                        <button
                            className="bg-[#4318FF] hover:bg-[#4318FF]/90 text-white px-6 py-3 rounded-lg font-bold shadow transition disabled:bg-[#A3AED0]"
                            disabled={loading || !input.trim()}
                            type="submit"
                        >
                            {loading ? "전송 중..." : "전송"}
                        </button>
                    </form>
                ) : currentStep?.type === "code" ? (
                    <div className="mt-6 flex flex-col gap-2">
                        <button className="bg-[#01B574] hover:bg-[#01B574]/90 h-12 text-white rounded-lg font-semibold shadow transition text-sm" onClick={handleCodeCheck} type="button">
                            정답 확인
                        </button>
                        {codeError && <div className="text-[#E31A1A] text-sm font-medium">{codeError}</div>}
                    </div>
                ) : (
                    <div
                        className="mt-6 text-[#A3AED0] text-base flex items-center gap-2"
                        tabIndex={0}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") goNextStep();
                        }}
                    >
                        다음 안내를 읽고 <span className="font-bold text-[#4318FF]">‘다음’</span> 버튼을 눌러주세요.
                        <button
                            ref={nextBtnRef}
                            className="ml-2 bg-[#4318FF] hover:bg-[#4318FF]/90 text-white px-5 py-2 rounded-lg font-bold shadow transition focus:outline-none"
                            onClick={goNextStep}
                            type="button"
                        >
                            다음
                        </button>
                    </div>
                )}
                {stepIdx === -1 && (
                    <button className="mt-6 bg-[#00B074] hover:bg-[#13DEB9] text-white px-6 py-3 rounded-lg font-bold shadow transition" onClick={startLesson} disabled={stepIdx !== -1}>
                        레슨 시작
                    </button>
                )}
                <button className="w-full mt-3 bg-[#4318FF] text-[#F4F7FE] px-4 py-2 rounded-lg font-semibold hover:bg-[#4318ff]/90 transition text-sm h-12" onClick={resetProgress}>
                    레슨 처음부터
                </button>
            </div>
        </section>
    );
};

export default Chatbot;
