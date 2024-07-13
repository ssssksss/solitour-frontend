"use client";

import CategoryModal from "@/components/informations/write/CategoryModal";
import useEditorStore from "@/store/editorStore";

interface Props {
  closeModal: () => void;
}

const CategoryModalContainer = ({ closeModal }: Props) => {
  const { category, subCategory, setEditor } = useEditorStore();

  const setCategory = (category: string) => {
    setEditor({
      category: category,
      subCategory: "",
    });
  };

  const setSubCategory = (subCategory: string) => {
    setEditor({ subCategory: subCategory });
  };

  const onCancel = () => {
    setEditor({ category: "", subCategory: "" });
    closeModal();
  };

  const onSave = () => {
    closeModal();
  };

  return (
    <CategoryModal
      category={category}
      subCategory={subCategory}
      setCategory={setCategory}
      setSubCategory={setSubCategory}
      onCancel={onCancel}
      onSave={onSave}
    />
  );
};

export default CategoryModalContainer;
