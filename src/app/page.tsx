import { BestInformationListWrapper } from "@/widgets/bestInformationListWrapper";
import { HomeCarousel } from "@/widgets/homeCarousel";
import { HomeShortcuts } from "@/widgets/homeShortcuts";
import { NewGatheringListWrapper } from "@/widgets/newGatheringListWrapper";

export default function Page() {
  return (
    <div className="mb-20 flex w-full flex-col items-center gap-20">
      <div className="absolute w-full">
        <HomeCarousel />
      </div>
      <div className="mt-[32.5rem] max-[1024px]:mt-60" />
      <HomeShortcuts />
      <BestInformationListWrapper />
      <NewGatheringListWrapper />
    </div>
  );
}
