"use client";

import { useModal } from "@/shared/lib/hooks";
import { Modal } from "@/shared/ui/modal";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import { DiaryDateModal } from "./DiaryDateModal";
import { DiaryForm } from "../model/diaryForm";

export const DiaryEditorDate = () => {
  const formContext = useFormContext<DiaryForm>();
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="relative flex h-[3.3125rem] flex-row items-center gap-2.5 max-[1024px]:w-full">
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <DiaryDateModal closeModal={closeModal} />
      </Modal>
      <h2 className="w-[2.625rem] text-lg font-semibold text-nowrap text-black">
        날짜<span className="text-main">*</span>
      </h2>
      <button
        className={[
          formContext.getValues("startDate") ? "text-black" : "text-gray2",
          formContext.formState.errors.startDate
            ? "border-red-500"
            : "border-gray3 hover:border-main",
          "h-[3.3125rem] w-[21.75rem] grow rounded-full border bg-transparent pl-5 text-start text-sm",
        ].join(" ")}
        type="button"
        onClick={openModal}
      >
        {
          /* eslint-disable indent */
          formContext.getValues("startDate") !== null &&
          formContext.getValues("endDate") !== null ? (
            <p>
              {formContext.getValues("startDate")?.toLocaleDateString("ko-KR")}
            </p>
          ) : (
            <div className="flex flex-row items-center gap-2">
              {"YYYY.MM.DD"}
              <Image
                src="/icons/calendar-icon.svg"
                alt="calendar-icon"
                width={16}
                height={16}
              />
            </div>
          )
          /* eslint-enable indent */
        }
      </button>
      {formContext.formState.errors.startDate && (
        <p className="absolute -bottom-6 left-16 mt-1 text-xs text-red-500">
          {formContext.formState.errors.startDate.message as String}
        </p>
      )}
    </div>
  );
};
