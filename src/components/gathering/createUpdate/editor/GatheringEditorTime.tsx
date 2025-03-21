"use client";

import { Modal } from "@/shared/ui/modal/Modal";
import { format } from "date-fns";
import { useFormContext } from "react-hook-form";
import GatheringTimeModal from "./modal/GatheringTimeModal";
import useModalState from "@/shared/lib/hooks/useModal";

const GatheringEditorTime = () => {
  const formContext = useFormContext();
  const modalState = useModalState();

  return (
    <div className="flex w-full items-center gap-x-[0.625rem] gap-y-[.75rem] max-[400px]:flex-col max-[400px]:items-start">
      <div className="relative w-[2.625rem] shrink-0">
        <span className="text-lg font-semibold">시간</span>
        <span className="text-main absolute top-[-.5rem] text-lg">*</span>
      </div>
      <div className="relative w-full">
        <button
          onClick={modalState.openModal}
          disabled={!formContext.getValues("scheduleStartDate")}
          className={[
            `${formContext.getValues("scheduleStartDate") || "cursor-not-allowed bg-gray-100"}`,
            `${formContext.formState.errors.scheduleStartDate ? "outline-red-500" : "outline-[#E3E3E3]"}`,
            "flex h-[3.25rem] w-full items-center justify-start rounded-[3rem] pl-[1.75rem] outline outline-[1px] outline-offset-[-1px]",
          ].join(" ")}
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
      <Modal modalState={modalState}>
        <GatheringTimeModal />
      </Modal>
    </div>
  );
};

export default GatheringEditorTime;
