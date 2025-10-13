"use client";

import SignInImg from "@/assets/imgs/SignInImg.png";
import { signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function SignIn() {
    const handleSocialLogin = (provider: string) => {
        signIn(provider);
    };

    return (
        <div className="w-screen h-screen flex items-center overflow-hidden">
            <div className="flex-1 h-full bg-white flex flex-col justify-center items-center">
                <div className="w-[410px] h-full relative flex flex-col justify-center">
                    <Link href="/" className="absolute top-10 left-0 flex gap-1.5 items-center text-[#A3AED0] text-sm">
                        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path
                                d="M14.7099 8.11997L10.8299 12L14.7099 15.88C15.0999 16.27 15.0999 16.9 14.7099 17.29C14.3199 17.68 13.6899 17.68 13.2999 17.29L8.70994 12.7C8.31994 12.31 8.31994 11.68 8.70994 11.29L13.2999 6.69997C13.6899 6.30997 14.3199 6.30997 14.7099 6.69997C15.0899 7.08997 15.0999 7.72997 14.7099 8.11997Z"
                                fill="#A3AED0"
                            />
                        </svg>
                        Back to dashboard
                    </Link>

                    <div>
                        <h1 className="text-4xl leading-[56px] font-bold text-[#2B3674] mb-2">로그인</h1>
                        <div className="text-base font-normal text-[#A3AED0] mb-9">소셜 계정을 통해 로그인해보세요!</div>

                        <button className="w-full h-[50px] rounded-2xl bg-[#F4F7FE] flex items-center justify-center gap-2 mb-6 hover:bg-[#F4F7FE]/80" onClick={() => handleSocialLogin("google")}>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_101_9040)">
                                    <path
                                        d="M19.7874 10.225C19.7874 9.56668 19.7291 8.94168 19.6291 8.33334H10.2124V12.0917H15.6041C15.3624 13.325 14.6541 14.3667 13.6041 15.075V17.575H16.8207C18.7041 15.8333 19.7874 13.2667 19.7874 10.225Z"
                                        fill="#4285F4"
                                    />
                                    <path
                                        d="M10.2126 20C12.9126 20 15.1709 19.1 16.8209 17.575L13.6043 15.075C12.7043 15.675 11.5626 16.0417 10.2126 16.0417C7.60427 16.0417 5.39593 14.2833 4.60427 11.9083H1.2876V14.4833C2.92926 17.75 6.30427 20 10.2126 20Z"
                                        fill="#34A853"
                                    />
                                    <path
                                        d="M4.60407 11.9083C4.39574 11.3083 4.2874 10.6667 4.2874 9.99999C4.2874 9.33333 4.40407 8.69166 4.60407 8.09166V5.51666H1.2874C0.604068 6.86666 0.212402 8.38333 0.212402 9.99999C0.212402 11.6167 0.604068 13.1333 1.2874 14.4833L4.60407 11.9083Z"
                                        fill="#FBBC05"
                                    />
                                    <path
                                        d="M10.2126 3.95833C11.6876 3.95833 13.0043 4.46667 14.0459 5.45834L16.8959 2.60833C15.1709 0.991667 12.9126 0 10.2126 0C6.30427 0 2.92926 2.25 1.2876 5.51667L4.60427 8.09167C5.39593 5.71667 7.60427 3.95833 10.2126 3.95833Z"
                                        fill="#EA4335"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_101_9040">
                                        <rect width="20" height="20" fill="white" />
                                    </clipPath>
                                </defs>
                            </svg>

                            <span className="text-sm leading-[20px] font-medium text-[#2B3674]">Google 로그인</span>
                        </button>
                        <button className="w-full h-[50px] rounded-2xl bg-black text-white flex items-center justify-center gap-2 mb-6 hover:bg-black/90" onClick={() => handleSocialLogin("github")}>
                            <svg width="24" height="25" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_678_2)">
                                    <path
                                        fillRule="evenodd"
                                        clipRule="evenodd"
                                        d="M11.9642 0.5C5.34833 0.5 0 6 0 12.8042C0 18.2432 3.42686 22.8472 8.18082 24.4767C8.77518 24.5992 8.9929 24.212 8.9929 23.8862C8.9929 23.601 8.97331 22.6232 8.97331 21.6045C5.64514 22.338 4.95208 20.1378 4.95208 20.1378C4.41722 18.7118 3.62473 18.3452 3.62473 18.3452C2.53543 17.5915 3.70408 17.5915 3.70408 17.5915C4.91241 17.673 5.54645 18.8545 5.54645 18.8545C6.61592 20.7285 8.33926 20.199 9.03257 19.873C9.13151 19.0785 9.44865 18.5285 9.78539 18.223C7.13094 17.9377 4.33812 16.8785 4.33812 12.1523C4.33812 10.8078 4.81322 9.70775 5.56604 8.85225C5.44727 8.54675 5.03118 7.2835 5.68506 5.59275C5.68506 5.59275 6.69527 5.26675 8.97306 6.85575C9.94827 6.58642 10.954 6.4494 11.9642 6.44825C12.9744 6.44825 14.0042 6.591 14.9552 6.85575C17.2332 5.26675 18.2434 5.59275 18.2434 5.59275C18.8973 7.2835 18.481 8.54675 18.3622 8.85225C19.1349 9.70775 19.5904 10.8078 19.5904 12.1523C19.5904 16.8785 16.7976 17.9172 14.1233 18.223C14.5592 18.61 14.9353 19.3433 14.9353 20.5045C14.9353 22.1545 14.9158 23.4788 14.9158 23.886C14.9158 24.212 15.1337 24.5992 15.7278 24.477C20.4818 22.847 23.9087 18.2432 23.9087 12.8042C23.9282 6 18.5603 0.5 11.9642 0.5Z"
                                        fill="white"
                                    />
                                </g>
                                <defs>
                                    <clipPath id="clip0_678_2">
                                        <rect width="24" height="24" fill="white" transform="translate(0 0.5)" />
                                    </clipPath>
                                </defs>
                            </svg>
                            <span className="text-sm leading-[20px] font-medium">Github 로그인</span>
                        </button>
                        <button
                            className="w-full h-[50px] rounded-2xl bg-[#FEE500] text-[rgba(0,0,0,0.85)] flex items-center justify-center gap-2 mb-6 hover:bg-[#FEE500]/80"
                            onClick={() => handleSocialLogin("kakao")}
                        >
                            <svg width="22" height="23" viewBox="0 0 22 23" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path
                                    opacity="0.902"
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M11 1.39062C5.24333 1.39062 0 6.12079 0 10.1226C0 13.1211 1.90422 15.766 4.80456 17.3377L3.58478 21.918C3.476 22.324 3.927 22.6464 4.27289 22.4127L9.62256 18.7833C10.0736 18.8283 10.5331 18.8545 11 18.8545C17.0744 18.8545 22 14.9452 22 10.1226C22 6.12079 17.0744 1.39062 11 1.39062Z"
                                    fill="black"
                                />
                            </svg>
                            <span className="text-sm leading-[20px] font-medium">Kakao 로그인</span>
                        </button>

                        {/* <div className="flex items-center my-6">
                            <div className="flex-1 h-px bg-[#E0E5F2]" />
                            <span className="mx-4 text-[#A3AED0] text-sm leading-6 font-medium select-none">or</span>
                            <div className="flex-1 h-px bg-[#E0E5F2]" />
                        </div> */}

                        {/* <form action="submit">
                            <div className="flex flex-col gap-6">
                                <Input {...email} type="email" name="email" label="Email" isRequired={true} placeholder="이메일을 입력해주세요." isErr={!!errs.email} errMsg={errs.email} />
                                <Input
                                    {...password}
                                    type="password"
                                    name="password"
                                    label="Password"
                                    isRequired={true}
                                    placeholder="비밀번호를 입력해주세요."
                                    isErr={!!errs.password}
                                    errMsg={errs.password}
                                />
                            </div>

                            <div className="text-[#4318FF] text-sm font-medium text-end my-8">Forget Password?</div>

                            <button className="w-full h-[54px] bg-[#4318FF] rounded-2xl text-sm text-white hover:bg-[#4318ff]/90" onClick={handleSubmit}>
                                Sign In
                            </button>
                        </form>

                        <div className="text-sm leading-[26px] font-normal text-[#2B3674] mt-6">
                            Not registered yet?&nbsp;
                            <Link href="/signup" className="text-[#4318FF] font-bold">
                                Create an Account
                            </Link>
                        </div> */}
                    </div>
                </div>
            </div>

            <Image src={SignInImg} alt="Sign In" className="flex-1 h-full object-cover bg-white" />
        </div>
    );
}
