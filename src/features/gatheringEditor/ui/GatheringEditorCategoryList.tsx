"use client";

import { Modal } from "@/shared/ui/modal/Modal";
import { useFormContext } from "react-hook-form";
import { useEffect, useState } from "react";
import { useModal } from "@/shared/lib/hooks";
import { GatheringCategoryListModal } from "./GatheringCategoryListModal";
import { GatheringForm } from "../model/gatheringForm";

interface GatheringEditorCategoryListProps {
  id: number;
  name: string;
  childrenCategories: GatheringEditorCategoryListProps[];
}

export const GatheringEditorCategoryList = () => {
  const formContext = useFormContext<GatheringForm>();
  const [categoryList, setCategoryList] = useState<
    GatheringEditorCategoryListProps[]
  >([]);
  const { isOpen, openModal, closeModal } = useModal();

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
          className={[
            `${formContext.formState.errors.gatheringCategoryId ? "outline-red-500" : "outline-[#E3E3E3]"}`,
            "flex h-[3.25rem] w-full items-center rounded-[3rem] pl-[1.75rem] whitespace-nowrap outline -outline-offset-1",
          ].join(" ")}
          onClick={openModal}
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
                <span className="text-main absolute top-[-.5rem] text-lg">
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
      <Modal isOpen={isOpen} closeModal={closeModal}>
        <GatheringCategoryListModal
          categoryList={categoryList}
          closeModal={closeModal}
        />
      </Modal>
    </div>
  );
};
