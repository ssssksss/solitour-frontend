import { Modal } from "@/components/common/modal/Modal";
import { SETTING_MODAL_SEX } from "@/constants/gathering/GatheringConstant";
import { ModalState } from "@/types/ModalState";
import { useFormContext } from "react-hook-form";
import GatheringParticipantsFilterModal from "../modal/GatheringParticipantsFilterModal";

interface IGatheringEditorParticipantsFilter {
  modalState: ModalState;
}
const GatheringEditorParticipantsFilter = ({
  modalState,
}: IGatheringEditorParticipantsFilter) => {
  const formContext = useFormContext();

  return (
    <div className={"flex items-center gap-x-[1.75rem] max-[360px]:w-full"}>
      <div className="relative w-full">
        <button
          onClick={modalState.openModal}
          className={`flex h-[3.25rem] w-[15.5rem] overflow-hidden text-ellipsis whitespace-nowrap rounded-[3rem] px-[1rem] outline outline-[1px] outline-offset-[-1px] max-[360px]:w-full ${
            formContext.formState.errors.allowedSex
              ? "outline-red-500"
              : formContext.getValues("allowedSex")
                ? "outline-main"
                : "outline-[#E3E3E3]"
          }`}
        >
          {formContext.getValues("allowedSex") ? (
            <div className="flex h-full w-full items-center justify-center">
              <div className="rounded-full py-1 pr-1 font-semibold text-black">
                {"참여자-"}
              </div>
              <div className="rounded-full py-1 font-semibold text-black">
                {formContext.getValues("personCount")}명,
              </div>

              <div className="flex items-center rounded-full py-1 font-semibold text-black">
                {new Date().getFullYear() - formContext.getValues("startAge")}세
                <span>~</span>
                {new Date().getFullYear() - formContext.getValues("endAge")}세,
              </div>

              <div className="rounded-full py-1 font-semibold text-black">
                {SETTING_MODAL_SEX[formContext.getValues("allowedSex")]}
              </div>
            </div>
          ) : (
            <div
              className={
                "relative flex h-full w-full items-center justify-center max-[360px]:justify-start max-[360px]:pl-[.75rem]"
              }
            >
              <div className={"relative text-lg font-semibold"}>
                참여자 선택
                <span className="absolute top-[-.5rem] text-lg text-main">
                  *
                </span>
              </div>
            </div>
          )}
          {formContext.formState.errors.allowedSex && (
            <span className="absolute bottom-[-16px] left-4 mt-1 text-xs text-red-500">
              {formContext.formState.errors.allowedSex.message as String}
            </span>
          )}
        </button>
      </div>
      <Modal isOpen={modalState.isOpen} onClose={() => modalState.closeModal()}>
        <GatheringParticipantsFilterModal closeModal={modalState.closeModal} />
      </Modal>
    </div>
  );
};
export default GatheringEditorParticipantsFilter;
