import GatheringSearch from "@/components/gathering/GatheringSearch";
import UrlQueryStringToObject from "@/utils/UrlQueryStringToObject";
import { useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";

interface IGatheringSearchContainer {

}
const GatheringSearchContainer = (props: IGatheringSearchContainer) => {
    const keywordRef = useRef<HTMLInputElement>(null);
    const searchParams = useSearchParams();
    const searchHandler = (value: string) => {
    let _url = `/gathering?`;
    let temp = UrlQueryStringToObject(window.location.href) || {};
    delete temp.keyword;
    if (value != "") {
      temp.keyword = value;
    }
    Object.entries(temp).map(i => {
      _url += i[0]+"="+i[1]+"&"
    })      
    if (_url.endsWith("&")) {
      _url = _url.slice(0, -1);
    }
    window.history.pushState(null, "", _url);
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