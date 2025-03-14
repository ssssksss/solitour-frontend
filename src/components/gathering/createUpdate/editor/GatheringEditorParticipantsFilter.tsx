"use client";

import { Modal } from "@/components/common/modal/Modal";
import { useFormContext } from "react-hook-form";
import GatheringParticipantsFilterModal from "./modal/GatheringParticipantsFilterModal";
import { useModalState } from "@/shared/lib/hooks";
import { GENDER } from "@/entities/user";

const GatheringEditorParticipantsFilter = () => {
  const formContext = useFormContext();
  const modalState = useModalState();

  return (
    <div className="flex w-full items-center">
      <div className="relative w-full">
        <button
          onClick={modalState.openModal}
          className={`flex h-[3.25rem] w-full items-center overflow-hidden text-ellipsis whitespace-nowrap rounded-[3rem] pl-[1.75rem] outline outline-[1px] outline-offset-[-1px] ${
            formContext.formState.errors.allowedSex
              ? "outline-red-500"
              : "outline-[#E3E3E3]"
          }`}
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
                <span className="absolute top-[-.5rem] text-lg text-main">
                  *
                </span>
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
      <Modal modalState={modalState}>
        <GatheringParticipantsFilterModal />
      </Modal>
    </div>
  );
};

export default GatheringEditorParticipantsFilter;
