import GatheringCardList from "@/components/gathering/GatheringCardList";
import UrlQueryStringToObject from "@/utils/UrlQueryStringToObject";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PaginationContainer from "../common/PaginationContainer";

interface IGatheringCardListContainer {

}
const GatheringCardListContainer = (props: IGatheringCardListContainer) => {
    const searchParams = useSearchParams();
    const [page, setPage] = useState(searchParams.get('page') || 0);
    const [totalData, setTotalData] = useState(10);
    const changeGatheringPageHandler = (id: number) => {
        let _url = `/gathering?`;
        let temp = UrlQueryStringToObject(window.location.href) || {};
        if (page != 0) {
            temp.page = id;
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
        
    }, [searchParams])
    return (
    <div>
        <GatheringCardList data={[]} />
        <PaginationContainer currentPage={+page} totalPages={totalData} />
      </div>
  );
};
export default GatheringCardListContainer