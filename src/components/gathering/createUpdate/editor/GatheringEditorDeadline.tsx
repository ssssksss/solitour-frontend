"use client";

import { Modal } from "@/shared/ui/modal/Modal";
import { format } from "date-fns";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import GatheringDeadlineModal from "./modal/GatheringDeadlineModal";
import useModalState from "@/shared/lib/hooks/useModalState";

const GatheringEditorDeadline = () => {
  const formContext = useFormContext();
  const modalState = useModalState();

  return (
    <div className="flex w-full items-center gap-x-[0.625rem] gap-y-[.75rem] max-[400px]:flex-col max-[400px]:items-start">
      <div className="relative w-[2.625rem] shrink-0">
        <span className="text-lg font-semibold">마감</span>
        <span className="text-main absolute top-[-.5rem] text-lg">*</span>
      </div>
      <div className="relative w-full">
        <button
          onClick={modalState.openModal}
          className={`flex h-[3.25rem] w-full items-center justify-start rounded-[3rem] pl-[1.75rem] outline outline-[1px] outline-offset-[-1px] ${
            formContext.formState.errors.deadline
              ? "outline-red-500"
              : "outline-[#E3E3E3]"
          }`}
        >
          {formContext.getValues("deadline") ? (
            format(new Date(formContext.getValues("deadline")), "yyyy-MM-dd")
          ) : (
            <div className="flex justify-center gap-x-[.5rem] max-[360px]:justify-start max-[360px]:pl-[.75rem]">
              <span> YY.MM.DD </span>
              <Image
                src="/icons/calendar-icon.svg"
                alt="calendar-icon"
                width={16}
                height={16}
              />
            </div>
          )}
        </button>
        {formContext.formState.errors.deadline && (
          <span className="absolute -bottom-6 left-4 mt-1 text-xs text-red-500">
            {formContext.formState.errors.deadline.message as String}
          </span>
        )}
      </div>
      <Modal modalState={modalState}>
        <GatheringDeadlineModal />
      </Modal>
    </div>
  );
};
export default GatheringEditorDeadline;
