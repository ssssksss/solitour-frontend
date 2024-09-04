"use client";

import GatheringCardList from "@/components/gathering/GatheringCardList";
import GatheringItemSkeleton from "@/components/skeleton/common/GatheringItemSkeleton";
import { Gathering, GatheringsResponse } from "@/types/GatheringDto";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import GatheringPaginationContainer from "./GatheringPaginationContainer";

const SkeletonGatheringList = () => {
  return (
    <div className="my-6 grid min-h-[20rem] w-full justify-items-center gap-x-3 gap-y-3 min-[745px]:grid-cols-2">
      {Array.from({ length: 6 }).map((_, index) => (
        <GatheringItemSkeleton key={index} />
      ))}
    </div>
  );
};

const GatheringCardListContainer = () => {
  const searchParams = useSearchParams();
  const [totalElements, setTotalElements] = useState(1);
  const [elements, setElements] = useState<Gathering[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(
    searchParams.get("page") ? Number(searchParams.get("page")) : 1,
  );

  useEffect(() => {
    const temp = async () => {
      try {
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);

        // 페이지 숫자인지 여부와 1보다 큰지 여부
        let page = params.get("page");
        let pageNumber =
          isNaN(Number(page)) || Number(page) <= 1 ? 0 : Number(page) - 1;
        params.set("page", pageNumber + "");
        url.search = params.toString();

        const response = await fetch("/api/gathering" + url.search, {
          cache: "no-store",
        });
        if (!response.ok) {
          setElements([]);
          setTotalElements(0);
          setPage(0);
          return;
        }
        const data: GatheringsResponse = await response.json();
        setElements(data.content);
        setTotalElements(data.totalElements);
        setPage(params.get("page") ? Number(params.get("page")) + 1 : 1);
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
        <>
          <GatheringCardList data={elements} />
          {
            elements.length != 0 &&
            <GatheringPaginationContainer
              currentPage={page}
              totalPages={Math.ceil(totalElements / 12) || 1}
            />
          }
        </>
      )}
    </>
  );
};
export default GatheringCardListContainer;
