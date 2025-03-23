import { GatheringTemp } from "@/components/gathering/read/GatheringTemp";
import { GatheringBanner } from "@/widgets/gatheringBanner";
import { TopGatheringTitleListWrapper } from "@/widgets/topGatheringTitleListWrapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "모임",
  description: "Solitour의 모임(탭)",
};

export default async function Page() {
  return (
    <div className="flex min-h-[calc(100vh-25rem)] w-full flex-col pb-[2.5rem]">
      <div className="flex w-full flex-col items-center">
        <GatheringBanner />
        <div className="mt-[26.25rem] max-[744px]:mt-[31rem]" />
      </div>
      <div className="flex w-full flex-col items-center">
        <TopGatheringTitleListWrapper />
      </div>
      <GatheringTemp />
    </div>
  );
}
