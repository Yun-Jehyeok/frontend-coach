"use client";

import SignInImg from "@/assets/imgs/SignInImg.png";
import Input from "@/components/Input";
import { useInput } from "@/hooks/hooks";
import Image from "next/image";
import Link from "next/link";

export default function SignIn() {
    const email = useInput("");
    const password = useInput("");

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
                        <h1 className="text-4xl leading-[56px] font-bold text-[#2B3674] mb-2">Sign In</h1>
                        <div className="text-base font-normal text-[#A3AED0] mb-9">Enter your email and password to sign in!</div>

                        <button className="w-full h-[50px] rounded-2xl bg-[#F4F7FE] flex items-center justify-center gap-2 mb-6 hover:bg-[#F4F7FE]/80">
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

                            <span className="text-sm leading-[20px] font-medium text-[#2B3674]">Sign in with Google</span>
                        </button>

                        <div className="flex items-center my-6">
                            <div className="flex-1 h-px bg-[#E0E5F2]" />
                            <span className="mx-4 text-[#A3AED0] text-sm leading-6 font-medium select-none">or</span>
                            <div className="flex-1 h-px bg-[#E0E5F2]" />
                        </div>

                        <form action="submit">
                            <div className="flex flex-col gap-6">
                                <Input {...email} type="email" name="email" label="Email" isRequired={true} placeholder="이메일을 입력해주세요." />
                                <Input {...password} type="password" name="password" label="Password" isRequired={true} placeholder="비밀번호를 입력해주세요." />
                            </div>

                            <div className="text-[#4318FF] text-sm font-medium text-end my-8">Forget Password?</div>

                            <button className="w-full h-[54px] bg-[#4318FF] rounded-2xl text-sm text-white hover:bg-[#4318ff]/90">Sign In</button>
                        </form>

                        <div className="text-sm leading-[26px] font-normal text-[#2B3674] mt-6">
                            Not registered yet?&nbsp;
                            <Link href="/signup" className="text-[#4318FF] font-bold">
                                Create an Account
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <Image src={SignInImg} alt="Sign In" className="flex-1 h-full object-cover bg-white" />
        </div>
    );
}
