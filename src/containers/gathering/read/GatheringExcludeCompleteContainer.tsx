import GatheringExcludeComplete from "@/components/gathering/read/GatheringExcludeComplete";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const GatheringExcludeCompleteContainer = () => {
  const [isExclude, setIsExclude] = useState(true);
  const searchParams = useSearchParams();
  const [loading, setLoading] = useState(true);
  const checkExcludeCompleteGatheringHandler = () => {
    setIsExclude((prev) => !prev);
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.delete("isExclude");
    if (isExclude) {
      params.set("isExclude", "false");
    }
    params.set("page", "1");
    url.search = params.toString();
    window.history.pushState({}, "", url.toString());
  };

  useEffect(() => {
    setIsExclude(searchParams.get("isExclude") ? false : true);
    setLoading(false);
  }, [searchParams]);

  if (loading)
    return (
      <div className="relative flex h-[2rem] w-[4rem] flex-shrink-0 animate-pulse items-center rounded-xl bg-gray-300 text-left"></div>
    );

  return (
    <GatheringExcludeComplete
      isExclude={isExclude}
      checkExcludeCompleteGatheringHandler={
        checkExcludeCompleteGatheringHandler
      }
    />
  );
};
export default GatheringExcludeCompleteContainer;
