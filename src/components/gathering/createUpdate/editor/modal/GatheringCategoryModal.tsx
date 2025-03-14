import ModalTemplate from "@/components/common/modal/ModalTemplate";
import "@/styles/reactDataRange.css";
import { IModalComponent } from "@/types/ModalState";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

interface ICategory {
  id: number;
  name: string;
  childrenCategories: ICategory[];
}
interface IGatheringCategoryModalProps extends IModalComponent {
  categoryList: ICategory[];
}

const GatheringCategoryModal = (props: IGatheringCategoryModalProps) => {
  const formContext = useFormContext();
  const [mainCategoryId, setMainCategoryId] = useState(
    formContext.getValues("gatheringCategoryId") || 0,
  );

  const submitHandler = () => {
    formContext.setValue("gatheringCategoryId", mainCategoryId);
    formContext.trigger("gatheringCategoryId");
    props.closeModal!();
  };

  return (
    <ModalTemplate
      className={"h-auto w-[calc(100vw-2rem)] max-w-[40rem] flex-col"}
    >
      {props.closeButtonComponent}
      <div className={"flex w-full flex-col gap-y-1"}>
        <h2 className="w-full text-start text-2xl font-bold text-black">
          카테고리 선택
        </h2>
        <div className={"flex flex-wrap gap-x-2 gap-y-[.5rem] pt-[3rem]"}>
          {props.categoryList.map((i) => (
            <button
              key={i.id}
              onClick={() => {
                setMainCategoryId(i.id);
              }}
              className={`${mainCategoryId == i.id ? "bg-main text-white outline-hidden" : "text-gray1 outline outline-[1px] outline-offset-[-1px] outline-[#E9EBED]"} flex h-[2.25rem] items-center rounded-[4rem] px-4 py-2`}
            >
              {i.name}
            </button>
          ))}
        </div>
      </div>
      <div className={"flex w-full justify-center pt-8"}>
        <button
          className={
            "h-[3rem] w-full max-w-[18.625rem] rounded-[4rem] bg-main px-[1rem] py-[.5rem] text-white disabled:bg-gray1"
          }
          onClick={() => submitHandler()}
          disabled={mainCategoryId == 0}
        >
          적용하기
        </button>
      </div>
    </ModalTemplate>
  );
};
export default GatheringCategoryModal;
