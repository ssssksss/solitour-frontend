import { Modal } from '@/components/common/modal/Modal';
import { ModalState } from '@/types/ModalState';
import { format } from 'date-fns';
import { useFormContext } from 'react-hook-form';
import GatheringTimeModal from '../modal/GatheringTimeModal';

interface IGatheringEditorTime {
  modalState: ModalState
}
const GatheringEditorTime = ({modalState}: IGatheringEditorTime) => {
  const formContext = useFormContext();

  return (
    <div className={"flex w-full items-center gap-x-[0.625rem] gap-y-[.75rem] max-[400px]:flex-col max-[400px]:items-start"}>
      <div className={"relative w-[2.625rem] flex-shrink-0"}>
        <span className={"text-lg font-semibold"}>시간</span>
        <span className="absolute top-[-.5rem] text-lg text-main">*</span>
      </div>
      <div className="relative w-full">
        <button
          onClick={modalState.openModal}
          disabled={!formContext.getValues("scheduleStartDate")}
          className={`${formContext.getValues("scheduleStartDate") || "cursor-not-allowed bg-gray-100"} h-[3.25rem] pl-[1.75rem] rounded-[3rem] outline outline-[1px] outline-offset-[-1px] w-full flex justify-start items-center ${
            formContext.formState.errors.scheduleStartDate
              ? "outline-red-500"
              // : formContext.getValues("scheduleStartDate")
              //   ? "outline-main"
                : "outline-[#E3E3E3]"
          }`}
        >
          {formContext.getValues("scheduleStartDate")
            ? format(
                new Date(formContext.getValues("scheduleStartDate")),
                "HH : mm",
              )
            : "00 : 00"}
        </button>
      </div>
      <Modal isOpen={modalState.isOpen} onClose={() => modalState.closeModal()}>
        <GatheringTimeModal closeModal={() => modalState.closeModal()} />
      </Modal>
    </div>
  );
};
export default GatheringEditorTime