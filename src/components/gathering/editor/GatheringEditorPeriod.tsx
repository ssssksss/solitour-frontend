import { Modal } from "@/components/common/modal/Modal";
import { ModalState } from "@/types/ModalState";
import { format } from "date-fns";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import GatheringPeriodModal from "../modal/GatheringPeriodModal";

interface IGatheringEditorPeriod {
  modalState: ModalState
}
const GatheringEditorPeriod = ({ modalState }: IGatheringEditorPeriod) => {
  const formContext = useFormContext();

  return (
    <div className={"flex items-center gap-x-[1.75rem]"}>
      <div className={"relative w-[2.625rem] flex-shrink-0"}>
        <span className={"w-[3.5rem] text-lg font-semibold"}>날짜</span>
        <span className="absolute top-[-.5rem] text-lg text-main">*</span>
      </div>
      <div className="relative w-full">
        <button
          onClick={modalState.openModal}
          className={`h-[3.25rem] w-[18.75rem] rounded-[3rem] px-[1rem] outline outline-[1px] outline-offset-[-1px] ${
            formContext.formState.errors.scheduleStartDate
              ? "outline-red-500"
              : formContext.getValues("scheduleStartDate")
                ? "outline-main"
                : "outline-[#E3E3E3]"
          }`}
        >
          {formContext.getValues("scheduleStartDate") ? (
            <div>
              <span>
                {format(
                  new Date(formContext.getValues("scheduleStartDate")),
                  "yyyy-MM-dd",
                )}
              </span>
              <span>{" ~ "}</span>
              <span>
                {format(
                  new Date(formContext.getValues("scheduleEndDate")),
                  "yyyy-MM-dd",
                )}
              </span>
            </div>
          ) : (
            <div className="flex justify-center gap-x-[.5rem]">
              <span> YYYY-MM-DD </span>
              <Image
                src="/common/calendar-icon.svg"
                alt="calendar-icon"
                width={16}
                height={16}
              />
            </div>
          )}
        </button>
        {formContext.formState.errors.scheduleStartDate && (
          <span className="absolute bottom-[-16px] left-4 mt-1 text-xs text-red-500">
            {formContext.formState.errors.scheduleStartDate.message as String}
          </span>
        )}
      </div>
      <Modal isOpen={modalState.isOpen} onClose={() => modalState.closeModal()}>
        <GatheringPeriodModal closeModal={() => modalState.closeModal()} />
      </Modal>
    </div>
  );
};
export default GatheringEditorPeriod