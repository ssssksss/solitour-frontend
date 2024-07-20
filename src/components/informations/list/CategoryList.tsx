import { CategoryResponseDto } from "@/types/CategoryDto";
import ParentCategoryList from "./ParentCategoryList";
import ChildCategoryList from "./ChildCategoryList";
import InformationSearchContainer from "@/containers/informations/list/InformationSearchContainer";

async function getCategoryList() {
  await new Promise((resolve) => setTimeout(resolve, 2000));

  const response = await fetch(`${process.env.BACKEND_URL}/api/categories`, {
    method: "GET",
    cache: "force-cache",
    next: { tags: ["getCategoryList"] },
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
  const parentCategoryId = categories
    .map((parentCategory) => parentCategory.id)
    .includes(categoryId)
    ? categoryId
    : categories.find((parentCategory) =>
        parentCategory.childrenCategories
          .map((childCategory) => childCategory.id)
          .includes(categoryId),
      )!.id;
  const childCategoryId = categoryId;

  return (
    <div className="mt-6 flex w-[60rem] flex-col gap-6 max-[1024px]:w-[39.75rem] max-[744px]:w-[calc(100%_-_48px)]">
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
        <InformationSearchContainer />
      </div>
    </div>
  );
};

export default CategoryList;
