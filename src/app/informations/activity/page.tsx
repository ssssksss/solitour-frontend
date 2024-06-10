import CategoryLinks from "@/components/informations/CategoryLinks";
import InformationList from "@/components/informations/InformationList";
import BannerContainer from "@/containers/common/BannerContainer";
import TopListContainer from "@/containers/informations/TopListContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "정보 - 액티비티",
  description: "Solitour의 정보(탭)",
};

export default function page() {
  return (
    <div className="flex flex-col items-center">
      <BannerContainer />
      <TopListContainer category="여행" />
      <CategoryLinks category="액티비티" />
      <InformationList category="액티비티" />
    </div>
  );
}
