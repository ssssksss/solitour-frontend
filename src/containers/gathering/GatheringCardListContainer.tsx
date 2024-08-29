"use client";

import GatheringCardList from "@/components/gathering/GatheringCardList";
import GatheringItemSkeleton from "@/components/skeleton/common/GatheringItemSkeleton";
import { Gathering, GatheringsResponse } from "@/types/GatheringDto";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
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
        if (params.get("page")) {
          params.set("page", Number(params.get("page")) - 1 + "");
          url.search = params.toString();
        }
        const response = await fetch("/api/gathering" + url.search, {
          cache: "no-store",
        });
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

  const onBookMarkClick = async (id: number) => {
    const data = new URLSearchParams();
    data.append("infoId", id.toString());

    const updatedElements = await Promise.all(
      elements.map(async (i) => {
        if (i.gatheringId === id) {
          if (i.isBookMark) {
            const response = await fetchWithAuth(`/api/bookmark/gathering`, {
              method: "DELETE",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: data.toString(),
              cache: "no-store",
            });

            if (!response.ok) {
              alert("북마크 취소에 실패하였습니다.");
              return i;
            }

            return { ...i, isBookMark: false };
          } else {
            const response = await fetchWithAuth(`/api/bookmark/gathering`, {
              method: "POST",
              headers: {
                "Content-Type": "application/x-www-form-urlencoded",
              },
              body: data.toString(),
              cache: "no-store",
            });

            if (!response.ok) {
              alert("북마크 추가에 실패하였습니다.");
              return i;
            }

            return { ...i, isBookMark: true };
          }
        }
        return i;
      }),
    );

    setElements(updatedElements);
  };

  return (
    <>
      {loading ? (
        <SkeletonGatheringList />
      ) : (
        <GatheringCardList
          data={elements}
          onBookMarkClick={onBookMarkClick}
        />
      )}
      <GatheringPaginationContainer
        currentPage={page}
        totalPages={Math.ceil(totalElements / 12) || 1}
      />
    </>
  );
};
export default GatheringCardListContainer;
