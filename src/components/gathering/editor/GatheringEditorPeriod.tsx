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
      <button
        onClick={modalState.openModal}
        className="h-[3.25rem] w-[9.375rem] rounded-[3rem] px-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
      >
        {formContext.getValues("scheduleStartDate") ? (
          format(
            new Date(formContext.getValues("scheduleStartDate")),
            "yyyy-MM-dd",
          )
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
      <button
        onClick={modalState.openModal}
        className="h-[3.25rem] w-[9.375rem] rounded-[3rem] px-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
      >
        {formContext.getValues("scheduleEndDate") ? (
          format(
            new Date(formContext.getValues("scheduleEndDate")),
            "yyyy-MM-dd",
          )
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
      <Modal isOpen={modalState.isOpen} onClose={() => modalState.closeModal()}>
        <GatheringPeriodModal closeModal={() => modalState.closeModal()} />
      </Modal>
    </div>
  );
};
export default GatheringEditorPeriod