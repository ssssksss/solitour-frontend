import GatheringSearch from "@/components/gathering/GatheringSearch";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

interface IGatheringSearchContainer {

}
const GatheringSearchContainer = (props: IGatheringSearchContainer) => {
    const keywordRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  
    const searchHandler = (value: string) => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
      if (value == params.get("keyword")) return;
      value == "" ? params.delete("keyword") : params.set("keyword", value);
      params.delete("page");
      url.search = params.toString();
      window.history.pushState({}, "", url.toString());
    }

    
    useEffect(() => {
        if (keywordRef.current) {
            keywordRef.current.value = searchParams.get('keyword') || '';
        }
    },[searchParams])
    
  return (
      <GatheringSearch keywordRef={keywordRef} searchHandler={searchHandler} /> 
  );
};
export default GatheringSearchContainer