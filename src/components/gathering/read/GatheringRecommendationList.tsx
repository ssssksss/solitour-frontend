"use client";

import { GatheringRecommend } from "@/entities/gathering/model/gathering";
import GatheringItem from "../../common/GatheringItem";
import { LottieNotFound } from "@/shared/ui/lottie";
import { useUserStore } from "@/entities/user";

interface GatheringRecommendationListProps {
  data: GatheringRecommend[];
}

const GatheringRecommendationList = ({
  data,
}: GatheringRecommendationListProps) => {
  const userStore = useUserStore();

  return (
    <div className="mt-[4.875rem] flex w-full flex-col">
      <h2 className="text-2xl font-bold text-black">추천 모임 정보</h2>
      {data.length === 0 ? (
        <div className="flex w-full flex-col items-center">
          <LottieNotFound text="추천 모임 정보가 없습니다." />
        </div>
      ) : (
        <div className="mt-6 grid w-full justify-items-center gap-x-3 gap-y-3 min-[745px]:grid-cols-2">
          {data.map((i) => (
            <GatheringItem
              key={i.gatheringId}
              data={{
                ...i,
                openChattingUrl: "",
              }}
              isAccessGathering={
                !!userStore.sex && !!userStore.age && userStore.id > 0
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GatheringRecommendationList;
