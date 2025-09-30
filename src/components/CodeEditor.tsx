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
        <div className="w-full p-4 flex flex-col gap-4">
            <div className="flex-1 border rounded">
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
            <div className="flex-1 border rounded">
                <iframe ref={iframeRef} title="미리보기" className="w-full h-full bg-white overflow-y-auto" sandbox="allow-scripts allow-same-origin allow-modals" />
            </div>
        </div>
    );
};

export default CodeEditor;
