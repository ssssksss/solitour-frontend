"use client";

import { Modal } from "@/shared/ui/modal/Modal";
import { useFormContext } from "react-hook-form";
import { GENDER } from "@/entities/user";
import { useModal } from "@/shared/lib/hooks";
import { GatheringParticipantsFilterModal } from "./GatheringParticipantsFilterModal";

export const GatheringEditorParticipantsFilter = () => {
  const formContext = useFormContext();
  const { isOpen, openModal, closeModal } = useModal();

  return (
    <div className="flex w-full items-center">
      <div className="relative w-full">
        <button
          className={[
            formContext.formState.errors.allowedSex
              ? "outline-red-500"
              : "outline-[#E3E3E3]",
            "flex h-13 w-full items-center truncate rounded-[3rem] pl-7 outline -outline-offset-1",
          ].join(" ")}
          onClick={openModal}
        >
          {formContext.getValues("allowedSex") ? (
            <div className="flex h-full w-full items-center justify-start">
              <div className="flex">
                <div className="rounded-full py-1 font-semibold text-black">
                  {formContext.getValues("personCount")}명{" "}
                  <span className={"px-1 text-black"}> | </span>
                </div>
              </div>
              <div className="flex">
                <div className="flex items-center rounded-full py-1 font-semibold text-black">
                  {new Date().getFullYear() - formContext.getValues("startAge")}
                  세<span>~</span>
                  {new Date().getFullYear() -
                    formContext.getValues("endAge")}세{" "}
                  <span className={"px-1 text-black"}> | </span>
                </div>
                <div className="rounded-full py-1 font-semibold text-black">
                  {GENDER[formContext.getValues("allowedSex")]}
                </div>
              </div>
            </div>
          ) : (
            <div className="relative flex h-full w-full items-center justify-start">
              <div className="relative text-lg font-semibold">
                참여자 선택
                <span className="text-main absolute -top-2 text-lg">*</span>
              </div>
            </div>
          )}
          {formContext.formState.errors.allowedSex && (
            <span className="absolute -bottom-6 left-4 mt-1 text-xs text-red-500">
              {formContext.formState.errors.allowedSex.message as String}
            </span>
          )}
        </button>
      </div>
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <GatheringParticipantsFilterModal closeModal={closeModal} />
      </Modal>
    </div>
  );
};
