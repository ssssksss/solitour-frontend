"use client";

import {
  GatheringCategory,
  getGatheringCategoryList,
} from "@/entities/gathering";
import { useToastifyStore } from "@/shared/model";
import { useEffect, useState } from "react";

export const useGatheringEditorCategoryList = () => {
  const [categoryList, setCategoryList] = useState<GatheringCategory[]>([]);
  const { setToastifyState } = useToastifyStore();

  useEffect(() => {
    (async () => {
      try {
        const gatheringCategoryList = await getGatheringCategoryList();
        setCategoryList(gatheringCategoryList);
      } catch (error) {
        setToastifyState({
          type: "error",
          message: "카테고리 조회에 실패했습니다.",
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { categoryList };
};
