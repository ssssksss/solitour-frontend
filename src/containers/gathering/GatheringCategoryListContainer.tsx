import { GatheringCategoryListType } from "@/types/GatheringCategoryDto";
import UrlQueryStringToObject from "@/utils/UrlQueryStringToObject";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface IGatheringCategoryListContainer {
  gatheringCategoryList: GatheringCategoryListType;
}
const GatheringCategoryListContainer = ({ gatheringCategoryList }: IGatheringCategoryListContainer) => {
    const [activeGatheringCategoryId, setActiveGatheringCategoryId] = useState(0);
    const searchParams = useSearchParams();
    const changeGatheringCategoryHandler = (id: number) => {
        setActiveGatheringCategoryId(id);
        let _url = `/gathering?`;
        let temp = UrlQueryStringToObject(window.location.href) || {};
        delete temp.gatheringCategoryId;
        if (id != 0) {
        temp.gatheringCategoryId = id;
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
        setActiveGatheringCategoryId(+(searchParams.get('gatheringCategoryId') || 0));
    }, [searchParams])
  
  return (
              <div className="w-full flex justify-between">
    <div className="flex flex-wrap items-center gap-1">
              <button onClick={()=>changeGatheringCategoryHandler(0)} className={
            `rounded-full border-2 border-[#E9EBED] px-3 py-[0.375rem] text-sm font-medium hover:scale-105 ${activeGatheringCategoryId == 0 && "text-white bg-main"}`
          }> 전체 </button>
      {gatheringCategoryList.map((i) => (
        <button
          key={i.id}
          onClick={() => changeGatheringCategoryHandler(i.id)} className={
            `rounded-full border-2 border-[#E9EBED] px-3 py-[0.375rem] text-sm font-medium hover:scale-105 ${activeGatheringCategoryId == i.id && "text-white bg-main"}`
          }> {i.name} </button>
      ))}
    </div>
    </div>
  );
};
export default GatheringCategoryListContainer