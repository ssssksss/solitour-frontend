import GatheringSearch from "@/components/gathering/read/GatheringSearch";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

interface IGatheringSearchContainer {}
const GatheringSearchContainer = (props: IGatheringSearchContainer) => {
  const searchParams = useSearchParams();
  const [searchValue, setSearchValue] = useState<string>(
    searchParams.get("search") || searchParams.get("tagName") || "",
  );
  const [dropdownValue, setDropdownValue] = useState(
    searchParams.get("tagName") != null ? "태그" : "제목",
  );
  const [loading, setLoading] = useState(true);

  const searchHandler = () => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    if (dropdownValue == "태그") {
      // 태그 검색일 경우
      params.set("tagName", searchValue);
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
  };

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

  useEffect(() => {
    const url = new URL(window.location.href);
    const params = new URLSearchParams(url.search);
    setSearchValue(params.get("search") || params.get("tagName") || "");
    setDropdownValue(params.get("tagName") != null ? "태그" : "제목");
    setLoading(false);
  }, [searchParams]);

  return (
    <GatheringSearch
      dropDownHandler={dropDownHandler}
      dropdownValue={dropdownValue}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
      searchHandler={searchHandler}
      loading={loading}
    />
  );
};
export default GatheringSearchContainer;
