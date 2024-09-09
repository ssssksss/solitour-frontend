import LottieFile from "@/../public/lottie/list-not-found.json";
import { Gathering } from "@/types/GatheringDto";
import GatheringItem from "../../common/GatheringItem";
import LottieComponent from "../../common/lottie/LottieComponent";
interface IGatheringCardList {
    data: Gathering[]
}
const GatheringCardList = ({
  data,
}: IGatheringCardList) => {
  return (
    <>
    {data.length == 0 ? (
      <div className={"w-full flex flex-col items-center "}>
      <LottieComponent
        lottieFile={LottieFile}
        className={"w-[20rem]"}
      />
      <div> 찾는 내용이 없습니다. </div>
      </div>
    ) : 
    <div className="my-6 grid min-h-[20rem] w-full justify-items-center gap-x-3 gap-y-3 min-[745px]:grid-cols-2">
          {data?.map((i, index) => <GatheringItem key={i.gatheringId} data={i} />)}
        </div>
      }
      </>
  );
};
export default GatheringCardList