import GatheringEditorCategory from "@/components/gathering/createUpdate/editor/GatheringEditorCategory";
import useModalState from "@/hooks/useModalState";
import { useEffect, useState } from "react";

interface ICategory {
  id: number;
  name: string;
  childrenCategories: ICategory[];
}

interface IGatheringEditorCategoryContainer {
  
}
const GatheringEditorCategoryContainer = (props: IGatheringEditorCategoryContainer) => {
  const modalState = useModalState();
      const [categoryList, setCategoryList] = useState<ICategory[]>([]);

      useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(`/api/gathering/category`);
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            const result = await response.json();
            setCategoryList(result);
          } catch (error) {}
        };

        fetchData();
      }, []);
  
  return <GatheringEditorCategory modalState={modalState} categoryList={categoryList} />;
};
export default GatheringEditorCategoryContainer