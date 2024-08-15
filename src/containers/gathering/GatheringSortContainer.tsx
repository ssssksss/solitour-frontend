import Dropdown from "@/components/common/dropdown/Dropdown";
import UrlQueryStringToObject from "@/utils/UrlQueryStringToObject";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface IGatheringSortContainer {

}

const OPTIONS = [{
    value: "",
    name: "최신순",
}, {
    value: "likes",
    name: "인기순",
}, {
    value: "views",
    name: "조회순",
}];

const GatheringSortContainer = (props: IGatheringSortContainer) => {
    const searchParams = useSearchParams();
    const [sort, setSort] = useState("");
    const sortHandler = (value: string) => {
        let _url = `/gathering?`;
        let temp = UrlQueryStringToObject(window.location.href) || {};
        delete temp.sort;
        if (value != "") {
        temp.sort = value;
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
        setSort(searchParams.get('sort') || "")
    },[searchParams])


  return (
      <>
        <Dropdown options={OPTIONS} dropdownHandler={sortHandler} value={sort} defaultValue={sort} />
      </>
  );
};
export default GatheringSortContainer

