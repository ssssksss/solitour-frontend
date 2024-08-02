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

export default function page({ searchParams }: MyProps) {
  return (
    <div className="flex min-h-[calc(100vh-25rem)] flex-col items-center">
      <Banner
        content={[`<b>직접 내 모임</b>을`, "<b>만들어</b>보세요!"]}
        buttonText="모임 등록하기"
        category={"모임"}
      />
      {/* TODO : 나중에 API 연결하게 되면 그때 가서 공통컴포넌트 수정하기 */}
      <div className="mt-[26.25rem] max-[744px]:mt-[31rem]" />
      <TopList title="모임" />
      <GatheringListContainer />
    </div>
  );
}
