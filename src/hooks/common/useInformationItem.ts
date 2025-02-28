"use client";

import useAuthStore from "@/stores/authStore";
import { fetchWithAuth } from "@/utils/fetchWithAuth";
import { useMemo, useState } from "react";

export const useInformationItem = (
  informationId: number,
  categoryName: string,
  initialIsBookMark: boolean,
) => {
  const userId = useAuthStore().id;
  const [isBookMarked, setIsBookMarked] = useState(initialIsBookMark);
  const [loading, setLoading] = useState(false);
  const categoryTagStyle = useMemo(() => {
    switch (categoryName) {
      case "맛집":
      case "혼카페":
      case "혼밥":
      case "혼술":
        return "border-[#FFDDEF] bg-[#FFF2F9] text-[#C5006A]";
      case "숙박":
      case "호텔/펜션":
      case "게스트하우스":
      case "모텔":
      case "홈/빌라":
      case "한옥":
        return "border-[#BEEDEA] bg-[#E7FFFB] text-[#009CBE]";
      case "액티비티":
      case "레저":
      case "관광지":
      case "전시":
      case "편집/소품샵":
        return "border-[#DDE5FF] bg-[#F2F6FF] text-[#0036C2]";
      default:
        return "";
    }
  }, [categoryName]);

  const handleBookMarkClick = async () => {
    if (loading) {
      return;
    }

    setLoading(true);
    const data = new URLSearchParams();
    data.append("infoId", informationId.toString());

    if (isBookMarked) {
      setIsBookMarked(false);

      const response = await fetchWithAuth("/api/bookmark/information", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data.toString(),
        cache: "no-store",
      });

      if (!response.ok) {
        setIsBookMarked(true);
        setLoading(false);
        alert("북마크 취소에 실패하였습니다.");
        throw new Error(response.statusText);
      }
    } else {
      setIsBookMarked(true);

      const response = await fetchWithAuth("/api/bookmark/information", {
        method: "POST",
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
        body: data.toString(),
        cache: "no-store",
      });

      if (!response.ok) {
        setIsBookMarked(false);
        setLoading(false);
        alert("북마크 등록에 실패하였습니다.");
        throw new Error(response.statusText);
      }
    }

    setLoading(false);
  };

  return { userId, isBookMarked, categoryTagStyle, handleBookMarkClick };
};
