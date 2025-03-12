import Banner from "@/components/common/Banner";
import TopList from "@/components/common/TopList";
import GatheringList from "@/components/gathering/read/GatheringList";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "모임",
  description: "Solitour의 모임(탭)",
};

async function getGatheringCategoryList() {
  const response = await fetch(
    `${process.env.BACKEND_URL}/api/categories/gathering`,
    { cache: "no-store" },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch data");
  }

  return response.json();
}

export default async function Page() {
  const gatheringCategoryList = await getGatheringCategoryList();

  return (
    <div className="flex min-h-[calc(100vh-25rem)] w-full flex-col pb-[2.5rem]">
      <div className="flex w-full flex-col items-center">
        <Banner
          content={["<b>직접 내 모임</b>을", "<b>만들어</b>보세요!"]}
          buttonText="모임 등록하기"
          category="모임"
        />
        <div className="mt-[26.25rem] max-[744px]:mt-[31rem]" />
      </div>
      <div className="flex w-full flex-col items-center">
        <TopList title="모임" />
      </div>
      <GatheringList gatheringCategoryList={gatheringCategoryList} />
    </div>
  );
}
