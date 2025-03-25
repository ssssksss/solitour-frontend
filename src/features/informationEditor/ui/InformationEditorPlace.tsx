"use client";

import { Modal } from "@/shared/ui/modal";
import { InformationPlaceModal } from "./InformationPlaceModal";
import { useModal } from "@/shared/lib/hooks";
import { useFormContext } from "react-hook-form";

export const InformationEditorPlace = () => {
  const formContext = useFormContext();
  const { isOpen, openModal, closeModal } = useModal();

  const openPlaceModal = () => {
    formContext.setValue("province", "");
    formContext.setValue("city", "");
    formContext.setValue("informationAddress", "");
    formContext.setValue("placeId", "");
    formContext.setValue("placeXAxis", "");
    formContext.setValue("placeYAxis", "");
    formContext.setValue("placeName", "");
    formContext.watch();
    openModal();
  };

  return (
    <div className="relative flex h-[3.3125rem] grow flex-row items-center gap-2.5 max-[744px]:w-full">
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <InformationPlaceModal closeModal={closeModal} />
      </Modal>
      <h2 className="w-[2.625rem] text-lg font-semibold text-nowrap text-black">
        장소<span className="text-main">*</span>
      </h2>
      <button
        className={[
          formContext.getValues("placeName") !== ""
            ? "text-black"
            : "text-gray2",
          formContext.formState.errors.placeName
            ? "border-red-500"
            : "border-gray3 hover:border-main",
          "h-full grow rounded-full border bg-transparent pl-5 text-start text-sm font-medium outline-hidden",
        ].join(" ")}
        type="button"
        onClick={openPlaceModal}
      >
        {formContext.getValues("placeName") !== ""
          ? formContext.getValues("placeName")
          : "장소명을 입력하세요."}
      </button>
      {formContext.formState.errors.placeName && (
        <p className="absolute -bottom-6 left-16 mt-1 text-xs text-red-500">
          {formContext.formState.errors.placeName.message as String}
        </p>
      )}
    </div>
  );
};
