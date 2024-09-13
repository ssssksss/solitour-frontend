import Image from "next/image";

interface IGatheringExcludeComplete {
  checkExcludeCompleteGatheringHandler: () => void;
  isExclude: boolean;
}
const GatheringExcludeComplete = ({checkExcludeCompleteGatheringHandler ,isExclude}: IGatheringExcludeComplete) => {

  return (
<button
  className="flex flex-shrink-0 items-center gap-1 text-sm font-medium text-black"
  onClick={checkExcludeCompleteGatheringHandler}
>
  {isExclude ? (
    <Image
      src="/common/check-active-icon.svg"
      alt="location-icon"
      width={20}
      height={20}
    />
  ) : (
    <Image
      src="/common/check-empty-icon.svg"
      alt="location-icon"
      width={20}
      height={20}
    />
  )}
      <div className="flex min-w-[5.25rem] w-auto items-center justify-start">
        모집 완료 제외
  </div>
</button>
  );
};
export default GatheringExcludeComplete