"use client";

import {
  getInformationCategoryList,
  InformationCategory,
} from "@/entities/information";
import { useToastifyStore } from "@/shared/model";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

export const useInformationCategoryModal = (closeModal: () => void) => {
  const [parentCategory, setParentCategory] = useState(0);
  const [categories, setCategories] = useState<InformationCategory[]>();
  const formContext = useFormContext();
  const { setToastifyState } = useToastifyStore();

  const setParentCategoryId = (parentCategoryId: number) => {
    setParentCategory(parentCategoryId);
    formContext.setValue("categoryId", 0);
    formContext.setValue("categoryName", "");
    formContext.watch();
  };

  const setCategory = (categoryId: number, categoryName: string) => {
    formContext.setValue("categoryId", categoryId);
    formContext.setValue("categoryName", categoryName);
    formContext.trigger("categoryId");
  };

  const handleCancelClick = () => {
    setParentCategory(0);
    formContext.setValue("categoryId", 0);
    formContext.trigger("categoryId");
    closeModal();
  };

  const handleSaveClick = () => {
    closeModal();
  };

  useEffect(() => {
    (async () => {
      try {
        const informationCategoryList = await getInformationCategoryList();
        setCategories(informationCategoryList);
      } catch (error) {
        setToastifyState({
          type: "error",
          message: "카테고리 조회에 실패했습니다.",
        });
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    categories,
    parentCategory,
    categoryId: formContext.getValues("categoryId"),
    setParentCategoryId,
    setCategory,
    handleCancelClick,
    handleSaveClick,
  };
};
