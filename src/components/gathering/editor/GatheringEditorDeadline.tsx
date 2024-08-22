import { Modal } from "@/components/common/modal/Modal";
import { ModalState } from "@/types/ModalState";
import { format } from "date-fns";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import GatheringDeadlineModal from "../modal/GatheringDeadlineModal";

interface IGatheringEditorDeadline {
  modalState: ModalState;
}
const GatheringEditorDeadline = ({ modalState }: IGatheringEditorDeadline) => {
  const formContext = useFormContext();
  
return (
  <div className={"flex items-center gap-x-[1.75rem]"}>
    <div className={"relative w-[5.875rem] flex-shrink-0"}>
      <span className={"w-[5.875rem] text-lg font-semibold"}>모집마감일</span>
      <span className="absolute top-[-.5rem] text-lg text-main">*</span>
    </div>
    <button
      onClick={modalState.openModal}
      className="h-[3.25rem] w-[9.375rem] rounded-[3rem] px-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
    >
      {formContext.getValues("deadline") ? (
        format(new Date(formContext.getValues("deadline")), "yyyy-MM-dd")
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
      <GatheringDeadlineModal closeModal={() => modalState.closeModal()} />
    </Modal>
  </div>
);
};
export default GatheringEditorDeadline