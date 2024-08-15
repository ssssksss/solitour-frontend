import UrlQueryStringToObject from "@/utils/UrlQueryStringToObject";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface IGatheringExcludeCompleteContainer {

}
const GatheringExcludeCompleteContainer = (props: IGatheringExcludeCompleteContainer) => {

   const [isExcludeCompleted, setIsExcludeCompleted] = useState(true);
   const searchParams = useSearchParams();
  const checkExcludeCompleteGatheringHandler = () => {
    setIsExcludeCompleted(prev => !prev);
    let _url = `/gathering?`;
    let temp = UrlQueryStringToObject(window.location.href) || {};
      delete temp.isExclude;
      if (isExcludeCompleted) {
        temp.isExclude = "false";
      }
      Object.entries(temp).map(i => {
        _url += i[0]+"="+i[1]+"&"
      })      
    if (_url.endsWith("&")) {
      _url = _url.slice(0, -1);
    }
    console.log("GatheringListContainer.tsx 파일 : ", _url);
    window.history.pushState(null, "", _url);
    } 
    
    useEffect(() => {
        setIsExcludeCompleted(searchParams.get('isExclude') ? false : true);
    },[searchParams])

  return (
        <button className={"flex gap-1 text-sm text-black font-medium items-center"}  onClick={checkExcludeCompleteGatheringHandler}>
            {
            isExcludeCompleted ?
            <Image src="/common/check-active-icon.svg" alt="location-icon" width={20} height={20} /> :
            <Image src="/common/check-empty-icon.svg" alt="location-icon" width={20} height={20} />
            }
            모집완료 제외
        </button>
  );
};
export default GatheringExcludeCompleteContainer