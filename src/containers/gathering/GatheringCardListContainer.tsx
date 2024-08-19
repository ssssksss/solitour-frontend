"use client"

import GatheringCardList from "@/components/gathering/GatheringCardList";
import GatheringItemSkeleton from "@/components/skeleton/common/GatheringItemSkeleton";
import { Gathering, GatheringsResponse } from "@/types/GatheringDto";
import UrlQueryStringToObject from "@/utils/UrlQueryStringToObject";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import PaginationContainer from "../common/PaginationContainer";

const SkeletonGatheringList = () => {
  return (
    <div className="my-6 grid min-h-[20rem] w-full justify-items-center gap-x-3 gap-y-3 min-[745px]:grid-cols-2">
      {Array.from({ length: 12 }).map((_, index) => (
        <GatheringItemSkeleton key={index} />
      ))}
    </div>
  );
};

const GatheringCardListContainer = () => {
  const searchParams = useSearchParams();
  const [page, setPage] = useState(searchParams.get("page") || 0);
  const [totalElements, setTotalElements] = useState(1);
  const [gatherings, setGatherings] = useState<Gathering[]>([]);
  const [loading, setLoading] = useState(true);
  const changeGatheringPageHandler = (id: number) => {
    let _url = `/gathering?`;
    let temp = UrlQueryStringToObject(window.location.href) || {};
    if (page != 0) {
      temp.page = id;
    }
    Object.entries(temp).map((i) => {
      _url += i[0] + "=" + i[1] + "&";
    });
    if (_url.endsWith("&")) {
      _url = _url.slice(0, -1);
    }
    window.history.pushState(null, "", _url);
  };

  useEffect(() => {
    const temp = async () => {
      try {
        const queryParams = UrlQueryStringToObject(window.location.href);
        let url = "api/gathering";
        if (queryParams != undefined) {
          url += "?";
          Object.entries(queryParams).map((i) => {
            url += i[0] + "=" + i[1] + "&";
          });
          url = url.slice(0, -1);
        }
        const response = await fetch(url);
        const data: GatheringsResponse = await response.json();
        setGatherings(data.content);
        setTotalElements(data.totalElements);
      } finally {
        setLoading(false);
      }
    };
    temp();
  }, [searchParams]);

  return (
    <>
      {loading ? (
        <SkeletonGatheringList />
      ) : (
        <div>
          <GatheringCardList data={gatherings} />
          <PaginationContainer
            currentPage={+page}
            totalPages={Math.ceil(totalElements / 12)}
          />
        </div>
      )}
    </>
  );
};
export default GatheringCardListContainer