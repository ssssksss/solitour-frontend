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
    name: "좋아요순",
}, {
    value: "views",
    name: "조회순",
}];


const GatheringSortContainer = (props: IGatheringSortContainer) => {

  const searchParams = useSearchParams();
    const [sort, setSort] = useState<string>("");
    const [loading, setLoading] = useState(true);
    
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
        setSort(searchParams.get('sort') || "");
        setLoading(false);
    },[searchParams])

    if (loading) return (
      <div
        className={`relative flex h-[2rem] w-[3rem] flex-shrink-0 animate-pulse items-center bg-gray-300 text-left rounded-xl`}
      ></div>
    );
  return (
    <Dropdown
      options={OPTIONS}
      dropdownHandler={sortHandler}
      value={sort}
      defaultValue={sort}
      dropdownContainerStyle={{
        w: "w-[3.5rem]",
        style: "",
      }}
      dropdownOptionStyle={{
        w: "w-[8rem]",
        style: "mt-[2rem] rounded-xl",
        transformX: "translateX(calc(3.5rem - 100%))",
      }}
    />
  );
};
export default GatheringSortContainer

