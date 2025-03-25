"use client";

import { useInformationFilterModal } from "../model/useInformationFilterModal";
import { LOCATION } from "@/shared/config";
import { ModalTemplate } from "@/shared/ui/modal";

interface InformationFilterModalProps {
  closeModal: () => void;
}

export const InformationFilterModal = ({
  closeModal,
}: InformationFilterModalProps) => {
  const { place, setPlace, handleClick } =
    useInformationFilterModal(closeModal);

  return (
    <ModalTemplate className="w-80 p-6" closeModal={closeModal}>
      <div className="flex flex-col gap-4 px-5 pb-2">
        <h3 className="text-lg font-bold text-black">지역별</h3>
        <div className="text-gray1 flex flex-wrap items-start gap-2 font-medium">
          <button
            className={[
              place === null ? "border-main bg-main text-white" : "",
              "hover:border-main hover:bg-main rounded-full border border-[#E9EBED] px-3 py-1.5 text-sm font-medium hover:scale-105 hover:text-white",
            ].join(" ")}
            type="button"
            onClick={() => setPlace(null)}
          >
            전체
          </button>
          {LOCATION.map((location) => (
            <button
              key={location}
              className={[
                location === place ? "border-main bg-main text-white" : "",
                "hover:border-main hover:bg-main rounded-full border border-[#E9EBED] px-3 py-1.5 text-sm font-medium hover:scale-105 hover:text-white",
              ].join(" ")}
              type="button"
              onClick={() => setPlace(location)}
            >
              {location}
            </button>
          ))}
        </div>
        {place !== "" && (
          <button
            className="bg-main h-11 w-full rounded-full text-[0.9375rem] text-white hover:scale-105"
            type="button"
            onClick={handleClick}
          >
            필터 적용하기
          </button>
        )}
      </div>
    </ModalTemplate>
  );
};
