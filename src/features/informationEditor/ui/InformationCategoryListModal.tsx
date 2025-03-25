"use client";

import { MdClose } from "react-icons/md";
import { useInformationCategoryModal } from "../model/useInformationCategoryModal";
import { ModalTemplate } from "@/shared/ui/modal";

interface InformationCategoryListModalProps {
  closeModal: () => void;
}

export const InformationCategoryListModal = ({
  closeModal,
}: InformationCategoryListModalProps) => {
  const {
    categories,
    parentCategory,
    categoryId,
    setParentCategoryId,
    setCategory,
    handleCancelClick,
    handleSaveClick,
  } = useInformationCategoryModal(closeModal);

  return (
    <ModalTemplate
      className="w-[31.25rem] gap-8 p-6 max-[744px]:w-[calc(100%_-_48px)]"
      closeModal={handleCancelClick}
    >
      <div className="flex w-full flex-col gap-1">
        <h3 className="text-lg font-medium text-black">카테고리 선택</h3>
        <div className="flex flex-row flex-wrap items-center gap-2">
          {categories?.map((category, index) => (
            <button
              key={index}
              className={
                `${parentCategory === category.id ? "border-main bg-main font-black text-white" : "text-gray1"} ` +
                "rounded-full border border-[#E9EBED] px-3 py-1 text-sm font-medium hover:scale-105"
              }
              type="button"
              onClick={() => setParentCategoryId(category.id)}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>
      <div className="flex w-full flex-col gap-2">
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
                  "rounded-full border border-[#E9EBED] px-3 py-1 text-sm font-medium hover:scale-105"
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
            className="bg-main h-[2.625rem] w-[9.5rem] rounded-full font-medium text-white shadow-sm hover:scale-105"
            type="button"
            onClick={handleSaveClick}
          >
            적용하기
          </button>
        </div>
      </div>
    </ModalTemplate>
  );
};
