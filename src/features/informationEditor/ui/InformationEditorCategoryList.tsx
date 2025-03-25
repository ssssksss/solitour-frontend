"use client";

import { useModal } from "@/shared/lib/hooks";
import { useFormContext } from "react-hook-form";
import { IoIosArrowDown } from "react-icons/io";
import { InformationCategoryListModal } from "./InformationCategoryListModal";
import { Modal } from "@/shared/ui/modal";

export const InformationEditorCategoryList = () => {
  const formContext = useFormContext();
  const { isOpen, openModal, closeModal } = useModal();

  const openCategoryListModal = () => {
    formContext.setValue("categoryId", 0);
    openModal();
  };

  return (
    <div className="relative">
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <InformationCategoryListModal closeModal={closeModal} />
      </Modal>
      <button
        className={[
          formContext.formState.errors.categoryId
            ? "border-red-500"
            : "border-gray3 hover:border-main",
          "flex h-[3.3125rem] grow flex-row items-center justify-between gap-1 rounded-full border px-7 py-3 text-lg font-semibold",
        ].join(" ")}
        type="button"
        onClick={openCategoryListModal}
      >
        {formContext.getValues("categoryId") !== 0 ? (
          formContext.getValues("categoryName")
        ) : (
          <p className="flex flex-row items-center">
            {"카테고리 선택"}
            <span className="text-main">*</span>
          </p>
        )}
        <IoIosArrowDown />
      </button>
      {formContext.formState.errors.categoryId && (
        <p className="absolute -bottom-6 left-4 mt-1 text-xs font-medium text-red-500">
          {formContext.formState.errors.categoryId.message as String}
        </p>
      )}
    </div>
  );
};
