import Banner from "@/components/common/Banner";
import CategoryLinks from "@/components/informations/CategoryLinks";
import InformationList from "@/components/informations/InformationList";
import TopListContainer from "@/containers/informations/TopListContainer";
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
    <div className="flex flex-col items-center">
      <Banner title={"모임"} content={[`<b>직접 내 모임</b>을`, "<b>만들어</b>보세요!"]} buttonText="모임 등록하기" category={"모임"}/>
      {/* TODO : 나중에 API 연결하게 되면 그때 가서 공통컴포넌트 수정하기 */}
      <TopListContainer category="모임" />
      <CategoryLinks category="숙박" />
      <InformationList
        category="숙박"
        subCategory={searchParams["subCategory"]!}
      />
    </div>
  );
}