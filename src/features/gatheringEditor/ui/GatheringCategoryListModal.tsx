"use client";

import { ModalTemplate } from "@/shared/ui/modal";
import { useGatheringCategoryListModal } from "../model/useGatheringCategoryListModal";
import { GatheringCategory } from "@/entities/gathering";

interface GatheringCategoryListModalProps {
  categoryList: GatheringCategory[];
  closeModal: () => void;
}

export const GatheringCategoryListModal = ({
  categoryList,
  closeModal,
}: GatheringCategoryListModalProps) => {
  const { mainCategoryId, setMainCategoryId, handleSubmit } =
    useGatheringCategoryListModal(closeModal);

  return (
    <ModalTemplate className="h-auto w-80 flex-col p-6" closeModal={closeModal}>
      <div className="flex w-full flex-col">
        <h2 className="w-full text-start text-2xl font-bold text-black">
          카테고리 선택
        </h2>
        <div className="flex flex-wrap gap-2 pt-4 pb-8">
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
      <div className="flex w-full justify-center">
        <button
          className="bg-main disabled:bg-gray1 h-12 w-full max-w-74.5 rounded-[4rem] px-4 py-2 text-white hover:scale-105"
          onClick={() => handleSubmit()}
          disabled={mainCategoryId === 0}
        >
          적용하기
        </button>
      </div>
    </ModalTemplate>
  );
};
