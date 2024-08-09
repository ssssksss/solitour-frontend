import BestInformationList from "@/components/home/BestInformationList";
import NewGatheringList from "@/components/home/NewGatheringList";
import TabList from "@/components/home/TabList";
import BestInformationListSkeleton from "@/components/skeleton/home/BestInformationListSkeleton";
import NewGatheringListSkeleton from "@/components/skeleton/home/NewGatheringListSkeleton";
import HomeCarouselContainer from "@/containers/home/HomeCarouselContainer";
import ListTemplateContainer from "@/containers/home/ListTemplateContainer";
import { Suspense } from "react";

// async function fetchBannerList(): Promise<Banner[]> {
//   const url = `${process.env.BACKEND_URL}/api/banner`;

//   try {
//     const response = await fetch(url);

//     if (!response.ok) {
//       const errorText = await response.text();
//       console.error(`Failed to fetch data: ${response.status} - ${errorText}`);
//       return []; // 빈 배열 반환
//     }

//     const data: Banner[] = await response.json();
//     return data;
//   } catch (error) {
//     console.error("An error occurred while fetching the banner list:", error);
//     return []; // 빈 배열 반환
//   }
// }

export default async function Home() {
  // const initBannerList = await fetchBannerList();

  return (
    <div className="mb-20 flex w-full flex-col items-center gap-20">
      <div className="absolute w-full">
        <HomeCarouselContainer
          // initBannerList={initBannerList.length > 0 ? initBannerList : []}
          initBannerList={[]}
        />
      </div>
      <div className="mt-[32.5rem] max-[1024px]:mt-60" />
      <TabList />
      <ListTemplateContainer
        category={"정보"}
        titles={["고민을 덜어줄,", "BEST", "여행 정보"]}
        description={"솔리투어에서 인기 여행 정보를 확인해보세요!"}
        >
        <Suspense fallback={<BestInformationListSkeleton />}>
          <BestInformationList />
        </Suspense>
      </ListTemplateContainer>
      <ListTemplateContainer
        category={"모임"}
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
