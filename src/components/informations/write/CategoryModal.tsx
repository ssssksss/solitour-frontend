import { SUBCATEGORY } from "@/constants/informations/subCategory";
import { MdClose } from "react-icons/md";

type MyProps = {
  category: string;
  subCategory: string;
  setCategory: (category: string) => void;
  setSubCategory: (subCategory: string) => void;
  onClick: () => void;
};

const CategoryModal = ({
  category,
  subCategory,
  setCategory,
  setSubCategory,
  onClick,
}: MyProps) => {
  const subCategories = SUBCATEGORY[category];

  return (
    <div className="fixed left-0 top-0 z-50 flex h-full w-full items-center justify-center bg-black/25">
      <div className="flex h-fit w-[31.25rem] flex-col gap-8 rounded-xl bg-white p-8 max-[560px]:w-[90%]">
        <div className="flex flex-col gap-1">
          <div className="flex flex-row items-center justify-between">
            <h3 className="text-lg font-bold text-black">카테고리 선택</h3>
            <MdClose
              className="cursor-pointer text-gray2 hover:text-main"
              size={"2.5rem"}
              onClick={onClick}
            />
          </div>
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
            <h3 className="text-lg font-bold text-black">소분류 선택</h3>
          )}
          <div className="flex flex-wrap items-center gap-1">
            {subCategories.slice(1).map((value, index) => (
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
      </div>
    </div>
  );
};

export default CategoryModal;
