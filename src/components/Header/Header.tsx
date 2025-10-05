export default function Header({ page }: { page: string }) {
    return (
        <div className="w-full pl-[30px] flex justify-between items-center mb-5">
            <h1 className="">
                <div className="text-[#707EAE] text-sm leading-6 font-medium">Pages&nbsp;/&nbsp;{page}</div>
                <div className="text-[#2B3674] font-bold text-[34px] leading-[42px]">{page}</div>
            </h1>

            <div className="shadow-dropshadow h-[60px] w-fit rounded-[30px] p-2.5 bg-white flex gap-5 items-center">
                <SearchBox />
                <Notification />
                <Profile />
            </div>
        </div>
    );
}

const SearchBox = () => {
    return (
        <div className="flex items-center gap-[11px] px-5 h-full bg-[#F4F7FE] w-[214px] rounded-[30px]">
            <svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="5" cy="5" r="4.3" stroke="#2B3674" strokeWidth="1.4" />
                <line x1="10.0101" y1="11" x2="8" y2="8.98995" stroke="#2B3674" strokeWidth="1.4" strokeLinecap="round" />
            </svg>
            <input type="text" placeholder="Search" className="flex-1 h-full outline-none text-sm font-normal placeholder:text-[#8F9BBA] bg-[#F4F7FE]" />
        </div>
    );
};

const Notification = () => {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="cursor-pointer">
            <g clipPath="url(#clip0_201_2884)">
                <path
                    d="M19.2901 17.29L18.0001 16V11C18.0001 7.93 16.3601 5.36 13.5001 4.68V4C13.5001 3.17 12.8301 2.5 12.0001 2.5C11.1701 2.5 10.5001 3.17 10.5001 4V4.68C7.63005 5.36 6.00005 7.92 6.00005 11V16L4.71005 17.29C4.08005 17.92 4.52005 19 5.41005 19H18.5801C19.4801 19 19.9201 17.92 19.2901 17.29ZM16.0001 17H8.00005V11C8.00005 8.52 9.51005 6.5 12.0001 6.5C14.4901 6.5 16.0001 8.52 16.0001 11V17ZM12.0001 22C13.1001 22 14.0001 21.1 14.0001 20H10.0001C10.0001 21.1 10.8901 22 12.0001 22Z"
                    fill="#A3AED0"
                />
            </g>
            <defs>
                <clipPath id="clip0_201_2884">
                    <rect width="24" height="24" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

const Profile = () => {
    return <div className="w-10 h-10 rounded-full bg-[#F4F7FE] cursor-pointer"></div>;
};
