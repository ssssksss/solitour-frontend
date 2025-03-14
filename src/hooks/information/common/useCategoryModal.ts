"use client";

import { InformationCategory } from "@/entities/information/model/informationCategoryDto";
import { fetchWithAuth } from "@/shared/api/fetchWithAuth";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

export const useCategoryModal = (closeModal: () => void) => {
  const [parentCategory, setParentCategory] = useState(0);
  const [categories, setCategories] = useState<InformationCategory[]>();
  const formContext = useFormContext();

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
    (async function () {
      const response = await fetchWithAuth("/api/categories", {
        method: "GET",
        next: { revalidate: 60, tags: ["getCategoryList"] },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      setCategories(await (response.json() as Promise<InformationCategory[]>));
    })();
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
