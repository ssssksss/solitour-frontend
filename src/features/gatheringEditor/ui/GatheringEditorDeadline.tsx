"use client";

import { format } from "date-fns";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { useModal } from "@/shared/lib/hooks";
import { Modal } from "@/shared/ui/modal";
import { GatheringDeadlineModal } from "./GatheringDeadlineModal";
import { GatheringForm } from "../model/gatheringForm";

export const GatheringEditorDeadline = () => {
  const formContext = useFormContext<GatheringForm>();
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="flex w-full items-center gap-x-2.5 gap-y-3 max-[400px]:flex-col max-[400px]:items-start">
      <div className="relative w-10.5 shrink-0">
        <span className="text-lg font-semibold">마감</span>
        <span className="text-main absolute -top-2 text-lg">*</span>
      </div>
      <div className="relative w-full">
        <button
          className={[
            formContext.formState.errors.deadline
              ? "outline-red-500"
              : "outline-[#E3E3E3]",
            "flex h-[3.25rem] w-full items-center justify-start rounded-[3rem] pl-7 outline -outline-offset-1",
          ].join(" ")}
          onClick={openModal}
        >
          {formContext.getValues("deadline") ? (
            format(new Date(formContext.getValues("deadline")), "yyyy-MM-dd")
          ) : (
            <div className="flex justify-center gap-x-2 max-[360px]:justify-start max-[360px]:pl-3">
              <span>YY.MM.DD</span>
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
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <GatheringDeadlineModal closeModal={closeModal} />
      </Modal>
    </div>
  );
};
