"use client";

import CategoryModal from "@/components/informations/write/CategoryModal";
import { CategoryResponseDto } from "@/types/CategoryDto";
import { useEffect, useState } from "react";
import { useFormContext } from "react-hook-form";

interface Props {
  closeModal: () => void;
}

const CategoryModalContainer = ({ closeModal }: Props) => {
  const [parentCategory, setParentCategory] = useState<number>(0);
  const [categories, setCategories] = useState<CategoryResponseDto[]>();
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

  const onCancel = () => {
    setParentCategory(0);
    formContext.setValue("categoryId", 0);
    formContext.trigger("categoryId");
    closeModal();
  };

  const onSave = () => {
    closeModal();
  };

  useEffect(() => {
    (async function () {
      const response = await fetch("/api/categories", {
        method: "GET",
        next: { revalidate: 60, tags: ["getCategoryList"] },
      });

      if (!response.ok) {
        throw new Error(response.statusText);
      }

      setCategories(await (response.json() as Promise<CategoryResponseDto[]>));
    })();
  }, []);

  return (
    <CategoryModal
      categories={categories}
      parentCategory={parentCategory}
      categoryId={formContext.getValues("categoryId")}
      setParentCategoryId={setParentCategoryId}
      setCategory={setCategory}
      onCancel={onCancel}
      onSave={onSave}
    />
  );
};

export default CategoryModalContainer;
