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

  const onClick = () => {
    if (category === "" || subCategory === "") {
      changeField("category", "");
      changeField("subCategory", "");
    }
    closeModal();
  };

  return (
    <CategoryModal
      category={category}
      subCategory={subCategory}
      setCategory={setCategory}
      setSubCategory={setSubCategory}
      onClick={onClick}
    />
  );
};

export default CategoryModalContainer;
