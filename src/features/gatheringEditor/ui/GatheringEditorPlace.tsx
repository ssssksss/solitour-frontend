"use client";

import { useFormContext } from "react-hook-form";
import { useModal } from "@/shared/lib/hooks";
import { Modal } from "@/shared/ui/modal";
import { GatheringForm } from "../model/gatheringForm";
import { GatheringPlaceModal } from "./GatheringPlaceModal";

export const GatheringEditorPlace = () => {
  const formContext = useFormContext<GatheringForm>();
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="flex w-full items-center gap-x-2.5 gap-y-3 max-[400px]:flex-col max-[400px]:items-start">
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <GatheringPlaceModal closeModal={closeModal} />
      </Modal>
      <div className="relative w-10.5 shrink-0">
        <span className="text-lg font-semibold">장소</span>
        <span className="text-main absolute -top-2 text-lg">*</span>
      </div>
      <div className="relative grow">
        <button
          className={[
            formContext.formState.errors.placeName
              ? "outline-red-500"
              : "outline-[#E3E3E3]",
            "flex h-13 w-full items-center justify-start truncate rounded-[3rem] px-5 text-sm outline -outline-offset-1",
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
    </div>
  );
};
