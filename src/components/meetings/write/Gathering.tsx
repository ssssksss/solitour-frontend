import { Modal } from "@/components/common/modal/Modal";
import { SETTING_MODAL_SEX } from "@/constants/meetings/GatheringConstant";
import { useFormContext } from "react-hook-form";
import GatheringSettingModal from "../modal/GatheringSettingModal";

interface IGatheringSettingProps {
  isModal: boolean;
  closeModal: () => void;
  openModal: () => void;
}

const GatheringSetting = (props: IGatheringSettingProps) => {
  const formContext = useFormContext();

  return (
    <article className={"flex flex-col gap-[2rem]"}>
      <div className={"flex w-full items-center gap-x-[2rem]"}>
        <div className={"w-[7rem] flex-shrink-0"}>
          <span className={"relative text-lg font-semibold"}>
            조건
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
          모임 제한 선택
        </button>
        <div>{formContext.getValues("expirationDate") && "OK"}</div>
        <Modal isOpen={props.isModal} onClose={() => props.closeModal()}>
          <GatheringSettingModal closeModal={() => props.closeModal()} />
        </Modal>
      </div>
      <div
        className={
          "flex h-[13.5rem] flex-col justify-center gap-[.5rem] rounded-[1rem] p-[.5rem] font-semibold text-black outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
        }
      >
        <div className={"flex h-[2.75rem] items-center"}>
          모집 마감일 : {formContext.getValues("expirationDate")}
        </div>
        <div className={"flex h-[2.75rem] items-center"}>
          인원 : 1 /{formContext.getValues("totalPersonCount")}
        </div>
        <div className={"flex h-[2.75rem] items-center"}>
          <span className="pr-[.5rem]"> 나이 : </span>
          <div className={"flex gap-[.25rem]"}>
            <span>
              {new Date().getFullYear() -
                formContext.getValues("permitMinUserAgeYear") +
                "세 ~"}
            </span>
            <span>
              {new Date().getFullYear() -
                formContext.getValues("permitMaxUserAgeYear") +
                "세"}
            </span>
            (
            <span>
              {formContext.getValues("permitMaxUserAgeYear") + "년생"}
            </span>
            <span>~</span>
            <span>
              {formContext.getValues("permitMinUserAgeYear") + "년생"}
            </span>
            )
          </div>
        </div>
        <div className={"flex h-[2.75rem] items-center"}>
          <span className="pr-[.5rem]"> 성별 : </span>
          {SETTING_MODAL_SEX[formContext.getValues("permitSex")]}
        </div>
      </div>
    </article>
  );
};
export default GatheringSetting;
