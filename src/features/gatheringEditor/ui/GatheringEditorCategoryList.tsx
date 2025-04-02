"use client";

import { Modal } from "@/shared/ui/modal/Modal";
import { useFormContext } from "react-hook-form";
import { useModal } from "@/shared/lib/hooks";
import { GatheringCategoryListModal } from "./GatheringCategoryListModal";
import { GatheringForm } from "../model/gatheringForm";
import { useGatheringEditorCategoryList } from "../model/useGatheringEditorCategoryList";

export const GatheringEditorCategoryList = () => {
  const formContext = useFormContext<GatheringForm>();
  const { isOpen, openModal, closeModal } = useModal();
  const { categoryList } = useGatheringEditorCategoryList();

  return (
    <div className="flex w-full items-center gap-y-3 max-[400px]:flex-col max-[400px]:items-start">
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <GatheringCategoryListModal
          categoryList={categoryList}
          closeModal={closeModal}
        />
      </Modal>
      <div className="relative w-full">
        <button
          className={[
            formContext.formState.errors.gatheringCategoryId
              ? "outline-red-500"
              : "outline-[#E3E3E3]",
            "flex h-13 w-full items-center rounded-[3rem] pl-7 whitespace-nowrap outline -outline-offset-1",
          ].join(" ")}
          onClick={openModal}
        >
          <div className="flex h-full w-full items-center justify-start text-lg font-semibold">
            {formContext.getValues("gatheringCategoryId") ? (
              categoryList.map((i) => {
                if (i.id == formContext.getValues("gatheringCategoryId")) {
                  return i.name;
                }
              })
            ) : (
              <div className="relative text-lg font-semibold">
                카테고리 선택
                <span className="text-main absolute -top-2 text-lg">*</span>
              </div>
            )}
          </div>
        </button>
        {formContext.formState.errors.gatheringCategoryId && (
          <span className="absolute -bottom-6 left-4 mt-1 text-xs text-red-500">
            {formContext.formState.errors.gatheringCategoryId.message as String}
          </span>
        )}
      </div>
    </div>
  );
};
