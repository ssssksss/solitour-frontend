import Banner from "@/components/common/Banner";
import TopList from "@/components/common/TopList";
import GatheringListContainer from "@/containers/gathering/GatheringListContainer";
import { Metadata } from "next";

type MyProps = {
  searchParams: { [key: string]: string | undefined };
};

export const metadata: Metadata = {
  title: "모임",
  description: "Solitour의 모임(탭)",
};

async function getData() {
    const res = await fetch(`${process.env.BACKEND_URL}/api/categories/gathering`, {
    next: { revalidate: 21600 }, // 6시간 = 21600초
  });

  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  return res.json();
}

export default async function page({ searchParams }: MyProps) {
  const gatheringCategoryList = await getData();

  return (
    <div className="w-full flex min-h-[calc(100vh-25rem)] flex-col items-center">
      <Banner
        content={[`<b>직접 내 모임</b>을`, "<b>만들어</b>보세요!"]}
        buttonText="모임 등록하기"
        category={"모임"}
      />
      <div className="mt-[26.25rem] max-[744px]:mt-[31rem] " />
      <TopList title="모임" />
      <GatheringListContainer gatheringCategoryList={gatheringCategoryList} />
    </div>
  );
}
