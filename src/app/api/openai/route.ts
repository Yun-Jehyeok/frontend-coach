import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    const { messages, model, max_tokens, temperature } = await req.json();
    const apiKey = process.env.OPENAI_API_KEY || process.env.NEXT_PUBLIC_OPENAI_API_KEY;
    if (!apiKey) {
        return NextResponse.json({ error: "No OpenAI API key set." }, { status: 500 });
    }
    try {
        const res = await fetch("https://api.openai.com/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${apiKey}`,
            },
            body: JSON.stringify({
                model: model || "gpt-3.5-turbo",
                messages,
                max_tokens: max_tokens || 512,
                temperature: temperature ?? 0.7,
            }),
        });
        const data = await res.json();
        return NextResponse.json(data);
    } catch (e) {
        return NextResponse.json({ error: "OpenAI request failed." }, { status: 500 });
    }
}
