import type { FormEvent } from "react";
import React, { useEffect, useRef, useState } from "react";
import type { LessonStep } from "../../utils/lessonData";
import lessonModules from "../../utils/lessonData";

type Message = {
    role: "assistant" | "user";
    content: string;
};

interface ChatbotProps {
    codeInput: string;
    setCodeInput: (v: string) => void;
}

const PROGRESS_KEY = "frontend-coach-progress";

const Chatbot: React.FC<ChatbotProps> = ({ codeInput }) => {
    // 1. 진행 위치 상태
    const [moduleIdx, setModuleIdx] = useState(0);
    const [stepIdx, setStepIdx] = useState(-1); // -1: 시작 전
    const [messages, setMessages] = useState<Message[]>([
        {
            role: "assistant",
            content: "안녕하세요! 프론트엔드 커리큘럼을 따라 학습해볼까요?\n아래 '레슨 시작' 버튼을 눌러주세요.",
        },
    ]);
    const [input, setInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [codeError, setCodeError] = useState<string | null>(null);
    const chatEndRef = useRef<HTMLDivElement>(null);

    const currentModule = lessonModules[moduleIdx];
    const currentStep: LessonStep | undefined = stepIdx >= 0 ? currentModule?.steps[stepIdx] : undefined;

    // 2. 마운트 시 localStorage에서 진행 위치 불러오기
    useEffect(() => {
        const saved = localStorage.getItem(PROGRESS_KEY);
        if (saved) {
            try {
                const { moduleIdx: m, stepIdx: s } = JSON.parse(saved);
                if (typeof m === "number" && typeof s === "number" && lessonModules[m] && lessonModules[m].steps[s]) {
                    setModuleIdx(m);
                    setStepIdx(s);
                }
            } catch {
                // 저장값이 잘못된 경우 무시
            }
        }
    }, []);

    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);

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
        setTimeout(() => {
            showStep(0);
        }, 500);
    };

    // 단계별 안내
    const showStep = (idx: number) => {
        const step = currentModule.steps[idx];
        if (!step) return;
        setMessages((prev) => [...prev, { role: "assistant", content: step.type === "quiz" || step.type === "code" ? step.question : step.content }]);
        setInput("");
    };

    useEffect(() => {
        if (stepIdx >= 0 && currentModule?.steps[stepIdx]) {
            showStep(stepIdx);
        }
    }, [moduleIdx, stepIdx]);

    // 다음 단계로 이동
    const goNextStep = () => {
        setStepIdx((prev) => {
            const next = prev + 1;
            // 다음 모듈로 넘어가는 경우 처리
            if (currentModule && next >= currentModule.steps.length) {
                if (moduleIdx + 1 < lessonModules.length) {
                    setModuleIdx((m) => {
                        localStorage.setItem(PROGRESS_KEY, JSON.stringify({ moduleIdx: m + 1, stepIdx: 0 }));
                        return m + 1;
                    });
                    return 0;
                } else {
                    // 마지막 모듈 마지막 스텝
                    localStorage.setItem(PROGRESS_KEY, JSON.stringify({ moduleIdx, stepIdx: next - 1 }));
                    return prev;
                }
            } else {
                localStorage.setItem(PROGRESS_KEY, JSON.stringify({ moduleIdx, stepIdx: next }));
                return next;
            }
        });
    };

    // 4. "레슨 처음부터" 버튼 등으로 진행 위치 초기화
    const resetProgress = () => {
        setModuleIdx(0);
        setStepIdx(0);
        localStorage.setItem(PROGRESS_KEY, JSON.stringify({ moduleIdx: 0, stepIdx: 0 }));
    };

    // 코드 실습 정답 체크 (OpenAI 활용)
    const handleCodeCheck = async () => {
        if (!currentStep || currentStep.type !== "code") return;
        if (!codeInput.trim()) {
            setCodeError("코드를 입력해 주세요.");
            return;
        }
        // 1차: 키워드 포함 체크 (간단한 정답)
        const userCode = codeInput.replace(/\s/g, "").toLowerCase();
        const answerCode = currentStep.codeValidation.replace(/\s/g, "").toLowerCase();
        const isRoughlyCorrect = userCode.includes(answerCode);

        if (isRoughlyCorrect) {
            setCodeError(null);
            setMessages((prev) => [...prev, { role: "assistant", content: "정답입니다! 🎉" }]);
            setTimeout(goNextStep, 1200);
            return;
        }

        // 2차: OpenAI에게 의미 평가 요청 (서버 프록시)
        setCodeError("AI가 답변을 평가 중입니다...");
        try {
            const prompt = `
아래는 HTML 학습자의 코드 실습 문제입니다.
문제: ${currentStep.question}
예상 정답 예시(힌트): ${currentStep.codeValidation}
학생의 답안:
${codeInput}

학생의 답안이 문제의 요구사항을 충족하는지, 의미상 정답인지 "정답" 또는 "오답"으로만 답변해 주세요.
`;
            const res = await fetch("/api/openai", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
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

    // 퀴즈 정답 체크 (OpenAI 활용)
    const handleQuiz = async (e: FormEvent) => {
        e.preventDefault();
        if (!currentStep || currentStep.type !== "quiz") return;
        setMessages((prev) => [...prev, { role: "user", content: input }]);
        // 1차: 키워드 포함 체크
        const isRoughlyCorrect = input.trim().toLowerCase().includes(currentStep.answer.toLowerCase());
        if (isRoughlyCorrect) {
            setMessages((prev) => [...prev, { role: "assistant", content: "정답입니다! 🎉" }]);
            setInput("");
            setTimeout(goNextStep, 1200);
            return;
        }
        // 2차: OpenAI 평가 (서버 프록시)
        setMessages((prev) => [...prev, { role: "assistant", content: "AI가 답변을 평가 중입니다..." }]);
        try {
            const prompt = `
아래는 HTML 학습자의 퀴즈 문제입니다.
문제: ${currentStep.question}
예상 정답 예시(힌트): ${currentStep.answer}
학생의 답안:
${input}

학생의 답안이 의미상 정답인지 "정답" 또는 "오답"으로만 답변해 주세요.
`;
            const res = await fetch("/api/openai", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
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

    // 일반 챗봇 질문 (학습 흐름 외)
    const handleChat = async (e: FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;
        setMessages((prev) => [...prev, { role: "user", content: input }]);
        setLoading(true);
        try {
            const res = await fetch("/api/openai", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
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
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    content: "AI 응답 중 오류가 발생했습니다.",
                },
            ]);
        } finally {
            setLoading(false);
            setInput("");
        }
    };

    return (
        <section className="w-full p-6 flex flex-col bg-white shadow-md rounded-lg m-4 max-h-[calc(100vh-96px)] overflow-y-auto">
            <div className="flex-1 overflow-y-auto pr-2">
                {messages.map((msg, idx) => (
                    <div key={idx} className={`mb-3 flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                        {msg.role === "assistant" && <div className="flex-shrink-0 w-8 h-8 rounded-full bg-blue-200 flex items-center justify-center mr-2 text-lg">🤖</div>}
                        <div
                            className={`max-w-[80%] px-4 py-2 rounded-2xl shadow text-base whitespace-pre-line ${
                                msg.role === "user" ? "bg-blue-500 text-white rounded-br-none" : "bg-blue-100 text-blue-900 rounded-bl-none"
                            }`}
                        >
                            {msg.content}
                        </div>
                    </div>
                ))}
                <div ref={chatEndRef} />
            </div>
            {/* 단계별 입력 UI */}
            {stepIdx === -1 ? (
                // 레슨 시작 전 or 모듈 종료
                <form className="mt-4 flex" onSubmit={handleChat}>
                    <input
                        className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none"
                        placeholder="질문을 입력하세요..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={loading}
                        autoFocus
                    />
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-r-lg" disabled={loading || !input.trim()} type="submit">
                        {loading ? "전송 중..." : "전송"}
                    </button>
                </form>
            ) : currentStep?.type === "quiz" ? (
                <form className="mt-4 flex" onSubmit={handleQuiz}>
                    <input
                        className="flex-1 border rounded-l-lg px-3 py-2 focus:outline-none"
                        placeholder="정답을 입력하세요..."
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        disabled={loading}
                        autoFocus
                    />
                    <button className="bg-blue-500 text-white px-4 py-2 rounded-r-lg" disabled={loading || !input.trim()} type="submit">
                        {loading ? "전송 중..." : "전송"}
                    </button>
                </form>
            ) : currentStep?.type === "code" ? (
                <div className="mt-4 flex flex-col gap-2">
                    <button className="bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition" onClick={handleCodeCheck} type="button">
                        정답 확인
                    </button>
                    {codeError && <div className="text-red-600 text-sm">{codeError}</div>}
                </div>
            ) : (
                // 설명/예시 단계는 입력창 없음
                <div className="mt-4 text-gray-400 text-sm">
                    다음 안내를 읽고 &apos;다음&apos; 버튼을 눌러주세요.
                    <button className="ml-2 bg-blue-400 text-white px-3 py-1 rounded" onClick={goNextStep} type="button">
                        다음
                    </button>
                </div>
            )}
            {stepIdx === -1 && (
                <button className="mt-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow hover:bg-green-600 transition" onClick={startLesson} disabled={stepIdx !== -1}>
                    레슨 시작
                </button>
            )}
            <button className="w-full mt-2 bg-gray-200 text-blue-700 px-4 py-2 rounded-lg shadow hover:bg-gray-300 transition text-sm" onClick={resetProgress}>
                레슨 처음부터
            </button>
        </section>
    );
};

export default Chatbot;
