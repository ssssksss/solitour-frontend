import LottieNotFound from "@/components/common/lottie/LottieNotFound";
import { Gathering } from "@/types/GatheringDto";
import GatheringItem from "../../common/GatheringItem";
interface IGatheringCardList {
  data: Gathering[];
}
const GatheringCardList = ({ data }: IGatheringCardList) => {
  return (
    <>
      {data.length == 0 ? (
        <div className={"flex w-full flex-col items-center"}>
          <LottieNotFound text={"찾는 내용이 없습니다."} />
        </div>
      ) : (
        <div className="mt-6 grid h-auto w-full justify-items-center gap-5 min-[744px]:grid-cols-2 min-[1024px]:grid-cols-3">
          {data?.map((i, index) => (
            <GatheringItem key={i.gatheringId} data={i} />
          ))}
        </div>
      )}
    </>
  );
};
export default GatheringCardList;
