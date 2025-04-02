"use client";

import { Modal } from "@/shared/ui/modal";
import { format } from "date-fns";
import { useFormContext } from "react-hook-form";
import { useModal } from "@/shared/lib/hooks";
import { GatheringTimeModal } from "./GatheringTimeModal";
import { GatheringForm } from "../model/gatheringForm";

export const GatheringEditorTime = () => {
  const formContext = useFormContext<GatheringForm>();
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="flex w-full items-center gap-x-2.5 gap-y-3 max-[400px]:flex-col max-[400px]:items-start">
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <GatheringTimeModal closeModal={closeModal} />
      </Modal>
      <div className="relative w-10.5 shrink-0">
        <span className="text-lg font-semibold">시간</span>
        <span className="text-main absolute -top-2 text-lg">*</span>
      </div>
      <div className="relative w-full">
        <button
          className={[
            formContext.getValues("scheduleStartDate") ||
              "cursor-not-allowed bg-gray-100",
            formContext.formState.errors.scheduleStartDate
              ? "outline-red-500"
              : "outline-[#E3E3E3]",
            "flex h-13 w-full items-center justify-start rounded-[3rem] px-5 text-sm outline -outline-offset-1",
          ].join(" ")}
          onClick={openModal}
          disabled={!formContext.getValues("scheduleStartDate")}
        >
          {
            formContext.getValues("scheduleStartDate")
              ? /* eslint-disable indent */
                format(
                  new Date(formContext.getValues("scheduleStartDate")),
                  "HH : mm",
                )
              : "00 : 00"
            /* eslint-enable indent */
          }
        </button>
        {formContext.formState.errors.scheduleStartDate && (
          <span className="absolute -bottom-6 left-4 mt-1 text-xs text-red-500">
            {formContext.formState.errors.scheduleStartDate.message as String}
          </span>
        )}
      </div>
    </div>
  );
};
