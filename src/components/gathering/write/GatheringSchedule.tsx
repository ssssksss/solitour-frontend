import { Modal } from "@/components/common/modal/Modal";
import { SETTING_MODAL_DAY_OF_THE_WEEK } from "@/constants/gathering/GatheringConstant";
import { useFormContext } from "react-hook-form";
import GatheringScheduleModal from "../modal/GatheringScheduleModal";

interface IGatheringScheduleProps {
  isModal: boolean;
  closeModal: () => void;
  openModal: () => void;
}

const GatheringSchedule = (props: IGatheringScheduleProps) => {
  const formContext = useFormContext();

  return (
    <article className={"flex flex-col gap-[2rem]"}>
      <div className={"flex w-full items-center gap-x-[2rem]"}>
        <div className={"w-[7rem] flex-shrink-0"}>
          <span className={"relative text-lg font-semibold"}>
            일정
            <span className="absolute right-[-.5rem] top-[-.5rem] text-lg text-main">
              *
            </span>
          </span>
        </div>
        <button
          onClick={() => props.openModal()}
          className={
            "h-[3rem] min-w-[8rem] rounded-[4rem] bg-main px-[1rem] py-[.5rem] text-white"
          }
        >
          일정 선택
        </button>
        <div>{formContext.getValues("startDateTime") && "OK"}</div>
        <Modal isOpen={props.isModal} onClose={() => props.closeModal()}>
          <GatheringScheduleModal closeModal={() => props.closeModal()} />
        </Modal>
      </div>
      <div
        className={
          "flex h-[6rem] flex-col justify-center gap-[.5rem] rounded-[1rem] p-[.5rem] font-semibold text-black outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
        }
      >
        <div className={"flex h-full flex-col justify-center gap-[1rem]"}>
          <div className={"flex items-center gap-[.5rem]"}>
            <span> 시작 : </span>
            {formContext.getValues("startDateTime") && (
              <div className={"flex items-center gap-[.5rem]"}>
                <span>
                  {formContext.getValues("startDateTime").substring(0, 10)}
                </span>
                <span>
                  {"(" +
                    SETTING_MODAL_DAY_OF_THE_WEEK[
                      new Date(
                        formContext.getValues("startDateTime").substring(0, 10),
                      ).getDay()
                    ] +
                    ")"}
                </span>
                <span>
                  {formContext
                    .getValues("startDateTime")
                    .substring(
                      11,
                      formContext.getValues("startDateTime").length,
                    )}
                </span>
              </div>
            )}
          </div>
          <div className={"flex items-center gap-[.5rem]"}>
            <span> 종료 : </span>
            {formContext.getValues("endDateTime") && (
              <div className={"flex items-center gap-[.5rem]"}>
                <span>
                  {formContext.getValues("endDateTime").substring(0, 10)}
                </span>
                <span>
                  {"(" +
                    SETTING_MODAL_DAY_OF_THE_WEEK[
                      new Date(
                        formContext.getValues("endDateTime").substring(0, 10),
                      ).getDay()
                    ] +
                    ")"}
                </span>
                <span>
                  {formContext
                    .getValues("endDateTime")
                    .substring(11, formContext.getValues("endDateTime").length)}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </article>
  );
};
export default GatheringSchedule;
