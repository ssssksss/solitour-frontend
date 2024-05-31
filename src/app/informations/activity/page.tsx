import CarouselContainer from "@/containers/informations/CarouselContainer";
import TopListContainer from "@/containers/informations/TopListContainer";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "정보",
  description: "Solitour의 정보(탭)",
};

export default function page() {
  return (
    <div className="flex flex-col items-center">
      <CarouselContainer />
      <TopListContainer />
    </div>
  );
}
