"use client";

import { getMyPageInformationList, Information } from "@/entities/information";
import { useToastifyStore } from "@/shared/model";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export const useMyPageInformationList = () => {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") ?? "";
  const currentPage = Number(searchParams.get("page") ?? 1);
  const [elements, setElements] = useState<Information[]>([]);
  const [totalElements, setTotalElements] = useState(0);
  const [loading, setLoading] = useState(true);
  const { setToastifyState } = useToastifyStore();

  const handleCategoryClick = (value: string) => {
    const url = new URL(window.location.href);
    url.searchParams.delete("page");
    url.searchParams.set("category", value);
    window.history.pushState(null, "", url.toString());
  };

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const myPageInformationList = await getMyPageInformationList(
          category!,
          currentPage,
        );

        setElements(myPageInformationList.content);
        setTotalElements(myPageInformationList.page.totalElements);
      } catch (error) {
        setToastifyState({
          type: "error",
          message: "정보 조회에 실패했습니다.",
        });
        setElements([]);
        setTotalElements(0);
      } finally {
        setLoading(false);
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return {
    category,
    currentPage,
    elements,
    totalElements,
    loading,
    handleCategoryClick,
  };
};
