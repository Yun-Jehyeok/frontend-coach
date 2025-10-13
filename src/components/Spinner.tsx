"use client";

export default function Spinner() {
    return (
        <div className="flex justify-center items-center h-full">
            <svg className="animate-spin" width="32" height="32" viewBox="0 0 32 32" fill="none">
                <circle cx="16" cy="16" r="14" stroke="#4318ff" strokeWidth="4" strokeDasharray="40" strokeDashoffset="10" opacity="0.3" />
                <circle cx="16" cy="16" r="14" stroke="#4318ff" strokeWidth="4" strokeDasharray="40" />
            </svg>
        </div>
    );
}
