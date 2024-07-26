import { CATEGORY_MODAL_CATEGORY_LIST } from "@/constants/gathering/GatheringConstant";
import "@/styles/reactDataRange.css";
import Image from "next/image";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
interface IGatheringCategoryModalProps {
  closeModal: () => void;
}

const GatheringCategoryModal = (props: IGatheringCategoryModalProps) => {
  const [mainCategory, setMainCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const formContext = useFormContext();

  const submitHandler = () => {
    formContext.setValue("mainCategory", mainCategory);
    formContext.setValue("subCategory", subCategory);
    formContext.watch();
    props.closeModal();
  };

  return (
    <div
      className={
        "relative w-[calc(100vw-1rem)] max-w-[40rem] overflow-scroll rounded-2xl bg-white px-[1rem] py-[2.875rem] md:p-[2.875rem]"
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
      <div className={"flex flex-col gap-y-[1rem] pt-[2rem]"}>
        <p className={"h-[2rem] text-lg font-bold text-black"}>카테고리 선택</p>
        <div className={"flex flex-wrap gap-x-[1rem] gap-y-[.5rem]"}>
          {Object.entries(CATEGORY_MODAL_CATEGORY_LIST).map((i) => (
            <button
              key={i[0]}
              onClick={() => {
                setMainCategory(i[0]);
                setSubCategory(
                  Object.entries(
                    CATEGORY_MODAL_CATEGORY_LIST[i[0]].subCategory,
                  )[0][0],
                );
              }}
              className={`${mainCategory == i[0] ? "bg-main text-white" : "text-gray1"} flex h-[2.25rem] items-center rounded-[4rem] px-[1rem] py-[.5rem] outline outline-[1px] outline-offset-[-1px] outline-[#E9EBED]`}
            >
              {i[1].name}
            </button>
          ))}
        </div>
        <p className={"h-[2rem] text-lg font-bold text-black"}>
          서브 카테고리 선택
        </p>
        <div
          className={"flex min-h-[2.5rem] flex-wrap gap-x-[1rem] gap-y-[.5rem]"}
        >
          {mainCategory &&
            Object.entries(
              CATEGORY_MODAL_CATEGORY_LIST[mainCategory].subCategory,
            ).map((i) => (
              <button
                key={i[0]}
                onClick={() => setSubCategory(i[0])}
                className={`${subCategory == i[0] ? "bg-main text-white" : "text-gray1"} flex h-[2.25rem] items-center rounded-[4rem] px-[1rem] py-[.5rem] outline outline-[1px] outline-offset-[-1px] outline-[#E9EBED]`}
              >
                {i[1]}
              </button>
            ))}
        </div>
      </div>
      <div className={"flex w-full justify-center gap-[1rem] pt-[2rem]"}>
        <button
          className={
            "h-[3rem] min-w-[8rem] rounded-[4rem] bg-main px-[1rem] py-[.5rem] text-white disabled:bg-gray1"
          }
          onClick={() => submitHandler()}
          disabled={mainCategory == "" && true}
        >
          적용하기
        </button>
      </div>
    </div>
  );
};
export default GatheringCategoryModal;
