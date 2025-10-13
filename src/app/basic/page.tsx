"use client";

import Chatbot from "@/components/Chatbot/Chatbot";
import CodeEditor from "@/components/CodeEditor";
import Header from "@/components/Header/Header";
import Spinner from "@/components/Spinner";
import { Suspense, useState } from "react";

const Home = () => {
    const [codeInput, setCodeInput] = useState("");

    return (
        <div className="h-screen py-12 pr-5 flex flex-col">
            <Suspense fallback={<Spinner />}>
                <Header page="Basic" />

                <section className="flex-1 grid grid-cols-2 gap-5 pl-5">
                    <Chatbot codeInput={codeInput} setCodeInput={setCodeInput} />
                    <CodeEditor code={codeInput} setCode={setCodeInput} />
                </section>
            </Suspense>
        </div>
    );
};

export default Home;
