"use client";

import { useFormContext } from "react-hook-form";
import { useModal } from "@/shared/lib/hooks";
import { GatheringPlaceModal } from "./GatheringPlaceModal";
import { Modal } from "@/shared/ui/modal";

export const GatheringEditorPlace = () => {
  const formContext = useFormContext();
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="flex w-full items-center gap-x-[0.625rem] gap-y-[.75rem] max-[400px]:flex-col max-[400px]:items-start">
      <div className="relative w-[2.625rem] shrink-0">
        <span className="text-lg font-semibold">장소</span>
        <span className="text-main absolute top-[-.5rem] text-lg">*</span>
      </div>
      <div className="relative w-full">
        <button
          className={[
            formContext.formState.errors.placeName
              ? "outline-red-500"
              : "outline-[#E3E3E3]",
            "flex h-13 w-full items-center justify-start truncate rounded-[3rem] pl-7 outline -outline-offset-1",
          ].join(" ")}
          onClick={openModal}
        >
          {formContext.getValues("placeName") || "장소명을 입력하세요."}
        </button>
        {formContext.formState.errors.placeName && (
          <span className="absolute -bottom-6 left-4 mt-1 text-xs text-red-500">
            {formContext.formState.errors.placeName.message as String}
          </span>
        )}
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <GatheringPlaceModal closeModal={closeModal} />
      </Modal>
    </div>
  );
};
