"use client";

import { useUserStore } from "@/entities/user";
import { fetchWithAuth } from "@/shared/api";
import { useState } from "react";

export const useInformationBookmark = (
  informationId: number,
  initialIsBookmarked: boolean,
) => {
  const userId = useUserStore().id;
  const [isBookmarked, setIsBookmarked] = useState(initialIsBookmarked);
  const [loading, setLoading] = useState(false);

  const handleBookmarkClick = async () => {
    if (loading) {
      return;
    }

    setLoading(true);
    const data = new URLSearchParams();
    data.append("infoId", informationId.toString());

    if (isBookmarked) {
      setIsBookmarked(false);

      const response = await fetchWithAuth("/api/bookmark/information", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data.toString(),
        cache: "no-store",
      });

      if (!response.ok) {
        setIsBookmarked(true);
        setLoading(false);
        alert("북마크 취소에 실패하였습니다.");
        throw new Error(response.statusText);
      }
    } else {
      setIsBookmarked(true);

      const response = await fetchWithAuth("/api/bookmark/information", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data.toString(),
        cache: "no-store",
      });

      if (!response.ok) {
        setIsBookmarked(false);
        setLoading(false);
        alert("북마크 등록에 실패하였습니다.");
        throw new Error(response.statusText);
      }
    }

    setLoading(false);
  };

  return { userId, isBookmarked, handleBookmarkClick };
};
