import CategoryLinks from "@/components/informations/CategoryLinks";
import InformationList from "@/components/informations/InformationList";
import BannerContainer from "@/containers/common/BannerContainer";
import TopListContainer from "@/containers/informations/TopListContainer";
import { Metadata } from "next";

type MyProps = {
  searchParams: { [key: string]: string | undefined };
};

export const metadata: Metadata = {
  title: "정보 - 숙박",
  description: "Solitour의 정보(탭)",
};

export default function page({ searchParams }: MyProps) {
  return (
    <div className="flex flex-col items-center">
      <BannerContainer />
      <TopListContainer category="여행" />
      <CategoryLinks category="숙박" />
      <InformationList category="숙박" tag={searchParams["tag"]} />
    </div>
  );
}
