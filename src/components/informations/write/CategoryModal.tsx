import { SUBCATEGORY } from "@/constants/informations/subCategory";
import { MdClose } from "react-icons/md";

type MyProps = {
  category: string;
  subCategory: string;
  setCategory: (category: string) => void;
  setSubCategory: (subCategory: string) => void;
  onCancel: () => void;
  onSave: () => void;
};

const CategoryModal = ({
  category,
  subCategory,
  setCategory,
  setSubCategory,
  onCancel,
  onSave,
}: MyProps) => {
  const subCategories = SUBCATEGORY[category];

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/25">
      <div className="flex h-fit w-[31.25rem] flex-col gap-8 rounded-xl bg-white p-8 max-[560px]:w-[90%] dark:bg-slate-800">
        <div className="flex flex-col gap-1">
          <div className="flex flex-row items-center justify-between">
            <h3 className="text-lg font-medium text-black dark:text-slate-200">
              카테고리 선택
            </h3>
            <MdClose
              className="cursor-pointer text-gray2 hover:text-main dark:text-slate-400"
              size={"2.5rem"}
              onClick={onCancel}
            />
          </div>
          <div className="flex flex-row items-center gap-2">
            <button
              className={
                `${
                  category === "restaurant"
                    ? "border-main bg-main font-black text-white"
                    : "text-gray1 dark:bg-slate-600 dark:text-slate-400"
                } ` +
                "rounded-full border-[0.0625rem] border-[#E9EBED] px-3 py-1 text-sm font-medium hover:scale-105"
              }
              type="button"
              onClick={() => setCategory("restaurant")}
            >
              맛집
            </button>
            <button
              className={
                `${
                  category === "accommodation"
                    ? "border-main bg-main font-black text-white"
                    : "text-gray1 dark:bg-slate-600 dark:text-slate-400"
                } ` +
                "rounded-full border-[0.0625rem] border-[#E9EBED] px-3 py-1 text-sm font-medium hover:scale-105"
              }
              type="button"
              onClick={() => setCategory("accommodation")}
            >
              숙박
            </button>
            <button
              className={
                `${
                  category === "activity"
                    ? "border-main bg-main font-black text-white"
                    : "text-gray1 dark:bg-slate-600 dark:text-slate-400"
                } ` +
                "rounded-full border-[0.0625rem] border-[#E9EBED] px-3 py-1 text-sm font-medium hover:scale-105"
              }
              type="button"
              onClick={() => setCategory("activity")}
            >
              액티비티
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          {subCategories.length !== 0 && (
            <h3 className="text-lg font-medium text-black dark:text-slate-200">
              소분류 선택
            </h3>
          )}
          <div className="flex flex-wrap items-center gap-2">
            {subCategories.slice(1).map((value, index) => (
              <button
                key={index}
                className={
                  `${subCategory === value.buttonText ? "border-main bg-main text-white" : "text-gray1 dark:bg-slate-600 dark:text-slate-400"} ` +
                  "rounded-full border-[0.0625rem] border-[#E9EBED] px-3 py-1 text-sm font-medium hover:scale-105"
                }
                type="button"
                onClick={() => setSubCategory(value.buttonText)}
              >
                {value.buttonText}
              </button>
            ))}
          </div>
          <div
            className={`${category === "" || subCategory === "" ? "hidden" : ""} flex w-full flex-row items-center justify-center py-4`}
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
