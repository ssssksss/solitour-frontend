"use client";

import { Modal } from "@/components/common/modal/Modal";
import { useFormContext } from "react-hook-form";
import GatheringCategoryModal from "./modal/GatheringCategoryModal";
import useModalState from "@/hooks/useModalState";
import { useEffect, useState } from "react";

interface ICategory {
  id: number;
  name: string;
  childrenCategories: ICategory[];
}

const GatheringEditorCategory = () => {
  const formContext = useFormContext();
  const modalState = useModalState();
  const [categoryList, setCategoryList] = useState<ICategory[]>([]);

  useEffect(() => {
    (async () => {
      try {
        const response = await fetch("/api/gathering/category");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setCategoryList(result);
      } catch (error) {}
    })();
  }, []);

  return (
    <div className="flex w-full items-center gap-y-[.75rem] max-[400px]:flex-col max-[400px]:items-start">
      <div className="relative w-full">
        <button
          onClick={modalState.openModal}
          className={[
            `${formContext.formState.errors.gatheringCategoryId ? "outline-red-500" : "outline-[#E3E3E3]"}`,
            "flex h-[3.25rem] w-full items-center whitespace-nowrap rounded-[3rem] pl-[1.75rem] outline outline-[1px] outline-offset-[-1px]",
          ].join(" ")}
        >
          <div className="flex h-full w-full items-center justify-start text-lg font-semibold">
            {formContext.getValues("gatheringCategoryId") ? (
              categoryList.map((i) => {
                if (i.id == formContext.getValues("gatheringCategoryId")) {
                  return i.name;
                }
              })
            ) : (
              <div className="relative text-lg font-semibold">
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
      <Modal modalState={modalState}>
        <GatheringCategoryModal categoryList={categoryList} />
      </Modal>
    </div>
  );
};

export default GatheringEditorCategory;
