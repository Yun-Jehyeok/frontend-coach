import Header from "@/components/Header/Header";
import ContinueLearning from "./_component/ContinueLearning";
import LearningProgressRate from "./_component/LearningProgressRate";
import Tier from "./_component/Tier";
import TodayLearning from "./_component/TodayLearning";

export default function Home() {
    return (
        <div className="min-h-screen pt-12 pb-8 pr-5 flex flex-col">
            <Header page="Dashboard" />

            <section className="flex-1 pl-5">
                <div className="w-full grid grid-cols-2 gap-5">
                    {/* 학습 진도율 */}
                    <LearningProgressRate />

                    {/* 티어 */}
                    <Tier />
                </div>

                <div className="w-full grid grid-cols-2 gap-5 mt-5">
                    {/* 오늘의 학습 */}
                    <TodayLearning />

                    {/* 이어 학습하기 */}
                    <ContinueLearning />
                </div>
            </section>
        </div>
    );
}
