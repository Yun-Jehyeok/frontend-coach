"use client";

import { RefObject, useEffect, useState } from "react";

/**
 * 요소 외부 클릭을 감지하는 훅
 * @param ref 감지할 요소의 ref
 * @param handler 외부 클릭 시 실행할 콜백 함수
 */
export const useClickOutside = (ref: RefObject<HTMLElement | null>, handler: (event: MouseEvent | TouchEvent) => void) => {
    useEffect(() => {
        const listener = (event: MouseEvent | TouchEvent) => {
            if (!ref.current || ref.current.contains(event.target as Node)) {
                return;
            }
            handler(event);
        };

        document.addEventListener("mousedown", listener);
        document.addEventListener("touchstart", listener);

        return () => {
            document.removeEventListener("mousedown", listener);
            document.removeEventListener("touchstart", listener);
        };
    }, [ref, handler]);
};

/**
 * 입력 값을 관리하는 훅 (value, onChange, reset)
 * @param initialValue 초기 값
 * @returns value, onChange, reset
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const useInput = <T>(initialValue: T) => {
    const [value, setValue] = useState<T>(initialValue);
    const onChange = (e: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        const {
            target: { value },
        } = e;
        setValue(value as T);
    };
    const reset = () => setValue(initialValue);
    const resetValue = (value: T) => setValue(value);

    return { value, onChange, reset, resetValue };
};
