import BestInformationList from "@/components/home/BestInformationList";
import NewGatheringList from "@/components/home/NewGatheringList";
import TabList from "@/components/home/TabList";
import BestInformationListSkeleton from "@/components/skeleton/home/BestInformationListSkeleton";
import NewGatheringListSkeleton from "@/components/skeleton/home/NewGatheringListSkeleton";
import HomeCarouselContainer from "@/containers/home/HomeCarouselContainer";
import ListTemplateContainer from "@/containers/home/ListTemplateContainer";
import { Banner } from "@/types/BannerDto";
import { Suspense } from "react";

async function fetchBannerList(): Promise<Banner[]> {
  const response = await fetch(`${process.env.BACKEND_URL}/api/banner`, {
  });

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export default async function Home() {
  const initBannerList = await fetchBannerList();

  return (
    <div className="mb-20 flex flex-col items-center gap-20">
      <HomeCarouselContainer
        initBannerList={initBannerList.length > 0 ? initBannerList : []}
      />
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
        <Suspense fallback={<NewGatheringListSkeleton />}>
          <NewGatheringList />
        </Suspense>
      </ListTemplateContainer>
    </div>
  );
}
