"use client";

import CategoryModal from "@/components/informations/write/CategoryModal";
import useEditorStore from "@/store/editorStore";
import { useState } from "react";

interface Props {
  closeModal: () => void;
}

const CategoryModalContainer = ({ closeModal }: Props) => {
  const [parentCategory, setParentCategory] = useState<number>(0);
  const { categoryId, setEditor } = useEditorStore();

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

  return (
    <CategoryModal
      parentCategory={parentCategory}
      categoryId={categoryId}
      setParentCategory={setParentCategory}
      setCategoryId={setCategoryId}
      onCancel={onCancel}
      onSave={onSave}
    />
  );
};

export default CategoryModalContainer;
