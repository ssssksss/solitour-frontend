"use client";

import { ModalTemplate } from "@/shared/ui/modal";
import { useGatheringCategoryListModal } from "../model/useGatheringCategoryListModal";

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
  const { mainCategoryId, setMainCategoryId, handleSubmit } =
    useGatheringCategoryListModal(closeModal);

  return (
    <ModalTemplate
      className="h-auto w-[calc(100vw-2rem)] max-w-160 flex-col"
      closeModal={closeModal}
    >
      <div className="flex w-full flex-col gap-y-1">
        <h2 className="w-full text-start text-2xl font-bold text-black">
          카테고리 선택
        </h2>
        <div className="flex flex-wrap gap-x-2 gap-y-2 pt-12">
          {categoryList.map((i) => (
            <button
              key={i.id}
              className={[
                mainCategoryId === i.id
                  ? "bg-main text-white outline-hidden"
                  : "text-gray1 outline -outline-offset-1 outline-[#E9EBED]",
                "flex h-9 items-center rounded-[4rem] px-4 py-2",
              ].join(" ")}
              onClick={() => {
                setMainCategoryId(i.id);
              }}
            >
              {i.name}
            </button>
          ))}
        </div>
      </div>
      <div className="flex w-full justify-center pt-8">
        <button
          className="bg-main disabled:bg-gray1 h-12 w-full max-w-74.5 rounded-[4rem] px-4 py-2 text-white"
          onClick={() => handleSubmit()}
          disabled={mainCategoryId === 0}
        >
          적용하기
        </button>
      </div>
    </ModalTemplate>
  );
};
