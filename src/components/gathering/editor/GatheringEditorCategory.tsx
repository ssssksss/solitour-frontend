import { Modal } from "@/components/common/modal/Modal";
import { ModalState } from "@/types/ModalState";
import { useFormContext } from "react-hook-form";
import GatheringCategoryModal from "../modal/GatheringCategoryModal";

interface ICategory {
  id: number;
  name: string;
  childrenCategories: ICategory[];
}

interface IGatheringEditorCategory {
  modalState: ModalState;
  categoryList: ICategory[];
}
const GatheringEditorCategory = ({ modalState, categoryList }: IGatheringEditorCategory) => {
  const formContext = useFormContext();

  
  return (
    <div className={"flex items-center gap-x-[1.75rem]"}>
      <button
        onClick={modalState.openModal}
        className="flex h-[3.25rem] w-[12.5rem] overflow-hidden text-ellipsis whitespace-nowrap rounded-[3rem] px-[1rem] outline outline-[1px] outline-offset-[-1px] outline-[#E3E3E3]"
      >
        <div className={"flex h-full w-full items-center justify-center"}>
          {formContext.getValues("gatheringCategoryId") ? (
            categoryList.map(
              (i) => {
                if (i.id == formContext.getValues("gatheringCategoryId")) {
                  return i.name
                }
              },
            )
          ) : (
            <div className={"relative text-lg font-semibold"}>
              카테고리 선택
              <span className="absolute top-[-.5rem] text-lg text-main">*</span>
            </div>
          )}
        </div>
      </button>
      <Modal isOpen={modalState.isOpen} onClose={() => modalState.closeModal()}>
        <GatheringCategoryModal
          closeModal={modalState.closeModal}
          categoryList={categoryList}
        />
      </Modal>
    </div>
  );
};
export default GatheringEditorCategory