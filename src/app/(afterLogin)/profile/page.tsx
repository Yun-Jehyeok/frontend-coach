import Header from "@/components/Header/Header";

export default function Profile() {
    // return (
    //     <div className="h-screen py-12 pr-5 flex flex-col">
    //         <Header page="Profile" />

    //         <section className="pl-5">
    //             <div className="flex items-center gap-5 h-[365px]">
    //                 <div className="flex-1 h-full bg-white rounded-[20px] p-4">
    //                     <div className="relative mb-14">
    //                         <Image src={ProfileBackground} alt="Profile Background" className="w-full h-[131px] object-cover rounded-2xl" />
    //                         <div className="absolute w-20 h-20 rounded-full bg-white flex justify-center items-center left-1/2 -translate-x-1/2 -bottom-10">
    //                             <div className="w-[72px] h-[72px] rounded-full bg-[#878ea0]"></div>
    //                         </div>
    //                     </div>

    //                     <div className="text-center mb-6">
    //                         <h2 className="font-bold text-xl leading-8 text-[#2B3674]">Adela Parkson</h2>
    //                         <div className="font-medium text-sm leading-6 text-[#A3AED0]">Frontend Developer</div>
    //                     </div>

    //                     <div></div>
    //                 </div>

    //                 <div className="w-[381px] h-full bg-white rounded-[20px] p-4"></div>
    //                 <div className="w-[300px] h-full bg-white rounded-[20px] p-4"></div>
    //             </div>
    //             <div></div>
    //         </section>
    //     </div>
    // );

    return (
        <div className="min-h-screen py-12 pr-5 flex flex-col">
            <Header page="Profile" />

            <section className="w-full flex-1 flex items-center justify-center text-gray-400">Profile은 추후 업데이트 예정입니다.</section>
        </div>
    );
}
