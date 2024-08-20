import Dropdown from "@/components/common/dropdown/Dropdown";
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
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);
        params.delete("sort");
        if (value) {
            params.set("sort", value);
        }
        url.search = params.toString();
        window.history.pushState({}, "", url.toString());
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

