import CategoryModal from "@/components/informations/write/CategoryModal";
import useEditorStore from "@/store/editorStore";

type MyProps = {
  closeModal: () => void;
};

const CategoryModalContainer = ({ closeModal }: MyProps) => {
  const { category, subCategory, changeField } = useEditorStore();

  const setCategory = (category: string) => {
    changeField("category", category);
    changeField("subCategory", "");
  };

  const setSubCategory = (subCategory: string) => {
    changeField("subCategory", subCategory);
  };

  const onSave = () => {
    closeModal();
  };

  const onCancel = () => {
    changeField("category", "");
    changeField("subCategory", "");
    closeModal();
  };

  return (
    <CategoryModal
      category={category}
      subCategory={subCategory}
      setCategory={setCategory}
      setSubCategory={setSubCategory}
      onSave={onSave}
      onCancel={onCancel}
    />
  );
};

export default CategoryModalContainer;
