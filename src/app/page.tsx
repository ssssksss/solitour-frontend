import BestInformationList from "@/components/home/BestInformationList";
import HomeCarousel from "@/components/home/HomeCarousel";
import ListTemplate from "@/components/home/ListTemplate";
import NewGatheringList from "@/components/home/NewGatheringList";
import TabList from "@/components/home/TabList";
import BestInformationListSkeleton from "@/components/skeleton/home/BestInformationListSkeleton";
import NewGatheringListSkeleton from "@/components/skeleton/home/NewGatheringListSkeleton";
import { Suspense } from "react";

export default function Page() {
  return (
    <div className="mb-20 flex w-full flex-col items-center gap-20">
      <div className="absolute w-full">
        <HomeCarousel />
      </div>
      <div className="mt-[32.5rem] max-[1024px]:mt-60" />
      <TabList />
      <ListTemplate
        titles={["고민을 덜어줄,", "BEST", "여행 정보"]}
        description={"솔리투어에서 인기 여행 정보를 확인해보세요!"}
        href="/informations/list?page=1&parentCategoryId=1"
      >
        <Suspense fallback={<BestInformationListSkeleton />}>
          <BestInformationList />
        </Suspense>
      </ListTemplate>
      <ListTemplate
        titles={["새로움을 발견할,", "NEW", "모임"]}
        description={"솔리투어에서 새로운 사람들과 최신 모임을 찾아보세요!"}
        href="/gathering"
      >
        <Suspense fallback={<NewGatheringListSkeleton />}>
          <NewGatheringList />
        </Suspense>
      </ListTemplate>
    </div>
  );
}
