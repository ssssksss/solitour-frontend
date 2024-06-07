import CategoryLinks from "@/components/informations/CategoryLinks";
import InformationList from "@/components/informations/InformationList";
import BannerContainer from "@/containers/informations/CarouselContainer";
import TopListContainer from "@/containers/informations/TopListContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "정보 - 맛집",
  description: "Solitour의 정보(탭)",
};

export default function page() {
  return (
    <div className="flex flex-col items-center">
      <BannerContainer category="맛집" />
      <TopListContainer category="맛집" />
      <CategoryLinks category="맛집" />
      <InformationList category="맛집" />
    </div>
  );
}
