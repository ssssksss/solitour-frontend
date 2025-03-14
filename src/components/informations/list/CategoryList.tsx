import ParentCategoryList from "./ParentCategoryList";
import ChildCategoryList from "./ChildCategoryList";
import InformationSearch from "./InformationSearch";
import { getInformationCategoryList } from "@/entities/information";

interface CategoryListProps {
  parentCategoryId: number;
  childCategoryId: number;
}

const CategoryList = async ({
  parentCategoryId,
  childCategoryId,
}: CategoryListProps) => {
  const categories = await getInformationCategoryList();

  return (
    <div className="mt-6 flex w-full flex-col gap-6">
      <ParentCategoryList
        categories={categories}
        parentCategoryId={parentCategoryId}
      />
      <div className="flex flex-row items-center justify-between max-[1024px]:flex-col-reverse max-[1024px]:items-start max-[1024px]:space-y-6 max-[1024px]:space-y-reverse">
        <ChildCategoryList
          categories={categories}
          parentCategoryId={parentCategoryId}
          childCategoryId={childCategoryId}
        />
        <InformationSearch />
      </div>
    </div>
  );
};

export default CategoryList;
