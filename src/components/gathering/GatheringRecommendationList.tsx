"use client"

import { Gathering, GatheringRecommend } from "@/types/GatheringDto";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useState } from "react";
import GatheringItem from "../common/GatheringItem";

const GatheringRecommendationList = ({data}: {data: GatheringRecommend[]}) => {
  const [elements, setElements] = useState<Gathering[]>(data);
  // TODO
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
    <div className="my-[2.875rem] flex w-full flex-col">
      <h2 className="text-2xl font-bold text-black">추천 모임 정보</h2>
      <div className="my-6 grid min-h-[20rem] w-full justify-items-center gap-x-3 gap-y-3 min-[745px]:grid-cols-2">
        {data.map((i, index) => (
          <GatheringItem
            key={i.gatheringId}
            data={i}
            onBookMarkClick={onBookMarkClick}
          />
        ))}
      </div>
    </div>
  );
};

export default GatheringRecommendationList;
