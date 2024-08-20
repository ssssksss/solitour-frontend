import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface IGatheringExcludeCompleteContainer {

}
const GatheringExcludeCompleteContainer = (props: IGatheringExcludeCompleteContainer) => {

   const [isExclude, setIsExclude] = useState(true);
   const searchParams = useSearchParams();
  const checkExcludeCompleteGatheringHandler = () => {
    setIsExclude(prev => !prev);
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.delete("isExclude");
    if (isExclude) {
      params.set("isExclude", "false");
    }
    params.set("page", "1");
    url.search = params.toString();
    window.history.pushState({}, "", url.toString());
    } 
    
    useEffect(() => {
        setIsExclude(searchParams.get('isExclude') ? false : true);
    },[searchParams])

  return (
        <button className={"flex gap-1 text-sm text-black font-medium items-center"}  onClick={checkExcludeCompleteGatheringHandler}>
            {
            isExclude ?
            <Image src="/common/check-active-icon.svg" alt="location-icon" width={20} height={20} /> :
            <Image src="/common/check-empty-icon.svg" alt="location-icon" width={20} height={20} />
            }
            모집완료 제외
        </button>
  );
};
export default GatheringExcludeCompleteContainer