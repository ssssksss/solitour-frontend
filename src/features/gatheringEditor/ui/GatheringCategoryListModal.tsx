"use client";

import { ModalTemplate } from "@/shared/ui/modal";
import { useState } from "react";
import { useFormContext } from "react-hook-form";
import { GatheringForm } from "../model/gatheringForm";

interface GatheringCategoryListModalProps {
  categoryList: {
    id: number;
    name: string;
    childrenCategories: { id: number; name: string }[];
  }[];
  closeModal: () => void;
}

export const GatheringCategoryListModal = ({
  categoryList,
  closeModal,
}: GatheringCategoryListModalProps) => {
  const formContext = useFormContext<GatheringForm>();
  const [mainCategoryId, setMainCategoryId] = useState(
    formContext.getValues("gatheringCategoryId") || 0,
  );

  const submitHandler = () => {
    formContext.setValue("gatheringCategoryId", mainCategoryId);
    formContext.trigger("gatheringCategoryId");
    closeModal();
  };

  return (
    <ModalTemplate
      className="h-auto w-[calc(100vw-2rem)] max-w-[40rem] flex-col"
      closeModal={closeModal}
    >
      <div className={"flex w-full flex-col gap-y-1"}>
        <h2 className="w-full text-start text-2xl font-bold text-black">
          카테고리 선택
        </h2>
        <div className={"flex flex-wrap gap-x-2 gap-y-[.5rem] pt-[3rem]"}>
          {categoryList.map((i) => (
            <button
              key={i.id}
              onClick={() => {
                setMainCategoryId(i.id);
              }}
              className={`${mainCategoryId == i.id ? "bg-main text-white outline-hidden" : "text-gray1 outline outline-offset-[-1px] outline-[#E9EBED]"} flex h-[2.25rem] items-center rounded-[4rem] px-4 py-2`}
            >
              {i.name}
            </button>
          ))}
        </div>
      </div>
      <div className={"flex w-full justify-center pt-8"}>
        <button
          className={
            "bg-main disabled:bg-gray1 h-[3rem] w-full max-w-[18.625rem] rounded-[4rem] px-[1rem] py-[.5rem] text-white"
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
