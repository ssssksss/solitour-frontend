"use client";

import CategoryModal from "@/components/informations/write/CategoryModal";
import useEditorStore from "@/store/editorStore";
import { CategoryResponseDto } from "@/types/CategoryDto";
import { useEffect, useState } from "react";

interface Props {
  closeModal: () => void;
}

const CategoryModalContainer = ({ closeModal }: Props) => {
  const [parentCategory, setParentCategory] = useState<number>(0);
  const [categories, setCategories] = useState<CategoryResponseDto[]>();
  const { categoryId, setEditor } = useEditorStore();

  const setParentCategoryId = (parentCategoryId: number) => {
    setParentCategory(parentCategoryId);
    setEditor({
      categoryId: 0,
    });
  };

  const setCategoryId = (categoryId: number) => {
    setEditor({
      categoryId: categoryId,
    });
  };

  const onCancel = () => {
    setParentCategory(0);
    setEditor({ categoryId: 0 });
    closeModal();
  };

  const onSave = () => {
    closeModal();
  };

  useEffect(() => {
    (async function () {
      const response = await fetch("/api/categories", {
        method: "GET",
        cache: "force-cache",
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
      categoryId={categoryId}
      setParentCategoryId={setParentCategoryId}
      setCategoryId={setCategoryId}
      onCancel={onCancel}
      onSave={onSave}
    />
  );
};

export default CategoryModalContainer;
