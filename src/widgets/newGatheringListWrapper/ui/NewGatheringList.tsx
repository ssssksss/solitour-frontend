import { getNewGatheringList } from "@/entities/gathering";
import { LottieNotFound } from "@/shared/ui/lottie";
import { NewGatheringItem } from "./NewGatheringItem";

export const NewGatheringList = async () => {
  const newGatheringList = await getNewGatheringList();

  if (newGatheringList.length === 0) {
    return (
      <div className="flex w-full flex-col items-center pb-12">
        <LottieNotFound text="모임을 작성해 보세요." />
      </div>
    );
  }

  return (
    <div className="mt-6 grid w-full grid-cols-3 items-center gap-4 p-1 max-[1024px]:grid-cols-2 max-[744px]:flex max-[744px]:w-fit">
      {newGatheringList.map((data) => (
        <NewGatheringItem key={data.gatheringId} data={data} />
      ))}
    </div>
  );
};
