"use client";

import { LottieNotFound } from "@/shared/ui/lottie";
import { useUserStore } from "@/entities/user";
import { GatheringBookmark } from "@/features/gatheringBookmark";
import { GatheringLike } from "@/features/gatheringLike";
import { Gathering, GatheringItem } from "@/entities/gathering";

interface GatheringRecommendationListProps {
  data: Gathering[];
}

export const GatheringRecommendationList = ({
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
          {data.map((gathering) => (
            <GatheringItem
              key={gathering.gatheringId}
              gathering={{
                ...gathering,
                openChattingUrl: "",
              }}
              isAccessGathering={
                !!userStore.sex && !!userStore.age && userStore.id > 0
              }
              gatheringBookmarkComponent={
                <GatheringBookmark
                  gatheringId={gathering.gatheringId}
                  initialIsBookmarked={gathering.isBookMark}
                />
              }
              gatheringLikeComponent={
                <GatheringLike
                  gatheringId={gathering.gatheringId}
                  initialLikeCount={gathering.likeCount}
                  initialIsLike={gathering.isLike}
                />
              }
            />
          ))}
        </div>
      )}
    </div>
  );
};
