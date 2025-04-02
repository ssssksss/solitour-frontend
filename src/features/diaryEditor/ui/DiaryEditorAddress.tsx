"use client";

import { useModal } from "@/shared/lib/hooks";
import { useFormContext } from "react-hook-form";
import { DiaryAddressModal } from "./DiaryAddressModal";
import { Modal } from "@/shared/ui/modal";
import { DiaryForm } from "../model/diaryForm";

export const DiaryEditorAddress = () => {
  const formContext = useFormContext<DiaryForm>();
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="relative flex h-13.25 grow flex-row items-center gap-2.5 max-[1024px]:w-full">
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <DiaryAddressModal closeModal={closeModal} />
      </Modal>
      <h2 className="w-10.5 text-lg font-semibold text-nowrap text-black">
        주소<span className="text-main">*</span>
      </h2>
      <button
        className={[
          formContext.getValues("address") === "" ? "text-gray2" : "text-black",
          formContext.formState.errors.address
            ? "border-red-500"
            : "border-gray3 hover:border-main",
          "h-full grow rounded-full border bg-transparent pl-5 text-start text-sm outline-hidden",
        ].join(" ")}
        type="button"
        onClick={openModal}
      >
        {formContext.getValues("address") === ""
          ? "주소를 입력하세요."
          : formContext.getValues("address")}
      </button>
      {formContext.formState.errors.address && (
        <p className="absolute -bottom-6 left-16 mt-1 text-xs text-red-500">
          {formContext.formState.errors.address.message as String}
        </p>
      )}
    </div>
  );
};
