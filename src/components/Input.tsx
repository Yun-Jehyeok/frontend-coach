/**
 * label: 라벨
 * value: 값
 * onChange: 값 변경 이벤트
 * placeholder: 플레이스홀더
 * type: 타입
 * isRequired: 필수 여부
 * isErr: 에러 여부
 * errMsg: 에러 메시지
 * disabled: 비활성화 여부
 * maxLength: 최대 길이
 * minLength: 최소 길이
 * onKeyDown: 키 다운 이벤트
 * onKeyUp: 키 업 이벤트
 * onFocus: 포커스 이벤트
 * onBlur: 블러 이벤트
 * onInput: 입력 이벤트
 */
interface PropsType {
    label?: string;
    value: string | number | readonly string[];
    name: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    type: string;
    isRequired?: boolean;
    isErr?: boolean;
    errMsg?: string;
    disabled?: boolean;
    maxLength?: number;
    minLength?: number;
    onKeyDown?: React.KeyboardEventHandler<HTMLInputElement>;
    onKeyUp?: React.KeyboardEventHandler<HTMLInputElement>;
    onFocus?: React.FocusEventHandler<HTMLInputElement>;
    onBlur?: React.FocusEventHandler<HTMLInputElement>;
    onInput?: React.FormEventHandler<HTMLInputElement>;
}

export default function Input({
    label = "",
    value,
    name,
    onChange,
    placeholder,
    type,
    isErr = false,
    errMsg,
    isRequired = false,
    disabled = false,
    maxLength,
    minLength,
    onKeyDown,
    onKeyUp,
    onFocus,
    onBlur,
    onInput,
}: PropsType) {
    return (
        <div className="flex-1">
            {label !== "" && (
                <div className="mb-3 text-sm font-medium text-[#2B3674]">
                    {label}
                    {isRequired && <span className="text-[#4318FF]">*</span>}
                </div>
            )}

            <div className="w-full h-[50px] flex rounded-2xl px-6 border border-[#E0E5F2]">
                <input
                    className="flex-1 h-full border-none text-sm outline-none"
                    type={type}
                    value={value}
                    name={name}
                    onChange={onChange}
                    placeholder={placeholder}
                    disabled={disabled}
                    onKeyDown={onKeyDown}
                    onKeyUp={onKeyUp}
                    onFocus={onFocus}
                    onBlur={onBlur}
                    maxLength={maxLength}
                    minLength={minLength}
                    onInput={onInput}
                />
            </div>
            {isErr && <div className="text-red-500 text-xs mt-2">{errMsg}</div>}
        </div>
    );
}
