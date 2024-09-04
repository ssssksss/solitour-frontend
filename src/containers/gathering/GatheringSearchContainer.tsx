import GatheringSearch from "@/components/gathering/GatheringSearch";
import useModalState from "@/hooks/useModalState";
import { useSearchParams } from 'next/navigation';
import { useState } from "react";

interface IGatheringSearchContainer {

}
const GatheringSearchContainer = (props: IGatheringSearchContainer) => {
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState<string>(searchParams.get("search") || searchParams.get("tagName") ||  "");
  const modalState = useModalState();
  const [dropdownValue, setDropdownValue] = useState(
    searchParams.get("tagName") != null ? "태그" : "제목",
  );

  const searchHandler = () => {
      const url = new URL(window.location.href);
      const params = new URLSearchParams(url.search);
    if (searchParams.get("tagName")) {
      // 태그 검색일 경우
      if (searchValue == params.get("tagName")) return;
      searchValue == ""
        ? params.delete("tagName")
        : params.set("tagName", searchValue);
      params.delete("page");
      url.search = params.toString();
      window.history.pushState({}, "", url.toString());
    } else {
      // 일반 검색일 경우
        if (searchValue == params.get("search")) return;
        searchValue == ""
          ? params.delete("search")
          : params.set("search", searchValue);
        params.delete("page");
        url.search = params.toString();
        window.history.pushState({}, "", url.toString());
    }
  }
  
  const dropDownHandler = (value: string) => {
    setDropdownValue(value);
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    params.delete("page");
    if (value == "제목") {
      params.delete("tagName");
      url.search = params.toString();
      window.history.pushState({}, "", url.toString());
      return;
    }
    params.delete("search");
    // 태그 검색인 경우 글자 수 제한이 15글자이므로 글자를 제거해주는 작업
    setSearchValue(searchValue.trim().slice(0, 15));
    params.set("tagName", searchValue.trim().slice(0, 15) || "");
    url.search = params.toString();
    window.history.pushState({}, "", url.toString());
  };

  return (
    <GatheringSearch
      modalState={modalState}
      dropDownHandler={dropDownHandler}
      dropdownValue={dropdownValue}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchHandler={searchHandler}
    />
  );
};
export default GatheringSearchContainer