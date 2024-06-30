import BestInformationList from "@/components/home/BestInformationList";
import NewMeetingList from "@/components/home/NewMeetingList";
import TabList from "@/components/home/TabList";
import BestInformationListSkeleton from "@/components/skeleton/home/BestInformationListSkeleton";
import NewMeetingListSkeleton from "@/components/skeleton/home/NewMeetingListSkeleton";
import HomeCarouselContainer from "@/containers/home/HomeCarouselContainer";
import ListTemplateContainer from "@/containers/home/ListTemplateContainer";
import { Suspense } from "react";

export default function Home() {
  return (
    <div className="mb-20 flex flex-col items-center gap-20">
      <HomeCarouselContainer />
      <TabList />
      <ListTemplateContainer
        titles={["고민을 덜어줄,", "BEST", "여행 정보"]}
        description={"솔리투어에서 인기 여행 정보를 확인해보세요!"}
      >
        <Suspense fallback={<BestInformationListSkeleton />}>
          <BestInformationList />
        </Suspense>
      </ListTemplateContainer>
      <ListTemplateContainer
        titles={["새로움을 발견할,", "NEW", "모임"]}
        description={"솔리투어에서 새로운 사람들과 최신 모임을 찾아보세요!"}
      >
        <Suspense fallback={<NewMeetingListSkeleton />}>
          <NewMeetingList />
        </Suspense>
      </ListTemplateContainer>
    </div>
  );
}
