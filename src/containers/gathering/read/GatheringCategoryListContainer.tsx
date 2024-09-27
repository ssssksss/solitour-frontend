import GatheringCategoryList from "@/components/gathering/read/GatheringCategoryList";
import { GatheringCategoryListType } from "@/types/GatheringCategoryDto";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface IGatheringCategoryListContainer {
  gatheringCategoryList: GatheringCategoryListType;
}
const GatheringCategoryListContainer = ({
  gatheringCategoryList,
}: IGatheringCategoryListContainer) => {
  const [activeGatheringCategoryId, setActiveGatheringCategoryId] = useState(0);
  const [loading, setLoading] = useState(true);
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
  };

  useEffect(() => {
    setActiveGatheringCategoryId(+(searchParams.get("category") || 0));
    setLoading(false);
  }, [searchParams]);


  return (
    <GatheringCategoryList
      changeGatheringCategoryHandler={changeGatheringCategoryHandler}
      gatheringCategoryList={gatheringCategoryList}
      loading={loading}
      activeGatheringCategoryId={activeGatheringCategoryId}
    />
  );
};
export default GatheringCategoryListContainer;