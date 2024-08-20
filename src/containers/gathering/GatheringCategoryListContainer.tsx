import { GatheringCategoryListType } from "@/types/GatheringCategoryDto";
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
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
      if ((params.get("category") || 0) != id) {
        params.delete("page");
      }
        id == 0 ? params.delete("category") : params.set("category", id + ""); 
        url.search = params.toString();
        window.history.pushState({}, "", url.toString());
    }

    useEffect(() => {
        setActiveGatheringCategoryId(+(searchParams.get('category') || 0));
    }, [searchParams])
  
  return (
              <div className="w-full flex justify-between">
    <div className="flex flex-wrap items-center gap-1">
              <button onClick={()=>changeGatheringCategoryHandler(0)} className={
            `rounded-full border-2 border-[#E9EBED] px-3 py-[0.375rem] text-sm font-medium hover:scale-105 ${activeGatheringCategoryId == 0 ? "text-white bg-main" : "outline outline-[1px] outline-offset-[-1px] outline-main"}`
          }> 전체 </button>
      {gatheringCategoryList.map((i) => (
        <button
          key={i.id}
          onClick={() => changeGatheringCategoryHandler(i.id)} className={
            `rounded-full border-2 border-[#E9EBED] px-3 py-[0.375rem] text-sm font-medium hover:scale-105 ${activeGatheringCategoryId == i.id ? "text-white bg-main" : "outline outline-[1px] outline-offset-[-1px] outline-main"}`
          }> {i.name} </button>
      ))}
    </div>
    </div>
  );
};
export default GatheringCategoryListContainer