import "@/styles/reactDataRange.css";
import Image from "next/image";
import { useState } from "react";
import { useFormContext } from "react-hook-form";

interface ICategory {
  id: number;
  name: string;
  childrenCategories: ICategory[];
}
interface IGatheringCategoryModalProps {
  closeModal: () => void;
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
    props.closeModal();
  };

  return (
    <div
      className={
        "flex flex-col relative h-auto w-[calc(100vw-2rem)] max-w-[40rem] overflow-y-scroll rounded-2xl bg-white p-[2.75rem] scrollbar-hide"
      }
    >
      <button
        className="absolute right-[1.5rem] top-[1.5rem]"
        onClick={() => props.closeModal()}
      >
        <Image
          src={"/close-icon.svg"}
          alt={"close-icon"}
          width={20}
          height={20}
        />
      </button>
      <div className={"flex flex-col gap-y-1"}>
        <h3 className="text-lg font-medium text-black text-start">카테고리 선택</h3>
        <div className={"flex flex-wrap gap-x-2 gap-y-[.5rem]"}>
          {props.categoryList.map((i) => (
            <button
              key={i.id}
              onClick={() => {
                setMainCategoryId(i.id);
              }}
              className={`${mainCategoryId == i.id ? "bg-main text-white outline-none" : "text-gray1 outline outline-[1px] outline-offset-[-1px] outline-[#E9EBED]"} flex h-[2.25rem] items-center rounded-[4rem] px-3 py-1 `}
            >
              {i.name}
            </button>
          ))}
        </div>
      </div>
      <div className={"pt-8 flex w-full justify-center"}>
        <button
          className={
            "h-[3rem] w-full max-w-[18.625rem] rounded-[4rem] bg-main px-[1rem] py-[.5rem] text-white disabled:bg-gray1"
          }
          onClick={() => submitHandler()}
          // disabled={subCategoryId == 0 && true}
          disabled={mainCategoryId == 0}
        >
          적용하기
        </button>
      </div>
    </div>
  );
};
export default GatheringCategoryModal;
