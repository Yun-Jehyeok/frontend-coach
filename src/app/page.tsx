import Header from "@/components/Header/Header";

const Home = () => {
    return (
        <div className="min-h-screen py-12 pr-5 flex flex-col">
            <Header page="Dashboard" />

            <section className="w-full flex-1 flex items-center justify-center text-gray-400">Dashboard는 추후 업데이트 예정입니다.</section>
        </div>
    );
};

export default Home;
