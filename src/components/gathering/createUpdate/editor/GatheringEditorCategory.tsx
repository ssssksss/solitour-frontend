import { Modal } from "@/components/common/modal/Modal";
import { ModalState } from "@/types/ModalState";
import { useFormContext } from "react-hook-form";
import GatheringCategoryModal from "./modal/GatheringCategoryModal";

interface ICategory {
  id: number;
  name: string;
  childrenCategories: ICategory[];
}

interface IGatheringEditorCategory {
  modalState: ModalState;
  categoryList: ICategory[];
}
const GatheringEditorCategory = ({
  modalState,
  categoryList,
}: IGatheringEditorCategory) => {
  const formContext = useFormContext();

  return (
    <div
      className={
        "flex w-full items-center gap-y-[.75rem] max-[400px]:flex-col max-[400px]:items-start"
      }
    >
      <div className="relative w-full">
        <button
          onClick={modalState.openModal}
          className={`flex h-[3.25rem] w-full items-center whitespace-nowrap rounded-[3rem] pl-[1.75rem] outline outline-[1px] outline-offset-[-1px] ${
            formContext.formState.errors.gatheringCategoryId
              ? "outline-red-500"
              : "outline-[#E3E3E3]"
          }`}
        >
          <div
            className={
              "flex h-full w-full items-center justify-start text-lg font-semibold"
            }
          >
            {formContext.getValues("gatheringCategoryId") ? (
              categoryList.map((i) => {
                if (i.id == formContext.getValues("gatheringCategoryId")) {
                  return i.name;
                }
              })
            ) : (
              <div className={"relative text-lg font-semibold"}>
                카테고리 선택
                <span className="absolute top-[-.5rem] text-lg text-main">
                  *
                </span>
              </div>
            )}
          </div>
        </button>
        {formContext.formState.errors.gatheringCategoryId && (
          <span className="absolute -bottom-6 left-4 mt-1 text-xs text-red-500">
            {formContext.formState.errors.gatheringCategoryId.message as String}
          </span>
        )}
      </div>
      <Modal
        isOpen={modalState.isOpen}
        onClose={() => modalState.closeModal()}
        isHeaderBar={true}
      >
        <GatheringCategoryModal
          closeModal={modalState.closeModal}
          categoryList={categoryList}
        />
      </Modal>
    </div>
  );
};
export default GatheringEditorCategory;
