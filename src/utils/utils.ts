export const validateEmail = (email: string) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
};

export const validatePassword = (password: string) => {
    return /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
};

/**
 * 토큰 가져오기
 * @returns 토큰
 */
export const getToken = async () => {
    const response = await fetch("/api/auth/access-token", {
        credentials: "include", // 쿠키를 포함하여 요청
    });

    if (response.ok) {
        const { accessToken } = await response.json();
        return accessToken;
    }

    throw new Error("토큰이 없습니다.");
};
