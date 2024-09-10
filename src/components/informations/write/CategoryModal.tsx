import { CategoryResponseDto } from "@/types/CategoryDto";
import { MdClose } from "react-icons/md";

interface Props {
  categories?: CategoryResponseDto[];
  parentCategory: number;
  categoryId: number;
  setParentCategoryId: (parentCategoryId: number) => void;
  setCategory: (categoryId: number, categoryName: string) => void;
  onCancel: () => void;
  onSave: () => void;
}

const CategoryModal = ({
  categories,
  parentCategory,
  categoryId,
  setParentCategoryId,
  setCategory,
  onCancel,
  onSave,
}: Props) => {
  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/25">
      <div className="flex h-fit w-[31.25rem] flex-col gap-8 rounded-xl bg-white p-8 max-[560px]:w-[90%]">
        <div className="flex flex-col gap-1">
          <div className="flex flex-row items-center justify-between">
            <h3 className="text-lg font-medium text-black">카테고리 선택</h3>
            <MdClose
              className="cursor-pointer text-gray2 hover:text-main"
              size={"2.5rem"}
              onClick={onCancel}
            />
          </div>
          <div className="flex flex-row flex-wrap items-center gap-2">
            {categories?.map((category, index) => (
              <button
                key={index}
                className={
                  `${parentCategory === category.id ? "border-main bg-main font-black text-white" : "text-gray1"} ` +
                  "rounded-full border-[0.0625rem] border-[#E9EBED] px-3 py-1 text-sm font-medium hover:scale-105"
                }
                type="button"
                onClick={() => setParentCategoryId(category.id)}
              >
                {category.name}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {parentCategory !== 0 && (
            <h3 className="text-lg font-medium text-black">소분류 선택</h3>
          )}
          <div className="flex flex-row flex-wrap items-center gap-2">
            {categories
              ?.find((category) => parentCategory === category.id)
              ?.childrenCategories?.map((category, index) => (
                <button
                  key={index}
                  className={
                    `${categoryId === category.id ? "border-main bg-main text-white" : "text-gray1"} ` +
                    "rounded-full border-[0.0625rem] border-[#E9EBED] px-3 py-1 text-sm font-medium hover:scale-105"
                  }
                  type="button"
                  onClick={() =>
                    setCategory(
                      category.id,
                      `${categories.find((category) => category.id === parentCategory)?.name} - ${category.name}`,
                    )
                  }
                >
                  {category.name}
                </button>
              ))}
          </div>
          <div
            className={`${parentCategory === 0 || categoryId === 0 ? "hidden" : ""} flex w-full flex-row items-center justify-center py-4`}
          >
            <button
              className="h-11 w-[9.5rem] rounded-full bg-main font-medium text-white shadow hover:scale-105"
              type="button"
              onClick={onSave}
            >
              적용하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
