"use client";

import { GatheringRecommend } from "@/types/GatheringDto";
import GatheringItem from "../../common/GatheringItem";
import useAuthStore from "@/store/authStore";

const GatheringRecommendationList = ({
  data,
}: {
  data: GatheringRecommend[];
}) => {
  const authStore = useAuthStore();

  return (
    <div className="mt-[4.875rem] flex w-full flex-col">
      <h2 className="text-2xl font-bold text-black">추천 모임 정보</h2>
      <div className="mt-6 grid w-full justify-items-center gap-x-3 gap-y-3 min-[745px]:grid-cols-2">
        {data.map((i, index) => (
          <GatheringItem
            key={i.gatheringId}
            data={{
              ...i,
              openChattingUrl: "",
            }}
            isAccessGathering={
              !!authStore.sex && !!authStore.age && authStore.id > 0
            }
          />
        ))}
      </div>
    </div>
  );
};

export default GatheringRecommendationList;
