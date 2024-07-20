import { CategoryResponseDto } from "@/types/CategoryDto";
import ParentCategoryList from "./ParentCategoryList";
import ChildCategoryList from "./ChildCategoryList";
import InformationSearchContainer from "@/containers/informations/list/InformationSearchContainer";

async function getCategoryList() {
  const response = await fetch(`${process.env.BACKEND_URL}/api/categories`, {
    method: "GET",
    cache: "force-cache",
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json() as Promise<CategoryResponseDto[]>;
}

interface Props {
  categoryId: number;
}

const CategoryList = async ({ categoryId }: Props) => {
  const categories = await getCategoryList();

  return (
    <div className="mt-6 flex w-[60rem] flex-col gap-6 max-[1024px]:w-[39.75rem] max-[744px]:w-[calc(100%_-_48px)]">
      <ParentCategoryList categories={categories} categoryId={categoryId} />
      <div className="flex flex-row items-center justify-between max-[1024px]:flex-col-reverse max-[1024px]:items-start max-[1024px]:space-y-6 max-[1024px]:space-y-reverse">
        <ChildCategoryList categories={categories} categoryId={categoryId} />
        <InformationSearchContainer />
      </div>
    </div>
  );
};

export default CategoryList;
