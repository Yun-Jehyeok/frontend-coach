import MonacoEditor from "@monaco-editor/react";
import React, { useEffect, useRef } from "react";

interface CodeEditorProps {
    code: string;
    setCode: (v: string) => void;
}

const DEFAULT_CODE = `이곳에 코드를 입력해보세요!
`;

const CodeEditor: React.FC<CodeEditorProps> = ({ code, setCode }) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);

    useEffect(() => {
        if (iframeRef.current) {
            iframeRef.current.srcdoc = code;
        }
    }, [code]);

    return (
        <div className="w-full flex flex-col gap-5">
            <div className="flex-1 rounded-[20px] bg-white flex flex-col">
                <div className="py-5 px-8 w-full flex justify-between items-center">
                    <h2 className="font-bold text-2xl text-[#2B3674]">Code Editor</h2>
                </div>

                <div className="pb-5 px-8 pl-0 flex-1">
                    <MonacoEditor
                        height="100%"
                        defaultLanguage="html"
                        defaultValue={DEFAULT_CODE}
                        value={code}
                        onChange={(value) => setCode(value ?? "")}
                        options={{
                            fontSize: 16,
                            minimap: { enabled: false },
                            wordWrap: "on",
                            scrollBeyondLastLine: false,
                            automaticLayout: true,
                        }}
                    />
                </div>
            </div>

            <div className="flex-1 rounded-[20px] bg-white flex flex-col overflow-hidden p-6">
                <iframe ref={iframeRef} title="미리보기" className="w-full h-full bg-white overflow-y-auto" sandbox="allow-scripts allow-same-origin allow-modals" />
            </div>
        </div>
    );
};

export default CodeEditor;
