import { Modal } from "@/components/common/modal/Modal";
import { SETTING_MODAL_SEX } from "@/constants/gathering/GatheringConstant";
import { useFormContext } from "react-hook-form";
import GatheringSettingModal from "../../../components/gathering/modal/GatheringSettingModal";
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
        <div>{formContext.getValues("deadline") && "OK"}</div>{" "}
        {/* deadline로 수정 */}
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
          모집 마감일 : {formContext.getValues("deadline")}
        </div>
        <div className={"flex h-[2.75rem] items-center"}>
          <span className="pr-[.5rem]"> 인원 : </span> { formContext.getValues("personCount") > 0 && <span> 1 / {formContext.getValues("personCount")} 명 </span>}
        </div>
        <div className={"flex h-[2.75rem] items-center"}>
          <span className="pr-[.5rem]"> 나이 : </span>
          {
            formContext.getValues("deadline") && <div className={"flex gap-[.25rem]"}>
            <span>
              {new Date().getFullYear() -
                formContext.getValues("startAge") +
                "세 ~"}
            </span>
            <span>
              {new Date().getFullYear() -
                formContext.getValues("endAge") +
                "세"}
            </span>
            (<span>{formContext.getValues("endAge") + "년생"}</span>
            <span>~</span>
            <span>{formContext.getValues("startAge") + "년생"}</span>)
          </div>
          }
        </div>
        <div className={"flex h-[2.75rem] items-center"}>
          <span className="pr-[.5rem]"> 성별 : </span>
          {SETTING_MODAL_SEX[formContext.getValues("allowedSex")]}
        </div>
      </div>
    </article>
  );
};

export default GatheringSetting;
