import { Modal } from "@/components/common/modal/Modal";
import { CATEGORY_MODAL_CATEGORY_LIST } from "@/constants/meetings/GatheringConstant";
import { useFormContext } from "react-hook-form";
import GatheringCategoryModal from "../modal/GatheringCategoryModal";

interface IGatheringCategoryProps {
    isModal: boolean;
    closeModal: () => void;
    openModal: () => void;
}

const GatheringCategory = (props: IGatheringCategoryProps) => {
    const formContext = useFormContext();

  return (
    <article className={"flex flex-col gap-[2rem]"}>
      <div className={"flex w-full items-center gap-x-[2rem]"}>
        <div className={"w-[7rem] flex-shrink-0"}>
          <span className={"relative text-lg font-semibold"}>
            카테고리
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
          카테고리 선택
        </button>
        <div>
          {formContext.getValues("mainCategory") &&
            formContext.getValues("subCategory") &&
            "OK"}
        </div>
        <Modal
          isOpen={props.isModal}
          onClose={() => props.closeModal()}
        >
          <GatheringCategoryModal
            closeModal={() => props.closeModal()}
          />
        </Modal>
      </div>
      <div
        className={
          "flex h-[7rem] flex-col justify-center gap-[.5rem] rounded-[1rem] p-[.5rem] font-semibold text-black outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
        }
      >
        <div className={"flex h-[2.75rem] items-center"}>
          <span className={"pr-[.5rem]"}> 메인 카테고리 : </span>
          {formContext.getValues("mainCategory") &&
            CATEGORY_MODAL_CATEGORY_LIST[formContext.getValues("mainCategory")]
              .name}
        </div>
        <div className={"flex h-[2.75rem] items-center"}>
          <span className={"pr-[.5rem]"}> 서브 카테고리 : </span>
          {formContext.getValues("subCategory") &&
            CATEGORY_MODAL_CATEGORY_LIST[formContext.getValues("mainCategory")]
              .subCategory[formContext.getValues("subCategory")]}
        </div>
      </div>
    </article>
  );
};
export default GatheringCategory
