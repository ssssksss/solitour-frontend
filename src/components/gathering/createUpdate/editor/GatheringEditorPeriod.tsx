import { Modal } from "@/components/common/modal/Modal";
import { ModalState } from "@/types/ModalState";
import { format } from "date-fns";
import Image from "next/image";
import { useFormContext } from "react-hook-form";
import GatheringPeriodModal from "./modal/GatheringPeriodModal";

interface IGatheringEditorPeriod {
  modalState: ModalState;
}
const GatheringEditorPeriod = ({ modalState }: IGatheringEditorPeriod) => {
  const formContext = useFormContext();

  return (
    <div
      className={
        "flex w-full items-center gap-x-[0.625rem] gap-y-[.75rem] max-[400px]:flex-col max-[400px]:items-start"
      }
    >
      <div className={"relative w-[2.625rem] flex-shrink-0"}>
        <span className={"text-lg font-semibold"}>날짜</span>
        <span className="absolute top-[-.5rem] text-lg text-main">*</span>
      </div>
      <div className="relative w-full">
        <button
          onClick={modalState.openModal}
          className={`flex h-[3.25rem] w-full items-center justify-start rounded-[3rem] pl-[1.75rem] outline outline-[1px] outline-offset-[-1px] ${
            formContext.formState.errors.scheduleStartDate
              ? "outline-red-500"
              : // : formContext.getValues("scheduleStartDate")
                //   ? "outline-main"
                "outline-[#E3E3E3]"
          }`}
        >
          {formContext.getValues("scheduleStartDate") ? (
            <div className="flex w-full gap-[.25rem]">
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
            <div className="flex justify-start gap-x-[.5rem] max-[360px]:justify-start max-[360px]:pl-3">
              <span> YY.MM.DD </span>
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
          <span className="absolute -bottom-6 left-4 mt-1 text-xs text-red-500">
            {formContext.formState.errors.scheduleStartDate.message as String}
          </span>
        )}
      </div>
      <Modal isOpen={modalState.isOpen} onClose={() => modalState.closeModal()} isHeaderBar={true}>
        <GatheringPeriodModal closeModal={() => modalState.closeModal()} />
      </Modal>
    </div>
  );
};
export default GatheringEditorPeriod;
