import { SUBCATEGORY } from "@/constants/informations/subCategory";
import { MdClose } from "react-icons/md";

type MyProps = {
  category: string;
  subCategory: string;
  setCategory: (category: string) => void;
  setSubCategory: (subCategory: string) => void;
  onSave: () => void;
  onCancel: () => void;
};

const CategoryModal = ({
  category,
  subCategory,
  setCategory,
  setSubCategory,
  onSave,
  onCancel,
}: MyProps) => {
  const subCategories = SUBCATEGORY[category];
  console.log(`category: ${category}`);
  console.log(`subCategories: ${subCategories}`);

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/25">
      <div className="flex h-fit w-[31.25rem] flex-col gap-8 rounded-xl bg-white p-8">
        <h2 className="text-2xl font-black">카테고리 선택</h2>
        <div className="flex flex-col gap-1">
          <h3 className="text-lg font-bold text-black">카테고리</h3>
          <div className="flex flex-row items-center gap-2">
            <button
              className={
                `${
                  category === "맛집"
                    ? "border-main bg-main font-black text-white"
                    : "text-gray-500"
                } ` +
                "rounded-full border-2 border-[#E9EBED] px-3 py-1 font-semibold hover:scale-105"
              }
              type="button"
              onClick={() => setCategory("맛집")}
            >
              맛집
            </button>
            <button
              className={
                `${
                  category === "숙박"
                    ? "border-main bg-main font-black text-white"
                    : "text-gray-500"
                } ` +
                "rounded-full border-2 border-[#E9EBED] px-3 py-1 font-semibold hover:scale-105"
              }
              type="button"
              onClick={() => setCategory("숙박")}
            >
              숙박
            </button>
            <button
              className={
                `${
                  category === "액티비티"
                    ? "border-main bg-main font-black text-white"
                    : "text-gray-500"
                } ` +
                "rounded-full border-2 border-[#E9EBED] px-3 py-1 font-semibold hover:scale-105"
              }
              type="button"
              onClick={() => setCategory("액티비티")}
            >
              액티비티
            </button>
          </div>
        </div>
        <div className="flex flex-col gap-1">
          {subCategories.length !== 0 && (
            <h3 className="text-lg font-bold text-black">서브 카테고리</h3>
          )}
          <div className="flex flex-row items-center gap-1">
            {subCategories.map((value, index) => (
              <button
                key={index}
                className={
                  `${subCategory === value.buttonText ? "border-main bg-main text-white" : "text-gray1"} ` +
                  "rounded-full border-2 border-[#E9EBED] px-3 py-1 font-semibold hover:scale-105"
                }
                type="button"
                onClick={() => setSubCategory(value.buttonText)}
              >
                {value.buttonText}
              </button>
            ))}
          </div>
        </div>
        <div className="flex flex-row items-center justify-center gap-4">
          <button
            className={
              `${category === "" || subCategory === "" ? "hidden" : ""} ` +
              "flex h-11 w-20 items-center justify-center rounded-full bg-main font-black text-white shadow hover:scale-105"
            }
            type="button"
            onClick={onSave}
          >
            저장
          </button>
          <button
            className="flex h-11 w-20 items-center justify-center rounded-full bg-gray2 font-black text-white shadow hover:scale-105"
            type="button"
            onClick={onCancel}
          >
            취소
          </button>
        </div>
      </div>
    </div>
  );
};

export default CategoryModal;
