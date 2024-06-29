import TabList from "@/components/home/TabList";
import BestInformationListSkeleton from "@/components/skeleton/home/BestInformationListSkeleton";
import NewMeetingListSkeleton from "@/components/skeleton/home/NewMeetingListSkeleton";
import BestInformationListContainer from "@/containers/home/BestInformationListContainer";
import HomeCarouselContainer from "@/containers/home/HomeCarouselContainer";
import NewMeetingListContainer from "@/containers/home/NewMeetingListContainer";
import { Suspense } from "react";

// todo
export default function Home() {
  return (
    <div className="flex flex-col items-center">
      <HomeCarouselContainer />
      <TabList />

      {/* TODO: async 사용 시 마우스 스크롤 문제 */}
      <Suspense fallback={<BestInformationListSkeleton />}>
        <BestInformationListContainer />
      </Suspense>
      <Suspense fallback={<NewMeetingListSkeleton />}>
        <NewMeetingListContainer />
      </Suspense>
    </div>
  );
}
