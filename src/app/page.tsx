"use client";

import { useState } from "react";
import Chatbot from "../components/Chatbot/Chatbot";
import CodeEditor from "../components/CodeEditor";
import Header from "../components/Header/Header";

const Home = () => {
    const [codeInput, setCodeInput] = useState("");

    return (
        <div className="h-screen flex flex-col">
            <Header />
            <div className="flex-1 grid grid-cols-2 gap-12">
                <Chatbot codeInput={codeInput} setCodeInput={setCodeInput} />
                <CodeEditor code={codeInput} setCode={setCodeInput} />
            </div>
        </div>
    );
};

export default Home;
