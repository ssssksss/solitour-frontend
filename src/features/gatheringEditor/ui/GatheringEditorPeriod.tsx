"use client";

import { format } from "date-fns";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { Modal } from "@/shared/ui/modal";
import { useModal } from "@/shared/lib/hooks";
import { GatheringPeriodModal } from "./GatheringPeriodModal";
import { GatheringForm } from "../model/gatheringForm";

export const GatheringEditorPeriod = () => {
  const formContext = useFormContext<GatheringForm>();
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="flex w-full items-center gap-x-2.5 gap-y-3 max-[400px]:flex-col max-[400px]:items-start">
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <GatheringPeriodModal closeModal={closeModal} />
      </Modal>
      <div className="relative w-10.5 shrink-0">
        <span className="text-lg font-semibold">날짜</span>
        <span className="text-main absolute -top-2 text-lg">*</span>
      </div>
      <div className="relative w-full">
        <button
          onClick={openModal}
          className={[
            formContext.formState.errors.scheduleStartDate
              ? "outline-red-500"
              : "outline-[#E3E3E3]",
            "flex h-13 w-full items-center justify-start rounded-[3rem] px-5 text-sm outline -outline-offset-1",
          ].join(" ")}
        >
          {formContext.getValues("scheduleStartDate") ? (
            <div className="flex w-full gap-1">
              <span>
                {format(
                  new Date(formContext.getValues("scheduleStartDate")),
                  "yy.MM.dd",
                )}
              </span>
              {format(
                new Date(formContext.getValues("scheduleStartDate")),
                "yy.MM.dd",
              ) !==
                format(
                  new Date(formContext.getValues("scheduleEndDate")),
                  "yy.MM.dd",
                ) && (
                <span>
                  {format(
                    new Date(formContext.getValues("scheduleEndDate")),
                    "- yy.MM.dd",
                  )}
                </span>
              )}
            </div>
          ) : (
            <div className="flex justify-start gap-x-2 max-[360px]:justify-start max-[360px]:pl-3">
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
        {formContext.formState.errors.scheduleStartDate && (
          <span className="absolute -bottom-6 left-4 mt-1 text-xs text-red-500">
            {formContext.formState.errors.scheduleStartDate.message as String}
          </span>
        )}
      </div>
    </div>
  );
};
